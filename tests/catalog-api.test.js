// Free /catalog.json stand-in (api/catalog.js): Blacklight-shaped answers from the local catalogue.
const { fail, ok, finish } = require('./lib');
const api = require('../api/catalog.js');

const get = q => api.handle(q);
let r = get({ q: 'tooth', per_page: '5' });
if (r.status === 200 && r.body.response.numFound > 50 && r.body.response.docs.length === 5 && r.body.response.docs[0].title_tsim) ok('q=tooth returns ' + r.body.response.numFound + ' Blacklight-shaped docs');
else fail('q=tooth should return Blacklight-shaped docs');
r = get({ q: 'skul' }); if (r.body.response.numFound > 0 && r.body.responseHeader.ccs.fuzzy.length) ok('fuzzy "skul" works and is explained'); else fail('fuzzy skul should work');
r = get({ q: 'false teeth' }); if (r.body.response.numFound > 0) ok('phrase meaning "false teeth" works (' + r.body.response.numFound + ')'); else fail('phrase "false teeth" should return records');
r = get({ q: 'harp', exact: '1' }); const h = r.body.response.numFound;
r = get({ q: 'harp OR violin', exact: '1' }); if (r.body.response.numFound > h) ok('OR widens the result'); else fail('OR should widen');
r = get({ q: 'tooth', 'f[collection_name_ssim][]': 'Henry Forman Atkinson Dental Museum' }); if (r.body.response.numFound > 0 && r.body.response.docs.every(d => d.collection_name_ssim[0] === 'Henry Forman Atkinson Dental Museum')) ok('collection facet filters'); else fail('collection facet should filter');
r = get({ q: 'tooth', sort: 'title_ssort asc, pub_date_isim desc', per_page: '100' }); const t = r.body.response.docs.map(d => d.title_tsim[0]); if (t.every((x, i) => !i || t[i - 1].localeCompare(x) <= 0)) ok('title sort'); else fail('title sort should be A-Z');
r = get({ id: '1' }); if (r.status === 200 && r.body.response.document.id === '1') ok('record by id'); else fail('record by id should work');
r = get({ id: 'nope' }); if (r.status === 404) ok('unknown record is 404'); else fail('unknown id should be 404');
finish('catalog-api');
