'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="mb-8">We're here to answer any questions you may have about our moving services.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm fw-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm fw-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm fw-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm fw-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm fw-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div>
              <h3 className="text-lg fw-medium mb-2">Our Office</h3>
              <p className="text-gray-700">
                1234 Moving Lane<br />
                Washington, DC 20001
              </p>
            </div>
            
            <div>
              <h3 className="text-lg fw-medium mb-2">Phone</h3>
              <p className="text-gray-700">
                (202) 555-0123<br />
                Mon-Fri: 8am-6pm, Sat: 9am-3pm
              </p>
            </div>
            
            <div>
              <h3 className="text-lg fw-medium mb-2">Email</h3>
              <p className="text-gray-700">
                info@futureconnectsmovers.com<br />
                support@futureconnectsmovers.com
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg fw-medium mb-2">How far in advance should I book my move?</h3>
                <p className="text-gray-700">
                  We recommend booking at least 2-3 weeks in advance, especially during the busy summer months. For moves during peak times, booking 4-6 weeks ahead is ideal.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg fw-medium mb-2">Do you provide packing materials?</h3>
                <p className="text-gray-700">
                  Yes, we offer a range of packing materials including boxes, bubble wrap, and packing paper. These can be included in your package or purchased separately.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg fw-medium mb-2">What areas do you serve?</h3>
                <p className="text-gray-700">
                  We primarily serve the Washington DC, Maryland, and Virginia (DMV) area, but we also handle long-distance moves across the East Coast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
        <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
          Map Placeholder - Google Maps Integration
        </div>
      </div>
    </div>
  );
} 