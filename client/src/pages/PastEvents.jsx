import { Calendar, Clock, MapPin } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

export default function PastEvents() {
  const {t} = useLanguage()

  const events = [
    {
      title: "Kannada Rajyothsava 2025",
      date: "November 1, 2025",
      time: "5:00 PM - 10:00 PM",
      location: "Jones Center, Springdale",
      description:
        "Grand celebration of Karnataka Formation Day with cultural performances, awards ceremony, and dinner.",
    },
    {
      title: "Deepavali Celebration 2025",
      date: "October 20, 2025",
      time: "5:00 PM - 9:00 PM",
      location: "Community Hall, Rogers",
      description:
        "Celebration of the festival of lights with traditional lamp lighting, rangoli, and cultural performances.",
    },
    {
      title: "Summer Picnic 2025",
      date: "June 15, 2025",
      time: "11:00 AM - 5:00 PM",
      location: "Lake Wedington",
      description:
        "Annual summer picnic with games, sports, and potluck lunch.",
    },
    {
      title: "Ugadi Celebration 2025",
      date: "March 30, 2025",
      time: "4:00 PM - 8:00 PM",
      location: "Community Center, Bentonville",
      description:
        "Celebration of Kannada New Year with traditional food and cultural programs.",
    },
    {
      title: "Kannada Rajyothsava 2024",
      date: "November 3, 2024",
      time: "4:00 PM - 9:00 PM",
      location: "Jones Center, Springdale",
      description:
        "Annual Karnataka Formation Day celebration with cultural programs and community awards.",
    },
    {
      title: "Deepavali Celebration 2024",
      date: "November 2, 2024",
      time: "5:00 PM - 9:00 PM",
      location: "Community Hall, Rogers",
      description:
        "Festival of lights celebration with rangoli and performances.",
    },
    {
      title: "Sankranti Celebration 2024",
      date: "January 14, 2024",
      time: "3:00 PM - 7:00 PM",
      location: "Community Center, Bentonville",
      description:
        "Traditional Makar Sankranti celebration with kite flying and festive activities.",
    },
    {
      title: "Annual General Meeting 2023",
      date: "December 10, 2023",
      time: "2:00 PM - 5:00 PM",
      location: "Library Hall, Fayetteville",
      description:
        "Annual general body meeting to discuss organizational activities.",
    },
    {
      title: "Independence Day Celebration 2023",
      date: "August 15, 2023",
      time: "10:00 AM - 1:00 PM",
      location: "Arvest Ballpark, Springdale",
      description:
        "Celebration of Indian Independence Day with flag hoisting and cultural programs.",
    },
  ]

  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.pastEvents.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.pastEvents.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-300 flex flex-col h-full"
            >
              <h2 className="font-heading text-xl text-primary mb-3">
                {event.title}
              </h2>

              <div className="space-y-2 mb-4 text-charcoal text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="text-secondary flex-shrink-0" size={16} />
                  <span>{event.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="text-secondary flex-shrink-0" size={16} />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="text-secondary flex-shrink-0" size={16} />
                  <span>{event.location}</span>
                </div>
              </div>

              <p className="text-charcoal leading-relaxed mb-4 text-sm flex-grow">
                {event.description}
              </p>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}