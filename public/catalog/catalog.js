/**
 * Static catalogue page (backup for the Rails /catalog page): reads the URL, searches catalog-data.json in the browser
 * with CatalogSearch, and draws the results, the filters, sorting and paging. Every control is a plain link or a GET
 * form, so the URL is the state (same parameters as Rails: q, f[field][], range[date_start_isi][begin|end], sort, per_page, page).
 * The URLs it writes are relative to this page, so it works under a sub-path (GitHub Pages project site).
 */
(function () {
  'use strict';

  const FACET_LABELS = {
    collection_ssim: 'Collection title', named_collection_ssim: 'Named collections', creator_role_ssim: 'Creator role', creator_ssim: 'Creator name',
    classification_ssim: 'Classification', object_type_ssim: 'Object type', material_ssim: 'Materials / medium', subject_ssim: 'Subject terms',
    associated_entity_place_ssim: 'Subject location', licence_type_ssim: 'Licence type', digital_asset_format_ssim: 'Digital asset format'
  };
  const SORTS = [['relevance', 'relevance'], ['date-desc', 'date (newest)'], ['date-asc', 'date (oldest)'], ['title', 'title (A-Z)'], ['title-desc', 'title (Z-A)']];
  const PER_PAGE = [12, 24, 40, 96];
  const SHOW_FIRST = 8;
  const SITE_ROOT = new URL('../', document.currentScript.src).href; // where /digital-assets and /collections live

  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const arr = v => (v == null ? [] : Array.isArray(v) ? v : [v]);

  // --- the URL <-> parameters ---
  function readParams() {
    const sp = new URLSearchParams(location.search);
    const f = {};
    for (const [k, v] of sp) { const m = k.match(/^f\[([^\]]+)\]\[\]$/); if (m) (f[m[1]] ||= []).push(v); }
    const range = {};
    const begin = sp.get('range[date_start_isi][begin]'), end = sp.get('range[date_start_isi][end]');
    if (begin || end) range.date_start_isi = { begin, end };
    return { q: sp.get('q') || '', f, range, sort: sp.get('sort') || '', perPage: +sp.get('per_page') || 40, page: +sp.get('page') || 1, view: sp.get('view') === 'list' ? 'list' : 'masonry' };
  }
  function toUrl(p) {
    const sp = new URLSearchParams();
    if (p.q) sp.set('q', p.q);
    for (const field of Object.keys(p.f)) for (const v of p.f[field]) sp.append(`f[${field}][]`, v);
    const r = p.range.date_start_isi;
    if (r && r.begin) sp.set('range[date_start_isi][begin]', r.begin);
    if (r && r.end) sp.set('range[date_start_isi][end]', r.end);
    if (p.sort) sp.set('sort', p.sort);
    if (p.perPage !== 40) sp.set('per_page', p.perPage);
    if (p.page > 1) sp.set('page', p.page);
    if (p.view === 'list') sp.set('view', 'list');
    const s = sp.toString();
    return location.pathname + (s ? '?' + s : '');
  }
  const clone = p => JSON.parse(JSON.stringify(p));
  const without = (p, field, value) => { const c = clone(p); c.page = 1; c.f[field] = (c.f[field] || []).filter(v => v !== value); if (!c.f[field].length) delete c.f[field]; return c; };
  const withValue = (p, field, value) => { const c = clone(p); c.page = 1; (c.f[field] ||= []).push(value); return c; };

  // --- drawing ---
  const assetUrl = path => new URL(String(path).replace(/^\//, ''), SITE_ROOT).href;
  function card(doc) {
    const href = 'record.html?id=' + encodeURIComponent(doc.id);
    const lines = [arr(doc.creator_ssim)[0], arr(doc.object_type_ssim)[0], arr(doc.collection_ssim)[0]].filter(Boolean);
    const img = doc.thumbnail_path_ssi ? `<a class="catalog-card__media" href="${href}" tabindex="-1" aria-hidden="true"><img src="${esc(assetUrl(doc.thumbnail_path_ssi))}" alt="" loading="lazy"></a>` : '';
    return `<article class="catalog-card${img ? '' : ' catalog-card--no-media'}">${img}<div class="catalog-card__body"><h3 class="catalog-card__title"><a href="${href}">${esc(doc.title_si || 'Untitled record')}</a></h3>`
      + `<ul class="catalog-card__lines">${lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul></div></article>`;
  }

  function constraints(p) {
    const chips = [];
    if (p.q) chips.push([`Search: ${p.q}`, Object.assign(clone(p), { q: '', page: 1 })]);
    for (const field of Object.keys(p.f)) for (const v of p.f[field]) {
      const label = field === 'has_digital_asset' ? (v === 'with' ? 'With a digital asset' : 'Without a digital asset') : `${FACET_LABELS[field] || field}: ${v}`;
      chips.push([label, without(p, field, v)]);
    }
    const r = p.range.date_start_isi;
    if (r && (r.begin || r.end)) { const c = clone(p); c.page = 1; delete c.range.date_start_isi; chips.push([`Production date: ${r.begin || '…'} to ${r.end || '…'}`, c]); }
    return chips;
  }

  function railHtml(p, res) {
    const digital = res.facets.has_digital_asset;
    const on = arr(p.f.has_digital_asset)[0];
    const toggle = value => { const c = clone(p); c.page = 1; if (on === value) delete c.f.has_digital_asset; else c.f.has_digital_asset = [value]; return toUrl(c); };
    let html = `<div class="facet-rail__head"><h2 class="facet-rail__title">Search filters</h2>${constraints(p).length ? `<a class="facet-rail__clear" href="${location.pathname}">Clear all</a>` : ''}</div>`;
    html += `<section class="catalog-facet"><h3 class="catalog-facet__heading">Digital asset</h3><ul class="catalog-facet__list">`
      + [['with', 'With a digital asset'], ['without', 'Without a digital asset']].map(([v, label]) => {
        const hits = digital.find(x => x.value === v).hits;
        return `<li><a class="catalog-facet__link${on === v ? ' is-selected' : ''}" href="${esc(toggle(v))}"${on === v ? ' aria-current="true"' : ''}><span>${label}</span><span class="catalog-facet__count">${hits.toLocaleString('en-AU')}</span></a></li>`;
      }).join('') + '</ul></section>';
    for (const field of Object.keys(FACET_LABELS)) {
      const values = res.facets[field] || [];
      if (!values.length) continue;
      const open = values.some(v => v.selected);
      const item = v => `<li><a class="catalog-facet__link${v.selected ? ' is-selected' : ''}" href="${esc(toUrl(v.selected ? without(p, field, v.value) : withValue(p, field, v.value)))}"${v.selected ? ' aria-current="true"' : ''}><span>${esc(v.value)}</span><span class="catalog-facet__count">${v.hits.toLocaleString('en-AU')}</span></a></li>`;
      const first = values.slice(0, SHOW_FIRST), rest = values.slice(SHOW_FIRST);
      html += `<details class="catalog-facet"${open ? ' open' : ''}><summary class="catalog-facet__heading">${FACET_LABELS[field]}</summary><ul class="catalog-facet__list">${first.map(item).join('')}</ul>`
        + (rest.length ? `<details class="catalog-facet__more"><summary>Show ${rest.length.toLocaleString('en-AU')} more</summary><ul class="catalog-facet__list">${rest.slice(0, 300).map(item).join('')}</ul></details>` : '') + '</details>';
    }
    const r = p.range.date_start_isi || {};
    html += `<form class="catalog-range" action="${location.pathname}" method="get"><h3 class="catalog-facet__heading">Production date</h3>`
      + hiddenFields(p, true) + `<div class="catalog-range__row"><label>From <input type="number" name="range[date_start_isi][begin]" value="${esc(r.begin || '')}" min="0" max="2100" inputmode="numeric"></label>`
      + `<label>To <input type="number" name="range[date_start_isi][end]" value="${esc(r.end || '')}" min="0" max="2100" inputmode="numeric"></label></div><button class="btn btn-outline-primary" type="submit">Apply</button></form>`;
    return html;
  }
  function hiddenFields(p, dropRange) {
    let h = '';
    if (p.q) h += `<input type="hidden" name="q" value="${esc(p.q)}">`;
    for (const field of Object.keys(p.f)) for (const v of p.f[field]) h += `<input type="hidden" name="f[${esc(field)}][]" value="${esc(v)}">`;
    if (p.sort) h += `<input type="hidden" name="sort" value="${esc(p.sort)}">`;
    if (!dropRange) { const r = p.range.date_start_isi; if (r) { if (r.begin) h += `<input type="hidden" name="range[date_start_isi][begin]" value="${esc(r.begin)}">`; if (r.end) h += `<input type="hidden" name="range[date_start_isi][end]" value="${esc(r.end)}">`; } }
    return h;
  }

  function barHtml(p, res) {
    const chips = constraints(p);
    const label = `${res.total.toLocaleString('en-AU')} ${res.total === 1 ? 'result' : 'results'}`;
    const sortLinks = SORTS.map(([k, l]) => { const c = clone(p); c.sort = k; c.page = 1; return `<li><a class="catalog-menu__item${res.sort === k ? ' active' : ''}" href="${esc(toUrl(c))}">${l}</a></li>`; }).join('');
    const ppLinks = PER_PAGE.map(n => { const c = clone(p); c.perPage = n; c.page = 1; return `<li><a class="catalog-menu__item${p.perPage === n ? ' active' : ''}" href="${esc(toUrl(c))}">${n}<span class="visually-hidden"> per page</span></a></li>`; }).join('');
    const view = v => { const c = clone(p); c.view = v; return toUrl(c); };
    return `<div class="search-results-bar__tools"><div class="search-results-bar__count"><h2 class="catalog-count">${label}</h2>`
      + (chips.length ? `<ul class="search-results-pills" aria-label="Applied filters">${chips.map(([l, c]) => `<li class="search-results-pills__item"><span class="search-results-pill"><span class="search-results-pill__text">${esc(l)}</span><a class="search-results-pill__remove" href="${esc(toUrl(c))}" aria-label="Remove filter ${esc(l)}">×</a></span></li>`).join('')}</ul>` : '')
      + `</div><div class="search-results-bar__controls catalog-controls">`
      + `<details class="catalog-menu"><summary class="btn btn-outline-primary">Sort by ${esc(SORTS.find(s => s[0] === res.sort)[1])}</summary><ul class="catalog-menu__list">${sortLinks}</ul></details>`
      + `<details class="catalog-menu"><summary class="btn btn-outline-primary">${p.perPage}<span class="visually-hidden"> results</span> per page</summary><ul class="catalog-menu__list">${ppLinks}</ul></details>`
      + `<div class="btn-group" role="group" aria-label="View"><a class="btn btn-outline-primary${p.view === 'list' ? '' : ' active'}" href="${esc(view('masonry'))}"${p.view === 'list' ? '' : ' aria-current="true"'}>Mosaic</a><a class="btn btn-outline-primary${p.view === 'list' ? ' active' : ''}" href="${esc(view('list'))}"${p.view === 'list' ? ' aria-current="true"' : ''}>List</a></div>`
      + '</div></div>';
  }

  function pagerHtml(p, res) {
    if (res.pages < 2) return '';
    const link = (n, text, cls, extra) => { const c = clone(p); c.page = n; return `<a class="${cls}" href="${esc(toUrl(c))}"${extra || ''}>${text}</a>`; };
    const from = (res.page - 1) * res.perPage + 1, to = Math.min(res.total, res.page * res.perPage);
    const nums = [];
    for (let n = Math.max(1, res.page - 2); n <= Math.min(res.pages, res.page + 2); n++) nums.push(n);
    return `<p class="search-results-main-content__range">${from.toLocaleString('en-AU')} - ${to.toLocaleString('en-AU')} of ${res.total.toLocaleString('en-AU')}</p><nav class="search-results-pagination" aria-label="Pagination">`
      + (res.page > 1 ? link(res.page - 1, 'Previous', 'search-results-pagination__button-prev-page', ' rel="prev"') : '')
      + nums.map(n => link(n, n, 'search-results-pagination__button-go', n === res.page ? ' aria-current="page"' : '')).join('')
      + (res.page < res.pages ? link(res.page + 1, 'Next', 'search-results-pagination__button-next-page', ' rel="next"') : '') + '</nav>';
  }

  function draw(p, res) {
    $('catalog-q').value = p.q;
    const form = $('catalog-search-form');
    form.querySelectorAll('input[type=hidden]').forEach(e => e.remove());
    form.insertAdjacentHTML('beforeend', hiddenFields(Object.assign(clone(p), { q: '' }), false));
    $('catalog-bar').innerHTML = barHtml(p, res);
    $('catalog-rail').innerHTML = railHtml(p, res);
    $('catalog-status').textContent = res.total ? '' : 'No records match your search.';
    $('catalog-status').hidden = res.total > 0;
    $('catalog-results').className = p.view === 'list' ? 'catalog-results catalog-results--list' : 'catalog-results catalog-results--mosaic';
    $('catalog-results').innerHTML = res.total
      ? res.docs.map(card).join('')
      : '<div class="search-results-main-content__group search-results-main-content__group--v1"><h3 class="search-results-main-content__heading-no-records-match">No records match your search</h3><p>Try removing a filter or broadening your search terms.</p>'
        + (constraints(p).length ? `<a class="btn btn-outline-primary" href="${location.pathname}">Clear all filters</a>` : '') + '</div>';
    $('catalog-pager').innerHTML = pagerHtml(p, res);
    $('catalog-banner-line').textContent = `${res.total.toLocaleString('en-AU')} records in the University of Melbourne cultural collections${p.q || constraints(p).length ? ' match' : ''}.`;
    document.title = (p.q ? `"${p.q}" — ` : '') + 'Search All Records — Collections Navigator — University of Melbourne';
  }

  function start() {
    const p = readParams();
    $('catalog-status').textContent = 'Loading the catalogue…';
    const json = url => fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
    Promise.all([json('catalog-data.json'), json('catalog-text.json').catch(() => ({}))]).then(([data, text]) => {
      const engine = CatalogSearch.create(data.records, text);
      draw(p, engine.search(p));
      if (/[?&]page=/.test(location.search)) { const h = document.querySelector('#main-content h2'); if (h) { h.setAttribute('tabindex', '-1'); } }
    }).catch(() => { $('catalog-status').textContent = 'The catalogue could not be loaded. Please try again shortly.'; });
  }
  start();
})();
