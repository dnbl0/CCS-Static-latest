// Self-test for the CSS safety net (scripts/style-snapshot.js + scripts/style-diff.js, see docs/css-refactor.md):
// part 1 checks the diff engine on synthetic snapshots; part 2 (needs Chromium) snapshots one page twice and
// proves the diff is empty, then proves a real CSS change is caught. Skipped, not failed, without Chromium.
const { ok, fail, finish, fs, path } = require('./lib');
const { diffOne, applyAllow, matcher, sameValue } = require('../scripts/style-diff');
const { readSnapshot, listSnapshots, dirFor } = require('../scripts/lib/snapshot-format');

const eq = (a, b, msg) => (JSON.stringify(a) === JSON.stringify(b) ? ok(msg) : fail(`${msg}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`));
const snap = (els, vars = {}, used = []) => ({ page: 'p', viewport: '1280', state: 'default', elements: new Map(Object.entries(els)), vars: { root: vars, body: {} }, usedVars: new Set(used) });
const el = (style, box = [0, 0, 10, 10]) => ({ style, box });

/* ---- part 1: diff engine ------------------------------------------------------------------------------------------- */
{
  const a = snap({ 'html:1': el({ color: 'red', width: '10px' }), 'html:1 > p:1': el({ color: 'red' }) });
  eq(diffOne(a, a).length, 0, 'identical snapshots have no differences');

  const b = snap({ 'html:1': el({ color: 'blue', width: '10px' }), 'html:1 > div:1': el({ color: 'red' }) });
  const d = diffOne(a, b);
  eq(d.filter(x => x.type === 'removed').map(x => x.path), ['html:1 > p:1'], 'a removed element is reported');
  eq(d.filter(x => x.type === 'added').map(x => x.path), ['html:1 > div:1'], 'an added element is reported');
  eq(d.filter(x => x.type === 'changed').map(x => [x.property, x.from, x.to]), [['color', 'red', 'blue']], 'a changed property is reported with old and new value');

  eq(diffOne(snap({ 'a:1': el({ width: '69.7969px' }, [0, 0, 69.8, 10]) }), snap({ 'a:1': el({ width: '69.8125px' }, [0, 0, 69.82, 10]) })).length, 0, 'sub-pixel text jitter within the tolerance is ignored');
  eq(diffOne(snap({ 'a:1': el({ width: '10px' }) }), snap({ 'a:1': el({ width: '11px' }) })).length, 1, 'a 1px change is reported');
  eq(diffOne(snap({ 'a:1': el({}, [0, 0, 10, 10]) }), snap({ 'a:1': el({}, [0, 1, 10, 10]) })).map(x => x.type), ['box'], 'a moved box is reported');
  eq(sameValue('rgb(0, 15, 70)', 'rgb(0, 15, 71)', 0.25), false, 'colour channels are not treated as jitter beyond the tolerance');
  eq(sameValue('1px solid red', '1px solid blue', 0.25), false, 'non-numeric parts must match exactly');

  // custom properties: --tokens ignores unused ones, fails on changes to used ones
  const v1 = snap({}, { '--used': '1px', '--dead': 'red' }, ['--used']), v2 = snap({}, { '--used': '2px', '--dead': 'blue' }, ['--used']);
  eq(diffOne(v1, v2).map(x => x.property).sort(), ['--dead', '--used'], 'without --tokens every custom property change is reported');
  eq(diffOne(v1, v2, { tokens: true }).map(x => x.property), ['--used'], '--tokens reports only used custom properties');
  eq(diffOne(v1, snap({}, { '--used': '1px' }, ['--used']), { tokens: true }).length, 0, '--tokens lets an unused custom property be deleted');
  eq(diffOne(v1, snap({}, { '--dead': 'red' }, ['--used']), { tokens: true }).map(x => x.property), ['--used'], '--tokens fails when a used custom property disappears');

  // allow list
  const diffs = diffOne(a, b), allow = [matcher({ type: 'removed', path: 'html:1 > p:1', reason: 'test' }), matcher({ type: 'changed', property: 'col.*', page: 'p', viewport: 1280, reason: 'test' })];
  const { kept, allowed } = applyAllow(diffs, allow);
  eq([kept.length, allowed.length], [1, 2], 'allow-list entries suppress matching differences only');
}

/* ---- part 2: real snapshots ---------------------------------------------------------------------------------------- */
(async () => {
  const { findChromium } = require('../scripts/lib/chromium');
  const { exe, chromium } = findChromium();
  if (!chromium || !exe) { console.log('SKIP style-diff browser checks: no Chromium found'); return finish('style-diff'); }
  const cp = require('child_process'), root = path.join(__dirname, '..');
  const run = (script, args) => cp.spawnSync('node', [path.join(root, 'scripts', script), ...args], { cwd: root, encoding: 'utf8' });
  const labels = ['selftest-a', 'selftest-b', 'selftest-c'];
  try {
    const only = ['--pages=contact', '--states=default,mobile-menu', '--viewports=378'];
    for (const l of labels.slice(0, 2)) { const r = run('style-snapshot.js', [l, ...only]); if (r.status !== 0) { fail('snapshot failed: ' + r.stdout + r.stderr); return finish('style-diff'); } }
    eq(listSnapshots('selftest-a').length, 2, 'snapshot wrote one file per page/state/viewport');
    const s = readSnapshot(path.join(dirFor('selftest-a'), listSnapshots('selftest-a')[0]));
    if (s.elements.size > 100 && Object.keys(s.vars.root).length > 10) ok(`snapshot holds ${s.elements.size} elements and ${Object.keys(s.vars.root).length} custom properties`); else fail('snapshot looks empty');
    const same = run('style-diff.js', ['selftest-a', 'selftest-b']);
    if (same.status === 0 && /IDENTICAL/.test(same.stdout)) ok('two snapshots of the same code are identical (deterministic)'); else fail('two snapshots of unchanged code differ:\n' + same.stdout.split('\n').slice(0, 12).join('\n'));

    // a real change must be caught: copy a snapshot and tweak a value
    const zlib = require('zlib'), dir = dirFor('selftest-c'); fs.mkdirSync(dir, { recursive: true });
    for (const f of listSnapshots('selftest-a')) {
      const raw = JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(dirFor('selftest-a'), f))));
      if (f.includes('__default')) { const i = raw.propNames.indexOf('color'); raw.strings.push('rgb(1, 2, 3)'); raw.styles[raw.els[5][1]] = raw.styles[raw.els[5][1]].slice(); raw.styles[raw.els[5][1]][i] = raw.strings.length - 1; }
      fs.writeFileSync(path.join(dir, f), zlib.gzipSync(JSON.stringify(raw)));
    }
    const changed = run('style-diff.js', ['selftest-a', 'selftest-c']);
    if (changed.status === 1 && /color: .* -> rgb\(1, 2, 3\)/.test(changed.stdout)) ok('a changed colour is reported and the exit code is 1'); else fail('a changed colour was not reported:\n' + changed.stdout.split('\n').slice(0, 12).join('\n'));
    eq(run('style-diff.js', ['selftest-a', 'nonexistent']).status, 2, 'a missing label exits with code 2');
  } finally {
    for (const l of labels) fs.rmSync(dirFor(l), { recursive: true, force: true });
  }
  finish('style-diff');
})().catch(e => { fail(e.stack || e.message); finish('style-diff'); });
