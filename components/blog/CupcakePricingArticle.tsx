'use client'

import Link from 'next/link'
import { ChefHat, Calculator, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function CupcakePricingArticle() {
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
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → How to Price Cupcakes
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          How to Price Cupcakes: Complete Pricing Guide for Bakers (2025)
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Jan 15, 2025</span> • <span>15 min read</span> • <span className="text-rose-600 font-semibold">Cupcake Pricing</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <p className="text-xl text-gray-700">
            You bake a dozen gorgeous cupcakes. They&apos;re perfectly moist, beautifully decorated, and taste amazing. A customer asks, &quot;How much?&quot; You panic and blurt out, &quot;$18?&quot; They buy them. Later, you realize you spent $12 on ingredients and 2 hours making them. You just worked for $3/hour.
          </p>

          <p className="text-lg text-gray-700">
            Pricing cupcakes is tricky. Too low, and you&apos;re working for pennies. Too high, and customers complain. But there&apos;s a sweet spot where you&apos;re profitable AND customers happily pay.
          </p>

          <p className="text-lg text-gray-700">
            This guide shows you exactly how to price cupcakes profitably. You&apos;ll learn the formula, see real examples, understand what factors affect pricing, and gain the confidence to charge what you&apos;re worth.
          </p>

          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Calculator className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Price Your Cupcakes in 2 Minutes</h3>
                  <p className="mb-4">Use our free Cupcake Pricing Calculator. Enter your costs and get your price instantly.</p>
                  <Link href="/tools/cupcake-pricing-calculator">
                    <Button className="bg-rose-500 hover:bg-rose-600">Use Free Calculator →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li><a href="#quick-answer" className="hover:text-rose-600">Quick Answer: What Should I Charge?</a></li>
              <li><a href="#formula" className="hover:text-rose-600">The Cupcake Pricing Formula</a></li>
              <li><a href="#ingredients" className="hover:text-rose-600">Calculating Ingredient Costs</a></li>
              <li><a href="#labor" className="hover:text-rose-600">Pricing Your Time</a></li>
              <li><a href="#factors" className="hover:text-rose-600">Factors That Affect Pricing</a></li>
              <li><a href="#examples" className="hover:text-rose-600">Real Pricing Examples</a></li>
              <li><a href="#specialty" className="hover:text-rose-600">Specialty Cupcake Pricing</a></li>
              <li><a href="#mistakes" className="hover:text-rose-600">Common Pricing Mistakes</a></li>
              <li><a href="#tips" className="hover:text-rose-600">Advanced Pricing Strategies</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          <section id="quick-answer">
            <h2 className="text-3xl font-bold mb-4">Quick Answer: What Should I Charge?</h2>
            <p className="text-lg text-gray-700 mb-4">
              If you just need a quick answer, here are typical cupcake prices in 2025:
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <p className="text-blue-600 font-bold text-lg mb-2">Simple</p>
                <p className="text-3xl font-bold mb-3">$3-4</p>
                <p className="text-sm text-gray-700">Basic buttercream, simple decoration, standard flavors</p>
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
                <p className="text-purple-600 font-bold text-lg mb-2">Standard</p>
                <p className="text-3xl font-bold mb-3">$4-6</p>
                <p className="text-sm text-gray-700">Piped frosting, sprinkles, premium flavors, nice presentation</p>
              </div>
              <div className="bg-rose-50 border-2 border-rose-200 rounded-lg p-6">
                <p className="text-rose-600 font-bold text-lg mb-2">Premium</p>
                <p className="text-3xl font-bold mb-3">$6-10+</p>
                <p className="text-sm text-gray-700">Custom designs, fondant toppers, gourmet flavors, intricate work</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">⚠️ Important:</p>
              <p className="text-gray-700">
                These are GENERAL ranges. Your actual price depends on your costs, location, skill level, and target market. Don&apos;t just copy these numbers—calculate YOUR costs first! Keep reading to learn how.
              </p>
            </div>
          </section>

          <section id="formula">
            <h2 className="text-3xl font-bold mb-4">The Cupcake Pricing Formula</h2>
            <p className="text-lg text-gray-700 mb-4">
              Here&apos;s the exact formula professional bakers use. It&apos;s simple, but most home bakers skip steps and end up underpricing.
            </p>

            <div className="bg-gray-900 text-white p-6 rounded-lg font-mono mb-6">
              <div className="space-y-3">
                <div><strong className="text-rose-400">Step 1: Calculate Cost Per Cupcake</strong></div>
                <div className="pl-4">= (Ingredients + Packaging) ÷ Quantity</div>
                <div className="mt-4"><strong className="text-blue-400">Step 2: Add Labor Cost</strong></div>
                <div className="pl-4">= (Total Time × Hourly Rate) ÷ Quantity</div>
                <div className="mt-4"><strong className="text-purple-400">Step 3: Add Overhead</strong></div>
                <div className="pl-4">= Cost × 15-20%</div>
                <div className="mt-4 pt-4 border-t border-gray-700"><strong className="text-green-400">Step 4: Add Profit Margin</strong></div>
                <div className="pl-4">= Total Cost ÷ (1 - Profit %)</div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              Don&apos;t worry if this looks complicated. We&apos;ll walk through each step with a real example. By the end, you&apos;ll be able to price any cupcake confidently.
            </p>
          </section>

          <section id="ingredients">
            <h2 className="text-3xl font-bold mb-4">Step 1: Calculate Ingredient Costs</h2>
            <p className="text-lg text-gray-700 mb-4">
              This is your foundation. Get this wrong, and everything else falls apart. You need to know the cost of EVERY ingredient, including the ones that seem insignificant.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Example: Vanilla Cupcakes (12 cupcakes)</h3>
            <div className="bg-gray-50 border rounded-lg p-6 mb-6">
              <p className="font-semibold mb-4">Ingredient Breakdown:</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-2">Ingredient</th>
                    <th className="text-right py-2">Amount</th>
                    <th className="text-right py-2">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="py-2">Flour</td><td className="text-right">1.5 cups</td><td className="text-right font-semibold">$1.05</td></tr>
                  <tr className="border-b"><td className="py-2">Sugar</td><td className="text-right">1 cup</td><td className="text-right font-semibold">$0.50</td></tr>
                  <tr className="border-b"><td className="py-2">Butter</td><td className="text-right">0.5 cup</td><td className="text-right font-semibold">$1.25</td></tr>
                  <tr className="border-b"><td className="py-2">Eggs</td><td className="text-right">2 large</td><td className="text-right font-semibold">$0.60</td></tr>
                  <tr className="border-b"><td className="py-2">Milk</td><td className="text-right">0.5 cup</td><td className="text-right font-semibold">$0.25</td></tr>
                  <tr className="border-b"><td className="py-2">Vanilla extract</td><td className="text-right">1 tsp</td><td className="text-right font-semibold">$0.40</td></tr>
                  <tr className="border-b"><td className="py-2">Baking powder</td><td className="text-right">1.5 tsp</td><td className="text-right font-semibold">$0.10</td></tr>
                  <tr className="border-b"><td className="py-2">Salt</td><td className="text-right">0.5 tsp</td><td className="text-right font-semibold">$0.02</td></tr>
                  <tr className="border-b-2 font-semibold"><td className="py-2" colSpan={2}>Cake Total:</td><td className="text-right">$4.17</td></tr>
                  <tr className="border-b"><td className="py-2">Buttercream frosting</td><td className="text-right">2 cups</td><td className="text-right font-semibold">$3.50</td></tr>
                  <tr className="border-b"><td className="py-2">Sprinkles/decorations</td><td className="text-right">-</td><td className="text-right font-semibold">$0.75</td></tr>
                  <tr className="border-b"><td className="py-2">Cupcake liners</td><td className="text-right">12 liners</td><td className="text-right font-semibold">$0.36</td></tr>
                  <tr className="border-b"><td className="py-2">Packaging (box)</td><td className="text-right">1 box</td><td className="text-right font-semibold">$1.50</td></tr>
                  <tr className="bg-green-50"><td className="py-3 font-bold" colSpan={2}>Total Cost (12 cupcakes):</td><td className="text-right py-3 font-bold text-green-600">$10.28</td></tr>
                  <tr className="bg-blue-50"><td className="py-3 font-bold" colSpan={2}>Cost Per Cupcake:</td><td className="text-right py-3 font-bold text-blue-600">$0.86</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-700">
                Use our <Link href="/tools/ingredient-cost-calculator" className="text-rose-600 hover:underline font-semibold">Ingredient Cost Calculator</Link> to calculate exact costs. It handles all unit conversions (cups to ounces, grams to pounds) automatically!
              </p>
            </div>
          </section>

          <section id="labor">
            <h2 className="text-3xl font-bold mb-4">Step 2: Calculate Labor Costs</h2>
            <p className="text-lg text-gray-700 mb-4">
              This is where most bakers lose money. They forget to pay themselves, or they drastically underestimate how long cupcakes actually take.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Track EVERY Minute</h3>
            <p className="text-gray-700 mb-4">
              Don&apos;t just count &quot;baking time.&quot; Count everything:
            </p>
            <ul className="space-y-2 mb-6 ml-6 text-gray-700">
              <li>• Gathering ingredients and prepping workspace</li>
              <li>• Mixing batter</li>
              <li>• Filling cupcake liners</li>
              <li>• Baking time (you&apos;re monitoring, rotating pans)</li>
              <li>• Cooling time (you&apos;re waiting, can&apos;t start another batch)</li>
              <li>• Making frosting</li>
              <li>• Frosting each cupcake</li>
              <li>• Adding decorations</li>
              <li>• Packaging</li>
              <li>• Cleanup (this takes longer than you think!)</li>
            </ul>

            <div className="bg-gray-50 border rounded-lg p-6 mb-6">
              <p className="font-semibold mb-4">Time Breakdown: 12 Vanilla Cupcakes</p>
              <ul className="space-y-2 mb-4">
                <li>• Prep & mixing: 15 min</li>
                <li>• Baking & cooling: 35 min</li>
                <li>• Making frosting: 10 min</li>
                <li>• Frosting cupcakes: 20 min</li>
                <li>• Decorating: 15 min</li>
                <li>• Packaging & cleanup: 15 min</li>
                <li className="font-semibold pt-2 border-t">• Total: 110 minutes = 1.83 hours</li>
              </ul>
              <p className="mb-2">At $25/hour: 1.83 hours × $25 = <strong className="text-rose-600">$45.75 total labor</strong></p>
              <p>Per cupcake: $45.75 ÷ 12 = <strong className="text-rose-600">$3.81 per cupcake</strong></p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">What Hourly Rate Should You Use?</h3>
            <ul className="space-y-2 mb-6 ml-6 text-gray-700">
              <li>• <strong>Beginner:</strong> $20-25/hour (still learning, slower)</li>
              <li>• <strong>Experienced:</strong> $25-35/hour (efficient, consistent quality)</li>
              <li>• <strong>Expert/Custom:</strong> $35-50/hour (intricate designs, specialty flavors)</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">⚠️ Reality Check:</p>
              <p className="text-gray-700">
                Notice that labor ($3.81) costs MORE than ingredients ($0.86)? This is normal! Your time is your most valuable resource. If you&apos;re not including labor costs, you&apos;re working for free.
              </p>
            </div>
          </section>

          <section id="factors">
            <h2 className="text-3xl font-bold mb-4">Factors That Affect Cupcake Pricing</h2>
            <p className="text-lg text-gray-700 mb-4">
              Not all cupcakes are created equal. Here&apos;s what affects pricing:
            </p>

            <div className="space-y-6">
              <div className="bg-gray-50 border rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Decoration Complexity</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Simple ($3-4):</strong> Swirl of frosting, sprinkles</li>
                  <li>• <strong>Moderate ($4-6):</strong> Piped rosettes, multiple colors, edible pearls</li>
                  <li>• <strong>Complex ($6-10):</strong> Fondant toppers, hand-piped flowers, custom designs</li>
                </ul>
              </div>

              <div className="bg-gray-50 border rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Flavor & Ingredients</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Standard:</strong> Vanilla, chocolate, strawberry (base price)</li>
                  <li>• <strong>Premium (+$0.50-1):</strong> Red velvet, lemon, caramel</li>
                  <li>• <strong>Gourmet (+$1-2):</strong> Salted caramel, champagne, specialty fillings</li>
                </ul>
              </div>

              <div className="bg-gray-50 border rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Order Size</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Small orders (6-12):</strong> Full price (more work per cupcake)</li>
                  <li>• <strong>Medium orders (24-48):</strong> 5-10% discount (batch efficiency)</li>
                  <li>• <strong>Large orders (72+):</strong> 10-15% discount (significant efficiency)</li>
                </ul>
              </div>

              <div className="bg-gray-50 border rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Customization</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Standard menu items:</strong> Base price</li>
                  <li>• <strong>Custom colors/themes:</strong> +$0.50-1 per cupcake</li>
                  <li>• <strong>Edible images:</strong> +$1-2 per cupcake</li>
                  <li>• <strong>Dietary restrictions:</strong> +$1-2 (gluten-free, vegan ingredients cost more)</li>
                </ul>
              </div>

              <div className="bg-gray-50 border rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">5. Location & Market</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Rural/small town:</strong> $2.50-4 per cupcake</li>
                  <li>• <strong>Suburban:</strong> $3-5 per cupcake</li>
                  <li>• <strong>Urban/metro:</strong> $4-7 per cupcake</li>
                  <li>• <strong>High-end urban:</strong> $6-12 per cupcake</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="examples">
            <h2 className="text-3xl font-bold mb-4">Real Pricing Examples</h2>
            <p className="text-lg text-gray-700 mb-6">
              Let&apos;s price three different cupcake scenarios using the complete formula:
            </p>

            <div className="space-y-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Example 1: Simple Vanilla Cupcakes (Dozen)</h3>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Ingredients: $10.28</li>
                  <li>• Labor: 1.83 hours × $25 = $45.75</li>
                  <li>• Overhead (20%): $2.06</li>
                  <li>• <strong>Total Cost:</strong> $58.09</li>
                  <li>• <strong>Cost per cupcake:</strong> $4.84</li>
                </ul>
                <p className="text-gray-700 mb-3">
                  <strong>With 50% profit margin:</strong> $4.84 ÷ 0.5 = $9.68 per cupcake
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Round to:</strong> <span className="text-blue-600 font-bold text-xl">$10 per cupcake</span> or <span className="text-blue-600 font-bold text-xl">$120 per dozen</span>
                </p>
                <p className="text-sm text-gray-600">
                  This seems high, but remember: you&apos;re paying yourself $25/hour AND making 50% profit. That&apos;s a sustainable business!
                </p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Example 2: Red Velvet with Cream Cheese Frosting (Dozen)</h3>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Ingredients: $14.50 (cocoa, food coloring, cream cheese)</li>
                  <li>• Labor: 2 hours × $30 = $60</li>
                  <li>• Overhead (20%): $2.90</li>
                  <li>• <strong>Total Cost:</strong> $77.40</li>
                  <li>• <strong>Cost per cupcake:</strong> $6.45</li>
                </ul>
                <p className="text-gray-700 mb-3">
                  <strong>With 50% profit margin:</strong> $6.45 ÷ 0.5 = $12.90 per cupcake
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Round to:</strong> <span className="text-purple-600 font-bold text-xl">$13 per cupcake</span> or <span className="text-purple-600 font-bold text-xl">$156 per dozen</span>
                </p>
              </div>

              <div className="bg-rose-50 border-2 border-rose-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Example 3: Custom Wedding Cupcakes with Fondant Toppers (24)</h3>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Ingredients: $32 (premium, fondant, edible gold)</li>
                  <li>• Labor: 5 hours × $40 = $200 (intricate work)</li>
                  <li>• Overhead (20%): $6.40</li>
                  <li>• <strong>Total Cost:</strong> $238.40</li>
                  <li>• <strong>Cost per cupcake:</strong> $9.93</li>
                </ul>
                <p className="text-gray-700 mb-3">
                  <strong>With 60% profit margin:</strong> $9.93 ÷ 0.4 = $24.83 per cupcake
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Round to:</strong> <span className="text-rose-600 font-bold text-xl">$25 per cupcake</span> or <span className="text-rose-600 font-bold text-xl">$600 for 24</span>
                </p>
                <p className="text-sm text-gray-600">
                  Wedding cupcakes command premium prices. Couples expect to pay more for custom, high-quality work.
                </p>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mt-6">
              <p className="text-gray-800 font-semibold mb-2">✅ Key Takeaway:</p>
              <p className="text-gray-700">
                Simple cupcakes: $8-12 each. Premium cupcakes: $12-18 each. Wedding/custom: $20-30+ each. These prices ensure you&apos;re profitable and reflect the skill and time required.
              </p>
            </div>
          </section>

          <section id="specialty">
            <h2 className="text-3xl font-bold mb-4">Specialty Cupcake Pricing</h2>
            <p className="text-lg text-gray-700 mb-6">
              Some cupcakes require special ingredients, techniques, or considerations. Here&apos;s how to price them:
            </p>

            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Gluten-Free Cupcakes</h3>
                <p className="text-gray-700 mb-3">
                  Gluten-free flour costs 2-3x more than regular flour. Plus, you need to prevent cross-contamination, which means extra cleanup time.
                </p>
                <p className="text-gray-700 font-semibold">
                  Pricing: Add $1-2 per cupcake to your base price. A $5 regular cupcake becomes $6-7 gluten-free.
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Vegan Cupcakes</h3>
                <p className="text-gray-700 mb-3">
                  Vegan butter, egg replacers, and non-dairy milk cost more. Plus, vegan recipes can be trickier to perfect.
                </p>
                <p className="text-gray-700 font-semibold">
                  Pricing: Add $1-2 per cupcake. Charge more if using premium ingredients like cashew cream frosting.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Filled Cupcakes</h3>
                <p className="text-gray-700 mb-3">
                  Filling cupcakes (ganache, jam, cream) adds ingredients, time, and skill. Each cupcake needs to be cored and filled individually.
                </p>
                <p className="text-gray-700 font-semibold">
                  Pricing: Add $0.50-1.50 per cupcake depending on filling complexity. Simple jam filling: +$0.50. Ganache or cream: +$1-1.50.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Mini Cupcakes</h3>
                <p className="text-gray-700 mb-3">
                  Mini cupcakes use less ingredients BUT take MORE time per unit. You&apos;re filling tiny liners, frosting tiny cakes, and decorating more pieces.
                </p>
                <p className="text-gray-700 font-semibold">
                  Pricing: Charge 40-50% of regular cupcake price. If regular cupcakes are $5, minis are $2-2.50. Don&apos;t go lower—your time is valuable!
                </p>
              </div>

              <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Jumbo/XL Cupcakes</h3>
                <p className="text-gray-700 mb-3">
                  Jumbo cupcakes use 2-3x the ingredients and take longer to bake. But they&apos;re impressive and customers love them.
                </p>
                <p className="text-gray-700 font-semibold">
                  Pricing: Charge 2-2.5x regular cupcake price. If regular cupcakes are $5, jumbos are $10-12.50.
                </p>
              </div>
            </div>
          </section>

          <section id="mistakes">
            <h2 className="text-3xl font-bold mb-4">Common Cupcake Pricing Mistakes</h2>
            <p className="text-lg text-gray-700 mb-6">
              Avoid these mistakes that cost bakers thousands in lost profits:
            </p>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Comparing to Grocery Store Prices</h3>
                <p className="text-gray-700 mb-3">
                  &quot;But Walmart sells cupcakes for $1 each!&quot; Yes, and they&apos;re mass-produced with cheap ingredients, preservatives, and no customization. You&apos;re not competing with Walmart.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Compare to other HOME bakers or boutique bakeries, not grocery stores. Your customers value quality, freshness, and customization.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Forgetting Small Costs</h3>
                <p className="text-gray-700 mb-3">
                  You calculate flour, sugar, eggs... but forget the vanilla extract, baking powder, salt, cupcake liners, and packaging. These &quot;small&quot; costs add up to $2-3 per dozen.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: List EVERY ingredient, no matter how small. Use our <Link href="/tools/recipe-cost-calculator" className="text-rose-600 hover:underline">Recipe Cost Calculator</Link> to ensure nothing is missed.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Not Charging for Decorating Time</h3>
                <p className="text-gray-700 mb-3">
                  You spend 30 minutes piping beautiful rosettes on 12 cupcakes. That&apos;s $12.50 in labor at $25/hour. If you don&apos;t include it, you just worked for free.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Time yourself decorating. Include every minute in your labor calculation. Intricate decorations justify higher prices.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">4. Giving &quot;Friend Discounts&quot;</h3>
                <p className="text-gray-700 mb-3">
                  Your friend wants cupcakes for her party. You charge $3 each instead of $5 because &quot;she&apos;s a friend.&quot; Now she tells everyone you charge $3. You&apos;ve devalued your business.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Charge friends full price, or give them cupcakes as a gift. Never do discounted work—it sets bad precedents.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">5. Not Having a Minimum Order</h3>
                <p className="text-gray-700 mb-3">
                  Someone orders 3 cupcakes. You spend 2 hours making a batch, frosting, decorating, packaging. You make $15. That&apos;s $7.50/hour. Not worth it.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Set a minimum order of 6-12 cupcakes. This ensures every order is worth your time and covers your fixed costs.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">6. Pricing Per Dozen Instead of Per Cupcake</h3>
                <p className="text-gray-700 mb-3">
                  You charge $36 per dozen. Customer wants 18 cupcakes. You charge $54 (1.5 dozen). But you should charge $5 each × 18 = $90. You just lost $36.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Always price per cupcake, then offer dozen pricing. Example: $5 each, or $55 per dozen (small discount for buying 12).
                </p>
              </div>
            </div>
          </section>

          <section id="tips">
            <h2 className="text-3xl font-bold mb-4">Advanced Cupcake Pricing Strategies</h2>
            <p className="text-lg text-gray-700 mb-6">
              Once you&apos;ve mastered basic pricing, use these strategies to maximize profits:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tiered Menu Pricing</h3>
                <p className="text-gray-700 mb-3">
                  Create three pricing tiers: Basic, Premium, Deluxe. Most customers choose Premium (the middle option).
                </p>
                <ul className="space-y-2 text-gray-700 ml-6 mb-3">
                  <li>• <strong>Basic ($4):</strong> Standard flavors, simple swirl frosting</li>
                  <li>• <strong>Premium ($6):</strong> Gourmet flavors, piped frosting, sprinkles</li>
                  <li>• <strong>Deluxe ($9):</strong> Custom designs, fondant toppers, edible gold</li>
                </ul>
                <p className="text-gray-700 font-semibold">
                  Result: Average order value increases because customers are anchored to higher prices.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Flavor Premiums</h3>
                <p className="text-gray-700 mb-3">
                  Not all flavors cost the same. Charge more for premium flavors that require expensive ingredients.
                </p>
                <ul className="space-y-2 text-gray-700 ml-6 mb-3">
                  <li>• <strong>Standard:</strong> Vanilla, chocolate, strawberry (base price)</li>
                  <li>• <strong>Premium (+$1):</strong> Red velvet, lemon, caramel</li>
                  <li>• <strong>Gourmet (+$2):</strong> Champagne, salted caramel, specialty fillings</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Rush Order Fees</h3>
                <p className="text-gray-700 mb-3">
                  Customer needs cupcakes in 2 days instead of your usual 1-week lead time? Charge a rush fee.
                </p>
                <p className="text-gray-700 font-semibold">
                  Pricing: Add 25-50% rush fee for orders under 1 week. 50-100% for orders under 3 days. Your time is valuable.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delivery Fees</h3>
                <p className="text-gray-700 mb-3">
                  Never deliver for free. You&apos;re using gas, time, and vehicle wear. Plus, you&apos;re taking on liability.
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• <strong>0-10 miles:</strong> $10-15</li>
                  <li>• <strong>10-20 miles:</strong> $15-25</li>
                  <li>• <strong>20+ miles:</strong> $25-40 or decline</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Seasonal Pricing</h3>
                <p className="text-gray-700 mb-3">
                  Raise prices during peak seasons (holidays, wedding season) when demand is high. Lower slightly during slow months to attract business.
                </p>
                <p className="text-gray-700 font-semibold">
                  Example: Valentine&apos;s Day, Mother&apos;s Day, Christmas—charge 10-20% more. Everyone expects premium pricing for holidays.
                </p>
              </div>
            </div>
          </section>

          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Should I charge per cupcake or per dozen?</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Always price per cupcake first,</strong> then offer a small discount for dozen orders.
                </p>
                <p className="text-gray-700">
                  <strong>Example:</strong> $5 per cupcake, or $55 per dozen (saves $5). This makes dozen orders attractive while allowing you to sell any quantity profitably.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What if customers say my prices are too high?</h3>
                <p className="text-gray-700 mb-3">
                  They&apos;re not your target customer. Your ideal customers value quality over price and understand the difference between homemade and store-bought.
                </p>
                <p className="text-gray-700">
                  <strong>Response:</strong> &quot;I use premium ingredients and make everything from scratch. My cupcakes are fresh, customizable, and made with care—not mass-produced. I&apos;d love to show you photos of my work!&quot;
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How do I price cupcake towers or displays?</h3>
                <p className="text-gray-700 mb-3">
                  Price each cupcake normally, then add a display/setup fee.
                </p>
                <p className="text-gray-700">
                  <strong>Example:</strong> 100 cupcakes at $5 each = $500. Add $50-100 display fee for tower rental, setup, and delivery. Total: $550-600.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Should I offer tasting appointments?</h3>
                <p className="text-gray-700 mb-3">
                  For large orders (weddings, events), yes. But charge for them.
                </p>
                <p className="text-gray-700">
                  <strong>Pricing:</strong> $25-50 for tasting appointment (3-5 flavors). Credit this toward their order if they book. This filters out tire-kickers and ensures serious customers only.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How much should I charge for wedding cupcakes?</h3>
                <p className="text-gray-700 mb-3">
                  Wedding cupcakes command premium prices. Couples expect to pay more for custom, high-quality work.
                </p>
                <p className="text-gray-700">
                  <strong>Pricing:</strong> $6-12 per cupcake depending on complexity. Add display fee ($50-150). For 150 cupcakes at $8 each + $100 display = $1,300 total.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Can I make money selling cupcakes?</h3>
                <p className="text-gray-700 mb-3">
                  Absolutely! Cupcakes have great profit margins if priced correctly.
                </p>
                <p className="text-gray-700">
                  <strong>Example:</strong> Sell 50 cupcakes per week at $5 each = $250/week = $1,000/month. With 50% profit margin, that&apos;s $500/month profit working part-time. Scale to 200 cupcakes/week = $2,000/month profit.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How often should I update my prices?</h3>
                <p className="text-gray-700 mb-3">
                  Update prices annually (2-5% for inflation) and whenever ingredient costs increase significantly.
                </p>
                <p className="text-gray-700">
                  <strong>Also raise prices when:</strong> You&apos;re fully booked 2+ weeks out (demand exceeds supply), you&apos;ve improved quality, or you&apos;ve added value (better packaging, new flavors).
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What about bulk/wholesale pricing?</h3>
                <p className="text-gray-700 mb-3">
                  If selling to coffee shops or restaurants, offer 30-40% off retail price. They&apos;re buying volume and reselling.
                </p>
                <p className="text-gray-700">
                  <strong>Example:</strong> Retail price $5 each. Wholesale price $3-3.50 each. You still make profit, they mark up to $6-7 and make profit. Win-win.
                </p>
              </div>
            </div>
          </section>

          <Card className="bg-rose-50 border-rose-200 mt-12">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <DollarSign className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready to Price Your Cupcakes?</h3>
                  <p className="mb-4">Use our free calculator to get your exact price in 2 minutes.</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/tools/cupcake-pricing-calculator">
                      <Button className="bg-rose-500 hover:bg-rose-600">Cupcake Pricing Calculator</Button>
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
