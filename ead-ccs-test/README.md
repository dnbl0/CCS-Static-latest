# README

**New here? Start with [docs/running-the-app.md](docs/running-the-app.md)**: step-by-step instructions to run this app on your computer
(Ruby, PostgreSQL, Solr), check it works and fix common problems. How it runs on Azure is in
[../infra/azure/README.md](../infra/azure/README.md).

# System dependencies

Ruby version 

# Configuration

## Secrets

Application secrets (`SECRET_KEY_BASE`, the database URL/password, and the Solr
credentials) are stored in AWS Secrets Manager and synced into the cluster by the
External Secrets Operator — nothing sensitive is committed to git. The Solr password is
the one value that also lives in this repo, as a hash in `solr/security.json` (see below).

See [docs/secrets.md](docs/secrets.md) for the full architecture (the AWS → ESO →
Kubernetes flow and the cross-account IAM role chain) and rotation instructions.

## Solr
### Password Encoding
As the dev branch instance of Solr is exposed to the uni network, basic authentication has been configured.
Solr stores passwords in the format: base64(sha256(sha256(salt+password))) base64(salt).

If you edit solr/security.json directly then you need to encode the password yourself. You can visit https://clemente-biondo.github.io/ to use a simple web utility that does the encoding for you.

The Solr password is stored in **two places that must stay in sync**: the hash in
`solr/security.json` and the plaintext in the AWS secret (`SOLR_PASSWORD` / `SOLR_URL`).
See [docs/secrets.md](docs/secrets.md#solr-authentication) for how to rotate it correctly.

### Facets
Defined in app/controllers/catalog_controller.rb

* Database creation

* Database initialization

# Deployment

## If changes are made to Solr schema
 In the Solr pod: /var/solr is a ReadWriteOnce PVC (solr.yaml) that survives redeploys. So rebuilding the Solr image will not update blacklight-core. After deploying the changes, you will need to:
 1. Delete the Blacklight core 
 Within the Solr pod: ```rm -rf /var/solr/data/blacklight-core```
 then delete the Solr replicaset (a quick way to run solr-precreate).
 2. Re-run the indexer:
 Within the Rails ead-ccs pod:
```
/app/bin/docker-entrypoint.sh bundle exec rails collections:clear && rails collections:index
```
 3. Confirm that the schema changes have been applied: (still in the ead-ccs pod)
```
curl -s "$SOLR_URL/schema"
```

# Testing

This application uses Rails' default Minitest (rather than Rspec).
Tests can be run using the standard (Rails Test Commands)[https://guides.rubyonrails.org/testing.html]

Eg:

```bin/rails test -p``` — Run all tests
```bin/rails test test/models/boolean_syntax_test.rb``` - Run a specific test file
```bin/rails test test/models/user_test.rb:8``` - Run a single test on line 8

* Services (job queues, cache servers, search engines, etc.)

# Modifications from base Blacklight Project

## Content pages (home, collections, help, contact, about)

`PagesController` serves the pages of the static prototype (`public/` in the repository root) so the two sites match:
`/` (home), `/collections`, `/collections/<slug>`, `/help` (one page; sections `#faq`, `#copyright`, `#access`, `#privacy`),
`/help/search-tips`, `/help/indigenous-data`, `/contact` and `/about`. The search results live at `/catalog`.

* Views are in `app/views/pages` (layout `layouts/pages`). The five collection landing pages share
  `pages/collection.html.erb`; their text is in `config/pages.yml`. The Browse collections cards on the home, collections and about pages are one partial, `pages/_browse_collections.html.erb`. The help sections are
  `pages/help/_sections.html.erb`.
* Record counts on the browse page come from Solr when it is reachable and are left out otherwise.
* The styles and images are generated from the static site, which is their source: `app/assets/stylesheets/pages`,
  `tokens/static_site.css` and `app/assets/images/site/` are written by `node scripts/sync-rails-assets.js` (run
  `npm run sync:rails` at the repository root) and checked by `npm test`. Never edit those files by hand: change
  `public/styles` or `public/images` and re-run the script. The page copy is separate: the static pages and
  `config/pages.yml` / the views here are edited together by hand. The header and footer are the existing
  `NexusCcs` components.
* `npm run parity` (with both sites running) compares computed styles of the same elements on each static page and its
  Rails twin at 1440px and 390px; it runs in the `Rails CI` workflow.

## UI

### Component overrides

Blacklight exposes most of its ViewComponents as configuration properties, so these
are swapped in `app/controllers/catalog_controller.rb` rather than by copying gem
files into `app/views`.

### Configuration overrides

#### The Rails Router
Added a scope constraint to the routes with a matching dynamic segment in config/routes.rb to prevent Rails splitting the url on ".", allowing asset Ids to contains dots etc.

#### Record page header

- Component: app/components/nexus_ccs/document_header_component.rb
- Template: app/components/nexus_ccs/document_header_component.html.erb
- Wiring: `config.show.document_header_component` in app/controllers/catalog_controller.rb
- Styling: `.nexus-record-nav` in app/assets/stylesheets/unimelb.css

### Partial template additions

#### Acknowledgement of Country
- Controller: app/controllers/concerns/country_acknowledgement.rb
- View: app/views/catalog/_country_acknowledgement.html.erb
- Interactivity: app/javascript/controllers/acknowledgement_controller.js
- Text: config/locales/en.yml

Note: To change the interval with which the *Acknowledgement of Country* Modal is displayed, edit the line in app/controllers/concerns/country_acknowledgement.rb:
ACKNOWLEDGEMENT_PERIOD: 7.days, 12.hours, 30.days

#### External link modal (You're leaving this site)
- Component: app/components/nexus_ccs/view_full_record_component.rb
- View: app/components/nexus_ccs/view_full_record_component.html.erb
- Interactivity: app/javascript/controllers/dialog_controller.js
- Icon: app/components/nexus_ccs/icons/open_in_new_component.rb
- Text: config/locales/en.yml
- Styling: `.show-tools`, `.uom-action`, `.uom-dialog` in app/assets/stylesheets/unimelb.css

### Partial template overrides

#### Result cards
**catalog/_document_list.html.erb**

### Icons
Blacklight has an icon namespace convention, where we need to define custom icons in our own namespace rather than editing Blacklight::Icons or using an additional icon font or import process.
Custom icon components are defined in app/components/nexus_ccs/icons/