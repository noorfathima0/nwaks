import { Link } from "react-router-dom"

export default function AdminSidebar() {

  return (
    <div className="w-64 bg-primary text-white min-h-screen p-6">

      <h2 className="text-xl font-bold mb-8">
        NWAKS Admin
      </h2>

      <nav className="flex flex-col gap-4">

        <Link to="/admin/dashboard">Dashboard</Link>

        <Link to="/admin/events">Events</Link>

        <Link to="/admin/sponsors">Sponsors</Link>

        <Link to="/admin/media">Media</Link>

        <Link to="/admin/ads">Advertisements</Link>

      </nav>

    </div>
  )
}