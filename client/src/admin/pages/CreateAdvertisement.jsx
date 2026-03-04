import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

export default function CreateAdvertisement() {

  const navigate = useNavigate()

  const [titleEn, setTitleEn] = useState("")
  const [titleKn, setTitleKn] = useState("")
  const [descriptionEn, setDescriptionEn] = useState("")
  const [descriptionKn, setDescriptionKn] = useState("")
  const [link, setLink] = useState("")
  const [image, setImage] = useState(null)
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem("token")

  const createAdvertisement = async (e) => {

    e.preventDefault()
    setLoading(true)

    try {

      let imageUrl = ""

      if(image){

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

      await axios.post(
        "http://localhost:5000/api/advertisements",
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
      alert("Error creating advertisement: " + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }

  }

  return (

    <AdminLayout>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Create Advertisement
        </h2>
      </div>

      <form
        onSubmit={createAdvertisement}
        className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow"
      >

        {/* Title - English */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title (English) <span className="text-red-500">*</span>
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
            Title (Kannada) <span className="text-red-500">*</span>
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
            Description (English) <span className="text-red-500">*</span>
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
            Description (Kannada) <span className="text-red-500">*</span>
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

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Advertisement Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 p-2 w-full rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-white hover:file:bg-primary/90"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Recommended size: 1200x630px or square format
          </p>
        </div>

        {/* Preview if image selected */}
        {image && (
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-primary text-white px-6 py-3 rounded font-semibold transition ${
            loading 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-primary/90"
          }`}
        >
          {loading ? "Creating..." : "Create Advertisement"}
        </button>

      </form>

    </AdminLayout>

  )

}