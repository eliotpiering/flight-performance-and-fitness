class AddAuthorAndTagsToPosts < ActiveRecord::Migration[5.2]
  def change
    create_table :authors do |t|
      t.string :name, null: false

      t.timestamps
    end
    add_index :authors, :name, unique: true

    create_table :tags do |t|
      t.string :title, null: false, unique: true

      t.timestamps
    end
    add_index :tags, :title, unique: true

    create_table :post_tags do |t|
      t.integer :post_id, null: false
      t.integer :tag_id, null: false

      t.timestamps
    end
    add_index :post_tags, [:post_id, :tag_id], unique: true

    add_column :posts, :author_id, :integer
  end
end
