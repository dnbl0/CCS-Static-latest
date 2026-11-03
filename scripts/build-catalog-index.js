// Exports the catalogue from the Rails app's Solr index into public/catalog/catalog-data.json, the file the static
// catalogue (public/catalog/) searches in the browser. Run it after the index changes (new CSV exports):
//
//   SOLR_URL=http://solr:PASSWORD@localhost:8984/solr/blacklight-core node scripts/build-catalog-index.js
//
// The documents are exactly what the Rails app searches, so the static copy answers from the same records.
// Reproduce the index first with the Rails app (bin/rails collections:index, see ead-ccs-test/README.md).
const fs = require('fs');
const path = require('path');
const { toDataFiles } = require('./lib/catalog-export');

const dir = path.join(__dirname, '..', 'public', 'catalog');
const out = path.join(dir, 'catalog-data.json');
const detailDir = path.join(dir, 'catalog-detail');
const textOut = path.join(dir, 'catalog-text.json');
const raw = process.env.SOLR_URL;
if (!raw) { console.error('Set SOLR_URL, e.g. http://localhost:8983/solr/blacklight-core (user and password may be in the URL)'); process.exit(1); }

const url = new URL(raw);
const headers = {};
if (url.username) {
  headers.Authorization = 'Basic ' + Buffer.from(`${decodeURIComponent(url.username)}:${decodeURIComponent(url.password)}`).toString('base64');
  url.username = ''; url.password = '';
}
const select = `${url.toString().replace(/\/$/, '')}/select`;

async function main() {
  const docs = [];
  const rows = 5000;
  for (let start = 0; ; start += rows) {
    const res = await fetch(`${select}?q=*:*&wt=json&sort=id+asc&rows=${rows}&start=${start}`, { headers });
    if (!res.ok) throw new Error(`Solr answered ${res.status}`);
    const body = (await res.json()).response;
    docs.push(...body.docs);
    process.stdout.write(`\r${docs.length}/${body.numFound}`);
    if (docs.length >= body.numFound || !body.docs.length) break;
  }
  const files = toDataFiles(docs);
  fs.rmSync(detailDir, { recursive: true, force: true });
  fs.mkdirSync(detailDir, { recursive: true });
  fs.writeFileSync(out, files.main + '\n');
  fs.writeFileSync(textOut, files.text + '\n');
  for (const [bucket, json] of Object.entries(files.details)) fs.writeFileSync(path.join(detailDir, `${bucket}.json`), json + '\n');
  console.log(`\nWrote ${path.relative(process.cwd(), out)} (${docs.length} records, ${(fs.statSync(out).size / 1e6).toFixed(1)} MB) and ${Object.keys(files.details).length} detail files in ${path.relative(process.cwd(), detailDir)}`);
}
main().catch(e => { console.error(e.message); process.exit(1); });
