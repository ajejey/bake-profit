'use client'

import React from 'react'
import Image from 'next/image'
import { Instagram, Phone, Mail, MapPin, MessageCircle, Star, Clock, Sparkles } from 'lucide-react'
import type { PublicMenu, MenuProduct } from '../../../types'

interface TemplateProps {
  menu: PublicMenu
  isPreview?: boolean
}

// Get products organized for bento display
const organizeForBento = (products: MenuProduct[]) => {
  const available = products
    .filter(p => p.isAvailable)
    .sort((a, b) => {
      // Featured items first, then by sort order
      if (a.isFeatured && !b.isFeatured) return -1
      if (!a.isFeatured && b.isFeatured) return 1
      return a.sortOrder - b.sortOrder
    })
  
  return available
}

// Bento card component with different sizes
const BentoCard = ({ 
  product, 
  size, 
  showPrice,
  index 
}: { 
  product: MenuProduct
  size: 'large' | 'medium' | 'small' | 'wide'
  showPrice: boolean
  index: number
}) => {
  // Different gradient backgrounds based on index for variety
  const gradients = [
    'from-amber-50 to-orange-50',
    'from-rose-50 to-pink-50',
    'from-violet-50 to-purple-50',
    'from-cyan-50 to-teal-50',
    'from-lime-50 to-green-50',
    'from-sky-50 to-blue-50',
  ]
  
  const accentColors = [
    'bg-amber-500',
    'bg-rose-500',
    'bg-violet-500',
    'bg-cyan-500',
    'bg-lime-500',
    'bg-sky-500',
  ]
  
  const gradient = gradients[index % gradients.length]
  const accent = accentColors[index % accentColors.length]
  
  const sizeClasses = {
    large: 'col-span-2 row-span-2',
    wide: 'col-span-2 row-span-1',
    medium: 'col-span-1 row-span-2',
    small: 'col-span-1 row-span-1',
  }
  
  const isLarge = size === 'large'
  const isWide = size === 'wide'
  
  return (
    <div 
      className={`
        ${sizeClasses[size]}
        group relative overflow-hidden rounded-3xl
        bg-gradient-to-br ${gradient}
        border border-gray-100
        transition-all duration-300
        hover:shadow-xl hover:shadow-gray-200/50
        hover:-translate-y-1
        cursor-pointer
      `}
    >
      {/* Featured badge */}
      {product.isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <div className={`${accent} text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg`}>
            <Star size={12} fill="currentColor" />
            Popular
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className={`h-full flex ${isLarge || size === 'medium' ? 'flex-col' : 'flex-row items-center'} p-6`}>
        {/* Product image placeholder or icon */}
        {product.image ? (
          <div className={`
            ${isLarge ? 'w-full h-48 mb-4' : isWide ? 'w-24 h-24 mr-4 flex-shrink-0' : size === 'medium' ? 'w-full h-32 mb-4' : 'w-16 h-16 mr-4 flex-shrink-0'}
            rounded-2xl overflow-hidden bg-white/50
          `}>
            <Image 
              src={product.image} 
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className={`
            ${isLarge ? 'w-24 h-24 mb-4' : isWide ? 'w-16 h-16 mr-4 flex-shrink-0' : size === 'medium' ? 'w-20 h-20 mb-4' : 'w-12 h-12 mr-3 flex-shrink-0'}
            rounded-2xl bg-white/60 flex items-center justify-center
            group-hover:scale-110 transition-transform duration-300
          `}>
            <span className={`${isLarge ? 'text-4xl' : isWide ? 'text-3xl' : size === 'medium' ? 'text-3xl' : 'text-2xl'}`}>
              🧁
            </span>
          </div>
        )}
        
        {/* Text content */}
        <div className={`flex-1 ${isLarge || size === 'medium' ? '' : 'min-w-0'}`}>
          <h3 
            className={`
              font-semibold text-gray-800 leading-tight
              ${isLarge ? 'text-2xl mb-2' : isWide ? 'text-xl mb-1' : size === 'medium' ? 'text-xl mb-2' : 'text-base mb-0.5'}
            `}
            style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}
          >
            {product.name}
          </h3>
          
          {product.description && (isLarge || size === 'medium' || isWide) && (
            <p className={`
              text-gray-500 leading-relaxed
              ${isLarge ? 'text-base mb-4 line-clamp-3' : 'text-sm mb-2 line-clamp-2'}
            `}>
              {product.description}
            </p>
          )}
          
          {showPrice && (
            <div className={`
              font-bold text-gray-900
              ${isLarge ? 'text-3xl' : isWide ? 'text-2xl' : size === 'medium' ? 'text-2xl' : 'text-lg'}
            `}
            style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}
            >
              ${product.price.toFixed(2)}
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative corner */}
      <div className={`absolute -bottom-8 -right-8 w-24 h-24 ${accent} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
    </div>
  )
}

export default function BentoGridTemplate({ menu, isPreview = false }: TemplateProps) {
  const { branding, products, contactInfo, showPrices, showContactInfo, acceptingOrders } = menu
  const bentoProducts = organizeForBento(products || [])
  
  // Assign sizes to products for bento layout
  const getBentoSize = (index: number, isFeatured: boolean): 'large' | 'medium' | 'small' | 'wide' => {
    if (index === 0 && isFeatured) return 'large'
    if (index === 0) return 'wide'
    
    // Create an interesting pattern
    const pattern = index % 6
    switch (pattern) {
      case 0: return 'large'
      case 1: return 'small'
      case 2: return 'medium'
      case 3: return 'small'
      case 4: return 'wide'
      case 5: return 'small'
      default: return 'small'
    }
  }
  
  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: '#FAFAFA',
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* Gradient background decoration */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-rose-200/30 to-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-violet-200/30 to-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
      
      {/* Main content */}
      <div className={`relative z-10 max-w-6xl mx-auto ${isPreview ? 'p-4' : 'px-6 py-12 sm:px-8'}`}>
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            {/* Logo */}
            {branding.logo && (
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 border-2 border-white">
                <Image 
                  src={branding.logo} 
                  alt={branding.businessName}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            
            {/* Business Name */}
            <h1 
              className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight"
              style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}
            >
              {branding.businessName}
            </h1>
          </div>
          
          {/* Tagline */}
          {branding.tagline && (
            <p className="text-lg text-gray-500 mb-6 max-w-md mx-auto">
              {branding.tagline}
            </p>
          )}
          
          {/* Status badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {acceptingOrders && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Open for Orders
              </div>
            )}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
              <Clock size={14} />
              Fresh Daily
            </div>
          </div>
        </header>

        {/* Bento Grid */}
        <main className="mb-16">
          {bentoProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
              {bentoProducts.map((product, index) => (
                <BentoCard
                  key={product.id}
                  product={product}
                  size={getBentoSize(index, product.isFeatured || false)}
                  showPrice={showPrices}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center">
                <Sparkles size={40} className="text-rose-400" />
              </div>
              <h3 
                className="text-2xl font-semibold text-gray-800 mb-2"
                style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}
              >
                Coming Soon
              </h3>
              <p className="text-gray-500">
                We&apos;re preparing something delicious for you!
              </p>
            </div>
          )}
        </main>

        {/* Contact Section */}
        {showContactInfo && contactInfo && Object.values(contactInfo).some(v => v) && (
          <footer className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 
              className="text-xl font-semibold text-gray-800 mb-6 text-center"
              style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}
            >
              Get in Touch
            </h3>
            
            <div className="flex flex-wrap justify-center gap-3">
              {contactInfo.phone && (
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-700 transition-colors"
                >
                  <Phone size={18} className="text-gray-400" />
                  <span className="font-medium">{contactInfo.phone}</span>
                </a>
              )}
              
              {contactInfo.email && (
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-700 transition-colors"
                >
                  <Mail size={18} className="text-gray-400" />
                  <span className="font-medium">{contactInfo.email}</span>
                </a>
              )}
              
              {contactInfo.instagram && (
                <a 
                  href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-2xl text-gray-700 transition-colors"
                >
                  <Instagram size={18} className="text-pink-500" />
                  <span className="font-medium">{contactInfo.instagram}</span>
                </a>
              )}
              
              {contactInfo.whatsapp && (
                <a 
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-2xl text-gray-700 transition-colors"
                >
                  <MessageCircle size={18} className="text-green-500" />
                  <span className="font-medium">WhatsApp</span>
                </a>
              )}
            </div>
            
            {contactInfo.address && (
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-500">
                <MapPin size={16} />
                <span>{contactInfo.address}</span>
              </div>
            )}
          </footer>
        )}

        {/* Powered by */}
        {!isPreview && (
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Made with{' '}
              <a 
                href="https://bakeprofit.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-rose-500 transition-colors font-medium"
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
