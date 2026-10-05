#!/usr/bin/env node
// Compares two computed-style snapshots (see scripts/style-snapshot.js and docs/css-refactor.md).
//   node scripts/style-diff.js <labelA> <labelB> [--tokens] [--partial] [--verbose] [--allow=scripts/style-diff.allow.json] [--limit=N] [--tolerance=0.25]
// Exit code 0 = identical (apart from allowed differences), 1 = differences, 2 = usage / missing snapshots.
//   --partial  only compare the snapshots present in <labelB> (e.g. after `style:snapshot -- b --pages=index`); otherwise a missing snapshot is a failure
//   --tokens   custom properties: ignore unused ones (added, removed, changed), but fail when the resolved value of a USED
//              custom property changes or a used one disappears. Without it every custom property difference is reported.
// Element differences (added / removed / changed computed style / moved or resized box) are always reported.
const fs = require('fs'), path = require('path');
const { readSnapshot, listSnapshots, dirFor, ROOT } = require('./lib/snapshot-format');

const DEFAULT_TOLERANCE = 0.25;
const DEFAULT_ALLOW = path.join(__dirname, 'style-diff.allow.json');

// An allow-list entry: { reason, page?, viewport?, state?, type?: 'changed'|'added'|'removed'|'box'|'var', path?: regex, property?: regex|string, from?, to? }
// Every field present must match; `path`, `property`, `page`, `state` are regular expressions (anchored), `viewport`, `from`, `to` exact.
function matcher(entry) {
  const re = s => (s == null ? null : new RegExp('^(?:' + s + ')$'));
  const m = { page: re(entry.page), state: re(entry.state), path: re(entry.path), property: re(entry.property) };
  return d => (!m.page || m.page.test(d.page)) && (!m.state || m.state.test(d.state)) && (entry.viewport == null || String(entry.viewport) === String(d.viewport)) &&
    (!entry.type || entry.type === d.type) && (!m.path || m.path.test(d.path || '')) && (!m.property || m.property.test(d.property || '')) &&
    (entry.from == null || entry.from === d.from) && (entry.to == null || entry.to === d.to);
}

function loadAllow(file) {
  if (!file || !fs.existsSync(file)) return [];
  const list = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(list)) throw new Error(file + ' must be a JSON array');
  list.forEach(e => { if (!e.reason) throw new Error('every allow-list entry needs a "reason": ' + JSON.stringify(e)); });
  return list.map(matcher);
}

// Text measurement differs by about 0.02px between otherwise identical runs, so numbers that differ by no more than the tolerance
// (default 0.25px, --tolerance=N) are treated as equal. Everything else in the value has to match exactly.
const NUM = /-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g;
function sameValue(a, b, tol) {
  if (a === b) return true;
  if (a == null || b == null || tol <= 0) return false;
  const na = String(a).match(NUM), nb = String(b).match(NUM);
  if (!na || !nb || na.length !== nb.length || String(a).replace(NUM, '#') !== String(b).replace(NUM, '#')) return false;
  return na.every((x, i) => Math.abs(parseFloat(x) - parseFloat(nb[i])) <= tol);
}

// Differences between two expanded snapshots of the same page/viewport/state. Returns plain records.
function diffOne(a, b, opts = {}) {
  const id = { page: a.page, viewport: a.viewport, state: a.state }, out = [], tol = opts.tolerance == null ? DEFAULT_TOLERANCE : opts.tolerance;
  for (const [p] of a.elements) if (!b.elements.has(p)) out.push({ ...id, type: 'removed', path: p });
  for (const [p, eb] of b.elements) {
    const ea = a.elements.get(p);
    if (!ea) { out.push({ ...id, type: 'added', path: p }); continue; }
    for (const prop of new Set([...Object.keys(ea.style), ...Object.keys(eb.style)])) {
      if (!sameValue(ea.style[prop], eb.style[prop], tol)) out.push({ ...id, type: 'changed', path: p, property: prop, from: ea.style[prop], to: eb.style[prop] });
    }
    const x = ea.box, y = eb.box;
    if (x && y && x.some((v, i) => Math.abs(v - y[i]) > tol)) out.push({ ...id, type: 'box', path: p, property: 'box', from: x.join(','), to: y.join(',') });
  }
  // custom properties resolved on :root and body
  for (const scope of ['root', 'body']) {
    const va = a.vars[scope] || {}, vb = b.vars[scope] || {};
    for (const n of new Set([...Object.keys(va), ...Object.keys(vb)])) {
      if (sameValue(va[n], vb[n], tol)) continue;
      const used = a.usedVars.has(n);
      if (opts.tokens && !used) continue;
      out.push({ ...id, type: 'var', path: scope, property: n, from: va[n], to: vb[n], used });
    }
  }
  return out;
}

function diffLabels(labelA, labelB, opts = {}) {
  let fa = listSnapshots(labelA); const fb = listSnapshots(labelB);
  if (!fa.length) throw new Error(`no snapshots for "${labelA}" (run: npm run style:snapshot -- ${labelA})`);
  if (!fb.length) throw new Error(`no snapshots for "${labelB}" (run: npm run style:snapshot -- ${labelB})`);
  if (opts.partial) fa = fa.filter(f => fb.includes(f));
  const diffs = [], missing = [], extra = fb.filter(f => !fa.includes(f));
  for (const f of fa) {
    if (!fb.includes(f)) { missing.push(f); continue; }
    diffs.push(...diffOne(readSnapshot(path.join(dirFor(labelA), f)), readSnapshot(path.join(dirFor(labelB), f)), opts));
  }
  return { diffs, missing, extra, compared: fa.length - missing.length };
}

