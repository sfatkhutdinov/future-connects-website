import { TrackingDetails as TrackingDetailsType } from '@/types';
import Link from 'next/link';

interface TrackingDetailsProps {
  trackingDetails: TrackingDetailsType;
  coordinates: {
    origin: { lat: number; lng: number };
    destination: { lat: number; lng: number };
    current?: { lat: number; lng: number };
  } | null;
}

export default function TrackingDetails({ trackingDetails, coordinates }: TrackingDetailsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Scheduled</span>;
      case 'in_progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">In Progress</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric' 
    };
    
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-800 px-6 py-4 text-white">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-bold">Tracking ID: {trackingDetails.id}</h2>
          <div className="mt-2 md:mt-0">{getStatusBadge(trackingDetails.status)}</div>
        </div>
      </div>
      
      {/* Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Move Details</h3>
            <div className="mt-2 space-y-2">
              <p><span className="font-medium">From:</span> {trackingDetails.fromAddress}</p>
              <p><span className="font-medium">To:</span> {trackingDetails.toAddress}</p>
              <p><span className="font-medium">Scheduled Date:</span> {new Date(trackingDetails.scheduledDate).toLocaleDateString()}</p>
              {trackingDetails.estimatedArrival && trackingDetails.status === 'in_progress' && (
                <p><span className="font-medium">Estimated Arrival:</span> {formatDate(trackingDetails.estimatedArrival)}</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Current Status</h3>
            <div className="mt-2">
              {trackingDetails.status === 'scheduled' && (
                <p>Your move is scheduled. Our team will arrive at the scheduled time.</p>
              )}
              {trackingDetails.status === 'in_progress' && trackingDetails.currentLocation && (
                <div>
                  <p className="mb-2">Your move is currently in progress.</p>
                  <p><span className="font-medium">Current Location:</span> {trackingDetails.currentLocation.address}</p>
                </div>
              )}
              {trackingDetails.status === 'completed' && (
                <p>Your move has been completed. Thank you for choosing Future Connects!</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Map for in-progress moves */}
        {trackingDetails.status === 'in_progress' && coordinates && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Live Tracking</h3>
            <div className="h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden">
              {/* MoveMap component is rendered in the parent component */}
            </div>
          </div>
        )}
        
        {/* Timeline */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Move Timeline</h3>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-5 w-px bg-gray-200"></div>
            <ul className="space-y-6">
              {trackingDetails.updates.map((update, index) => (
                <li key={index} className="relative pl-12">
                  <div className="absolute left-0 mt-1.5 w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 border-2 border-blue-800">
                    <svg className="w-5 h-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{formatDate(update.timestamp)}</p>
                    <h4 className="font-medium text-gray-900">{update.status}</h4>
                    <p className="mt-1 text-gray-700">{update.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Footer with actions */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <p className="text-sm text-gray-500">Need assistance with your move?</p>
          </div>
          <div className="flex gap-3">
            <Link 
              href="/contact" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Contact Support
            </Link>
            {trackingDetails.status === 'in_progress' && (
              <button 
                type="button" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700"
              >
                Call Driver
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 