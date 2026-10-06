# Jira coverage: search and Blacklight tickets

Board: CCS project, label `CCS-2026` (133 tickets, read on 2026-10-06). The developers' team has its own
implementation, so a ticket marked **Done** there is not necessarily done in this prototype. Each ticket's
acceptance criteria were checked against the running app (http://localhost:3002), and the ones that
can be checked without Solr are kept as tests (`test/models/jira_search_requirements_test.rb`).

Status key: **Met** (already worked), **Fixed** (gap found and fixed during this audit), **Partial**,
**Gap: data** (needs a source column or export we do not have), **Gap: decision** (the ticket or workbook
is ambiguous), **Not in prototype** (different environment or custom work, parked).

## Search (BR-05) and related

| Ticket | Jira | Prototype | Notes |
|---|---|---|---|
| CCS-33 Basic search | Done | **Met**, with the gaps **Fixed** | Search box on every page; results in list view by relevance; a blank or whitespace search returns all 40,962 records (the updated criterion); no-results message per CCS-124. Fixed: queries are cut to 255 characters (server side and `maxlength` on the header inputs), and special characters are not allowed: `QueryRules` keeps letters, digits, spaces and the characters CCS-34 and real names need (quotes, parentheses, apostrophe, comma, full stop, hyphen, ampersand) and replaces everything else with a space, telling the visitor. A search of only special characters (`***`, `*:*`) returns to the home page asking for "a valid search string". This also stops Solr query syntax (`*:*`, `field:value`, `[a TO b]`, `{!...}`) reaching Solr. |
| CCS-34 Boolean / exact phrase | Done | **Met** | `AND`, `OR`, `NOT`, nested parentheses, quoted phrase in order (28 hits; reversed order 0; unquoted 36), operators are capitals only. |
| CCS-37 Search within a Collection | Done | **Met** | Collection Title filter; one or several collections; keyword search within a collection. |
| CCS-38 Search filters | New | **Partial** | 13 of the 22 workbook filters (see `docs/data-model.md`). The other 9 are **Gap: data** or open questions. The ticket's table differs slightly from the workbook (it lists "Object's Place of Production" and "Object classification"; the workbook has Region and Classification). |
| CCS-20 Filter and refine | New | **Met** | Multiple filters, results limited to them, keyword search within filters, add or remove filters at any time (constraints). |
| CCS-41 Digital assets only | New | **Fixed** | "Digital asset" filter: with (30 records), without (40,932). Added to the Media type section. |
| CCS-55 Indigenous data filter | New | **Gap: data** | The flag's source field is "tbd" for EMu, Vernon and FEIT in the ticket itself; Nexus DAM "DA Indigeneity data" has no export. |
| CCS-45 Pagination | Done | **Met** | Total count, per-page 12/24/48/96, numbered pages (jump to any page). |
| CCS-116 Semantic search | Done | **Fixed** | Was not implemented here: `synonyms.txt` was Solr's sample file. Now a query-time synonym filter with the static prototype's curated vocabulary (30 groups; 19 general words that find their specifics). Specific words do not widen to general ones (that matched every "Medical" record). Reload the core, no reindex. |
| CCS-123 Fuzzy search | Done | **Met** | A misspelled word returns results for the corrected word. |
| CCS-158 Spelling suggestions | Done | **Met** | "No results for skul. Showing results for skull instead. Did you mean: ..." |
| CCS-288, 292, 293 Spelling bugs | Done | **Met** | Last word misspelled, phrase with a misspelling, partial phrase: all correct and offer alternatives. |
| CCS-124 No results message | New | **Fixed** | Now "No results found and no suggestions are available for this search phrase." |
| CCS-271 Empty search | Done | **Met** | Superseded by CCS-33's updated criterion: an empty search returns everything. |
| CCS-143 Save search history | New | **Fixed** | The search overlay lists the visitor's last 5 searches (session based, no login). |
| CCS-206 History grouped by day | New | **Fixed** | `/search_history` groups by Today, Yesterday, "N days ago", in Melbourne time. |
| CCS-46 Favourite lists | New | **Not in prototype** | Needs several named lists for guests (cookie) and logged-in users. Blacklight's bookmarks are a single list and need a user model; `/bookmarks` redirects. |
| CCS-19 Explore collections | New | **Partial** | The header lists the five collections and filters by them. Collection landing pages with introductory text are parked custom work. |
| CCS-44 Viewing classification | New | **Gap: data** | Source is "DA Advisory Classification" in Nexus DAM. |
| CCS-217 Collection asset details | New | **Partial** | The record page follows the workbook's fields (19 of 30 have data); events, measurements, language and provenance are **Gap: data**. |
| CCS-310 Test semantic search with integration data | New | **Not in prototype** | Depends on the developers' integration data. |

## Data pipeline tickets (BR-18, integration)

CCS-159, 169, 185, 197, 207, 209, 265, 266 (index create, update, delete for EMu, Vernon, Nexus DAM) and
the "CCS integration with ..." tickets describe the developers' pipeline (webhooks, S3, database
records). This prototype loads the CSV exports with `rails collections:index` (a full or repeat load;
rows removed from a CSV are not deleted from the index). Nexus DAM has no export.

## Not search tickets, noted

CCS-50 (Acknowledgement on the home page) is present. CCS-51 and 62 (accessibility): axe reports no WCAG 2.1 AA
violations on the results, record and advanced search pages.
