"use client";

import Image from "next/image";
import HeroSectionAbout from "@/components/aboutComponents/heroSection.about.component";
import ValuesAboutSection from "@/components/aboutComponents/values.about.component";
import StoryAbout from "@/components/aboutComponents/story.about.component";
export default function AboutPage() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image:
        "https://res.cloudinary.com/ddznxfcap/image/upload/v1758312991/avatar2_e2clor.avif",
      bio: "Former retail executive with 15+ years of experience in luxury goods and e-commerce.",
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image:
        "https://res.cloudinary.com/ddznxfcap/image/upload/v1758312992/avatar3_dcelxu.avif",
      bio: "Tech innovator with expertise in building scalable e-commerce platforms and AI-driven solutions.",
    },
    {
      name: "Emily Rodriguez",
      role: "Creative Director",
      image:
        "https://res.cloudinary.com/ddznxfcap/image/upload/v1758312993/avatar4_c84je7.avif",
      bio: "Award-winning designer with a passion for creating exceptional brand experiences.",
    },
    {
      name: "David Kim",
      role: "Head of Operations",
      image:
        "https://res.cloudinary.com/ddznxfcap/image/upload/v1758312990/avatar1_voxw7w.avif",
      bio: "Supply chain expert dedicated to ensuring seamless delivery and customer satisfaction.",
    },
  ];

  const values = [
    {
      title: "Quality First",
      description:
        "We meticulously curate every product to ensure it meets our premium standards.",
      icon: (
        <svg
          className="w-8 h-8 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    {
      title: "Customer Obsessed",
      description:
        "Your satisfaction is our top priority. We go above and beyond to exceed expectations.",
      icon: (
        <svg
          className="w-8 h-8 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      title: "Innovation Driven",
      description:
        "We continuously evolve to bring you the latest trends and cutting-edge shopping experiences.",
      icon: (
        <svg
          className="w-8 h-8 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Sustainability",
      description:
        "Committed to ethical sourcing and environmentally responsible business practices.",
      icon: (
        <svg
          className="w-8 h-8 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 14v6m-3-3h6M6 10h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-4a2 2 0 11-4 0 2 2 0 014 0zM6 20a2 2 0 100-4 2 2 0 000 4z"
          />
        </svg>
      ),
    },
  ];

  const milestones = [
    {
      year: "2018",
      event: "Founded with a vision to revolutionize online shopping",
    },
    { year: "2019", event: "Launched our first premium product collection" },
    { year: "2020", event: "Reached 10,000 satisfied customers worldwide" },
    { year: "2021", event: "Expanded to international markets" },
    {
      year: "2022",
      event: "Introduced AI-powered personal shopping assistant",
    },
    { year: "2023", event: "Achieved carbon-neutral operations" },
    {
      year: "2024",
      event: "Celebrated 1 million products delivered with excellence",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSectionAbout />
      <StoryAbout/>
      <ValuesAboutSection values={values}/>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to delivering exceptional
              shopping experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key milestones that mark our growth and commitment to excellence.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-indigo-200 h-full"></div>

            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-2xl font-bold text-indigo-600 mb-2">
                        {milestone.year}
                      </h3>
                      <p className="text-gray-600">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience the difference of premium shopping and become part of our
            growing family of discerning customers who value quality, service,
            and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
              Shop Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
