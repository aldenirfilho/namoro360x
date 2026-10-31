'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');
const E = require('../engine.js');

process.env.TZ = 'America/Fortaleza';
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../content.js'), 'utf8'), sandbox);
const C = sandbox.window.N360_CONTENT;
const now = new Date('2026-10-29T15:00:00.000Z');
const base = {
  activity: 'cafe-livro', place: 'Café da praça', city: 'Sobral',
  date: '2026-11-05T16:30', duration: '45', tone: 'leve', note: 'Lugar tranquilo.'
};
const plan = overrides => E.buildInvitation({ ...base, ...overrides }, C.activities, now);
const ids = items => Array.from(items, item => item.id);
const plain = value => JSON.parse(JSON.stringify(value));
const empty = { stage: 0, done: [], favorites: [], focus: false, remember: false };

test('busca trata acentos, caixa e espaços sem alterar o conteúdo original', () => {
  assert.equal(E.normalize('  CIÊNCIA e Café  '), 'ciencia e cafe');
  assert.ok(ids(E.filterActivities(C.activities, { query: 'CIENCIA' })).includes('ciencia'));
  assert.ok(ids(E.filterActivities(C.activities, { query: 'cafe' })).includes('cafe-livro'));
  assert.equal(C.activities.find(a => a.id === 'ciencia').category, 'Ciência e descobertas');
});

test('filtros se intersectam e resultados nunca ampliam a seleção', () => {
  assert.deepEqual(ids(E.filterActivities(C.activities, {
    query: 'ciencia', category: 'Ciência e descobertas', energy: 'baixa', budget: 'gratis'
  })), ['ciencia']);
  assert.deepEqual(ids(E.filterActivities(C.activities, {
    query: 'ciencia', energy: 'media'
  })), []);
  assert.deepEqual(ids(E.filterActivities(C.activities, {
    category: 'Tipo inexistente'
  })), []);
});

test('favoritas restringem resultados aos ids conhecidos que atendem aos demais filtros', () => {
  assert.deepEqual(ids(E.filterActivities(C.activities, { favorites: true }, ['cafe-livro', 'id-alheio'])), ['cafe-livro']);
  assert.deepEqual(ids(E.filterActivities(C.activities, { favorites: true, budget: 'gratis' }, ['cafe-livro'])), []);
  assert.deepEqual(ids(E.filterActivities(C.activities, { favorites: true }, [])), []);
});

test('busca em branco mantém o catálogo completo e busca sem correspondência retorna vazio', () => {
  assert.equal(E.filterActivities(C.activities, { query: '  ' }).length, C.activities.length);
  assert.equal(E.filterActivities(C.activities, { query: 'palavra-sem-correspondencia-12345' }).length, 0);
});

test('armazenamento ausente, corrompido ou sem adesão explícita não restaura preferências', () => {
  for (const raw of [null, '', '{bad', '{}', 'null', '[]', JSON.stringify({ version: 1, focus: true }), JSON.stringify({ version: 1, remember: 'true', focus: true }), JSON.stringify({ version: 2, remember: true })]) {
    assert.deepEqual(plain(E.restoreState(raw, C)), empty);
  }
});

test('restauração usa whitelist de ids, remove repetições e valida tipos de campos', () => {
  const restored = E.restoreState(JSON.stringify({
    version: 1, remember: true, stage: 3,
    done: ['intencao', 'intencao', 'alheio', 2, null, {}],
    favorites: ['caminhada', 'caminhada', 'externo'], focus: true,
    arbitrary: '<script>injetado</script>'
  }), C);
  assert.deepEqual(plain(restored), {
    stage: 3, done: ['intencao'], favorites: ['caminhada'], focus: true, remember: true
  });
  assert.equal(Object.hasOwn(restored, 'arbitrary'), false);
});

test('etapas fora da faixa e coleções malformadas têm recuperação segura', () => {
  for (const stage of [-1, 1000, 1.4, '2', null]) {
    assert.deepEqual(plain(E.restoreState(JSON.stringify({ version: 1, remember: true, stage, done: {}, favorites: 'caminhada', focus: 'true' }), C)), { ...empty, remember: true });
  }
});

test('data opcional permanece ausente e data local usa o fuso do aparelho', () => {
  assert.equal(E.parseLocalDate(''), null);
  assert.equal(E.parseLocalDate(null), null);
  assert.equal(E.parseLocalDate('2026-11-05T16:30').toISOString(), '2026-11-05T19:30:00.000Z');
});

test('datas inválidas não são normalizadas silenciosamente pelo JavaScript', () => {
  for (const value of ['2026-02-30T16:00', '2026-13-01T16:00', '2026-01-01T24:00', '2026-01-01T16:60', '2026-11-05', '05/11/2026 16:30', '2026-11-05T16:30:00', '2026-11-05T16:30Z']) {
    assert.throws(() => E.parseLocalDate(value), /data|horário/);
  }
});

test('hora inexistente durante avanço de horário de verão é rejeitada', () => {
  const script = `const e = require(${JSON.stringify(path.join(__dirname, '../engine.js'))}); try { e.parseLocalDate('2027-03-14T02:30'); process.exitCode = 1; } catch (error) { if (!/não existe/.test(error.message)) process.exitCode = 2; }`;
  const child = spawnSync(process.execPath, ['-e', script], { env: { ...process.env, TZ: 'America/New_York' }, encoding: 'utf8' });
  assert.equal(child.status, 0, child.stderr);
});

