import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

export default function EditAdvertisement() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [titleEn, setTitleEn] = useState("")
  const [titleKn, setTitleKn] = useState("")
  const [descriptionEn, setDescriptionEn] = useState("")
  const [descriptionKn, setDescriptionKn] = useState("")
  const [link, setLink] = useState("")
  const [image, setImage] = useState(null)
  const [currentImage, setCurrentImage] = useState("")
  const [active, setActive] = useState(true)

  const token = localStorage.getItem("token")

  // Fetch advertisement data
  useEffect(() => {

    const fetchAdvertisement = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/advertisements/${id}`
        )

        const ad = res.data

        setTitleEn(ad.title?.en || "")
        setTitleKn(ad.title?.kn || "")
        setDescriptionEn(ad.description?.en || "")
        setDescriptionKn(ad.description?.kn || "")
        setLink(ad.link || "")
        setCurrentImage(ad.image || "")
        setActive(ad.active)

      } catch (error) {

        console.error(error)
        alert("Error fetching advertisement")

      }

    }

    fetchAdvertisement()

  }, [id])


  // Update advertisement
  const updateAdvertisement = async (e) => {

    e.preventDefault()

    try {

      let imageUrl = currentImage

      if (image) {

        const formData = new FormData()
        formData.append("image", image)

        const uploadRes = await axios.post(
          "http://localhost:5000/api/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        imageUrl = uploadRes.data.imageUrl

      }

      await axios.put(
        `http://localhost:5000/api/advertisements/${id}`,
        {
          title: {
            en: titleEn,
            kn: titleKn
          },
          description: {
            en: descriptionEn,
            kn: descriptionKn
          },
          link,
          image: imageUrl,
          active
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate("/admin/advertisements")

    } catch (error) {

      console.error(error)
      alert("Error updating advertisement")

    }

  }


  // Delete advertisement
  const deleteAdvertisement = async () => {

    if (!window.confirm("Are you sure you want to delete this advertisement?")) return

    try {

      await axios.delete(
        `http://localhost:5000/api/advertisements/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate("/admin/advertisements")

    } catch (error) {

      console.error(error)
      alert("Error deleting advertisement")

    }

  }


  return (

    <AdminLayout>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Edit Advertisement
        </h2>
      </div>

      <form
        onSubmit={updateAdvertisement}
        className="space-y-4 max-w-xl bg-white p-6 rounded-lg shadow"
      >

        {/* Title English */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title (English)
          </label>
          <input
            className="border p-2 w-full rounded"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            required
          />
        </div>

        {/* Title Kannada */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title (Kannada)
          </label>
          <input
            className="border p-2 w-full rounded"
            value={titleKn}
            onChange={(e) => setTitleKn(e.target.value)}
            required
          />
        </div>

        {/* Description English */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (English)
          </label>
          <textarea
            rows="3"
            className="border p-2 w-full rounded"
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            required
          />
        </div>

        {/* Description Kannada */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Kannada)
          </label>
          <textarea
            rows="3"
            className="border p-2 w-full rounded"
            value={descriptionKn}
            onChange={(e) => setDescriptionKn(e.target.value)}
            required
          />
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link URL (Optional)
          </label>
          <input
            className="border p-2 w-full rounded"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        {/* Current Image */}
        {currentImage && !image && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Image
            </label>
            <img
              src={currentImage}
              alt="Current advertisement"
              className="h-32 rounded border"
            />
          </div>
        )}

        {/* Upload New Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentImage ? "Change Image (Optional)" : "Upload Image"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Preview New Image */}
        {image && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Image Preview
            </label>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-32 rounded border"
            />
          </div>
        )}

        {/* Active Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          <span className="text-sm text-gray-700">
            Active (visible on website)
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
          >
            Update Advertisement
          </button>

          <button
            type="button"
            onClick={deleteAdvertisement}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/advertisements")}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>

        </div>

      </form>

    </AdminLayout>

  )

}