import { de } from "zod/v4/locales"
import Image from "next/image"
const StoryAbout = () => {
return (
     <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/ddznxfcap/image/upload/v1758312128/company_il9ylu.avif"
                  alt="Company Image"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                From Vision to Reality
              </h3>
              <p className="text-gray-600 mb-4">
                Founded in 2018, PremiumShop began as a simple idea: to create a
                destination where quality meets convenience, and every shopping
                experience feels exceptional. What started as a small boutique
                operation has grown into a trusted name in premium e-commerce.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey has been guided by a relentless pursuit of
                excellence. We&#39;ve carefully curated collections from around the
                world, built relationships with artisans and brands who share
                our values, and developed technology that makes luxury shopping
                accessible and enjoyable.
              </p>
              <p className="text-gray-600">
                Today, we serve customers across the globe, but our commitment
                remains the same: to deliver extraordinary products with
                impeccable service, making every purchase a memorable
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>
)
}

export default StoryAbout;
