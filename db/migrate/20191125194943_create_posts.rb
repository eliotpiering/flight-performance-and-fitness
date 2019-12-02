class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.text :post_body, :text
      t.boolean :published, default: false
      t.string :title

      t.timestamps
    end
  end
end
