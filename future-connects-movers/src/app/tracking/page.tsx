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
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Move</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Enter your tracking ID to see real-time updates on your move.
            </p>
          </div>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleTrackingSubmit} className="space-y-4">
              <div>
                <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700 mb-1">
                  Tracking ID or Booking Number
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="trackingId"
                    placeholder="Enter your tracking ID (e.g., TRACK-123456)"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !trackingId}
                    className={`px-6 py-3 bg-blue-800 text-white rounded-r-md font-medium ${
                      isLoading || !trackingId ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                  >
                    {isLoading ? 'Tracking...' : 'Track'}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Your tracking ID was sent to you in your booking confirmation email.
                </p>
              </div>
            </form>

            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Sample tracking IDs for demo purposes */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-500">Demo Tracking IDs (For Testing)</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                <button 
                  type="button" 
                  onClick={() => setTrackingId('TRACK-123456')}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  TRACK-123456 (In Progress)
                </button>
                <button 
                  type="button" 
                  onClick={() => setTrackingId('TRACK-789012')}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  TRACK-789012 (Scheduled)
                </button>
                <button 
                  type="button" 
                  onClick={() => setTrackingId('TRACK-345678')}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  TRACK-345678 (Completed)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Results */}
      {trackingDetails && (
        <section className="py-8 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Render the TrackingDetails component */}
            <TrackingDetails 
              trackingDetails={trackingDetails} 
              coordinates={coordinates} 
            />
            
            {/* Render the map separately for in-progress moves */}
            {trackingDetails.status === 'in_progress' && coordinates && (
              <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Live Tracking Map</h3>
                  <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
                    <MoveMap 
                      origin={coordinates.origin}
                      destination={coordinates.destination}
                      currentLocation={coordinates.current}
                      eta={trackingDetails.estimatedArrival}
                      className="h-full w-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Get answers to common questions about tracking your move.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <dl className="space-y-8">
              <div>
                <dt className="text-lg font-medium text-gray-900">
                  How do I get my tracking ID?
                </dt>
                <dd className="mt-2 text-gray-600">
                  When you book a move with Future Connects, you&apos;ll receive a confirmation email with your tracking ID. You can also find it in your customer dashboard if you&apos;ve created an account.
                </dd>
              </div>

              <div>
                <dt className="text-lg font-medium text-gray-900">
                  How often is the tracking information updated?
                </dt>
                <dd className="mt-2 text-gray-600">
                  Our tracking system updates in real-time as your move progresses. The moving team updates the status at key milestones such as arrival at pickup, loading completion, departure, and arrival at the destination.
                </dd>
              </div>

              <div>
                <dt className="text-lg font-medium text-gray-900">
                  What if I need to make changes to my move?
                </dt>
                <dd className="mt-2 text-gray-600">
                  If you need to make changes to your scheduled move, please contact our customer service team as soon as possible. Changes to move details may impact the schedule and pricing.
                </dd>
              </div>

              <div>
                <dt className="text-lg font-medium text-gray-900">
                  Can I contact the moving team directly?
                </dt>
                <dd className="mt-2 text-gray-600">
                  Yes, once your move is in progress, you&apos;ll have the option to contact the driver or the moving team directly. This option becomes available on the tracking page when your move status changes to &quot;In Progress.&quot;
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
} 