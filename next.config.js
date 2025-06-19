/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  // For development, we'll comment out the export settings
  // Uncomment these for static export to Cloudflare Pages
  // output: 'export',
  // trailingSlash: true,
  // images: {
  //   unoptimized: true,
  // },
  
  // Security headers (these won't work with static export)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://*.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.future-connects.com; frame-src 'none'; object-src 'none'; base-uri 'self';",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
