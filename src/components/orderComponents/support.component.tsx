import Link from "next/link";
const Support = () => {
  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Need help with your orders?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Contact Support</h3>
          <p className="text-gray-600 text-sm mb-2">
            Our team is here to help 24/7
          </p>
          <a
            href="mailto:support@premiumshop.com"
            className="text-indigo-600 text-sm hover:text-indigo-700"
          >
            support@premiumshop.com
          </a>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Return Policy</h3>
          <p className="text-gray-600 text-sm mb-2">
            30-day return policy on all items
          </p>
          <Link
            href="/returns"
            className="text-indigo-600 text-sm hover:text-indigo-700"
          >
            View return policy →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Support;
