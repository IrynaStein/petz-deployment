class CreatePets < ActiveRecord::Migration[6.1]
  def change
    create_table :pets do |t|
      t.string :name
      t.string :avatar
      t.date :birthday
      t.boolean :healthy
      t.integer :hungry 
      t.integer :sleepy
      t.integer :bored
      t.boolean :alive
      t.belongs_to :food, null: false
      t.belongs_to :activity, null: false
      t.belongs_to :breed, null: false
      t.belongs_to :user, null: false

      t.timestamps
    end
  end
end
