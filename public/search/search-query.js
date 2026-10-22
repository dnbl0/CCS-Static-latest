/* The search query for CCS: what a visitor asked for, and which records answer it. Exposes window.CCSSearchQuery (and
 * module.exports for the node tests). The results page renders what this module decides; it holds no search rules of its own.
 *
 * A query is a plain object (see empty()): the search words `q` and their `scope`, the advanced form's `clauses`, the
 * facet selections (`collection` and every key in KEYS, each an array of values), `fAll` (facet keys whose values must
 * all match instead of any), the production-date range `yFrom`/`yTo`, creator birth and death ranges, `accession`, the
 * `digital` / `downloadable` / `exact` switches and the `sort`. Queries are copied, never changed in place.
 *
 * URLs. The results page reads two kinds of URL (fromUrl):
 *  - simple: ?q=&scope=&collection=(repeatable)&type=a;b&named=&classification=&exact=1 (search bars, collection cards)
 *  - advanced, the Blacklight advanced search format written by advanced-search.html:
 *      clause[N][field|op|query]  rows; field in ADV_FIELDS, op in ADV_OPS (default: the single `op` parameter, else must)
 *      f[key][] / f_inclusive[key][]  filter values that must all / may any match; key in ADV_FILTER_KEYS
 *      range[year][begin|end]  production years;  sort=year-desc|year-asc|az
 *    advancedHref(query) writes this format back, so "Edit advanced search" reopens the form as the visitor left it.
 *  A URL with nothing but ?view= is the bare results page: every record that has a digital asset.
 *
 * Usage: const Q = CCSSearchQuery.create({ items, smart, canonType });
 *   items      the records (window.CCS.items)
 *   smart      a SmartSearch engine over the same items (window.SmartSearch.create(items)): fuzzy and related-meaning matches
 *   canonType  window.CCS.canonType: the catalogue's spelling of an object type typed in a URL */
