// Header navigation behaviour (desktop dropdown panels + mobile drawer), modelled on the UniMelb header.
// Everything is event-delegated and elements are looked up live, because the template layer used by some
// pages can re-render the header after this script has run.
(function () {
  var NAV = '.ccs-nav--header';

  function closePanels(except) {
    document.querySelectorAll(NAV + ' .ccs-nav__trigger[aria-expanded="true"]').forEach(function (t) {
      if (t === except) return;
      t.setAttribute('aria-expanded', 'false');
    });
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
      if (trig) { trig.setAttribute('aria-expanded', 'false'); trig.focus(); }
      return;
    }
    var t = e.target.closest && e.target.closest(NAV + ' .ccs-nav__trigger');
    if (t) {
      ensureBack(document.getElementById(t.getAttribute('aria-controls')));
      var open = t.getAttribute('aria-expanded') === 'true';
      closePanels(t);
      t.setAttribute('aria-expanded', open ? 'false' : 'true');
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

/* Recent searches (CCS-143): when the header search overlay opens, list the last few search terms saved this session
   (the search page stores them under 'ccs-search-history'). Built here so every page gets it without extra markup. */
(function () {
  function recent() {
    try { var l = JSON.parse(sessionStorage.getItem('ccs-search-history') || '[]'); return Array.isArray(l) ? l.slice(0, 5) : []; } catch (e) { return []; }
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
    box.appendChild(ul); inner.appendChild(box);
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('[popovertarget="uom-search-popover"]')) setTimeout(render, 0);
  });
})();
