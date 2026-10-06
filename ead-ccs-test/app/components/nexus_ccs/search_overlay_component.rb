# frozen_string_literal: true

module NexusCcs
  # Full-screen search opened by the header's search button.
  class SearchOverlayComponent < Blacklight::Component
    delegate :search_action_url, to: :helpers
  end
end
