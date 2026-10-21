# frozen_string_literal: true

module NexusCcs
  # The line above the results: "385 results for" and the search and filters as removable pills. It sits in the
  # results toolbar (catalog/_sort_and_per_page), so Blacklight's own copy in the page header, which
  # builds this component without `inline:`, renders nothing. The "Start over" button is not used: pills
  # remove one thing each, and the sidebar has "Clear all".
  class ConstraintsComponent < Blacklight::ConstraintsComponent
    def initialize(search_state:, inline: false, **)
      super(search_state: search_state, start_over_component: nil, classes: "constraints-container", **)
      @inline = inline
    end

    def render?
      @inline
    end

    # The rows of an Advanced search, each saying how its words match
    def clause_presenters
      return to_enum(:clause_presenters) unless block_given?

      @search_state.clause_params.each do |key, clause|
        field_config = helpers.blacklight_config.search_fields[clause[:field]]
        yield NexusCcs::AdvancedClausePresenter.new(key, clause, field_config, helpers)
      end
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
