# frozen_string_literal: true

# blacklight-gallery's OpenSeadragon viewer (Blacklight::Gallery::OpenseadragonEmbedComponent, unchanged) fed with the
# record's images. The gem reads IIIF tile sources from a configured Solr field; this collection has plain JPEGs
# (digital_asset_large_paths_ssim), which OpenSeadragon takes as {type: "image", url: ...} sources. Registered as the
# show page's document_embed_component, which draws between the title and the details. StockCatalogController only.
class StockOpenseadragonEmbedComponent < Blacklight::Gallery::OpenseadragonEmbedComponent
  IMAGES_FIELD = "digital_asset_large_paths_ssim"

  # The thumbnail strip along the bottom, as on the site's record page (the gem's own is a vertical one down the side);
  # OpenSeadragon's own option, the rest of the gem's strip settings are kept.
  def osd_config_referencestrip
    super.merge(referenceStripScroll: "horizontal", referenceStripSizeRatio: 0.16)
  end

  # The gem's template and options, as they are, except:
  # - zoom in, zoom out and home are dropped, and the mouse wheel no longer zooms. The gem's template draws those
  #   buttons, so this component has its own copy of it without them; OpenSeadragon is told not to build them (it
  #   would otherwise add its own) and not to look for the ones that are gone. Pinch, double-click and keyboard zoom
  #   stay; scrolling the page over the image is left to the page.
  # - autoHideControls false: OpenSeadragon fades the thumbnail strip out as soon as the mouse is still for two
  #   seconds, which leaves the viewer with no thumbnails to navigate by (and none at all on touch screens).
  # - toolbar: the id of the toolbar the template draws. In full page OpenSeadragon takes every other element off the
  #   page, toolbar included, leaving no button to leave full page with (only Escape); given its id it moves the
  #   toolbar above the viewer instead. The template's toolbar is a .row with no margins or gutters (mx-0 gx-0):
  #   a plain .row's negative margins have no column around them in full page and clip the toolbar at the window's edge.
  def osd_config
    super.except(:zoomInButton, :zoomOutButton, :homeButton).merge(
      showZoomControl: false, showHomeControl: false, gestureSettingsMouse: { scrollToZoom: false },
      autoHideControls: false, toolbar: "#{@id_prefix}-toolbar"
    )
  end

  def image
    @image ||= begin
      urls = Array(presenter.document[IMAGES_FIELD]).compact_blank
      urls.map { |url| { url => { type: "image", url: url } } } if urls.any?
    end
  end
end
