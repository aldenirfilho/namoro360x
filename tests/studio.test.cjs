'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const E = require('../studio-engine.js');

const scenarios = [
  { id: 'pausa', example: 'Quero ouvir você também.', options: [
    { id: 'escutar', text: 'Devolver a palavra.', feedback: 'Há espaço para a outra pessoa.', takeaway: 'Escute a resposta antes de continuar.' },
    { id: 'seguir', text: 'Continuar falando.', feedback: 'Talvez seja hora de uma pausa.', takeaway: 'Uma reparação curta pode ajudar.' }
  ] },
  { id: 'convite', example: 'Quer combinar um café?', options: [
    { id: 'escutar', text: 'Esperar uma resposta.', feedback: 'O convite permanece uma escolha.', takeaway: 'Silêncio não confirma o encontro.' }
  ] }
];

const bundle = {
  id: 'cafe-e-livros', title: 'Café e livros',
  objective: 'Conhecer uma pessoa com calma.',
  steps: ['Combinar um local público.', 'Ouvir e compartilhar uma ideia.', 'Perguntar se querem repetir.'],
  conversation: ['O que você gostou de ler?', 'Como escolheu esse livro?', 'O que gostaria de conhecer?'],
  comfort: 'Escolher assentos e um lugar com menos ruído.',
  limits: 'A pessoa pode recusar ou mudar de ideia.'
};

test('cada opção devolve somente a explicação do cenário escolhido', () => {
  assert.deepEqual(E.getScenarioFeedback(scenarios, 'pausa', 'escutar'), {
    feedback: 'Há espaço para a outra pessoa.',
    takeaway: 'Escute a resposta antes de continuar.',
    example: 'Quero ouvir você também.'
  });
  assert.deepEqual(E.getScenarioFeedback(scenarios, 'convite', 'escutar'), {
    feedback: 'O convite permanece uma escolha.',
    takeaway: 'Silêncio não confirma o encontro.',
    example: 'Quer combinar um café?'
  });
});

test('cenário ou opção inexistentes não revelam feedback de outra escolha', () => {
  assert.equal(E.getScenarioFeedback(scenarios, 'ausente', 'escutar'), null);
  assert.equal(E.getScenarioFeedback(scenarios, 'convite', 'seguir'), null);
  assert.equal(E.getScenarioFeedback(scenarios, 'pausa', 'ausente'), null);
});

test('ids herdados do prototype não funcionam como cenários nem opções', () => {
  for (const id of ['__proto__', 'constructor', 'toString', 'prototype']) {
    assert.equal(E.getScenarioFeedback(scenarios, id, 'escutar'), null);
    assert.equal(E.getScenarioFeedback(scenarios, 'pausa', id), null);
  }
});

test('feedback inválido recebe null em vez de coerção de ids', () => {
  for (const value of [null, undefined, 7, {}, [], true]) {
    assert.equal(E.getScenarioFeedback(scenarios, value, 'escutar'), null);
    assert.equal(E.getScenarioFeedback(scenarios, 'pausa', value), null);
  }
  for (const value of [null, undefined, {}, 'pausa']) assert.equal(E.getScenarioFeedback(value, 'pausa', 'escutar'), null);
});

test('coleções de cenário malformadas falham fechadas', () => {
  assert.equal(E.getScenarioFeedback([null, {}, false], 'pausa', 'escutar'), null);
  assert.equal(E.getScenarioFeedback([{ id: 'pausa', options: {} }], 'pausa', 'escutar'), null);
  assert.equal(E.getScenarioFeedback([{ id: 'pausa', options: [null, {}] }], 'pausa', 'escutar'), null);
});

test('kit de texto inclui propósito, passos, conversa, conforto, limites e caráter educativo', () => {
  const output = E.buildKitText(bundle);
  assert.equal(typeof output, 'string');
  for (const value of [bundle.title, bundle.objective, ...bundle.steps, ...bundle.conversation, bundle.comfort, bundle.limits]) {
    assert.ok(output.includes(value), 'Campo editorial ausente: ' + value);
  }
  assert.match(output, /Material educativo para adultos/);
  assert.match(output, /Não garante reciprocidade ou relacionamento/);
  assert.match(output, /Nenhuma reserva ou mensagem foi enviada/);
  assert.doesNotMatch(output, /undefined|\[object Object\]/);
});

test('seções do kit permanecem separadas e na ordem de leitura', () => {
  const output = E.buildKitText(bundle);
  const headings = ['INTENÇÃO', 'ANTES, DURANTE E DEPOIS', 'ASSUNTOS PARA ADAPTAR', 'CONFORTO E ACESSO', 'LIBERDADE E LIMITES'];
  const positions = headings.map(h => output.indexOf('\n' + h + '\n'));
  assert.ok(positions.every(p => p >= 0));
  assert.deepEqual([...positions].sort((a,b) => a-b), positions);
  assert.match(output, /1\. Combinar um local público\./);
  assert.match(output, /3\. Perguntar se querem repetir\./);
});

