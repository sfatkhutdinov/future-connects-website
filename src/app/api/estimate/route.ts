import { NextRequest, NextResponse } from 'next/server';

// Simple estimate calculation function
function calculateEstimate(formData: any) {
  // Base prices by move size
  const basePrices = {
    studio: 400,
    small: 600,
    medium: 900,
    large: 1200,
  };

  // Get the base price from the move size
  const basePrice = basePrices[formData.moveSize as keyof typeof basePrices] || 800;
  
  // Commercial moves have a 20% premium
  const moveTypeMultiplier = formData.moveType === 'commercial' ? 1.2 : 1.0;
  
  // Calculate the estimated price range
  const estimatedPrice = basePrice * moveTypeMultiplier;
  const lowerRange = Math.round(estimatedPrice * 0.9);
  const upperRange = Math.round(estimatedPrice * 1.1);
  
  return {
    lowerRange,
    upperRange,
    currency: 'USD',
  };
}

export async function POST(request: NextRequest) {
  try {
    // Parse the form data from the request
    const formData = await request.json();
    
    // Validate required fields
    if (!formData.moveType || !formData.fromAddress || !formData.toAddress || 
        !formData.moveSize || !formData.moveDate || !formData.fullName || 
        !formData.email || !formData.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Calculate a basic estimate
    const estimateResult = calculateEstimate(formData);
    
    // Generate a unique estimate ID
    const estimateId = `EST-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Log the estimate request (in a real app, this would be sent to a database or CRM)
    console.log('Estimate request received:', { ...formData, estimateId });
    
    // In a production environment, you would:
    // 1. Store the estimate in a database
    // 2. Send an email notification to the sales team
    // 3. Send a confirmation email to the customer
    // 4. Calculate a more accurate price using distance API, etc.
    
    // Return a success response with the estimate
    return NextResponse.json(
      { 
        success: true,
        estimateId,
        estimate: estimateResult,
        message: 'Thank you for your estimate request. A member of our team will contact you shortly.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing estimate request:', error);
    
    // Return an error response
    return NextResponse.json(
      { error: 'Failed to process your estimate request. Please try again later.' },
      { status: 500 }
    );
  }
} 