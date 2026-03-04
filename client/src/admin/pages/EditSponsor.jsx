import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

export default function EditSponsor() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [nameEn,setNameEn] = useState("")
  const [nameKn,setNameKn] = useState("")
  const [category,setCategory] = useState("silver")
  const [website,setWebsite] = useState("")
  const [logo,setLogo] = useState(null)

  const token = localStorage.getItem("token")

  useEffect(()=>{

    const fetchSponsor = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/sponsors/${id}`
        )

        const sponsor = res.data

        setNameEn(sponsor.name.en)
        setNameKn(sponsor.name.kn)
        setCategory(sponsor.category)
        setWebsite(sponsor.website || "")

      } catch (error) {
        console.error(error)
      }

    }

    fetchSponsor()

  },[id])


  const updateSponsor = async (e) => {

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

      await axios.put(
        `http://localhost:5000/api/sponsors/${id}`,
        {
          name:{
            en:nameEn,
            kn:nameKn
          },
          category,
          website,
          ...(logoUrl && { logo:logoUrl })
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
      alert("Error updating sponsor")

    }

  }

  const deleteSponsor = async () => {

    if(!window.confirm("Delete this sponsor?")) return

    try {

      await axios.delete(
        `http://localhost:5000/api/sponsors/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )

      navigate("/admin/sponsors")

    } catch (error) {
      console.error(error)
      alert("Error deleting sponsor")
    }

  }

  return (

    <AdminLayout>

      <h2 className="text-2xl font-bold mb-6">
        Edit Sponsor
      </h2>

      <form
        onSubmit={updateSponsor}
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
          Update Sponsor
        </button>

        <button
          type="button"
          onClick={deleteSponsor}
          className="bg-red-600 text-white px-6 py-2 rounded ml-4"
        >
          Delete Sponsor
        </button>

      </form>

    </AdminLayout>

  )

}