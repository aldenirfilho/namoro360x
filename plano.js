(function(){
  'use strict';
  const data=window.N360_PLAN_DATA,engine=window.N360_PLAN;
  const $=id=>document.getElementById(id);
  const labels={hoje:'Hoje',plano:'Meu plano',sinais:'Reciprocidade',conversas:'Conversas',cuidado:'Cuidados'};
  let state=engine.empty(),selectedMessage=data.messages[0],toastTimer,pendingBackup=null,readTicket=0,lastCompletedId=null;
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
    $('expand-pace').hidden=!!task||state.pace!=='leve'||state.done.length===total;
    if(lastCompletedId&&!state.done.includes(lastCompletedId))lastCompletedId=null;
    $('undo-step').hidden=!lastCompletedId;
    $('resume-step').textContent=task?'Ver este passo na etapa':'Revisar minhas etapas';
    $('next-stage').textContent=task?'Etapa: '+data.stages.find(stage=>stage.id===task.stage).short:'Você escolhe quando continuar.';
    if(task){$('next-title').textContent=task.title;$('next-description').textContent=task.description;$('step-time').textContent=task.minutes+' min';$('complete-next').textContent='Concluí este passo ✓';}
    else if(state.pace==='pausa'){$('next-title').textContent='Hoje pode ser um dia de pausa.';$('next-description').textContent='Cuide do básico, procure uma companhia amiga ou faça algo que te acalme. Retome quando fizer sentido.';$('step-time').textContent='Seu tempo';$('complete-next').textContent='Pausa escolhida';}
    else if(state.done.length<total){$('next-title').textContent='Os próximos passos pedem mais tempo.';$('next-description').textContent='Você concluiu os passos de até 5 minutos. Pode encerrar por hoje ou escolher até 15 minutos quando tiver espaço.';$('step-time').textContent='Sem pressa';$('complete-next').textContent='Escolha outro ritmo para continuar';}
    else{$('next-title').textContent='Você percorreu todos os passos.';$('next-description').textContent='Escolha o que quer repetir, ajustar ou conversar. Isso não depende de já ter iniciado um relacionamento.';$('step-time').textContent='Reavaliar';$('complete-next').textContent='Passos revisados ✓';}
    $('remember-plan').checked=state.remember;
  }
  function renderStage(){
    const tabs=$('stage-tabs');tabs.replaceChildren();
    data.stages.forEach((stage,index)=>{const button=element('button',null);button.type='button';button.setAttribute('aria-pressed',String(stage.id===state.stage));button.append(element('span',null,String(index+1).padStart(2,'0')),document.createTextNode(stage.short));button.addEventListener('click',()=>{state.stage=stage.id;save();renderStage();renderProgress();const buttons=tabs.querySelectorAll('button');buttons[index].focus();});tabs.append(button);});
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
  $('complete-next').addEventListener('click',()=>{const task=engine.nextTask(state,data.stages);if(!task)return;lastCompletedId=task.id;state=engine.setDone(state,task.id,true,data.stages);save();renderStage();renderProgress();if($('complete-next').disabled)$('undo-step').focus();toast('Passo marcado. Você pode encerrar por hoje.');});
  $('undo-step').addEventListener('click',()=>{if(!lastCompletedId)return;state=engine.setDone(state,lastCompletedId,false,data.stages);lastCompletedId=null;save();renderStage();renderProgress();$('resume-step').focus();toast('Última marcação desfeita.');});
  $('expand-pace').addEventListener('click',()=>{state.pace='aberto';save();renderProgress();$('complete-next').focus();});
  $('resume-step').addEventListener('click',()=>{const task=engine.nextTask(state,data.stages);if(task){state.stage=task.stage;save();renderStage();renderProgress();}});
  $('remember-plan').addEventListener('change',()=>{
    state.remember=$('remember-plan').checked;
    if(state.remember){save();return;}
    try{localStorage.removeItem(engine.KEY);$('storage-status').textContent='Cópia salva removida. As escolhas atuais ficam somente nesta aba.';}
    catch{$('storage-status').textContent='Não foi possível confirmar a remoção. Use as configurações do navegador para apagar os dados deste site.';}
  });
  function clearPendingBackup(){pendingBackup=null;readTicket++;$('restore-dialog').close();$('import-plan').value='';}
  $('export-plan').addEventListener('click',()=>{
    try{
      const text=engine.exportBackup(state,data.stages),url=URL.createObjectURL(new Blob([text],{type:'application/json;charset=utf-8'}));
      const link=element('a');link.href=url;link.download='namoro360x-progresso.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
      $('backup-status').textContent='Arquivo preparado. Confira Downloads e guarde uma cópia em um lugar seu. Ele contém somente passos, etapa e ritmo.';
    }catch{$('backup-status').textContent='Não foi possível preparar o arquivo. Seu progresso continua nesta aba.';}
  });
  $('import-plan').addEventListener('change',async()=>{
    const file=$('import-plan').files?.[0],ticket=++readTicket;
    pendingBackup=null;$('import-plan').value='';if(!file)return;
    if(file.size>10000){$('backup-status').textContent='O arquivo excede 10 KB. Escolha um progresso exportado pelo Namoro360X. Seu plano atual foi mantido.';return;}
    $('backup-status').textContent='Lendo o arquivo neste aparelho…';
    try{
      const text=await file.text();if(ticket!==readTicket)return;
      const backup=engine.importBackup(text,data.stages),stage=data.stages.find(item=>item.id===backup.state.stage);
      pendingBackup=backup;
      const pace={leve:'5 minutos',aberto:'15 minutos',pausa:'Pausa'}[backup.state.pace];
      const created=new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(new Date(backup.createdAt));
      $('restore-summary').textContent='Arquivo criado em '+created+'. '+backup.state.done.length+' de '+data.stages.flatMap(item=>item.tasks).length+' passos marcados. Etapa: '+stage.title+'. Ritmo: '+pace+'.';
      $('backup-status').textContent='Arquivo conferido. Seu plano só muda se você confirmar a restauração.';
      $('restore-dialog').showModal();$('cancel-restore').focus();
    }catch(error){if(ticket===readTicket){pendingBackup=null;$('backup-status').textContent=error.message||'Não foi possível ler esse arquivo. Seu plano atual foi mantido.';}}
  });
  $('cancel-restore').addEventListener('click',()=>{clearPendingBackup();$('backup-status').textContent='Restauração cancelada. Seu plano atual foi mantido.';});
  $('restore-dialog').addEventListener('cancel',()=>{clearPendingBackup();$('backup-status').textContent='Restauração cancelada. Seu plano atual foi mantido.';});
  $('confirm-restore').addEventListener('click',()=>{
    if(!pendingBackup)return;
    const remember=state.remember;
    state={...pendingBackup.state,remember};lastCompletedId=null;clearPendingBackup();save();renderStage();renderProgress();
    $('backup-status').textContent=state.remember?'Progresso restaurado e salvo neste navegador.':'Progresso restaurado nesta aba. Para conservar após fechar, escolha guardar seus passos ou baixe outra cópia.';
    toast('Seu plano foi restaurado. Retome no seu ritmo.');
  });
  $('reset-plan').addEventListener('click',()=>{$('reset-dialog').showModal();$('cancel-reset').focus();});
  $('cancel-reset').addEventListener('click',()=>{$('reset-dialog').close();});
  $('confirm-reset').addEventListener('click',()=>{
    clearPendingBackup();$('backup-status').textContent='';
    let removed=true;try{localStorage.removeItem(engine.KEY);}catch{removed=false;}
    state=engine.empty();lastCompletedId=null;renderStage();renderProgress();$('storage-status').textContent=removed?'Passos reiniciados. O salvamento está desativado.':'Passos reiniciados nesta aba. Não foi possível confirmar a remoção salva; apague os dados deste site nas configurações do navegador.';$('reset-dialog').close();toast('Você pode recomeçar no seu tempo.');
  });
  window.addEventListener('hashchange',()=>navigate(false));
  renderStage();renderProgress();renderScenario();renderMessage();navigate(true);
})();
