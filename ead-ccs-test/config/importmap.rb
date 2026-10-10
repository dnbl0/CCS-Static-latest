# Pin npm packages by running ./bin/importmap
pin "application"
pin "search_loading"
pin "page_loader"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
# Vendored ES modules (vendor/javascript); Bootstrap matches the bootstrap gem version
pin "bootstrap", to: "bootstrap.js"
pin "@popperjs/core", to: "popper-core.js"
pin "@github/auto-complete-element", to: "auto-complete-element.js"
pin "@github/combobox-nav", to: "combobox-nav.js"
# chart.js (and its one dependency) are a dependency of blacklight-range-limit. Vendored from the
# jsDelivr ES builds so the site makes no CDN requests; update versions together.
pin "chart.js", to: "chart.js"
pin "@kurkle/color", to: "kurkle-color.js"
