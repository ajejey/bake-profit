import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Calculate Your True Hourly Rate as a Baker | BakeProfit',
  description: 'Most bakers drastically overestimate their hourly rate. Learn how to track ALL your time—baking, admin, delivery—and calculate what you\'re really making per hour.',
  keywords: 'baker hourly rate, calculate hourly rate, time tracking for bakers, labor costs, bakery time management, true hourly wage',
  openGraph: {
    title: 'How to Calculate Your True Hourly Rate as a Baker',
    description: 'Stop overestimating. Learn how to track all your time and calculate your TRUE hourly rate.',
    type: 'article',
    publishedTime: '2025-02-02T00:00:00.000Z',
    authors: ['BakeProfit'],
    tags: ['Labor Costs', 'Time Tracking', 'Pricing', 'Business Management'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Calculate Your True Hourly Rate as a Baker',
    description: 'Most bakers overestimate their hourly rate by 96%. Learn how to calculate what you\'re REALLY making.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/blog/true-hourly-rate',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
