# frozen_string_literal: true

# blacklight-gallery's OpenSeadragon viewer (Blacklight::Gallery::OpenseadragonEmbedComponent) as the gem ships it: its
# template, toolbar, thumbnail strip, options and stylesheet, unchanged. The gem reads IIIF tile sources from a configured
# Solr field; this collection has plain JPEGs (digital_asset_large_paths_ssim), which OpenSeadragon takes as
# {type: "image", url: ...} sources, so the only thing this subclass does is give the gem's component those. Registered as
# the show page's document_embed_component. The viewer's toolbar and image are Bootstrap rows, which need a column around
# them to line up with the title: col-12.
class StockOpenseadragonEmbedComponent < Blacklight::Gallery::OpenseadragonEmbedComponent
  IMAGES_FIELD = "digital_asset_large_paths_ssim"

  def initialize(presenter:, view_config: nil, classes: [], **kwargs)
    super(presenter: presenter, view_config: view_config, classes: classes + %w[col-12], **kwargs)
  end

  def image
    @image ||= begin
      urls = Array(presenter.document[IMAGES_FIELD]).compact_blank
      urls.map { |url| { url => { type: "image", url: url } } } if urls.any?
    end
  end
end
