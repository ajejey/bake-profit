import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Bakery Success Rates: What Makes Businesses Thrive | BakeProfit',
  description: 'Discover the real success rates of home bakeries, why 60% fail in 3 years, and the proven factors that make bakery businesses thrive. Data-driven insights and actionable strategies.',
  keywords: 'home bakery success rate, bakery failure rate, cottage food business success, bakery statistics 2025, what makes bakeries successful, home bakery best practices',
  openGraph: {
    title: 'Home Bakery Success Rates: What Makes Businesses Thrive',
    description: 'Real data on bakery success rates and the proven factors that separate thriving bakeries from those that fail.',
    type: 'article',
    url: 'https://bakeprofit.com/blog/home-bakery-success-rates',
    images: [
      {
        url: 'https://bakeprofit.com/og-bakery-success-rates.png',
        width: 1200,
        height: 630,
        alt: 'Home Bakery Success Rates: What Makes Businesses Thrive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Bakery Success Rates: What Makes Businesses Thrive',
    description: 'Real data on bakery success rates and the proven factors that separate thriving bakeries from those that fail.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/blog/home-bakery-success-rates',
  },
}

export default function HomeBakerySuccessRatesLayout({
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
            headline: 'Home Bakery Success Rates: What Makes Businesses Thrive',
            description: 'Comprehensive analysis of home bakery success and failure rates, including statistics, success factors, common pitfalls, and best practices for building a thriving bakery business.',
            image: 'https://bakeprofit.com/og-bakery-success-rates.png',
            datePublished: '2025-02-06T00:00:00.000Z',
            dateModified: '2025-02-06T00:00:00.000Z',
            author: {
              '@type': 'Organization',
              name: 'BakeProfit',
              logo: {
                '@type': 'ImageObject',
                url: 'https://bakeprofit.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bakeprofit.com/blog/home-bakery-success-rates',
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
                name: 'What is the success rate of home bakeries?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'About 60% of bakeries succeed past their first 3 years, meaning 40% close within that timeframe. However, home bakeries operating under cottage food laws often have higher success rates (65-70%) due to lower overhead costs and startup investment.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why do bakeries fail?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The top reasons bakeries fail include: poor pricing and food cost management (not tracking ingredient costs), inconsistent product quality, inadequate marketing, cash flow problems, and underestimating time and labor requirements. Many bakers also fail to pay themselves, leading to burnout.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes a home bakery successful?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Successful home bakeries share common traits: accurate cost tracking and profitable pricing, consistent product quality, strong customer relationships, effective social media marketing, proper business planning, and sustainable work-life balance. They also reinvest profits strategically and pay themselves regularly.',
                },
              },
              {
                '@type': 'Question',
                name: 'How profitable are home bakeries?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Survey data shows 35% of home bakers are confident they are making money, while 40% are unsure and 26% know they are not profitable. The key difference is cost tracking—successful bakers calculate ingredient costs, labor, and overhead, then price accordingly with 30-50% profit margins.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long does it take for a home bakery to become profitable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most home bakeries take 6-12 months to become consistently profitable. The timeline depends on startup costs, pricing strategy, marketing effectiveness, and whether the baker tracks costs from day one. Bakers who start with proper pricing and cost tracking often see profits within 3-6 months.',
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
