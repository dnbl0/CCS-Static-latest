# frozen_string_literal: true

module NexusCcs
  # A record's media as a mosaic, after the property listings of Airbnb, Domain and realestate.com.au: the first item large, up to four tiles beside
  # it, a "Show all" button over the corner and a button for each kind of media (Photos, Video, Audio, PDF) below. Anything chosen opens the whole
  # gallery (NexusCcs::DigitalAssetsComponent, unchanged, as the band) in a full-screen window, at that item. Behaviour: controllers/mosaic_controller.js.
  class DigitalAssetsMosaicComponent < Blacklight::Component
    delegate :items, :mosaic_tiles, :kinds, :alt, :media_title, :kind_icon, :presenter, :title, to: :@gallery

    def initialize(gallery:)
      @gallery = gallery
    end

    def hero = items.first.merge(position: 0)

    def count = items.size

    # What a button says it opens: "Open image 2 of 4: Title", "Open video: Interview"
    def label(item)
      item[:kind] == "image" ? "Open #{alt(item[:index] + 1)}" : "Open #{DigitalAssetsComponent::KIND_NAMES.fetch(item[:kind], 'File')}: #{media_title(item)}"
    end

    def tile(item)
      render DigitalAssetsMosaicTileComponent.new(item: item, label: label(item), kind_icon: kind_icon(item[:kind]),
                                                  name: item[:kind] == "image" ? nil : media_title(item))
    end

    def gallery_component
      DigitalAssetsComponent.new(presenter: presenter, layout: "stage")
    end
  end
end
