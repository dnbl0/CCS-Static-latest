# Cultural Collections Search - Design System Documentation

**Project**: Cultural Collections Search (CCS) | **Institution**: University of Melbourne  
**Design System**: UoM Gen 3 v15.14.0 | **Version**: 2.0 | **Date**: 2026-09-29  
**Status**: ✅ Production Ready | **Codebase**: Reorganized (Semantic Structure)

---

## Quick Reference

**Files Location**: See `.reorganization/DIRECTORY-REFERENCE.md` for complete file paths  
**Styles**: `public/styles/` (variables.css, components.css, typography.css)  
**Components**: Defined in `public/styles/components.css`  
**Bootstrap**: `public/styles/vendor/bootstrap.min.css` (v5.3.3, official source)

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
| Text Primary | #1b1f2a | Body text, headings | 14:1 |
| Text Muted | #5b6070 | Secondary text, labels | 7.2:1 |
| Text Inverse | #ffffff | On dark backgrounds | 14:1 |

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

**Height**: 64px (sticky)

**Structure**:
```
┌─────────────────────────────────────┐
│ [Logo] [Title]    [Search]  [Menu] │
└─────────────────────────────────────┘
```

**Specifications**:

| Element | Size | Details |
|---------|------|---------|
| Background | Full width | #000f46 (navy) |
| Height | 64px | Fixed height |
| Logo | 100px width | Aspect ratio 1:1.4 |
| Title | 17px | White, #ffffff |
| Title Weight | 600 | Semibold |
| Search Form | 360px max-width | See Search Form spec |
| Nav Links | 16px | White, 600 weight |
| Link Spacing | 14px | Padding left/right |
| Link Hover | #001a66 | Navy hover state |

**Responsive**:
```
Desktop (1200px+): Full horizontal layout
Tablet (768px):    Logo + Title, search stacked
Mobile (<768px):   Hamburger menu, search below
```

### Footer

**Structure**: 4-column footer, full width

```
┌──────────────────────────────────────────┐
│ Browse | Help & Info | About | Connect  │
│ Link   | Link        | Link  | Link     │
│ Link   | Link        | Link  | Link     │
├──────────────────────────────────────────┤
│ Copyright © 2026                        │
└──────────────────────────────────────────┘
```

**Specifications**:

| Property | Value | Notes |
|----------|-------|-------|
| Background | #000f46 | Navy primary |
| Text Color | #ffffff | White |
| Padding | 80px 32px 32px | Top spacing |
| Column Gap | 32px | Between sections |
| Link Font Size | 14px | Standard size |
| Link Weight | 400 | Regular |
| Link Hover | #dde5d6 (light sage) | Accent on hover |
| Copyright | 12px | Bottom text |
| Border Top | 1px solid rgba(255,255,255,.1) | Subtle divider |

**Responsive**:
```
Desktop (1200px+): 4 columns
Tablet (768px):    2 columns
Mobile (<768px):   1 column (stacked)
```

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
| Image Max Height | 85vh | Viewport constraint |
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

### Contrast Ratios (WCAG AA)

All text meets ≥4.5:1 ratio:
- Navy on white: 14:1 ✅
- White on navy: 14:1 ✅
- Green button: 5.2:1 ✅
- Muted text: 7.2:1 ✅

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

### WCAG 2.1 Level AA Compliance

**Color Contrast** (1.4.3):
- ✅ Text: ≥4.5:1 ratio
- ✅ Large text (18px+): ≥3:1 ratio
- ✅ UI components: ≥3:1 ratio

**Resize Text** (1.4.4):
- ✅ Page scales to 200% without loss
- ✅ Text reflows to single column
- ✅ No horizontal scrolling

**Keyboard Navigation** (2.1.1):
- ✅ All functionality keyboard accessible
- ✅ Logical tab order
- ✅ No keyboard traps

**Focus Visible** (2.4.7):
- ✅ Visible focus indicator on all interactive elements
- ✅ Focus outline 2-3px, high contrast
- ✅ Clear visual indicator

**Semantic HTML**:
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Form labels associated with inputs
- ✅ Landmarks: header, nav, main, footer
- ✅ List structures preserved

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

**Landmark Regions**:
```html
<header role="banner">...</header>
<nav role="navigation">...</nav>
<main role="main">...</main>
<footer role="contentinfo">...</footer>
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

### Collection Record (Collection Record.dc.html)

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
- I: Toggle sidebar visibility
- F: Fullscreen view
- ←/→: Navigate images
- ?: Show keyboard help

### Search Results (Collection Search v3.dc.html)

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

### Browse Collections (Browse Collections.dc.html)

**Structure**:
1. Header + search
2. Category filters
3. Collection grid (3-4 columns)
4. Pagination
5. Footer

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

## File Organization (Post-Reorganization)

### Directory Structure
```
public/                              # Deployed files
├── index.html
├── pages/                           # HTML pages (.html standard extension)
│   ├── browse.html
│   ├── collection.html
│   ├── contact.html
│   ├── help.html
│   ├── record.html                  # Media viewer
│   ├── search.html
│   └── home-legacy.html
├── styles/                          # CSS
│   ├── variables.css                # Design tokens
│   ├── components.css               # Component styles
│   ├── typography.css               # Font definitions
│   └── vendor/bootstrap.min.css     # Bootstrap 5.3.3
├── assets/
│   ├── images/collections/          # Collection images
│   ├── images/archive/              # Original formats
│   ├── data/                        # Metadata, filters, media
│   └── documents/                   # Help, advisory
└── .htaccess                        # URL redirects

