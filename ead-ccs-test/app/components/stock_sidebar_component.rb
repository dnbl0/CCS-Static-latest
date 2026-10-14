# frozen_string_literal: true

# Blacklight::Document::SidebarComponent (the record page's show tools and "more like this"), left out. The stock record
# page configures no show tools, so the sidebar has nothing in it; but rendering it still writes view-annotation
# comments in development, and Blacklight's layout takes any content_for(:sidebar) as a sidebar and reserves a
# 3-column, empty column for it, pushing the record to the right. Without it the layout falls back to its own
# full-width column.
class StockSidebarComponent < Blacklight::Document::SidebarComponent
  def render? = false
end
