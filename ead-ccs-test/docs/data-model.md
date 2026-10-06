# Data model

The data model is defined by two project workbooks in `data/` (not tracked in git):

| Workbook | Sheets used | Defines |
|---|---|---|
| `CCS-Field-labels-and-filters.xlsx` | CCS Field labels, CCS Filters | The 30 record display fields (label, sequence, source system, display rules) and the 22 filters (section, name, type) |
| `CCS-data-inventory.xlsx` | CCS Data Inventory - 9 Sept, CCS Datatypes, Complex fields, AH sequencing, Copyright Advice | 107 metadata building blocks: which systems hold each (M&C is EMu, MDHS is Vernon, Nexus DAM), whether it displays, what happens when it is unpopulated |

## How the app follows it

1. `python3 script/extract_data_model.py` (needs `pip install openpyxl`) turns the workbooks into
   `config/data_model/*.json`, which are committed so CI can read them. It is the same extraction the static
   CCS site uses, and the two copies are identical.
2. `config/data_model/solr_mapping.yml` says which Solr field carries each workbook field and filter, or
   **why none does yet** (`gap:`). Nothing is invented: a gap stays a gap until a source column exists.
3. `DataModel` (`app/models/data_model.rb`) joins the two.
4. `CatalogController` builds from `DataModel`:
   - **Record fields**: the workbook's labels, in its order, only for fields the data can carry. The title is
     the page heading. Fields with no value are omitted with their label, as the workbook specifies.
   - **Results list**: the fields marked `index` in the mapping.
   - **Facets**: the workbook's filters in sheet order, named as in the sheet, in its sections (Blacklight
     facet groups, titled in `config/locales/blacklight.en.yml`). Year selectors are range facets (date range
     with a histogram); "Browse + Search within this filter" filters are browsable with A-Z navigation and a
     modal; checkbox filters list all options.
5. `test/models/data_model_test.rb` fails if the app drifts: every field and filter mapped, every Solr field
   written by an indexer, facet order/names/sections/types, field labels and order, DAM fields all gaps.

To change the model: update the workbook, rerun the extractor, fill in `solr_mapping.yml` for anything new,
and the tests show what else must change. To fill a gap: add the source column to the indexer, replace
`gap:` with `solr:`, reindex.

## Record fields (Field labels sheet)

| # | Label | Source | Solr field |
|---|---|---|---|
| 1 | Title | CMS | `title_tsim` |
| 2 | Object Type | CMS | `object_type_ssim` (also in results) |
| 3 | Date | CMS | `production_date_ssim` (also in results) |
| 4 | Creator | CMS | `creator_display_ssim` (also in results) |
| 5 | Associated Entity | CMS | `associated_entity_ssim` |
| 6 | Place | CMS | `production_place_ssim` (also in results) |
| 7 | Description | CMS | `description_tsim` |
| 8 | Series | CMS | `series_ssim` |
| 9 | Editions | CMS | **gap**: Neither export has an Editions column. |
| 10 | Material | CMS | `material_ssim` |
| 11 | Dimensions | CMS | **gap**: Neither export has a dimensions column. |
| 12 | Inscription | CMS | **gap**: Neither export has an inscription column. |
| 13 | Language | CMS | **gap**: Inventory: language is held by neither M&C nor MDHS; EMu's Language Group column is empty. |
| 14 | Cultural Affiliation | CMS | `cultural_group_ssim` |
| 15 | Accession Number | CMS | `accession_number_ssim` |
| 16 | Copyright | CMS | `rights_ssim` |
| 17 | Credit Line | CMS | `credit_line_tsim` |
| 18 | Named Collection | CMS | `named_collection_ssim` |
| 19 | Collection | CMS | `collection_ssim` (also in results) |
| 20 | Access | CMS | **gap**: Inventory: physical access is held by neither system. EMu's Record Status (access_condition_ssi) is indexed but not shown; it is not an access condition and needs data-owner sign-off. |
| 21 | Classification | CMS | `classification_ssim` |
| 22 | Subject | CMS | `subject_ssim` |
| 23 | Source URL | CMS | **gap**: No source URL column in either export (the record page uses a placeholder link). |
| 24 | Related Parent Record | CMS | `parent_record_ssi` |
| 25 | Related Child Record | CMS | **gap**: A child link is the inverse of the parent link; it is not derived yet. |
| 26 | Related Record | CMS | `related_object_ssim` |
| 27 | Licence Type | DAM | **gap**: DAM field: no Nexus DAM export yet. |
| 28 | Advisory | DAM | **gap**: DAM field: no Nexus DAM export yet. |
| 29 | Terms of Use | DAM | **gap**: DAM field: no Nexus DAM export yet. |
| 30 | Producer | DAM | **gap**: DAM field: no Nexus DAM export yet. |

