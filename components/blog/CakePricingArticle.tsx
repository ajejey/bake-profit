'use client'

import Link from 'next/link'
import { ChefHat, Calculator, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function CakePricingArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      {/* <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-rose-500" />
              <span className="text-xl font-bold">BakeProfit</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-rose-600">Blog</Link>
              <Link href="/tools" className="text-sm font-medium text-gray-700 hover:text-rose-600">Tools</Link>
              <Link href="/bakery-business-tool">
                <Button className="bg-rose-500 hover:bg-rose-600">Sign Up Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </header> */}

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → How to Price Cakes
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Cake Pricing Formula: How to Price Cakes for Profit (2025)
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Jan 15, 2025</span> • <span>14 min read</span> • <span className="text-rose-600 font-semibold">Cake Pricing</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <p className="text-xl text-gray-700">
            You just spent 6 hours making a beautiful custom cake. The customer asks, &quot;How much?&quot; You panic, think about what feels right, and say $45. They happily pay. Later, you calculate your costs and realize you made $3 profit. That&apos;s $0.50 per hour.
          </p>

          <p className="text-lg text-gray-700">
            Sound familiar? You&apos;re not alone. Pricing cakes is one of the hardest parts of running a cake business. But here&apos;s the truth: there&apos;s a proven formula that professional cake decorators use to price profitably every single time.
          </p>

          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Calculator className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Price Your Cake in 3 Minutes</h3>
                  <p className="mb-4">Use our free Cake Pricing Calculator. Enter your costs, complexity, and get your price instantly.</p>
                  <Link href="/tools/cake-pricing-calculator">
                    <Button className="bg-rose-500 hover:bg-rose-600">Use Free Calculator →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li><a href="#why-hard" className="hover:text-rose-600">Why Pricing Cakes is So Hard</a></li>
              <li><a href="#formula" className="hover:text-rose-600">The Cake Pricing Formula</a></li>
              <li><a href="#base-cost" className="hover:text-rose-600">Calculating Base Costs</a></li>
              <li><a href="#complexity" className="hover:text-rose-600">Pricing for Complexity</a></li>
              <li><a href="#tiers" className="hover:text-rose-600">Tier Multipliers</a></li>
              <li><a href="#delivery" className="hover:text-rose-600">Delivery & Setup Fees</a></li>
              <li><a href="#examples" className="hover:text-rose-600">Real Pricing Examples</a></li>
              <li><a href="#mistakes" className="hover:text-rose-600">Common Pricing Mistakes</a></li>
              <li><a href="#tips" className="hover:text-rose-600">Advanced Pricing Strategies</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          <section id="why-hard">
            <h2 className="text-3xl font-bold mb-4">Why Pricing Cakes is So Hard</h2>
            <p className="text-lg text-gray-700 mb-4">
              Pricing cakes is harder than pricing cookies or cupcakes because every cake is different. A simple buttercream cake takes 2 hours. A fondant wedding cake with sugar flowers takes 20 hours. How do you price both fairly?
            </p>
            <p className="text-gray-700 mb-4">
              Plus, there&apos;s the emotional component. You pour your heart into each cake. It feels wrong to charge what it&apos;s actually worth. You worry customers will think you&apos;re expensive. So you undercharge, work for pennies, and burn out.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💔 The Reality of Underpricing:</p>
              <p className="text-gray-700 mb-3">
                Jessica charged $75 for a 3-tier wedding cake that took her 12 hours to make. After calculating costs:
              </p>
              <ul className="space-y-1 text-gray-700 ml-6 mb-3">
                <li>• Ingredients: $45</li>
                <li>• Labor (12 hrs × $25): $300</li>
                <li>• Overhead: $9</li>
                <li>• Total cost: $354</li>
              </ul>
              <p className="text-gray-700 font-semibold">
                She LOST $279 on that cake. She essentially paid the customer $279 to take her cake.
              </p>
            </div>

            <p className="text-gray-700 mt-6">
              This guide will show you exactly how to price cakes so you never lose money again. You&apos;ll learn the formula, see real examples, and gain the confidence to charge what you&apos;re worth.
            </p>
          </section>

          <section id="formula">
            <h2 className="text-3xl font-bold mb-4">The Cake Pricing Formula</h2>
            <p className="text-lg text-gray-700 mb-4">
              Here&apos;s the complete formula professional cake decorators use. It accounts for everything: ingredients, time, complexity, tiers, and delivery.
            </p>

            <div className="bg-gray-900 text-white p-6 rounded-lg font-mono mb-6">
              <div className="space-y-3">
                <div><strong className="text-rose-400">Base Cost =</strong></div>
                <div className="pl-4">Ingredients + Labor + Overhead</div>
                <div className="mt-4"><strong className="text-blue-400">Complexity Multiplier =</strong></div>
                <div className="pl-4">1.0 (simple) to 2.5 (intricate)</div>
                <div className="mt-4"><strong className="text-purple-400">Tier Multiplier =</strong></div>
                <div className="pl-4">1.0 (single) to 1.5 (3+ tiers)</div>
                <div className="mt-4 pt-4 border-t border-gray-700"><strong className="text-green-400">Final Price =</strong></div>
                <div className="pl-4">(Base Cost × Complexity × Tiers) + Delivery</div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              Don&apos;t worry if this looks complicated. We&apos;ll break down each component with real examples. By the end, you&apos;ll be able to price any cake confidently.
            </p>
          </section>

          <section id="base-cost">
            <h2 className="text-3xl font-bold mb-4">Step 1: Calculate Base Costs</h2>
            <p className="text-lg text-gray-700 mb-4">
              This is your foundation. If you get this wrong, everything else falls apart. Your base cost includes three things:
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Ingredients</h3>
            <p className="text-gray-700 mb-4">
              Calculate the cost of EVERY ingredient: cake layers, filling, frosting, fondant, decorations. Don&apos;t forget the small stuff like food coloring, vanilla extract, or edible glitter.
            </p>

            <div className="bg-gray-50 border rounded-lg p-6 mb-6">
              <p className="font-semibold mb-4">Example: 8-inch Round Cake (2 layers)</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-2">Item</th>
                    <th className="text-right py-2">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="py-2">Cake ingredients</td><td className="text-right font-semibold">$8.50</td></tr>
                  <tr className="border-b"><td className="py-2">Buttercream frosting</td><td className="text-right font-semibold">$6.00</td></tr>
                  <tr className="border-b"><td className="py-2">Filling</td><td className="text-right font-semibold">$3.50</td></tr>
                  <tr className="border-b"><td className="py-2">Decorations</td><td className="text-right font-semibold">$4.00</td></tr>
                  <tr className="border-b"><td className="py-2">Cake board & box</td><td className="text-right font-semibold">$2.50</td></tr>
                  <tr className="bg-green-50"><td className="py-3 font-bold">Total Ingredients:</td><td className="text-right py-3 font-bold text-green-600">$24.50</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-700">
                Use our <Link href="/tools/recipe-cost-calculator" className="text-rose-600 hover:underline font-semibold">Recipe Cost Calculator</Link> to calculate exact ingredient costs. It handles all the conversions and math for you!
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Labor</h3>
            <p className="text-gray-700 mb-4">
              Track EVERY minute you spend on the cake. Most decorators forget about these tasks:
            </p>
            <ul className="space-y-2 mb-4 ml-6 text-gray-700">
              <li>• Customer consultation and order details</li>
              <li>• Shopping for special ingredients</li>
              <li>• Baking the cake layers</li>
              <li>• Making frosting and filling</li>
              <li>• Leveling, filling, and crumb coating</li>
              <li>• Final frosting and smoothing</li>
              <li>• Decorating (this is where most time goes!)</li>
              <li>• Cleanup</li>
              <li>• Packaging</li>
            </ul>

            <div className="bg-gray-50 border rounded-lg p-6 mb-6">
              <p className="font-semibold mb-4">Time Breakdown: 8-inch Round Cake</p>
              <ul className="space-y-2 mb-4">
                <li>• Baking: 1.5 hours</li>
                <li>• Frosting & assembly: 1 hour</li>
                <li>• Decorating: 2 hours</li>
                <li>• Cleanup & packaging: 0.5 hours</li>
                <li className="font-semibold pt-2 border-t">• Total: 5 hours</li>
              </ul>
              <p className="mb-2">At $30/hour: 5 hours × $30 = <strong className="text-rose-600">$150 labor</strong></p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Overhead</h3>
            <p className="text-gray-700 mb-4">
              Add 15-20% of ingredient costs for utilities, equipment wear, insurance, etc.
            </p>
            <div className="bg-gray-50 border rounded-lg p-6">
              <p>$24.50 ingredients × 20% = <strong className="text-rose-600">$4.90 overhead</strong></p>
              <p className="mt-4 pt-4 border-t font-semibold">
                <strong>Base Cost Total:</strong> $24.50 + $150 + $4.90 = <strong className="text-rose-600">$179.40</strong>
              </p>
            </div>
          </section>

          <section id="complexity">
            <h2 className="text-3xl font-bold mb-4">Step 2: Apply Complexity Multiplier</h2>
            <p className="text-lg text-gray-700 mb-4">
              Not all cakes are equal. A simple buttercream cake is easier than a fondant cake with hand-painted details. The complexity multiplier accounts for skill level and difficulty.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <p className="text-green-600 font-bold text-lg mb-2">Simple</p>
                <p className="text-2xl font-bold mb-3">1.0-1.2x</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Buttercream frosting</li>
                  <li>• Basic piping</li>
                  <li>• Simple decorations</li>
                  <li>• No fondant</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                <p className="text-yellow-600 font-bold text-lg mb-2">Moderate</p>
                <p className="text-2xl font-bold mb-3">1.3-1.7x</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Fondant covering</li>
                  <li>• Detailed piping</li>
                  <li>• Edible images</li>
                  <li>• Multiple colors</li>
                </ul>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <p className="text-red-600 font-bold text-lg mb-2">Intricate</p>
                <p className="text-2xl font-bold mb-3">1.8-2.5x</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Sugar flowers</li>
                  <li>• Hand-painting</li>
                  <li>• Sculpted cakes</li>
                  <li>• Intricate details</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              For our example (simple buttercream with basic decorations), we&apos;ll use <strong>1.2x</strong>:
            </p>
            <div className="bg-gray-50 border rounded-lg p-6">
              <p>$179.40 × 1.2 = <strong className="text-rose-600">$215.28</strong></p>
            </div>
          </section>

          <section id="tiers">
            <h2 className="text-3xl font-bold mb-4">Step 3: Apply Tier Multiplier</h2>
            <p className="text-lg text-gray-700 mb-4">
              Multi-tier cakes require structural support, precise stacking, and extra time. They&apos;re more complex than just making multiple single-tier cakes.
            </p>

            <div className="bg-gray-50 border rounded-lg p-6 mb-6">
              <p className="font-semibold mb-3">Tier Multipliers:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Single tier:</strong> 1.0x (no multiplier)</li>
                <li>• <strong>2 tiers:</strong> 1.2x (requires dowels, stacking)</li>
                <li>• <strong>3 tiers:</strong> 1.4x (more complex structure)</li>
                <li>• <strong>4+ tiers:</strong> 1.5x (engineering required!)</li>
              </ul>
            </div>

            <p className="text-gray-700 mb-4">
              Our example is a single tier, so no additional multiplier (1.0x). Price remains <strong className="text-rose-600">$215.28</strong>.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">⚠️ Important:</p>
              <p className="text-gray-700">
                For multi-tier cakes, calculate the base cost for ALL tiers combined, then apply BOTH the complexity and tier multipliers. Don&apos;t calculate each tier separately!
              </p>
            </div>
          </section>

          <section id="delivery">
            <h2 className="text-3xl font-bold mb-4">Step 4: Add Delivery & Setup</h2>
            <p className="text-lg text-gray-700 mb-4">
              Delivery isn&apos;t free. You&apos;re using your time, gas, vehicle wear, and taking on liability. Always charge for delivery—it&apos;s a separate service.
            </p>

            <div className="bg-gray-50 border rounded-lg p-6 mb-6">
              <p className="font-semibold mb-3">Delivery Pricing Guide:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>0-10 miles:</strong> $15-25</li>
                <li>• <strong>10-20 miles:</strong> $25-40</li>
                <li>• <strong>20-30 miles:</strong> $40-60</li>
                <li>• <strong>30+ miles:</strong> $60+ or decline</li>
              </ul>
              <p className="mt-4 pt-4 border-t">
                <strong>Setup fee:</strong> Add $25-50 for multi-tier cakes that require on-site assembly
              </p>
            </div>

            <p className="text-gray-700 mb-4">
              For our example, let&apos;s add $20 delivery (10 miles):
            </p>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <p className="text-xl font-bold mb-4">Final Price Calculation:</p>
              <div className="space-y-2">
                <div className="flex justify-between pb-2 border-b"><span>Base cost:</span><span className="font-semibold">$179.40</span></div>
                <div className="flex justify-between pb-2 border-b"><span>× Complexity (1.2):</span><span className="font-semibold">$215.28</span></div>
                <div className="flex justify-between pb-2 border-b"><span>× Tiers (1.0):</span><span className="font-semibold">$215.28</span></div>
                <div className="flex justify-between pb-3 border-b-2"><span>+ Delivery:</span><span className="font-semibold">$20.00</span></div>
                <div className="flex justify-between text-2xl font-bold pt-2">
                  <span>Total Price:</span>
                  <span className="text-green-600">$235.28</span>
                </div>
              </div>
              <p className="mt-4 pt-4 border-t text-sm text-gray-700">
                Round to: <strong className="text-green-600 text-lg">$240</strong> (or $235 if you prefer)
              </p>
            </div>
          </section>

          <section id="examples">
            <h2 className="text-3xl font-bold mb-4">Real Pricing Examples</h2>
            <p className="text-lg text-gray-700 mb-6">
              Let&apos;s price three different cakes using the formula:
            </p>

            <div className="space-y-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Example 1: Simple Birthday Cake</h3>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• 8-inch round, buttercream, basic decorations</li>
                  <li>• Ingredients: $24.50</li>
                  <li>• Labor: 5 hours × $30 = $150</li>
                  <li>• Overhead: $4.90</li>
                  <li>• Base cost: $179.40</li>
                  <li>• Complexity: 1.2x = $215.28</li>
                  <li>• Tiers: 1.0x = $215.28</li>
                  <li>• Delivery: $20</li>
                </ul>
                <p className="text-xl font-bold text-blue-600">Final Price: $240</p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Example 2: Fondant Wedding Cake (2 tiers)</h3>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• 10-inch + 6-inch, fondant, detailed decorations</li>
                  <li>• Ingredients: $65</li>
                  <li>• Labor: 10 hours × $35 = $350</li>
                  <li>• Overhead: $13</li>
                  <li>• Base cost: $428</li>
                  <li>• Complexity: 1.5x = $642</li>
                  <li>• Tiers: 1.2x = $770.40</li>
                  <li>• Delivery + setup: $50</li>
                </ul>
                <p className="text-xl font-bold text-purple-600">Final Price: $820</p>
              </div>

              <div className="bg-rose-50 border-2 border-rose-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Example 3: Intricate 3-Tier Wedding Cake</h3>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• 12-inch + 9-inch + 6-inch, fondant, sugar flowers</li>
                  <li>• Ingredients: $120</li>
                  <li>• Labor: 20 hours × $40 = $800</li>
                  <li>• Overhead: $24</li>
                  <li>• Base cost: $944</li>
                  <li>• Complexity: 2.2x = $2,076.80</li>
                  <li>• Tiers: 1.4x = $2,907.52</li>
                  <li>• Delivery + setup: $75</li>
                </ul>
                <p className="text-xl font-bold text-rose-600">Final Price: $2,985 (round to $3,000)</p>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mt-6">
              <p className="text-gray-800 font-semibold mb-2">✅ See the Pattern?</p>
              <p className="text-gray-700">
                Simple cakes: $200-300. Moderate cakes: $400-800. Intricate wedding cakes: $1,500-3,000+. These prices ensure you&apos;re profitable and reflect the skill required.
              </p>
            </div>
          </section>

          <section id="mistakes">
            <h2 className="text-3xl font-bold mb-4">Common Cake Pricing Mistakes</h2>
            <p className="text-lg text-gray-700 mb-6">
              Even experienced cake decorators make these pricing mistakes. Avoid them to protect your profits:
            </p>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Pricing Based on &quot;What Feels Right&quot;</h3>
                <p className="text-gray-700 mb-3">
                  You look at the cake and think, &quot;This seems like a $50 cake.&quot; But feelings don&apos;t pay bills. You might feel guilty charging $300, but if that&apos;s what the math says, that&apos;s what you charge.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Always use the formula. Calculate first, then adjust slightly if needed for market positioning—but never below cost.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Forgetting to Track Consultation Time</h3>
                <p className="text-gray-700 mb-3">
                  That 2-hour consultation where you discussed flavors, showed photos, and created a custom design? That&apos;s labor. The 30 minutes of back-and-forth emails? Labor. The time you spent shopping for special decorations? Labor.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Track ALL time from first contact to final delivery. Include it in your labor calculation.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Not Charging Enough for Skill</h3>
                <p className="text-gray-700 mb-3">
                  You spent years learning to make perfect sugar flowers. That skill is VALUABLE. Don&apos;t charge the same for a cake with sugar flowers as you do for a simple buttercream cake.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Use higher complexity multipliers (2.0-2.5x) for advanced techniques. Charge $40-50/hour for expert-level work.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">4. Giving &quot;Friend & Family&quot; Discounts</h3>
                <p className="text-gray-700 mb-3">
                  Your sister wants a wedding cake. You charge her $200 when it should be $800. Now you&apos;ve worked 15 hours for $13/hour, and you&apos;re resentful. Plus, she tells her friends you charge $200 for wedding cakes.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Charge full price, or give them a cake as a gift. Don&apos;t do discounted work—it devalues your business and creates bad precedents.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">5. Not Requiring Deposits</h3>
                <p className="text-gray-700 mb-3">
                  You make a $500 cake. The customer cancels last minute or doesn&apos;t show up. You&apos;re out $500 in costs and 12 hours of work. This is devastating.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Always require 50% non-refundable deposit when booking. This covers your costs if they cancel and ensures they&apos;re serious.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">6. Underestimating Time</h3>
                <p className="text-gray-700 mb-3">
                  You think a cake will take 4 hours. It takes 7. You quoted based on 4 hours, so you just lost 3 hours of pay. This happens constantly with intricate designs.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Track your time on similar cakes. Add 20-30% buffer for unexpected issues. Better to finish early than lose money.
                </p>
              </div>
            </div>
          </section>

          <section id="tips">
            <h2 className="text-3xl font-bold mb-4">Advanced Pricing Strategies</h2>
            <p className="text-lg text-gray-700 mb-6">
              Once you&apos;ve mastered the formula, use these strategies to maximize profitability:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tiered Pricing Menu</h3>
                <p className="text-gray-700 mb-3">
                  Create a pricing menu with three tiers: Good, Better, Best. This gives customers options and anchors them to higher prices.
                </p>
                <ul className="space-y-2 text-gray-700 ml-6 mb-3">
                  <li>• <strong>Good:</strong> Buttercream, simple decorations ($3-4 per serving)</li>
                  <li>• <strong>Better:</strong> Fondant, moderate decorations ($5-7 per serving)</li>
                  <li>• <strong>Best:</strong> Premium fondant, intricate details ($8-12 per serving)</li>
                </ul>
                <p className="text-gray-700 font-semibold">
                  Most customers choose &quot;Better.&quot; Some choose &quot;Best.&quot; Few choose &quot;Good.&quot; You make more per cake.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Rush Order Fees</h3>
                <p className="text-gray-700 mb-3">
                  Customer needs a cake in 3 days instead of your usual 2-week lead time? That&apos;s a rush order. You&apos;re rearranging your schedule, working late, and stressing.
                </p>
                <p className="text-gray-700 font-semibold">
                  Charge 25-50% rush fee for orders under 1 week. 50-100% for orders under 3 days. Your time is valuable.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Seasonal Pricing</h3>
                <p className="text-gray-700 mb-3">
                  Wedding season (May-October) is your busiest time. You&apos;re turning away orders. That&apos;s the perfect time to raise prices.
                </p>
                <p className="text-gray-700 font-semibold">
                  Charge 10-20% more during peak season. Lower prices slightly in slow months (January-February) to attract business.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Minimum Order Amounts</h3>
                <p className="text-gray-700 mb-3">
                  Small orders aren&apos;t worth your time. A 6-inch cake takes almost as long as an 8-inch cake, but you charge less.
                </p>
                <p className="text-gray-700 font-semibold">
                  Set a minimum order of $150-200. This ensures every order is worth your time and filters out price shoppers.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Value-Based Pricing for Weddings</h3>
                <p className="text-gray-700 mb-3">
                  A wedding cake isn&apos;t just dessert—it&apos;s a centerpiece, a photo opportunity, a memory. Couples spend $30,000+ on weddings. A $1,500 cake is 5% of their budget.
                </p>
                <p className="text-gray-700 font-semibold">
                  Don&apos;t be afraid to charge premium prices for wedding cakes. They&apos;re willing to pay for quality and peace of mind.
                </p>
              </div>
            </div>
          </section>

          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How much should I charge per serving?</h3>
                <p className="text-gray-700 mb-3">
                  Per-serving pricing is common but can be misleading. A 100-serving sheet cake is easier than a 50-serving 3-tier cake. Use the formula instead.
                </p>
                <p className="text-gray-700">
                  <strong>General guidelines:</strong> Simple cakes: $3-5/serving. Moderate: $5-8/serving. Intricate: $8-15/serving. But always calculate actual costs first!
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What if my prices are higher than competitors?</h3>
                <p className="text-gray-700 mb-3">
                  Good! That means you&apos;re pricing correctly and they&apos;re underpricing. You&apos;re not competing on price—you&apos;re competing on quality, service, and reliability.
                </p>
                <p className="text-gray-700">
                  <strong>Strategy:</strong> Emphasize your unique value. Show your process, share testimonials, post beautiful photos. Customers who value quality will pay your prices.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Should I show prices on my website?</h3>
                <p className="text-gray-700 mb-3">
                  Show starting prices or price ranges, not exact prices. Every cake is custom, so exact pricing is impossible.
                </p>
                <p className="text-gray-700">
                  <strong>Example:</strong> &quot;Custom cakes start at $250. Wedding cakes start at $800. Contact us for a personalized quote.&quot; This filters out budget shoppers while attracting serious customers.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How do I handle price objections?</h3>
                <p className="text-gray-700 mb-3">
                  When someone says &quot;That&apos;s expensive,&quot; they&apos;re really saying &quot;I don&apos;t understand the value.&quot; Educate them.
                </p>
                <p className="text-gray-700">
                  <strong>Response:</strong> &quot;I understand! Let me break down what goes into this cake: 8 hours of work, premium ingredients, custom design, delivery, and setup. I also include a tasting and unlimited design revisions. Would you like to see some photos of similar cakes I&apos;ve done?&quot;
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Can I offer payment plans?</h3>
                <p className="text-gray-700 mb-3">
                  Yes, but protect yourself. For large orders ($500+), you can split payments: 50% deposit at booking, 25% two weeks before, 25% at delivery.
                </p>
                <p className="text-gray-700">
                  <strong>Important:</strong> Never deliver until fully paid. No exceptions. Too many decorators get burned by &quot;I&apos;ll pay you after the event.&quot;
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What about tasting fees?</h3>
                <p className="text-gray-700 mb-3">
                  Tastings cost you time and ingredients. Charge $25-50 for tastings, then credit it toward their order if they book.
                </p>
                <p className="text-gray-700">
                  <strong>Alternative:</strong> Offer free tastings only to customers who&apos;ve paid a deposit. This ensures they&apos;re serious and not just getting free cake.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How often should I raise prices?</h3>
                <p className="text-gray-700 mb-3">
                  Raise prices annually (2-5% for inflation) and whenever your costs increase significantly. Also raise prices when you&apos;re fully booked 3+ weeks out—that means demand exceeds supply.
                </p>
                <p className="text-gray-700">
                  <strong>Pro tip:</strong> Grandfather existing quotes for 30 days, but new quotes get new prices. This is fair and professional.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What if I make a mistake on the cake?</h3>
                <p className="text-gray-700 mb-3">
                  Build a 5-10% buffer into your pricing for mistakes and waste. If you mess up and need to remake something, you&apos;re covered.
                </p>
                <p className="text-gray-700">
                  <strong>For major mistakes:</strong> Remake it at your cost if it&apos;s your fault. But don&apos;t eat the cost of customer-caused issues (changed their mind, gave wrong info, etc.).
                </p>
              </div>
            </div>
          </section>

          <Card className="bg-rose-50 border-rose-200 mt-12">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <DollarSign className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready to Price Your Cakes?</h3>
                  <p className="mb-4">Use our free Cake Pricing Calculator. Enter your details and get your price instantly.</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/tools/cake-pricing-calculator">
                      <Button className="bg-rose-500 hover:bg-rose-600">Cake Pricing Calculator</Button>
                    </Link>
                    <Link href="/tools">
                      <Button variant="outline">All Free Tools</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>

      {/* Footer */}
      <Footer />
    </div>
  )
}
