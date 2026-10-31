import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../',import.meta.url));
const dist = path.join(root,'dist');
await mkdir(dist,{recursive:true});
const assets = ['index.html','styles.css','content.js','engine.js','app.js','favicon.svg'];
for (const file of assets) await copyFile(path.join(root,file),path.join(dist,file));
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
await writeFile(path.join(dist,'namoro360x.html'),standalone);
console.log('Build concluído: dist/index.html + dist/namoro360x.html autossuficiente.');
