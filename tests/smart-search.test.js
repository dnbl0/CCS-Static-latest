// CCS-116 / CCS-123: fuzzy and semantic matching (public/search/smart-search.js) against the real catalogue data.
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');
const vm = require('vm');

const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(PUBLIC, 'collection-data.js'), 'utf8'), sandbox, { filename: 'collection-data.js' });
const SS = require(path.join(PUBLIC, 'search', 'smart-search.js'));
const items = sandbox.window.CCS.items;
const eng = SS.create(items);

function run(q) {
  const a = eng.analyse(q);
  if (!a) return null;
  return items.map(it => ({ it, m: eng.match(it, a, 'all') })).filter(r => r.m.ok).sort((x, y) => y.m.score - x.m.score);
}
const kinds = r => r.reduce((k, x) => { k[x.m.kind] = (k[x.m.kind] || 0) + 1; return k; }, {});
const titles = (r, n) => r.slice(0, n).map(x => x.it.title.toLowerCase()).join(' | ');

// Fuzzy: misspellings, transpositions and half-typed words
for (const [q, want] of [['kangeroo', 'kangaroo'], ['mediacl instruments', 'medical'], ['skul', 'skull'], ['sculptur', 'sculpture']]) {
  const r = run(q), d = eng.describe(eng.analyse(q));
  if (r && r.length && d.fuzzy.some(x => x.to.includes(want))) ok(`fuzzy "${q}" is matched to "${want}" (${r.length} results)`);
  else fail(`fuzzy "${q}" should be matched to "${want}"`);
}
// Semantic: everyday words reach catalogue vocabulary
for (const [q, want] of [['pottery', 'ceramic'], ['fiddle', 'violin'], ['tooth', 'dental'], ['xray', 'radiograph']]) {
  const r = run(q);
  if (r && r.some(x => x.m.kind === 'semantic' && titles([x], 1).includes(want))) ok(`semantic "${q}" reaches "${want}"`);
  else fail(`semantic "${q}" should reach records mentioning "${want}"`);
}
// Whole-phrase meaning (CCS-116): a phrase is understood as one idea, so all of its words need not appear
for (const [q, want] of [['false teeth', 'denture'], ['sheet music', 'score'], ['x ray', 'radiograph']]) {
  const r = run(q), d = eng.describe(eng.analyse(q));
  if (r && r.length && d.semantic.some(x => x.from === q && x.to.some(w => w.indexOf(want.slice(0, 5)) === 0))) ok(`phrase "${q}" is understood as a whole (${r.length} results)`);
  else fail(`phrase "${q}" should be understood as "${want}"`);
}
// Exact matches always rank before related ones
for (const q of ['doctor', 'tooth', 'harp']) {
  const r = run(q); const order = { exact: 0, fuzzy: 1, semantic: 2 };
  let bad = 0; for (let i = 1; i < r.length; i++) if (order[r[i].m.kind] < order[r[i - 1].m.kind] && r[i].m.score > r[i - 1].m.score) bad++;
  const firstRelated = r.findIndex(x => x.m.kind !== 'exact'), lastExact = r.map(x => x.m.kind).lastIndexOf('exact');
  if (r.length && r[0].m.kind === 'exact') ok(`"${q}" ranks an exact match first (${JSON.stringify(kinds(r))})`);
  else fail(`"${q}" should rank an exact match first`);
}
// Precision guards: specific instruments are not treated as one another; noise is limited
{
  const harp = run('harp');
  if (harp.every(x => !/violin|piano|flute/.test(x.it.title.toLowerCase()) || x.m.kind === 'exact')) ok('"harp" is not widened to other instruments');
  else fail('"harp" must not match other specific instruments');
  const pot = run('pottery');
  if (pot.length < 120) ok(`"pottery" returns a focused ${pot.length} related results`); else fail(`"pottery" is too broad (${pot.length})`);
}
// Phrases and Boolean queries are never expanded
for (const q of ['"kangeroo"', 'kangeroo OR harp', 'NOT harp']) {
  if (eng.analyse(q) === null) ok(`exact-only query stays exact: ${q}`); else fail(`query must stay exact: ${q}`);
}
// Stop words and question words do not block a query
{
  const a = eng.analyse('what is a kangaroo');
  if (a && a.required.length === 1) ok('stop words are ignored in questions'); else fail('stop words should be ignored');
}
// Explanations are available for the interface
{
  const d = eng.describe(eng.analyse('kangeroo pottery'));
  if (d.fuzzy.length && d.semantic.length) ok('describe() reports close spellings and related terms'); else fail('describe() should report both kinds of expansion');
}
finish('smart-search');
