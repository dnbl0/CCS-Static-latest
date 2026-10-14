# frozen_string_literal: true

# Blacklight::DocumentComponent laid out as the CCS design's record page is: under the media band (the embed component sends
# that to the layout) a centred column with the title, who provides the item and three Bootstrap tabs ("Object details",
# "Copyright", "Permalink"). The fields are Blacklight's field presenters, split here: the media metadata (licence type,
# advisory, terms of use, producer) is in the media band's modal, not the tabs. The title is not repeated in the tabs.
class StockDocumentComponent < Blacklight::DocumentComponent
  # The sheet's copyright fields: copyright, credit line and the caption
  COPYRIGHT_FIELDS = %w[caption credit_line_tsim rights_ssim].freeze
  TITLE = "title_tsim"

  attr_reader :object_fields, :copyright_fields

  def before_render
    fields = presenter.field_presenters.reject { |field| field.key == TITLE || StockOpenseadragonEmbedComponent::MEDIA_FIELDS.include?(field.key) }
    @copyright_fields, @object_fields = fields.partition { |field| COPYRIGHT_FIELDS.include?(field.key) }
    super
  end

  # The record's persistent link: its page in the site's own catalog.
  def permalink = helpers.solr_document_url(document)

  def accession_number = document.first("accession_number_ssim").presence

  # The collection(s) the record belongs to, as links to the real catalog's filter.
  def collections
    Array(document["collection_ssim"]).compact_blank
  end

  def collection_path(field, value) = helpers.search_action_path(f: { field => [ value ] })
end
