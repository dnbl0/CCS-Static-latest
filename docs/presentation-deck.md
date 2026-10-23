# CCS workflow presentation: guide for agents

How to change `CCS-Workflow-Presentation-DeanNoble.pptx`, the 15-minute SXD showcase deck at the root of this
repository, without breaking its story, its UoM Design System styling or its timing. Read this whole file before the
first edit. The person who owns the deck is D (Dean Noble); the deck is theirs, so a change they did not ask for is
a proposal, not an edit.

## Files

| File | What it is |
| --- | --- |
| `CCS-Workflow-Presentation-DeanNoble.pptx` | The current deck. The only one to edit |
| `CCS-live-demo.mp4` | 41-second recording of the live demo (slide 14), the backup if the network fails |
| `UoM-Slide-Shell/tools/pptx_lib.py` | Python helpers for editing slide XML by shape name (positions in inches) |
| `UoM-Slide-Shell/UoM_Slide_Shell.pptx` | The UoM slide template the deck descends from |
| `CCS_Design_and_Build_Workflow.pptx`, `CCS_Workflow.pptx`, `UoM-Slide-Shell/CCS_Designer_Playbook.pptx` | Earlier decks: source material only, never edited |

## Steps

1. **Check for other agents** (rule 1 of `CLAUDE.md`) and tell them you are editing the deck.
2. **Work on a copy.** Note the deck's modified time, copy it, and edit the copy. If the deck's modified time has
   changed when you save, D has edited it: stop and merge, never overwrite their version.
3. **Find the slide** in the running order below, and the shapes on it by name (`Text 4`, `Shape 2`, `Image 0`).
   `markitdown deck.pptx` lists the text; the pptx skill's `thumbnail.py` shows the layout.
4. **Edit the slide XML** (unzip, edit `ppt/slides/slideN.xml`, zip from inside the folder), keeping every
   design rule and content rule below. File names (`slide40.xml`) are not slide positions; the order lives in
   `<p:sldIdLst>` and the sections in `p14:sectionLst` in `ppt/presentation.xml`.
5. **Keep the bookkeeping true:** page numbers (main 1–20, then A1–A4 and B1–B11), section names, the agenda's
   minutes, and the first line of each slide's speaker notes ("About 40 seconds.").
6. **QA until clean** (checklist at the end). Done means every item passes, not that the file opens.

## Running order

The order follows the six parts of the showcase brief. Main slides total about 14 minutes of speaker notes, leaving
5 minutes for questions. Adding a main slide means merging or moving another one to the backup section.

| # | Slide | Brief section |
| --- | --- | --- |
| 1 | From prototype to working app (title) | Opening |
| 2 | Agenda and Acknowledgement of Country | Opening |
| 3 | One search across the collections | 01 The problem |
| 4 | Test real behaviour early | 01 The problem |
| 5 | How I designed and built it (divider) | 02 Approach |
| 6–11 | Six stages · Scope · Design · Data · Build, review and release · Toolkit | 02 Approach |
| 12 | Three findings shaped the build | 03 Insights |
| 13–14 | Four things, ready to hand over · Live demo | 04 Delivered |
| 15–17 | 16 days, by the numbers · Outcomes · Resolving defects | 05 Impact |
| 18–19 | What surprised me · Four steps to launch | 06 Reflections and next |
| 20 | Try it on your next project (questions) | Close |
| A1–A4 | How-to guides: Jira, Figma, GitHub, instructions and skills | Appendix |
| B1–B11 | Backup: guardrails, Figma boards, data model, EMu, Vernon, Word documents, pull request, Blacklight, connectors, do's and don'ts, sources | Appendix |

## Design rules

The deck follows the UoM Design System (`uom-design-system-main/README.md`, designsystem.web.unimelb.edu.au).

- **Type:** titles Fraunces 36 pt navy; card titles Fraunces 20 pt; big numbers Fraunces 28–48 pt; everything else
  Source Sans 3. Body text 18 pt, card descriptions 16 pt, dense diagram rows and tags 12–14 pt, captions and
  footers 12 pt. Eyebrows are 12 pt bold teal capitals, letter-spaced, in the form `NN · SECTION · DETAIL`.
