import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Bakery Business Plan Template (Free Download) | BakeProfit',
  description: 'Complete business plan template for home bakeries. Interactive form with 8 sections covering executive summary, financials, marketing, and goals. Download instantly.',
  keywords: 'bakery business plan template, home bakery business plan, cottage food business plan, free business plan template, bakery startup plan',
  openGraph: {
    title: 'Home Bakery Business Plan Template (Free Download)',
    description: 'Interactive business plan template for home bakers. Fill out online and download instantly.',
    type: 'article',
    publishedTime: '2025-02-05T00:00:00.000Z',
    authors: ['BakeProfit'],
    tags: ['Business Planning', 'Templates', 'Getting Started', 'Strategy'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Bakery Business Plan Template (Free Download)',
    description: 'Complete, interactive business plan template for home bakers. Free download.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/blog/business-plan-template',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
