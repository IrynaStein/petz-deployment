# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Pet.destroy_all
Food.destroy_all
Activity.destroy_all
Breed.destroy_all
AgeStage.destroy_all

puts "Seeding users..."

u1 = User.create(user_name: "iryna", password: "admin123", password_confirmation: "admin123", email: "isophiestein@gmail.com")

u2 = User.create(user_name: "alicia", password: "admin123", password_confirmation: "admin123", email: "alicia.arteta1@gmail.com")

puts "Seeding food..."
avocado = "https://live.staticflickr.com/65535/51406867835_037e5a72ab_c.jpg"
strawberry = "https://live.staticflickr.com/65535/51405887496_a7da6b1831_c.jpg"
charcoal = "https://live.staticflickr.com/65535/51406867940_ee9135c814_c.jpg"
icecream = "https://live.staticflickr.com/65535/51405887526_92a2cd1d59_c.jpg"

f1 = Food.create(name: "avocado", image_url: avocado, food_index: 3)

f2 = Food.create(name: "strawberry", image_url: strawberry, food_index: 2)

f3 = Food.create(name: "icecream", image_url: icecream, food_index:4)

f4 = Food.create(name: "charcoal", image_url: charcoal, food_index: 1)

puts "Seeding activities..."

coding = "https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif"
swimming = "https://media.giphy.com/media/3o72FixDcUYCNdCA1O/source.gif"
hiking = "https://media.giphy.com/media/bFcrER7SWuvsTAXkiw/source.gif"
ball = "https://media.giphy.com/media/P6yorty2fLSgg/source.gif"

a1 = Activity.create(name: "coding", image: coding, act_index: 1)

a2 =Activity.create(name: "swimming", image: swimming, act_index: 4)

a3=Activity.create(name: "hiking", image: hiking, act_index: 3)

a4=Activity.create(name: "balling", image: ball, act_index: 2)

puts "Seeding breeds..."

b1 = Breed.create(name: "tibbar")
b2 = Breed.create(name: "drazzil")

puts "Seeding agestages..."
baby_t = "https://i.imgur.com/8hStjCF.gif"
teen_t = "https://i.imgur.com/66WU0Zb.gif"
adult_t = "https://i.imgur.com/HEZ30TE.gif"
senior_t = "https://i.imgur.com/lwyptwW.gif"

as1 = AgeStage.create(name: "baby-tibbar", image_url: baby_t, breed_id: b1.id)

as2 =AgeStage.create(name: "teen-tibbar", image_url: teen_t, breed_id: b1.id)

as3 = AgeStage.create(name: "adult-tibbar", image_url: adult_t, breed_id: b1.id)

as4 = AgeStage.create(name: "senior-tibbar", image_url: senior_t, breed_id: b1.id)

baby_d="https://i.imgur.com/acaCdKO.gif"
teen_d="https://i.imgur.com/uG7LOKS.gif"
adult_d="https://i.imgur.com/CGxzu6J.gif"
senior_d="https://i.imgur.com/GVWTVrc.gif"

as5 = AgeStage.create(name: "baby-drazzil", image_url: baby_d, breed_id: b2.id)

as6 =AgeStage.create(name: "teen-drazzil", image_url: teen_d, breed_id: b2.id)

as7 = AgeStage.create(name: "adult-drazzil", image_url: adult_d, breed_id: b2.id)

as8 = AgeStage.create(name: "senior-drazzil", image_url: senior_d, breed_id: b2.id)


puts "Seeding pets..."

p1 = Pet.create(
    name: "Panzon", 
    avatar: "https://i.imgur.com/HEZ30TE.gif",
    birthday: Date.today.to_s,
    healthy: true,
    hungry: 1,
    sleepy: 4,
    bored: 2,
    alive: true,
    food_id: f1.id,
    activity_id: a2.id,
    breed_id: b1.id,
    user_id: u1.id,
)

p2 = Pet.create(
    name: "Timmy", 
    avatar: "https://i.imgur.com/HEZ30TE.gif",
    birthday: Date.today.to_s,
    healthy: true,
    hungry: 1,
    sleepy: 4,
    bored: 2,
    alive: true,
    food_id: f2.id,
    activity_id: a4.id,
    breed_id: b2.id,
    user_id: u1.id,
)

puts "For cemetery ..."
p3 = Pet.create(
    name: "Peluchita", 
    avatar: "https://i.imgur.com/HEZ30TE.gif",
    birthday: Date.today.to_s,
    healthy: true,
    hungry: 1,
    sleepy: 4,
    bored: 2,
    alive: false,
    food_id: 1,
    activity_id: 3,
    breed_id: 2,
    user_id: 2,
)

p4 = Pet.create(
    name: "Suzy", 
    avatar: "https://i.imgur.com/HEZ30TE.gif",
    birthday: Date.today.to_s,
    healthy: true,
    hungry: 1,
    sleepy: 4,
    bored: 2,
    alive: false,
    food_id: 2,
    activity_id: 4,
    breed_id: 1,
    user_id: 2,
)

puts "DONE!!!"

