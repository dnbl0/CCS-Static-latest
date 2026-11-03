// Static catalogue backup: public/catalog/catalog-search.js answers the same questions as the Rails /catalog page
// (keyword search, facet filters with counts, date range, sort, paging) from an in-memory list of records.
// Records use the Solr field names of the Rails index so the URL parameters are the same as /catalog's.
const { PUBLIC, fail, ok, finish, path } = require('./lib');
const { create } = require(path.join(PUBLIC, 'catalog', 'catalog-search.js'));

const docs = [
  { id: 'a', title_si: 'Ukelele with original carrying case', collection_ssim: ['Grainger Museum Collection'], creator_ssim: ['Unknown'], classification_ssim: ['Musical instruments'], date_start_isi: 1918, subject_ssim: ['Hawaiian music'] },
  { id: 'b', title_si: 'Cary Pocket microscope in case', collection_ssim: ['Medical History Museum'], creator_ssim: ['Cary, William'], classification_ssim: ['Scientific instruments'], date_start_isi: 1830 },
  { id: 'c', title_si: 'Portrait of a woman', collection_ssim: ['University Art Collection'], creator_ssim: ['Streeton, Arthur'], classification_ssim: ['Art and design', 'paintings'], date_start_isi: 1895, has_digital_asset_bsi: true },
  { id: 'd', title_si: 'Letter about a ukelele', collection_ssim: ['Grainger Museum Collection'], creator_ssim: ['Grainger, Percy'], classification_ssim: ['Archive'], date_start_isi: 1940, subject_ssim: ['Letters'] },
  { id: 'e', title_si: 'Undated sketch', collection_ssim: ['University Art Collection'], creator_ssim: ['Unknown'], classification_ssim: ['Art and design'] }
];
const extra = { b: 'brass lens used by students of the anatomy school', e: 'sketch of a human skull' };
const engine = create(docs, extra);
const ids = r => r.docs.map(d => d.id);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
function check(name, cond, detail) { cond ? ok(name) : fail(name + (detail ? ' -> ' + detail : '')); }

// Everything, sorted A-Z, paged
let r = engine.search({ sort: 'title', perPage: 2, page: 2 });
check('no query returns every record, paged', r.total === 5 && r.pages === 3 && r.page === 2 && same(ids(r), ['c', 'a']), JSON.stringify(ids(r)) + ' total ' + r.total);

// Keyword search: case-insensitive, matches title and other fields, every word must match
r = engine.search({ q: 'UKELELE' });
check('keyword search is case-insensitive and finds title matches', same(ids(r).sort(), ['a', 'd']), JSON.stringify(ids(r)));
r = engine.search({ q: 'ukelele hawaiian' });
check('every word must match (subject field counts)', same(ids(r), ['a']), JSON.stringify(ids(r)));
r = engine.search({ q: 'streeton' });
check('keyword search reaches the creator field', same(ids(r), ['c']), JSON.stringify(ids(r)));
r = engine.search({ q: 'ukel' });
check('words match whole words, as in Solr (a half-typed word finds nothing)', r.total === 0, JSON.stringify(ids(r)));
r = engine.search({ q: 'ukeleles' });
check('a plural query word finds the singular record word', same(ids(r).sort(), ['a', 'd']), JSON.stringify(ids(r)));
r = engine.search({ q: 'zzzz' });
check('no match gives zero results', r.total === 0 && r.pages === 0 && same(ids(r), []));

// Relevance: a title match ranks above a match in another field
r = engine.search({ q: 'letters', sort: 'relevance' });
check('relevance finds the record whose subject matches', same(ids(r), ['d']));
r = engine.search({ q: 'ukelele', sort: 'relevance' });
check('relevance ranks the title that starts with the word first', ids(r)[0] === 'a', JSON.stringify(ids(r)));

// Facets: filters are ANDed, counts are over the filtered results, selected values are flagged
r = engine.search({ f: { collection_ssim: ['Grainger Museum Collection'] }, sort: 'title' });
check('a facet filter narrows the results', same(ids(r), ['d', 'a']), JSON.stringify(ids(r)));
const classes = r.facets.classification_ssim;
check('facet counts cover only the filtered results', same(classes.map(x => [x.value, x.hits]), [['Archive', 1], ['Musical instruments', 1]]), JSON.stringify(classes));
const colls = r.facets.collection_ssim;
check('a selected facet value is flagged', colls.length === 1 && colls[0].selected === true && colls[0].hits === 2, JSON.stringify(colls));
r = engine.search({ f: { collection_ssim: ['University Art Collection'], classification_ssim: ['paintings'] } });
check('two facets are ANDed', same(ids(r), ['c']), JSON.stringify(ids(r)));
r = engine.search({});
check('facet values are ordered by count then name', r.facets.collection_ssim[0].hits === 2 && r.facets.collection_ssim[0].value === 'Grainger Museum Collection', JSON.stringify(r.facets.collection_ssim));

// Date range (production date) leaves out undated records
r = engine.search({ range: { date_start_isi: { begin: 1890, end: 1920 } }, sort: 'date-asc' });
check('a date range keeps records inside it, oldest first', same(ids(r), ['c', 'a']), JSON.stringify(ids(r)));

// Digital asset switch
r = engine.search({ f: { has_digital_asset: ['with'] } });
check('"With a digital asset" keeps records that have one', same(ids(r), ['c']), JSON.stringify(ids(r)));
r = engine.search({ f: { has_digital_asset: ['without'] } });
check('"Without a digital asset" keeps the others', r.total === 4 && !ids(r).includes('c'), JSON.stringify(ids(r)));

// Sorting
check('sort by date (newest) puts undated records last', same(ids(engine.search({ sort: 'date-desc' })), ['d', 'a', 'c', 'b', 'e']), JSON.stringify(ids(engine.search({ sort: 'date-desc' }))));
check('sort by title Z-A', same(ids(engine.search({ sort: 'title-desc' })), ['e', 'a', 'c', 'd', 'b']), JSON.stringify(ids(engine.search({ sort: 'title-desc' }))));

// Paging is clamped to real pages
r = engine.search({ perPage: 2, page: 99 });
check('a page past the end shows the last page', r.page === 3 && r.docs.length === 1, 'page ' + r.page);

// Text that is searched but not kept in the record (descriptions, credit lines): the extra text passed to create()
r = engine.search({ q: 'anatomy students' });
check('words in the extra search text find the record', same(ids(r), ['b']), JSON.stringify(ids(r)));
r = engine.search({ q: 'anatomy', f: { collection_ssim: ['Medical History Museum'] } });
check('extra-text matches still obey filters', same(ids(r), ['b']), JSON.stringify(ids(r)));
r = engine.search({ q: 'skulls' });
check('a plural in the query finds the singular in the record', same(ids(r), ['e']), JSON.stringify(ids(r)));
r = engine.search({ q: 'microscopes' });
check('plural "microscopes" finds "microscope" in a title', same(ids(r), ['b']), JSON.stringify(ids(r)));

// One record by id
check('record(id) returns the record, or null', engine.record('b').title_si === 'Cary Pocket microscope in case' && engine.record('nope') === null);

finish('catalog-search');
