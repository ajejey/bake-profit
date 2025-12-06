'use client'

import React from 'react'
import Image from 'next/image'
import { Instagram, Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react'
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

export default function ModernMinimalTemplate({ menu, isPreview = false }: TemplateProps) {
  const { branding, products, categories, contactInfo, showPrices, showContactInfo, acceptingOrders } = menu
  const groupedProducts = groupByCategory(products || [], categories || [])
  
  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: '#FFFFFF',
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      {/* Hero Header */}
      <header className="relative bg-[#1A1A1A] text-white overflow-hidden">
        {/* Geometric accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F43F5E] transform skew-x-[-12deg] translate-x-1/4 opacity-90" />
        
        <div className={`relative z-10 max-w-4xl mx-auto ${isPreview ? 'px-4 py-8' : 'px-6 py-12 sm:py-16'}`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Logo */}
            {branding.logo && (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-white shadow-xl flex-shrink-0">
                <Image 
                  src={branding.logo} 
                  alt={branding.businessName}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            
            <div className="text-center sm:text-left">
              {/* Business Name */}
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {branding.businessName}
              </h1>
              
              {/* Tagline */}
              {branding.tagline && (
                <p className="text-lg mt-2 text-gray-300 font-light">
                  {branding.tagline}
                </p>
              )}
              
              {/* Order status badge */}
              {acceptingOrders && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#F43F5E] rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Now Accepting Orders
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`max-w-4xl mx-auto ${isPreview ? 'p-4' : 'p-6 sm:p-10'}`}>
        
        {/* Menu Grid */}
        <div className="space-y-12">
          {Object.entries(groupedProducts).map(([category, items]) => (
            <section key={category}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <h2 
                  className="text-2xl font-bold text-[#1A1A1A]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {category}
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm text-gray-400 font-medium">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              
              {/* Products Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((product) => (
                  <div 
                    key={product.id}
                    className={`group relative p-5 rounded-xl border-2 transition-all duration-200 ${
                      product.isFeatured 
                        ? 'border-[#F43F5E] bg-[#FEE2E2]/30' 
                        : 'border-gray-100 hover:border-[#F43F5E]/50 bg-white'
                    }`}
                  >
                    {/* Featured badge */}
                    {product.isFeatured && (
                      <div className="absolute -top-3 left-4 px-3 py-1 bg-[#F43F5E] text-white text-xs font-bold rounded-full">
                        BESTSELLER
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 
                          className="text-lg font-semibold text-[#1A1A1A] group-hover:text-[#F43F5E] transition-colors"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>
                      
                      {showPrices && (
                        <div 
                          className="text-xl font-bold text-[#1A1A1A] whitespace-nowrap"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          ${product.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                    
                    {/* Hover arrow */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={20} className="text-[#F43F5E]" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
          
          {/* Empty state */}
          {Object.keys(groupedProducts).length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                <span className="text-2xl">🧁</span>
              </div>
              <p className="text-gray-500 text-lg">
                Menu items coming soon...
              </p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        {showContactInfo && Object.values(contactInfo).some(v => v) && (
          <footer className="mt-16 p-8 bg-[#1A1A1A] rounded-2xl text-white">
            <h3 
              className="text-xl font-bold mb-6 text-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Let&apos;s Connect
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {contactInfo.phone && (
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/10 hover:bg-[#F43F5E] transition-colors"
                >
                  <Phone size={24} />
                  <span className="text-xs text-center">Call</span>
                </a>
              )}
              {contactInfo.email && (
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/10 hover:bg-[#F43F5E] transition-colors"
                >
                  <Mail size={24} />
                  <span className="text-xs text-center">Email</span>
                </a>
              )}
              {contactInfo.instagram && (
                <a 
                  href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/10 hover:bg-[#F43F5E] transition-colors"
                >
                  <Instagram size={24} />
                  <span className="text-xs text-center">Instagram</span>
                </a>
              )}
              {contactInfo.whatsapp && (
                <a 
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/10 hover:bg-[#F43F5E] transition-colors"
                >
                  <MessageCircle size={24} />
                  <span className="text-xs text-center">WhatsApp</span>
                </a>
              )}
            </div>
            
            {contactInfo.address && (
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-300 text-sm">
                <MapPin size={16} />
                {contactInfo.address}
              </div>
            )}
          </footer>
        )}

        {/* Powered by */}
        {!isPreview && (
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Powered by{' '}
              <a 
                href="https://bakeprofit.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#F43F5E] transition-colors font-medium"
              >
                BakeProfit
              </a>
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
