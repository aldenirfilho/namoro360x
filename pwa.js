(function () {
  'use strict';
  const $=id=>document.getElementById(id);
  if (!$('install-app')) return;
  const http = location.protocol === 'https:' || location.hostname === '127.0.0.1' || location.hostname === 'localhost';
  const swURL = new URL('sw.js',location.href);
  const cachePrefix='namoro360x-shell-' + encodeURIComponent(new URL('./',location.href).pathname) + '-';
  let deferredPrompt=null;
  function bounded(promise,ms=8000) {
    return new Promise((resolve,reject) => {const timer=setTimeout(() => reject(new Error('timeout')),ms); Promise.resolve(promise).then(value => {clearTimeout(timer); resolve(value);},error => {clearTimeout(timer); reject(error);});});
  }
  function say(id,text) {if($(id)) $(id).textContent=text;}
  function installed() {return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;}
  function showInstallHelp() {if ($('install-help')) $('install-help').showModal();}
  window.addEventListener('beforeinstallprompt',event => {event.preventDefault(); deferredPrompt=event; say('pwa-status','Seu navegador oferece instalação. Use o botão quando quiser.');});
  window.addEventListener('appinstalled',() => {deferredPrompt=null; say('pwa-status','Aplicativo adicionado. Seus dados continuam neste navegador, sem sincronização automática.');});
  $('install-app').addEventListener('click',async () => {
    if (installed()) {say('pwa-status','Você já está usando o aplicativo em uma janela própria.'); return;}
    if (!deferredPrompt) {showInstallHelp(); return;}
    const prompt=deferredPrompt; deferredPrompt=null;
    try {await prompt.prompt(); const result=await prompt.userChoice; say('pwa-status',result.outcome==='accepted' ? 'Pedido de instalação aceito pelo navegador.' : 'Tudo bem. Você pode continuar pelo navegador.');}
    catch {showInstallHelp();}
  });
  $('close-install-help')?.addEventListener('click',() => $('install-help').close());
  say('pwa-status',installed() ? 'Aplicativo aberto em janela própria.' : 'Você pode usar pelo navegador ou consultar como adicionar à tela inicial.');
  if (!http || !('serviceWorker' in navigator) || !('caches' in window)) {
    if ($('enable-offline')) $('enable-offline').disabled=true;
    if ($('remove-offline')) $('remove-offline').disabled=true;
    say('offline-status','A cópia offline pelo navegador requer HTTPS ou localhost e suporte a service worker. O HTML portátil continua disponível.'); return;
  }
  async function registration() {
    const reg = await bounded(navigator.serviceWorker.getRegistration(swURL));
    const worker=reg?.active || reg?.installing || reg?.waiting;
    return worker?.scriptURL === swURL.href ? reg : null;
  }
  async function refreshStatus() {
    const keys=await bounded(caches.keys());
    say('offline-status',keys.some(key => key.startsWith(cachePrefix)) ? 'Cópia do conteúdo geral disponível neste navegador. Rascunhos e respostas do ensaio não são guardados.' : 'Uso offline desativado. Ative apenas se quiser guardar o conteúdo geral neste aparelho.');
  }
  $('enable-offline')?.addEventListener('click',async () => {
    $('enable-offline').disabled=true;
    say('offline-status','Preparando uma cópia do conteúdo geral. Aguarde a confirmação.');
    try {
      const reg=await bounded(navigator.serviceWorker.register(swURL,{scope:new URL('./',location.href).pathname}));
      if (reg.installing) {
        const worker=reg.installing;
        await new Promise((resolve,reject) => {
          const timeout=setTimeout(() => reject(new Error('timeout')),20000);
          const check=() => {
            if (worker.state === 'activated' || worker.state === 'installed') {clearTimeout(timeout); resolve();}
            else if (worker.state === 'redundant') {clearTimeout(timeout); reject(new Error('cache'));}
          };
          worker.addEventListener('statechange',check); check();
        });
      }
      await refreshStatus();
    } catch {say('offline-status','Não foi possível confirmar a cópia offline neste navegador. Continue online ou baixe o HTML portátil. Você pode tentar novamente.');}
    finally {$('enable-offline').disabled=false;}
  });
  $('remove-offline')?.addEventListener('click',async () => {
    try {
      const reg=await registration(); if(reg) await bounded(reg.unregister());
      const keys=await bounded(caches.keys()); await bounded(Promise.all(keys.filter(key=>key.startsWith(cachePrefix)).map(key=>caches.delete(key))));
      say('offline-status','Cópia offline removida. Feche as abas deste aplicativo para encerrar o controle anterior. Suas escolhas locais têm controles separados no plano e no guia.');
    } catch {say('offline-status','Não foi possível remover a cópia. Use as configurações do navegador para limpar os dados deste site.');}
  });
  say('offline-status','Conferindo se existe uma cópia offline neste navegador…');
  registration().then(async reg => {await refreshStatus(); if(reg) bounded(reg.update()).catch(() => {});}).catch(() => say('offline-status','Não foi possível verificar a cópia offline neste navegador. As ferramentas online e o HTML portátil continuam disponíveis.'));
}());
