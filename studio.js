(function () {
  'use strict';
  const D = window.N360_STUDIO_DATA, E = window.N360_STUDIO_ENGINE;
  if (!D || !E) return;
  const $ = id => document.getElementById(id);
  const make = (tag, text, cls) => {const node = document.createElement(tag); if(text !== undefined) node.textContent = text; if(cls) node.className = cls; return node;};
  function selectedScenario() {return D.scenarios.find(s => s.id === $('scenario-select').value) || D.scenarios[0];}
  function selectedBundle() {return D.bundles.find(b => b.id === $('kit-select').value) || D.bundles[0];}
  function renderScenario() {
    const scenario = selectedScenario();
    $('scenario-context').textContent = scenario.context;
    $('scenario-question').textContent = scenario.question;
    $('scenario-feedback').hidden = true;
    $('scenario-takeaway').textContent = ''; $('scenario-example').textContent = '';
    const container = $('scenario-options'); container.replaceChildren();
    scenario.options.forEach(option => {
      const button = make('button',option.text,'scenario-option');
      button.type = 'button'; button.setAttribute('aria-pressed','false');
      button.addEventListener('click',() => {
        const feedback = E.getScenarioFeedback(D.scenarios,scenario.id,option.id);
        if (!feedback) return;
        container.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed',String(b === button)));
        $('scenario-feedback').hidden = false;
        $('scenario-takeaway').textContent = feedback.feedback + ' ' + feedback.takeaway;
        $('scenario-example').textContent = feedback.example;
      }); container.append(button);
    });
  }
  function renderKit() {
    const bundle = selectedBundle();
    $('kit-summary').textContent = bundle.objective;
    $('kit-steps').replaceChildren(...bundle.steps.map(step => make('li',step)));
    $('kit-conversation').replaceChildren(...bundle.conversation.map(text => make('p',text)));
    $('kit-comfort').textContent = bundle.comfort;
    $('kit-boundaries').textContent = bundle.limits;
    $('kit-status').textContent = '';
  }
  for (const scenario of D.scenarios) { const option = make('option',scenario.title); option.value=scenario.id; $('scenario-select').append(option); }
  for (const bundle of D.bundles) { const option = make('option',bundle.title); option.value=bundle.id; $('kit-select').append(option); }
  $('scenario-select').addEventListener('change',renderScenario);
  $('reset-scenario').addEventListener('click',() => {renderScenario(); $('scenario-options').querySelector('button')?.focus();});
  $('kit-select').addEventListener('change',renderKit);
  $('download-kit').addEventListener('click',() => {
    try {
      const bundle=selectedBundle(), text=E.buildKitText(bundle), url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
      const anchor=make('a'); anchor.href=url; anchor.download='kit360x-'+bundle.id+'.txt'; document.body.append(anchor); anchor.click(); anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url),1000);
      $('kit-status').textContent='Roteiro preparado para download. Confira a pasta Downloads. Nenhuma mensagem foi enviada.';
    } catch (error) { $('kit-status').textContent=error.message; }
  });
  $('print-kit').addEventListener('click',() => { $('kit-status').textContent='Na janela de impressão, você pode escolher “Salvar como PDF”, se disponível no aparelho.'; window.print(); });
  renderScenario(); renderKit();
}());
