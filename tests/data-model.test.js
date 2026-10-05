// The site's data model must follow the two project workbooks (extracted to data-model/*.json by scripts/extract-data-model.py):
//   assets/CCS Data inventory - final.xlsx                                  -> inventory, datatypes, complex fields, copyright advice
//   assets/CCS Field labels and filters - Final - PRG - 1 OCT 2026.xlsx     -> field-labels.json, filters.json
// Anything the site shows beyond the workbooks must be listed, with a reason, in data-model/extensions.json.
const { PUBLIC, ROOT, fail, warn, ok, finish, fs, path } = require('./lib');
const vm = require('vm');
const J = f => JSON.parse(fs.readFileSync(path.join(ROOT, 'data-model', f), 'utf8'));
const labels = J('field-labels.json'), filters = J('filters.json'), inventory = J('inventory.json'), datatypes = J('datatypes.json'), ext = J('extensions.json'), copyright = J('copyright-advice.json');

if (labels.length === 30 && filters.length === 22 && inventory.length > 50 && datatypes.length > 10) ok(`data model loaded: ${labels.length} display fields, ${filters.length} filters, ${inventory.length} inventory fields, ${datatypes.length} data types`);
else fail('data-model/*.json look incomplete; re-run scripts/extract-data-model.py');

const norm = s => String(s).toLowerCase().replace(/licen[sc]e/g, 'licence').replace(/&/g, 'and').replace(/[^a-z]/g, '');

/* ---- every data type referenced by a field exists ---- */
const typeNames = new Set(datatypes.map(d => norm(d.dataType)));
const refTypes = [...new Set(labels.map(l => l.dataType).filter(Boolean))];
const unknown = refTypes.filter(t => !t.includes('?') && !t.split(/ & | and /).some(p => typeNames.has(norm(p))) && !['Provinence', 'Copyright', 'Access', 'Relationship', 'Identifier', 'Measurement', 'Affiliation'].includes(t));
if (unknown.length) warn('field-label data types not in the CCS Datatypes sheet: ' + unknown.join(', '));

/* ---- filters: same names, order, sections and behaviour as the CCS Filters sheet ---- */
const html = fs.readFileSync(path.join(PUBLIC, 'search/search-results.html'), 'utf8');
const facets = [...html.matchAll(/\{group:'([^']*)', ?key:'(\w+)',title:("[^"]*"|'[^']*'),kind:'(\w+)'(,search:true)?(?:,dk:'\w+')?\}/g)].map(m => ({ group: m[1], key: m[2], title: eval(m[3]), kind: m[4], search: !!m[5] }));
if (facets.length < 22) fail(`could not read the FACETS list from search-results.html (found ${facets.length})`);
const extFilters = new Set(ext.filters.map(e => norm(e.name)));
let last = -1;
for (const f of filters) {
  const i = facets.findIndex(x => norm(x.title) === norm(f.name));
  if (i < 0) { fail(`Filters sheet row ${f.seq} "${f.name}" is missing from the site's filters`); continue; }
  const x = facets[i];
  if (i < last) fail(`filter "${f.name}" is out of the sheet's order`); last = i;
  if (norm(x.group) !== norm(f.section)) fail(`filter "${f.name}" is in section "${x.group}", the sheet says "${f.section}"`);
  const t = f.type || '';
  if (/Date selector/i.test(t) && !['date', 'life'].includes(x.kind)) fail(`filter "${f.name}" should be a date selector, is "${x.kind}"`);
  if (/Search within/i.test(t) && !x.search) fail(`filter "${f.name}" should allow searching within the filter`);
  if (/Checkbox/i.test(t) && !['chips', 'list', 'tree'].includes(x.kind)) fail(`filter "${f.name}" should be a checkbox list, is "${x.kind}"`);
}
const extras = facets.filter(x => !filters.some(f => norm(f.name) === norm(x.title)));
for (const x of extras) if (!extFilters.has(norm(x.title))) fail(`filter "${x.title}" is not in the Filters sheet and not listed in data-model/extensions.json`);
ok(`${filters.length} sheet filters present in order with matching sections and behaviour; ${extras.length} documented extensions`);

