/* Range slider with a histogram for the search results filters (production date, creator birth and death years),
 * after the Blacklight prototype's range filter (ead-ccs-test: range_slider_controller.js, range_histogram.rb):
 * a histogram of the current results with 2px between its bars, two small white handles on a 2px rail, the first
 * and last year under the rail, and From / To fields at the two ends. Bars inside the chosen range are navy, the
 * rest grey; an empty bin is a 4px stub. With no range applied the fields are empty and their placeholders are the
 * first and last year. Exposes window.CCSRangeSlider (and module.exports for the node tests).
 *
 *   var slider = CCSRangeSlider.create({
 *     container: element,              // an empty element; the slider builds its DOM inside it
 *     label: 'Production date',        // names the handles and the Clear link
 *     years: [1888, 1952, ...],        // one year per record in the CURRENT results, this filter's own range left out
 *     range: { from: null, to: null }, // the applied range (null = open end)
 *     onChange: function (from, to) {} // called after a short pause once the visitor has chosen a range
 *   });
 *   slider.setData(years); slider.setRange({ from, to }); slider.setResultCount(n); slider.destroy();
 *
 * The track is not linear when the years go back before KNEE (nearly every record is recent): the first OLD_SHARE of
 * the track covers everything before it and the rest covers KNEE to the latest year (the same map as the
 * prototype's RangeHistogram.year). The handles are native <input type="range"> elements, so keyboard, touch and
 * screen reader support are the browser's; Home / End / Page Up / Page Down (ten years) are added. */
