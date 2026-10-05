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
 *
 * Reusable components in this file (styled by styles/advanced-filters.css):
 *   Select      single-select combobox + listbox (field, match type, sort). closed / open / hover / selected / completed.
 *   Multi       multi-select checkbox menu (filter values, "Add filter"). Options keep their checked state when reopened.
 *   DateField   text date input + calendar popover (month navigation, keyboard date selection, clear, min/max).
 * Keyboard (Select / Multi): Arrow Up/Down, Home, End, Enter, Space, Escape, Tab, type-ahead.
 */
(function () {
  'use strict';

  var FIELDS = [['all_fields', 'All Fields'], ['title', 'Title'], ['creator', 'Creator'], ['subject', 'Subject'], ['description', 'Description']];
  var OPS = [['must', 'Contains all (AND)'], ['should', 'Contains any (OR)'], ['must_not', 'Does not contain (NOT)']];
  var MODES = [['or', 'Includes any (OR)'], ['and', 'Includes all (AND)']];
  var SORTS = [['relevance', 'Relevance'], ['year-desc', 'Date (Newest)'], ['year-asc', 'Date (Oldest)'], ['az', 'Title (A–Z)']];
  var FILTERS = [
    { key: 'collection', label: 'Collection Title', get: function (it) { return [it.collection]; }, on: true },
    { key: 'creator', label: 'Creator Name', get: function (it) { return [it.creator]; } },
    { key: 'type', label: 'Object Type', get: function (it) { return it.types || []; } },
    { key: 'licence', label: 'Licence Type', get: function (it) { return [it.licence]; } },
    { key: 'access', label: 'Object Access Condition', get: function (it) { return [it.access]; } },
    { key: 'year', label: 'Production Date', range: true }
  ];
  var MAX_ROWS = 8;
  var IMG = '/images/advanced/';
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
  function img(src) { return el('img', { src: src, alt: '' }); }
  /* In the fly-out the pinned Search bar covers the bottom of the form: scroll an opened menu / calendar fully into view (the page's scroll-padding keeps it clear of the bar). */
  function keepInView(n) { if (n && n.scrollIntoView) setTimeout(function () { n.scrollIntoView({ block: 'nearest' }); }, 0); }
  function nextId(p) { return p + '-' + (++uid); }

  /* ---- live region ------------------------------------------------------------------------- */
  function announce(msg) {
    var r = $('#adv-live');
    if (!r) return;
    r.textContent = '';
    setTimeout(function () { r.textContent = msg; }, 30);
  }

  /* ---- open-menu registry (one open at a time; outside click / Escape / Tab close) ---------- */
  var openMenu = null;
  function setOpen(menu) {
    if (openMenu && openMenu !== menu) openMenu.close();
    openMenu = menu;
  }
  document.addEventListener('mousedown', function (e) {
    if (openMenu && !openMenu.root.contains(e.target)) openMenu.close();
  });
  document.addEventListener('focusin', function (e) {
    if (openMenu && !openMenu.root.contains(e.target)) openMenu.close();
  });

  /* =============================================================================================
   * Select — single-select combobox. Focus stays on the combobox button; the highlighted option is
   * exposed with aria-activedescendant. Value is mirrored into a hidden input for form submission.
   * ========================================================================================== */
  function Select(o) {
    var id = o.id || nextId('adv-sel');
    var self = { root: null, value: '', open: false };
    var opts = o.options.map(function (p, i) { return { value: p[0], label: p[1], id: id + '-opt-' + i }; });
    var lblId = id + '-lbl', listId = id + '-list';
    var valueSpan = el('span', { 'class': 'ccs-combo__value is-placeholder', text: o.placeholder || 'Select' });
    var iconImg = img(IMG + 'icon-select-closed.svg');
    var btn = el('button', {
      type: 'button', id: id, 'class': 'ccs-combo__field', role: 'combobox', 'aria-haspopup': 'listbox', 'aria-expanded': 'false',
      'aria-controls': listId, 'aria-labelledby': lblId + ' ' + id
    }, [valueSpan, el('span', { 'class': 'ccs-combo__icon' }, [iconImg])]);
    var list = el('ul', { id: listId, 'class': 'ccs-combo__menu', role: 'listbox', tabindex: '-1', 'aria-labelledby': lblId, hidden: true });
    var lis = opts.map(function (p) {
      var li = el('li', { id: p.id, 'class': 'ccs-combo__option', role: 'option', 'aria-selected': 'false', 'data-value': p.value, text: p.label });
      list.appendChild(li); return li;
    });
    var hidden = o.name ? el('input', { type: 'hidden', name: o.name }) : null;
    var label = el('span', { id: lblId, 'class': 'sr-only', text: o.label });
    var root = el('div', { 'class': 'ccs-combo' + (o.className ? ' ' + o.className : '') }, [label, btn, list, hidden]);
    self.root = root; self.button = btn; self.hidden = hidden;
    var active = -1, typed = '', typedAt = 0;

    function indexOfValue(v) { for (var i = 0; i < opts.length; i++) if (opts[i].value === v) return i; return -1; }
    function paint() {
      var i = indexOfValue(self.value);
      valueSpan.textContent = i > -1 ? opts[i].label : (o.placeholder || 'Select');
      valueSpan.classList.toggle('is-placeholder', i < 0);
      root.classList.toggle('is-complete', i > -1 && !!o.completeStyle);
      lis.forEach(function (li, k) { li.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
      if (hidden) hidden.value = self.value;
    }
    function setActive(i) {
      active = Math.max(0, Math.min(opts.length - 1, i));
      lis.forEach(function (li, k) { li.classList.toggle('is-active', k === active); });
      btn.setAttribute('aria-activedescendant', opts[active].id);
      if (lis[active].scrollIntoView) lis[active].scrollIntoView({ block: 'nearest' });
    }
    self.set = function (v, silent) {
      self.value = v; paint();
      if (!silent && o.onChange) o.onChange(v, self);
    };
    self.get = function () { return self.value; };
    self.close = function (refocus) {
      if (!self.open) return;
      self.open = false; list.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.removeAttribute('aria-activedescendant');
      iconImg.src = IMG + 'icon-select-closed.svg'; root.classList.remove('is-open');
      if (openMenu === self) openMenu = null;
      if (refocus) btn.focus();
    };
    self.show = function () {
      if (self.open) return;
      setOpen(self);
      self.open = true; list.hidden = false; btn.setAttribute('aria-expanded', 'true'); keepInView(list);
      iconImg.src = IMG + 'icon-select-open.svg'; root.classList.add('is-open');
      var i = indexOfValue(self.value); setActive(i > -1 ? i : 0);
    };
    function choose(i) { self.set(opts[i].value); self.close(true); }

    btn.addEventListener('click', function () { if (self.open) self.close(true); else self.show(); });
    lis.forEach(function (li, k) {
      li.addEventListener('mousemove', function () { if (active !== k) setActive(k); });
      li.addEventListener('mousedown', function (e) { e.preventDefault(); });   // keep focus on the button
      li.addEventListener('click', function () { choose(k); });
    });
    btn.addEventListener('keydown', function (e) {
      var k = e.key;
      if (!self.open) {
        if (k === 'ArrowDown' || k === 'ArrowUp' || k === 'Enter' || k === ' ') { e.preventDefault(); self.show(); }
        else if (k === 'Home' || k === 'End') { e.preventDefault(); self.show(); setActive(k === 'Home' ? 0 : opts.length - 1); }
        return;
      }
      if (k === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      else if (k === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      else if (k === 'Home') { e.preventDefault(); setActive(0); }
      else if (k === 'End') { e.preventDefault(); setActive(opts.length - 1); }
      else if (k === 'Enter' || k === ' ') { e.preventDefault(); choose(active); }
      else if (k === 'Escape') { e.preventDefault(); e.stopPropagation(); self.close(true); }
      else if (k === 'Tab') { self.close(false); }
      else if (k.length === 1 && !e.ctrlKey && !e.metaKey) {      // type-ahead
        var now = Date.now(); typed = (now - typedAt > 700 ? '' : typed) + k.toLowerCase(); typedAt = now;
        for (var i = 0; i < opts.length; i++) { if (opts[i].label.toLowerCase().indexOf(typed) === 0) { setActive(i); break; } }
      }
    });
    self.set(o.value != null ? o.value : '', true);
    return self;
  }

  /* =============================================================================================
   * Multi — multi-select checkbox menu. The trigger is a disclosure button (aria-expanded /
   * aria-controls); the menu is a group of real checkboxes with roving arrow-key focus. Checked state
   * is kept in the checkboxes, so it is still visible when the menu is reopened.
   * ========================================================================================== */
  function Multi(o) {
    var id = o.id || nextId('adv-multi');
    var self = { root: null, open: false };
    var panelId = id + '-menu', lblId = id + '-lbl';
    var valueSpan = el('span', { 'class': 'ccs-combo__value is-placeholder', text: o.placeholder });
    var iconImg = img(IMG + 'icon-select-closed.svg');
    var btn = el('button', { type: 'button', id: id, 'class': 'ccs-combo__field', 'aria-haspopup': 'true', 'aria-expanded': 'false', 'aria-controls': panelId, 'aria-labelledby': lblId + ' ' + id },
      [valueSpan, el('span', { 'class': 'ccs-combo__icon' }, [iconImg])]);
    var menu = el('div', { id: panelId, 'class': 'ccs-combo__menu', role: 'group', 'aria-labelledby': lblId, hidden: true });
    var search = null;
    if (o.searchable) {
      var sid = id + '-search';
      search = el('input', { type: 'search', id: sid, 'class': 'ccs-input ccs-combo__search', placeholder: 'Search ' + o.label.toLowerCase(), autocomplete: 'off' });
      menu.appendChild(el('label', { 'for': sid, 'class': 'sr-only', text: 'Search within ' + o.label }));
      menu.appendChild(search);
    }
    var ul = el('ul', { 'class': 'ccs-combo__list' });
    var boxes = [];
    function addOption(p, i) {
      var cid = id + '-opt-' + i;
      var cb = el('input', { type: 'checkbox', id: cid, value: p.value, 'class': 'ccs-check' });
      var children = [cb, el('span', { 'class': 'ccs-combo__option-text', text: p.label })];
      if (p.count != null) children.push(el('span', { 'class': 'ccs-combo__count', text: String(p.count) }));
      ul.appendChild(el('li', { 'class': 'ccs-combo__item', 'data-label': p.label.toLowerCase() }, [el('label', { 'for': cid, 'class': 'ccs-combo__option' }, children)]));
      boxes.push(cb);
    }
    o.options.forEach(addOption);
    menu.appendChild(ul);
    var none = el('p', { 'class': 'ccs-combo__none', role: 'status', hidden: true, text: 'No matching values' });
    menu.appendChild(none);
    var label = el('span', { id: lblId, 'class': 'sr-only', text: o.label });
    var root = el('div', { 'class': 'ccs-combo ccs-combo--multi' + (o.className ? ' ' + o.className : '') }, [label, btn, menu]);
    self.root = root; self.button = btn; self.boxes = boxes;

    function visible() { return boxes.filter(function (b) { return !b.closest('li').hidden; }); }
    self.checked = function () { return boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; }); };
    self.setChecked = function (vals, silent) {
      vals.forEach(function (v) { if (!boxes.some(function (b) { return b.value === v; })) addOption({ value: v, label: v, count: 0 }, boxes.length); });   // keep values the dataset lacks (old shared links)
      boxes.forEach(function (b) { b.checked = vals.indexOf(b.value) > -1; });
      self.refresh(silent);
    };
    self.refresh = function (silent) {
      var c = self.checked();
      var text = o.summary ? o.summary(c) : (c.length <= 2 ? c.join(', ') : c.length + ' selected');
      valueSpan.textContent = text || o.placeholder;
      valueSpan.classList.toggle('is-placeholder', !text);
      root.classList.toggle('is-complete', c.length > 0);
      if (!silent && o.onChange) o.onChange(c, self);
    };
    self.close = function (refocus) {
      if (!self.open) return;
      self.open = false; menu.hidden = true; btn.setAttribute('aria-expanded', 'false');
      iconImg.src = IMG + 'icon-select-closed.svg'; root.classList.remove('is-open');
      if (openMenu === self) openMenu = null;
      if (refocus) btn.focus();
    };
    self.show = function () {
      if (self.open) return;
      setOpen(self);
      self.open = true; menu.hidden = false; btn.setAttribute('aria-expanded', 'true'); keepInView(menu);
      iconImg.src = IMG + 'icon-select-open.svg'; root.classList.add('is-open');
      var first = search || visible()[0];
      if (first) first.focus();
    };
    btn.addEventListener('click', function () { if (self.open) self.close(true); else self.show(); });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); self.show();
        var v = visible(), t = search || (e.key === 'ArrowUp' ? v[v.length - 1] : v[0]); if (t) t.focus();
      } else if (e.key === 'Escape' && self.open) { e.preventDefault(); e.stopPropagation(); self.close(true); }
    });
    menu.addEventListener('change', function (e) { if (e.target.classList.contains('ccs-check')) self.refresh(); });
    menu.addEventListener('keydown', function (e) {
      var k = e.key, v = visible(), cur = v.indexOf(document.activeElement), t;
      if (k === 'Escape') { e.preventDefault(); e.stopPropagation(); self.close(true); return; }
      if (k === 'Tab') { self.close(false); return; }
      if (k === 'ArrowDown') { e.preventDefault(); t = v[cur + 1] || v[v.length - 1]; if (t) t.focus(); }
      else if (k === 'ArrowUp') { e.preventDefault(); if (cur <= 0 && search) search.focus(); else if (v[cur - 1]) v[cur - 1].focus(); }
      else if (k === 'Home' && document.activeElement !== search) { e.preventDefault(); if (v[0]) v[0].focus(); }
      else if (k === 'End' && document.activeElement !== search) { e.preventDefault(); if (v.length) v[v.length - 1].focus(); }
      else if (k === 'Enter' && document.activeElement.classList.contains('ccs-check')) { e.preventDefault(); document.activeElement.click(); }
    });
    if (search) search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase(), shown = 0;
      $$('.ccs-combo__item', ul).forEach(function (li) { var hit = !q || li.getAttribute('data-label').indexOf(q) > -1; li.hidden = !hit; if (hit) shown++; });
      none.hidden = shown > 0;
    });
    self.refresh(true);
    return self;
  }

  /* =============================================================================================
   * DateField — text input (dd/mm/yyyy or just a year) + calendar popover.
   * Dates are plain {y,m,d} objects (m is 1-12) so there are no time-zone surprises.
   * ========================================================================================== */
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function isLeap(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }
  function dim(y, m) { return [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]; }
  function toKey(d) { return d.y * 10000 + d.m * 100 + d.d; }
  function fmt(d) { return d.y < 1 ? String(d.y) : pad(d.d) + '/' + pad(d.m) + '/' + d.y; }   // BCE years have no calendar date: shown as a bare year
  function longFmt(d) { return d.d + ' ' + MONTHS[d.m - 1] + ' ' + d.y; }
  function addDays(d, n) {
    var y = d.y, m = d.m, day = d.d + n;
    while (day > dim(y, m)) { day -= dim(y, m); if (++m > 12) { m = 1; y++; } }
    while (day < 1) { if (--m < 1) { m = 12; y--; } day += dim(y, m); }
    return { y: y, m: m, d: day };
  }
  function addMonths(d, n) { var t = d.y * 12 + (d.m - 1) + n, y = Math.floor(t / 12), m = t - y * 12 + 1; return { y: y, m: m, d: Math.min(d.d, dim(y, m)) }; }
  function weekday(d) {                      // Monday = 0 (Zeller-style, valid for the whole proleptic Gregorian range)
    var y = d.y, m = d.m; if (m < 3) { m += 12; y--; }
    var h = (d.d + Math.floor(13 * (m + 1) / 5) + (((y % 100) + 100) % 100) + Math.floor((((y % 100) + 100) % 100) / 4) + Math.floor(Math.floor(y / 100) / 4) + 5 * Math.floor(y / 100)) % 7;
    return (h + 5) % 7;
  }
  // Earliest / latest production years in the collection records (bounds for the date fields).
  var yearBounds = null;
  function bounds() {
    if (yearBounds) return yearBounds;
    var items = (window.CCS && window.CCS.items) || [], lo = Infinity, hi = -Infinity;
    items.forEach(function (it) {
      [it.dateStart, it.dateEnd].forEach(function (v) { if (typeof v === 'number' && isFinite(v)) { if (v < lo) lo = v; if (v > hi) hi = v; } });
    });
    yearBounds = lo <= hi ? { min: lo, max: hi } : { min: -9999, max: 9999 };
    return yearBounds;
  }
  function yearLabel(y) { return y < 1 ? Math.abs(y) + ' BCE' : String(y); }
  // Digits and "/" only (plus a leading minus for a BCE year).  "1950" | "d/m/yyyy".
  // A bare year means 1 Jan (edge 'begin') or 31 Dec (edge 'end').  Returns {empty} | {error} | {date} | {range} (out of bounds).
  function parseDate(text, edge) {
    var s = (text || '').trim(); if (!s) return { empty: true };
    var m, b = bounds();
    if ((m = s.match(/^(-?)(\d{1,4})$/))) {
      var y = (m[1] ? -1 : 1) * Number(m[2]);
      if (y < b.min || y > b.max) return { range: true };
      return { date: edge === 'end' ? { y: y, m: 12, d: 31 } : { y: y, m: 1, d: 1 }, yearOnly: true };
    }
    if (!(m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/))) return { error: true };
    var dd = +m[1], mm = +m[2], yy = +m[3];
    if (yy < 1 || mm < 1 || mm > 12 || dd < 1 || dd > dim(yy, mm)) return { error: true };
    if (yy < b.min || yy > b.max) return { range: true };
    return { date: { y: yy, m: mm, d: dd } };
  }

  function DateField(o) {
    var id = o.id || nextId('adv-date');
    var self = { root: null, open: false, date: null, min: null, max: null, edge: o.edge };
    var calId = id + '-cal', errId = id + '-err', hintId = id + '-hint', titleId = id + '-cal-title';
    var b = bounds();
    var label = el('label', { 'for': id, 'class': 'sr-only ccs-date__label', text: o.shortLabel || o.label });
    var input = el('input', { type: 'text', id: id, 'class': 'ccs-input ccs-date__input', placeholder: o.placeholder, autocomplete: 'off', inputmode: 'numeric', maxlength: '10', role: 'combobox', 'aria-haspopup': 'dialog', 'aria-expanded': 'false', 'aria-controls': calId, 'aria-describedby': hintId });
    var hint = el('span', { id: hintId, 'class': 'sr-only', text: 'Numbers only. Enter a date as dd/mm/yyyy, or just a year between ' + yearLabel(b.min) + ' and ' + yearLabel(b.max) + '. Press Arrow Down to open the calendar.' });
    var cal = el('div', { id: calId, 'class': 'ccs-cal', role: 'dialog', 'aria-label': 'Choose ' + o.label.toLowerCase(), hidden: true });
    var title = el('h3', { id: titleId, 'class': 'ccs-cal__title', 'aria-live': 'polite' });
    var prev = el('button', { type: 'button', 'class': 'ccs-cal__nav', 'aria-label': 'Previous month' }, [img(IMG + 'icon-chevron-left.svg')]);
    var next = el('button', { type: 'button', 'class': 'ccs-cal__nav', 'aria-label': 'Next month' }, [img(IMG + 'icon-chevron-right.svg')]);
    var head = el('div', { 'class': 'ccs-cal__head' }, [prev, title, next]);
    var grid = el('table', { 'class': 'ccs-cal__grid', role: 'grid', 'aria-labelledby': titleId });
    var clear = el('button', { type: 'button', 'class': 'ccs-cal__action', text: 'Clear' });
    var close = el('button', { type: 'button', 'class': 'ccs-cal__action', text: 'Close' });
    cal.appendChild(head); cal.appendChild(grid); cal.appendChild(el('div', { 'class': 'ccs-cal__foot' }, [clear, close]));
    var err = el('p', { id: errId, 'class': 'ccs-error', hidden: true });
    var status = el('span', { 'class': 'sr-only', role: 'status' });
    var root = el('div', { 'class': 'ccs-date' }, [label, input, hint, cal, err, status]);
    self.root = root; self.input = input; self.errorEl = err;
    var view = null, focusDate = null;   // month shown + date focused in the grid

    function today() { var t = new Date(); return { y: t.getFullYear(), m: t.getMonth() + 1, d: t.getDate() }; }
    // the calendar covers whole dates only (year 1 onwards) and never leaves the records' date range
    function lo() { var d = { y: Math.max(b.min, 1), m: 1, d: 1 }; return self.min && toKey(self.min) > toKey(d) ? self.min : d; }
    function hi() { var d = { y: b.max, m: 12, d: 31 }; return self.max && toKey(self.max) < toKey(d) ? self.max : d; }
    function disabled(d) { return toKey(d) < toKey(lo()) || toKey(d) > toKey(hi()); }
    function clamp(d) { return toKey(d) < toKey(lo()) ? lo() : toKey(d) > toKey(hi()) ? hi() : d; }
    function say(msg) { status.textContent = ''; setTimeout(function () { status.textContent = msg; }, 30); }

    self.setError = function (msg) {
      err.hidden = !msg; err.textContent = msg || '';
      if (msg) { input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', hintId + ' ' + errId); }
      else { input.removeAttribute('aria-invalid'); input.setAttribute('aria-describedby', hintId); }
    };
    // Parse the text box into self.date; returns an error message ('' when fine / empty)
    self.read = function () {
      var r = parseDate(input.value, self.edge);
      if (r.empty) { self.date = null; return ''; }
      self.date = null;
      if (r.error) return o.label + ' must be a date in the format dd/mm/yyyy, or a year (numbers only).';
      if (r.range) return o.label + ' must be between ' + yearLabel(b.min) + ' and ' + yearLabel(b.max) + ', the earliest and latest dates in the collections.';
      self.date = r.date; return '';
    };
    self.set = function (d, silent) {
      self.date = d; input.value = d ? fmt(d) : '';
      self.setError('');
      if (!silent && o.onChange) o.onChange(self);
    };
    self.yearValue = function () { return self.date ? String(self.date.y) : ''; };

    function render() {
      title.textContent = MONTHS[view.m - 1] + ' ' + view.y;
      var first = { y: view.y, m: view.m, d: 1 }, lead = weekday(first), n = dim(view.y, view.m);
      var h = '<thead><tr>' + DAYS.map(function (d) { return '<th scope="col" abbr="' + d + '">' + d.slice(0, 2) + '</th>'; }).join('') + '</tr></thead><tbody>';
      var day = 1 - lead;
      for (var w = 0; w < 6 && day <= n; w++) {
        h += '<tr>';
        for (var c = 0; c < 7; c++, day++) {
          if (day < 1 || day > n) { h += '<td></td>'; continue; }
          var d = { y: view.y, m: view.m, d: day }, sel = self.date && toKey(self.date) === toKey(d), dis = disabled(d), isFocus = focusDate && toKey(focusDate) === toKey(d), tdy = toKey(today()) === toKey(d);
          h += '<td><button type="button" class="ccs-cal__day' + (sel ? ' is-selected' : '') + (tdy ? ' is-today' : '') + '" data-d="' + day + '" tabindex="' + (isFocus ? '0' : '-1') + '"' +
            (sel ? ' aria-selected="true"' : '') + (tdy ? ' aria-current="date"' : '') + (dis ? ' disabled' : '') + ' aria-label="' + longFmt(d) + (sel ? ', selected' : '') + '">' + day + '</button></td>';
        }
        h += '</tr>';
      }
      grid.innerHTML = h + '</tbody>';
      prev.disabled = toKey(addMonths(first, -1)) < toKey({ y: lo().y, m: lo().m, d: 1 });
      next.disabled = toKey(addMonths(first, 1)) > toKey(hi());
    }
    function focusDay() { var bt = $('.ccs-cal__day[data-d="' + focusDate.d + '"]', grid); if (bt) bt.focus(); }
    function go(d) { d = clamp(d); focusDate = d; view = { y: d.y, m: d.m, d: 1 }; render(); focusDay(); }
    function showMonth(d) { d = clamp(d); focusDate = d; view = { y: d.y, m: d.m, d: 1 }; render(); }
    function choose(d) {
      if (disabled(d)) return;
      self.set(d); say(o.label + ' set to ' + longFmt(d));
      self.close(true);
    }
    // show(): opens the calendar. Focus stays in the text box (so people can keep typing) unless intoGrid is set.
    self.show = function (intoGrid) {
      if (!self.open) {
        setOpen(self);
        self.read();
        var start = clamp(self.date && self.date.y >= 1 ? self.date : today());
        focusDate = start; view = { y: start.y, m: start.m, d: 1 };
        self.open = true; cal.hidden = false; input.setAttribute('aria-expanded', 'true'); root.classList.add('is-open'); keepInView(cal);
        render();
      }
      if (intoGrid) focusDay();
    };
    self.close = function (refocus) {
      if (!self.open) return;
      self.open = false; cal.hidden = true; input.setAttribute('aria-expanded', 'false'); root.classList.remove('is-open');
      if (openMenu === self) openMenu = null;
      if (refocus) input.focus();
    };
    input.addEventListener('click', function () { self.show(false); });
    prev.addEventListener('click', function () { showMonth(addMonths(focusDate, -1)); });
    next.addEventListener('click', function () { showMonth(addMonths(focusDate, 1)); });
    grid.addEventListener('click', function (e) {
      var bt = e.target.closest('.ccs-cal__day'); if (!bt || bt.disabled) return;
      choose({ y: view.y, m: view.m, d: Number(bt.getAttribute('data-d')) });
    });
    clear.addEventListener('click', function () { self.set(null); say(o.label + ' cleared'); self.close(true); });
    close.addEventListener('click', function () { self.close(true); });
    cal.addEventListener('keydown', function (e) {
      var k = e.key, onDay = e.target.classList && e.target.classList.contains('ccs-cal__day');
      if (k === 'Escape') { e.preventDefault(); e.stopPropagation(); self.close(true); return; }
      if (k === 'Tab') {   // keep Tab inside the dialog
        var f = $$('.ccs-cal__nav:not(:disabled), .ccs-cal__day[tabindex="0"], .ccs-cal__action', cal);
        var i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
        return;
      }
      if (!onDay) return;
      var d = focusDate, handled = true;
      if (k === 'ArrowLeft') go(addDays(d, -1));
      else if (k === 'ArrowRight') go(addDays(d, 1));
      else if (k === 'ArrowUp') go(addDays(d, -7));
      else if (k === 'ArrowDown') go(addDays(d, 7));
      else if (k === 'Home') go(addDays(d, -weekday(d)));
      else if (k === 'End') go(addDays(d, 6 - weekday(d)));
      else if (k === 'PageUp') go(e.shiftKey ? addMonths(d, -12) : addMonths(d, -1));
      else if (k === 'PageDown') go(e.shiftKey ? addMonths(d, 12) : addMonths(d, 1));
      else if (k === 'Enter' || k === ' ') choose(d);
      else handled = false;
      if (handled) e.preventDefault();
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); self.show(true); }
      else if (e.key === 'Escape' && self.open) { e.stopPropagation(); self.close(false); }
    });
    // Numbers only: strip anything that is not a digit or "/" (and keep a minus only at the very start, for BCE years)
    input.addEventListener('input', function () {
      var v = input.value, cleaned = v.replace(/[^0-9\/\-]/g, '').replace(/(?!^)-/g, '');
      if (cleaned !== v) { input.value = cleaned; say('Numbers only'); }
      self.setError('');
    });
    input.addEventListener('change', function () { self.setError(self.read()); if (o.onChange) o.onChange(self); });
    return self;
  }

  /* ---- option lists from the shared dataset -------------------------------------------------- */
  var optionCache = {};
  function optionsFor(def) {
    if (optionCache[def.key]) return optionCache[def.key];
    var counts = {};
    var items = (window.CCS && window.CCS.items) || [];
    items.forEach(function (it) {
      def.get(it).forEach(function (v) { if (v) counts[v] = (counts[v] || 0) + 1; });
    });
    var list = Object.keys(counts).map(function (v) { return { value: v, label: v, count: counts[v] }; });
    list.sort(function (a, b) { return b.count - a.count || a.label.localeCompare(b.label); });
    optionCache[def.key] = list;
    return list;
  }
  function defOf(key) { return FILTERS.filter(function (d) { return d.key === key; })[0]; }

  /* ---- form state ----------------------------------------------------------------------------- */
  var addFilterMulti = null, sortSelect = null;
  function termsList() { return $('#adv-terms'); }
  function filtersList() { return $('#adv-filters'); }
  function filterRow(key) { return $('.adv-filter[data-key="' + key + '"]', filtersList()); }
  function deleteButton() {
    return el('button', { type: 'button', 'class': 'ccs-delete' }, [img(IMG + 'icon-delete.svg'), document.createTextNode('Delete row')]);
  }

  /* ---- search rows ---------------------------------------------------------------------------- */
  function renumberTerms() {
    var rows = $$('.adv-term', termsList());
    rows.forEach(function (row, i) {
      var n = i + 1;
      row.setAttribute('aria-label', 'Search row ' + n);
      var sels = row.__selects;
      sels[0].hidden.name = 'clause[' + i + '][field]'; sels[1].hidden.name = 'clause[' + i + '][op]';
      $('#' + sels[0].button.id + '-lbl').textContent = 'Search field, row ' + n;
      $('#' + sels[1].button.id + '-lbl').textContent = 'Match type, row ' + n;
      var q = $('[data-role=query]', row); q.name = 'clause[' + i + '][query]';
      $('label.sr-only[for="' + q.id + '"]', row).textContent = 'Search terms, row ' + n;
      var del = $('.ccs-delete', row); del.setAttribute('aria-label', 'Delete row ' + n);
      del.disabled = rows.length <= 1;      // the form always keeps at least one search row
    });
    var add = $('#adv-add-row');
    if (add) add.disabled = rows.length >= MAX_ROWS;
  }

  function addTerm(values) {
    var row = el('div', { 'class': 'ccs-field-row adv-term', role: 'group' });
    var controls = el('div', { 'class': 'ccs-field-row__controls' });
    var f = Select({ label: 'Search field', name: 'x', options: FIELDS, value: (values && values.field) || 'all_fields', completeStyle: true });
    var o = Select({ label: 'Match type', name: 'x', options: OPS, value: (values && values.op) || 'must', completeStyle: true });
    var qid = nextId('adv-q');
    var q = el('input', { type: 'text', id: qid, 'class': 'ccs-input', placeholder: 'Enter search terms', 'data-role': 'query', autocomplete: 'off', 'aria-describedby': 'adv-terms-hint' });
    if (values && values.query) q.value = values.query;
    controls.appendChild(f.root); controls.appendChild(o.root);
    controls.appendChild(el('div', {}, [el('label', { 'for': qid, 'class': 'sr-only', text: 'Search terms' }), q]));
    row.appendChild(controls); row.appendChild(deleteButton());
    row.__selects = [f, o];
    termsList().appendChild(row);
    renumberTerms();
    return row;
  }

  /* ---- filter rows ---------------------------------------------------------------------------- */
  function applyMatchMode(row) {
    var name = (row.__mode.get() === 'and' ? 'f[' : 'f_inclusive[') + row.getAttribute('data-key') + '][]';
    row.__multi.boxes.forEach(function (c) { c.name = name; });
  }
  function filterShell(def) {
    var row = el('fieldset', { 'class': 'ccs-field-row ccs-field-row--filter adv-filter', 'data-key': def.key });
    row.appendChild(el('legend', { text: def.label }));
    return row;
  }

  function buildMulti(def, preset) {
    var row = filterShell(def);
    var controls = el('div', { 'class': 'ccs-field-row__controls' });
    var mode = Select({ label: def.label + ' match type', options: MODES, value: preset && preset.and ? 'and' : 'or', completeStyle: true, onChange: function () { applyMatchMode(row); } });
    var multi = Multi({ label: def.label + ' values', placeholder: 'Select values', searchable: true, options: optionsFor(def), className: 'ccs-combo--values' });
    row.__mode = mode; row.__multi = multi;
    multi.setChecked((preset && preset.values) || [], true);
    controls.appendChild(mode.root); controls.appendChild(multi.root);
    row.appendChild(controls); row.appendChild(deleteButton());
    $('.ccs-delete', row).setAttribute('aria-label', 'Delete row: ' + def.label + ' filter');
    multi.root.addEventListener('change', function () { applyMatchMode(row); });
    applyMatchMode(row);
    return row;
  }

  function buildRange(def, preset) {
    var row = filterShell(def); row.classList.add('adv-filter--range');
    var controls = el('div', { 'class': 'ccs-field-row__controls' });
    var from = DateField({ shortLabel: 'From', label: 'Production date from', placeholder: 'From', edge: 'begin', onChange: function () { sync(); validate(); } });
    var to = DateField({ shortLabel: 'To', label: 'Production date to', placeholder: 'To', edge: 'end', onChange: function () { sync(); validate(); } });
    var hb = el('input', { type: 'hidden', name: 'range[' + def.key + '][begin]' });
    var he = el('input', { type: 'hidden', name: 'range[' + def.key + '][end]' });
    function sync() {
      from.read(); to.read();
      from.max = to.date; to.min = from.date;     // the calendars disable days that would invert the range
      hb.value = from.yearValue(); he.value = to.yearValue();
    }
    function validate() {      // returns true when valid; shows messages next to the fields
      var m1 = from.read(), m2 = to.read();
      from.setError(m1); to.setError(m2);
      var bad = !!(m1 || m2);
      if (!bad && from.date && to.date && toKey(from.date) > toKey(to.date)) { to.setError('The "To" date must be on or after the "From" date (' + fmt(from.date) + ').'); bad = true; }
      return !bad;
    }
    row.__range = { from: from, to: to, sync: sync, validate: validate };
    if (preset) {
      var a = preset.begin && parseDate(preset.begin, 'begin'); if (a && a.date) from.set(a.date, true);
      var b = preset.end && parseDate(preset.end, 'end'); if (b && b.date) to.set(b.date, true);
    }
    sync();
    controls.appendChild(from.root); controls.appendChild(to.root);
    row.appendChild(controls); row.appendChild(hb); row.appendChild(he); row.appendChild(deleteButton());
    $('.ccs-delete', row).setAttribute('aria-label', 'Delete row: ' + def.label + ' filter');
    return row;
  }

  function syncAddFilter() {
    if (!addFilterMulti) return;
    addFilterMulti.setChecked(FILTERS.filter(function (d) { return filterRow(d.key); }).map(function (d) { return d.key; }), true);
  }
  function addFilter(key, preset, quiet) {
    if (filterRow(key)) return filterRow(key);
    var def = defOf(key); if (!def) return null;
    var row = def.range ? buildRange(def, preset) : buildMulti(def, preset);
    var order = FILTERS.map(function (d) { return d.key; });
    var before = $$('.adv-filter', filtersList()).filter(function (r) { return order.indexOf(r.getAttribute('data-key')) > order.indexOf(key); })[0];
    filtersList().insertBefore(row, before || null);
    syncAddFilter();
    if (!quiet) announce(def.label + ' filter added');
    return row;
  }
  function removeFilter(key) {
    var row = filterRow(key); if (!row) return;
    row.remove(); syncAddFilter();
    announce(defOf(key).label + ' filter removed');
  }

  /* ---- URL <-> form -------------------------------------------------------------------------- */
  function readParams() {
    var qs = new URLSearchParams(location.search);
    var out = { clauses: {}, filters: {}, range: {}, sort: qs.get('sort') || '', op: qs.get('op') || '' };
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
    var defOp = OPS.some(function (o) { return o[0] === p.op && o[0] !== 'must_not'; }) ? p.op : 'must';   // Blacklight's single "match all / any" operator
    Object.keys(p.clauses).sort(function (a, b) { return a - b; }).forEach(function (k) { var c = p.clauses[k]; if (!c.op) c.op = defOp; addTerm(c); });
    while ($$('.adv-term', termsList()).length < 1) addTerm();
    var active = {};
    FILTERS.forEach(function (d) { if (d.on) active[d.key] = true; });
    Object.keys(p.filters).forEach(function (k) { if (defOf(k)) active[k] = true; });
    Object.keys(p.range).forEach(function (k) { if (defOf(k)) active[k] = true; });
    FILTERS.forEach(function (d) { if (active[d.key]) addFilter(d.key, d.range ? p.range[d.key] : p.filters[d.key], true); });
    if (p.sort && SORTS.some(function (s) { return s[0] === p.sort; })) sortSelect.set(p.sort, true);
    syncAddFilter();
  }

  /* ---- validation + submit -------------------------------------------------------------------- */
  function collectErrors() {
    var errs = [];
    $$('.adv-filter--range').forEach(function (row) {
      var r = row.__range; r.sync(); r.validate();
      [r.from, r.to].forEach(function (f) { if (!f.errorEl.hidden) errs.push({ msg: f.errorEl.textContent, target: f.input }); });
    });
    return errs;
  }
  function showErrorSummary(errs) {
    var box = $('#adv-errors'); if (!box) return;
    box.innerHTML = '';
    if (!errs.length) return;
    box.appendChild(el('h2', { 'class': 'ccs-errors__title', text: 'There is a problem' }));
    var ul = el('ul', { 'class': 'ccs-errors__list' });
    errs.forEach(function (e) {
      var a = el('a', { href: '#' + e.target.id, text: e.msg });
      a.addEventListener('click', function (ev) { ev.preventDefault(); e.target.focus(); });
      ul.appendChild(el('li', {}, [a]));
    });
    box.appendChild(ul);
  }

  // Keep the GET URL short: don't send empty rows / empty ranges / default sort / unticked options.
  var disabledForSubmit = [];
  function onSubmit(e) {
    var errs = collectErrors();
    showErrorSummary(errs);
    if (errs.length) { e.preventDefault(); $('#adv-errors').focus(); return; }
    disabledForSubmit = [];
    var opIn = $('#adv-op');
    if (opIn) { var ops = $$('.adv-term', termsList()).filter(function (r) { return $('[data-role=query]', r).value.trim(); }).map(function (r) { return $('input[name$="[op]"]', r).value; });
      var uniform = ops.length > 1 && ops.every(function (v) { return v === ops[0] && v !== 'must_not'; });
      opIn.value = uniform ? ops[0] : ''; opIn.disabled = !uniform; }
    function off(n) { if (n && !n.disabled) { n.disabled = true; disabledForSubmit.push(n); } }
    $$('.adv-term', termsList()).forEach(function (row) {
      if (!$('[data-role=query]', row).value.trim()) $$('input', row).forEach(off);
    });
    $$('.adv-filter--range input[type=hidden]').forEach(function (i) { if (!i.value) off(i); });
    $$('.ccs-combo__search, .ccs-date__input').forEach(off);          // UI-only inputs are never submitted
    $$('.adv-filter .ccs-check:not(:checked)').forEach(off);
    $$('#adv-add-filter-mount .ccs-check').forEach(off);               // the "Add filter" ticks only control which rows exist
    if (sortSelect.get() === 'relevance') off(sortSelect.hidden);
  }
  function restoreAfterSubmit() { disabledForSubmit.forEach(function (n) { n.disabled = false; }); disabledForSubmit = []; }

  /* ---- events ------------------------------------------------------------------------------- */
  function onClick(e) {
    var t = e.target;
    if (t.closest('#adv-add-row')) { var r = addTerm(); $('[data-role=query]', r).focus(); announce('Search row added'); return; }
    var del = t.closest('.ccs-delete');
    if (del && !del.disabled) {
      var row = del.closest('.ccs-field-row');
      if (row.classList.contains('adv-term')) {
        var rows = $$('.adv-term', termsList());
        if (rows.length <= 1) return;
        var next = row.nextElementSibling || row.previousElementSibling;
        row.remove(); renumberTerms(); announce('Search row removed');
        var nq = next && $('[data-role=query]', next); if (nq) nq.focus();
      } else {
        removeFilter(row.getAttribute('data-key'));
        if (addFilterMulti) addFilterMulti.button.focus();
      }
    }
  }
  function onKeydownDoc(e) {
    if (e.key === 'Escape' && openMenu) { openMenu.close(true); e.preventDefault(); }
  }

  var bound = false;
  function ensure() {
    var form = document.getElementById('adv-form');
    if (!form || form.getAttribute('data-ready')) return;
    form.setAttribute('data-ready', '1');
    var sortMount = $('#adv-sort-mount'), addMount = $('#adv-add-filter-mount');
    sortSelect = Select({ id: 'adv-sort', label: 'Sort results by', name: 'sort', options: SORTS, value: 'relevance', completeStyle: true });
    if (sortMount) sortMount.appendChild(sortSelect.root);
    addFilterMulti = Multi({
      id: 'adv-add-filter', label: 'Add filter', placeholder: 'Add filter', className: 'ccs-combo--add',
      summary: function () { return ''; },
      options: FILTERS.map(function (d) { return { value: d.key, label: d.label }; }),
      onChange: function (c) {
        FILTERS.forEach(function (d) {
          var on = c.indexOf(d.key) > -1, has = !!filterRow(d.key);
          if (on && !has) addFilter(d.key); else if (!on && has) removeFilter(d.key);
        });
      }
    });
    if (addMount) addMount.appendChild(addFilterMulti.root);
    prefill();
    form.addEventListener('submit', onSubmit);
    if (!bound) {
      bound = true;
      document.addEventListener('click', onClick);
      document.addEventListener('keydown', onKeydownDoc);
      window.addEventListener('pageshow', restoreAfterSubmit);
    }
  }

  // The page template is rendered by the DC runtime, which can replace the form's DOM after this
  // script first runs; so (re)initialise whenever a fresh, un-initialised form appears.
  ensure();
  new MutationObserver(ensure).observe(document.documentElement, { childList: true, subtree: true });
})();
