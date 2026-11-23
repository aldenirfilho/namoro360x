'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const engine = require('../plano-engine.js');

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../plano-data.js'), 'utf8'), sandbox);
const stages = JSON.parse(JSON.stringify(sandbox.window.N360_PLAN_DATA.stages));
const allTaskIds = stages.flatMap(stage => stage.tasks.map(task => task.id));
const now = new Date('2026-11-23T15:00:00.000Z');
const makeState = changes => ({ ...engine.empty(), ...changes });
const makeBackup = changes => ({
  format: 'namoro360x-plan-backup', version: 1, createdAt: now.toISOString(),
  plan: { done: [allTaskIds[0]], stage: stages[1].id, pace: 'aberto' }, ...changes
});
const importObject = backup => engine.importBackup(JSON.stringify(backup), stages);

test('exportar progresso conserva somente o estado permitido, mesmo sem salvar no navegador', () => {
  const state = makeState({
    done: [allTaskIds[0], allTaskIds[0], allTaskIds[1], 'id-alheio', null],
    stage: stages[1].id, pace: 'aberto', remember: false,
    name: 'CAMPO_PRIVADO_NAO_EXPORTAR', notes: 'RASCUNHO_NAO_EXPORTAR'
  });
  const before = JSON.stringify(state);
  const raw = engine.exportBackup(state, stages, now);
  const backup = JSON.parse(raw);
  assert.equal(typeof raw, 'string');
  assert.deepEqual(Object.keys(backup).sort(), ['createdAt', 'format', 'plan', 'version']);
  assert.deepEqual(Object.keys(backup.plan).sort(), ['done', 'pace', 'stage']);
  assert.equal(backup.format, 'namoro360x-plan-backup');
  assert.equal(backup.version, 1);
  assert.equal(backup.createdAt, now.toISOString());
  assert.deepEqual(backup.plan.done, [allTaskIds[0], allTaskIds[1]]);
  assert.equal(backup.plan.stage, stages[1].id);
  assert.equal(backup.plan.pace, 'aberto');
  assert.doesNotMatch(raw, /remember|CAMPO_PRIVADO|RASCUNHO/);
  assert.equal(JSON.stringify(state), before, 'A exportação não deve mudar o estado atual.');
});

test('exportação recupera estado incompleto usando defaults e nunca deixa ids inválidos escapar', () => {
  const raw = engine.exportBackup(makeState({ done: ['unknown', {}, 7], stage: 'unknown', pace: 'unknown' }), stages, now);
  const backup = JSON.parse(raw);
  assert.deepEqual(backup.plan, { done: [], stage: stages[0].id, pace: 'leve' });
});

test('todos os passos reais podem viajar entre aparelhos sem copiar a opção remember', () => {
  const state = makeState({ done: [...allTaskIds], stage: stages.at(-1).id, pace: 'aberto', remember: true });
  const imported = engine.importBackup(engine.exportBackup(state, stages, now), stages);
  assert.deepEqual(imported.state.done, allTaskIds);
  assert.equal(imported.state.stage, stages.at(-1).id);
  assert.equal(imported.state.pace, 'aberto');
  assert.equal(imported.state.remember, false);
  assert.equal(imported.state.version, 1);
  assert.equal(imported.createdAt, now.toISOString());
});

test('roundtrip preserva pausa e passos sem exigir armazenamento persistente', () => {
  const state = makeState({ done: [allTaskIds[2]], stage: stages[2].id, pace: 'pausa', remember: false });
  const imported = engine.importBackup(engine.exportBackup(state, stages, now), stages);
  assert.equal(imported.state.pace, 'pausa');
  assert.equal(imported.state.remember, false);
  assert.deepEqual(imported.state.done, [allTaskIds[2]]);
  assert.equal(engine.nextTask(imported.state, stages), null);
  assert.equal(state.remember, false);
});

test('arquivo válido sem passos concluídos continua um backup utilizável', () => {
  const result = importObject(makeBackup({ plan: { done: [], stage: stages[0].id, pace: 'leve' } }));
  assert.deepEqual(result.state.done, []);
  assert.equal(result.state.stage, stages[0].id);
  assert.equal(result.state.remember, false);
});

test('importação remove ids repetidos sem perder a ordem dos passos válidos', () => {
  const result = importObject(makeBackup({ plan: { done: [allTaskIds[2], allTaskIds[0], allTaskIds[2], allTaskIds[0]], stage: stages[0].id, pace: 'leve' } }));
  assert.deepEqual(result.state.done, [allTaskIds[2], allTaskIds[0]]);
});

test('ids desconhecidos rejeitam o arquivo inteiro em vez de restaurar apenas uma parte', () => {
  for (const id of ['unknown', '__proto__', 'constructor', '<script>notExecutable()</script>']) {
    const backup = makeBackup(); backup.plan.done = [allTaskIds[0], id];
    assert.throws(() => importObject(backup), Error, id);
  }
});

test('etapa e ritmo são escolhas reconhecidas, nunca valores arbitrários', () => {
  for (const value of ['unknown', '__proto__', '', null, 0, {}, []]) {
    const backup = makeBackup(); backup.plan.stage = value;
    assert.throws(() => importObject(backup), Error);
  }
  for (const value of ['unknown', '__proto__', 'Leve', '', null, false, 0, {}]) {
    const backup = makeBackup(); backup.plan.pace = value;
    assert.throws(() => importObject(backup), Error);
  }
});

