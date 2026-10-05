# Cultural Collections Search - Design System Documentation

**Project**: Cultural Collections Search (CCS) | **Institution**: University of Melbourne  
**Design System**: UoM Gen 3 v15.14.0 | **Version**: 2.4 | **Date**: 2026-10-01  
**Status**: Prototype (no formal accessibility audit) | **Codebase**: Static pages under `public/`

---

## Quick Reference

**Files Location**: See `README.md` (Repository layout)  
**Styles**: `public/components/fig-tokens.css` (tokens only), `public/styles/components/*.css` (breadcrumbs, focus, page-banner, licence-badge, search-bar, collection-hero), `public/components/fig-assets.css`, `public/styles/home.css` (Navigation + Section components), `advanced-filters.css` (form components), `header.css` (search overlay + colour variables), `collection.css`, plus page-local `<style>` blocks  
**Bootstrap**: `public/styles/vendor/bootstrap-uom.min.css` (5.3.3, built locally from `src/scss/custom-bootstrap.scss` with `npm run build:css`)

---

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Typography System](#typography-system)
3. [Component Library](#component-library)
4. [Layout Grid & Spacing](#layout-grid--spacing)
5. [Responsive Design](#responsive-design)
6. [Color Usage](#color-usage)
7. [Interactive States](#interactive-states)
8. [Accessibility Standards](#accessibility-standards)
9. [Page Templates](#page-templates)
10. [File Organization](#file-organization)

---

## Design Tokens

### Color Palette

All colors follow the University of Melbourne Gen 3 Design System official palette.

**Where tokens live**: `public/components/fig-tokens.css` carries the Gen 3 tokens (for example `--col-heritage-100` = `rgb(0 15 70)` = #000f46, `--col-btn-action-bg: #46c8f0`). Each page also declares its own `:root` overrides in an inline `<style>` block (`--col-bg-primary`, `--col-bg-accent`, `--col-text-muted`, ...), and values differ slightly between the tables below and those blocks (for example `index.html` sets `--col-bg-primary-dark: #000b34` and `--col-bg-primary-hover: #213e5d`). Treat the page-local `:root` block as authoritative for that page. In `fig-tokens.css`, `--col-bg-accent` is a blue-dark token, whereas the pages' local `--col-bg-accent` is the sage `#abc1a7`.

#### Primary Colors

| Token | Hex Value | Usage | RGB | HSL |
|-------|-----------|-------|-----|-----|
| Primary Navy | #000f46 | Headers, buttons, text | 0, 15, 70 | 225°, 100%, 14% |
| Primary Navy (Dark) | #000a32 | Gradients, dark variant | 0, 10, 50 | 225°, 100%, 10% |
| Primary Navy (Hover) | #001a66 | Hover states, focus | 0, 26, 102 | 225°, 100%, 20% |

#### Secondary Colors

| Token | Hex Value | Usage | RGB | HSL |
|-------|-----------|-------|-----|-----|
| Accent Green | #abc1a7 | Buttons, accents | 171, 193, 167 | 101°, 19%, 70% |
| Accent Green (Light) | #dde5d6 | Backgrounds | 221, 229, 214 | 99°, 29%, 86% |

#### Text Colors

| Token | Hex Value | Usage | Contrast (on white) |
|-------|-----------|-------|-------------------|
| Text Primary | #1b1f2a | Body text, headings | 16.5:1 |
| Text Muted | #5b6070 | Secondary text, labels | 6.3:1 |
| Text Inverse | #ffffff | On dark backgrounds (on #000f46) | 18.2:1 |

#### Neutral Colors

| Token | Hex Value | Usage | Notes |
|-------|-----------|-------|-------|
| Background | #faf9f6 | Page background | Off-white/cream |
| Border Soft | #e0e0e0 | Light borders | Input fields, cards |
| Border Medium | #cfcac0 | Medium borders | Dividers |
| Black | #1a1a1a | Media viewer bg | Deep black |

### CSS Implementation

```css
:root {
  /* Primary Colors */
  --col-bg-primary: #000f46;
  --col-bg-primary-dark: #000a32;
  --col-bg-primary-hover: #001a66;
  
  /* Secondary Colors */
  --col-bg-accent: #abc1a7;
  --col-bg-accent-soft: #dde5d6;
  
  /* Text Colors */
  --col-text-primary: #1b1f2a;
  --col-text-muted: #5b6070;
  --col-text-inverse: #ffffff;
  
  /* Neutral Colors */
  --col-border-neutral-soft: #e0e0e0;
  --col-border-neutral-mid: #cfcac0;
  --col-border-neutral-dark: #b5afa7;
  
  /* Special */
  --col-bg-media: #1a1a1a;
}
```

---

## Typography System

### Font Families

#### Serif (Headings)
- **Family**: Fraunces
- **Source**: Google Fonts
- **License**: Open Source (OFL)
- **Weights**: 500 (medium), 600 (semibold)
- **Usage**: H1, H2, H3, section headings

#### Sans-Serif (Body)
- **Family**: Source Sans 3
- **Source**: Google Fonts
- **License**: Open Source (OFL)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold)
- **Usage**: Body text, labels, navigation

#### Fallback Stack
```
Headings: 'Fraunces', 'Georgia', serif
Body: 'Source Sans 3', system-ui, -apple-system, sans-serif
```

### Type Scale

| Element | Font Size | Font Weight | Line Height | Letter Spacing | Usage |
|---------|-----------|------------|------------|----------------|-------|
| H1 (Hero) | clamp(34px, 5vw, 52px) | 500 | 1.08 | normal | Main page headings |
| H2 (Section) | 30px | 500 | 1.1 | normal | Section headings |
| H3 | 24px | 500 | 1.15 | normal | Subsection headings |
| H4 | 22px | 500 | 1.2 | normal | Card titles |
| H5 | 18px | 600 | 1.25 | normal | Feature titles |
| Body (Large) | 18px | 400 | 1.6 | normal | Intro paragraphs |
| Body | 15px | 400 | 1.5 | normal | Standard body text |
| Label | 14px | 600 | 1.4 | 0.5px | Form labels, badges |
| Caption | 12px | 400 | 1.4 | normal | Image captions, meta |

### Text Hierarchy Example

```
<h1>Cultural Collections</h1>        <!-- Main heading -->
<p>Introduction paragraph</p>        <!-- Body text 18px -->
<h2>Featured Collections</h2>        <!-- Section heading -->
<p>Secondary text</p>                <!-- Body text 15px -->
<p class="caption">Photo by...</p>  <!-- Caption 12px -->
```

---

## Component Library

> **Note**: the component specs below are the original design intent. The later Gen 3 audit (see "Gen 3 Compliance Audit") set `border-radius: 0` and `box-shadow: none` sitewide and moved primary actions to cyan `#46c8f0`; where the two differ (rounded corners, shadows, navy/sage buttons), the audit and the live code win.

### Search Form Component

**Dimensions**: 360px max-width, 48px height

**Structure**:
```
┌─────────────────────────────┐
│ Input field        [Button] │
└─────────────────────────────┘
```

**Specifications**:

| Property | Value | Notes |
|----------|-------|-------|
| Container Width | 360px | Max-width (responsive) |
| Container Height | 48px | Touch-friendly size |
| Border | 1px solid #e0e0e0 | Light gray |
| Border Radius | 4px | Subtle curves |
| Background | #ffffff | White |
| Box Shadow | 0 2px 4px rgba(0,0,0,.08) | Subtle elevation |
| Input Padding | 0 14px | Horizontal spacing |
| Input Font Size | 15px | Body text size |
| Input Color | #1b1f2a | Text primary |
| Placeholder Color | #999999 | Muted text |
| Button Width | Auto | Flex width |
| Button Padding | 0 | No padding (icon only) |
| Button Background | #abc1a7 | Sage green |
| Button Color | #ffffff | White icon |
| Button Icon Size | 20×20px | Standard size |
| Button Icon Stroke | 2.2px | Thicker stroke |

**States**:

| State | Style |
|-------|-------|
| Default | Border #e0e0e0, shadow 0 2px 4px |
| Hover | Button bg #9ab998 |
| Focus | Outline 3px solid #000f46, 0.1 alpha |
| Active | Same as focus |

**Responsive**:
```
Desktop (1200px+): 360px max-width
Tablet (768px):    90% width
Mobile (<768px):   Full width, 44px height
```

### Gallery Card Component

**Dimensions**: Responsive (grid-based), min-height 280px

**Structure**:
```
┌─────────────────────┐
│  Image              │
│  [Overlay Gradient] │
│  [Card Content]     │
└─────────────────────┘
```

**Specifications**:

| Property | Value | Notes |
|----------|-------|-------|
| Min Height | 280px | Ensures visibility |
| Aspect Ratio | 1:1 (square) | For images |
| Image Fit | cover | Fills container |
| Image Object Position | center | Centered image |
| Border | 1px solid #e0e0e0 | Light border |
| Border Radius | 4px | Subtle curves |
| Overflow | hidden | Clips image |
| Box Shadow | 0 2px 4px rgba(0,0,0,.08) | Subtle depth |

**Overlay**:
```
Gradient: linear-gradient(180deg, transparent 0%, rgba(0,0,0,.7) 100%)
Position: absolute, bottom 0, full width/height
```

**Content**:
```
Label: 12px, #999999, uppercase, all caps
Title: 18px, #ffffff, bold (600), Fraunces serif
Position: absolute, bottom 24px, left/right 16px
```

**Hover State**:
```
Transform: translateY(-4px)
Box Shadow: 0 8px 24px rgba(0,0,0,.12)
Transition: 0.3s ease
```

**Grid Layout**:
```
Desktop (1200px+): 3 columns, gap 24px
Tablet (768px):    2 columns, gap 24px
Mobile (<768px):   1 column, gap 16px
```

### Quick Link Card Component

**Dimensions**: Responsive (grid-based), min-height 120px

**Structure**:
```
┌────────────────────────┐
│  Title (H5)            │
│  Description (Body)    │
└────────────────────────┘
```

**Specifications**:

| Property | Value | Notes |
|----------|-------|-------|
| Padding | 32px | Internal spacing |
| Background | #dde5d6 | Light sage green |
| Border | 1px solid #e0e0e0 | Subtle border |
| Border Radius | 4px | Consistent radius |
| Box Shadow | 0 2px 4px rgba(0,0,0,.08) | Subtle elevation |
| Color | inherit | Text primary |
| Text Decoration | none | Links unstyled |

**Typography**:
```
H3: 22px, Fraunces 500, #1b1f2a
P:  15px, Source Sans 3 400, #5b6070
```

**Hover State**:
```
Background: #abc1a7 (sage green, full)
Box Shadow: 0 4px 8px rgba(0,0,0,.12)
Transform: translateY(-2px)
Transition: all 0.3s ease
```

**Grid Layout**:
```
Desktop (1200px+): 4 columns, gap 24px
Tablet (768px):    2 columns, gap 24px
Mobile (<768px):   1 column, gap 16px
```

### Navigation Header

Defined in `public/styles/home.css` as `.ccs-nav--header` (behaviour in `public/nav.js`). The markup is repeated on every page.

```
Desktop: [UoM logo 110px] | top row (UniMelb links, search button)
                          | Cultural Collections         Search all records  Browse collections v  Help v  Contact
Mobile:  [logo 80px] | search button                                       [Menu]
                     | Cultural Collections
```

| Element | Spec |
|---|---|
| Height | 110px desktop (44px top row + 65px main row), 88px mobile; not sticky |
| Colours | Navy `#000f46`; top row `#000b34` with sage `#abc1a7` links |
| Top row links | 14px, 400, uppercase, 1.12px tracking (UniMelb style); hover `#eaefe9` + underline |
| Primary links | 16px, 400, white; hover `#a3e4f7` background with navy text; pressed `#d1f1fb`; focus is a 2px inset light-blue outline |
| Dropdowns | Browse collections (the five collections) and Help (FAQ, Search tips, Copyright, Access, Privacy, Indigenous data). Panel: `#000b34`, 2px `#46c8f0` top rule, Fraunces 30px heading link, two-column list of 16px/600 links with arrow icons. `aria-expanded` + `aria-controls`; Esc, outside click and Tab-out close it |
| Mobile (<=1023px) | "Menu" button (icon over label); drawer opens to the right of the logo with a search box, the primary links (Browse collections and Help expand in place) and the UniMelb links |
| Current page | `aria-current` on the matching link; shown as a light-blue underline (desktop) or left bar (mobile) |

### Footer

Defined in `public/styles/home.css` as `.ccs-nav--footer` (Figma footer): Acknowledgement of Country band (`#333f6a`), main band (links, contact details, social links, UoM logo) on `#000f46`, and a legal strip on `#000b34`. Three columns collapse to one at 1023px; links are at least 44px tall on mobile.

### Section components (homepage)

`.ccs-section--hero | intro | cards | help | faq` in `home.css`. Shared pieces: `.ccs-link` (inline link with arrow) and `.ccs-acc` (accordion built on `<details>`; also used by the Help FAQ topic page). Padding is 64px 128px desktop, 48px 24px mobile (hero and help/FAQ use their own rules).

### Form components (Advanced Filters)

`public/styles/advanced-filters.css`: `.ccs-banner` (page banner: one h1 + optional description, 64/128px desktop, 48/24px mobile), `.ccs-combo` (single and multi-select with closed/open/hover/selected/completed/pressed/disabled states using the `input-fill-*` tokens), `.ccs-input`, `.ccs-date` + `.ccs-cal` (date field and calendar), `.ccs-btn`, `.ccs-delete`, `.ccs-instructions` and `.ccs-errors`. Behaviour is in `public/search/advanced-search-form.js`.

### Media Viewer Component

**Desktop**:
```
┌──────────────────────────────┐
│ [Close] [Toolbar]            │
│                              │
│  [Image (max 85vh)]          │
│                              │
│ Sidebar (380px) [Toggle]     │
└──────────────────────────────┘
```

**Specifications**:

| Property | Value | Notes |
|----------|-------|-------|
| Image Max Height | calc(85vh - header) | Viewport constraint (header + media viewer <= 85vh) |
| Image Background | #1a1a1a | Deep black |
| Sidebar Width | 380px | Right panel |
| Sidebar Hidden | width: 0 | Closed by default |
| Sidebar Transition | 0.3s ease | Smooth animation |
| Toolbar Position | floating | Bottom right |
| Toolbar Background | rgba(0,0,0,.85) | Semi-transparent |
| Toolbar Backdrop | blur(10px) | Glass morphism |
| Button Size | 44px | Touch-friendly |

**Keyboard Shortcuts**:
```
← / ↑     : Previous image
→ / ↓     : Next image
I         : Toggle info sidebar
F         : Fullscreen
Esc       : Exit fullscreen
?         : Show help
```

---

## Layout Grid & Spacing

### 8px Baseline Grid

The design uses a consistent 8px baseline grid for all spacing.

```
8px   = 1 unit  (decorative/micro spacing)
16px  = 2 units (element padding)
24px  = 3 units (section gaps)
32px  = 4 units (container padding)
48px  = 6 units (large spacing)
64px  = 8 units (major section spacing)
```

### Container Widths

```
Fluid: No max-width (full bleed on mobile)
Tablet: 90% width, centered (768px-1199px)
Desktop: 1200px max-width, centered (1200px+)
Large: 1400px max-width (1600px+)
```

### Common Spacing Patterns

**Section Padding**:
- Top: 64px (desktop), 48px (tablet), 32px (mobile)
- Bottom: 64px (desktop), 48px (tablet), 32px (mobile)
- Left/Right: 32px (desktop), 24px (tablet), 16px (mobile)

**Element Gaps**:
- Grid gap: 24px (desktop), 16px (mobile)
- Section gap: 32px vertical spacing
- Card spacing: 16px around elements

**Button/Input Padding**:
- Button: 12px 18px (height min 44px)
- Input: 0 14px (height 48px)
- Card: 32px (internal spacing)

---

## Responsive Design

### Breakpoints

```
Mobile:      < 768px      (Portrait phones)
Tablet:      768px-1199px (Landscape phones, tablets)
Desktop:     1200px-1599px (Large monitors)
Large:       1600px+      (Extra-large monitors)
```

### Mobile-First Approach

**Base styles** (mobile, <768px):
- 1 column layout
- Full-width elements
- Smaller font sizes
- Reduced padding
- Simplified navigation

**Tablet breakpoint** (768px):
```css
@media (min-width: 768px) {
  /* 2 columns, increased spacing */
}
```

**Desktop breakpoint** (1200px):
```css
@media (min-width: 1200px) {
  /* 3+ columns, optimized layout */
}
```

### Responsive Components

**Grid Layouts**:
```
Gallery Cards:
Mobile: 1 col     | Tablet: 2 cols    | Desktop: 3 cols
Quick Cards:
Mobile: 1 col     | Tablet: 2 cols    | Desktop: 4 cols
```

**Typography Scaling**:
```
H1: clamp(34px, 5vw, 52px)
H2: 30px → scales via media query
Body: 15px → 18px at tablet+
```

**Touch Targets**:
- Minimum 44×44px on mobile
- Buttons, links, inputs all meet this
- Increased padding on mobile

---

## Color Usage

### By Component

**Buttons**:
- Primary: Navy #000f46
- Secondary: Sage #abc1a7
- Hover: Darker shade
- Text: White #ffffff

**Links**:
- Default: Navy #000f46 (underlined)
- Hover: Navy with underline
- Visited: Sage #abc1a7

**Form Fields**:
- Border: Light gray #e0e0e0
- Focus: Blue outline (navy)
- Background: White #ffffff
- Text: Dark #1b1f2a

**Cards**:
- Background: White #ffffff or Sage light #dde5d6
- Border: Light gray #e0e0e0
- Shadow: Black with .08 opacity
- Hover shadow: Black with .12 opacity

**Text**:
- Primary: Dark #1b1f2a (body, headings)
- Secondary: Muted #5b6070 (labels, helper text)
- Inverse: White #ffffff (on dark backgrounds)

**Backgrounds**:
- Page: Off-white #faf9f6
- Sections: White #ffffff
- Accents: Sage light #dde5d6
- Media: Deep black #1a1a1a

### Contrast Ratios (calculated, WCAG relative luminance)

Targets are ≥4.5:1 for text. Calculated values for the main pairings:
- Navy #000f46 on white: 18.2:1
- Text #1b1f2a on white: 16.5:1
- Navy on sage #abc1a7: 9.4:1
- Navy on action cyan #46c8f0: 9.3:1
- Muted text #5b6070 on white: 6.3:1 (on #faf9f6: 6.0:1)

These are spot calculations, not a full audit of every page.

---

## Interactive States

### Button States

**Default**:
- Navy background #000f46
- White text #ffffff
- Subtle shadow

**Hover**:
- Navy hover #001a66
- Slight elevation
- Cursor pointer

**Focus**:
- 2px navy outline
- Outline offset -2px
- Visible to keyboard users

**Active**:
- Darker navy
- Increased shadow

### Link States

**Default**:
- Navy #000f46
- Underlined
- Cursor pointer

**Hover**:
- Same color
- Underline remains

**Focus**:
- Blue outline
- Visible indicator

**Visited**:
- Sage #abc1a7 (optional)

### Form States

**Input Default**:
- White background
- Light gray border
- Placeholder text muted

**Input Focus**:
- 3px blue outline
- Navy border color
- Box shadow activation

**Input Error** (future):
- Red border (not implemented yet)
- Error message in red

### Card Hover

**Hover Effect**:
- Transform: translateY(-4px) (slight lift)
- Shadow increase: 0 8px 24px rgba(0,0,0,.12)
- Background: Subtle change
- Transition: 0.3s ease

---

## Accessibility Standards

### WCAG 2.1 Level AA - Targets and Status

**Status**: WCAG 2.1 AA is the target. Pages have been scanned with axe-core and the issues it reported were fixed (remaining items are listed in `README.md` under Known issues). There has been no formal audit, manual assistive-technology testing or certification, so the checklist below states what the design aims for, not verified conformance.

**Color Contrast** (1.4.3):
- Text: ≥4.5:1 ratio
- Large text (18px+): ≥3:1 ratio
- UI components: ≥3:1 ratio

**Resize Text** (1.4.4):
- Page scales to 200% without loss
- Text reflows to single column
- No horizontal scrolling

**Keyboard Navigation** (2.1.1):
- All functionality keyboard accessible
- Logical tab order
- No keyboard traps

**Focus Visible** (2.4.7):
- Visible focus indicator on all interactive elements
- Focus outline 2-3px, high contrast
- Clear visual indicator

**Semantic HTML**:
- Proper heading hierarchy (H1 → H2 → H3)
- Form labels associated with inputs
- Landmarks: header, nav, main, footer
- List structures preserved

### ARIA Implementation

**Labels**:
```html
<input aria-label="Search the collection">
<button aria-label="Submit search"></button>
```

**Hidden Content**:
```html
<svg aria-hidden="true">...</svg>
<span class="visually-hidden">Screen reader text</span>
```

**Landmark Regions** (native elements; explicit roles are not needed). Repeated landmarks of the same type carry an `aria-label`, for example the footer `aria-label="University of Melbourne footer"` and the breadcrumb `nav aria-label="Breadcrumb"`:
```html
<header>...</header>
<nav aria-label="Breadcrumb">...</nav>
<main>...</main>
<footer aria-label="University of Melbourne footer">...</footer>
```

---

## Page Templates

### Home Page (index.html)

**Structure**:
1. Header (navigation + search)
2. Hero section (title, description, search)
3. Featured Collections (3-column card grid)
4. About section (text content)
5. Explore & Learn cards (quick links)
6. Browse More Collections (3-column grid)
7. Footer

**Colors**:
- Header: Navy #000f46
- Hero: Navy gradient
- Featured: White background
- About: Off-white #faf9f6
- Browse: White background
- Footer: Navy #000f46

**Typography**:
- H1: 52px (clamped)
- H2: 30px
- Body: 15-18px
- Hero text: 18px, white

### Collection Record (`public/collections/record.html?id=<id>`)

**Structure**:
1. Header (with breadcrumb)
2. Media Viewer (full-width)
3. Metadata Sidebar (closed by default)
4. Description section
5. Related Items (optional)
6. Footer

**Colors**:
- Media bg: Black #1a1a1a
- Sidebar: White #ffffff
- Text: Dark #1b1f2a

**Interactive**:
- Media viewer for images, audio and video; metadata sidebar
- Keyboard shortcuts apply only while the viewer has focus or is full screen (see the script in `record.html` for the current keys)
- "Contact us" button opens a request dialog (General enquiry / Request to use / Request to view) with focus trap and Esc to close
- Unknown ids show "Record not found"; each record sets its own document title
- Field labels and order follow `assets/CCS Field labels and filters - Final - PRG - 1 OCT 2026.xlsx` (see `README.md`)

### Search Results (`public/search/search-results.html`)

**Structure**:
1. Header + search bar
2. Filters sidebar (left)
3. Results grid (right)
4. Pagination
5. Footer

**Layout**:
- Desktop: 2-column (filters | results)
- Tablet: Collapsed filters
- Mobile: Full-width results

### Browse Collections (`public/collections/index.html`)

**Structure**:
1. Header + search
2. Collection card grid (record counts computed from the data)
3. Browse tiles (by type / format; some map to keyword searches)
4. Footer

**Card Style**:
- Gallery cards with image overlay
- Title and description
- Hover effects active

---

## Design System Files

### Figma Libraries

1. **Foundation Library**
   - Colors
   - Typography
   - Spacing scales
   - Button styles

2. **Component Library**
   - Navigation components
   - Form inputs
   - Card components
   - Buttons

3. **Asset Library**
   - Logo files
   - Icon sets
   - Image templates

### External Resources

- **Official Design System**: https://designsystem.web.unimelb.edu.au/
- **Foundation Library**: https://www.figma.com/design/hgFO4N25XCZ4aPYQxF1iB8/Foundation-Library
- **Component Library**: https://www.figma.com/design/cQcZOOuiVd79v9meOELcIb/Component-Library
- **Asset Library**: https://www.figma.com/design/yioOlgJGzYynrgJO1hlGB8/Asset-Library

---

## Design Verification Checklist

Before finalizing designs, verify:

- [ ] All colors match UoM Gen 3 palette
- [ ] Typography uses Fraunces (headings) + Source Sans 3 (body)
- [ ] Spacing follows 8px baseline grid
- [ ] Touch targets ≥44px on mobile
- [ ] Color contrast ≥4.5:1 for text
- [ ] Responsive layouts tested at all breakpoints
- [ ] Focus indicators visible on all interactive elements
- [ ] Semantic HTML structure maintained
- [ ] ARIA labels present where needed
- [ ] Keyboard navigation fully supported

---

## File Organization

### Directory Structure
```
public/                              # Deployed web root
├── index.html, search.html, contact.html
├── search/search-results.html
├── collections/
│   ├── index.html, record.html
│   └── <slug>/index.html            # 5 collection landing pages
├── help/{index.html, indigenous-data.html}
├── collection-data.js               # Record data -> window.CCS
├── nav.js                           # header dropdowns + mobile drawer
├── blacklight-adapter.js, support.js, image-slot.js
├── components/                      # fig-tokens.css (variables only), fig-assets.css (+ exported .jsx/.d.ts)
├── styles/components/               # shared component CSS (breadcrumbs, focus, page-banner, licence-badge, search-bar, collection-hero)
├── styles/                          # home.css, advanced-filters.css, header.css, collection.css, vendor/bootstrap-uom.min.css
│   ├── pages/                       # <page>.css (classes moved out of inline styles) + a few <page>.<role>.css (former <style> blocks)
│   └── shared/                      # base-elements.css and skip-link.css (one copy for every page), colour-tokens*.css
├── assets/                          # images/collections, data (audio/video, metadata), documents
├── images/                          # optimised web images and icons
└── .htaccess                        # Apache redirects/rewrites

src/scss/custom-bootstrap.scss       # Bootstrap theme source
tests/                               # Node test scripts (npm test)
config/redirects.json                # documentation-only
vercel.json                          # clean URLs + legacy redirects
```

### CSS Files Location

| File | Purpose |
|------|---------|
| `public/components/fig-tokens.css` | Gen 3 design tokens (colour, type, spacing) only |
| `public/styles/components/*.css` | Shared component CSS (breadcrumbs, global focus ring, page banner, licence badge, search bar, collection hero); linked right after fig-tokens.css on every page |
| `public/components/fig-assets.css` | Asset/component styles from the design export |
| `public/styles/home.css` | Navigation (header/footer, UniMelb-style mobile header and drill-in drawer) and Section components, accordion, links |
| `public/styles/advanced-filters.css` | Advanced Filters form components |
| `public/styles/header.css` | Search overlay, `.sr-only` and shared colour variables |
| `public/styles/pages/*.css` | Per-page rules (scoped by `body.page-<page>`); includes the former inline styles and `<style>` blocks |
| `public/styles/shared/*.css` | Former `<style>` blocks that several pages shared |
| `public/styles/shared/content-templates.css` | Matrix content-template components (listing, pathfinder, contact box, notice, side nav, definition table, contact cards, numbered steps); see README |
| `public/styles/collection.css` | Collection landing pages |
| `public/styles/vendor/bootstrap-uom.min.css` | Bootstrap 5.3.3, compiled locally |

`variables.css`, `typography.css` and `components.css` (and the top-level `styles/` and `images/` folders) were dead duplicates and have been deleted.

### Styles Import

```html
<link rel="stylesheet" href="styles/vendor/bootstrap-uom.min.css">
<link rel="stylesheet" href="components/fig-tokens.css">
<link rel="stylesheet" href="styles/components/breadcrumbs.css"> <!-- ...and the other five files in styles/components/, in this order: focus, page-banner, licence-badge, search-bar, collection-hero -->
<link rel="stylesheet" href="components/fig-assets.css">
<link rel="stylesheet" href="styles/header.css">
<link rel="stylesheet" href="styles/home.css">
```

Paths are relative to the page (`../` prefixes on pages in subfolders). Page-specific stylesheets are linked with absolute paths (`/styles/pages/<page>.css`) after the shared sheets. Pages contain no inline `style` attributes or `<style>` blocks (see `tests/no-inline-styles.test.js`).

### Bootstrap Details

- **Version**: 5.3.3, compiled from the npm package with a custom Sass theme (`npm run build:css`)
- **JS bundle**: only `index.html` loads `bootstrap.bundle.min.js` from jsDelivr, pinned to 5.3.3 with an SRI hash
- **Configuration**: see `BOOTSTRAP-DEPENDENCIES.md`

### Documentation

- `README.md` - overview, data guide, tests, hosting, known issues
- `BOOTSTRAP-DEPENDENCIES.md`, `github.md`, `jira-mvp-mapping.md`

---

## Information Architecture & Sitemap

### Clean URL Structure

All pages use semantic, REST-friendly URLs:

**Home & Search**:
- `/` → Home page
- `/search` → Redirects to `/search/search-results`
- `/search/search-results` → Advanced search interface

**Collections**:
- `/collections` → Browse all collections
- `/collections/grainger-museum` → Grainger Museum
- `/collections/harry-brookes-allen-museum` → Harry Brookes Allen Museum
- `/collections/henry-forman-atkinson-dental-museum` → Henry Forman Atkinson Dental Museum
- `/collections/medical-history-museum` → Medical History Museum
- `/collections/university-art-collection` → University Art Collection
- `/collections/record?id=X` → Individual collection item with media viewer

**Support & Resources**:
- `/help` → Help and guidance
- `/help/indigenous-data` → Indigenous cultural data and access
- `/contact` → Contact groups and collection contacts

### Page Nesting

All pages are organised under `public/`:

```
public/
├── index.html                    # / (home)
├── search.html                   # /search (redirect stub)
├── contact.html                  # /contact
├── search/search-results.html          # /search/search-results
├── collections/
│   ├── index.html                # /collections
│   ├── record.html               # /collections/record?id=<id>
│   ├── grainger-museum/index.html
│   ├── harry-brookes-allen-museum/index.html
│   ├── henry-forman-atkinson-dental-museum/index.html
│   ├── medical-history-museum/index.html
│   └── university-art-collection/index.html
└── help/
    ├── index.html                # /help
    └── indigenous-data.html      # /help/indigenous-data
```

---

## Footer Implementation

### UoM Footer Design

All pages include the official University of Melbourne footer with:

**Acknowledgement of Country** (top):
- Wurundjeri land acknowledgement
- Italicized, serif typography
- Full width, prominent placement

**Main Navigation** (grid layout):
- About us: About, Careers, Safety, Newsroom
- Support: Contact, Campus Locations, Emergency
- Links route to official UoM URLs

**Secondary Navigation** (horizontal):
- Accessibility, Privacy, Terms & Privacy
- Copyright notice

### Footer Styling

**Visual Design**:
- Background: Navy #000f46 (primary brand color)
- Text: White (#ffffff) with 80% opacity for secondary content
- Borders: Subtle white borders with 10% opacity
- Layout: Responsive grid (1 col mobile → 2 col desktop)

**Typography**:
- Headers: 15px, 600 weight (Source Sans 3)
- Body links: 14px, regular weight
- Secondary links: 13px, regular weight
- Line height: 1.6 (accessible reading)

**Interaction**:
- Links: Underline on hover
- Color: Remain white on hover (no color change on navy)
- Focus: Visible outline for keyboard navigation

**Structure**:
```html
<footer class="site-footer">
  <div class="footer-acknowledgement">
    <!-- Wurundjeri acknowledgement -->
  </div>
  
  <nav class="footer-nav">
    <!-- Main navigation in grid -->
  </nav>
  
  <div class="footer-secondary">
    <!-- Secondary links + copyright -->
  </div>
</footer>
```

### External Link References

All footer links point to official University of Melbourne URLs:

| Link | URL |
|------|-----|
| About us | https://www.unimelb.edu.au/about |
| Careers | https://www.unimelb.edu.au/careers |
| Safety | https://www.unimelb.edu.au/safety |
| Newsroom | https://www.unimelb.edu.au/newsroom |
| Contact | https://www.unimelb.edu.au/contact |
| Campus Locations | https://www.unimelb.edu.au/campus-locations |
| Emergency | https://www.unimelb.edu.au/emergency |
| Accessibility | https://www.unimelb.edu.au/accessibility |
| Privacy | https://www.unimelb.edu.au/privacy |
| Terms & Privacy | https://www.unimelb.edu.au/terms-and-privacy |

---

## Breadcrumb Component (Gen 3 CMS Aligned)

Rebuilt to strictly match the UoM Gen 3 CMS [Breadcrumbs](https://designsystem.web.unimelb.edu.au/components/breadcrumbs/) specification (`nav.page-breadcrumbs` > `ol.page-local-history` > `li.root` / `li[itemprop="itemListElement"]`).

**Spec**:
- `nav.page-breadcrumbs`: `tab-size: 4`, `-webkit-text-size-adjust: 100%`, `box-sizing: border-box`, `background: var(--uom-ds-color-background-tertiary-inverse)` (`#00354c`), `color: var(--uom-ds-color-text-link-inverse)` (`#ffffff`), `font-family: var(--ff)` ("Source Sans 3", sans-serif), `font-size: var(--fs)` (`1.125rem` / 18px), `line-height: var(--lh)` (`1.5em`), `letter-spacing: var(--ls)` (`normal`)
- `ol.page-local-history`: `itemscope="" itemtype="https://schema.org/BreadcrumbList"` structured data list
- Root crumb: `<li class="root" itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">` with `<a href="/" itemprop="item" title="Home"><span itemprop="name">Home</span></a><meta content="1" itemprop="position">`
- Subsequent crumbs: `<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">` with schema.org item, name, and position metadata

```html
<nav class="page-breadcrumbs" aria-label="Breadcrumb">
  <ol class="page-local-history" itemscope="" itemtype="https://schema.org/BreadcrumbList">
    <li class="root" itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
      <a href="/" itemprop="item" title="Home">
        <span itemprop="name">Home</span>
      </a>
      <meta content="1" itemprop="position">
    </li>
    <li class="" itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
      <a href="/cms/" itemprop="item" title="CMS">
        <span itemprop="name">CMS</span>
      </a>
      <meta content="2" itemprop="position">
    </li>
    <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem" aria-current="page">
      <a href="/cms/components/breadcrumbs/" itemprop="item" title="Breadcrumbs">
        <span itemprop="name">Breadcrumbs</span>
      </a>
      <meta content="3" itemprop="position">
    </li>
  </ol>
</nav>
```

Live on: search, collections (browse + landing pages), record, help, contact.

---

## Responsive Breakpoint (640px)

Browse Collections and Collection Landing previously had zero `@media` queries. Added one breakpoint via `!important`-scoped classes (required because the page uses inline styles throughout, per the Figma `.dc.html` export convention — a plain class rule can't win specificity against an inline `style=""` attribute):

| Class | 640px behavior |
|---|---|
| `.site-header-brand` | Logo shrinks to 80px |
| `.site-nav` | Nav link padding/font-size reduced |
| `.hero-inner` | Hero padding tightens |
| `.hero-cta a` | CTA buttons go full-width, centered, stacked |
| `.collections-grid` | Card grid collapses to 1 column |
| `.footer-cols` | Footer columns stack |

---

## Gen 3 Compliance Audit (Live-Verified)

Audited against the actual rendered `designsystem.web.unimelb.edu.au` pages (computed styles pulled from the live DOM, not just the Figma export) — buttons, forms, notices, tags, cards, and accordion — and cross-checked on two real production Gen 3 sites (`library.unimelb.edu.au`, `students.unimelb.edu.au`). Two systemic rules apply everywhere in Gen 3:

1. **`border-radius: 0` on everything** except the checkbox control. No pills, no rounded cards, no rounded buttons.
2. **`box-shadow: none` on everything** except transient overlays (modal). No card elevation shadows, no button shadows, no input shadows.

### Corrected color tokens

The prototype conflated two different roles under one navy variable. Added a dedicated action-color token, kept `--col-btn-primary-*` (navy) for brand chrome (headers/nav/footer) which was already correct there:

```css
/* Primary interactive action — confirmed live on the Gen 3 Search
   component (52×51px search button) and Button style guide */
--col-btn-action-bg: #46c8f0;       /* cyan */
--col-btn-action-bg-hover: #29b3d9;
--col-btn-action-text: #000f46;     /* navy */
```

| Role | Color | Verified on |
|---|---|---|
| Primary action (buttons, search submit) | Cyan `#46c8f0` bg, navy text | style-guide/buttons, components/search, library.unimelb.edu.au |
| Secondary action | Sage `#abc1a7` bg, navy text | style-guide/buttons (already correct in this prototype) |
| Tertiary / ghost | Transparent, navy border + text | style-guide/buttons |
| Tag / badge | Pale sage `#eaefe9` bg, navy uppercase text, no border | components/tags (`.tags__item`) |
| Notice — warning | Pale yellow bg, brown-orange border | style-guide/notices |

Applied to: all header/hero search submit buttons, "Clear all filters," the filter-drawer "Show N records" button, the Indigenous acknowledgement modal's accept button, "Request to use" on record pages, and "Open Form" on Contact. Object-type badges rebuilt to match `.tags__item` exactly (previously a bordered pill).

### Accordion (FAQ) — already close to compliant
Gen 3's accordion is borderless, shadowless, sharp-cornered, with a hairline top divider between items and a light-gray (`#f1f1f1`) fill on the expanded panel. The Help page FAQ accordion already matches on every point except the expanded-panel fill (ours is transparent) — minor, optional polish, not fixed.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.4 | 2026-10-01 | Docs refreshed to match the code: file paths, deleted duplicate CSS, local Bootstrap build, compliance wording changed from "compliant" to "target, axe-core scanned, not formally audited", calculated contrast values |
| 2.3 | 2026-09-29 | Live Gen 3 compliance audit: border-radius/box-shadow stripped site-wide, primary button color corrected to cyan, tags rebuilt to match `.tags__item` |
| 2.2 | 2026-09-29 | Gen 3 breadcrumb component, 640px responsive breakpoint, Collections card-grid redesign, Grainger tile image sourced from `/assets` |
| 2.1 | 2026-09-29 | Fixed fabricated Bootstrap SRI hashes (root cause of site-wide unstyled nav), broken relative paths, duplicate footers, wrong per-collection data |
| 2.0 | 2026-09-29 | Updated for reorganized codebase structure |
| 1.0 | 2026-09-29 | Initial design system documentation |

### Free catalog API (2026-10-04)
- `api/catalog.js` serves `/catalog.json` and `/catalog/:id.json` in the Blacklight JSON shape from the same Vercel project at no cost (see `jira-mvp-mapping.md`). The adapter defaults to it; `?api=live` switches the results page to it.

### Search acceptance criteria (2026-10-04)
- CCS-158: a "Did you mean" notice appears above results for misspelt or partial words and runs the corrected search.
- CCS-27: the record page Copyright box lists accession number, caption (digital assets only), credit line and copyright.
- CCS-116: whole-phrase meanings in `smart-search.js` (`PHRASES`).

### Search results banner and sticky tools bar (2026-10-04)
- Fix: the search form now lives permanently in the banner. The sticky bar holds only the tools plus a compact search box that appears when stuck, so its height no longer flips between a tall and a short layout while scrolling. The smart-search notices sit in their own full-width row (`.search-results-notices`) above the results grid.
- The `.ccs-hero__search` layout (form with a link stacked under it) lives in `public/styles/shared/hero-search.css`, loaded by the homepage and the search results page.
- The results page banner is now compact (title plus a "N results for “query”" line). The search form sits inside the banner on the navy strip.
- Below it, one sticky `.search-results-bar` holds Sort, Filters, the Digital asset switch, the view toggle and Save this search. An IntersectionObserver sentinel adds `is-stuck` once the banner scrolls away. When stuck, the search box stays visible next to the tools on desktop and tablet.
- On phones the bar stacks: search, then Sort | Filters, then Digital asset | view | Save (icon only). When stuck it shrinks to the search row plus Sort | Filters | Digital.
- The per-page selector moved to sit above the pagination. CSS lives in `public/styles/pages/search-results.css`.
- Follow-up: banner and search strip padding increased; the search form reuses the homepage `ccs-hero__search` wrapper (full width, Advanced Search underneath). When stuck, Advanced Search is hidden, the bar is one row from 1280px and two rows below, and all controls are 48px tall.
- Scope menu and suggestions now open over the sticky bar (banner z-index above it).
- The banner's Advanced Search link is now a toggle ("Advanced Search" / "Hide advanced search") that opens the advanced form inline: an iframe of `/search/advanced-search?embed=1` pre-filled with the current search, auto-sized through a `postMessage` of its height. In `?embed=1` mode the page hides the header, breadcrumbs, banner, help and footer and uses compact spacing (`html.is-embed` rules in `styles/advanced-filters.css`); submitting targets the top window.
- Advanced Search page: heading renamed "Advanced Search" (banner, breadcrumb, test), "Add filter" label is light on the dark desktop field (dark on the sage phone field), and Reset / Search sit at the right.

---

**Last Updated**: 2026-10-01  
**Maintained By**: Design Team

## Search backend: /catalog.json with local fallback

The results page (`public/search/search-results.html`) asks the Blacklight-shaped API first and shows its answer; `public/blacklight-adapter.js` owns the request.

- **Modes:** `auto` (default: ask the API, and after one failure quietly use the local catalogue for the rest of the page view), `live` (always ask, report the fallback), `mock` (local only). Set with `?api=`, saved in localStorage; `?dev` shows the toggle.
- **Endpoint:** `/catalog.json` (the `api/catalog.js` Vercel function; `npm run dev` serves it too). Point the site at another Blacklight server with `?endpoint=<url>`, `window.CCS_CONFIG.apiEndpoint`, or `<meta name="ccs-api-endpoint" content="...">`.
- **What the API answers:** query (fuzzy, synonym and phrase meaning, or exact), collection / type / subject / culture / place / theme / licence facets, date range, sort, paging. Records returned are matched back to the full local record by id so images and formats still show.
- **What stays local:** advanced clauses, match-all facets, creator life dates, accession, digital / download switches, scope and the remaining facets (`BlacklightAdapter.canServe`). Sidebar facet counts and "Did you mean" also still come from the local catalogue.
- **Tests:** `tests/search-live.test.js` (adapter unit checks, plus browser checks with the API present, missing and returning 500).

### Refactoring styles safely

Stylesheet changes are verified with computed-style snapshots of every page, state and viewport (`npm run style:snapshot`, `npm run style:diff`). See `docs/css-refactor.md`.
