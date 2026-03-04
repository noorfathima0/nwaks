import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

export default function CreateEvent() {

  const navigate = useNavigate()

  const [titleEn,setTitleEn] = useState("")
  const [titleKn,setTitleKn] = useState("")

  const [descEn,setDescEn] = useState("")
  const [descKn,setDescKn] = useState("")

  const [locEn,setLocEn] = useState("")
  const [locKn,setLocKn] = useState("")

  const [date,setDate] = useState("")

  const [image,setImage] = useState(null)

  const token = localStorage.getItem("token")

  const createEvent = async(e)=>{

    e.preventDefault()

    try{

      let imageUrl = ""

      if(image){

        const formData = new FormData()

        formData.append("image",image)

        const uploadRes = await axios.post(
          "http://localhost:5000/api/upload",
          formData
        )

        imageUrl = uploadRes.data.imageUrl
      }

      await axios.post(
        "http://localhost:5000/api/events",
        {
          title:{
            en:titleEn,
            kn:titleKn
          },
          description:{
            en:descEn,
            kn:descKn
          },
          location:{
            en:locEn,
            kn:locKn
          },
          date,
          image:imageUrl
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )

      navigate("/admin/events")

    }catch(error){

      console.error(error)

      alert("Error creating event")

    }

  }

  return (

    <AdminLayout>

      <h2 className="text-2xl font-bold mb-6">
        Create Event
      </h2>

      <form
        onSubmit={createEvent}
        className="space-y-4 max-w-xl"
      >

        <input
          placeholder="Title (English)"
          className="border p-2 w-full"
          value={titleEn}
          onChange={(e)=>setTitleEn(e.target.value)}
        />

        <input
          placeholder="Title (Kannada)"
          className="border p-2 w-full"
          value={titleKn}
          onChange={(e)=>setTitleKn(e.target.value)}
        />

        <textarea
          placeholder="Description (English)"
          className="border p-2 w-full"
          value={descEn}
          onChange={(e)=>setDescEn(e.target.value)}
        />

        <textarea
          placeholder="Description (Kannada)"
          className="border p-2 w-full"
          value={descKn}
          onChange={(e)=>setDescKn(e.target.value)}
        />

        <input
          placeholder="Location (English)"
          className="border p-2 w-full"
          value={locEn}
          onChange={(e)=>setLocEn(e.target.value)}
        />

        <input
          placeholder="Location (Kannada)"
          className="border p-2 w-full"
          value={locKn}
          onChange={(e)=>setLocKn(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 w-full"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />

        <input
          type="file"
          onChange={(e)=>setImage(e.target.files[0])}
        />

        <button
          className="bg-primary text-white px-6 py-2 rounded"
        >
          Create Event
        </button>

      </form>

    </AdminLayout>
  )
}