# frozen_string_literal: true

module NexusCcs
  # The search form in the home page hero: the same bar as the search banner's (query, scope, search button, "Advanced
  # search" link), without the banner's band, title and copy.
  class HeroSearchComponent < SearchBannerComponent
    def advanced_search_url = helpers.advanced_search_catalog_path
  end
end
