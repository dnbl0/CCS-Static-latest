require "test_helper"

class DocumentRoutingTest < ActionDispatch::IntegrationTest
  test "track route accepts document ids containing dots" do
    assert_routing({ path: "/catalog/vernon-MHM2013.61/track", method: :post },
      controller: "catalog", action: "track", id: "vernon-MHM2013.61")
  end
end
