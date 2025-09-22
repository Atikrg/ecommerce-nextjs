"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ca } from "zod/v4/locales";

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      description: "Cutting-edge gadgets and tech innovations",
      image:"https://res.cloudinary.com/ddznxfcap/image/upload/v1758307397/electronics_r9znnd.avif",
      productCount: 156,
      featured: true,
      subcategories: [
        "Smartphones",
        "Laptops",
        "Wearables",
        "Audio",
        "Cameras",
      ],
    },
    {
      id: "fashion",
      name: "Fashion",
      description: "Trendy clothing and accessories for every style",
      image:"https://res.cloudinary.com/ddznxfcap/image/upload/v1758307397/fashion_cv498o.avif",
      productCount: 234,
      featured: true,
      subcategories: ["Men", "Women", "Accessories", "Footwear", "Jewelry"],
    },
    {
      id: "home",
      name: "Home & Living",
      description: "Transform your space with premium home essentials",
      image: "https://res.cloudinary.com/ddznxfcap/image/upload/v1758307397/home_living_dpzer1.avif",
      productCount: 189,
      featured: true,
      subcategories: ["Furniture", "Decor", "Kitchen", "Bedding", "Lighting"],
    },
    {
      id: "beauty",
      name: "Beauty",
      description: "Premium skincare and cosmetics for your routine",
      image: "https://res.cloudinary.com/ddznxfcap/image/upload/v1758308769/beauty_and_skin_care_siwqb9.avif",
      productCount: 127,
      featured: false,
      subcategories: [
        "Skincare",
        "Makeup",
        "Haircare",
        "Fragrance",
        "Body Care",
      ],
    },
    {
      id: "sports",
      name: "Sports & Fitness",
      description: "Gear up for your active lifestyle",
      image: "https://res.cloudinary.com/ddznxfcap/image/upload/v1758309542/sports_ecza1l.avif",
      productCount: 98,
      featured: false,
      subcategories: ["Fitness", "Outdoor", "Team Sports", "Yoga", "Running"],
    },
    {
      id: "books",
      name: "Books & Media",
      description: "Expand your knowledge and entertainment",
      image: "https://res.cloudinary.com/ddznxfcap/image/upload/v1758309609/books_h2kq2c.avif",
      productCount: 312,
      featured: false,
      subcategories: [
        "Fiction",
        "Non-Fiction",
        "Academic",
        "Children",
        "Audio Books",
      ],
    },
    {
      id: "toys",
      name: "Toys & Games",
      description: "Fun and educational toys for all ages",
      image: "https://res.cloudinary.com/ddznxfcap/image/upload/v1758310115/toys_pxupkl.avif",

      productCount: 87,
      featured: false,
      subcategories: [
        "Educational",
        "Outdoor",
        "Board Games",
        "Puzzles",
        "Collectibles",
      ],
    },
    {
      id: "food",
      name: "Food & Beverages",
      description: "Gourmet treats and premium beverages",
      image: "https://res.cloudinary.com/ddznxfcap/image/upload/v1758309741/food1_uowtl4.avif",

      productCount: 143,
      featured: false,
      subcategories: [
        "Gourmet",
        "Organic",
        "Beverages",
        "Snacks",
        "International",
      ],
    },
  ];

  const featuredCategories = categories.filter((cat) => cat.featured);
  const regularCategories = categories.filter((cat) => !cat.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="mt-2 text-gray-600">
            Browse our wide range of premium product categories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Categories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Featured Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular collections curated for exceptional
              quality and style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category) => (
              <div
                key={category.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/shop?category=${category.id}`}>
                  <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-gray-600 text-lg font-medium">
                        {category.name}
                      </div>
                    </div>
                    <Image
                      src={category.image} // e.g. "categories/electronics.jpg"
                      alt={category.name}
                      fill
                      className="object-cover object-center absolute inset-0 bg-opacity-20 group-hover:bg-opacity-10 transition-opacity duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {category.productCount} products
                      </span>
                      <div className="flex items-center text-indigo-600 group-hover:text-indigo-700 transition-colors duration-200">
                        <span className="text-sm font-medium">Explore</span>
                        <svg
                          className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* All Categories */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              All Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our complete range of product categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regularCategories.map((category) => (
              <div
                key={category.id}
                className="group bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )
                }
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="text-gray-600 text-sm font-medium">
                      {category.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                    <span>{category.productCount} products</span>
                  </div>

                  {/* Subcategories Dropdown */}
                  {selectedCategory === category.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Subcategories
                      </h4>
                      <div className="space-y-2">
                        {category.subcategories.map((subcategory, index) => (
                          <Link
                            key={index}
                            href={`/shop?category=${
                              category.id
                            }&subcategory=${subcategory.toLowerCase()}`}
                            className="block text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                          >
                            {subcategory}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors duration-200">
                    {selectedCategory === category.id
                      ? "Hide Details"
                      : "View Details"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Our product range is constantly expanding. Contact us if you're
            looking for something specific!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/shop"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-200"
            >
              Browse All Products
            </Link>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                1,200+
              </div>
              <div className="text-gray-600">Premium Products</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                8
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                50+
              </div>
              <div className="text-gray-600">Subcategories</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
