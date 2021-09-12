class BreedSerializer < ActiveModel::Serializer
  attributes :id, :name, :age
  
  def age
    self.object.age_stages.map do |s|
      {id: s.id, name: s.name, image: s.image_url}
    end
  end
end