test('registro e id inválidos não produzem kit', () => {
  for (const value of [null, undefined, 'kit', [], 0]) assert.throws(() => E.buildKitText(value), Error);
  for (const id of ['', ' ', '__proto__', '../kit', 'kit/externo', 'KIT', 123, {}, null]) {
    assert.throws(() => E.buildKitText({ ...bundle, id }), Error);
  }
});

test('campos obrigatórios ausentes, vazios ou com tipo errado não são convertidos para texto', () => {
  for (const key of ['title', 'objective', 'comfort', 'limits']) {
    const missing = { ...bundle }; delete missing[key];
    assert.throws(() => E.buildKitText(missing), Error, key);
    for (const value of ['', '  ', null, 123, {}, []]) assert.throws(() => E.buildKitText({ ...bundle, [key]: value }), Error, key);
  }
});

test('roteiros exigem três passos e três assuntos válidos', () => {
  for (const key of ['steps', 'conversation']) {
    for (const value of [null, {}, 'texto', [], ['um'], ['um', 'dois', 'três', 'quatro'], ['um', {}, 'três'], ['um', '  ', 'três']]) {
      assert.throws(() => E.buildKitText({ ...bundle, [key]: value }), Error, key);
    }
  }
});

test('campos exageradamente longos permanecem limitados e não engolem os avisos finais', () => {
  const long = 'Árvore 💜 '.repeat(10000);
  const output = E.buildKitText({ ...bundle, title: long, objective: long, steps: [long,long,long], conversation: [long,long,long], comfort: long, limits: long });
  assert.ok(output.length <= 16000);
  assert.match(output, /LIBERDADE E LIMITES/);
  assert.match(output, /Material educativo para adultos/);
  assert.match(output, /Nenhuma reserva ou mensagem foi enviada/);
});

test('texto com caracteres especiais continua texto e não cria marcação HTML de exportação', () => {
  const value = 'Livros & ciência <3; conversar, ouvir e pausar.';
  const output = E.buildKitText({ ...bundle, title: value });
  assert.ok(output.includes(value));
  assert.doesNotMatch(output, /<!doctype|<html|<script|<style/i);
});

test('limpeza remove controles invisíveis sem apagar acentos e quebras editoriais', () => {
  const output = E.buildKitText({ ...bundle, title: '  Café\u0000 e livros\u007f  ', comfort: 'Uma pausa.\nUm ambiente tranquilo.' });
  assert.ok(output.includes('Café e livros'));
  assert.ok(output.includes('Uma pausa.\nUm ambiente tranquilo.'));
  assert.doesNotMatch(output, /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/);
});

test('campos que ficam vazios depois da limpeza também são rejeitados', () => {
  assert.throws(() => E.buildKitText({ ...bundle, title: '\u0000\u007f' }), Error);
});

test('os nove cenários publicados têm ids únicos e feedback utilizável para cada opção', () => {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../studio-data.js'), 'utf8'), sandbox);
  const data = sandbox.window.N360_STUDIO_DATA;
  assert.equal(data.scenarios.length, 9);
  assert.equal(new Set(data.scenarios.map(s => s.id)).size, data.scenarios.length);
  for (const scenario of data.scenarios) {
    assert.ok(scenario.context && scenario.question && scenario.title);
    assert.ok(scenario.options.length >= 2);
    assert.equal(new Set(scenario.options.map(o => o.id)).size, scenario.options.length);
    for (const option of scenario.options) {
      const result = E.getScenarioFeedback(data.scenarios, scenario.id, option.id);
      for (const key of ['feedback', 'takeaway', 'example']) assert.ok(typeof result[key] === 'string' && result[key].trim(), scenario.id + ': ' + key);
    }
  }
});

test('os três kits publicados são completos, exportáveis e preservam os limites educativos', () => {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../studio-data.js'), 'utf8'), sandbox);
  const data = sandbox.window.N360_STUDIO_DATA;
  assert.equal(data.bundles.length, 3);
  assert.equal(new Set(data.bundles.map(b => b.id)).size, data.bundles.length);
  for (const kit of data.bundles) {
    const output = E.buildKitText(kit);
    assert.ok(output.includes(kit.title));
    assert.ok(output.includes(kit.limits));
    assert.ok(output.length <= 16000);
    assert.match(output, /Material educativo para adultos/);
    assert.match(output, /Nenhuma reserva ou mensagem foi enviada/);
  }
});
