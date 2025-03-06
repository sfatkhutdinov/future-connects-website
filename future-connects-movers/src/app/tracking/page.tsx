'use client';

import { useState } from 'react';
import MoveMap from '@/components/tracking/MoveMap';
import TrackingDetails from '@/components/tracking/TrackingDetails';
import { TrackingDetails as TrackingDetailsType, Coordinates } from '@/types';

// These are fixed coordinates for demonstration - in a real app, these would come from geocoding the addresses
const defaultCoordinates = {
  'TRACK-123456': {
    origin: { lat: 38.9072, lng: -77.0365 },
    destination: { lat: 38.8799, lng: -77.1060 },
    current: { lat: 38.8922, lng: -77.0709 }
  }
};

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [trackingDetails, setTrackingDetails] = useState<TrackingDetailsType | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<{
    origin: Coordinates;
    destination: Coordinates;
    current?: Coordinates;
  } | null>(null);

  const handleTrackingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTrackingDetails(null);
    setCoordinates(null);

    try {
      // Make API call to get tracking information
      const response = await fetch(`/api/tracking/${trackingId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch tracking information');
      }
      
      const result = await response.json();
      
      setTrackingDetails(result);
      
      // Set coordinates for the map
      if (trackingId === 'TRACK-123456') {
        // For our demo, we have fixed coordinates
        setCoordinates(defaultCoordinates['TRACK-123456']);
      } else if (result.fromCoordinates && result.toCoordinates) {
        // For other records, use the coordinates from the tracking data
        setCoordinates({
          origin: result.fromCoordinates,
          destination: result.toCoordinates,
          current: result.currentLocation
        });
      }
    } catch (error) {
      console.error('Error fetching tracking information:', error);
      setError(error instanceof Error ? error.message : 'Unable to retrieve tracking information at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Track Your Move</h1>
      <p className="mb-8">Enter your booking ID to track the status of your upcoming or ongoing move.</p>
      
      <div className="max-w-xl mx-auto mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="trackingId" className="block text-sm fw-medium text-gray-700 mb-1">
                Booking ID
              </label>
              <input
                type="text"
                id="trackingId"
                placeholder="Enter your booking ID (e.g., FCM-1234)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Track
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">How Tracking Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-lg fw-medium mb-2">Enter Your Booking ID</h3>
            <p className="text-gray-600">
              Input the booking ID you received in your confirmation email when you booked your move.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-lg fw-medium mb-2">View Real-Time Status</h3>
            <p className="text-gray-600">
              See the current status of your move, including preparation, en route, and completion stages.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-lg fw-medium mb-2">Get Updates</h3>
            <p className="text-gray-600">
              Receive notifications about important milestones during your move process.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Tracking Example</h2>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="bg-blue-100 p-4 rounded-lg inline-flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg fw-medium mb-1">Booking Confirmed</h3>
                <p className="text-gray-600">
                  Your move has been booked and confirmed. Our team is preparing for your relocation.
                </p>
                <p className="text-sm text-gray-500 mt-1">Typically 1-2 weeks before your move date</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="bg-blue-100 p-4 rounded-lg inline-flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg fw-medium mb-1">Team Dispatched</h3>
                <p className="text-gray-600">
                  Your moving team is on their way to your current location to begin the loading process.
                </p>
                <p className="text-sm text-gray-500 mt-1">Morning of your move date</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="bg-blue-100 p-4 rounded-lg inline-flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg fw-medium mb-1">Loading in Progress</h3>
                <p className="text-gray-600">
                  Our team is carefully loading your belongings into our moving truck.
                </p>
                <p className="text-sm text-gray-500 mt-1">During the scheduled move time</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="bg-blue-100 p-4 rounded-lg inline-flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg fw-medium mb-1">In Transit</h3>
                <p className="text-gray-600">
                  Your belongings are now in transit to your new location.
                </p>
                <p className="text-sm text-gray-500 mt-1">After loading is complete</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="bg-blue-100 p-4 rounded-lg inline-flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg fw-medium mb-1">Delivery Complete</h3>
                <p className="text-gray-600">
                  The move has been completed successfully. All items have been delivered to your new location.
                </p>
                <p className="text-sm text-gray-500 mt-1">End of the moving process</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 