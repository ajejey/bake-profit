import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Baking Calculators & Tools | BakeProfit',
  description: '6 free baking calculators for home bakers. Recipe cost calculator, cake pricing, recipe scaling, batch costing & more. No signup required. Start calculating instantly!',
  keywords: 'baking calculators, recipe cost calculator, cake pricing calculator, bakery tools, free baking tools, recipe scaling calculator, batch cost calculator',
  openGraph: {
    title: 'Free Baking Calculators & Tools for Home Bakers',
    description: '6 free professional calculators. Recipe costs, cake pricing, recipe scaling & more. No signup required.',
    type: 'website',
    url: 'https://bakeprofit.com/tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Baking Calculators & Tools',
    description: '6 free calculators for home bakers. Recipe costs, cake pricing, scaling & more.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/tools',
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* CollectionPage Schema for Tools Hub */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Free Baking Calculators & Tools',
            description: '6 free professional baking calculators for home bakers and small bakeries',
            url: 'https://bakeprofit.com/tools',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: 6,
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Recipe Cost Calculator',
                  url: 'https://bakeprofit.com/tools/recipe-cost-calculator',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Cake Pricing Calculator',
                  url: 'https://bakeprofit.com/tools/cake-pricing-calculator',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Recipe Scaling Calculator',
                  url: 'https://bakeprofit.com/tools/recipe-scaling-calculator',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Bakery Profit Calculator',
                  url: 'https://bakeprofit.com/tools/bakery-profit-calculator',
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  name: 'Ingredient Cost Calculator',
                  url: 'https://bakeprofit.com/tools/ingredient-cost-calculator',
                },
                {
                  '@type': 'ListItem',
                  position: 6,
                  name: 'Batch Cost Calculator',
                  url: 'https://bakeprofit.com/tools/batch-cost-calculator',
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  )
}
