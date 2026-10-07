require "test_helper"
require "view_component/test_helpers"

class BannerTest < ActiveSupport::TestCase
  test "the banner copy is the default description until there is a search" do
    assert_match(/Explore artworks, objects, manuscripts/, NexusCcs::SearchBannerComponent::DESCRIPTION)
    assert_equal "Search the Collection", NexusCcs::SearchBannerComponent::TITLE
  end

  test "the banner styles follow the static page: 48px bar, 720px, visible Advanced search link" do
    css = Rails.root.join("app/assets/stylesheets/components/search_banner.css").read

    assert_match(/\.search-banner \.input-group \{[^}]*height: 3rem;/m, css)
    assert_match(/\.search-banner__form \{[^}]*max-width: 45rem;/m, css)
    assert_match(/\.search-banner \.advanced_search \{[^}]*display: inline-flex;/m, css)
    assert_no_match(/\.advanced_search \{[^}]*clip: rect/m, css)
    assert_match(/\.search-banner__desc \{[^}]*line-height: 1\.75rem;/m, css)
  end
end
