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

  useEffect(() => {

    const fetchAdvertisement = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/ads/${id}`
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
        `http://localhost:5000/api/ads/${id}`,
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

      navigate("/admin/ads")

    } catch (error) {

      console.error(error)
      alert("Error updating advertisement: " + (error.response?.data?.message || error.message))

    }

  }

  const deleteAdvertisement = async () => {

    if (!window.confirm("Delete this advertisement?")) return

    try {

      await axios.delete(
        `http://localhost:5000/api/ads/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate("/admin/ads")

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

        {/* Title - English */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title (English)
          </label>
          <input
            placeholder="Enter advertisement title in English"
            className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            required
          />
        </div>

        {/* Title - Kannada */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title (Kannada)
          </label>
          <input
            placeholder="ಕನ್ನಡದಲ್ಲಿ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ"
            className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            value={titleKn}
            onChange={(e) => setTitleKn(e.target.value)}
            required
          />
        </div>

        {/* Description - English */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (English)
          </label>
          <textarea
            placeholder="Enter advertisement description in English"
            className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            rows="3"
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            required
          />
        </div>

        {/* Description - Kannada */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Kannada)
          </label>
          <textarea
            placeholder="ಕನ್ನಡದಲ್ಲಿ ವಿವರಣೆಯನ್ನು ನಮೂದಿಸಿ"
            className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            rows="3"
            value={descriptionKn}
            onChange={(e) => setDescriptionKn(e.target.value)}
            required
          />
        </div>

        {/* Link (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link URL (Optional)
          </label>
          <input
            placeholder="https://example.com"
            className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Where users will be redirected when they click the advertisement
          </p>
        </div>

        {/* Current Image Preview */}
        {currentImage && !image && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Image
            </label>
            <img
              src={currentImage}
              alt="Current advertisement"
              className="h-32 w-auto object-cover rounded border"
            />
          </div>
        )}

        {/* New Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentImage ? "Change Image (Optional)" : "Advertisement Image"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 p-2 w-full rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-white hover:file:bg-primary/90"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty to keep current image
          </p>
        </div>

        {/* Preview if new image selected */}
        {image && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Image Preview
            </label>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-32 w-auto object-cover rounded border"
            />
          </div>
        )}

        {/* Active Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="active"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
            Active (Advertisement will be visible on the site)
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition"
          >
            Update Advertisement
          </button>

          <button
            type="button"
            onClick={deleteAdvertisement}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Delete Advertisement
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/ads")}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>

      </form>

    </AdminLayout>

  )

}