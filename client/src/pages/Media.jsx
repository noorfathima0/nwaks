import { Image, Video, FileText } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

export default function Media() {
  const { t } = useLanguage()

  // Map icons to components
  const iconMap = {
    Image: Image,
    Video: Video,
    FileText: FileText
  }

  const sections = t.media.sections

  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.media.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.media.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24">

        <div className="grid md:grid-cols-3 gap-10">
          {sections.map((section, index) => {
            const IconComponent = iconMap[section.icon]
            return (
              <div 
                key={index}
                className="bg-white rounded-3xl shadow-md p-10 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <IconComponent className="mx-auto text-secondary mb-6" size={42} />

                <h2 className="font-heading text-2xl text-primary mb-4">
                  {section.title}
                </h2>

                <p className="text-charcoal mb-6">
                  {section.description}
                </p>

                <button className="bg-secondary text-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-support transition">
                  {section.button}
                </button>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}