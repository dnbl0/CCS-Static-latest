module Collections
  # One CSV line, addressed by header name.
  # Not using CSV::Row. The Vernon export repeats the "Classification"
  # header four times and puts the value in whichever column matches the
  # collection/museum so every header maps to the *list* of positions carrying it.
  class Row
    class UnknownHeader < StandardError; end

    def initialize(fields, index, source_name)
      @fields = fields
      @index = index
      @source_name = source_name
    end

    # Every value under this header, cleaned, empties removed.
    def values(header)
      positions = @index[header]
      unless positions
        raise UnknownHeader,
              "#{@source_name}: no column named #{header.inspect}. " \
              "Known headers: #{@index.keys.sort.join(', ')}"
      end

      positions.filter_map { |i| Text.clean(@fields[i]) }
    end

    # First non-empty value, or nil.
    def value(header)
      values(header).first
    end

    # Values under any of these headers, in the order given.
    def any(*headers)
      headers.flat_map { |h| values(h) }
    end

    # Split a multi-valued cell.
    # EMu uses a literal backslash-comma (to preserve commas inside names).
    # Vernon uses a semicolon.
    def list(header, delimiter)
      values(header).flat_map { |v| v.split(delimiter) }.filter_map { |v| Text.clean(v) }
    end

    def list_any(headers, delimiter)
      headers.flat_map { |h| list(h, delimiter) }
    end
  end
end
