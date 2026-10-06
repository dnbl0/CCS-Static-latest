module Collections
  # String cleaning shared by every source
  module Text
    module_function
    # The sample Vernon extract contains double-encoded UTF-8: eg. U+2019 was written as UTF-8 
    # bytes E2 80 99, then read as Windows-1252 and re-encoded to UTF-8. The file is
    # *valid* UTF-8 but renders as garbage. Reversing by encoding back to Windows-1252
    # and reinterpreting as UTF-8.
    MOJIBAKE = /â€|Ã[-¿]/

    def clean(value)
      string = value.to_s.strip
      return nil if string.empty?

      repair_mojibake(string)
    end

    # Only attempted on strings that look double-encoded and only kept if result is valid UTF-8
    def repair_mojibake(string)
      return string unless string.match?(MOJIBAKE)

      repaired = string.encode("Windows-1252").force_encoding("UTF-8")
      repaired.valid_encoding? ? repaired : string
    rescue Encoding::UndefinedConversionError, Encoding::InvalidByteSequenceError
      string
    end
  end
end