(function (root) {
  'use strict';

  const MHM = 'Medical History Museum', UAC = 'University Art Collection', GMC = 'Grainger Museum Collection', DENT = 'Henry Forman Atkinson Dental Museum';
  const BUSH = 'Bush Medicine collection', BUSHA = 'Bush Medicine collection/Aboriginal and Torres Strait Islander Art Collection';
  const HBA = 'Harry Brookes Allen Museum of Anatomy and Pathology';
  // Collection title facet: each collection and the named collections under it
  const HIER = [
    { name: MHM, children: ['Roseby Collection', BUSH, BUSHA, 'Frederic Wood Jones Collection'] },
    { name: UAC, children: ['Russell and Mab Grimwade Bequest', 'Michael Buxton Collection'] },
    { name: GMC, children: [] }, { name: DENT, children: [] }, { name: HBA, children: [] }
  ];
  const NATION_REGION = { American: 'North America', Australian: 'Oceania', British: 'Europe', French: 'Europe', German: 'Europe', Chinese: 'Asia', Japanese: 'Asia', European: 'Europe' };
  const KEYS = ['theme', 'type', 'period', 'creator', 'creatorRole', 'assoc', 'culture', 'place', 'subject', 'material', 'language', 'licence', 'access', 'nationality', 'classification', 'named', 'filmClass', 'region', 'assetFormat', 'subjectPlace', 'subjectEvent', 'daAccess'];
  const LABELS = { theme: 'Theme', collection: 'Collection', named: 'Named collection', type: 'Object type', period: 'Date (era, period, century)', creator: 'Creator', creatorRole: 'Creator role', assoc: 'Subject agent', culture: 'Cultural affiliation', place: 'Place of production', subject: 'Subject', material: 'Material', language: 'Language', licence: 'Licence', access: 'Access', nationality: 'Nationality', classification: 'Classification', filmClass: 'Film & gaming classification', region: 'Region', assetFormat: 'Format type', subjectPlace: 'Subject location', subjectEvent: 'Subject event' };
  // The filters, in the order and sections of the CCS Filters sheet (checked by tests/data-model.test.js).
  // kind: tree (collections and named collections), list (long lists, by count), chips (short lists), date, life (creator years), text
  const FACETS = [
    { group: 'Collection details', key: 'coll', title: 'Collection title', kind: 'tree', search: true },
    { group: 'Collection details', key: 'named', title: 'Named collections', kind: 'list', search: true },
    { group: 'Creator', key: 'creator', title: 'Creator name', kind: 'list', search: true },
    { group: 'Creator', key: 'life', title: 'Creator date of birth', kind: 'life', dk: 'birth' },
    { group: 'Creator', key: 'lifeDeath', title: 'Creator date of death', kind: 'life', dk: 'death' },
    { group: 'Creator', key: 'creatorRole', title: 'Creator role', kind: 'chips', search: true },
    { group: 'Creator', key: 'nationality', title: 'Nationality', kind: 'list', search: true },
    { group: 'Object', key: 'date', title: 'Production date', kind: 'date' },
    { group: 'Object', key: 'period', title: 'Date (era, period, century)', kind: 'chips', search: true },
    { group: 'Object', key: 'classification', title: 'Classification', kind: 'chips', search: true },
    { group: 'Object', key: 'type', title: 'Object type', kind: 'chips', search: true },
    { group: 'Object', key: 'material', title: 'Materials / medium', kind: 'list', search: true },
    { group: 'Object', key: 'language', title: 'Language', kind: 'chips', search: true },
    { group: 'Object', key: 'place', title: "Object's place of production", kind: 'list', search: true },
    { group: 'Object', key: 'region', title: 'Region', kind: 'chips', search: true },
    { group: 'Object', key: 'accession', title: 'Accession number', kind: 'text' },
    { group: 'Subject / topic', key: 'theme', title: 'Theme', kind: 'chips' },
    { group: 'Subject / topic', key: 'subject', title: 'Subject terms', kind: 'list', search: true },
    { group: 'Subject / topic', key: 'assoc', title: 'Subject agent', kind: 'list', search: true },
    { group: 'Subject / topic', key: 'subjectPlace', title: 'Subject location', kind: 'list', search: true },
    { group: 'Subject / topic', key: 'subjectEvent', title: 'Subject event', kind: 'list', search: true },
    { group: 'Subject / topic', key: 'culture', title: 'Cultural affiliation', kind: 'list', search: true },
    { group: 'Copyright & advisory', key: 'licence', title: 'Licence type', kind: 'chips' },
    { group: 'Copyright & advisory', key: 'filmClass', title: 'Film & gaming classification', kind: 'chips' },
    { group: 'Access', key: 'access', title: 'Object access condition', kind: 'chips' },
    { group: 'Access', key: 'daAccess', title: 'Digital asset access condition', kind: 'chips' },
    { group: 'Media type', key: 'assetFormat', title: 'Digital asset format type', kind: 'chips' }
  ];
  const SCOPES = [['all', 'All fields'], ['title', 'Title'], ['creator', 'Creator'], ['subject', 'Subject']];
  const SORTS = [['rel', 'Relevance'], ['new', 'Date (newest)'], ['old', 'Date (oldest)'], ['az', 'Title A-Z']];
  // Advanced Search rows: {field, op, query}. 'must' = contains all terms, 'should' = contains any term, 'must_not' =
  // contains none. Every must row must match, at least one should row must match (when there are any), and no must_not row may match.
  const ADV_FIELDS = { all_fields: 'All fields', title: 'Title', creator: 'Creator', subject: 'Subject', description: 'Description' };
  const ADV_OPS = { must: 'contains all', should: 'contains any', must_not: 'does not contain' };
  const ADV_FILTER_KEYS = { collection: 'collection', type: 'type', creator: 'creator', licence: 'licence', access: 'access' };
  const ADV_SORTS = { 'year-desc': 'new', 'year-asc': 'old', az: 'az' };

  const empty = () => { const f = { exact: false, digital: false, downloadable: false, sort: '', q: '', scope: 'all', collection: [], yFrom: null, yTo: null, accession: '', birthFrom: null, birthTo: null, deathFrom: null, deathTo: null, clauses: [], fAll: {} }; KEYS.forEach(k => f[k] = []); return f; };
  const clone = f => JSON.parse(JSON.stringify(f));

  /* ---- record values ---- */
  const periodOf = it => it.period || (it.dateStart == null ? null : it.dateStart < 1800 ? 'Before 1800' : it.dateStart < 1900 ? '19th century' : it.dateStart < 2000 ? '20th century' : '21st century');
  const regionOf = it => NATION_REGION[it.nationality] || null;
  // Creator birth and death years, read from the "(b.1954, d.2017)" or "(1882-1961)" at the end of a creator name
  const lifespanOf = creator => { const m = (creator || '').match(/\(([^)]+)\)\s*$/); if (!m) return {}; const inner = m[1];
    const range = inner.match(/^(\d{4})\s*[–-]\s*(\d{4})$/); if (range) return { birth: +range[1], death: +range[2] };
    const b = inner.match(/b\.\s*(\d{4})/), d = inner.match(/d\.\s*(\d{4})/); return { birth: b ? +b[1] : null, death: d ? +d[1] : null }; };
  // A record's values for a facet key (always an array)
  const vals = (it, k) => k === 'period' ? [periodOf(it)].filter(Boolean) : k === 'filmClass' ? (it.ratings || []) : k === 'classification' ? (it.classes || []) : k === 'named' ? [].concat(it.named ?? []) : k === 'region' ? [regionOf(it)].filter(Boolean) : k === 'creatorRole' ? (it.creatorRoles || []) : k === 'assetFormat' ? (it.formats || []) : k === 'type' ? (it.types || []) : [].concat(it[k] ?? []);
  // The text the search words are matched against, for a scope
  const scopeText = (it, sc) => sc === 'title' ? it.title : sc === 'creator' ? it.creator : sc === 'subject' ? it.subject : [it.title, it.creator, it.collection, it.named, it.objectType, it.subject, it.material, it.place, it.culture, ...(it.assoc || [])].filter(Boolean).join(' ');
  const advText = (it, field) => String(field === 'title' ? it.title : field === 'creator' ? it.creator : field === 'subject' ? it.subject : field === 'description' ? it.description : scopeText(it, 'all') + ' ' + (it.description || '') + ' ' + (it.accession || '')).toLowerCase();

  /* ---- CCS-34: Boolean / exact-phrase query parsing ---- */
  // Tokenizes a raw query string into quoted phrases, AND/OR/NOT operator keywords, and plain words. Quoted text is kept
  // as a single 'phrase' token.
  function tokenizeQuery(q) {
    const tokens = [];
    const re = /"([^"]+)"|(\S+)/g;
    let m;
    while ((m = re.exec(q))) {
      if (m[1] !== undefined) tokens.push({ type: 'phrase', value: m[1].toLowerCase() });
      else {
        const w = m[2], up = w.toUpperCase();
        if (up === 'AND' || up === 'OR' || up === 'NOT') tokens.push({ type: 'op', value: up });
        else tokens.push({ type: 'word', value: w.toLowerCase() });
      }
    }
    return tokens;
  }
  // Evaluates a token stream (from tokenizeQuery) against lowercased searchable text. Left-to-right precedence only (no
  // parentheses). NOT negates whichever term immediately follows it; the implicit combiner between two terms is AND.
  function evalBooleanQuery(tokens, text) {
    let result = null, pendingOp = 'AND', negateNext = false;
    for (const tok of tokens) {
      if (tok.type === 'op') {
        if (tok.value === 'NOT') negateNext = true; else pendingOp = tok.value;
        continue;
      }
      let termVal = text.includes(tok.value);
      if (negateNext) { termVal = !termVal; negateNext = false; }
      result = result === null ? termVal : (pendingOp === 'OR' ? (result || termVal) : (result && termVal));
      pendingOp = 'AND';
    }
    return result === null ? true : result;
  }
  // Matches a search query against lowercased searchable text: a boolean expression when the query has AND/OR/NOT, else a
  // quoted exact phrase, else every word.
  function matchesQuery(text, q) {
    const trimmed = (q || '').trim();
    if (!trimmed) return true;
    const tokens = tokenizeQuery(trimmed);
    if (tokens.some(t => t.type === 'op')) return evalBooleanQuery(tokens, text);
    const m = trimmed.match(/^"(.+)"$/);
    if (m) return text.includes(m[1].toLowerCase());
    return trimmed.toLowerCase().split(/\s+/).every(w => text.includes(w));
  }
  function matchClauses(it, clauses) {
    let shouldSeen = false, shouldHit = false;
    for (const c of clauses) {
      const text = advText(it, c.field);
      if (c.op === 'should') {
        shouldSeen = true;
        const terms = tokenizeQuery(c.query).filter(t => t.type !== 'op').map(t => t.value);
        if (terms.some(t => text.includes(t))) shouldHit = true;
      } else if (c.op === 'must_not') {
        if (matchesQuery(text, c.query)) return false;
      } else if (!matchesQuery(text, c.query)) return false;
    }
    return !shouldSeen || shouldHit;
  }

  // Standard Levenshtein edit distance.
  function levenshtein(a, b) {
    if (a === b) return 0;
    const al = a.length, bl = b.length;
    if (!al) return bl; if (!bl) return al;
    let prev = Array.from({ length: bl + 1 }, (_, i) => i);
    for (let i = 1; i <= al; i++) {
      const cur = [i];
      for (let j = 1; j <= bl; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      prev = cur;
    }
    return prev[bl];
  }

  /* ---- URLs ---- */
  // Advanced form URL parameters -> query (null when the URL has none)
  function parseAdvancedParams(qs, canonType) {
    const f = empty(); let any = false;
    const rows = {}, defOp = qs.get('op') === 'should' ? 'should' : 'must';   // Blacklight's single match all / any operator
    qs.forEach((val, name) => {
      let m;
      if ((m = name.match(/^clause\[(\d+)\]\[(field|op|query)\]$/))) (rows[m[1]] = rows[m[1]] || {})[m[2]] = val;
      else if ((m = name.match(/^(f|f_inclusive)\[(\w+)\]\[\]$/)) && ADV_FILTER_KEYS[m[2]]) {
        const k = ADV_FILTER_KEYS[m[2]], v = k === 'type' ? canonType(val) : val; if (!f[k].includes(v)) f[k].push(v);
        if (m[1] === 'f') f.fAll[k] = true; any = true;
      } else if ((m = name.match(/^range\[year\]\[(begin|end)\]$/)) && val !== '' && !isNaN(+val)) {
        f[m[1] === 'begin' ? 'yFrom' : 'yTo'] = +val; any = true;
      }
    });
    Object.keys(rows).sort((a, b) => a - b).forEach(i => {
      const r = rows[i];
      if (r.query && r.query.trim() && ADV_FIELDS[r.field || 'all_fields']) { f.clauses.push({ field: r.field || 'all_fields', op: ADV_OPS[r.op] ? r.op : defOp, query: r.query.trim() }); any = true; }
    });
    const so = qs.get('sort'); if (ADV_SORTS[so]) { f.sort = ADV_SORTS[so]; any = any || f.clauses.length > 0; }
    return any ? f : null;
  }
  // URL -> { query, term }: term is the simple search's words, for the search history (null when there are none)
  function fromUrl(qs, canonType) {
    const adv = parseAdvancedParams(qs, canonType);
    if (adv) return { query: adv, term: null };
    const pc = qs.getAll('collection').filter(Boolean), pt = qs.get('type'), pq = qs.get('q'), psc = qs.get('scope'), pn = qs.get('named'), pcl = qs.get('classification'), pex = qs.get('exact');
    const f = empty();
    if (pc.length || pt || pq || psc || pn || pcl || pex) {
      if (pc.length) f.collection = pc;
      if (pex === '1') f.exact = true;
      if (pn) f.named = [pn];
      if (pcl) f.classification = [pcl];
      if (pt) f.type = pt.split(';').map(t => canonType(t)).filter((t, i, a) => t && a.indexOf(t) === i);
      if (pq) f.q = pq;
      if (psc) f.scope = psc;
      return { query: f, term: pq || null };
    }
    // the bare results page: every record that has a digital asset
    if ([...qs.keys()].every(k => k === 'view')) f.digital = true;
    return { query: f, term: null };
  }
  // Query -> advanced form URL, so "Edit advanced search" restores what the visitor entered. view: the results view
  // to carry over (like Blacklight, the form keeps it).
  function advancedHref(f, view) {
    const p = new URLSearchParams(); let i = 0;
    (f.clauses || []).forEach(c => { p.set(`clause[${i}][field]`, c.field); p.set(`clause[${i}][op]`, c.op); p.set(`clause[${i}][query]`, c.query); i++; });
    if (f.q) { p.set(`clause[${i}][field]`, f.scope === 'all' ? 'all_fields' : f.scope); p.set(`clause[${i}][op]`, 'must'); p.set(`clause[${i}][query]`, f.q); }
    Object.keys(ADV_FILTER_KEYS).forEach(k => (f[k] || []).forEach(v => p.append(`${f.fAll && f.fAll[k] ? 'f' : 'f_inclusive'}[${k}][]`, v)));
    if (f.yFrom != null) p.set('range[year][begin]', f.yFrom);
    if (f.yTo != null) p.set('range[year][end]', f.yTo);
    const so = Object.keys(ADV_SORTS).find(k => ADV_SORTS[k] === f.sort); if (so) p.set('sort', so);
    if (view === 'list' || view === 'masonry') p.set('view', view);
    const qs = p.toString(); return 'advanced-search.html' + (qs ? '?' + qs : '');
  }

  function create(opts) {
    const items = opts.items, smart = opts.smart, canonType = opts.canonType;

    // Does a record answer the query? except: a facet key to leave out (for that facet's own counts and histogram)
    function matches(it, f, except) {
      if (f.digital && !(it.formats && it.formats.length)) return false;
      if (f.downloadable && it.licence === 'Rights Reserved') return false;
      if (f.accession && !(it.accession || '').toLowerCase().includes(f.accession.toLowerCase())) return false;
      if (except !== 'life' && (f.birthFrom != null || f.birthTo != null)) {
        const lp = lifespanOf(it.creator);
        if (!lp.birth) return false;
        if (f.birthFrom != null && lp.birth < f.birthFrom) return false;
        if (f.birthTo != null && lp.birth > f.birthTo) return false;
      }
      if (except !== 'lifeDeath' && (f.deathFrom != null || f.deathTo != null)) {
        const lp = lifespanOf(it.creator);
        if (!lp.death) return false;
        if (f.deathFrom != null && lp.death < f.deathFrom) return false;
        if (f.deathTo != null && lp.death > f.deathTo) return false;
      }
      if (except !== 'coll' && f.collection.length && !(f.fAll && f.fAll.collection ? f.collection.every(c => c === it.collection) : f.collection.includes(it.collection))) return false;
      for (const k of KEYS) if (k !== except && f[k].length) { const vs = vals(it, k); if (!(f.fAll && f.fAll[k] ? f[k].every(v => vs.includes(v)) : vs.some(v => f[k].includes(v)))) return false; }
      if (except !== 'date' && (f.yFrom != null || f.yTo != null)) {
        if (it.dateStart == null) return false;
        if (f.yFrom != null && it.dateStart < f.yFrom) return false;
        if (f.yTo != null && it.dateStart > f.yTo) return false;
      }
      if (f.q) {
        const txt = scopeText(it, f.scope).toLowerCase();
        if (!matchesQuery(txt, f.q)) {
          if (f.exact) return false;
          const a = smart.analyse(f.q);
          if (!a || !smart.match(it, a, f.scope, txt).ok) return false;
        }
      }
      if (f.clauses && f.clauses.length && !matchClauses(it, f.clauses)) return false;
      return true;
    }
    // How many matching records have each value of field: { value: count }
    function counts(f, except, field) { const c = {}; items.forEach(it => { if (matches(it, f, except)) (field === 'collection' || field === 'named' ? [it[field]].filter(Boolean) : vals(it, field)).forEach(v => c[v] = (c[v] || 0) + 1); }); return c; }
    // Every value of a facet key in the records, in first-seen order
    const values = k => [...new Set(items.flatMap(i => vals(i, k)))];
    // The matching records, in the query's order: { list, smart } where smart (a Map record -> SmartSearch match, or null)
    // says why each record matched when the words were ranked by relevance
    function search(f) {
      let list = items.filter(it => matches(it, f)), info = null;
      if (f.q && !f.sort && !f.exact) {
        const a = smart.analyse(f.q);
        if (a) {
          info = new Map(list.map(it => [it, smart.match(it, a, f.scope, scopeText(it, f.scope).toLowerCase())]));
          list = [...list].sort((x, y) => info.get(y).score - info.get(x).score);
        }
      }
      const tt = t => t.replace(/^\W+/, '');
      if (f.sort === 'az') list = [...list].sort((a, b) => tt(a.title).localeCompare(tt(b.title)));
      if (f.sort === 'new') list = [...list].sort((a, b) => (b.dateStart ?? -1e9) - (a.dateStart ?? -1e9));
      if (f.sort === 'old') list = [...list].sort((a, b) => (a.dateStart ?? 1e9) - (b.dateStart ?? 1e9));
      return { list, smart: info };
    }

    /* ---- CCS-158 / CCS-288 / CCS-292 / CCS-293: spelling suggestions ---- */
    // Vocabulary of searchable words from the record data (title, creator, subject, type, material, place), so a
    // suggestion is always a real term in the collection (CCS-292).
    const VOCAB = (() => {
      const set = new Set();
      const addWords = v => { if (!v) return; String(v).toLowerCase().split(/[^a-z0-9]+/).forEach(w => { if (w.length > 1) set.add(w); }); };
      items.forEach(it => { addWords(it.title); addWords(it.creator); addWords(it.subject); addWords(it.objectType); addWords(it.material); addWords(it.place); });
      return set;
    })();
    // The closest vocabulary word to `word`, or null if `word` is already valid or nothing is close enough: distance <= 2
    // for words of 4+ letters, <= 1 for 3 letters; shorter words are skipped. A word that begins a longer vocabulary word
    // is completed to the shortest one (CCS-158).
    function closestVocabWord(word) {
      const w = word.toLowerCase();
      if (w.length < 3 || VOCAB.has(w)) return null;
      const maxDist = w.length >= 4 ? 2 : 1;
      let best = null, bestDist = Infinity;
      VOCAB.forEach(v => {
        if (Math.abs(v.length - w.length) > maxDist) return;
        const d = levenshtein(w, v);
        if (d < bestDist) { bestDist = d; best = v; }
      });
      let part = null;
      VOCAB.forEach(v => { if (v.length > w.length && v.length <= w.length + 3 && v.startsWith(w) && (!part || v.length < part.length)) part = v; });
      if (part) return part;
      return bestDist <= maxDist ? best : null;
    }
    // A "did you mean" correction for the words, word by word, including the last word (CCS-288) and each word inside a
    // quoted phrase (CCS-292/293). Returns the corrected words, or null when no word needed correcting.
    function suggest(q) {
      const trimmed = (q || '').trim();
      if (!trimmed) return null;
      const tokens = tokenizeQuery(trimmed).filter(t => t.type !== 'op');
      let changed = false;
      const fix = w => { if (VOCAB.has(w)) return w; const c = closestVocabWord(w); if (c) { changed = true; return c; } return w; };
      const corrected = tokens.map(t => t.type === 'phrase' ? '"' + t.value.split(/\s+/).map(fix).join(' ') + '"' : fix(t.value));
      return changed ? corrected.join(' ') : null;
    }

    return { matches, counts, values, search, suggest, fromUrl: qs => fromUrl(qs, canonType) };
  }

  const api = { create, empty, clone, advancedHref, lifespanOf, scopeText, FACETS, KEYS, LABELS, HIER, SCOPES, SORTS, ADV_FIELDS, ADV_OPS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.CCSSearchQuery = api;
})(typeof window !== 'undefined' ? window : this);
