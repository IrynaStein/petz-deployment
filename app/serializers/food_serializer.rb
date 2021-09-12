class FoodSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url
end