class User < ApplicationRecord
    
    has_many :pets, dependent: :destroy
    has_one_attached :image, dependent: :destroy

    has_secure_password

    validates :user_name, presence: true, uniqueness: true
    validates :email, presence: true
    validates :password, length: {in: 6..20}

    
end
