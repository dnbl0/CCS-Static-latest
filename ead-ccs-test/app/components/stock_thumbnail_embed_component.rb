# frozen_string_literal: true

# Draws Blacklight's own thumbnail (Blacklight::Document::ThumbnailComponent, unchanged) in the document component's
# `embed` slot, which sits between the title and the metadata. The component's own thumbnail slot is after the
# metadata and cannot be moved by configuration. Used by StockCatalogController only.
class StockThumbnailEmbedComponent < Blacklight::Component
  def initialize(presenter:, document_counter: nil, **)
    @presenter = presenter
    @document_counter = document_counter
  end

  def call
    render Blacklight::Document::ThumbnailComponent.new(presenter: @presenter, counter: @document_counter)
  end
end
