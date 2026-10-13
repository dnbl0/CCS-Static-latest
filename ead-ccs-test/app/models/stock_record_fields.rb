# frozen_string_literal: true

# The show fields of the stock record page (StockCatalogController): one row for every field of the "CCS Field labels -
# Updated" sheet (data/CCS-Field-labels-and-filters.xlsx, through DataModel: its seq, label and order) that the record
# has a value for, plus the Copyright card's caption. A field with no value has no row (the sheet: "it will be blank and
# label also does not appear"). Stock page only: the site's own record page does not use this.
module StockRecordFields
  # How the sheet says several values are joined into one line (Blacklight's separator_options): Date (3) separated
  # with "; " as its examples show, Place (6) "with a comma", Classification (21) hyphenated, "one line of text".
  # Other fields list each value on its own line, Blacklight's default (Related Record (24) says so too).
  JOINS = { 3 => "; ", 6 => ", ", 21 => " - " }.freeze

  # Classification (21) and Subject (22): "preferred" as links that search for records with that value.
  LINKS = [ 21, 22 ].freeze

  # Fields the indexer carries under a name the data model's mapping does not give them (a DAM field in the sheet,
  # though the licence is derived from the rights note, and the producer is read if an export ever has it).
  SOLR_FIELDS = { 27 => "licence_type_ssim", 30 => "producer_ssim" }.freeze

  # The sheet's label cell for Measurements (11) carries a note ("... previosly mentioned as Dimensions"); its display
  # rule 2 says "CCS label will be 'Measurements'".
  LABELS = { 11 => "Measurements" }.freeze

  # Values the sheet or the site's record page derive rather than read from one Solr field.
  DERIVED = {
    # Creator (4): a person is "Full name (b. <born> - d. <died>) role". The exports have no person/organisation flag
    # and no nationality, so only a name in EMu's person form ("Family, Given") is given the sheet's "b."/"d." form;
    # an organisation's "(estab. - closed)" needs a flag the data lacks, and so keeps its plain "(from - to)".
    4 => lambda { |document|
      Array(document["creator_display_ssim"]).map do |creator|
        creator.include?(",") ? creator.sub(/\(([^()]+?) – ([^()]+?)\)/, '(b. \\1 - d. \\2)') : creator
      end
    },
    # Related Record (24): "each line will be identified with a relation type"; the data carries the parent only.
    24 => ->(document) { Array(document["parent_record_ssi"]).map { |value| "Parent - #{value}" } },
    # Advisory (28): the site's own wording, which every record with digital assets carries (Media metadata panel).
    28 => ->(document) { digital_assets?(document) ? [ NexusCcs::DigitalAssetsComponent::ADVISORY ] : [] },
    # Terms of Use (29): the rights note without the licence in brackets that starts it (as the Media metadata panel).
    29 => lambda { |document|
      note = Array(document["rights_ssim"]).first.to_s.sub(/\A\s*\[[^\]]*\]\s*/, "").strip
      digital_assets?(document) && note.present? ? [ note ] : []
    }
  }.freeze

  class << self
    def apply(config)
      # Link targets of Classification and Subject: Blacklight's link_to_facet needs a facet field; these are not shown
      # (the record page has no facet sidebar), they send the link to the real catalog's filter of the same name.
      config.add_facet_field "classification_ssim", label: "Classification", show: false
      config.add_facet_field "subject_ssim", label: "Subject", show: false

      DataModel.fields.each do |field|
        values = values_for(field)
        solr = SOLR_FIELDS.fetch(field.seq, field.solr)
        key = solr || "gap_#{field.seq}"
        key = "#{key}_derived" if DERIVED.key?(field.seq) && solr.nil?

        config.add_show_field key, **value_options(field, values)
      end

      # The Copyright card's caption (site record page): "Title. Date. Creator. Material. © Rights. Collection."
      config.add_show_field "caption", label: "Caption", values: ->(_config, document, _context) { caption(document) },
        if: ->(_context, _config, document) { caption(document).any? }
    end

    def digital_assets?(document)
      Array(document["digital_asset_large_paths_ssim"]).any? || Array(document["digital_media_ssim"]).any?
    end

    def caption(document)
      first = ->(name) { Array(document[name]).first }
      parts = [ first.("title_tsim"), first.("production_date_ssim"), Array(document["creator_ssim"]).first(2).join("; "),
                first.("material_ssim"), first.("rights_ssim"), first.("collection_ssim") ]
      text = parts.compact_blank.map { |part| part.to_s.sub(/[.\s]+\z/, "") }.join(". ")
      text.present? ? [ "#{text}." ] : []
    end

    private

    def label_for(field) = LABELS.fetch(field.seq, field.label)

    # document => [values] for a field: derived by the sheet's rule, or read from its Solr field
    def values_for(field)
      solr = SOLR_FIELDS.fetch(field.seq, field.solr)
      DERIVED[field.seq] || ->(document) { solr ? Array(document[solr]).map(&:to_s).compact_blank : [] }
    end

    def value_options(field, values)
      options = { label: label_for(field), values: ->(_config, document, _context) { values.call(document) },
                  if: ->(_context, _config, document) { values.call(document).any? } }
      options[:link_to_facet] = true if LINKS.include?(field.seq)
      join = JOINS[field.seq]
      options[:separator_options] = { words_connector: join, two_words_connector: join, last_word_connector: join } if join
      options
    end
  end
end
