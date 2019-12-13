class AddPublishedDate < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :published_at, :datetime
    add_index :posts, :published_at
  end
end
