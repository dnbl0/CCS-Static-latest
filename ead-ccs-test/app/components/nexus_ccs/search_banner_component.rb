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

    # The query the chip shows, and where removing it goes: the same search without it (filters stay)
    def query
      helpers.params[:q].presence
    end

    def clear_query_url
      helpers.search_action_url(helpers.search_state.params_for_search.except(:q, :page, :qt))
    end

    def chip_data
      # Always attached: without a query it only puts the cursor in the box after a chip was cleared
      return { controller: "search-chip" } unless query

      { controller: "search-chip", "search-chip-query-value": query, "search-chip-clear-url-value": clear_query_url }
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
