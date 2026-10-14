# frozen_string_literal: true

# Blacklight::Document::PageHeaderComponent (the "applied search" constraints, #appliedParams, and the Back to search / Previous
# / Next widgets, .pagination-search-widgets, that sit above a record reached from a search), left out: the stock record page
# does not show them. Blacklight's own show view asks the config's document_header_component to draw them, so this is set there.
class StockPageHeaderComponent < Blacklight::Document::PageHeaderComponent
  def render? = false
end
