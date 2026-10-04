// CCS search bar enhancement — gives any <form data-ccs-searchbar> the same behaviour as the search bar on the
// search results page: an "All collections" menu next to the search button (limits the search to one collection), recent searches kept for
// the browser session (same sessionStorage key as the results page), suggested terms drawn from the records,
// arrow-key / Enter / Esc navigation, and a submit that opens the results page with ?q=…&collection=….
// Without JavaScript the form still works as a plain ?q= search.
(function () {
  const SCOPES = [['all', 'All collections'], ['Medical History Museum', 'Medical History Museum'], ['University Art Collection', 'University Art Collection'], ['Grainger Museum Collection', 'Grainger Museum Collection'], ['Henry Forman Atkinson Dental Museum', 'Henry Forman Atkinson Dental Museum'], ['Harry Brookes Allen Museum of Anatomy and Pathology', 'Harry Brookes Allen Museum of Anatomy and Pathology']];
  const HISTORY_KEY = 'ccs-search-history';   // shared with /search/search-results.html
  const RESULTS = '/search/search-results.html';

  const history = {
    get() { try { const a = JSON.parse(sessionStorage.getItem(HISTORY_KEY) || '[]'); return Array.isArray(a) ? a.filter(x => typeof x === 'string' && x.trim()) : []; } catch (e) { return []; } },
    save(term) {
      const t = (term || '').trim(); if (!t) return;
      try { const l = this.get().filter(x => x.toLowerCase() !== t.toLowerCase()); l.unshift(t); sessionStorage.setItem(HISTORY_KEY, JSON.stringify(l.slice(0, 10))); } catch (e) {}
    },
    remove(term) { try { sessionStorage.setItem(HISTORY_KEY, JSON.stringify(this.get().filter(x => x.toLowerCase() !== term.toLowerCase()))); } catch (e) {} },
    clear() { try { sessionStorage.removeItem(HISTORY_KEY); } catch (e) {} }
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
  function mount(form) {
    if (form.dataset.ready) return; form.dataset.ready = '1';
    const input = form.querySelector('input[name="q"]'); if (!input) return;
    const id = 'ccs-sb-' + (++uid);
    let scope = new URLSearchParams(location.search).get('collection') || 'all';
    if (!SCOPES.some(s => s[0] === scope)) scope = 'all';
    let items = [], idx = -1;

    form.classList.add('ccs-searchbar');
    form.setAttribute('action', RESULTS);
    form.setAttribute('autocomplete', 'off');
    input.setAttribute('role', 'combobox'); input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', id); input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('placeholder', 'Search, or use "quotes" for an exact phrase');

    // scope menu
    const scopeWrap = document.createElement('div'); scopeWrap.className = 'ccs-searchbar__scope';
    scopeWrap.innerHTML = '<button type="button" class="ccs-searchbar__scope-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="Search in collection"></button>' +
      '<div class="ccs-searchbar__menu" role="listbox" aria-label="Search in collection" hidden></div>';
    const scopeBtn = scopeWrap.querySelector('button'), menu = scopeWrap.querySelector('.ccs-searchbar__menu');
    const chev = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';
    const paintScope = () => {
      scopeBtn.innerHTML = SCOPES.find(s => s[0] === scope)[1] + chev;
      menu.innerHTML = SCOPES.map(([v, l]) => `<button type="button" role="option" aria-selected="${v === scope}" data-v="${v}">${l}</button>`).join('');
    };
    paintScope();
    const closeScope = () => { menu.hidden = true; scopeBtn.setAttribute('aria-expanded', 'false'); };
    scopeBtn.addEventListener('click', () => { const open = menu.hidden; menu.hidden = !open; scopeBtn.setAttribute('aria-expanded', String(open)); if (open) closeSug(); });
    menu.addEventListener('click', e => { const b = e.target.closest('button[data-v]'); if (!b) return; scope = b.dataset.v; paintScope(); closeScope(); input.focus(); });
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
      const sugs = q.length >= 2 ? terms().filter(t => t.text.toLowerCase().includes(q)).slice(0, 6) : [];
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
      const p = new URLSearchParams({ q }); if (scope !== 'all') p.set('collection', scope);
      location.href = RESULTS + '?' + p.toString();
    }

    input.addEventListener('focus', () => { closeScope(); build(); });
    input.addEventListener('click', () => { closeScope(); build(); });
    input.addEventListener('input', () => { idx = -1; build(); });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' && items.length) { e.preventDefault(); idx = Math.min(items.length - 1, idx + 1); build(); }
      else if (e.key === 'ArrowUp' && items.length) { e.preventDefault(); idx = Math.max(-1, idx - 1); build(); }
      else if (e.key === 'Escape') { closeSug(); closeScope(); }
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
  }

  function init() { document.querySelectorAll('form[data-ccs-searchbar]').forEach(mount); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.CCSSearchBar = { mount, history };
})();
