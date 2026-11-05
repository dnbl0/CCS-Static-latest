# frozen_string_literal: true

# Represents a single document returned from Solr
class SolrDocument
  include Blacklight::Solr::Document

  # self.unique_key = 'id'

  # DublinCore uses the semantic field mappings below to assemble an OAI-compliant Dublin Core document
  # Semantic mappings of solr stored fields. Fields may be multi or
  # single valued. See Blacklight::Document::SemanticFields#field_semantics
  # and Blacklight::Document::SemanticFields#to_semantic_values
  # Recommendation: Use field names from Dublin Core
  use_extension(Blacklight::Document::DublinCore)

  # The University has three EMu systems (emu-umc, emu-feit, emu-prints), so the UoM ID names which one. Every EMu
  # record here comes from Museums & Collections' (emu-umc). The record's URL keeps its Solr id (emu-400329).
  UOM_ID_PREFIXES = { "emu-" => "emu-umc-" }.freeze

  def uom_id
    prefix, uom_prefix = UOM_ID_PREFIXES.find { |solr_prefix, _| id.to_s.start_with?(solr_prefix) }
    prefix ? id.to_s.sub(prefix, uom_prefix) : id.to_s
  end
end
