// Search history page (CCS-143, CCS-206): the searches made in this browser, grouped by day (Today, Yesterday, 2 days ago ...),
// newest first, from window.CCSHistory (nav.js). Each term runs the search again; "Clear history" empties the list.
(function () {
  var RESULTS = '/search/search-results.html';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function render() {
    var root = document.querySelector('[data-search-history]');
    if (!root || !window.CCSHistory) return;
    var empty = root.querySelector('.search-history-body__empty');
    root.querySelectorAll('.search-history-body__clear, .search-history-day').forEach(function (n) { n.remove(); });
    var groups = window.CCSHistory.groups();
    empty.hidden = groups.length > 0;
    if (!groups.length) return;

    var clear = el('button', 'search-history-body__clear', 'Clear history');
    clear.type = 'button';
    clear.addEventListener('click', function () {
      if (window.confirm('Clear your search history?')) { window.CCSHistory.clear(); render(); }
    });
    root.insertBefore(clear, empty);

    groups.forEach(function (group) {
      var section = el('section', 'search-history-day');
      section.appendChild(el('h2', 'search-history-day__heading', group.label));
      var list = el('ul', 'search-history-day__list');
      group.items.forEach(function (item) {
        var li = el('li', 'search-history-day__item');
        var a = el('a', 'search-history-day__link', item.q);
        a.href = RESULTS + '?q=' + encodeURIComponent(item.q);
        li.appendChild(a);
        list.appendChild(li);
      });
      section.appendChild(list);
      root.appendChild(section);
    });
  }

  // The template layer can draw the page after this script runs, so draw now and again once it has settled
  render();
  document.addEventListener('DOMContentLoaded', render);
  window.addEventListener('load', render);
})();
