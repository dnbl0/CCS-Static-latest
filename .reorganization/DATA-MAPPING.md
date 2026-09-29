# Data Mapping & Transformation Guide

**Phase 1 Deliverable**: Complete data mapping for reorganization  
**Date**: 2026-09-29  
**Purpose**: Document how data flows through website and map to new structure

---

## Data Flow Overview

```
Data Sources (assets/)
    ↓
Extraction & Processing
    ↓
Website Display (index.html, pages/)
    ↓
User Interface
    ↓
Export/Sharing
```

---

## 1. Help Documentation Data Flow

### Current Usage

#### Main Help Page
- **Source**: `assets/CCS Help - Main.docx`
- **Current Page**: `Help and Support.dc.html`
- **Display Method**: Content extracted and rendered in HTML
- **Data Shown**:
  - Help overview/introduction
  - Links to FAQ, search tips, access info
  - Contact information

#### Search Tips
- **Source**: `assets/CCS Help - Search Tips.docx`
- **Current Page**: `Collection Search v3.dc.html` (linked)
- **Display Method**: PDF link or embedded content
- **Data Shown**:
  - Boolean search operators (AND, OR, NOT)
  - Exact phrase search ("quotes")
  - Wildcard usage
  - Filter types and labels
  - Example searches

#### Access Information
- **Source**: `assets/CCS Help - Access and Information.docx`
- **Current Page**: `Collection Record.dc.html`
- **Display Method**: Modal/section on record page
- **Data Shown**:
  - Access levels (VIEW vs USE)
  - Digital asset information
  - Rights and licensing
  - How to request access

#### FAQ
- **Source**: `assets/CCS Help - Frequently Asked Questions.docx`
- **Current Page**: `Help and Support.dc.html`
- **Display Method**: Rendered in help page
- **Data Shown**:
  - Common user questions
  - Answers and explanations
  - Links to detailed help

#### Privacy Information
- **Source**: `assets/CCS Help - Privacy at UoM.docx`
- **Current Page**: Footer link or separate page
- **Display Method**: Static page or modal
- **Data Shown**:
  - University privacy policy
  - Data handling practices
  - Cookie information

#### Indigenous Statements
- **Source**: `assets/CCS Indigenous Cultural & Advisory Statements Approved 18 Sept.docx`
- **Current Page**: Homepage, footer, modal
- **Display Method**: Banner, modal, footer text
- **Data Shown**:
  - Land acknowledgement
  - Cultural protocols
  - Advisory statements for sensitive materials

#### Content Advisory
- **Source**: `assets/CCS Advisory - Film & Gaming.docx`
- **Current Page**: Search results, record pages
- **Display Method**: Banner/advisory box
- **Data Shown**:
  - Material warnings
  - Content restrictions
  - Sensitive material notices

### New Structure Mapping

**New Path**: `public/assets/documents/`

```
public/assets/documents/
├── help/
│   ├── main.md                      # Main help page
│   ├── search-tips.md               # Search guide
│   ├── access-and-information.md    # Access levels
│   ├── faq.md                       # Frequently asked questions
│   └── privacy.md                   # Privacy policy
├── advisory/
│   ├── indigenous-statements.md     # Land acknowledgement
│   └── film-gaming-advisory.md      # Content warnings
└── archive/
    ├── metadata-help.md             # Archived/removed docs
    ├── access-old.md
    └── citation-guide.md
```

**Format Conversion**:
- .docx → .md (Markdown format)
- Content extracted and reformatted for web
- Markdown for easy editing and version control
- HTML generated at build time or runtime

---

## 2. Data Inventory & Metadata Mapping

### CCS Data Inventory (xlsx)

**Source**: `assets/CCS Data inventory - final - 12 Aug.xlsx`

**Contains**: Complete specification of all data fields

**Usage in Website**:
- Defines what metadata is captured for each item
- Determines which fields are searchable/filterable
- Specifies how fields should be displayed
- Sets validation rules for data

**Mapping**:

| Inventory Field | Data Model | Display Location | Search/Filter |
|-----------------|-----------|-----------------|---|
| ID/Accession | accession_id | Record header | Yes (ID search) |
| Title | title | Record title, search result | Yes (full text) |
| Creator/Contributor | creator | Record metadata, search facet | Yes (facet) |
| Date/Period | date_created | Record metadata | Yes (range filter) |
| Description | description | Record details section | Yes (full text) |
| Material/Type | material_type | Record metadata | Yes (facet) |
| Format/Media Type | format | Asset display, filter | Yes (facet) |
| Subject/Keywords | subject | Record metadata, search | Yes (full text) |
| Rights/License | license | Rights section, badge | Yes (filter) |
| Access Level | access_level | Displayed as badge/restriction | Yes (filter) |
| Digital Asset | has_asset | Icon/indicator | Yes (filter) |
| Asset Format | asset_format | Media viewer, download | Yes (filter) |
| Collection | collection_id | Collection display, facet | Yes (facet) |
| Institution | institution | Collection info | No |
| Contact | contact_info | Record contact form | No |

