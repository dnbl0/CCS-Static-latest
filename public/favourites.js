// CCS favourites and personal lists (CCS-70 guest model: no login, kept in this browser).
//
//  1. createStore(storage)  pure list logic over any storage with getItem/setItem (unit-tested in tests/favourites.test.js)
//  2. browser UI            hearts, the "Save to list" dialog, the header badge. Everything is event-delegated and looks
//                           elements up live, because the DC template layer re-renders cards (see nav.js for the same rule).
//
// Markup contract (static, safe inside DC templates; this script only sets attributes on it, never children):
//   <button class="fav-heart" data-fav-id="12" data-fav-title="Title" aria-haspopup="dialog" aria-label="Add to list">
//   [data-fav-count] gets data-count="N" (the header badge draws the number with CSS).
// Only record ids are stored; the records themselves come from collection-data.js.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CCSFavourites = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  const KEY = 'ccs-favourites', VERSION = 1, DEFAULT_ID = 'default', DEFAULT_NAME = 'My favourites', MAX_NAME = 80;

  const cleanName = s => String(s == null ? '' : s).replace(/\s+/g, ' ').trim().slice(0, MAX_NAME);
  const toId = v => { const n = Number(v); return Number.isFinite(n) && n > 0 ? n : null; };

  function createStore(storage) {
    let state = { v: VERSION, lists: [] }, persisted = true, seq = 0;
    const listeners = [];

    function parse(raw) {
      try {
        const d = JSON.parse(raw);
        if (!d || !Array.isArray(d.lists)) return { v: VERSION, lists: [] };
        const ids = new Set();
        const lists = d.lists.filter(l => l && typeof l.id === 'string' && l.id && !ids.has(l.id) && ids.add(l.id)).map(l => ({
          id: l.id, name: cleanName(l.name) || 'Untitled list', created: Number(l.created) || 0,
          items: (Array.isArray(l.items) ? l.items : []).map(toId).filter((x, i, a) => x && a.indexOf(x) === i)
        }));
        return { v: VERSION, lists };
      } catch (e) { return { v: VERSION, lists: [] }; }
    }
    function load() { let raw = null; try { raw = storage && storage.getItem(KEY); } catch (e) { /* storage blocked */ } state = raw ? parse(raw) : { v: VERSION, lists: [] }; }
    function save() {
      try { storage.setItem(KEY, JSON.stringify(state)); persisted = true; } catch (e) { persisted = false; }   // keeps working in memory if storage is blocked or full
      listeners.forEach(fn => { try { fn(); } catch (e) { /* a listener must not break the others */ } });
    }
    function unique(name, exceptId) {
      const base = cleanName(name); if (!base) return '';
      const taken = n => state.lists.some(l => l.id !== exceptId && l.name.toLowerCase() === n.toLowerCase());
      if (!taken(base)) return base;
      for (let i = 2; ; i++) { const cand = base.slice(0, MAX_NAME - 4) + ' (' + i + ')'; if (!taken(cand)) return cand; }
    }
    const find = id => state.lists.find(l => l.id === id) || null;
    function ensureDefault() {
      let d = find(DEFAULT_ID);
      if (!d) { d = { id: DEFAULT_ID, name: unique(DEFAULT_NAME), created: Date.now(), items: [] }; state.lists.unshift(d); }
      return d;
    }

    load();
    return {
      DEFAULT_ID,
      reload() { load(); listeners.forEach(fn => { try { fn(); } catch (e) { /* ignore */ } }); },
      onChange(fn) { listeners.push(fn); },
      isPersisted: () => persisted,
      lists: () => state.lists.map(l => ({ ...l, items: l.items.slice() })),
      getList: id => { const l = find(id); return l ? { ...l, items: l.items.slice() } : null; },
      createList(name) {
        const n = unique(name); if (!n) return null;
        const l = { id: 'l' + Date.now().toString(36) + (++seq), name: n, created: Date.now(), items: [] };
        state.lists.push(l); save(); return { ...l, items: [] };
      },
      renameList(id, name) {
        const l = find(id), n = l && unique(name, id); if (!l || !n) return null;
        l.name = n; save(); return n;
      },
      // The default list ("My favourites") can be renamed and emptied but not deleted.
      deleteList(id) {
        const i = state.lists.findIndex(l => l.id === id);
        if (i < 0 || id === DEFAULT_ID) return false;
        state.lists.splice(i, 1); save(); return true;
      },
      add(listId, itemId) {
        const id = toId(itemId); if (!id) return false;
        const l = listId === DEFAULT_ID ? ensureDefault() : find(listId); if (!l) return false;
        if (!l.items.includes(id)) l.items.push(id);
        save(); return true;
      },
      remove(listId, itemId) {
        const l = find(listId), id = toId(itemId); if (!l || !id) return false;
        const i = l.items.indexOf(id); if (i < 0) return false;
        l.items.splice(i, 1); save(); return true;
      },
      move(fromId, toListId, itemId) {
        const from = find(fromId), to = find(toListId), id = toId(itemId);
        if (!from || !to || !id || from === to || !from.items.includes(id)) return false;
        from.items.splice(from.items.indexOf(id), 1);
        if (!to.items.includes(id)) to.items.push(id);
        save(); return true;
      },
      setMembership(listId, itemId, on) { return on ? this.add(listId, itemId) : this.remove(listId, itemId); },
      listIdsFor: itemId => { const id = toId(itemId); return state.lists.filter(l => l.items.includes(id)).map(l => l.id); },
      has: itemId => { const id = toId(itemId); return state.lists.some(l => l.items.includes(id)); },
      // distinct saved records across all lists (the header badge)
      count: () => new Set([].concat(...state.lists.map(l => l.items))).size
    };
  }

  const api = { KEY, createStore, DEFAULT_NAME };
  if (typeof document === 'undefined') return api;

  // ------------------------------------------------------------------ browser UI
  let ls = null; try { ls = window.localStorage; ls.getItem(KEY); } catch (e) { ls = null; }
  const store = createStore(ls);
  api.store = store;
  window.CCSFav = api;

  const HEART = '<svg class="fav-heart__icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 20.5s-7.5-4.6-9.3-9.4C1.6 8 3.4 5 6.5 5c2 0 3.5 1.1 4.5 2.6h2C14 6.1 15.5 5 17.5 5c3.1 0 4.9 3 3.8 6.1-1.8 4.8-9.3 9.4-9.3 9.4z" stroke-width="2" stroke-linejoin="round"/></svg>';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const recTitle = (id, hint) => hint || (window.CCS && window.CCS.records[id] && window.CCS.records[id].title) || 'this item';
  const known = id => !window.CCS || !!window.CCS.records[id];

  let live = null, dlg = null, current = null, opener = null;

  function announce(msg) {
    if (!live) { live = document.createElement('div'); live.className = 'sr-only'; live.setAttribute('role', 'status'); live.setAttribute('aria-live', 'polite'); document.body.appendChild(live); }
    live.textContent = ''; setTimeout(() => { live.textContent = msg; }, 30);
  }

  // Hearts: aria-pressed + a label that says what a tap does. Only attributes are touched.
  function syncHearts() {
    document.querySelectorAll('.fav-heart[data-fav-id]').forEach(b => {
      const id = toId(b.getAttribute('data-fav-id'));
      if (!id || !known(id)) { b.hidden = true; return; }
      b.hidden = false;
      const saved = store.has(id), title = recTitle(id, b.getAttribute('data-fav-title'));
      b.setAttribute('aria-pressed', saved ? 'true' : 'false');
      b.setAttribute('aria-haspopup', 'dialog');
      b.setAttribute('aria-label', saved ? 'Saved: ' + title + '. Change lists' : 'Add to list: ' + title);
    });
    const n = String(store.count());
    document.querySelectorAll('[data-fav-count]').forEach(el => { if (el.getAttribute('data-count') !== n) el.setAttribute('data-count', n); });   // guarded: the observer below watches this attribute
  }

  // ---- "Save to list" dialog (a centred modal so it needs no positioning and works at any width)
  function buildDialog() {
    dlg = document.createElement('div');
    dlg.className = 'fav-dialog'; dlg.hidden = true;
    dlg.innerHTML = '<div class="fav-dialog__scrim" data-fav-close=""></div>' +
      '<div class="fav-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="fav-dialog-title" tabindex="-1">' +
      '<h2 class="fav-dialog__title" id="fav-dialog-title">Save to list</h2>' +
      '<p class="fav-dialog__item" id="fav-dialog-item"></p>' +
      '<ul class="fav-dialog__lists" id="fav-dialog-lists"></ul>' +
      '<form class="fav-dialog__new" id="fav-dialog-new" autocomplete="off">' +
      '<label class="fav-dialog__label" for="fav-dialog-name">New list name</label>' +
      '<div class="fav-dialog__row"><input class="fav-dialog__input" id="fav-dialog-name" type="text" maxlength="' + MAX_NAME + '">' +
      '<button class="fav-btn fav-btn--secondary" type="submit">Create and save</button></div></form>' +
      '<p class="fav-dialog__note">Lists are kept in this browser. Signing in to keep them on every device is planned for a later release.</p>' +
      '<div class="fav-dialog__actions"><a class="fav-dialog__link" href="/lists">View my lists</a><button class="fav-btn" type="button" data-fav-close="">Done</button></div></div>';
    document.body.appendChild(dlg);
    dlg.addEventListener('click', e => { if (e.target.closest('[data-fav-close]')) closeDialog(); });
    dlg.addEventListener('change', e => {
      const cb = e.target.closest('input[data-list]'); if (!cb || !current) return;
      store.setMembership(cb.getAttribute('data-list'), current.id, cb.checked);
      const l = store.getList(cb.getAttribute('data-list'));
      announce((cb.checked ? 'Saved to ' : 'Removed from ') + (l ? l.name : 'list'));
      paintLists(); syncHearts();
    });
    dlg.querySelector('#fav-dialog-new').addEventListener('submit', e => {
      e.preventDefault();
      const input = dlg.querySelector('#fav-dialog-name'), l = store.createList(input.value);
      if (!l) { input.focus(); announce('Enter a name for the new list'); return; }
      store.add(l.id, current.id); input.value = '';
      announce('Created ' + l.name + ' and saved this item to it');
      paintLists(); syncHearts();
    });
    dlg.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.stopPropagation(); closeDialog(); return; }
      if (e.key !== 'Tab') return;
      const f = [...dlg.querySelectorAll('input, button, a[href]')].filter(x => !x.disabled && x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dlg.querySelector('.fav-dialog__panel'))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }
  function paintLists() {
    const ul = dlg.querySelector('#fav-dialog-lists'), lists = store.lists();
    ul.innerHTML = lists.map(l => '<li class="fav-dialog__list"><label class="fav-check"><input type="checkbox" data-list="' + esc(l.id) + '"' + (l.items.includes(current.id) ? ' checked' : '') + '>' +
      '<span class="fav-check__box" aria-hidden="true"></span><span class="fav-check__name">' + esc(l.name) + '</span><span class="fav-check__count">' + l.items.length + (l.items.length === 1 ? ' item' : ' items') + '</span></label></li>').join('');
  }
  function openDialog(id, title, trigger) {
    if (!dlg) buildDialog();
    current = { id, title }; opener = trigger || null;
    dlg.querySelector('#fav-dialog-item').textContent = title;
    paintLists();
    dlg.hidden = false; document.documentElement.classList.add('fav-dialog-open');
    const first = dlg.querySelector('input[data-list]') || dlg.querySelector('#fav-dialog-name');
    (first || dlg.querySelector('.fav-dialog__panel')).focus();
  }
  function closeDialog() {
    if (!dlg || dlg.hidden) return;
    dlg.hidden = true; document.documentElement.classList.remove('fav-dialog-open');
    let back = opener && document.contains(opener) ? opener : (current && document.querySelector('.fav-heart[data-fav-id="' + current.id + '"]'));
    current = null; opener = null;
    if (back) back.focus();
  }

  // One tap on an unsaved heart saves to "My favourites" and opens the dialog to pick other lists; on a saved heart it opens the dialog.
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('.fav-heart[data-fav-id]'); if (!b) return;
    e.preventDefault();
    const id = toId(b.getAttribute('data-fav-id')); if (!id || !known(id)) return;
    const title = recTitle(id, b.getAttribute('data-fav-title'));
    if (!store.has(id)) { store.add(DEFAULT_ID, id); announce('Saved to ' + (store.getList(DEFAULT_ID) || { name: DEFAULT_NAME }).name); }
    syncHearts();
    openDialog(id, title, b);
  });

  store.onChange(syncHearts);
  window.addEventListener('storage', e => { if (e.key === KEY) store.reload(); });   // another tab changed the lists

  // Cards are (re)rendered by the DC template layer: re-sync when hearts appear or their record id changes.
  let queued = false;
  const queue = () => { if (queued) return; queued = true; (window.requestAnimationFrame || setTimeout)(() => { queued = false; syncHearts(); }); };
  function start() {
    syncHearts();
    new MutationObserver(queue).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-fav-id', 'data-fav-title', 'data-count'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  api.HEART = HEART; api.syncHearts = syncHearts; api.openDialog = openDialog;
  return api;
}));
