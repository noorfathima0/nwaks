import { Leaf, BookOpen, HeartHandshake, Globe } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

export default function CommunityInitiatives() {
  const { t } = useLanguage()

  // Map icons to components
  const iconMap = {
    Leaf: Leaf,
    BookOpen: BookOpen,
    HeartHandshake: HeartHandshake,
    Globe: Globe
  }

  const initiatives = t.communityInitiatives.initiatives

  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.communityInitiatives.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.communityInitiatives.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-20">

        {/* INITIATIVES GRID */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {initiatives.map((initiative, index) => {
              const IconComponent = iconMap[initiative.icon]
              return (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-3xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition duration-300"
                >
                  <IconComponent className="mx-auto text-secondary mb-6" size={42} />
                  <h3 className="font-heading text-xl text-primary mb-4">
                    {initiative.title}
                  </h3>
                  <p className="text-charcoal mb-6">
                    {initiative.description}
                  </p>
                  <p className="font-heading text-2xl text-accent">
                    {initiative.metric}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

      </div>
    </div>
  )
}