import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Start a Home Bakery Business: Complete Guide (2025)',
  description: 'Complete guide to starting a profitable home bakery. Learn legal requirements, pricing strategies, marketing tactics, and systems you need to succeed.',
  keywords: 'how to start a home bakery, home bakery business, cottage food laws, home bakery license, start baking business from home, home bakery pricing',
  openGraph: {
    title: 'How to Start a Home Bakery Business: Complete Guide (2025)',
    description: 'Complete guide to starting a profitable home bakery from legal requirements to pricing and marketing.',
    type: 'article',
    url: 'https://bakeprofit.vercel.app/blog/how-to-start-home-bakery',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Start a Home Bakery Business: Complete Guide',
    description: 'Everything you need to start a profitable home bakery in 2025.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/blog/how-to-start-home-bakery',
  },
}

export default function HomeBakeryGuideBlogLayout({
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
            headline: 'How to Start a Home Bakery Business: Complete Guide (2025)',
            description: 'Complete guide to starting a profitable home bakery including legal requirements, equipment, pricing strategies, and marketing tactics.',
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
            datePublished: '2025-01-15',
            dateModified: '2025-01-15',
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
            name: 'How to Start a Home Bakery Business',
            description: 'Step-by-step guide to starting a profitable home bakery business from your home kitchen.',
            totalTime: 'P30D',
            estimatedCost: {
              '@type': 'MonetaryAmount',
              currency: 'USD',
              value: '500-2000',
            },
            step: [
              {
                '@type': 'HowToStep',
                name: 'Check Legal Requirements',
                text: 'Research your state cottage food laws, obtain business license, food handler permit, and insurance.',
              },
              {
                '@type': 'HowToStep',
                name: 'Set Up Your Kitchen',
                text: 'Purchase essential equipment including stand mixer, digital scale, pans, and packaging supplies.',
              },
              {
                '@type': 'HowToStep',
                name: 'Choose Your Products',
                text: 'Select 3-5 products you can make exceptionally well and calculate profitability for each.',
              },
              {
                '@type': 'HowToStep',
                name: 'Set Profitable Prices',
                text: 'Calculate all costs (ingredients, labor, overhead) and add 50-100% profit margin.',
              },
              {
                '@type': 'HowToStep',
                name: 'Market Your Bakery',
                text: 'Create social media presence, build word-of-mouth, and establish online ordering system.',
              },
            ],
          }),
        }}
      />
      
      {children}
    </>
  )
}
