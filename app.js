(function () {
  'use strict';
  const C = window.N360_CONTENT, E = window.N360_ENGINE;
  if (!C || !E) return;
  const $ = id => document.getElementById(id);
  const make = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };
  const KEY = 'namoro360x.preferences.v1';
  let raw = null;
  try { raw = localStorage.getItem(KEY); } catch { /* Private or restricted browser: session memory remains usable. */ }
  let state = E.restoreState(raw,C), selectedScript = C.scripts[0], invitation = null, toastTimer;
  let filteredActivities = [];
  let selectedPath = null;
  const motion = () => state.focus || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
  function toast(text) { clearTimeout(toastTimer); $('toast').textContent = text; $('toast').hidden = false; toastTimer = setTimeout(() => { $('toast').hidden = true; }, 4200); }
  function persist() {
    if (!state.remember) return;
    try { localStorage.setItem(KEY,JSON.stringify({...state,version:1})); $('storage-status').textContent = 'Somente etapas, favoritas e modo foco são guardados neste navegador.'; }
    catch { state.remember = false; $('remember-toggle').checked = false; $('storage-status').textContent = 'O navegador não permitiu guardar escolhas. Você pode continuar usando tudo nesta sessão.'; }
  }
  function renderStages() {
    const nav = $('stage-nav'); nav.replaceChildren();
    C.stages.forEach((stage,i) => {
      const button = make('button','stage-button' + (i === state.stage ? ' active' : '') + (state.done.includes(stage.id) ? ' done' : ''));
      button.type = 'button'; button.setAttribute('aria-controls','stage-panel');
      if (i === state.stage) button.setAttribute('aria-current','step');
      button.append(make('span','stage-number',String(i + 1).padStart(2,'0')),make('span','',stage.eyebrow.split(' · ').slice(1).join(' · ') || stage.title),make('span','stage-state',state.done.includes(stage.id) ? '✓' : '↗'));
      button.addEventListener('click',() => { state.stage = i; renderStages(); persist(); $('stage-nav').querySelector('[aria-current]').focus({preventScroll:true}); }); nav.append(button);
    });
    const stage = C.stages[state.stage], panel = $('stage-panel'); panel.replaceChildren();
    panel.append(make('p','eyebrow',stage.eyebrow));
    const title = make('h3','',stage.title); title.id = 'stage-title'; panel.append(title,make('p','lead',stage.summary));
    const action = make('div','stage-action'); action.append(make('h4','','Uma experiência possível'),make('p','',stage.action)); panel.append(action);
    const tip = make('div','stage-tip'); tip.append(make('strong','','Um cuidado que ajuda'),make('p','',stage.tip)); panel.append(tip);
    panel.append(make('blockquote','',stage.prompt),make('p','muted',stage.avoid));
    const controls = make('div','stage-controls');
    const mark = make('button','button secondary small',state.done.includes(stage.id) ? 'Desmarcar experiência' : 'Já experimentei este passo'); mark.type = 'button'; mark.setAttribute('aria-pressed',String(state.done.includes(stage.id)));
    mark.addEventListener('click',() => { state.done = state.done.includes(stage.id) ? state.done.filter(id => id !== stage.id) : [...state.done,stage.id]; renderStages(); persist(); $('stage-panel').querySelector('button').focus({preventScroll:true}); });
    const next = make('button','button subtle small',state.stage === C.stages.length - 1 ? 'Voltar ao começo' : 'Explorar outro passo →'); next.type = 'button';
    next.addEventListener('click',() => { state.stage = (state.stage + 1) % C.stages.length; renderStages(); persist(); $('stage-panel').querySelector('h3').tabIndex = -1; $('stage-panel').querySelector('h3').focus({preventScroll:true}); });
    controls.append(mark,next); panel.append(controls);
    $('journey-progress').textContent = state.done.length ? state.done.length + ' de ' + C.stages.length + ' experiências marcadas por você. Retome quando quiser.' : 'Nenhuma tarefa obrigatória. Marque uma experiência somente se isso ajudar você a retomar.';
    $('progress-fill').style.width = (100 * state.done.length / C.stages.length) + '%';
  }
  function getFilters() { return {query:$('activity-search').value,category:$('activity-category').value,energy:$('activity-energy').value,budget:$('activity-budget').value,favorites:$('only-favorites').checked}; }
  function renderActivities() {
    filteredActivities = E.filterActivities(C.activities,getFilters(),state.favorites);
    const grid = $('activity-grid'); grid.replaceChildren();
    $('activity-count').textContent = filteredActivities.length + (filteredActivities.length === 1 ? ' ideia encontrada' : ' ideias encontradas');
    if (!filteredActivities.length) { const empty = make('div','empty-state'); empty.append(make('h3','','Vamos ampliar as possibilidades?'),make('p','','Nenhuma ideia combina com estes filtros. Você pode limpar os filtros ou marcar uma favorita na lista completa.')); grid.append(empty); return; }
    filteredActivities.forEach(a => {
      const card = make('article','activity-card'); card.id = 'atividade-' + a.id;
      const meta = make('div','card-meta'); meta.append(make('span','tag',a.category),make('span','muted',a.duration));
      card.append(meta,make('h3','card-title',a.title),make('p','',a.description));
      const details = make('details',''); details.append(make('summary','','Assunto e conforto')); const body = make('div','guide-body'); body.append(make('p','',a.conversation),make('p','muted',a.accessibility)); details.append(body); card.append(details);
      card.append(make('p','muted',(a.energy === 'baixa' ? 'Mais tranquila' : 'Com movimento') + ' · ' + (a.budget === 'gratis' ? 'Sem gasto previsto' : 'Baixo custo a conferir')));
      const footer = make('div','card-footer');
      const choose = make('button','button secondary small','Usar no convite'); choose.type = 'button'; choose.addEventListener('click',() => { $('plan-activity').value = a.id; invalidateInvitation(); $('encontro').scrollIntoView({behavior:motion()}); $('plan-place').focus({preventScroll:true}); toast('Atividade escolhida. Complete o lugar do encontro.'); });
      const saved = state.favorites.includes(a.id), favorite = make('button','button subtle small',saved ? '♥ Favorita' : '♡ Favoritar'); favorite.type = 'button'; favorite.setAttribute('aria-label',(saved ? 'Remover das favoritas: ' : 'Favoritar: ') + a.title); favorite.setAttribute('aria-pressed',String(saved));
      favorite.addEventListener('click',() => { state.favorites = saved ? state.favorites.filter(id => id !== a.id) : [...state.favorites,a.id]; renderActivities(); persist(); const target = $('atividade-' + a.id); if (target) target.querySelector('[aria-pressed]').focus({preventScroll:true}); else $('only-favorites').focus({preventScroll:true}); toast(saved ? 'Ideia removida das favoritas.' : 'Ideia marcada como favorita.'); });
      footer.append(choose,favorite); card.append(footer); grid.append(card);
    });
  }
  function renderScripts() {
    const list = $('script-list'); list.replaceChildren();
    C.scripts.forEach(s => { const b = make('button','script-button' + (s.id === selectedScript.id ? ' active' : ''),s.title); b.type = 'button'; b.setAttribute('aria-pressed',String(s.id === selectedScript.id)); b.addEventListener('click',() => {selectedScript = s; renderScripts(); $('script-list').querySelector('[aria-pressed="true"]').focus({preventScroll:true});}); list.append(b); });
    $('script-context').textContent = selectedScript.context; $('script-title').textContent = selectedScript.title; $('script-text').textContent = selectedScript.text; $('script-note').textContent = selectedScript.note; $('script-status').textContent = '';
  }
  async function copy(text, status) {
    try { if (!navigator.clipboard || !window.isSecureContext) throw new Error('manual'); await navigator.clipboard.writeText(text); $(status).textContent = 'Copiado. Revise e compartilhe somente se quiser.'; }
    catch { $('manual-copy').value = text; $('copy-dialog').showModal(); $('manual-copy').focus(); $('manual-copy').select(); $(status).textContent = 'Cópia automática indisponível. O texto está aberto para seleção manual.'; }
  }
  function readPlan() { return {activity:$('plan-activity').value,place:$('plan-place').value,city:$('plan-city').value,date:$('plan-date').value,duration:$('plan-duration').value,tone:$('plan-tone').value,note:$('plan-note').value}; }
  function invalidateInvitation() { if (!invitation) return; invitation = null; $('invitation-text').hidden = true; $('invitation-actions').hidden = true; $('invitation-empty').hidden = false; $('invitation-empty').textContent = 'Você mudou o plano. Prepare novamente o convite para atualizar a prévia.'; $('invitation-status').textContent = ''; }
  function download(contents, filename, type) { const blob = new Blob([contents],{type}); const url = URL.createObjectURL(blob), anchor = make('a',''); anchor.href = url; anchor.download = filename; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url),1000); }
  function renderGuides() {
    C.guides.forEach(g => { const d = make('details','guide-card'), b = make('div','guide-body'); d.append(make('summary','',g.title)); g.body.split('\n\n').forEach(p => b.append(make('p','',p))); const exercise = make('div','stage-tip'); exercise.append(make('strong','','Se quiser experimentar'),make('p','',g.exercise)); b.append(exercise); d.append(b); $('guides-grid').append(d); });
    C.sources.forEach(s => { const li = make('li',''), a = make('a','',s.title); if (!s.url.startsWith('https://')) return; a.href = s.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; li.append(a,make('p','muted',s.note)); $('sources-list').append(li); });
  }
  function renderFocus() { document.body.classList.toggle('reduced-load',state.focus); $('focus-toggle').setAttribute('aria-pressed',String(state.focus)); $('focus-toggle').textContent = state.focus ? 'Sair do modo foco' : 'Modo foco'; }
  function renderPaths() {
    const grid = $('starting-grid'); grid.replaceChildren();
    C.paths.forEach(path => {
      const button = make('button','starting-card'); button.type = 'button';
      button.setAttribute('aria-controls','starting-result'); button.setAttribute('aria-pressed','false');
      const icon = make('span','starting-icon',path.icon); icon.setAttribute('aria-hidden','true');
      button.append(icon,make('span','card-title',path.title),make('span','',path.description),make('span','starting-link','Explorar este começo ↗'));
      button.addEventListener('click',() => {
        selectedPath = path;
        grid.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed',String(b === button)));
        $('starting-result').hidden = false; $('starting-result-title').textContent = path.resultTitle; $('starting-result-text').textContent = path.result;
        $('starting-primary').textContent = path.primary; $('starting-primary').href = '#' + path.target;
      }); grid.append(button);
    });
  }
  $('starting-primary').addEventListener('click',() => {
    if (!selectedPath) return;
    if (selectedPath.target === 'atividades') {
      $('activity-search').value = ''; $('activity-category').value = selectedPath.category; $('activity-energy').value = selectedPath.energy;
      $('activity-budget').value = ''; $('only-favorites').checked = false; renderActivities();
    }
  });
  $('starting-script').addEventListener('click',() => {
    if (!selectedPath) return;
    selectedScript = C.scripts.find(s => s.id === selectedPath.scriptId) || C.scripts[0]; renderScripts();
  });
  $('group-invitation').addEventListener('click',() => { $('plan-tone').value = 'grupo'; invalidateInvitation(); });
  [...new Set(C.activities.map(a => a.category))].forEach(category => { const option = make('option','',category); option.value = category; $('activity-category').append(option); });
  C.activities.forEach(a => { const option = make('option','',a.title); option.value = a.id; $('plan-activity').append(option); });
  ['activity-search','activity-category','activity-energy','activity-budget','only-favorites'].forEach(id => $(id).addEventListener(id === 'activity-search' ? 'input' : 'change',renderActivities));
  $('reset-filters').addEventListener('click',() => { ['activity-search','activity-category','activity-energy','activity-budget'].forEach(id => $(id).value = ''); $('only-favorites').checked = false; renderActivities(); });
  $('suggest-activity').addEventListener('click',() => { if (!filteredActivities.length) {toast('Limpe ou ajuste os filtros para encontrar uma ideia.'); return;} const a = filteredActivities[Math.floor(Math.random() * filteredActivities.length)]; $('plan-activity').value = a.id; invalidateInvitation(); toast('Sugestão: ' + a.title + '. Você pode usar no convite.'); const card = $('atividade-' + a.id); card.scrollIntoView({block:'center'}); card.tabIndex = -1; card.focus({preventScroll:true}); });
  $('copy-script').addEventListener('click',() => copy(selectedScript.text,'script-status'));
  $('practice-text').addEventListener('input',() => { const length = $('practice-text').value.trim().length; $('practice-feedback').textContent = length ? length + ' caracteres. ' + (length > 350 ? 'Talvez você queira guardar parte desse assunto para a conversa. A decisão é sua.' : 'Leia em voz baixa: parece algo que você diria?') : 'Experimente escrever uma ideia por vez. Não existe um tamanho perfeito.'; });
  $('clear-practice').addEventListener('click',() => { $('practice-text').value = ''; $('practice-text').dispatchEvent(new Event('input')); });
  $('invitation-form').addEventListener('input',invalidateInvitation); $('invitation-form').addEventListener('change',invalidateInvitation);
  $('invitation-form').addEventListener('submit',event => { event.preventDefault(); try {invitation = E.buildInvitation(readPlan(),C.activities); $('invitation-text').textContent = invitation.text; $('invitation-text').hidden = false; $('invitation-empty').hidden = true; $('invitation-actions').hidden = false; $('download-calendar').disabled = !invitation.date; $('invitation-status').textContent = invitation.date ? 'Convite preparado. A agenda será uma sugestão provisória, não uma confirmação do encontro.' : 'Convite preparado. Defina uma data se quiser baixar para a agenda.';} catch(error) { invitation = null; $('invitation-text').hidden = true; $('invitation-actions').hidden = true; $('invitation-empty').hidden = false; $('invitation-status').textContent = error.message; } });
  $('copy-invitation').addEventListener('click',() => {if(invitation) copy(invitation.text,'invitation-status');});
  $('download-invitation').addEventListener('click',() => {if(invitation) {download(invitation.text,'convite-namoro360x.txt','text/plain;charset=utf-8'); $('invitation-status').textContent = 'Texto preparado para download. Confira a pasta de downloads do seu navegador.';}});
  $('download-calendar').addEventListener('click',() => {if(!invitation) return; try { const uid = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : String(Date.now()); download(E.createCalendar(invitation,uid),'encontro-namoro360x.ics','text/calendar;charset=utf-8'); $('invitation-status').textContent = 'Arquivo de agenda preparado. Importe e confira o horário antes de compartilhar. Ninguém foi notificado.'; } catch(error) {$('invitation-status').textContent = error.message;} });
  $('close-copy').addEventListener('click',() => $('copy-dialog').close());
  $('remember-toggle').checked = state.remember;
  $('remember-toggle').addEventListener('change',() => { state.remember = $('remember-toggle').checked; if (state.remember) persist(); else {try {localStorage.removeItem(KEY); $('storage-status').textContent = 'Escolhas removidas do armazenamento. O que fizer agora fica somente nesta sessão.';} catch {$('storage-status').textContent = 'Não foi possível acessar o armazenamento. Para remover escolhas antigas, limpe os dados deste site nas configurações do navegador.';}} });
  $('focus-toggle').addEventListener('click',() => { state.focus = !state.focus; renderFocus(); persist(); toast(state.focus ? 'Modo foco ligado: menos elementos decorativos.' : 'Modo foco desligado.'); });
  $('clear-data').addEventListener('click',() => {
    state = E.restoreState(null,C); let cleared = true;
    try {localStorage.removeItem(KEY);} catch {cleared = false;}
    $('remember-toggle').checked = false;
    ['activity-search','activity-category','activity-energy','activity-budget'].forEach(id => $(id).value = '');
    $('only-favorites').checked = false;
    selectedPath = null; $('starting-result').hidden = true; renderPaths();
    selectedScript = C.scripts[0]; renderScripts();
    $('practice-text').value = ''; $('practice-text').dispatchEvent(new Event('input'));
    $('invitation-form').reset(); invitation = null;
    $('invitation-text').textContent = ''; $('invitation-text').hidden = true;
    $('invitation-empty').textContent = 'Escolha uma atividade e um lugar para preparar um convite com a sua cara.';
    $('invitation-empty').hidden = false; $('invitation-actions').hidden = true; $('invitation-status').textContent = '';
    $('manual-copy').value = ''; $('copy-dialog').close();
    clearTimeout(toastTimer); $('toast').hidden = true;
    renderStages(); renderActivities(); renderFocus();
    $('storage-status').textContent = cleared ? 'Suas escolhas e rascunhos foram apagados deste navegador.' : 'A sessão foi limpa. Para remover escolhas antigas, limpe os dados deste site nas configurações do navegador.';
  });
  function closeMenu() {$('main-nav').dataset.open = 'false'; $('nav-toggle').setAttribute('aria-expanded','false'); $('nav-toggle').setAttribute('aria-label','Abrir menu');}
  $('nav-toggle').addEventListener('click',() => { const open = $('nav-toggle').getAttribute('aria-expanded') !== 'true'; $('main-nav').dataset.open = String(open); $('nav-toggle').setAttribute('aria-expanded',String(open)); $('nav-toggle').setAttribute('aria-label',open ? 'Fechar menu' : 'Abrir menu'); });
  $('main-nav').querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu)); document.addEventListener('keydown',event => {if(event.key === 'Escape') closeMenu();});
  renderPaths(); renderStages(); renderActivities(); renderScripts(); renderGuides(); renderFocus();
}());
