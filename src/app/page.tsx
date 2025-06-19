import Header from '@/components/Header'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main id="main-content">
      <Header />
      <Hero />
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
              Our Professional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From moving your home to making your wedding day perfect, we&apos;re here for life&apos;s important moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Moving Services */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-6xl mb-6 text-center">🚚</div>
              <h3 className="text-2xl font-bold text-dark mb-4 text-center">Moving Services</h3>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Residential Moving
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Commercial Moving
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Long Distance Moving
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Packing Services
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Storage Solutions
                </li>
              </ul>
              <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Get Moving Quote
              </button>
            </div>

            {/* Wedding Beauty */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-6xl mb-6 text-center">💄</div>
              <h3 className="text-2xl font-bold text-dark mb-4 text-center">Wedding Beauty</h3>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Bridal Hair Styling
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Wedding Makeup
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Bridal Party Services
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Trial Sessions
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Touch-up Services
                </li>
              </ul>
              <button className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
                Book Beauty Consult
              </button>
            </div>

            {/* Party Entertainment */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-6xl mb-6 text-center">🎈</div>
              <h3 className="text-2xl font-bold text-dark mb-4 text-center">Party Entertainment</h3>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Balloon Artistry
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Children&apos;s Parties
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Corporate Events
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Custom Decorations
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Event Planning
                </li>
              </ul>
              <button className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                Plan Your Party
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-dark mb-6">
                Family-Owned Business You Can Trust
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                For over a decade, Future Connects has been serving families throughout the DMV area with 
                professional, reliable, and affordable services. We understand that life&apos;s big moments 
                deserve careful attention and expert care.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our commitment to transparency, quality, and customer satisfaction has made us a trusted 
                name in Maryland, DC, and Virginia. We&apos;re not just service providers – we&apos;re your 
                neighbors, and we care about your experience.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-gray-600">Happy Families</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <div className="text-gray-600">States Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-2xl font-bold text-dark mb-4">Our Promise</h3>
                <p className="text-gray-600 mb-6">
                  We treat every client like family because we understand that trust is earned through 
                  consistent, quality service and transparent communication.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-success text-2xl mr-3">✓</span>
                    <span className="text-dark font-medium">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-success text-2xl mr-3">✓</span>
                    <span className="text-dark font-medium">Transparent Pricing</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-success text-2xl mr-3">✓</span>
                    <span className="text-dark font-medium">Satisfaction Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Your Free Quote Today</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Ready to get started? Contact us for a free, no-obligation quote for any of our services.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service Needed *
                  </label>
                  <select
                    id="service"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="" className="text-dark">Select a service</option>
                    <option value="moving" className="text-dark">Moving Services</option>
                    <option value="beauty" className="text-dark">Wedding Beauty</option>
                    <option value="party" className="text-dark">Party Entertainment</option>
                    <option value="multiple" className="text-dark">Multiple Services</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                    placeholder="Tell us about your needs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-primary py-4 rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">📍</div>
                    <div>
                      <h4 className="font-semibold mb-1">Service Areas</h4>
                      <p className="text-white/90">Maryland, Washington DC, Virginia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">📞</div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <p className="text-white/90">Call for service-specific numbers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">✉️</div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-white/90">contact@future-connects.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">⏰</div>
                    <div>
                      <h4 className="font-semibold mb-1">Hours</h4>
                      <p className="text-white/90">Mon-Fri: 8AM-8PM<br />Sat-Sun: 9AM-6PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-4">Why Choose Future Connects?</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-yellow-300 mr-3">⭐</span>
                    Family-owned and operated
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-300 mr-3">⭐</span>
                    Licensed and insured
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-300 mr-3">⭐</span>
                    Transparent, upfront pricing
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-300 mr-3">⭐</span>
                    Satisfaction guaranteed
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-300 mr-3">⭐</span>
                    Serving DMV for 10+ years
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                Future Connects
              </h3>
              <p className="text-gray-400 mb-4">
                Your trusted family for life&apos;s big moments. Professional services throughout the DMV area.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  📘
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  📷
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white transition-colors">Moving Services</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Wedding Beauty</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Party Entertainment</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Maryland, DC, Virginia</li>
                <li>contact@future-connects.com</li>
                <li>Licensed & Insured</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Future Connects. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
