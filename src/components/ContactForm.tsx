'use client';

import { useState } from 'react';
import type { ContactFormData } from '@/app/api/contact/route';

interface ContactFormProps {
  className?: string;
}

interface FormErrors {
  [key: string]: string;
}

interface SubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  submissionId?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: 'moving' as const,
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submission, setSubmission] = useState<SubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous state
    setErrors({});
    setSubmission({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: '',
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmission({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: result.message,
          submissionId: result.submissionId,
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: 'moving',
          message: '',
        });
      } else {
        // Handle validation errors
        if (result.details) {
          const fieldErrors: FormErrors = {};
          result.details.forEach((detail: { field: string; message: string }) => {
            fieldErrors[detail.field] = detail.message;
          });
          setErrors(fieldErrors);
        }

        setSubmission({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: result.error || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmission({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'Network error. Please check your connection and try again.',
      });
    }
  };

  return (
    <div className={className}>
      {submission.isSuccess && (
        <div className="mb-6 p-4 bg-success/20 border border-success/30 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3">✅</span>
            <div>
              <p className="font-semibold text-success">Message Sent Successfully!</p>
              <p className="text-sm text-white/90 mt-1">{submission.message}</p>
              {submission.submissionId && (
                <p className="text-xs text-white/70 mt-1">
                  Reference: {submission.submissionId}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {submission.isError && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3">❌</span>
            <div>
              <p className="font-semibold text-red-300">Error</p>
              <p className="text-sm text-white/90 mt-1">{submission.message}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 rounded-lg bg-white/20 border text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                errors.firstName ? 'border-red-500' : 'border-white/30'
              }`}
              placeholder="John"
              disabled={submission.isSubmitting}
            />
            {errors.firstName && (
              <p className="text-red-300 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 rounded-lg bg-white/20 border text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                errors.lastName ? 'border-red-500' : 'border-white/30'
              }`}
              placeholder="Doe"
              disabled={submission.isSubmitting}
            />
            {errors.lastName && (
              <p className="text-red-300 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={`w-full px-4 py-3 rounded-lg bg-white/20 border text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              errors.email ? 'border-red-500' : 'border-white/30'
            }`}
            placeholder="john@example.com"
            disabled={submission.isSubmitting}
          />
          {errors.email && (
            <p className="text-red-300 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg bg-white/20 border text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              errors.phone ? 'border-red-500' : 'border-white/30'
            }`}
            placeholder="(555) 123-4567"
            disabled={submission.isSubmitting}
          />
          {errors.phone && (
            <p className="text-red-300 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-2">
            Service Needed *
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            required
            className={`w-full px-4 py-3 rounded-lg bg-white/20 border text-white focus:outline-none focus:ring-2 focus:ring-white/50 ${
              errors.service ? 'border-red-500' : 'border-white/30'
            }`}
            disabled={submission.isSubmitting}
          >
            <option value="moving" className="text-dark">Moving Services</option>
            <option value="beauty" className="text-dark">Wedding Beauty</option>
            <option value="party" className="text-dark">Party Entertainment</option>
            <option value="multiple" className="text-dark">Multiple Services</option>
          </select>
          {errors.service && (
            <p className="text-red-300 text-sm mt-1">{errors.service}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            required
            className={`w-full px-4 py-3 rounded-lg bg-white/20 border text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none ${
              errors.message ? 'border-red-500' : 'border-white/30'
            }`}
            placeholder="Tell us about your needs..."
            disabled={submission.isSubmitting}
          />
          {errors.message && (
            <p className="text-red-300 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submission.isSubmitting}
          className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
            submission.isSubmitting
              ? 'bg-white/50 text-gray-500 cursor-not-allowed'
              : 'bg-white text-primary hover:bg-white/90 hover:transform hover:scale-[1.02]'
          }`}
        >
          {submission.isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending Message...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
}
