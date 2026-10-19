# frozen_string_literal: true

module NexusCcs
  # A slim navy bar fixed to the top of the window with the search form. It slides in once the page's banner has
  # scrolled out of view and slides away again when the banner comes back (controllers/sticky_search_controller.js).
  # Built from Bootstrap's own classes (position-fixed, container, input-group, form-control, btn), so it sits
  # with Blacklight's Bootstrap markup. The form is a plain GET to Blacklight's search, like the header's search.
  class StickySearchComponent < ViewComponent::Base
    # The first of these on the page is "the banner": the home page hero, the search banner and the content pages' banner.
    BANNERS = ".ccs-hero, .search-banner, .page-banner, .record-banner"

    delegate :search_catalog_path, to: :helpers

    def query = helpers.params[:q].presence
  end
end
