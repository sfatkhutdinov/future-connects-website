import { Resend } from 'resend';
import type { ContactFormData } from '@/app/api/contact/route';

// Initialize Resend with API key from environment variables
// Use a dummy key for development if not configured
const resend = new Resend(process.env.RESEND_API_KEY || 'dev-key');

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export class EmailService {
  // Production domains (use after domain verification)
  private static readonly PRODUCTION_FROM = 'Future Connects <noreply@future-connects.com>';
  private static readonly PRODUCTION_ADMIN = 'contact@future-connects.com';
  
  // Development/testing domains
  private static readonly DEV_FROM = 'noreply@resend.dev';
  private static readonly DEV_ADMIN = 'delivered@resend.dev';
  
  // Check if custom domain is configured and ready
  private static get isCustomDomainReady(): boolean {
    return !!(process.env.ADMIN_EMAIL?.includes('future-connects.com') && process.env.RESEND_API_KEY);
  }
  
  // Dynamic domain selection based on configuration
  private static readonly DEFAULT_FROM = this.isCustomDomainReady
    ? this.PRODUCTION_FROM 
    : this.DEV_FROM;
    
  private static readonly ADMIN_EMAIL = process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL.includes('future-connects.com')
    ? process.env.ADMIN_EMAIL
    : this.DEV_ADMIN;

  /**
   * Send an email using Resend
   */
  static async sendEmail({ to, subject, html, from }: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY not configured - email sending disabled in development');
        return { 
          success: true, 
          messageId: `dev-${Date.now()}`,
        };
      }

      const { data, error } = await resend.emails.send({
        from: from || this.DEFAULT_FROM,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      });

      if (error) {
        console.error('Resend email error:', error);
        return { success: false, error: error.message };
      }

      return { 
        success: true, 
        messageId: data?.id,
      };

    } catch (error) {
      console.error('Email service error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown email error',
      };
    }
  }

  /**
   * Send contact form notification to admin
   */
  static async sendContactFormNotification(formData: ContactFormData, submissionId: string): Promise<{ success: boolean; error?: string }> {
    const serviceNames = {
      moving: 'Moving Services',
      beauty: 'Wedding Beauty',
      party: 'Party Entertainment',
      multiple: 'Multiple Services'
    };

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
          .footer { background: #1e293b; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: 600; color: #4a5568; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
          .value { margin-top: 5px; padding: 8px 12px; background: white; border-radius: 4px; border-left: 3px solid #2563eb; }
          .message-box { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981; margin-top: 10px; }
          .metadata { font-size: 11px; color: #6b7280; margin-top: 20px; padding: 10px; background: #f1f5f9; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🚀 New Contact Form Submission</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Future Connects Website</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">Customer Name</div>
              <div class="value">${formData.firstName} ${formData.lastName}</div>
            </div>
            
            <div class="field">
              <div class="label">Email Address</div>
              <div class="value">
                <a href="mailto:${formData.email}" style="color: #2563eb; text-decoration: none;">${formData.email}</a>
              </div>
            </div>
            
            ${formData.phone ? `
            <div class="field">
              <div class="label">Phone Number</div>
              <div class="value">
                <a href="tel:${formData.phone}" style="color: #2563eb; text-decoration: none;">${formData.phone}</a>
              </div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Service Requested</div>
              <div class="value">
                <span style="background: #2563eb; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                  ${serviceNames[formData.service]}
                </span>
              </div>
            </div>
            
            <div class="field">
              <div class="label">Customer Message</div>
              <div class="message-box">
                ${formData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div class="metadata">
              <strong>Submission Details:</strong><br>
              ID: ${submissionId}<br>
              Time: ${new Date().toLocaleString('en-US', { 
                timeZone: 'America/New_York',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 0;">Future Connects - Professional Services in the DMV Area</p>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">Moving | Wedding Beauty | Party Entertainment</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await this.sendEmail({
      to: this.ADMIN_EMAIL,
      subject: `🚀 New ${serviceNames[formData.service]} Inquiry - ${formData.firstName} ${formData.lastName}`,
      html,
    });

    return result;
  }

  /**
   * Send confirmation email to customer
   */
  static async sendCustomerConfirmation(formData: ContactFormData, submissionId: string): Promise<{ success: boolean; error?: string }> {
    const serviceNames = {
      moving: 'Moving Services',
      beauty: 'Wedding Beauty', 
      party: 'Party Entertainment',
      multiple: 'Multiple Services'
    };

    // Send to actual customer email if custom domain is ready, otherwise use testing email
    const recipientEmail = this.isCustomDomainReady 
      ? formData.email 
      : 'delivered@resend.dev';

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank You for Contacting Future Connects</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #ffffff; padding: 30px 20px; border: 1px solid #e2e8f0; }
          .footer { background: #1e293b; color: white; padding: 20px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 15px 0; }
          .highlight { background: #f0f9ff; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb; margin: 20px 0; }
          .services { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 20px 0; }
          .service { text-align: center; padding: 15px; background: #f8fafc; border-radius: 6px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">✅ Message Received!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Thank you for contacting Future Connects</p>
          </div>
          
          <div class="content">
            <p>Hi ${formData.firstName},</p>
            
            <p>Thank you for reaching out to <strong>Future Connects</strong>! We've received your inquiry about our <strong>${serviceNames[formData.service]}</strong> and we're excited to help you.</p>
            
            <div class="highlight">
              <p style="margin: 0;"><strong>What happens next?</strong></p>
              <ul style="margin: 10px 0 0 0;">
                <li>We'll review your request within 2-4 business hours</li>
                <li>A team member will contact you within 24 hours</li>
                <li>We'll provide you with a detailed quote and timeline</li>
                <li>We'll answer any questions you have about our services</li>
              </ul>
            </div>
            
            <p><strong>Your submission details:</strong></p>
            <ul>
              <li><strong>Reference ID:</strong> ${submissionId}</li>
              <li><strong>Service:</strong> ${serviceNames[formData.service]}</li>
              <li><strong>Contact Email:</strong> ${formData.email}</li>
              ${formData.phone ? `<li><strong>Phone:</strong> ${formData.phone}</li>` : ''}
            </ul>
            
            <div class="services">
              <div class="service">
                <div style="font-size: 30px; margin-bottom: 8px;">🚚</div>
                <div style="font-weight: 600; font-size: 14px;">Moving Services</div>
              </div>
              <div class="service">
                <div style="font-size: 30px; margin-bottom: 8px;">💄</div>
                <div style="font-weight: 600; font-size: 14px;">Wedding Beauty</div>
              </div>
              <div class="service">
                <div style="font-size: 30px; margin-bottom: 8px;">🎈</div>
                <div style="font-weight: 600; font-size: 14px;">Party Entertainment</div>
              </div>
            </div>
            
            <p><strong>Questions or need immediate assistance?</strong></p>
            <p>Don't hesitate to call us directly or send another message. We're here to make your experience smooth and stress-free!</p>
            
            <center>
              <a href="mailto:contact@future-connects.com" class="button">Reply to This Email</a>
            </center>
          </div>
          
          <div class="footer">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px;">
              <div>
                <h4 style="margin: 0 0 8px 0; color: #3b82f6;">Contact Information</h4>
                <p style="margin: 0; font-size: 14px; opacity: 0.9;">📧 contact@future-connects.com</p>
                <p style="margin: 3px 0 0 0; font-size: 14px; opacity: 0.9;">🌍 Serving Maryland, DC, Virginia</p>
              </div>
              <div>
                <h4 style="margin: 0 0 8px 0; color: #3b82f6;">Business Hours</h4>
                <p style="margin: 0; font-size: 14px; opacity: 0.9;">Mon-Fri: 8AM-8PM</p>
                <p style="margin: 3px 0 0 0; font-size: 14px; opacity: 0.9;">Sat-Sun: 9AM-6PM</p>
              </div>
            </div>
            <hr style="border: none; border-top: 1px solid #374151; margin: 15px 0;">
            <p style="margin: 0; text-align: center; font-size: 12px; opacity: 0.8;">
              Future Connects - Your trusted family for life's big moments<br>
              © 2025 Future Connects. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await this.sendEmail({
      to: recipientEmail,
      subject: `✅ Thank you for contacting Future Connects - ${serviceNames[formData.service]}`,
      html,
    });

    return result;
  }
}
