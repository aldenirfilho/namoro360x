const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const engine=require('../plano-engine.js');
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../plano-data.js'),'utf8'),context);
const stages=JSON.parse(JSON.stringify(context.window.N360_PLAN_DATA.stages));

test('saved progress is restored only with explicit opt-in',()=>{
  assert.deepEqual(engine.restore(JSON.stringify({version:1,done:['valores'],remember:false}),stages),engine.empty());
  assert.deepEqual(engine.restore(JSON.stringify({version:1,done:['valores'],remember:true}),stages).done,['valores']);
});
test('corrupt, oversized and unsupported stored versions safely start fresh',()=>{
  for(const raw of ['{broken','x'.repeat(10001),'null',JSON.stringify({version:2,remember:true,done:['valores']})])assert.deepEqual(engine.restore(raw,stages),engine.empty());
});
test('restoration discards unknown identifiers, duplicates and arbitrary fields',()=>{
  const state=engine.restore(JSON.stringify({version:1,remember:true,done:['valores','valores','unknown',{},null],stage:'invalid',pace:'invalid',name:'private'}),stages);
  assert.deepEqual(state,{version:1,remember:true,done:['valores'],stage:'base',pace:'leve'});
});
test('short pace selects a possible short action; pause suggests no task',()=>{
  const state={...engine.empty(),done:stages[0].tasks.map(t=>t.id).concat('canal')};
  assert.equal(engine.nextTask(state,stages).id,'abertura');
  assert.equal(engine.nextTask({...state,pace:'aberto'},stages).id,'perfil');
  assert.equal(engine.nextTask({...state,pace:'pausa'},stages),null);
});
test('completed tasks are never suggested again and all-complete is terminal',()=>{
  const state={...engine.empty(),done:stages.flatMap(s=>s.tasks.map(t=>t.id))};
  assert.equal(engine.nextTask(state,stages),null);
  const undone=engine.setDone(state,'valores',false,stages);
  assert.equal(engine.nextTask(undone,stages).id,'valores');
  assert.equal(state.done.length,12);
});
test('marking is reversible, idempotent and rejects unknown tasks',()=>{
  let state=engine.empty();state=engine.setDone(state,'valores',true,stages);state=engine.setDone(state,'valores',true,stages);
  assert.deepEqual(state.done,['valores']);assert.equal(engine.setDone(state,'private-person',true,stages),state);
  assert.deepEqual(engine.setDone(state,'valores',false,stages).done,[]);
});
