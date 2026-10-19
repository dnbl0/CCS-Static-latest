require "test_helper"

# Addresses that people, bots and old bookmarks really produce: broken encodings, paging far past the end, a thousand-character
# search, hand-edited filters. None of them may end in a server error (500); the answer is a result, a redirect, or an error page
# in the site chrome. (Without Solr the search itself answers 503, which is also not a 500.)
class HostileUrlsTest < ActionDispatch::IntegrationTest
  URLS = [
    "/catalog?q=skull&page=0", "/catalog?q=skull&page=-1", "/catalog?q=skull&page=abc", "/catalog?q=skull&page=99999999999999999999",
    "/catalog?q=skull&per_page=0", "/catalog?q=skull&per_page=-5", "/catalog?q=skull&per_page=abc", "/catalog?q=skull&per_page=100000",
    "/catalog?q=skull&sort=nonsense", "/catalog?q=skull&view=bad", "/catalog?q=skull&search_field=nope",
    "/catalog?q=%00", "/catalog?q=%F0%9F%92%80", "/catalog?q=#{"a" * 5000}", "/catalog?q[]=a&q[]=b", "/catalog?q[a]=b",
    "/catalog?q=(((((((", "/catalog?q=%22unclosed", "/catalog?q=AND", "/catalog?q=-", "/catalog?q=%2B",
    "/catalog?q=skull&f[collection_ssim]=x", "/catalog?q=skull&f[collection_ssim][]=", "/catalog?q=skull&f[nope][]=x", "/catalog?q=skull&f=notahash",
    "/catalog?q=skull&f_inclusive[collection_ssim]=x",
    "/catalog?q=skull&range[date_start_isi][begin]=abc&range[date_start_isi][end]=xyz",
    "/catalog?q=skull&range[date_start_isi][begin]=2000&range[date_start_isi][end]=1000",
    "/catalog?q=skull&range[date_start_isi][begin]=99999999999999999999", "/catalog?q=skull&range=x",
    "/catalog?q=skull&clause[0][field]=nope&clause[0][query]=x", "/catalog?q=skull&clause=x", "/catalog?op=bad&clause[0][field]=all_fields&clause[0][query]=x",
    "/catalog?clause[9999][field]=title&clause[9999][query]=x", "/catalog/advanced?clause[0][query]=x", "/catalog/advanced?op=bad",
    "/catalog?q=skull&format=nope", "/catalog.json?q=skull&page=0", "/catalog.json?q=skull&per_page=abc",
    "/catalog/%00", "/catalog/#{"a" * 3000}", "/catalog/a%2Fb", "/catalog/emu-9044.nope", "/stock/does-not-exist", "/branded-stock/%00",
    "/catalog/facet/nope", "/catalog/facet/collection_ssim?facet.page=-1", "/catalog/facet/collection_ssim?facet.page=abc", "/catalog/facet/collection_ssim?facet.sort=bad",
    "/bookmarks?page=0", "/bookmarks?per_page=abc", "/bookmarks/nope", "/search_history?page=abc",
    "/help?topic=nope", "/help/nope", "/collections/NOPE", "/collections/%00", "/nope", "/%00", "/a/b/c/d", "/catalog/suggest?q=%00"
  ].freeze

  URLS.each do |url|
    test "#{url[0, 70]} does not end in a server error" do
      get url, headers: { "Accept" => "text/html" }

      assert_not_equal 500, response.status, "#{url} answered 500"
    end
  end
end
