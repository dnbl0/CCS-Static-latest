# frozen_string_literal: true

module NexusCcs
  # A record's page body, after the CCS UI "Record-detail" (Figma 258:25075): the digital assets, a summary
  # (title, creator and date, tags), then the details as a ruled list in a card with the persistent link below it,
  # and a Copyright card beside them. Registered as the show page's document_component; the breadcrumb above it is
  # HeaderComponent's. The summary's title is the page's one h1 and the page's only visible title besides the
  # details list's Title row (CCS stakeholder feedback: the title was shown five times). The Copyright card has no
  # caption until the site offers downloads. The fields, their labels and their order come from the workbook
  # (config.show_fields, see DataModel); the copyright card gathers the rights fields.
  class RecordDocumentComponent < Blacklight::DocumentComponent
    # Shown in the Copyright card, so not repeated in the details list
    COPYRIGHT_FIELDS = %w[rights_ssim credit_line_tsim].freeze
    LINK_FIELDS = %w[collection_ssim].freeze

    Row = Struct.new(:label, :values, :field, :copy, keyword_init: true)

    def heading
      Array(document["title_tsim"]).first.presence || @presenter.heading
    end

    def media?
      Array(document["digital_asset_large_paths_ssim"]).any?
    end

    # "Grainger, Percy Aldridge · 1952"
    def byline
      creators = Array(document["creator_ssim"]).first(2).join("; ")
      [ creators.presence, Array(document["production_date_ssim"]).first ].compact.join(" · ").presence
    end

    Tag = Struct.new(:field, :value)

    # Small chips under the byline: the record's format and its collection, each a link to that filter
    def tags
      [ Tag.new("format", Array(document["format"]).first), Tag.new("collection_ssim", Array(document["collection_ssim"]).first) ]
        .select { |tag| tag.value.present? }
    end

    def tag_path(tag) = helpers.search_action_path(filter_query(tag.field, tag.value))

    # Fields that name a collection: their links open all of it, as the header's Search collections menu does
    # (BrowseMenu, docs/adr/0004). Any other detail keeps the search's default.
    WHOLE_SET_FIELDS = [ BrowseMenu::COLLECTION_FIELD, "named_collection_ssim" ].freeze

    def filter_query(field, value)
      WHOLE_SET_FIELDS.include?(field) ? BrowseMenu.query(field, value) : { f: { field => [ value ] } }
    end

    # The details list: Title, then every workbook field the record has a value for, the UoM ID (the record's own
    # id, with a Copy button) just before the collection
    def rows
      @rows ||= begin
        list = [ Row.new(label: "Title", values: [ heading ], field: "title_tsim") ]
        @presenter.configuration.show_fields.each_value do |config|
          name = config.field
          next if COPYRIGHT_FIELDS.include?(name)

          values = Array(document[name]).map(&:to_s).compact_blank
          list << Row.new(label: config.label, values: values, field: name) if values.any?
        end
        index = list.index { |row| row.field.in?(%w[named_collection_ssim collection_ssim]) } || list.size
        list.insert(index, Row.new(label: "UoM ID", values: [ uom_id ], field: "id", copy: true))
      end
    end

    def uom_id = document.uom_id

    def link_to_value?(row) = row.field.in?(LINK_FIELDS)

    def value_path(row, value)
      helpers.search_action_path(filter_query(row.field, value))
    end

    # The "Copyright" card
    def credit_line = Array(document["credit_line_tsim"]).first
    def copyright = Array(document["rights_ssim"]).first
    def licence = Array(document["licence_type_ssim"]).first
    def responsible_collection = Array(document["collection_ssim"]).first

    def responsible_collection_query = filter_query(BrowseMenu::COLLECTION_FIELD, responsible_collection)

    def copyright_card?
      [ credit_line, copyright, licence, responsible_collection ].any?(&:present?)
    end

    def terms_path = "/help#copyright"
  end
end