**New Location**: `public/assets/data/metadata/field-definitions.json`

**Format**:
```json
{
  "fields": [
    {
      "id": "accession_id",
      "name": "Accession Number",
      "type": "string",
      "searchable": true,
      "filterable": false,
      "display": "header",
      "required": true
    },
    {
      "id": "title",
      "name": "Title",
      "type": "string",
      "searchable": true,
      "filterable": false,
      "display": "title",
      "required": true
    },
    ...
  ]
}
```

---

### CCS Fields & Filters (xlsx)

**Source**: `assets/CCS Fields and Filters.xlsx`

**Contains**: Configuration for search filters and facets

**Usage in Website**:
- Configures dropdown/checkbox options in search interface
- Labels for filter categories
- Default filter behavior
- Filter hierarchy

**Mapping**:

| Filter Category | Source Field | Data Type | Display In | Options/Values |
|-----------------|-------------|----------|-----------|---|
| Collection Type | collection_id | facet | Search sidebar | List of collections |
| Creator | creator | facet | Search sidebar | Autocomplete |
| Date Range | date_created | range | Search sidebar | From/To inputs |
| Format | format | facet | Search sidebar | Checkboxes |
| Material | material_type | facet | Search sidebar | Checkboxes |
| Subject | subject | facet | Search sidebar | Autocomplete |
| Access Level | access_level | facet | Search sidebar | Radio buttons |
| Digital Assets Only | has_asset | boolean | Search sidebar | Toggle |

**Labels** (from spreadsheet):
```
Collection Type → "Collections"
Creator → "Creator/Contributor"
Date Range → "Date Range"
Format → "Format Type"
Material → "Material Type"
Subject → "Subject"
Access Level → "Access & Viewing"
Digital Assets Only → "Has Digital Assets"
```

**New Location**: `public/assets/data/filters/`

**Format**:
```json
{
  "filters": [
    {
      "id": "format",
      "label": "Format Type",
      "type": "facet",
      "options": [
        { "value": "image", "label": "Image" },
        { "value": "audio", "label": "Audio" },
        { "value": "video", "label": "Video" },
        { "value": "document", "label": "Document" }
      ]
    },
    ...
  ]
}
```

---

## 3. Collection Metadata Mapping

### UNI-722 Collection Metadata

**Sources**: 
- `assets/UNI-722-metadata.csv`
- `assets/UNI-722-metadata.txt`
- `assets/Collections images/UNI-722-metadata.*` (duplicates)

**Contains**: Actual metadata for ~70 collection items

**Metadata Fields** (inferred structure):

| Field | Example | Type | Usage |
|-------|---------|------|-------|
| ID | 1973_0004 | String | Unique identifier, persistent link |
| Title | Historic Scientific Instrument | String | Display in results/records |
| Creator | John Smith | String | Attribution, search facet |
| Date | 1925 | Date | Chronological sorting, range filter |
| Description | A rare microscope from the 1920s | Text | Full item display |
| Material | Glass, Brass | String | Filter facet |
| Format | Physical Item | String | Type indicator |
| Digital Asset | Yes/No | Boolean | Toggle filter |
| Asset Format | JPG, MP3 | String | Display in viewer |
| Collection | Grainger Museum | String | Collection grouping |
| Access | VIEW | Enum | Access restriction badge |
| License | CC-BY | String | Rights/license display |

**Current Display Usage**:

1. **Search Results**:
   - ID (small, top)
   - Title (prominent)
   - Creator (subtitle)
   - Asset thumbnail (image if available)
   - Access badge (colored label)

2. **Record Detail Page**:
   - Title (large heading)
   - Creator (byline)
   - Date (metadata row)
   - Description (large text block)
   - Material (metadata row)
   - Format (metadata row)
   - Media viewer (if asset available)
   - Metadata section (all fields)
   - Sidebar (closed by default, toggle with I key)

3. **Filters/Facets**:
   - Format filter → uses "Format" field
   - Creator filter → uses "Creator" field
   - Date range → uses "Date" field
   - Material filter → uses "Material" field
   - Collection filter → uses "Collection" field
   - Access filter → uses "Access" field

**New Location**: `public/assets/data/collections/uni-722/`

**Format Structure**:
```
public/assets/data/collections/uni-722/
├── metadata.json           # Structured collection metadata
├── items.json             # Individual item records
├── field-map.json         # Field→Display mapping
└── images/
    ├── [item images]
    └── index.json         # Image references
```

