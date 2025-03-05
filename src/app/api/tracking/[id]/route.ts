import { NextRequest, NextResponse } from 'next/server';
import { TrackingDetails } from '@/types';

// Mock tracking data - in a real application, this would come from your database
const mockTrackingData: Record<string, TrackingDetails> = {
  'TRACK-123456': {
    id: 'TRACK-123456',
    status: 'in_progress',
    customer: 'John Doe',
    fromAddress: '123 Main St, Washington, DC 20001',
    toAddress: '456 Oak Ave, Arlington, VA 22209',
    scheduledDate: '2024-06-15',
    estimatedArrival: '2024-06-15T14:30:00',
    currentLocation: {
      lat: 38.9072,
      lng: -77.0369,
      address: 'En route on I-395'
    },
    fromCoordinates: {
      lat: 38.9072,
      lng: -77.0365
    },
    toCoordinates: {
      lat: 38.8799,
      lng: -77.1060
    },
    updates: [
      {
        timestamp: '2024-06-15T08:00:00',
        status: 'Started',
        message: 'Movers arrived at origin location and started loading'
      },
      {
        timestamp: '2024-06-15T11:30:00',
        status: 'Loading Completed',
        message: 'All items loaded into moving truck, departing soon'
      },
      {
        timestamp: '2024-06-15T12:00:00',
        status: 'In Transit',
        message: 'Moving truck en route to destination'
      }
    ]
  },
  'TRACK-789012': {
    id: 'TRACK-789012',
    status: 'scheduled',
    customer: 'Jane Smith',
    fromAddress: '789 Pine St, Silver Spring, MD 20910',
    toAddress: '321 Maple Dr, Bethesda, MD 20814',
    scheduledDate: '2024-06-20',
    fromCoordinates: {
      lat: 38.9961,
      lng: -77.0269
    },
    toCoordinates: {
      lat: 38.9807,
      lng: -77.1003
    },
    updates: [
      {
        timestamp: '2024-06-10T14:00:00',
        status: 'Scheduled',
        message: 'Move scheduled for June 20, 2024'
      }
    ]
  },
  'TRACK-345678': {
    id: 'TRACK-345678',
    status: 'completed',
    customer: 'Robert Johnson',
    fromAddress: '567 Elm St, Alexandria, VA 22301',
    toAddress: '890 Cedar Rd, Washington, DC 20008',
    scheduledDate: '2024-06-05',
    fromCoordinates: {
      lat: 38.8318,
      lng: -77.0481
    },
    toCoordinates: {
      lat: 38.9417,
      lng: -77.0633
    },
    updates: [
      {
        timestamp: '2024-06-05T08:30:00',
        status: 'Started',
        message: 'Movers arrived at origin location and started loading'
      },
      {
        timestamp: '2024-06-05T12:00:00',
        status: 'Loading Completed',
        message: 'All items loaded into moving truck, departing soon'
      },
      {
        timestamp: '2024-06-05T13:00:00',
        status: 'In Transit',
        message: 'Moving truck en route to destination'
      },
      {
        timestamp: '2024-06-05T15:00:00',
        status: 'Arrived',
        message: 'Moving truck arrived at destination'
      },
      {
        timestamp: '2024-06-05T18:30:00',
        status: 'Completed',
        message: 'All items unloaded and placed as requested, move completed'
      }
    ]
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  // Log the tracking request for analytics purposes
  console.log(`Tracking request received for ID: ${id}`);

  // In a real application, you would fetch this data from your database
  // For this demo, we're using mock data
  const trackingInfo = mockTrackingData[id];

  if (!trackingInfo) {
    return NextResponse.json(
      { error: 'No tracking information found for the provided ID' },
      { status: 404 }
    );
  }

  // In a real application, you might want to add some security checks here
  // to ensure that only authorized users can access certain tracking information

  return NextResponse.json(trackingInfo);
}

// This would be a POST endpoint to update tracking information
// In a real application, this would be secured with authentication
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  try {
    const body = await request.json();
    
    // Validate the request body
    if (!body || !body.status) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    // In a real application, you would update the tracking information in your database
    // For this demo, we'll just log the update request
    console.log(`Tracking update received for ID: ${id}`, body);
    
    // Return a success response
    return NextResponse.json({ success: true, message: 'Tracking information updated' });
  } catch (error) {
    console.error('Error updating tracking information:', error);
    return NextResponse.json(
      { error: 'Failed to update tracking information' },
      { status: 500 }
    );
  }
} 