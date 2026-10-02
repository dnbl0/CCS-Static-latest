/* Advanced Search form (public/search/advanced-search.html).
 *
 * Builds a multi-row search + filter form and submits it as a plain GET to
 * /search/search-results.html (the results page), which understands:
 *   clause[i][field]  all_fields | title | creator | subject | description
 *   clause[i][op]     must (contains all) | should (contains any) | must_not (does not contain)
 *   clause[i][query]  free text; "quotes" make an exact phrase
 *   f_inclusive[key][]  filter values, ANY of them may match   (key: collection | type | creator | licence | access)
 *   f[key][]            filter values, ALL of them must match
 *   range[year][begin] / range[year][end]   production year range
 *   sort              relevance | year-desc | year-asc | az
 * Option lists and counts come from window.CCS.items (public/collection-data.js).
 * The same parameters are read back from the URL to pre-fill the form ("Edit advanced search").
 */
(function () {
  'use strict';

  var FIELDS = [['all_fields', 'All Fields'], ['title', 'Title'], ['creator', 'Creator'], ['subject', 'Subject'], ['description', 'Description']];
  var OPS = [['must', 'Contains all (AND)'], ['should', 'Contains any (OR)'], ['must_not', 'Does not contain (NOT)']];
  var FILTERS = [
    { key: 'collection', label: 'Collection Title', get: function (it) { return [it.collection]; }, on: true },
    { key: 'creator', label: 'Creator Name', get: function (it) { return [it.creator]; } },
    { key: 'type', label: 'Object Type', get: function (it) { return it.types || []; }, on: true },
    { key: 'licence', label: 'Licence Type', get: function (it) { return [it.licence]; } },
    { key: 'access', label: 'Object Access Condition', get: function (it) { return [it.access]; } },
    { key: 'year', label: 'Production Date', range: true, on: true }
  ];
  var MAX_ROWS = 8;
  var uid = 0;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'class') n.className = attrs[k];
      else if (attrs[k] === true) n.setAttribute(k, '');
      else if (attrs[k] !== false && attrs[k] != null) n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function srLabel(id, text) { return el('label', { 'for': id, 'class': 'sr-only', text: text }); }
  function selectField(id, options, cls) {
    var s = el('select', { id: id, 'class': 'ccs-select ' + (cls || '') });
    options.forEach(function (o) { s.appendChild(el('option', { value: o[0], text: o[1] })); });
    return el('div', { 'class': 'ccs-select-wrap' }, [s]);
  }
  function img(src) { return el('img', { src: src, alt: '' }); }
  var ICON_CHEVRON = '/images/advanced/icon-chevron-down.svg';
  var ICON_DELETE = '/images/advanced/icon-delete.svg';

  /* ---- option lists from the shared dataset -------------------------------------------------- */
  var optionCache = {};
  function optionsFor(def) {
    if (optionCache[def.key]) return optionCache[def.key];
    var counts = {};
    var items = (window.CCS && window.CCS.items) || [];
    items.forEach(function (it) {
      def.get(it).forEach(function (v) { if (v) counts[v] = (counts[v] || 0) + 1; });
    });
    var list = Object.keys(counts).map(function (v) { return { value: v, count: counts[v] }; });
    list.sort(function (a, b) { return b.count - a.count || a.value.localeCompare(b.value); });
    optionCache[def.key] = list;
    return list;
  }

  /* ---- search term rows ----------------------------------------------------------------------- */
  function termsList() { return $('#adv-terms'); }

  function renumberTerms() {
    $$('.adv-term', termsList()).forEach(function (row, i) {
      var n = i + 1;
      row.setAttribute('aria-label', 'Search row ' + n);
      var f = $('[data-role=field]', row), o = $('[data-role=op]', row), q = $('[data-role=query]', row);
      f.name = 'clause[' + i + '][field]'; o.name = 'clause[' + i + '][op]'; q.name = 'clause[' + i + '][query]';
      f.id = 'adv-t' + n + '-field'; o.id = 'adv-t' + n + '-op'; q.id = 'adv-t' + n + '-q';
      $$('label.sr-only', row).forEach(function (l) { l.parentNode.removeChild(l); });
      f.parentNode.insertBefore(srLabel(f.id, 'Search field, row ' + n), f.parentNode.firstChild);
      o.parentNode.insertBefore(srLabel(o.id, 'Match type, row ' + n), o.parentNode.firstChild);
      q.parentNode.insertBefore(srLabel(q.id, 'Search terms, row ' + n), q);
      $('.ccs-delete', row).setAttribute('aria-label', 'Delete row ' + n + ' (search)');
    });
    var add = $('#adv-add-row');
    if (add) add.disabled = $$('.adv-term', termsList()).length >= MAX_ROWS;
  }

  function addTerm(values) {
    var row = el('div', { 'class': 'ccs-field-row adv-term', role: 'group' });
    var controls = el('div', { 'class': 'ccs-field-row__controls' });
    var fw = selectField('', FIELDS), ow = selectField('', OPS);
    var f = $('select', fw), o = $('select', ow);
    f.setAttribute('data-role', 'field'); o.setAttribute('data-role', 'op');
    var q = el('input', { type: 'text', 'class': 'ccs-input', placeholder: 'Enter search terms', 'data-role': 'query', autocomplete: 'off', 'aria-describedby': 'adv-terms-hint' });
    if (values) { f.value = values.field || 'all_fields'; o.value = values.op || 'must'; q.value = values.query || ''; }
    controls.appendChild(fw); controls.appendChild(ow); controls.appendChild(el('div', {}, [q]));
    row.appendChild(controls); row.appendChild(deleteButton());
    termsList().appendChild(row);
    renumberTerms();
    return row;
  }

  function deleteButton() {
    return el('button', { type: 'button', 'class': 'ccs-delete' }, [img(ICON_DELETE), document.createTextNode('Delete row')]);
  }

  /* ---- filter rows --------------------------------------------------------------------------- */
  function filtersList() { return $('#adv-filters'); }
  function filterRow(key) { return $('.adv-filter[data-key="' + key + '"]', filtersList()); }
  function defOf(key) { return FILTERS.filter(function (d) { return d.key === key; })[0]; }

  function syncAddFilterMenu() {
    var menu = $('#adv-add-filter');
    $$('option', menu).forEach(function (o) { if (o.value) o.hidden = !!filterRow(o.value); });
    var anyLeft = $$('option', menu).some(function (o) { return o.value && !o.hidden; });
    menu.closest('.ccs-btn--add').hidden = !anyLeft;
    menu.value = '';
  }

  function summaryText(row) {
    var picked = $$('input[type=checkbox]:checked', row).map(function (c) { return c.value; });
    if (!picked.length) return '';
    return picked.length <= 2 ? picked.join(', ') : picked.length + ' selected';
  }
  function updateSummary(row) {
    var s = summaryText(row), span = $('.ccs-multi__text', row);
    span.textContent = s || 'Select values';
    span.classList.toggle('is-placeholder', !s);
  }
  function applyMatchMode(row) {
    var mode = $('.adv-match', row).value; // 'or' | 'and'
    var key = row.getAttribute('data-key');
    var name = (mode === 'and' ? 'f[' : 'f_inclusive[') + key + '][]';
    $$('input[type=checkbox]', row).forEach(function (c) { c.name = name; });
  }
  function closePanels(except) {
    $$('.ccs-multi__panel').forEach(function (p) {
      if (p === except) return;
      p.hidden = true;
      var btn = p.parentNode.querySelector('.ccs-multi__trigger');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function filterShell(def) {
    var row = el('fieldset', { 'class': 'ccs-field-row ccs-field-row--filter adv-filter', 'data-key': def.key });
    row.appendChild(el('legend', { text: def.label }));
    return row;
  }

  function buildMulti(def, preset) {
    var id = 'adv-f-' + def.key + '-' + (++uid);
    var row = filterShell(def);
    var controls = el('div', { 'class': 'ccs-field-row__controls' });
    var mw = selectField(id + '-match', [['or', 'Includes any (OR)'], ['and', 'Includes all (AND)']], 'adv-match');
    var match = $('select', mw);
    if (preset && preset.and) match.value = 'and';
    mw.insertBefore(srLabel(match.id, def.label + ' match type'), mw.firstChild);

    var wrap = el('div', { 'class': 'ccs-multi' });
    var triggerId = id + '-trigger';
    var trigger = el('button', { type: 'button', id: triggerId, 'class': 'ccs-multi__trigger', 'aria-haspopup': 'true', 'aria-expanded': 'false', 'aria-controls': id + '-panel', 'aria-labelledby': id + '-lbl ' + triggerId }, [
      el('span', { 'class': 'ccs-multi__text is-placeholder', text: 'Select values' }),
      el('span', { 'class': 'ccs-multi__chev' }, [img(ICON_CHEVRON)])
    ]);
    var panel = el('div', { 'class': 'ccs-multi__panel', id: id + '-panel', role: 'group', 'aria-label': def.label + ' values', hidden: true });
    var searchId = id + '-search';
    var search = el('input', { type: 'search', id: searchId, 'class': 'ccs-input ccs-multi__search', placeholder: 'Search ' + def.label.toLowerCase(), autocomplete: 'off' });
    var ul = el('ul', { 'class': 'ccs-multi__options' });
    var chosen = (preset && preset.values) || [];
    var opts = optionsFor(def);
    // Keep pre-selected values even if the dataset has none (e.g. an old shared link).
    chosen.forEach(function (v) { if (!opts.some(function (o) { return o.value === v; })) opts = opts.concat([{ value: v, count: 0 }]); });
    opts.forEach(function (o, i) {
      var cid = id + '-' + i;
      var cb = el('input', { type: 'checkbox', id: cid, value: o.value, 'class': 'adv-check' });
      if (chosen.indexOf(o.value) > -1) cb.checked = true;
      ul.appendChild(el('li', { 'class': 'ccs-multi__option', 'data-label': o.value.toLowerCase() }, [
        el('label', { 'for': cid }, [cb, document.createTextNode(o.value)]),
        el('span', { 'class': 'ccs-multi__count', text: String(o.count) })
      ]));
    });
    var none = el('p', { 'class': 'ccs-multi__none', hidden: true, role: 'status', text: 'No matching values' });
    panel.appendChild(srLabel(searchId, 'Search within ' + def.label + ' values'));
    panel.appendChild(search); panel.appendChild(ul); panel.appendChild(none);
    wrap.appendChild(el('span', { id: id + '-lbl', 'class': 'sr-only', text: def.label + ' values:' }));
    wrap.appendChild(trigger); wrap.appendChild(panel);
    controls.appendChild(mw); controls.appendChild(wrap);
    row.appendChild(controls);
    row.appendChild(deleteButton());
    $('.ccs-delete', row).setAttribute('aria-label', 'Delete ' + def.label + ' filter row');
    applyMatchMode(row); updateSummary(row);
    return row;
  }

  function buildRange(def, preset) {
    var id = 'adv-f-' + def.key + '-' + (++uid);
    var row = filterShell(def);
    row.classList.add('adv-filter--range');
    var controls = el('div', { 'class': 'ccs-field-row__controls' });
    var errId = id + '-err';
    function yearInput(suffix, label, ph) {
      var inp = el('input', { type: 'number', id: id + '-' + suffix, name: 'range[' + def.key + '][' + suffix + ']', 'class': 'ccs-input', placeholder: ph, inputmode: 'numeric', min: '0', max: '2100', 'data-role': suffix });
      return el('div', {}, [srLabel(inp.id, def.label + ' ' + label), inp]);
    }
    var from = yearInput('begin', 'from year', 'From year'), to = yearInput('end', 'to year', 'To year');
    if (preset) { $('input', from).value = preset.begin || ''; $('input', to).value = preset.end || ''; }
    controls.appendChild(from); controls.appendChild(to);
    controls.appendChild(el('p', { id: errId, 'class': 'ccs-error', role: 'alert', hidden: true, text: 'The start year must be earlier than or equal to the end year.', style: 'grid-column: 1 / -1; margin: 0' }));
    row.appendChild(controls);
    row.appendChild(deleteButton());
    $('.ccs-delete', row).setAttribute('aria-label', 'Delete ' + def.label + ' filter row');
    return row;
  }

  function addFilter(key, preset) {
    if (filterRow(key)) return filterRow(key);
    var def = defOf(key); if (!def) return null;
    var row = def.range ? buildRange(def, preset) : buildMulti(def, preset);
    // keep the declared order of filters
    var order = FILTERS.map(function (d) { return d.key; });
    var before = $$('.adv-filter', filtersList()).filter(function (r) { return order.indexOf(r.getAttribute('data-key')) > order.indexOf(key); })[0];
    filtersList().insertBefore(row, before || null);
    syncAddFilterMenu();
    return row;
  }

  /* ---- URL <-> form -------------------------------------------------------------------------- */
  function readParams() {
    var qs = new URLSearchParams(location.search);
    var out = { clauses: {}, filters: {}, range: {}, sort: qs.get('sort') || '' };
    qs.forEach(function (val, name) {
      var m;
      if ((m = name.match(/^clause\[(\d+)\]\[(field|op|query)\]$/))) {
        (out.clauses[m[1]] = out.clauses[m[1]] || {})[m[2]] = val;
      } else if ((m = name.match(/^(f|f_inclusive)\[(\w+)\]\[\]$/))) {
        var f = out.filters[m[2]] = out.filters[m[2]] || { values: [], and: m[1] === 'f' };
        f.values.push(val);
      } else if ((m = name.match(/^range\[(\w+)\]\[(begin|end)\]$/))) {
        (out.range[m[1]] = out.range[m[1]] || {})[m[2]] = val;
      }
    });
    return out;
  }

  function prefill() {
    var p = readParams();
    var clauseKeys = Object.keys(p.clauses).sort(function (a, b) { return a - b; });
    clauseKeys.forEach(function (k) { addTerm(p.clauses[k]); });
    while ($$('.adv-term', termsList()).length < 2) addTerm();
    var active = {};
    FILTERS.forEach(function (d) { if (d.on) active[d.key] = true; });
    Object.keys(p.filters).forEach(function (k) { if (defOf(k)) active[k] = true; });
    Object.keys(p.range).forEach(function (k) { if (defOf(k)) active[k] = true; });
    FILTERS.forEach(function (d) {
      if (!active[d.key]) return;
      addFilter(d.key, d.range ? p.range[d.key] : p.filters[d.key]);
    });
    if (p.sort) $('#adv-sort').value = p.sort;
  }

  /* ---- events ------------------------------------------------------------------------------- */
  function onClick(e) {
    var t = e.target;
    if (t.closest('#adv-add-row')) { var r = addTerm(); $('[data-role=query]', r).focus(); return; }
    var del = t.closest('.ccs-delete');
    if (del) {
      var row = del.closest('.ccs-field-row');
      if (row.classList.contains('adv-term')) {
        var rows = $$('.adv-term', termsList());
        if (rows.length <= 1) { $('[data-role=query]', row).value = ''; $('[data-role=query]', row).focus(); return; }
        var next = row.nextElementSibling || row.previousElementSibling;
        row.remove(); renumberTerms();
        var nq = next && $('[data-role=query]', next); if (nq) nq.focus();
      } else {
        row.remove(); syncAddFilterMenu();
        var add = $('#adv-add-filter'); if (add && !add.closest('.ccs-btn--add').hidden) add.focus(); else $('#adv-add-row').focus();
      }
      return;
    }
    var trig = t.closest('.ccs-multi__trigger');
    if (trig) {
      var panel = trig.parentNode.querySelector('.ccs-multi__panel'), open = panel.hidden;
      closePanels(open ? panel : null);
      panel.hidden = !open; trig.setAttribute('aria-expanded', String(open));
      if (open) { var s = $('.ccs-multi__search', panel); if (s) s.focus(); }
      return;
    }
    if (!t.closest('.ccs-multi__panel')) closePanels();
  }

  function onChange(e) {
    var t = e.target, row = t.closest('.adv-filter');
    if (t.id === 'adv-add-filter') { var k = t.value; if (k) { var r = addFilter(k); var f = r && $('.ccs-multi__trigger, .ccs-input', r); if (f) f.focus(); } return; }
    if (!row) return;
    if (t.classList.contains('adv-match')) applyMatchMode(row);
    if (t.classList.contains('adv-check')) updateSummary(row);
  }

  function onInput(e) {
    var t = e.target;
    if (t.closest && t.closest('.adv-filter--range')) { clearRangeError(t.closest('.adv-filter--range')); return; }
    if (!t.classList.contains('ccs-multi__search')) return;
    var q = t.value.trim().toLowerCase(), panel = t.closest('.ccs-multi__panel'), shown = 0;
    $$('.ccs-multi__option', panel).forEach(function (li) {
      var hit = !q || li.getAttribute('data-label').indexOf(q) > -1;
      li.hidden = !hit; if (hit) shown++;
    });
    $('.ccs-multi__none', panel).hidden = shown > 0;
  }

  function onKeydown(e) {
    if (e.key !== 'Escape') return;
    var open = $$('.ccs-multi__panel').filter(function (p) { return !p.hidden; })[0];
    if (!open) return;
    var btn = open.parentNode.querySelector('.ccs-multi__trigger');
    closePanels(); if (btn) btn.focus();
    e.preventDefault();
  }

  /* ---- validation: production date range ---------------------------------------------------- */
  function clearRangeError(row) {
    var err = $('.ccs-error', row);
    if (err) err.hidden = true;
    $$('input', row).forEach(function (i) { i.removeAttribute('aria-invalid'); i.removeAttribute('aria-describedby'); });
  }
  function validateRanges() {
    var firstBad = null;
    $$('.adv-filter--range').forEach(function (row) {
      clearRangeError(row);
      var from = $('[data-role=begin]', row), to = $('[data-role=end]', row);
      if (from.value && to.value && Number(from.value) > Number(to.value)) {
        var err = $('.ccs-error', row);
        err.hidden = false;
        [from, to].forEach(function (i) { i.setAttribute('aria-invalid', 'true'); i.setAttribute('aria-describedby', err.id); });
        firstBad = firstBad || from;
      }
    });
    return firstBad;
  }

  // Keep the GET URL short: don't send empty rows / empty ranges / default sort.
  var disabledForSubmit = [];
  function onSubmit(e) {
    var bad = validateRanges();
    if (bad) { e.preventDefault(); bad.focus(); return; }
    disabledForSubmit = [];
    function off(n) { if (!n.disabled) { n.disabled = true; disabledForSubmit.push(n); } }
    $$('.adv-term', termsList()).forEach(function (row) {
      if (!$('[data-role=query]', row).value.trim()) $$('select, input', row).forEach(off);
    });
    $$('.adv-filter--range input').forEach(function (i) { if (!i.value) off(i); });
    var sort = $('#adv-sort'); if (sort.value === 'relevance') off(sort);
    // The panel search boxes have no name, so they are never submitted.
  }
  function restoreAfterSubmit() { disabledForSubmit.forEach(function (n) { n.disabled = false; }); disabledForSubmit = []; }

  var bound = false;
  function ensure() {
    var form = document.getElementById('adv-form');
    if (!form || form.getAttribute('data-ready')) return;
    form.setAttribute('data-ready', '1');
    prefill();
    syncAddFilterMenu();
    form.addEventListener('submit', onSubmit);
    if (!bound) {
      bound = true;
      document.addEventListener('click', onClick);
      document.addEventListener('change', onChange);
      document.addEventListener('input', onInput);
      document.addEventListener('keydown', onKeydown);
      window.addEventListener('pageshow', restoreAfterSubmit);
    }
  }

  // The page template is rendered by the DC runtime, which can replace the form's DOM after this
  // script first runs; so (re)initialise whenever a fresh, un-initialised form appears.
  ensure();
  new MutationObserver(ensure).observe(document.documentElement, { childList: true, subtree: true });
})();
