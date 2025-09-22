"use client";

import Link from "next/link";
import Image from "next/image";
import CategoriesCard from "@/components/homeComponents/Categories.component";
import PremiumSection from "@/components/homeComponents/PremiumSection.component";
import Footer from "@/components/Footer";
import HeroSection from "@/components/homeComponents/heroSection.component";
import CategoriesSection from "@/components/homeComponents/CategoriesSection.component";

export default function HomePage() {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      image:
        "https://res.cloudinary.com/ddznxfcap/image/upload/v1758307397/electronics_r9znnd.avif",
      description: "Latest gadgets and tech innovations",
    },
    {
      id: 2,
      name: "Fashion",
      description: "Trendy clothing and accessories",
      image:
        "https://res.cloudinary.com/ddznxfcap/image/upload/v1758307397/fashion_cv498o.avif",
    },
    {
      id: 3,
      name: "Home & Living",
      image:
        "https://res.cloudinary.com/ddznxfcap/image/upload/v1758307397/home_living_dpzer1.avif",

      description: "Furniture and home decor",
    },
    {
      id: 4,
      name: "Beauty",
      image:
        "https://res.cloudinary.com/ddznxfcap/image/upload/v1758308769/beauty_and_skin_care_siwqb9.avif",
      description: "Premium skincare and cosmetics",
    },
    {
      id: 5,
      name: "Sports",
      image:
        "https://res.cloudinary.com/ddznxfcap/image/upload/v1758309542/sports_ecza1l.avif",
      description: "Fitness equipment and gear",
    },
    {
      id: 6,
      name: "Books",
      image:
        "https://res.cloudinary.com/ddznxfcap/image/upload/v1758309609/books_h2kq2c.avif",
      description: "Best sellers and new releases",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CategoriesSection categories = {categories}/>

      <PremiumSection />
      <Footer />
    </div>
  );
}
