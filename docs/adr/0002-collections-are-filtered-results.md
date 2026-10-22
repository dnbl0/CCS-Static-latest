# Collections are filtered results, and URLs stay Blacklight's

A collection has no landing page: it is `/catalog?f[collection_ssim][]=<name>`. The five collection landing pages were removed on
2026-10-16 and `/collections/<slug>` redirects to the filtered results; `/collections` redirects to the home page's collection
cards. The site keeps Blacklight's own URLs (`/catalog`, `/catalog/:id`, `/catalog/advanced`, `/search_history`) rather than
inventing its own, so the gem's links, tests and documentation keep working.
