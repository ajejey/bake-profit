import React from 'react'
import type { Metadata } from 'next'
import ClientLayout from './components/ClientLayout'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export const metadata: Metadata = {
  title: 'BakeProfit - Recipe Cost Calculator & Bakery Management Software | Start Free',
  description: 'Bakery management software for home bakers. Calculate recipe costs, track orders, manage inventory. Start free forever or upgrade to Pro ($6.99/mo) for unlimited everything + Google Drive sync.',
  keywords: 'recipe cost calculator, bakery pricing calculator, home bakery business, cake business planner, bakery order tracker, how to price baked goods, bakery profit calculator, bakery management software, cake costing calculator, bakery inventory management, custom cake order management, bakery recipe costing, home baker tools, cottage bakery software, bakery business planning, google drive sync bakery',
  authors: [{ name: 'Food Label Maker' }],
  creator: 'Food Label Maker',
  publisher: 'Food Label Maker',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/bakery-business-tool',
    siteName: 'BakeProfit',
    title: 'BakeProfit - Recipe Cost Calculator & Bakery Management Software',
    description: 'Start free forever. Calculate recipe costs, track orders, manage inventory. Upgrade to Pro ($6.99/mo) for unlimited everything + Google Drive sync.',
    images: [
      {
        url: '/images/bakery-business-tool-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Home Bakery Business Management Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@foodlabelmaker',
    creator: '@foodlabelmaker',
    title: 'BakeProfit - Recipe Cost Calculator for Home Bakers',
    description: 'Start free forever. Calculate recipe costs, track orders, manage inventory. Pro plan $6.99/mo with Google Drive sync.',
    images: ['/images/bakery-business-tool-og.jpg'],
  },
  alternates: {
    canonical: '/bakery-business-tool',
  },
  category: 'Business Tools',
}

const BakeryBusinessToolLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <ClientLayout>
          {children}
        </ClientLayout>
      </div>
    </ProtectedRoute>
  )
}

export default BakeryBusinessToolLayout