(function (root) {
  'use strict';

  var STEPS = 1000;          // positions along the track
  var KNEE = 1000;           // a year: before it the track is compressed
  var OLD_SHARE = 0.25;      // the share of the track that covers the years before KNEE
  var APPLY_DELAY = 700;     // ms after the last change before the range is applied
  var HANDLE = 16;           // px, the handle's visible width
  var BAR_PITCH = 9.8;       // px: a 7.8px bar and its 2px gap
  var MIN_BARS = 20, MAX_BARS = 60;
  var PAGE_YEARS = 10;
  var MIN_BAR_PX = 4;

  function twoPart(lo, hi) { return lo < KNEE && hi > KNEE; }

  // track position (0..STEPS, may be fractional) to year, and back
  function trackYear(position, lo, hi) {
    var t = position / STEPS;
    if (!twoPart(lo, hi)) return Math.round(lo + t * (hi - lo));
    return t < OLD_SHARE
      ? Math.round(lo + (t / OLD_SHARE) * (KNEE - lo))
      : Math.round(KNEE + ((t - OLD_SHARE) / (1 - OLD_SHARE)) * (hi - KNEE));
  }

  function trackPosition(year, lo, hi) {
    if (hi <= lo) return 0;
    var y = Math.min(Math.max(year, lo), hi);
    if (!twoPart(lo, hi)) return Math.round((y - lo) / (hi - lo) * STEPS);
    return Math.round((y < KNEE
      ? (y - lo) / (KNEE - lo) * OLD_SHARE
      : OLD_SHARE + (y - KNEE) / (hi - KNEE) * (1 - OLD_SHARE)) * STEPS);
  }

  // [from, to] inclusive years for each of `bins` equal steps of the track, covering lo..hi without gaps or overlaps
  function edges(lo, hi, bins) {
    var starts = [], i, out = [];
    for (i = 0; i <= bins; i++) starts.push(trackYear(i / bins * STEPS, lo, hi));
    for (i = 0; i < bins; i++) out.push([starts[i], i === bins - 1 ? hi : Math.max(starts[i + 1] - 1, starts[i])]);
    return out;
  }

  // [{from, to, count}] for the given years; years outside lo..hi are left out
  function histogram(years, lo, hi, bins) {
    var e = edges(lo, hi, bins), counts = new Array(bins).fill(0);
    years.forEach(function (y) {
      if (y < lo || y > hi) return;
      var p = Math.min(bins - 1, Math.floor(trackPosition(y, lo, hi) / STEPS * bins));
      // the position map rounds, so settle on the bin whose edges really contain the year
      while (p > 0 && y < e[p][0]) p--;
      while (p < bins - 1 && y > e[p][1]) p++;
      counts[p]++;
    });
    return e.map(function (pair, i) { return { from: pair[0], to: pair[1], count: counts[i] }; });
  }

  // bar heights as a share (0..1) of the tallest: square root scale, with the tallest taken as the 95th percentile of
  // the non-empty bins so one huge bin cannot flatten the rest. Empty bins are 0 (the stylesheet gives them 4px).
  function barHeights(counts) {
    var filled = counts.filter(function (c) { return c > 0; });
    if (!filled.length) return counts.map(function () { return 0; });
    var sorted = filled.slice().sort(function (a, b) { return a - b; });
    var top = sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * 0.95) - 1)];
    return counts.map(function (c) { return c ? Math.min(Math.sqrt(c / top), 1) : 0; });
  }

  // as many 7.8px bars with 2px gaps as fit the width
  function barCount(width) {
    return Math.min(MAX_BARS, Math.max(MIN_BARS, Math.floor(((width || 287) + 2) / BAR_PITCH + 1e-9)));
  }

  function format(year) { return year < 0 ? Math.abs(year) + ' BCE' : String(year); }

  // a whole year (a minus sign for BCE), null for an empty field, NaN for anything else
  function parseYear(text) {
    var t = String(text == null ? '' : text).trim();
    if (t === '') return null;
    return /^-?\d{1,5}$/.test(t) ? parseInt(t, 10) : NaN;
  }

  function el(tag, className, attrs) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    return node;
  }

  function create(options) {
    var container = options.container;
    var label = options.label || 'years';
    var fmt = options.format || format;
    var years = [];
    var lo = 0, hi = 0;
    var range = { from: null, to: null };     // what is applied (from the page)
    var pending = null;                       // what the visitor has chosen, not yet applied
    var timer = null, announceNext = false, resultCount = null, destroyed = false;
    var bins = [], observer = null, width = 0;

    // --- DOM -----------------------------------------------------------------------------------------------------
    var slider = el('div', 'range-slider');
    var barsEl = el('div', 'range-slider__bars', { 'aria-hidden': 'true' });
    var rail = el('div', 'range-slider__rail');
    var fill = el('div', 'range-slider__fill');
    rail.appendChild(fill);
    var stems = [el('span', 'range-slider__stem', { 'aria-hidden': 'true' }), el('span', 'range-slider__stem', { 'aria-hidden': 'true' })];
    var fromHandle = el('input', 'range-slider__handle', { type: 'range', min: '0', max: String(STEPS), step: '1', 'aria-label': 'Earliest year' });
    var toHandle = el('input', 'range-slider__handle', { type: 'range', min: '0', max: String(STEPS), step: '1', 'aria-label': 'Latest year' });
    var ticksEl = el('div', 'range-slider__ticks', { 'aria-hidden': 'true' });
    slider.appendChild(barsEl); slider.appendChild(rail); stems.forEach(function (s) { slider.appendChild(s); });
    slider.appendChild(fromHandle); slider.appendChild(toHandle); slider.appendChild(ticksEl);

    function field(text, name) {
      var wrap = el('label', 'range-field');
      var span = el('span', 'range-field__label'); span.textContent = text;
      var input = el('input', 'range-field__input', { type: 'text', inputmode: 'numeric', autocomplete: 'off', name: name, 'aria-label': text + ' year (' + label + ')' });
      wrap.appendChild(span); wrap.appendChild(input);
      return { wrap: wrap, input: input };
    }
    var fields = el('div', 'range-fields');
    var fromField = field('From', 'from'), toField = field('To', 'to');
    fields.appendChild(fromField.wrap); fields.appendChild(toField.wrap);
    var errorEl = el('p', 'range-error', { role: 'alert' }); errorEl.hidden = true;
    var clearBtn = el('button', 'range-clear', { type: 'button', 'aria-label': 'Clear ' + label + ' range' }); clearBtn.textContent = 'Clear'; clearBtn.hidden = true;
    var status = el('div', 'range-status', { role: 'status', 'aria-live': 'polite' });
    container.textContent = '';
    [slider, fields, errorEl, clearBtn, status].forEach(function (n) { container.appendChild(n); });

    // --- state helpers -------------------------------------------------------------------------------------------
    function current() { return pending || range; }
    function fromYear() { var c = current(); return c.from == null ? lo : c.from; }
    function toYear() { var c = current(); return c.to == null ? hi : c.to; }

    function setPlaceholders() {
      fromField.input.placeholder = String(lo); toField.input.placeholder = String(hi);
    }

    function paint() {
      var from = Number(fromHandle.value), to = Number(toHandle.value);
      var first = trackYear(from, lo, hi), last = trackYear(to, lo, hi);
      fill.style.setProperty('--range-start', from / STEPS * 100 + '%');
      fill.style.setProperty('--range-end', 100 - to / STEPS * 100 + '%');
      fromHandle.setAttribute('aria-valuemin', lo); fromHandle.setAttribute('aria-valuemax', last);
      fromHandle.setAttribute('aria-valuenow', first); fromHandle.setAttribute('aria-valuetext', fmt(first));
      toHandle.setAttribute('aria-valuemin', first); toHandle.setAttribute('aria-valuemax', hi);
      toHandle.setAttribute('aria-valuenow', last); toHandle.setAttribute('aria-valuetext', fmt(last));
      var nodes = barsEl.childNodes;
      for (var i = 0; i < nodes.length; i++) {
        var b = bins[i]; if (b) nodes[i].classList.toggle('is-in-range', b.to >= first && b.from <= last);
      }
      // closer than a handle's width: nudge them either side of where they really are, and mark where that is
      var w = rail.getBoundingClientRect().width;
      var gap = ((to - from) / STEPS) * w;
      var nudge = w > 0 && gap < HANDLE ? Math.min((HANDLE - gap) / 2, HANDLE / 2) : 0;
      fromHandle.style.setProperty('--nudge', -nudge + 'px'); toHandle.style.setProperty('--nudge', nudge + 'px');
      slider.classList.toggle('is-nudged', nudge > 0);
      stems[0].style.setProperty('--stem-at', from / STEPS * 100 + '%'); stems[1].style.setProperty('--stem-at', to / STEPS * 100 + '%');
      var applied = range.from != null || range.to != null;
      clearBtn.hidden = !applied && !pending;
    }

    function drawTicks() {
      ticksEl.textContent = '';
      if (hi <= lo) return;
      [lo, hi].forEach(function (y, i) {
        var t = el('span', 'range-slider__tick'); t.textContent = fmt(y); t.classList.add(i ? 'is-last' : 'is-first'); ticksEl.appendChild(t);
      });
    }

    function drawBars() {
      barsEl.textContent = '';
      bins = [];
      var usable = years.length && hi > lo;
      slider.classList.toggle('no-bars', !usable);
      if (!usable) return;
      bins = histogram(years, lo, hi, barCount(width));
      var filled = bins.filter(function (b) { return b.count > 0; }).length;
      // one or no non-empty bar says nothing about the spread, so no histogram
      if (filled < 2) { slider.classList.add('no-bars'); bins = []; return; }
      var heights = barHeights(bins.map(function (b) { return b.count; }));
      bins.forEach(function (b, i) {
        var bar = el('span', 'range-slider__bar');
        bar.style.setProperty('--bar-height', b.count ? Math.round(heights[i] * 1000) / 10 + '%' : '0%');
        if (!b.count) bar.classList.add('is-empty');
        barsEl.appendChild(bar);
      });
    }

    function syncFromState() {
      var c = current();
      fromField.input.value = c.from == null ? '' : String(c.from);
      toField.input.value = c.to == null ? '' : String(c.to);
      var a = trackPosition(fromYear(), lo, hi), b = trackPosition(toYear(), lo, hi);
      fromHandle.value = Math.min(a, b); toHandle.value = Math.max(a, b);
      paint();
    }

    function recompute(rebuildBars) {
      lo = years.length ? Math.min.apply(null, years) : 0;
      hi = years.length ? Math.max.apply(null, years) : 0;
      // an applied range outside the data (a year typed beyond it) still has to fit on the track
      [range.from, range.to].forEach(function (y) { if (y != null) { lo = Math.min(lo, y); hi = Math.max(hi, y); } });
      setPlaceholders();
      drawTicks();
      if (rebuildBars !== false) drawBars();
      syncFromState();
    }

    // --- committing a range --------------------------------------------------------------------------------------
    function showError(msg) { errorEl.textContent = msg || ''; errorEl.hidden = !msg; }

    function commit() {
      timer = null;
      var c = pending; if (!c) return;
      if (c.from != null && c.to != null && c.from > c.to) { showError('The earliest year can’t be after the latest year.'); return; }
      showError('');
      pending = null;
      if (c.from === range.from && c.to === range.to) { syncFromState(); return; }
      announceNext = true;
      range = { from: c.from, to: c.to };   // the page confirms it with setRange after it re-renders
      if (options.onChange) options.onChange(c.from, c.to);
      syncFromState();
    }

    function applySoon() { clearTimeout(timer); timer = setTimeout(commit, APPLY_DELAY); }

    function choose(from, to) {
      pending = { from: from, to: to };
      applySoon();
    }

    function announce() {
      if (!announceNext || resultCount == null) return;
      announceNext = false;
      var f = range.from == null ? lo : range.from, t = range.to == null ? hi : range.to;
      // a moment later, so the live region reads it after the page has changed
      setTimeout(function () { if (!destroyed) status.textContent = 'Showing ' + resultCount.toLocaleString('en-AU') + (resultCount === 1 ? ' result' : ' results') + ' from ' + fmt(f) + ' to ' + fmt(t); }, 300);
    }

    // --- events --------------------------------------------------------------------------------------------------
    function fromSlider(handle) {
      var from = Number(fromHandle.value), to = Number(toHandle.value);
      if (from > to) { if (handle === fromHandle) from = to; else to = from; }
      fromHandle.value = from; toHandle.value = to;
      // a handle at its end is an open end: the field stays empty
      var f = from <= 0 ? null : trackYear(from, lo, hi), t = to >= STEPS ? null : trackYear(to, lo, hi);
      pending = { from: f, to: t };
      fromField.input.value = f == null ? '' : String(f); toField.input.value = t == null ? '' : String(t);
      showError('');
      paint();
      applySoon();
    }

    function fromFields() {
      var f = parseYear(fromField.input.value), t = parseYear(toField.input.value);
      if (Number.isNaN(f) || Number.isNaN(t)) { showError('Enter years as whole numbers, for example 1850 (or -400 for BCE).'); return; }
      showError('');
      pending = { from: f, to: t };
      var a = trackPosition(f == null ? lo : f, lo, hi), b = trackPosition(t == null ? hi : t, lo, hi);
      fromHandle.value = Math.min(a, b); toHandle.value = Math.max(a, b);
      paint();
      applySoon();
    }

    // choose exact years (a key press steps by whole years, which the 1000-step track cannot always hold)
    function chooseYears(f, t) {
      pending = { from: f, to: t };
      fromField.input.value = f == null ? '' : String(f); toField.input.value = t == null ? '' : String(t);
      var a = trackPosition(f == null ? lo : f, lo, hi), b = trackPosition(t == null ? hi : t, lo, hi);
      fromHandle.value = Math.min(a, b); toHandle.value = Math.max(a, b);
      showError('');
      paint();
      applySoon();
    }

    function keydown(event, handle) {
      var isFrom = handle === fromHandle, step = { PageUp: PAGE_YEARS, PageDown: -PAGE_YEARS }[event.key];
      var f = fromYear(), t = toYear(), target;
      if (event.key === 'Home') target = isFrom ? lo : f;
      else if (event.key === 'End') target = isFrom ? t : hi;
      else if (step) target = (isFrom ? f : t) + step;
      else return;
      event.preventDefault();
      // a handle can go no further than the other one, nor past the ends of the data
      if (isFrom) { f = Math.max(lo, Math.min(target, t)); } else { t = Math.min(hi, Math.max(target, f)); }
      // at an end the range is open there: the field stays empty
      chooseYears(isFrom && f <= lo ? null : (isFrom ? f : current().from), !isFrom && t >= hi ? null : (isFrom ? current().to : t));
    }

    function activate(handle, dragging) {
      [fromHandle, toHandle].forEach(function (h) { h.classList.toggle('is-active', h === handle); });
      if (dragging) handle.classList.add('is-dragging');
    }

    [fromHandle, toHandle].forEach(function (h) {
      h.addEventListener('input', function () { fromSlider(h); });
      h.addEventListener('keydown', function (e) { keydown(e, h); });
      h.addEventListener('pointerdown', function () { activate(h, true); });
      h.addEventListener('focus', function () { activate(h); });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (n) { h.addEventListener(n, function () { h.classList.remove('is-dragging'); }); });
    });
    [fromField.input, toField.input].forEach(function (i) {
      i.addEventListener('input', fromFields);
      i.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); clearTimeout(timer); fromFields(); commit(); } });
    });
    clearBtn.addEventListener('click', function () {
      clearTimeout(timer); pending = null; showError('');
      if (range.from == null && range.to == null) { syncFromState(); return; }
      announceNext = true; range = { from: null, to: null };
      if (options.onChange) options.onChange(null, null);
      syncFromState();
    });

    // the bars are sized to the track, which has no width while its panel is closed
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(function () {
        var w = Math.round(rail.getBoundingClientRect().width);
        if (w && w !== width) { width = w; if (years.length) drawBars(); }
        paint();
      });
      observer.observe(rail);
    }

    // --- the page's side -----------------------------------------------------------------------------------------
    var api = {
      // the years of the current results (this filter's own range left out)
      setData: function (next) {
        var same = next.length === years.length && next.every(function (y, i) { return y === years[i]; });
        years = next.slice();
        if (!same) recompute(); else paint();
        announce();
      },
      // the applied range, when it changes outside the slider (a filter chip removed, Clear all)
      setRange: function (next) {
        var from = next && next.from != null ? next.from : null, to = next && next.to != null ? next.to : null;
        if (from === range.from && to === range.to) return;
        range = { from: from, to: to };
        if (timer == null) pending = null;
        recompute(false);
      },
      setResultCount: function (n) { resultCount = n; announce(); },
      destroy: function () { destroyed = true; clearTimeout(timer); if (observer) observer.disconnect(); }
    };
    api.setRange(options.range); years = (options.years || []).slice(); recompute(); setPlaceholders();
    return api;
  }

  var api = { create: create, trackYear: trackYear, trackPosition: trackPosition, edges: edges, histogram: histogram, barHeights: barHeights, barCount: barCount, format: format, parseYear: parseYear, STEPS: STEPS, KNEE: KNEE, OLD_SHARE: OLD_SHARE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.CCSRangeSlider = api;
})(typeof window !== 'undefined' ? window : this);