test('lista de passos exige um array de strings', () => {
  for (const done of ['valores', {}, null, 12, [null], [12], [{}], [['valores']]]) {
    assert.throws(() => importObject(makeBackup({ plan: { done, stage: stages[0].id, pace: 'leve' } })), Error);
  }
});

test('somente strings JSON até dez mil caracteres são consideradas para importação', () => {
  for (const raw of [null, undefined, {}, [], 12, true, new String(JSON.stringify(makeBackup())), '', '{broken', 'null', '[]', 'true', '7']) {
    assert.throws(() => engine.importBackup(raw, stages), Error);
  }
  const raw = JSON.stringify(makeBackup());
  const boundary = raw + ' '.repeat(10000 - raw.length);
  assert.equal(boundary.length, 10000);
  assert.equal(engine.importBackup(boundary, stages).state.stage, stages[1].id);
  assert.throws(() => engine.importBackup(boundary + ' ', stages), Error);
});

test('formato e versão precisam corresponder ao contrato de backup suportado', () => {
  for (const format of ['other-app', '', null, 1]) assert.throws(() => importObject(makeBackup({ format })), Error);
  for (const version of [0, 2, '1', null, true]) assert.throws(() => importObject(makeBackup({ version })), Error);
});

test('a estrutura não aceita campos ausentes, arrays na raiz ou plano que não seja registro', () => {
  for (const key of ['format', 'version', 'createdAt', 'plan']) {
    const backup = makeBackup(); delete backup[key];
    assert.throws(() => importObject(backup), Error, key);
  }
  for (const key of ['done', 'stage', 'pace']) {
    const backup = makeBackup(); delete backup.plan[key];
    assert.throws(() => importObject(backup), Error, key);
  }
  for (const plan of [null, [], 'plan', false, 1]) assert.throws(() => importObject(makeBackup({ plan })), Error);
});

test('campos extras são rejeitados na raiz e no plano, inclusive a preferência de salvamento', () => {
  for (const key of ['remember', 'name', 'notes', 'constructor', 'prototype', '__proto__']) {
    const backup = makeBackup();
    Object.defineProperty(backup, key, { value: 'extra', enumerable: true });
    assert.throws(() => importObject(backup), Error, 'Raiz: ' + key);
    const nested = makeBackup();
    Object.defineProperty(nested.plan, key, { value: 'extra', enumerable: true });
    assert.throws(() => importObject(nested), Error, 'Plano: ' + key);
  }
});

test('datas precisam representar um instante real no formato ISO UTC canônico', () => {
  for (const createdAt of [
    '', null, 1795446000000, {}, 'ontem',
    '2026-11-23T15:00:00Z', '2026-11-23T12:00:00.000-03:00',
    '2026-02-30T15:00:00.000Z', '2026-13-23T15:00:00.000Z',
    '2026-11-23', '2026-11-23T25:00:00.000Z'
  ]) assert.throws(() => importObject(makeBackup({ createdAt })), Error, String(createdAt));
  const leap = '2024-02-29T12:00:00.123Z';
  assert.equal(importObject(makeBackup({ createdAt: leap })).createdAt, leap);
});

test('importar não altera os dados originais e cada restauração é independente', () => {
  const backup = makeBackup();
  const raw = JSON.stringify(backup), stageSnapshot = JSON.stringify(stages);
  const first = engine.importBackup(raw, stages);
  const second = engine.importBackup(raw, stages);
  first.state.done.push(allTaskIds[1]);
  first.state.stage = stages[3].id;
  assert.deepEqual(second.state.done, [allTaskIds[0]]);
  assert.equal(second.state.stage, stages[1].id);
  assert.equal(JSON.stringify(stages), stageSnapshot);
  assert.equal(JSON.stringify(backup), raw);
});

test('exportação não modifica um estado congelado nem inclui campos de um perfil', () => {
  const state = Object.freeze({ ...engine.empty(), done: Object.freeze([allTaskIds[0]]), remember: true, profile: { private: 'nao-exportar' } });
  const output = engine.exportBackup(state, stages, now);
  assert.deepEqual(JSON.parse(output).plan.done, [allTaskIds[0]]);
  assert.doesNotMatch(output, /profile|nao-exportar|remember/);
});

test('JSON com proto ou texto executável é rejeitado e nunca executado', () => {
  const marker = '__namoro360xBackupMustNotExecute';
  assert.equal(globalThis[marker], undefined);
  const object = makeBackup();
  Object.defineProperty(object, '__proto__', { value: { [marker]: true }, enumerable: true });
  assert.throws(() => importObject(object), Error);
  assert.throws(() => engine.importBackup('globalThis.' + marker + '=true', stages), Error);
  assert.equal(globalThis[marker], undefined);
  assert.equal(Object.prototype[marker], undefined);
});

test('backup completo permanece pequeno e uma data de exportação inválida não sai como sucesso', () => {
  const raw = engine.exportBackup(makeState({ done: [...allTaskIds] }), stages, now);
  assert.ok(raw.length < 10000);
  assert.throws(() => engine.exportBackup(engine.empty(), stages, new Date('not-a-date')), Error);
});
