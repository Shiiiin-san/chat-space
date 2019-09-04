FactoryBot.define do
  factory :group do
    room_name {Faker::Team.name}
  end
end