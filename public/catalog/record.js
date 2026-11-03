/**
 * Static record page (backup for the Rails /catalog/:id page): record.html?id=<id>. The list fields come from
 * catalog-data.json, the long text (description, credit line, rights...) from catalog-detail/<bucket>.json.
 */
(function () {
  'use strict';
  const FIELDS = [
    ['Object type', 'object_type_ssim'], ['Classification', 'classification_ssim'], ['Date', 'production_date_ssim'], ['Creator', 'creator_display_ssim'],
    ['Creator role', 'creator_role_ssim'], ['Place', 'production_place_ssim'], ['Materials / medium', 'material_ssim'], ['Collection', 'collection_ssim'],
    ['Named collection', 'named_collection_ssim'], ['Subject', 'subject_ssim'], ['Subject location', 'associated_entity_place_ssim'],
    ['Associated entity', 'associated_entity_ssim'], ['Description', 'description_tsim'], ['Accession number', 'accession_number_ssim'],
    ['Source reference', 'source_reference_tsim'], ['Credit line', 'credit_line_tsim'], ['Rights', 'rights_ssim'], ['Licence type', 'licence_type_ssim'],
    ['Preferred citation', 'preferred_citation_tsim'], ['Related object', 'related_object_ssim']
  ];
  const SITE_ROOT = new URL('../', document.currentScript.src).href;
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const arr = v => (v == null ? [] : Array.isArray(v) ? v : [v]);
  const id = new URLSearchParams(location.search).get('id');

  function notFound() {
    document.title = 'Record not found — Collections Navigator — University of Melbourne';
    $('catalog-crumb').textContent = 'Record not found';
    $('catalog-record-body').innerHTML = '<h1 class="catalog-record__title">Record not found</h1><h2>No record matches this link</h2><p>We could not find a record with that identifier. It may have been moved or removed, or the link may be incorrect.</p><p><a href="./">Search the collections</a></p>';
  }
  function show(doc, detail) {
    const all = Object.assign({}, doc, detail);
    document.title = `${doc.title_si} — Collections Navigator — University of Melbourne`;
    $('catalog-crumb').textContent = doc.title_si;
    const rows = FIELDS.map(([label, key]) => [label, arr(all[key])]).filter(r => r[1].length)
      .map(([label, vals]) => `<tr><th scope="row">${label}</th><td>${vals.map(v => `<p>${esc(v)}</p>`).join('')}</td></tr>`).join('');
    const media = doc.thumbnail_path_ssi ? `<figure class="catalog-record__media"><img src="${esc(new URL(arr(all.digital_asset_large_paths_ssim)[0] ? arr(all.digital_asset_large_paths_ssim)[0].replace(/^\//, '') : doc.thumbnail_path_ssi.replace(/^\//, ''), SITE_ROOT).href)}" alt="${esc(doc.title_si)}"></figure>` : '';
    $('catalog-record-body').innerHTML = `<h1 class="catalog-record__title">${esc(doc.title_si)}</h1>${media}<h2>Object details</h2><table class="table catalog-record__details"><tbody>${rows}</tbody></table>`
      + `<p class="catalog-record__id">Record ID: ${esc(doc.id)}</p>`;
  }

  if (!id) { notFound(); return; }
  fetch('catalog-data.json').then(r => r.json()).then(data => {
    const doc = data.records.find(r => r.id === id);
    if (!doc) { notFound(); return; }
    const bucket = CatalogSearch.detailBucket(id);
    return fetch(`catalog-detail/${bucket}.json`).then(r => (r.ok ? r.json() : {})).catch(() => ({})).then(d => show(doc, d[id] || {}));
  }).catch(() => { $('catalog-record-body').innerHTML = '<p role="alert">The record could not be loaded. Please try again shortly.</p>'; });
})();
