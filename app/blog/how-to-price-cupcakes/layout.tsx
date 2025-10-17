import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Price Cupcakes: Complete Pricing Guide for Bakers (2025)',
  description: 'Learn how to price cupcakes profitably. Includes ingredient costs, labor calculations, pricing factors, and real examples. Free calculator included.',
  keywords: 'how to price cupcakes, cupcake pricing, cupcake pricing calculator, how much to charge for cupcakes, cupcake business pricing',
  openGraph: {
    title: 'How to Price Cupcakes: Complete Pricing Guide for Bakers (2025)',
    description: 'Learn the exact formula to price cupcakes profitably with real examples and free calculator.',
    type: 'article',
    url: 'https://bakeprofit.com/blog/how-to-price-cupcakes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Price Cupcakes: Complete Pricing Guide',
    description: 'Learn how to price cupcakes profitably with step-by-step formulas and real examples.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/blog/how-to-price-cupcakes',
  },
}

export default function CupcakePricingBlogLayout({
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
            headline: 'How to Price Cupcakes: Complete Pricing Guide for Bakers (2025)',
            description: 'Complete guide to pricing cupcakes profitably including ingredient costs, labor calculations, and pricing factors.',
            author: {
              '@type': 'Organization',
              name: 'BakeProfit',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BakeProfit',
              logo: {
                '@type': 'ImageObject',
                url: 'https://bakeprofit.com/logo.png',
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
                name: 'How much should I charge for cupcakes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Simple cupcakes typically cost $3-4 each, standard cupcakes $4-6 each, and premium custom cupcakes $6-10+ each. Calculate your actual costs (ingredients + labor + overhead) and add 50-60% profit margin for accurate pricing.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is a good profit margin for cupcakes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Aim for 50-60% profit margin on cupcakes. This ensures you cover all costs, pay yourself fairly, and have profit left for business growth and unexpected expenses.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I offer discounts for large orders?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, offer 5-10% discount for orders of 24-48 cupcakes, and 10-15% for orders of 72+. Large orders are more efficient to produce, so you can pass some savings to customers while maintaining profitability.',
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
