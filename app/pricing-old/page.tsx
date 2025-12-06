import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Lock, 
  Shield
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Pricing | BakeProfit - Affordable Bakery Management Software',
  description: 'Simple, transparent pricing for bakery management software. Start free forever or upgrade to Pro for $6.99/month. No hidden fees, cancel anytime.',
  keywords: 'bakery software pricing, recipe cost calculator pricing, bakery management cost, affordable bakery tools',
  openGraph: {
    title: 'BakeProfit Pricing - Start Free, Upgrade When Ready',
    description: 'Simple, transparent pricing. Free plan forever or Pro at $6.99/month. All plans include 30-day money-back guarantee.',
    url: 'https://bakeprofit.com/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BakeProfit Pricing - Affordable Bakery Software',
    description: 'Start free forever. Upgrade to Pro for just $6.99/month.',
  },
}

export default function PricingPage() {
  // JSON-LD Structured Data
  const pricingSchema = {
    '@context': 'https://schema.org',
    '@type': 'PricingTable',
    name: 'BakeProfit Pricing',
    description: 'Transparent pricing for bakery management software',
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Plan',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: 'Perfect for hobbyists and getting started',
        url: 'https://bakeprofit.com/bakery-business-tool',
      },
      {
        '@type': 'Offer',
        name: 'Pro Plan',
        price: '6.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: 'For growing bakery businesses',
        url: 'https://bakeprofit.com/bakery-business-tool',
        billingDuration: 'P1M',
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is there a free plan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our free plan is generous and available forever. You get 5 recipes, 15 orders/month, 10 customers, 20 inventory items, and access to all features. No credit card required.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in the Pro plan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pro includes unlimited recipes, orders, customers, and inventory. Plus advanced analytics, Google Drive auto-sync, priority support, and no BakeProfit branding. Just $6.99/month or $69/year.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I cancel anytime?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! No contracts or commitments. Cancel your Pro subscription anytime and you will automatically revert to the free plan.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my data safe and private?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Free plan data is stored locally in your browser. Pro users get automatic Google Drive sync for backup. We never collect or sell your data.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer a money-back guarantee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All plans include a 30-day money-back guarantee. If you are not satisfied, we will refund your money, no questions asked.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I upgrade or downgrade anytime?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can upgrade to Pro or downgrade to Free anytime. Changes take effect immediately.',
        },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bakeprofit.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pricing',
        item: 'https://bakeprofit.com/pricing',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <Header showBlog showTools />

      {/* Breadcrumbs */}
      {/* <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-white"> */}
        <div className="max-w-6xl pt-2 mx-auto">
          <Breadcrumbs items={[{ label: 'Pricing' }]} />
        </div>
      {/* </section> */}

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Simple, Transparent Pricing
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Pricing That Grows With Your Bakery
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start free forever. Upgrade to Pro when you need unlimited everything and Google Drive sync. 
            No hidden fees, no surprises.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              No credit card needed
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              30-day money-back
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Free Plan */}
            <Card className="relative border-2 border-gray-200 hover:border-rose-200 transition-colors">
              <CardHeader>
                <div className="mb-4">
                  <CardTitle className="text-2xl mb-2">Free</CardTitle>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-600">/forever</span>
                  </div>
                  <CardDescription className="text-base">
                    Perfect for hobbyists and getting started
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <Link href="/bakery-business-tool" className="block w-full mb-6">
                  <Button className="w-full bg-rose-100 text-rose-700 hover:bg-rose-200">
                    Start Free Now
                  </Button>
                </Link>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>5 recipes</strong></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>15 orders</strong> per month</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>10 customers</strong></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>20 inventory items</strong></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">All features accessible</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Basic analytics</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Local storage</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Export data</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>Beautiful Menu Builder</strong></span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-2 border-rose-300 shadow-xl bg-gradient-to-br from-rose-50 to-white">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  MOST POPULAR
                </span>
              </div>

              <CardHeader>
                <div className="mb-4">
                  <CardTitle className="text-2xl mb-2">Pro</CardTitle>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-bold text-rose-600">$6.99</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">or <strong>$69/year</strong> (save $14)</p>
                  <CardDescription className="text-base">
                    For growing bakery businesses
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <Link href="/bakery-business-tool" className="block w-full mb-6">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900"><strong>UNLIMITED</strong> recipes</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900"><strong>UNLIMITED</strong> orders</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900"><strong>UNLIMITED</strong> customers</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900"><strong>UNLIMITED</strong> inventory</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">All features accessible</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">Advanced analytics & reports</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900"><strong>Google Drive auto-sync</strong> ⭐</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">Priority email support</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">No branding on exports</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900"><strong>Beautiful Menu Builder</strong></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              ✅ All plans include a <strong>30-day money-back guarantee</strong>. No credit card required for free plan.
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BakeProfit?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-rose-100">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No API calls for 95% of actions. Instant calculations and updates. Works offline, works online.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rose-100">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Your Data Stays Private</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Everything stored locally on your device. We never see or sell your data. You own it 100%.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rose-100">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Backed by Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  30-day money-back guarantee on Pro. No questions asked. We&apos;re confident you&apos;ll love it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Is there a free plan?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! Our free plan is generous and available forever. You get 5 recipes, 15 orders/month, 10 customers, 20 inventory items, and access to all features. No credit card required. Upgrade to Pro ($6.99/mo) when you need unlimited everything and Google Drive sync.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What&apos;s included in the Pro plan?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Pro gives you unlimited recipes, orders, customers, and inventory. Plus advanced analytics, Google Drive auto-sync (so you never lose data), priority support, and no BakeProfit branding. Just $6.99/month or $69/year (save $14).
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I cancel anytime?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! No contracts or commitments. Cancel your Pro subscription anytime and you will automatically revert to the free plan. Your data stays with you.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Is my data safe and private?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Absolutely! Free plan data is stored locally in your browser. Pro users get automatic Google Drive sync for backup and access across devices. We never collect or sell your data. You own it 100%.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Do you offer a money-back guarantee?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! All plans include a 30-day money-back guarantee. If you are not satisfied, we will refund your money, no questions asked.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I upgrade or downgrade anytime?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! You can upgrade to Pro or downgrade to Free anytime. Changes take effect immediately. You only pay for the time you use.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-500 to-rose-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Grow Your Bakery?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Start free today. No credit card required. Upgrade to Pro whenever you&apos;re ready.
          </p>
          <Link href="/bakery-business-tool">
            <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 text-lg px-8 py-6">
              Start Free Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
