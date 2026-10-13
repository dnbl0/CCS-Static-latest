# frozen_string_literal: true

# The record page as Blacklight ships it (/stock/:id), for comparing the site's own record page against.
# Deliberately not an ApplicationController (no guest bookmarks, country acknowledgement) and not the
# CatalogController (no NexusCcs components); every setting below is Blacklight's default or the generator's.
class StockCatalogController < ActionController::Base
  include Blacklight::Controller
  include Blacklight::Catalog

  layout "stock_blacklight"

  # openseadragon_picture_tag, used by blacklight-gallery's OpenSeadragon viewer
  helper Openseadragon::OpenseadragonHelper

  # The app's helpers/blacklight_helper.rb widens the record page's container; this is the gem's own definition.
  helper do
    def container_classes = blacklight_config.full_width_layout ? "container-fluid" : "container"
  end

  # The gem's own views come first, so the app's overrides of them (catalog/show, shared/footer...) are not used.
  prepend_view_path Blacklight::Engine.root.join("app/views")

  # Blacklight's views live under catalog/, not stock_catalog/; the stock page's own (and its subclasses') come first.
  def self.local_prefixes = [ controller_path, "stock_catalog", "catalog" ].uniq

  # This page has no search of its own: the search box and "Back to search" go to the real catalog, the same way
  # the gem's own Blacklight::Bookmarks does.
  # (Blacklight adds only_path to the options of search_action_path; the catalog's own helpers do not take it.)
  def search_action_url(options = {}) = search_catalog_url(search_action_options(options))

  def search_action_path(options = {}) = search_catalog_path(search_action_options(options))

  def search_action_options(options) = (options.respond_to?(:to_h) ? options.to_h : {}).except(:only_path, :controller, :action)
  private :search_action_options

  configure_blacklight do |config|
    config.show.title_field = "title_tsim"
    config.show.display_type_field = "format"
    # The record's digital assets in blacklight-gallery's OpenSeadragon viewer (zoom, pan, full page; a paging strip
    # when there are several images), above the details: the embed slot sits between the title and the metadata.
    # The viewer is the gem's own component; the subclass only gives it the record's image URLs.
    config.show.document_embed_component = StockOpenseadragonEmbedComponent

    # Plain show fields, as the generator's catalog controller declares them: one per field of the "CCS Field labels -
    # Updated" sheet of "CCS Field labels and filters - updated - 8 October 2026.xlsx" (data/CCS-Field-labels-and-filters.xlsx,
    # via DataModel: seq, label and order are the sheet's, the Solr field is config/data_model/solr_mapping.yml's) that
    # the data can carry today. The title (1) is the heading, so it is not repeated; fields the data cannot carry yet
    # (DataModel.field_gaps) are left out, and the sheet says a field with no value shows no label either.
    # How the sheet says several values of a field are joined into one line (Blacklight's separator_options): Date
    # (3) separated with "; " as its examples show, Place (6) "with a comma", Classification (21) hyphenated, "one line
    # of text". Other fields list each value on its own line, Blacklight's default (Related Record (24) says so too).
    joins = { 3 => "; ", 6 => ", ", 21 => " - " }

    # Classification (21) and Subject (22): "preferred" as links that search for records with that value. Blacklight's
    # own link_to_facet needs the field to be a facet; these are not shown (the record page has no facet sidebar), they
    # only tell link_to_facet where the link goes: the real catalog's filters of the same name.
    links = [ 21, 22 ]
    config.add_facet_field "classification_ssim", label: "Classification", show: false
    config.add_facet_field "subject_ssim", label: "Subject", show: false

    DataModel.fields.select(&:available?).reject { |field| field.seq == 1 }.each do |field|
      options = { label: field.label }
      options[:link_to_facet] = true if links.include?(field.seq)
      options[:separator_options] = { words_connector: joins[field.seq], two_words_connector: joins[field.seq], last_word_connector: joins[field.seq] } if joins[field.seq]
      # Sheet 24, Related Record: "each line will be identified with a relation type (parent or child)"; the data
      # carries the parent only.
      options[:values] = ->(_config, document, _context) { Array(document[field.solr]).map { |value| "Parent - #{value}" } } if field.seq == 24
      # Sheet 4, Creator: a person is "Full name (b. <born> - d. <died>) role". The exports have no person/organisation
      # flag and no nationality, so only a name in EMu's person form ("Family, Given") is given the sheet's "b."/"d."
      # form; an organisation's "(estab. - closed)" needs a flag the data lacks, and so keeps its plain "(from - to)".
      if field.seq == 4
        options[:values] = lambda do |_config, document, _context|
          Array(document[field.solr]).map do |creator|
            creator.include?(",") ? creator.sub(/\(([^()]+?) \u2013 ([^()]+?)\)/, '(b. \\1 - d. \\2)') : creator
          end
        end
      end
      config.add_show_field field.solr, **options
    end

    # The details list under an "Object details" heading, laid out as rows of a table, from Blacklight's own
    # components and Bootstrap's utility classes.
    config.show.document_metadata_component = StockObjectDetailsComponent
    config.show.document_component = StockDocumentComponent
  end
end
