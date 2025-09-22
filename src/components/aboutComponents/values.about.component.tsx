import { ValueProps } from "@/types";

const ValuesAboutSection = ({ values }: ValueProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do and define who we are as a
            company.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesAboutSection;