function applyAllow(diffs, allow) {
  const kept = [], allowed = [];
  for (const d of diffs) (allow.some(m => m(d)) ? allowed : kept).push(d);
  return { kept, allowed };
}

const short = (s, n = 70) => { s = String(s); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
const tail = p => { const parts = p.split(' > '); return parts.slice(-3).join(' > '); };

function report(res, { verbose, limit }) {
  const lines = [], { kept } = res;
  const byCombo = new Map();
  for (const d of kept) { const k = `${d.page} @${d.viewport} [${d.state}]`; if (!byCombo.has(k)) byCombo.set(k, []); byCombo.get(k).push(d); }
  for (const [combo, list] of byCombo) {
    lines.push(`\n${combo}: ${list.length} difference(s)`);
    const added = list.filter(d => d.type === 'added'), removed = list.filter(d => d.type === 'removed');
    if (added.length) lines.push(`  + ${added.length} element(s) added` + (verbose ? '' : ' e.g. ' + added.slice(0, 2).map(d => tail(d.path)).join(' | ')));
    if (removed.length) lines.push(`  - ${removed.length} element(s) removed` + (verbose ? '' : ' e.g. ' + removed.slice(0, 2).map(d => tail(d.path)).join(' | ')));
    if (verbose) { added.forEach(d => lines.push('    + ' + d.path)); removed.forEach(d => lines.push('    - ' + d.path)); }
    // property changes grouped by (property, old -> new)
    const groups = new Map();
    for (const d of list.filter(x => x.type === 'changed' || x.type === 'box' || x.type === 'var')) {
      const k = [d.type, d.property, d.from, d.to].join('\u0000');
      if (!groups.has(k)) groups.set(k, { d, paths: [] });
      groups.get(k).paths.push(d.path);
    }
    const sorted = [...groups.values()].sort((x, y) => y.paths.length - x.paths.length);
    for (const { d, paths } of sorted.slice(0, verbose ? Infinity : limit)) {
      const what = d.type === 'var' ? `custom property ${d.property}${d.used ? ' (used)' : ''} on ${d.path}` : d.type === 'box' ? 'box (x,y,w,h)' : d.property;
      lines.push(`  ~ ${what}: ${short(d.from)} -> ${short(d.to)}   x${paths.length}`);
      const show = verbose ? paths : paths.slice(0, 2);
      show.forEach(p => lines.push('      ' + (d.type === 'var' ? '' : tail(p))));
      if (!verbose && paths.length > 2) lines.push(`      … and ${paths.length - 2} more (--verbose lists all)`);
    }
    if (!verbose && sorted.length > limit) lines.push(`  … ${sorted.length - limit} more kinds of change (--verbose or --limit=N)`);
  }
  return lines.join('\n');
}

function main() {
  const args = process.argv.slice(2), labels = args.filter(a => !a.startsWith('--'));
  const flag = n => args.includes('--' + n), opt = n => { const a = args.find(x => x.startsWith('--' + n + '=')); return a ? a.split('=')[1] : null; };
  if (labels.length !== 2) { console.error('usage: node scripts/style-diff.js <labelA> <labelB> [--tokens] [--partial] [--verbose] [--allow=file] [--limit=N] [--tolerance=px]'); process.exit(2); }
  let res;
  try {
    const allow = loadAllow(opt('allow') ? path.resolve(ROOT, opt('allow')) : DEFAULT_ALLOW);
    res = diffLabels(labels[0], labels[1], { tokens: flag('tokens'), partial: flag('partial'), tolerance: opt('tolerance') == null ? undefined : +opt('tolerance') });
    Object.assign(res, applyAllow(res.diffs, allow));
  } catch (e) { console.error('style-diff: ' + e.message); process.exit(2); }
  const out = report(res, { verbose: flag('verbose'), limit: +opt('limit') || 25 });
  if (out) console.log(out);
  const counts = { added: 0, removed: 0, changed: 0, box: 0, var: 0 };
  res.kept.forEach(d => counts[d.type]++);
  const problems = res.kept.length + res.missing.length;
  console.log(`\nstyle-diff ${labels[0]} -> ${labels[1]}${flag('tokens') ? ' (--tokens)' : ''}: compared ${res.compared} snapshots; ` +
    `${res.kept.length} difference(s) [${counts.added} added, ${counts.removed} removed, ${counts.changed} style, ${counts.box} box, ${counts.var} custom property]` +
    `${res.allowed.length ? `, ${res.allowed.length} allowed` : ''}` +
    `${res.missing.length ? `; ${res.missing.length} snapshot(s) missing from ${labels[1]}: ${res.missing.slice(0, 3).join(', ')}` : ''}` +
    `${res.extra.length ? `; ${res.extra.length} extra in ${labels[1]} (ignored)` : ''}`);
  console.log(problems ? 'RESULT: DIFFERENT' : 'RESULT: IDENTICAL');
  process.exit(problems ? 1 : 0);
}

if (require.main === module) main();
module.exports = { sameValue, diffOne, diffLabels, applyAllow, loadAllow, matcher, report };
