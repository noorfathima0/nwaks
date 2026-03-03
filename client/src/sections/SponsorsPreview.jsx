import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

export default function SponsorsPreview() {
  const { t } = useLanguage()
  
  return (
    <section className="bg-white rounded-2xl shadow-md p-8 text-center">
      <h2 className="font-heading text-2xl text-primary mb-4">
        {t.sponsorsPreview.title}
      </h2>

      <p className="text-charcoal text-base mb-8 max-w-3xl mx-auto">
        {t.sponsorsPreview.subtitle}
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          "ABC Enterprises",
          "XYZ Corporation",
          "Tech Solutions LLC"
        ].map((sponsor, index) => (
          <div
            key={index}
            className="bg-background p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-heading text-base text-primary">
              {sponsor}
            </h3>
          </div>
        ))}
      </div>

      <Link
        to="/sponsors"
        className="inline-block bg-secondary text-charcoal px-6 py-2 rounded-lg font-semibold hover:bg-support transition text-sm"
      >
        {t.sponsorsPreview.button}
      </Link>
    </section>
  )
}