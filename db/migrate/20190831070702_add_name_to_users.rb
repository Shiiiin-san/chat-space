class AddNameToUsers < ActiveRecord::Migration[5.0]
  def up
    add_column :users, :name, :char, null: false
  end
  def down
    remove_column :users, :mane, :char, null: false
  end
end
