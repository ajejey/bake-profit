'use client'

import Link from 'next/link'
import { Calculator, AlertTriangle, DollarSign, Target, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '../layout/Footer'

export default function PricingMistakesArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → The 3 Biggest Pricing Mistakes Home Bakers Make
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          The 3 Biggest Pricing Mistakes Home Bakers Make (And How to Fix Them)
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Jan 31, 2025</span> • <span>16 min read</span> • <span className="text-rose-600 font-semibold">Pricing Strategy</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            You&apos;ve spent hours perfecting your recipes. Your cakes look like they belong in a magazine. Your Instagram is growing. Orders are coming in.
          </p>

          <p className="text-xl text-gray-700">
            But at the end of the month, your bank account tells a different story. You&apos;re working 50+ hours a week and barely breaking even. What&apos;s going wrong?
          </p>

          <p className="text-xl text-gray-700 font-bold">
            The problem isn&apos;t your baking—it&apos;s your pricing.
          </p>

          <p className="text-lg text-gray-700">
            After analyzing pricing strategies from thousands of home bakers, I&apos;ve identified three critical mistakes that are costing you thousands of dollars every year. The good news? They&apos;re all fixable. Today, I&apos;ll show you exactly what these mistakes are, why they&apos;re killing your profits, and how to fix them starting right now.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Calculator className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Price Your Products Correctly</h3>
                  <p className="mb-4">Use our free calculator to see if you&apos;re making these mistakes. Get your profitable price in 2 minutes—no signup required.</p>
                  <Link href="/tools/recipe-cost-calculator">
                    <Button className="bg-rose-500 hover:bg-rose-600">Calculate Correct Prices →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <div className="bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li><a href="#mistake-1" className="hover:text-rose-600">Mistake #1: Undercharging Due to Lack of Confidence</a></li>
              <li><a href="#mistake-2" className="hover:text-rose-600">Mistake #2: Not Including Overhead in Calculations</a></li>
              <li><a href="#mistake-3" className="hover:text-rose-600">Mistake #3: Forgetting About Your Time Value</a></li>
              <li><a href="#real-cost" className="hover:text-rose-600">The Real Cost of These Mistakes</a></li>
              <li><a href="#fix-pricing" className="hover:text-rose-600">How to Fix Your Pricing Today</a></li>
              <li><a href="#confidence" className="hover:text-rose-600">Building Pricing Confidence</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* Mistake #1 */}
          <section id="mistake-1">
            <h2 className="text-3xl font-bold mb-4">Mistake #1: Undercharging Due to Lack of Confidence</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              This is the most common and most expensive mistake home bakers make. You know your costs are around $50, but you charge $75 instead of $100 because you&apos;re afraid customers will think you&apos;re too expensive.
            </p>

            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-600" />
                What This Looks Like
              </h3>
              <ul className="text-gray-700 space-y-3 ml-6">
                <li>• You calculate that a cake costs $60 to make, but you charge $80 because $120 &quot;feels too high&quot;</li>
                <li>• You see a competitor charging $50 and panic, dropping your price to $45 even though your costs are higher</li>
                <li>• A customer says &quot;That&apos;s expensive&quot; and you immediately offer a discount</li>
                <li>• You apologize for your prices: &quot;I know it&apos;s a lot, but...&quot;</li>
                <li>• You round down instead of up: $87.50 becomes $80, not $90</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Why This Happens</h3>
            <p className="text-gray-700 mb-4">
              Pricing psychology is brutal for home bakers. You&apos;re not just selling a product—you&apos;re selling YOUR work. When someone questions your price, it feels like they&apos;re questioning your worth as a person. So you lower your prices to avoid that discomfort.
            </p>

            <p className="text-gray-700 mb-6">
              Add to that imposter syndrome (&quot;Who am I to charge $150 for a cake?&quot;), comparison to grocery store prices (&quot;Walmart sells cakes for $20!&quot;), and fear of losing customers, and you have a perfect storm of underpricing.
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Real Example: Jessica&apos;s Story</h3>
              <p className="text-gray-700 mb-3">
                Jessica makes custom birthday cakes. Her costs are $65 per cake (ingredients, packaging, 4 hours of labor at $25/hr). She should charge at least $130 for a 50% profit margin.
              </p>
              <p className="text-gray-700 mb-3">
                But she charges $95 because:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6 mb-4">
                <li>• &quot;$130 sounds like too much for a birthday cake&quot;</li>
                <li>• &quot;My friend charges $80, so I can&apos;t charge more than $100&quot;</li>
                <li>• &quot;I&apos;m not a professional, so I shouldn&apos;t charge professional prices&quot;</li>
              </ul>
              <div className="bg-red-50 p-4 rounded">
                <p className="text-gray-900 font-bold mb-2">The Reality:</p>
                <p className="text-gray-700">
                  Jessica makes $30 per cake after costs. For 4 hours of work, that&apos;s <strong>$7.50/hour</strong>. She&apos;s working for less than minimum wage because she lacks confidence in her pricing.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The Cost of This Mistake</h3>
            <p className="text-gray-700 mb-4">
              Let&apos;s say you undercharge by just $20 per cake due to lack of confidence. If you make 50 cakes per year, that&apos;s <strong>$1,000 you&apos;re giving away</strong>. Over 5 years? <strong>$5,000</strong> gone because you were afraid to charge what you&apos;re worth.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">The Truth About &quot;Too Expensive&quot;</h3>
              <p className="text-gray-700 mb-3">
                When someone says your prices are too high, what they&apos;re really saying is one of three things:
              </p>
              <ol className="text-gray-700 space-y-2 ml-6">
                <li>1. <strong>They can&apos;t afford it.</strong> That&apos;s okay. Not everyone is your customer. You&apos;re not trying to be Walmart.</li>
                <li>2. <strong>They don&apos;t understand the value.</strong> This is a communication problem, not a pricing problem. Explain what goes into your work.</li>
                <li>3. <strong>They&apos;re negotiating.</strong> Some people always try to get a discount. Don&apos;t reward this behavior by lowering your prices.</li>
              </ol>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">How to Fix It</h3>
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Step 1: Calculate Your Minimum Price</h4>
                <p className="text-gray-700 mb-2">
                  Use the formula: (Ingredient Cost + Packaging + Labor + Overhead) ÷ (1 - Desired Profit Margin)
                </p>
                <p className="text-gray-700">
                  This is your MINIMUM. You cannot go below this without losing money. Write it down. Memorize it. This is your floor.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Step 2: Practice Saying Your Price Out Loud</h4>
                <p className="text-gray-700 mb-2">
                  Stand in front of a mirror and say: &quot;The price for this cake is $150.&quot; Say it 20 times. Say it until it doesn&apos;t feel weird.
                </p>
                <p className="text-gray-700">
                  The hesitation in your voice when you quote a price tells customers you don&apos;t believe in it. Confidence sells.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Step 3: Stop Apologizing for Your Prices</h4>
                <p className="text-gray-700 mb-3">
                  Never say:
                </p>
                <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                  <li>• &quot;I know it&apos;s a lot, but...&quot;</li>
                  <li>• &quot;Sorry, but I have to charge...&quot;</li>
                  <li>• &quot;It&apos;s expensive because...&quot;</li>
                </ul>
                <p className="text-gray-700">
                  Instead say: &quot;The investment for this cake is $150. This includes [list value: custom design, premium ingredients, delivery, etc.].&quot;
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Step 4: Remember: You&apos;re Not Competing with Walmart</h4>
                <p className="text-gray-700">
                  Walmart sells cakes for $20. You&apos;re not competing with them. You&apos;re offering:
                </p>
                <ul className="text-gray-700 space-y-1 ml-6 mt-2">
                  <li>• Custom designs made specifically for this customer</li>
                  <li>• Real butter, not shortening</li>
                  <li>• Made-from-scratch quality</li>
                  <li>• Personal service and consultation</li>
                  <li>• A product that tastes as good as it looks</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mt-6">
              <p className="text-gray-800 font-semibold mb-2">💡 Mindset Shift:</p>
              <p className="text-gray-700">
                You&apos;re not &quot;just a home baker.&quot; You&apos;re a skilled artisan providing a premium product. Act like it. Price like it. The customers who value quality will pay for it. The ones who don&apos;t aren&apos;t your customers anyway.
              </p>
            </div>
          </section>

          {/* Mistake #2 */}
          <section id="mistake-2">
            <h2 className="text-3xl font-bold mb-4">Mistake #2: Not Including Overhead in Calculations</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              You calculate the cost of flour, sugar, eggs, and butter. You add labor. You set a price. But you forgot about the $200/month in overhead costs that are slowly draining your profits.
            </p>

            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                What This Looks Like
              </h3>
              <ul className="text-gray-700 space-y-3 ml-6">
                <li>• You price based on ingredients + labor, but forget utilities, equipment, insurance, licenses</li>
                <li>• You think &quot;overhead is just part of running a business&quot; without actually calculating it</li>
                <li>• You don&apos;t track how much electricity your oven uses or how much gas you spend on deliveries</li>
                <li>• You buy a new $400 mixer and don&apos;t factor the cost into your pricing</li>
                <li>• You pay $500/year for insurance but never divide that by the number of cakes you make</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The Hidden Overhead Costs</h3>
            <p className="text-gray-700 mb-4">
              Overhead is everything that keeps your business running but doesn&apos;t go directly into the product. Most bakers underestimate this by 50-70%.
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Typical Home Bakery Overhead (Annual)</h3>
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Business liability insurance:</span>
                  <span className="font-semibold text-gray-900">$300-600</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Cottage food license & permits:</span>
                  <span className="font-semibold text-gray-900">$50-200</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Website & domain hosting:</span>
                  <span className="font-semibold text-gray-900">$100-300</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Marketing (ads, cards, etc.):</span>
                  <span className="font-semibold text-gray-900">$200-600</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Accounting/software tools:</span>
                  <span className="font-semibold text-gray-900">$100-300</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Equipment depreciation:</span>
                  <span className="font-semibold text-gray-900">$300-500</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Utilities (oven, mixer, etc.):</span>
                  <span className="font-semibold text-gray-900">$400-800</span>
                </div>
                <div className="flex justify-between pb-3 border-b-2 border-gray-400">
                  <span className="text-gray-700">Gas/mileage for deliveries:</span>
                  <span className="font-semibold text-gray-900">$200-400</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-lg text-gray-900">Total Annual Overhead:</span>
                  <span className="font-bold text-red-600 text-xl">$1,650-3,700</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-gray-700">
                  <strong>If you make 50 cakes per year:</strong> That&apos;s <strong>$33-74 per cake</strong> in overhead costs you need to recover.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The Cost of This Mistake</h3>
            <p className="text-gray-700 mb-4">
              If you&apos;re not including $50/cake in overhead costs, and you make 50 cakes per year, you&apos;re losing <strong>$2,500 annually</strong>. Over 5 years, that&apos;s <strong>$12,500</strong> of your own money subsidizing your business.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Real Example: Mike&apos;s Overhead Wake-Up Call</h3>
              <p className="text-gray-700 mb-3">
                Mike runs a cookie business. He prices his cookies at $25/dozen based on $8 ingredients + $12 labor = $20 cost. He adds $5 profit and feels good about his 25% margin.
              </p>
              <p className="text-gray-700 mb-3">
                But when he actually tracked his overhead for a year, he discovered:
              </p>
              <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                <li>• Insurance: $400</li>
                <li>• License: $100</li>
                <li>• Website: $200</li>
                <li>• Packaging supplies in bulk: $600</li>
                <li>• Utilities: $600</li>
                <li>• Equipment replacement: $400</li>
                <li className="font-bold pt-2 border-t">• Total: $2,300/year</li>
              </ul>
              <p className="text-gray-700 mb-3">
                He made 200 dozen cookies that year. His overhead per dozen: <strong>$11.50</strong>
              </p>
              <div className="bg-red-50 p-4 rounded">
                <p className="text-gray-900 font-bold mb-2">The Reality:</p>
                <p className="text-gray-700">
                  Mike&apos;s real cost per dozen: $8 + $12 + $11.50 = <strong>$31.50</strong>. He was charging $25. He was <strong>losing $6.50 on every dozen</strong> and didn&apos;t know it.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">How to Fix It</h3>
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Method 1: The Quick Way (For Beginners)</h4>
                <p className="text-gray-700 mb-2">
                  Add 20-25% of your ingredient costs as overhead. This is a rough estimate, but it&apos;s better than nothing.
                </p>
                <p className="text-gray-700">
                  <strong>Example:</strong> If ingredients cost $30, add $6-7.50 for overhead.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Method 2: The Accurate Way (For Established Bakers)</h4>
                <p className="text-gray-700 mb-3">
                  Calculate your actual monthly overhead:
                </p>
                <ol className="text-gray-700 space-y-2 ml-6 mb-3">
                  <li>1. List all business expenses for the month (insurance, utilities, licenses, etc.)</li>
                  <li>2. Add them up to get total monthly overhead</li>
                  <li>3. Divide by the number of products you made that month</li>
                  <li>4. That&apos;s your overhead cost per product</li>
                </ol>
                <p className="text-gray-700">
                  <strong>Example:</strong> $200 monthly overhead ÷ 40 cakes = <strong>$5 overhead per cake</strong>
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Method 3: Use BakeProfit (The Easiest Way)</h4>
                <p className="text-gray-700 mb-2">
                  Our <Link href="/bakery-business-tool" className="text-rose-600 hover:underline font-semibold">free bakery management tool</Link> automatically tracks all your overhead costs and divides them across your products. No math required.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mt-6">
              <p className="text-gray-800 font-semibold mb-2">⚠️ Important:</p>
              <p className="text-gray-700">
                Overhead is REAL money coming out of your pocket. If you don&apos;t recover it through your pricing, you&apos;re subsidizing your business with your personal funds. That&apos;s not sustainable.
              </p>
            </div>
          </section>

          {/* Mistake #3 */}
          <section id="mistake-3">
            <h2 className="text-3xl font-bold mb-4">Mistake #3: Forgetting About Your Time Value</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              This is the mistake that keeps home bakers trapped in the &quot;expensive hobby&quot; zone. You count ingredients and overhead, but you don&apos;t pay yourself—or you drastically undervalue your time.
            </p>

            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-red-600" />
                What This Looks Like
              </h3>
              <ul className="text-gray-700 space-y-3 ml-6">
                <li>• You don&apos;t include labor costs at all: &quot;It&apos;s just my time&quot;</li>
                <li>• You pay yourself $10/hour when you should be charging $30/hour</li>
                <li>• You only count &quot;active baking time&quot; and forget shopping, cleanup, delivery, customer communication</li>
                <li>• You think &quot;I love baking, so I shouldn&apos;t charge for my time&quot;</li>
                <li>• You work 6 hours on a cake but only charge for 2 hours</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Why This Is Devastating</h3>
            <p className="text-gray-700 mb-4">
              Your time is your most valuable asset. When you don&apos;t charge for it properly, you&apos;re working for free. Let me show you the math:
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">The True Cost of Undervaluing Your Time</h3>
              <p className="text-gray-700 mb-4">
                Let&apos;s say you make a cake that takes 5 hours total (shopping, baking, decorating, cleanup, delivery).
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">If you don&apos;t charge for labor:</p>
                  <p className="text-gray-700 mb-2">Hourly rate: <strong>$0/hour</strong></p>
                  <p className="text-gray-600 text-sm">You&apos;re working for free. This is a charity, not a business.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">If you charge $10/hour:</p>
                  <p className="text-gray-700 mb-2">Total labor: <strong>$50</strong></p>
                  <p className="text-gray-600 text-sm">You&apos;d make more at McDonald&apos;s. Minimum wage is higher.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">If you charge $20/hour:</p>
                  <p className="text-gray-700 mb-2">Total labor: <strong>$100</strong></p>
                  <p className="text-gray-600 text-sm">Better, but still undervaluing your skill and expertise.</p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">If you charge $30/hour:</p>
                  <p className="text-gray-700 mb-2">Total labor: <strong>$150</strong></p>
                  <p className="text-gray-600 text-sm">Now you&apos;re pricing like a professional. This is sustainable.</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">What You Should Charge Per Hour</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border-2 border-gray-300 p-6 rounded">
                <p className="font-bold text-gray-900 mb-2">Beginner Baker</p>
                <p className="text-3xl font-bold text-rose-600 mb-2">$20-25/hr</p>
                <p className="text-sm text-gray-600">
                  Still learning, building speed, developing consistency
                </p>
              </div>
              <div className="bg-white border-2 border-green-400 p-6 rounded">
                <p className="font-bold text-gray-900 mb-2">Experienced Baker</p>
                <p className="text-3xl font-bold text-green-600 mb-2">$25-35/hr</p>
                <p className="text-sm text-gray-600">
                  Efficient, consistent quality, can handle complex orders
                </p>
              </div>
              <div className="bg-white border-2 border-blue-400 p-6 rounded">
                <p className="font-bold text-gray-900 mb-2">Expert/Specialty</p>
                <p className="text-3xl font-bold text-blue-600 mb-2">$35-50/hr</p>
                <p className="text-sm text-gray-600">
                  Advanced techniques, sugar flowers, intricate designs
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The Cost of This Mistake</h3>
            <p className="text-gray-700 mb-4">
              If you undervalue your time by $15/hour, and you work 200 hours per year on your bakery, you&apos;re losing <strong>$3,000 annually</strong>. Over 5 years, that&apos;s <strong>$15,000</strong> of unpaid labor.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">How to Fix It</h3>
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Step 1: Track ALL Your Time</h4>
                <p className="text-gray-700 mb-3">
                  For your next 5 orders, track every minute from start to finish:
                </p>
                <ul className="text-gray-700 space-y-1 ml-6">
                  <li>• Shopping for ingredients</li>
                  <li>• Prep and setup</li>
                  <li>• Actual baking time</li>
                  <li>• Decorating</li>
                  <li>• Packaging</li>
                  <li>• Cleanup</li>
                  <li>• Customer communication (messages, calls, consultations)</li>
                  <li>• Delivery or pickup coordination</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Step 2: Set Your Hourly Rate</h4>
                <p className="text-gray-700 mb-2">
                  Be honest about your skill level. Don&apos;t undersell yourself. If you&apos;re experienced and efficient, charge $30-35/hour minimum.
                </p>
                <p className="text-gray-700">
                  <strong>Remember:</strong> You&apos;re not just a pair of hands. You&apos;re providing expertise, creativity, and reliability.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Step 3: Include It in Every Quote</h4>
                <p className="text-gray-700">
                  When calculating prices, always include: Ingredients + Packaging + (Hours × Hourly Rate) + Overhead + Profit Margin
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mt-6">
              <p className="text-gray-800 font-semibold mb-2">💡 Mindset Shift:</p>
              <p className="text-gray-700">
                &quot;I love baking&quot; is not a reason to work for free. Doctors love medicine. Lawyers love law. They still charge for their time. Your passion doesn&apos;t make your time worthless—it makes it MORE valuable because you bring enthusiasm AND skill.
              </p>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Target className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Stop Making These Mistakes</h3>
                  <p className="mb-4">BakeProfit automatically calculates all your costs—ingredients, labor, overhead—and shows you the right price. No more guessing, no more losing money.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Pricing Correctly Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real Cost Section */}
          <section id="real-cost">
            <h2 className="text-3xl font-bold mb-4">The Real Cost of These 3 Mistakes</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Let&apos;s add up what these three mistakes are actually costing you:
            </p>

            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Annual Cost Breakdown (50 cakes/year)</h3>
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Mistake #1: Undercharging by $20/cake:</span>
                  <span className="font-semibold text-red-600">-$1,000</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Mistake #2: Missing $50/cake overhead:</span>
                  <span className="font-semibold text-red-600">-$2,500</span>
                </div>
                <div className="flex justify-between pb-3 border-b-2 border-red-400">
                  <span className="text-gray-700">Mistake #3: Undervaluing time by $15/hr (200 hrs):</span>
                  <span className="font-semibold text-red-600">-$3,000</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-lg">Total Annual Loss:</span>
                  <span className="font-bold text-red-600 text-2xl">-$6,500</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t-2 bg-white p-4 rounded">
                <p className="text-gray-900 font-bold mb-2">Over 5 Years:</p>
                <p className="text-gray-700 mb-3">
                  $6,500 × 5 = <strong className="text-red-600 text-xl">$32,500</strong> lost to pricing mistakes
                </p>
                <p className="text-gray-700">
                  That&apos;s enough for a down payment on a house, a new car, or a year of college tuition. Gone. Because of three fixable mistakes.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 The Good News:</p>
              <p className="text-gray-700">
                These mistakes are 100% fixable. You don&apos;t need to work more hours or bake more cakes. You just need to price correctly. Fix your pricing today, and you could add $6,500 to your annual income without changing anything else.
              </p>
            </div>
          </section>

          {/* How to Fix Section */}
          <section id="fix-pricing">
            <h2 className="text-3xl font-bold mb-4">How to Fix Your Pricing Today</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Here&apos;s your step-by-step action plan to fix all three mistakes:
            </p>

            <div className="space-y-4">
              <div className="bg-white border-l-4 border-rose-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Calculate Your True Costs</h3>
                    <p className="text-gray-700 mb-2">
                      Use our <Link href="/tools/recipe-cost-calculator" className="text-rose-600 hover:underline font-semibold">free recipe cost calculator</Link> to calculate:
                    </p>
                    <ul className="text-gray-700 space-y-1 ml-6">
                      <li>• All ingredient costs (including the small stuff)</li>
                      <li>• Packaging costs</li>
                      <li>• Labor costs (track ALL your time × fair hourly rate)</li>
                      <li>• Overhead costs (calculate monthly, divide by products)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-rose-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Set Your Minimum Price</h3>
                    <p className="text-gray-700 mb-2">
                      Formula: Total Cost ÷ (1 - Desired Profit Margin %)
                    </p>
                    <p className="text-gray-700">
                      For a 40% profit margin: Total Cost ÷ 0.60. This is your FLOOR. Never go below it.
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
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Update Your Prices</h3>
                    <p className="text-gray-700">
                      Don&apos;t apologize. Don&apos;t explain. Just update your price list, website, and quotes. Be confident. Your prices reflect your value.
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
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Track Everything Going Forward</h3>
                    <p className="text-gray-700">
                      Use <Link href="/bakery-business-tool" className="text-rose-600 hover:underline font-semibold">BakeProfit</Link> to automatically track costs, calculate prices, and manage your bakery. Never lose money again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Building Confidence Section */}
          <section id="confidence">
            <h2 className="text-3xl font-bold mb-4">Building Pricing Confidence</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Knowing your numbers is half the battle. The other half is having the confidence to charge what you&apos;re worth. Here&apos;s how:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Practice Your Price Quote</h3>
                <p className="text-gray-700 mb-3">
                  Stand in front of a mirror and say: &quot;The investment for this cake is $250.&quot; Say it 20 times. Say it until the hesitation disappears from your voice.
                </p>
                <p className="text-gray-700">
                  Customers can hear uncertainty. If YOU don&apos;t believe your prices are fair, they won&apos;t either.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Remember: You&apos;re Selling Value, Not Time</h3>
                <p className="text-gray-700">
                  Don&apos;t say: &quot;It takes me 5 hours to make this cake, so...&quot;
                </p>
                <p className="text-gray-700 mt-2">
                  Instead say: &quot;This custom cake includes premium ingredients, a personalized design consultation, and delivery. The investment is $250.&quot;
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Handle Objections Confidently</h3>
                <p className="text-gray-700 mb-3">
                  When someone says &quot;That&apos;s expensive&quot;:
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Don&apos;t say:</strong> &quot;I know, but I have to charge this much because...&quot;
                </p>
                <p className="text-gray-700">
                  <strong>Do say:</strong> &quot;I understand. My cakes are priced to reflect the quality ingredients and custom work that goes into each one. Would you like to discuss what design you had in mind?&quot;
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Know When to Walk Away</h3>
                <p className="text-gray-700">
                  If someone pushes for a discount or says they can get it cheaper elsewhere, let them go. Say: &quot;I understand. I hope you find what you&apos;re looking for!&quot; and move on. Customers who value quality will pay for it.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if I lose customers when I raise my prices?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> You&apos;ll lose the price-sensitive customers who were never profitable anyway. But you&apos;ll keep the customers who value quality. And you&apos;ll attract new customers who are willing to pay for premium work. It&apos;s better to make 5 cakes at $250 ($1,250) than 10 cakes at $100 ($1,000)—and work half as much.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How do I know if my prices are too high?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> If you&apos;re booking 80-100% of inquiries, your prices are probably too low. If you&apos;re booking 10-20%, they might be too high. The sweet spot is 40-60% conversion. Also, if you&apos;re fully booked 3+ months out, you&apos;re definitely underpriced.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Should I charge friends and family full price?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Yes. Your costs don&apos;t change because it&apos;s for family. Either charge full price or give it as a gift (and write it off as marketing). Don&apos;t give half-hearted discounts that still cost you money. Real friends will understand and support your business.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How often should I update my prices?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Review your costs quarterly. When ingredient costs increase by 10%+, adjust prices immediately. At minimum, increase prices annually to account for inflation and your growing expertise. Never go more than a year without reviewing pricing.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if my competitor charges half what I do?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Let them. They&apos;re either losing money, using inferior ingredients, or have different costs than you. You&apos;re not competing on price—you&apos;re competing on quality, service, and expertise. Position yourself as the premium option.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Ready to Fix Your Pricing?</h2>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              Stop losing money on every cake. BakeProfit helps you calculate true costs, set profitable prices, and build a sustainable bakery business.
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
              <Link href="/blog/losing-money-on-cakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Why You&apos;re Losing Money on Every Cake</h4>
                <p className="text-gray-600 text-sm">Discover the 7 hidden costs killing your profits and learn how to fix your pricing without losing customers.</p>
              </Link>
              <Link href="/blog/how-to-calculate-recipe-cost" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Calculate Recipe Cost</h4>
                <p className="text-gray-600 text-sm">Learn the exact formula to calculate recipe costs including ingredients, labor, overhead, and profit margins.</p>
              </Link>
              <Link href="/blog/bakery-profit-margins" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Bakery Profit Margins Explained</h4>
                <p className="text-gray-600 text-sm">What profit margins are normal for bakeries and 10 proven strategies to improve yours.</p>
              </Link>
              <Link href="/blog/how-to-price-cakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Cake Pricing Formula</h4>
                <p className="text-gray-600 text-sm">Learn the exact formula to price cakes profitably with complexity multipliers and real examples.</p>
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
