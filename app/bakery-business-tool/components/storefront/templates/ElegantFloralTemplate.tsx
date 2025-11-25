'use client'

import React from 'react'
import Image from 'next/image'
import { Instagram, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import type { PublicMenu, MenuProduct } from '../../../types'

interface TemplateProps {
  menu: PublicMenu
  isPreview?: boolean
}

// Group products by category
const groupByCategory = (products: MenuProduct[], categories: string[]) => {
  const grouped: Record<string, MenuProduct[]> = {}
  
  // Initialize with empty arrays for each category
  categories.forEach(cat => {
    grouped[cat] = []
  })
  
  // Add products to their categories
  products
    .filter(p => p.isAvailable)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .forEach(product => {
      const category = product.category || 'Other'
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(product)
    })
  
  // Remove empty categories
  Object.keys(grouped).forEach(key => {
    if (grouped[key].length === 0) {
      delete grouped[key]
    }
  })
  
  return grouped
}

export default function ElegantFloralTemplate({ menu, isPreview = false }: TemplateProps) {
  const { branding, products, categories, contactInfo, showPrices, showContactInfo } = menu
  const groupedProducts = groupByCategory(products || [], categories || [])
  
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        backgroundColor: '#FDF8F5',
        fontFamily: "'Lora', serif",
      }}
    >
      {/* Watercolor floral corners - Top Left */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-40 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="floral1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A574" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8B4557" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E8D5C4" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <circle cx="30" cy="30" r="25" fill="url(#floral1)" />
          <circle cx="70" cy="50" r="35" fill="#8B4557" fillOpacity="0.2" />
          <circle cx="40" cy="80" r="20" fill="#D4A574" fillOpacity="0.3" />
          <ellipse cx="90" cy="20" rx="30" ry="15" fill="#E8D5C4" fillOpacity="0.4" />
          <path d="M10,60 Q40,30 70,70 T130,50" stroke="#8B4557" strokeWidth="1" fill="none" strokeOpacity="0.3" />
          <path d="M20,100 Q60,60 100,90" stroke="#D4A574" strokeWidth="1" fill="none" strokeOpacity="0.4" />
        </svg>
      </div>
      
      {/* Watercolor floral corners - Top Right */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-40 pointer-events-none transform rotate-90">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="170" cy="30" r="30" fill="#8B4557" fillOpacity="0.2" />
          <circle cx="140" cy="60" r="25" fill="#D4A574" fillOpacity="0.3" />
          <circle cx="180" cy="80" r="20" fill="#E8D5C4" fillOpacity="0.4" />
          <path d="M120,20 Q150,50 180,30" stroke="#8B4557" strokeWidth="1" fill="none" strokeOpacity="0.3" />
        </svg>
      </div>
      
      {/* Watercolor floral corners - Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-48 opacity-30 pointer-events-none">
        <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
          <ellipse cx="50" cy="90" rx="60" ry="30" fill="#8B4557" fillOpacity="0.3" />
          <ellipse cx="150" cy="85" rx="40" ry="25" fill="#D4A574" fillOpacity="0.4" />
          <ellipse cx="300" cy="95" rx="70" ry="35" fill="#E8D5C4" fillOpacity="0.3" />
          <ellipse cx="380" cy="80" rx="50" ry="30" fill="#8B4557" fillOpacity="0.2" />
        </svg>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 max-w-2xl mx-auto ${isPreview ? 'p-4' : 'p-6 sm:p-10'}`}>
        
        {/* Header */}
        <header className="text-center mb-10">
          {/* Logo */}
          {branding.logo && (
            <div className="mb-4 flex justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#D4A574] shadow-lg">
                <Image 
                  src={branding.logo} 
                  alt={branding.businessName}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
          
          {/* Business Name */}
          <h1 
            className="text-4xl sm:text-5xl font-bold mb-2 tracking-wide"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#8B4557',
            }}
          >
            {branding.businessName}
          </h1>
          
          {/* Tagline */}
          {branding.tagline && (
            <p 
              className="text-lg italic"
              style={{ color: '#D4A574' }}
            >
              {branding.tagline}
            </p>
          )}
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-6 mb-2">
            <div className="h-px w-16 bg-[#D4A574]" />
            <div className="mx-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8L12 2Z" fill="#D4A574" />
              </svg>
            </div>
            <div className="h-px w-16 bg-[#D4A574]" />
          </div>
        </header>

        {/* Menu Sections */}
        <main className="space-y-10">
          {Object.entries(groupedProducts).map(([category, items]) => (
            <section key={category}>
              {/* Category Header */}
              <div className="text-center mb-6">
                <h2 
                  className="text-2xl sm:text-3xl font-semibold inline-block px-6 py-2"
                  style={{ 
                    fontFamily: "'Playfair Display', serif",
                    color: '#8B4557',
                    borderBottom: '2px solid #D4A574',
                  }}
                >
                  {category}
                </h2>
              </div>
              
              {/* Products */}
              <div className="space-y-4">
                {items.map((product) => (
                  <div 
                    key={product.id}
                    className="flex items-start justify-between py-3 border-b border-[#E8D5C4] last:border-0"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <h3 
                          className="text-lg font-medium"
                          style={{ 
                            fontFamily: "'Playfair Display', serif",
                            color: '#3D3D3D',
                          }}
                        >
                          {product.name}
                        </h3>
                        {product.isFeatured && (
                          <span 
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ 
                              backgroundColor: '#D4A574',
                              color: '#FDF8F5',
                            }}
                          >
                            Popular
                          </span>
                        )}
                      </div>
                      {product.description && (
                        <p 
                          className="text-sm mt-1 italic"
                          style={{ color: '#6B6B6B' }}
                        >
                          {product.description}
                        </p>
                      )}
                    </div>
                    {showPrices && (
                      <div 
                        className="text-lg font-semibold whitespace-nowrap"
                        style={{ 
                          fontFamily: "'Playfair Display', serif",
                          color: '#8B4557',
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
          
          {/* Empty state */}
          {Object.keys(groupedProducts).length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: '#8B4557' }} className="text-lg italic">
                Menu items coming soon...
              </p>
            </div>
          )}
        </main>

        {/* Contact Section */}
        {showContactInfo && contactInfo && Object.values(contactInfo).some(v => v) && (
          <footer className="mt-12 pt-8 border-t-2 border-[#E8D5C4]">
            <h3 
              className="text-center text-xl mb-6"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                color: '#8B4557',
              }}
            >
              Get in Touch
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: '#3D3D3D' }}>
              {contactInfo.phone && (
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-2 hover:text-[#8B4557] transition-colors"
                >
                  <Phone size={16} className="text-[#D4A574]" />
                  {contactInfo.phone}
                </a>
              )}
              {contactInfo.email && (
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 hover:text-[#8B4557] transition-colors"
                >
                  <Mail size={16} className="text-[#D4A574]" />
                  {contactInfo.email}
                </a>
              )}
              {contactInfo.instagram && (
                <a 
                  href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#8B4557] transition-colors"
                >
                  <Instagram size={16} className="text-[#D4A574]" />
                  {contactInfo.instagram}
                </a>
              )}
              {contactInfo.whatsapp && (
                <a 
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#8B4557] transition-colors"
                >
                  <MessageCircle size={16} className="text-[#D4A574]" />
                  WhatsApp
                </a>
              )}
              {contactInfo.address && (
                <div className="flex items-center gap-2 w-full justify-center mt-2">
                  <MapPin size={16} className="text-[#D4A574]" />
                  {contactInfo.address}
                </div>
              )}
            </div>
          </footer>
        )}

        {/* Powered by */}
        {!isPreview && (
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: '#B8B8B8' }}>
              Powered by{' '}
              <a 
                href="https://bakeprofit.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#8B4557] transition-colors"
              >
                BakeProfit
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
