export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
      >
        Go Back to Home
      </a>
    </div>
  );
}
