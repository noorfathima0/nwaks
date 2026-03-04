import { useNavigate } from "react-router-dom"

export default function AdminNavbar() {

  const navigate = useNavigate()

  const logout = () => {

    localStorage.removeItem("token")

    navigate("/admin/login")
  }

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between">

      <h1 className="font-bold">
        Admin Dashboard
      </h1>

      <button
        onClick={logout}
        className="text-red-500"
      >
        Logout
      </button>

    </div>
  )
}