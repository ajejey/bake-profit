'use client'

import Link from 'next/link'
import { Calculator, AlertTriangle, DollarSign, Clock, TrendingDown, CheckCircle, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '../layout/Footer'

export default function LosingMoneyOnCakesArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → Why You&apos;re Losing Money on Every Cake
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Why You&apos;re Losing Money on Every Cake (And Don&apos;t Know It)
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Jan 30, 2025</span> • <span>18 min read</span> • <span className="text-rose-600 font-semibold">Pricing & Profitability</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            You just delivered a beautiful three-tier wedding cake. The bride cried happy tears. Her mom hugged you. You drove home feeling like a rockstar baker.
          </p>

          <p className="text-xl text-gray-700">
            Then you sit down to do the math. After ingredients, your time, gas for delivery, and that emergency trip to buy more fondant... you made $47. For 12 hours of work. That&apos;s $3.92 per hour.
          </p>

          <p className="text-xl text-gray-700 font-bold">
            You just worked for less than minimum wage. And you didn&apos;t even realize it until now.
          </p>

          <p className="text-lg text-gray-700">
            If this sounds familiar, you&apos;re not alone. <strong>Most home bakers are losing money on every cake they sell—and they have no idea.</strong> They think they&apos;re profitable because money comes in. But when you actually track every cost, the truth is devastating.
          </p>

          <p className="text-lg text-gray-700">
            This isn&apos;t about working harder or baking more cakes. It&apos;s about understanding the hidden costs that are silently draining your profits. Once you see them, you can fix them. Let me show you exactly where your money is going—and how to keep it.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Calculator className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Stop Losing Money Today</h3>
                  <p className="mb-4">Calculate your true recipe costs in 2 minutes. See exactly where your money goes and what you should actually charge. No signup required.</p>
                  <Link href="/tools/recipe-cost-calculator">
                    <Button className="bg-rose-500 hover:bg-rose-600">Use Free Calculator →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <div className="bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li><a href="#real-story" className="hover:text-rose-600">The $3/Hour Baker: A Real Story</a></li>
              <li><a href="#hidden-costs" className="hover:text-rose-600">The 7 Hidden Costs Killing Your Profits</a></li>
              <li><a href="#labor-trap" className="hover:text-rose-600">The Labor Cost Trap (Why You&apos;re Working for Free)</a></li>
              <li><a href="#overhead-invisible" className="hover:text-rose-600">The Invisible Overhead That Adds Up to Thousands</a></li>
              <li><a href="#calculate-true-cost" className="hover:text-rose-600">How to Calculate Your TRUE Cost Per Cake</a></li>
              <li><a href="#real-numbers" className="hover:text-rose-600">Real Numbers: What That $150 Cake Actually Costs</a></li>
              <li><a href="#fix-pricing" className="hover:text-rose-600">How to Fix Your Pricing (Without Losing Customers)</a></li>
              <li><a href="#mistakes" className="hover:text-rose-600">5 Pricing Mistakes That Cost You Thousands</a></li>
              <li><a href="#action-plan" className="hover:text-rose-600">Your 7-Day Action Plan to Stop Losing Money</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* Section 1: Real Story */}
          <section id="real-story">
            <h2 className="text-3xl font-bold mb-4">The $3/Hour Baker: A Real Story</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Meet Sarah. She&apos;s been baking cakes from home for two years. She has 4,000 Instagram followers. She gets orders every week. By all appearances, she&apos;s running a successful bakery business.
            </p>

            <p className="text-gray-700 mb-4">
              But when I asked her to track her costs for one month—every ingredient, every minute of time, every expense—here&apos;s what we discovered:
            </p>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Sarah&apos;s Reality Check</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Monthly Revenue (8 cakes):</span>
                  <span className="font-bold text-gray-900">$1,200</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Ingredient Costs:</span>
                  <span className="font-bold text-gray-900">$380</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Packaging & Supplies:</span>
                  <span className="font-bold text-gray-900">$95</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Gas for Deliveries:</span>
                  <span className="font-bold text-gray-900">$60</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Utilities (oven, mixer):</span>
                  <span className="font-bold text-gray-900">$85</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Marketing & Website:</span>
                  <span className="font-bold text-gray-900">$40</span>
                </div>
                <div className="flex justify-between pb-3 border-b-2 border-gray-400">
                  <span className="text-gray-700">Total Hours Worked:</span>
                  <span className="font-bold text-gray-900">96 hours</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-900 font-bold text-lg">Net Profit:</span>
                  <span className="font-bold text-green-600 text-lg">$540</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded border-2 border-red-400">
                <p className="text-gray-700 mb-2">
                  <strong>Her Hourly Rate:</strong> $540 ÷ 96 hours = <span className="text-red-600 font-bold text-xl">$5.63/hour</span>
                </p>
                <p className="text-gray-600 text-sm">
                  That&apos;s less than half the federal minimum wage. She would make more money working at McDonald&apos;s.
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              Sarah was shocked. She thought she was making good money because she saw $1,200 come in. She didn&apos;t realize that after all costs, she was essentially working for free.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 The Wake-Up Call:</p>
              <p className="text-gray-700">
                After we recalculated her costs and adjusted her prices, Sarah now charges $225 per cake (up from $150). She makes $1,800 per month for the same 8 cakes. Her hourly rate? <strong>$18.75/hour.</strong> She tripled her income without working more hours.
              </p>
            </div>

            <p className="text-gray-700 mt-6">
              The difference between $5.63/hour and $18.75/hour isn&apos;t talent or skill. It&apos;s understanding your costs and pricing accordingly. Let me show you exactly what Sarah was missing—and what you&apos;re probably missing too.
            </p>
          </section>

          {/* Section 2: Hidden Costs - Part 1 */}
          <section id="hidden-costs">
            <h2 className="text-3xl font-bold mb-4">The 7 Hidden Costs Killing Your Profits</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Most bakers only count the obvious costs: flour, sugar, eggs, butter. But there are at least seven other costs that are silently eating your profits. Here&apos;s what you&apos;re missing:
            </p>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900">1. The &quot;Small&quot; Ingredients You Forget</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Vanilla extract. Food coloring. Baking powder. Parchment paper. Each one seems insignificant—$0.30 here, $0.50 there. But over 100 cakes, that&apos;s $30-50 you&apos;re losing.
                </p>
                <div className="bg-white p-4 rounded">
                  <p className="text-sm text-gray-700 mb-2"><strong>Real Example:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Vanilla extract: $0.80 per cake</li>
                    <li>• Food coloring (gel): $0.45 per cake</li>
                    <li>• Baking powder/soda: $0.15 per cake</li>
                    <li>• Parchment paper: $0.25 per cake</li>
                    <li>• Cooking spray: $0.10 per cake</li>
                    <li className="font-bold pt-2 border-t">• Total: $1.75 per cake</li>
                  </ul>
                  <p className="text-gray-600 text-sm mt-3 italic">
                    If you make 50 cakes per year, that&apos;s $87.50 you&apos;re not accounting for. Over 5 years? <strong>$437.50</strong> gone.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900">2. The Time You Don&apos;t Count</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  You count the 3 hours you spend baking and decorating. But what about:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6 mb-3">
                  <li>• Shopping for ingredients (30-45 min)</li>
                  <li>• Answering customer messages (15-30 min)</li>
                  <li>• Cleaning up (20-30 min)</li>
                  <li>• Packaging and labeling (15 min)</li>
                  <li>• Driving to deliver (30-60 min)</li>
                  <li>• Taking photos for Instagram (10-15 min)</li>
                </ul>
                <div className="bg-white p-4 rounded">
                  <p className="text-gray-700">
                    <strong>Reality:</strong> That &quot;3-hour cake&quot; actually takes <strong>5-6 hours</strong> of your time. If you&apos;re only charging for 3 hours, you&apos;re working 2-3 hours for free on every cake.
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    At $25/hour, that&apos;s <strong>$50-75 per cake</strong> you&apos;re not getting paid.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <div className="flex items-start gap-3 mb-3">
                  <DollarSign className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900">3. Packaging That Adds Up Fast</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Cake boxes, boards, dowels, ribbons, labels, tissue paper—these aren&apos;t free. And they&apos;re not cheap either.
                </p>
                <div className="bg-white p-4 rounded">
                  <p className="text-sm text-gray-700 mb-2"><strong>Typical Packaging Costs Per Cake:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Cake box (10-12 inch): $2.50-4.00</li>
                    <li>• Cake board: $0.75-1.50</li>
                    <li>• Dowels (for tiered cakes): $0.50-1.00</li>
                    <li>• Ribbon/decoration: $0.50-1.00</li>
                    <li>• Business card/label: $0.15-0.30</li>
                    <li className="font-bold pt-2 border-t">• Total: $4.40-7.80 per cake</li>
                  </ul>
                  <p className="text-gray-600 text-sm mt-3">
                    For a tiered wedding cake, packaging can cost <strong>$15-25</strong>. Are you charging for that?
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <div className="flex items-start gap-3 mb-3">
                  <TrendingDown className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900">4. Utilities You Never Calculate</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Your oven doesn&apos;t run on magic—it runs on electricity or gas. And it&apos;s one of the most energy-intensive appliances in your home.
                </p>
                <div className="bg-white p-4 rounded">
                  <p className="text-sm text-gray-700 mb-2"><strong>Average Utility Costs Per Cake:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4 mb-3">
                    <li>• Oven (3 hours at 350°F): $1.20-1.80</li>
                    <li>• Stand mixer (30 min): $0.15-0.25</li>
                    <li>• Refrigerator (overnight storage): $0.30-0.50</li>
                    <li>• Dishwasher (cleanup): $0.40-0.60</li>
                    <li>• Water (washing dishes, cooling): $0.20-0.30</li>
                    <li className="font-bold pt-2 border-t">• Total: $2.25-3.45 per cake</li>
                  </ul>
                  <p className="text-gray-700 font-semibold">
                    That&apos;s $112-172 per year if you make 50 cakes. Over 5 years? <strong>$560-860</strong> you&apos;re not recovering.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900">5. Equipment Depreciation (The Silent Killer)</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Your $400 KitchenAid mixer won&apos;t last forever. Neither will your oven, pans, or decorating tools. These are business expenses that need to be recovered through your pricing.
                </p>
                <div className="bg-white p-4 rounded">
                  <p className="text-sm text-gray-700 mb-2"><strong>Equipment Lifespan & Cost Per Cake:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-2 ml-4 mb-3">
                    <li>• Stand mixer ($400, 5 years, 250 cakes) = <strong>$1.60/cake</strong></li>
                    <li>• Cake pans set ($150, 3 years, 150 cakes) = <strong>$1.00/cake</strong></li>
                    <li>• Decorating tools ($200, 2 years, 100 cakes) = <strong>$2.00/cake</strong></li>
                    <li>• Oven wear & tear ($1,200, 10 years, 500 cakes) = <strong>$2.40/cake</strong></li>
                    <li className="font-bold pt-2 border-t">• Total: $7.00 per cake</li>
                  </ul>
                  <p className="text-gray-600 text-sm">
                    Most bakers never factor this in. That&apos;s <strong>$350 per year</strong> (50 cakes) you&apos;re losing.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <div className="flex items-start gap-3 mb-3">
                  <DollarSign className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900">6. Waste & Mistakes (The Expensive Teacher)</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Burnt layers. Cracked fondant. Expired ingredients. Test batches. Samples for tastings. These all cost money, but most bakers never track them.
                </p>
                <div className="bg-white p-4 rounded">
                  <p className="text-gray-700 mb-2">
                    <strong>Industry average:</strong> 5-10% waste rate for home bakers
                  </p>
                  <p className="text-gray-700 mb-3">
                    If your ingredient costs are $50 per cake and you have a 7% waste rate, you&apos;re losing <strong>$3.50 per cake</strong> to mistakes and waste.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Over 50 cakes per year, that&apos;s <strong>$175</strong> literally thrown in the trash.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900">7. Business Overhead (The Stuff You Forget)</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Insurance. Business license. Website hosting. Social media ads. Accounting software. These are real business expenses that must be covered by your pricing.
                </p>
                <div className="bg-white p-4 rounded">
                  <p className="text-sm text-gray-700 mb-2"><strong>Typical Annual Overhead for Home Bakery:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4 mb-3">
                    <li>• Business liability insurance: $300-600/year</li>
                    <li>• Cottage food license: $50-200/year</li>
                    <li>• Website & domain: $100-300/year</li>
                    <li>• Social media ads: $200-600/year</li>
                    <li>• Accounting/software: $100-300/year</li>
                    <li>• Business cards, marketing: $100-200/year</li>
                    <li className="font-bold pt-2 border-t">• Total: $850-2,200/year</li>
                  </ul>
                  <p className="text-gray-700 font-semibold">
                    If you make 50 cakes per year, that&apos;s <strong>$17-44 per cake</strong> in overhead costs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">The Total Hidden Cost Breakdown</h3>
              <p className="text-gray-700 mb-4">
                Let&apos;s add up all seven hidden costs for a typical cake:
              </p>
              <div className="bg-white p-4 rounded space-y-2">
                <div className="flex justify-between pb-2 border-b">
                  <span>Small ingredients:</span>
                  <span className="font-semibold">$1.75</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Uncounted time (2 hours @ $25/hr):</span>
                  <span className="font-semibold">$50.00</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Packaging:</span>
                  <span className="font-semibold">$6.00</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Utilities:</span>
                  <span className="font-semibold">$2.85</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Equipment depreciation:</span>
                  <span className="font-semibold">$7.00</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Waste (7%):</span>
                  <span className="font-semibold">$3.50</span>
                </div>
                <div className="flex justify-between pb-3 border-b-2 border-gray-400">
                  <span>Business overhead:</span>
                  <span className="font-semibold">$30.00</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-lg">Total Hidden Costs:</span>
                  <span className="font-bold text-red-600 text-xl">$101.10</span>
                </div>
              </div>
              <p className="text-gray-700 mt-4 font-semibold">
                That&apos;s over $100 per cake you&apos;re probably not accounting for. If you&apos;re charging $150 for a cake and your ingredients cost $45, you think you&apos;re making $105 profit. But after hidden costs, your real profit is only <strong>$3.90</strong>.
              </p>
            </div>
          </section>

          {/* CTA Card 2 */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Target className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Track Every Cost Automatically</h3>
                  <p className="mb-4">BakeProfit tracks ingredients, labor, packaging, overhead—everything. Know your true costs and never lose money again.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Tracking Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Labor Trap */}
          <section id="labor-trap">
            <h2 className="text-3xl font-bold mb-4">The Labor Cost Trap (Why You&apos;re Working for Free)</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Here&apos;s the biggest mistake I see: <strong>bakers don&apos;t pay themselves.</strong>
            </p>

            <p className="text-gray-700 mb-4">
              They calculate ingredient costs, maybe add a bit for packaging, then slap on a markup and call it a day. But they completely forget to include the value of their own time.
            </p>

            <p className="text-gray-700 mb-6">
              Let me be crystal clear: <strong>Your time is worth money.</strong> I don&apos;t care if you love baking or it doesn&apos;t feel like work. Would you work at someone else&apos;s bakery for free? No? Then why are you working at YOUR bakery for free?
            </p>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">How Much Should You Pay Yourself?</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border-2 border-gray-300">
                  <p className="font-bold text-gray-900 mb-2">Beginner Baker</p>
                  <p className="text-3xl font-bold text-rose-600 mb-2">$20-25/hr</p>
                  <p className="text-sm text-gray-600">
                    Still learning techniques, building speed, developing skills
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded border-2 border-green-400">
                  <p className="font-bold text-gray-900 mb-2">Experienced Baker</p>
                  <p className="text-3xl font-bold text-green-600 mb-2">$25-35/hr</p>
                  <p className="text-sm text-gray-600">
                    Efficient workflow, consistent quality, can handle complex orders
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded border-2 border-blue-400">
                  <p className="font-bold text-gray-900 mb-2">Expert/Specialty</p>
                  <p className="text-3xl font-bold text-blue-600 mb-2">$35-50/hr</p>
                  <p className="text-sm text-gray-600">
                    Advanced decorating, sugar flowers, intricate designs, years of experience
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              Don&apos;t undervalue yourself. If you&apos;re charging $20/hour when you should be charging $30/hour, you&apos;re losing $10 for every hour you work. On a 5-hour cake, that&apos;s $50 you&apos;re giving away for free.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">⚠️ Reality Check:</p>
              <p className="text-gray-700">
                If you&apos;re making less than $15/hour after all costs, you&apos;re literally working for less than minimum wage. Your bakery isn&apos;t a business—it&apos;s an expensive hobby that&apos;s costing you money.
              </p>
            </div>
          </section>

          {/* Section 4: Calculate True Cost */}
          <section id="calculate-true-cost">
            <h2 className="text-3xl font-bold mb-4">How to Calculate Your TRUE Cost Per Cake</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Now that you know what costs to track, let&apos;s calculate the real cost of a cake. I&apos;ll walk you through the exact formula, step by step.
            </p>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">The Complete Cost Formula</h3>
              <div className="bg-gray-900 text-white p-6 rounded-lg font-mono text-sm">
                <div className="mb-4"><strong className="text-rose-400">Total Cost =</strong></div>
                <div className="pl-4 space-y-2">
                  <div>+ Ingredient Costs</div>
                  <div>+ Packaging Costs</div>
                  <div>+ Labor Costs (your hourly rate × total hours)</div>
                  <div>+ Overhead Costs (utilities + equipment + business expenses)</div>
                  <div>+ Waste Factor (5-10% of ingredient costs)</div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <strong className="text-green-400">Selling Price =</strong>
                </div>
                <div className="pl-4 mt-2">Total Cost ÷ (1 - Desired Profit Margin %)</div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Step-by-Step Calculation</h3>
            <p className="text-gray-700 mb-4">
              Let&apos;s calculate the true cost of a 3-layer, 8-inch custom cake:
            </p>

            <div className="space-y-4">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">Step 1: Calculate Ingredient Costs</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Cake layers (flour, sugar, eggs, butter, etc.): $12.50</li>
                  <li>• Buttercream frosting: $8.00</li>
                  <li>• Fondant/decorations: $6.50</li>
                  <li>• Food coloring, vanilla, etc.: $1.75</li>
                  <li className="font-bold pt-2 border-t">• Subtotal: $28.75</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">Step 2: Add Packaging</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Cake box: $3.50</li>
                  <li>• Cake board: $1.00</li>
                  <li>• Ribbon/label: $0.50</li>
                  <li className="font-bold pt-2 border-t">• Subtotal: $5.00</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">Step 3: Calculate Labor</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 mb-2">
                  <li>• Baking & cooling: 2 hours</li>
                  <li>• Decorating: 2.5 hours</li>
                  <li>• Cleanup & packaging: 0.5 hours</li>
                  <li>• Customer communication: 0.5 hours</li>
                  <li className="font-bold pt-2 border-t">• Total: 5.5 hours</li>
                </ul>
                <p className="text-sm text-gray-700">
                  At $30/hour: 5.5 × $30 = <strong className="text-rose-600">$165.00</strong>
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">Step 4: Add Overhead</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Utilities (oven, mixer, etc.): $2.85</li>
                  <li>• Equipment depreciation: $7.00</li>
                  <li>• Business overhead (insurance, license, etc.): $30.00</li>
                  <li className="font-bold pt-2 border-t">• Subtotal: $39.85</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">Step 5: Add Waste Factor</p>
                <p className="text-sm text-gray-700 mb-2">
                  7% of ingredient costs: $28.75 × 0.07 = <strong className="text-rose-600">$2.01</strong>
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-xl">Total True Cost</h3>
                <div className="space-y-2">
                  <div className="flex justify-between pb-2 border-b">
                    <span>Ingredients:</span>
                    <span className="font-semibold">$28.75</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span>Packaging:</span>
                    <span className="font-semibold">$5.00</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span>Labor:</span>
                    <span className="font-semibold">$165.00</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span>Overhead:</span>
                    <span className="font-semibold">$39.85</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b-2 border-gray-400">
                    <span>Waste:</span>
                    <span className="font-semibold">$2.01</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-lg">TOTAL COST:</span>
                    <span className="font-bold text-green-600 text-2xl">$240.61</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t-2">
                  <p className="text-gray-700 mb-3">
                    <strong>With 40% Profit Margin:</strong>
                  </p>
                  <p className="text-gray-700 mb-2">
                    Selling Price = $240.61 ÷ (1 - 0.40) = $240.61 ÷ 0.60
                  </p>
                  <p className="text-gray-900 font-bold text-2xl">
                    = <span className="text-green-600">$401.02</span> (round to $400)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Real Numbers */}
          <section id="real-numbers">
            <h2 className="text-3xl font-bold mb-4">Real Numbers: What That $150 Cake Actually Costs</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Let&apos;s say you&apos;re currently charging $150 for that same 3-layer custom cake. Here&apos;s the brutal reality:
            </p>

            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">The $150 Cake Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Selling Price:</span>
                  <span className="font-bold text-gray-900">$150.00</span>
                </div>
                <div className="flex justify-between pb-2 border-b text-red-600">
                  <span>- Ingredients:</span>
                  <span className="font-semibold">-$28.75</span>
                </div>
                <div className="flex justify-between pb-2 border-b text-red-600">
                  <span>- Packaging:</span>
                  <span className="font-semibold">-$5.00</span>
                </div>
                <div className="flex justify-between pb-2 border-b text-red-600">
                  <span>- Labor (5.5 hrs @ $30/hr):</span>
                  <span className="font-semibold">-$165.00</span>
                </div>
                <div className="flex justify-between pb-2 border-b text-red-600">
                  <span>- Overhead:</span>
                  <span className="font-semibold">-$39.85</span>
                </div>
                <div className="flex justify-between pb-3 border-b-2 border-red-400 text-red-600">
                  <span>- Waste:</span>
                  <span className="font-semibold">-$2.01</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-lg">Your ACTUAL Profit:</span>
                  <span className="font-bold text-red-600 text-2xl">-$90.61</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t-2 bg-white p-4 rounded">
                <p className="text-gray-900 font-bold mb-2">Translation:</p>
                <p className="text-gray-700">
                  You&apos;re not making money. You&apos;re <strong>losing $90.61</strong> on every cake. You&apos;re paying customers to take your cakes. You&apos;re working 5.5 hours and ending up <strong>$90.61 poorer</strong> than when you started.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 The Math is Clear:</p>
              <p className="text-gray-700">
                To break even (make $0 profit), you&apos;d need to charge <strong>$240.61</strong>. To make a reasonable 40% profit margin, you need to charge <strong>$400</strong>. That&apos;s 2.67× what you&apos;re currently charging.
              </p>
            </div>
          </section>

          {/* Section 6: Fix Pricing */}
          <section id="fix-pricing">
            <h2 className="text-3xl font-bold mb-4">How to Fix Your Pricing (Without Losing Customers)</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              I know what you&apos;re thinking: &quot;If I raise my prices from $150 to $400, I&apos;ll lose all my customers!&quot;
            </p>

            <p className="text-gray-700 mb-6">
              Here&apos;s the truth: <strong>You&apos;ll lose some customers. And that&apos;s okay.</strong> Because the customers you lose are the ones who were never going to make your business profitable anyway. You&apos;re better off without them.
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Strategy 1: Gradual Price Increases</h3>
                <p className="text-gray-700 mb-3">
                  Don&apos;t jump from $150 to $400 overnight. Increase gradually:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• <strong>Month 1:</strong> Raise to $200 (33% increase)</li>
                  <li>• <strong>Month 3:</strong> Raise to $275 (38% increase)</li>
                  <li>• <strong>Month 6:</strong> Raise to $350 (27% increase)</li>
                  <li>• <strong>Month 9:</strong> Raise to $400 (14% increase)</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Smaller, frequent increases are easier for customers to accept than one massive jump.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Strategy 2: Grandfather Existing Customers</h3>
                <p className="text-gray-700 mb-3">
                  Keep your current prices for existing customers for 30-60 days. New customers pay the new rate. This:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• Rewards loyalty</li>
                  <li>• Gives you time to adjust</li>
                  <li>• Reduces pushback</li>
                  <li>• Creates urgency (book now before prices go up!)</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Strategy 3: Add Value, Then Raise Prices</h3>
                <p className="text-gray-700 mb-3">
                  Before raising prices, add something extra:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• Free delivery within 10 miles</li>
                  <li>• Complimentary cake tasting</li>
                  <li>• Custom design consultation</li>
                  <li>• Premium packaging upgrade</li>
                  <li>• Matching cupcakes (at a discount)</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Now you&apos;re not just raising prices—you&apos;re offering more value.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Strategy 4: Create Pricing Tiers</h3>
                <p className="text-gray-700 mb-3">
                  Offer three options at different price points:
                </p>
                <div className="bg-white p-4 rounded space-y-3">
                  <div className="border-b pb-2">
                    <p className="font-bold text-gray-900">Basic Tier: $275</p>
                    <p className="text-sm text-gray-600">Simple buttercream, basic design, customer pickup</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="font-bold text-gray-900">Standard Tier: $400</p>
                    <p className="text-sm text-gray-600">Custom design, fondant option, free delivery within 10 miles</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Premium Tier: $550</p>
                    <p className="text-sm text-gray-600">Intricate design, sugar flowers, tasting, delivery & setup</p>
                  </div>
                </div>
                <p className="text-gray-700 mt-3">
                  Most customers will choose the middle option, which is exactly where you want them.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Strategy 5: Communicate Your Value</h3>
                <p className="text-gray-700 mb-3">
                  Don&apos;t just say &quot;My prices are going up.&quot; Explain WHY:
                </p>
                <div className="bg-white p-4 rounded">
                  <p className="text-gray-700 italic mb-2">
                    &quot;I&apos;ve invested in professional training, upgraded to premium ingredients, and implemented better quality control to ensure every cake exceeds your expectations. To continue providing this level of quality and service, my pricing will be adjusting to reflect the true value you receive.&quot;
                  </p>
                </div>
                <p className="text-gray-700 mt-3">
                  Focus on quality, expertise, and the experience—not just the cake itself.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mt-6">
              <p className="text-gray-800 font-semibold mb-2">⚠️ Important Truth:</p>
              <p className="text-gray-700">
                It&apos;s better to make 5 cakes at $400 ($2,000) than 10 cakes at $150 ($1,500). You make more money AND work half as much. The math is simple: fewer orders at higher prices = more profit and less burnout.
              </p>
            </div>
          </section>

          {/* Section 7: Pricing Mistakes */}
          <section id="mistakes">
            <h2 className="text-3xl font-bold mb-4">5 Pricing Mistakes That Cost You Thousands</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Even after you understand your costs, these mistakes can still sabotage your profitability:
            </p>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #1: Pricing Based on Competitors</h3>
                <p className="text-gray-700 mb-3">
                  <strong>The Problem:</strong> You see another baker charging $150 for a similar cake, so you match or undercut them.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Why It&apos;s Wrong:</strong> You have no idea what their costs are. They might be losing money too. Or they might have lower costs because they buy in bulk, work faster, or use cheaper ingredients.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>The Fix:</strong> Calculate YOUR costs first. Then check competitors for market positioning, but never price below your costs + desired profit.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #2: Giving Friends & Family Discounts</h3>
                <p className="text-gray-700 mb-3">
                  <strong>The Problem:</strong> &quot;It&apos;s for my sister&apos;s birthday, so I&apos;ll only charge $100 instead of $400.&quot;
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Why It&apos;s Wrong:</strong> Your costs don&apos;t change just because it&apos;s for family. You still spend 5.5 hours and $75 in materials. You&apos;re subsidizing their cake with your own money.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>The Fix:</strong> Charge full price, or give it as a gift (and write it off as marketing). Don&apos;t half-ass it with a discount that still costs you money.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #3: Not Charging for Revisions</h3>
                <p className="text-gray-700 mb-3">
                  <strong>The Problem:</strong> Customer changes the design 3 times. You redo the cake. You don&apos;t charge extra.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Why It&apos;s Wrong:</strong> Every revision costs you time and materials. If you don&apos;t charge for it, you&apos;re working for free.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>The Fix:</strong> Include 1 free revision in your base price. Charge $50-100 for each additional revision. Put this in your contract.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #4: Not Charging for Rush Orders</h3>
                <p className="text-gray-700 mb-3">
                  <strong>The Problem:</strong> Customer needs a cake in 2 days. You rearrange your schedule. You charge the same price as a 2-week order.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Why It&apos;s Wrong:</strong> Rush orders disrupt your workflow, force you to work late, and prevent you from taking other orders. Your time is more valuable when it&apos;s urgent.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>The Fix:</strong> Charge 25-50% rush fee for orders less than 1 week out. 50-100% for orders less than 3 days out.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #5: Not Updating Prices When Costs Rise</h3>
                <p className="text-gray-700 mb-3">
                  <strong>The Problem:</strong> Butter goes from $4/lb to $7/lb. You keep charging the same prices you set 6 months ago.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Why It&apos;s Wrong:</strong> Your profit margin just shrunk by 30-40%. You&apos;re making less money on every cake without realizing it.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>The Fix:</strong> Review and update your prices quarterly. When major ingredients increase by 20%+, adjust prices immediately.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Card 3 */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <CheckCircle className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Start Making Real Profit Today</h3>
                  <p className="mb-4">Join thousands of bakers who use BakeProfit to track costs, price profitably, and grow their business. Start free—no credit card required.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Get Started Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 8: Action Plan */}
          <section id="action-plan">
            <h2 className="text-3xl font-bold mb-4">Your 7-Day Action Plan to Stop Losing Money</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Don&apos;t just read this and do nothing. Here&apos;s your step-by-step plan to fix your pricing in the next 7 days:
            </p>

            <div className="space-y-4">
              <div className="bg-white border-l-4 border-rose-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Day 1: Calculate Your Costs</h3>
                    <p className="text-gray-700 mb-3">
                      Use our <Link href="/tools/recipe-cost-calculator" className="text-rose-600 hover:underline font-semibold">free recipe cost calculator</Link> to calculate the true cost of your 3 most popular products. Include ingredients, labor, packaging, overhead, and waste.
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      Time required: 2-3 hours
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
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Day 2: Calculate Profitable Prices</h3>
                    <p className="text-gray-700 mb-3">
                      For each product, calculate what you SHOULD be charging to make a 40-50% profit margin. Write these numbers down. Stare at them. Accept that this is reality.
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      Time required: 1 hour
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
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Day 3: Create Your Pricing Strategy</h3>
                    <p className="text-gray-700 mb-3">
                      Decide how you&apos;ll implement new prices. Gradual increases? Pricing tiers? Grandfathering existing customers? Write out your plan with specific dates and amounts.
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      Time required: 1-2 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-rose-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Day 4: Update Your Materials</h3>
                    <p className="text-gray-700 mb-3">
                      Update your website, social media, price lists, and order forms with new prices. If you&apos;re grandfathering, create two price sheets: one for existing customers, one for new.
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      Time required: 2-3 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-rose-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Day 5: Communicate to Existing Customers</h3>
                    <p className="text-gray-700 mb-3">
                      Send an email or message to your customer list explaining the price change. Focus on value, quality, and the experience. Be confident, not apologetic.
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      Time required: 1 hour
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-rose-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Day 6: Practice Your Response</h3>
                    <p className="text-gray-700 mb-3">
                      Write out responses to common objections: &quot;That&apos;s too expensive,&quot; &quot;I can get it cheaper elsewhere,&quot; &quot;Why did prices go up?&quot; Practice saying them out loud until you&apos;re confident.
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      Time required: 30 minutes
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-green-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    7
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Day 7: Launch New Prices</h3>
                    <p className="text-gray-700 mb-3">
                      Go live with your new pricing. Post on social media. Update your booking system. Quote new customers at the new rate. Don&apos;t look back.
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      Time required: 1 hour
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">What to Expect</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• Some customers will complain. That&apos;s normal. Stay firm.</li>
                <li>• Some customers will leave. That&apos;s okay. They weren&apos;t profitable anyway.</li>
                <li>• New customers won&apos;t bat an eye at your prices. They have no reference point.</li>
                <li>• Your income will increase even if you get fewer orders.</li>
                <li>• You&apos;ll have more time because you&apos;re working less for more money.</li>
                <li>• You&apos;ll feel like a real business owner, not a charity.</li>
              </ul>
            </div>
          </section>

          {/* Section 9: FAQ */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if I lose all my customers when I raise prices?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> You won&apos;t lose ALL your customers. You&apos;ll lose the price-sensitive ones who were never going to make your business profitable. The customers who value quality and your expertise will stay. And new customers who find you at the higher price won&apos;t know any different. Remember: it&apos;s better to make 5 cakes at $400 ($2,000) than 10 cakes at $150 ($1,500).
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How do I know if my prices are too high?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> If you&apos;re booking 80-100% of inquiries, your prices might be too low. If you&apos;re booking 10-20%, they might be too high. The sweet spot is 40-60% conversion rate. Also, if you&apos;re fully booked 3+ months out, you&apos;re definitely underpriced.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Should I charge more for wedding cakes than birthday cakes?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Absolutely. Wedding cakes require more consultation time, have higher stakes (no room for error), often need delivery and setup, and customers expect perfection. Charge 20-50% more for wedding cakes than similar-sized birthday cakes. The stress premium is real.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How often should I update my prices?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Review your costs quarterly (every 3 months). If ingredient costs have increased by 10% or more, update your prices. At minimum, increase prices annually to account for inflation and your growing expertise. Never go more than a year without reviewing pricing.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if my competitor charges half what I do?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Let them. They&apos;re either losing money, using inferior ingredients, working for free, or have lower costs than you. You&apos;re not competing on price—you&apos;re competing on quality, service, and expertise. Position yourself as the premium option and attract customers who value those things.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Can I really charge $400 for a cake?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Yes. Custom cakes in major cities regularly sell for $400-800. Even in smaller markets, $300-500 is normal for quality custom work. The question isn&apos;t &quot;Can I charge this?&quot; It&apos;s &quot;Am I confident enough to charge what I&apos;m worth?&quot; If your costs are $240 and you want a 40% margin, $400 is the RIGHT price, not a high price.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if someone asks for a discount?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Say no. Politely but firmly. &quot;I appreciate you thinking of me, but my prices reflect the quality ingredients, time, and expertise that go into every cake. I don&apos;t offer discounts because I&apos;m already pricing fairly for the value you receive.&quot; If they push back, they&apos;re not your customer.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Ready to Stop Losing Money?</h2>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              BakeProfit helps you track every cost, calculate profitable prices, and manage your bakery business like a pro. Join thousands of bakers who&apos;ve transformed their hobby into a real, profitable business.
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
              <Link href="/blog/how-to-start-home-bakery" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Start a Home Bakery</h4>
                <p className="text-gray-600 text-sm">Complete guide to starting a profitable home bakery with legal requirements and pricing strategies.</p>
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
