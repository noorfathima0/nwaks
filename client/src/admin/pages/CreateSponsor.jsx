import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

export default function CreateSponsor() {

  const navigate = useNavigate()

  const [nameEn,setNameEn] = useState("")
  const [nameKn,setNameKn] = useState("")
  const [category,setCategory] = useState("silver")
  const [website,setWebsite] = useState("")
  const [logo,setLogo] = useState(null)

  const token = localStorage.getItem("token")

  const createSponsor = async (e) => {

    e.preventDefault()

    try {

      let logoUrl = ""

      if(logo){

        const formData = new FormData()
        formData.append("image",logo)

        const uploadRes = await axios.post(
          "http://localhost:5000/api/upload",
          formData
        )

        logoUrl = uploadRes.data.imageUrl
      }

      await axios.post(
        "http://localhost:5000/api/sponsors",
        {
          name:{
            en:nameEn,
            kn:nameKn
          },
          category,
          website,
          logo:logoUrl
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )

      navigate("/admin/sponsors")

    } catch (error) {
      console.error(error)
      alert("Error creating sponsor")
    }

  }

  return (

    <AdminLayout>

      <h2 className="text-2xl font-bold mb-6">
        Create Sponsor
      </h2>

      <form
        onSubmit={createSponsor}
        className="space-y-4 max-w-xl"
      >

        <input
          placeholder="Sponsor Name (English)"
          className="border p-2 w-full"
          value={nameEn}
          onChange={(e)=>setNameEn(e.target.value)}
        />

        <input
          placeholder="Sponsor Name (Kannada)"
          className="border p-2 w-full"
          value={nameKn}
          onChange={(e)=>setNameKn(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        >
          <option value="platinum">Platinum</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
        </select>

        <input
          placeholder="Website URL"
          className="border p-2 w-full"
          value={website}
          onChange={(e)=>setWebsite(e.target.value)}
        />

        <input
          type="file"
          onChange={(e)=>setLogo(e.target.files[0])}
        />

        <button
          className="bg-primary text-white px-6 py-2 rounded"
        >
          Create Sponsor
        </button>

      </form>

    </AdminLayout>

  )

}