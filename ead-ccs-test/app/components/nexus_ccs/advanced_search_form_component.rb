# frozen_string_literal: true

module NexusCcs
  # The Advanced search form: Blacklight's own component, with the search rows made like SearchWorks' (each row has the field to
  # search, how its words match and the words, rows can be added and removed) and a "match" menu on every list filter
  # (NexusCcs::AdvancedFilterComponent). The parameters stay Blacklight's: clause[i][field|query] for a row, plus
  # clause[i][type] (all, any, none; see SearchBuilder#adv_search_clause), op for how the rows combine, f / f_inclusive for filters.
  class AdvancedSearchFormComponent < Blacklight::AdvancedSearchFormComponent
    TYPES = [ [ "Contains all", "all" ], [ "Contains any", "any" ], [ "Excludes", "none" ] ].freeze

    Row = Data.define(:index, :field, :type, :query)

    def types = TYPES

    def field_options
      search_fields.values.map { |field| [ field.display_label("search"), field.key ] }
    end

    # The rows to show: the search being edited, then an empty row for each search field it does not use yet (so a form opened from a
    # results page still offers every field, as it always did). Rows can then be added, removed or pointed at another field.
    def rows
      @rows ||= begin
        clauses = clause_params.filter_map do |index, clause|
          next unless clause.respond_to?(:[]) && search_fields.key?(clause[:field].to_s)

          Row.new(index.to_s, clause[:field].to_s, row_type(clause), clause[:query].to_s)
        end
        next_free = clauses.map { |row| row.index.to_i }.max.to_i + 1
        unused = search_fields.keys - clauses.map(&:field)
        clauses + unused.each_with_index.map { |key, offset| Row.new((clauses.empty? ? offset : next_free + offset).to_s, key, "all", "") }
      end
    end

    # The index of the first row added with the button: past every index in use (addresses can carry any)
    def next_index = [ rows.map { |row| row.index.to_i }.max.to_i + 1, rows.size ].max

    # The row used by the "Add a field" button: Stimulus fills in the next index
    def blank_row = Row.new("__INDEX__", search_fields.keys.first, "all", "")

    # The filters that have a menu here are drawn from the search being edited (ticked, with their menu), so they are not also carried
    # as hidden values: that would make a ticked box impossible to untick.
    def hidden_search_state_params
      managed = blacklight_config.facet_fields.select { |_key, config| config.advanced_search_component == NexusCcs::AdvancedFilterComponent }.keys
      params = @params.except(:clause, :f_inclusive, :op, :sort, :match)
      filters = params[:f]
      return params unless filters.respond_to?(:except)

      params.merge(f: filters.reject { |key, _| managed.include?(key.to_s.delete_prefix("-")) })
    end

    private

    # The rows are drawn by the template (above), not as Blacklight's stock slots
    def initialize_search_field_controls; end

    # A row from an address without a type used to match any of its words, so that is what it shows
    def row_type(clause)
      type = clause[:type].to_s
      return type if TYPES.map(&:last).include?(type)
      return "none" if clause[:op].to_s == "must_not"

      clause[:query].present? ? "any" : "all"
    end

    def clause_params
      @params[:clause].respond_to?(:each_pair) ? @params[:clause].each_pair.to_a : []
    end
  end
end
