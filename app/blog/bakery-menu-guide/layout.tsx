import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Create a Bakery Menu That Sells | BakeProfit',
  description: 'Complete guide to creating a profitable bakery menu. Learn product selection, pricing psychology, menu descriptions, design tips, and common mistakes to avoid.',
  keywords: 'bakery menu, menu design, bakery pricing strategy, menu descriptions, product selection, menu psychology, profitable bakery menu',
  openGraph: {
    title: 'How to Create a Bakery Menu That Sells',
    description: 'Learn how to build a profitable bakery menu with strategic product selection, psychological pricing, and compelling descriptions.',
    type: 'article',
    publishedTime: '2025-02-06T00:00:00.000Z',
    authors: ['BakeProfit'],
    tags: ['Menu Strategy', 'Pricing', 'Marketing', 'Product Selection'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Create a Bakery Menu That Sells',
    description: 'Complete guide to creating a profitable bakery menu that drives sales.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/blog/bakery-menu-guide',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
