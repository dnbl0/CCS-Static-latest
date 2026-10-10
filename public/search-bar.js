// CCS search bar enhancement — gives any <form data-ccs-searchbar> the same behaviour as the search bar on the
// search results page: an "All collections" menu next to the search button (limits the search to one collection), recent searches kept for
// 30 days in this browser (window.CCSHistory in nav.js, shared with the results page and the header), suggested terms drawn from the records,
// arrow-key / Enter / Esc navigation, and a submit that opens the results page with ?q=…&collection=….
// Without JavaScript the form still works as a plain ?q= search.
//
// Pages that run the search themselves (the results page) pass options to mount()/create():
//   scope:       { get() -> [collection names], set([names]) }  the page owns which collections are selected
//   onSubmit:    (q, scope) -> run the search in place instead of opening the results page
//   chip:        () -> text of the active-search chip ('' for none);  onClearChip() removes it (also on Backspace in an empty box)
//   placeholder: () -> placeholder text;  filterTerm: (term) -> keep this suggestion?;  onInput: (value) -> typed text changed
// mount() returns { sync(), setValue(v) }: call sync() after the page state changes so the menu label, chip and placeholder follow.
(function () {
  const SCOPES = [['all', 'All collections'], ['Medical History Museum', 'Medical History Museum'], ['University Art Collection', 'University Art Collection'], ['Grainger Museum Collection', 'Grainger Museum Collection'], ['Henry Forman Atkinson Dental Museum', 'Henry Forman Atkinson Dental Museum'], ['Harry Brookes Allen Museum of Anatomy and Pathology', 'Harry Brookes Allen Museum of Anatomy and Pathology']];
  const RESULTS = '/search/search-results.html';

  // The history is kept by window.CCSHistory (nav.js): terms with their times, kept for 30 days
  const history = {
    get() { return window.CCSHistory ? window.CCSHistory.all().map(x => x.q) : []; },
    save(term) { if (window.CCSHistory) window.CCSHistory.save(term); },
    remove(term) { if (window.CCSHistory) window.CCSHistory.remove(term); },
    clear() { if (window.CCSHistory) window.CCSHistory.clear(); }
  };

  let TERMS = null;
  function terms() {
    if (TERMS) return TERMS;
    const items = (window.CCS && window.CCS.items) || [], m = new Map();
    const add = (t, cat, sc) => { if (t && !m.has(t + cat)) m.set(t + cat, { text: t, cat, sc }); };
    items.forEach(it => {
      add(it.title, 'Title', 'title');
      if (!/unknown|Staff photographer|^Japanese$/.test(it.creator || '')) add(it.creator, 'Creator', 'creator');
      add(it.subject, 'Subject', 'subject'); add(it.place, 'Place', 'all'); add(it.material, 'Material', 'all');
    });
    return (TERMS = [...m.values()]);
  }

  let uid = 0;
  function mount(form, opts) {
    if (form.dataset.ready) return form._ccsBar; form.dataset.ready = '1'; opts = opts || {};
    const input = form.querySelector('input[name="q"]'); if (!input) return;
    const id = 'ccs-sb-' + (++uid);
    let local = new URLSearchParams(location.search).getAll('collection').filter(v => SCOPES.some(s => s[0] === v && v !== 'all'));
    const getScope = () => (opts.scope ? opts.scope.get() : local) || [];
    const setScope = a => { if (opts.scope) opts.scope.set(a); else local = a; paintScope(); };
    let items = [], idx = -1;

    form.classList.add('ccs-searchbar');
    form.setAttribute('action', RESULTS);
    form.setAttribute('autocomplete', 'off');
    input.setAttribute('role', 'combobox'); input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', id); input.setAttribute('aria-autocomplete', 'list');
    const DEFAULT_PLACEHOLDER = 'Search, or use "quotes" for an exact phrase';
    input.setAttribute('placeholder', opts.placeholder ? opts.placeholder() : DEFAULT_PLACEHOLDER);

    // active-search chip (results page): shows what is being searched, click or Backspace in an empty box removes it
    let chip = null, chipText = null;
    if (opts.chip) {
      chip = document.createElement('button'); chip.type = 'button'; chip.className = 'ccs-searchbar__chip'; chip.setAttribute('aria-label', 'Remove search term');
      chip.innerHTML = '<span class="ccs-searchbar__chip-text"></span><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.6" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"></line><line x1="18" y1="6" x2="6" y2="18"></line></svg>';
      chipText = chip.firstChild; chip.hidden = true; form.insertBefore(chip, input);
      chip.addEventListener('click', () => { if (opts.onClearChip) opts.onClearChip(); input.focus(); });
    }

    // scope menu
    const scopeWrap = document.createElement('div'); scopeWrap.className = 'ccs-searchbar__scope';
    scopeWrap.innerHTML = '<button type="button" class="ccs-searchbar__scope-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="Search in collection"></button>' +
      '<div class="ccs-searchbar__menu" role="listbox" aria-multiselectable="true" aria-label="Search in collection" hidden></div>';
    const scopeBtn = scopeWrap.querySelector('button'), menu = scopeWrap.querySelector('.ccs-searchbar__menu');
    const chev = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';
    const paintScope = () => {
      const scope = getScope();
      const scopeLabel = scope.length === 1 ? scope[0] : scope.length > 1 ? scope.length + ' collections' : 'All collections';
      scopeBtn.innerHTML = scopeLabel + chev;
      scopeBtn.setAttribute('aria-label', scopeLabel + ', search in collection'); // the accessible name starts with the visible text (WCAG 2.5.3)
      menu.innerHTML = SCOPES.map(([v, l]) => `<button type="button" role="option" aria-selected="${v === 'all' ? !scope.length : scope.includes(v)}" data-v="${v}"><span class="ccs-searchbar__check" aria-hidden="true"></span><span>${l}</span></button>`).join('');
    };
    paintScope();
    const closeScope = () => { menu.hidden = true; scopeBtn.setAttribute('aria-expanded', 'false'); };
    scopeBtn.addEventListener('click', () => { const open = menu.hidden; menu.hidden = !open; scopeBtn.setAttribute('aria-expanded', String(open)); if (open) closeSug(); });
    menu.addEventListener('mousedown', e => e.preventDefault());   // keep focus where it is so the menu stays open while ticking
    menu.addEventListener('click', e => { const b = e.target.closest('button[data-v]'); e.stopPropagation(); if (!b) return; const v = b.dataset.v, scope = getScope(); setScope(v === 'all' ? [] : scope.includes(v) ? scope.filter(x => x !== v) : [...scope, v]); });
    // the collection menu sits just left of the search button
    form.insertBefore(scopeWrap, form.querySelector('button[type="submit"]'));

    // suggestion panel
    const panel = document.createElement('div'); panel.id = id; panel.className = 'ccs-searchbar__panel'; panel.setAttribute('role', 'listbox');
    panel.setAttribute('aria-label', 'Search suggestions and recent history'); panel.hidden = true; form.appendChild(panel);
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const clock = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';

    function build() {
      const q = input.value.trim().toLowerCase(), all = history.get();
      const recent = !q ? all.slice(0, 8) : all.filter(t => t.toLowerCase().includes(q)).slice(0, 5);
      const sugs = q.length >= 2 ? terms().filter(t => (!opts.filterTerm || opts.filterTerm(t)) && t.text.toLowerCase().includes(q)).slice(0, 6) : [];
      items = [...recent.map(t => ({ type: 'history', text: t })), ...sugs.map(t => ({ type: 'sug', text: t.text, cat: t.cat }))];
      let html = '';
      if (recent.length) {
        html += '<div class="ccs-searchbar__head"><span>Recent searches</span><button type="button" data-act="clear" aria-label="Clear all recent searches">Clear all</button></div>';
        html += recent.map((t, i) => `<div class="ccs-searchbar__row"><button type="button" role="option" id="${id}-o${i}" data-i="${i}" aria-selected="${i === idx}">${clock}<span>${esc(t)}</span></button>` +
          `<button type="button" class="ccs-searchbar__x" data-rm="${esc(t)}" aria-label="Remove ${esc(t)} from search history" title="Remove from history">&times;</button></div>`).join('');
      }
      if (sugs.length) {
        html += '<div class="ccs-searchbar__head"><span>Suggested terms</span></div>';
        html += sugs.map((t, j) => { const i = recent.length + j; return `<button type="button" role="option" id="${id}-o${i}" class="ccs-searchbar__sug" data-i="${i}" aria-selected="${i === idx}"><span>${esc(t.text)}</span><em>${esc(t.cat)}</em></button>`; }).join('');
      }
      panel.innerHTML = html;
      const open = !!html;
      panel.hidden = !open; input.setAttribute('aria-expanded', String(open));
      if (idx >= 0 && items[idx]) input.setAttribute('aria-activedescendant', id + '-o' + idx); else input.removeAttribute('aria-activedescendant');
    }
    function closeSug() { panel.hidden = true; idx = -1; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); }
    function go(term) {
      const q = (term || '').trim(); if (!q) { input.focus(); return; }
      history.save(q);
      if (opts.onSubmit) { input.value = ''; if (opts.onInput) opts.onInput(''); closeSug(); opts.onSubmit(q, getScope()); return; }
      const p = new URLSearchParams({ q }); getScope().forEach(c => p.append('collection', c));
      location.href = RESULTS + '?' + p.toString();
    }

    input.addEventListener('focus', () => { closeScope(); build(); });
    input.addEventListener('click', () => { closeScope(); build(); });
    input.addEventListener('input', () => { idx = -1; build(); if (opts.onInput) opts.onInput(input.value); });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' && items.length) { e.preventDefault(); idx = Math.min(items.length - 1, idx + 1); build(); }
      else if (e.key === 'ArrowUp' && items.length) { e.preventDefault(); idx = Math.max(-1, idx - 1); build(); }
      else if (e.key === 'Escape') { closeSug(); closeScope(); }
      else if (e.key === 'Backspace' && !input.value && chip && !chip.hidden && opts.onClearChip) opts.onClearChip();
    });
    // mousedown (not click) so a pick lands before the input loses focus
    panel.addEventListener('mousedown', e => {
      const rm = e.target.closest('[data-rm]'), clr = e.target.closest('[data-act="clear"]'), opt = e.target.closest('[data-i]');
      if (rm) { e.preventDefault(); history.remove(rm.dataset.rm); idx = -1; build(); }
      else if (clr) { e.preventDefault(); history.clear(); idx = -1; build(); }
      else if (opt) { e.preventDefault(); go(items[+opt.dataset.i].text); }
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      go(idx >= 0 && items[idx] ? items[idx].text : input.value);
    });
    document.addEventListener('click', e => { if (!form.contains(e.target)) { closeSug(); closeScope(); } });
    form.addEventListener('focusout', e => { if (!form.contains(e.relatedTarget)) { closeSug(); closeScope(); } });

    function sync() {
      paintScope();
      if (chip) { const t = opts.chip() || ''; chip.hidden = !t; chipText.textContent = t; chip.setAttribute('aria-label', 'Remove search term ' + t); }
      if (opts.placeholder) input.setAttribute('placeholder', opts.placeholder());
    }
    sync();
    return (form._ccsBar = { sync, setValue(v) { if (input.value !== v) input.value = v; } });
  }

  // Builds the whole search form inside an empty host element, then mounts it. Hosts stay empty in the page's own
  // template so a re-render by the page never touches (or removes) what is built here.
  function create(host, opts) {
    opts = opts || {};
    if (host._ccsBar) return host._ccsBar;
    const form = document.createElement('form');
    form.setAttribute('role', 'search');
    if (opts.className) form.className = opts.className;
    form.innerHTML = '<input type="text" name="q" aria-label="Search the collection">' +
      '<button type="submit" aria-label="Search"><img src="/images/home/icon-search-button.svg" alt="" width="24" height="24"></button>';
    host.appendChild(form);
    return (host._ccsBar = mount(form, opts));
  }

  function init() { document.querySelectorAll('form[data-ccs-searchbar]').forEach(mount); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.CCSSearchBar = { mount, create, history };
})();
