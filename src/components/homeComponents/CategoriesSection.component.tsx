import CategoriesCard from "./Categories.component";
import { CategoriesCardProps } from "@/types";

const CategoriesSection = ({ categories }: CategoriesCardProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Premium Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of high-quality products across
            various categories
          </p>
        </div>

        <CategoriesCard categories={categories} />
      </div>
    </section>
  );
};
export default CategoriesSection;
