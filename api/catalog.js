/**
 * Free, same-origin stand-in for the Blacklight /catalog.json API (Vercel serverless function).
 * Answers the requests public/blacklight-adapter.js sends (q, f[...][], range, sort, page, per_page) and
 * GET /catalog/:id.json, using the catalogue in public/collection-data.js and the fuzzy / synonym / phrase
 * engine in public/search/smart-search.js. No database, no Solr, no cost; swap the adapter endpoint to a real
 * Blacklight server later without changing the site.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

let state = null;
function load() {
  if (state) return state;
  const root = fs.existsSync(path.join(process.cwd(), 'public')) ? path.join(process.cwd(), 'public') : path.join(__dirname, '..', 'public');
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(root, 'collection-data.js'), 'utf8'), sandbox, { filename: 'collection-data.js' });
  const SS = require(path.join(root, 'search', 'smart-search.js'));
  const items = sandbox.window.CCS.items;
  state = { items, engine: SS.create(items), byId: new Map(items.map(i => [String(i.id), i])) };
  return state;
}

const FACETS = {
  collection_name_ssim: it => [it.collection],
  format_ssim: it => it.types && it.types.length ? it.types : [it.objectType],
  subject_ssim: it => [it.subject],
  culture_ssim: it => [it.culture],
  place_ssim: it => [it.place],
  theme_ssim: it => it.theme || [],
  licence_ssim: it => [it.licence]
};

function toDoc(it) {
  return {
    id: String(it.id), title_tsim: [it.title], collection_name_ssim: [it.collection], format_ssim: [it.objectType],
    creator_tsim: [it.creator], date_display_ssim: [it.date], pub_date_isim: it.dateStart != null ? [it.dateStart] : [],
    licence_ssim: [it.licence], access_ssim: [it.access], material_ssim: [it.material || ''], subject_ssim: [it.subject || ''],
    place_ssim: [it.place || ''], theme_ssim: it.theme || [], web_access_ssim: [it.webAccess || ''], accession_ssim: [it.accession || '']
  };
}

function list(v) { return v == null ? [] : Array.isArray(v) ? v : [v]; }

// Exact search with "quoted phrases", AND / OR / NOT: OR splits alternatives; inside one, every term must match and NOT terms must not.
function boolMatch(q, text) {
  const tokens = [], re = /"([^"]+)"|(\S+)/g; let m;
  while ((m = re.exec(q))) tokens.push(m[1] ? { t: m[1].toLowerCase(), phrase: true } : { t: m[2] });
  const groups = [[]];
  let neg = false;
  tokens.forEach(k => {
    if (!k.phrase && k.t === 'OR') { groups.push([]); neg = false; }
    else if (!k.phrase && k.t === 'AND') { /* implicit */ }
    else if (!k.phrase && k.t === 'NOT') neg = true;
    else { groups[groups.length - 1].push({ t: k.t.toLowerCase(), neg }); neg = false; }
  });
  return groups.some(g => g.length && g.every(x => (text.indexOf(x.t) !== -1) !== x.neg));
}

function search(q, p) {
  const { items, engine } = load();
  const analysis = !p.exact && q ? engine.analyse(q) : null;
  let rows = items.map(it => ({ it, score: 0 }));
  if (q) {
    if (analysis) {
      rows = rows.map(r => { const m = engine.match(r.it, analysis, 'all'); return m.ok ? { it: r.it, score: m.score } : null; }).filter(Boolean);
    } else {
      rows = rows.filter(r => boolMatch(q, (r.it.title + ' ' + r.it.subject + ' ' + r.it.creator + ' ' + r.it.collection + ' ' + r.it.objectType + ' ' + (r.it.material || '')).toLowerCase()));
    }
  }
  Object.keys(FACETS).forEach(k => { const want = list(p['f[' + k + '][]']); if (want.length) rows = rows.filter(r => want.every(w => FACETS[k](r.it).indexOf(w) !== -1)); });
  const from = p['range[pub_date_isim][begin]'], to = p['range[pub_date_isim][end]'];
  if (from != null) rows = rows.filter(r => r.it.dateStart != null && r.it.dateStart >= +from);
  if (to != null) rows = rows.filter(r => r.it.dateStart != null && r.it.dateStart <= +to);
  const sort = String(p.sort || '');
  const byTitle = (a, b) => a.it.title.localeCompare(b.it.title);
  if (/^title_ssort asc/.test(sort)) rows.sort(byTitle);
  else if (/^pub_date_isim desc/.test(sort)) rows.sort((a, b) => (b.it.dateStart || 0) - (a.it.dateStart || 0) || byTitle(a, b));
  else if (/^pub_date_isim asc/.test(sort)) rows.sort((a, b) => (a.it.dateStart || 9999) - (b.it.dateStart || 9999) || byTitle(a, b));
  else rows.sort((a, b) => b.score - a.score || byTitle(a, b));
  const facets = Object.keys(FACETS).map(k => {
    const counts = new Map(); rows.forEach(r => FACETS[k](r.it).filter(Boolean).forEach(v => counts.set(v, (counts.get(v) || 0) + 1)));
    return { name: k, items: [...counts].sort((a, b) => b[1] - a[1]).slice(0, 50).map(([value, hits]) => ({ value, hits })) };
  });
  return { rows, facets, analysis, engine };
}

function handle(query) {
  const per = Math.min(Math.max(parseInt(query.per_page, 10) || 20, 1), 100);
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  if (query.id) {
    const it = load().byId.get(String(query.id));
    return it ? { status: 200, body: { response: { document: toDoc(it) } } } : { status: 404, body: { error: 'Record not found' } };
  }
  const q = String(query.q || '').trim();
  const { rows, facets, analysis, engine } = search(q, query);
  const d = analysis ? engine.describe(analysis) : { fuzzy: [], semantic: [] };
  return {
    status: 200,
    body: {
      response: { numFound: rows.length, start: (page - 1) * per, docs: rows.slice((page - 1) * per, page * per).map(r => toDoc(r.it)) },
      facet_counts: { facet_fields: Object.fromEntries(facets.map(f => [f.name, f.items.flatMap(i => [i.value, i.hits])])) },
      responseHeader: { params: { q, per_page: per, page }, ccs: { fuzzy: d.fuzzy, semantic: d.semantic } }
    }
  };
}

module.exports = (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const query = {};
    url.searchParams.forEach((v, k) => { query[k] = k in query ? [].concat(query[k], v) : v; });
    const out = handle(query);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
    res.status(out.status).json(out.body);
  } catch (e) {
    res.status(500).json({ error: String(e && e.message || e) });
  }
};
module.exports.handle = handle;
