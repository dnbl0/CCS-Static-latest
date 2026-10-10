// Search history (CCS-143, CCS-206): the terms searched in this browser with the time of each, kept for 30 days (at most 100,
// like Blacklight's own history). Shared by the header search overlay, the search bar and the search results page, which
// all go through window.CCSHistory, and listed by day on /search/search-history.html.
(function () {
  var KEY = 'ccs-search-history-v2', OLD_KEY = 'ccs-search-history', KEEP_MS = 30 * 864e5, MAX = 100;
  var TZ = 'Australia/Melbourne';   // days are Melbourne's, as on the Rails app
  var dayFormat = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
  function dayNumber(ms) {   // whole days since 1970 for the Melbourne calendar date of ms
    var p = dayFormat.formatToParts(new Date(ms)).reduce(function (o, x) { o[x.type] = x.value; return o; }, {});
    return Date.UTC(+p.year, +p.month - 1, +p.day) / 864e5;
  }
  function read() {
    var list = [];
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (Array.isArray(raw)) list = raw;
      else {   // first use: bring over the terms the earlier per-tab history held
        var old = JSON.parse(sessionStorage.getItem(OLD_KEY) || '[]'), now = Date.now();
        if (Array.isArray(old)) list = old.map(function (q, i) { return { q: q, t: now - i }; });
      }
    } catch (e) {}
    var cutoff = Date.now() - KEEP_MS;
    return list.filter(function (x) { return x && typeof x.q === 'string' && x.q.trim() && x.t > cutoff; });
  }
  function write(list) { try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX))); } catch (e) {} }
  function same(a, b) { return a.toLowerCase() === b.toLowerCase(); }
  window.CCSHistory = {
    all: read,
    recent: function (n) { return read().slice(0, n); },
    save: function (term) {
      var q = (term || '').trim();
      if (!q) return;
      var list = read().filter(function (x) { return !same(x.q, q); });
      list.unshift({ q: q, t: Date.now() });
      write(list);
    },
    remove: function (term) { write(read().filter(function (x) { return !same(x.q, term); })); },
    clear: function () { try { localStorage.removeItem(KEY); sessionStorage.removeItem(OLD_KEY); } catch (e) {} },
    label: function (ms, now) {   // "Today", "Yesterday", "2 days ago" ... for the day a search was made
      var days = Math.max(0, dayNumber(now || Date.now()) - dayNumber(ms));
      return days === 0 ? 'Today' : days === 1 ? 'Yesterday' : days + ' days ago';
    },
    groups: function (now) {   // [{ label, items: [{ q, t }] }], newest day first
      var out = [], byLabel = {};
      read().forEach(function (x) {
        var label = window.CCSHistory.label(x.t, now);
        if (!byLabel[label]) { byLabel[label] = { label: label, items: [] }; out.push(byLabel[label]); }
        byLabel[label].items.push(x);
      });
      return out;
    }
  };
})();

