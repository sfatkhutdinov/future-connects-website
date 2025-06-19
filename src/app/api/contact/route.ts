import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { EmailService } from '@/utils/emailService';
import { AnalyticsService } from '@/utils/analyticsService';

// Validation schema for contact form
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  service: z.enum(['moving', 'beauty', 'party', 'multiple'], {
    errorMap: () => ({ message: 'Please select a valid service' })
  }),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const contentType = request.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Validate the request body
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errorFields = validationResult.error.issues.map(issue => issue.path[0] as string);
      
      // Track validation errors
      AnalyticsService.trackFormValidationError(errorFields, 'validation-failed');
      
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.issues.map(issue => ({
            field: issue.path[0],
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    const contactData = validationResult.data;
    const submissionId = `FC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const timestamp = new Date().toISOString();
    const userAgent = request.headers.get('user-agent');
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Track analytics
    AnalyticsService.trackContactFormSubmission({
      submissionId,
      service: contactData.service,
      timestamp,
      userAgent: userAgent || undefined,
      ip,
    });

    // Log the contact request for development
    console.log('New contact form submission:', {
      ...contactData,
      submissionId,
      timestamp,
      userAgent,
      ip
    });

    // Send email notifications
    try {
      // Send notification to admin
      const adminEmailResult = await EmailService.sendContactFormNotification(contactData, submissionId);
      AnalyticsService.trackEmailDelivery('admin_notification', adminEmailResult.success, submissionId);
      
      if (!adminEmailResult.success) {
        console.error('Failed to send admin notification:', adminEmailResult.error);
      }

      // Send confirmation to customer
      const customerEmailResult = await EmailService.sendCustomerConfirmation(contactData, submissionId);
      AnalyticsService.trackEmailDelivery('customer_confirmation', customerEmailResult.success, submissionId);
      
      if (!customerEmailResult.success) {
        console.error('Failed to send customer confirmation:', customerEmailResult.error);
      }
    } catch (emailError) {
      console.error('Email service error:', emailError);
      AnalyticsService.trackEmailDelivery('admin_notification', false, submissionId);
      AnalyticsService.trackEmailDelivery('customer_confirmation', false, submissionId);
      // Don't fail the request if email fails - form submission is still valid
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    // Track API performance
    const endTime = Date.now();
    AnalyticsService.trackAPIPerformance('/api/contact', endTime - startTime, true);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! We\'ll get back to you within 24 hours.',
        submissionId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Track API performance for errors
    const endTime = Date.now();
    AnalyticsService.trackAPIPerformance('/api/contact', endTime - startTime, false);
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
