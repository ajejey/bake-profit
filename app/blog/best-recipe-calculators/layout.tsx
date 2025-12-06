import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '10 Best Recipe Cost Calculators for Home Bakers & Small Bakeries (2025) | BakeProfit',
  description: 'Comprehensive review of 10 recipe cost calculators based on real research. Compare features, pricing, pros & cons. Find the best tool for your bakery.',
  keywords: 'recipe cost calculator, free recipe calculator, bakery calculator, recipe costing software, best recipe calculator, bakery management software, CakeCost, meez, Recipe Cost Calculator',
  openGraph: {
    title: '10 Best Recipe Cost Calculators for Home Bakers (2025)',
    description: 'Research-based review of 10 recipe cost calculators. Compare features, pricing, and find the best tool for your bakery.',
    type: 'article',
    url: 'https://bakeprofit.com/blog/best-recipe-calculators',
  },
  twitter: {
    card: 'summary_large_image',
    title: '10 Best Recipe Cost Calculators (2025)',
    description: 'Comprehensive review of recipe cost calculators for home bakers. Real research, honest comparisons.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/blog/best-recipe-calculators',
  },
}

export default function BestRecipeCalculatorsLayout({
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
            headline: '10 Best Recipe Cost Calculators for Home Bakers & Small Bakeries (2025)',
            description: 'Research-based review and comparison of 10 recipe cost calculators including BakeProfit, Recipe Cost Calculator, CakeCost, meez, and more.',
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
            datePublished: '2025-01-22',
            dateModified: '2025-01-22',
          }),
        }}
      />
      
      {/* Review Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: '5 Best Free Recipe Cost Calculators',
            description: 'Top-rated free recipe cost calculator tools for home bakers',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'BakeProfit',
                description: 'Free recipe cost calculator with complete bakery management features',
                url: 'https://bakeprofit.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Google Sheets',
                description: 'Customizable spreadsheet template for recipe costing',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'RecipeCost.com',
                description: 'Simple online recipe cost calculator',
              },
            ],
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
                name: 'What is the best free recipe cost calculator?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'BakeProfit is the best overall free recipe cost calculator because it combines recipe costing with complete bakery management features like order tracking and inventory management. It requires no signup for the calculator and offers a generous free tier.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I use Google Sheets for recipe costing?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Google Sheets is a flexible option if you\'re comfortable with spreadsheets. However, it requires manual setup and is more time-consuming than dedicated recipe costing tools. It\'s best for bakers who want complete customization.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need to pay for recipe costing software?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No, there are excellent free options available. BakeProfit, Google Sheets, and RecipeCost.com are all completely free. Some tools offer paid upgrades for additional features, but you can start free.',
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
