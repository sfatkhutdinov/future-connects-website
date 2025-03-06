/**
 * Application configuration
 * 
 * In a production environment, these values would typically be loaded from environment variables.
 * For local development, you can set them directly here or use a .env file.
 */

// API keys and external services
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';
export const APPLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_APPLE_MAPS_API_KEY || 'YOUR_APPLE_MAPS_API_KEY';

// Services flags - control which mapping service to use
export const USE_GOOGLE_MAPS = true; // Set to false to use Apple Maps
export const USE_APPLE_MAPS = !USE_GOOGLE_MAPS;

// Contact information
export const COMPANY_EMAIL = 'booking@future-connects.com';
export const COMPANY_PHONE = 'Coming Soon'; // Replace with actual phone when available
export const COMPANY_ADDRESS = 'DMV Area, Maryland';

// Social media links
export const SOCIAL_MEDIA = {
  facebook: 'https://facebook.com', // Replace with actual URL when available
  twitter: 'https://twitter.com',   // Replace with actual URL when available
  instagram: 'https://instagram.com', // Replace with actual URL when available
};

// Service area bounds (DMV area)
export const SERVICE_AREA_BOUNDS = {
  southwest: { lat: 38.5, lng: -78.0 }, // Southwest corner of service area
  northeast: { lat: 39.5, lng: -76.5 }, // Northeast corner of service area
};

// Backend API endpoints
export const API_ENDPOINTS = {
  contactForm: '/api/contact',
  estimateForm: '/api/estimate',
  tracking: '/api/tracking',
};

// Feature flags
export const FEATURES = {
  enableRealTimeTracking: false,
  enableAddressAutocomplete: true,
  enableDistanceCalculation: true,
};

// Constants for move sizes
export const MOVE_SIZES = {
  studio: { label: 'Studio', description: '1-2 rooms' },
  small: { label: 'Small', description: '2-3 rooms' },
  medium: { label: 'Medium', description: '3-4 rooms' },
  large: { label: 'Large', description: '4+ rooms' },
}; 