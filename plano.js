(function(){
  'use strict';
  const data=window.N360_PLAN_DATA,engine=window.N360_PLAN;
  const $=id=>document.getElementById(id);
  const labels={hoje:'Hoje',plano:'Meu plano',sinais:'Reciprocidade',conversas:'Conversas',cuidado:'Cuidados'};
  let state=engine.empty(),selectedMessage=data.messages[0],toastTimer;
  try{state=engine.restore(localStorage.getItem(engine.KEY),data.stages);}catch{$('storage-status').textContent='Este navegador não permite salvar. Você pode usar o plano nesta aba.';}
  function element(tag,className,text){const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;}
  function toast(message){clearTimeout(toastTimer);$('plan-toast').textContent=message;$('plan-toast').hidden=false;toastTimer=setTimeout(()=>{$('plan-toast').hidden=true;},4500);}
  function save(){
    if(!state.remember)return;
    try{localStorage.setItem(engine.KEY,JSON.stringify(state));$('storage-status').textContent='Escolhas salvas somente neste navegador.';}
    catch{state.remember=false;$('remember-plan').checked=false;$('storage-status').textContent='Não foi possível salvar. Seu progresso continua nesta aba; verifique as configurações do navegador antes de fechar.';}
  }
  function navigate(initial){
    const wanted=location.hash.slice(1),view=Object.hasOwn(labels,wanted)?wanted:'hoje';
    document.querySelectorAll('.view').forEach(section=>{section.hidden=section.id!==view;});
    document.querySelectorAll('[data-view]').forEach(link=>{if(link.dataset.view===view)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
    $('view-label').textContent=labels[view];document.title=labels[view]+' • Namoro360X';
    if(!initial){$(view).querySelector('h1').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
  }
  function renderProgress(){
    const total=data.stages.reduce((n,stage)=>n+stage.tasks.length,0);
    $('progress-text').textContent=state.done.length+' de '+total+' passos';$('plan-progress').max=total;$('plan-progress').value=state.done.length;$('plan-progress').textContent=state.done.length+' de '+total;
    document.querySelectorAll('[data-pace]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.pace===state.pace)));
    const notes={leve:'Uma pequena ação já é suficiente. Depois, siga seu dia.',aberto:'Você tem um pouco mais de espaço. Faça uma ação com atenção, sem precisar acumular tarefas.',pausa:'Pausar faz parte. Seu progresso continua aqui nesta aba; salvar para depois é uma escolha sua.'};
    $('pace-note').textContent=notes[state.pace];const task=engine.nextTask(state,data.stages);
    $('complete-next').disabled=!task;
    if(task){$('next-title').textContent=task.title;$('next-description').textContent=task.description;$('step-time').textContent=task.minutes+' min';$('complete-next').textContent='Concluí este passo ✓';}
    else if(state.pace==='pausa'){$('next-title').textContent='Hoje pode ser um dia de pausa.';$('next-description').textContent='Cuide do básico, procure uma companhia amiga ou faça algo que te acalme. Retome quando fizer sentido.';$('step-time').textContent='Seu tempo';$('complete-next').textContent='Pausa escolhida';}
    else{$('next-title').textContent='Você percorreu todos os passos.';$('next-description').textContent='Escolha o que quer repetir, ajustar ou conversar. Isso não depende de já ter iniciado um relacionamento.';$('step-time').textContent='Reavaliar';$('complete-next').textContent='Passos revisados ✓';}
    $('remember-plan').checked=state.remember;
  }
  function renderStage(){
    const tabs=$('stage-tabs');tabs.replaceChildren();
    data.stages.forEach((stage,index)=>{const button=element('button',null);button.type='button';button.setAttribute('aria-pressed',String(stage.id===state.stage));button.append(element('span',null,String(index+1).padStart(2,'0')),document.createTextNode(stage.short));button.addEventListener('click',()=>{state.stage=stage.id;save();renderStage();const buttons=tabs.querySelectorAll('button');buttons[index].focus();});tabs.append(button);});
    const stage=data.stages.find(item=>item.id===state.stage)||data.stages[0];
    $('stage-number').textContent=String(data.stages.indexOf(stage)+1).padStart(2,'0');$('stage-kicker').textContent=stage.kicker;$('stage-title').textContent=stage.title;$('stage-description').textContent=stage.description;$('stage-note').textContent=stage.note;
    $('task-list').replaceChildren();
    stage.tasks.forEach(task=>{const label=element('label','task-row'),check=element('input');check.type='checkbox';check.checked=state.done.includes(task.id);check.dataset.task=task.id;const description=element('span');description.append(element('strong',null,task.title),element('small',null,task.description));label.append(check,description,element('span','task-time',task.minutes+' min'));check.addEventListener('change',()=>{state=engine.setDone(state,task.id,check.checked,data.stages);save();renderProgress();toast(check.checked?'Passo marcado. Você pode retomar quando quiser.':'Marcação removida. Seu ritmo continua sendo seu.');});$('task-list').append(label);});
  }
  function renderScenario(){const item=data.scenarios.find(s=>s.id===$('scenario').value)||data.scenarios[0];$('signal-label').textContent=item.label;$('signal-title').textContent=item.title;$('signal-explanation').textContent=item.explanation;$('signal-action').textContent=item.action;}
  data.scenarios.forEach(item=>{const option=element('option',null,item.option);option.value=item.id;$('scenario').append(option);});$('scenario').addEventListener('change',renderScenario);
  function renderMessage(){
    $('message-context').textContent=selectedMessage.context;$('message-title').textContent=selectedMessage.title;$('message-text').textContent=selectedMessage.text;$('message-note').textContent=selectedMessage.note;$('copy-status').textContent='';
    document.querySelectorAll('[data-message]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.message===selectedMessage.id)));
  }
  data.messages.forEach(item=>{const button=element('button',null,item.label);button.type='button';button.dataset.message=item.id;button.addEventListener('click',()=>{selectedMessage=item;renderMessage();});$('message-options').append(button);});
  $('copy-message').addEventListener('click',async()=>{try{if(!navigator.clipboard?.writeText)throw new Error('clipboard unavailable');await navigator.clipboard.writeText(selectedMessage.text);$('copy-status').textContent='Copiado. Revise e adapte antes de usar.';}catch{$('copy-fallback').value=selectedMessage.text;$('copy-dialog').showModal();$('copy-fallback').focus();$('copy-fallback').select();$('copy-status').textContent='Use a janela para copiar o texto manualmente.';}});
  document.querySelectorAll('[data-pace]').forEach(button=>button.addEventListener('click',()=>{state.pace=button.dataset.pace;save();renderProgress();}));
  $('complete-next').addEventListener('click',()=>{const task=engine.nextTask(state,data.stages);if(!task)return;state=engine.setDone(state,task.id,true,data.stages);save();renderStage();renderProgress();toast('Passo marcado. Você pode encerrar por hoje.');});
  $('remember-plan').addEventListener('change',()=>{
    state.remember=$('remember-plan').checked;
    if(state.remember){save();return;}
    try{localStorage.removeItem(engine.KEY);$('storage-status').textContent='Cópia salva removida. As escolhas atuais ficam somente nesta aba.';}
    catch{$('storage-status').textContent='Não foi possível confirmar a remoção. Use as configurações do navegador para apagar os dados deste site.';}
  });
  $('reset-plan').addEventListener('click',()=>{$('reset-dialog').showModal();$('cancel-reset').focus();});
  $('cancel-reset').addEventListener('click',()=>{$('reset-dialog').close();});
  $('confirm-reset').addEventListener('click',()=>{
    let removed=true;try{localStorage.removeItem(engine.KEY);}catch{removed=false;}
    state=engine.empty();renderStage();renderProgress();$('storage-status').textContent=removed?'Passos reiniciados. O salvamento está desativado.':'Passos reiniciados nesta aba. Não foi possível confirmar a remoção salva; apague os dados deste site nas configurações do navegador.';$('reset-dialog').close();toast('Você pode recomeçar no seu tempo.');
  });
  window.addEventListener('hashchange',()=>navigate(false));
  renderStage();renderProgress();renderScenario();renderMessage();navigate(true);
})();
