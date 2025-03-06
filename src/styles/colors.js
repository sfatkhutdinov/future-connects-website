/**
 * Future Connects - Accessible Color Palette
 * 
 * This color palette follows WCAG 2.1 AA standards for contrast ratios:
 * - Normal text (less than 18pt): minimum 4.5:1 contrast ratio
 * - Large text (18pt or 14pt bold): minimum 3:1 contrast ratio
 * - UI components and graphical objects: minimum 3:1 contrast ratio
 */

const colors = {
  // Primary brand colors
  primary: {
    50: '#EEF5FF',
    100: '#EFF6FF',
    200: '#BDD8FF',
    300: '#8FBDFF',
    400: '#5A99FF',
    500: '#60A5FA',
    600: '#3B82F6',
    700: '#2563EB',
    800: '#1E40AF',
    900: '#0A2463',
    950: '#142458',
  },
  
  // Neutrals
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },
  
  // Semantic colors for states and feedback
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16',
  },
  
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    950: '#451A03',
  },
  
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
  
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    950: '#172554',
  },
  
  // Contrast colors for text and backgrounds
  text: {
    primary: '#111827',    // High contrast for regular text
    secondary: '#374151',  // Medium contrast for less important text
    disabled: '#9CA3AF',   // Lower contrast for disabled text
    light: '#F9FAFB',      // Light text on dark backgrounds
  },
  
  background: {
    primary: '#FFFFFF',    // Main background
    secondary: '#F9FAFB',  // Secondary background
    accent: '#EFF6FF',     // Accent background (light blue)
  }
};

export default colors; 