# Swift Movers Website

This repository contains the source code for the Swift Movers website, a professional moving company offering residential and commercial moving services.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Development](#development)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)

## Overview

The Swift Movers website is built using Next.js with TypeScript and features a modern, responsive design. It includes various pages for services, contact information, and a moving cost estimator.

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
   git clone https://github.com/yourusername/swift_movers.git
   cd swift_movers/website
   ```

2. Install dependencies:
   ```bash
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
website/
├── public/          # Static assets
├── src/
│   ├── app/         # App router pages and API routes
│   ├── components/  # Reusable UI components
│   ├── lib/         # Utility functions and shared logic
│   ├── styles/      # Global styles and Tailwind configuration
│   ├── types/       # TypeScript type definitions
│   └── __tests__/   # Unit and integration tests
├── .env.local       # Environment variables (not committed to Git)
├── package.json     # Dependencies and scripts
└── README.md        # This file
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