class CreateCoaches < ActiveRecord::Migration[6.1]
  def change
    create_table :coaches do |t|
      t.string :name
      t.text :bio
      t.string :position

      t.timestamps
    end
  end
end
