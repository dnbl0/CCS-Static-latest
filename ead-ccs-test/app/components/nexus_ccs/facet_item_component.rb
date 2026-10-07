# frozen_string_literal: true

module NexusCcs
  # One value in a filter panel. Blacklight shows a selected value as plain text followed by a small "x" link;
  # here the ticked value is itself the link that removes it, as on the static search page, so there is one
  # control per row and its name says what it does ("Remove filter Collection Title: Medical History Museum").
  class FacetItemComponent < Blacklight::Facets::ItemComponent
    def initialize(facet_item:, **)
      super
      @facet_item = facet_item
    end

    def render_selected_facet_value
      tag.span(class: "facet-label") do
        link_to(label, href, class: "facet-select is-selected", rel: "nofollow", role: "checkbox",
                             aria: { checked: "true", label: remove_label })
      end + render_facet_count(classes: [ "selected" ])
    end

    private

    def remove_label
      "Remove filter #{@facet_item.facet_config.label}: #{label}"
    end
  end
end
