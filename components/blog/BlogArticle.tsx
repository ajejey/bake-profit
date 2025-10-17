'use client'

import Link from 'next/link'
import { ChefHat, Calculator, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function BlogArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
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
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → How to Calculate Recipe Cost
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          How to Calculate Recipe Cost: Complete Guide for Bakers (2025)
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Jan 15, 2025</span> • <span>12 min read</span> • <span className="text-rose-600 font-semibold">Recipe Costing</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <p className="text-xl text-gray-700">
            If you&apos;re selling baked goods but don&apos;t know your exact recipe costs, you&apos;re likely losing money. 
            Learn the exact formula to calculate costs and price profitably.
          </p>

          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Calculator className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Calculate Your Recipe Cost in 2 Minutes</h3>
                  <p className="mb-4">Use our free calculator. No signup required.</p>
                  <Link href="/tools/recipe-cost-calculator">
                    <Button className="bg-rose-500 hover:bg-rose-600">Use Free Calculator →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li><a href="#why-matters" className="hover:text-rose-600">Why Recipe Costing Matters</a></li>
              <li><a href="#formula" className="hover:text-rose-600">The Recipe Cost Formula</a></li>
              <li><a href="#ingredients" className="hover:text-rose-600">Calculating Ingredient Costs</a></li>
              <li><a href="#labor" className="hover:text-rose-600">Including Labor Costs</a></li>
              <li><a href="#overhead" className="hover:text-rose-600">Adding Overhead</a></li>
              <li><a href="#profit" className="hover:text-rose-600">Setting Profit Margin</a></li>
              <li><a href="#example" className="hover:text-rose-600">Complete Example</a></li>
              <li><a href="#mistakes" className="hover:text-rose-600">Common Mistakes to Avoid</a></li>
              <li><a href="#tips" className="hover:text-rose-600">Advanced Tips</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          <section id="why-matters">
            <h2 className="text-3xl font-bold mb-4">Why Recipe Costing Matters</h2>
            <p className="text-lg text-gray-700 mb-4">
              Accurate recipe costing is the foundation of a profitable bakery business. Without knowing your exact costs, you&apos;re essentially guessing at prices—and most bakers guess too low.
            </p>
            <p className="text-gray-700 mb-4">
              Here&apos;s what happens when you don&apos;t calculate recipe costs properly:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-rose-500 font-bold text-xl">•</span>
                <div>
                  <strong className="text-gray-900">You lose money on every sale.</strong> Many home bakers charge $20 for cookies that cost $18 to make. After 100 orders, you&apos;ve lost $200 and worked for free.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 font-bold text-xl">•</span>
                <div>
                  <strong className="text-gray-900">You can&apos;t make informed business decisions.</strong> Should you buy ingredients in bulk? Accept that wholesale order at 50% off retail? You can&apos;t decide without knowing your costs.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 font-bold text-xl">•</span>
                <div>
                  <strong className="text-gray-900">You undervalue your time.</strong> If you&apos;re not including labor costs, you&apos;re working for free. Your time has value, and it must be included in your pricing.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 font-bold text-xl">•</span>
                <div>
                  <strong className="text-gray-900">Your business can&apos;t grow.</strong> Without profit margins, you have no money to reinvest in better equipment, marketing, or scaling production.
                </div>
              </li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Real Example:</p>
              <p className="text-gray-700">
                Sarah was selling custom cakes for $45 each. After calculating her costs, she discovered each cake cost $42 to make—leaving only $3 profit for 4 hours of work. That&apos;s $0.75/hour! She raised her prices to $85 and now makes $43 profit per cake.
              </p>
            </div>
          </section>

          <section id="formula">
            <h2 className="text-3xl font-bold mb-4">The Recipe Cost Formula</h2>
            <p className="text-lg text-gray-700 mb-4">
              I know formulas can feel overwhelming, but this one is actually simple once you break it down. Think of it like a recipe itself—you&apos;re just adding up ingredients, but for your business instead of your batter.
            </p>
            <p className="text-gray-700 mb-6">
              Here&apos;s the complete formula that professional bakeries use. Don&apos;t worry—we&apos;ll walk through each part step-by-step with real examples:
            </p>
            <div className="bg-gray-900 text-white p-6 rounded-lg font-mono">
              <div className="mb-4"><strong className="text-rose-400">Total Cost =</strong></div>
              <div className="pl-4 space-y-2">
                <div>+ Ingredient Costs</div>
                <div>+ Packaging Costs</div>
                <div>+ Labor Costs</div>
                <div>+ Overhead Costs</div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700">
                <strong className="text-green-400">Selling Price =</strong>
              </div>
              <div className="pl-4 mt-2">Total Cost ÷ (1 - Profit Margin %)</div>
            </div>
            <p className="text-gray-700 mt-6">
              That&apos;s it! Four costs to add up, then one simple calculation to get your selling price. Let&apos;s dive into each component so you can start calculating your own recipe costs today.
            </p>
          </section>

          <section id="ingredients">
            <h2 className="text-3xl font-bold mb-4">Calculating Ingredient Costs</h2>
            <p className="text-lg text-gray-700 mb-4">
              This is where most bakers get stuck—and I get it. You&apos;re a baker, not an accountant! But here&apos;s the truth: this is the most important number in your entire business. Get this wrong, and everything else falls apart.
            </p>
            <p className="text-gray-700 mb-4">
              The good news? You only need to do this detailed calculation once per recipe. After that, you just update prices when ingredients change. Let me show you exactly how to do it:
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Write Down EVERY Ingredient</h3>
            <p className="text-gray-700 mb-4">
              Yes, even the salt. Even the baking powder. I know it seems silly to count a teaspoon of salt that costs $0.02, but over 100 batches, that&apos;s $2. And when you add up all those &quot;tiny&quot; ingredients, you might be missing $5-10 per recipe.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Find the Cost Per Unit</h3>
            <p className="text-gray-700 mb-4">
              This is the tedious part, but you only do it once. Look at your receipt: you bought a 5 lb bag of flour for $12.99. Now you need to know: how much does one cup cost? Here&apos;s the math: 5 lb = about 18.5 cups, so $12.99 ÷ 18.5 = $0.70 per cup.
            </p>
            <p className="text-gray-700 mb-6">
              <strong>Pro tip:</strong> Use our <Link href="/tools/ingredient-cost-calculator" className="text-rose-600 hover:underline font-semibold">Ingredient Cost Calculator</Link> to do this automatically. It converts between pounds, cups, ounces, and grams for you. No math required!
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Multiply and Add</h3>
            <p className="text-gray-700 mb-4">
              Now just multiply the amount you use by the cost per unit. Let&apos;s use chocolate chip cookies as an example—a classic recipe everyone knows:
            </p>

            <div className="bg-gray-50 border rounded-lg p-6">
              <p className="font-semibold mb-4">Example: Chocolate Chip Cookies (24 cookies)</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-2">Ingredient</th>
                    <th className="text-right py-2">Amount</th>
                    <th className="text-right py-2">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="py-2">Flour</td><td className="text-right">2.5 cups</td><td className="text-right font-semibold">$1.75</td></tr>
                  <tr className="border-b"><td className="py-2">Sugar</td><td className="text-right">1 cup</td><td className="text-right font-semibold">$0.50</td></tr>
                  <tr className="border-b"><td className="py-2">Brown sugar</td><td className="text-right">1 cup</td><td className="text-right font-semibold">$0.65</td></tr>
                  <tr className="border-b"><td className="py-2">Butter</td><td className="text-right">1 cup</td><td className="text-right font-semibold">$2.50</td></tr>
                  <tr className="border-b"><td className="py-2">Eggs</td><td className="text-right">2 large</td><td className="text-right font-semibold">$0.60</td></tr>
                  <tr className="border-b"><td className="py-2">Vanilla</td><td className="text-right">2 tsp</td><td className="text-right font-semibold">$0.80</td></tr>
                  <tr className="border-b"><td className="py-2">Chocolate chips</td><td className="text-right">2 cups</td><td className="text-right font-semibold">$3.00</td></tr>
                  <tr className="bg-green-50"><td className="py-3 font-bold" colSpan={2}>Total:</td><td className="text-right py-3 font-bold text-green-600">$9.87</td></tr>
                </tbody>
              </table>
              <p className="mt-4"><strong>Per cookie:</strong> $9.87 ÷ 24 = <strong className="text-rose-600">$0.41 per cookie</strong></p>
            </div>

            <p className="text-gray-700 mt-6">
              See? Not so scary! The ingredients for 24 cookies cost $9.87, which is $0.41 per cookie. But wait—we&apos;re not done yet. This is ONLY the ingredient cost. We still need to add packaging, labor, and overhead. Keep reading!
            </p>
          </section>

          <section id="labor">
            <h2 className="text-3xl font-bold mb-4">Including Labor Costs</h2>
            <p className="text-lg text-gray-700 mb-4">
              Here&apos;s where it gets real: <strong>your time is worth money.</strong> I know you love baking. I know it doesn&apos;t feel like &quot;work.&quot; But if you&apos;re not paying yourself, you&apos;re running a charity, not a business.
            </p>
            <p className="text-gray-700 mb-4">
              Think about it this way: would you work at a bakery for free? No! So why would you work at YOUR bakery for free? You deserve to be paid for your skill, time, and effort.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">How Much Should You Pay Yourself?</h3>
            <p className="text-gray-700 mb-4">
              For home bakers, $20-40 per hour is typical. Don&apos;t underprice yourself! Consider:
            </p>
            <ul className="space-y-2 mb-6 ml-6 text-gray-700">
              <li>• <strong>Beginner:</strong> $20-25/hour (you&apos;re still learning, but your time has value)</li>
              <li>• <strong>Experienced:</strong> $25-35/hour (you&apos;ve mastered techniques, work efficiently)</li>
              <li>• <strong>Expert/Specialty:</strong> $35-50/hour (intricate decorating, sugar flowers, custom designs)</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Track EVERY Minute</h3>
            <p className="text-gray-700 mb-4">
              This is crucial: don&apos;t just count &quot;baking time.&quot; Count everything from the moment you start until the product is ready to sell. Here&apos;s what most bakers forget:
            </p>
            <ul className="space-y-2 mb-6 ml-6 text-gray-700">
              <li>• Shopping for ingredients</li>
              <li>• Prepping your workspace</li>
              <li>• Measuring and mixing</li>
              <li>• Active baking time (watching, rotating pans)</li>
              <li>• Decorating and finishing</li>
              <li>• Packaging</li>
              <li>• Cleanup (this takes longer than you think!)</li>
              <li>• Customer communication (messages, order confirmations)</li>
            </ul>

            <p className="text-gray-700 mb-4">
              Let&apos;s continue our chocolate chip cookie example. Time yourself making a batch—you&apos;ll be surprised how long it actually takes:
            </p>

            <div className="bg-gray-50 border rounded-lg p-6">
              <p className="font-semibold mb-4">Time Breakdown for 24 Cookies:</p>
              <ul className="space-y-2 mb-4">
                <li>• Prep & mixing: 15 min</li>
                <li>• Baking (3 batches, watching): 30 min</li>
                <li>• Packaging in boxes: 15 min</li>
                <li>• Cleanup: 10 min</li>
                <li className="font-semibold">• Total: 70 minutes = 1.17 hours</li>
              </ul>
              <p className="mb-2">At $25/hour: 1.17 hours × $25 = <strong className="text-rose-600">$29.25 total labor cost</strong></p>
              <p>Per cookie: $29.25 ÷ 24 = <strong className="text-rose-600">$1.22 per cookie</strong></p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mt-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">⚠️ Reality Check:</p>
              <p className="text-gray-700">
                Notice that labor ($1.22) costs MORE than ingredients ($0.41) per cookie? This is normal! Your time is your most valuable resource. If someone balks at your prices, they&apos;re not valuing your expertise. Find customers who do.
              </p>
            </div>
          </section>

          <section id="overhead">
            <h2 className="text-3xl font-bold mb-4">Adding Overhead Costs</h2>
            <p className="text-lg text-gray-700 mb-4">
              Overhead is the &quot;invisible&quot; cost that sinks many home bakery businesses. These are the costs that don&apos;t go directly into your product, but you absolutely can&apos;t operate without them.
            </p>
            <p className="text-gray-700 mb-4">
              Think about it: your oven doesn&apos;t run on magic—it runs on electricity. Your mixer will eventually wear out and need replacing. You pay for business insurance (or you should!). These costs are REAL, and they must be included in your pricing.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">What Counts as Overhead?</h3>
            <ul className="space-y-2 mb-6 ml-6 text-gray-700">
              <li>• <strong>Utilities:</strong> Electricity (ovens use a LOT), gas, water</li>
              <li>• <strong>Equipment depreciation:</strong> Your $300 mixer will last ~5 years = $60/year</li>
              <li>• <strong>Rent:</strong> Portion of home rent if using home kitchen, or commercial kitchen rental</li>
              <li>• <strong>Insurance:</strong> Business liability insurance ($300-600/year)</li>
              <li>• <strong>Licenses & permits:</strong> Cottage food license, health permits</li>
              <li>• <strong>Marketing:</strong> Website hosting, business cards, social media ads</li>
              <li>• <strong>Software:</strong> Accounting, recipe management tools</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Two Ways to Calculate Overhead</h3>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded">
              <p className="font-semibold text-gray-900 mb-2">Method 1: The Quick Way (Good for Beginners)</p>
              <p className="text-gray-700 mb-3">
                Add 15-25% of your ingredient costs. This is a rough estimate, but it&apos;s better than nothing!
              </p>
              <p className="text-gray-700">
                For our cookies: $9.87 ingredients × 20% = <strong className="text-rose-600">$1.97 overhead</strong>
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6 rounded">
              <p className="font-semibold text-gray-900 mb-2">Method 2: The Accurate Way (Best for Established Businesses)</p>
              <p className="text-gray-700 mb-3">
                Calculate your actual monthly overhead, then divide by how many units you produce:
              </p>
              <ul className="space-y-1 text-gray-700 mb-3 ml-4">
                <li>• Monthly utilities: $80</li>
                <li>• Equipment depreciation: $20/month</li>
                <li>• Insurance: $40/month</li>
                <li>• Licenses: $10/month</li>
                <li>• Marketing: $50/month</li>
                <li className="font-semibold pt-2">• Total: $200/month</li>
              </ul>
              <p className="text-gray-700">
                If you make 400 cookies per month: $200 ÷ 400 = <strong className="text-rose-600">$0.50 overhead per cookie</strong>
              </p>
            </div>

            <p className="text-gray-700 mb-4">
              For our example, we&apos;ll use the quick method (20% of ingredients) which gives us $1.97 overhead for 24 cookies, or about $0.08 per cookie.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-700">
                Start with the quick method (20%), but track your actual overhead for 3 months. Then switch to the accurate method. You might be surprised—your real overhead could be higher OR lower than 20%!
              </p>
            </div>
          </section>

          <section id="profit">
            <h2 className="text-3xl font-bold mb-4">Setting Your Profit Margin</h2>
            <p className="text-lg text-gray-700 mb-4">
              Okay, deep breath. We&apos;ve calculated ingredients, labor, and overhead. Now comes the part that makes many bakers uncomfortable: <strong>adding profit.</strong>
            </p>
            <p className="text-gray-700 mb-4">
              Let me be clear: <strong>profit is not greedy.</strong> Profit is what allows you to:
            </p>
            <ul className="space-y-2 mb-6 ml-6 text-gray-700">
              <li>• Save for taxes (yes, you&apos;ll owe taxes on your income!)</li>
              <li>• Invest in better equipment</li>
              <li>• Handle slow months without panic</li>
              <li>• Grow your business</li>
              <li>• Actually build wealth from your hard work</li>
            </ul>

            <p className="text-gray-700 mb-6">
              Remember: you&apos;ve already paid yourself in the labor costs. Profit is EXTRA—it&apos;s the reward for taking the risk of running a business.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">What&apos;s a Good Profit Margin?</h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <p className="text-red-600 font-bold text-lg mb-2">Too Low</p>
                <p className="text-3xl font-bold mb-2">&lt;30%</p>
                <p className="text-sm text-gray-700">Not sustainable. You&apos;ll struggle with unexpected costs.</p>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                <p className="text-yellow-600 font-bold text-lg mb-2">Good</p>
                <p className="text-3xl font-bold mb-2">30-50%</p>
                <p className="text-sm text-gray-700">Acceptable for most home bakeries. Room to grow.</p>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <p className="text-green-600 font-bold text-lg mb-2">Excellent</p>
                <p className="text-3xl font-bold mb-2">50-100%</p>
                <p className="text-sm text-gray-700">Ideal for custom work and specialty items.</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">How to Calculate Selling Price</h3>
            <p className="text-gray-700 mb-4">
              Here&apos;s the formula. It looks scary, but I promise it&apos;s simple:
            </p>
            <div className="bg-gray-900 text-white p-6 rounded-lg font-mono mb-6">
              Selling Price = Total Cost ÷ (1 - Profit Margin %)
            </div>

            <p className="text-gray-700 mb-4">
              Let&apos;s say you want a 50% profit margin (which is perfectly reasonable!). Here&apos;s how it works:
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <p className="text-gray-700 mb-2">
                <strong>Total Cost:</strong> $41.59 (ingredients + packaging + labor + overhead)
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Desired Profit Margin:</strong> 50%
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Calculation:</strong> $41.59 ÷ (1 - 0.50) = $41.59 ÷ 0.50 = <strong className="text-rose-600">$83.18</strong>
              </p>
              <p className="text-gray-700">
                <strong>Per cookie:</strong> $83.18 ÷ 24 = <strong className="text-rose-600">$3.47 per cookie</strong>
              </p>
            </div>

            <p className="text-gray-700 mb-4">
              &quot;But wait,&quot; you might be thinking, &quot;$3.50 per cookie seems expensive!&quot; Let&apos;s break down where that money goes:
            </p>
            <ul className="space-y-2 mb-6 ml-6 text-gray-700">
              <li>• $0.41 - Ingredients (the actual cookie)</li>
              <li>• $0.02 - Packaging (box, label)</li>
              <li>• $1.22 - YOUR time and skill</li>
              <li>• $0.08 - Business costs (utilities, equipment, etc.)</li>
              <li>• $1.77 - Profit (taxes, savings, growth, emergencies)</li>
            </ul>

            <p className="text-gray-700">
              When you see it broken down like this, $3.50 for a homemade, high-quality cookie made with real butter and premium chocolate chips is actually a great value! You&apos;re not competing with grocery store cookies—you&apos;re offering something special.
            </p>
          </section>

          <section id="example">
            <h2 className="text-3xl font-bold mb-4">Complete Example</h2>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <p className="font-bold text-xl mb-4">24 Cookies - Final Calculation:</p>
              <div className="space-y-2">
                <div className="flex justify-between pb-2 border-b"><span>Ingredients:</span><span className="font-semibold">$9.87</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Packaging:</span><span className="font-semibold">$0.50</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Labor:</span><span className="font-semibold">$29.25</span></div>
                <div className="flex justify-between pb-3 border-b-2"><span>Overhead:</span><span className="font-semibold">$1.97</span></div>
                <div className="flex justify-between text-lg font-bold pt-2"><span>Total Cost:</span><span className="text-rose-600">$41.59</span></div>
                <div className="flex justify-between text-sm"><span>Per cookie:</span><span>$1.73</span></div>
              </div>
              <div className="mt-6 pt-6 border-t-2">
                <p className="font-bold mb-3">With 50% Profit Margin:</p>
                <div className="flex justify-between text-xl font-bold"><span>Selling Price:</span><span className="text-green-600">$83.18</span></div>
                <div className="flex justify-between mt-2"><span>Per cookie:</span><span className="font-semibold text-green-600">$3.47</span></div>
              </div>
            </div>
          </section>

          <section id="mistakes">
            <h2 className="text-3xl font-bold mb-4">Common Mistakes to Avoid</h2>
            <p className="text-lg text-gray-700 mb-6">
              Even experienced bakers make these recipe costing mistakes. Avoid them to ensure accurate pricing:
            </p>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Forgetting Small Ingredients</h3>
                <p className="text-gray-700 mb-3">
                  Salt, baking powder, vanilla extract—these seem insignificant, but they add up. A teaspoon of vanilla extract can cost $0.40-0.80. Over 100 recipes, that&apos;s $40-80 you&apos;re losing.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Include EVERY ingredient, no matter how small. Use our <Link href="/tools/ingredient-cost-calculator" className="text-rose-600 hover:underline">Ingredient Cost Calculator</Link> to track cost per teaspoon.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Not Tracking Time Accurately</h3>
                <p className="text-gray-700 mb-3">
                  Many bakers only count &quot;active&quot; baking time and forget prep, cleanup, packaging, and customer communication. A recipe that takes &quot;1 hour&quot; often takes 2-3 hours total.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Track time for an entire order from start to finish. Include shopping, prep, baking, decorating, packaging, cleanup, and delivery/customer pickup.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Using Outdated Ingredient Costs</h3>
                <p className="text-gray-700 mb-3">
                  Ingredient prices fluctuate. Butter might be $3.99/lb one month and $5.99/lb the next. If you calculated costs 6 months ago, your prices are probably too low now.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Update ingredient costs monthly or quarterly. Set a calendar reminder. When you notice a significant price increase, recalculate immediately.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">4. Underestimating Overhead</h3>
                <p className="text-gray-700 mb-3">
                  Your oven uses electricity. Your mixer will eventually break. You pay for business insurance. These costs are real and must be included in pricing.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Calculate your actual monthly overhead (utilities, equipment depreciation, insurance, licenses) and divide by units produced. Or use the 20% rule as a minimum.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">5. Pricing Based on Competitors</h3>
                <p className="text-gray-700 mb-3">
                  Just because another baker charges $25 for a dozen cookies doesn&apos;t mean you should. They might be underpricing too, or they might have lower costs due to bulk purchasing.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Calculate YOUR costs first, then add YOUR desired profit margin. Check competitors for market positioning, but never price below your costs.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">6. Not Accounting for Waste</h3>
                <p className="text-gray-700 mb-3">
                  Broken cookies, burnt batches, recipe testing, samples for customers—these are real costs. If 5% of your production is wasted, your costs are 5% higher than calculated.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Track your waste percentage over a month. Add it to your costs. If you waste 5%, multiply your ingredient costs by 1.05.
                </p>
              </div>
            </div>
          </section>

          <section id="tips">
            <h2 className="text-3xl font-bold mb-4">Advanced Tips for Profitable Recipe Costing</h2>
            <p className="text-lg text-gray-700 mb-6">
              Once you&apos;ve mastered the basics, use these strategies to maximize profitability:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bulk Buying Strategy</h3>
                <p className="text-gray-700 mb-3">
                  Buying ingredients in bulk can reduce costs by 20-40%. But only if you&apos;ll use them before they expire.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Example:</strong> Flour costs $0.70/cup in 5lb bags, but $0.45/cup in 25lb bags. If you use 100 cups/month, that&apos;s $25/month savings ($300/year).
                </p>
                <p className="text-gray-700 font-semibold">
                  Calculate break-even: Will you use it before it expires? Do you have storage space? Is the upfront cost manageable?
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Seasonal Ingredient Pricing</h3>
                <p className="text-gray-700 mb-3">
                  Ingredient costs fluctuate seasonally. Butter is cheaper in fall/winter. Fresh berries are expensive in winter but cheap in summer.
                </p>
                <p className="text-gray-700 font-semibold">
                  Strategy: Adjust your menu seasonally. Promote strawberry items in summer when strawberries are cheap. Focus on chocolate items in winter when cocoa prices are lower.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Recipe Optimization for Profit</h3>
                <p className="text-gray-700 mb-3">
                  Some recipes are naturally more profitable than others. Cookies have high margins (cheap ingredients, fast to make). Custom cakes have lower margins (expensive ingredients, time-intensive).
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Example:</strong> Chocolate chip cookies: $9.87 ingredients, 1.17 hours = 70% profit margin. Custom wedding cake: $85 ingredients, 8 hours = 35% profit margin.
                </p>
                <p className="text-gray-700 font-semibold">
                  Focus on high-margin products for regular sales. Charge premium prices for low-margin custom work.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">When to Raise Prices</h3>
                <p className="text-gray-700 mb-3">
                  Don&apos;t wait until you&apos;re losing money to raise prices. Raise prices when:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6 mb-3">
                  <li>• Ingredient costs increase by 10%+ (recalculate immediately)</li>
                  <li>• You&apos;re fully booked 2+ weeks out (demand exceeds supply)</li>
                  <li>• You&apos;ve improved quality or added value (better ingredients, prettier packaging)</li>
                  <li>• Annually for inflation (2-5% per year is normal)</li>
                </ul>
                <p className="text-gray-700 font-semibold">
                  Most customers accept reasonable price increases, especially with advance notice. Losing customers is better than losing money.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Batch Sizing for Efficiency</h3>
                <p className="text-gray-700 mb-3">
                  Larger batches reduce cost per unit because you spread fixed costs (labor, overhead) across more units.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Example:</strong> Making 24 cookies takes 1.17 hours. Making 48 cookies takes 1.5 hours (not double!). Your labor cost per cookie drops from $1.22 to $0.78.
                </p>
                <p className="text-gray-700 font-semibold">
                  Find your optimal batch size. Too small = inefficient. Too large = waste if you can&apos;t sell them all.
                </p>
              </div>
            </div>
          </section>

          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How often should I update my recipe costs?</h3>
                <p className="text-gray-700">
                  Update costs monthly if you bake regularly, or quarterly at minimum. Set a calendar reminder for the first of each month. Also recalculate immediately when you notice significant price increases (10%+ on major ingredients like butter, flour, or chocolate).
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Should I round prices up or down?</h3>
                <p className="text-gray-700 mb-3">
                  Always round UP to the nearest $0.50 or $1.00. Customers don&apos;t care about the difference between $3.47 and $3.50, but those pennies add up for you.
                </p>
                <p className="text-gray-700">
                  <strong>Example:</strong> If your calculation shows $3.47 per cookie, charge $3.50. For a dozen, that&apos;s $42 instead of $41.64—an extra $0.36 profit per order.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What if my prices are higher than competitors?</h3>
                <p className="text-gray-700 mb-3">
                  This is common and often GOOD. Higher prices signal higher quality. Focus on these strategies:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• Emphasize quality: &quot;Made with real butter, never margarine&quot;</li>
                  <li>• Show your process: Behind-the-scenes photos build trust</li>
                  <li>• Target different customers: Some want cheap, others want quality</li>
                  <li>• Add value: Better packaging, personalization, delivery</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Remember: You can&apos;t compete on price with grocery stores or underpricing hobbyists. Compete on quality, service, and customization.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How do I handle custom orders with unique ingredients?</h3>
                <p className="text-gray-700 mb-3">
                  Calculate costs for each custom order individually. Don&apos;t use your standard pricing if the customer requests expensive ingredients (gold leaf, premium chocolate, fresh flowers).
                </p>
                <p className="text-gray-700">
                  <strong>Process:</strong> Get the order details → Calculate ingredient costs for that specific recipe → Add labor, overhead, and profit → Quote the price → Get approval before starting.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What about waste, mistakes, and recipe testing?</h3>
                <p className="text-gray-700 mb-3">
                  Track your waste percentage over a month. If you waste 5% of ingredients (burnt batches, broken cookies, samples), add 5% to your ingredient costs.
                </p>
                <p className="text-gray-700">
                  <strong>Example:</strong> If ingredients cost $10, multiply by 1.05 = $10.50. This accounts for the inevitable waste.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Should I charge differently for wholesale vs retail?</h3>
                <p className="text-gray-700 mb-3">
                  Yes. Wholesale typically sells at 50% of retail price. Your costs stay the same, so your profit margin is lower.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Example:</strong> Retail cookies at $3.50 each (cost $1.73, profit $1.77). Wholesale at $1.75 each (cost $1.73, profit $0.02). You need VOLUME for wholesale to work.
                </p>
                <p className="text-gray-700">
                  Only accept wholesale orders if: (1) You have excess capacity, (2) The volume is large enough to offset lower margins, (3) You can still profit at 50% of retail.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Can I use the same hourly rate for all recipes?</h3>
                <p className="text-gray-700 mb-3">
                  Yes, use a consistent hourly rate ($20-40/hour for home bakers, $15-25/hour for employees). This simplifies calculations.
                </p>
                <p className="text-gray-700">
                  However, you might charge MORE for highly skilled work (intricate decorating, sugar flowers) by using a higher hourly rate ($40-60/hour) for those specific tasks.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What if I can&apos;t afford to pay myself $25/hour?</h3>
                <p className="text-gray-700 mb-3">
                  You MUST include labor costs in your pricing, even if you can&apos;t &quot;afford&quot; it yet. Otherwise, you&apos;re not running a business—you&apos;re paying for the privilege of working.
                </p>
                <p className="text-gray-700">
                  If your prices seem too high when including fair labor costs, you have three options: (1) Raise prices anyway (most customers will pay), (2) Reduce costs (buy in bulk, optimize recipes), (3) Accept that this isn&apos;t a viable business.
                </p>
              </div>
            </div>
          </section>

          <Card className="bg-rose-50 border-rose-200 mt-12">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <DollarSign className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready to Calculate Your Costs?</h3>
                  <p className="mb-4">Use our free calculators to price your recipes profitably.</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/tools/recipe-cost-calculator">
                      <Button className="bg-rose-500 hover:bg-rose-600">Recipe Cost Calculator</Button>
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
      <footer className="bg-white border-t py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2025 BakeProfit. Made with ❤️ for bakers.</p>
        </div>
      </footer>
    </div>
  )
}
