import Link from "next/link";

const NoOrders = () =>{
    return (
        <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h1>
            <p className="text-gray-600 mb-8">
              You haven&#39;t placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link
              href="/shop"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 inline-flex items-center"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>

        </>
    )
}

export default NoOrders;