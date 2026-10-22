# CCS domain terms

The words this codebase uses for its main ideas. Code, tests and docs use them the same way.

- **Record**: one catalogued object (a painting, a jar, a film) with its fields. The static site's records are in
  `public/collection-data.js` (`window.CCS.items`); the Rails app's are documents in Solr.
- **Collection**: one of the five University collections a record belongs to (Medical History Museum, Grainger Museum
  Collection, ...). A **named collection** is a group inside a collection (Roseby Collection, Michael Buxton Collection).
- **Search query** (or just **query**): everything a visitor asked for on the results page: the search words and their
  scope, advanced search rows, filter selections, date and creator-year ranges, switches and the sort. One plain object,
  defined by `public/search/search-query.js` (`CCSSearchQuery.empty()`); in the page code it is the variable `f`.
- **Clause**: one row of the advanced search form: a field, an operator (contains all / contains any / does not contain)
  and words.
- **Facet** (shown to visitors as a **filter**): a way to narrow results by a record field (Object type, Licence type,
  ...). `FACETS` lists them in the order and sections of the CCS Filters sheet. A facet's **counts** are how many results
  have each value, worked out with that facet's own selection left out.
- **Catalogue**: where records come from for a search: the local records in the browser, or the Blacklight
  `/catalog.json` API when live mode is on (`public/blacklight-adapter.js`).
- **Data model**: the field labels, filters and data types from the two CCS workbooks, extracted to JSON
  (`data-model/`, and `ead-ccs-test/config/data_model/` for the Rails app).
