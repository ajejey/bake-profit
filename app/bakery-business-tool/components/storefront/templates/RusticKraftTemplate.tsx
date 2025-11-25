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
  
  categories.forEach(cat => {
    grouped[cat] = []
  })
  
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
  
  Object.keys(grouped).forEach(key => {
    if (grouped[key].length === 0) {
      delete grouped[key]
    }
  })
  
  return grouped
}

export default function RusticKraftTemplate({ menu, isPreview = false }: TemplateProps) {
  const { branding, products, categories, contactInfo, showPrices, showContactInfo } = menu
  const groupedProducts = groupByCategory(products || [], categories || [])
  
  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        backgroundColor: '#EFEBE9',
        fontFamily: "'Josefin Sans', sans-serif",
        // Kraft paper texture effect
        backgroundImage: `
          radial-gradient(ellipse at 20% 30%, rgba(93, 64, 55, 0.03) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(141, 110, 99, 0.05) 0%, transparent 50%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")
        `,
      }}
    >
      {/* Hand-drawn border effect */}
      <div className="absolute inset-4 sm:inset-8 border-2 border-dashed border-[#8D6E63]/30 rounded-lg pointer-events-none" />
      
      {/* Corner decorations */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 w-12 h-12 opacity-40">
        <svg viewBox="0 0 50 50" className="w-full h-full">
          <path d="M5,25 Q5,5 25,5" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="25" cy="5" r="3" fill="#8D6E63" />
          <circle cx="5" cy="25" r="3" fill="#8D6E63" />
        </svg>
      </div>
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 w-12 h-12 opacity-40 transform rotate-90">
        <svg viewBox="0 0 50 50" className="w-full h-full">
          <path d="M5,25 Q5,5 25,5" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="25" cy="5" r="3" fill="#8D6E63" />
          <circle cx="5" cy="25" r="3" fill="#8D6E63" />
        </svg>
      </div>
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 w-12 h-12 opacity-40 transform -rotate-90">
        <svg viewBox="0 0 50 50" className="w-full h-full">
          <path d="M5,25 Q5,5 25,5" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="25" cy="5" r="3" fill="#8D6E63" />
          <circle cx="5" cy="25" r="3" fill="#8D6E63" />
        </svg>
      </div>
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-12 h-12 opacity-40 transform rotate-180">
        <svg viewBox="0 0 50 50" className="w-full h-full">
          <path d="M5,25 Q5,5 25,5" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="25" cy="5" r="3" fill="#8D6E63" />
          <circle cx="5" cy="25" r="3" fill="#8D6E63" />
        </svg>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 max-w-2xl mx-auto ${isPreview ? 'p-6' : 'p-8 sm:p-12'}`}>
        
        {/* Header */}
        <header className="text-center mb-10">
          {/* Logo */}
          {branding.logo && (
            <div className="mb-6 flex justify-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#5D4037] shadow-lg bg-white p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image 
                    src={branding.logo} 
                    alt={branding.businessName}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Business Name - Hand-drawn style */}
          <h1 
            className="text-4xl sm:text-6xl font-bold mb-3"
            style={{ 
              fontFamily: "'Amatic SC', cursive",
              color: '#5D4037',
              letterSpacing: '0.05em',
            }}
          >
            {branding.businessName}
          </h1>
          
          {/* Tagline */}
          {branding.tagline && (
            <p 
              className="text-lg tracking-wide"
              style={{ color: '#8D6E63' }}
            >
              ✦ {branding.tagline} ✦
            </p>
          )}
          
          {/* Decorative wheat/grain illustration */}
          <div className="flex justify-center mt-6">
            <svg width="120" height="30" viewBox="0 0 120 30" className="opacity-50">
              <path d="M0,15 L40,15" stroke="#8D6E63" strokeWidth="1" />
              <path d="M80,15 L120,15" stroke="#8D6E63" strokeWidth="1" />
              <ellipse cx="60" cy="8" rx="8" ry="5" fill="#8D6E63" transform="rotate(-30 60 8)" />
              <ellipse cx="60" cy="8" rx="8" ry="5" fill="#8D6E63" transform="rotate(30 60 8)" />
              <ellipse cx="60" cy="15" rx="6" ry="4" fill="#8D6E63" transform="rotate(-20 60 15)" />
              <ellipse cx="60" cy="15" rx="6" ry="4" fill="#8D6E63" transform="rotate(20 60 15)" />
              <ellipse cx="60" cy="22" rx="5" ry="3" fill="#8D6E63" transform="rotate(-10 60 22)" />
              <ellipse cx="60" cy="22" rx="5" ry="3" fill="#8D6E63" transform="rotate(10 60 22)" />
            </svg>
          </div>
        </header>

        {/* Menu Sections */}
        <main className="space-y-10">
          {Object.entries(groupedProducts).map(([category, items]) => (
            <section key={category}>
              {/* Category Header - Chalkboard style */}
              <div className="text-center mb-6">
                <div 
                  className="inline-block px-8 py-3 rounded-sm"
                  style={{ 
                    backgroundColor: '#5D4037',
                    boxShadow: '3px 3px 0 #3E2723',
                  }}
                >
                  <h2 
                    className="text-2xl sm:text-3xl text-white"
                    style={{ 
                      fontFamily: "'Amatic SC', cursive",
                      letterSpacing: '0.1em',
                    }}
                  >
                    {category}
                  </h2>
                </div>
              </div>
              
              {/* Products - Handwritten list style */}
              <div className="space-y-3">
                {items.map((product, index) => (
                  <div 
                    key={product.id}
                    className="flex items-center gap-4 py-3 px-4 rounded-lg transition-colors hover:bg-[#D7CCC8]/50"
                    style={{
                      borderBottom: index < items.length - 1 ? '1px dashed #D7CCC8' : 'none',
                    }}
                  >
                    {/* Bullet point */}
                    <span className="text-[#8D6E63] text-xl">•</span>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 
                          className="text-xl"
                          style={{ 
                            fontFamily: "'Amatic SC', cursive",
                            color: '#3E2723',
                            fontWeight: 700,
                          }}
                        >
                          {product.name}
                        </h3>
                        {product.isFeatured && (
                          <span className="text-xs px-2 py-0.5 bg-[#8D6E63] text-white rounded">
                            ★ Favorite
                          </span>
                        )}
                      </div>
                      {product.description && (
                        <p 
                          className="text-sm mt-0.5"
                          style={{ color: '#8D6E63' }}
                        >
                          {product.description}
                        </p>
                      )}
                    </div>
                    
                    {showPrices && (
                      <div className="flex items-center gap-2">
                        {/* Dotted line to price */}
                        <span className="hidden sm:block text-[#D7CCC8] tracking-widest">
                          ........
                        </span>
                        <span 
                          className="text-xl font-bold whitespace-nowrap"
                          style={{ 
                            fontFamily: "'Amatic SC', cursive",
                            color: '#5D4037',
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </span>
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
              <p 
                className="text-2xl"
                style={{ 
                  fontFamily: "'Amatic SC', cursive",
                  color: '#8D6E63',
                }}
              >
                Fresh items coming soon from our kitchen...
              </p>
            </div>
          )}
        </main>

        {/* Contact Section */}
        {showContactInfo && Object.values(contactInfo).some(v => v) && (
          <footer className="mt-12 pt-8 border-t-2 border-dashed border-[#D7CCC8]">
            <h3 
              className="text-center text-2xl mb-6"
              style={{ 
                fontFamily: "'Amatic SC', cursive",
                color: '#5D4037',
              }}
            >
              Come Say Hello!
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: '#5D4037' }}>
              {contactInfo.phone && (
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-2 px-4 py-2 bg-[#D7CCC8] rounded-full hover:bg-[#BCAAA4] transition-colors"
                >
                  <Phone size={16} />
                  {contactInfo.phone}
                </a>
              )}
              {contactInfo.email && (
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 px-4 py-2 bg-[#D7CCC8] rounded-full hover:bg-[#BCAAA4] transition-colors"
                >
                  <Mail size={16} />
                  Email
                </a>
              )}
              {contactInfo.instagram && (
                <a 
                  href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#D7CCC8] rounded-full hover:bg-[#BCAAA4] transition-colors"
                >
                  <Instagram size={16} />
                  {contactInfo.instagram}
                </a>
              )}
              {contactInfo.whatsapp && (
                <a 
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#D7CCC8] rounded-full hover:bg-[#BCAAA4] transition-colors"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              )}
            </div>
            {contactInfo.address && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm" style={{ color: '#8D6E63' }}>
                <MapPin size={16} />
                {contactInfo.address}
              </div>
            )}
          </footer>
        )}

        {/* Powered by */}
        {!isPreview && (
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: '#BCAAA4' }}>
              Powered by{' '}
              <a 
                href="https://bakeprofit.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#5D4037] transition-colors"
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
