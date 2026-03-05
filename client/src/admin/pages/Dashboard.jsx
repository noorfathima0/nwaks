/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/static-components */
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import AdminLayout from "../layout/AdminLayout"
import { Calendar, Users, Image, Megaphone } from "lucide-react"

export default function Dashboard() {

  const [stats,setStats] = useState({
    upcomingEvents:0,
    pastEvents:0,
    sponsors:0,
    ads:0,
    media:0
  })

  useEffect(()=>{
    const fetchStats = async () => {
      try{
        const token = localStorage.getItem("token")
        const [
          upcomingRes,
          pastRes,
          sponsorsRes,
          adsRes,
          mediaRes
        ] = await Promise.all([
          axios.get("http://localhost:5000/api/events/upcoming"),
          axios.get("http://localhost:5000/api/events/past"),
          axios.get("http://localhost:5000/api/sponsors"),
          axios.get(
            "http://localhost:5000/api/advertisements/admin",
            {
              headers:{
                Authorization:`Bearer ${token}`
              }
            }
          ),
          axios.get("http://localhost:5000/api/media")
        ])
        setStats({
          upcomingEvents: upcomingRes.data?.length || 0,
          pastEvents: pastRes.data?.length || 0,
          sponsors: sponsorsRes.data?.length || 0,
          ads: adsRes.data?.length || 0,
          media: mediaRes.data?.length || 0
        })
      }catch(error){
        console.error("Dashboard stats error:",error)
      }
    }

    fetchStats()

  },[])

  const Card = ({icon:Icon,title,count,link}) => (

    <Link to={link}>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">

        <div className="flex items-center justify-between mb-4">

          <Icon className="text-secondary" size={32} />

          <span className="text-3xl font-bold text-primary">
            {count}
          </span>

        </div>

        <h3 className="font-semibold text-lg text-charcoal">
          {title}
        </h3>

      </div>

    </Link>

  )

  return (

    <AdminLayout>

      <h2 className="text-2xl font-bold mb-2">
        Admin Dashboard
      </h2>

      <p className="text-gray-500 mb-8">
        Manage NWAKS website content from here.
      </p>


      {/* STATS GRID */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <Card
          icon={Calendar}
          title="Upcoming Events"
          count={stats.upcomingEvents}
          link="/admin/events"
        />

        <Card
          icon={Calendar}
          title="Past Events"
          count={stats.pastEvents}
          link="/admin/events"
        />

        <Card
          icon={Users}
          title="Sponsors"
          count={stats.sponsors}
          link="/admin/sponsors"
        />

        <Card
          icon={Megaphone}
          title="Advertisements"
          count={stats.ads}
          link="/admin/advertisements"
        />

        <Card
          icon={Image}
          title="Media Gallery"
          count={stats.media}
          link="/admin/media"
        />

      </div>

    </AdminLayout>

  )

}