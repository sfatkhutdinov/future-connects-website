import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Services Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Moving Services</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Future Connects provides comprehensive moving solutions for residential and commercial clients in the DMV area.
            </p>
          </div>
        </div>
      </section>

      {/* Residential Moving */}
      <section id="residential" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder - replace with actual image */}
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center text-gray-500">
              Residential Moving Image
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Residential Moving</h2>
              <p className="text-lg text-gray-700 mb-6">
                Whether you're moving to a new apartment, house, or condominium, our residential moving services are designed to make your transition seamless and stress-free.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Careful handling of all household items</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Furniture disassembly and reassembly</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Specialized handling for delicate items</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Local and long-distance moving within the DMV area</span>
                </li>
              </ul>
              <Link 
                href="/estimate?type=residential" 
                className="bg-blue-800 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium inline-block"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Moving */}
      <section id="commercial" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Commercial Moving</h2>
              <p className="text-lg text-gray-700 mb-6">
                Relocating your business requires minimal downtime and maximum efficiency. Our commercial moving services ensure your office or business relocates smoothly.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Office furniture and equipment relocation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>IT equipment handling and setup</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>After-hours and weekend moving to minimize business disruption</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Systematic labeling and inventory management</span>
                </li>
              </ul>
              <Link 
                href="/estimate?type=commercial" 
                className="bg-blue-800 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium inline-block"
              >
                Get a Quote
              </Link>
            </div>
            {/* Image placeholder - replace with actual image */}
            <div className="order-1 md:order-2 bg-gray-200 h-80 rounded-lg flex items-center justify-center text-gray-500">
              Commercial Moving Image
            </div>
          </div>
        </div>
      </section>

      {/* Packing Services */}
      <section id="packing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder - replace with actual image */}
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center text-gray-500">
              Packing Services Image
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Packing Services</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our professional packing services save you time and ensure your belongings are properly protected during the move.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Full packing and unpacking services</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>High-quality packing materials</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Special handling for fragile or valuable items</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Organized labeling system for easy unpacking</span>
                </li>
              </ul>
              <Link 
                href="/estimate" 
                className="bg-blue-800 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium inline-block"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Storage Solutions */}
      <section id="storage" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Storage Solutions</h2>
              <p className="text-lg text-gray-700 mb-6">
                When you need temporary storage during your move, our secure storage solutions provide peace of mind.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Short-term and long-term storage options</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Climate-controlled facilities</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure and monitored storage units</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Flexible access to your belongings</span>
                </li>
              </ul>
              <Link 
                href="/contact" 
                className="bg-blue-800 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium inline-block"
              >
                Contact Us
              </Link>
            </div>
            {/* Image placeholder - replace with actual image */}
            <div className="order-1 md:order-2 bg-gray-200 h-80 rounded-lg flex items-center justify-center text-gray-500">
              Storage Solutions Image
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Seamless Moving?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contact us today to discuss your moving needs or get a detailed estimate for your upcoming move.
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