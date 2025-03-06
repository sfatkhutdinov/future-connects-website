import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>
      <p className="mb-6">Future Connects Movers offers a variety of moving services to meet your needs.</p>
      
      <div className="space-y-10">
        <section id="residential" className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Residential Moving</h2>
          <p className="mb-4">
            Our residential moving services are designed to make your home relocation as stress-free as possible. 
            We handle everything from packing and loading to transportation and unpacking.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Local and long-distance moving</li>
            <li>Careful handling of fragile items</li>
            <li>Furniture disassembly and reassembly</li>
            <li>Flexible scheduling options</li>
          </ul>
        </section>
        
        <section id="commercial" className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Commercial Moving</h2>
          <p className="mb-4">
            Our commercial moving services help businesses relocate with minimal downtime and disruption.
            We understand that time is money, so we work efficiently to get your business up and running quickly.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Office and retail relocations</li>
            <li>IT equipment handling</li>
            <li>Furniture installation</li>
            <li>After-hours moving options</li>
          </ul>
        </section>
        
        <section id="packing" className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Packing Services</h2>
          <p className="mb-4">
            Our professional packing services ensure your belongings are properly protected during the move.
            We use high-quality materials and proven techniques to prevent damage.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Full and partial packing options</li>
            <li>Custom crating for valuable items</li>
            <li>Eco-friendly packing materials</li>
            <li>Unpacking and debris removal</li>
          </ul>
        </section>
        
        <section id="storage" className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Storage Solutions</h2>
          <p className="mb-4">
            Our secure storage facilities provide short and long-term options for your belongings.
            Whether you need temporary storage during a move or ongoing storage, we have solutions.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Climate-controlled units</li>
            <li>24/7 security monitoring</li>
            <li>Flexible rental periods</li>
            <li>Easy access to your items</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 