// Saved records (bookmarks): a single list of the records saved in this browser, like Blacklight's bookmarks for a guest.
// Kept in localStorage as [{ id, t, title }], newest first. Everything goes through window.CCSBookmarks. Any element
// <button class="ccs-save" data-bookmark-id data-bookmark-title> is a Save/Saved toggle, and the "saved records" bar
// ([data-bookmarks-link], .saved-bar) shows the live count; both are kept in step with the list, also across tabs.
// The bar is not in the page markup: it is added here at the right end of the breadcrumb strip (.page-breadcrumbs), or in
// the header top strip on a page with no breadcrumb (the home page).
(function () {
  var KEY = 'ccs-bookmarks-v1', MAX = 500, EVENT = 'ccs:bookmarks';
  var PATH = 'M6 3h12v18l-6-4-6 4z';
  function read() {
    var list = [];
    try { var raw = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(raw)) list = raw; } catch (e) {}
    return list.filter(function (x) { return x && x.id != null && String(x.id) !== ''; })
      .map(function (x) { return { id: String(x.id), t: +x.t || 0, title: typeof x.title === 'string' ? x.title : '' }; });
  }
  function write(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX))); } catch (e) {}
    changed();
  }
  function has(id) { id = String(id); return read().some(function (x) { return x.id === id; }); }
  function countText(n) { return n + (n === 1 ? ' saved record' : ' saved records'); }
  function changed() { document.dispatchEvent(new CustomEvent(EVENT)); sync(); }

  window.CCSBookmarks = {
    all: read,
    count: function () { return read().length; },
    has: has,
    countText: countText,
    add: function (id, title) {
      id = String(id);
      if (has(id)) return;
      var list = read(); list.unshift({ id: id, t: Date.now(), title: title || '' }); write(list);
    },
    remove: function (id) { id = String(id); write(read().filter(function (x) { return x.id !== id; })); },
    toggle: function (id, title) {
      if (has(id)) { window.CCSBookmarks.remove(id); return false; }
      window.CCSBookmarks.add(id, title); return true;
    },
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) {} changed(); },
    announce: function (text) {
      var live = document.getElementById('ccs-bookmarks-status');
      if (!live) {
        live = document.createElement('div'); live.id = 'ccs-bookmarks-status'; live.className = 'sr-only';
        live.setAttribute('role', 'status'); live.setAttribute('aria-live', 'polite'); document.body.appendChild(live);
      }
      live.textContent = '';
      setTimeout(function () { live.textContent = text; }, 50);
    }
  };

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function icon(kind) {   // kind: 'add' (bookmark with a plus) or 'saved' (filled bookmark with a check)
    var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'ccs-save__icon ccs-save__icon--' + kind); svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
    var a = document.createElementNS(ns, 'path'); a.setAttribute('d', PATH);
    var b = document.createElementNS(ns, 'path'); b.setAttribute('class', 'ccs-save__mark');
    b.setAttribute('d', kind === 'add' ? 'M12 7.5v6M9 10.5h6' : 'M8.8 10.4l2.3 2.3 4.2-4.6');
    svg.appendChild(a); svg.appendChild(b); return svg;
  }
  function setText(node, text) { if (node.textContent !== text) node.textContent = text; }

  function syncButton(btn) {
    var id = btn.getAttribute('data-bookmark-id');
    if (!id) return;
    var title = btn.getAttribute('data-bookmark-title') || '';
    if (!btn.querySelector('.ccs-save__label')) {
      btn.textContent = ''; btn.type = 'button';
      btn.appendChild(icon('add')); btn.appendChild(icon('saved'));
      btn.appendChild(el('span', 'ccs-save__label')); btn.appendChild(el('span', 'sr-only ccs-save__name'));
    }
    var saved = has(id);
    if (btn.getAttribute('aria-pressed') !== String(saved)) btn.setAttribute('aria-pressed', String(saved));
    setText(btn.querySelector('.ccs-save__label'), saved ? 'Saved' : 'Save');
    setText(btn.querySelector('.ccs-save__name'), ' record' + (title ? ': ' + title : ''));
  }
  var SVG = 'http://www.w3.org/2000/svg';
  function barIcon(kind, mark) {   // kind: 'empty' (plus) or 'some' (check)
    var svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('class', 'saved-bar__icon saved-bar__icon--' + kind); svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
    var a = document.createElementNS(SVG, 'path'); a.setAttribute('d', PATH);
    var b = document.createElementNS(SVG, 'path'); b.setAttribute('class', 'saved-bar__mark'); b.setAttribute('d', mark);
    svg.appendChild(a); svg.appendChild(b); return svg;
  }
  // Adds the bar when the page has none and there is somewhere to put it. Elements are looked up live: a page's template
  // layer can redraw the breadcrumb or the header after this script has run, which drops the bar, so it is added again.
  function ensureBar() {
    if (document.querySelector('[data-bookmarks-link]')) return;
    var crumbs = document.querySelector('.page-breadcrumbs'), top = document.querySelector('.ccs-nav--header .ccs-nav__top');
    if (!crumbs && !top) return;
    var a = el('a', 'saved-bar ' + (crumbs ? 'saved-bar--breadcrumb' : 'saved-bar--header'));
    a.href = '/search/bookmarks.html'; a.setAttribute('data-bookmarks-link', '');
    if (/^\/search\/bookmarks(\.html)?\/?$/.test(location.pathname)) a.setAttribute('aria-current', 'page');
    var label = el('span', null, countText(read().length)); label.setAttribute('data-bookmarks-text', '');
    a.appendChild(barIcon('empty', 'M12 7.5v6M9 10.5h6')); a.appendChild(barIcon('some', 'M8.8 10.4l2.3 2.3 4.2-4.6')); a.appendChild(label);
    if (crumbs) crumbs.appendChild(a); else top.insertBefore(a, top.querySelector('.ccs-nav__search'));
  }
  function sync() {
    ensureBar();
    var n = read().length, text = countText(n);
    document.querySelectorAll('[data-bookmarks-link]').forEach(function (a) {
      a.classList.toggle('has-saved', n > 0);
      var t = a.querySelector('[data-bookmarks-text]'); if (t) setText(t, text);
    });
    document.querySelectorAll('[data-bookmarks-drawer-text]').forEach(function (t) { setText(t, text); });
    document.querySelectorAll('.ccs-save[data-bookmark-id]').forEach(syncButton);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.ccs-save[data-bookmark-id]');
    if (!btn) return;
    e.preventDefault();
    var title = btn.getAttribute('data-bookmark-title') || '';
    var nowSaved = window.CCSBookmarks.toggle(btn.getAttribute('data-bookmark-id'), title);
    window.CCSBookmarks.announce((nowSaved ? 'Saved' : 'Removed from saved records') + (title ? ': ' + title : '') + '. ' + countText(window.CCSBookmarks.count()) + '.');
  });
  window.addEventListener('storage', function (e) { if (e.key === KEY || e.key === null) { document.dispatchEvent(new CustomEvent(EVENT)); sync(); } });

  // Pages draw (and redraw) their markup after this script runs, so keep the buttons and header counts in step with what is on the page
  var queued = false;
  function queue() { if (queued) return; queued = true; requestAnimationFrame(function () { queued = false; sync(); }); }
  function start() {
    sync();
    if (window.MutationObserver) new MutationObserver(queue).observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();

// Header navigation behaviour (desktop dropdown panels + mobile drawer), modelled on the UniMelb header.
// Everything is event-delegated and elements are looked up live, because the template layer used by some
// pages can re-render the header after this script has run.
(function () {
  var NAV = '.ccs-nav--header';

  // Mobile drill-in: the header title becomes the chosen section's name (as on the UniMelb header), restored on Back / Close
  function syncTitle() {
    var title = document.querySelector(NAV + ' .ccs-nav__title');
    if (!title) return;
    var open = document.querySelector(NAV + ' .ccs-nav__trigger[aria-expanded="true"]');
    if (open && window.matchMedia('(max-width: 1023px)').matches) {
      if (!title.hasAttribute('data-home-label')) title.setAttribute('data-home-label', title.textContent);
      title.textContent = open.textContent.replace(/\s+/g, ' ').trim();
    } else if (title.hasAttribute('data-home-label')) {
      title.textContent = title.getAttribute('data-home-label'); title.removeAttribute('data-home-label');
    }
  }

  function closePanels(except) {
    document.querySelectorAll(NAV + ' .ccs-nav__trigger[aria-expanded="true"]').forEach(function (t) {
      if (t === except) return;
      t.setAttribute('aria-expanded', 'false');
    });
    syncTitle();
  }

  var BACK = '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 5 8 12 15 19"/></svg>Back';
  // Mobile drill-in view: every sub-menu panel gets a Back row (added here so no page markup has to change)
  function ensureBack(panel) {
    if (!panel || panel.querySelector('.ccs-nav__back')) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'ccs-nav__back'; b.innerHTML = BACK;
    panel.insertBefore(b, panel.firstChild);
  }

  function setMenu(open) {
    var btn = document.querySelector(NAV + ' .ccs-nav__menu');
    var nav = document.getElementById('ccs-primary-nav');
    if (!btn || !nav) return;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var label = btn.querySelector('span');
    if (label) label.textContent = open ? 'Close' : 'Menu';
    nav.classList.toggle('is-open', open);
    if (!open) closePanels();
  }

  document.addEventListener('click', function (e) {
    var back = e.target.closest && e.target.closest(NAV + ' .ccs-nav__back');
    if (back) {
      var panel = back.closest('.ccs-nav__panel');
      var trig = panel && panel.previousElementSibling;
      if (trig) { trig.setAttribute('aria-expanded', 'false'); syncTitle(); trig.focus(); }
      return;
    }
    var t = e.target.closest && e.target.closest(NAV + ' .ccs-nav__trigger');
    if (t) {
      ensureBack(document.getElementById(t.getAttribute('aria-controls')));
      var open = t.getAttribute('aria-expanded') === 'true';
      closePanels(t);
      t.setAttribute('aria-expanded', open ? 'false' : 'true');
      syncTitle();
      return;
    }
    var m = e.target.closest && e.target.closest(NAV + ' .ccs-nav__menu');
    if (m) { setMenu(m.getAttribute('aria-expanded') !== 'true'); return; }
    // clicking the dimmed page behind the mobile drawer closes it
    if (e.target === document.querySelector(NAV)) { setMenu(false); return; }
    // clicking anywhere else closes an open dropdown; clicking outside the header also closes the mobile drawer
    if (!(e.target.closest && e.target.closest('.ccs-nav__panel'))) closePanels();
    if (!(e.target.closest && e.target.closest(NAV))) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector(NAV + ' .ccs-nav__trigger[aria-expanded="true"]');
    var menu = document.querySelector(NAV + ' .ccs-nav__menu[aria-expanded="true"]');
    if (open) { closePanels(); open.focus(); }
    else if (menu) { setMenu(false); menu.focus(); }
  });

  // Keyboard users tabbing out of the header close the dropdown
  document.addEventListener('focusin', function (e) {
    if (!(e.target.closest && e.target.closest(NAV))) closePanels();
  });
})();

/* Recent searches (CCS-143): when the header search overlay opens, list the last few search terms
   (kept by window.CCSHistory above). Built here so every page gets it without extra markup. */
(function () {
  function recent() {
    return window.CCSHistory.recent(5).map(function (x) { return x.q; });
  }
  function render() {
    var inner = document.querySelector('#uom-search-popover .uom-search-popover__inner');
    if (!inner) return;
    var old = inner.querySelector('.uom-search-recent');
    if (old) old.remove();
    var terms = recent();
    if (!terms.length) return;
    var box = document.createElement('nav');
    box.className = 'uom-search-recent';
    box.setAttribute('aria-label', 'Recent searches');
    var h = document.createElement('h3'); h.className = 'uom-search-recent__heading'; h.textContent = 'Recent searches'; box.appendChild(h);
    var ul = document.createElement('ul'); ul.className = 'uom-search-recent__list';
    terms.forEach(function (t) {
      var li = document.createElement('li'); li.className = 'uom-search-recent__item';
      var a = document.createElement('a'); a.className = 'uom-search-recent__link'; a.href = '/search/search-results.html?q=' + encodeURIComponent(t); a.textContent = t;
      li.appendChild(a); ul.appendChild(li);
    });
    box.appendChild(ul);
    var all = document.createElement('a'); all.className = 'uom-search-recent__all'; all.href = '/search/search-history.html'; all.textContent = 'All recent searches';
    box.appendChild(all); inner.appendChild(box);
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('[popovertarget="uom-search-popover"]')) setTimeout(render, 0);
  });
})();
