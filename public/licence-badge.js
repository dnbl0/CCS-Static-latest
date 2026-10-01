// <ccs-licence licence="CC BY"> — the single licence badge used on record pages, search results and
// collection landing pages, so it looks and behaves the same everywhere.
// Modelled on Europeana's rights statement button: icons + name in a light pill that links to the licence,
// with a plain-language tooltip (open / restricted / permission) and a "Read more" link.
// Licence data (name, icons, url, group) comes from window.CCS.licences in collection-data.js.
(function () {
  const TEXT = {
    open: 'means you can use this item freely.',
    restricted: 'means you can use this item with conditions.',
    permission: 'means you may be able to use this item if you seek permission.'
  };
  let uid = 0;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  class CCSLicence extends HTMLElement {
    static get observedAttributes() { return ['licence']; }
    connectedCallback() {
      this.render();
      if (this._bound) return;
      this._bound = true;
      // Esc dismisses the tooltip without moving focus; it returns on the next hover/focus.
      this.addEventListener('keydown', e => { if (e.key === 'Escape') this.setAttribute('data-dismissed', ''); });
      ['mouseleave', 'focusout', 'mouseenter', 'focusin'].forEach(ev => this.addEventListener(ev, () => this.removeAttribute('data-dismissed')));
    }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const L = window.CCS && window.CCS.licences;
      const key = this.getAttribute('licence') || 'Rights Reserved';
      const lic = L && (L[key] || L['Rights Reserved']);
      if (!lic) { this.textContent = ''; return; }
      const id = this._id || (this._id = 'licence-tip-' + (++uid));
      const external = /^https?:\/\//.test(lic.url);
      const host = external ? new URL(lic.url).host : '';
      const target = external ? ' target="_blank" rel="noopener"' : '';
      const icons = (lic.icons || []).map(i => `<img src="${esc(i)}" alt="" width="16" height="16">`).join('');
      const more = external
        ? `Read more at ${esc(host)} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M14 3h7v7M21 3l-9 9M19 14v6H4V5h6"/></svg>`
        : 'Read about copyright and terms of use';
      this.innerHTML =
        `<a class="licence-badge" href="${esc(lic.url)}"${target} aria-describedby="${id}">` +
        (icons ? `<span class="licence-badge__icons">${icons}</span>` : '') +
        `<span class="licence-badge__name">${esc(lic.label)}</span>` +
        (external ? '<span class="sr-only"> (opens in new window)</span>' : '') + '</a>' +
        `<span class="licence-badge__tip" role="tooltip" id="${id}">${esc(lic.label)} ${TEXT[lic.group] || TEXT.permission} ` +
        `<a href="${esc(lic.url)}"${target}>${more}</a></span>`;
    }
  }
  if (!customElements.get('ccs-licence')) customElements.define('ccs-licence', CCSLicence);
})();
