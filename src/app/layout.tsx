import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Future Connects - Moving, Wedding Beauty & Party Entertainment | DMV Maryland',
  description: 'Professional moving services, wedding hair & makeup, and party entertainment in Maryland, DC & Virginia. Family-owned business with transparent pricing. Call for free quotes!',
  keywords: 'moving services Maryland, wedding hair DMV, party entertainment Virginia, movers DC, bridal makeup, balloon artist, family business',
  authors: [{ name: 'Future Connects' }],
  creator: 'Future Connects',
  publisher: 'Future Connects',
  robots: 'index, follow',
  openGraph: {
    title: 'Future Connects - DMV Family Services',
    description: 'Professional moving, wedding beauty & party entertainment services in Maryland, DC & Virginia',
    type: 'website',
    url: 'https://future-connects.com',
    siteName: 'Future Connects',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Future Connects - DMV Family Services',
    description: 'Professional moving, wedding beauty & party entertainment services in Maryland, DC & Virginia',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="US-MD" />
        <meta name="geo.placename" content="Maryland, Washington DC, Virginia" />
        <link rel="canonical" href="https://future-connects.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Future Connects",
              "description": "Professional moving, wedding beauty and party entertainment services",
              "url": "https://future-connects.com",
              "telephone": "See website for service-specific numbers",
              "email": "contact@future-connects.com",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "MD",
                "addressCountry": "US"
              },
              "areaServed": ["Maryland", "Washington DC", "Virginia"],
              "sameAs": [
                "https://www.facebook.com/futureconnects",
                "https://www.instagram.com/futureconnects"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Future Connects Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Moving Services",
                      "description": "Professional residential and commercial moving"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Wedding Beauty Services",
                      "description": "Bridal hair styling and makeup"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Party Entertainment",
                      "description": "Balloon artistry and children's party entertainment"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
