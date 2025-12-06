import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The 3 Biggest Pricing Mistakes Home Bakers Make (And How to Fix Them) | BakeProfit',
  description: 'Discover the 3 critical pricing mistakes costing home bakers thousands every year. Learn how to fix undercharging, missing overhead, and undervaluing your time.',
  keywords: 'pricing mistakes, home bakery pricing, undercharging, overhead costs, labor costs, bakery profit, pricing confidence',
  openGraph: {
    title: 'The 3 Biggest Pricing Mistakes Home Bakers Make',
    description: 'Stop losing money on every cake. Discover the 3 critical pricing mistakes and how to fix them today.',
    type: 'article',
    publishedTime: '2025-01-31T00:00:00.000Z',
    authors: ['BakeProfit'],
    tags: ['Pricing', 'Business Strategy', 'Profitability', 'Cost Management'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The 3 Biggest Pricing Mistakes Home Bakers Make',
    description: 'Stop losing money on every cake. Discover the 3 critical pricing mistakes and how to fix them today.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/blog/pricing-mistakes',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
