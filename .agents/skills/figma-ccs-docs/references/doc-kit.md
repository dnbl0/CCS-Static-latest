# The Doc kit

Page `5:6` in the CCS Component Library file (`cbE2B9pmg3rSWNuvT2qcfd`). Everything a doc
page is built from lives here. Verified 2026-10-21 with `get_metadata`.

The page holds two sections:

- `17:2952` **"Doc kit"** — the live parts.
- `188:22127` **"Archive"** — two parts that are still in use but were parked here:
  `Doc / Section` (5:27) and `Doc / Header` (5:12). Moving them back into `17:2952` is a
  standing clean-up, and the live kit section is 3460 wide against a 3400 house limit.

## Live parts (section 17:2952)

| Master | id | Variants | Size |
|---|---|---|---|
| Doc / Code chip | 5:8 | | 100×28 |
| Doc / Marker | 5:10 | | 24×24 |
| Doc / Subsection | 5:28 | | 832×182 |
| Doc / Stage | 5:41 | Surface=Light (5:32), Surface=White (5:35), Surface=Inverse (5:38) | 912×881 |
| Doc / Note | 6:11 | Kind=Info (6:2), Kind=Warning (6:5), Kind=Dev note (6:8) | 912×425 |
| Doc / Table row | 6:36 | Header 2/3/4 col (6:12, 6:15, 6:19), Body 2/3/4 col (6:24, 6:27, 6:31), Specimen 2 col (55:16272), Code 3 col (94:18374) | 912×741 |
| Doc / Table | 6:37 | | 832×96 |
| Doc / State cell | 6:39 | | 400×194 |
| Doc / Legend item | 6:44 | | 400×44 |
| Doc / Guidance | 6:58 | Kind=Do (6:50), Kind=Don't (6:54) | 912×665 |
| Doc / Table swatch | 55:16278 | | 40×40 |
| Doc / Table spacing preview | 59:19264 | | 48×16 |
| Doc / Type row: Header | 77:277 | | 832×58 |
| Doc / Type row | 77:283 | | 832×133 |
| Doc / Icon card | 97:240 | | 125×86 |
| Doc / Icon grid | 97:248 | | 832×100 |
| Doc / State grid | 97:250 | | 832×100 |
| Doc / Page section | 160:229 | Background=White (160:230), Background=Light (160:235) | 1360×794 |

## Parts parked in the Archive section

| Master | id | Variants | Size |
|---|---|---|---|
| Doc / Section | 5:27 | Background=White (5:17), Background=Light (5:22) | 1424×578 |
| Doc / Header | 5:12 | | 1344×268 |

## What a doc page is made of

The Button page (`204:975`) is the reference for the current structure. Frame
`Doc / Page / Button` (`204:976`) holds:

- `page/header` instance (`204:977`) — the `Doc / Header` master, renamed on the instance.
- A page-section instance (`204:978`) holding a `Heading` slot (Title + Description) and a
  `Content` slot.
- Inside `Content`: a `Doc / Stage` instance (`204:983`) with a `Specimen` slot and a
  `Caption` text layer, then a `Doc / Table` instance (`204:984`) whose `Rows` slot holds
  `Doc / Table row` instances. Each row has a `Cell 1 content` frame with a hidden
  `Leading` slot plus `Cell 1`…`Cell 4` text layers.

Note the width drift: `Doc / Page section` is built at 1280 wide, the house page width is
1344, and the Button page frame is 1720 wide. The three disagree. Fix one and the others
follow — see `references/doc-pages.md`.

## Extending the kit

The house standard is in `figma-doc-components`. In short: build the master with its final
name, bind every padding, gap, radius and fill to a variable, expose the text layers
authors edit, give every master a description and a `documentationLinks` entry, and add
the part to `references/doc-kit.md` in this skill with its id.

Do not add a part with fewer than three uses unless it is irreplaceable, and do not
encode a page name in a master name — add a slot instead.
