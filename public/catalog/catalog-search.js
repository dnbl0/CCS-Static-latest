/**
 * Static catalogue search (backup for the Rails /catalog page).
 *
 *   const engine = CatalogSearch.create(records, extraText);   // catalog-data.json records, catalog-text.json words
 *   const result = engine.search({ q, f, range, sort, perPage, page });
 *   engine.record(id);
 *
 * The parameters mirror the Rails URL: f = { collection_ssim: ['...'] }, range = { date_start_isi: { begin, end } },
 * f.has_digital_asset = ['with'] | ['without'], sort = relevance | date-desc | date-asc | title | title-desc.
 * It answers from memory, so it works on a static host (GitHub Pages). It is not Solr: every word must match a whole
 * word in the record (plurals folded), with no spelling suggestions. Counts match Rails closely, not always exactly.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CatalogSearch = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // The filters of the Rails results page, in its order (CatalogConfig::Facets / the data model workbook).
  const FACETS = [
    'collection_ssim', 'named_collection_ssim', 'creator_role_ssim', 'creator_ssim', 'classification_ssim',
    'object_type_ssim', 'material_ssim', 'subject_ssim', 'associated_entity_place_ssim', 'licence_type_ssim',
    'digital_asset_format_ssim'
  ];
  const RANGES = ['date_start_isi', 'creator_birth_isim', 'creator_death_isim'];
  // Fields that "All fields" search looks in; the title is weighted more.
  const SEARCH_FIELDS = [
    'creator_ssim', 'creator_display_ssim', 'subject_ssim', 'classification_ssim', 'object_type_ssim', 'collection_ssim',
    'named_collection_ssim', 'material_ssim', 'production_place_ssim', 'production_date_ssim', 'accession_number_ssim',
    'associated_entity_ssim', 'associated_entity_place_ssim', 'credit_line_tsim'
  ];
  const DIGITAL = 'has_digital_asset';
  const DETAIL_BUCKETS = 32;

  // The record page's long text (description, source reference, ...) is in catalog-detail/<bucket>.json; the bucket
  // is a hash of the record id, so the page can find it without loading the whole catalogue.
  function detailBucket(id) {
    let h = 2166136261;
    for (let i = 0; i < id.length; i++) { h ^= id.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return h % DETAIL_BUCKETS;
  }

  const list = v => (v == null ? [] : Array.isArray(v) ? v : [v]);
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const words = s => norm(s).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  const cmpText = (a, b) => String(a).localeCompare(String(b), 'en', { sensitivity: 'base', numeric: true });

  // extraText: { id: 'words' }, text that is searched but not kept in the record (descriptions, credit lines...)
  function create(records, extraText) {
    const extra = extraText || {};
    const byId = new Map();
    const rows = records.map(doc => {
      const row = {
        doc,
        title: words(doc.title_si || '').join(' '),
        all: SEARCH_FIELDS.flatMap(f => list(doc[f]).map(norm)).concat(extra[doc.id] ? [norm(extra[doc.id])] : []).join(' | ')
      };
      byId.set(doc.id, row);
      return row;
    });

    // A word also matches without its plural ending ("skulls" finds "skull"), a light stand-in for Solr's stemming
    const stem = t => (t.length > 3 && t.endsWith('ies') ? t.slice(0, -3) + 'y' : t.length > 3 && /(ses|xes|ches|shes)$/.test(t) ? t.slice(0, -2) : t.length > 3 && t.endsWith('s') && !t.endsWith('ss') ? t.slice(0, -1) : t);
    const stemSet = text => new Set(words(text).map(stem));
    for (const row of rows) { row.titleWords = words(row.title).map(stem); row.allWords = stemSet(row.all); }
    // Whole words, every one required; a title match scores more, and one at the start of the title most
    const textScore = (row, terms) => {
      let score = 0;
      for (const t of terms) {
        const st = stem(t);
        const inTitle = row.titleWords.includes(st);
        if (!inTitle && !row.allWords.has(st)) return -1;
        score += inTitle ? (row.titleWords[0] === st ? 5 : 3) : 1;
      }
      return score;
    };

    const inRange = (doc, field, r) => {
      const vals = list(doc[field]).map(Number).filter(n => !Number.isNaN(n));
      if (!vals.length) return false;
      return vals.some(v => (r.begin == null || r.begin === '' || v >= Number(r.begin)) && (r.end == null || r.end === '' || v <= Number(r.end)));
    };

    function matchesFilters(doc, f, range, except) {
      for (const field of Object.keys(f)) {
        const wanted = list(f[field]);
        if (!wanted.length || field === except) continue;
        if (field === DIGITAL) {
          const has = doc.has_digital_asset_bsi === true || doc.has_digital_asset_bsi === 'true';
          if (wanted[0] === 'with' && !has) return false;
          if (wanted[0] === 'without' && has) return false;
          continue;
        }
        const have = list(doc[field]);
        if (!wanted.every(w => have.includes(w))) return false;
      }
      for (const field of Object.keys(range)) {
        const r = range[field];
        if (r && (r.begin != null && r.begin !== '' || r.end != null && r.end !== '') && !inRange(doc, field, r)) return false;
      }
      return true;
    }

    const dateOf = d => (d.date_start_isi == null ? null : Number(d.date_start_isi));
    const SORTS = {
      title: (a, b) => cmpText(a.doc.title_si || '', b.doc.title_si || ''),
      'title-desc': (a, b) => cmpText(b.doc.title_si || '', a.doc.title_si || ''),
      'date-asc': (a, b) => nullsLast(dateOf(a.doc), dateOf(b.doc), 1) || SORTS.title(a, b),
      'date-desc': (a, b) => nullsLast(dateOf(a.doc), dateOf(b.doc), -1) || SORTS.title(a, b)
    };
    function nullsLast(x, y, dir) {
      if (x == null && y == null) return 0;
      if (x == null) return 1;
      if (y == null) return -1;
      return (x - y) * dir;
    }

    function search(params) {
      const p = params || {};
      const f = p.f || {};
      const range = p.range || {};
      const terms = words(p.q || '');

      // 1. keyword
      let hits = [];
      for (const row of rows) {
        if (!terms.length) { hits.push({ row, score: 0 }); continue; }
        const score = textScore(row, terms);
        if (score >= 0) hits.push({ row, score });
      }
      // 2. filters (facet counts are over this set, as in Blacklight)
      hits = hits.filter(h => matchesFilters(h.row.doc, f, range));

      // 3. facet counts
      const facets = {};
      for (const field of FACETS) {
        const counts = new Map();
        for (const h of hits) for (const v of list(h.row.doc[field])) counts.set(v, (counts.get(v) || 0) + 1);
        const selected = new Set(list(f[field]));
        for (const s of selected) if (!counts.has(s)) counts.set(s, 0);
        facets[field] = [...counts].map(([value, n]) => ({ value, hits: n, selected: selected.has(value) }))
          .sort((a, b) => b.hits - a.hits || cmpText(a.value, b.value));
      }
      let withAsset = 0;
      for (const h of hits) if (h.row.doc.has_digital_asset_bsi === true || h.row.doc.has_digital_asset_bsi === 'true') withAsset++;
      facets[DIGITAL] = [
        { value: 'with', hits: withAsset, selected: list(f[DIGITAL])[0] === 'with' },
        { value: 'without', hits: hits.length - withAsset, selected: list(f[DIGITAL])[0] === 'without' }
      ];

      // 4. order
      const sort = p.sort && (p.sort === 'relevance' || SORTS[p.sort]) ? p.sort : (terms.length ? 'relevance' : 'title');
      if (sort === 'relevance') hits.sort((a, b) => b.score - a.score || SORTS.title(a.row, b.row));
      else hits.sort((a, b) => SORTS[sort](a.row, b.row));

      // 5. page
      const perPage = Math.max(1, Number(p.perPage) || 40);
      const total = hits.length;
      const pages = Math.ceil(total / perPage);
      const page = Math.min(Math.max(1, Number(p.page) || 1), Math.max(pages, 1));
      const docs = hits.slice((page - 1) * perPage, page * perPage).map(h => h.row.doc);
      return { total, pages, page, perPage, sort, docs, facets };
    }

    function record(id) {
      const row = byId.get(id);
      return row ? row.doc : null;
    }

    return { search, record, size: rows.length };
  }

  return { create, detailBucket, FACETS, RANGES, DIGITAL };
});
