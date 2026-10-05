// Exports the CSS token layer (public/styles/tokens/tokens.css) as design-token JSON that Figma can import as variable collections.
//   node scripts/build-figma-tokens.js           write design-tokens/figma/*
//   node scripts/build-figma-tokens.js --check   exit 1 if the export is stale or a tier rule is broken
// tokens.css is the source of truth (three tiers, marked by "TIER n" banner comments). The export has:
//   primitive.tokens.json, semantic.tokens.json, component.tokens.json   W3C DTCG, one per Figma collection, aliases as {path.to.token}
//   tokens-studio.json                                                   the same data as one Tokens Studio bundle (3 sets + a Light theme)
// Tier rules (also checked in tests/tokens.test.js): semantic may alias primitives only; component may alias semantic only.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CSS = path.join(ROOT, 'public/styles/tokens/tokens.css');
const OUT = path.join(ROOT, 'design-tokens/figma');
const TIERS = ['primitive', 'semantic', 'component'];
const ALLOWED = { primitive: [], semantic: ['primitive'], component: ['semantic'] };
const RUNTIME = new Set(['--header-total-height']); // measured and written by record.html at runtime, not a design token

function parse(css) {
  const banners = [...css.matchAll(/TIER (\d):/g)].map(m => ({ i: m.index, tier: TIERS[+m[1] - 1] }));
  const tokens = [];
  for (const m of css.matchAll(/^\s*(--[\w-]+)\s*:\s*([^;]+);/gm)) {
    const b = [...banners].reverse().find(x => x.i < m.index);
    if (!b || RUNTIME.has(m[1])) continue;
    tokens.push({ name: m[1], raw: m[2].trim().replace(/\s+/g, ' '), tier: b.tier });
  }
  return tokens;
}
const hex2 = n => Math.round(n).toString(16).padStart(2, '0');
function color(v) {
  let m = /^#([0-9a-f]{3,8})$/i.exec(v);
  if (m) { let h = m[1].toLowerCase(); if (h.length <= 4) h = [...h].map(c => c + c).join(''); return '#' + h; }
  m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*([\d.]+%?))?\s*\)$/i.exec(v);
  if (m) {
    let a = m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return '#' + hex2(m[1]) + hex2(m[2]) + hex2(m[3]) + (a < 1 ? hex2(a * 255) : '');
  }
  return null;
}
function build() {
  const tokens = parse(fs.readFileSync(CSS, 'utf8')), byName = new Map(), errors = [], notes = [];
  for (const t of tokens) { if (byName.has(t.name)) errors.push(`${t.name} is defined twice`); byName.set(t.name, t); }
  // dotted path from the dashed name; a token that is also a prefix of another gets a trailing ".base" so the tree stays valid
  const prefixes = new Set();
  for (const t of tokens) { const p = t.name.slice(2).split('-'); for (let i = 1; i < p.length; i++) prefixes.add(p.slice(0, i).join('-')); }
  for (const t of tokens) { const p = t.name.slice(2).split('-'); if (prefixes.has(p.join('-'))) p.push('base'); t.path = p; t.key = p.join('.'); }
  const resolve = (v, seen = []) => v.replace(/var\((--[\w-]+)\)/g, (_, n) => {
    const r = byName.get(n); if (!r || seen.includes(n)) return `var(${n})`; return resolve(r.raw, [...seen, n]);
  });
  for (const t of tokens) {
    const only = /^var\((--[\w-]+)\)$/.exec(t.raw);
    if (only) {
      const target = byName.get(only[1]);
      if (!target) { errors.push(`${t.name} -> ${only[1]} does not exist`); continue; }
      if (!ALLOWED[t.tier].includes(target.tier)) errors.push(`${t.name} (${t.tier}) may not alias ${target.name} (${target.tier})`);
      t.alias = target;
      continue;
    }
    if (t.tier !== 'primitive') {
      if (/var\(/.test(t.raw)) { t.expr = true; notes.push(`${t.name} (${t.tier}) is an expression, exported resolved`); }
      else errors.push(`${t.name} (${t.tier}) holds a raw value; upper tiers must alias the tier below`);
    }
    const resolved = resolve(t.raw);
    if (/var\(/.test(resolved)) errors.push(`${t.name}: cannot resolve ${t.raw}`);
    t.value = resolved;
  }
  const typeOf = t => {
    if (t.alias) return typeOf(t.alias);
    const v = t.value;
    if (color(v) || /^rgba?\(\s*\d+ \d+ \d+\s*\)$/.test(v)) return 'color';
    if (/^-?[\d.]+(px|rem|em)$/.test(v)) return 'dimension';
    if (/^-?[\d.]+m?s$/.test(v)) return 'duration';
    if (/^-?[\d.]+$/.test(v)) return 'number';
    if (/font-family/.test(t.name) || /^["']?[A-Z][\w ]+["']?,/.test(v)) return 'fontFamily';
    return 'string';
  };
  const valueOf = t => {
    if (t.alias) return `{${t.alias.key}}`;
    const ty = typeOf(t);
    if (ty === 'color') return color(t.value) || t.value.replace(/rgb\((\d+) (\d+) (\d+)\)/, (_, r, g, b) => '#' + hex2(r) + hex2(g) + hex2(b));
    if (ty === 'number') return Number(t.value);
    return t.value;
  };
  const STUDIO = { color: 'color', dimension: 'dimension', number: 'number', duration: 'other', fontFamily: 'fontFamilies', string: 'other' };
  const dtcg = {}, studio = { $metadata: { tokenSetOrder: TIERS } };
  for (const tier of TIERS) {
    dtcg[tier] = { $description: `Figma collection "${tier[0].toUpperCase() + tier.slice(1)}" (one mode). Generated from public/styles/tokens/tokens.css; do not edit.` };
    studio[tier] = {};
  }
  for (const t of tokens) {
    const ty = typeOf(t), val = valueOf(t);
    const put = (root, leaf) => { let n = root; t.path.slice(0, -1).forEach(k => { n = n[k] = n[k] || {}; }); n[t.path.at(-1)] = leaf; };
    put(dtcg[t.tier], { $type: ty, $value: val, $extensions: { css: { name: t.name } } });
    put(studio[t.tier], { value: typeof val === 'number' ? String(val) : val, type: STUDIO[ty] });
  }
  studio.$themes = [{ id: 'light', name: 'Light', selectedTokenSets: { primitive: 'source', semantic: 'enabled', component: 'enabled' } }];
  const files = { 'tokens-studio.json': studio };
  for (const tier of TIERS) files[`${tier}.tokens.json`] = dtcg[tier];
  return { files, errors, notes, tokens };
}
function main() {
  const { files, errors, notes, tokens } = build();
  if (errors.length) { console.error(errors.map(e => 'TOKEN ERROR: ' + e).join('\n')); process.exit(1); }
  const out = Object.entries(files).map(([f, d]) => [path.join(OUT, f), JSON.stringify(d, null, 2) + '\n']);
  if (process.argv.includes('--check')) {
    const stale = out.filter(([f, c]) => !fs.existsSync(f) || fs.readFileSync(f, 'utf8') !== c);
    if (stale.length) { console.error('Figma export is out of date, run `npm run build:figma-tokens`: ' + stale.map(([f]) => path.relative(ROOT, f)).join(', ')); process.exit(1); }
    console.log(`ok: ${tokens.length} tokens, Figma export up to date`);
  } else {
    fs.mkdirSync(OUT, { recursive: true });
    for (const [f, c] of out) fs.writeFileSync(f, c);
    console.log(`wrote ${out.length} files to design-tokens/figma (${tokens.length} tokens); ${notes.length} expression tokens exported resolved`);
  }
}
if (require.main === module) main();
module.exports = { build, parse };
