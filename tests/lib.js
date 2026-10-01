// Tiny shared helpers for the plain-node test scripts (no dependencies).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const state = { failures: 0, warnings: 0 };

function fail(msg) { state.failures++; console.error('FAIL: ' + msg); }
function warn(msg) { state.warnings++; console.warn('WARNING: ' + msg); }
function ok(msg) { console.log('ok: ' + msg); }

function walk(dir, filter, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, filter, out);
    else if (!filter || filter(p)) out.push(p);
  }
  return out;
}

function finish(name) {
  console.log(`\n${name}: ${state.failures} failure(s), ${state.warnings} warning(s)`);
  if (state.failures) process.exit(1);
}

module.exports = { ROOT, PUBLIC, fail, warn, ok, walk, finish, fs, path };
