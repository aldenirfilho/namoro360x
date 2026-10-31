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
  return {KEY,empty,normalize,restore,nextTask,setDone};
});
