class CreateAgeStages < ActiveRecord::Migration[6.1]
  def change
    create_table :age_stages do |t|
      t.string :name
      t.string :image_url
      t.belongs_to :breed

      t.timestamps
    end
  end
end
