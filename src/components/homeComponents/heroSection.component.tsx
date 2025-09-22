import Image from "next/image";
import Link from "next/link";
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
      <Image
        src="https://res.cloudinary.com/ddznxfcap/image/upload/v1758309117/hero_y4w7ox.avif" // replace with any Unsplash hero image
        alt="E-commerce shopping"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Premium Shop
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover exceptional quality and unparalleled style
          </p>
          <Link
            href="/shop" // <-- target page
            className="bg-white cursor-pointer text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
