export default function BookingPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Book Your Move</h1>
      <p className="mb-8">Complete the form below to schedule your upcoming move with Future Connects Movers.</p>
      
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <form className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm fw-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm fw-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm fw-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm fw-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Move Details</h2>
            
            <div>
              <label htmlFor="moveType" className="block text-sm fw-medium text-gray-700 mb-1">
                Type of Move
              </label>
              <select
                id="moveType"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Move Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="moveFromAddress" className="block text-sm fw-medium text-gray-700 mb-1">
                  Moving From
                </label>
                <input
                  type="text"
                  id="moveFromAddress"
                  placeholder="Full address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="moveToAddress" className="block text-sm fw-medium text-gray-700 mb-1">
                  Moving To
                </label>
                <input
                  type="text"
                  id="moveToAddress"
                  placeholder="Full address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="moveDate" className="block text-sm fw-medium text-gray-700 mb-1">
                  Preferred Move Date
                </label>
                <input
                  type="date"
                  id="moveDate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="moveTime" className="block text-sm fw-medium text-gray-700 mb-1">
                  Preferred Start Time
                </label>
                <select
                  id="moveTime"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Time</option>
                  <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                  <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="propertySize" className="block text-sm fw-medium text-gray-700 mb-1">
                Property Size
              </label>
              <select
                id="propertySize"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Size</option>
                <option value="studio">Studio/1 Bedroom</option>
                <option value="2br">2 Bedrooms</option>
                <option value="3br">3 Bedrooms</option>
                <option value="4br">4+ Bedrooms</option>
                <option value="office-small">Small Office (up to 1,000 sq ft)</option>
                <option value="office-medium">Medium Office (1,000-3,000 sq ft)</option>
                <option value="office-large">Large Office (3,000+ sq ft)</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Additional Services</h2>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="packingService"
                  className="mt-1 mr-2"
                />
                <label htmlFor="packingService" className="text-sm text-gray-700">
                  Packing Services - Our professionals will pack your belongings safely
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="unpackingService"
                  className="mt-1 mr-2"
                />
                <label htmlFor="unpackingService" className="text-sm text-gray-700">
                  Unpacking Services - We'll help unpack and organize at your new location
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="storageService"
                  className="mt-1 mr-2"
                />
                <label htmlFor="storageService" className="text-sm text-gray-700">
                  Storage Services - Secure storage options if needed between moves
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="specialItems"
                  className="mt-1 mr-2"
                />
                <label htmlFor="specialItems" className="text-sm text-gray-700">
                  Special Items Handling - For valuable, fragile, or oversized items
                </label>
              </div>
            </div>
            
            <div>
              <label htmlFor="additionalInfo" className="block text-sm fw-medium text-gray-700 mb-1">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please share any other details that would help us prepare for your move..."
              ></textarea>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Book Your Move
            </button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              A team member will contact you within 24 hours to confirm your booking details.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 