# frozen_string_literal: true

# Classifies a user's query as a plain keyword search
# or one that uses Lucene syntax so SearchBuilder can pick the matching minimum-should-match

module QuerySyntax
  module_function

  PHRASE = /"[^"]*"/   # operators inside a phrase are literal text
  OPERATOR = /(?:\A|\s)(?:AND|OR|NOT)(?=\s)/ # uppercase only
  PREFIXED = /(?:\A|\s)[+-]\S/  # to handle include / exclude eg: +anatomy, -botany
  FIELDED = /(?:\A|\s)\w+:\S/  # eg. title_tsim:anatomy

  # Exclude parentheses without operators
  def explicit?(query)
    scannable = query.to_s.gsub(PHRASE, " ")
    scannable.match?(OPERATOR) || scannable.match?(PREFIXED) || scannable.match?(FIELDED)
  end
end
