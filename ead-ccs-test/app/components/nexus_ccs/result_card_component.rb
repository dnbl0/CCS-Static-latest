# frozen_string_literal: true

module NexusCcs
  # A record in the list and grid views: the CCS UI's "Card image" (with the first digital asset's thumbnail on
  # top) or "Card no media" (without), then the title and three lines: creator, object type, collection.
  # Registered as the list and gallery views' document_component; everything else is Blacklight's
  # DocumentComponent (title slot with its link and counter, classes, ids).
  class ResultCardComponent < Blacklight::DocumentComponent
    def media_path
      document["thumbnail_path_ssi"].presence
    end

    def media?
      media_path.present?
    end

    def variant
      media? ? "media" : "no-media"
    end

    def card_classes
      classes + [ "result-card", "result-card--#{variant}" ]
    end

    def document_path
      helpers.search_state.url_for_document(document)
    end

    # creator, object type and collection: the first of each, whichever the record has
    def lines
      [ document["creator_ssim"], document["object_type_ssim"], document["collection_ssim"] ].filter_map { |value| Array(value).first.presence }
    end
  end
end
