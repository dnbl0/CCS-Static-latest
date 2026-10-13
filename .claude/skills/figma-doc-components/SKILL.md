---
name: figma-doc-components
description: Lead visual design and construction of design system documentation components in Figma, to the standard of Atlassian Design, IBM Carbon and Google Material. Use when the user is unhappy with how doc components look, are built, are named or cover too little, or asks to improve, add, remove or standardise them (page hero, section headers, specimen stages, anatomy, do/don't, token tables, state grids, navigation), and the page-level Patterns pages (component sets, page templates and a doc frame per page) including their scenario coverage audit and hand-offs between agents. Not for the product components being documented. Pair with figma-use for Plugin API mechanics.
---

# Design system documentation components

You are the lead visual designer for the documentation layer. The bar is the component pages of Atlassian Design, IBM Carbon and Material 3: a reader should feel the system is rigorous before reading a word. Craft comes first; process exists to protect craft.

## The benchmark (study before designing)
Open a Button or Text field page from each and write down, in your own words, what makes it good. Typical answers to confirm and then beat:
- **Atlassian**: calm, generous whitespace; a clear page title plus one-sentence purpose; tab row (Usage, Code, Design); each H3 owns a specimen; Do/Don't as image-over-caption cards with a coloured top rule; token tables with live previews.
- **Carbon**: strict 2x grid, tight type ladder, hairline rules instead of boxes, page navigation on the side, a live code specimen next to the guidance.
- **Material 3**: large, confident specimens on tinted stages; anatomy with numbered callouts at a size you can read; clear typographic contrast between hero, section, and caption.
Shared traits: one strong typographic voice, restraint with colour, specimens big enough to inspect, consistent rhythm, and tables that read like instruments.

## Visual design principles (the real work)
1. **The specimen is the hero.** Every part that shows a component gives it a stage at least 240px tall, with the component at a legible scale (200% for small controls; label "Shown at 200%"). A stage that collapses to a hairline is a defect. Light stage on a neutral tint; Inverse stage on the system's own inverse surface.
2. **Hierarchy through type, not boxes.** Page title (largest, display face) > H2 > H3 > body > caption/code. Separate sections with space and a single hairline rule, not nested bordered cards. Maximum two levels of containment anywhere.
3. **One rhythm.** Choose a 4px base and an 8/16/24/32/48/64 scale. Section gap 64, subsection gap 32, element gap 16, tight 8. Align to a 12-column grid at 1280 content width; prose max 65ch (~720px).
4. **Colour carries meaning, not decoration.** One structural accent (markers, active tab, links). Semantic colours (success/Do, danger/Don't, warning, info) used only for those meanings, each paired with an icon and a word. No decorative gradients behind content; the hero may carry brand shapes.
5. **Make numbers instruments.** Token tables, spec rows and state grids use tabular figures, mono for values, aligned columns, a visible preview column, and row hairlines. Alignment errors of 1px are visible; fix them.
6. **Anatomy you can read.** Markers 24px, leader lines 1px, no overlapping labels; legend in two columns beneath, marker number + name + one-line description. The specimen is large enough that the leaders do not cross the label.
7. **Interaction states shown, not told.** States grid: Default, Hover, Focus, Active, Disabled, Error (as applicable), each a live instance with a caption; Focus rendered with the real ring.
8. **Dark mode parity.** Every part works on Inverse with equal polish, using variable modes where possible.
9. **Restraint.** Spend boldness once, on the page title and hero. Sentence case, no all-caps eyebrows (except where the system's own Tag style requires), no more than two weights per part.
10. **Accessible by default.** Text 4.5:1, UI and focus 3:1; touch targets 44px on interactive doc parts (tabs, links, feedback buttons); no colour-only meaning.

## Process (protects the craft)
Each phase has an exit check. Do not skip.

### Phase 0. Set up
- Load `figma-use` before any `use_figma`. `ListAgents` and message the owner of the page; one writer per page.
- Never overwrite in place. Work in a clearly named exploration page or duplicate; keep the original as rollback.
- Look for existing work first (exploration pages, half-migrated masters). Reuse good decisions; do not restart blindly.

### Phase 1. Audit (read only)
Screenshot the page at full size and each master at 100%. Produce one row per master:

| Part | Pages using it | Variants | Copies | Unbound values | Visual score | Construction score | Naming score | Verdict |
|---|---|---|---|---|---|---|---|---|

Collect with `findAllWithCriteria(['COMPONENT','COMPONENT_SET'])`; count unbound padding, gap, radius and raw fills outside instances; find page-specific copies (names like `Doc / X / <Page>`); count instances per master per page (fan out one `use_figma` per page). Look at the screenshots and write a design critique per part: hierarchy, stage size, rhythm, alignment, legibility, restraint.
Red flags seen in this file: Do/Don't specimen stages collapsing to a rule; anatomy specimens at 100% so small the callouts collide; 24+ page-specific copies of Do/Don't cards and Anatomy; two competing token-row families; hand-rolled spacing in Tab bar, Status label and Feedback footer; masters spread across four sections.
Exit: every part has a verdict (Keep, Fix, Merge, Replace, Remove) and the user has seen the table.

### Phase 2. Design direction
Explore two or three directions on a dedicated page as full-page mockups of one real component page (e.g. Button), not isolated parts. Compare against the benchmark. Recommend one, decide, and report; ask only about taste calls that change the page's character.
Exit: one chosen direction, with a one-page language spec: type ladder, colour roles, spacing scale, grid, stage styles, marker and rule specs.

### Phase 3. Rationalise the inventory
- **Merge** parts that differ only by content (Swatch row, Space row, Border row, Type style row, Token row, Token spec row become one `Token row` with a `Kind` variant and a preview slot).
- **Merge** near-duplicates (Guideline card + Do/Don't card; Principle card + Sample card; Part + Section header).
- **Replace page-specific copies** with the shared part plus slots (instance-swap for the specimen). A copy means the master lacked a slot.
- **Remove** parts with fewer than three uses unless irreplaceable.
- **Add** parts only where hand-built groups repeat or a benchmark pattern is missing.
Target set to aim for (the benchmark's anatomy of a component page):
Hero/Page header; Tab bar; Contents (on this page); Section header (H2) and Subsection header (H3); Prose; Note (info, warning, success); Specimen stage (Light, Inverse, sizes); Anatomy (stage, markers, legend); Do/Don't pair; State grid cell; Properties table row; Token row with preview; Accessibility row (role, keyboard, screen reader); Code block and Code chip; Status lozenge; Related list; Feedback footer.
Exit: approved target inventory (name, purpose, variants, slots, replaces).

### Phase 4. Build one part at a time (dependency order)
Atoms (Marker, Lozenge, Code chip) > Rows (Token row, State row, Table row) > Containers (Note, Stage, Do/Don't, Anatomy) > Navigation (Section header, Tab bar, Contents) > Page-level (Hero, Related, Feedback).
For each: write the anatomy and props first; build master with final names; bind every value; test at min, typical and max content (empty, one line, three lines, a very long word) at 360 and 1280 widths; screenshot against the benchmark; fix; mark Built.

### Phase 5. Migrate and prune
Swap instances page by page (`setProperties`, variant props first). Screenshot each page before and after. Delete copies and zero-use masters only after a usage check. Rename leftovers to the scheme. Keep the old page as `Archive YYYY-MM-DD` until the user signs off.

### Phase 6. Verify
Canvas arrangement and layout check clean (no overlaps, nothing out of bounds or clipped, labels clear); zero unbound values on doc masters; no detached instances; no `Frame N`; contrast checked; every master described with `documentationLinks`; the Doc components page documents itself using its own parts. Hand back: audit table, language spec, before/after screenshots, a change log, and the decisions you made.

## Construction standard
- All text is an instance of the system's Text component; every fill, stroke, padding, gap, radius and width bound to variables, including zero (`none`) tokens.
- Auto layout throughout; FILL for width, HUG for height, `minHeight` where text can wrap.
- Variation by variant props and instance-swap slots, not overrides; booleans start with `Show`; slots are `Slot: <what>`.
- Parts that cross Light/Inverse use variable modes first; if a variant is unavoidable, build it with Inverse=True from the start with identical property bindings.
- Every master has a description (purpose, props, when to use) and a documentation link.

## Naming
- Masters `Doc / <Part>`; sub-parts `Doc / <Part>: <Sub>`; variants `Property=Value`; layers by role (`Header`, `Stage`, `Marker`, `Legend`), never `Frame 12`, `Copy`, `v2`, `(old)`.
- Never encode the page in a master name (`Doc / Anatomy / Link` is wrong; use `Doc / Anatomy` plus a slot).
- Sections: `Doc parts` for masters, `Doc pages` for pages, `Archive` for retired work.

## Page layout and section modes (house rules)
- **The page frame has no padding and no gap.** Every full-width block owns its padding: `Doc / Section`, `Doc / Header` and `Doc / Feedback` each use the 64px `docs/page-padding` token on all sides (Feedback: sides only), so edges align without a padded parent. Page width 1344; inner content width 1216 (320 heading column + 64 gap + 832 content).
- **Page frames hold nothing but sections:** `padding = 0`, `gap = 0`, both bound to `space/none`; each child (`Doc / Header`, `Doc / Section`, `Doc / Feedback`) is FILL width. Spacing and background belong to the section, never the page.
- **Doc pages are assembled only from kit components.** No raw frames, rectangles or text. Layout wrappers are components too: `Doc / Bullet list` (16px gap, for bullets inside a 40px-gap section), `Doc / Stack` (8px gap, to stack specimens in one Do/Don't column), `Doc / Rule` (title, body, Guidance slot), `Doc / Principles`, `Doc / Figure`, `Doc / Stage`. If a pattern repeats and no component exists, build the component first, then repack the kit and run the layout check.
- **Do/Don't rules are one column.** `Doc / Guidance` stacks the Do specimen above the Don't specimen, each full width (832px) with its one-line reason, so wide evidence stays at true size. Never place Do and Don't side by side.
- **Rule evidence uses the Tablet variant (768px) at 100%** (it fits the 784px stage inside a 832px column). Use Mobile only when the rule is specifically about small screens (for example "reflow on small screens"), and say why in the caption. Use Desktop only when the rule needs it and scale it with a "Shown at N%" caption. Overview specimens (Variants, Building blocks) may still be rescaled to 45-50%.
- **Images and media always use the `aspect-ratio` component from the UoM Foundation Library** (already subscribed to this file; key `a8e551f34d853d62f44d966a35b2dc2c2e34a457`, `figma.importComponentSetByKeyAsync`). Never a grey rectangle or a hand-made image frame. Variants are ratios: 16:9, 1:1, 4:3, 3:2, 2:1, 21:9, 9:21, 1:2, 9:16, 2:3, 3:4; turn the `Label` boolean off in product designs. Pick the ratio from the code (`aspect-ratio` in CSS, otherwise the nearest ratio to the designed size), size the instance (`resize(w, h)` with h from the ratio), set FILL width where the parent is fluid, and report any height change on the parent. If the media is a bare coloured frame, give the frame an auto layout, clear its fill and put the instance inside it.
- **Section background property.** `Doc / Section` has a variant property `Background = White | Light | Inverse` (renamed from `Mode`):
  - White: `surface/default`, with a top hairline (`border/panel`) because adjacent white bands have no other separator.
  - Light: `surface/subtle` (grey), no hairline.
  - Inverse: `surface/brand` (UoM brand blue); heading column text switches to the inverse text variants. Do not set an explicit Inverse variable mode on the band itself; mixed tokens (Text tones are variants, not modes) go wrong.
  - Alternate White and Light down the page; use Inverse once, for emphasis (Related, a call to action).
  - A specimen stage must contrast with its band: `Doc / Stage` has `Surface=Light | White | Inverse`; use White on a Light band, Light on a White band.
- **Content gap inside a section is 40px**, bound to `docs/content-gap` (alias of the 40px primitive). Do not use 24px between blocks inside a section; 24px stays for tight groups inside a part (cards, rows).
- Related is a row of up to three cards (`Doc / Related` + `Doc / Related card`: category, title, one-line reason, link with arrow), placed in an Inverse or Light section. No bare link lists. No tabs, no metadata strip under the intro: the header is eyebrow, title and a two-line intro (max width 620px).

## University of Melbourne brand application (this file's brand)
Verified on about.unimelb.edu.au, the Gen 3 design system site and the main site:
- **Brand navy is `rgb(0, 15, 70)` = `surface/brand` (#000f46).** Use it for the Brand header and Inverse sections. `surface/brand-strong` (#000b34) is for stages and deep panels, not page bands.
- **Page header (dark):** full-width navy band, content left-aligned in a 620px column, white Fraunces H1 (48px, weight 400, 57.6px line height), Source Sans intro beneath, generous padding (64px). No decorative geometric shapes, gradients or illustrations; imagery, when used, is photography on the right half.
- **Headings on dark bands are white**, not cyan. Cyan (`#81daf5`) is an accent for links, focus and small markers only.
- **Type:** Fraunces for headings, Source Sans 3 for body and UI; sentence case; body 18px / 27px.
- **Mood:** calm, academic, high contrast, lots of space. Prefer a clear hierarchy over ornament.
- When asked to be "on brand", open two or three unimelb.edu.au properties in the built-in browser, read computed styles with `javascript_tool` (background, font, size, padding of the header) and match them to tokens; never invent brand colours.

## Canvas arrangement and layout QA (non-negotiable)
Every script that creates or moves a master, set or page ends with an arrangement pass and a layout check. A canvas with overlapping masters, labels colliding with neighbours, content outside its section, or clipped content is a failed deliverable, however good the parts look.

**Rules**
1. **Never place by guess.** Do not hand-type `x`/`y` for new masters (the cause of overlapping stacks of components). Append, then run the packing routine below over the whole container so every item is positioned from measured sizes.
2. **One purpose per container.** Masters live in `Doc kit` sections; pilot and example pages live in a separate `Pilot pages` section; archives in `Archive`. Never put a page-sized frame (1344 wide) in a section of small masters.
3. **Clearances.** 80px above every master for its name label; 200px gutter between items horizontally and vertically; 200px padding inside the section on all sides. Rows wrap at 3400px content width. Page-sized items (1344 wide) get a row of their own or two per row at most.
4. **Order masters deliberately** (page-level blocks, then content parts, then rows and atoms), not by creation order.
5. **Resize the section to its content** after packing (`resizeWithoutConstraints(maxRight + 200, bottom + 200)`); no item may sit outside, no large empty area beyond the padding.
6. **No overlap inside masters either.** Use auto layout for anything with a relationship; only free-positioned frames (annotation overlays) may use absolute coordinates, and they must be sized to contain every marker, leader and label (`clipsContent=false` only if nothing is actually outside the frame).
7. **Check text containment:** no text layer taller or wider than its frame's available space; wrapping text uses fixed width with `textAutoResize='HEIGHT'` (Text instances: Width=Fill) so nothing is cut off.
8. **Set wrappers** (`COMPONENT_SET` frames) are auto layout with bound zero radius and gap so variants never overlap each other or the set border.

**Packing routine (adapt order list per file)**
```js
const LABEL=80, GUTTER=200, PAD=200, MAXW=3400;
const items=[...section.children].sort((a,b)=>rank(a.name)-rank(b.name));
let x=PAD,rowTop=PAD,rowH=0,maxRight=0;
for (const it of items){ if(x>PAD&&x+it.width>PAD+MAXW){x=PAD;rowTop+=LABEL+rowH+GUTTER;rowH=0;}
  it.x=x; it.y=rowTop+LABEL; x+=it.width+GUTTER; rowH=Math.max(rowH,it.height); maxRight=Math.max(maxRight,it.x+it.width); }
section.resizeWithoutConstraints(maxRight+PAD, rowTop+LABEL+rowH+PAD);
```

**Layout check (run after every arrangement; all lists must be empty)**
```js
const overlaps=[]; const r=section.children.map(c=>({n:c.name,x:c.x,y:c.y,w:c.width,h:c.height}));
for(let i=0;i<r.length;i++)for(let j=i+1;j<r.length;j++){const a=r[i],b=r[j];
  if(a.x<b.x+b.w+GUTTER/2&&b.x<a.x+a.w+GUTTER/2&&a.y-LABEL<b.y+b.h&&b.y-LABEL<a.y+a.h)overlaps.push(a.n+' x '+b.n);}
const outOfBounds=r.filter(i=>i.x<PAD/2||i.y<PAD/2||i.x+i.w>section.width-PAD/2||i.y+i.h>section.height-PAD/2).map(i=>i.n);
// clipped: non-instance auto-layout frames with clipsContent whose in-flow children exceed the frame
```
Then take a section-level screenshot and a zoomed screenshot of each cluster; read them. Fix what you see, not just what the script reports (labels hidden by neighbours, cramped gutters, huge empty areas, specimens that are empty or clipped).

Also check **inside** pages: page frame children are exactly the page width, no horizontal overflow, no section content wider than its column, no text truncated, consistent left edge for the heading column across sections.

## Product section components (Sections: * pages) construction standard
The seven section sets (Site header, Page banner, Search banner, Results, Collection grid, Content section, Footer) are compositions of building-block sets (`<Section>: <Part>`) with `Breakpoint` x `Inverse` variants. Standard for every one:
- **Expose, don't detach.** Every nested building-block instance and every Title/Count/etc. Text instance directly inside a variant is `isExposedInstance = true`, so authors reach nested properties from the section instance.
- **One `Show <part>` boolean per optional block**, added on the set (`set.addComponentProperty`) and referenced from the same-named layer in every variant (`componentPropertyReferences = {visible: key}`). Required blocks get no toggle. Existing keys are reused (do not duplicate a property that already exists).
- **Descriptions** carry a `Props:` line listing variants, toggles and exposed instances; `documentationLinks` set.
- **Bind everything** (padding, gap, radius incl. zero) with the exact-value map; sweep building blocks too, not just the main sets (Footer: Group, Acknowledgement, Link groups hold most radii).
- **Verify with an instance test:** create a temporary instance per variant, set each `Show` property to false, assert the layer is hidden and the height collapses, then remove the instance.
- **Responsive rule for link lists:** horizontal rows hug content with a tokenised gap (24px); stacked rows on Tablet/Mobile stay full width for touch targets. Never fix the width of a text cell.
- Keep bindings the previous owner noted: Results sidebar spacing tokens; Footer bands on semantic surface tokens in Inverse mode.

## MCP-ready standard (so an agent can find, understand and use every part)
- **Description template on every master** (component or set, not variants): `Purpose:` one sentence; `Use when:` the trigger; `Props:` every variant, boolean and exposed text; `Slots:` each slot and what belongs in it (or `none`).
- **`documentationLinks`** on every master, pointing at the doc page or frame that documents it.
- **Real slots, not copies.** Use `component.createSlot()` for specimens, content and lists; name them for their content (`Specimen`, `Content`, `Parts`, `Meta`, `Do specimen`). Fill them on instances with `instance.findAllWithCriteria({types:['SLOT']}).find(s=>s.name==='X').appendChild(node)`. One slot property per set: build each variant with a slot of the same name before `combineAsVariants`.
- **Exposed text:** nested Text instances that authors edit are `isExposedInstance = true` and named for their role (`Title`, `Caption`); optional pieces get a `Show <thing>` boolean wired with `componentPropertyReferences = {visible: key}`.
- **Names are search keys:** one verb-free noun per part (`Doc / Header`, `Doc / Figure`, `Doc / Guidance`); no page names in master names; no duplicates left in the file after cutover.
- **Tokens, not values:** every padding, gap, radius, stroke and fill is a bound variable, including zero. If a doc needs a colour that has no semantic token (info, warning), add `docs/<role>` aliasing a primitive; never bind a primitive directly.
- **Inverse via variable modes:** an Inverse stage sets `setExplicitVariableModeForCollection(Color, Inverse)` on the stage frame; nested components still need their own Inverse variant.
- Run the audit at the end: per master, unbound padding/gap/radius, raw fills, raw TEXT nodes, generic layer names, description present, docs link present. All must be zero/true.

## Sizing and overflow rules (root causes of clipped text and collapsed layouts)
Found on 2026-10-12: table text clipped by 50px rows, a principle title overflowing its card, a Split banner whose content column collapsed to 64px, a footer row 24px too wide. All four had the same root cause: a sizing mode changed silently.
1. **`resize()` makes both axes FIXED.** Call it first, then set `primaryAxisSizingMode` / `counterAxisSizingMode` back to `'AUTO'` on the axis that must hug. Never call it last. After every `resize()` on an auto-layout frame, read the modes back.
2. **Changing `layoutMode` flips the sizing modes** (primary and counter swap meaning). After turning a VERTICAL frame HORIZONTAL (or the reverse), reset the width and height modes explicitly (fixed width, hug height for a band).
3. **Anything that can hold wrapping text hugs vertically.** Use `minHeight` (not a fixed height) to keep a designed size: set `AUTO` on the vertical axis and `minHeight = old height`. Fixed heights are for token-bound control heights (buttons, inputs) and decorative shapes only.
4. **Text in a fixed-width container uses the Fill-width Text variant** (`Width=Fill` plus `layoutSizingHorizontal = 'FILL'`), never Hug, or long strings overflow instead of wrapping. Applies to card titles, section titles, callout titles, table cells, captions.
5. **Rows that must touch (table rows, bullet lists) live in a zero-gap wrapper** (`Doc / Table`, `Doc / Bullet list`), never directly in a section slot, which applies the 40px content gap.
6. **Equal-height cards in a row:** set each card `layoutSizingVertical = 'FILL'` inside a hug-height row.
7. **Width of a variant root is FIXED to its breakpoint** (1440, 768, 390). Do not leave a variant root on hug width.
8. **Changing a nested instance's variant resets its text overrides** everywhere that master is used. Snapshot every `Title` (or affected) text by node id first, edit the master, then restore from the snapshot, and verify the count restored.
9. **Moving an instance between slots invalidates its node ids.** Do not set properties on a moved node; create a fresh instance in the target slot, copy the text, then delete the old one.
10. **Run the detector after any build** (all lists must be empty), including inside instances on pages:
```js
// flags auto-layout frames whose in-flow children need more room than the frame has
const chk=(n,root)=>{ if('layoutMode' in n&&n.layoutMode!=='NONE'&&n.layoutWrap!=='WRAP'&&n.type!=='SLOT'&&n.visible!==false){
  const k=n.children.filter(c=>c.visible!==false&&!(('layoutPositioning' in c)&&c.layoutPositioning==='ABSOLUTE')); if(k.length){ const g=n.itemSpacing*(k.length-1);
  const needH=n.layoutMode==='VERTICAL'?n.paddingTop+n.paddingBottom+k.reduce((a,c)=>a+c.height,0)+g:n.paddingTop+n.paddingBottom+Math.max(...k.map(c=>c.height));
  const needW=n.layoutMode==='HORIZONTAL'?n.paddingLeft+n.paddingRight+k.reduce((a,c)=>a+c.width,0)+g:n.paddingLeft+n.paddingRight+Math.max(...k.map(c=>c.width));
  if(needH>n.height+1.5||needW>n.width+1.5) bad.push(root+' > '+n.name);} } if('children' in n) n.children.forEach(c=>chk(c,root)); };
```
    Also list masters whose vertical sizing is FIXED, height is not token-bound and that contain Text: each must be a deliberate control height.
11. **Sweep the whole file in one script** by looping page ids (`setCurrentPageAsync` per page) when the work is read-only or a mechanical fix; it is much faster than one call per page.

## Matching the code (do this before documenting or changing a component)
- Read the Rails component (`ead-ccs-test/app/components/nexus_ccs/*_component.rb` and `.html.erb`) and the CSS (`public/styles/components/*.css`, `ead-ccs-test/app/assets/stylesheets`) first. The code decides which variants exist, the spacing, the type sizes and the breakpoint (here 768px and below is "mobile").
- Record code gaps in the doc instead of hiding them: what the static site has that Rails lacks (Split banner, mobile back-link breadcrumb) and what Figma had that the code never did (an action button in the plain banner).
- New layouts become a `Layout` variant property on the existing set (clone a variant, rename it with all property values, `appendChild` it into the set); never a separate near-duplicate component.

## Page-level Patterns pages (waves, coverage, hand-offs)
Each `Patterns: <Area>` page holds three things: the component sets, the page templates built from them, and one doc frame built only from doc-kit parts. Plan and scenarios live in `docs/page-level/PLAN.md` and `docs/page-level/scenarios-*.md`; the library audit is `docs/figma-library-audit-2026-10-12.md`.

**Waves**
- **A, build:** one agent per page (one writer per page). Each reports page id, doc frame id, set ids, and counts.
- **B2, coverage audit (before B1):** for every scenario ID in `scenarios-*.md`, record one of: a drawn stage (frame id), or a behaviour-only reason (one line why a still cannot show it). No ID is left blank. Recount from the file, never from an agent's report: a report said "32 shown and 10 behaviour-only" beside a list of 30 plus 12.
- **B1, fill gaps:** add only what the audit found missing (for example a global patterns page). Do not build speculative extras.
- **C, consistency:** one pass over all pages for naming, rhythm, section backgrounds and the shared-set reuse below; add a `Pages: Index` page; update this skill and the memory notes; write the final report.

**Rules**
1. **Shared scenarios need one named owner.** When two pages could cover the same scenario (for example the leaving-site dialog, R10 and R14), the plan assigns it to one agent in writing. Two agents each assuming the other covered it is the known failure. Verify the hand-off in the audit.
2. **Reuse before drawing.** Before drawing a pattern, search the other Patterns pages and the doc kit for a set that already does it, and instantiate that. A drawn copy on a page template (for example an Acknowledgement modal on Home) is swapped for the shared Dialog set. Cross-page instances (Notice, Empty state, Skeleton parts) are rechecked after the owner changes the set.
3. **Templates are checked at their real widths.** Run the overflow detector at 360 and 1280 on every page template. A child wider than its parent by even 2px (an Arrow link at 360 in a 358 column) is a defect, not rounding.
4. **Anatomy markers never touch text.** After placing markers, compare each marker's bounding box with every text layer's in the specimen and move the marker or the leader until none intersect:
```js
const hit=(a,b)=>a.x<b.x+b.width&&b.x<a.x+a.width&&a.y<b.y+b.height&&b.y<a.y+a.height;
const bb=n=>n.absoluteBoundingBox; const bad=[];
const inside=(n,root)=>{ for(let p=n;p;p=p.parent) if(p===root) return true; return false; };
const markers=stage.findAll(n=>n.name.startsWith('Marker')); const texts=stage.findAll(n=>n.type==='TEXT'&&n.visible!==false);
markers.forEach(m=>texts.forEach(t=>{ if(!inside(t,m)&&hit(bb(m),bb(t))) bad.push(m.name+' x '+t.characters.slice(0,30)); }));
// bad must be empty; legend text is outside the stage, so it is not checked here
```
5. **Layout QA is mandatory on every Figma change** (packing routine, overlap, out-of-bounds and clipping checks, then read the screenshots). A change without it is not finished.
6. **Verify another agent's numbers before building on them:** node ids resolve, counts match the file, screenshots exist for what the report says was fixed.

**Approximations ledger.** Doc pages sometimes have to approximate: nearest-token snaps (for example 14px to 12px; 20, 56, 72, 80, 120px padding), specimens rescaled with a "Shown at N%" caption, dialog fields drawn as frames instead of the Input component, image heights that differ from the CSS, text styles that are nearest matches. Allowed only if listed. Keep a table in the final report (Where, Wanted, Used, Why, Fix when) so the next agent can retire each item, and prefer adding the missing token or variant over snapping.

**Hand-off file.** When stopping, rate-limited or not, write `docs/` or a session file with: context and branch, ids (pages, doc frames, sets) in a table, what is done, what remains in order, open decisions for the user, files not to commit (`.claude/settings.local.json`, `CLAUDE-azure-deploy.md`), and the known approximations. Say what was not re-checked. Per `CLAUDE.md`, announce hand-offs to other agents and keep secrets out.

## Gotchas
- Name lookups by `findAll(n=>n.name==='Text')` also match the inner TEXT layer; filter on `type==='INSTANCE'` before calling `findOne`.
- `layoutPositioning='ABSOLUTE'` only works inside an auto-layout parent; in a plain frame children are already free-positioned.
- Thumbnails from `get_screenshot` can be stale right after edits to slot content; confirm with `node.screenshot()` inside `use_figma`.
- A `use_figma` script that throws leaves nothing behind (changes roll back), but still make the first lines idempotent (remove earlier attempts by name).
- Text variants are sparse (for example Display exists only for Primary/Inverse, Caption has no Fill width); write a helper with a tone and width fallback list.
- Instances cannot resize nested layers; bake geometry into variants. A boolean cannot reach into a nested instance; put visibility on the owning part.
- Specimen frames inside instances cannot take children; use slots (not instance-swap) for arbitrary content.
- A hidden override beats its boolean; toggle off and on to clear. `figma.skipInvisibleInstanceChildren = false` before queries.
- New frames start with radius 0 and padding 0 unbound; `createComponent` frames start at radius 5; run a bind pass. Rewrite strokes after rebinding (cached colour).
- `swapComponent` on nested instances wipes text overrides.
- Figma MCP has an account call limit: batch scripts, 2-3 parallel agents at most.

## Library integration (UoM Foundation, Component, Asset, Utility)
- **Apps first.** Before adopting any library component, read the Rails component and the CSS. Skip a library item that changes what the apps render (library inputs, tags and notification bar drift; see docs/figma-library-audit-2026-10-12.md).
- **Alias, do not copy, tokens that match.** Alias a local primitive to a Foundation variable only when the resolved value is identical. Procedure: import the library variables (`teamLibrary.getAvailableLibraryVariableCollectionsAsync` then `importVariableByKeyAsync`), snapshot every resolved value (all modes) in the file, apply `setValueForMode(modeId, {type:'VARIABLE_ALIAS', id})`, snapshot again, compare as 8-bit colours and plain numbers, and roll back automatically on any difference. Compare alpha too (`white/090` is not white). Split big imports across calls (one call with 340 imports and two snapshots dropped the MCP connection).
- **Aliasing semantic colours:** Default mode only; Inverse mode needs a per-value check because the library uses `-inverse` tokens, not modes.
- **Library files are read-only for `use_figma`:** list pages with `figma.root.children`, read a page with `get_metadata`, but `setCurrentPageAsync`, `loadAsync` and edits fail. Enumerate components with `search_design_system` (one batch, max 20 queries, add `includeLibraryKeys`) and inspect them by importing into the CCS file.
- **Utility Library** (Cover, Changelog, Note types, status tags, table cells, pointers and flow arrows) is documentation-only and safe to use. `Changelog` must be detached to add or remove entries; `.base/*` components are not published.
- **Asset Library:** use the logo components as instances (never redraw the crest); icons stay on the apps' own SVG set.
- **When the library lacks the app's pattern** (Pathfinder tile, Alert), build it from the CSS values with local components; if a Text variant is missing, clone the nearest one, rebind the fill, and re-link `componentPropertyReferences` to `Text#11:0` (a clone loses the link).
