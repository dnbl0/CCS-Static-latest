# Results default to records with a digital asset

A search shows records that have a digital asset unless the visitor chooses otherwise (introduced in commit 7d5b7fc,
October 2026). The filter is applied by a redirect (`SearchDefaults`, called from `CatalogController`) and shown as a
removable pill; removing it adds an `any_assets` marker that travels on every link of that search. Advanced search does not
apply the default: the visitor sets Digital asset on its form.

## Consequences

Any link or test that wants every record must carry `any_assets`. The rules live in one module, `SearchDefaults`, which is
tested directly (`test/models/search_defaults_test.rb`).
