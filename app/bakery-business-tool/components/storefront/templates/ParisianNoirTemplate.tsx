'use client'

import React from 'react'
import Image from 'next/image'
import { Instagram, Phone, Mail, MapPin, MessageCircle, Sparkles } from 'lucide-react'
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

// Art Deco decorative corner component
const ArtDecoCorner = ({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {
  const rotations = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-left': '-rotate-90',
    'bottom-right': 'rotate-180',
  }
  
  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  }
  
  return (
    <div className={`absolute ${positions[position]} w-24 h-24 pointer-events-none opacity-60 ${rotations[position]}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Art Deco geometric pattern */}
        <path 
          d="M0,0 L40,0 L40,5 L5,5 L5,40 L0,40 Z" 
          fill="#C9A962"
        />
        <path 
          d="M0,0 L30,0 L30,3 L3,3 L3,30 L0,30 Z" 
          fill="none"
          stroke="#C9A962"
          strokeWidth="0.5"
          transform="translate(8, 8)"
        />
        {/* Fan/sunburst detail */}
        <g transform="translate(15, 15)">
          <line x1="0" y1="0" x2="20" y2="20" stroke="#C9A962" strokeWidth="0.5" />
          <line x1="0" y1="5" x2="15" y2="20" stroke="#C9A962" strokeWidth="0.5" />
          <line x1="5" y1="0" x2="20" y2="15" stroke="#C9A962" strokeWidth="0.5" />
          <line x1="0" y1="10" x2="10" y2="20" stroke="#C9A962" strokeWidth="0.5" />
          <line x1="10" y1="0" x2="20" y2="10" stroke="#C9A962" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  )
}

// Decorative divider
const ArtDecoDivider = () => (
  <div className="flex items-center justify-center gap-4 my-8">
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A962]" />
    <svg width="40" height="20" viewBox="0 0 40 20" className="text-[#C9A962]">
      <path 
        d="M0,10 L10,0 L20,10 L30,0 L40,10 L30,20 L20,10 L10,20 Z" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
      />
      <circle cx="20" cy="10" r="3" fill="currentColor" />
    </svg>
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A962]" />
  </div>
)

// Category divider with elegant typography
const CategoryDivider = ({ title }: { title: string }) => (
  <div className="relative py-8">
    {/* Top line with diamonds */}
    <div className="flex items-center justify-center gap-2">
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent via-[#C9A962] to-[#C9A962]" />
      <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#C9A962]">
        <rect x="6" y="0" width="6" height="6" transform="rotate(45, 6, 6)" fill="currentColor" />
      </svg>
      <svg width="8" height="8" viewBox="0 0 8 8" className="text-[#C9A962]">
        <rect x="4" y="0" width="4" height="4" transform="rotate(45, 4, 4)" fill="currentColor" />
      </svg>
      <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#C9A962]">
        <rect x="6" y="0" width="6" height="6" transform="rotate(45, 6, 6)" fill="currentColor" />
      </svg>
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent via-[#C9A962] to-[#C9A962]" />
    </div>
    
    {/* Category title */}
    <h2 
      className="text-center text-2xl sm:text-3xl tracking-[0.3em] uppercase mt-4 mb-2"
      style={{ 
        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
        color: '#C9A962',
        fontWeight: 300,
        letterSpacing: '0.25em',
      }}
    >
      {title}
    </h2>
    
    {/* Bottom decorative element */}
    <div className="flex items-center justify-center mt-2">
      <svg width="60" height="10" viewBox="0 0 60 10" className="text-[#C9A962]">
        <path 
          d="M0,5 L15,5 M20,5 L25,0 L30,5 L35,0 L40,5 M45,5 L60,5" 
          stroke="currentColor" 
          strokeWidth="1" 
          fill="none"
        />
      </svg>
    </div>
  </div>
)

export default function ParisianNoirTemplate({ menu, isPreview = false }: TemplateProps) {
  const { branding, products, categories, contactInfo, showPrices, showContactInfo, acceptingOrders } = menu
  const groupedProducts = groupByCategory(products || [], categories || [])
  
  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        backgroundColor: '#0D0D0D',
        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
      }}
    >
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A962' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Art Deco corners */}
      <ArtDecoCorner position="top-left" />
      <ArtDecoCorner position="top-right" />
      <ArtDecoCorner position="bottom-left" />
      <ArtDecoCorner position="bottom-right" />
      
      {/* Main content */}
      <div className={`relative z-10 max-w-2xl mx-auto ${isPreview ? 'p-4' : 'p-6 sm:p-12'}`}>
        
        {/* Header */}
        <header className="text-center pt-8 pb-4">
          {/* Top decorative line */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#C9A962]" />
            <div className="mx-4 flex gap-1">
              {[...Array(3)].map((_, i) => (
                <svg key={i} width="8" height="8" viewBox="0 0 8 8" className="text-[#C9A962]">
                  <rect x="4" y="0" width="4" height="4" transform="rotate(45, 4, 4)" fill="currentColor" />
                </svg>
              ))}
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#C9A962]" />
          </div>
          
          {/* Logo */}
          {branding.logo && (
            <div className="mb-6 flex justify-center">
              <div 
                className="w-28 h-28 rounded-full overflow-hidden"
                style={{
                  border: '2px solid #C9A962',
                  boxShadow: '0 0 0 4px #0D0D0D, 0 0 0 5px #C9A962',
                }}
              >
                <Image 
                  src={branding.logo} 
                  alt={branding.businessName}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
          
          {/* Business Name - Elegant typography */}
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl tracking-[0.15em] uppercase"
            style={{ 
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              color: '#FAFAFA',
              fontWeight: 300,
              textShadow: '0 2px 20px rgba(201, 169, 98, 0.2)',
            }}
          >
            {branding.businessName}
          </h1>
          
          {/* Tagline */}
          {branding.tagline && (
            <p 
              className="text-lg sm:text-xl mt-4 tracking-[0.2em] uppercase"
              style={{ 
                color: '#C9A962',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '0.15em',
              }}
            >
              {branding.tagline}
            </p>
          )}
          
          {/* Accepting orders badge */}
          {acceptingOrders && (
            <div className="mt-6 inline-flex items-center gap-2 px-6 py-2 border border-[#C9A962] rounded-none">
              <Sparkles size={14} className="text-[#C9A962]" />
              <span 
                className="text-sm tracking-[0.2em] uppercase"
                style={{ color: '#C9A962' }}
              >
                Now Accepting Orders
              </span>
            </div>
          )}
          
          <ArtDecoDivider />
        </header>

        {/* Menu Sections */}
        <main>
          {Object.entries(groupedProducts).map(([category, items], categoryIndex) => (
            <section key={category}>
              {categoryIndex > 0 && <div className="h-8" />}
              
              <CategoryDivider title={category} />
              
              {/* Products */}
              <div className="space-y-6 px-4">
                {items.map((product, index) => (
                  <div 
                    key={product.id}
                    className="group"
                  >
                    {/* Product row */}
                    <div className="flex items-baseline gap-4">
                      {/* Product name */}
                      <h3 
                        className="text-xl sm:text-2xl flex-shrink-0"
                        style={{ 
                          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                          color: '#FAFAFA',
                          fontWeight: 500,
                        }}
                      >
                        {product.name}
                        {product.isFeatured && (
                          <span 
                            className="ml-3 text-xs tracking-[0.2em] uppercase px-2 py-1 align-middle"
                            style={{ 
                              color: '#0D0D0D',
                              backgroundColor: '#C9A962',
                              fontWeight: 600,
                            }}
                          >
                            Signature
                          </span>
                        )}
                      </h3>
                      
                      {/* Dotted line */}
                      <div 
                        className="flex-1 border-b border-dotted opacity-30 mb-2"
                        style={{ borderColor: '#C9A962' }}
                      />
                      
                      {/* Price */}
                      {showPrices && (
                        <span 
                          className="text-xl sm:text-2xl flex-shrink-0"
                          style={{ 
                            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                            color: '#C9A962',
                            fontWeight: 400,
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    {/* Description */}
                    {product.description && (
                      <p 
                        className="mt-2 text-sm sm:text-base pl-0 max-w-lg"
                        style={{ 
                          color: '#888888',
                          fontStyle: 'italic',
                          fontWeight: 300,
                          lineHeight: 1.6,
                        }}
                      >
                        {product.description}
                      </p>
                    )}
                    
                    {/* Subtle separator for non-last items */}
                    {index < items.length - 1 && (
                      <div className="flex justify-center mt-6">
                        <svg width="20" height="6" viewBox="0 0 20 6" className="text-[#C9A962] opacity-30">
                          <circle cx="3" cy="3" r="1.5" fill="currentColor" />
                          <circle cx="10" cy="3" r="1.5" fill="currentColor" />
                          <circle cx="17" cy="3" r="1.5" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
          
          {/* Empty state */}
          {Object.keys(groupedProducts).length === 0 && (
            <div className="text-center py-16">
              <div className="mb-4">
                <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto text-[#C9A962] opacity-50">
                  <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M20,25 Q30,15 40,25 Q30,35 20,25" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="30" cy="38" r="3" fill="currentColor" />
                </svg>
              </div>
              <p 
                className="text-lg tracking-[0.15em] uppercase"
                style={{ color: '#C9A962' }}
              >
                Menu Coming Soon
              </p>
            </div>
          )}
        </main>

        {/* Contact Section */}
        {showContactInfo && contactInfo && Object.values(contactInfo).some(v => v) && (
          <footer className="mt-16 pt-8">
            <ArtDecoDivider />
            
            <h3 
              className="text-center text-xl tracking-[0.3em] uppercase mb-8"
              style={{ 
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                color: '#C9A962',
                fontWeight: 300,
              }}
            >
              Contact
            </h3>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              {contactInfo.phone && (
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-3 group"
                  style={{ color: '#888888' }}
                >
                  <div 
                    className="w-10 h-10 flex items-center justify-center border transition-colors group-hover:bg-[#C9A962]"
                    style={{ borderColor: '#C9A962' }}
                  >
                    <Phone size={16} className="text-[#C9A962] group-hover:text-[#0D0D0D]" />
                  </div>
                  <span className="group-hover:text-[#C9A962] transition-colors tracking-wider">
                    {contactInfo.phone}
                  </span>
                </a>
              )}
              
              {contactInfo.email && (
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 group"
                  style={{ color: '#888888' }}
                >
                  <div 
                    className="w-10 h-10 flex items-center justify-center border transition-colors group-hover:bg-[#C9A962]"
                    style={{ borderColor: '#C9A962' }}
                  >
                    <Mail size={16} className="text-[#C9A962] group-hover:text-[#0D0D0D]" />
                  </div>
                  <span className="group-hover:text-[#C9A962] transition-colors tracking-wider">
                    {contactInfo.email}
                  </span>
                </a>
              )}
              
              {contactInfo.instagram && (
                <a 
                  href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                  style={{ color: '#888888' }}
                >
                  <div 
                    className="w-10 h-10 flex items-center justify-center border transition-colors group-hover:bg-[#C9A962]"
                    style={{ borderColor: '#C9A962' }}
                  >
                    <Instagram size={16} className="text-[#C9A962] group-hover:text-[#0D0D0D]" />
                  </div>
                  <span className="group-hover:text-[#C9A962] transition-colors tracking-wider">
                    {contactInfo.instagram}
                  </span>
                </a>
              )}
              
              {contactInfo.whatsapp && (
                <a 
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                  style={{ color: '#888888' }}
                >
                  <div 
                    className="w-10 h-10 flex items-center justify-center border transition-colors group-hover:bg-[#C9A962]"
                    style={{ borderColor: '#C9A962' }}
                  >
                    <MessageCircle size={16} className="text-[#C9A962] group-hover:text-[#0D0D0D]" />
                  </div>
                  <span className="group-hover:text-[#C9A962] transition-colors tracking-wider">
                    WhatsApp
                  </span>
                </a>
              )}
            </div>
            
            {contactInfo.address && (
              <div 
                className="mt-8 flex items-center justify-center gap-3 text-sm"
                style={{ color: '#888888' }}
              >
                <MapPin size={16} className="text-[#C9A962]" />
                <span className="tracking-wider">{contactInfo.address}</span>
              </div>
            )}
          </footer>
        )}

        {/* Powered by */}
        {!isPreview && (
          <div className="mt-12 pb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#333333]" />
              <svg width="8" height="8" viewBox="0 0 8 8" className="text-[#333333]">
                <rect x="4" y="0" width="4" height="4" transform="rotate(45, 4, 4)" fill="currentColor" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#333333]" />
            </div>
            <p className="text-xs tracking-[0.15em]" style={{ color: '#555555' }}>
              Crafted with{' '}
              <a 
                href="https://bakeprofit.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#C9A962] transition-colors"
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
