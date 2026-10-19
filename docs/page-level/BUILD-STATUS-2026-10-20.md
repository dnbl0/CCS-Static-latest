# Edge cases and error scenarios: what is built, what is next

Date: 2026-10-20. Inputs: the scenario catalogues in this folder (about 230 scenarios, `PLAN.md` section 5 "Gaps"), a hostile-address sweep of the
Rails app, and research into the University's own patterns.

## 1. Research: what the University's patterns offer

| Source | Finding | Used for |
|---|---|---|
| Gen 3 design system (designsystem.web.unimelb.edu.au) | Components: Accordion, Card, Filtered listings, Loading animation, Modal, Page header, Pathfinder, Preview banner, Search, Tags, In-page navigation and others. **No error page, notification or form-validation component.** Modal: trigger link plus `modal__dialog`, close button added automatically, closes on overlay click (focus handling not documented). Accordion: unique ids "required for accessibility", `data-single-focus`, URL hash opens an item. Loading animation: a loader and a white loader. Preview banner: a CMS preview notice, not a general site notice | Page banner and arrow link (error pages); Modal and Accordion already in use |
| CCS Figma file (UoM libraries) | A **Notification bar** (error status: tinted red surface, red border, 24px error icon, 20px title, 18px body) and the **Page banner** | Advanced Search "There is a problem" notice; error page banner |
| unimelb.edu.au live error and no-results pages | Not read: the site answers automated browsers with a Cloudflare bot check, which is not bypassed. A UoM Law School 404 (seen in a search summary, not verified here) apologises, says to check the address, and links to the home page, search and "report a problem" | Error page wording: what happened, what to do, where to go, how to reach the team |
| Non-University references for the error page's shape | GOV.UK and Digital.gov 404 patterns: a heading, a lead giving the cause, possible fixes, links, a support route, a small error code; plain language, no humour, no blame | Structure of `errors/show.html.erb` |

Gap in the research: the University's live error and no-results copy could not be read. If someone can open unimelb.edu.au in a normal browser, the 404 and "no search results" pages are worth comparing with `errors/show.html.erb` and `_zero_results.html.erb`.

## 2. Built in this change (Rails app)

| Scenario (catalogue id) | Before | Now |
|---|---|---|
| E404, E404r unknown address or record | Stock Rails page, no site header or footer, "check the logs" text | Branded page in the site chrome; a record address gets record wording ("We can't find this record") |
| E500, E422, E400, E406 | Stock pages | Same branded page with its own title, lead and way out; 500 offers "Try this page again"; no detail is ever shown |
| Error page cannot itself be drawn | n/a | The stock file in `public/` is sent for that status |
| E400 broken `%` encoding | 400 | Still a 400, now branded: the forwarded request's query string is cleared, otherwise the error page fails the same way and Rails sends a bare 500 |
| P: advanced-search row for an unknown field (`clause[0][field]=nope`) | **500** | The row is ignored and the search runs |
| N5: From year later than To year in the URL | Bare 406 | The date range is dropped, the search runs, and an alert says so |
| NJ JavaScript off | No message; menu and search pop-up silently dead | A note at the top of every page: what does not work, with links to search and browse |
| Hostile addresses (61: paging, per_page, odd encodings, 5,000-character queries, bad filters, facets, bookmarks, history) | One 500, one bare 406 | None answer 500 (`test/integration/hostile_urls_test.rb`) |

Tests: `test/integration/error_pages_test.rb`, `hostile_urls_test.rb`, `test/system/edge_cases_test.rb`.

## 3. Next, in priority order

1. **Restricted or withdrawn record** (catalogue R22): a record that exists but may not be shown; today only "not found". Needs a data decision (which field marks it).
2. **Save control failure**: replace the browser `alert()` with an inline message under the Save button; add a message when cookies are blocked (saving needs the session cookie).
3. **Saved list**: the card stays until reload after Remove; an undo.
4. **Zero results and spelling copy**: compare with the University's search results wording once it can be read (section 1).
5. **406 unsupported browser** page: still the stock file (the framework blocks it before the app runs); restyle the file.
6. **Maintenance and offline pages** (catalogue EM): do not exist; copy needs the business.
7. **Static prototype**: no 404 page at all, and "Record not found" only on the record template; give it the same error page.
8. **Figma**: draw the new error page as `Error page` specimens in the Patterns: Feedback page (catalogue Wave A1).
