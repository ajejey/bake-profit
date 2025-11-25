import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { ChefHat, Calculator, DollarSign, Scale, TrendingUp, Package, PieChart, CheckCircle, Users, ArrowRight, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Free Baking Calculators & Menu Builder | BakeProfit',
  description: 'Free calculators and menu builder for bakers: recipe cost calculator, cake pricing, recipe scaling, and create beautiful online menus. No signup required.',
  keywords: 'baking calculators, recipe calculator, cake pricing, recipe cost, baking tools, bakery calculator, menu builder, online menu',
}

interface Tool {
  title: string
  description: string
  icon: any
  href: string
  color: string
  popular?: boolean
  comingSoon?: boolean
}

const tools: Tool[] = [
  {
    title: 'Recipe Cost Calculator',
    description: 'Calculate ingredient costs, labor, overhead, and profit margins for any recipe.',
    icon: Calculator,
    href: '/tools/recipe-cost-calculator',
    color: 'rose',
    popular: true,
  },
  {
    title: 'Cake Pricing Calculator',
    description: 'Determine the perfect price for your cakes including all costs and desired profit.',
    icon: DollarSign,
    href: '/tools/cake-pricing-calculator',
    color: 'rose',
    popular: true,
  },
  {
    title: 'Recipe Scaling Calculator',
    description: 'Scale recipes up or down. Adjust servings and batch sizes automatically.',
    icon: Scale,
    href: '/tools/recipe-scaling-calculator',
    color: 'rose',
  },
  {
    title: 'Bakery Profit Calculator',
    description: 'Calculate profit margins and compare to industry benchmarks.',
    icon: TrendingUp,
    href: '/tools/bakery-profit-calculator',
    color: 'rose',
  },
  {
    title: 'Ingredient Cost Calculator',
    description: 'Calculate cost per unit for any ingredient with automatic conversions.',
    icon: Package,
    href: '/tools/ingredient-cost-calculator',
    color: 'rose',
  },
  {
    title: 'Batch Cost Calculator',
    description: 'Calculate total costs and profit for multiple batches.',
    icon: PieChart,
    href: '/tools/batch-cost-calculator',
    color: 'rose',
  },
  {
    title: 'Menu Builder',
    description: 'Create beautiful online menus with templates, QR codes, and shareable links. Auto-populate from your recipes.',
    icon: Globe,
    href: '/bakery-business-tool/storefront',
    color: 'orange',
    popular: true,
  },
]

