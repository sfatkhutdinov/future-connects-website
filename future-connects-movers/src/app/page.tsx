import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Future Connects Movers</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Your trusted partner for residential and commercial moving services. We make moving simple, 
          affordable, and stress-free.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/estimate" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Get a Free Estimate
          </Link>
          <Link href="/contact" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300">
            Contact Us
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
              Residential Moving Image
            </div>
            <h3 className="text-xl font-semibold mb-2">Residential Moving</h3>
            <p className="mb-4">
              Whether you're moving to a new apartment or house, our residential moving services ensure 
              your belongings arrive safely at your new home.
            </p>
            <Link href="/services#residential" className="text-blue-600 fw-medium hover:underline">
              Learn more →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
              Commercial Moving Image
            </div>
            <h3 className="text-xl font-semibold mb-2">Commercial Moving</h3>
            <p className="mb-4">
              Minimize downtime with our efficient commercial moving services. We help businesses 
              relocate with minimal disruption to operations.
            </p>
            <Link href="/services#commercial" className="text-blue-600 fw-medium hover:underline">
              Learn more →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
              Packing Services Image
            </div>
            <h3 className="text-xl font-semibold mb-2">Packing Services</h3>
            <p className="mb-4">
              Let our professionals handle the packing. We use quality materials and techniques to 
              ensure your items are protected during transport.
            </p>
            <Link href="/services#packing" className="text-blue-600 fw-medium hover:underline">
              Learn more →
            </Link>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Experienced Professionals</h3>
            <p>
              Our team consists of trained moving specialists with years of experience in handling 
              all types of moves, from small apartments to large commercial relocations.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Affordable Rates</h3>
            <p>
              We offer competitive pricing without compromising on quality. Get transparent quotes 
              with no hidden fees or surprises.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Reliable Service</h3>
            <p>
              Count on us to arrive on time and complete your move efficiently. We value your time 
              and work hard to meet our commitments.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Customer Satisfaction</h3>
            <p>
              Your satisfaction is our priority. We go the extra mile to ensure your moving experience 
              exceeds your expectations.
            </p>
          </div>
        </div>
      </section>
      
      <section className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-6">
          Contact us today to discuss your moving needs or get a free estimate.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/estimate" className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100">
            Get a Free Estimate
          </Link>
          <Link href="/contact" className="border border-white text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
