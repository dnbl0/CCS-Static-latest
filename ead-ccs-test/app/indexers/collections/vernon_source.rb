module Collections
  # The MDHS Vernon export
  # Headers are the same CA* model as the EMu export with the prefixes stripped
  class VernonSource < Source
    DELIMITER = /\s*;\s*/

    ACCESSION      = "Accession Number".freeze
    SOURCE_REF     = "Source Reference Number".freeze
    COLLECTION     = "Collection".freeze
    NAMED          = "Named Collection".freeze
    # Appears four times. Row#values returns every column, the
    # Harry Brookes Allen records populate the third one, not the first.
    CLASSIFICATION = "Classification".freeze
    TITLE          = "Primary Title".freeze
    CREATOR        = "Creator Name".freeze
    ASSOCIATED     = "Associated Entities (subject)".freeze
    PLACE          = "Place of Production".freeze
    OBJECT_TYPE    = "Object type -".freeze
    DATE           = "Production Date".freeze
    DESCRIPTION    = "Description".freeze
    CREDIT_LINE    = "Credit Line".freeze
    RIGHTS         = "Rights".freeze
    RESTRICTIONS   = "Restricted and Notes for DAM".freeze

    # Vernon doesn't appear to have an equivalent of EMu's "Record Type", but Blacklight's
    # default facet needs a value.
    DEFAULT_FORMAT = "Object".freeze

    private

    def build_document(row)
      accession = row.value(ACCESSION)
      return nil if accession.nil?

      start_year, end_year = DateRange.parse(row.value(DATE))

      compact_document(
        "id"                    => document_id(accession),
        "source_system_ssi"     => name,
        "source_identifier_ssi" => accession,
        "accession_number_ssim" => [ accession ],
        "source_reference_tsim" => row.values(SOURCE_REF),

        "collection_ssim"       => row.values(COLLECTION),
        "named_collection_ssim" => row.values(NAMED),
        "classification_ssim"   => row.values(CLASSIFICATION),
        "object_type_ssim"      => row.list(OBJECT_TYPE, DELIMITER),
        "format"                => [ DEFAULT_FORMAT ],

        "title_tsim" => row.values(TITLE),
        "title_si"   => row.value(TITLE),

        "creator_tsim" => row.list(CREATOR, DELIMITER),
        "creator_ssim" => row.list(CREATOR, DELIMITER),

        "associated_subject_ssim" => row.list(ASSOCIATED, DELIMITER),
        "production_place_ssim"   => row.list(PLACE, DELIMITER),

        "production_date_ssim" => row.values(DATE),
        "date_start_isi"       => start_year,
        "date_end_isi"         => end_year,

        "description_tsim" => row.values(DESCRIPTION),
        "credit_line_tsim" => row.values(CREDIT_LINE),
        "rights_ssim"      => row.values(RIGHTS),

        # _tsi, not _tsim: suffix to match no copyField rule, so stored and 
        # queryable but never reach the public search box, spellcheck or autocomplete.
        # Future Chris - Rename this to _tsim to publish it.
        "restrictions_tsi" => row.value(RESTRICTIONS)
      )
    end
  end
end
