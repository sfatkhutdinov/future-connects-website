'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AddressAutocomplete from '@/components/ui/AddressAutocomplete';
import { MoveType, MoveSize, EstimateFormData } from '@/types';
import { calculateDistance, calculateMovingCost, generatePriceRange } from '@/lib/utils/costCalculator';
import { MOVE_SIZES, API_ENDPOINTS } from '@/lib/config';

// Step type definition
type StepType = 'move-type' | 'locations' | 'size' | 'date' | 'contact' | 'summary';

export default function EstimatePage() {
  // State for the current step
  const [currentStep, setCurrentStep] = useState<StepType>('move-type');
  
  // Form data state with proper typing
  const [formData, setFormData] = useState<EstimateFormData>({
    moveType: 'residential' as MoveType,
    fromAddress: '',
    toAddress: '',
    moveSize: 'medium' as MoveSize,
    moveDate: '',
    hasSpecialItems: false,
    needsPacking: false,
    fullName: '',
    email: '',
    phone: '',
  });

  // State for cost estimate
  const [estimatedCost, setEstimatedCost] = useState({
    min: 0,
    max: 0,
    distance: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Calculate distance and update estimate when addresses change
  useEffect(() => {
    console.log('Coordinates change detected:', formData.fromCoordinates, formData.toCoordinates);
    
    if (formData.fromCoordinates && formData.toCoordinates) {
      try {
        // Force the calculation even if other form fields aren't set yet
        const distance = calculateDistance(
          formData.fromCoordinates.lat,
          formData.fromCoordinates.lng,
          formData.toCoordinates.lat,
          formData.toCoordinates.lng
        );
        
        console.log('Distance calculated:', distance, 'miles');
        
        let costEstimate = {
          min: 0,
          max: 0,
          distance: Math.round(distance)
        };
        
        // If we have complete data, calculate cost estimate
        if (formData.moveSize && formData.moveDate) {
          const moveDate = new Date(formData.moveDate);
          
          if (formData.moveTime) {
            const [hours, minutes] = formData.moveTime.split(':').map(Number);
            moveDate.setHours(hours, minutes);
          }
          
          const costResult = calculateMovingCost({
            moveType: formData.moveType,
            moveSize: formData.moveSize,
            distance,
            moveDate,
            hasSpecialItems: formData.hasSpecialItems,
            needsPacking: formData.needsPacking,
          });
          
          const priceRange = generatePriceRange(costResult.totalCost);
          
          costEstimate = {
            min: priceRange.min,
            max: priceRange.max,
            distance: Math.round(distance)
          };
        }
        
        // Update the estimated cost with at least the distance info
        setEstimatedCost(costEstimate);
      } catch (error) {
        console.error('Error during distance calculation:', error);
      }
    }
  }, [
    formData.fromCoordinates, 
    formData.toCoordinates, 
    formData.moveSize, 
    formData.moveType, 
    formData.moveDate,
    formData.moveTime,
    formData.hasSpecialItems,
    formData.needsPacking
  ]);

  // Function to update form data
  const updateFormData = <K extends keyof EstimateFormData>(field: K, value: EstimateFormData[K]) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Function to handle address selection
  const handleFromAddressSelect = (address: string, placeDetails?: google.maps.places.PlaceResult | null) => {
    console.log('From address selected:', address, placeDetails?.geometry?.location);
    
    // Always update the address first
    setFormData(prev => ({
      ...prev,
      fromAddress: address
    }));
    
    if (placeDetails && placeDetails.geometry?.location) {
      // Then update coordinates
      setFormData(prev => ({
        ...prev,
        fromCoordinates: {
          lat: placeDetails.geometry.location.lat(),
          lng: placeDetails.geometry.location.lng()
        }
      }));
    } else {
      // Clear coordinates if no valid place details
      setFormData(prev => ({
        ...prev,
        fromCoordinates: undefined
      }));
    }
  };

  const handleToAddressSelect = (address: string, placeDetails?: google.maps.places.PlaceResult | null) => {
    console.log('To address selected:', address, placeDetails?.geometry?.location);
    
    // Always update the address first
    setFormData(prev => ({
      ...prev,
      toAddress: address
    }));
    
    if (placeDetails && placeDetails.geometry?.location) {
      // Then update coordinates
      setFormData(prev => ({
        ...prev,
        toCoordinates: {
          lat: placeDetails.geometry.location.lat(),
          lng: placeDetails.geometry.location.lng()
        }
      }));
    } else {
      // Clear coordinates if no valid place details
      setFormData(prev => ({
        ...prev,
        toCoordinates: undefined
      }));
    }
  };

  // Function to handle next step
  const goToNextStep = () => {
    switch (currentStep) {
      case 'move-type':
        setCurrentStep('locations');
        break;
      case 'locations':
        setCurrentStep('size');
        break;
      case 'size':
        setCurrentStep('date');
        break;
      case 'date':
        setCurrentStep('contact');
        break;
      case 'contact':
        setCurrentStep('summary');
        break;
      default:
        break;
    }
  };

  // Function to handle previous step
  const goToPreviousStep = () => {
    switch (currentStep) {
      case 'locations':
        setCurrentStep('move-type');
        break;
      case 'size':
        setCurrentStep('locations');
        break;
      case 'date':
        setCurrentStep('size');
        break;
      case 'contact':
        setCurrentStep('date');
        break;
      case 'summary':
        setCurrentStep('contact');
        break;
      default:
        break;
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Send the estimate data to the API
      const response = await fetch(API_ENDPOINTS.estimateForm, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          estimatedCost,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit estimate request');
      }
      
      // Set submitted state
      setCurrentStep('summary');
    } catch (error) {
      console.error('Error submitting estimate:', error);
      setError('There was an error submitting your estimate request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render different form steps based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 'move-type':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">What type of move do you need?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                  formData.moveType === 'residential' ? 'border-blue-800 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
                }`}
                onClick={() => updateFormData('moveType', 'residential')}
              >
                <h3 className="text-xl font-semibold mb-2">Residential Move</h3>
                <p className="text-gray-600">Moving from one home to another</p>
              </div>
              <div
                className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                  formData.moveType === 'commercial' ? 'border-blue-800 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
                }`}
                onClick={() => updateFormData('moveType', 'commercial')}
              >
                <h3 className="text-xl font-semibold mb-2">Commercial Move</h3>
                <p className="text-gray-600">Moving your business or office</p>
              </div>
            </div>
          </div>
        );
      case 'locations':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Where are you moving from and to?</h2>
            <div className="space-y-4">
              <AddressAutocomplete
                id="fromAddress"
                label="Moving From"
                placeholder="Enter your current address"
                defaultValue={formData.fromAddress}
                onChange={handleFromAddressSelect}
                required
              />
              <AddressAutocomplete
                id="toAddress"
                label="Moving To"
                placeholder="Enter your destination address"
                defaultValue={formData.toAddress}
                onChange={handleToAddressSelect}
                required
              />
              
              {formData.fromCoordinates && formData.toCoordinates && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Approximate Distance:</span> {estimatedCost.distance} miles
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      case 'size':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">What is the size of your move?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(MOVE_SIZES).map(([key, { label, description }]) => (
                <div
                  key={key}
                  className={`border rounded-lg p-4 cursor-pointer text-center transition-colors ${
                    formData.moveSize === key ? 'border-blue-800 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
                  }`}
                  onClick={() => updateFormData('moveSize', key as MoveSize)}
                >
                  <h3 className="font-semibold mb-1">{label}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasSpecialItems"
                  checked={formData.hasSpecialItems}
                  onChange={(e) => updateFormData('hasSpecialItems', e.target.checked)}
                  className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded"
                />
                <label htmlFor="hasSpecialItems" className="ml-2 block text-sm text-gray-700">
                  I have special items (piano, artwork, safe, antiques, etc.)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="needsPacking"
                  checked={formData.needsPacking}
                  onChange={(e) => updateFormData('needsPacking', e.target.checked)}
                  className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded"
                />
                <label htmlFor="needsPacking" className="ml-2 block text-sm text-gray-700">
                  I need packing services
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                Not sure about the size? <Link href="/contact" className="text-blue-800 hover:underline">Contact us</Link> for a custom estimate.
              </p>
            </div>
          </div>
        );
      case 'date':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">When are you planning to move?</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="moveDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Move Date
                </label>
                <input
                  type="date"
                  id="moveDate"
                  value={formData.moveDate}
                  onChange={(e) => updateFormData('moveDate', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label htmlFor="moveTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Start Time
                </label>
                <input
                  type="time"
                  id="moveTime"
                  value={formData.moveTime || ''}
                  onChange={(e) => updateFormData('moveTime', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                We recommend booking your move at least 2 weeks in advance, especially during peak season (May-August).
              </p>
            </div>
            
            {formData.moveDate && formData.fromCoordinates && formData.toCoordinates && formData.moveSize && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800">Estimated Cost: ${estimatedCost.min} - ${estimatedCost.max}</p>
                <p className="text-sm text-blue-600 mt-1">
                  This is a preliminary estimate based on the information provided. 
                  Factors like specific inventory items and access conditions may affect the final price.
                </p>
              </div>
            )}
          </div>
        );
      case 'contact':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Tell us about yourself</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  required
                />
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800">Estimated Cost: ${estimatedCost.min} - ${estimatedCost.max}</p>
                <p className="text-sm text-blue-600 mt-1">
                  A member of our team will contact you to confirm your estimate and discuss any specific requirements.
                </p>
              </div>
            </div>
          </div>
        );
      case 'summary':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Estimate Summary</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Move Type</p>
                  <p className="font-medium">{formData.moveType === 'residential' ? 'Residential Move' : 'Commercial Move'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">From</p>
                  <p className="font-medium">{formData.fromAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">To</p>
                  <p className="font-medium">{formData.toAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Move Size</p>
                  <p className="font-medium">{MOVE_SIZES[formData.moveSize]?.label || formData.moveSize}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Preferred Date</p>
                  <p className="font-medium">{new Date(formData.moveDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Distance</p>
                  <p className="font-medium">{estimatedCost.distance} miles</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Additional Services</p>
                  <p className="font-medium">
                    {[
                      formData.hasSpecialItems ? 'Special Items Handling' : null,
                      formData.needsPacking ? 'Packing Services' : null
                    ].filter(Boolean).join(', ') || 'None'}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-lg font-bold">Estimated Cost Range:</p>
                <p className="text-3xl font-bold text-blue-800">${estimatedCost.min} - ${estimatedCost.max}</p>
                <p className="text-sm text-gray-600 mt-1">
                  This is a preliminary estimate. Our team will contact you with a more precise quote.
                </p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800">Thank you!</h3>
                  <p className="mt-2 text-green-700">
                    We&apos;ve received your estimate request. A member of our team will contact you within 24 hours to discuss your move in detail and provide a finalized quote.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Function to determine if the next button should be disabled
  const isNextDisabled = () => {
    switch (currentStep) {
      case 'move-type':
        return !formData.moveType;
      case 'locations':
        // For locations step, we only need to check if both addresses are filled out and coordinates are valid
        // This ensures users can proceed once they've selected valid addresses
        const hasFromAddress = Boolean(formData.fromAddress?.trim?.());
        const hasToAddress = Boolean(formData.toAddress?.trim?.());
        const hasValidCoordinates = Boolean(formData.fromCoordinates) && Boolean(formData.toCoordinates);
        
        console.log('Next button conditions:', { hasFromAddress, hasToAddress, hasValidCoordinates });
        
        // Enable the next button if we have addresses and coordinates
        return !(hasFromAddress && hasToAddress && hasValidCoordinates);
      case 'size':
        return !formData.moveSize;
      case 'date':
        return !formData.moveDate;
      case 'contact':
        return !formData.fullName || !formData.email || !formData.phone;
      default:
        return false;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Progress steps */}
          <div className="bg-blue-800 py-4 px-6">
            <div className="flex justify-between">
              <div className={`flex-1 text-center ${currentStep === 'move-type' ? 'text-white' : 'text-blue-300'}`}>
                <div className={`w-6 h-6 flex items-center justify-center rounded-full mx-auto mb-1 text-xs ${currentStep === 'move-type' ? 'bg-white text-blue-800' : 'bg-blue-500 text-white'}`}>1</div>
                <span className="text-xs">Type</span>
              </div>
              <div className={`flex-1 text-center ${currentStep === 'locations' ? 'text-white' : 'text-blue-300'}`}>
                <div className={`w-6 h-6 flex items-center justify-center rounded-full mx-auto mb-1 text-xs ${currentStep === 'locations' ? 'bg-white text-blue-800' : 'bg-blue-500 text-white'}`}>2</div>
                <span className="text-xs">Locations</span>
              </div>
              <div className={`flex-1 text-center ${currentStep === 'size' ? 'text-white' : 'text-blue-300'}`}>
                <div className={`w-6 h-6 flex items-center justify-center rounded-full mx-auto mb-1 text-xs ${currentStep === 'size' ? 'bg-white text-blue-800' : 'bg-blue-500 text-white'}`}>3</div>
                <span className="text-xs">Size</span>
              </div>
              <div className={`flex-1 text-center ${currentStep === 'date' ? 'text-white' : 'text-blue-300'}`}>
                <div className={`w-6 h-6 flex items-center justify-center rounded-full mx-auto mb-1 text-xs ${currentStep === 'date' ? 'bg-white text-blue-800' : 'bg-blue-500 text-white'}`}>4</div>
                <span className="text-xs">Date</span>
              </div>
              <div className={`flex-1 text-center ${currentStep === 'contact' ? 'text-white' : 'text-blue-300'}`}>
                <div className={`w-6 h-6 flex items-center justify-center rounded-full mx-auto mb-1 text-xs ${currentStep === 'contact' ? 'bg-white text-blue-800' : 'bg-blue-500 text-white'}`}>5</div>
                <span className="text-xs">Contact</span>
              </div>
            </div>
          </div>

          {/* Form content */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Your Free Moving Estimate</h1>
            <p className="text-gray-600 mb-8">Fill out the form below to receive an estimate for your move.</p>
            
            <form onSubmit={handleSubmit}>
              {/* Dynamic content based on step */}
              {renderStepContent()}
              
              {/* Error message */}
              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
              
              {/* Navigation buttons */}
              <div className="mt-8 flex justify-between">
                {currentStep !== 'move-type' && currentStep !== 'summary' && (
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                {currentStep === 'move-type' && (
                  <div></div> // Empty div for spacing when there's no back button
                )}
                {currentStep !== 'summary' ? (
                  currentStep === 'contact' ? (
                    <button
                      type="submit"
                      disabled={isNextDisabled() || isSubmitting}
                      className={`px-6 py-2 bg-blue-800 text-white rounded-md ${
                        isNextDisabled() || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={goToNextStep}
                      disabled={isNextDisabled()}
                      className={`px-6 py-2 bg-blue-800 text-white rounded-md ${
                        isNextDisabled() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                      }`}
                    >
                      Next
                    </button>
                  )
                ) : (
                  <Link 
                    href="/"
                    className="px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
                  >
                    Return Home
                  </Link>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Additional information */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Why Choose Future Connects?</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Transparent pricing with no hidden fees</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Professional, trained moving specialists</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Real-time tracking of your move</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Full-service options from packing to unpacking</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 