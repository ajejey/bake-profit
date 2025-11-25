import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Free & Pro Plans | BakeProfit',
  description: 'Start free forever with 5 recipes & 15 orders/month. Upgrade to Pro for $6.99/mo for unlimited everything. No credit card required to start.',
  keywords: 'bakeprofit pricing, bakery software pricing, recipe calculator pricing, home bakery software cost',
  openGraph: {
    title: 'BakeProfit Pricing - Start Free, Upgrade When Ready',
    description: 'Free tier: 5 recipes, 15 orders/month. Pro: $6.99/mo for unlimited. No credit card needed.',
    type: 'website',
    url: 'https://bakeprofit.vercel.app/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BakeProfit Pricing - Free & Pro Plans',
    description: 'Start free forever. Pro just $6.99/mo for unlimited recipes, orders.',
  },
  alternates: {
    canonical: 'https://bakeprofit.vercel.app/pricing',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Product Schema with Pricing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'BakeProfit Pro',
            description: 'Professional bakery management software with unlimited recipes, orders, customers, and Google Drive sync',
            brand: {
              '@type': 'Brand',
              name: 'BakeProfit',
            },
            offers: [
              {
                '@type': 'Offer',
                name: 'Free Tier',
                price: '0',
                priceCurrency: 'USD',
                description: '5 recipes, 15 orders/month, 10 customers, all calculators',
                availability: 'https://schema.org/InStock',
              },
              {
                '@type': 'Offer',
                name: 'Pro Monthly',
                price: '6.99',
                priceCurrency: 'USD',
                priceValidUntil: '2025-12-31',
                availability: 'https://schema.org/InStock',
                description: 'Unlimited everything',
              },
              {
                '@type': 'Offer',
                name: 'Pro Yearly',
                price: '69',
                priceCurrency: 'USD',
                priceValidUntil: '2025-12-31',
                availability: 'https://schema.org/InStock',
                description: 'Unlimited everything (save 17%)',
              },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '1247',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />
      {children}
    </>
  )
}
