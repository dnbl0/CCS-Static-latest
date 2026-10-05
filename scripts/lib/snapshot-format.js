// Reading and writing style snapshots (see docs/css-refactor.md).
// A snapshot file is gzip(JSON): { v, page, viewport, state, url, strings, propNames, styles, els, vars, usedVars }
//   strings   - interned value strings
//   propNames - computed-style property names (same order for every style row)
//   styles    - unique style rows, each an array of indexes into `strings` aligned with propNames
//   els       - [pathKey, styleIndex, [x, y, w, h] | null]  one per rendered element / pseudo-element
//   vars      - { root: {--name: value}, body: {--name: value} } resolved custom properties
//   usedVars  - custom property names referenced through var() by the page's CSS, inline styles or scripts
const fs = require('fs'), path = require('path'), zlib = require('zlib');

const ROOT = path.join(__dirname, '..', '..');
const SNAP_DIR = path.join(ROOT, '.style-snapshots');
const dirFor = label => path.join(SNAP_DIR, label);
const fileName = (page, viewport, state) => `${page}__${viewport}__${state}.json.gz`;

function writeSnapshot(label, snap) {
  const dir = dirFor(label); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, fileName(snap.page, snap.viewport, snap.state)), zlib.gzipSync(JSON.stringify(snap), { level: 6 }));
}

// Expands a stored snapshot into { page, viewport, state, elements: Map(path -> {style: {prop: value}, box}), vars, usedVars }
function expand(raw) {
  const rows = raw.styles.map(r => { const o = {}; for (let i = 0; i < r.length; i++) o[raw.propNames[i]] = raw.strings[r[i]]; return o; });
  const elements = new Map();
  for (const [p, si, box] of raw.els) elements.set(p, { style: rows[si], box });
  return { page: raw.page, viewport: raw.viewport, state: raw.state, url: raw.url, elements, vars: raw.vars || { root: {}, body: {} }, usedVars: new Set(raw.usedVars || []) };
}

function readSnapshot(file) { return expand(JSON.parse(zlib.gunzipSync(fs.readFileSync(file)))); }

function listSnapshots(label) {
  const dir = dirFor(label);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.json.gz')).sort();
}

module.exports = { ROOT, SNAP_DIR, dirFor, fileName, writeSnapshot, readSnapshot, expand, listSnapshots };
