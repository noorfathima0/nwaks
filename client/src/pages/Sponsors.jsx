import { Crown, Star, Medal } from "lucide-react"
import { Link } from "react-router-dom"

export default function Sponsors() {
  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            Our Sponsors
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            Thank you to our generous sponsors who make our events possible
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-24">

        {/* PLATINUM SPONSORS */}
        <section>
          <div className="text-center mb-12">
            <Crown className="mx-auto text-secondary mb-4" size={40} />
            <h2 className="font-heading text-3xl text-primary">
              Platinum Sponsors
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {["ABC Enterprises", "XYZ Corporation"].map((sponsor, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-3xl shadow-lg text-center hover:shadow-xl transition"
              >
                <h3 className="font-heading text-2xl text-accent">
                  {sponsor}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* GOLD SPONSORS */}
        <section>
          <div className="text-center mb-12">
            <Star className="mx-auto text-secondary mb-4" size={40} />
            <h2 className="font-heading text-3xl text-primary">
              Gold Sponsors
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {["Tech Solutions LLC", "Global Services Inc"].map((sponsor, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition"
              >
                <h3 className="font-heading text-xl text-primary">
                  {sponsor}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* SILVER SPONSORS */}
        <section>
          <div className="text-center mb-12">
            <Medal className="mx-auto text-secondary mb-4" size={40} />
            <h2 className="font-heading text-3xl text-primary">
              Silver Sponsors
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Local Business Co",
              "Community Store",
              "Family Restaurant",
            ].map((sponsor, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition"
              >
                <h3 className="font-heading text-lg text-primary">
                  {sponsor}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* BECOME A SPONSOR CTA */}
        <section className="bg-white rounded-3xl shadow-lg p-12 text-center max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl text-primary mb-6">
            Become a Sponsor
          </h2>

          <p className="text-charcoal text-lg leading-relaxed mb-8">
            Support our community events and gain visibility among our members.
            Contact us to learn about sponsorship opportunities.
          </p>

          <Link
            to="/contact"
            className="inline-block bg-secondary text-charcoal px-8 py-3 rounded-lg font-semibold hover:bg-support transition"
          >
            Contact Us
          </Link>
        </section>

      </div>
    </div>
  )
}