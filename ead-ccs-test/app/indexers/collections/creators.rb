module Collections
  # Creator display strings and birth/death years built from the creator columns, which repeat once
  # per creator (see Row#positional). The display follows the Field labels sheet (row 4):
  # "Name (born - died) Role".
  module Creators
    module_function

    YEAR = /\b(\d{4})\b/

    # Aligns a per-creator column with the names. A column that does not have one entry per
    # creator cannot be matched up reliably, so it contributes nothing.
    def aligned(values, count)
      values.size == count ? values : Array.new(count)
    end

    def display(names, roles, births, deaths)
      roles = aligned(roles, names.size)
      births = aligned(births, names.size)
      deaths = aligned(deaths, names.size)

      names.each_with_index.map do |name, index|
        [ name, life(births[index], deaths[index]), roles[index]&.capitalize ].compact.join(" ")
      end
    end

    def life(born, died)
      return "(#{born} \u2013 #{died})" if born && died
      return "(b. #{born})" if born

      "(d. #{died})" if died
    end

    # Four-digit years found in the entries (any creator), for the year filters.
    def years(entries)
      entries.filter_map { |entry| entry && entry[YEAR, 1]&.to_i }.uniq
    end
  end
end
