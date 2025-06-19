interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: string;
  sessionId?: string;
  userId?: string;
}

interface ContactFormAnalytics {
  submissionId: string;
  service: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
  ip?: string;
}

export class AnalyticsService {
  /**
   * Track contact form submission
   */
  static trackContactFormSubmission(data: ContactFormAnalytics): void {
    const event: AnalyticsEvent = {
      event: 'contact_form_submission',
      properties: {
        submission_id: data.submissionId,
        service_type: data.service,
        user_agent: data.userAgent,
        referrer: data.referrer,
        ip_address: data.ip,
      },
      timestamp: data.timestamp,
    };

    // Log for development - in production this would send to analytics service
    console.log('Analytics Event:', JSON.stringify(event, null, 2));

    // TODO: In production, send to analytics service (Plausible, Google Analytics, etc.)
    // this.sendToAnalyticsService(event);
  }

  /**
   * Track form validation errors
   */
  static trackFormValidationError(errors: string[], submissionId: string): void {
    const event: AnalyticsEvent = {
      event: 'contact_form_validation_error',
      properties: {
        submission_id: submissionId,
        error_fields: errors,
        error_count: errors.length,
      },
      timestamp: new Date().toISOString(),
    };

    console.log('Analytics Event:', JSON.stringify(event, null, 2));
  }

  /**
   * Track API endpoint performance
   */
  static trackAPIPerformance(endpoint: string, duration: number, success: boolean): void {
    const event: AnalyticsEvent = {
      event: 'api_performance',
      properties: {
        endpoint,
        duration_ms: duration,
        success,
      },
      timestamp: new Date().toISOString(),
    };

    console.log('Analytics Event:', JSON.stringify(event, null, 2));
  }

  /**
   * Track email delivery status
   */
  static trackEmailDelivery(type: 'admin_notification' | 'customer_confirmation', success: boolean, submissionId: string): void {
    const event: AnalyticsEvent = {
      event: 'email_delivery',
      properties: {
        email_type: type,
        success,
        submission_id: submissionId,
      },
      timestamp: new Date().toISOString(),
    };

    console.log('Analytics Event:', JSON.stringify(event, null, 2));
  }

  /**
   * Generate daily metrics summary
   */
  static generateDailyMetrics(): void {
    // This would compile analytics data for daily reports
    // For now, just log that metrics are being generated
    console.log('Daily Metrics Generated:', {
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
    });
  }

  // Future: Integration with external analytics services
  // private static sendToAnalyticsService(event: AnalyticsEvent): void {
  //   // Plausible Analytics integration
  //   // Google Analytics 4 integration  
  //   // Custom analytics dashboard
  // }
}
