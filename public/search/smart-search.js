/* Smart search for CCS: fuzzy matching (CCS-123) and semantic matching (CCS-116) that run in the browser,
 * with no backend. Exposes window.SmartSearch (and module.exports for the node tests).
 *
 *  - Fuzzy: a word that is not in the catalogue vocabulary is matched to close vocabulary words
 *    (edit distance with transpositions, plus prefix matching so a half-typed last word still finds records).
 *  - Semantic: a word is expanded to related terms from (a) a curated thesaurus that maps everyday words to the
 *    catalogue's vocabulary ("doctor" -> physician, surgeon, medical; "tooth" -> dental) and (b) terms that
 *    co-occur with it in the records (pointwise mutual information over the catalogue itself).
 *  - Every match is labelled exact, fuzzy or semantic so the interface can say why a record was returned,
 *    and results are scored so exact matches rank first.
 * Quoted phrases and AND / OR / NOT queries are never expanded: they stay exact. */
(function (root) {
  'use strict';

  var STOP = new Set('a an and are as at be by for from in is it of on or the to with was were this that these those who whom what which how when where why can do does show me find any some about'.split(' '));
  // Words that describe age or vagueness rather than content; they never block a match on their own.
  var SOFT = new Set('old older oldest antique vintage historic historical ancient early item items thing things object objects stuff something related about'.split(' '));

  // Curated vocabulary. SYNONYMS are interchangeable words. BROADER maps a general word to the specific words
  // catalogued under it: searching the general word finds the specific records, and searching a specific word
  // also finds records that use the general word, but specific words are not treated as related to each other
  // (a harp is not a violin).
  var SYNONYMS = [
    ['doctor', 'physician', 'surgeon', 'clinician', 'medic'],
    ['tooth', 'teeth', 'dental', 'dentist', 'dentistry', 'denture', 'orthodontic'],
    ['photograph', 'photo', 'picture', 'image', 'snapshot', 'photographic', 'negative'],
    ['clothing', 'clothes', 'garment', 'apparel', 'costume', 'dress', 'attire'],
    ['cloth', 'fabric', 'textile', 'material'],
    ['jewellery', 'jewelry', 'necklace', 'bracelet', 'brooch', 'pendant'],
    ['pottery', 'ceramic', 'earthenware', 'porcelain', 'stoneware'],
    ['book', 'volume', 'publication', 'booklet'],
    ['letter', 'correspondence', 'epistle'],
    ['map', 'chart', 'cartography'],
    ['song', 'tune', 'melody', 'composition'],
    ['recording', 'audio', 'sound'],
    ['film', 'movie', 'footage', 'cinema'],
    ['x-ray', 'xray', 'radiograph', 'radiology'],
    ['skull', 'cranium'],
    ['violin', 'fiddle'],
    ['harp', 'lyre'],
    ['baby', 'infant', 'newborn'],
    ['child', 'kid', 'juvenile'],
    ['weapon', 'arm'],
    ['cartoon', 'caricature', 'comic'],
    ['lamp', 'lantern', 'light'],
    ['clock', 'watch', 'timepiece'],
    ['sketch', 'drawing'],
    ['sculpture', 'statue', 'carving'],
    ['painting', 'canvas'],
    ['pharmacy', 'chemist', 'apothecary', 'pharmaceutical'],
    ['hospital', 'infirmary', 'clinic'],
    ['museum', 'gallery', 'collection'],
    ['farm', 'agriculture', 'pastoral', 'rural']
  ];
  var BROADER = {
    'instrument': ['harp', 'piano', 'violin', 'fiddle', 'flute', 'pipe', 'organ', 'harmonium', 'guitar', 'drum', 'trumpet', 'tone-tool', 'metallophone', 'synthesiser'],
    'musical': ['instrument', 'music', 'score', 'composer'],
    'music': ['score', 'composer', 'composition', 'manuscript', 'instrument', 'song', 'orchestral'],
    'medical': ['surgical', 'surgeon', 'doctor', 'clinical', 'hospital', 'medicine', 'patient', 'anatomy'],
    'medicine': ['pharmacy', 'drug', 'remedy', 'tonic', 'medical', 'bottle'],
    'art': ['painting', 'drawing', 'sculpture', 'print', 'artwork', 'etching', 'lithograph', 'portrait'],
    'artwork': ['painting', 'drawing', 'sculpture', 'print', 'etching'],
    'animal': ['mammal', 'marsupial', 'kangaroo', 'possum', 'bird', 'primate', 'fauna'],
    'plant': ['flower', 'tree', 'fern', 'botanical', 'herbarium', 'eucalypt', 'wattle', 'fungi', 'leaf'],
    'furniture': ['chair', 'table', 'cabinet', 'desk', 'stool', 'bench'],
    'container': ['bowl', 'jar', 'bottle', 'basket', 'box', 'vase', 'jug', 'vessel', 'bag'],
    'tool': ['implement', 'equipment', 'apparatus', 'device', 'utensil'],
    'bone': ['skull', 'skeleton', 'anatomy', 'specimen'],
    'document': ['letter', 'manuscript', 'diary', 'certificate', 'report', 'archive', 'file'],
    'vehicle': ['car', 'carriage', 'cart', 'bicycle'],
    'toy': ['doll', 'game', 'puppet', 'figurine'],
    'building': ['house', 'architecture', 'plan', 'blueprint', 'structure'],
    'science': ['scientific', 'laboratory', 'physics', 'chemistry', 'apparatus', 'experiment'],
    'war': ['military', 'soldier', 'army', 'battle', 'service']
  };

  function norm(s) { return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function words(s) { return norm(s).split(/[^a-z0-9]+/).filter(function (w) { return w.length > 1; }); }
  function stem(w) {
    if (w.length > 4 && /ies$/.test(w)) return w.slice(0, -3) + 'y';
    if (w.length > 4 && /(sh|ch|x|z|ss)es$/.test(w)) return w.slice(0, -2);
    if (w.length > 3 && /s$/.test(w) && !/(ss|us|is)$/.test(w)) return w.slice(0, -1);
    return w;
  }

  // Damerau-Levenshtein (adjacent transposition counts as one edit), with an early-out when the bound is exceeded.
  function distance(a, b, max) {
    if (a === b) return 0;
    var al = a.length, bl = b.length;
    if (Math.abs(al - bl) > max) return max + 1;
    var prev2 = null, prev = [], cur, i, j;
    for (j = 0; j <= bl; j++) prev[j] = j;
    for (i = 1; i <= al; i++) {
      cur = [i]; var rowMin = i;
      for (j = 1; j <= bl; j++) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        var v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
        if (prev2 && i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1)) v = Math.min(v, prev2[j - 2] + 1);
        cur[j] = v; if (v < rowMin) rowMin = v;
      }
      if (rowMin > max) return max + 1;
      prev2 = prev; prev = cur;
    }
    return prev[bl];
  }
  function maxEdits(len) { return len <= 3 ? 0 : len <= 8 ? 1 : 2; }

  function create(items, docOf) {
    // docOf(item, scope) -> text for the scope; the default covers the fields people search by
    docOf = docOf || function (it, scope) {
      if (scope === 'title') return it.title;
      if (scope === 'creator') return it.creator;
      if (scope === 'subject') return it.subject;
      return [it.title, it.objectType, it.subject, it.material, it.place, it.culture, it.named, it.description, it.collection, (it.classes || []).join(' '), (it.theme || []).join(' ')].filter(Boolean).join(' ');
    };
    var df = Object.create(null), docStems = new Map(), N = items.length;
    var thes = Object.create(null);
    var link = function (x, y, wt) { x = stem(norm(x)); y = stem(norm(y)); if (x === y) return; (thes[x] = thes[x] || Object.create(null))[y] = Math.max(thes[x][y] || 0, wt); };
    SYNONYMS.forEach(function (g) { g.forEach(function (x) { g.forEach(function (y) { link(x, y, 1); }); }); });
    Object.keys(BROADER).forEach(function (h) { BROADER[h].forEach(function (m) { link(h, m, 0.8); }); });
    function stemsOf(text) {
      var s = docStems.get(text);
      if (!s) { s = new Set(words(text).map(stem)); docStems.set(text, s); }
      return s;
    }
    items.forEach(function (it) { stemsOf(docOf(it, 'all')).forEach(function (w) { df[w] = (df[w] || 0) + 1; }); });
    var vocab = Object.keys(df).filter(function (w) { return !STOP.has(w); });
    var byLen = Object.create(null);
    vocab.forEach(function (w) { (byLen[w.length] = byLen[w.length] || []).push(w); });

    var related = Object.create(null);
    function cooccurring(w) {
      if (related[w]) return related[w];
      var dw = df[w], out = [];
      if (dw && dw >= 2) {
        var c = Object.create(null);
        items.forEach(function (it) { var s = stemsOf(docOf(it, 'all')); if (s.has(w)) s.forEach(function (t) { if (t !== w && !STOP.has(t)) c[t] = (c[t] || 0) + 1; }); });
        Object.keys(c).forEach(function (t) {
          if (c[t] < 4 || df[t] < 5 || t.length < 4 || /^\d/.test(t) || df[t] > N * 0.15) return;
          var pmi = Math.log((c[t] * N) / (dw * df[t]));
          if (pmi >= 2.6) out.push({ t: t, w: pmi, c: c[t] });
        });
        out.sort(function (a, b) { return b.w * Math.log(1 + b.c) - a.w * Math.log(1 + a.c); });
        out = out.slice(0, 4);
      }
      related[w] = out; return out;
    }

    function fuzzyCandidates(w, isLast) {
      var out = [], max = maxEdits(w.length), seen = new Set();
      if (max > 0) {
        for (var l = w.length - max; l <= w.length + max; l++) (byLen[l] || []).forEach(function (v) {
          if (v !== w && v.charAt(0) === w.charAt(0) && !seen.has(v) && distance(w, v, max) <= max) { seen.add(v); out.push(v); }
        });
      }
      if (isLast && w.length >= 3) vocab.forEach(function (v) { if (v.length > w.length && v.indexOf(w) === 0 && !seen.has(v)) { seen.add(v); out.push(v); } });
      out.sort(function (a, b) { return (df[b] || 0) - (df[a] || 0); });
      return out.slice(0, 8);
    }

    var cache = Object.create(null);
    // analyse(q): per-word expansions. Returns null for queries that must stay exact (phrases, operators).
    function analyse(q) {
      q = String(q || '').trim();
      if (!q) return null;
      if (/["]/.test(q) || /(^|\s)(AND|OR|NOT)(\s|$)/.test(q)) return null;
      if (cache[q]) return cache[q];
      var raw = q.split(/\s+/).map(norm).map(function (w) { return w.replace(/[^a-z0-9-]/g, ''); }).filter(Boolean);
      var list = raw.filter(function (w) { return !STOP.has(w); });
      var out = list.map(function (w, i) {
        var s = stem(w), inVocab = !!df[s], isLast = i === list.length - 1;
        var fuzzy = inVocab ? [] : fuzzyCandidates(s, isLast);
        var sem = [];
        var seen = new Set([s]);
        var add = function (t, wt) { if (!seen.has(t) && (df[t] || 0) > 0) { seen.add(t); sem.push({ t: t, w: wt }); } };
        if (thes[s]) Object.keys(thes[s]).forEach(function (t) { add(t, thes[s][t]); });
        if (inVocab && !thes[s]) cooccurring(s).forEach(function (o) { add(o.t, 0.5); });
        return { w: w, stem: s, soft: SOFT.has(w), inVocab: inVocab, fuzzy: fuzzy, semantic: sem.slice(0, 12) };
      });
      var res = { words: out, required: out.filter(function (x) { return !x.soft; }).length ? out.filter(function (x) { return !x.soft; }) : out };
      cache[q] = res; return res;
    }

    // match(item, analysis, scope) -> { ok, score, kind } where kind is the weakest evidence used: exact < fuzzy < semantic
    var RANK = { exact: 0, fuzzy: 1, semantic: 2 };
    function match(it, a, scope, exactText) {
      var text = docOf(it, scope || 'all'), st = stemsOf(text), low = norm(exactText != null ? exactText : text), title = norm(it.title);
      var score = 0, kind = 'exact';
      for (var i = 0; i < a.required.length; i++) {
        var x = a.required[i], hit = null;
        if (st.has(x.stem)) { hit = { k: 'exact', s: title.indexOf(x.w) !== -1 ? 10 : 5 }; }
        else if (low.indexOf(x.w) !== -1) { hit = { k: 'exact', s: 2 }; }
        else {
          for (var f = 0; f < x.fuzzy.length && !hit; f++) if (st.has(x.fuzzy[f]) || low.indexOf(x.fuzzy[f]) !== -1) hit = { k: 'fuzzy', s: title.indexOf(x.fuzzy[f]) !== -1 ? 6 : 3 };
          for (var m = 0; m < x.semantic.length && !hit; m++) if (st.has(x.semantic[m].t)) hit = { k: 'semantic', s: (title.indexOf(x.semantic[m].t) !== -1 ? 3 : 1.5) * x.semantic[m].w };
        }
        if (!hit) return { ok: false, score: 0, kind: 'none' };
        score += hit.s; if (RANK[hit.k] > RANK[kind]) kind = hit.k;
      }
      return { ok: true, score: score, kind: kind };
    }

    // Terms actually used to widen a query, for the on-page explanation
    function describe(a) {
      var fuzzy = [], semantic = [];
      if (!a) return { fuzzy: fuzzy, semantic: semantic };
      a.required.forEach(function (x) {
        if (x.fuzzy.length) fuzzy.push({ from: x.w, to: x.fuzzy.slice(0, 3) });
        if (x.semantic.length) semantic.push({ from: x.w, to: x.semantic.slice(0, 5).map(function (o) { return o.t; }) });
      });
      return { fuzzy: fuzzy, semantic: semantic };
    }
    return { analyse: analyse, match: match, describe: describe, vocabSize: vocab.length, _stem: stem, _distance: distance };
  }

  var api = { create: create, stem: stem, distance: distance, SYNONYMS: SYNONYMS, BROADER: BROADER };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.SmartSearch = api;
})(typeof window !== 'undefined' ? window : this);
