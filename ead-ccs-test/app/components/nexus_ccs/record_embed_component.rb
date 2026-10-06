# frozen_string_literal: true

module NexusCcs
  # Between a record's title and its details: the digital assets (when it has any) and a summary line.
  # Registered as the show page's document_embed_component.
  class RecordEmbedComponent < Blacklight::Component
    def initialize(presenter:, document_counter: nil, **)
      @presenter = presenter
      @document = presenter.document
    end

    attr_reader :presenter

    # "Painting; Artwork • Medical History Museum" (set in capitals by the stylesheet)
    def eyebrow
      types = Array(@document["object_type_ssim"]).first(3).join("; ")
      [ types.presence, Array(@document["collection_ssim"]).first ].compact.join(" • ").presence
    end

    # "Judy Mengil (b.1954, d.2017), artist · 2016"
    def byline
      creators = Array(@document["creator_display_ssim"]).first(2).join("; ")
      [ creators.presence, Array(@document["production_date_ssim"]).first ].compact.join(" · ").presence
    end

    # The licence the rights note begins with, e.g. "Copyright - Current"
    def licence
      Array(@document["licence_type_ssim"]).first
    end

    def summary?
      [ eyebrow, byline, licence ].any?(&:present?)
    end
  end
end