## Filters (Filters sheet)

| # | Section | Filter | Type | Solr field |
|---|---|---|---|---|
| 1 | Collection details | Collection Title | checkbox | `collection_ssim` |
| 2 | Collection details | Named Collections | browse | `named_collection_ssim` |
| 3 | Creator | Creator Name | browse | `creator_ssim` |
| 4 | Creator | Creator Date of Birth | year | `creator_birth_isim` |
| 5 | Creator | Creator Date of Death | year | `creator_death_isim` |
| 6 | Creator | Nationality | browse | **gap**: Inventory: held by M&C, but neither export has a nationality column. |
| 7 | Object | Production date | year | `date_start_isi` |
| 8 | Object | Date (Era, Period, Century) | browse | **gap**: Open question in the workbook: is the era/period/century derived? No source column. |
| 9 | Object | Classification | browse | `classification_ssim` |
| 10 | Object | Object Type | browse | `object_type_ssim` |
| 11 | Object | Materials / Medium | browse | `material_ssim` |
| 12 | Object | Language | browse | **gap**: Language is not held by either system. |
| 13 | Object | Region | browse | **gap**: Open question in the workbook: is Region derived from Place of Production? |
| 14 | Subject / Topic | Subject Terms | browse | `subject_ssim` |
| 15 | Subject / Topic | Subject Agent | other | **gap**: Workbook marks the filter type as 'Unsure' (is it the same as Creator Name?). |
| 16 | Subject / Topic | Subject Location | browse | `associated_entity_place_ssim` |
| 17 | Subject / Topic | Subject Event | browse | **gap**: No subject event in either export. |
| 18 | Copyright & Advisory | License type | checkbox | `licence_type_ssim` |
| 19 | Copyright & Advisory | Film & Gaming Classification | checkbox | **gap**: No film or gaming classification in either export. |
| 20 | Access | Object Access Condition | other | **gap**: Workbook marks the filter type as 'tbd' and asks whether it is needed. |
| 21 | Access | Digital asset Access Condition | other | **gap**: Workbook marks the filter type as 'tbd' and asks whether it is needed. |
| 22 | Media type | Digital Asset Format Type | checkbox | `digital_asset_format_ssim` |

## Indexer changes made to follow the model

- **Material.** The workbook's Material field covers "material techniques, medium and extent"; the EMu export
  carries it in its two `CADescription` columns (Medium, Extent and Medium), which were being indexed as
  *Description*. They are now `material_ssim`. EMu has no description in this export, so Description is
  Vernon only.
- **Series.** EMu's Series Title is its own field (`series_ssim`) rather than an alternative title.
- **Creator.** `creator_display_ssim` is "Name (born - died) Role". EMu repeats role, birth and death once per
  creator, with blanks kept, so they are aligned to the names by position (`Row#positional`); a column that
  is not one entry per creator is ignored rather than mismatched. `creator_birth_isim` and
  `creator_death_isim` hold the four-digit years for the year filters.
- **Associated Entity.** One field (`associated_entity_ssim`): EMu's collector and associated names, and
  Vernon's associated entities.
- **Licence type** (`licence_type_ssim`) is the bracketed licence at the start of EMu rights notes, for example
  "Copyright - Current". Vernon rights are free text with no such prefix.
- **Digital Asset Format Type** (`digital_asset_format_ssim`) is "Image" for the records that have a digital
  asset (audio, video and PDF are not indexed yet).

## Shown before, not in the workbook

The previous configuration showed or faceted on things the workbook does not define: Record Type, Place of
Production and Cultural/Language Group facets; Alternative Title, Creator Role, Source Reference, Preferred
Citation and Associated Place on the record. They are still indexed but no longer shown. Restoring any needs
sign-off from the data owners (the static site tracks such items in `data-model/extensions.json`).

## Known gaps

Fields and filters marked **gap** above, plus the workbook's open questions (for example whether Region and
Era/Period/Century are derived, and which Licence type options exist), which are unanswered. The Access
filters are marked "tbd" in the workbook, and EMu's Record Status is not an access condition, so
`access_condition_ssi` stays hidden. Digital-asset fields (Licence Type, Advisory, Terms of Use, Producer)
need a Nexus DAM export. Several held fields are sparse: Subject and Associated Place are EMu only, Cultural
Affiliation is populated on two records.
