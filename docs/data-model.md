# CCS data model

The data model is defined by two project workbooks. Their content is extracted to `data-model/*.json` (committed, so CI can read it) and the site is
checked against it by `tests/data-model.test.js`.

| Workbook (in `assets/`) | Sheet | Extracted to | What it defines |
|---|---|---|---|
| CCS Field labels and filters - Final - PRG - 1 OCT 2026.xlsx | CCS Field labels | `field-labels.json` | The 30 record display fields: label, sequence number, data type, source system (CMS or DAM), display rules, examples |
| | CCS Filters | `filters.json` | The 22 filters: section, name, type (checkbox, browse + search, year selector), options, data model reference |
| CCS Data inventory - final.xlsx | CCS Data Inventory - 9 Sept | `inventory.json` | 107 metadata building blocks: data type, which collections hold them (M&C, MDHS, Nexus DAM), whether they display, mandatory/optional with and without a digital asset, faceted search, what happens when unpopulated |
| | CCS Datatypes | `datatypes.json` | The 20 data types and their attributes (Identifier, Title, Text, Agent, Date, Place, Collection, ...) |
| | Complex fields | `complex-fields.json` | Constructed fields (the digital asset caption) |
| | AH sequencing | `sequencing.json` | Order of appearance and simple/complex per field |
| | Copyright Advice | `copyright-advice.json` | Approved by UoM Legal and Copyright 10/08/26: which rights statements must appear |
| | CCS Data Inventory - 18 Aug, - Superseeded | not used | Older versions of the inventory |

Regenerate after a workbook changes: `pip install openpyxl && python3 scripts/extract-data-model.py`, then commit `data-model/`.

## What the tests enforce
- **Filters:** every sheet filter is on the site, in the sheet's order, in the sheet's section, with the sheet's behaviour (year selectors, "search within this filter"). The spelling License/Licence is treated as the same word.
- **Record fields:** every label shown on a record is a sheet label (or a listed extension) with the sheet's sequence number. Title, Collection and Responsible Unit are on every record (the inventory says a record cannot display without them). Credit line and Copyright are on every record (Copyright Advice: mandatory).
- **Unpopulated fields are omitted, label included** (inventory: "Field does not display"). Accession number and Caption therefore only appear when recorded; there are no "Not recorded" placeholders. Accession number is shown once, in the details list (Field labels row 15); it used to appear a second time in the usage-rights block.

## Extensions (not in the workbooks)
`data-model/extensions.json` lists what the site shows beyond the workbooks, each with a reason. They need sign-off from the data owners or removal:
filters Creator role, Object's place of production, Accession number, Theme, Cultural affiliation; record labels UoM ID (the inventory says Collection Asset ID does not display) and Caption (comes from the Complex fields sheet).

## Media metadata sidebar (Field labels rows 27-30)
Rows 27 to 30 of the Field labels sheet (Licence Type, Advisory, Terms of Use, Producer; all DAM fields) are the **media metadata sidebar / flyout** for digital assets, opened with the info button on the media viewer. They appear there only, in that order, and are omitted when empty (Licence Type and Terms of Use are always present on a digital asset). They are not in the details list or the page body: Producer was removed from the details list and Terms of use from the usage-rights block. Web access (a Nexus DAM status that is not in the Field labels sheet) stays in the usage-rights block. `tests/data-model.test.js` enforces all of this.

## Digital asset caption
The Complex fields sheet gives the recipe for the Image Caption (DA Caption):
`[DA Title]. [CA Date]. [CA Creator] [DOB-DOD]. [Role]. [Affiliation]. [CA Material]. [Copyright holder]. [Collection title]. [Credit line]. Image: [DA Creator]. [DA date].`
Title, Copyright holder, Credit line and Collection title are mandatory, missing parts are dropped. The sheet notes the collection managers want to populate the caption in the DAM (open question 3), so a caption supplied by the DAM (`it.caption`) always wins; otherwise `collection-data.js` composes it from the record. All 47 digital-asset records now have a caption; `tests/data-model.test.js` checks the mandatory parts, the order and that records without a digital asset have none. Not yet in the data: DA Creator / Image producer and their date (no source field), and the person/organisation variants (location, start date) for organisation creators.

## Accession numbers
`data-model/accession-gaps.json` tracks records that lack an accession number (mandatory in the inventory) with candidates found in the EMu and Vernon exports. Record 20 was filled (1973.0004.000.000). The other 11 are listed with the reason: 8 are hand-authored prototype records (ids 1 to 32) whose details do not match any export row uniquely; record 10098's EMu row has a blank accession (needs Museums and Collections). A new gap or a stale entry fails the test.

## Known data gaps (warnings, not failures)
- Field labels populated on no record: Editions, Source URL, Related Child Record, Producer.
- 11 of 728 records have no accession number (see Accession numbers above).
- The two workbooks disagree on sequence numbers (the inventory's "Sequence of appearance" differs from the Field labels sheet). The site follows the Field labels sheet, which is the later "Final - PRG" file.
- Open questions recorded in the sheets (for example whether Region is derived from Place of Production, and which Licence type options exist) are unanswered; the site keeps its current behaviour.