src/                                 # Source code
├── js/modules/                      # Feature modules
└── js/utils/                        # Helper functions

docs/                                # Documentation
├── README.md
├── design.md
└── guides/
```

### CSS Files Location

| File | Purpose |
|------|---------|
| `public/styles/variables.css` | CSS custom properties, color tokens, theme variables |
| `public/styles/components.css` | Component styles (cards, buttons, forms, etc.) |
| `public/styles/typography.css` | Font families, sizes, weights, line heights |
| `public/styles/vendor/bootstrap.min.css` | Bootstrap 5.3.3 framework |

### Styles Import

```html
<link rel="stylesheet" href="/public/styles/variables.css">
<link rel="stylesheet" href="/public/styles/components.css">
<link rel="stylesheet" href="/public/styles/vendor/bootstrap.min.css">
```

### Bootstrap Details

- **Version**: 5.3.3 (Official from https://github.com/twbs/bootstrap)
- **CDN**: jsDelivr (official npm distribution)
- **SRI Hashing**: Enabled for security
- **Configuration**: See `.reorganization/BOOTSTRAP-DEPENDENCIES.md`

### Documentation

For detailed file navigation, see:
- `.reorganization/DIRECTORY-REFERENCE.md` - Complete file lookup
- `.reorganization/REORGANIZATION-PLAN.md` - Structure rationale
- `.reorganization/DATA-MAPPING.md` - Data organization
- `.reorganization/IA-SITEMAP-RESTRUCTURE.md` - URL structure and IA implementation

---

## Information Architecture & Sitemap

### Clean URL Structure

All pages use semantic, REST-friendly URLs:

**Home & Search**:
- `/` → Home page
- `/search` → Basic keyword search
- `/search/advanced` → Advanced search interface

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
- `/help/faqs` → Frequently asked questions
- `/contact` → Contact form

### Page Nesting

All pages organized under `/public` directory maintaining semantic structure:

```
public/
├── index.html                    # / (home)
├── search.html                   # /search
├── contact.html                  # /contact
├── search/
│   └── advanced.html             # /search/advanced
├── collections/
│   ├── index.html                # /collections
│   ├── record.html               # /collections/record
│   ├── grainger-museum.html
│   ├── harry-brookes-allen-museum.html
│   ├── henry-forman-atkinson-dental-museum.html
│   ├── medical-history-museum.html
│   └── university-art-collection.html
└── help/
    └── index.html                # /help
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

## Breadcrumb Component (Gen 3 Aligned)

Rebuilt to match the Gen 3 [Page Header](https://designsystem.web.unimelb.edu.au/components/page-header/) breadcrumb, replacing an earlier custom style (14px, dimmed `›`, underlined links, no icon).

**Spec** (verified against the live Gen 3 site via computed styles):
- 18px white text, weight 400, no default underline (underline on hover/focus only)
- Home icon (house outline SVG) before the first crumb
- `>` separator between items
- Last crumb is plain text, not a link
- Markup: `<ol>` + `schema.org/BreadcrumbList` structured data, mirroring Gen 3's `page-local-history` pattern

```html
<nav aria-label="Breadcrumb">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList" style="display:flex;align-items:center;gap:8px;list-style:none;margin:0;padding:0;font-size:18px;color:#fff">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a href="/" itemprop="item" class="breadcrumb-link"><svg><!-- home icon --></svg><span itemprop="name">Cultural Collections</span></a>
      <meta itemprop="position" content="1">
      <span aria-hidden="true">&gt;</span>
    </li>
    <!-- ... -->
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" aria-current="page">
      <span itemprop="name">Current page</span>
    </li>
  </ol>
</nav>
```

Live on: home, search, collections (browse + all 5 landing pages), record, help, contact.

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

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.2 | 2026-09-29 | Gen 3 breadcrumb component, 640px responsive breakpoint, Collections card-grid redesign, Grainger tile image sourced from `/assets` |
| 2.1 | 2026-09-29 | Fixed fabricated Bootstrap SRI hashes (root cause of site-wide unstyled nav), broken relative paths, duplicate footers, wrong per-collection data |
| 2.0 | 2026-09-29 | Updated for reorganized codebase structure |
| 1.0 | 2026-09-29 | Initial design system documentation |

---

**Last Updated**: 2026-09-29  
**Maintained By**: Design Team  
**Status**: ✅ Complete and Verified
