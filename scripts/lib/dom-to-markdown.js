// Turns the rendered copy of a page into Markdown. It runs inside the page (page.evaluate(domToMarkdown, arg)),
// so it must stay one self-contained function: no outside helpers, no closures over module variables.
//   domToMarkdown('main')                              -> Markdown string. Interface text stays in place: **Button:** Save
//   domToMarkdown({ selector: 'main', separateUi: true }) -> { copy, ui }: the copy without interface text, and the
//                                                        interface text as [{ type, text }] (buttons, fields, dropdowns, image alt text)
// Headings, paragraphs, lists, links, bold/italic and tables become Markdown; a breadcrumb becomes one line (Home › Page).
// Hidden text (hidden attribute, display:none, sr-only), scripts and styles are left out.
function domToMarkdown(arg) {
  const opts = typeof arg === 'string' ? { selector: arg } : arg;
  const root = document.querySelector(opts.selector);
  if (!root) return opts.separateUi ? { copy: '', ui: [] } : '';
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'SVG', 'HEAD', 'META', 'LINK', 'IFRAME', 'X-DC', 'HELMET']);
  // Inline inside a paragraph; the controls and images are blocks of their own when they stand alone
  const INLINE = new Set(['A', 'SPAN', 'STRONG', 'EM', 'B', 'I', 'SMALL', 'SUP', 'SUB', 'ABBR', 'CODE', 'MARK', 'TIME', 'BR', 'U', 'CITE', 'Q', 'WBR']);
  const squash = s => s.replace(/\s+/g, ' ');
  const tidy = s => s.replace(/[ \t]+/g, ' ').replace(/ ?\n ?/g, '\n').trim();
  const ui = [];

  // Interface text is either written into the copy (**Button:** Save) or collected in `ui`
  function emit(type, text) {
    if (!text) return '';
    if (opts.separateUi) { ui.push({ type, text }); return ''; }
    return type === 'Image alt text' ? '*Image: ' + text + '*' : '**' + type + ':** ' + text;
  }
  function hidden(el) {
    if (el.hidden || el.classList.contains('sr-only') || el.classList.contains('visually-hidden')) return true;
    if (el.getAttribute('aria-hidden') === 'true' && !el.querySelector('a,button,input')) return true;
    const cs = getComputedStyle(el);
    return cs.display === 'none' || cs.visibility === 'hidden';
  }
  function labelOf(el) {
    const l = el.labels && el.labels[0] ? squash(el.labels[0].textContent).trim() : '';
    return l || el.getAttribute('aria-label') || '';
  }
  function control(el, tn) {
    const type = (el.type || 'text').toLowerCase();
    if (tn === 'INPUT' && type === 'hidden') return '';
    if (tn === 'INPUT' && (type === 'submit' || type === 'button')) return emit('Button', squash(el.value || '').trim());
    const label = labelOf(el);
    if (tn === 'INPUT' && (type === 'checkbox' || type === 'radio')) return emit(type === 'checkbox' ? 'Checkbox' : 'Radio option', label);
    if (tn === 'SELECT') {
      const options = [...el.options].map(o => squash(o.textContent).trim()).filter(Boolean);
      return emit('Dropdown', label + (options.length ? ' (options: ' + options.join(' · ') + ')' : ''));
    }
    return emit('Field', label + (el.placeholder ? ' (placeholder: "' + el.placeholder + '")' : ''));
  }

  function inline(n) {
    if (n.nodeType === 3) return n.nodeValue.replace(/\s+/g, ' ');
    if (n.nodeType !== 1) return '';
    const tn = n.tagName.toUpperCase();
    if (SKIP.has(tn) || hidden(n)) return '';
    // Links that touch get a space between them, or they read as one: [One](/a)[Two](/b)
    const kids = () => [...n.childNodes].map(inline).reduce((a, b) => a + (/\)$/.test(a) && /^\[/.test(b) ? ' ' : '') + b, '');
    if (tn === 'BR') return '\n';
    if (tn === 'STRONG' || tn === 'B') { const t = kids().trim(); return t ? '**' + t + '**' : ''; }
    if (tn === 'EM' || tn === 'I') { const t = kids().trim(); return t ? '*' + t + '*' : ''; }
    if (tn === 'A') {
      const t = kids().trim() || (n.getAttribute('aria-label') || '').trim();
      const href = n.getAttribute('href');
      return t && href ? '[' + t + '](' + href + ')' : t;
    }
    if (tn === 'IMG') return emit('Image alt text', squash(n.getAttribute('alt') || '').trim());
    if (tn === 'BUTTON') return emit('Button', squash([...n.childNodes].map(inline).join('')).trim() || n.getAttribute('aria-label') || '');
    if (tn === 'INPUT' || tn === 'SELECT' || tn === 'TEXTAREA') return control(n, tn);
    if (tn === 'LABEL' && n.control && !hidden(n.control)) return ''; // the control prints its label
    return kids();
  }

  const BLOCK_IN_ITEM = new Set(['P', 'DIV', 'SECTION', 'FIGURE', 'FIGCAPTION', 'BLOCKQUOTE', 'DL', 'DT', 'DD']);
  function list(el, depth) {
    const ordered = el.tagName.toUpperCase() === 'OL';
    const indent = '  '.repeat(depth);
    const lines = [];
    let i = 0;
    for (const li of el.children) {
      if (li.tagName.toUpperCase() !== 'LI' || hidden(li)) continue;
      // An item is one or more parts: a heading (a question, a title) and paragraphs each go on their own line
      const parts = [];
      const nested = [];
      let cur = '';
      const flush = () => { const t = tidy(cur).replace(/\n/g, ' '); if (t) parts.push(t); cur = ''; };
      for (const c of li.childNodes) {
        const tn = c.nodeType === 1 ? c.tagName.toUpperCase() : '';
        if (tn === 'UL' || tn === 'OL') { flush(); const sub = list(c, depth + 1); if (sub) nested.push(sub); }
        else if (/^H[1-6]$/.test(tn)) { flush(); const t = squash(inline(c)).trim(); if (t) parts.push('**' + t + '**'); }
        else if (BLOCK_IN_ITEM.has(tn)) { flush(); cur = inline(c); flush(); }
        else cur += inline(c);
      }
      flush();
      if (!parts.length && !nested.length) continue;
      i++;
      lines.push(indent + (ordered ? i + '.' : '-') + ' ' + parts.join('  \n' + indent + '  '));
      lines.push(...nested);
    }
    return lines.join('\n');
  }

  function table(el) {
    // Paragraphs, list items and divs inside one cell are separate values: join them with "; " instead of running them together
    const cellText = c => {
      const parts = [...c.children].filter(k => /^(P|DIV|LI|UL|OL)$/.test(k.tagName.toUpperCase()) && !hidden(k));
      const values = parts.length > 1 ? parts.map(k => squash(inline(k)).trim()).filter(Boolean) : [squash(inline(c)).trim()];
      return values.join('; ').replace(/\|/g, '\\|');
    };
    const rows = [...el.rows].filter(r => !hidden(r)).map(r => [...r.cells].map(cellText));
    if (!rows.length || !rows[0].length) return '';
    const line = cells => '| ' + cells.join(' | ') + ' |';
    return [line(rows[0]), line(rows[0].map(() => '---')), ...rows.slice(1).map(line)].join('\n');
  }

  function blocks(parent) {
    const out = [];
    let run = '';
    const flush = () => { const t = tidy(run); if (t) out.push(t); run = ''; };
    for (const n of parent.childNodes) {
      if (n.nodeType === 3) { run += n.nodeValue.replace(/\s+/g, ' '); continue; }
      if (n.nodeType !== 1) continue;
      const tn = n.tagName.toUpperCase();
      if (SKIP.has(tn) || hidden(n)) continue;
      if (INLINE.has(tn)) { const piece = inline(n); run += (/\)$/.test(run) && /^\[/.test(piece) ? ' ' : '') + piece; continue; }
      flush();
      if (/^H[1-6]$/.test(tn)) { const t = squash(inline(n)).trim(); if (t) out.push('#'.repeat(+tn[1]) + ' ' + t); continue; }
      if (tn === 'NAV' && /breadcrumb/i.test(n.getAttribute('aria-label') || '')) {
        const crumbs = [...n.querySelectorAll('li')].filter(li => !hidden(li) && !li.querySelector('li') && !li.closest('.bc-mobile')).map(li => squash(inline(li)).replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').trim()).filter(Boolean);
        if (crumbs.length) out.push(crumbs.join(' › '));
        continue;
      }
      if (tn === 'UL' || tn === 'OL') { const l = list(n, 0); if (l) out.push(l); continue; }
      if (tn === 'TABLE') { const t = table(n); if (t) out.push(t); continue; }
      if (['P', 'FIGCAPTION', 'DT', 'DD', 'SUMMARY', 'BLOCKQUOTE', 'LABEL', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'IMG'].includes(tn)) { const t = tidy(inline(n)); if (t) out.push(t); continue; }
      out.push(...blocks(n)); // div, section, nav, form, ...
    }
    flush();
    return out;
  }

  const copy = blocks(root).join('\n\n');
  if (!opts.separateUi) return copy;
  const seen = new Set();
  return { copy, ui: ui.filter(u => { const k = u.type + '|' + u.text; return seen.has(k) ? false : (seen.add(k), true); }) };
}

module.exports = { domToMarkdown };
