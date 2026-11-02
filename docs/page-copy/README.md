# Page copy

The words on each page of Cultural Collections Search (CCS), University of Melbourne, one Markdown file per page.

## How to use these files

- **Content producers:** read or review the page copy at the top of each file. To change it, edit the page named in "Source file", then run `npm run export:page-copy` to refresh these files. Do not edit these files by hand: they are overwritten.
- **Testers:** compare each file with the live page. The page copy is the text on the page, in reading order. The "Interface text" table at the bottom lists every button, form field, dropdown and image description, so you can check each one is there and spelled the same.

The header, footer and search overlay are the same on every page, so they are written once: [site-header.md](site-header.md) and [site-footer.md](site-footer.md).

## Pages

| Page | File | URL |
| --- | --- | --- |
| About | [about.md](about.md) | `/about.html` |
| Browse collections | [collections.md](collections.md) | `/collections/` |
| Item record (one sample record) | [collections-record.md](collections-record.md) | `/collections/record.html?item=CA-010071` |
| Help and support | [help.md](help.md) | `/help/` |
| Home | [home.md](home.md) | `/` |
| Advanced search | [search-advanced-search.md](search-advanced-search.md) | `/search/advanced-search.html` |
| Search results | [search-search-results.md](search-search-results.md) | `/search/search-results.html` |
| Search results: no results | [search-no-results.md](search-no-results.md) | `/search/search-results.html?q=zzzzqqqq` |
| Item record: record not found | [collections-record-not-found.md](collections-record-not-found.md) | `/collections/record.html?item=CA-999999` |
| Item record: restricted media ("Request to view") | [collections-record-restricted-media.md](collections-record-restricted-media.md) | `/collections/record.html?item=CA-000001` |
