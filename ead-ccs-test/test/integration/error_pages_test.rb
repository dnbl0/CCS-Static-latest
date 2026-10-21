require "test_helper"

# What a visitor sees when something fails: a page in the site header and footer, in plain words, with what to do next
# (ErrorsController), instead of Rails' stock page. No Solr is needed for these.
class ErrorPagesTest < ActionDispatch::IntegrationTest
  # The test environment shows Rails' detailed exception pages; production hands the failed request to config.exceptions_app.
  def as_production
    env = Rails.application.env_config
    before = env.values_at("action_dispatch.show_exceptions", "action_dispatch.show_detailed_exceptions")
    env["action_dispatch.show_exceptions"] = :all
    env["action_dispatch.show_detailed_exceptions"] = false
    yield
  ensure
    env["action_dispatch.show_exceptions"], env["action_dispatch.show_detailed_exceptions"] = before
  end

  test "an unknown address is a 404 in the site chrome, with what to do next" do
    as_production { get "/no-such-page" }

    assert_response :not_found
    assert_select ".site-header"
    assert_select ".site-footer"
    assert_select ".page-banner h1", "Page not found"
    assert_select ".error-page__lead", /mistyped/
    assert_select ".error-page__links a", text: "Search all records"
    assert_select ".error-page__links a[href='/collections']", count: 0
    assert_select ".error-page__links a", text: "Go to the home page"
    assert_select ".error-page__help a[href=?]", "/help#contact-us"
    assert_select ".error-page__code", "Error 404"
  end

  test "an unknown record is a 404 about the record, not about a page" do
    as_production { get "/stock/no-such-record" }

    assert_response :not_found
    assert_select ".page-banner h1", "We can't find this record"
    assert_select ".error-page__lead", /withdrawn/
  end

  test "an unreadable address is a 400 with its own wording" do
    as_production { get "/catalog?q=%E0%A4%A" }

    assert_response :bad_request
    assert_select ".page-banner h1", "We couldn't read that address"
  end

  test "an unexpected failure is a 500 that offers to try the page again, and shows no detail" do
    original = HelpTopic.method(:find)
    HelpTopic.define_singleton_method(:find) { |*| raise "boom: secret detail" }
    begin
      as_production { get "/help?topic=anything" }
    ensure
      HelpTopic.define_singleton_method(:find, original)
    end

    assert_response :internal_server_error
    assert_select ".page-banner h1", "Something went wrong"
    assert_select ".error-page__links a[href=?]", "/help?topic=anything", text: "Try this page again"
    assert_no_match(/boom|secret detail|backtrace/i, response.body)
  end

  test "the layouts tell a visitor with JavaScript turned off what still works" do
    get "/help"

    assert_includes response.body, "<noscript>"
    assert_match(/JavaScript is turned off/, response.body)
    assert_match(%r{href="/catalog\?search_field=all_fields">search all records}, response.body)
  end
end
