/* Only an explicit click registers this worker. No user drafts or API data are cached. */
'use strict';
const CACHE_PREFIX = 'namoro360x-shell-' + encodeURIComponent(new URL(self.registration.scope).pathname) + '-';
const CACHE_NAME = CACHE_PREFIX + '__N360_REVISION__';
const SHELL = __N360_SHELL__;
const urls = SHELL.map(file => new URL(file,self.registration.scope).href);
function canonical(value) {
  const url=new URL(value);
  if(url.pathname.endsWith('/index.html')) url.pathname=url.pathname.slice(0,-10);
  else if(url.pathname.endsWith('.html')) url.pathname=url.pathname.slice(0,-5);
  return url.href;
}
const aliases = new Map(urls.flatMap(url => [[url,url],[canonical(url),url]]));
const HTML_MARKER = 'data-n360-shell="1.3"';
async function cacheable(response,url) {
  if (!response.ok || response.type === 'opaque') return false;
  // The static host normalizes .html routes. Accept only that same-origin canonical target.
  if (response.redirected && (!response.url || canonical(response.url) !== canonical(url))) return false;
  const type=response.headers.get('content-type') || '';
  if (url.endsWith('.html')) return type.includes('text/html') && (await response.clone().text()).includes(HTML_MARKER);
  if (url.endsWith('.js')) return /javascript/.test(type);
  if (url.endsWith('.css')) return type.includes('text/css');
  if (url.endsWith('.png')) return type.includes('image/png');
  if (url.endsWith('.svg')) return type.includes('image/svg+xml');
  if (url.endsWith('.webmanifest')) return /json|manifest/.test(type);
  return false;
}
self.addEventListener('install',event => {
  event.waitUntil((async () => {
    // Stage all validated responses before opening the cache; a failed install leaves no partial cache.
    const entries=await Promise.all(urls.map(async url => {const response=await fetch(url,{cache:'reload',credentials:'same-origin'}); if(!await cacheable(response,url)) throw new Error('Content unavailable'); return [url,response];}));
    const cache=await caches.open(CACHE_NAME);
    try {await Promise.all(entries.map(([url,response]) => cache.put(url,response)));}
    catch (error) {await caches.delete(CACHE_NAME); throw error;}
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event => {
  event.waitUntil((async () => {const keys=await caches.keys(); await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key))); await self.clients.claim();})());
});
self.addEventListener('fetch',event => {
  if (event.request.method !== 'GET') return;
  const url=new URL(event.request.url);
  if (url.origin !== self.location.origin || url.search) return;
  const key=aliases.get(url.href);
  if (!key) return;
  event.respondWith((async () => {
    const cache=(await caches.has(CACHE_NAME)) ? await caches.open(CACHE_NAME) : null;
    try {
      const response=await fetch(event.request);
      if (await cacheable(response,key)) {if(cache) {try {await cache.put(key,response.clone());}catch{/* Quota limits must not block online use. */}} return response;}
      // Authentication failures/gates remain authoritative; never replace them with a cached shell.
      if (response.status < 500) return response;
      return (cache && await cache.match(key)) || response;
    } catch {return (cache && await cache.match(key)) || new Response('Conteúdo indisponível. Conecte-se à internet para preparar a cópia offline.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}});}
  })());
});
