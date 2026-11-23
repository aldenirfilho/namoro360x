const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const os=require('node:os');
const vm=require('node:vm');
const {execFile}=require('node:child_process');
const {promisify}=require('node:util');
const {createHash}=require('node:crypto');
const run=promisify(execFile);
const root=path.resolve(__dirname,'..');

test('distribution keeps three tools connected offline and delivery package outside public hosting',async t=>{
  const folder=await fs.mkdtemp(path.join(os.tmpdir(),'namoro360x-delivery-'));
  t.after(()=>fs.rm(folder,{recursive:true,force:true}));
  await run(process.execPath,['scripts/build.mjs'],{cwd:root});
  await run(process.execPath,['scripts/package-kit.mjs',folder],{cwd:root});
  const names=['CADERNO-KIT360X.html','COMECE-AQUI.txt','SHA256.json','namoro360x.html','plano-relacionamento.html','studio-portatil.html'];
  assert.deepEqual((await fs.readdir(folder)).sort(),names.sort());
  const hashes=JSON.parse(await fs.readFile(path.join(folder,'SHA256.json'),'utf8'));
  for(const file of ['namoro360x.html','plano-relacionamento.html','studio-portatil.html']){
    const html=await fs.readFile(path.join(folder,file),'utf8');
    assert.doesNotMatch(html,/<script[^>]+src=|rel="manifest"|rel="apple-touch-icon"/);
    assert.doesNotMatch(html,/href=["']https:\/\/namoro360x\.aldenirmed\.chatgpt\.site\/(?:index|plano)\.html/);
    const links=[...html.matchAll(/href=["']([^"']+)["']/g)].map(m=>m[1]);
    for(const target of links){
      if(/^(?:https:|data:|#)/.test(target))continue;
      const destination=target.split(/[?#]/)[0];
      await fs.access(path.join(folder,destination));
      if(target.includes('#')){
        const linked=await fs.readFile(path.join(folder,destination),'utf8');
        const anchor=target.split('#')[1];
        assert.ok(linked.includes('id="'+anchor+'"'),'Missing anchor '+target);
      }
    }
    assert.equal(createHash('sha256').update(html).digest('hex'),hashes.files[file]);
  }
  assert.match(await fs.readFile(path.join(folder,'namoro360x.html'),'utf8'),/href="studio-portatil.html"/);
  const sw=await fs.readFile(path.join(root,'dist/sw.js'),'utf8');
  assert.doesNotMatch(sw,/CADERNO-KIT360X|COMECE-AQUI|robots\.txt|sitemap\.xml/);
  const shell=JSON.parse(sw.match(/const SHELL = (\[[^;]+\]);/)[1]);
  for(const file of shell.filter(x=>x.endsWith('.html'))){
    assert.ok((await fs.readFile(path.join(root,'dist',file),'utf8')).includes('data-n360-shell="1.3"'));
  }
  const publicPage=await fs.readFile(path.join(root,'dist/conheca.html'),'utf8');
  assert.match(publicPage,/<button[^>]+disabled/);
  assert.doesNotMatch(publicPage,/buy\.stripe\.com|pay\.hotmart\.com|sk_live_|rk_live_/);
  const context={window:{}};vm.runInNewContext(await fs.readFile(path.join(root,'studio-data.js'),'utf8'),context);
  const caderno=await fs.readFile(path.join(folder,'CADERNO-KIT360X.html'),'utf8');
  for(const bundle of context.window.N360_STUDIO_DATA.bundles)assert.ok(caderno.includes(bundle.title));
});
