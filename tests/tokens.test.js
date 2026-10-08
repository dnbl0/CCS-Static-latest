// Design tokens: tier rules hold, every var(--token) the site uses is defined.
const { PUBLIC, ROOT, fail, ok, walk, finish, fs, path } = require('./lib');
// tokens.css has three tiers marked by "TIER n" banner comments: semantic may alias primitives only, component may alias semantic only
const TIERS = ['primitive', 'semantic', 'component'];
const ALLOWED = { primitive: [], semantic: ['primitive'], component: ['semantic'] };
const RUNTIME = new Set(['--header-total-height']); // measured and written by record.html at runtime, not a design token
const tokenCss = fs.readFileSync(path.join(PUBLIC, 'styles/tokens/tokens.css'), 'utf8');
const banners = [...tokenCss.matchAll(/TIER (\d):/g)].map(m => ({ i: m.index, tier: TIERS[+m[1] - 1] }));
const tokens = [], byName = new Map(), errors = [];
for (const m of tokenCss.matchAll(/^\s*(--[\w-]+)\s*:\s*([^;]+);/gm)) {
  const b = [...banners].reverse().find(x => x.i < m.index);
  if (!b || RUNTIME.has(m[1])) continue;
  const t = { name: m[1], raw: m[2].trim().replace(/\s+/g, ' '), tier: b.tier };
  if (byName.has(t.name)) errors.push(`${t.name} is defined twice`);
  byName.set(t.name, t); tokens.push(t);
}
for (const t of tokens) {
  const only = /^var\((--[\w-]+)\)$/.exec(t.raw);
  if (only) {
    const target = byName.get(only[1]);
    if (!target) errors.push(`${t.name} -> ${only[1]} does not exist`);
    else if (!ALLOWED[t.tier].includes(target.tier)) errors.push(`${t.name} (${t.tier}) may not alias ${target.name} (${target.tier})`);
  } else if (t.tier !== 'primitive' && !/var\(/.test(t.raw)) errors.push(`${t.name} (${t.tier}) holds a raw value; upper tiers must alias the tier below`);
}
errors.forEach(fail);
if (!errors.length) ok(`${tokens.length} tokens: semantic only aliases primitives, component only aliases semantic`);

const css = fs.readFileSync(path.join(PUBLIC, 'styles/tokens/tokens.css'), 'utf8');
const defined = new Set([...css.matchAll(/^\s*(--[\w-]+)\s*:/gm)].map(m => m[1]));
const files = walk(PUBLIC, p => /\.(css|html|js)$/.test(p) && !/bootstrap-uom|collection-data\.js/.test(p) && !p.endsWith('tokens.css'));
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
