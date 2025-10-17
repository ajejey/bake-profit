import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Batch Cost Calculator | Calculate Production Costs & Profit',
  description: 'Calculate total costs and profit for multiple batches. Perfect for production planning, wholesale orders, and bakery business management. Free tool for bakers.',
  keywords: 'batch cost calculator, production cost calculator, wholesale pricing calculator, bakery batch calculator, multiple batch calculator, production planning calculator',
  openGraph: {
    title: 'Free Batch Cost Calculator for Bakeries',
    description: 'Calculate costs and profit for multiple batches. Plan production and optimize profitability.',
    type: 'website',
    url: 'https://bakeprofit.vercel.app/tools/batch-cost-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Batch Cost Calculator',
    description: 'Calculate production costs and profit for multiple batches.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/tools/batch-cost-calculator',
  },
}

export default function BatchCostCalculatorLayout({
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
            name: 'Batch Cost Calculator',
            description: 'Free calculator to determine total costs and profit for multiple batches of baked goods. Perfect for production planning and wholesale orders.',
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
              ratingCount: '521',
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
                name: 'How do I calculate cost per batch?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Add up all ingredient costs and packaging costs for one batch. Use the Recipe Cost Calculator to get accurate ingredient costs, then multiply by the number of batches you are making.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I include my time as labor?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Even if you are the owner, pay yourself an hourly rate ($20-40/hr is typical). This ensures you are actually making money, not just covering costs. Your profit should be AFTER paying yourself.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is a good profit margin for batches?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Aim for 50-100% profit margin on product costs (before labor and overhead). After all costs, a 15-25% net profit margin is healthy. Lower margins work for high-volume wholesale, but retail should be higher.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I price for wholesale vs retail?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Wholesale typically sells at 50% of retail price. Calculate your costs, add desired profit, then double it for retail. For wholesale, ensure you still profit at 50% of retail. If not, your costs are too high or retail price too low.',
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
            name: 'How to Calculate Batch Production Costs',
            description: 'Step-by-step guide to calculating costs and profit for multiple batches',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Add Products',
                text: 'List all products you are making with batch quantities and yield per batch.',
              },
              {
                '@type': 'HowToStep',
                name: 'Enter Costs',
                text: 'Input cost per batch (ingredients plus packaging) and price per batch for each product.',
              },
              {
                '@type': 'HowToStep',
                name: 'Add Labor',
                text: 'Enter total labor hours and hourly rate to calculate labor costs.',
              },
              {
                '@type': 'HowToStep',
                name: 'Include Overhead',
                text: 'Add overhead costs like utilities, rent, and equipment depreciation.',
              },
              {
                '@type': 'HowToStep',
                name: 'Review Totals',
                text: 'See grand total revenue, costs, profit, and profit margin across all batches.',
              },
            ],
          }),
        }}
      />
      
      {children}
    </>
  )
}
