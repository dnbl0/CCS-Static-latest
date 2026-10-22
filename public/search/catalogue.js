/* The catalogue the results page searches: the local records, or the Blacklight /catalog.json API when live mode is on
 * (public/blacklight-adapter.js). Exposes window.CCSCatalogue (and module.exports for the node tests).
 *
 * Usage: const C = CCSCatalogue.create({ items, query, adapter });
 *   items    the local records (window.CCS.items)
 *   query    a CCSSearchQuery engine over the local records (public/search/search-query.js)
 *   adapter  the BlacklightAdapter (optional: without it the catalogue is always local)
 *
 * C.live()                     is live mode on (the API is asked first)?
 * C.fetch(query, page, perPage, onSend)
 *   asks the API for one page of results and resolves to { live, error, sent }:
 *     live   { items, total } from the API, each item replaced by the full local record when there is one (the API
 *            returns lean documents), or null when the local records answer: the API cannot serve this query (advanced
 *            rows, "match all", filters it does not have, ...) or the request failed
 *     error  why the request failed, or null
 *     sent   whether a request was made (onSend() is called just before it is)
 *   Resolves to undefined when there is nothing to change: live mode is off, or a newer fetch has replaced this one.
 * C.results(query, live)       the results to show: { list, smart, total, paged }. With a live result (from fetch) in live
 *   mode, the API's page as given (paged: the list is one page already); otherwise every matching local record in the
 *   query's order, with smart saying why each matched (see CCSSearchQuery search()). */
(function (root) {
  'use strict';

  function create(opts) {
    const query = opts.query, adapter = opts.adapter;
    const byId = new Map(opts.items.map(it => [String(it.id), it]));
    let seq = 0;   // the latest fetch: an older reply that arrives after it is dropped

    const live = () => !!adapter && adapter.isLive();

    async function fetch(f, page, perPage, onSend) {
      if (!live()) return undefined;
      const mine = ++seq;
      if (!adapter.canServe(f)) return { live: null, error: null, sent: false };
      if (onSend) onSend();
      const res = await adapter.query(f, page, perPage);
      if (mine !== seq) return undefined;
      if (res.source === 'live' && res.items) {
        return { live: { items: res.items.map(d => byId.get(String(d.id)) || d), total: res.total }, error: null, sent: true };
      }
      return { live: null, error: res.error || null, sent: true };
    }

    function results(f, liveResult) {
      if (live() && liveResult) return { list: liveResult.items, smart: null, total: liveResult.total != null ? liveResult.total : liveResult.items.length, paged: true };
      const r = query.search(f);
      return { list: r.list, smart: r.smart, total: r.list.length, paged: false };
    }

    return { live, fetch, results };
  }

  const api = { create };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.CCSCatalogue = api;
})(typeof window !== 'undefined' ? window : this);
