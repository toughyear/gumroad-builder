class AddUniqueIndexToWebsitesUrl < ActiveRecord::Migration[7.1]
  def change
    add_index :websites, :url, unique: true
  end
end
