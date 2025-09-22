const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="text-center mb-8">
        <div className="relative inline-flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
          <div className="absolute w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <svg 
            className="absolute w-8 h-8 text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading your products...</p>
        <p className="text-sm text-gray-500">Please wait a moment</p>
      </div>


      <div className="flex flex-col items-center mt-8">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        <p className="mt-4 text-gray-600">Preparing your shopping experience</p>
      </div>
     
    </div>
  );
};

export default Loading;