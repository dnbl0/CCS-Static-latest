// Page integrity: every public/**/*.html has a <title>, <h1>, lang, no merge
// markers, and every local href/src resolves to a real file under public/.
const { PUBLIC, fail, warn, ok, walk, finish, fs, path } = require('./lib');

const pages = walk(PUBLIC, p => p.endsWith('.html'));
const rel = p => path.relative(PUBLIC, p);

function resolves(target, pageFile) {
  let t = target.split('#')[0].split('?')[0];
  if (!t) return true;
  try { t = decodeURIComponent(t); } catch (e) { /* keep raw */ }
  const base = t.startsWith('/') ? path.join(PUBLIC, t) : path.resolve(path.dirname(pageFile), t);
  if (!base.startsWith(PUBLIC)) return false;
  const candidates = [base, base + '.html', path.join(base, 'index.html')];
  return candidates.some(c => fs.existsSync(c) && fs.statSync(c).isFile());
}

const SKIP = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\{\{|data:|javascript:)/i;

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const name = rel(file);

  if (!/<title>\s*\S[\s\S]*?<\/title>/i.test(html)) fail(`${name}: missing or empty <title>`);
  if (!/<html[^>]*\slang=["'][^"']+["']/i.test(html)) fail(`${name}: <html> has no lang attribute`);
  if (/^(<{7}|={7}|>{7})(\s|$)/m.test(html)) fail(`${name}: unresolved merge conflict marker`);

  // Strip scripts/comments so markup inside JS templates is not counted/checked.
  const noComments = html.replace(/<!--[\s\S]*?-->/g, '');
  const markup = noComments.replace(/<script[\s\S]*?<\/script>/gi, '');
  const h1 = (markup.match(/<h1[\s>]/gi) || []).length;
  if (h1 === 0 && !/<h1[\s>]/i.test(noComments)) warn(`${name}: no <h1> at all`);
  else if (h1 === 0) warn(`${name}: no static <h1> (only rendered from script)`);
  else if (h1 > 1) warn(`${name}: ${h1} static <h1> elements`);

  const seen = new Set();
  const re = /\s(?:href|src)=["']([^"']*)["']/gi;
  let m;
  while ((m = re.exec(markup))) {
    const target = m[1].trim();
    if (!target || SKIP.test(target) || seen.has(target)) continue;
    seen.add(target);
    if (!resolves(target, file)) {
      // Missing pictures degrade gracefully (warning); missing css/js/pages are hard failures.
      const isImage = /\.(jpe?g|png|gif|svg|webp|avif|ico)$/i.test(target.split(/[?#]/)[0]);
      (isImage ? warn : fail)(`${name}: broken local reference "${target}"`);
    }
  }
}

ok(`${pages.length} HTML pages checked`);
const home = fs.readFileSync(path.join(PUBLIC, 'index.html'), 'utf8');
const collections = fs.readFileSync(path.join(PUBLIC, 'collections/index.html'), 'utf8');
const record = fs.readFileSync(path.join(PUBLIC, 'collections/record.html'), 'utf8');
const results = fs.readFileSync(path.join(PUBLIC, 'search/search-results.html'), 'utf8');
if (home.includes('class="stats-strip"')) fail('home: stats strip still visible');
if (collections.includes('id="h-facts"') || collections.includes('id="h-themes"')) fail('collections: stats or object type section still visible');
if (/data-contact-btn|>Report an issue<|\{\{ shareText \}\}|value="\{\{ hasAdvisory \}\}"/.test(record)) fail('record: removed actions or advisory still visible');
if (results.includes('Options within a filter are combined with OR.') || results.includes('{{ sec.group }}')) fail('filters: help text or group subheadings still visible');
// The count badge and toggle track styles live in the page stylesheet (inline styles were moved out of the page).
const resultsDir = path.join(PUBLIC, 'styles/pages/search-results');
const resultsCss = fs.readdirSync(resultsDir).sort().map(f => fs.readFileSync(path.join(resultsDir, f), 'utf8')).join('\n');
const cssRules = resultsCss.split('}').map(r => r.replace(/\s+/g, ' '));
const roundedRule = (...needles) => cssRules.some(r => (r.includes('border-radius: 999px') || r.includes('border-radius: var(--radius-pill)')) && needles.every(n => r.includes(n)));
if (!roundedRule('height: 22px', 'padding: 0 var(--space-6)') || !roundedRule('width: 38px', 'height: 22px')) fail('filters: count or toggle track is not rounded');
const runtime = fs.readFileSync(path.join(PUBLIC, 'support.js'), 'utf8');
if (!results.includes('data-dc-plain-interp') || !runtime.includes('return plainInterp ? String(v) : h("span", { key: i, className: "sc-interp" }, String(v));')) fail('filters: modal interpolations still use wrapper spans');
finish('page-integrity');
