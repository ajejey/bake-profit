'use client'

import Link from 'next/link'
import { Calculator, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '../layout/Footer'

export default function BreakEvenAnalysisArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → Break-Even Analysis for Bakers
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Break-Even Analysis for Bakers: When Do You Start Making Money?
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Feb 3, 2025</span> • <span>16 min read</span> • <span className="text-rose-600 font-semibold">Business Strategy</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            You&apos;ve been baking for months. You&apos;re getting orders. Money is coming in. But are you actually making a profit? Or are you just covering expenses?
          </p>

          <p className="text-xl text-gray-700">
            Most home bakers have no idea when they crossed the line from losing money to making money. They&apos;re working hard, but they don&apos;t know if they&apos;re profitable yet.
          </p>

          <p className="text-xl text-gray-700 font-bold">
            This is where break-even analysis comes in.
          </p>

          <p className="text-lg text-gray-700">
            Your break-even point is the exact moment when your revenue equals your costs—when you stop losing money and start making profit. Knowing this number is critical for pricing decisions, growth planning, and understanding if your bakery is actually sustainable. In this guide, I&apos;ll show you exactly how to calculate your break-even point and use it to make smarter business decisions.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Calculator className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Calculate Your Break-Even Point</h3>
                  <p className="mb-4">Use BakeProfit to automatically track your fixed costs, variable costs, and calculate your break-even point. See exactly when you start making profit.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Tracking Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <div className="bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li><a href="#what-is" className="hover:text-rose-600">What is Break-Even Analysis?</a></li>
              <li><a href="#why-matters" className="hover:text-rose-600">Why Break-Even Analysis Matters for Bakers</a></li>
              <li><a href="#fixed-variable" className="hover:text-rose-600">Understanding Fixed vs. Variable Costs</a></li>
              <li><a href="#calculate" className="hover:text-rose-600">How to Calculate Your Break-Even Point</a></li>
              <li><a href="#real-example" className="hover:text-rose-600">Real Example: Maria&apos;s Bakery Break-Even Analysis</a></li>
              <li><a href="#reach-faster" className="hover:text-rose-600">How to Reach Break-Even Faster</a></li>
              <li><a href="#beyond" className="hover:text-rose-600">Beyond Break-Even: Planning for Growth</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* Section 1: What is Break-Even Analysis */}
          <section id="what-is">
            <h2 className="text-3xl font-bold mb-4">What is Break-Even Analysis?</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Break-even analysis is a simple calculation that tells you exactly how many products you need to sell (or how much revenue you need to generate) before you start making a profit.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">The Break-Even Point Formula</h3>
              <div className="bg-white p-4 rounded mb-3">
                <p className="text-center text-xl font-mono font-bold text-gray-900 mb-2">
                  Break-Even Point (units) = Fixed Costs ÷ (Price per Unit - Variable Cost per Unit)
                </p>
              </div>
              <p className="text-gray-700 mb-2">
                Or in sales dollars:
              </p>
              <div className="bg-white p-4 rounded">
                <p className="text-center text-xl font-mono font-bold text-gray-900">
                  Break-Even Point (sales $) = Fixed Costs ÷ Contribution Margin
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              Let&apos;s break down what this means:
            </p>

            <div className="space-y-4">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">Fixed Costs</h4>
                <p className="text-gray-700">
                  Expenses that stay the same every month regardless of how many cakes you sell. Examples: rent, insurance, website hosting, business licenses.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">Variable Costs</h4>
                <p className="text-gray-700">
                  Expenses that change based on how much you produce. Examples: ingredients, packaging, delivery costs.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">Contribution Margin</h4>
                <p className="text-gray-700 mb-2">
                  The amount each sale contributes toward covering your fixed costs. Formula:
                </p>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                  (Price - Variable Cost) ÷ Price = Contribution Margin %
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Why It Matters */}
          <section id="why-matters">
            <h2 className="text-3xl font-bold mb-4">Why Break-Even Analysis Matters for Bakers</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Knowing your break-even point isn&apos;t just academic—it has real, practical implications for your bakery business:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <Target className="h-6 w-6 text-green-600" />
                  1. You Know Your Minimum Sales Target
                </h3>
                <p className="text-gray-700">
                  If your break-even point is 40 cakes per month, you know you MUST sell at least 40 cakes to avoid losing money. Anything above 40 is profit. This gives you a clear monthly goal.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  2. You Can Make Better Pricing Decisions
                </h3>
                <p className="text-gray-700">
                  If you lower your prices, your break-even point goes UP (you need to sell more). If you raise prices, it goes DOWN (you need to sell less). This helps you understand the trade-offs of pricing changes.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  3. You Can Plan for Growth
                </h3>
                <p className="text-gray-700">
                  Want to hire help? Buy new equipment? You can calculate how many additional sales you need to cover those new fixed costs and still be profitable.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-green-600" />
                  4. You Know When to Worry
                </h3>
                <p className="text-gray-700">
                  If you&apos;re consistently selling below your break-even point, you&apos;re losing money every month. This is a red flag that you need to either cut costs or increase sales immediately.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Fixed vs Variable Costs */}
          <section id="fixed-variable">
            <h2 className="text-3xl font-bold mb-4">Understanding Fixed vs. Variable Costs</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Before you can calculate your break-even point, you need to understand the difference between fixed and variable costs. This is critical—get this wrong and your entire analysis will be off.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Fixed Costs</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Definition:</strong> Costs that stay the same every month, regardless of sales volume.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Typical Home Bakery Fixed Costs:</strong>
                </p>
                <ul className="text-gray-700 space-y-1 ml-6">
                  <li>• Business insurance: $30-50/month</li>
                  <li>• Cottage food license: $50-200/year</li>
                  <li>• Website hosting: $10-30/month</li>
                  <li>• Software subscriptions: $10-20/month</li>
                  <li>• Equipment depreciation: $25-50/month</li>
                  <li>• Marketing (fixed ads): $50-100/month</li>
                </ul>
                <p className="text-gray-700 mt-3 font-semibold">
                  Total typical fixed costs: <strong>$175-450/month</strong>
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Variable Costs</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Definition:</strong> Costs that change based on how much you produce and sell.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Typical Home Bakery Variable Costs:</strong>
                </p>
                <ul className="text-gray-700 space-y-1 ml-6">
                  <li>• Ingredients (flour, sugar, eggs, etc.)</li>
                  <li>• Packaging (boxes, bags, ribbons)</li>
                  <li>• Delivery costs (gas, mileage)</li>
                  <li>• Utilities (oven electricity per cake)</li>
                  <li>• Credit card processing fees</li>
                  <li>• Labels and stickers per order</li>
                </ul>
                <p className="text-gray-700 mt-3 font-semibold">
                  Example: $15-25 per cake in variable costs
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">⚠️ Semi-Variable Costs (Tricky!)</h3>
              <p className="text-gray-700 mb-3">
                Some costs have both fixed and variable components:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Phone bill:</strong> $30 base + $0.10 per minute for customer calls</li>
                <li>• <strong>Utilities:</strong> $50 base + extra for oven use</li>
                <li>• <strong>Labor:</strong> Your salary (fixed) + extra help for busy months (variable)</li>
              </ul>
              <p className="text-gray-700 mt-3 font-semibold">
                <strong>How to handle these:</strong> Split them into their fixed and variable parts for accurate analysis.
              </p>
            </div>
          </section>

          {/* Section 4: How to Calculate */}
          <section id="calculate">
            <h2 className="text-3xl font-bold mb-4">How to Calculate Your Break-Even Point</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Now let&apos;s walk through the actual calculation step by step:
            </p>

            <div className="space-y-6">
              <div className="bg-white border-l-4 border-rose-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Calculate Your Monthly Fixed Costs</h3>
                    <p className="text-gray-700 mb-3">
                      Add up all your monthly expenses that don&apos;t change based on sales:
                    </p>
                    <ul className="text-gray-700 space-y-1 ml-6">
                      <li>• Insurance</li>
                      <li>• Licenses and permits</li>
                      <li>• Website and software</li>
                      <li>• Equipment depreciation</li>
                      <li>• Fixed marketing costs</li>
                    </ul>
                    <p className="text-gray-700 mt-3">
                      <strong>Example:</strong> $300/month total fixed costs
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-rose-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Calculate Variable Cost Per Unit</h3>
                    <p className="text-gray-700 mb-3">
                      For one typical product (e.g., a custom cake), add up:
                    </p>
                    <ul className="text-gray-700 space-y-1 ml-6">
                      <li>• Ingredients</li>
                      <li>• Packaging</li>
                      <li>• Delivery (if applicable)</li>
                      <li>• Credit card fees (typically 3%)</li>
                    </ul>
                    <p className="text-gray-700 mt-3">
                      <strong>Example:</strong> $20 variable cost per cake
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-rose-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Determine Your Selling Price</h3>
                    <p className="text-gray-700">
                      What do you charge for this product? (Use our <Link href="/tools/recipe-cost-calculator" className="text-rose-600 hover:underline font-semibold">recipe cost calculator</Link> to ensure you&apos;re pricing correctly)
                    </p>
                    <p className="text-gray-700 mt-3">
                      <strong>Example:</strong> $75 per cake
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-green-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Apply the Formula</h3>
                    <div className="bg-gray-100 p-4 rounded mb-3">
                      <p className="font-mono text-sm mb-2">Break-Even Point = Fixed Costs ÷ (Price - Variable Cost)</p>
                      <p className="font-mono text-sm mb-2">Break-Even Point = $300 ÷ ($75 - $20)</p>
                      <p className="font-mono text-sm mb-2">Break-Even Point = $300 ÷ $55</p>
                      <p className="font-mono text-lg font-bold text-green-600">Break-Even Point = 5.45 cakes</p>
                    </div>
                    <p className="text-gray-700 font-semibold">
                      You need to sell <strong>6 cakes per month</strong> to break even (round up to whole units).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">What This Means:</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• Cakes 1-6: You&apos;re covering your fixed costs (breaking even)</li>
                <li>• Cake 7+: Pure profit! Each cake adds $55 to your bottom line</li>
                <li>• If you sell 10 cakes: $55 × 4 extra cakes = <strong>$220 profit</strong></li>
              </ul>
            </div>
          </section>

          {/* Section 5: Real Example */}
          <section id="real-example">
            <h2 className="text-3xl font-bold mb-4">Real Example: Maria&apos;s Bakery Break-Even Analysis</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Maria runs a home bakery specializing in custom birthday cakes. Let&apos;s calculate her break-even point:
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Maria&apos;s Monthly Costs</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Fixed Costs (Monthly):</h4>
                <div className="space-y-2">
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Business insurance:</span>
                    <span className="font-semibold text-gray-900">$40</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Website & domain:</span>
                    <span className="font-semibold text-gray-900">$25</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Software (BakeProfit Pro):</span>
                    <span className="font-semibold text-gray-900">$7</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Equipment depreciation:</span>
                    <span className="font-semibold text-gray-900">$30</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Marketing (Facebook ads):</span>
                    <span className="font-semibold text-gray-900">$75</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b-2 border-gray-400">
                    <span className="text-gray-700">License (annual ÷ 12):</span>
                    <span className="font-semibold text-gray-900">$12</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-lg text-gray-900">Total Fixed Costs:</span>
                    <span className="font-bold text-blue-600 text-xl">$189/month</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Variable Costs (Per Cake):</h4>
                <div className="space-y-2">
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Ingredients:</span>
                    <span className="font-semibold text-gray-900">$18</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Packaging (box, board, ribbon):</span>
                    <span className="font-semibold text-gray-900">$4</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Delivery (average):</span>
                    <span className="font-semibold text-gray-900">$3</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b-2 border-gray-400">
                    <span className="text-gray-700">Credit card fees (3%):</span>
                    <span className="font-semibold text-gray-900">$3.60</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-lg text-gray-900">Total Variable Cost:</span>
                    <span className="font-bold text-green-600 text-xl">$28.60/cake</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Pricing:</h4>
                <div className="flex justify-between">
                  <span className="text-gray-700">Average cake price:</span>
                  <span className="font-bold text-purple-600 text-xl">$120</span>
                </div>
              </div>

              <div className="bg-rose-50 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-3 text-xl">The Calculation:</h4>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700">Contribution per cake: $120 - $28.60 = <strong>$91.40</strong></p>
                  <p className="text-gray-700">Break-even point: $189 ÷ $91.40 = <strong>2.07 cakes</strong></p>
                </div>
                <p className="text-gray-900 font-bold text-lg">
                  Maria needs to sell <span className="text-rose-600 text-2xl">3 cakes per month</span> to break even.
                </p>
                <p className="text-gray-700 mt-4">
                  Every cake after the 3rd generates <strong>$91.40 in profit</strong>. If she sells 12 cakes in a month, she makes: 9 × $91.40 = <strong>$822.60 profit</strong>.
                </p>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Why This is Powerful</h3>
              <p className="text-gray-700 mb-3">
                Maria now knows:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Minimum goal:</strong> 3 cakes/month to avoid losing money</li>
                <li>• <strong>Target goal:</strong> 10-12 cakes/month for good profit ($640-$822)</li>
                <li>• <strong>Pricing power:</strong> If she raises prices to $135, her break-even drops to 1.8 cakes</li>
                <li>• <strong>Cost awareness:</strong> If fixed costs rise by $50, she needs 0.5 more cakes to break even</li>
              </ul>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <TrendingUp className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Track Your Break-Even Point Automatically</h3>
                  <p className="mb-4">BakeProfit automatically calculates your break-even point based on your actual costs and sales. See in real-time when you cross into profitability.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Reach Break-Even Faster */}
          <section id="reach-faster">
            <h2 className="text-3xl font-bold mb-4">How to Reach Break-Even Faster</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              The faster you reach break-even, the sooner you start making profit. Here are proven strategies to lower your break-even point:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  Strategy 1: Increase Your Prices
                </h3>
                <p className="text-gray-700 mb-3">
                  This is the fastest way to lower your break-even point. A 10% price increase can reduce your break-even point by 15-20%.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Example:</strong> If Maria raises her cake price from $120 to $135:
                </p>
                <ul className="text-gray-700 space-y-1 ml-6">
                  <li>• New contribution: $135 - $28.60 = $106.40</li>
                  <li>• New break-even: $189 ÷ $106.40 = <strong>1.78 cakes</strong> (down from 3!)</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <strong>Read more:</strong> <Link href="/blog/pricing-mistakes" className="text-rose-600 hover:underline">The 3 Biggest Pricing Mistakes Home Bakers Make</Link>
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                  Strategy 2: Reduce Fixed Costs
                </h3>
                <p className="text-gray-700 mb-3">
                  Every dollar you cut from fixed costs directly lowers your break-even point.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Ways to reduce fixed costs:</strong>
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• Negotiate lower insurance rates</li>
                  <li>• Switch to cheaper website hosting</li>
                  <li>• Reduce marketing spend (focus on organic/word-of-mouth)</li>
                  <li>• Delay equipment purchases until you&apos;re profitable</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <strong>Example:</strong> If Maria cuts fixed costs from $189 to $150, her break-even drops from 3 cakes to 2.4 cakes.
                </p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <Target className="h-6 w-6 text-purple-600" />
                  Strategy 3: Lower Variable Costs
                </h3>
                <p className="text-gray-700 mb-3">
                  Reducing variable costs increases your contribution margin, which lowers break-even.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Ways to reduce variable costs:</strong>
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• Buy ingredients in bulk (wholesale pricing)</li>
                  <li>• Find cheaper packaging suppliers</li>
                  <li>• Optimize delivery routes to save gas</li>
                  <li>• Reduce ingredient waste</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <strong>Example:</strong> If Maria reduces variable costs from $28.60 to $25, her contribution rises to $95, and break-even drops to 2 cakes.
                </p>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Strategy 4: Increase Sales Volume</h3>
                <p className="text-gray-700 mb-3">
                  This doesn&apos;t lower your break-even point, but it gets you PAST it faster.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Ways to increase sales:</strong>
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• Improve your marketing (social media, local ads)</li>
                  <li>• Offer promotions to attract new customers</li>
                  <li>• Add complementary products (cookies, cupcakes)</li>
                  <li>• Partner with local businesses for bulk orders</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: Beyond Break-Even */}
          <section id="beyond">
            <h2 className="text-3xl font-bold mb-4">Beyond Break-Even: Planning for Growth</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Once you&apos;re consistently above break-even, you can start planning for growth. But every growth decision changes your break-even point.
            </p>

            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Scenario 1: Hiring Help</h3>
                <p className="text-gray-700 mb-3">
                  You want to hire part-time help for $500/month. How does this affect your break-even?
                </p>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-gray-700 mb-2">New fixed costs: $189 + $500 = $689</p>
                  <p className="text-gray-700 mb-2">New break-even: $689 ÷ $91.40 = <strong>7.5 cakes</strong></p>
                  <p className="text-gray-700 font-semibold">
                    You need to sell 5 MORE cakes per month to justify hiring help.
                  </p>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Scenario 2: Buying Equipment</h3>
                <p className="text-gray-700 mb-3">
                  You want to buy a $3,000 mixer. Spread over 3 years, that&apos;s $83/month in depreciation.
                </p>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-gray-700 mb-2">New fixed costs: $189 + $83 = $272</p>
                  <p className="text-gray-700 mb-2">New break-even: $272 ÷ $91.40 = <strong>3 cakes</strong></p>
                  <p className="text-gray-700 font-semibold">
                    You need to sell 1 extra cake per month to cover the equipment cost.
                  </p>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Scenario 3: Renting Commercial Space</h3>
                <p className="text-gray-700 mb-3">
                  You want to move from home to a commercial kitchen for $800/month.
                </p>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-gray-700 mb-2">New fixed costs: $189 + $800 = $989</p>
                  <p className="text-gray-700 mb-2">New break-even: $989 ÷ $91.40 = <strong>10.8 cakes</strong></p>
                  <p className="text-gray-700 font-semibold">
                    You need to sell 8 MORE cakes per month to justify commercial space.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mt-6">
              <p className="text-gray-800 font-semibold mb-2">💡 Key Lesson:</p>
              <p className="text-gray-700">
                Before making any growth investment, calculate how it affects your break-even point. Make sure you can realistically hit the new sales target before committing to the expense.
              </p>
            </div>
          </section>

          {/* Section 8: FAQ */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Should I include my labor in the break-even calculation?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Yes, absolutely. Your time has value. Include your desired hourly rate as either a fixed cost (if you pay yourself a salary) or as part of variable costs (if you calculate labor per product). Learn more in our guide: <Link href="/blog/true-hourly-rate" className="text-rose-600 hover:underline">How to Calculate Your True Hourly Rate as a Baker</Link>.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if I sell multiple products with different prices?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Calculate the break-even point for each product separately, or use a weighted average. If you sell 60% cakes and 40% cupcakes, calculate a blended contribution margin based on your product mix.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How often should I recalculate my break-even point?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Recalculate quarterly or whenever you make significant changes to costs or pricing. If ingredient costs rise 10%+, recalculate immediately.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if I&apos;m below break-even every month?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> This is a red flag. You have three options: (1) Raise prices, (2) Cut costs, or (3) Increase sales volume. If you can&apos;t do any of these, your business model may not be sustainable. Read: <Link href="/blog/losing-money-on-cakes" className="text-rose-600 hover:underline">Why You&apos;re Losing Money on Every Cake</Link>.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Is a lower break-even point always better?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Generally yes, but not if you achieve it by underpricing. A break-even point of 2 cakes at $50 each is worse than 5 cakes at $120 each—the second scenario generates more total profit once you&apos;re past break-even.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Ready to Calculate Your Break-Even Point?</h2>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              Stop guessing when you&apos;ll be profitable. BakeProfit automatically tracks your costs and calculates your break-even point in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools/recipe-cost-calculator">
                <Button className="bg-white text-rose-600 hover:bg-gray-50 border-2 border-rose-600 px-8 py-6 text-lg">
                  Try Free Calculator
                </Button>
              </Link>
              <Link href="/bakery-business-tool">
                <Button className="bg-rose-500 hover:bg-rose-600 px-8 py-6 text-lg">
                  Start Tracking Free →
                </Button>
              </Link>
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              No credit card required • 15 orders free forever • Upgrade anytime
            </p>
          </div>

          {/* Related Articles */}
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/how-to-calculate-recipe-cost" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Calculate Recipe Cost</h4>
                <p className="text-gray-600 text-sm">Learn the exact formula to calculate all your costs—the foundation of break-even analysis.</p>
              </Link>
              <Link href="/blog/true-hourly-rate" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Calculate Your True Hourly Rate as a Baker</h4>
                <p className="text-gray-600 text-sm">Understand your labor costs to include them accurately in your break-even calculation.</p>
              </Link>
              <Link href="/blog/pricing-mistakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">The 3 Biggest Pricing Mistakes Home Bakers Make</h4>
                <p className="text-gray-600 text-sm">Fix your pricing to lower your break-even point and increase profitability.</p>
              </Link>
              <Link href="/blog/losing-money-on-cakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Why You&apos;re Losing Money on Every Cake</h4>
                <p className="text-gray-600 text-sm">Discover the hidden costs that might be keeping you below break-even.</p>
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
