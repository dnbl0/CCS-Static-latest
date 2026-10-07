require "test_helper"

class ContentSecurityPolicyTest < ActionDispatch::IntegrationTest
  test "pages carry a report-only policy, so nothing is blocked yet" do
    get "/"

    assert_response :success
    assert_nil response.headers["Content-Security-Policy"]
    policy = response.headers["Content-Security-Policy-Report-Only"]
    assert_includes policy, "default-src 'self'"
    assert_includes policy, "object-src 'none'"
    assert_match(/script-src 'self' 'nonce-/, policy)
  end
end
