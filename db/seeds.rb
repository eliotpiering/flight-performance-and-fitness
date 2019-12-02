# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Event.create!(available_spots: 40, description: "Pat Davidson has accumulated a wealth of knowledge in the last ten years. Pat studied for his masters in Strength & Conditioning under Dr Ellyn Robinson at Bridgewater State College before completing his Phd in Exercise Physiology at Springfield College. Pat went on to be a professor in exercise science at Springfield and Brooklyn College. As an athlete Pat has competed in two world championships in strongman at the Arnold Classic, and high levels of submission wrestling and MMA fighting. Pat is one of the most competitive, fierce, and brilliant people in the field of strength and conditioning and his strive for knowledge dominance is contagious.", title: "Avoiding Training Pitfalls in the Year Round Athlete", human_readable_date: "Nov 18 - 19, 2017 at 8:00am - 5:00pm EST", photo_url: "pat-davidson.jpg", event_date: Date.new(2017, 11, 19), location: "Flight Performance & Fitness, 225 Riverview Ave, Aburdale, MA 02446", amount: 30000 )

Author.find_or_create_by(name: "Dylan Gutheil")
Author.find_or_create_by(name: "Jared Collinson")
