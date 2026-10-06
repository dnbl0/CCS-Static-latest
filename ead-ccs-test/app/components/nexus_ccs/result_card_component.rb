# frozen_string_literal: true

module NexusCcs
  # A record in the list view, after Europeana's list card: the collection as a small uppercase line above
  # the title, the key fields, a footer with the licence and the digital asset format, and the image on the
  # right. Registered as config.view.list's document_component; everything else is Blacklight's
  # DocumentComponent (title, metadata and thumbnail slots, counters, classes).
  class ResultCardComponent < Blacklight::DocumentComponent
    def collection
      Array(document["collection_ssim"]).first
    end

    # Short facts for the footer: the licence type and the digital asset format.
    def footer_items
      [ Array(document["licence_type_ssim"]).first, Array(document["digital_asset_format_ssim"]).first ].compact
    end
  end
end
