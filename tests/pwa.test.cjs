'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const template = fs.readFileSync(path.join(__dirname, '../sw.js'), 'utf8');
const shell = ['index.html', 'plano.html', 'studio.html', 'app.js', 'styles.css', 'manifest.webmanifest', 'favicon.svg', 'assets/icon-192.png'];
const rootScope = 'https://example.invalid/namoro360x/';

function responseFor(url, { status = 200, html, redirected = false, type } = {}) {
  const pathname = new URL(url).pathname;
  let contentType = 'text/html', body = html || '<!doctype html><html data-n360-shell="1.3"><body>Conteúdo público</body></html>';
  if (pathname.endsWith('.js')) { contentType = 'text/javascript'; body = '/* public application */'; }
  if (pathname.endsWith('.css')) { contentType = 'text/css'; body = 'body { color: black }'; }
  if (pathname.endsWith('.webmanifest')) { contentType = 'application/manifest+json'; body = '{"name":"Namoro360X"}'; }
  if (pathname.endsWith('.png')) { contentType = 'image/png'; body = 'public-image-fixture'; }
  if (pathname.endsWith('.svg')) { contentType = 'image/svg+xml'; body = '<svg xmlns="http://www.w3.org/2000/svg"></svg>'; }
  const response = new Response(body, { status, headers: { 'content-type': type || contentType } });
  Object.defineProperty(response, 'url', { value: url });
  Object.defineProperty(response, 'redirected', { value: redirected });
  Object.defineProperty(response, 'type', { value: 'basic' });
  return response;
}

function memoryCaches() {
  const databases = new Map();
  const traces = { open: [], put: [], deleted: [] };
  const urlOf = request => typeof request === 'string' || request instanceof URL ? String(request) : request.url;
  const cacheObject = (name, data) => ({
    async put(request, response) {
      const url = urlOf(request);
      traces.put.push({ name, url });
      data.set(url, response.clone());
    },
    async match(request) { return data.get(urlOf(request))?.clone(); },
    async keys() { return [...data.keys()].map(url => new Request(url)); }
  });
  return {
    databases, traces,
    async keys() { return [...databases.keys()]; },
    async has(name) { return databases.has(name); },
    async open(name) {
      traces.open.push(name);
      if (!databases.has(name)) databases.set(name, new Map());
      return cacheObject(name, databases.get(name));
    },
    async match(request, options = {}) {
      if (options.cacheName) return databases.get(options.cacheName)?.get(urlOf(request))?.clone();
      for (const database of databases.values()) { const found = database.get(urlOf(request)); if (found) return found.clone(); }
      return undefined;
    },
    async delete(name) { traces.deleted.push(name); return databases.delete(name); }
  };
}

function harness({ scope = rootScope, revision = 'unit', caches = memoryCaches() } = {}) {
  const handlers = new Map(), calls = [];
  let fetcher = async request => responseFor(typeof request === 'string' ? request : request.url);
  const self = {
    registration: { scope }, location: new URL('sw.js', scope),
    clients: { async claim() {} }, async skipWaiting() {},
    addEventListener(type, listener) { handlers.set(type, listener); }
  };
  const source = template.replaceAll('__N360_REVISION__', revision).replace('__N360_SHELL__', JSON.stringify(shell));
  vm.runInNewContext(source, {
    self, caches, URL, Set, Response, console,
    fetch: async (request, options) => { calls.push({ request, options }); return fetcher(request, options); }
  }, { filename: 'sw.js' });
  return {
    scope, caches, calls,
    network(fn) { fetcher = fn; },
    async lifecycle(type) {
      let work;
      handlers.get(type)({ waitUntil(value) { work = value; } });
      await work;
    },
    async request(url = 'index.html', method = 'GET') {
      const request = new Request(new URL(url, scope), { method });
      let work;
      handlers.get('fetch')({ request, respondWith(value) { work = value; } });
      return work === undefined ? { handled: false, response: null } : { handled: true, response: await work };
    }
  };
}

test('instalação baixa somente assets explícitos da própria base e preenche a cache após validação', async () => {
  const h = harness();
  await h.lifecycle('install');
  assert.equal((await h.caches.keys()).length, 1);
  const fetched = h.calls.map(call => call.request);
  assert.deepEqual(fetched, shell.map(file => new URL(file, rootScope).href));
  assert.ok(h.calls.every(call => call.options.credentials === 'same-origin' && call.options.cache === 'reload'));
  const cacheName = (await h.caches.keys())[0];
  assert.deepEqual([...h.caches.databases.get(cacheName).keys()], fetched);
});

test('login 200 sem marcador de aplicação faz a instalação falhar sem criar cache parcial', async () => {
  const h = harness();
  h.network(async request => responseFor(request, { html: '<html><form>Entrar na conta</form></html>' }));
  await assert.rejects(h.lifecycle('install'));
  assert.deepEqual(await h.caches.keys(), []);
  assert.equal(h.caches.traces.open.length, 0);
});

test('falha 401 em um asset cancela a instalação inteira', async () => {
  const h = harness();
  h.network(async request => responseFor(request, { status: request.endsWith('app.js') ? 401 : 200 }));
  await assert.rejects(h.lifecycle('install'));
  assert.deepEqual(await h.caches.keys(), []);
});

test('falha de quota durante instalação remove a nova cache parcial', async () => {
  const h = harness();
  const open = h.caches.open.bind(h.caches);
  h.caches.open = async name => {
    const cache = await open(name);
    return { ...cache, async put(request, response) {
      if (String(request).endsWith('app.js')) throw new Error('QuotaExceededError');
      return cache.put(request, response);
    } };
  };
  await assert.rejects(h.lifecycle('install'));
  assert.deepEqual(await h.caches.keys(), []);
});

