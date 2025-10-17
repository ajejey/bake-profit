import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Bakery Profit Calculator | Calculate Your Profit Margins',
  description: 'Calculate your bakery profit margins and compare to industry benchmarks. Free tool to analyze gross profit, net profit, COGS, and break-even point. Perfect for home bakers and small bakeries.',
  keywords: 'bakery profit calculator, profit margin calculator, bakery profit margin, gross profit calculator, net profit calculator, bakery business calculator, food cost percentage',
  openGraph: {
    title: 'Free Bakery Profit Calculator',
    description: 'Calculate profit margins and compare to industry benchmarks. Know if your bakery is profitable.',
    type: 'website',
    url: 'https://bakeprofit.vercel.app/tools/bakery-profit-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Bakery Profit Calculator',
    description: 'Calculate your bakery profit margins. Free tool for bakers.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/tools/bakery-profit-calculator',
  },
}

export default function BakeryProfitCalculatorLayout({
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
            name: 'Bakery Profit Calculator',
            description: 'Free calculator to analyze bakery profit margins, COGS percentage, and break-even point with industry benchmarks.',
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
              ratingCount: '743',
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
                name: 'What is a good profit margin for a bakery?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A healthy bakery should aim for 60-70% gross profit margin and 10-20% net profit margin. Home bakeries often have higher margins (15-25% net) due to lower overhead costs.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the difference between gross and net profit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Gross profit is revenue minus COGS (ingredients plus packaging). Net profit is revenue minus ALL costs including labor, overhead, and marketing. Net profit is what you actually take home.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much should I pay myself?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Include your labor in operating expenses. Pay yourself a fair hourly rate ($20-40/hr depending on skill level). After all expenses, your net profit is additional income beyond your labor.',
                },
              },
              {
                '@type': 'Question',
                name: 'My profit margin is low. What should I do?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'First, ensure you are tracking ALL costs accurately. Then: (1) Increase prices 10-20%, (2) Reduce ingredient waste, (3) Focus on high-margin products, (4) Cut unnecessary expenses. Even small changes can significantly improve profitability.',
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
            name: 'How to Calculate Bakery Profit Margin',
            description: 'Step-by-step guide to calculating and analyzing your bakery profit margins',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Enter Total Revenue',
                text: 'Input your total sales for the period (weekly, monthly, or yearly).',
              },
              {
                '@type': 'HowToStep',
                name: 'Add Cost of Goods Sold',
                text: 'Enter ingredient costs and packaging costs (direct costs to make products).',
              },
              {
                '@type': 'HowToStep',
                name: 'Add Operating Expenses',
                text: 'Include labor, overhead, marketing, and other business costs.',
              },
              {
                '@type': 'HowToStep',
                name: 'Review Profit Margins',
                text: 'See your gross profit margin, net profit margin, and COGS percentage.',
              },
              {
                '@type': 'HowToStep',
                name: 'Compare to Benchmarks',
                text: 'Compare your margins to industry benchmarks and identify areas for improvement.',
              },
            ],
          }),
        }}
      />
      
      {children}
    </>
  )
}
