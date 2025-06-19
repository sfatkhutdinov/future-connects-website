import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint to check domain verification status
 * GET /api/domain-check
 */
export async function GET(request: NextRequest) {
  try {
    const hasCustomDomain = !!(process.env.ADMIN_EMAIL?.includes('future-connects.com') && process.env.RESEND_API_KEY);
    
    const status = {
      environment: process.env.NODE_ENV || 'development',
      domainVerified: hasCustomDomain,
      currentFromEmail: hasCustomDomain ? 'noreply@future-connects.com' : 'noreply@resend.dev',
      currentAdminEmail: process.env.ADMIN_EMAIL || 'delivered@resend.dev',
      resendConfigured: !!process.env.RESEND_API_KEY,
      message: hasCustomDomain 
        ? '✅ Custom domain configured - emails will be sent from future-connects.com'
        : '⚠️  Add domain verification TXT record to Cloudflare DNS to enable custom emails'
    };

    return NextResponse.json(status, { status: 200 });
    
  } catch (error) {
    console.error('Domain check error:', error);
    return NextResponse.json(
      { error: 'Failed to check domain status' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
