# Future Connects - Moving Company Website

This is the official website for Future Connects, LLC, a moving company serving the DMV (DC, Maryland, Virginia) area. The website is built using Next.js and Tailwind CSS, providing a modern, responsive user experience.

## Features

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Modern UI**: Clean, professional interface using Tailwind CSS
- **Interactive Forms**: Multi-step estimation form and contact forms
- **SEO Optimized**: Built with Next.js for excellent search engine optimization
- **Real-time Tracking**: Live tracking of moves with interactive maps
- **Address Autocomplete**: Google Maps integration for accurate address input

## Pages

- **Home**: Company introduction, services overview, and call-to-action
- **About**: Company story, mission, values, and team
- **Services**: Detailed information about residential and commercial moving services
- **Estimate**: Interactive form for getting a moving cost estimate
- **Contact**: Contact form and company information
- **Tracking**: Real-time tracking for ongoing moves with interactive maps
- **Dashboard** (Coming Soon): Customer account management and move history

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or later)
- npm (v8.0.0 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/future-connects/website.git
   cd future-connects-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_ENABLE_REAL_TIME_TRACKING=true
   NEXT_PUBLIC_ENABLE_ADDRESS_AUTOCOMPLETE=true
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Project Structure

- `/src/app`: Next.js app router pages
- `/src/components`: Reusable UI components
- `/src/lib`: Utility functions and custom hooks
- `/src/types`: TypeScript type definitions
- `/src/app/api`: API routes for backend functionality
- `/public`: Static assets like images and icons

## Key Components

- **Header**: Navigation component with mobile responsiveness
- **Footer**: Site footer with contact information and links
- **EstimateForm**: Multi-step form for getting moving quotes
- **ServiceCard**: Displays services with icons and descriptions
- **ContactForm**: Customer inquiry form
- **AddressAutocomplete**: Google Maps integration for address selection
- **MoveMap**: Interactive map showing origin, destination, and current location
- **TrackingDetails**: Displays detailed information about a move

## API Routes

- **/api/contact**: Handles contact form submissions
- **/api/estimate**: Calculates moving cost estimates
- **/api/tracking/[id]**: Retrieves tracking information for a specific move

## Backend Integration

The website connects to a backend API for:
- Estimate calculations
- Contact form submissions
- Move tracking information

Future integrations planned:
- User authentication
- Booking management
- Payment processing

## Deployment

The website is configured to be deployed on Cloudflare Pages, with the following workflow:

1. Commit changes to the main branch
2. Automatic build and deployment via GitHub Actions
3. Release to production after testing

## License

This project is proprietary and confidential.
Copyright (c) 2024 Future Connects, LLC. All rights reserved.
