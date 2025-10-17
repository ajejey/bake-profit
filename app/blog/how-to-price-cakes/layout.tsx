import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cake Pricing Formula: How to Price Cakes for Profit (2025)',
  description: 'Learn the exact formula to price cakes profitably. Includes complexity multipliers, tier pricing, delivery fees, and real examples. Free calculator included.',
  keywords: 'how to price cakes, cake pricing formula, cake pricing calculator, custom cake pricing, wedding cake pricing, cake decorator pricing',
  openGraph: {
    title: 'Cake Pricing Formula: How to Price Cakes for Profit (2025)',
    description: 'Learn the exact formula to price cakes profitably. Includes real examples and free calculator.',
    type: 'article',
    url: 'https://bakeprofit.vercel.app/blog/how-to-price-cakes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cake Pricing Formula: How to Price Cakes for Profit',
    description: 'Learn the exact formula professional cake decorators use to price profitably.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/blog/how-to-price-cakes',
  },
}

export default function CakePricingBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Cake Pricing Formula: How to Price Cakes for Profit (2025)',
            description: 'Learn the exact formula to price cakes profitably including complexity multipliers, tier pricing, and delivery fees.',
            author: {
              '@type': 'Organization',
              name: 'BakeProfit',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BakeProfit',
              logo: {
                '@type': 'ImageObject',
                url: 'https://bakeprofit.vercel.app/logo.png',
              },
            },
            datePublished: '2025-01-15',
            dateModified: '2025-01-15',
          }),
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How much should I charge for a custom cake?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Calculate base costs (ingredients + labor + overhead), multiply by complexity (1.0-2.5x) and tier multiplier (1.0-1.5x), then add delivery. A simple 8-inch cake typically costs $200-300, while intricate wedding cakes range from $1,500-3,000+.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is a good profit margin for cakes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Aim for 50-100% profit margin on custom cakes. This accounts for your skill, business risk, and allows for growth. Remember: labor costs already pay you, profit is extra for taxes, equipment, and savings.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I charge for cake delivery?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, always charge for delivery. Typical rates: $15-25 for 0-10 miles, $25-40 for 10-20 miles, $40-60 for 20-30 miles. Add $25-50 setup fee for multi-tier cakes requiring on-site assembly.',
                },
              },
            ],
          }),
        }}
      />
      
      {children}
    </>
  )
}
