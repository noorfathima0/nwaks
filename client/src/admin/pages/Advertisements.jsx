import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import AdminLayout from "../layout/AdminLayout"

export default function AdminAdvertisements() {

  const [advertisements, setAdvertisements] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAdvertisements = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/advertisements"
      )
      setAdvertisements(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdvertisements()
  }, [])

  const deleteAdvertisement = async (id) => {
    if (window.confirm("Are you sure you want to delete this advertisement?")) {
      try {
        const token = localStorage.getItem("token")
        await axios.delete(
          `http://localhost:5000/api/advertisements/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        fetchAdvertisements() // Refresh list after delete
      } catch (error) {
        console.error(error)
        alert("Error deleting advertisement")
      }
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    )
  }

  return (

    <AdminLayout>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Advertisements
        </h2>

        <Link
          to="/admin/ads/create"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
        >
          Create Advertisement
        </Link>

      </div>

      {advertisements.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">No advertisements found. Create your first advertisement!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {advertisements.map((ad) => (

            <div
              key={ad._id}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
            >

              {/* Advertisement Image */}
              {ad.image && (
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={ad.image}
                    alt={ad.title?.en}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              )}

              <div className="p-4">

                {/* Status Badge */}
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    ad.active 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {ad.active ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Title (English) */}
                <h3 className="font-semibold text-lg text-primary mb-1">
                  {ad.title?.en}
                </h3>

                {/* Title (Kannada) */}
                <p className="text-sm text-gray-600 mb-2">
                  {ad.title?.kn}
                </p>

                {/* Description Preview */}
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {ad.description?.en}
                </p>

                {/* Link if exists */}
                {ad.link && (
                  <a 
                    href={ad.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline block mb-3 truncate"
                  >
                    {ad.link}
                  </a>
                )}

                {/* Created Date */}
                <p className="text-xs text-gray-400 mb-3">
                  Created: {new Date(ad.createdAt).toLocaleDateString()}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 border-t pt-3">
                  <Link
                    to={`/admin/advertisements/edit/${ad._id}`}
                    className="text-blue-600 text-sm hover:underline px-2 py-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteAdvertisement(ad._id)}
                    className="text-red-600 text-sm hover:underline px-2 py-1"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/advertisements/toggle/${ad._id}`}
                    className={`text-sm px-2 py-1 ${
                      ad.active 
                        ? "text-orange-600 hover:underline" 
                        : "text-green-600 hover:underline"
                    }`}
                  >
                    {ad.active ? "Deactivate" : "Activate"}
                  </Link>
                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </AdminLayout>

  )

}