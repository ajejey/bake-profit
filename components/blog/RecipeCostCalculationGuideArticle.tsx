'use client'

import Link from 'next/link'
import { ChefHat, Calculator, DollarSign, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function RecipeCostCalculationGuideArticle() {
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
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → How to Calculate Recipe Cost
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          How to Calculate Recipe Cost: Complete Guide for Bakers (2025)
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Jan 28, 2025</span> • <span>16 min read</span> • <span className="text-rose-600 font-semibold">Recipe Costing</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            You just finished baking a batch of your famous chocolate chip cookies. A customer asks, &quot;How much?&quot; You panic. You have no idea what they actually cost to make. So you guess. $2 each? $3? You pick a number that &quot;feels right.&quot;
          </p>

          <p className="text-lg text-gray-700">
            Sound familiar? You&apos;re not alone. Most home bakers start this way. But here&apos;s the problem: <strong>guessing your recipe costs is the fastest way to lose money in your bakery business.</strong>
          </p>

          <p className="text-lg text-gray-700">
            Without knowing your true recipe costs, you can&apos;t price correctly. You might be selling cookies for $2 that actually cost you $2.50 to make. Or worse, you&apos;re charging $5 for something that costs $1, and customers think you&apos;re overpriced.
          </p>

          <p className="text-lg text-gray-700">
            This guide will teach you exactly how to calculate recipe costs like a professional baker. You&apos;ll learn the step-by-step formula, see real examples, and discover the hidden costs most bakers forget. By the end, you&apos;ll know the exact cost of every recipe you make.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Calculator className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Calculate Recipe Costs in Seconds</h3>
                  <p className="mb-4">Use our free recipe cost calculator. No signup required. Get instant, accurate costs for any recipe.</p>
                  <Link href="/tools/recipe-cost-calculator">
                    <Button className="bg-rose-500 hover:bg-rose-600">Try Free Calculator →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <div className="bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li><a href="#why-matters" className="hover:text-rose-600">Why Recipe Costing Matters</a></li>
              <li><a href="#formula" className="hover:text-rose-600">The Complete Recipe Cost Formula</a></li>
              <li><a href="#step1" className="hover:text-rose-600">Step 1: Calculate Ingredient Costs</a></li>
              <li><a href="#step2" className="hover:text-rose-600">Step 2: Add Labor Costs</a></li>
              <li><a href="#step3" className="hover:text-rose-600">Step 3: Include Overhead Costs</a></li>
              <li><a href="#step4" className="hover:text-rose-600">Step 4: Factor in Packaging & Variable Costs</a></li>
              <li><a href="#real-example" className="hover:text-rose-600">Real Example: Chocolate Chip Cookies</a></li>
              <li><a href="#common-mistakes" className="hover:text-rose-600">7 Common Recipe Costing Mistakes</a></li>
              <li><a href="#tools" className="hover:text-rose-600">Tools to Simplify Recipe Costing</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* Section 1: Why Recipe Costing Matters */}
          <section id="why-matters">
            <h2 className="text-3xl font-bold mb-4">Why Recipe Costing Matters</h2>
            <p className="text-lg text-gray-700 mb-4">
              Before we dive into the how, let&apos;s talk about the why. Why is calculating recipe costs so important?
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The Real Cost of Guessing</h3>
            <p className="text-lg text-gray-700 mb-4">
              When you don&apos;t know your recipe costs, three things happen:
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mb-6">
              <ul className="space-y-3 text-gray-800">
                <li><strong>1. You undercharge and lose money:</strong> You think you&apos;re making $2 profit per cookie, but you&apos;re actually losing $0.50. Multiply that by 100 cookies per week, and you&apos;re losing $200/month.</li>
                <li><strong>2. You overcharge and lose customers:</strong> Your prices are too high compared to competitors because you&apos;re guessing. Customers go elsewhere.</li>
                <li><strong>3. You can&apos;t make smart decisions:</strong> Which products are profitable? Should you raise prices? You have no idea because you don&apos;t have the data.</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The Benefits of Accurate Recipe Costing</h3>
            <ul className="space-y-3 mb-6 ml-6 text-gray-700">
              <li>• <strong>Price with confidence:</strong> Know exactly what to charge to make a profit</li>
              <li>• <strong>Identify your most profitable products:</strong> Focus on what makes you money</li>
              <li>• <strong>Spot problems early:</strong> See when ingredient prices go up before they hurt your profits</li>
              <li>• <strong>Make data-driven decisions:</strong> Should you add a new product? The numbers will tell you</li>
              <li>• <strong>Negotiate with confidence:</strong> Know your bottom line when customers ask for discounts</li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">Real Example:</p>
              <p className="text-gray-700">
                Sarah, a home baker, thought her cupcakes cost $1 each to make. After calculating properly, she discovered they actually cost $1.85. She was selling them for $2.50, making only $0.65 profit instead of the $1.50 she thought. She raised her prices to $3.50 and her monthly profit increased by $850.
              </p>
            </div>
          </section>

          {/* Section 2: The Formula */}
          <section id="formula">
            <h2 className="text-3xl font-bold mb-4">The Complete Recipe Cost Formula</h2>
            <p className="text-lg text-gray-700 mb-4">
              Here&apos;s the formula professional bakers use to calculate recipe costs:
            </p>

            <div className="bg-blue-50 border-2 border-blue-300 p-6 rounded-lg mb-6">
              <p className="text-center text-xl font-bold text-gray-900 mb-4">
                Total Recipe Cost = Ingredient Cost + Labor Cost + Overhead + Packaging + Variable Costs
              </p>
              <p className="text-center text-gray-700">
                This is your <strong>Cost of Goods Sold (COGS)</strong> for one unit of your recipe.
              </p>
            </div>

            <p className="text-lg text-gray-700 mb-4">
              Let&apos;s break down each component:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-rose-500 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">1. Ingredient Cost</h4>
                <p className="text-gray-700">The cost of all ingredients used in the recipe (flour, sugar, eggs, etc.)</p>
              </div>

              <div className="border-l-4 border-rose-500 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">2. Labor Cost</h4>
                <p className="text-gray-700">The cost of your time (or employee time) to make the recipe</p>
              </div>

              <div className="border-l-4 border-rose-500 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">3. Overhead Cost</h4>
                <p className="text-gray-700">Your share of fixed costs (rent, utilities, insurance, equipment)</p>
              </div>

              <div className="border-l-4 border-rose-500 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">4. Packaging Cost</h4>
                <p className="text-gray-700">Boxes, bags, labels, ribbons, etc.</p>
              </div>

              <div className="border-l-4 border-rose-500 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">5. Variable Costs</h4>
                <p className="text-gray-700">Delivery fees, payment processing, marketing materials</p>
              </div>
            </div>
          </section>

          {/* CTA Card 2 */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <DollarSign className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Track All Your Costs Automatically</h3>
                  <p className="mb-4">BakeProfit calculates ingredient costs, labor, overhead, and profit margins automatically. Free forever for up to 5 recipes.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Ingredient Costs */}
          <section id="step1">
            <h2 className="text-3xl font-bold mb-4">Step 1: Calculate Ingredient Costs</h2>
            <p className="text-lg text-gray-700 mb-4">
              This is the foundation of recipe costing. You need to know the cost of every single ingredient in your recipe.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The Process</h3>
            <ol className="space-y-4 mb-6 ml-6 text-gray-700">
              <li>
                <strong>1. Track what you pay for ingredients:</strong> Keep receipts or check your bank statements. Write down the price and size of each ingredient you buy.
                <div className="bg-gray-100 p-3 rounded mt-2 text-sm">
                  Example: 5 lb bag of flour = $2.64
                </div>
              </li>
              <li>
                <strong>2. Calculate price per unit:</strong> Divide the total price by the total amount.
                <div className="bg-gray-100 p-3 rounded mt-2 text-sm">
                  Example: $2.64 ÷ 80 oz = $0.033 per oz of flour
                </div>
              </li>
              <li>
                <strong>3. Calculate cost for recipe amount:</strong> Multiply the price per unit by the amount used in your recipe.
                <div className="bg-gray-100 p-3 rounded mt-2 text-sm">
                  Example: Recipe uses 8 oz flour × $0.033 = $0.26
                </div>
              </li>
              <li>
                <strong>4. Repeat for every ingredient:</strong> Do this for flour, sugar, eggs, butter, chocolate chips, vanilla, etc.
              </li>
              <li>
                <strong>5. Add them all up:</strong> Total ingredient cost = sum of all ingredients
              </li>
            </ol>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Pro Tips for Ingredient Costing</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mb-6">
              <ul className="space-y-2 text-gray-800">
                <li><CheckCircle className="inline h-5 w-5 text-green-600 mr-2" /><strong>Use the same units:</strong> Convert everything to ounces or grams for consistency</li>
                <li><CheckCircle className="inline h-5 w-5 text-green-600 mr-2" /><strong>Include everything:</strong> Don&apos;t forget salt, baking powder, vanilla extract, etc.</li>
                <li><CheckCircle className="inline h-5 w-5 text-green-600 mr-2" /><strong>Update regularly:</strong> Ingredient prices change. Update your costs every 3 months</li>
                <li><CheckCircle className="inline h-5 w-5 text-green-600 mr-2" /><strong>Account for waste:</strong> If you always throw away 10% of your dough, factor that in</li>
                <li><CheckCircle className="inline h-5 w-5 text-green-600 mr-2" /><strong>Buy smart:</strong> Buying in bulk reduces your per-unit cost</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Common Unit Conversions</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Ingredient</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Flour</td>
                    <td className="border border-gray-300 px-4 py-2">1 cup = 4.5 oz = 128g</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Sugar (granulated)</td>
                    <td className="border border-gray-300 px-4 py-2">1 cup = 7 oz = 200g</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Butter</td>
                    <td className="border border-gray-300 px-4 py-2">1 stick = 4 oz = 113g</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Eggs (large)</td>
                    <td className="border border-gray-300 px-4 py-2">1 egg = 2 oz = 57g</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Step 2: Labor Costs */}
          <section id="step2">
            <h2 className="text-3xl font-bold mb-4">Step 2: Add Labor Costs</h2>
            <p className="text-lg text-gray-700 mb-4">
              Your time has value. Even if you&apos;re the owner, you need to pay yourself. Otherwise, you&apos;re working for free.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">How to Calculate Labor Cost</h3>
            <ol className="space-y-4 mb-6 ml-6 text-gray-700">
              <li>
                <strong>1. Decide your hourly rate:</strong> What would you pay someone to do this work? Or what would you earn working elsewhere?
                <div className="bg-gray-100 p-3 rounded mt-2 text-sm">
                  Example: $15/hour for basic baking, $25/hour for custom cake decorating
                </div>
              </li>
              <li>
                <strong>2. Time yourself making the recipe:</strong> Include all steps from start to finish.
                <div className="bg-gray-100 p-3 rounded mt-2 text-sm">
                  Example: Mixing (15 min) + Baking (12 min) + Cooling (5 min) + Packaging (8 min) = 40 minutes total
                </div>
              </li>
              <li>
                <strong>3. Calculate labor cost:</strong> (Hours worked × Hourly rate) ÷ Number of units made
                <div className="bg-gray-100 p-3 rounded mt-2 text-sm">
                  Example: (0.67 hours × $15) ÷ 24 cookies = $0.42 per cookie
                </div>
              </li>
            </ol>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <p className="text-gray-800 font-semibold mb-2"><AlertCircle className="inline h-5 w-5 mr-2" />Important Note:</p>
              <p className="text-gray-700">
                Don&apos;t skip labor costs just because you&apos;re the owner. If you don&apos;t pay yourself, you&apos;re not running a business—you&apos;re running an expensive hobby. Your time is valuable.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Labor Cost by Bakery Type</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Bakery Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Typical Hourly Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Home Baker (Hobby)</td>
                    <td className="border border-gray-300 px-4 py-2">$12-15/hour</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Home Baker (Professional)</td>
                    <td className="border border-gray-300 px-4 py-2">$15-25/hour</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Custom Cake Decorator</td>
                    <td className="border border-gray-300 px-4 py-2">$25-40/hour</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Commercial Bakery</td>
                    <td className="border border-gray-300 px-4 py-2">$16-20/hour (2025 minimum wages)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Step 3: Overhead Costs */}
          <section id="step3">
            <h2 className="text-3xl font-bold mb-4">Step 3: Include Overhead Costs</h2>
            <p className="text-lg text-gray-700 mb-4">
              Overhead costs are the expenses you pay to keep your bakery running, even when you&apos;re not baking. These are often forgotten, but they&apos;re crucial.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">What Are Overhead Costs?</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Fixed Overhead</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Rent or mortgage payment</li>
                  <li>• Business insurance</li>
                  <li>• Business licenses & permits</li>
                  <li>• Equipment depreciation</li>
                  <li>• Software subscriptions</li>
                  <li>• Website hosting</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Variable Overhead</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Utilities (electricity, gas, water)</li>
                  <li>• Marketing & advertising</li>
                  <li>• Payment processing fees</li>
                  <li>• Cleaning supplies</li>
                  <li>• Kitchen supplies (parchment, foil)</li>
                  <li>• Professional development</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">How to Calculate Overhead Per Recipe</h3>
            <ol className="space-y-4 mb-6 ml-6 text-gray-700">
              <li>
                <strong>1. Calculate total monthly overhead:</strong> Add up all your overhead expenses for one month.
                <div className="bg-gray-100 p-3 rounded mt-2 text-sm">
                  Example: Rent ($200) + Utilities ($50) + Insurance ($30) + Licenses ($10) + Marketing ($40) = $330/month
                </div>
              </li>
              <li>
                <strong>2. Estimate monthly production:</strong> How many units do you make per month?
                <div className="bg-gray-100 p-3 rounded mt-2 text-sm">
                  Example: 400 cookies per month
                </div>
              </li>
              <li>
                <strong>3. Calculate overhead per unit:</strong> Total overhead ÷ Total units
                <div className="bg-gray-100 p-3 rounded mt-2 text-sm">
                  Example: $330 ÷ 400 cookies = $0.83 overhead per cookie
                </div>
              </li>
            </ol>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">Home Baker Tip:</p>
              <p className="text-gray-700">
                If you bake from home, you can deduct a portion of your home expenses as business overhead. Consult with a tax professional to determine what percentage is appropriate (typically 10-20% of utilities and a portion of rent/mortgage).
              </p>
            </div>
          </section>

          {/* Step 4: Packaging & Variable Costs */}
          <section id="step4">
            <h2 className="text-3xl font-bold mb-4">Step 4: Factor in Packaging & Variable Costs</h2>
            <p className="text-lg text-gray-700 mb-4">
              The final piece of the puzzle: packaging and other variable costs that change with each order.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Packaging Costs</h3>
            <p className="text-lg text-gray-700 mb-4">
              Every item you sell needs packaging. Don&apos;t forget to include:
            </p>
            <ul className="space-y-2 mb-6 ml-6 text-gray-700">
              <li>• Boxes or bags</li>
              <li>• Labels or stickers</li>
              <li>• Tissue paper or padding</li>
              <li>• Ribbons or decorative elements</li>
              <li>• Business cards</li>
              <li>• Thank you notes</li>
            </ul>

            <div className="bg-gray-100 p-4 rounded mb-6">
              <p className="font-semibold text-gray-900 mb-2">Example Packaging Cost:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>Cookie box: $0.50</li>
                <li>Label: $0.10</li>
                <li>Tissue paper: $0.05</li>
                <li>Business card: $0.03</li>
                <li><strong>Total packaging per dozen: $0.68</strong></li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Other Variable Costs</h3>
            <ul className="space-y-3 mb-6 ml-6 text-gray-700">
              <li>• <strong>Payment processing fees:</strong> 2.9% + $0.30 per transaction (typical for PayPal/Square)</li>
              <li>• <strong>Delivery costs:</strong> Gas, mileage, or delivery service fees</li>
              <li>• <strong>Sampling costs:</strong> Free samples given to potential customers</li>
              <li>• <strong>Waste/spoilage:</strong> Products that don&apos;t sell or get damaged</li>
            </ul>
          </section>

          {/* CTA Card 3 */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <TrendingUp className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">See Your Profit Margins Instantly</h3>
                  <p className="mb-4">BakeProfit shows you exactly how much profit you make on each product. Track costs, set prices, and maximize profits.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Try Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real Example Section */}
          <section id="real-example">
            <h2 className="text-3xl font-bold mb-4">Real Example: Chocolate Chip Cookies</h2>
            <p className="text-lg text-gray-700 mb-4">
              Let&apos;s put it all together with a real example. We&apos;ll calculate the cost of one dozen chocolate chip cookies.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Recipe: Classic Chocolate Chip Cookies (Makes 24 cookies)</h3>
            
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-4">Step 1: Ingredient Costs</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left">Ingredient</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Amount</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Cost/Unit</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Flour</td>
                      <td className="border border-gray-300 px-3 py-2">10 oz</td>
                      <td className="border border-gray-300 px-3 py-2">$0.033/oz</td>
                      <td className="border border-gray-300 px-3 py-2">$0.33</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Sugar</td>
                      <td className="border border-gray-300 px-3 py-2">7 oz</td>
                      <td className="border border-gray-300 px-3 py-2">$0.043/oz</td>
                      <td className="border border-gray-300 px-3 py-2">$0.30</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Brown Sugar</td>
                      <td className="border border-gray-300 px-3 py-2">7 oz</td>
                      <td className="border border-gray-300 px-3 py-2">$0.050/oz</td>
                      <td className="border border-gray-300 px-3 py-2">$0.35</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Butter</td>
                      <td className="border border-gray-300 px-3 py-2">8 oz</td>
                      <td className="border border-gray-300 px-3 py-2">$0.125/oz</td>
                      <td className="border border-gray-300 px-3 py-2">$1.00</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Eggs</td>
                      <td className="border border-gray-300 px-3 py-2">2 large</td>
                      <td className="border border-gray-300 px-3 py-2">$0.25/egg</td>
                      <td className="border border-gray-300 px-3 py-2">$0.50</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Vanilla Extract</td>
                      <td className="border border-gray-300 px-3 py-2">1 tsp</td>
                      <td className="border border-gray-300 px-3 py-2">$0.50/tsp</td>
                      <td className="border border-gray-300 px-3 py-2">$0.50</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Chocolate Chips</td>
                      <td className="border border-gray-300 px-3 py-2">12 oz</td>
                      <td className="border border-gray-300 px-3 py-2">$0.167/oz</td>
                      <td className="border border-gray-300 px-3 py-2">$2.00</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Baking Soda, Salt</td>
                      <td className="border border-gray-300 px-3 py-2">-</td>
                      <td className="border border-gray-300 px-3 py-2">-</td>
                      <td className="border border-gray-300 px-3 py-2">$0.05</td>
                    </tr>
                    <tr className="bg-blue-100 font-bold">
                      <td className="border border-gray-300 px-3 py-2" colSpan={3}>Total Ingredient Cost (24 cookies)</td>
                      <td className="border border-gray-300 px-3 py-2">$5.03</td>
                    </tr>
                    <tr className="bg-blue-200 font-bold">
                      <td className="border border-gray-300 px-3 py-2" colSpan={3}>Cost Per Cookie</td>
                      <td className="border border-gray-300 px-3 py-2">$0.21</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-4">Step 2: Labor Cost</h4>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Time to make batch: 40 minutes (mixing, baking, cooling, packaging)</li>
                <li>• Hourly rate: $15/hour</li>
                <li>• Labor cost: (40 min ÷ 60) × $15 = $10.00 for 24 cookies</li>
                <li><strong>• Labor cost per cookie: $10.00 ÷ 24 = $0.42</strong></li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-4">Step 3: Overhead Cost</h4>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Monthly overhead: $330</li>
                <li>• Monthly production: 400 cookies</li>
                <li><strong>• Overhead per cookie: $330 ÷ 400 = $0.83</strong></li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-4">Step 4: Packaging Cost</h4>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Cookie box (per dozen): $0.50</li>
                <li>• Label: $0.10</li>
                <li>• Tissue paper: $0.05</li>
                <li>• Business card: $0.03</li>
                <li><strong>• Total packaging per dozen: $0.68</strong></li>
                <li><strong>• Packaging per cookie: $0.68 ÷ 12 = $0.06</strong></li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4 text-xl">Final Cost Breakdown (Per Cookie)</h4>
              <div className="space-y-2 text-gray-800">
                <div className="flex justify-between">
                  <span>Ingredients:</span>
                  <span className="font-semibold">$0.21</span>
                </div>
                <div className="flex justify-between">
                  <span>Labor:</span>
                  <span className="font-semibold">$0.42</span>
                </div>
                <div className="flex justify-between">
                  <span>Overhead:</span>
                  <span className="font-semibold">$0.83</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging:</span>
                  <span className="font-semibold">$0.06</span>
                </div>
                <div className="border-t-2 border-green-600 pt-2 mt-2 flex justify-between text-xl font-bold">
                  <span>Total Cost Per Cookie:</span>
                  <span className="text-green-700">$1.52</span>
                </div>
              </div>

              <div className="mt-6 bg-white p-4 rounded">
                <p className="font-semibold text-gray-900 mb-2">Pricing Recommendation:</p>
                <p className="text-gray-700 mb-2">
                  To achieve a 50% profit margin, you should price each cookie at <strong>$3.04</strong> (or $3.00 rounded).
                </p>
                <p className="text-gray-700">
                  For a dozen cookies: <strong>$36.00</strong> (giving you $18.24 profit per dozen)
                </p>
              </div>
            </div>
          </section>

          {/* Common Mistakes Section */}
          <section id="common-mistakes">
            <h2 className="text-3xl font-bold mb-4">7 Common Recipe Costing Mistakes</h2>
            <p className="text-lg text-gray-700 mb-6">
              Even experienced bakers make these mistakes. Avoid them to ensure accurate costing:
            </p>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">1. Forgetting Small Ingredients</h3>
                <p className="text-gray-700">
                  Salt, baking powder, vanilla extract—they seem insignificant, but they add up. A teaspoon of vanilla extract can cost $0.50. Include everything.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">2. Not Paying Yourself</h3>
                <p className="text-gray-700">
                  Your time is valuable. If you don&apos;t include labor costs, you&apos;re working for free. Even if you&apos;re the owner, pay yourself a fair hourly rate.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">3. Ignoring Overhead</h3>
                <p className="text-gray-700">
                  Rent, utilities, insurance—these costs exist whether you bake or not. Allocate a portion to each product you make.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">4. Using Outdated Prices</h3>
                <p className="text-gray-700">
                  Ingredient prices change. That $2.50 bag of flour might now cost $3.50. Update your costs every 3 months or when you notice price increases.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">5. Not Accounting for Waste</h3>
                <p className="text-gray-700">
                  Do you always throw away 10% of your dough? Do cookies sometimes burn? Factor waste into your costs.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">6. Forgetting Packaging</h3>
                <p className="text-gray-700">
                  Boxes, bags, labels, ribbons—packaging costs add up quickly. A $0.50 box per dozen might not seem like much, but it&apos;s $50 for 100 dozen.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">7. Not Tracking Actual Time</h3>
                <p className="text-gray-700">
                  You think a batch takes 30 minutes, but it actually takes 50. Time yourself to get accurate labor costs.
                </p>
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section id="tools">
            <h2 className="text-3xl font-bold mb-4">Tools to Simplify Recipe Costing</h2>
            <p className="text-lg text-gray-700 mb-6">
              You don&apos;t have to do all this math by hand. Here are tools that can help:
            </p>

            <div className="space-y-6">
              <div className="border-2 border-rose-200 rounded-lg p-6 bg-rose-50">
                <h3 className="font-bold text-gray-900 mb-2 text-xl">BakeProfit (Recommended)</h3>
                <p className="text-gray-700 mb-4">
                  Our free recipe cost calculator does all the math for you. Track ingredients, calculate costs, set prices, and see profit margins instantly. Free forever for up to 5 recipes.
                </p>
                <div className="flex gap-4">
                  <Link href="/tools/recipe-cost-calculator">
                    <Button className="bg-rose-500 hover:bg-rose-600">Try Free Calculator →</Button>
                  </Link>
                  <Link href="/bakery-business-tool">
                    <Button variant="outline" className="border-rose-500 text-rose-600 hover:bg-rose-50">Full App →</Button>
                  </Link>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">Excel Spreadsheets</h3>
                <p className="text-gray-700">
                  Good for: Bakers who like full control and don&apos;t mind manual entry. Free if you already have Excel.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">Pen and Paper</h3>
                <p className="text-gray-700">
                  Good for: Simple recipes with few ingredients. Not recommended for ongoing use or multiple recipes.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  How often should I update my recipe costs?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Update your recipe costs every 3 months, or immediately when you notice significant ingredient price increases. Butter, eggs, and chocolate are especially volatile and can change quickly.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  Do I really need to include labor costs if I&apos;m the owner?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Yes! Your time has value. If you don&apos;t pay yourself, you&apos;re not running a profitable business—you&apos;re running an expensive hobby. Include labor costs at a fair hourly rate for your skill level.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  What&apos;s a good profit margin for baked goods?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Most successful bakeries aim for a 50-70% profit margin on baked goods. This means if your cookie costs $1.50 to make, you should sell it for $3.00-$5.00. Custom cakes can have even higher margins (70-80%).
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  How do I calculate overhead if I bake from home?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Calculate 10-20% of your home utilities (electricity, gas, water) as business overhead. Add business insurance, licenses, and equipment costs. Divide by your monthly production to get overhead per unit. Consult a tax professional for exact percentages.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  Should I charge more for custom orders?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Yes! Custom orders require more time, skill, and often specialty ingredients. Add 20-50% to your base price for custom designs, special flavors, or rush orders. Your time and expertise are valuable.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  What if my prices are higher than competitors?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Don&apos;t compete on price alone. Compete on quality, service, and uniqueness. If your costs are accurate and you&apos;re pricing for profit, stick to your prices. The right customers will pay for quality. Consider what makes you different and market that.
                </p>
              </details>
            </div>
          </section>

          {/* Bottom Line Section */}
          <section className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">The Bottom Line</h2>
            <p className="text-lg text-rose-100 mb-6">
              Calculating recipe costs isn&apos;t optional—it&apos;s essential for running a profitable bakery business. Without accurate costs, you&apos;re guessing at prices and likely losing money.
            </p>
            <p className="text-lg text-rose-100 mb-6">
              Use the formula: <strong>Ingredient Cost + Labor + Overhead + Packaging + Variable Costs = Total Recipe Cost</strong>
            </p>
            <p className="text-lg text-rose-100 mb-8">
              Then add your profit margin to set your selling price. Update your costs regularly, and don&apos;t forget to pay yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tools/recipe-cost-calculator">
                <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 w-full sm:w-auto">
                  Calculate Your Recipe Costs Free →
                </Button>
              </Link>
              <Link href="/bakery-business-tool">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-rose-600 w-full sm:w-auto">
                  Try BakeProfit Free
                </Button>
              </Link>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/recipe-cost-calculator-comparison" className="border rounded-lg p-6 hover:border-rose-500 transition-colors">
                <h3 className="font-bold text-lg mb-2">Recipe Cost Calculator: Excel vs Software</h3>
                <p className="text-gray-600 text-sm">Compare different methods for calculating recipe costs and find the best one for your bakery.</p>
              </Link>
              <Link href="/blog/how-to-start-home-bakery" className="border rounded-lg p-6 hover:border-rose-500 transition-colors">
                <h3 className="font-bold text-lg mb-2">How to Start a Home Bakery Business</h3>
                <p className="text-gray-600 text-sm">Complete guide to starting a profitable home bakery from scratch.</p>
              </Link>
            </div>
          </section>

        </div>
      </article>

      {/* Footer */}
      <Footer />
    </div>
  )
}
