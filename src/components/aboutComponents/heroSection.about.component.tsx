const HeroSectionAbout = () => {
  return (
    <div
      className="relative bg-gray-900 text-white"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/ddznxfcap/image/upload/v1758313422/about-hero-bg_bk8bsu.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About PremiumShop
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          Redefining luxury shopping with unparalleled quality, exceptional
          service, and innovative experiences.
        </p>
      </div>
    </div>
  );
};

export default HeroSectionAbout;

