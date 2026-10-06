# frozen_string_literal: true

module NexusCcs
  # A record's digital assets on its page: the first image large, the others as a row of
  # thumbnails that open the large image. Renders nothing for a record without assets.
  # Registered as the show page's document_embed_component, which sits between the title
  # and the metadata.
  class DigitalAssetsComponent < Blacklight::Component
    def initialize(presenter:, document_counter: nil, **)
      @document = presenter.document
    end

    def render?
      large_paths.any?
    end

    # Pairs of [large image path, thumbnail path], in display order.
    def images
      large_paths.zip(thumbnail_paths)
    end

    def main = images.first
    def others = images.drop(1)

    def count = large_paths.size

    def title
      Array(@document["title_tsim"]).first.presence || "Record"
    end

    # The image name carries the title and position, so each one is distinguishable.
    def alt(position)
      count == 1 ? title : "#{title}, image #{position} of #{count}"
    end

    private

    def large_paths = Array(@document["digital_asset_large_paths_ssim"])
    def thumbnail_paths = Array(@document["digital_asset_paths_ssim"])
  end
end
