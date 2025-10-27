import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recipe Cost Calculator: Excel vs Software (Which is Better?) | BakeProfit',
  description: 'Compare Excel spreadsheets vs dedicated recipe cost calculator software. Learn the pros, cons, and which is best for your bakery business.',
  keywords: 'recipe cost calculator, excel vs software, bakery calculator, recipe costing software, bakery management software, cost calculator for bakers',
  openGraph: {
    title: 'Recipe Cost Calculator: Excel vs Software (Which is Better?)',
    description: 'Compare Excel spreadsheets vs dedicated recipe cost calculator software for your bakery business.',
    type: 'article',
    url: 'https://bakeprofit.vercel.app/blog/recipe-cost-calculator-comparison',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recipe Cost Calculator: Excel vs Software',
    description: 'Excel vs dedicated software for recipe costing. Which is better for your bakery?',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/blog/recipe-cost-calculator-comparison',
  },
}

export default function RecipeCostCalculatorComparisonLayout({
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
            headline: 'Recipe Cost Calculator: Excel vs Software (Which is Better?)',
            description: 'Comprehensive comparison of Excel spreadsheets vs dedicated recipe cost calculator software for home bakers and small bakeries.',
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
            datePublished: '2025-01-20',
            dateModified: '2025-01-20',
          }),
        }}
      />
      
      {/* Comparison Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ComparisonChart',
            name: 'Recipe Cost Calculator: Excel vs Software',
            description: 'Side-by-side comparison of Excel spreadsheets and dedicated recipe cost calculator software',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Excel Spreadsheets',
                description: 'Manual spreadsheet-based recipe costing',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Dedicated Software',
                description: 'Automated recipe cost calculator software',
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
                name: 'Is Excel good enough for recipe costing?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Excel can work for beginners with just a few recipes, but it becomes time-consuming and error-prone as your business grows. Most bakers find dedicated software more efficient after their first 10-15 recipes.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the main disadvantages of Excel for recipe costing?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Excel requires manual data entry, is prone to formula errors, lacks automatic calculations, makes scaling recipes difficult, and doesn\'t integrate with other business tools. It also takes significantly more time to update and maintain.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is dedicated recipe costing software worth the cost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, if you\'re serious about your bakery business. The time saved (5-10 hours per month) and accuracy improvements quickly pay for the software. Most bakers save money by pricing correctly and reducing errors.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I use free recipe costing software?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Many free recipe cost calculators are available online, including BakeProfit. Free tools are great for getting started, though some paid options offer more advanced features like inventory tracking and order management.',
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