export default function ToolsPage() {
  // JSON-LD structured data
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Baking Calculators & Tools for Home Bakers',
    description: 'Free calculators for bakers: recipe cost calculator, cake pricing calculator, recipe scaling calculator, and more. No signup required.',
    url: 'https://bakeprofit.vercel.app/tools',
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'BakeProfit',
      url: 'https://bakeprofit.vercel.app',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are these calculators really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All our calculators are 100% free to use with no signup required. We believe every baker should have access to professional pricing tools. If you want to save your calculations and access more features, you can create a free account.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to create an account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No! You can use all calculators without creating an account. However, creating a free account lets you save unlimited recipes, track orders, manage inventory, and access your calculations from any device.',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate are the calculations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our calculators use industry-standard formulas and are designed by professional bakers. The accuracy depends on the data you input—the more precise your ingredient costs and time estimates, the more accurate your results will be.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use these for my commercial bakery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Our calculators work for home bakers, cottage food businesses, and commercial bakeries. For larger operations needing advanced features like inventory management and order tracking, check out our full bakery management platform.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if I need help using a calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each calculator includes detailed instructions and tooltips. We also have comprehensive blog guides for recipe costing, cake pricing, and more. If you still need help, our support team is here to assist you.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do the calculators work on mobile devices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All our calculators are fully responsive and work perfectly on phones, tablets, and desktop computers. Calculate costs while shopping for ingredients or pricing orders on the go.',
        },
      },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Baking Calculators',
    description: 'Professional calculators for home bakers and small bakeries',
    numberOfItems: 6,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Recipe Cost Calculator',
          description: 'Calculate ingredient costs, labor, overhead, and profit margins for any recipe.',
          url: 'https://bakeprofit.vercel.app/tools/recipe-cost-calculator',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Cake Pricing Calculator',
          description: 'Determine the perfect price for your cakes including all costs and desired profit.',
          url: 'https://bakeprofit.vercel.app/tools/cake-pricing-calculator',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Recipe Scaling Calculator',
          description: 'Scale recipes up or down. Adjust servings and batch sizes automatically.',
          url: 'https://bakeprofit.vercel.app/tools/recipe-scaling-calculator',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Bakery Profit Calculator',
          description: 'Calculate profit margins and compare to industry benchmarks.',
          url: 'https://bakeprofit.vercel.app/tools/bakery-profit-calculator',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 5,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Ingredient Cost Calculator',
          description: 'Calculate cost per unit for any ingredient with automatic conversions.',
          url: 'https://bakeprofit.vercel.app/tools/ingredient-cost-calculator',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 6,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Batch Cost Calculator',
          description: 'Calculate total costs and profit for multiple batches.',
          url: 'https://bakeprofit.vercel.app/tools/batch-cost-calculator',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
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
        item: 'https://bakeprofit.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://bakeprofit.vercel.app/tools',
      },
    ],
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BakeProfit',
    url: 'https://bakeprofit.vercel.app',
    logo: 'https://bakeprofit.vercel.app/logo.png',
    description: 'Professional bakery management software and free calculators for home bakers and small bakeries.',
    sameAs: [
      'https://facebook.com/bakeprofit',
      'https://instagram.com/bakeprofit',
      'https://twitter.com/bakeprofit',
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Header with Mobile Navigation */}
      <Header showBlog showTools={false} />

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Free Baking Calculators
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Professional tools for home bakers and small bakeries. Calculate costs, pricing, and profits instantly.
          </p>
          <p className="text-lg text-gray-500 mb-6">
            ✨ No signup required • 100% Free • Mobile-friendly
          </p>
          <Link href="/tools/my-calculations">
            <Button variant="outline" size="lg" className="gap-2">
              <Calculator className="h-5 w-5" />
              View My Saved Calculations
            </Button>
          </Link>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <Card 
                  key={tool.title}
                  className={`relative hover:shadow-lg transition-all ${
                    tool.comingSoon ? 'opacity-75' : 'hover:border-rose-300'
                  }`}
                >
                  {tool.popular && !tool.comingSoon && (
                    <div className="absolute -top-3 -right-3 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      POPULAR
                    </div>
                  )}
                  {tool.comingSoon && (
                    <div className="absolute -top-3 -right-3 bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      COMING SOON
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-rose-100 rounded-lg">
                        <Icon className="h-6 w-6 text-rose-600" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                    <CardDescription className="text-base">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {tool.comingSoon ? (
                      <Button variant="outline" className="w-full" disabled>
                        Coming Soon
                      </Button>
                    ) : (
                      <Link href={tool.href}>
                        <Button className="w-full bg-rose-500 hover:bg-rose-600">
                          Use Calculator →
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Save Your Work?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Sign up free to save unlimited calculations, sync across devices, track orders, manage inventory, and grow your bakery business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?redirect=/tools/my-calculations">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 text-lg px-8 py-6">
                Sign Up Free →
              </Button>
            </Link>
            <Link href="/login?redirect=/tools/my-calculations">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                Already have an account?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Bakers Love Our Calculators
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                <Calculator className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Instant Results
              </h3>
              <p className="text-gray-600">
                Real-time calculations as you type. No waiting, no &quot;Calculate&quot; buttons.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                <ChefHat className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Made for Bakers
              </h3>
              <p className="text-gray-600">
                Designed by bakers, for bakers. We understand your needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                100% Free
              </h3>
              <p className="text-gray-600">
                No hidden fees, no paywalls. All calculators are completely free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Our Calculators Help You Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop guessing. Start pricing with confidence and grow your bakery business profitably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                1
              </div>
              <Card className="h-full pt-6">
                <CardContent>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Enter Your Costs</h3>
                  <p className="text-gray-600">
                    Input ingredient costs, labor time, and overhead expenses. Our calculators handle all the math.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                2
              </div>
              <Card className="h-full pt-6">
                <CardContent>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">See Real-Time Results</h3>
                  <p className="text-gray-600">
                    Watch your costs, margins, and recommended prices update instantly as you type.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                3
              </div>
              <Card className="h-full pt-6">
                <CardContent>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Get Pricing Advice</h3>
                  <p className="text-gray-600">
                    Receive personalized recommendations based on your costs and desired profit margins.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                4
              </div>
              <Card className="h-full pt-6">
                <CardContent>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Price Confidently</h3>
                  <p className="text-gray-600">
                    Know exactly what to charge to cover costs and make the profit you deserve.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perfect For Every Baker
            </h2>
            <p className="text-xl text-gray-600">
              Whether you&apos;re just starting or scaling up, our tools grow with you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <ChefHat className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Home Bakers</CardTitle>
                <CardDescription className="text-base">
                  Starting your baking journey from home? Our calculators help you price competitively while staying profitable.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Calculate recipe costs accurately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Price custom orders confidently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Track ingredient expenses</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-rose-200 border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Small Bakeries</CardTitle>
                <CardDescription className="text-base">
                  Running a cottage food or small commercial bakery? Scale your operations without losing profitability.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Scale recipes for larger batches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Calculate profit margins per item</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Compare product profitability</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Baking Students</CardTitle>
                <CardDescription className="text-base">
                  Learning the business side of baking? Master pricing fundamentals with hands-on practice.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Learn cost calculation methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Understand profit margin basics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Practice with real scenarios</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Thousands of Bakers
            </h2>
            <p className="text-xl text-gray-600">
              See how our calculators are helping bakers price profitably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &quot;I was undercharging for my custom cakes by at least $20 each! This calculator showed me exactly where I was losing money. Game changer!&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-rose-600 font-bold">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah J.</p>
                    <p className="text-sm text-gray-600">Home Baker, Texas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &quot;Finally, a calculator that understands bakery costs! The recipe scaling tool saves me hours every week. No more math mistakes.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-rose-600 font-bold">MC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Maria C.</p>
                    <p className="text-sm text-gray-600">Cottage Bakery Owner, California</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &quot;I increased my prices by 30% after using these calculators and customers are still happy to pay. I just wasn&apos;t valuing my time properly!&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-rose-600 font-bold">DK</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">David K.</p>
                    <p className="text-sm text-gray-600">Wedding Cake Specialist, New York</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are these calculators really free?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! All our calculators are 100% free to use with no signup required. We believe every baker should have access to professional pricing tools. If you want to save your calculations and access more features, you can create a free account.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do I need to create an account?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No! You can use all calculators without creating an account. However, creating a free account lets you save unlimited recipes, track orders, manage inventory, and access your calculations from any device.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How accurate are the calculations?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our calculators use industry-standard formulas and are designed by professional bakers. The accuracy depends on the data you input—the more precise your ingredient costs and time estimates, the more accurate your results will be.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I use these for my commercial bakery?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolutely! Our calculators work for home bakers, cottage food businesses, and commercial bakeries. For larger operations needing advanced features like inventory management and order tracking, check out our full bakery management platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if I need help using a calculator?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Each calculator includes detailed instructions and tooltips. We also have comprehensive blog guides for recipe costing, cake pricing, and more. If you still need help, our support team is here to assist you.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do the calculators work on mobile devices?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! All our calculators are fully responsive and work perfectly on phones, tablets, and desktop computers. Calculate costs while shopping for ingredients or pricing orders on the go.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About Bakery Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Read our in-depth guides to master the art of profitable pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link href="/blog/how-to-calculate-recipe-cost">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    How to Calculate Recipe Cost
                    <ArrowRight className="h-5 w-5 text-rose-600" />
                  </CardTitle>
                  <CardDescription className="text-base">
                    Complete guide to calculating ingredient costs, labor, overhead, and profit margins for any recipe.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/blog/bakery-pricing-formula">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Bakery Pricing Formula
                    <ArrowRight className="h-5 w-5 text-rose-600" />
                  </CardTitle>
                  <CardDescription className="text-base">
                    Learn the exact formula professional bakers use to price baked goods for maximum profitability.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/blog/how-to-start-home-bakery">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    How to Start a Home Bakery
                    <ArrowRight className="h-5 w-5 text-rose-600" />
                  </CardTitle>
                  <CardDescription className="text-base">
                    Step-by-step guide to starting a profitable home bakery business from scratch.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/blog/how-to-price-cupcakes">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    How to Price Cupcakes
                    <ArrowRight className="h-5 w-5 text-rose-600" />
                  </CardTitle>
                  <CardDescription className="text-base">
                    Complete cupcake pricing guide with formulas, examples, and common mistakes to avoid.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link href="/blog">
              <Button variant="outline" size="lg" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                View All Articles →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Price Like a Pro?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Join thousands of bakers who use our calculators to price confidently and grow profitably.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/recipe-cost-calculator">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 text-lg px-8 py-6 w-full sm:w-auto">
                Start Calculating Free →
              </Button>
            </Link>
            <Link href="/bakery-business-tool">
              <Button size="lg" variant="outline" className="border-2 border-white text-rose-600 hover:bg-rose-600 text-lg px-8 py-6 w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
