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
            datePublished: '2025-01-28',
            dateModified: '2025-01-28',
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
                name: 'How often should I update my recipe costs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Update your recipe costs every 3 months, or immediately when you notice significant ingredient price increases. Butter, eggs, and chocolate are especially volatile and can change quickly.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I really need to include labor costs if I\'m the owner?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Your time has value. If you don\'t pay yourself, you\'re not running a profitable business—you\'re running an expensive hobby. Include labor costs at a fair hourly rate for your skill level.',
                },
              },
              {
                '@type': 'Question',
                name: 'What\'s a good profit margin for baked goods?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most successful bakeries aim for a 50-70% profit margin on baked goods. This means if your cookie costs $1.50 to make, you should sell it for $3.00-$5.00. Custom cakes can have even higher margins (70-80%).',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I calculate overhead if I bake from home?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Calculate 10-20% of your home utilities (electricity, gas, water) as business overhead. Add business insurance, licenses, and equipment costs. Divide by your monthly production to get overhead per unit.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I charge more for custom orders?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Custom orders require more time, skill, and often specialty ingredients. Add 20-50% to your base price for custom designs, special flavors, or rush orders.',
                },
              },
              {
                '@type': 'Question',
                name: 'What if my prices are higher than competitors?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Don\'t compete on price alone. Compete on quality, service, and uniqueness. If your costs are accurate and you\'re pricing for profit, stick to your prices. The right customers will pay for quality.',
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
