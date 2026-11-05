# Screen reader test script (CCS-51, WCAG 2.1 AA)

For a person with VoiceOver or NVDA. Automated checks and a pass over Chrome's accessibility tree are already done (see "Already
checked"); this script covers what only a real screen reader can confirm. Allow about 45 minutes per pairing.

Site: https://ccs-web.nicebay-19f9959b.newzealandnorth.azurecontainerapps.io (the VM sleeps 00:00-06:00 Melbourne time).

## Pairings (minimum)

| Screen reader | Browser | Notes |
|---|---|---|
| VoiceOver (macOS, Cmd+F5 to toggle; VO = Ctrl+Option) | Safari | Rotor: VO+U. Next heading VO+Cmd+H, link VO+Cmd+L, form control VO+Cmd+J |
| NVDA (Windows, Ctrl+Alt+N to start; NVDA key = Insert) | Firefox | H headings, D landmarks, F form fields, K links, NVDA+F7 elements list, NVDA+Space toggles browse/focus mode |
| VoiceOver (iOS) | Safari | Phone layout: Menu, Filters drawer. Swipe right/left, double-tap to activate |

Record for each run: reader and version, browser and version, OS, and anything not tested. Commands vary with keyboard layout and
settings, so check them against your setup.

## Scripts (pass = what you hear matches the "Expect" line)

1. **Home `/`**
   - On load, expect the page title, then Tab once: a "Skip to ..." link; activate it and focus lands in the main content.
   - Landmarks (D / rotor): banner, navigation (Primary, Breadcrumb), main, contentinfo. No unnamed duplicates.
   - Headings (H / rotor): one h1, then h2s in order; no skipped levels.
   - Acknowledgement of Country dialog (first visit, clear the `country_acknowledged` cookie): focus moves into it, background not
     reachable, Continue closes it and focus returns to the page.
2. **Search `/catalog`**
   - Search field: announced as "search for", combobox, with the "Search in" menu named by its label then value.
   - Type `sku`: expect a list of suggestions announced as expanded; Down Arrow reads each option; Enter searches.
   - Header search icon: dialog opens, focus in its field, Tab stays inside, Escape closes and focus returns to the icon.
3. **Results `/catalog?q=skull&any_assets=1`**
   - Heading structure: h1 "Search", h2 "387 results for ...", h3 per result.
   - After activating a link or filter, focus moves to the new page's heading and it is read (WCAG 2.4.3).
   - Result links: many records share a title (for example "Dog skull"); check the surrounding card text gives enough context.
   - Pagination: "page 1 current" is announced; Next/numbers are named.
   - Filters: each facet is a button announcing expanded/collapsed. In "Creator Name" activate "Show more": expect a dialog named
     "Creator Name", focus inside, Escape closes, focus returns to "Show more".
   - Loading: apply a filter on a slow connection; the results region should be marked busy and the new count read on arrival.
4. **Phone (iOS VoiceOver, or a 390px window)**
   - Menu button announces expanded/collapsed and opens a drawer; the page behind is not reachable.
   - Filters button opens a dialog named "Filters" (see #152); the page behind is not reachable; Close and Escape return focus to
     Filters. Open a facet's "Show more" from inside the drawer: its dialog is usable.
5. **Advanced Search `/catalog/advanced`**
   - Every field is read with its label; the "all/any" menu reads as part of the heading sentence; submit with an empty form and
     check any notice is announced (role alert) and focus moves to it.
6. **Help, Search tips, Contact**
   - Heading order, link purposes ("Email ..." not "click here"), the jump navigation on Help moves focus to the section.
7. **Record page (open any result)**
   - Heading and landmark structure; field labels and values read in pairs (definition list or table headers associated).
   - Copy permanent link: expect a status announcement ("Copied").

## Report

For each failure: page, step, what was heard, what was expected, reader/browser. File against CCS-51.

## Already checked (2026-11-05)

axe-core 4.10 (WCAG 2.0/2.1 A and AA) on 9 pages with no violations; landmarks, headings, accessible names, alt text, no
positive tabindex, live regions, autocomplete combobox, loading `aria-busy`, search overlay, facet dialog, phone Filters drawer
(role, name, focus trap, Escape, focus return) read from the live site in Chrome. Pairings above and spoken output are **not**
checked: that is what this script is for.
