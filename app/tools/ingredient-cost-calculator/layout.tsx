import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Ingredient Cost Calculator | Calculate Cost Per Unit',
  description: 'Calculate the cost per unit for any ingredient with automatic unit conversions. Convert between cups, grams, ounces, and more. Free tool for bakers and recipe costing.',
  keywords: 'ingredient cost calculator, cost per unit calculator, recipe costing, ingredient pricing, unit conversion calculator, baking calculator, food cost calculator',
  openGraph: {
    title: 'Free Ingredient Cost Calculator',
    description: 'Calculate cost per unit for any ingredient with automatic conversions. Free tool for bakers.',
    type: 'website',
    url: 'https://bakeprofit.com/tools/ingredient-cost-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Ingredient Cost Calculator',
    description: 'Calculate ingredient costs with automatic unit conversions.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/tools/ingredient-cost-calculator',
  },
}

export default function IngredientCostCalculatorLayout({
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
            name: 'Ingredient Cost Calculator',
            description: 'Free calculator to determine cost per unit for any ingredient with automatic unit conversions between weight and volume measurements.',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '634',
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
                name: 'How do I convert cups to grams?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Different ingredients have different densities. 1 cup of flour is approximately 120g, but 1 cup of sugar is approximately 200g. Select the correct ingredient type in the calculator for accurate conversions.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why is cost per unit important?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Knowing cost per unit (per cup, per gram, etc.) lets you quickly calculate recipe costs without doing math every time. It also helps you compare prices between different package sizes and suppliers.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I include shipping costs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Add shipping costs to the package cost for accurate per-unit pricing. If you buy multiple items in one order, divide the shipping proportionally based on item weight or cost.',
                },
              },
              {
                '@type': 'Question',
                name: 'How often should I update ingredient costs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Update costs monthly or whenever you notice significant price changes. Set a reminder to review costs quarterly at minimum. This ensures your recipe pricing stays profitable.',
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
            name: 'How to Calculate Ingredient Cost Per Unit',
            description: 'Step-by-step guide to calculating cost per unit for baking ingredients',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Enter Ingredient Information',
                text: 'Input the ingredient name and select the ingredient type for accurate density conversions.',
              },
              {
                '@type': 'HowToStep',
                name: 'Add Package Details',
                text: 'Enter the package size, unit, and cost (what you paid at the store).',
              },
              {
                '@type': 'HowToStep',
                name: 'Specify Recipe Amount',
                text: 'Input how much you use in your recipe with the appropriate unit.',
              },
              {
                '@type': 'HowToStep',
                name: 'View Cost Breakdown',
                text: 'See the cost per unit and total recipe cost with automatic conversions.',
              },
              {
                '@type': 'HowToStep',
                name: 'Save for Future Use',
                text: 'Save ingredient costs to quickly calculate recipe costs in the future.',
              },
            ],
          }),
        }}
      />
      
      {children}
    </>
  )
}
