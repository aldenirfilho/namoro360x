import {readFile,access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
const root = fileURLToPath(new URL('../',import.meta.url));
const read = file => readFile(path.join(root,file),'utf8');
const html = await read('index.html');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
if (ids.length !== new Set(ids).size) throw new Error('ID HTML duplicado');
for (const match of html.matchAll(/href="#([^"]+)"/g)) if (!ids.includes(match[1])) throw new Error('Âncora inexistente: ' + match[1]);
const app = await read('app.js');
for (const match of app.matchAll(/\$\('([^']+)'\)/g)) if (!ids.includes(match[1]) && !['stage-title'].includes(match[1])) throw new Error('Controle ausente: ' + match[1]);
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  const target = match[1];
  if (/^(https:|data:)/.test(target) || target === 'namoro360x.html' || target.startsWith('assets/icon-')) continue;
  await access(path.join(root,target));
}
if (!html.includes('lang="pt-BR"') || !html.includes('viewport')) throw new Error('Metadados de acessibilidade ausentes');
if (/<script[^>]+src="https?:/i.test(html)) throw new Error('Script externo inesperado');
if (/innerHTML|eval\(|new Function\(/.test(app)) throw new Error('Renderização insegura');
const sandbox = {window:{}}; vm.runInNewContext(await read('content.js'),sandbox);
const content = sandbox.window.N360_CONTENT;
for (const collection of ['paths','stages','activities','scripts','guides','sources']) {
  if (!content[collection]?.length) throw new Error('Coleção vazia: ' + collection);
  if (collection !== 'sources') { const values = content[collection].map(x => x.id); if (values.length !== new Set(values).size) throw new Error('ID editorial duplicado'); }
}
for (const entry of content.paths) {
  if (!content.scripts.some(s => s.id === entry.scriptId)) throw new Error('Exemplo ausente no ponto de partida: ' + entry.id);
  if (!ids.includes(entry.target)) throw new Error('Destino ausente no ponto de partida: ' + entry.id);
  if (entry.category && !content.activities.some(a => a.category === entry.category)) throw new Error('Categoria ausente: ' + entry.category);
}
for (const file of ['app.js','engine.js','content.js']) new vm.Script(await read(file),{filename:file});
console.log('Integridade aprovada: âncoras, controles, assets, sintaxe, coleções e renderização sem HTML de entrada.');
const planHtml=await read('plano.html');
const planIds=[...planHtml.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(planIds.length!==new Set(planIds).size)throw new Error('ID duplicado no plano');
for(const match of planHtml.matchAll(/href="#([^"]+)"/g))if(!planIds.includes(match[1]))throw new Error('Âncora ausente no plano: '+match[1]);
for(const file of ['plano-data.js','plano-engine.js','plano.js'])new vm.Script(await read(file),{filename:file});
const planApp=await read('plano.js');
for(const match of planApp.matchAll(/\$\('([^']+)'\)/g))if(!planIds.includes(match[1]))throw new Error('Controle ausente no plano: '+match[1]);
if(/innerHTML|eval\(|new Function\(/.test(planApp))throw new Error('Renderização insegura no plano');
for(const match of planHtml.matchAll(/(?:src|href)="([^"#]+)"/g)){
  const target=match[1];if(/^(https:|data:)/.test(target)||target==='plano-relacionamento.html'||target.startsWith('assets/icon-'))continue;
  await access(path.join(root,target.split('#')[0]));
}
console.log('Plano aprovado: navegação, controles, assets e sintaxe.');
const studioHtml=await read('studio.html'), studioIds=[...studioHtml.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(studioIds.length!==new Set(studioIds).size)throw new Error('ID duplicado no Estúdio');
for(const match of studioHtml.matchAll(/href="#([^"]+)"/g))if(!studioIds.includes(match[1]))throw new Error('Âncora ausente no Estúdio: '+match[1]);
for(const file of ['studio-data.js','studio-engine.js','studio.js','pwa.js','sw.js'])new vm.Script(await read(file),{filename:file});
for(const file of ['studio.js','pwa.js']){
  const code=await read(file);
  for(const match of code.matchAll(/\$\('([^']+)'\)/g))if(!studioIds.includes(match[1]))throw new Error('Controle ausente no Estúdio: '+match[1]);
  if(/innerHTML|eval\(|new Function\(/.test(code))throw new Error('Renderização insegura no Estúdio');
}
for(const match of studioHtml.matchAll(/(?:src|href)="([^"#]+)"/g)){
  const target=match[1];if(/^(https:|data:)/.test(target)||['studio-portatil.html'].includes(target)||target.startsWith('assets/icon-'))continue;
  await access(path.join(root,target.split('#')[0]));
}
const manifest=JSON.parse(await read('manifest.webmanifest'));
if(manifest.display!=='standalone'||!manifest.start_url||!manifest.scope||manifest.icons.length<3)throw new Error('Manifesto PWA incompleto');
for(const page of [html,planHtml,studioHtml])if(!page.includes('data-n360-shell="1.3"')||!page.includes('rel="manifest"'))throw new Error('Metadados PWA ausentes');
console.log('Estúdio e PWA aprovados: âncoras, controles, manifesto e sintaxe.');
