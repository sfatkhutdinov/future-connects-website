import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-accent text-white py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Your Trusted Family for{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Life&apos;s Big Moments
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 font-light max-w-3xl mx-auto animate-slide-up">
            Professional moving services, wedding beauty, and party entertainment 
            throughout Maryland, DC & Virginia. Family-owned, trusted, and transparent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
            <Link
              href="#contact"
              className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 min-w-[200px]"
            >
              Get Free Quote
            </Link>
            <Link
              href="#services"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 min-w-[200px]"
            >
              View Services
            </Link>
          </div>

          {/* Service Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Moving Services</h3>
              <p className="text-white/80 text-sm">Professional residential & commercial moving</p>
              <Link href="#services" className="inline-block mt-3 text-yellow-300 hover:text-yellow-200 transition-colors font-medium">
                Learn More →
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group">
              <div className="text-4xl mb-3">💄</div>
              <h3 className="text-xl font-semibold mb-2">Wedding Beauty</h3>
              <p className="text-white/80 text-sm">Bridal hair styling & makeup artistry</p>
              <Link href="#services" className="inline-block mt-3 text-yellow-300 hover:text-yellow-200 transition-colors font-medium">
                Learn More →
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group">
              <div className="text-4xl mb-3">🎈</div>
              <h3 className="text-xl font-semibold mb-2">Party Entertainment</h3>
              <p className="text-white/80 text-sm">Balloon artistry & children&apos;s entertainment</p>
              <Link href="#services" className="inline-block mt-3 text-yellow-300 hover:text-yellow-200 transition-colors font-medium">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
