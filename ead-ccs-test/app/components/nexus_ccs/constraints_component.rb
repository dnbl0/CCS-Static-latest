# frozen_string_literal: true

module NexusCcs
  # The line above the results: "385 results for" and the search and filters as removable pills. It sits in the
  # results toolbar (catalog/_sort_and_per_page), so Blacklight's own copy in the page header, which
  # builds this component without `inline:`, renders nothing. The "Start over" button is not used: pills
  # remove one thing each, and the sidebar has "Clear filters".
  class ConstraintsComponent < Blacklight::ConstraintsComponent
    def initialize(search_state:, inline: false, **)
      super(search_state: search_state, start_over_component: nil, classes: "constraints-container", **)
      @inline = inline
    end

    def render?
      @inline
    end

    def total
      helpers.instance_variable_get(:@response)&.total.to_i
    end

    def heading
      count = helpers.number_with_delimiter(total)
      text = "#{count} #{"result".pluralize(total)}"
      @search_state.has_constraints? ? "#{text} for" : text
    end
  end
end
