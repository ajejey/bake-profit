import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why You\'re Losing Money on Every Cake (And Don\'t Know It) | BakeProfit',
  description: 'Most home bakers lose money on every cake they sell. Discover the 7 hidden costs killing your profits and learn how to fix your pricing without losing customers.',
  keywords: 'cake pricing, bakery costs, home bakery profit, hidden costs, recipe costing, labor costs, bakery overhead, pricing mistakes',
  openGraph: {
    title: 'Why You\'re Losing Money on Every Cake (And Don\'t Know It)',
    description: 'Most home bakers lose money on every cake they sell. Discover the 7 hidden costs killing your profits.',
    type: 'article',
    publishedTime: '2025-01-30T00:00:00.000Z',
    authors: ['BakeProfit'],
    tags: ['Pricing', 'Profitability', 'Business Strategy', 'Cost Tracking'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why You\'re Losing Money on Every Cake (And Don\'t Know It)',
    description: 'Most home bakers lose money on every cake they sell. Discover the 7 hidden costs killing your profits.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/blog/losing-money-on-cakes',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
