// Design tokens: tier rules hold, every var(--token) the site uses is defined, and the Figma export matches tokens.css.
const { PUBLIC, ROOT, fail, ok, walk, finish, fs, path } = require('./lib');
const { execFileSync } = require('child_process');
const { build, parse } = require(path.join(ROOT, 'scripts/build-figma-tokens.js'));

const { errors, tokens } = build();
errors.forEach(fail);
if (!errors.length) ok(`${tokens.length} tokens: semantic only aliases primitives, component only aliases semantic`);
try { execFileSync('node', [path.join(ROOT, 'scripts/build-figma-tokens.js'), '--check'], { stdio: 'pipe' }); ok('design-tokens/figma/* is up to date with tokens.css'); }
catch (e) { fail(String(e.stderr || e.message).trim()); }

const css = fs.readFileSync(path.join(PUBLIC, 'styles/tokens/tokens.css'), 'utf8');
const defined = new Set([...css.matchAll(/^\s*(--[\w-]+)\s*:/gm)].map(m => m[1]));
const files = walk(PUBLIC, p => /\.(css|html|js)$/.test(p) && !/bootstrap-uom|[\\/]components[\\/][A-Z]|collection-data\.js/.test(p) && !p.endsWith('tokens.css'));
// custom properties a stylesheet or script defines locally (--dyn-*, component-scoped vars) or that Bootstrap provides
const local = new Set();
for (const f of files) for (const m of fs.readFileSync(f, 'utf8').matchAll(/(--[\w-]+)\s*:/g)) local.add(m[1]);
let uses = 0;
for (const f of files) {
  for (const m of fs.readFileSync(f, 'utf8').matchAll(/var\((--[\w-]+)(,)?/g)) {
    uses++;
    if (!defined.has(m[1]) && !local.has(m[1]) && !/^--bs-/.test(m[1]) && !m[2]) fail(`${path.relative(PUBLIC, f)}: var(${m[1]}) is not defined anywhere`);
  }
}
ok(`${uses} var() uses across ${files.length} files all resolve`);
finish('tokens');
