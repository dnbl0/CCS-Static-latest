module Collections
  # Derives a sortable integer range from a date string.
  # For sorting and ranges from dates in 'prose': Eg. "Circa 1845", "1948-1950", "-1917", "1918"
  # Orig. string is still kept verbatim in production_date_ssim
  # Just for Vernon as EMu supplies "Earliest"/"Latest Date Created"
  module DateRange
    module_function

    PLAUSIBLE = (1000..(Time.zone&.now&.year || Time.now.year) + 1).freeze

    # One year out of an "Earliest"/"Latest Date Created" cell. The export holds plain years ("1918", "-586"),
    # BC years written "BC -1000", and some full dates ("12/09/1925"); String#to_i read the last two as 0 and 12.
    def explicit_year(text)
      text = text.to_s.strip
      return nil if text.empty?
      return text.to_i if text.match?(/\A-?\d+\z/)
      return -text[/\d+/].to_i if text.match?(/\ABC\b/i)

      text[/\b\d{4}\b/]&.to_i
    end

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
