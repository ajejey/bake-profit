import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Calculate Recipe Cost: Complete Guide for Bakers (2025)',
  description: 'Learn the exact formula to calculate recipe costs including ingredients, labor, overhead, and profit margins. Includes free calculator and real examples for bakers.',
  keywords: 'how to calculate recipe cost, recipe costing, recipe cost calculator, baking costs, recipe pricing, ingredient costs, bakery pricing',
  openGraph: {
    title: 'How to Calculate Recipe Cost: Complete Guide for Bakers (2025)',
    description: 'Learn the exact formula to calculate recipe costs. Includes free calculator and real examples.',
    type: 'article',
    url: 'https://bakeprofit.com/blog/how-to-calculate-recipe-cost',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Calculate Recipe Cost: Complete Guide',
    description: 'Learn the exact formula to calculate recipe costs with real examples.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/blog/how-to-calculate-recipe-cost',
  },
}

export default function RecipeCostBlogLayout({
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
            headline: 'How to Calculate Recipe Cost: Complete Guide for Bakers (2025)',
            description: 'Learn the exact formula to calculate recipe costs including ingredients, labor, overhead, and profit margins.',
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
      
      {children}
    </>
  )
}
