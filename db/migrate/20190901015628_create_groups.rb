class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string :room_name, null: false
      t.index :room_name, unique: true
      t.timestamps
    end
  end
end
