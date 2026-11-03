/* Educational examples, selected locally. No inference about real people. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.N360_STUDIO_ENGINE = api;
}(typeof window === 'undefined' ? globalThis : window, function () {
  'use strict';
  function getScenarioFeedback(scenarios, id, optionId) {
    if (!Array.isArray(scenarios) || typeof id !== 'string' || typeof optionId !== 'string') return null;
    const scenario = scenarios.find(s => s && Object.hasOwn(s,'id') && s.id === id);
    const option = Array.isArray(scenario?.options) ? scenario.options.find(o => o && Object.hasOwn(o,'id') && o.id === optionId) : null;
    return option ? {feedback:option.feedback, takeaway:option.takeaway, example:scenario.example} : null;
  }
  function field(value, max) {
    if (typeof value !== 'string' || !value.trim()) throw new Error('Este roteiro está incompleto. Escolha outro.');
    const text=value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max);
    if (!text) throw new Error('Este roteiro está incompleto. Escolha outro.');
    return text;
  }
  function list(values) {
    if (!Array.isArray(values) || values.length !== 3) throw new Error('Este roteiro está incompleto. Escolha outro.');
    return values.map((v,i) => (i + 1) + '. ' + field(v,1400)).join('\n');
  }
  function buildKitText(bundle) {
    const required=['id','title','objective','steps','conversation','comfort','limits'];
    if (!bundle || typeof bundle !== 'object' || !required.every(key => Object.hasOwn(bundle,key)) || typeof bundle.id !== 'string' || !/^[a-z0-9-]+$/.test(bundle.id)) throw new Error('Escolha um roteiro válido.');
    return [
      'NAMORO360X · KIT360X · PRÉVIA GRATUITA', field(bundle.title,150),
      '\nINTENÇÃO', field(bundle.objective,1000), '\nANTES, DURANTE E DEPOIS', list(bundle.steps),
      '\nASSUNTOS PARA ADAPTAR', list(bundle.conversation), '\nCONFORTO E ACESSO', field(bundle.comfort,1400),
      '\nLIBERDADE E LIMITES', field(bundle.limits,1400),
      '\nMaterial educativo para adultos. Adapte ao seu contexto. Não garante reciprocidade ou relacionamento e não substitui acompanhamento profissional.',
      'Confira local, programação, acesso e custos. Nenhuma reserva ou mensagem foi enviada.',
      'Namoro360X · versão 1.3 · 03/11/2026'
    ].join('\n');
  }
  return Object.freeze({getScenarioFeedback,buildKitText});
}));
