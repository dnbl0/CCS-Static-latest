// The page runtime (support.js) loads React, ReactDOM and Babel. runtime-libs.js points it at the copies in
// vendor/runtime; this checks that every page that loads support.js loads runtime-libs.js first and that the copies
// are the builds support.js pins by hash.
const crypto = require('crypto');
const { PUBLIC, fail, ok, walk, finish, fs, path } = require('./lib');

const runtime = fs.readFileSync(path.join(PUBLIC, 'support.js'), 'utf8');
const pins = [
  ['REACT', 'react.production.min.js'],
  ['REACT_DOM', 'react-dom.production.min.js'],
  ['BABEL', 'babel.min.js']
];
for (const [name, file] of pins) {
  const url = runtime.match(new RegExp(`var ${name}_URL = "([^"]+)"`))?.[1];
  const sri = runtime.match(new RegExp(`var ${name}_SRI = "([^"]+)"`))?.[1];
  if (!url || !sri) { fail(`support.js: cannot find ${name}_URL / ${name}_SRI`); continue; }
  if (!fs.readFileSync(path.join(PUBLIC, 'runtime-libs.js'), 'utf8').includes(url)) fail(`runtime-libs.js does not map ${url}`);
  const copy = path.join(PUBLIC, 'vendor/runtime', file);
  if (!fs.existsSync(copy)) { fail(`vendor/runtime/${file} is missing`); continue; }
  const digest = `sha384-${crypto.createHash('sha384').update(fs.readFileSync(copy)).digest('base64')}`;
  if (digest !== sri) fail(`vendor/runtime/${file} does not match the hash support.js pins (${sri})`);
}

let pages = 0;
for (const page of walk(PUBLIC, (p) => p.endsWith('.html'))) {
  const html = fs.readFileSync(page, 'utf8');
  const support = html.search(/<script src="(?:\.\.\/)*support\.js"/);
  if (support === -1) continue;
  pages++;
  const libs = html.search(/<script src="(?:\.\.\/)*runtime-libs\.js"/);
  if (libs === -1 || libs > support) fail(`${path.relative(PUBLIC, page)}: load runtime-libs.js before support.js`);
}
ok(`${pages} pages load runtime-libs.js before support.js; vendor/runtime matches the pinned hashes`);
finish('runtime-libs');
