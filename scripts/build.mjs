import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {iconPNG} from './icons.mjs';
const root = fileURLToPath(new URL('../',import.meta.url));
const dist = path.join(root,'dist');
await mkdir(dist,{recursive:true});
await mkdir(path.join(dist,'assets'),{recursive:true});
const assets = ['index.html','styles.css','content.js','engine.js','app.js','favicon.svg','plano.html','plano.css','plano-data.js','plano-engine.js','plano.js','assets/conversa-no-cafe.png','studio.html','studio.css','studio-data.js','studio-engine.js','studio.js','pwa.js','manifest.webmanifest'];
for (const file of assets) await copyFile(path.join(root,file),path.join(dist,file));
for (const [file,size] of [['assets/icon-192.png',192],['assets/icon-512.png',512],['assets/icon-maskable.png',512]]) await writeFile(path.join(dist,file),iconPNG(size));
let standalone = await readFile(path.join(root,'index.html'),'utf8');
const css = await readFile(path.join(root,'styles.css'),'utf8');
standalone = standalone.replace('<link rel="stylesheet" href="styles.css">',() => '<style>\n' + css + '\n</style>');
for (const file of ['content.js','engine.js','app.js']) {
  const script = (await readFile(path.join(root,file),'utf8')).replace(/<\/script/gi,'<\\/script');
  standalone = standalone.replace('<script src="' + file + '" defer></script>',() => '<script defer>\n' + script + '\n</script>');
}
// Inline classic scripts with defer execute during parsing, so move them to the end.
const scripts = [...standalone.matchAll(/<script defer>[\s\S]*?<\/script>/g)].map(m => m[0].replace('<script defer>','<script>'));
standalone = standalone.replace(/<script defer>[\s\S]*?<\/script>/g,'').replace('</body>',() => scripts.join('\n') + '\n</body>');
const favicon = await readFile(path.join(root,'favicon.svg'),'utf8');
standalone = standalone.replace('href="favicon.svg"','href="data:image/svg+xml,' + encodeURIComponent(favicon) + '"');
const removePWA = html => html.replace(/\s*<link rel="(?:manifest|apple-touch-icon)"[^>]*>/g,'');
standalone = removePWA(standalone);
const site = 'https://namoro360x.aldenirmed.chatgpt.site/';
standalone = standalone.replaceAll('href="plano.html"','href="'+site+'plano.html"');
standalone = standalone.replaceAll('href="studio.html"','href="'+site+'studio.html"');
await writeFile(path.join(dist,'namoro360x.html'),standalone);
let plan = await readFile(path.join(root,'plano.html'),'utf8');
const planCss = await readFile(path.join(root,'plano.css'),'utf8');
plan = plan.replace('<link rel="stylesheet" href="plano.css">',() => '<style>\n'+planCss+'\n</style>');
const planScripts=[];
for (const file of ['plano-data.js','plano-engine.js','plano.js']) {
  const script=(await readFile(path.join(root,file),'utf8')).replace(/<\/script/gi,'<\\/script');
  plan=plan.replace('<script src="'+file+'" defer></script>','');
  planScripts.push('<script>\n'+script+'\n</script>');
}
const photo=await readFile(path.join(root,'assets/conversa-no-cafe.png'));
plan=plan.replace('src="assets/conversa-no-cafe.png"','src="data:image/png;base64,'+photo.toString('base64')+'"');
plan=plan.replace('href="favicon.svg"','href="data:image/svg+xml,'+encodeURIComponent(favicon)+'"');
plan=removePWA(plan);
// The standalone plan works offline. Links to the complementary guide require internet.
plan=plan.replaceAll('href="index.html','href="'+site+'index.html');
plan=plan.replaceAll('href="studio.html"','href="'+site+'studio.html"');
plan=plan.replace('Explorar guia completo','Explorar guia completo (online)').replace('Montar um convite no guia','Montar um convite online');
plan=plan.replace('</body>',()=>planScripts.join('\n')+'\n</body>');
await writeFile(path.join(dist,'plano-relacionamento.html'),plan);
let studio=removePWA(await readFile(path.join(root,'studio.html'),'utf8'));
const readStudioCss=await readFile(path.join(root,'studio.css'),'utf8');
studio=studio.replace('<link rel="stylesheet" href="studio.css">',() => '<style>\n'+readStudioCss+'\n</style>');
async function portableStudio() {
  // The portable file has no registration capability and makes no asset requests.
  const js=[];
  for(const file of ['studio-data.js','studio-engine.js','studio.js','pwa.js']) {
    studio=studio.replace('<script src="'+file+'" defer></script>','');
    if(file !== 'pwa.js') js.push('<script>\n'+(await readFile(path.join(root,file),'utf8')).replace(/<\/script/gi,'<\\/script')+'\n</script>');
  }
  studio=studio.replace('href="favicon.svg"','href="data:image/svg+xml,'+encodeURIComponent(favicon)+'"');
  studio=studio.replace(/\s*<section[^>]*id="aplicativo"[\s\S]*?<\/section>/,'');
  studio=studio.replace(/\s*<dialog[^>]*id="install-help"[\s\S]*?<\/dialog>/,'');
  studio=studio.replaceAll('href="#aplicativo"','href="'+site+'studio.html#aplicativo"');
  studio=studio.replaceAll('href="index.html','href="'+site+'index.html').replaceAll('href="plano.html','href="'+site+'plano.html');
  studio=studio.replace('</body>',() => js.join('\n')+'\n</body>');
  await writeFile(path.join(dist,'studio-portatil.html'),studio);
}
await portableStudio();
const shell=[...assets,'assets/icon-192.png','assets/icon-512.png','assets/icon-maskable.png'];
const hash=createHash('sha256');
for(const file of shell) hash.update(await readFile(path.join(dist,file)));
const sw=await readFile(path.join(root,'sw.js'),'utf8');
hash.update(sw);
const revision=hash.digest('hex').slice(0,16);
await writeFile(path.join(dist,'sw.js'),sw.replace('__N360_REVISION__',revision).replace('__N360_SHELL__',JSON.stringify(shell)));
console.log('Build concluído: guia, plano, Estúdio360X, PWA e três HTMLs portáteis. Cache: '+revision);
