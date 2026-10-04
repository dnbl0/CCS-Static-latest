// My lists page (CCS-70 guest lists): renders every list from the favourites store into #lists-root.
// Actions: create, rename, delete (default list cannot be deleted), remove item, move item between lists.
// Records come from collection-data.js (window.CCS); only record ids are stored. Records with an Indigenous
// cultural advisory keep their notice here, so it is never lost when a record is saved.
(function () {
  const root = document.getElementById('lists-root'), createForm = document.getElementById('lists-create');
  if (!root || !window.CCSFav) return;
  const store = window.CCSFav.store, CCS = window.CCS || { records: {} };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let renaming = null, deleting = null, focusSel = null, statusEl = document.getElementById('lists-status');

  const say = msg => { if (!statusEl) return; statusEl.textContent = ''; setTimeout(() => { statusEl.textContent = msg; }, 30); };

  function itemHtml(list, id, others) {
    const r = CCS.records[id], title = r ? r.title : 'Record no longer available';
    const meta = r ? [r.card.collection, r.card.type].filter(Boolean).map(esc).join(' · ') : 'This record has been removed from the collection data.';
    const adv = r && r.advisories && r.advisories.length
      ? '<div class="lists-item__advisory" role="note"><strong class="lists-item__advisory-title">' + esc(r.advisories.map(a => a.type).join(' · ')) + ' advisory</strong>' +
        r.advisories.map(a => '<p class="lists-item__advisory-text">' + esc(a.text) + '</p>').join('') + '</div>' : '';
    const img = r && r.card.img ? '<a class="lists-item__thumb" href="/collections/record.html?id=' + id + '" tabindex="-1" aria-hidden="true"><img class="lists-item__image" src="' + esc(r.card.img) + '" alt="" loading="lazy"></a>' : '<span class="lists-item__thumb lists-item__thumb--none" aria-hidden="true"></span>';
    const heading = r ? '<a class="lists-item__title" href="/collections/record.html?id=' + id + '">' + esc(title) + '</a>' : '<span class="lists-item__title">' + esc(title) + '</span>';
    const move = others.length && r ? '<div class="lists-item__move"><label class="lists-item__move-label" for="mv-' + list.id + '-' + id + '">Move to</label>' +
      '<select class="lists-select" id="mv-' + list.id + '-' + id + '">' + others.map(o => '<option value="' + esc(o.id) + '">' + esc(o.name) + '</option>').join('') + '</select>' +
      '<button type="button" class="fav-btn fav-btn--secondary" data-act="move" data-list="' + esc(list.id) + '" data-id="' + id + '" aria-label="Move ' + esc(title) + ' to the chosen list">Move</button></div>' : '';
    return '<li class="lists-item">' + img + '<div class="lists-item__body">' + heading + '<p class="lists-item__meta">' + meta + '</p>' + adv + '</div>' +
      '<div class="lists-item__actions">' + move + '<button type="button" class="fav-btn fav-btn--quiet" data-act="remove" data-list="' + esc(list.id) + '" data-id="' + id + '" aria-label="Remove ' + esc(title) + ' from ' + esc(list.name) + '">Remove</button></div></li>';
  }

  function listHtml(list, all) {
    const others = all.filter(o => o.id !== list.id), isDefault = list.id === store.DEFAULT_ID;
    const n = list.items.length, count = n + (n === 1 ? ' item' : ' items');
    const head = renaming === list.id
      ? '<form class="lists-rename" data-act="rename-save" data-list="' + esc(list.id) + '"><label class="lists-rename__label" for="rn-' + esc(list.id) + '">List name</label>' +
        '<input class="fav-dialog__input" id="rn-' + esc(list.id) + '" type="text" maxlength="80" value="' + esc(list.name) + '"><button class="fav-btn" type="submit">Save name</button>' +
        '<button class="fav-btn fav-btn--quiet" type="button" data-act="rename-cancel">Cancel</button></form>'
      : '<h2 class="lists-list__title" id="h-' + esc(list.id) + '" tabindex="-1">' + esc(list.name) + ' <span class="lists-list__count">' + count + '</span></h2>' +
        '<div class="lists-list__tools"><button type="button" class="fav-btn fav-btn--quiet" data-act="rename" data-list="' + esc(list.id) + '" aria-label="Rename ' + esc(list.name) + '">Rename</button>' +
        (isDefault ? '' : deleting === list.id
          ? '<span class="lists-confirm" role="group" aria-label="Confirm delete"><span class="lists-confirm__text">Delete this list?</span><button type="button" class="fav-btn fav-btn--danger" data-act="delete-yes" data-list="' + esc(list.id) + '">Delete</button><button type="button" class="fav-btn fav-btn--quiet" data-act="delete-no">Keep</button></span>'
          : '<button type="button" class="fav-btn fav-btn--quiet" data-act="delete" data-list="' + esc(list.id) + '" aria-label="Delete ' + esc(list.name) + '">Delete list</button>') + '</div>';
    const body = n ? '<ul class="lists-items">' + list.items.map(id => itemHtml(list, id, others)).join('') + '</ul>'
      : '<p class="lists-empty lists-empty--list">This list is empty. Use the heart on any record to add it here.</p>';
    return '<section class="lists-list" aria-labelledby="h-' + esc(list.id) + '"><div class="lists-list__head">' + head + '</div>' + body + '</section>';
  }

  function render() {
    const lists = store.lists();
    root.innerHTML = lists.length ? lists.map(l => listHtml(l, lists)).join('') :
      '<div class="lists-empty"><h2 class="lists-empty__title">You have not saved anything yet</h2><p class="lists-empty__text">Use the heart on a record or a search result to save it here. You can keep several lists, for example one for each project.</p>' +
      '<p class="lists-empty__links"><a class="lists-empty__link" href="/search/search-results.html">Search all records</a><a class="lists-empty__link" href="/collections/index.html">Browse collections</a></p></div>';
    if (focusSel) { const t = root.querySelector(focusSel) || document.getElementById('lists-name'); focusSel = null; if (t) t.focus(); }
  }

  root.addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b || b.tagName === 'FORM') return;
    const act = b.getAttribute('data-act'), lid = b.getAttribute('data-list'), id = Number(b.getAttribute('data-id'));
    const l = lid && store.getList(lid);
    if (act === 'remove') {
      const items = l ? l.items : [], i = items.indexOf(id);
      const next = items[i + 1] != null ? items[i + 1] : items[i - 1];
      focusSel = next != null ? '[data-act="remove"][data-list="' + lid + '"][data-id="' + next + '"]' : '#h-' + lid;   // set before the store change re-renders
      store.remove(lid, id); say('Removed from ' + l.name);
    } else if (act === 'move') {
      const sel = b.parentNode.querySelector('select'), to = store.getList(sel.value);
      focusSel = '#h-' + lid;
      if (store.move(lid, sel.value, id)) say('Moved to ' + (to ? to.name : 'list')); else focusSel = null;
    } else if (act === 'rename') { renaming = lid; focusSel = '#rn-' + lid; render(); }
    else if (act === 'rename-cancel') { focusSel = '[data-act="rename"][data-list="' + renaming + '"]'; renaming = null; render(); }
    else if (act === 'delete') { deleting = lid; focusSel = '[data-act="delete-yes"]'; render(); }
    else if (act === 'delete-no') { focusSel = '[data-act="delete"][data-list="' + deleting + '"]'; deleting = null; render(); }
    else if (act === 'delete-yes') { const name = l && l.name; deleting = null; focusSel = '#lists-name'; store.deleteList(lid); say('Deleted ' + name); }
  });
  root.addEventListener('submit', e => {
    const f = e.target.closest('form[data-act="rename-save"]'); if (!f) return;
    e.preventDefault();
    const lid = f.getAttribute('data-list'), name = store.renameList(lid, f.querySelector('input').value);
    if (!name) { f.querySelector('input').focus(); say('Enter a name for the list'); return; }
    renaming = null; say('Renamed to ' + name); focusSel = '#h-' + lid; render();
  });
  root.addEventListener('keydown', e => { if (e.key === 'Escape' && renaming) { focusSel = '[data-act="rename"][data-list="' + renaming + '"]'; renaming = null; render(); } });

  if (createForm) createForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('lists-name'), l = store.createList(input.value);
    if (!l) { input.focus(); say('Enter a name for the new list'); return; }
    input.value = ''; say('Created ' + l.name); focusSel = '#h-' + l.id; render();
  });

  store.onChange(render);
  render();
})();
