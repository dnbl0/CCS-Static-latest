require "test_helper"

class RecordRedirectTest < ActionDispatch::IntegrationTest
  test "a UoM ID (emu-umc-<IRN>) used as an address goes to the record (emu-<IRN>)" do
    get "/catalog/emu-umc-400329"

    assert_redirected_to "/catalog/emu-400329"
    assert_response :moved_permanently
  end
end
