import { useEffect, useState } from "react"
import { getAdvertisements } from "../api/advertisements"
import { useLanguage } from "../context/LanguageContext"

export default function Advertisement() {
  const { language } = useLanguage()
  const [ads, setAds] = useState([])

  const langKey = language === "KN" ? "kn" : "en"

  const getText = (field) => {
    if (!field) return ""
    return field[langKey] ? field[langKey] : field.en
  }

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getAdvertisements()
        const activeAds = res.data.filter(ad => ad.active === true)
        setAds(activeAds)
      } catch (error) {
        console.error(error)
      }
    }

    fetchAds()
  }, [])

  if (ads.length === 0) return null

  return (
    <div className="sticky top-24 space-y-8">
      {ads.map((ad) => (
        <a
          key={ad._id}
          href={ad.link || "#"}
          target={ad.link ? "_blank" : "_self"}
          rel={ad.link ? "noopener noreferrer" : ""}
          className="block bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition group"
        >
          <img
            src={ad.image}
            alt={getText(ad.title)}
            className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
          />

          <div className="p-5">
            <h3 className="font-heading text-lg text-primary mb-2">
              {getText(ad.title)}
            </h3>
            <p className="text-sm text-charcoal mb-4">
              {getText(ad.description)}
            </p>
            {ad.link && (
              <span className="inline-block bg-secondary text-charcoal px-4 py-2 rounded-md text-sm font-semibold hover:bg-support transition">
                Learn More
              </span>
            )}
          </div>
        </a>
      ))}
    </div>
  )
}