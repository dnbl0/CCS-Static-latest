# frozen_string_literal: true

module NexusCcs
  # Dark banner under the site header: page title, result summary and the search form.
  # Takes the place of Blacklight's light search band (Blacklight::SearchNavbarComponent).
  class SearchBannerComponent < Blacklight::SearchNavbarComponent
    TITLE = "Search the Collection"
    DESCRIPTION = "Explore artworks, objects, manuscripts, photographs and recordings held across the University of Melbourne's cultural collections."

    # The gem's default classes size the form with grid columns; the banner sizes it in CSS.
    def search_bar_component
      search_bar_component_class.new(
        url: helpers.search_action_url,
        advanced_search_url: helpers.search_action_url(action: "advanced_search"),
        params: helpers.search_state.params_for_search.except(:qt),
        autocomplete_path: suggest_index_catalog_path,
        classes: %w[search-query-form search-banner__form]
      )
    end

    def summary
      total = helpers.instance_variable_get(:@response)&.total
      return if total.nil? || !helpers.has_search_parameters?

      query = helpers.params[:q].presence
      text = "#{helpers.number_with_delimiter(total)} #{"result".pluralize(total)}"
      query ? safe_join([ text, " for “#{query}”" ]) : text
    end
  end
end