- **Box height:** every text box is at least lines × size × line spacing tall (18 pt at 1.3 spacing = 0.33 in a
  line). A shorter box makes PowerPoint shrink the text, which defeats the size rules; enlarge the box or cut words.
- **Colour:** navy `000F46`, teal `1F7593` (eyebrows, numbers, links), cyan `46C8F0` (accents on navy only), ink
  `222633`, grey `5A5F6E`, pale `C9D3EA` (text on navy), band `E6EFF2`, orange `A4471C` for risk only.
- **Surfaces:** slide background `F4F4F4`, cards white `FFFFFF` with a `DDDDE7` border and 4 px corners, square
  tags. One dark (navy) card per row at most, on the point the slide is about.
- **Role tags:** one style per actor everywhere, with the legend on slides 6 and 10: You lead = navy fill, Claude
  builds = `CDEEF9` fill, You + Claude = white with a teal outline, Automatic = `F4F4F4` with a grey outline.
- **Frame:** 0.67 in side margins; eyebrow at 0.67 in and title at 1.01 in from the top; footer
  `Cultural Collections Search · SXD Showcase, October 2026` at 6.93 in; a source line, when a slide has one, sits on
  its own line at 6.62 in; page number right-aligned at 12.67 in.
- **Images:** real project artefacts only (screenshots of the live app, Figma, Jira, GitHub, collection photos),
  cropped to the part the slide talks about and never cut mid-sentence. Every image has specific alt text.

## Content rules

- **Facts come from the project's sources,** never memory or invention: the round two usability report, the
  Phase 1 discovery report, the Jira board (label `CCS-2026`), the field labels and filters workbook, the EMu and
  Vernon exports, `docs/` and the git history. Quotes are participants' own words from the usability report.
- **Canonical numbers:** about 41,000 records (29,748 EMu, 11,214 Vernon); 16 days, 29 September to 14 October
  2026; 336 commits; about 230 reviewed pull requests; 9 participants; about 30 records with images; about 12,700
  with no date; 36 restricted Vernon records. Write "about 41,000" everywhere.
- **Open fact:** the developer-access date (slide 15 shows 14 October) is unconfirmed. Ask D before stating it
  anywhere else.
- **Voice:** UoM sentence case, plain English, no emoji, second person for the audience. Keep the story high level
  for a cross-SXD audience; developer detail belongs in the backup slides.
- **Links:** live app `https://ccs-web.redflower-fdae30a9.australiaeast.azurecontainerapps.io/` · code
  `https://github.com/Enterprise-Services-Group/CCS-2026-MVP` · Figma boards
  `https://www.figma.com/design/efuChltynfWhqmgSd2jtG1/2026-MVP-user-stories` · Jira
  `https://unimelb.atlassian.net/jira/software/c/projects/CCS/boards/6889?label=CCS-2026` · UoM Design System
  `https://designsystem.web.unimelb.edu.au/` · UoM CMS documentation `https://www.unimelb.edu.au/web`. A change to a
  link also means a new QR code on slides 13 and 20 (`segno`, navy on white).

## Editing mechanics

- Find shapes by `name`; `pptx_lib.py` has `set_text` (keeps formatting), `set_size`, `geom` (inches), `textbox`,
  `tag`, `picture` and `Deck.dup` / `Deck.set_order` for copying and ordering slides with their notes.
- Parse or edit XML with string or `defusedxml` operations; `xml.etree` rewrites namespace prefixes and corrupts the
  file. Leave the order of the children of `<p:presentation>` as it is.
- After deleting slides, run the pptx skill's `clean.py` on the unpacked folder, then zip from inside it.

## QA checklist

- [ ] `validate.py deck.pptx --original <previous copy>` passes.
- [ ] Rendered every changed slide to an image (pptx skill: `soffice.py` to PDF, `pdftoppm`) and looked at it: no
      shrunk or clipped text, no overlaps, nothing in the bottom 0.6 in but the source line and footer.
- [ ] `markitdown deck.pptx` shows no leftover text from a copied slide, no "This week", no old footer
      ("A designer's playbook").
- [ ] Page numbers, sections, agenda minutes and the speaker-note timings match the running order, and the main
      slides' timings still total 15 minutes or less.
- [ ] D has been told what changed, slide by slide, and any fact that still needs their confirmation.