/* ---- record fields: labels and order from the Field labels sheet; mandatory fields present; no placeholders ---- */
const sandbox = { window: {}, console }; vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(PUBLIC, 'collection-data.js'), 'utf8'), sandbox);
const R = Object.values(sandbox.window.CCS.records);
const alias = ext.labelAliases || {};
const sheetLabel = new Map(labels.map(l => [norm(alias[l.label] || l.label), l]));
const extLabels = new Set(ext.recordFields.map(e => norm(e.label)));
const seen = new Set();
for (const r of R) for (const f of [...r.fields, ...r.rights]) {
  const l = sheetLabel.get(norm(f.label));
  seen.add(norm(f.label));
  if (!l && !extLabels.has(norm(f.label))) { fail(`record ${r.id}: label "${f.label}" is not in the Field labels sheet or extensions.json`); break; }
  if (l && Number(f.seq) !== l.seq) { fail(`record ${r.id}: "${f.label}" has sequence ${f.seq}, the sheet says ${l.seq}`); break; }
}
const where = ext.renderedElsewhere || {};
for (const l of labels) if (!seen.has(norm(alias[l.label] || l.label)) && !where[l.label]) warn(`Field labels row ${l.seq} "${l.label}" is not populated on any record`);
const noTitle = R.filter(r => !r.title || !r.title.trim()), noColl = R.filter(r => !r.collection), noUnit = R.filter(r => !r.unit);
if (noTitle.length || noColl.length || noUnit.length) fail(`mandatory fields missing: ${noTitle.length} titles, ${noColl.length} collections, ${noUnit.length} responsible units`); else ok(`Title, Collection and Responsible Unit are present on all ${R.length} records (inventory: record cannot display without them)`);
const mand = copyright.filter(c => /^Must/i.test(c.withDA || '') && /Copyright holder|Credit line|Collection Title|Responsible/i.test(c.descriptor)).map(c => c.descriptor.trim());
ok(`Copyright Advice: ${mand.join(', ')} are mandatory (credit line and copyright checked on every record in collection-data.test.js)`);
if (R.some(r => r.rights.some(f => f.label === 'Accession number'))) fail('Accession number must appear once (Field labels row 15, details list), not also in the usage-rights block');
const ph = R.filter(r => [...r.fields, ...r.rights].some(f => /^(not recorded|no caption recorded)$/i.test(String(f.value).trim())));
if (ph.length) fail(`${ph.length} records show a "Not recorded" placeholder; an unpopulated field must be omitted (inventory: "Field does not display")`); else ok('no placeholder values: unpopulated fields are omitted');
// Accession number is mandatory in the inventory. Records that still lack one are tracked in data-model/accession-gaps.json (candidates found in the
// EMu / Vernon exports, or why there is no match); a new gap, or a stale entry, fails here.
const gaps = J('accession-gaps.json'), gapIds = new Set(gaps.map(g => g.id));
const noAcc = R.filter(r => !r.fields.some(f => f.label === 'Accession number')).map(r => r.id);
const untracked = noAcc.filter(id => !gapIds.has(id)), stale = gaps.filter(g => g.status !== 'filled' && !noAcc.includes(g.id));
if (untracked.length) fail(`records without an accession number that are not in data-model/accession-gaps.json: ${untracked.join(', ')}`);
if (stale.length) fail(`accession-gaps.json lists records that now have an accession number: ${stale.map(g => g.id).join(', ')} (mark them "filled" or remove)`);
if (noAcc.length) warn(`${noAcc.length} records have no accession number (mandatory in the inventory); see data-model/accession-gaps.json`); else ok('every record has an accession number');

/* ---- digital asset caption: "Complex fields" sheet recipe ----
   [DA Title]. [CA Date]. [CA Creator] [DOB-DOD]. [Role]. [Affiliation]. [CA Material]. [Copyright holder]. [Collection title]. [Credit line]. Image: [DA Creator]. [DA date].
   Title, Copyright holder, Credit line and Collection title are mandatory; empty parts are dropped; only records with a digital asset have one. */
