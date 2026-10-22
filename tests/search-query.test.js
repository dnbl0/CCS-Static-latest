// The search query module (public/search/search-query.js) against the real catalogue: URLs in and out, which records
// match, facet counts, result order and spelling suggestions. Runs in node; the results page only renders what it decides.
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');
const vm = require('vm');

const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(PUBLIC, 'collection-data.js'), 'utf8'), sandbox, { filename: 'collection-data.js' });
const CCS = sandbox.window.CCS;
const SS = require(path.join(PUBLIC, 'search', 'smart-search.js'));
const SQ = require(path.join(PUBLIC, 'search', 'search-query.js'));
const items = CCS.items;
const Q = SQ.create({ items, smart: SS.create(items), canonType: CCS.canonType });

const eq = (a, b, msg) => { if (JSON.stringify(a) === JSON.stringify(b)) ok(msg); else fail(msg + ' (got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b) + ')'); };
const url = s => new URLSearchParams(s);
const query = over => Object.assign(SQ.empty(), over);
const ids = f => Q.search(f).list.map(it => it.id);
const count = f => Q.search(f).list.length;

/* ---- URL -> query ---- */
{
  const r = Q.fromUrl(url('q=jar&scope=title&collection=Medical History Museum&collection=Grainger Museum Collection&named=Roseby Collection&classification=Pharmaceutical History&exact=1'));
  eq([r.query.q, r.query.scope, r.query.collection, r.query.named, r.query.classification, r.query.exact, r.term], ['jar', 'title', ['Medical History Museum', 'Grainger Museum Collection'], ['Roseby Collection'], ['Pharmaceutical History'], true, 'jar'], 'simple URL: words, scope, collections, named collection, classification and exact');
  eq(Q.fromUrl(url('type=artwork;Artwork;cultural object')).query.type, ['Artwork', 'Cultural Object'], 'simple URL: object types are split on ";", put in the catalogue spelling and de-duplicated');
  eq(Q.fromUrl(url('')).query.digital, true, 'the bare results page shows the records with a digital asset');
  eq(Q.fromUrl(url('view=list')).query.digital, true, '?view= alone is still the bare results page');
  eq([Q.fromUrl(url('q=')).query.digital, Q.fromUrl(url('q=')).term], [false, null], 'an empty ?q= is every record, and nothing is saved to the history');
  eq(Q.fromUrl(url('sort=year-asc')).query, SQ.empty(), 'a sort with nothing to search is ignored');
}
{
  const r = Q.fromUrl(url('clause[1][field]=creator&clause[1][op]=must_not&clause[1][query]=unknown&clause[0][field]=title&clause[0][query]= jar &op=should&f[collection][]=Medical History Museum&f_inclusive[type][]=artwork&f_inclusive[type][]=Artwork&range[year][begin]=1800&range[year][end]=x&sort=year-desc&f[colour][]=red'));
  eq(r.query.clauses, [{ field: 'title', op: 'should', query: 'jar' }, { field: 'creator', op: 'must_not', query: 'unknown' }], 'advanced URL: rows in order, trimmed, the single op as the default operator');
  eq([r.query.collection, r.query.fAll, r.query.type, r.query.yFrom, r.query.yTo, r.query.sort, r.term], [['Medical History Museum'], { collection: true }, ['Artwork'], 1800, null, 'new', null], 'advanced URL: f[] values must all match, f_inclusive[] any; a bad year and an unknown filter are ignored');
  eq(Q.fromUrl(url('clause[0][field]=colour&clause[0][query]=red')).query.digital, false, 'a row for an unknown field is dropped, and the page is not the bare page');
}

/* ---- query -> advanced form URL, and back ---- */
{
  const f = query({ q: 'skull', scope: 'title', clauses: [{ field: 'creator', op: 'must_not', query: 'unknown' }], collection: ['Medical History Museum'], type: ['Artwork', 'Photograph'], fAll: { type: true }, yFrom: 1850, yTo: 1950, sort: 'old' });
  const href = SQ.advancedHref(f, 'list');
  eq(href.split('?')[0], 'advanced-search.html', 'the advanced link opens the form');
  eq(url(href.split('?')[1]).get('view'), 'list', 'the advanced link carries the results view');
  eq(SQ.advancedHref(f, 'grid').includes('view='), false, 'an unknown view is not carried');
  const back = Q.fromUrl(url(href.split('?')[1])).query;
  eq([back.clauses, back.collection, back.type, back.fAll, back.yFrom, back.yTo, back.sort], [[{ field: 'creator', op: 'must_not', query: 'unknown' }, { field: 'title', op: 'must', query: 'skull' }], ['Medical History Museum'], ['Artwork', 'Photograph'], { type: true }, 1850, 1950, 'old'], 'round trip: the form gets the rows, the search words as a row, the filters, years and sort back');
  eq(SQ.advancedHref(SQ.empty()), 'advanced-search.html', 'an empty query opens an empty form');
}

/* ---- which records match ---- */
{
  const all = items.length;
  eq(count(SQ.empty()), all, 'an empty query matches every record (' + all + ')');
  const mhm = count(query({ collection: ['Medical History Museum'] })), gmc = count(query({ collection: ['Grainger Museum Collection'] }));
  eq([mhm > 0, gmc > 0, count(query({ collection: ['Medical History Museum', 'Grainger Museum Collection'] }))], [true, true, mhm + gmc], 'values of one filter are combined with OR');
  eq(count(query({ collection: ['Medical History Museum', 'Grainger Museum Collection'], fAll: { collection: true } })), 0, 'with "match all", a record cannot be in two collections');
  const both = query({ collection: ['Medical History Museum'], licence: ['Rights Reserved'] });
  eq(Q.search(both).list.every(it => it.collection === 'Medical History Museum' && it.licence === 'Rights Reserved'), true, 'different filters are combined with AND');
  eq(Q.search(query({ digital: true })).list.every(it => it.formats && it.formats.length), true, '"Records with digital assets" keeps only records with a format');
  eq(Q.search(query({ yFrom: 1900, yTo: 1950 })).list.every(it => it.dateStart >= 1900 && it.dateStart <= 1950), true, 'a production-date range leaves out undated records and records outside it');
  const f = query({ collection: ['Medical History Museum'], yFrom: 1900 });
  eq(items.filter(it => Q.matches(it, f, 'date')).length, count(query({ collection: ['Medical History Museum'] })), 'except leaves that filter out (for its own histogram and counts)');
  const bornAfter = query({ birthFrom: 1900 });
  eq(Q.search(bornAfter).list.every(it => SQ.lifespanOf(it.creator).birth >= 1900), true, 'creator birth years are read from the creator name');
  eq([SQ.lifespanOf('Mengil, Judy (b.1954, d.2017)'), SQ.lifespanOf('Grainger, Percy (1882-1961)'), SQ.lifespanOf('Maker unknown')], [{ birth: 1954, death: 2017 }, { birth: 1882, death: 1961 }, {}], 'lifespans: "(b.1954, d.2017)", "(1882-1961)" and none');
}
{
  const text = it => SQ.scopeText(it, 'all').toLowerCase();
  eq(Q.search(query({ q: 'jar', exact: true })).list.every(it => text(it).includes('jar')), true, 'exact words: every record contains the word');
  const jar = count(query({ q: 'jar', exact: true })), bottle = count(query({ q: 'bottle', exact: true }));
  const either = count(query({ q: 'jar OR bottle', exact: true })), notPh = Q.search(query({ q: 'jar NOT pharmacy', exact: true })).list;
  eq([either >= Math.max(jar, bottle), either <= jar + bottle], [true, true], 'OR finds records with either word (' + either + ')');
  eq(notPh.every(it => text(it).includes('jar') && !text(it).includes('pharmacy')), true, 'NOT leaves out records with the next word');
  eq(Q.search(query({ q: '"celadon vase"', exact: true })).list.map(it => it.title), ['Celadon vase'], 'a quoted phrase matches the phrase');
  eq(Q.search(query({ q: 'microscope', scope: 'title', exact: true })).list.every(it => /microscope/i.test(it.title)), true, 'a scope searches only that field');
  eq([count(query({ q: 'micrscope', exact: true })), count(query({ q: 'micrscope' })) > 0], [0, true], 'a misspelling finds nothing exactly, and close spellings without exact');
}
{
  const c = (op, q, field) => ({ field: field || 'all_fields', op, query: q });
  const must = ids(query({ clauses: [c('must', 'jar', 'title')] }));
  eq(must.length > 0 && must.every(id => /jar/i.test(items.find(it => it.id === id).title)), true, 'a "contains all" row on Title');
  const should = count(query({ clauses: [c('should', 'jar vase', 'title')] }));
  eq(should, items.filter(it => /jar|vase/i.test(it.title)).length, 'a "contains any" row matches either word');
  eq(Q.search(query({ clauses: [c('must', 'jar', 'title'), c('must_not', 'pharmacy')] })).list.every(it => !SQ.scopeText(it, 'all').toLowerCase().includes('pharmacy')), true, 'a "does not contain" row leaves records out');
}

/* ---- facet counts and values ---- */
{
  const f = query({ q: 'jar', exact: true });
  const byColl = Q.counts(f, 'coll', 'collection');
  eq(Object.values(byColl).reduce((a, b) => a + b, 0), count(f), 'collection counts add up to the results');
  const withColl = query({ q: 'jar', exact: true, collection: ['Medical History Museum'] });
  eq(Q.counts(withColl, 'coll', 'collection'), byColl, "a facet's own selection is left out of its counts");
  eq(Q.values('licence').sort(), [...new Set(items.map(it => it.licence).filter(Boolean))].sort(), 'values lists every value of a facet in the records');
  eq(SQ.FACETS.length, 27, 'FACETS lists the 27 filters');
}

/* ---- order ---- */
{
  const titles = sort => Q.search(query({ q: 'bottle', sort })).list.map(it => it.title.replace(/^\W+/, ''));
  const az = titles('az');
  eq(az, [...az].sort((a, b) => a.localeCompare(b)), 'Title A-Z ignores leading punctuation');
  const years = sort => Q.search(query({ sort })).list.map(it => it.dateStart).filter(y => y != null);
  const newest = years('new'), oldest = years('old');
  eq([newest.every((y, i) => !i || newest[i - 1] >= y), oldest.every((y, i) => !i || oldest[i - 1] <= y)], [true, true], 'newest and oldest sort by production year');
  const r = Q.search(query({ q: 'microscope' }));
  eq([r.smart instanceof Map, r.smart.get(r.list[0]).kind], [true, 'exact'], 'relevance puts exact matches first and says why each record matched');
  eq(Q.search(query({ q: 'microscope', sort: 'az' })).smart, null, 'with a sort chosen there is no relevance ranking');
}

/* ---- spelling suggestions ---- */
eq([Q.suggest('micrscope'), Q.suggest('microscope'), Q.suggest(''), Q.suggest('of')], ['microscope', null, null, null], '"Did you mean" corrects a misspelling and leaves real or short words alone');
eq(Q.suggest('"celadn vase"'), '"celadon vase"', 'words inside a quoted phrase are corrected');

finish('search-query');
