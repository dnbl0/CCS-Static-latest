// Writes the five collection landing pages (public/collections/<slug>/index.html) from one template,
// src/collection-landing.template.html. The pages differ only in their title, description and the collection they open on
// (the header, search overlay and footer come from src/partials); the collection text itself lives in the page script's data tables.
// `--check` writes nothing and exits 1 when a page is stale (run by `npm test`).
// Usage: node scripts/build-collection-pages.js [--check]
const fs = require('fs');
const { renderChrome } = require('./sync-partials');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const check = process.argv.includes('--check');

const COLLECTIONS = [
  { slug: 'grainger-museum', key: 'GMC', name: 'Grainger Museum Collection' },
  { slug: 'harry-brookes-allen-museum', key: 'HBA', name: 'Harry Brookes Allen Museum of Anatomy and Pathology' },
  { slug: 'henry-forman-atkinson-dental-museum', key: 'DENT', name: 'Henry Forman Atkinson Dental Museum' },
  { slug: 'medical-history-museum', key: 'MHM', name: 'Medical History Museum' },
  { slug: 'university-art-collection', key: 'UAC', name: 'University Art Collection' }
];

const template = fs.readFileSync(path.join(ROOT, 'src/collection-landing.template.html'), 'utf8');
const stale = [];
for (const { slug, key, name } of COLLECTIONS) {
  let page = template
    .replace('@@TITLE@@', `${name} — Cultural Collections Search`)
    .replace('@@DESCRIPTION@@', `Explore the ${name} at the University of Melbourne.`)
    .replaceAll('@@KEY@@', key);
  page = renderChrome(`collections/${slug}/index.html`, page); // header, search overlay and footer from src/partials
  if (page.includes('@@')) throw new Error(`unfilled placeholder in the ${slug} page`);

  const target = path.join(ROOT, 'public/collections', slug, 'index.html');
  if (fs.existsSync(target) && fs.readFileSync(target, 'utf8') === page) continue;
  stale.push(path.relative(ROOT, target));
  if (!check) fs.writeFileSync(target, page);
}

if (check && stale.length) {
  console.error(`FAIL: ${stale.length} collection page(s) differ from src/collection-landing.template.html. Run: node scripts/build-collection-pages.js\n  ${stale.join('\n  ')}`);
  process.exit(1);
}
console.log(check ? `ok: ${COLLECTIONS.length} collection pages match the template` : `built ${COLLECTIONS.length} collection pages (${stale.length} changed)`);
