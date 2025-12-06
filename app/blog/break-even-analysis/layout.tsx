import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Break-Even Analysis for Bakers: When Do You Start Making Money? | BakeProfit',
  description: 'Learn how to calculate your break-even point and know exactly when your bakery becomes profitable. Includes real examples, formulas, and growth planning strategies.',
  keywords: 'break even analysis, bakery break even point, when do bakers make profit, fixed costs variable costs, contribution margin, bakery profitability',
  openGraph: {
    title: 'Break-Even Analysis for Bakers: When Do You Start Making Money?',
    description: 'Calculate your break-even point and know exactly when you start making profit. Real examples and formulas included.',
    type: 'article',
    publishedTime: '2025-02-03T00:00:00.000Z',
    authors: ['BakeProfit'],
    tags: ['Business Strategy', 'Financial Planning', 'Profitability', 'Cost Management'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Break-Even Analysis for Bakers: When Do You Start Making Money?',
    description: 'Learn how to calculate your break-even point and plan for profitable growth.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/blog/break-even-analysis',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
