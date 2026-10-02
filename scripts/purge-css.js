#!/usr/bin/env node
// Removes rules from a compiled stylesheet whose class selectors are not used anywhere in the site.
//
//   node scripts/purge-css.js <file.css> [<file.css> ...]
//
// "Used" = the class name appears as a word in any public/**/*.html or public/**/*.js file (outside public/assets and
// public/styles/vendor). Classes that are assembled in script ('col-' + n) are kept by prefix: any script word that
// ends in "-" keeps every class starting with it. Rules without a class selector (:root, html, body, [hidden], tag
// selectors, @font-face ...) are always kept, as are classes that only appear inside :not()/:is()/:where()/:has().
// Bootstrap's JavaScript components are not used on this site (no data-bs-* attributes), so no class is added at runtime.
// Run automatically by `npm run build:css`.
const fs = require('fs');
const path = require('path');

const PUBLIC = path.resolve(__dirname, '..', 'public');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (p === path.join(PUBLIC, 'assets') || p === path.join(PUBLIC, 'styles', 'vendor')) continue;
      walk(p, out);
    } else if (/\.(html|js)$/.test(e.name)) out.push(p);
  }
  return out;
}

function corpusWords() {
  const words = new Set();
  const prefixes = [];
  for (const f of walk(PUBLIC)) {
    const text = fs.readFileSync(f, 'utf8');
    for (const w of text.match(/[A-Za-z_][\w-]*/g) || []) {
      words.add(w);
      if (w.endsWith('-')) prefixes.push(w);
    }
  }
  return { words, prefixes };
}

// Split CSS into top-level blocks / statements (brace aware, string aware, comment aware).
function split(css) {
  const out = []; let depth = 0, start = 0, q = null;
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    if (q) { if (ch === '\\') i++; else if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'") { q = ch; continue; }
    if (css.startsWith('/*', i)) { const j = css.indexOf('*/', i + 2); i = j < 0 ? css.length : j + 1; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) { out.push(css.slice(start, i + 1)); start = i + 1; } }
    else if (ch === ';' && depth === 0) { out.push(css.slice(start, i + 1)); start = i + 1; }
  }
  if (css.slice(start).trim()) out.push(css.slice(start));
  return out;
}

function splitSelectors(sel) {
  const parts = []; let depth = 0, cur = '';
  for (const ch of sel) {
    if (ch === '(' || ch === '[') depth++;
    else if (ch === ')' || ch === ']') depth--;
    if (ch === ',' && depth === 0) { parts.push(cur); cur = ''; } else cur += ch;
  }
  if (cur.trim()) parts.push(cur);
  return parts.map(s => s.trim()).filter(Boolean);
}

function positiveClasses(sel) {
  let s = sel.replace(/\[[^\]]*\]/g, '');
  // drop :not(...) / :is(...) / :where(...) / :has(...) groups (one nesting level is enough for this stylesheet)
  for (let n = 0; n < 3; n++) s = s.replace(/:(?:not|is|where|has)\((?:[^()]|\([^()]*\))*\)/g, '');
  return [...s.matchAll(/\.(-?[A-Za-z_][\w-]*)/g)].map(m => m[1]);
}

function purge(css, used) {
  const { words, prefixes } = used;
  const isUsed = c => words.has(c) || prefixes.some(p => c.startsWith(p));
  const bytesIn = css.length;
  function filter(block) {
    const b = block.trim();
    if (!b) return block;
    if (b.startsWith('@media') || b.startsWith('@supports') || b.startsWith('@layer')) {
      const open = b.indexOf('{');
      const inner = b.slice(open + 1, b.lastIndexOf('}'));
      const kept = split(inner).map(filter).join('');
      return kept.trim() ? b.slice(0, open + 1) + kept + '}' : '';
    }
    if (b.startsWith('@keyframes') || b.startsWith('@-webkit-keyframes')) {
      const name = b.split(/[\s{]+/)[1];
      return name && words.has(name) ? block : '';
    }
    if (b.startsWith('@')) return block;
    const open = b.indexOf('{');
    if (open < 0) return block;
    const sels = splitSelectors(b.slice(0, open));
    const keep = sels.filter(s => positiveClasses(s).every(isUsed));
    if (keep.length === sels.length) return block;
    return keep.length ? keep.join(',') + b.slice(open) : '';
  }
  const out = split(css).map(filter).join('');
  return { css: out, bytesIn, bytesOut: out.length };
}

const used = corpusWords();
const files = process.argv.slice(2);
if (!files.length) { console.error('usage: purge-css.js <file.css> ...'); process.exit(1); }
for (const f of files) {
  const res = purge(fs.readFileSync(f, 'utf8'), used);
  fs.writeFileSync(f, res.css);
  console.log(`purge-css: ${path.relative(process.cwd(), f)} ${(res.bytesIn / 1024).toFixed(0)} KB -> ${(res.bytesOut / 1024).toFixed(0)} KB`);
}
