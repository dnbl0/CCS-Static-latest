require "test_helper"

# Bootstrap's Sass variables must be literal colours, so they duplicate design tokens.
# This keeps the two in step.
class BootstrapThemeTokensTest < ActiveSupport::TestCase
  STYLESHEETS = Rails.root.join("app/assets/stylesheets")

  def normalise(hex)
    hex = hex.downcase.delete_prefix("#")
    hex.length == 3 ? hex.chars.map { |c| c * 2 }.join : hex
  end

  test "Sass theme colours match the design tokens they name" do
    tokens = STYLESHEETS.join("tokens/primitives.css").read.scan(/(--ccs-[\w-]+):\s*(#\h{3,6})\s*;/).to_h
    pairs = STYLESHEETS.join("_bootstrap-uom-variables.scss").read.scan(/^\$[\w-]+:\s*(#\h{3,6});[^\n]*?(--ccs-[\w-]+)/)

    assert_operator pairs.size, :>=, 8
    pairs.each do |hex, token|
      assert tokens.key?(token), "#{token} is not defined in tokens/primitives.css"
      assert_equal normalise(tokens[token]), normalise(hex), "#{token} differs from the Sass variable that names it"
    end
  end
end
