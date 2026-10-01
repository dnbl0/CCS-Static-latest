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
  function select(name, options, label, cls) {
    var s = el('select', { name: name || false, 'class': 'adv-select ' + (cls || ''), 'aria-label': label });
    options.forEach(function (o) { s.appendChild(el('option', { value: o[0], text: o[1] })); });
    return s;
  }
  function icon(path) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('width', '16'); svg.setAttribute('height', '16');
    svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('fill', 'currentColor');
    var p = document.createElementNS(ns, 'path'); p.setAttribute('d', path); svg.appendChild(p);
    return svg;
  }
  var CHEVRON = 'M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z';

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
      $('[data-role=field]', row).name = 'clause[' + i + '][field]';
      $('[data-role=op]', row).name = 'clause[' + i + '][op]';
      $('[data-role=query]', row).name = 'clause[' + i + '][query]';
      $('[data-role=field]', row).setAttribute('aria-label', 'Search field for row ' + n);
      $('[data-role=op]', row).setAttribute('aria-label', 'Match type for row ' + n);
      $('[data-role=query]', row).setAttribute('aria-label', 'Search terms for row ' + n);
      $('.adv-delete', row).setAttribute('aria-label', 'Delete search row ' + n);
    });
    var add = $('#adv-add-row');
    if (add) add.disabled = $$('.adv-term', termsList()).length >= MAX_ROWS;
  }

  function addTerm(values) {
    var row = el('div', { 'class': 'adv-row adv-term' });
    var f = select('', FIELDS, 'Search field'); f.setAttribute('data-role', 'field');
    var o = select('', OPS, 'Match type'); o.setAttribute('data-role', 'op');
    var q = el('input', { type: 'text', 'class': 'adv-input', placeholder: 'Enter search terms…', 'data-role': 'query', autocomplete: 'off' });
    if (values) { f.value = values.field || 'all_fields'; o.value = values.op || 'must'; q.value = values.query || ''; }
    row.appendChild(f); row.appendChild(o); row.appendChild(q); row.appendChild(deleteButton('Delete search row'));
    termsList().appendChild(row);
    renumberTerms();
    return row;
  }

  function deleteButton(label) {
    return el('button', { type: 'button', 'class': 'adv-delete', 'aria-label': label }, [
      el('span', { 'class': 'adv-delete-icon', 'aria-hidden': 'true', text: '−' }),
      document.createTextNode(' Delete row')
    ]);
  }

  /* ---- filter rows --------------------------------------------------------------------------- */
  function filtersList() { return $('#adv-filters'); }
  function filterRow(key) { return $('.adv-filter[data-key="' + key + '"]', filtersList()); }
  function defOf(key) { return FILTERS.filter(function (d) { return d.key === key; })[0]; }

  function syncAddFilterMenu() {
    var menu = $('#adv-add-filter');
    $$('option', menu).forEach(function (o) { if (o.value) o.hidden = !!filterRow(o.value); });
    var anyLeft = $$('option', menu).some(function (o) { return o.value && !o.hidden; });
    menu.closest('label').hidden = !anyLeft;
    menu.value = '';
  }

  function summaryText(row) {
    var picked = $$('input[type=checkbox]:checked', row).map(function (c) { return c.value; });
    if (!picked.length) return '';
    return picked.length <= 2 ? picked.join(', ') : picked.length + ' selected';
  }
  function updateSummary(row) {
    var s = summaryText(row), span = $('.adv-trigger-text', row);
    span.textContent = s || 'Select values';
    span.classList.toggle('adv-placeholder', !s);
  }
  function applyMatchMode(row) {
    var mode = $('.adv-match', row).value; // 'or' | 'and'
    var key = row.getAttribute('data-key');
    var name = (mode === 'and' ? 'f[' : 'f_inclusive[') + key + '][]';
    $$('input[type=checkbox]', row).forEach(function (c) { c.name = name; });
  }
  function closePanels(except) {
    $$('.adv-panel').forEach(function (p) {
      if (p === except) return;
      p.hidden = true;
      var btn = p.parentNode.querySelector('.adv-trigger');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function buildMulti(def, preset) {
    var id = 'adv-f-' + def.key + '-' + (++uid);
    var row = el('div', { 'class': 'adv-row adv-filter', 'data-key': def.key });
    row.appendChild(el('span', { 'class': 'adv-row-label', text: def.label }));
    var match = select('', [['or', 'Includes any (OR)'], ['and', 'Includes all (AND)']], 'Match type for ' + def.label + ' filter', 'adv-match');
    if (preset && preset.and) match.value = 'and';
    row.appendChild(match);

    var wrap = el('div', { 'class': 'adv-multi' });
    var trigger = el('button', { type: 'button', 'class': 'adv-trigger', 'aria-haspopup': 'true', 'aria-expanded': 'false', 'aria-controls': id }, [
      el('span', { 'class': 'adv-trigger-text adv-placeholder', text: 'Select values' }), icon(CHEVRON)
    ]);
    var panel = el('div', { 'class': 'adv-panel', id: id, hidden: true });
    var search = el('input', { type: 'search', 'class': 'adv-input adv-panel-search', placeholder: 'Search ' + def.label.toLowerCase() + '…', 'aria-label': 'Search within ' + def.label + ' values', autocomplete: 'off' });
    var ul = el('ul', { 'class': 'adv-options' });
    var chosen = (preset && preset.values) || [];
    var opts = optionsFor(def);
    // Keep pre-selected values even if the dataset has none (e.g. an old shared link).
    chosen.forEach(function (v) { if (!opts.some(function (o) { return o.value === v; })) opts = opts.concat([{ value: v, count: 0 }]); });
    opts.forEach(function (o, i) {
      var cid = id + '-' + i;
      var cb = el('input', { type: 'checkbox', id: cid, value: o.value, 'class': 'adv-check' });
      if (chosen.indexOf(o.value) > -1) cb.checked = true;
      ul.appendChild(el('li', { 'class': 'adv-option', 'data-label': o.value.toLowerCase() }, [
        el('span', { 'class': 'adv-option-main' }, [cb, el('label', { 'for': cid, text: o.value })]),
        el('span', { 'class': 'adv-count', text: String(o.count) })
      ]));
    });
    var none = el('p', { 'class': 'adv-none', hidden: true, text: 'No matching values' });
    panel.appendChild(search); panel.appendChild(ul); panel.appendChild(none);
    wrap.appendChild(trigger); wrap.appendChild(panel);
    row.appendChild(wrap);
    row.appendChild(deleteButton('Remove ' + def.label + ' filter'));
    applyMatchMode(row); updateSummary(row);
    return row;
  }

  function buildRange(def, preset) {
    var row = el('div', { 'class': 'adv-row adv-filter adv-filter--range', 'data-key': def.key });
    row.appendChild(el('span', { 'class': 'adv-row-label', text: def.label }));
    var from = el('input', { type: 'number', name: 'range[' + def.key + '][begin]', 'class': 'adv-input adv-input--narrow', placeholder: 'From year', 'aria-label': def.label + ' from year', inputmode: 'numeric', min: '0', max: '2100' });
    var to = el('input', { type: 'number', name: 'range[' + def.key + '][end]', 'class': 'adv-input adv-input--narrow', placeholder: 'To year', 'aria-label': def.label + ' to year', inputmode: 'numeric', min: '0', max: '2100' });
    if (preset) { from.value = preset.begin || ''; to.value = preset.end || ''; }
    row.appendChild(from); row.appendChild(to);
    row.appendChild(deleteButton('Remove ' + def.label + ' filter'));
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
    var del = t.closest('.adv-delete');
    if (del) {
      var row = del.closest('.adv-row');
      if (row.classList.contains('adv-term')) {
        var rows = $$('.adv-term', termsList());
        if (rows.length <= 1) { $('[data-role=query]', row).value = ''; $('[data-role=query]', row).focus(); return; }
        var next = row.nextElementSibling || row.previousElementSibling;
        row.remove(); renumberTerms();
        var nq = next && $('[data-role=query]', next); if (nq) nq.focus();
      } else {
        row.remove(); syncAddFilterMenu(); $('#adv-add-filter').focus();
      }
      return;
    }
    var trig = t.closest('.adv-trigger');
    if (trig) {
      var panel = trig.parentNode.querySelector('.adv-panel'), open = panel.hidden;
      closePanels(open ? panel : null);
      panel.hidden = !open; trig.setAttribute('aria-expanded', String(open));
      if (open) { var s = $('.adv-panel-search', panel); if (s) s.focus(); }
      return;
    }
    if (!t.closest('.adv-panel')) closePanels();
  }

  function onChange(e) {
    var t = e.target, row = t.closest('.adv-filter');
    if (t.id === 'adv-add-filter') { var k = t.value; if (k) { var r = addFilter(k); var f = r && $('.adv-trigger, .adv-input', r); if (f) f.focus(); } return; }
    if (!row) return;
    if (t.classList.contains('adv-match')) applyMatchMode(row);
    if (t.classList.contains('adv-check')) updateSummary(row);
  }

  function onInput(e) {
    var t = e.target;
    if (!t.classList.contains('adv-panel-search')) return;
    var q = t.value.trim().toLowerCase(), panel = t.closest('.adv-panel'), shown = 0;
    $$('.adv-option', panel).forEach(function (li) {
      var hit = !q || li.getAttribute('data-label').indexOf(q) > -1;
      li.hidden = !hit; if (hit) shown++;
    });
    $('.adv-none', panel).hidden = shown > 0;
  }

  function onKeydown(e) {
    if (e.key !== 'Escape') return;
    var open = $$('.adv-panel').filter(function (p) { return !p.hidden; })[0];
    if (!open) return;
    var btn = open.parentNode.querySelector('.adv-trigger');
    closePanels(); if (btn) btn.focus();
    e.preventDefault();
  }

  // Keep the GET URL short: don't send empty rows / empty ranges / default sort.
  var disabledForSubmit = [];
  function onSubmit() {
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
