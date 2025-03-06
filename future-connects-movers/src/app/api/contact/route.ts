import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the form data from the request
    const formData = await request.json();
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Log the form submission (in a real app, this would be sent to a database or email service)
    console.log('Form submission received:', formData);
    
    // In a production environment, you would:
    // 1. Send an email notification to booking@future-connects.com
    // 2. Store the inquiry in a database
    // 3. Set up an auto-responder email to the customer
    
    // Return a success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for contacting Future Connects. We will get back to you soon.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // Return an error response
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    );
  }
} 