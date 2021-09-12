require 'date'
class Pet < ApplicationRecord
    belongs_to :user
    belongs_to :breed
    belongs_to :activity
    belongs_to :food
    
    validates :name, presence: true, uniqueness: true
    validates :avatar, presence: true
    
    # before_create :set_pet
    #  def set_pet
    #     byebug
        # food = Food.find_by(name: params['food'])
        # activity = Activity.find_by(name: params['activity'])
        # age_stage = breed.age_stages.find_by(id: 1).image_url
    #     self.breed = Breed.all.find_by(name: pet_params['breed'])
    #     self.birthday = Date.today.to_s,
    #     self.healthy = true,
    #     self.hungry = 4,
    #     self.sleepy = 1, 
    #     self.bored = 3, 
    #     self.alive = true,
    #     self.avatar = self.breed.age_stages.find_by(id: 1).image_url
    # end
    
    def self.my_new_pet(pet_params)
        breed = Breed.find_by(name: pet_params['breed'])
        # byebug
        food = Food.find_by(name: pet_params['food'])
        activity = Activity.find_by(name: pet_params['activity'])
        age_stage = breed.age_stages.first.image_url
        pet = Pet.create!(
            name: pet_params['name'],
            breed: breed,
            avatar: age_stage,
            birthday: Date.today.to_s,
            healthy: true,
            activity: activity,
            food: food,
            avatar: age_stage,
            hungry: 4,
            sleepy: 1, 
            bored: 3, 
            alive: true,
        )
    end

    def self.obituary
        pets = Pet.all.map{|pet| {
            id: pet.id,
            name: pet.name, 
            breed: pet.breed.name,
            #second date needs to be updated to the day of death
            dates: [pet.birthday, Date.today.to_s],
            food: pet.food.name,
            activity: pet.activity.name}}
    end
end
