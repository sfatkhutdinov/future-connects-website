'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#areas', label: 'Service Areas' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          >
            Future Connects
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-dark hover:text-primary font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              href="#contact"
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col space-y-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`w-6 h-0.5 bg-dark transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-dark transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-dark transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
          <div className="py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-dark hover:text-primary font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="block bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold text-center mt-4 hover:shadow-lg transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Quote
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
