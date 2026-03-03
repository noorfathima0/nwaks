import { Calendar, Clock, MapPin } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

export default function UpcomingEvents() {
  const {t} = useLanguage()
  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.upcomingEvents.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.upcomingEvents.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Mahashivarathri 2026",
              date: "February 26, 2026",
              time: "6:00 PM - 12:00 AM",
              location: "Community Center, Bentonville",
              description:
                "Sacred celebration of Mahashivarathri with night-long prayers, bhajans, and special puja ceremonies.",
            },
            {
              title: "Ugadi Celebration 2026",
              date: "March 29, 2026",
              time: "4:00 PM - 8:00 PM",
              location: "Community Center, Bentonville",
              description:
                "Celebrate Kannada New Year with traditional food, cultural programs, and fun activities for the whole family.",
            },
            {
              title: "Summer Picnic 2026",
              date: "June 20, 2026",
              time: "11:00 AM - 5:00 PM",
              location: "Lake Wedington",
              description:
                "Annual summer picnic with games, sports, and potluck lunch. A wonderful opportunity for community bonding.",
            },
            {
              title: "Kannada Rajyothsava 2026",
              date: "November 1, 2026",
              time: "5:00 PM - 10:00 PM",
              location: "Jones Center, Springdale",
              description:
                "Grand celebration of Karnataka Formation Day with cultural performances, awards ceremony, and dinner.",
            },
          ].map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md p-10 hover:shadow-xl transition duration-300"
            >
              <h2 className="font-heading text-2xl text-primary mb-6">
                {event.title}
              </h2>

              <div className="space-y-4 mb-6 text-charcoal">
                <div className="flex items-center gap-3">
                  <Calendar className="text-secondary flex-shrink-0" size={20} />
                  <span>{event.date}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="text-secondary flex-shrink-0" size={20} />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-secondary flex-shrink-0" size={20} />
                  <span>{event.location}</span>
                </div>
              </div>

              <p className="text-charcoal leading-relaxed mb-6">
                {event.description}
              </p>

              <button className="bg-secondary text-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-support transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}