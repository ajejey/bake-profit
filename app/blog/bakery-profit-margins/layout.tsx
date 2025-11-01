import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bakery Profit Margins: What\'s Normal and How to Improve Yours (2025)',
  description: 'Learn what profit margins are normal for bakeries, how to calculate yours, and 10 proven strategies to improve profitability. Includes industry benchmarks and real examples.',
  keywords: 'bakery profit margins, bakery profitability, home bakery profit, bakery profit margin calculator, improve bakery margins, bakery business profit',
  openGraph: {
    title: 'Bakery Profit Margins: What\'s Normal and How to Improve Yours (2025)',
    description: 'Industry benchmarks, calculation guide, and 10 strategies to boost your bakery profit margins.',
    type: 'article',
    url: 'https://bakeprofit.vercel.app/blog/bakery-profit-margins',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bakery Profit Margins: What\'s Normal and How to Improve',
    description: 'Learn what profit margins are normal for bakeries and how to improve yours.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/blog/bakery-profit-margins',
  },
}

export default function BakeryProfitMarginsLayout({
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
            headline: 'Bakery Profit Margins: What\'s Normal and How to Improve Yours (2025)',
            description: 'Learn what profit margins are normal for bakeries, how to calculate yours, and 10 proven strategies to improve profitability. Includes industry benchmarks and real examples.',
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
                name: 'What\'s a good profit margin for a home bakery?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '15-30% is normal for home bakeries. Below 15% means you\'re underpricing or have high costs. Above 30% is excellent and sustainable.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I increase my profit margin without raising prices?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Reduce costs: buy in bulk, reduce waste, improve efficiency, batch production, focus on high-margin products. A 20% cost reduction has the same effect as a 20% price increase.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I include my labor in profit margin calculations?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Always include your labor as an expense, even if you\'re the owner. Otherwise, you\'re not measuring true profitability—you\'re just paying yourself from "profit" that isn\'t real.',
                },
              },
              {
                '@type': 'Question',
                name: 'What\'s the difference between markup and margin?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Markup is how much you add to cost. Margin is profit as a percentage of price. Example: $10 cost, $20 price = 100% markup but only 50% margin. Focus on margin, not markup.',
                },
              },
              {
                '@type': 'Question',
                name: 'How often should I review my profit margins?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Monthly at minimum. Check margins when ingredient prices change, when you adjust pricing, or when adding new products. Quarterly deep reviews are ideal.',
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
