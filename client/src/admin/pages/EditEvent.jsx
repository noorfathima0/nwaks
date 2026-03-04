import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

export default function EditEvent() {

  const { id } = useParams()
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

  // Load event details
  useEffect(()=>{
    const fetchEvent = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/events/${id}`
        )

        const event = res.data

        setTitleEn(event.title.en)
        setTitleKn(event.title.kn)

        setDescEn(event.description.en)
        setDescKn(event.description.kn)

        setLocEn(event.location.en)
        setLocKn(event.location.kn)

        setDate(event.date.split("T")[0])

      } catch (error) {
        console.error(error)
      }

    }
    fetchEvent()
  },[id])

  const deleteEvent = async () => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this event?"
  )

  if(!confirmDelete) return

  try{

    await axios.delete(
      `http://localhost:5000/api/events/${id}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )

    alert("Event deleted successfully")

    navigate("/admin/events")

  }catch(error){

    console.error(error)
    alert("Error deleting event")

  }

}


  const updateEvent = async (e) => {

    e.preventDefault()

    try {

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

      await axios.put(
        `http://localhost:5000/api/events/${id}`,
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
          ...(imageUrl && { image:imageUrl })
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )

      navigate("/admin/events")

    } catch (error) {

      console.error(error)
      alert("Error updating event")

    }

  }


  return (

    <AdminLayout>

      <h2 className="text-2xl font-bold mb-6">
        Edit Event
      </h2>

      <form
        onSubmit={updateEvent}
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

        <div className="flex gap-4">

        <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded"
        >
            Update Event
        </button>

        <button
            type="button"
            onClick={deleteEvent}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
            Delete Event
        </button>

        </div>

      </form>

    </AdminLayout>

  )

}