test('redirecionamento e tipo MIME incorreto não viram conteúdo offline', async () => {
  for (const options of [{ redirected: true }, { type: 'text/plain' }]) {
    const h = harness();
    h.network(async request => responseFor(request, options));
    await assert.rejects(h.lifecycle('install'));
    assert.deepEqual(await h.caches.keys(), []);
  }
});

test('somente GET da allowlist é interceptado', async () => {
  const h = harness();
  await h.lifecycle('install');
  h.calls.length = 0;
  for (const [url, method] of [
    ['index.html', 'POST'], ['app.js', 'PUT'], ['https://third-party.invalid/index.html', 'GET'],
    ['index.html?auth=example', 'GET'], ['app.js?v=1', 'GET'], ['api/participants', 'GET'],
    ['checkout', 'GET'], ['auth/callback', 'GET'], ['conta.html', 'GET']
  ]) {
    const result = await h.request(url, method);
    assert.equal(result.handled, false, method + ' ' + url);
  }
  assert.equal(h.calls.length, 0, 'Requests fora da allowlist devem continuar pelo navegador, sem fetch do worker.');
});

test('navegação para a raiz do escopo usa o index da mesma base', async () => {
  const h = harness();
  await h.lifecycle('install');
  h.network(async () => { throw new TypeError('offline'); });
  const result = await h.request('./');
  assert.equal(result.handled, true);
  assert.equal(result.response.status, 200);
  assert.match(await result.response.text(), /data-n360-shell="1.3"/);
});

test('resposta válida da rede é devolvida e atualiza a cópia pública', async () => {
  const h = harness();
  await h.lifecycle('install');
  const updated = '<html data-n360-shell="1.3"><body>Versão nova</body></html>';
  h.network(async request => responseFor(request.url || request, { html: updated }));
  const result = await h.request('index.html');
  assert.equal(await result.response.text(), updated);
  h.network(async () => { throw new TypeError('offline'); });
  const cached = await h.request('index.html');
  assert.equal(await cached.response.text(), updated);
});

test('falha de quota na atualização da cache não bloqueia o conteúdo válido da rede', async () => {
  const h = harness();
  await h.lifecycle('install');
  const open = h.caches.open.bind(h.caches);
  h.caches.open = async name => {
    const cache = await open(name);
    return { ...cache, async put() { throw new Error('QuotaExceededError'); } };
  };
  const updated = '<html data-n360-shell="1.3"><body>Conteúdo atualizado da rede</body></html>';
  h.network(async request => responseFor(request.url || request, { html: updated }));
  const result = await h.request('index.html');
  assert.equal(await result.response.text(), updated);
});

test('rede offline encontra conteúdo validado em cache', async () => {
  const h = harness();
  await h.lifecycle('install');
  h.network(async () => { throw new TypeError('offline'); });
  for (const file of ['index.html', 'plano.html', 'studio.html', 'styles.css']) {
    const result = await h.request(file);
    assert.equal(result.response.status, 200);
  }
});

test('HTTP 200 de login é autoritativo e não é substituído pelo conteúdo offline', async () => {
  const h = harness();
  await h.lifecycle('install');
  const login = '<html><form>Entre para continuar</form></html>';
  h.network(async request => responseFor(request.url || request, { html: login }));
  const result = await h.request('index.html');
  assert.equal(await result.response.text(), login);
  h.network(async () => { throw new TypeError('offline'); });
  assert.match(await (await h.request('index.html')).response.text(), /data-n360-shell="1.3"/);
});

test('401, 403 e 404 continuam autoritativos mesmo com uma cópia disponível', async () => {
  const h = harness();
  await h.lifecycle('install');
  for (const status of [401, 403, 404]) {
    h.network(async request => responseFor(request.url || request, { status }));
    const result = await h.request('index.html');
    assert.equal(result.response.status, status);
  }
});

test('erro 503 da rede pode usar a cópia pública previamente validada', async () => {
  const h = harness();
  await h.lifecycle('install');
  h.network(async request => responseFor(request.url || request, { status: 503 }));
  assert.equal((await h.request('index.html')).response.status, 200);
});

test('sem cache nem rede, resposta de indisponibilidade não inventa aplicação pronta', async () => {
  const h = harness();
  h.network(async () => { throw new TypeError('offline'); });
  try {
    const result = await h.request('index.html');
    assert.equal(result.response.status, 503);
  } catch (error) {
    assert.equal(error.name, 'TypeError', 'Um fetch de rede sem cache pode falhar normalmente.');
  }
});

test('apagar o cache impede que um worker ainda controlador recrie a cópia sem novo opt-in', async () => {
  const h = harness();
  await h.lifecycle('install');
  for (const name of await h.caches.keys()) await h.caches.delete(name);
  const result = await h.request('index.html');
  assert.equal(result.response.status, 200);
  assert.deepEqual(await h.caches.keys(), [], 'O fetch após remoção não deve abrir uma cache nova.');
});

test('escopos do mesmo domínio mantêm caches separados e não apagam os da outra instalação', async () => {
  const caches = memoryCaches();
  const old = harness({ caches, revision: 'old' });
  await old.lifecycle('install');
  const oldName = (await caches.keys())[0];
  const other = harness({ caches, revision: 'foreign', scope: 'https://example.invalid/outra-instalacao/' });
  await other.lifecycle('install');
  const otherName = (await caches.keys()).find(name => name !== oldName);
  const current = harness({ caches, revision: 'current' });
  await current.lifecycle('install');
  const currentName = (await caches.keys()).find(name => name !== oldName && name !== otherName);
  assert.ok(otherName && currentName);
  await current.lifecycle('activate');
  assert.equal(await caches.has(oldName), false);
  assert.equal(await caches.has(otherName), true);
  assert.equal(await caches.has(currentName), true);
});
