'use client'

import Link from 'next/link'
import { Camera, Instagram, CheckCircle, AlertTriangle, Star, Eye, Image as ImageIcon, Smartphone, TrendingUp, Users, MapPin, XCircle, DollarSign, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '../layout/Footer'

export default function BakeryPortfolioArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → Creating a Bakery Portfolio That Attracts Orders
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Creating a Bakery Portfolio That Attracts Orders
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Feb 7, 2025</span> • <span>16 min read</span> • <span className="text-rose-600 font-semibold">Marketing</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            You&apos;re scrolling through Instagram and see three bakeries selling cupcakes. One charges $2, another $5, and a third $8 per cupcake. They all look beautiful. So what&apos;s the difference? And more importantly—which price point is right for YOUR bakery?
          </p>

          <p className="text-xl text-gray-700">
            Here&apos;s the truth: <strong>There&apos;s no single &quot;correct&quot; cupcake price.</strong> The right price depends on your costs, your market, your positioning, and your business goals. A $2 cupcake can be just as profitable as an $8 one—if you understand the strategy behind it.
          </p>

          <p className="text-lg text-gray-700">
            In this guide, I&apos;ll break down the three main cupcake pricing tiers, show you the real costs and profit margins at each level, and help you figure out which strategy fits your bakery. By the end, you&apos;ll know exactly where you belong in the market—and how to price profitably.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Calculator className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Calculate Your Cupcake Costs</h3>
                  <p className="mb-4">Use our free calculator to find out your true cost per cupcake and what you should charge for each pricing tier. Takes 2 minutes.</p>
                  <Link href="/tools/recipe-cost-calculator">
                    <Button className="bg-rose-500 hover:bg-rose-600">Calculate Your Price →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <div className="bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li><a href="#three-tiers" className="hover:text-rose-600">The Three Cupcake Pricing Tiers Explained</a></li>
              <li><a href="#budget-tier" className="hover:text-rose-600">Budget Tier ($2-3): High Volume, Low Margin Strategy</a></li>
              <li><a href="#mid-tier" className="hover:text-rose-600">Mid-Tier ($4-6): The Sweet Spot for Most Home Bakers</a></li>
              <li><a href="#premium-tier" className="hover:text-rose-600">Premium Tier ($7-10): Luxury Positioning Strategy</a></li>
              <li><a href="#cost-breakdown" className="hover:text-rose-600">Real Cost Breakdown: What Each Tier Actually Costs</a></li>
              <li><a href="#which-tier" className="hover:text-rose-600">Which Tier is Right for Your Bakery?</a></li>
              <li><a href="#positioning" className="hover:text-rose-600">How to Position Yourself in Your Chosen Tier</a></li>
              <li><a href="#mistakes" className="hover:text-rose-600">5 Pricing Mistakes That Kill Cupcake Profits</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* Section 1: Three Tiers Overview */}
          <section id="three-tiers">
            <h2 className="text-3xl font-bold mb-4">The Three Cupcake Pricing Tiers Explained</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Before we dive deep into each tier, let&apos;s understand the landscape. Cupcake pricing generally falls into three distinct categories, each with its own strategy, target customer, and profit model.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Budget Tier</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600 mb-2">$2-3</p>
                <p className="text-gray-700 text-sm mb-3">per cupcake</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• High volume sales</li>
                  <li>• Simple designs</li>
                  <li>• Standard ingredients</li>
                  <li>• Price-conscious customers</li>
                  <li>• Grocery store competition</li>
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Mid-Tier</h3>
                </div>
                <p className="text-3xl font-bold text-green-600 mb-2">$4-6</p>
                <p className="text-gray-700 text-sm mb-3">per cupcake</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Balanced volume & margin</li>
                  <li>• Custom designs available</li>
                  <li>• Quality ingredients</li>
                  <li>• Value-seeking customers</li>
                  <li>• Sweet spot for home bakers</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">Premium Tier</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600 mb-2">$7-10</p>
                <p className="text-gray-700 text-sm mb-3">per cupcake</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Low volume, high margin</li>
                  <li>• Intricate custom designs</li>
                  <li>• Premium/organic ingredients</li>
                  <li>• Luxury-seeking customers</li>
                  <li>• Artisan positioning</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Key Insight:</p>
              <p className="text-gray-700">
                Your pricing tier isn&apos;t just about the number—it&apos;s about your entire business model. A budget baker needs to make 100 cupcakes to earn what a premium baker makes from 25. Both can be profitable, but they require completely different strategies.
              </p>
            </div>
          </section>

          {/* Section 2: Budget Tier */}
          <section id="budget-tier">
            <h2 className="text-3xl font-bold mb-4">Budget Tier ($2-3): High Volume, Low Margin Strategy</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              The budget tier is all about volume. You&apos;re competing with grocery stores and big-box bakeries, so your advantage is freshness, customization, and local charm—not premium ingredients or intricate designs.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Who This Works For</h3>
            <ul className="text-gray-700 space-y-2 ml-6 mb-6">
              <li>• Bakers in price-sensitive markets (small towns, lower-income areas)</li>
              <li>• Those who can produce cupcakes very efficiently (under 15 minutes per dozen)</li>
              <li>• Bakers with access to wholesale ingredient pricing</li>
              <li>• Those selling at farmers markets, school events, or bulk orders</li>
              <li>• Bakers who enjoy high-volume production</li>
            </ul>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Budget Tier Cost Breakdown (per cupcake)</h3>
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Ingredients (standard):</span>
                  <span className="font-semibold text-gray-900">$0.40-0.60</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Packaging (liner, basic box):</span>
                  <span className="font-semibold text-gray-900">$0.15-0.25</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Labor (1 min @ $20/hr):</span>
                  <span className="font-semibold text-gray-900">$0.33</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Overhead (utilities, etc.):</span>
                  <span className="font-semibold text-gray-900">$0.10-0.15</span>
                </div>
                <div className="flex justify-between pb-3 border-b-2 border-gray-400">
                  <span className="font-bold text-gray-900">Total Cost:</span>
                  <span className="font-bold text-gray-900">$0.98-1.33</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-700">Selling at $2.50:</span>
                  <span className="font-semibold text-green-600">$1.17-1.52 profit</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Profit Margin:</span>
                  <span className="font-bold text-green-600">47-61%</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">The Math: Can You Actually Make Money?</h3>
              <p className="text-gray-700 mb-3">
                Let&apos;s say you sell cupcakes at $2.50 each with a $1.35 profit per cupcake:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6 mb-3">
                <li>• To make $500/month: Need to sell <strong>370 cupcakes</strong> (31 dozen)</li>
                <li>• To make $1,000/month: Need to sell <strong>741 cupcakes</strong> (62 dozen)</li>
                <li>• To make $2,000/month: Need to sell <strong>1,482 cupcakes</strong> (124 dozen)</li>
              </ul>
              <p className="text-gray-700 font-semibold">
                At 1 minute per cupcake, making $2,000/month requires <strong>24.7 hours of labor</strong>. That&apos;s doable, but you need consistent high-volume orders.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Pros & Cons</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Pros
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-6">
                  <li>• Large customer base (everyone loves a deal)</li>
                  <li>• Easier to get bulk orders</li>
                  <li>• Less pressure for perfection</li>
                  <li>• Can scale with systems</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Cons
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-6">
                  <li>• Need very high volume to profit</li>
                  <li>• Thin margins = no room for error</li>
                  <li>• Competing with grocery stores</li>
                  <li>• Can&apos;t afford premium ingredients</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Mid-Tier */}
          <section id="mid-tier">
            <h2 className="text-3xl font-bold mb-4">Mid-Tier ($4-6): The Sweet Spot for Most Home Bakers</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              This is where most successful home bakers land. You&apos;re not the cheapest option, but you&apos;re not luxury either. You offer quality, customization, and personal service at a price that feels fair to customers.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Who This Works For</h3>
            <ul className="text-gray-700 space-y-2 ml-6 mb-6">
              <li>• Home bakers in suburban or mid-sized city markets</li>
              <li>• Those who want to balance quality and profitability</li>
              <li>• Bakers offering custom designs and flavors</li>
              <li>• Those targeting birthdays, celebrations, and events</li>
              <li>• Bakers who value work-life balance (moderate volume)</li>
            </ul>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Mid-Tier Cost Breakdown (per cupcake)</h3>
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Ingredients (quality):</span>
                  <span className="font-semibold text-gray-900">$0.75-1.00</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Packaging (branded box, liner):</span>
                  <span className="font-semibold text-gray-900">$0.30-0.40</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Labor (2 min @ $25/hr):</span>
                  <span className="font-semibold text-gray-900">$0.83</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Overhead:</span>
                  <span className="font-semibold text-gray-900">$0.20-0.30</span>
                </div>
                <div className="flex justify-between pb-3 border-b-2 border-gray-400">
                  <span className="font-bold text-gray-900">Total Cost:</span>
                  <span className="font-bold text-gray-900">$2.08-2.53</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-700">Selling at $5.00:</span>
                  <span className="font-semibold text-green-600">$2.47-2.92 profit</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Profit Margin:</span>
                  <span className="font-bold text-green-600">49-58%</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">The Math: Sustainable Income</h3>
              <p className="text-gray-700 mb-3">
                At $5 per cupcake with $2.70 profit per cupcake:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6 mb-3">
                <li>• To make $500/month: Need to sell <strong>185 cupcakes</strong> (15 dozen)</li>
                <li>• To make $1,000/month: Need to sell <strong>370 cupcakes</strong> (31 dozen)</li>
                <li>• To make $2,000/month: Need to sell <strong>741 cupcakes</strong> (62 dozen)</li>
              </ul>
              <p className="text-gray-700 font-semibold">
                At 2 minutes per cupcake, making $2,000/month requires <strong>24.7 hours of labor</strong>. Same hours as budget tier, but you make TWICE the profit per cupcake.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Why This is the Sweet Spot</h3>
            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 mb-6">
              <ul className="text-gray-700 space-y-3">
                <li>• <strong>Better margins:</strong> You make $2.70 per cupcake vs $1.35 at budget tier—double the profit for similar effort</li>
                <li>• <strong>Manageable volume:</strong> You don&apos;t need to sell 1,500 cupcakes/month to make decent money</li>
                <li>• <strong>Room for quality:</strong> You can afford real butter, quality vanilla, and better ingredients</li>
                <li>• <strong>Custom work pays off:</strong> Customers expect and pay for personalization</li>
                <li>• <strong>Less competition:</strong> You&apos;re not competing with Walmart anymore</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Pros & Cons</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Pros
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-6">
                  <li>• Best profit-to-effort ratio</li>
                  <li>• Sustainable workload</li>
                  <li>• Can use quality ingredients</li>
                  <li>• Customers value your work</li>
                  <li>• Room for creativity</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Cons
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-6">
                  <li>• More competition at this tier</li>
                  <li>• Need to justify higher prices</li>
                  <li>• Customers expect consistency</li>
                  <li>• Still need decent volume</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Premium Tier */}
          <section id="premium-tier">
            <h2 className="text-3xl font-bold mb-4">Premium Tier ($7-10): Luxury Positioning Strategy</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Premium pricing is about exclusivity, artistry, and premium ingredients. You&apos;re not selling cupcakes—you&apos;re selling edible art. Your customers aren&apos;t price-shopping; they&apos;re looking for the best.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Who This Works For</h3>
            <ul className="text-gray-700 space-y-2 ml-6 mb-6">
              <li>• Bakers in affluent areas (major cities, wealthy suburbs)</li>
              <li>• Those with advanced decorating skills (sugar flowers, hand-painting, intricate designs)</li>
              <li>• Bakers using premium/organic/specialty ingredients</li>
              <li>• Those targeting weddings, corporate events, luxury celebrations</li>
              <li>• Bakers who want low volume, high profit</li>
            </ul>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Premium Tier Cost Breakdown (per cupcake)</h3>
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Ingredients (premium/organic):</span>
                  <span className="font-semibold text-gray-900">$1.25-1.75</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Packaging (luxury box, custom):</span>
                  <span className="font-semibold text-gray-900">$0.50-0.75</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Labor (5 min @ $35/hr):</span>
                  <span className="font-semibold text-gray-900">$2.92</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Overhead:</span>
                  <span className="font-semibold text-gray-900">$0.40-0.50</span>
                </div>
                <div className="flex justify-between pb-3 border-b-2 border-gray-400">
                  <span className="font-bold text-gray-900">Total Cost:</span>
                  <span className="font-bold text-gray-900">$5.07-5.92</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-700">Selling at $8.50:</span>
                  <span className="font-semibold text-green-600">$2.58-3.43 profit</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Profit Margin:</span>
                  <span className="font-bold text-green-600">30-40%</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">The Math: Low Volume, High Profit</h3>
              <p className="text-gray-700 mb-3">
                At $8.50 per cupcake with $3 profit per cupcake:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6 mb-3">
                <li>• To make $500/month: Need to sell <strong>167 cupcakes</strong> (14 dozen)</li>
                <li>• To make $1,000/month: Need to sell <strong>334 cupcakes</strong> (28 dozen)</li>
                <li>• To make $2,000/month: Need to sell <strong>667 cupcakes</strong> (56 dozen)</li>
              </ul>
              <p className="text-gray-700 font-semibold">
                At 5 minutes per cupcake, making $2,000/month requires <strong>55.6 hours of labor</strong>. More time per cupcake, but you need HALF the volume of budget tier to make the same profit.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">What Justifies Premium Pricing?</h3>
            <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-6 mb-6">
              <ul className="text-gray-700 space-y-3">
                <li>• <strong>Ingredients:</strong> Organic flour, European butter, Madagascar vanilla, Belgian chocolate</li>
                <li>• <strong>Skill:</strong> Hand-painted designs, sugar flowers, intricate piping, custom flavors</li>
                <li>• <strong>Presentation:</strong> Luxury packaging, custom boxes, ribbons, branded materials</li>
                <li>• <strong>Service:</strong> Consultations, tastings, delivery, setup, personalized experience</li>
                <li>• <strong>Brand:</strong> Professional website, stunning photography, social proof, exclusivity</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Pros & Cons</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Pros
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-6">
                  <li>• Highest profit per cupcake</li>
                  <li>• Lower volume needed</li>
                  <li>• Creative freedom</li>
                  <li>• Premium ingredients</li>
                  <li>• Prestigious positioning</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Cons
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-6">
                  <li>• Smaller customer base</li>
                  <li>• High expectations</li>
                  <li>• More time per cupcake</li>
                  <li>• Need affluent market</li>
                  <li>• Requires advanced skills</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <TrendingUp className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Find Your Perfect Price Point</h3>
                  <p className="mb-4">Use BakeProfit to calculate your costs for each tier and see which pricing strategy works best for your bakery. Free to start.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Calculating Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Cost Breakdown Comparison */}
          <section id="cost-breakdown">
            <h2 className="text-3xl font-bold mb-4">Real Cost Breakdown: Side-by-Side Comparison</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Let&apos;s put all three tiers side by side so you can see exactly how they compare:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3 text-left font-bold">Cost Factor</th>
                    <th className="border p-3 text-center font-bold text-blue-600">Budget ($2.50)</th>
                    <th className="border p-3 text-center font-bold text-green-600">Mid-Tier ($5.00)</th>
                    <th className="border p-3 text-center font-bold text-purple-600">Premium ($8.50)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3 font-semibold">Ingredients</td>
                    <td className="border p-3 text-center">$0.50</td>
                    <td className="border p-3 text-center">$0.88</td>
                    <td className="border p-3 text-center">$1.50</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-3 font-semibold">Packaging</td>
                    <td className="border p-3 text-center">$0.20</td>
                    <td className="border p-3 text-center">$0.35</td>
                    <td className="border p-3 text-center">$0.63</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Labor</td>
                    <td className="border p-3 text-center">$0.33</td>
                    <td className="border p-3 text-center">$0.83</td>
                    <td className="border p-3 text-center">$2.92</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-3 font-semibold">Overhead</td>
                    <td className="border p-3 text-center">$0.13</td>
                    <td className="border p-3 text-center">$0.25</td>
                    <td className="border p-3 text-center">$0.45</td>
                  </tr>
                  <tr className="font-bold bg-yellow-50">
                    <td className="border p-3">Total Cost</td>
                    <td className="border p-3 text-center">$1.16</td>
                    <td className="border p-3 text-center">$2.31</td>
                    <td className="border p-3 text-center">$5.50</td>
                  </tr>
                  <tr className="font-bold bg-green-50">
                    <td className="border p-3">Profit per Cupcake</td>
                    <td className="border p-3 text-center text-blue-600">$1.34</td>
                    <td className="border p-3 text-center text-green-600">$2.69</td>
                    <td className="border p-3 text-center text-purple-600">$3.00</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Profit Margin</td>
                    <td className="border p-3 text-center">54%</td>
                    <td className="border p-3 text-center">54%</td>
                    <td className="border p-3 text-center">35%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-3 font-semibold">To Make $2,000/mo</td>
                    <td className="border p-3 text-center">1,493 cupcakes</td>
                    <td className="border p-3 text-center">744 cupcakes</td>
                    <td className="border p-3 text-center">667 cupcakes</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Hours Required</td>
                    <td className="border p-3 text-center">24.9 hrs</td>
                    <td className="border p-3 text-center">24.8 hrs</td>
                    <td className="border p-3 text-center">55.6 hrs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mt-6">
              <p className="text-gray-800 font-semibold mb-2">💡 Key Takeaway:</p>
              <p className="text-gray-700">
                Budget and mid-tier require similar hours to make $2,000/month, but mid-tier gives you DOUBLE the profit per cupcake. Premium tier requires more time per cupcake but needs lower volume. Choose based on your market, skills, and preferences—not just the price.
              </p>
            </div>
          </section>

          {/* Section 6: Which Tier */}
          <section id="which-tier">
            <h2 className="text-3xl font-bold mb-4">Which Tier is Right for Your Bakery?</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Still not sure? Answer these questions to find your ideal tier:
            </p>

            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">1. What&apos;s Your Market?</h3>
                    <ul className="text-gray-700 space-y-2 ml-6">
                      <li>• <strong>Small town, lower-income area:</strong> Budget tier</li>
                      <li>• <strong>Suburban, middle-class area:</strong> Mid-tier</li>
                      <li>• <strong>Major city, affluent suburb:</strong> Premium tier</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Users className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">2. What&apos;s Your Skill Level?</h3>
                    <ul className="text-gray-700 space-y-2 ml-6">
                      <li>• <strong>Beginner (simple designs):</strong> Budget tier</li>
                      <li>• <strong>Intermediate (custom designs):</strong> Mid-tier</li>
                      <li>• <strong>Advanced (intricate artistry):</strong> Premium tier</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">3. What&apos;s Your Volume Preference?</h3>
                    <ul className="text-gray-700 space-y-2 ml-6">
                      <li>• <strong>Love high-volume production:</strong> Budget tier</li>
                      <li>• <strong>Prefer balanced workload:</strong> Mid-tier</li>
                      <li>• <strong>Want low volume, high quality:</strong> Premium tier</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">My Recommendation for Most Home Bakers</h3>
              <p className="text-gray-700 mb-3">
                <strong>Start at mid-tier ($4-6).</strong> Here&apos;s why:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• Best profit-to-effort ratio for home bakers</li>
                <li>• Sustainable workload (you won&apos;t burn out)</li>
                <li>• Room to use quality ingredients</li>
                <li>• Can move up or down based on demand</li>
                <li>• Customers perceive good value</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Once you&apos;re established, you can adjust. If you&apos;re getting too many orders, raise prices toward premium. If you&apos;re struggling to get orders, consider if you need to improve quality or lower prices slightly.
              </p>
            </div>
          </section>

          {/* Section 7: Positioning */}
          <section id="positioning">
            <h2 className="text-3xl font-bold mb-4">How to Position Yourself in Your Chosen Tier</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Once you&apos;ve chosen your tier, you need to position yourself correctly. Your pricing, branding, and messaging must all align.
            </p>

            <div className="space-y-6">
              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Budget Tier Positioning</h3>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• <strong>Messaging:</strong> &quot;Fresh, homemade cupcakes at prices everyone can afford&quot;</li>
                  <li>• <strong>Branding:</strong> Simple, friendly, approachable</li>
                  <li>• <strong>Marketing:</strong> Bulk orders, school events, farmers markets, Facebook groups</li>
                  <li>• <strong>Photos:</strong> Simple, clean, show quantity and freshness</li>
                  <li>• <strong>Packaging:</strong> Basic but clean—clear boxes, simple liners</li>
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Mid-Tier Positioning</h3>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• <strong>Messaging:</strong> &quot;Custom cupcakes made with quality ingredients and care&quot;</li>
                  <li>• <strong>Branding:</strong> Professional, warm, personal</li>
                  <li>• <strong>Marketing:</strong> Instagram, local events, word-of-mouth, Google Business</li>
                  <li>• <strong>Photos:</strong> Well-lit, styled, show customization options</li>
                  <li>• <strong>Packaging:</strong> Branded boxes, nice liners, business cards</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Premium Tier Positioning</h3>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• <strong>Messaging:</strong> &quot;Artisan cupcakes crafted with premium ingredients and exquisite detail&quot;</li>
                  <li>• <strong>Branding:</strong> Elegant, sophisticated, exclusive</li>
                  <li>• <strong>Marketing:</strong> Professional website, styled photoshoots, wedding shows, corporate clients</li>
                  <li>• <strong>Photos:</strong> Professional photography, editorial style, close-ups of details</li>
                  <li>• <strong>Packaging:</strong> Luxury boxes, custom ribbons, branded tissue, thank-you notes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8: Mistakes */}
          <section id="mistakes">
            <h2 className="text-3xl font-bold mb-4">5 Pricing Mistakes That Kill Cupcake Profits</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #1: Pricing Too Low to &quot;Get Customers&quot;</h3>
                <p className="text-gray-700 mb-2">
                  Charging $2 when your costs are $1.80 leaves you with $0.20 profit. You need to sell 10,000 cupcakes to make $2,000. That&apos;s not sustainable.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Calculate your true costs and add a healthy profit margin (40-50%). Attract customers with quality, not low prices.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #2: Charging the Same for All Cupcakes</h3>
                <p className="text-gray-700 mb-2">
                  A simple vanilla cupcake costs $1.50 to make. An intricate fondant design costs $4.00. If you charge $5 for both, you&apos;re losing money on the fancy ones.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Have tiered pricing: Basic ($4), Custom ($6), Premium ($8). Charge for complexity.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #3: Not Charging for Delivery</h3>
                <p className="text-gray-700 mb-2">
                  Gas, time, and vehicle wear cost money. If you drive 30 minutes round-trip and don&apos;t charge, you&apos;re losing $10-15 per delivery.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Charge $10-20 for delivery or set a minimum order amount for free delivery.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #4: Pricing Per Dozen Instead of Per Cupcake</h3>
                <p className="text-gray-700 mb-2">
                  When you price per dozen ($30/dozen), customers expect discounts for larger orders. When you price per cupcake ($3 each), they understand the value per unit.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Price per cupcake. Offer volume discounts only for orders of 5+ dozen.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #5: Not Raising Prices When Costs Increase</h3>
                <p className="text-gray-700 mb-2">
                  Butter went from $4/lb to $7/lb. If you don&apos;t adjust prices, your profit margin just shrunk by 30-40%.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Review costs quarterly. When ingredient costs rise 10%+, adjust prices immediately.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9: FAQ */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Can I charge different prices for different flavors?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Absolutely. If red velvet costs more than vanilla, charge more. If chocolate ganache filling costs more than buttercream, charge more. Price based on your actual costs, not arbitrary flavor preferences.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Should I offer discounts for bulk orders?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Only if it makes financial sense. Bulk orders save you time (less packaging, one delivery), so a 10-15% discount for 5+ dozen is reasonable. But don&apos;t discount so much that you lose money. Calculate the numbers first.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if customers say my prices are too high?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> That&apos;s okay. Not everyone is your customer. Explain your value: &quot;My cupcakes are made with real butter, quality vanilla, and custom designs. They&apos;re priced to reflect that quality.&quot; If they still balk, let them go. You&apos;re not Walmart.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How do I transition from one tier to another?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Gradually. If you&apos;re moving from budget ($2.50) to mid-tier ($5), increase by $0.50-1.00 every few months. Improve your quality, branding, and photos as you go. Announce changes to existing customers and grandfather them for 30-60 days.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Should I price mini cupcakes differently?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Yes, but not proportionally. If regular cupcakes are $5, minis shouldn&apos;t be $2.50. They take almost as much time to make and decorate. Price minis at 60-70% of regular size: $3-3.50 each.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Ready to Price Your Cupcakes Profitably?</h2>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              Stop guessing and start knowing. BakeProfit calculates your exact costs for each tier and shows you the right price for YOUR bakery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools/recipe-cost-calculator">
                <Button className="bg-white text-rose-600 hover:bg-gray-50 border-2 border-rose-600 px-8 py-6 text-lg">
                  Try Free Calculator
                </Button>
              </Link>
              <Link href="/bakery-business-tool">
                <Button className="bg-rose-500 hover:bg-rose-600 px-8 py-6 text-lg">
                  Start Free Account →
                </Button>
              </Link>
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              No credit card required • 5 recipes free forever • Upgrade anytime
            </p>
          </div>

          {/* Related Articles */}
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/pricing-mistakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">The 3 Biggest Pricing Mistakes Home Bakers Make</h4>
                <p className="text-gray-600 text-sm">Discover the 3 critical pricing mistakes costing home bakers thousands every year.</p>
              </Link>
              <Link href="/blog/losing-money-on-cakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Why You&apos;re Losing Money on Every Cake</h4>
                <p className="text-gray-600 text-sm">Discover the 7 hidden costs killing your profits and learn how to fix your pricing.</p>
              </Link>
              <Link href="/blog/how-to-calculate-recipe-cost" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Calculate Recipe Cost</h4>
                <p className="text-gray-600 text-sm">Learn the exact formula to calculate recipe costs including ingredients, labor, and overhead.</p>
              </Link>
              <Link href="/blog/how-to-price-cupcakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Price Cupcakes: Complete Guide</h4>
                <p className="text-gray-600 text-sm">Step-by-step guide to pricing cupcakes profitably with real examples and free calculator.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <Footer />
    </div>
  )
}
