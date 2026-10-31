/* Pure helpers: usable offline and independently verifiable. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.N360_ENGINE = api;
}(typeof window === 'undefined' ? globalThis : window, function () {
  'use strict';
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
  const clean = (value, max) => String(value || '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max);
  function filterActivities(items, filters = {}, favorites = []) {
    const query = normalize(filters.query);
    return items.filter(a => (!query || normalize([a.title, a.category, a.description, a.conversation].join(' ')).includes(query)) && (!filters.category || a.category === filters.category) && (!filters.energy || a.energy === filters.energy) && (!filters.budget || a.budget === filters.budget) && (!filters.favorites || favorites.includes(a.id)));
  }
  function restoreState(raw, content) {
    const empty = {stage:0, done:[], favorites:[], focus:false, remember:false};
    try {
      const data = JSON.parse(raw);
      if (!data || data.version !== 1 || data.remember !== true) return empty;
      const ids = (v, collection) => Array.isArray(v) ? [...new Set(v.filter(id => typeof id === 'string' && collection.some(x => x.id === id)))] : [];
      return {stage:Number.isInteger(data.stage) && data.stage >= 0 && data.stage < content.stages.length ? data.stage : 0, done:ids(data.done, content.stages), favorites:ids(data.favorites, content.activities), focus:data.focus === true, remember:true};
    } catch { return empty; }
  }
  function parseLocalDate(value) {
    if (!value) return null;
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) throw new Error('Confira a data e o horário.');
    const date = new Date(value);
    const [year, month, day, hour, minute] = value.split(/[-T:]/).map(Number);
    if (!Number.isFinite(date.getTime()) || date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day || date.getHours() !== hour || date.getMinutes() !== minute) throw new Error('Essa data ou horário não existe no fuso deste aparelho.');
    return date;
  }
  function buildInvitation(input, activities, now = new Date()) {
    const activity = activities.find(a => a.id === input.activity);
    const place = clean(input.place, 100), city = clean(input.city, 60), note = clean(input.note, 240);
    if (!activity) throw new Error('Escolha uma atividade.');
    if (!place) throw new Error('Informe um lugar público para o encontro.');
    const date = parseLocalDate(input.date);
    if (date && date <= now) throw new Error('Escolha uma data futura ou deixe o horário em aberto.');
    const duration = [30,45,60,90].includes(Number(input.duration)) ? Number(input.duration) : 45;
    const tone = ['leve','direto','grupo'].includes(input.tone) ? input.tone : 'leve';
    const where = city ? place + ', em ' + city : place;
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'horário deste aparelho';
    const when = date ? 'Quando: ' + new Intl.DateTimeFormat('pt-BR', {dateStyle:'full',timeStyle:'short'}).format(date) + ' (' + zone + ').' : 'Dia e horário: podemos combinar juntos.';
    const opening = tone === 'grupo' ? 'Vamos reunir um pequeno grupo de adultos para uma atividade?' : tone === 'direto' ? 'Quer combinar um encontro?' : 'Pensei numa ideia para a gente se conhecer com calma. Você topa?';
    const text = [opening, '\nIdeia: ' + activity.title + '.', 'Lugar: ' + where + '.', when, 'Tempo sugerido: ' + duration + ' minutos.', note ? 'Combinado: ' + note : '', '\nSe não for uma boa ideia para você, tudo bem. Podemos ajustar ou deixar para outra ocasião.'].filter(Boolean).join('\n');
    return {activity:activity.id, title:activity.title, place, city, note, date:date ? date.toISOString() : null, duration, tone, text};
  }
  const escapeICS = value => String(value).replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
  function foldICS(line) {
    const encoder = new TextEncoder();
    const lines = []; let current = '', bytes = 0;
    for (const character of line) {
      const size = encoder.encode(character).length;
      if (bytes + size > 75) { lines.push(current); current = ' '; bytes = 1; }
      current += character; bytes += size;
    }
    lines.push(current); return lines.join('\r\n');
  }
  function createCalendar(plan, uid, now = new Date()) {
    if (!plan || !plan.date) throw new Error('Defina uma data no planejador e prepare novamente o convite.');
    const start = new Date(plan.date);
    if (!Number.isFinite(start.getTime())) throw new Error('Confira a data do convite.');
    const stamp = date => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
    const end = new Date(start.getTime() + plan.duration * 60000);
    const safeUID = clean(uid, 100).replace(/[^a-zA-Z0-9-]/g, '') || 'convite';
    return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Namoro360X//Convite//PT-BR','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT','UID:' + safeUID + '@namoro360x','DTSTAMP:' + stamp(now),'DTSTART:' + stamp(start),'DTEND:' + stamp(end),'SUMMARY:' + escapeICS(plan.title),'LOCATION:' + escapeICS([plan.place,plan.city].filter(Boolean).join(', ')),'DESCRIPTION:' + escapeICS(plan.text),'STATUS:TENTATIVE','END:VEVENT','END:VCALENDAR'].map(foldICS).join('\r\n') + '\r\n';
  }
  return Object.freeze({normalize,clean,filterActivities,restoreState,parseLocalDate,buildInvitation,escapeICS,foldICS,createCalendar});
}));
