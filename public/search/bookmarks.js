// Saved records page: the records saved in this browser (window.CCSBookmarks, nav.js), newest first, each with a
// Save/Saved toggle that removes it, plus "Clear saved records" (after a confirmation). Record details come from the
// shared record data (window.CCS, collection-data.js); a record that is not in it is shown by the title saved with it.
(function () {
  var RECORD = '/collections/record.html?id=';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function details(entry) {
    var rec = window.CCS && window.CCS.records && window.CCS.records[entry.id];
    var card = rec && rec.card;
    return {
      title: (card && card.title) || entry.title || 'Record ' + entry.id,
      img: card && card.img,
      collection: card && card.collection,
      type: card && card.type
    };
  }

  function item(entry) {
    var d = details(entry), href = RECORD + encodeURIComponent(entry.id);
    var li = el('li', 'bookmarks-list__item');
    li.setAttribute('data-bookmark-item', entry.id);
    if (d.img) {
      var thumb = el('a', 'bookmarks-list__thumb'); thumb.href = href; thumb.tabIndex = -1; thumb.setAttribute('aria-hidden', 'true');
      var img = el('img', 'bookmarks-list__image'); img.src = d.img; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
      thumb.appendChild(img); li.appendChild(thumb);
    } else {
      li.appendChild(el('span', 'bookmarks-list__thumb bookmarks-list__thumb--none'));
    }
    var body = el('div', 'bookmarks-list__body');
    var h = el('h2', 'bookmarks-list__title'), a = el('a', 'bookmarks-list__link', d.title); a.href = href;
    h.appendChild(a); body.appendChild(h);
    var meta = [d.type, d.collection].filter(Boolean).join(' · ');
    if (meta) body.appendChild(el('p', 'bookmarks-list__meta', meta));
    var save = el('button', 'ccs-save bookmarks-list__save');
    save.setAttribute('data-bookmark-id', entry.id); save.setAttribute('data-bookmark-title', d.title);
    body.appendChild(save);
    li.appendChild(body);
    return li;
  }

  function render() {
    var root = document.querySelector('[data-bookmarks]');
    if (!root || !window.CCSBookmarks) return;
    var bar = root.querySelector('.bookmarks-body__bar'), list = root.querySelector('.bookmarks-list'), empty = root.querySelector('.bookmarks-body__empty');
    var entries = window.CCSBookmarks.all();

    // When the item holding the focus is removed, move the focus to the next item (or the previous, or the empty-state link)
    var at = -1, active = document.activeElement;
    var holder = active && active.closest && active.closest('.bookmarks-list__item');
    if (holder) at = Array.prototype.indexOf.call(list.children, holder);

    var key = entries.map(function (x) { return x.id; }).join(',');
    if (list.getAttribute('data-key') !== key) {
      list.textContent = '';
      entries.forEach(function (x) { list.appendChild(item(x)); });
      list.setAttribute('data-key', key);
    }
    bar.hidden = list.hidden = !entries.length;
    empty.hidden = entries.length > 0;
    root.querySelector('[data-bookmarks-summary]').textContent = window.CCSBookmarks.countText(entries.length);

    if (at > -1) {
      var next = list.children[Math.min(at, list.children.length - 1)];
      var target = next ? next.querySelector('.ccs-save') : root.querySelector('.bookmarks-body__empty-link');
      if (target) target.focus();
    }
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.bookmarks-body__clear')) return;
    if (window.confirm('Clear all saved records?')) {
      window.CCSBookmarks.clear();
      window.CCSBookmarks.announce('Cleared. 0 saved records.');
    }
  });
  document.addEventListener('ccs:bookmarks', render);

  // The template layer can draw the page after this script runs, so draw now and again once it has settled
  render();
  document.addEventListener('DOMContentLoaded', render);
  window.addEventListener('load', render);
})();
