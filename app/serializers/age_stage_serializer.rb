class AgeStageSerializer < ActiveModel::Serializer
  attributes :name, :image_url
#need to clean up this serializer is sending to muchinfo along with breed
  has_one :breed
end
