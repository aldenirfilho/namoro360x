import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../dist/',import.meta.url));
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json; charset=utf-8'};
const allowed = new Set(['index.html','namoro360x.html','app.js','engine.js','content.js','styles.css','favicon.svg','plano.html','plano-relacionamento.html','plano.css','plano-data.js','plano-engine.js','plano.js','assets/conversa-no-cafe.png','studio.html','studio-portatil.html','studio.css','studio-data.js','studio-engine.js','studio.js','pwa.js','sw.js','manifest.webmanifest','assets/icon-192.png','assets/icon-512.png','assets/icon-maskable.png']);
const server = http.createServer(async (req,res) => {
  const pathname = new URL(req.url,'http://localhost').pathname;
  const name = pathname === '/' ? 'index.html' : pathname.slice(1);
  if (!allowed.has(name)) {res.writeHead(404);res.end('Não encontrado');return;}
  try { const file = await readFile(path.join(root,name)); res.writeHead(200,{'Content-Type':types[path.extname(name)],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'}); res.end(file); }
  catch {res.writeHead(503);res.end('Execute npm run build antes da prévia.');}
});
server.on('error',error => {console.error('Falha ao iniciar prévia:',error.message);process.exitCode = 1;});
server.listen(4173,'127.0.0.1',() => console.log('Local: http://127.0.0.1:4173'));
