# frozen_string_literal: true

module NexusCcs
  # Full-screen search opened by the header's search button.
  class SearchOverlayComponent < Blacklight::Component
    RECENT = 5

    delegate :search_action_url, to: :helpers

    # The visitor's latest searches this session (Blacklight keeps their ids in the session), newest first.
    def recent_searches
      ids = helpers.session[:history]
      ids.blank? ? [] : Search.where(id: ids).order(updated_at: :desc).limit(RECENT).to_a
    end

    def link_to_search(search)
      helpers.link_to_previous_search(helpers.search_state.reset(search.query_params).to_hash)
    end
  end
end
