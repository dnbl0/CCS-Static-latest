# frozen_string_literal: true

module NexusCcs
  # One tile of the mosaic: an image filling it, or a file's kind, icon and name, as a button that opens the gallery at that item.
  class DigitalAssetsMosaicTileComponent < Blacklight::Component
    def initialize(item:, label:, kind_icon:, name:)
      @item = item
      @label = label
      @kind_icon = kind_icon
      @name = name
    end

    attr_reader :item, :label, :kind_icon, :name

    def image? = item[:kind] == "image"
  end
end
