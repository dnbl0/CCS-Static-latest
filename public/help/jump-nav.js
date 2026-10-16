// Jump navigation "current section" highlight, as on the University's jump nav: the link for the section being read is
// marked (black, aria-current="location") and moves as the reader scrolls. Elements are looked up on every update, because
// the page's template layer can redraw the menu or the sections after this script has run.
(function () {
  var OFFSET = 120; // a section counts as being read once its heading is this far from the top of the window

  function update() {
    var links = document.querySelectorAll('.jump-nav__link');
    if (!links.length) return;
    var current = null;
    links.forEach(function (a) {
      var target = document.getElementById((a.getAttribute('href') || '').replace(/^#/, ''));
      if (target && target.getBoundingClientRect().top <= OFFSET) current = a;
    });
    // At the very bottom the last section may be too short to reach the line: mark it once the page cannot scroll further
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = links[links.length - 1];
    if (!current) current = links[0];
    links.forEach(function (a) {
      var on = a === current;
      a.classList.toggle('is-current', on);
      if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(function () { queued = false; update(); });
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', schedule);
  document.addEventListener('DOMContentLoaded', schedule);
  window.addEventListener('load', schedule);
  schedule();
})();
