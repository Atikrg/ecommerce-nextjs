import Image from "next/image";
import { Suspense } from "react";
import { CategoriesCardProps } from "@/types"
const CategoriesCard = ({ categories }: CategoriesCardProps) => {
  return (
    <Suspense fallback={<div>Loading Categories...</div>}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-80">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-20 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm opacity-90">{category.description}</p>
                <button className="mt-4 bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300">
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
};

export default CategoriesCard;
