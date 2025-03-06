'use client';

import { useState } from 'react';

export default function EstimatePage() {
  const [formData, setFormData] = useState({
    moveType: 'residential',
    moveSize: 'studio',
    distance: '0-50',
    hasElevator: false,
    needsPacking: false,
    needsStorage: false,
    needsSpecialItems: false
  });
  
  const [showEstimate, setShowEstimate] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEstimate(true);
  };
  
  // Simple price calculation
  const calculateEstimate = () => {
    let basePrice = 0;
    
    // Base prices by move size
    switch (formData.moveSize) {
      case 'studio':
        basePrice = 400;
        break;
      case '1bed':
        basePrice = 600;
        break;
      case '2bed':
        basePrice = 800;
        break;
      case '3bed':
        basePrice = 1200;
        break;
      case '4bed':
        basePrice = 1600;
        break;
      case 'office-small':
        basePrice = 800;
        break;
      case 'office-medium':
        basePrice = 1400;
        break;
      case 'office-large':
        basePrice = 2200;
        break;
    }
    
    // Distance multiplier
    let distanceMultiplier = 1;
    switch (formData.distance) {
      case '0-50':
        distanceMultiplier = 1;
        break;
      case '51-100':
        distanceMultiplier = 1.5;
        break;
      case '101-250':
        distanceMultiplier = 2;
        break;
      case '251+':
        distanceMultiplier = 2.5;
        break;
    }
    
    // Apply distance multiplier
    basePrice *= distanceMultiplier;
    
    // Additional services
    if (formData.needsPacking) basePrice += 300;
    if (formData.needsStorage) basePrice += 200;
    if (formData.needsSpecialItems) basePrice += 250;
    if (!formData.hasElevator && ['1bed', '2bed', '3bed', '4bed'].includes(formData.moveSize)) basePrice += 100;
    
    // Commercial moves are generally more complex
    if (formData.moveType === 'commercial') {
      basePrice *= 1.2;
    }
    
    return {
      lowEstimate: Math.round(basePrice * 0.9),
      highEstimate: Math.round(basePrice * 1.1)
    };
  };
  
  const estimate = calculateEstimate();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Get a Moving Estimate</h1>
        <p className="text-gray-600 mb-8">Fill out the form below to receive an instant estimate for your move. For a detailed quote, our team will reach out to you.</p>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm fw-medium text-gray-700 mb-2" id="moveTypeLabel">
                  Type of Move
                </label>
                <select
                  name="moveType"
                  value={formData.moveType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-labelledby="moveTypeLabel"
                >
                  <option value="residential">Residential Move</option>
                  <option value="commercial">Commercial/Office Move</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm fw-medium text-gray-700 mb-2" id="moveSizeLabel">
                  Size of {formData.moveType === 'residential' ? 'Home' : 'Office'}
                </label>
                <select
                  name="moveSize"
                  value={formData.moveSize}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-labelledby="moveSizeLabel"
                >
                  {formData.moveType === 'residential' ? (
                    <>
                      <option value="studio">Studio</option>
                      <option value="1bed">1 Bedroom</option>
                      <option value="2bed">2 Bedroom</option>
                      <option value="3bed">3 Bedroom</option>
                      <option value="4bed">4+ Bedroom</option>
                    </>
                  ) : (
                    <>
                      <option value="office-small">Small Office (up to 3000 sq ft)</option>
                      <option value="office-medium">Medium Office (3000-7000 sq ft)</option>
                      <option value="office-large">Large Office (7000+ sq ft)</option>
                    </>
                  )}
                </select>
              </div>
              
              <div>
                <label className="block text-sm fw-medium text-gray-700 mb-2" id="distanceLabel">
                  Moving Distance (miles)
                </label>
                <select
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-labelledby="distanceLabel"
                >
                  <option value="0-50">Local (0-50 miles)</option>
                  <option value="51-100">Short Distance (51-100 miles)</option>
                  <option value="101-250">Medium Distance (101-250 miles)</option>
                  <option value="251+">Long Distance (251+ miles)</option>
                </select>
              </div>
              
              {formData.moveType === 'residential' && (
                <div>
                  <label className="block text-sm fw-medium text-gray-700 mb-2">
                    Building Access
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="elevator"
                      name="hasElevator"
                      checked={formData.hasElevator}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="elevator" className="ml-2 block text-sm text-gray-700">
                      My building has an elevator
                    </label>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg fw-medium mb-3">Additional Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="packing"
                    name="needsPacking"
                    checked={formData.needsPacking}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="packing" className="ml-2 block text-sm text-gray-700">
                    Packing Services
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="storage"
                    name="needsStorage"
                    checked={formData.needsStorage}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="storage" className="ml-2 block text-sm text-gray-700">
                    Storage Services
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="specialItems"
                    name="needsSpecialItems"
                    checked={formData.needsSpecialItems}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="specialItems" className="ml-2 block text-sm text-gray-700">
                    Special Items Handling
                  </label>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white fw-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Calculate Estimate
              </button>
            </div>
          </form>
        </div>
        
        {showEstimate && (
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Estimated Moving Costs</h2>
            
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-blue-800">
                ${estimate.lowEstimate} - ${estimate.highEstimate}
              </p>
              <p className="text-gray-600 mt-2">This is an estimate based on the information provided</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg mb-6">
              <h3 className="fw-medium mb-2">Estimate Includes:</h3>
              <ul className="list-disc ml-5 space-y-1 text-gray-700">
                <li>Professional movers and equipment</li>
                <li>Standard insurance coverage</li>
                <li>Moving truck and fuel</li>
                {formData.needsPacking && <li>Professional packing services</li>}
                {formData.needsStorage && <li>30 days of storage</li>}
                {formData.needsSpecialItems && <li>Special items handling</li>}
              </ul>
            </div>
            
            <div className="text-center">
              <p className="mb-4">Ready to book your move or need a more detailed quote?</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/booking"
                  className="px-6 py-3 bg-blue-600 text-white fw-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
                >
                  Book Now
                </a>
                <a
                  href="/contact"
                  className="px-6 py-3 border border-blue-600 text-blue-600 fw-medium rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
                >
                  Contact for Detailed Quote
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 