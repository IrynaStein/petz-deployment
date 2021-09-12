class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.string :name
      t.string :image_url
      t.integer :food_index

      t.timestamps
    end
  end
end
