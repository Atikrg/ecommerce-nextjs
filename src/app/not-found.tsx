
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-600">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-gray-500">
        The page you are looking for doesn’t exist or has been moved.
      </p>

    </div>
  );
}
