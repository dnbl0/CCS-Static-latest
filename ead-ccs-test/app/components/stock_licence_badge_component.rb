# frozen_string_literal: true

# A record's licence as a badge: the licence's icon or icons, then its label, linked to the licence's page where it has one, as
# Europeana's record pages draw a rights statement (europeana/portal.js RightsStatementButton: a small off-white button, the
# icons a quarter rem apart, then the name; the lookup from licence to icons follows its rightsStatement.js). Creative Commons
# licences get CC's own element icons (cc, by, nc, nd, sa), the public domain mark and CC0 theirs, from
# creativecommons.org/mission/downloads (public/images/cc, copied to app/assets/images/site/cc by sync:rails); the University's
# own copyright and reproduction-licence values get the in-copyright symbol.
#
# This collection's licence values are the University's own ("Public domain - Copyright expired", "Copyright - Current",
# "Reproduction Licence - Current"); the Creative Commons rows are for a record that ever carries one ("CC BY-SA"). A version-less
# CC label links to version 4.0.
class StockLicenceBadgeComponent < Blacklight::Component
  PUBLIC_DOMAIN_MARK = "https://creativecommons.org/publicdomain/mark/1.0/"
  CC0 = "https://creativecommons.org/publicdomain/zero/1.0/"
  CC_LICENCE = %r{\ACC (BY(?:-NC)?(?:-ND|-SA)?)\b}i

  # The hover text, from the reviewed copy: "<label> means ...". Free use: the public domain, CC0, CC BY and CC BY-SA; permission:
  # in copyright. The copy has no sentence for a Creative Commons licence with NC or ND conditions (the static site words them "with
  # conditions") nor for the reproduction licence, which is left without hover text until the stakeholders decide.
  MEANS_FREE = "means you can use this item freely."
  MEANS_PERMISSION = "means you may be able to use this item if you seek permission."
  MEANS_CONDITIONS = "means you can use this item with conditions."

  attr_reader :licence

  def initialize(licence:)
    super()
    @licence = licence.to_s.strip
  end

  def render? = licence.present?

  # { icons: [names], url: licence page or nil }
  def statement
    case licence
    when /\Apublic domain/i then { icons: %w[pd], url: PUBLIC_DOMAIN_MARK }
    when /\ACC0\b/i then { icons: %w[zero], url: CC0 }
    when CC_LICENCE
      elements = ::Regexp.last_match(1).downcase
      { icons: [ "cc" ] + elements.split("-"), url: "https://creativecommons.org/licenses/#{elements}/4.0/" }
    when /\A(copyright|reproduction licence)/i then { icons: %w[copyright], url: nil }
    else { icons: [], url: nil }
    end
  end

  # The hover text, or nil where the copy has none
  def meaning
    case licence
    when /\Apublic domain/i then "Public Domain #{MEANS_FREE}"
    when /\ACC0\b/i then "CC0 #{MEANS_FREE}"
    when CC_LICENCE
      elements = ::Regexp.last_match(1).upcase
      "CC #{elements} #{elements.match?(/NC|ND/) ? MEANS_CONDITIONS : MEANS_FREE}"
    when /\Acopyright/i then "In copyright #{MEANS_PERMISSION}"
    end
  end

  # The icon files (app/assets/images/site/cc) for the statement's icons
  ICON_FILES = %w[cc by nc nd sa zero pd].to_h { |name| [ name, "site/cc/#{name}.svg" ] }.merge("copyright" => "site/cc/in-copyright.svg").freeze

  def icons = statement[:icons].filter_map { |name| ICON_FILES[name] }

  def url = statement[:url]

  def wrapper_options
    options = { class: "licence-badge" }
    options.merge!(href: url, target: "_blank", rel: "noopener") if url
    options[:title] = meaning if meaning
    options
  end
end
