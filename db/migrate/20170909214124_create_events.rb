class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.integer :available_spots
      t.integer :amount
      t.text :description
      t.string :title
      t.string :location
      t.string :photo_url
      t.string :human_readable_date
      t.date :event_date

      t.timestamps
    end
  end
end
