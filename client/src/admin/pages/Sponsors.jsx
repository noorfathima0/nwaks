/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import AdminLayout from "../layout/AdminLayout"

export default function AdminSponsors() {

  const [sponsors, setSponsors] = useState([])

  const fetchSponsors = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/sponsors"
      )

      setSponsors(res.data)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchSponsors()
  }, [])

  return (

    <AdminLayout>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Sponsors
        </h2>

        <Link
          to="/admin/sponsors/create"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Create Sponsor
        </Link>

      </div>


      <div className="grid md:grid-cols-3 gap-6">

        {sponsors.map((sponsor) => (

          <div
            key={sponsor._id}
            className="bg-white shadow rounded-lg p-4"
          >

            {sponsor.logo && (
              <img
                src={sponsor.logo}
                alt={sponsor.name?.en}
                className="h-20 object-contain mb-4"
              />
            )}

            <h3 className="font-semibold text-lg">
              {sponsor.name?.en}
            </h3>

            <p className="text-sm text-gray-500 capitalize mb-4">
              {sponsor.category}
            </p>

            <Link
              to={`/admin/sponsors/edit/${sponsor._id}`}
              className="text-blue-600 text-sm"
            >
              Edit
            </Link>

          </div>

        ))}

      </div>

    </AdminLayout>

  )

}