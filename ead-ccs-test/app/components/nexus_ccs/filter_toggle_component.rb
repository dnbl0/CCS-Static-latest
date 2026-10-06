# frozen_string_literal: true

module NexusCcs
  # "Filters" button in the results toolbar that opens the filter drawer on small screens, with the number
  # of filters applied. Registered as a results collection tool, so it is built the way Blacklight builds
  # document actions.
  class FilterToggleComponent < Blacklight::Component
    def initialize(action: nil, **)
      @action = action
    end

    def applied_count
      helpers.search_state.filters.count { |filter| filter.values.any? }
    end
  end
end
