# frozen_string_literal: true

# blacklight-gallery's OpenSeadragon viewer (Blacklight::Gallery::OpenseadragonEmbedComponent, unchanged) fed with the
# record's images. The gem reads IIIF tile sources from a configured Solr field; this collection has plain JPEGs
# (digital_asset_large_paths_ssim), which OpenSeadragon takes as {type: "image", url: ...} sources. Registered as the
# show page's document_embed_component, which draws between the title and the details. StockCatalogController only.
class StockOpenseadragonEmbedComponent < Blacklight::Gallery::OpenseadragonEmbedComponent
  IMAGES_FIELD = "digital_asset_large_paths_ssim"

  def image
    @image ||= begin
      urls = Array(presenter.document[IMAGES_FIELD]).compact_blank
      urls.map { |url| { url => { type: "image", url: url } } } if urls.any?
    end
  end
end
