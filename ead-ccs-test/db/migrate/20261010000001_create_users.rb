# The smallest user table Blacklight's guest-user support needs: one row per visitor's browser session, so
# bookmarks (and later lists) have an owner. No login, email or password. Plain table only: production Postgres
# (Azure Flexible Server) allows no extensions.
class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.timestamps
    end
  end
end
