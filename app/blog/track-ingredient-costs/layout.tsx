import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Track Ingredient Costs for Your Home Bakery (2025 Guide)',
  description: 'Learn how to track ingredient costs, handle price fluctuations, reduce waste, and boost bakery profits. Includes 5 tracking methods and automation tips.',
  keywords: 'track ingredient costs, bakery inventory management, ingredient price tracking, bakery cost control, reduce bakery waste, ingredient tracking software',
  openGraph: {
    title: 'How to Track Ingredient Costs for Your Home Bakery (2025 Guide)',
    description: 'Learn how to track ingredient costs, handle price fluctuations, and boost profits with proper cost tracking.',
    type: 'article',
    url: 'https://bakeprofit.vercel.app/blog/track-ingredient-costs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Track Ingredient Costs for Your Home Bakery',
    description: 'Complete guide to tracking ingredient costs and boosting bakery profits.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/blog/track-ingredient-costs',
  },
}

export default function IngredientTrackingLayout({
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
            headline: 'How to Track Ingredient Costs for Your Home Bakery (2025 Guide)',
            description: 'Learn how to track ingredient costs, handle price fluctuations, reduce waste, and boost bakery profits. Includes 5 tracking methods and automation tips.',
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
                name: 'How often should I update ingredient prices?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Update prices every time you make a purchase. Review and analyze trends monthly. For volatile ingredients like eggs and butter, check prices weekly.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need to track every single ingredient?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, eventually. Start with your most expensive ingredients (butter, chocolate, specialty items) and add others over time. Even small ingredients like salt and baking powder add up.',
                },
              },
              {
                '@type': 'Question',
                name: 'What if I buy ingredients from multiple stores?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Track the supplier/store for each purchase. This helps you identify the best deals and optimize your shopping. You might find Costco has the best butter prices while your local bakery supply has cheaper flour.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I track ingredients I get for free or on sale?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Track the actual price you paid, even if it was $0 or heavily discounted. But for pricing purposes, use the regular market price—you won\'t always get that deal, and you need sustainable pricing.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I handle bulk purchases?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Calculate the price per unit ($/oz or $/lb) for bulk purchases. A 25lb bag of flour for $15 is $0.60/lb. This makes it easy to compare with smaller packages and track usage accurately.',
                },
              },
              {
                '@type': 'Question',
                name: 'What\'s the fastest way to start tracking today?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Use BakeProfit\'s free tier. Add your ingredients, log current prices, and let the software handle calculations and alerts. Takes 15 minutes to set up, saves hours every month.',
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
