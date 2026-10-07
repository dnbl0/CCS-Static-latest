// Size budgets for what a page loads from this site, so a page does not quietly get heavier. Raw (uncompressed) bytes of
// the linked local stylesheets and scripts per page, and of any one image the page names directly. Lower a budget when a
// page gets lighter; raise one only on purpose. The page runtime's libraries (vendor/runtime) are loaded by support.js,
// not named in the page, and are not counted.
const { PUBLIC, fail, ok, walk, finish, fs, path } = require('./lib');

const BUDGET = { cssKB: 220, jsKB: 650, imageKB: 800 };
const sizeOf = (page, url) => {
  const file = url.startsWith('/') ? path.join(PUBLIC, url) : path.resolve(path.dirname(page), url);
  return fs.existsSync(file) ? fs.statSync(file).size : 0;
};

let pages = 0;
for (const page of walk(PUBLIC, (p) => p.endsWith('.html'))) {
  const html = fs.readFileSync(page, 'utf8');
  const name = path.relative(PUBLIC, page);
  const local = (urls) => urls.filter((u) => !/^(?:https?:)?\/\//.test(u) && !u.includes('{{'));
  const css = local([...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((m) => m[1]));
  const js = local([...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]));
  const images = local([...html.matchAll(/<img[^>]* src="([^"]+)"/g)].map((m) => m[1]));
  if (!css.length && !js.length) continue;
  pages++;

  const cssKB = css.reduce((n, u) => n + sizeOf(page, u), 0) / 1024;
  const jsKB = js.reduce((n, u) => n + sizeOf(page, u), 0) / 1024;
  if (cssKB > BUDGET.cssKB) fail(`${name}: ${Math.round(cssKB)} KB of stylesheets (budget ${BUDGET.cssKB} KB)`);
  if (jsKB > BUDGET.jsKB) fail(`${name}: ${Math.round(jsKB)} KB of scripts (budget ${BUDGET.jsKB} KB)`);
  for (const image of images) {
    const kb = sizeOf(page, image) / 1024;
    if (kb > BUDGET.imageKB) fail(`${name}: ${image} is ${Math.round(kb)} KB (budget ${BUDGET.imageKB} KB per image)`);
  }
}
ok(`${pages} pages within the budgets (stylesheets ${BUDGET.cssKB} KB, scripts ${BUDGET.jsKB} KB, images ${BUDGET.imageKB} KB each)`);
finish('budgets');
