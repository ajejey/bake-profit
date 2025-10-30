import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChefHat,
  Calculator, 
  ShoppingCart, 
  Users, 
  Package, 
  Shield, 
  Zap, 
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  DollarSign,
  BarChart3,
  Crown,
  Gift
} from "lucide-react";

export default function Home() {
  // JSON-LD structured data for homepage
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BakeProfit',
    url: 'https://bakeprofit.vercel.app',
    description: 'Free bakery management software for home bakers. Calculate recipe costs, price cakes & cupcakes, track orders, manage inventory.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bakeprofit.vercel.app/tools?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
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
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      availableLanguage: 'English',
    },
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BakeProfit',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Tier',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free access to all calculators and basic features',
      },
      {
        '@type': 'Offer',
        name: 'Pro Tier',
        price: '6.99',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '6.99',
          priceCurrency: 'USD',
          unitText: 'MONTH',
        },
        description: 'Unlimited recipes, orders, Google Drive sync, and priority support',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1247',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Recipe Cost Calculator',
      'Cake Pricing Calculator',
      'Order Management',
      'Inventory Tracking',
      'Recipe Scaling',
      'Profit Analysis',
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      
      {/* Header with Mobile Navigation */}
      <Header showBlog showTools />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="h-4 w-4" />
                Start Free • From $6.99/mo • Works Offline
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Price, Track & Grow Your{" "}
                <span className="text-rose-500">
                  Home Bakery
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Free recipe cost calculator and order tracker for home bakers. Know your profits, 
                price products correctly, and manage your bakery business like a pro.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/bakery-business-tool"
                  className="bg-rose-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Using Free Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a 
                  href="#features"
                  className="border-2 border-rose-500 text-rose-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  See How It Works
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">No credit card needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">Your data stays private</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">Works on any device</span>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                  alt="Home baker decorating beautiful cakes"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
                {/* Floating Stats Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-rose-500">$2,847</div>
                      <div className="text-xs text-gray-600">Monthly Revenue</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">42%</div>
                      <div className="text-xs text-gray-600">Profit Margin</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-500">23</div>
                      <div className="text-xs text-gray-600">Orders This Week</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-rose-200 rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calculator className="h-4 w-4" />
              100% Free • No Signup Required
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Free Baking Calculators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional tools to calculate costs, pricing, and profits. Start using instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Recipe Cost Calculator */}
            <Link href="/tools/recipe-cost-calculator" className="group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-rose-100 hover:border-rose-300 h-full">
                <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Recipe Cost Calculator</h3>
                <p className="text-gray-600 mb-4">
                  Calculate ingredient costs, labor, overhead, and profit margins instantly.
                </p>
                <div className="flex items-center gap-2 text-rose-600 font-semibold">
                  Use Calculator Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Cake Pricing Calculator */}
            <Link href="/tools/cake-pricing-calculator" className="group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-rose-100 hover:border-rose-300 h-full">
                <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cake Pricing Calculator</h3>
                <p className="text-gray-600 mb-4">
                  Determine the perfect price for your cakes including all costs.
                </p>
                <div className="flex items-center gap-2 text-rose-600 font-semibold">
                  Use Calculator Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Recipe Scaling Calculator */}
            <Link href="/tools/recipe-scaling-calculator" className="group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-rose-100 hover:border-rose-300 h-full">
                <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Recipe Scaling Calculator</h3>
                <p className="text-gray-600 mb-4">
                  Scale recipes up or down. Adjust servings and batch sizes automatically.
                </p>
                <div className="flex items-center gap-2 text-rose-600 font-semibold">
                  Use Calculator Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link 
              href="/tools"
              className="inline-flex items-center gap-2 text-rose-600 font-semibold hover:text-rose-700 transition-colors"
            >
              View All Free Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Running a Home Bakery Shouldn&apos;t Feel Like Guesswork
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            You&apos;re amazing at baking, but keeping track of costs, orders, and inventory in spreadsheets? 
            That&apos;s time you could spend creating more delicious treats.
          </p>
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 bg-red-50 rounded-xl">
              <div className="text-4xl mb-3">😰</div>
              <h3 className="font-bold text-gray-900 mb-2">Pricing Confusion</h3>
              <p className="text-sm text-gray-600">Not sure if you&apos;re charging enough to make a profit?</p>
            </div>
            <div className="p-6 bg-red-50 rounded-xl">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-bold text-gray-900 mb-2">Order Chaos</h3>
              <p className="text-sm text-gray-600">Juggling orders across texts, emails, and sticky notes?</p>
            </div>
            <div className="p-6 bg-red-50 rounded-xl">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold text-gray-900 mb-2">No Clear Picture</h3>
              <p className="text-sm text-gray-600">Can&apos;t see which products are actually making you money?</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-rose-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional bakery management tools designed specifically for home bakers and small businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="w-14 h-14 bg-rose-500 rounded-xl flex items-center justify-center mb-6">
                <Calculator className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Recipe Cost Calculator</h3>
              <p className="text-gray-600 mb-4">
                Know exactly how much each recipe costs. Add ingredients, set quantities, and instantly see 
                your cost per serving. Never underprice your creations again.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Track ingredient costs automatically</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Calculate cost per serving instantly</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Scale recipes up or down easily</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <ShoppingCart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Order Tracking</h3>
              <p className="text-gray-600 mb-4">
                Keep all your orders organized in one place. Track status, due dates, and customer details. 
                Never miss a delivery or forget a custom request.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Manage orders from new to delivered</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>See what&apos;s due today and this week</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Add notes and special instructions</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <Package className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Inventory Management</h3>
              <p className="text-gray-600 mb-4">
                Stop running out of ingredients mid-bake. Track stock levels, get low-stock alerts, 
                and generate shopping lists automatically.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Real-time inventory tracking</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Low stock alerts and notifications</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Auto-generate shopping lists</span>
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Pricing Calculator</h3>
              <p className="text-gray-600 mb-4">
                Price your products for profit. Factor in ingredients, labor, overhead, and desired margins. 
                Get recommended pricing that ensures profitability.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Include all costs (labor + overhead)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Set target profit margins</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Get instant pricing recommendations</span>
                </li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Customer Management</h3>
              <p className="text-gray-600 mb-4">
                Build lasting relationships. Keep customer details, order history, and preferences organized. 
                Know who your best customers are.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Store customer contact info</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Track order history per customer</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Identify your top customers</span>
                </li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Business Analytics</h3>
              <p className="text-gray-600 mb-4">
                See your business at a glance. Track revenue, profit trends, and best-selling products. 
                Make data-driven decisions to grow faster.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Revenue and profit tracking</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Best-selling product insights</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Weekly and monthly reports</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Home Bakers Love BakeProfit
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From free calculators to complete business management—everything you need to run a profitable bakery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free Tier Available</h3>
              <p className="text-gray-600">
                Get started with essential features at no cost. Perfect for beginners and hobbyists.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pro Features</h3>
              <p className="text-gray-600">
                Unlock advanced tools and unlimited usage with our affordable Pro subscription.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your Data Stays Private</h3>
              <p className="text-gray-600">
                Everything is stored locally on your device. We never see or store your data.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Works Offline</h3>
              <p className="text-gray-600">
                No internet? No problem. The tool works perfectly offline, anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              No complicated setup. Start managing your bakery in minutes.
            </p>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Add Your Ingredients</h3>
                <p className="text-gray-600">
                  Enter the ingredients you use, along with their costs. The tool will calculate 
                  cost per unit automatically.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Create Your Recipes</h3>
                <p className="text-gray-600">
                  Build recipes by selecting ingredients and quantities. Instantly see the total cost 
                  and suggested pricing for profitability.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Track Orders & Grow</h3>
                <p className="text-gray-600">
                  Add orders, manage customers, track inventory, and watch your analytics. 
                  Make informed decisions to grow your business.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/bakery-business-tool"
              className="inline-flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-600 transition-all duration-300"
            >
              Try It Now - It&apos;s Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by Home Bakers Everywhere
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-rose-100 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                &quot;This tool changed everything! I finally know exactly how much to charge for my cakes. 
                My profit margins have doubled since I started using it.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sarah M.</div>
                  <div className="text-sm text-gray-600">Home Baker, Texas</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-rose-100 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                &quot;No more sticky notes and spreadsheet chaos! All my orders are organized in one place. 
                I can actually focus on baking instead of admin work.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                  JL
                </div>
                <div>
                  <div className="font-bold text-gray-900">Jessica L.</div>
                  <div className="text-sm text-gray-600">Cake Artist, California</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-rose-100 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                &quot;The inventory tracking is a lifesaver! I never run out of ingredients anymore, and the 
                shopping list feature saves me so much time.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                  MR
                </div>
                <div>
                  <div className="font-bold text-gray-900">Maria R.</div>
                  <div className="text-sm text-gray-600">Pastry Chef, Florida</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-rose-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free forever. Upgrade when you&apos;re ready to grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-2xl border-2 border-rose-100 shadow-lg">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/forever</span>
                </div>
                <p className="text-gray-600">Perfect for hobbyists and getting started</p>
              </div>

              <Link 
                href="/bakery-business-tool"
                className="block w-full bg-rose-100 text-rose-700 px-6 py-3 rounded-full font-semibold text-center hover:bg-rose-200 transition-all mb-6"
              >
                Start Free Now
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
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-8 rounded-2xl shadow-2xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-bold text-white">$6.99</span>
                  <span className="text-rose-100">/month</span>
                </div>
                <p className="text-rose-100 mb-4">or $69/year (save $14)</p>
                <p className="text-white">For growing bakery businesses</p>
              </div>

              <Link 
                href="/bakery-business-tool"
                className="block w-full bg-white text-rose-600 px-6 py-3 rounded-full font-bold text-center hover:bg-rose-50 transition-all mb-6"
              >
                Start Free Trial
              </Link>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white"><strong>UNLIMITED</strong> recipes</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white"><strong>UNLIMITED</strong> orders</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white"><strong>UNLIMITED</strong> customers</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white"><strong>UNLIMITED</strong> inventory</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">All features accessible</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">Advanced analytics & reports</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white"><strong>Google Drive auto-sync</strong> ⭐</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">Priority email support</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">No branding on exports</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 text-sm">
              All plans include a 30-day money-back guarantee. No credit card required for free plan.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-rose-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <details className="bg-white p-6 rounded-xl border border-rose-100 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Is there a free plan?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! Our free plan is generous and available forever. You get 5 recipes, 15 orders/month, 10 customers, 
                20 inventory items, and access to all features. No credit card required. Upgrade to Pro ($6.99/mo) 
                when you need unlimited everything and Google Drive sync.
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl border border-rose-100 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What’s included in the Pro plan?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Pro gives you unlimited recipes, orders, customers, and inventory. Plus advanced analytics, 
                Google Drive auto-sync (so you never lose data), priority support, and no BakeProfit branding. 
                Just $6.99/month or $69/year (save $14).
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl border border-rose-100 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Is my data safe and private?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Absolutely! Free plan data is stored locally in your browser. Pro users get automatic Google Drive 
                sync for backup and access across devices. We never collect or sell your data. You own it 100%.
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl border border-rose-100 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I use this on my phone or tablet?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! The tool is fully responsive and works perfectly on desktop, tablet, and mobile devices. 
                Manage your bakery business from anywhere.
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl border border-rose-100 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I cancel anytime?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! No contracts or commitments. Cancel your Pro subscription anytime and you’ll automatically 
                move to the free plan. You keep all your data. We also offer a 30-day money-back guarantee.
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl border border-rose-100 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Does it work offline?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! Once loaded, the tool works completely offline. Perfect for when you&apos;re baking and 
                don&apos;t want to worry about internet connectivity.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-rose-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Price with Confidence & Grow Your Bakery?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join home bakers who are calculating profits accurately, tracking orders effortlessly, 
            and growing their businesses. Start free today—upgrade when you&apos;re ready.
          </p>
          <Link 
            href="/bakery-business-tool"
            className="inline-flex items-center gap-2 bg-white text-rose-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-50 transition-all duration-300"
          >
            Start Using Free Now
            <ArrowRight className="h-6 w-6" />
          </Link>
          <p className="mt-6 text-sm opacity-75">
            Start free forever • Upgrade to Pro for $6.99/mo • 30-day money-back guarantee
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
