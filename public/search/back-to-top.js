// Floating "Back to top" button for the search results page (see styles/pages/search-results/back-to-top.css).
// Appears after the page has scrolled past SHOW_AFTER px; scrolls smoothly unless the visitor prefers reduced motion.
(function () {
  var SHOW_AFTER = 200;
  var NS = 'http://www.w3.org/2000/svg';

  function init() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.title = 'Back to top';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'back-to-top__icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2.4');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var poly = document.createElementNS(NS, 'polyline');
    poly.setAttribute('points', '6 15 12 9 18 15');
    svg.appendChild(poly);
    btn.appendChild(svg);
    document.body.appendChild(btn);

    var ticking = false;
    function update() {
      ticking = false;
      btn.classList.toggle('is-visible', window.scrollY > SHOW_AFTER);
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });

    btn.addEventListener('click', function () {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
    update();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
