# frozen_string_literal: true

module NexusCcs
  # The UoM header for the branded stock record page (BrandedStockCatalogController): the site's header, unchanged,
  # with the breadcrumb of a record page. HeaderComponent only recognises the real catalog controller, so the
  # trail is given here; it draws no search banner, as the page under it is Blacklight's own.
  class StockHeaderComponent < HeaderComponent
    def breadcrumbs = [ [ "Search results", search_action_url ], [ record_title, nil ] ]

    def show_search_banner? = false
  end
end
