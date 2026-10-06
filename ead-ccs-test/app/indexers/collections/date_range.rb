module Collections
  # Derives a sortable integer range from a date string.
  # For sorting and ranges from dates in 'prose': Eg. "Circa 1845", "1948-1950", "-1917", "1918"
  # Orig. string is still kept verbatim in production_date_ssim
  # Just for Vernon as EMu supplies "Earliest"/"Latest Date Created"
  module DateRange
    module_function

    PLAUSIBLE = (1000..(Time.zone&.now&.year || Time.now.year) + 1).freeze

    def parse(text)
      return [ nil, nil ] if text.nil? || text.strip.empty?

      years = text.scan(/\d{4}/).map(&:to_i).select { |year| PLAUSIBLE.cover?(year) }
      return [ nil, nil ] if years.empty?

      # A leading minus is an open start: "-1917" means "up to 1917", not year -1917.
      return [ nil, years.first ] if text.strip.start_with?("-") && years.one?

      [ years.min, years.max ]
    end
  end
end
