import { HeartHandshake, Users, Home, GraduationCap } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

export default function CommunitySupport() {
  const { t } = useLanguage()

  // Map icons to components
  const iconMap = {
    HeartHandshake: HeartHandshake,
    Users: Users,
    Home: Home,
    GraduationCap: GraduationCap
  }

  const programs = t.communitySupport.programs

  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.communitySupport.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.communitySupport.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-20">

        {/* INTRO */}
        <section className="max-w-4xl mx-auto text-center">
          <p className="text-charcoal text-lg leading-relaxed">
            {t.communitySupport.intro}
          </p>
        </section>

        {/* SUPPORT PROGRAMS */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {programs.map((program, index) => {
              const IconComponent = iconMap[program.icon]
              return (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-3xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition duration-300"
                >
                  <IconComponent className="mx-auto text-secondary mb-6" size={42} />
                  <h3 className="font-heading text-xl text-primary mb-4">
                    {program.title}
                  </h3>
                  <p className="text-charcoal leading-relaxed">
                    {program.description}
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