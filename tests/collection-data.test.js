// Data integrity for public/collection-data.js (an IIFE assigning window.CCS).
const { PUBLIC, fail, warn, ok, finish, fs, path } = require('./lib');
const vm = require('vm');

const SPEC_LABELS = [
  'Object type', 'Date', 'Creator', 'Associated entity', 'Place', 'Description', 'Series',
  'Editions', 'Material', 'Dimensions (H x W x D)', 'Inscription', 'Language',
  'Cultural affiliation', 'UoM ID', 'Accession number', 'Named collection', 'Collection', 'Access',
  'Classification', 'Subject', 'Source URL', 'Related parent record', 'Related child record',
  'Related record', 'Producer'
];

const file = path.join(PUBLIC, 'collection-data.js');
const src = fs.readFileSync(file, 'utf8');
const sandbox = { window: {}, console };
vm.createContext(sandbox);
try {
  vm.runInContext(src, sandbox, { filename: 'collection-data.js' });
} catch (e) {
  fail('collection-data.js did not load in a bare sandbox: ' + e.message);
  finish('collection-data');
}
const CCS = sandbox.window.CCS;
if (!CCS || !CCS.records) { fail('window.CCS.records not defined'); finish('collection-data'); }

const ids = CCS.ids;
const records = Object.values(CCS.records);
ok(`${records.length} records loaded`);

// Unique ids
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) fail(`duplicate record ids: ${[...new Set(dupes)].join(', ')}`);
if (ids.length !== records.length) warn(`ids list (${ids.length}) and records map (${records.length}) differ in size`);

// Titles
for (const r of records) {
  if (typeof r.title !== 'string' || !r.title.trim()) fail(`record ${r.id}: empty title`);
}

// Field labels must come from the spec list
const spec = new Set(SPEC_LABELS);
const seenLabels = new Set();
for (const r of records) {
  for (const f of r.fields) {
    seenLabels.add(f.label);
    if (!spec.has(f.label)) fail(`record ${r.id}: field label "${f.label}" not in the spec list`);
  }
}
// (c) key labels from the spec are actually emitted by the data/build code
for (const label of SPEC_LABELS) {
  if (!src.includes(`'${label}'`)) fail(`spec label "${label}" missing from collection-data.js`);
  else if (!seenLabels.has(label)) warn(`spec label "${label}" is defined but no record populates it`);
}

// Accession coverage (report only)
const withAcc = records.filter(r => r.fields.some(f => f.label === 'Accession number')).length;
ok(`accession number present on ${withAcc}/${records.length} records`);

// Files on disk: slides (images + AV) and image lists
const exists = p => {
  let d = p;
  try { d = decodeURIComponent(p); } catch (e) { /* keep raw */ }
  return fs.existsSync(path.join(PUBLIC, d));
};
let checked = 0;
for (const r of records) {
  const srcs = new Set([...(r.images || []), ...(r.slides || []).map(s => s.src)]);
  for (const s of srcs) {
    if (/^(https?:)?\/\//.test(s)) continue;
    checked++;
    if (!exists(s)) {
      const isAsset = /^\/assets\//.test(s);
      // Missing /assets files (ASSET_IMAGES / ASSET_AV) are hard bugs; a missing
      // legacy web image under /images is reported as a warning.
      (isAsset ? fail : warn)(`record ${r.id}: file not found on disk: ${s}`);
    }
  }
}
ok(`${checked} media references checked`);

// Access messages (CCS-68/69), usage notice (CCS-50), caption support (CCS-27)
const withDA = records.filter(r => r.hasDA);
for (const r of withDA) {
  if (r.webAccess === 'View only' && !r.accessMessage) fail(`record ${r.id}: View only record has no download message`);
  if (r.webAccess === 'Request to view' && !r.viewRestricted) fail(`record ${r.id}: Request to view record is not marked restricted`);
  if ((r.advisories.length || r.classification) && !r.usageNotice.length) fail(`record ${r.id}: advisory or classification without a usage notice`);
}
if (!sandbox.window.CCS.licences['Not licensed'] || sandbox.window.CCS.licences['Not licensed'].view !== false) fail('Not licensed licence type must be defined with view: false');
ok(`${withDA.length} digital-asset records have access messages and usage notices where required`);

// Theme filter (CCS-20/38): themes derive from the museum classification; report coverage
const themed = sandbox.window.CCS.items.filter(i => Array.isArray(i.theme) && i.theme.length).length;
if (!themed) fail('no item has a theme');
else ok(`theme present on ${themed}/${sandbox.window.CCS.items.length} items`);

// CCS-27: every record lists its usage rights (accession number, credit, copyright); caption is for digital assets only
{
  const R = Object.values(CCS.records);
  const need = (r, ...labels) => labels.filter(l => !r.rights.some(x => x.label === l));
  const bad = R.filter(r => need(r, 'Accession number', 'Credit line', 'Copyright').length || (r.hasDA && need(r, 'Caption').length) || (!r.hasDA && !need(r, 'Caption').length));
  if (bad.length) fail('CCS-27 usage rights are incomplete on ' + bad.length + ' records (for example #' + bad[0].id + ')');
  else ok('CCS-27 usage rights listed on all ' + R.length + ' records (caption on digital assets only)');
}
finish('collection-data');
