# The CCS data model: the display fields and filters defined by the two project workbooks
# (data/CCS-Field-labels-and-filters.xlsx, data/CCS-data-inventory.xlsx), extracted to
# config/data_model/*.json by script/extract_data_model.py, plus config/data_model/solr_mapping.yml
# which says which Solr field carries each one (or why none does yet).
#
# CatalogController builds its fields, facets and facet groups from this, so the workbooks stay
# the source of truth for labels, order, sections and filter types.
class DataModel
  FIELD_LABELS = JSON.parse(Rails.root.join("config/data_model/field_labels.json").read).freeze
  FILTER_ROWS = JSON.parse(Rails.root.join("config/data_model/filters.json").read).freeze
  MAPPING = YAML.safe_load_file(Rails.root.join("config/data_model/solr_mapping.yml")).freeze

  Field = Data.define(:seq, :label, :source, :solr, :index, :gap) do
    def available? = solr.present?
  end

  # `type` is :checkbox, :browse (browse and search within the filter), :year (year selector) or :other.
  Filter = Data.define(:seq, :section, :name, :type, :solr, :gap) do
    def available? = solr.present?

    # A form usable as a facet group id and locale key: "Subject / Topic" becomes "subject_topic".
    def group = section.parameterize(separator: "_")
  end

  TYPES = { "Checkbox" => :checkbox, "Browse + Search within this filter" => :browse, "Date selector (Year)" => :year }.freeze

  class << self
    # The workbook's display fields in sequence order.
    def fields
      @fields ||= FIELD_LABELS.sort_by { |row| row["seq"] }.map do |row|
        mapping = MAPPING.fetch("fields").fetch(row["seq"])
        Field.new(seq: row["seq"], label: row["label"], source: row["source"], solr: mapping["solr"],
          index: mapping["index"] == true, gap: mapping["gap"])
      end
    end

    # The workbook's filters in sheet order.
    def filters
      @filters ||= FILTER_ROWS.sort_by { |row| row["seq"] }.map do |row|
        mapping = MAPPING.fetch("filters").fetch(row["seq"])
        Filter.new(seq: row["seq"], section: row["section"], name: row["name"], type: TYPES.fetch(row["type"], :other),
          solr: mapping["solr"], gap: mapping["gap"])
      end
    end

    # Filter sections in sheet order, each with the filters that can be offered now.
    def sections
      filters.group_by(&:section).transform_values { |list| list.select(&:available?) }.reject { |_, list| list.empty? }
    end

    def field_gaps = fields.reject(&:available?)
    def filter_gaps = filters.reject(&:available?)
  end
end
