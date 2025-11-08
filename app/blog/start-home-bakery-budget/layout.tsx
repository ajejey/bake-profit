import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Start a Home Bakery with $500 or Less | BakeProfit',
  description: 'Complete guide to starting a profitable home bakery on a shoestring budget. Includes budget breakdown, equipment list, legal requirements, and free marketing strategies.',
  keywords: 'start home bakery, cottage food business, home bakery budget, start bakery $500, home baking business, cottage food laws',
  openGraph: {
    title: 'How to Start a Home Bakery with $500 or Less',
    description: 'Launch a profitable home bakery with just $500. Complete guide with budget breakdown, equipment, permits, and marketing.',
    type: 'article',
    publishedTime: '2025-02-04T00:00:00.000Z',
    authors: ['BakeProfit'],
    tags: ['Getting Started', 'Home Bakery', 'Cottage Food', 'Budget', 'Startup Guide'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Start a Home Bakery with $500 or Less',
    description: 'Everything you need to launch a profitable home bakery on a budget.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/blog/start-home-bakery-budget',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
