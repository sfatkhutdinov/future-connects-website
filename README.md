# Future Connects Movers Website

This repository contains the source code for the Future Connects Movers website, a professional moving company offering residential and commercial moving services.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Development](#development)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)

## Overview

The Future Connects Movers website is built using Next.js with TypeScript and features a modern, responsive design. It includes various pages for services, contact information, and a moving cost estimator.

## Features

- Modern, responsive design with Tailwind CSS
- Moving cost calculator
- Contact form
- Service information pages
- Performance optimized with Next.js

## Getting Started

To get started with the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/sfatkhutdinov/future-connects-website.git
   cd future-connects-website
   ```

2. Navigate to the website directory and install dependencies:
   ```bash
   cd future-connects-movers
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the site in your browser

## Development

- The website is built with Next.js 14+ and TypeScript
- Styling is done with Tailwind CSS
- Components are organized in the `src/components` directory
- Pages are defined in the `src/app` directory (using App Router)
- Tests are written with Jest and React Testing Library

## Project Structure

```
./
├── future-connects-movers/  # Main website directory
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── app/           # App router pages and API routes
│   │   │   ├── about/     # About page
│   │   │   ├── api/       # API endpoints
│   │   │   ├── booking/   # Booking pages
│   │   │   ├── contact/   # Contact page
│   │   │   ├── dashboard/ # User dashboard
│   │   │   ├── estimate/  # Moving estimate calculator
│   │   │   ├── services/  # Services pages
│   │   │   └── tracking/  # Move tracking functionality
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utility functions and shared logic
│   │   ├── styles/        # Global styles and Tailwind configuration
│   │   ├── types/         # TypeScript type definitions
│   │   └── __tests__/     # Unit and integration tests
│   ├── .env.local         # Environment variables (not committed to Git)
│   ├── package.json       # Dependencies and scripts
│   └── README.md          # This file
└── .git/                  # Git repository data
```

## Testing

Run tests with:

```bash
npm test
```

For continuous testing during development:

```bash
npm run test:watch
```

## Deployment

The website is configured for deployment on Vercel or similar platforms.

To build for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run start
``` 