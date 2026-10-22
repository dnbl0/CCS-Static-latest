// `npm test`: lint, the CSS build and the generated-file checks, then every tests/*.test.js (a new suite runs without
// being listed anywhere). browser-available runs first so CI fails at once when it has no Chromium. Every step runs even
// after a failure; the summary lists the failures and the exit code is 1 if there were any.
// Usage: node tests/run.js [name ...]   (names run only those suites, e.g. `node tests/run.js search-query catalogue`)
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const only = process.argv.slice(2);
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const suites = fs.readdirSync(__dirname).filter(f => f.endsWith('.test.js')).map(f => f.replace(/\.test\.js$/, ''))
  .sort((a, b) => (a === 'browser-available' ? -1 : b === 'browser-available' ? 1 : a.localeCompare(b)));
const steps = only.length
  ? only.map(n => { if (!suites.includes(n)) { console.error(`no suite tests/${n}.test.js`); process.exit(1); } return [n, 'node', [`tests/${n}.test.js`]]; })
  : [
    ['lint', npm, ['run', 'lint']],
    ['build:css', npm, ['run', 'build:css']],
    ['verify:bootstrap', npm, ['run', 'verify:bootstrap']],
    ['sync-partials --check', 'node', ['scripts/sync-partials.js', '--check']],
    ...suites.map(n => [n, 'node', [`tests/${n}.test.js`]]),
    ['sync-rails-assets --check', 'node', ['scripts/sync-rails-assets.js', '--check']]
  ];

const failed = [];
for (const [name, cmd, args] of steps) {
  console.log(`\n=== ${name}`);
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit' });
  if (r.status !== 0) failed.push(name);
}
console.log(`\n${steps.length - failed.length} of ${steps.length} steps passed` + (failed.length ? `; failed: ${failed.join(', ')}` : ''));
process.exit(failed.length ? 1 : 0);
