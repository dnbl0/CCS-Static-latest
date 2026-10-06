# frozen_string_literal: true

module NexusCcs
  # Record page header.
  # Subclass to bring Blacklight::Document::PageHeaderComponent sidecar
  # template links ("Start over" / "Back to search") inside the
  # .pagination-search-widgets box.
  class DocumentHeaderComponent < Blacklight::Document::PageHeaderComponent
  end
end
