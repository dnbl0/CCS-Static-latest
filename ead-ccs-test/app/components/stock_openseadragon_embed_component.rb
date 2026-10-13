# frozen_string_literal: true

# blacklight-gallery's OpenSeadragon viewer (Blacklight::Gallery::OpenseadragonEmbedComponent) laid out as the CCS design's
# media viewer (Figma, "RecordTemplate"): a full-width dark band with the title, the image with round previous and next
# buttons either side and a row of 80px thumbnails, then a light toolbar with the licence, an info button (a modal of the
# record's media metadata) and full screen. The gem's component still does the viewing: its OpenSeadragon, its image
# sources, its page and full-page buttons (here Bootstrap buttons, found by the ids the gem gives them). The gem's own
# template is replaced by this component's, which sends the band to the layout (content_for :hero). No zoom (not in the
# first release): zoom buttons, mouse and keyboard navigation are off.
class StockOpenseadragonEmbedComponent < Blacklight::Gallery::OpenseadragonEmbedComponent
  IMAGES_FIELD = "digital_asset_large_paths_ssim"
  THUMBNAILS_FIELD = "digital_asset_paths_ssim"
  # The sheet's DAM fields (Licence Type 27, Advisory 28, Terms of Use 29, Producer 30): the media metadata
  MEDIA_FIELDS = %w[licence_type_ssim gap_28_derived gap_29_derived gap_30_derived].freeze

  def osd_config
    super.except(:zoomInButton, :zoomOutButton, :homeButton).merge(
      showZoomControl: false, showHomeControl: false, mouseNavEnabled: false, keyboardNavEnabled: false,
      toolbar: "#{@id_prefix}-toolbar"
    )
  end

  # Paging only: the gem's strip is not used (the thumbnails are drawn here)
  def osd_config_referencestrip = { sequenceMode: true }

  def image
    @image ||= begin
      urls = Array(presenter.document[IMAGES_FIELD]).compact_blank
      urls.map { |url| { url => { type: "image", url: url } } } if urls.any?
    end
  end

  # Small image for each large one, for the thumbnail row; the large one when there is no small one
  def thumbnails
    large = Array(presenter.document[IMAGES_FIELD]).compact_blank
    small = Array(presenter.document[THUMBNAILS_FIELD]).compact_blank
    large.each_with_index.map { |url, index| small[index].presence || url }
  end

  def media_fields
    presenter.field_presenters.select { |field| MEDIA_FIELDS.include?(field.key) }
  end

  # The licence the record carries (the sheet's Licence Type), for the chip in the toolbar; none when it has none.
  def rights_text
    Array(media_fields.find { |field| field.key == "licence_type_ssim" }&.render).join("; ").presence
  end

  def viewer_id = "#{@id_prefix}-viewer"
end
