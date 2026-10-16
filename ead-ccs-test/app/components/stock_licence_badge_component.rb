# frozen_string_literal: true

# A record's licence as a badge: the licence's icon or icons, then its label, linked to the licence's page where it has one, as
# Europeana draws it (a lookup from the licence to its icons, as europeana/portal.js's rightsStatement.js does). Creative Commons
# licences get CC's element icons (cc, by, nc, nd, sa); the public domain, CC0, and the copyright symbol for the University's own
# copyright and reproduction-licence values. The icons are StockLicenceIcons' (Font Awesome Free's, CC BY 4.0).
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

  def icons = statement[:icons].filter_map { |name| StockLicenceIcons::PATHS[name] }

  def url = statement[:url]

  def wrapper_options
    options = { class: "badge rounded-pill text-bg-light border fw-normal px-3 py-2 d-inline-flex align-items-center gap-2 text-decoration-none" }
    options.merge!(href: url, target: "_blank", rel: "noopener") if url
    options[:title] = meaning if meaning
    options
  end
end