**Item Record Format** (JSON):
```json
{
  "id": "1973_0004",
  "title": "Scientific Instrument",
  "creator": "John Smith",
  "date": "1925",
  "description": "A rare microscope...",
  "material": "Glass, Brass",
  "format": "Physical Item",
  "collection": "Grainger Museum",
  "access_level": "VIEW",
  "license": "CC-BY",
  "digital_asset": {
    "available": true,
    "format": "JPG",
    "url": "/public/assets/images/collections/uni-722/1973-0004.jpg",
    "size": "2000x2000",
    "ppi": 300
  }
}
```

---

## 4. Collection Images Mapping

### Image Data Organization

**Current Locations**:
1. `assets/Collections images/Original Format/` (~25 images)
2. `assets/Original Format/` (~20 images, duplicates)
3. `assets/Image jpeg 2,000px, 300ppi/` (4 images)
4. `assets/20260909-005/Image jpeg 2,000px, 300ppi/` (~70 images)

**Usage**:
- Display in search results (thumbnail)
- Display in record detail (full resolution)
- Print/export (high resolution)
- Fullscreen view (via media viewer)

**New Structure** (consolidated):

```
public/assets/images/collections/
├── uni-722/
│   ├── 1973-0004.jpg              # Item 1973_0004 image
│   ├── bolex-h16.jpg              # Item image
│   ├── [~70 more images]
│   ├── metadata.csv               # Image metadata reference
│   └── index.json                 # Image index with item IDs
├── grainger/                       # Other collections (future)
└── index.json                      # Collections index
```

**Image Naming Convention** (new):
- Use kebab-case: `1973-0004.jpg` (not `1973_0004_000_000_1.jpg`)
- Include accession ID: `[accession-id].jpg`
- Multiple images per item: `[accession-id]-01.jpg`, `[accession-id]-02.jpg`

**Resolution Mapping**:
- Thumbnail: 200x200px, 72ppi (for search results)
- Display: 800x800px, 150ppi (for record page)
- Full: 2000x2000px, 300ppi (for zoom/print)
- Archive: Original format (TIFF, etc.)

**Image Index** (`public/assets/images/collections/uni-722/index.json`):
```json
{
  "collection": "uni-722",
  "total_items": 70,
  "images": [
    {
      "id": "1973-0004",
      "accession_id": "1973_0004",
      "title": "Scientific Instrument",
      "files": {
        "thumbnail": "1973-0004.jpg",
        "display": "1973-0004-display.jpg",
        "full": "1973-0004-full.jpg"
      }
    },
    ...
  ]
}
```

---

## 5. Media Samples Mapping

### Audio/Video Media

**Source**: `assets/20260909-005/Audio MP3 SD/` and `Video MP4 SD/`

**Files**:
- Audio: `GraingerLowRes.mp3` (~5MB)
- Video: 
  - `CROOKS_Daniel_2016_STATICNO19_SHIBUYA_RORSCHACH_access_copy.mp4` (~75MB)
  - `MHM2014.137.2_2.mp4` (~75MB)

**Usage**:
- Media viewer (fullscreen, keyboard controls)
- Format demonstration (testing different media types)
- Collection item display (if collection has audio/video)

**New Location**: `public/assets/images/collections/uni-722/media/`

**Structure**:
```
public/assets/images/collections/uni-722/media/
├── audio/
│   └── grainger-low-res.mp3
├── video/
│   ├── crooks-daniel-2016.mp4
│   └── mhm2014-137-2.mp4
└── media-index.json
```

**Media Index** (JSON):
```json
{
  "media": [
    {
      "id": "grainger-audio",
      "accession_id": "UNI-722-001",
      "type": "audio",
      "format": "MP3",
      "file": "grainger-low-res.mp3",
      "duration": "3:45",
      "size": "5MB",
      "url": "/public/assets/images/collections/uni-722/media/audio/grainger-low-res.mp3"
    },
    ...
  ]
}
```

---

## 6. Data Reference Documentation

### Reference Documents

**Source**: `assets/D184 Approach to preparing static copy for CCS.docx`

**Purpose**: How to prepare and structure collection data for import

**Usage**: Developer reference, data preparation guide

**New Location**: `public/assets/documents/guides/data-preparation.md`

---

## Data Transformation Requirements

### Documentation (.docx → .md)

1. **Extract Content**: Open each .docx file
2. **Convert to Markdown**: Use pandoc or manual conversion
3. **Add Metadata**: Title, date, status
4. **Link References**: Update links to point to new structure
5. **Validate**: Ensure formatting preserved

**Command Example**:
```bash
pandoc "CCS Help - Main.docx" -o "help-main.md"
```

### Metadata (CSV/TXT → JSON)

