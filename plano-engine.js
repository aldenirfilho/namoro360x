(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.N360_PLAN=api;})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  const KEY='namoro360x.plan.v1';
  function empty(){return {version:1,done:[],stage:'base',pace:'leve',remember:false};}
  function normalize(value,stages){
    const out=empty();
    if(!value||value.version!==1||value.remember!==true)return out;
    const valid=stages.flatMap(stage=>stage.tasks.map(task=>task.id));
    out.done=Array.isArray(value.done)?[...new Set(value.done.filter(id=>typeof id==='string'&&valid.includes(id)))]:[];
    out.stage=stages.some(stage=>stage.id===value.stage)?value.stage:stages[0].id;
    out.pace=['leve','aberto','pausa'].includes(value.pace)?value.pace:'leve';
    out.remember=true;return out;
  }
  function restore(raw,stages){try{return typeof raw==='string'&&raw.length<=10000?normalize(JSON.parse(raw),stages):empty();}catch{return empty();}}
  function nextTask(state,stages){
    if(state.pace==='pausa')return null;
    const tasks=stages.flatMap(stage=>stage.tasks.map(task=>({...task,stage:stage.id}))).filter(task=>!state.done.includes(task.id));
    return (state.pace==='leve'?tasks.find(task=>task.minutes<=5):tasks[0])||tasks[0]||null;
  }
  function setDone(state,id,checked,stages){
    if(!stages.some(stage=>stage.tasks.some(task=>task.id===id)))return state;
    return {...state,done:checked?[...new Set([...state.done,id])]:state.done.filter(item=>item!==id)};
  }
  const BACKUP_FORMAT='namoro360x-plan-backup';
  const keysExactly=(value,keys)=>value&&typeof value==='object'&&!Array.isArray(value)&&keys.every(key=>Object.hasOwn(value,key))&&Object.keys(value).every(key=>keys.includes(key));
  function exportBackup(state,stages,now=new Date()){
    if(!(now instanceof Date)||!Number.isFinite(now.getTime()))throw new Error('Não foi possível preparar a data do arquivo.');
    const clean=normalize({...state,remember:true},stages);
    return JSON.stringify({format:BACKUP_FORMAT,version:1,createdAt:now.toISOString(),plan:{done:clean.done,stage:clean.stage,pace:clean.pace}},null,2)+'\n';
  }
  function importBackup(raw,stages){
    const error=()=>new Error('Este arquivo não é um progresso compatível do Namoro360X. Seu plano atual foi mantido.');
    if(typeof raw!=='string'||raw.length>10000)throw error();
    let data;try{data=JSON.parse(raw);}catch{throw error();}
    if(!keysExactly(data,['format','version','createdAt','plan'])||data.format!==BACKUP_FORMAT||data.version!==1)throw error();
    if(typeof data.createdAt!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(data.createdAt))throw error();
    const date=new Date(data.createdAt);
    if(!Number.isFinite(date.getTime())||date.toISOString()!==data.createdAt)throw error();
    const plan=data.plan, valid=stages.flatMap(stage=>stage.tasks.map(task=>task.id));
    if(!keysExactly(plan,['done','stage','pace'])||!Array.isArray(plan.done)||plan.done.length>100||!plan.done.every(id=>typeof id==='string'&&valid.includes(id)))throw error();
    if(!stages.some(stage=>stage.id===plan.stage)||!['leve','aberto','pausa'].includes(plan.pace))throw error();
    return {state:{version:1,done:[...new Set(plan.done)],stage:plan.stage,pace:plan.pace,remember:false},createdAt:data.createdAt};
  }
  return {KEY,empty,normalize,restore,nextTask,setDone,exportBackup,importBackup};
});
