import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Cake Pricing Calculator | How Much to Charge for Cakes',
  description: 'Calculate the perfect price for your cakes with our free cake pricing calculator. Factor in ingredients, labor, tiers, complexity, delivery, and profit margins. Perfect for cake decorators and bakers.',
  keywords: 'cake pricing calculator, how much to charge for cakes, cake price calculator, wedding cake pricing, custom cake pricing, cake decorator pricing, bakery pricing calculator',
  openGraph: {
    title: 'Free Cake Pricing Calculator for Cake Decorators',
    description: 'Calculate cake prices including ingredients, labor, tiers, complexity, and delivery. Free tool for cake decorators.',
    type: 'website',
    url: 'https://bakeprofit.com/tools/cake-pricing-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Cake Pricing Calculator',
    description: 'Calculate the perfect price for your cakes. Free tool for cake decorators and bakers.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/tools/cake-pricing-calculator',
  },
}

export default function CakePricingCalculatorLayout({
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
            name: 'Cake Pricing Calculator',
            description: 'Free calculator to determine the perfect price for custom cakes, wedding cakes, and specialty cakes.',
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
              ratingCount: '892',
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
                name: 'How much should I charge per serving?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It depends on your market and cake complexity. Simple cakes: $3-4/serving. Custom decorated: $4-6/serving. Wedding cakes: $5-8/serving. Elaborate designs: $8-12+/serving.',
                },
              },
              {
                '@type': 'Question',
                name: 'What profit margin should I aim for?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most successful cake businesses aim for 50-100% profit margin. This accounts for overhead, taxes, and business growth. Do not go below 40% or you will struggle to stay profitable.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I charge for delivery?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Delivery includes gas, time, vehicle wear, and the risk of transporting a delicate cake. Charge $1.50-3 per mile, with a minimum delivery fee of $15-25.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I price custom designs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Start with your base price, then add 20-50% for moderate custom work, 50-100% for complex designs, and 100-200% for extremely intricate or time-consuming decorations.',
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
            name: 'How to Price a Cake',
            description: 'Step-by-step guide to calculating the perfect price for your custom cakes',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Enter Cake Details',
                text: 'Specify cake type, number of tiers, servings, and complexity level.',
              },
              {
                '@type': 'HowToStep',
                name: 'Add Material Costs',
                text: 'Enter costs for ingredients, decorations, and packaging materials.',
              },
              {
                '@type': 'HowToStep',
                name: 'Calculate Labor',
                text: 'Input your hourly rate and time spent on baking, decorating, and setup.',
              },
              {
                '@type': 'HowToStep',
                name: 'Include Delivery',
                text: 'Add delivery distance and cost per mile if applicable.',
              },
              {
                '@type': 'HowToStep',
                name: 'Set Profit Margin',
                text: 'Choose your desired profit margin percentage to get the final recommended price.',
              },
            ],
          }),
        }}
      />
      
      {children}
    </>
  )
}