const field = (r, l) => (r.rights.concat(r.fields).find(f => f.label === l) || {}).value;
const badCap = [];
for (const r of R) {
  const cap = r.caption;
  if (!r.hasDA) { if (cap) badCap.push(`#${r.id} has a caption but no digital asset`); continue; }
  if (!cap) { badCap.push(`#${r.id} digital asset has no caption`); continue; }
  const credit = field(r, 'Credit line'), copy = field(r, 'Copyright'), coll = field(r, 'Collection');
  const need = [['title', r.title], ['copyright holder', copy], ['credit line', credit], ['collection title', coll && (credit || '').includes(coll) ? '' : coll]];
  for (const [n, v] of need) if (v && !cap.includes(String(v).replace(/[.\s]+$/, ''))) badCap.push(`#${r.id} caption lacks its ${n}`);
  if (/undefined|null|\.\.|\. \./.test(cap)) badCap.push(`#${r.id} caption has an empty part`);
  if (cap.indexOf(String(r.title).replace(/[.\s]+$/, '')) > cap.indexOf(String(credit).replace(/[.\s]+$/, ''))) badCap.push(`#${r.id} caption is out of recipe order`);
  if (field(r, 'Caption') !== cap) badCap.push(`#${r.id} Caption row differs from the caption`);
}
if (badCap.length) fail(`${badCap.length} digital asset caption problems, e.g. ${badCap.slice(0, 3).join('; ')}`); else ok(`all ${R.filter(r => r.hasDA).length} digital-asset captions follow the Complex fields recipe (title, copyright, collection and credit line present, in order, no empty parts)`);
/* ---- media metadata sidebar: Field labels rows 27-30 only, in order, and nowhere else ---- */
const SIDEBAR = labels.filter(l => l.seq >= 27 && l.seq <= 30);
const sideBad = [];
for (const r of R) {
  const m = r.media || [];
  if (!r.hasDA && m.length) sideBad.push(`#${r.id} has media rows but no digital asset`);
  if (r.hasDA && !m.length) sideBad.push(`#${r.id} digital asset has an empty media sidebar`);
  m.forEach((row, i) => {
    const sheet = SIDEBAR.find(l => norm(l.label) === norm(row.label));
    if (!sheet) sideBad.push(`#${r.id} sidebar row "${row.label}" is not Field labels rows 27-30`);
    else if (row.seq !== sheet.seq) sideBad.push(`#${r.id} sidebar row "${row.label}" has sequence ${row.seq}, the sheet says ${sheet.seq}`);
    if (i && m[i - 1].seq > row.seq) sideBad.push(`#${r.id} sidebar rows are out of order`);
    if (!row.value || !String(row.value).trim()) sideBad.push(`#${r.id} sidebar row "${row.label}" is empty`);
  });
  if (r.hasDA) for (const need of ['Licence Type', 'Terms of Use']) if (!m.some(x => norm(x.label) === norm(need))) sideBad.push(`#${r.id} sidebar lacks ${need}`);
  for (const l of SIDEBAR) if ([...r.fields, ...r.rights].some(f => norm(f.label) === norm(l.label))) sideBad.push(`#${r.id} shows "${l.label}" outside the media sidebar`);
}
if (/Terms of use<\/span>/.test(fs.readFileSync(path.join(PUBLIC, 'collections/record.html'), 'utf8').replace(/<aside[\s\S]*?<\/aside>/, ''))) sideBad.push('record.html shows Terms of use outside the media sidebar');
if (sideBad.length) fail(`${sideBad.length} media sidebar problems, e.g. ${sideBad.slice(0, 3).join('; ')}`); else ok(`media metadata sidebar follows Field labels rows 27-30 (${SIDEBAR.map(l => l.label).join(', ')}) on all ${R.filter(r => r.hasDA).length} digital-asset records, in order and nowhere else`);
finish('data-model');
