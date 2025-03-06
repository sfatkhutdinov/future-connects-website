import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Future Connects</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              We're a modern moving company leveraging technology to provide exceptional service throughout the DMV area.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder - replace with actual image */}
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center text-gray-500">
              Company Story Image
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                Future Connects was founded in 2024 with a mission to transform the moving industry in the DMV area through technology and exceptional customer service.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                As a local business, we understand the unique challenges of moving in the Washington DC, Maryland, and Virginia region. Our founder saw an opportunity to create a moving service that leverages technology to provide transparency, efficiency, and reliability.
              </p>
              <p className="text-lg text-gray-700">
                Today, Future Connects is growing to become the most trusted moving partner in the DMV area, serving both residential and commercial clients with a focus on innovation and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              At Future Connects, we're guided by a set of core principles that shape everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 text-blue-800 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-700">
                To revolutionize the moving experience by combining cutting-edge technology with exceptional customer service, making relocation seamless and stress-free for our clients.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 text-blue-800 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-gray-700">
                To become the most trusted and innovative moving company in the DMV area, known for reliability, transparency, and a customer-first approach.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 text-blue-800 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Values</h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Customer satisfaction above all else</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Innovation and continuous improvement</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Integrity and transparency</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Respect for client property</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Future Connects</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We stand out from traditional moving companies by leveraging technology to provide a superior experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tech-Enabled Service */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg flex">
              <div className="mr-4">
                <div className="h-10 w-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tech-Enabled Service</h3>
                <p className="text-gray-700">
                  Our digital platform provides real-time tracking, automated estimates, and convenient scheduling to streamline your moving experience.
                </p>
              </div>
            </div>

            {/* Transparent Pricing */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg flex">
              <div className="mr-4">
                <div className="h-10 w-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Transparent Pricing</h3>
                <p className="text-gray-700">
                  No hidden fees or surprises. Our automated estimation system provides clear, accurate pricing based on your specific moving needs.
                </p>
              </div>
            </div>

            {/* Experienced Team */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg flex">
              <div className="mr-4">
                <div className="h-10 w-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Experienced Team</h3>
                <p className="text-gray-700">
                  Our professional movers are trained to handle your belongings with care and expertise, ensuring a smooth and damage-free move.
                </p>
              </div>
            </div>

            {/* Local Expertise */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg flex">
              <div className="mr-4">
                <div className="h-10 w-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">DMV Area Expertise</h3>
                <p className="text-gray-700">
                  As a local company, we understand the unique challenges of moving in the DC, Maryland, and Virginia region, from urban apartments to suburban homes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Placeholder) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Meet the people behind Future Connects who are dedicated to revolutionizing your moving experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              {/* Placeholder for team member photo */}
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Photo</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Founder & CEO</h3>
                <p className="text-gray-600 mb-4">Leading our vision to transform moving services in the DMV area.</p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              {/* Placeholder for team member photo */}
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Photo</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Operations Manager</h3>
                <p className="text-gray-600 mb-4">Ensuring smooth and efficient moving operations for all clients.</p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              {/* Placeholder for team member photo */}
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Photo</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Customer Success</h3>
                <p className="text-gray-600 mb-4">Dedicated to providing exceptional customer experiences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Service?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Get started with a free estimate for your upcoming move in the DMV area.
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