1. **Parse CSV**: Read UNI-722-metadata.csv
2. **Create JSON**: Convert rows to objects
3. **Validate**: Ensure all fields present
4. **Link Images**: Map item IDs to image files
5. **Create Index**: List all items with references

**Python Script Needed**:
```python
import csv
import json

# Read CSV
with open('UNI-722-metadata.csv') as f:
    reader = csv.DictReader(f)
    items = list(reader)

# Convert to JSON
output = {
    'collection': 'uni-722',
    'total_items': len(items),
    'items': items
}

# Write JSON
with open('uni-722-items.json', 'w') as f:
    json.dump(output, f, indent=2)
```

### Filters (xlsx → JSON)

1. **Extract Filter Config**: Read CCS Fields and Filters.xlsx
2. **Map to Categories**: Collection, Creator, Date, etc.
3. **Create JSON**: Define filter structure
4. **Add Labels**: Use labels from spreadsheet
5. **Validate**: Test in search interface

**Structure**:
```json
{
  "filters": [
    {
      "id": "collection",
      "label": "Collection",
      "type": "facet",
      "field": "collection_id",
      "options": [...],
      "display": "dropdown"
    },
    ...
  ]
}
```

### Images (scatter → organized)

1. **Consolidate**: Move all images to uni-722 folder
2. **Rename**: Use kebab-case from accession ID
3. **Create Variants**: Thumbnail, display, full-res
4. **Remove Duplicates**: Keep only highest quality
5. **Create Index**: Map items to images

**Consolidation Strategy**:
```bash
# Move collections images
cp -r "assets/Collections images/Original Format/"* \
  "public/assets/images/collections/uni-722/"

# Deduplicate with best quality
# Keep originals, link from all locations
```

---

## Data Dependency Matrix

| Data Source | Used By | Current Location | New Location | Status |
|-------------|---------|------------------|--------------|--------|
| Help Main | Help page | assets/CCS Help - Main.docx | docs/help/main.md | Content |
| Search Tips | Search page | assets/CCS Help - Search Tips.docx | docs/help/search-tips.md | Content |
| Access Info | Record page | assets/CCS Help - Access and Information.docx | docs/help/access.md | Content |
| FAQ | Help page | assets/CCS Help - Frequently Asked Questions.docx | docs/help/faq.md | Content |
| Privacy | Footer | assets/CCS Help - Privacy at UoM.docx | docs/help/privacy.md | Content |
| Indigenous Statements | Header/Footer/Modal | assets/CCS Indigenous... | docs/advisory/indigenous.md | Content |
| Film Advisory | Record page | assets/CCS Advisory - Film & Gaming.docx | docs/advisory/film-gaming.md | Content |
| Data Inventory | Data schema | assets/CCS Data inventory.xlsx | public/assets/data/schema/ | JSON |
| Filter Config | Search UI | assets/CCS Fields and Filters.xlsx | public/assets/data/filters/ | JSON |
| Metadata | Record data | assets/UNI-722-metadata.csv | public/assets/data/collections/uni-722/ | JSON |
| Collection Images | Search/Record | assets/Collections images/ | public/assets/images/collections/uni-722/ | JPG |
| Media Files | Media viewer | assets/20260909-005/Media/ | public/assets/images/collections/uni-722/media/ | Audio/Video |

---

## Data Validation Rules

Before and after reorganization, validate:

### Metadata Validation
- [ ] All required fields present
- [ ] Date format consistent (YYYY or YYYY-MM-DD)
- [ ] Creator field not empty
- [ ] Accession ID unique
- [ ] Access level in (VIEW, USE, RESTRICTED)
- [ ] License in approved list

### Image Validation
- [ ] All images linked to items
- [ ] File formats supported (JPG, PNG, TIFF)
- [ ] Image dimensions meet requirements
- [ ] No broken image references
- [ ] All images have metadata

### Filter Validation
- [ ] All filter options defined
- [ ] Filter labels match data
- [ ] Filter queries working
- [ ] No orphaned filters
- [ ] Facet counts accurate

### Documentation Validation
- [ ] All help pages present
- [ ] Links working
- [ ] Content readable (no formatting issues)
- [ ] Images/icons display correctly
- [ ] No broken references

---

## Sign-Off & Approval

### Phase 1 Completion
- [x] Data audit complete
- [x] All data mapped
- [x] Usage documented
- [x] New structure defined
- [ ] Transformations planned
- [ ] Validation rules defined
- [ ] Team approval obtained
- [ ] Ready for Phase 2

### Next Steps
1. Review and approve this mapping
2. Create transformation scripts
3. Test data transformations
4. Validate all data
5. Begin Phase 2 migration

---

**Document Owner**: Development Team  
**Status**: Phase 1 - Ready for Review  
**Last Updated**: 2026-09-29  
**Approval Needed**: Product Owner, Data Manager

