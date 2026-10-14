# frozen_string_literal: true

module NexusCcs
  # A record's media band, after the CCS UI "Record" (Figma 429:36672): a dark band with the record's title, byline and tags on the left and, when it
  # has digital assets, the viewer on the right: the image in a 3:2 box (blacklight-gallery's OpenSeadragon viewer; an audio, video or PDF file in its
  # player), the info and full screen buttons under it on the left and previous and next on the right, and a thumbnail for each item in a column beside it.
  # The "Media metadata" panel slides over the band's right edge. A record without assets is the title alone. Behaviour: controllers/media_viewer_controller.js.
  class DigitalAssetsComponent < Blacklight::Component
    include Openseadragon::OpenseadragonHelper # openseadragon_picture_tag: the gallery's OpenSeadragon viewer element

    # The advisory every record carries (the demo's wording)
    ADVISORY = "Some collection items include terms and views that are not appropriate today. They reflect the " \
               "period in which they were created and are not the views of the University of Melbourne."

    ICONS = %w[media-info media-fullscreen].freeze

    KIND_NAMES = { "video" => "Video", "audio" => "Audio", "pdf" => "PDF" }.freeze

    # Material's paths (Apache 2.0), drawn in the text colour: the thumbnail tile of a file that is not an image
    KIND_ICON_PATHS = {
      "video" => "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z",
      "audio" => "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z",
      "pdf" => "M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"
    }.freeze

    attr_reader :presenter

    def initialize(presenter:, document_counter: nil, **)
      @presenter = presenter
      @document = presenter.document
    end

    # The band is always there: it holds the record's title
    def render? = true

    def assets? = large_paths.any? || media.any?

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

    # Material's previous and next arrows (Apache 2.0)
    ARROW_PATHS = {
      previous: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
      next: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
    }.freeze

    def arrow_icon(direction)
      tag.svg(tag.path(d: ARROW_PATHS.fetch(direction)), width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "currentColor",
              aria: { hidden: true }, focusable: "false")
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

    # "Grainger, Percy Aldridge · 1952"
    def byline
      creators = Array(@document["creator_ssim"]).first(2).join("; ")
      [ creators.presence, Array(@document["production_date_ssim"]).first ].compact.join(" · ").presence
    end

    Tag = Struct.new(:field, :value)

    # The chips under the byline: the record's format and its collection, each a link to that filter
    def tags
      [ Tag.new("format", Array(@document["format"]).first), Tag.new("collection_ssim", Array(@document["collection_ssim"]).first) ]
        .select { |tag| tag.value.present? }
    end

    def tag_path(tag) = helpers.search_action_path(f: { tag.field => [ tag.value ] })

    # The image name carries the title and position, so each one is distinguishable.
    def alt(position)
      count == 1 ? title : "#{title}, image #{position} of #{count}"
    end

    # e.g. "Copyright - Current"
    def licence
      Array(@document["licence_type_ssim"]).first.presence
    end

    # What the record's rights note says (the licence name in brackets is the licence type's, so it is not repeated)
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
