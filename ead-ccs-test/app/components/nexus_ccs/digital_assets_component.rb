# frozen_string_literal: true

module NexusCcs
  # A record's media on its page, after the CCS UI "Record-detail" media section: a dark band with the large
  # image (a row of thumbnails under it when there are several), a "Media metadata" panel that slides over the
  # band's right edge, and a toolbar with the licence and the buttons for that panel and for full screen.
  # Renders nothing for a record without assets. Registered, through NexusCcs::RecordEmbedComponent, as the show
  # page's document_embed_component. Behaviour: controllers/media_viewer_controller.js.
  class DigitalAssetsComponent < Blacklight::Component
    include Openseadragon::OpenseadragonHelper # openseadragon_picture_tag: the gallery's OpenSeadragon viewer element

    # The advisory every record carries (the demo's wording)
    ADVISORY = "Some collection items include terms and views that are not appropriate today. They reflect the " \
               "period in which they were created and are not the views of the University of Melbourne."

    ICONS = %w[media-copyright media-info media-fullscreen].freeze

    KIND_NAMES = { "video" => "Video", "audio" => "Audio", "pdf" => "PDF" }.freeze

    # Material's paths (Apache 2.0), drawn in the text colour: the thumbnail tile of a file that is not an image
    KIND_ICON_PATHS = {
      "video" => "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z",
      "audio" => "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z",
      "pdf" => "M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"
    }.freeze

    def initialize(presenter:, document_counter: nil, **)
      @document = presenter.document
    end

    def render?
      large_paths.any? || media.any?
    end

    # Audio, video and PDF files: [{ kind:, type:, url:, label: }]
    def media
      Array(@document["digital_media_ssim"]).map { |entry| Collections::DigitalMedia.parse(entry) }
    end

    # Pairs of [large image path, thumbnail path], in display order.
    def images
      large_paths.zip(thumbnail_paths)
    end

    def main = images.first

    # Everything the gallery holds, in display order: the images (each with its position in the viewer), then the audio, video and PDF
    # files (each with its position among those). A thumbnail for each item chooses what the stage shows.
    def items
      images.each_with_index.map { |(large, thumbnail), index| { kind: "image", large: large, thumbnail: thumbnail, index: index } } +
        media.each_with_index.map { |item, index| item.merge(index: index) }
    end

    def media_dom_id(index) = "digital-assets-media-#{index}"

    def kind_icon(kind)
      tag.svg(tag.path(d: KIND_ICON_PATHS.fetch(kind, KIND_ICON_PATHS["pdf"])), width: "1.5em", height: "1.5em", viewBox: "0 0 24 24",
              fill: "currentColor", aria: { hidden: true }, focusable: "false")
    end

    # The large images as blacklight-gallery's OpenSeadragon viewer takes them (the same sources the gem's own
    # record-page embed gives it); the viewer replaces the plain <img>, the thumbnails below still choose which shows.
    def osd_image
      images.map { |large, _| { large => { type: "image", url: large } } }
    end

    # Viewing only: the CCS design has no zoom (not in the first release), so mouse, keyboard, zoom and home
    # controls are off; the band's own buttons (info, full screen) and the thumbnails are the controls.
    def osd_config
      {
        crossOriginPolicy: false, sequenceMode: true, showNavigationControl: false, showZoomControl: false,
        showHomeControl: false, showFullPageControl: false, showSequenceControl: false, mouseNavEnabled: false,
        keyboardNavEnabled: false, tabIndex: -1
      }
    end
    def media_title(item) = item[:label].presence || title

    def count = large_paths.size

    def title
      Array(@document["title_tsim"]).first.presence || "Record"
    end

    # The image name carries the title and position, so each one is distinguishable.
    def alt(position)
      count == 1 ? title : "#{title}, image #{position} of #{count}"
    end

    # e.g. "Copyright - Current"; the toolbar shows it as the licence chip
    def licence
      Array(@document["licence_type_ssim"]).first.presence
    end

    # What the record's rights note says (the licence name in brackets is the chip's, so it is not repeated)
    def terms
      note = Array(@document["rights_ssim"]).first.to_s.sub(/\A\s*\[[^\]]*\]\s*/, "").strip
      note.presence
    end

    # Person or organisation responsible for creating the digital asset (DataModel field 30; no DAM export yet)
    def producer
      Array(@document["producer_ssim"]).first.presence
    end

    # [label, text] rows of the Media metadata panel
    def metadata
      [ [ "Licence type", licence ], [ "Advisory", ADVISORY ], [ "Terms of use", terms ], [ "Producer", producer ] ].select { |_, text| text.present? }
    end

    def metadata?
      metadata.any?
    end

    # An icon from app/assets/images, drawn in the text colour (the files carry the design's fixed navy)
    def icon(name)
      raise ArgumentError, name unless ICONS.include?(name)

      File.read(Rails.root.join("app/assets/images/#{name}.svg"))
          .gsub(/ (width|height|style|preserveAspectRatio|overflow)="[^"]*"/, "")
          .gsub(/ clip-path="[^"]*"/, "")
          .gsub(/ id="[^"]*"/, "")
          .gsub(/(stroke|fill)="#(?:[0-9A-Fa-f]{3,6})"/, '\1="currentColor"')
          .sub("<svg", '<svg width="1em" height="1em" aria-hidden="true" focusable="false"')
          .html_safe
    end

    private

    def large_paths = Array(@document["digital_asset_large_paths_ssim"])
    def thumbnail_paths = Array(@document["digital_asset_paths_ssim"])
  end
end
