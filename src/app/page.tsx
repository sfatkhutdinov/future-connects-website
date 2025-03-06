import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Professional Moving Services in the DMV Area
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Future Connects provides seamless, tech-enabled moving services for residential and commercial clients throughout DC, Maryland, and Virginia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/estimate" 
                  className="bg-white text-blue-900 hover:bg-blue-100 px-6 py-3 rounded-md font-medium text-center"
                >
                  Get a Free Estimate
                </Link>
                <Link 
                  href="/services" 
                  className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium text-center"
                >
                  Our Services
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              {/* Placeholder for hero image - replace with actual image later */}
              <div className="w-full h-80 bg-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-medium">Moving Image Here</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Moving Services</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From small apartments to large offices, we provide comprehensive moving solutions tailored to your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Moving */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 text-blue-800 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Residential Moving</h3>
              <p className="text-gray-700 mb-4">
                We handle all aspects of your home move, from packing to transportation and unpacking at your new location.
              </p>
              <Link href="/services#residential" className="text-blue-800 hover:text-blue-600 font-medium">
                Learn More →
              </Link>
            </div>
            
            {/* Commercial Moving */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 text-blue-800 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Commercial Moving</h3>
              <p className="text-gray-700 mb-4">
                Minimize downtime with our efficient office and business relocation services, including IT equipment handling.
              </p>
              <Link href="/services#commercial" className="text-blue-800 hover:text-blue-600 font-medium">
                Learn More →
              </Link>
            </div>
            
            {/* Packing Services */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 text-blue-800 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Packing Services</h3>
              <p className="text-gray-700 mb-4">
                Let our professionals handle the packing with quality materials to ensure your belongings arrive safely.
              </p>
              <Link href="/services#packing" className="text-blue-800 hover:text-blue-600 font-medium">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Future Connects</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We combine technology with professional service to make your move as smooth as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tech-Enabled */}
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tech-Enabled</h3>
              <p className="text-gray-700">
                Real-time tracking and automated estimates make your move transparent and predictable.
              </p>
            </div>
            
            {/* Professional Team */}
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Team</h3>
              <p className="text-gray-700">
                Our trained and experienced staff handle your possessions with care and expertise.
              </p>
            </div>
            
            {/* Customized Service */}
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customized Service</h3>
              <p className="text-gray-700">
                Every move is unique, and we tailor our services to meet your specific requirements.
              </p>
            </div>
            
            {/* Reliable & Timely */}
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliable & Timely</h3>
              <p className="text-gray-700">
                We prioritize punctuality and follow through on our commitments to ensure your satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Move?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Get started with a free estimate, or contact us to discuss your specific moving needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/estimate" 
              className="bg-white text-blue-800 hover:bg-blue-100 px-6 py-3 rounded-md font-medium"
            >
              Get a Free Estimate
            </Link>
            <Link 
              href="/contact" 
              className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
