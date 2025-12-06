'use client'

import React from 'react'
import Image from 'next/image'
import { Instagram, Phone, Mail, MapPin, MessageCircle, Sparkles, Heart } from 'lucide-react'
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

// Category icons
const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    'Cakes': '🎂',
    'Cupcakes': '🧁',
    'Cookies': '🍪',
    'Bread': '🍞',
    'Pastries': '🥐',
    'Pies': '🥧',
    'Donuts': '🍩',
    'Other': '✨',
  }
  return icons[category] || '✨'
}

export default function PlayfulPastelTemplate({ menu, isPreview = false }: TemplateProps) {
  const { branding, products, categories, contactInfo, showPrices, showContactInfo, acceptingOrders } = menu
  const groupedProducts = groupByCategory(products || [], categories || [])
  
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #FDF4FF 0%, #FCE7F3 50%, #FEF3C7 100%)',
        fontFamily: "'Quicksand', sans-serif",
      }}
    >
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#EC4899]/10 animate-pulse" />
        <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-[#8B5CF6]/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-[#FBBF24]/10 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-10 w-14 h-14 rounded-full bg-[#EC4899]/10 animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Sprinkles pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
          <defs>
            <pattern id="sprinkles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect x="10" y="20" width="4" height="12" rx="2" fill="#EC4899" transform="rotate(45 12 26)" />
              <rect x="50" y="10" width="4" height="12" rx="2" fill="#8B5CF6" transform="rotate(-30 52 16)" />
              <rect x="80" y="40" width="4" height="12" rx="2" fill="#FBBF24" transform="rotate(15 82 46)" />
              <rect x="30" y="70" width="4" height="12" rx="2" fill="#34D399" transform="rotate(-60 32 76)" />
              <rect x="70" y="80" width="4" height="12" rx="2" fill="#EC4899" transform="rotate(30 72 86)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sprinkles)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 max-w-2xl mx-auto ${isPreview ? 'p-4' : 'p-6 sm:p-10'}`}>
        
        {/* Header */}
        <header className="text-center mb-10">
          {/* Logo with fun border */}
          {branding.logo && (
            <div className="mb-6 flex justify-center">
              <div 
                className="w-28 h-28 rounded-3xl overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
                style={{ 
                  border: '4px solid #EC4899',
                  background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
                  padding: '3px',
                }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden bg-white">
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
          
          {/* Business Name */}
          <h1 
            className="text-4xl sm:text-5xl font-bold mb-2"
            style={{ 
              fontFamily: "'Pacifico', cursive",
              background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {branding.businessName}
          </h1>
          
          {/* Tagline */}
          {branding.tagline && (
            <p 
              className="text-lg font-medium flex items-center justify-center gap-2"
              style={{ color: '#8B5CF6' }}
            >
              <Sparkles size={18} className="text-[#FBBF24]" />
              {branding.tagline}
              <Sparkles size={18} className="text-[#FBBF24]" />
            </p>
          )}
          
          {/* Order status */}
          {acceptingOrders && (
            <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white rounded-full text-sm font-bold shadow-lg">
              <Heart size={16} className="animate-pulse" />
              Taking Orders!
            </div>
          )}
        </header>

        {/* Menu Sections */}
        <main className="space-y-10">
          {Object.entries(groupedProducts).map(([category, items]) => (
            <section key={category}>
              {/* Category Header */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-3xl">{getCategoryIcon(category)}</span>
                <h2 
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ 
                    fontFamily: "'Pacifico', cursive",
                    color: '#EC4899',
                  }}
                >
                  {category}
                </h2>
                <span className="text-3xl">{getCategoryIcon(category)}</span>
              </div>
              
              {/* Products - Card style */}
              <div className="grid gap-4">
                {items.map((product) => (
                  <div 
                    key={product.id}
                    className={`relative p-5 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      product.isFeatured 
                        ? 'bg-gradient-to-r from-[#FDF4FF] to-[#FCE7F3] border-2 border-[#EC4899]' 
                        : 'bg-white/80 backdrop-blur-sm'
                    }`}
                  >
                    {/* Featured badge */}
                    {product.isFeatured && (
                      <div className="absolute -top-3 -right-2 px-3 py-1 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-white text-xs font-bold rounded-full shadow-md transform rotate-3">
                        ⭐ Fan Favorite!
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 
                          className="text-lg font-bold"
                          style={{ color: '#4B5563' }}
                        >
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-sm text-gray-500 mt-1">
                            {product.description}
                          </p>
                        )}
                      </div>
                      
                      {showPrices && (
                        <div 
                          className="px-4 py-2 rounded-full font-bold text-white shadow-md"
                          style={{ 
                            background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
          
          {/* Empty state */}
          {Object.keys(groupedProducts).length === 0 && (
            <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-3xl">
              <div className="text-6xl mb-4">🧁</div>
              <p 
                className="text-xl font-bold"
                style={{ 
                  fontFamily: "'Pacifico', cursive",
                  color: '#EC4899',
                }}
              >
                Yummy treats coming soon!
              </p>
            </div>
          )}
        </main>

        {/* Contact Section */}
        {showContactInfo && Object.values(contactInfo).some(v => v) && (
          <footer className="mt-12 p-6 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
            <h3 
              className="text-center text-2xl mb-6 font-bold"
              style={{ 
                fontFamily: "'Pacifico', cursive",
                color: '#8B5CF6',
              }}
            >
              Let&apos;s Be Friends! 💕
            </h3>
            
            <div className="flex flex-wrap justify-center gap-3">
              {contactInfo.phone && (
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#EC4899] to-[#F472B6] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-shadow"
                >
                  <Phone size={16} />
                  Call Me
                </a>
              )}
              {contactInfo.email && (
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-shadow"
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
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-shadow"
                >
                  <Instagram size={16} />
                  Follow
                </a>
              )}
              {contactInfo.whatsapp && (
                <a 
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#34D399] to-[#10B981] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-shadow"
                >
                  <MessageCircle size={16} />
                  Chat
                </a>
              )}
            </div>
            
            {contactInfo.address && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <MapPin size={16} className="text-[#EC4899]" />
                {contactInfo.address}
              </div>
            )}
          </footer>
        )}

        {/* Powered by */}
        {!isPreview && (
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Made with 💖 using{' '}
              <a 
                href="https://bakeprofit.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium hover:text-[#EC4899] transition-colors"
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
