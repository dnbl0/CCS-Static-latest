// Turns Solr documents of the Rails index (ead-ccs-test) into the files of the static catalogue.
// Pure functions; scripts/build-catalog-index.js does the fetching and writing.
//   main file    (catalog-data.json): what search, filters and result cards need
//   detail files (catalog-detail/<bucket>.json): the long record-page text, loaded on a record page only
const { detailBucket } = require('../../public/catalog/catalog-search.js');

// Solr internals, and search-only copies of fields that are also stored in a display form
const DROP = new Set([
  '_version_', 'timestamp', 'score', 'title_tsim', 'creator_tsim', 'subject_tsim', 'creator_birth_ssi', 'creator_death_ssi'
]);
// Long text and bookkeeping that only the record page shows
const DETAIL = new Set([
  'description_tsim', 'source_reference_tsim', 'credit_line_tsim', 'creator_display_ssim', 'preferred_citation_tsim',
  'rights_ssim', 'alternative_title_tsim', 'related_object_ssim', 'related_object_relationship_ssim', 'series_ssim',
  'parent_record_ssi', 'source_system_ssi', 'source_identifier_ssi', 'access_condition_ssi', 'restrictions_tsi',
  'associated_entity_role_ssim', 'cultural_group_ssim', 'format'
]);
// Single-valued in the index; every other field is a list
const SCALARS = new Set([
  'id', 'title_si', 'date_start_isi', 'date_end_isi', 'source_system_ssi', 'source_identifier_ssi', 'thumbnail_path_ssi',
  'has_digital_asset_bsi', 'parent_record_ssi', 'access_condition_ssi', 'restrictions_tsi'
]);

function pick(doc, wanted) {
  const out = {};
  for (const key of Object.keys(doc).sort()) {
    if (DROP.has(key) || wanted(key) === false) continue;
    const value = doc[key];
    if (value == null) continue;
    out[key] = SCALARS.has(key) ? (Array.isArray(value) ? value[0] : value) : (Array.isArray(value) ? value : [value]);
  }
  return out;
}

// The record for lists, search and filters
const slim = doc => pick(doc, key => !DETAIL.has(key));
// The long text of a record (without the id)
const detailOf = doc => pick(doc, key => DETAIL.has(key));

// Text fields Solr searches that the list record does not keep: their words, lower case, once each, for the search-text file
const SEARCH_TEXT = ['description_tsim', 'source_reference_tsim', 'credit_line_tsim', 'preferred_citation_tsim', 'alternative_title_tsim', 'creator_display_ssim', 'rights_ssim', 'related_object_ssim', 'series_ssim'];
function searchText(doc) {
  const seen = new Set();
  for (const key of SEARCH_TEXT) for (const value of [].concat(doc[key] == null ? [] : doc[key])) {
    for (const word of String(value).toLowerCase().split(/[^\p{L}\p{N}-]+/u)) if (word.length > 1) seen.add(word);
  }
  return [...seen].join(' ');
}

function toDataFiles(docs) {
  const sorted = [...docs].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const buckets = {};
  const text = {};
  for (const doc of sorted) {
    const t = searchText(doc);
    if (t) text[doc.id] = t;
    const detail = detailOf(doc);
    if (!Object.keys(detail).length) continue;
    (buckets[detailBucket(doc.id)] ||= {})[doc.id] = detail;
  }
  return {
    text: JSON.stringify(text),
    main: JSON.stringify({ count: sorted.length, records: sorted.map(slim) }),
    details: Object.fromEntries(Object.entries(buckets).map(([b, v]) => [b, JSON.stringify(v)]))
  };
}

module.exports = { slim, detailOf, toDataFiles };
