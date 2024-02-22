class CreateWebsites < ActiveRecord::Migration[6.0]
  def change
    create_table :websites, id: false do |t|
      t.string :id, primary_key: true, default: -> { 'gen_random_uuid()' }
      t.string :title
      t.boolean :published, default: false
      t.string :url
      t.string :owner_id
      t.text :content, default: '{}'
      t.integer :version, default: 1

      t.timestamps
    end
  end
end
