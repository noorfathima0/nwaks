/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"

export default function UpcomingEvents() {
  const { t } = useLanguage()
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const events = t.upcomingEventsSection.events.map((event, index) => ({
  ...event,
  image: [
    "https://images.unsplash.com/photo-1519677100203-a0e668c92439",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    "https://images.unsplash.com/photo-1505238680356-667803448bb6"
  ][index]
}))

  // Simplified container variants - just fade in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  // Simplified header variants
  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  // Simplified card variants - removed 3D transforms that cause lag
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1
      }
    })
  }

  // Simplified image hover - just scale
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-12 bg-background relative overflow-hidden" ref={ref}>
      {/* Simplified background pattern - no animation */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #E1AD01 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8"
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="font-heading text-3xl md:text-4xl text-primary mb-2">
            {t.upcomingEventsSection.title}
          </h2>
          
          <motion.div
            className="w-12 h-0.5 bg-secondary mx-auto mb-3"
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          />
          
          <motion.p 
            className="text-charcoal text-sm max-w-2xl mx-auto"
            variants={headerVariants}
          >
            {t.upcomingEventsSection.subtitle}
          </motion.p>
        </motion.div>

        {/* Events Grid - Simplified animations */}
        <motion.div 
          className="grid md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {events.map((event, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="bg-white rounded-xl shadow-sm overflow-hidden group"
            >
              {/* Image container */}
              <div className="overflow-hidden relative">
                <motion.img
                  src={event.image}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                
                {/* Simple overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Date badge - simple fade in */}
                <motion.div
                  className="absolute top-3 right-3 bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {index === 0 ? "MAR 2026" : index === 1 ? "NOV 2025" : "JUN 2025"}
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-heading text-xl text-accent mb-2 group-hover:text-primary transition-colors duration-200">
                  {event.title}
                </h3>

                <p className="text-charcoal text-sm leading-relaxed">
                  {event.description}
                </p>

                {/* Bottom line */}
                <div className="h-0.5 bg-secondary mt-3 w-0 group-hover:w-full transition-all duration-300 ease-out" />

                {/* "Learn More" text */}
                <p className="text-secondary text-xs font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {t.upcomingEventsSection.learnMore}
                </p>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-secondary" />
              </div>
              
              <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-secondary" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Events button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <button
            className="bg-secondary/10 text-secondary px-6 py-2 rounded-full text-sm font-semibold border border-secondary/30 hover:bg-secondary/20 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {t.upcomingEventsSection.button}
          </button>
        </motion.div>

        {/* Simple floating dots - reduced animation complexity */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-secondary/30 rounded-full"
            style={{
              top: `${15 + i * 30}%`,
              right: `${5 + i * 15}%`,
              animation: `float ${4 + i}s ease-in-out infinite`
            }}
          />
        ))}

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); opacity: 0.2; }
            50% { transform: translateY(-8px); opacity: 0.4; }
          }
        `}</style>
      </div>
    </section>
  )
}