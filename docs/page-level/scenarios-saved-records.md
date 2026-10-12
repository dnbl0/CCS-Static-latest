# Scenario catalogue: saved records, save control, saved bar, search history

Source: research agent, 2026-10-12. Evidence is file:line in the Rails app (`ead-ccs-test`) and the static site (`public/`).
Caveat: B10 and P3/P4 Rails behaviours are inferred from Blacklight 9.2.1 stock code, not run.

Key facts: Rails saved list = server-side guest user (30-day cookie, no account/login); Static = localStorage, cap 500,
newest first. Neither has export/cite/sort/pagination UI on the saved list. Rails uses a Turbo confirm for Clear; Static
uses `window.confirm`; no undo in either.

| ID | Page | Scenario | Type | Reached by | UI shows | Source | Platform |
|---|---|---|---|---|---|---|---|
| B1 | Saved list | Empty (new visitor, no guest row created) | Edge/Happy | /bookmarks, or saved bar at 0 | Banner "Saved records" + "The records you have saved on this device. Open one to see it in full, or select Saved to remove it from the list." Body `.saved-empty`: "You have not saved any records yet." + btn-primary "Search all records". No toolbar/Clear | bookmarks/index.html.erb:9-12; en.yml:64-68 | Rails |
| B1s | Saved list | Empty | Edge | /search/bookmarks.html | "You have no saved records. Choose Save on a record to keep it here." + link "Search all records"; bar hidden. Meta desc says "this browser" | bookmarks.html:234-235; bookmarks.js:render | Static |
| B2 | Saved list | 1 record | Happy | Save one, open list | Toolbar count "1 saved record", red btn-danger "Clear saved records", visually-hidden h2 "Your saved records", 1 `.result-card` (list view) with Saved toggle | index.html.erb:13-19 | Rails |
| B3 | Saved list | Many records | Happy | as above | "N saved records"; result cards; Rails pagination partial `results_pagination` (per_page default 40, options 12/24/40/96) so >40 paginates. Static: one unpaginated `<ul class=bookmarks-list__item>` rows (thumb, title link, "Type · Collection", Save toggle) | index.html.erb:19-20; catalog_controller.rb:30-31; bookmarks.js:item | Both |
| B4 | Saved list | Very many | Edge | 500+ | Rails: no cap in code (pagination only). Static: MAX=500, silently drops oldest beyond 500; no message | nav.js:62,68 | Both |
| B5 | Saved list | Remove one record (toggle Saved) | Happy | Click Saved on card | Rails: DELETE via fetch, label "Saving…" then "Save"; card stays until reload, counter updates. Flash copy exists but not shown by JS: "Record removed from your saved list." Static: row removed live, focus moves to next row's Save (or previous, or "Search all records" link when last); live region "Removed from saved records: <title>. N saved records." | en.yml:53; bookmarks.js:render; nav.js:170 | Both |
| B6 | Saved list | Remove last record | Edge | remove final item | Static: falls to empty state live. Rails: stays until reload then B1 | bookmarks.js | Both |
| B7 | Saved list | Clear all | Happy | "Clear saved records" | Rails: Turbo confirm "Remove every record from your saved list?" then DELETE /bookmarks/clear, redirect /bookmarks, flash "Your saved records have been cleared."; Static: browser confirm "Clear all saved records?", SR announce "Cleared. 0 saved records."; no flash, no undo | _clear_bookmarks_widget.html.erb; en.yml:40-42 | Both |
| B8 | Saved list | Clear cancelled | Edge | Cancel confirm | Nothing changes | as B7 | Both |
| B9 | Saved list | Clear fails | Sad | server error | Flash "Sorry, there was a problem clearing your saved records." | en.yml:43 | Rails |
| B10 | Save control | Save failed | Sad | network/server error on toggle | Stock Blacklight JS `alert("Unable to save the bookmark at this time.")` (browser alert, not themed); locale flash strings: "Sorry, there was a problem saving the record." / "...removing the record." | checkbox_submit.js:49,79; en.yml:46,52 | Rails |
| S1 | Save control | Unsaved default | Happy | card, mosaic, record page, list | Outline bookmark+plus icon, "Save", hidden text " record: <title>"; Static `button.ccs-save[aria-pressed=false]` | save_control_component.html.erb; nav.js:syncButton | Both |
| S2 | Save control | Saved | Happy | after click | Filled bookmark+check, "Saved", underlined; `aria-pressed=true` (Static) | save_control.css; save-button.css:30-47 | Both |
| S3 | Save control | Hover | Happy | pointer | Text underlined (offset 3px) both states | save_control.css:73; save-button.css:25 | Both |
| S4 | Save control | Focus | Happy | keyboard | Rails: label gets 2px `--ccs-focus-ring` outline; Static native focus; min-height 44px | save_control.css:78 | Both |
| S5 | Save control | Pending | Edge | during request | Rails: text "Saving…", `[disabled]` label cursor:progress. Static: none | save_control.css:29; en.yml:56 | Rails |
| S6 | Save control | Disabled / error | Edge | - | Disabled only equals pending (Rails). No error visual state; only alert (B10) | - | Both |
| S7 | Save control | No-JS | Edge | JS off | Rails: submit button "Save" (btn-outline-secondary) or "Remove". Static: no control at all | save_control_component.html.erb | Both |
| S8 | Save control | On dark banner | Edge | record banner | `.ccs-save--on-dark` white (Static); Rails `.record-summary__save` | save-button.css:56 | Both |
| N1 | Saved bar | Count 0 | Edge | any breadcrumb page; header strip on home | Link with plus icon, "0 saved records", class `site-nav__saved--empty` | saved_bar_component.rb | Rails |
| N2 | Saved bar | Count 1 | Happy | after first save | "1 saved record" (singular noun), check icon | en.yml:61-63; saved_bar_controller.js | Both |
| N3 | Saved bar | Count N / 999+ | Edge | many | Plural "N saved records". No "999+" abbreviation exists; raw number (Static max 500) | saved_bar_controller.js:update | Both |
| N4 | Saved bar | Live region | Happy | save/remove | Rails: `role=status aria-live=polite aria-atomic`. Static: `#ccs-bookmarks-status` sr-only "Saved: <title>. 3 saved records." / "Removed from saved records: <title>. N saved records." | saved_bar_component.html.erb:4; nav.js:170 | Both |
| N5 | Saved bar | Current page | Edge | on /bookmarks | `aria-current="page"` | saved_bar_component.html.erb:2 | Both |
| N6 | Saved bar | Mobile/tablet | Edge | <1024px | Rails: drawer placement (`--drawer`); Static: drawer item "0 saved records"; breadcrumb bar `saved-bar--breadcrumb`, header variant on home | nav.js:ensureBar | Both |
| P1 | Persistence | Session vs account | Happy | - | No accounts/login. Rails: guest `User` row on first save, session cookie 30 days; copy says "on this device". Static: localStorage `ccs-bookmarks-v1`, per browser | session_store.rb; bookmarks_controller.rb; nav.js:61 | Both |
| P2 | Persistence | Cookies blocked / private mode | Sad/Edge | - | Rails: list silently empty; no message. Static: localStorage errors swallowed; saves silently lost | nav.js:63-69 | Both |
| P3 | Persistence | Record no longer available | Sad/Edge | record removed from index | Rails: drops silently; count may exceed visible cards. Static: shows saved title or "Record <id>", no image/meta | index.html.erb; bookmarks.js:details | Both |
| P4 | Persistence | Solr down | Sad | - | `catalog/unavailable.html.erb` (not verified for /bookmarks) | views/catalog | Rails |
| X1 | Export/cite/share | none on saved list | n/a | - | Routes include `concerns :exportable` but no tool is rendered; no ordering control. Nothing to design. | routes.rb:19-24 | Rails |
| H1 | Search history | Empty | Edge | /search/search-history.html | "No searches yet. Searches you make will be listed here." | search-history.html:226 | Static |
| H2 | Search history | Populated | Happy | after searches | "Clear history" button + day headings ("Today", "Yesterday", "2 days ago"...), each term a link to ?q= | search-history.js | Static |
| H3 | Search history | Clear | Happy | button | `window.confirm("Clear your search history?")`, empties, empty state; no undo | search-history.js:27 | Static |
| H4 | Search history | Rails | Happy/Edge | /search_history | stock title; empty: h2 `no_history`; populated: btn-danger clear (Turbo confirm), day sections with striped table | search_history/index.html.erb | Rails |

Components used. Rails: `NexusCcs::SaveControlComponent`, `SavedBarComponent`, `PageBannerComponent`, `ResultCardComponent`
(list view), `Icons::BookmarkComponent`, `BreadcrumbComponent`/`PageBreadcrumbsComponent`, partials `clear_bookmarks_widget`,
`results_pagination`. Static: `.ccs-save`, `.saved-bar`, `.bookmarks-body__*`, `.bookmarks-list__item`, `.search-history-*`.

Rails vs Static differences: storage (guest DB row vs localStorage, 500 cap); list (full cards paginated vs compact rows);
clear (red button + Turbo confirm + flash vs text button + confirm + SR announcement); removal (card stays vs live removal with
focus management); save states (pending and alert vs none); empty copy differs; search history (stock table vs day groups).
Not found anywhere: export, cite on the list, sort, undo, 999+ abbreviation, unavailable-record message.