test('convite exige atividade do catálogo e lugar não vazio', () => {
  assert.throws(() => plan({ activity: 'perfil-externo' }), /atividade/);
  assert.throws(() => plan({ place: '   ' }), /lugar público/);
});

test('convite rejeita data passada e exatamente igual ao instante atual', () => {
  assert.throws(() => plan({ date: '2026-10-28T16:30' }), /futura/);
  assert.throws(() => plan({ date: '2026-10-29T12:00' }), /futura/);
});

test('convite funciona com horário em aberto e sem cidade', () => {
  const p = plan({ date: '', city: '' });
  assert.equal(p.date, null);
  assert.equal(p.city, '');
  assert.match(p.text, /podemos combinar juntos/);
  assert.doesNotMatch(p.text, /em undefined|Invalid Date/);
});

test('convite contém local, atividade, duração e liberdade para recusar', () => {
  const p = plan();
  assert.equal(p.date, '2026-11-05T19:30:00.000Z');
  assert.equal(p.duration, 45);
  assert.match(p.text, /Café da praça, em Sobral/);
  assert.match(p.text, /Café e uma boa indicação de livro/);
  assert.match(p.text, /45 minutos/);
  assert.match(p.text, /America\/Fortaleza/);
  assert.match(p.text, /ajustar ou deixar para outra ocasião/);
});

test('duração e tom manipulados recebem valores permitidos', () => {
  const p = plan({ duration: '-100000', tone: '<script>' });
  assert.equal(p.duration, 45);
  assert.equal(p.tone, 'leve');
  assert.match(plan({ tone: 'grupo' }).text, /grupo de adultos/);
  assert.match(plan({ tone: 'direto' }).text, /Quer combinar um encontro/);
});

test('campos livres têm limites, preservam texto humano e removem controles invisíveis', () => {
  const p = plan({ place: '  Biblioteca\u0000  ', city: 'S'.repeat(100), note: 'Á'.repeat(500) });
  assert.equal(p.place, 'Biblioteca');
  assert.equal(p.city.length, 60);
  assert.equal(p.note.length, 240);
});

test('agenda requer uma data válida', () => {
  assert.throws(() => E.createCalendar(plan({ date: '' }), 'test', now), /Defina uma data/);
  assert.throws(() => E.createCalendar({ date: 'not-a-date' }, 'test', now), /data/);
});

test('agenda usa UTC e conserva duração, inclusive ao cruzar a meia-noite', () => {
  const p = plan({ date: '2026-11-05T23:30', duration: '90' });
  const text = E.createCalendar(p, 'teste-123', now);
  assert.match(text, /DTSTART:20261106T023000Z\r\n/);
  assert.match(text, /DTEND:20261106T040000Z\r\n/);
  assert.match(text, /DTSTAMP:20261029T150000Z\r\n/);
  assert.match(text, /UID:teste-123@namoro360x/);
});

test('agenda permanece provisória e não solicita nem notifica participantes', () => {
  const text = E.createCalendar(plan(), 'teste', now);
  assert.match(text, /STATUS:TENTATIVE\r\n/);
  assert.match(text, /METHOD:PUBLISH\r\n/);
  assert.doesNotMatch(text, /ATTENDEE:|ORGANIZER:|METHOD:REQUEST|BEGIN:VALARM/);
  assert.ok(text.endsWith('END:VCALENDAR\r\n'));
});

test('escaping ICS protege delimitadores e quebras de linha', () => {
  assert.equal(E.escapeICS('a\\b,c;d\r\ne\rf\ng'), 'a\\\\b\\,c\\;d\\ne\\nf\\ng');
});

test('campos e UID com tentativa de injeção não criam propriedades nem eventos extras', () => {
  const p = plan({ place: 'Café; Centro, praça\nEND:VEVENT\nBEGIN:VEVENT', note: 'A\\B\nATTENDEE:intruso@example.invalid' });
  const text = E.createCalendar(p, 'id\r\nATTENDEE:intruso', now);
  assert.equal((text.match(/\r\nBEGIN:VEVENT\r\n/g) || []).length, 1);
  assert.equal((text.match(/\r\nEND:VEVENT\r\n/g) || []).length, 1);
  assert.doesNotMatch(text, /\r\nATTENDEE:/);
  assert.match(text.replace(/\r\n /g, ''), /LOCATION:Café\\; Centro\\, praça\\nEND:VEVENT\\nBEGIN:VEVENT/);
});

test('folding limita cada linha a 75 octetos e preserva acentos e emoji após unfolding', () => {
  const source = 'DESCRIPTION:' + '💜 árvore, café; '.repeat(40);
  const folded = E.foldICS(source);
  assert.ok(folded.includes('\r\n '));
  for (const line of folded.split('\r\n')) assert.ok(Buffer.byteLength(line, 'utf8') <= 75);
  assert.equal(folded.replace(/\r\n /g, ''), source);
  assert.ok(!folded.includes('\ufffd'));
});

test('agenda completa também respeita folding UTF-8, sem linhas LF isoladas', () => {
  const p = plan({ place: 'Biblioteca ' + 'é💜'.repeat(20), note: 'Encontro com calma. '.repeat(20) });
  const text = E.createCalendar(p, 'teste-unicode', now);
  for (const line of text.split('\r\n')) assert.ok(Buffer.byteLength(line, 'utf8') <= 75);
  assert.equal(text.replace(/\r\n/g, '').includes('\n'), false);
});
