# frozen_string_literal: true

# blacklight-gallery's OpenSeadragon viewer (Blacklight::Gallery::OpenseadragonEmbedComponent, unchanged) fed with the
# record's images. The gem reads IIIF tile sources from a configured Solr field; this collection has plain JPEGs
# (digital_asset_large_paths_ssim), which OpenSeadragon takes as {type: "image", url: ...} sources. Registered as the
# show page's document_embed_component, which draws between the title and the details. StockCatalogController only.
class StockOpenseadragonEmbedComponent < Blacklight::Gallery::OpenseadragonEmbedComponent
  IMAGES_FIELD = "digital_asset_large_paths_ssim"

  # col-12: the viewer's toolbar and image are Bootstrap rows, which need a column around them to line up with the
  # title. The spacing around it is StockDocumentComponent's stack.
  def initialize(presenter:, view_config: nil, classes: [], **kwargs)
    super(presenter: presenter, view_config: view_config, classes: classes + %w[col-12], **kwargs)
  end

  # The toolbar keeps previous/next and full page; zoom in, zoom out and home are dropped, and the mouse wheel no longer zooms. The gem's template draws
  # those three buttons, so this component has its own copy of it without them; here OpenSeadragon is told not to
  # build them (it would otherwise add its own) and not to look for the ones that are gone. Pinch, double-click and
  # keyboard zoom are OpenSeadragon's own gestures and stay; scrolling the page over the image is left to the page.
  def osd_config
    super.except(:zoomInButton, :zoomOutButton, :homeButton).merge(showZoomControl: false, showHomeControl: false, gestureSettingsMouse: { scrollToZoom: false })
  end

  def image
    @image ||= begin
      urls = Array(presenter.document[IMAGES_FIELD]).compact_blank
      urls.map { |url| { url => { type: "image", url: url } } } if urls.any?
    end
  end
end
