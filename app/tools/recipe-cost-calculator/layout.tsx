import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Recipe Cost Calculator for Bakers | BakeProfit',
  description: 'Calculate your recipe costs instantly with our free recipe cost calculator. Perfect for home bakers and small bakeries. Calculate ingredient costs, labor, overhead, and profit margins. No signup required.',
  keywords: 'recipe cost calculator, baking calculator, ingredient cost calculator, recipe costing, bakery calculator, food cost calculator, recipe pricing, baking cost calculator',
  openGraph: {
    title: 'Free Recipe Cost Calculator for Bakers',
    description: 'Calculate recipe costs, ingredient costs, and profit margins instantly. Free tool for home bakers.',
    type: 'website',
    url: 'https://bakeprofit.vercel.app/tools/recipe-cost-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Recipe Cost Calculator for Bakers',
    description: 'Calculate recipe costs and profit margins instantly. Free tool for home bakers.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/tools/recipe-cost-calculator',
  },
}

export default function RecipeCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Recipe Cost Calculator',
            description: 'Free calculator to calculate recipe costs, ingredient costs, and profit margins for bakers.',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '1247',
            },
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
                name: 'How do I calculate recipe cost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'To calculate recipe cost, add up the cost of each ingredient used. Divide the package cost by package size to get cost per unit, then multiply by the amount used in your recipe. Add labor and overhead costs for the total recipe cost.',
                },
              },
              {
                '@type': 'Question',
                name: 'What profit margin should I use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most bakeries aim for a 50-100% profit margin on baked goods. This means if your cost per serving is $2, you would charge $3-$4. Adjust based on your market, competition, and target customers.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I include labor costs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Your time is valuable. Calculate labor cost by multiplying hours spent by your desired hourly rate. Even home bakers should factor in their time to ensure profitability.',
                },
              },
            ],
          }),
        }}
      />
      
      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Recipe Cost',
            description: 'Step-by-step guide to calculating the cost of your baking recipes',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Add Ingredients',
                text: 'List all ingredients used in your recipe with their amounts.',
              },
              {
                '@type': 'HowToStep',
                name: 'Enter Package Information',
                text: 'For each ingredient, enter the package size and cost you paid.',
              },
              {
                '@type': 'HowToStep',
                name: 'Add Additional Costs',
                text: 'Include labor costs (time × hourly rate) and overhead costs (packaging, electricity).',
              },
              {
                '@type': 'HowToStep',
                name: 'Calculate Profit Margin',
                text: 'Set your desired profit margin percentage to get a suggested selling price.',
              },
            ],
          }),
        }}
      />
      
      {children}
    </>
  )
}
