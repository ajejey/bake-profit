import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Customers Really Pay for Cakes: 2025 Price Survey | BakeProfit',
  description: 'Comprehensive 2025 cake pricing survey reveals what customers actually pay for wedding cakes, birthday cakes, cupcakes, and custom designs. Real market data to help you price confidently.',
  keywords: 'cake prices 2025, wedding cake cost, birthday cake prices, custom cake pricing, cupcake prices, cake pricing survey, bakery pricing guide',
  openGraph: {
    title: 'What Customers Really Pay for Cakes: 2025 Price Survey',
    description: 'Real 2025 pricing data for wedding cakes, birthday cakes, cupcakes & more. Know what customers actually pay.',
    type: 'article',
    url: 'https://bakeprofit.vercel.app/blog/cake-price-survey-2025',
    images: [
      {
        url: 'https://bakeprofit.vercel.app/og-cake-price-survey.png',
        width: 1200,
        height: 630,
        alt: 'What Customers Really Pay for Cakes: 2025 Price Survey',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Customers Really Pay for Cakes: 2025 Price Survey',
    description: 'Real 2025 pricing data for wedding cakes, birthday cakes, cupcakes & more. Know what customers actually pay.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/blog/cake-price-survey-2025',
  },
}

export default function CakePriceSurvey2025Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'What Customers Really Pay for Cakes: 2025 Price Survey',
            description: 'Comprehensive 2025 cake pricing survey reveals what customers actually pay for wedding cakes, birthday cakes, cupcakes, and custom designs across the United States.',
            image: 'https://bakeprofit.vercel.app/og-cake-price-survey.png',
            datePublished: '2025-02-06T00:00:00.000Z',
            dateModified: '2025-02-06T00:00:00.000Z',
            author: {
              '@type': 'Organization',
              name: 'BakeProfit',
              logo: {
                '@type': 'ImageObject',
                url: 'https://bakeprofit.vercel.app/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bakeprofit.vercel.app/blog/cake-price-survey-2025',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How much does a wedding cake cost in 2025?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The average wedding cake costs $917 nationally, with most couples spending between $700-$1,100. Per-slice pricing ranges from $3-$8 for standard designs, and $8-$12 for elaborate custom work with fondant, sugar flowers, or specialty ingredients.',
                },
              },
              {
                '@type': 'Question',
                name: 'What do birthday cakes cost in 2025?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Custom birthday cakes cost $70-$400 on average. A standard 8-inch round cake (serves 15-20) costs $120-$180, while elaborate multi-tier designs cost $200-$800+. Simple sheet cakes range from $25-$60.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much should I charge per cupcake in 2025?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cupcakes typically cost $2-$4 each, or $24-$48 per dozen. Gourmet or custom-decorated cupcakes range from $3.50-$6 each. Wedding cupcakes average $2-$3.50 per cupcake depending on design complexity.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do cake prices vary by location?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, significantly. Major cities like San Francisco average $1,156 for wedding cakes, while smaller cities like St. Louis average $474. Urban areas typically charge 30-50% more than rural areas due to higher overhead costs.',
                },
              },
              {
                '@type': 'Question',
                name: 'What factors affect cake pricing the most?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The biggest factors are: 1) Size and number of servings, 2) Design complexity (fondant vs buttercream, sugar flowers, custom details), 3) Specialty ingredients (gluten-free, vegan, premium flavors), 4) Location (urban vs rural), and 5) Baker experience level.',
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
