class CreateEventRegistrations < ActiveRecord::Migration[5.1]
  def change
    create_table :event_registrations do |t|
      t.integer :event_id
      t.string :name
      t.string :email

      t.timestamps
    end
  end
end
