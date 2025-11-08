import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cupcake Pricing Guide: $2 vs $5 vs $8 - What\'s Right for You? | BakeProfit',
  description: 'Discover which cupcake pricing tier is right for your bakery. Compare budget, mid-tier, and premium strategies with real cost breakdowns and profit analysis.',
  keywords: 'cupcake pricing, how to price cupcakes, cupcake pricing tiers, budget cupcakes, premium cupcakes, bakery pricing strategy, cupcake profit margins',
  openGraph: {
    title: 'Cupcake Pricing Guide: $2 vs $5 vs $8 - What\'s Right for You?',
    description: 'Compare budget, mid-tier, and premium cupcake pricing strategies. Real cost breakdowns and profit analysis for each tier.',
    type: 'article',
    publishedTime: '2025-02-01T00:00:00.000Z',
    authors: ['BakeProfit'],
    tags: ['Pricing', 'Cupcakes', 'Business Strategy', 'Market Positioning'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cupcake Pricing Guide: $2 vs $5 vs $8 - What\'s Right for You?',
    description: 'Compare budget, mid-tier, and premium cupcake pricing strategies with real cost breakdowns.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/blog/cupcake-pricing-guide',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
