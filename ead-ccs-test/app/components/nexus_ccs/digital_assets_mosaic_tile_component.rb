# frozen_string_literal: true

module NexusCcs
  # One tile of the mosaic: an image filling it, or a file's kind, icon and name, as a button that opens the gallery at that item.
  class DigitalAssetsMosaicTileComponent < Blacklight::Component
    def initialize(item:, label:, kind_icon:, name:, ratio:, first:)
      @item = item
      @label = label
      @kind_icon = kind_icon
      @name = name
      @ratio = ratio
      @first = first
    end

    attr_reader :item, :label, :kind_icon, :name, :ratio, :first

    def image? = item[:kind] == "image"

    # On a phone only the first tile shows
    def visibility = first ? "" : "d-none d-lg-block"
  end
end
