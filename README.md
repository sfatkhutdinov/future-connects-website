# Future Connects Website

A modern, responsive website for Future Connects - your trusted family service provider in the DMV area (Maryland, DC, Virginia). Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Framework**: Built with Next.js 15 and TypeScript for type safety and excellent developer experience
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Performance Optimized**: SSR/SSG ready, image optimization, and modern web standards
- **SEO Friendly**: Structured data, meta tags, and accessibility features
- **Security Focused**: Content Security Policy, security headers, and best practices
- **Deployment Ready**: Optimized for Cloudflare Pages with edge computing

## 🏗️ Services

- **Moving Services**: Residential & commercial moving throughout the DMV area
- **Wedding Beauty**: Professional bridal hair styling and makeup
- **Party Entertainment**: Balloon artistry and children's party entertainment

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd future-connects-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your specific values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static files for deployment

## 🏗️ Project Structure

```
future-connects-website/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation header
│   │   └── Hero.tsx         # Hero section
│   └── styles/              # Global styles
│       └── globals.css      # Global CSS with Tailwind
├── public/                  # Static assets
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary**: #2563eb (Blue)
- **Secondary**: #7c3aed (Purple)
- **Accent**: #ec4899 (Pink)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Dark**: #1e293b (Slate)

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Responsive**: Scales from mobile to desktop
- **Accessibility**: WCAG 2.1 compliant contrast ratios

## 🚀 Deployment

### Cloudflare Pages (Recommended)

1. **Build for static export**
   ```bash
   # Update next.config.js to enable static export
   npm run build
   ```

2. **Deploy to Cloudflare Pages**
   - Connect your Git repository
   - Set build command: `npm run build`
   - Set output directory: `out`

### Other Platforms

- **Vercel**: Automatic deployment with `vercel`
- **Netlify**: Drag & drop the `out` folder
- **Traditional Hosting**: Upload the `out` folder contents

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://future-connects.com
NEXT_PUBLIC_CONTACT_EMAIL=contact@future-connects.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Form Handling (Optional)
NEXT_PUBLIC_FORM_ENDPOINT=your-form-endpoint
```

### Next.js Configuration

The `next.config.js` file includes:
- Security headers
- Image optimization settings
- Export configuration for static deployment
- CSP (Content Security Policy) headers

## 🎯 Roadmap

Following the [technical roadmap](./roadmap.md):

### Phase 1: Foundation (Current)
- ✅ Next.js + TypeScript migration
- ✅ Component-based architecture
- ✅ Tailwind CSS integration
- ✅ Responsive design
- ✅ SEO optimization

### Phase 2: Enhancement
- [ ] Form handling with backend integration
- [ ] Advanced animations with Framer Motion
- [ ] PWA features
- [ ] Performance optimizations
- [ ] Analytics integration

### Phase 3: Advanced Features
- [ ] Multi-subsite architecture
- [ ] Customer portal
- [ ] Live chat integration
- [ ] AI-powered features
- [ ] Advanced security features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Support

For questions or support:
- Email: contact@future-connects.com
- Phone: See website for service-specific numbers
- Service Areas: Maryland, Washington DC, Virginia

---

**Future Connects** - Your trusted family for life's big moments. 🏡💍🎉
