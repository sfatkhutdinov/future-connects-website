import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">About Future Connects Movers</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="mb-4">
          Founded in 2010, Future Connects Movers began with a simple mission: to provide reliable, 
          efficient, and stress-free moving services for families and businesses. What started as a 
          small local operation has grown into a trusted moving company serving the entire region.
        </p>
        <p>
          Our journey has been defined by a commitment to exceptional service, attention to detail, 
          and a deep understanding of how important your belongings are to you. We've built our 
          reputation one satisfied customer at a time.
        </p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p>
          At Future Connects Movers, our mission is to transform the moving experience from a 
          stressful event into a smooth transition. We accomplish this through transparent pricing, 
          professional service, and a customer-centered approach to every move we handle.
        </p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="mb-4">
          Our team consists of trained professionals who understand that moving is about more than 
          transporting items—it's about relocating lives and memories. Each team member undergoes 
          comprehensive training in proper handling techniques, customer service, and efficiency.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
              Team Member Photo
            </div>
            <h3 className="text-lg fw-medium mb-1">John Smith</h3>
            <p className="text-gray-600 mb-2">Founder & CEO</p>
            <p className="text-sm">
              With over 15 years in the moving industry, John founded Future Connects with a vision for better service.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
              Team Member Photo
            </div>
            <h3 className="text-lg fw-medium mb-1">Sarah Johnson</h3>
            <p className="text-gray-600 mb-2">Operations Manager</p>
            <p className="text-sm">
              Sarah ensures that every move is planned and executed with precision and care.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
              Team Member Photo
            </div>
            <h3 className="text-lg fw-medium mb-1">Mike Rodriguez</h3>
            <p className="text-gray-600 mb-2">Lead Moving Specialist</p>
            <p className="text-sm">
              Mike trains our moving teams and develops protocols for handling specialty items.
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="space-y-4">
          <li className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg fw-medium mb-2">Integrity</h3>
            <p>
              We believe in honest communication, transparent pricing, and doing what we say we'll do.
            </p>
          </li>
          <li className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg fw-medium mb-2">Excellence</h3>
            <p>
              We strive for exceptional service in every aspect of our business, from customer interactions to the final delivery.
            </p>
          </li>
          <li className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg fw-medium mb-2">Care</h3>
            <p>
              We handle your belongings as if they were our own, taking precautions to ensure safe transport.
            </p>
          </li>
          <li className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg fw-medium mb-2">Innovation</h3>
            <p>
              We continually improve our methods and technology to provide better, more efficient moving services.
            </p>
          </li>
        </ul>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Community Involvement</h2>
        <p className="mb-4">
          Future Connects Movers is proud to be an active member of the community. We regularly 
          participate in local events and support charitable causes through donations and 
          volunteer work.
        </p>
        <p>
          Our community initiatives include providing moving services to families in need, 
          sponsoring local sports teams, and participating in environmental clean-up efforts.
        </p>
      </section>
    </div>
  );
} 