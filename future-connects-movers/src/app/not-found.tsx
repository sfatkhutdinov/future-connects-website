import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-8">
        <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M12 14a1 1 0 110-2 1 1 0 010 2m-7 3a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-md">
        We couldn&apos;t find the page you were looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-3 rounded-md fw-medium"
        >
          Go Back Home
        </Link>
        <Link 
          href="/contact" 
          className="border border-blue-700 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md fw-medium"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
} 