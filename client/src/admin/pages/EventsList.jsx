import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

export default function EventsList() {

  const [events, setEvents] = useState([])
  const navigate = useNavigate()

  const fetchEvents = async () => {

    const res = await axios.get("http://localhost:5000/api/events")

    setEvents(res.data)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEvents()
  }, [])

  const today = new Date()

  const upcoming = events.filter(
    e => new Date(e.date) >= today
  )

  const past = events.filter(
    e => new Date(e.date) < today
  )

  return (

    <AdminLayout>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Events Manager
        </h2>

        <button
          onClick={()=>navigate("/admin/events/create")}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Create Event
        </button>

      </div>

      {/* UPCOMING EVENTS */}

      <h3 className="text-xl font-semibold mb-4">
        Upcoming Events
      </h3>

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {upcoming.map(event => (

          <EventCard
            key={event._id}
            event={event}
            navigate={navigate}
          />

        ))}

      </div>


      {/* PAST EVENTS */}

      <h3 className="text-xl font-semibold mb-4">
        Past Events
      </h3>

      <div className="grid md:grid-cols-3 gap-6">

        {past.map(event => (

          <EventCard
            key={event._id}
            event={event}
            navigate={navigate}
          />

        ))}

      </div>

    </AdminLayout>
  )
}

function EventCard({ event, navigate }) {

  return (

    <div className="bg-white shadow rounded-xl overflow-hidden">

      <img
        src={event.image}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">

        <h3 className="font-bold mb-2">
          {event.title.en}
        </h3>

        <p className="text-sm text-gray-500 mb-3">
          {new Date(event.date).toLocaleDateString()}
        </p>

        <button
          onClick={()=>navigate(`/admin/events/edit/${event._id}`)}
          className="text-primary font-semibold"
        >
          Edit
        </button>

      </div>

    </div>

  )
}