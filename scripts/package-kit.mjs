import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import {createHash} from 'node:crypto';

const root=fileURLToPath(new URL('../',import.meta.url));
const destination=process.argv[2];
if(!destination||!path.isAbsolute(destination))throw new Error('Informe uma pasta absoluta fora de dist para o kit de distribuição.');
const target=path.resolve(destination), publicRoot=path.join(root,'dist');
if(target===publicRoot||target.startsWith(publicRoot+path.sep))throw new Error('O kit de distribuição fica fora da pasta pública.');
await mkdir(target,{recursive:true});
const portable=['namoro360x.html','plano-relacionamento.html','studio-portatil.html'];
for(const file of portable)await copyFile(path.join(publicRoot,file),path.join(target,file));
const sandbox={window:{}};
vm.runInNewContext(await readFile(path.join(root,'studio-data.js'),'utf8'),sandbox);
const data=sandbox.window.N360_STUDIO_DATA;
if(!data?.bundles?.length)throw new Error('Roteiros não encontrados.');
const safe=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const list=items=>'<ol>'+items.map(item=>'<li>'+safe(item)+'</li>').join('')+'</ol>';
const caderno=`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kit360X — caderno para impressão</title><style>body{font:17px/1.6 system-ui,sans-serif;color:#302a36;max-width:820px;margin:40px auto;padding:0 24px}h1,h2{font-family:Georgia,serif}article{margin:50px 0;break-before:page}h3{margin-top:30px}.line{height:36px;border-bottom:1px solid #aaa}.note{font-size:14px;color:#555}.toolbar{padding:20px;background:#eee9e1}button{font:inherit;padding:10px 18px;cursor:pointer}li{margin:10px 0}@media print{.toolbar{display:none}body{font-size:11pt;margin:0;max-width:none}article{margin:0;break-before:page}}</style></head><body><div class="toolbar"><button type="button" id="print">Imprimir ou salvar como PDF</button><p>Nenhum campo é enviado ou salvo. Para preencher, imprima o caderno. Proteja as anotações no seu aparelho ou no papel.</p></div><h1>Kit360X</h1><p>Três roteiros para escolher, adaptar e levar.</p><p>O valor deste formato está na organização portátil e no caderno para impressão. Os roteiros também podem ser explorados gratuitamente no Estúdio360X.</p><p class="note">Material educativo para adultos de 18 anos ou mais. Sem garantia de relacionamento, reciprocidade ou resultado clínico. Confira local, horário, acesso e custos antes de combinar. Recusa, silêncio ou mudança de ideia devem ser respeitados. Preserve vínculos profissionais de cuidado e supervisão.</p>${data.bundles.map(bundle=>`<article><h2>${safe(bundle.title)}</h2><p>${safe(bundle.objective)}</p><h3>Antes, durante e depois</h3>${list(bundle.steps)}<h3>Assuntos para adaptar</h3>${list(bundle.conversation)}<h3>Conforto e acesso</h3><p>${safe(bundle.comfort)}</p><h3>Liberdade e limites</h3><p>${safe(bundle.limits)}</p><h3>Minha preparação</h3><p>Uma atividade e um lugar público possíveis:</p><div class="line"></div><p>Um assunto verdadeiro que eu quero compartilhar:</p><div class="line"></div><p>Horário, duração, custo e condições a confirmar:</p><div class="line"></div><p>Como deixar espaço para aceitar, recusar ou sugerir outra ideia:</p><div class="line"></div><p class="note">Anote apenas o que for necessário. Evite nomes completos, diagnósticos e histórias íntimas de terceiros.</p></article>`).join('')}<script>document.getElementById('print').addEventListener('click',()=>window.print());</script></body></html>`;
await writeFile(path.join(target,'CADERNO-KIT360X.html'),caderno);
await writeFile(path.join(target,'COMECE-AQUI.txt'),`KIT360X — DISTRIBUIÇÃO PORTÁTIL · v1.4 · 03/11/2026

1. Extraia o ZIP inteiro para uma única pasta.
2. Abra namoro360x.html no navegador para explorar o guia.
3. Meu plano e Estúdio abrem os outros HTMLs nesta mesma pasta.
4. Abra CADERNO-KIT360X.html para imprimir ou salvar como PDF pelo navegador.

Mantenha os nomes dos três aplicativos e a pasta em conjunto. Eles funcionam
sem rede; fontes externas e instruções de instalação hospedadas exigem internet.
Não há sincronização automática entre dispositivos. O salvamento opcional das
preferências depende do navegador e pode ser limitado em arquivos locais.
Convites e rascunhos não são enviados nem guardados automaticamente.

Este pacote é material preparado para distribuição. Seu recebimento não
comprova uma compra. A demonstração do aplicativo permanece gratuita.
Não há cadastro de participantes, troca de mensagens ou encontros garantidos.
Guarde cópias dos arquivos e proteja suas anotações.
`);
const files=[...portable,'CADERNO-KIT360X.html','COMECE-AQUI.txt'];
const hashes={};for(const file of files)hashes[file]=createHash('sha256').update(await readFile(path.join(target,file))).digest('hex');
await writeFile(path.join(target,'SHA256.json'),JSON.stringify({version:'1.4.0',files:hashes},null,2)+'\n');
console.log('Kit gerado fora da hospedagem pública: '+target);
