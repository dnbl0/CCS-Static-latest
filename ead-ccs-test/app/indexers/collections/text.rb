module Collections
  # String cleaning shared by every source
  module Text
    module_function
    # The Vernon extract contains double-encoded UTF-8: eg. "ō" is UTF-8 bytes C5 8D, which was
    # read as Windows-1252 and re-encoded, giving "Å" plus the control character U+008D. The file
    # is *valid* UTF-8 but renders as garbage. Reversed by mapping each character back to its
    # Windows-1252 byte and reinterpreting the bytes as UTF-8.
    #
    # A double-encoded sequence is a UTF-8 lead byte (C2-EF, shown as U+00C2-U+00EF) followed by a
    # continuation byte (80-BF, shown as U+0080-U+00BF, or as the Windows-1252 character at that
    # slot: €, ’, ™ and so on).
    CONTINUATION = "\u0080-\u00BF\u20AC\u201A\u0192\u201E\u2026\u2020\u2021\u02C6\u2030\u0160\u2039" \
                   "\u0152\u017D\u2018\u2019\u201C\u201D\u2022\u2013\u2014\u02DC\u2122\u0161\u203A" \
                   "\u0153\u017E\u0178".freeze
    MOJIBAKE = Regexp.new("[\u00C2-\u00EF][#{CONTINUATION}]")

    def clean(value)
      string = value.to_s.strip
      return nil if string.empty?

      repair_mojibake(string)
    end

    # Only attempted on strings that look double-encoded, and only kept if the result is valid
    # UTF-8, so correct text (including genuine accents) is left alone.
    def repair_mojibake(string)
      return string unless string.match?(MOJIBAKE)

      repaired = string.each_char.flat_map { |char| windows_1252_bytes(char) }.pack("C*").force_encoding("UTF-8")
      repaired.valid_encoding? ? repaired : string
    rescue Encoding::UndefinedConversionError
      string
    end

    # U+0000-U+00FF are the same byte in Windows-1252 and Latin-1 (including the control
    # characters U+0080-U+009F that stand in for the slots Windows-1252 leaves undefined);
    # anything else must be a Windows-1252 character such as € or ’.
    def windows_1252_bytes(char)
      char.ord <= 0xFF ? [ char.ord ] : char.encode("Windows-1252").bytes
    end
  end
end
