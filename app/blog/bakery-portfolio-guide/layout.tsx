import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creating a Bakery Portfolio That Attracts Orders | BakeProfit',
  description: 'Complete guide to creating a stunning bakery portfolio. Learn how to showcase your products, tell your story, and attract more customers with professional photos and descriptions.',
  keywords: 'bakery portfolio, cake portfolio, bakery photography, bakery marketing, portfolio strategy, bakery website, bakery social media',
  openGraph: {
    title: 'Creating a Bakery Portfolio That Attracts Orders',
    description: 'Learn how to build a bakery portfolio that showcases your products and converts browsers into buyers.',
    type: 'article',
    publishedTime: '2025-02-07T00:00:00.000Z',
    authors: ['BakeProfit'],
    tags: ['Marketing', 'Portfolio Strategy', 'Photography', 'Branding'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creating a Bakery Portfolio That Attracts Orders',
    description: 'Complete guide to creating a bakery portfolio that converts browsers into buyers.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/blog/bakery-portfolio-guide',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
