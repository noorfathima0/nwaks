import { useLanguage } from "../context/LanguageContext"

export default function Advertisement() {
  const { t } = useLanguage()

  return (
    <div className="sticky top-24 space-y-8">
      
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
          alt="Sponsor"
          className="w-full h-48 object-cover"
        />

        <div className="p-5">
          <h3 className="font-heading text-lg text-primary mb-2">
            {t.advertisement.sponsoredEvent.title}
          </h3>
          <p className="text-sm text-charcoal mb-4">
            {t.advertisement.sponsoredEvent.description}
          </p>
          <button className="bg-secondary text-charcoal px-4 py-2 rounded-md text-sm font-semibold hover:bg-support transition">
            {t.advertisement.sponsoredEvent.button}
          </button>
        </div>
      </div>

      <div className="bg-primary text-white p-6 rounded-2xl shadow-lg">
        <h4 className="font-heading text-lg mb-3">
          {t.advertisement.advertise.title}
        </h4>
        <p className="text-sm mb-4 text-gray-200">
          {t.advertisement.advertise.description}
        </p>
        <button className="bg-secondary text-charcoal px-4 py-2 rounded-md font-semibold hover:bg-support transition">
          {t.advertisement.advertise.button}
        </button>
      </div>

    </div>
  )
}