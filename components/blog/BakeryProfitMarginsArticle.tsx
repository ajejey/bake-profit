'use client'

import Link from 'next/link'
import { ChefHat, Calculator, TrendingUp, AlertCircle, CheckCircle, DollarSign, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '../layout/Footer'

export default function BakeryProfitMarginsArticle() {
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
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → Bakery Profit Margins
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Bakery Profit Margins: What&apos;s Normal and How to Improve Yours (2025)
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Jan 28, 2025</span> • <span>16 min read</span> • <span className="text-rose-600 font-semibold">Business Strategy</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            You&apos;re working 60 hours a week. Your kitchen smells amazing. Customers love your products. But when you check your bank account at the end of the month, there&apos;s barely anything left.
          </p>

          <p className="text-lg text-gray-700">
            Sound familiar? You&apos;re not alone. Most home bakers have no idea what their profit margin is—or what it should be. They price based on what feels right, hope for the best, and wonder why they&apos;re not making money.
          </p>

          <p className="text-lg text-gray-700">
            Here&apos;s the truth: <strong>If you don&apos;t know your profit margin, you&apos;re not running a business—you&apos;re running an expensive hobby.</strong>
          </p>

          <p className="text-lg text-gray-700">
            This guide will show you exactly what profit margins are normal for different types of bakeries, how yours compares, and—most importantly—how to improve it without raising prices or working more hours.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Target className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">See Your Profit Margins Instantly</h3>
                  <p className="mb-4">BakeProfit calculates your profit margin for every product automatically. Know exactly which items make money and which don&apos;t.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Calculate Your Margins Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <div className="bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li><a href="#what-is" className="hover:text-rose-600">What is a Profit Margin?</a></li>
              <li><a href="#normal-margins" className="hover:text-rose-600">What Are Normal Bakery Profit Margins?</a></li>
              <li><a href="#by-product" className="hover:text-rose-600">Profit Margins by Product Type</a></li>
              <li><a href="#calculate" className="hover:text-rose-600">How to Calculate Your Profit Margin</a></li>
              <li><a href="#low-margins" className="hover:text-rose-600">Why Your Margins Might Be Low</a></li>
              <li><a href="#improve" className="hover:text-rose-600">10 Ways to Improve Your Profit Margins</a></li>
              <li><a href="#mistakes" className="hover:text-rose-600">Common Margin-Killing Mistakes</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* Section 1: What is Profit Margin */}
          <section id="what-is">
            <h2 className="text-3xl font-bold mb-4">What is a Profit Margin?</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Let&apos;s start with the basics. Your profit margin is the percentage of revenue that becomes profit after all expenses are paid.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <p className="font-bold text-gray-900 mb-3 text-lg">The Simple Formula:</p>
              <p className="text-gray-800 text-xl font-mono mb-4">
                Profit Margin = (Net Profit ÷ Revenue) × 100
              </p>
              <p className="text-gray-700">
                <strong>Example:</strong> If you sell $10,000 worth of baked goods and have $8,500 in expenses, your net profit is $1,500. Your profit margin is ($1,500 ÷ $10,000) × 100 = <strong>15%</strong>
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Two Types of Profit Margins</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="border-2 border-green-300 rounded-lg p-6 bg-green-50">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">Gross Profit Margin</h4>
                <p className="text-gray-700 mb-3">
                  Revenue minus <strong>cost of goods sold</strong> (COGS)—just your ingredient and packaging costs.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Formula: (Revenue - COGS) ÷ Revenue × 100
                </p>
                <p className="text-gray-700 mt-3">
                  <strong>Example:</strong> Sell cookies for $20, ingredients cost $6 = 70% gross margin
                </p>
              </div>

              <div className="border-2 border-blue-300 rounded-lg p-6 bg-blue-50">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">Net Profit Margin</h4>
                <p className="text-gray-700 mb-3">
                  Revenue minus <strong>all expenses</strong>—ingredients, labor, rent, utilities, marketing, everything.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Formula: (Revenue - All Expenses) ÷ Revenue × 100
                </p>
                <p className="text-gray-700 mt-3">
                  <strong>Example:</strong> $20 revenue, $15 total costs = 25% net margin
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2"><AlertCircle className="inline h-5 w-5 mr-2" />Important:</p>
              <p className="text-gray-700">
                Most bakers only track gross margin (ingredients) and forget about labor, overhead, and other costs. That&apos;s why they think they&apos;re profitable when they&apos;re actually losing money. Always focus on <strong>net profit margin</strong>.
              </p>
            </div>
          </section>

          {/* Section 2: Normal Margins */}
          <section id="normal-margins">
            <h2 className="text-3xl font-bold mb-4">What Are Normal Bakery Profit Margins?</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Based on data from 12,900+ US bakeries, here&apos;s what&apos;s actually normal:
            </p>

            <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-2xl text-center">Industry Benchmarks (2025)</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-rose-600 mb-2">4-9%</div>
                  <p className="text-gray-700 font-semibold">Average Bakeries</p>
                  <p className="text-sm text-gray-600 mt-2">Standard neighborhood bakeries with basic cost controls</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">10-15%</div>
                  <p className="text-gray-700 font-semibold">Well-Managed Bakeries</p>
                  <p className="text-sm text-gray-600 mt-2">Strong cost controls, efficient operations, premium locations</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">20-40%</div>
                  <p className="text-gray-700 font-semibold">Artisanal/Specialty</p>
                  <p className="text-sm text-gray-600 mt-2">Premium positioning, custom products, strong brand</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">By Bakery Type</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left">Bakery Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Typical Net Margin</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Home Bakery</td>
                    <td className="border border-gray-300 px-4 py-2">15-30%</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Low overhead (no rent), but limited scale</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Retail Bakery</td>
                    <td className="border border-gray-300 px-4 py-2">4-9%</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">High rent, labor costs, competitive pricing</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Wholesale Bakery</td>
                    <td className="border border-gray-300 px-4 py-2">8-12%</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Volume sales, lower prices, efficient production</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Custom Cake Business</td>
                    <td className="border border-gray-300 px-4 py-2">30-50%</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Premium pricing, skilled labor, unique products</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Artisanal/Specialty</td>
                    <td className="border border-gray-300 px-4 py-2">20-40%</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Premium ingredients, strong brand, loyal customers</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Bakery Café</td>
                    <td className="border border-gray-300 px-4 py-2">10-15%</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Coffee/beverage sales boost margins significantly</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">Good News for Home Bakers:</p>
              <p className="text-gray-700">
                Home bakeries typically have the highest profit margins (15-30%) because you don&apos;t pay rent or full-time staff. If your margin is below 15%, you&apos;re leaving money on the table.
              </p>
            </div>
          </section>

          {/* Section 3: By Product */}
          <section id="by-product">
            <h2 className="text-3xl font-bold mb-4">Profit Margins by Product Type</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Not all products are equally profitable. Here&apos;s what you should know:
            </p>

            <div className="space-y-6">
              <div className="border-2 border-gray-300 rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 text-xl">Bread & Rolls</h3>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">40-60%</span>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Gross Margin:</strong> 40-60% (simple ingredients, low cost)
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Net Margin:</strong> 5-15% (labor-intensive, competitive pricing)
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Strategy:</strong> Volume sales, efficient production, wholesale opportunities
                </p>
              </div>

              <div className="border-2 border-gray-300 rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 text-xl">Cookies & Brownies</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">60-75%</span>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Gross Margin:</strong> 60-75% (affordable ingredients, high markup)
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Net Margin:</strong> 25-40% (quick to make, easy to scale)
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Strategy:</strong> Perfect for home bakers, great profit per hour
                </p>
              </div>

              <div className="border-2 border-gray-300 rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 text-xl">Cupcakes</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">65-80%</span>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Gross Margin:</strong> 65-80% (low ingredient cost, premium pricing)
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Net Margin:</strong> 30-50% (decorating adds value, quick production)
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Strategy:</strong> Offer custom designs, charge premium for decorating
                </p>
              </div>

              <div className="border-2 border-green-400 rounded-lg p-6 bg-green-50">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 text-xl">Custom Cakes</h3>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold">70-85%</span>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Gross Margin:</strong> 70-85% (premium pricing for skill/artistry)
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Net Margin:</strong> 40-70% (highest profit per order)
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Strategy:</strong> Focus on custom work, charge for design time, build portfolio
                </p>
              </div>

              <div className="border-2 border-gray-300 rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 text-xl">Pastries & Croissants</h3>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">50-65%</span>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Gross Margin:</strong> 50-65% (butter-heavy, moderate cost)
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Net Margin:</strong> 15-30% (time-intensive, requires skill)
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Strategy:</strong> Premium positioning, morning rush sales, wholesale to cafés
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mt-6">
              <p className="text-gray-800 font-semibold mb-2">💡 Key Insight:</p>
              <p className="text-gray-700">
                Custom cakes and decorated items have the highest margins because you&apos;re selling skill and artistry, not just ingredients. If you&apos;re only making bread and cookies, you&apos;re limiting your profit potential.
              </p>
            </div>
          </section>

          {/* CTA Card 2 */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Calculator className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Know Your Most Profitable Products</h3>
                  <p className="mb-4">BakeProfit shows profit margins for every product. Focus on what makes money, drop what doesn&apos;t.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Analyze Your Products Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Calculate */}
          <section id="calculate">
            <h2 className="text-3xl font-bold mb-4">How to Calculate Your Profit Margin</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Let&apos;s calculate your actual profit margin step by step:
            </p>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Step-by-Step Calculation</h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">Step 1: Calculate Total Revenue</p>
                  <p className="text-gray-700 text-sm">Add up all sales for the month</p>
                  <p className="text-gray-800 font-mono mt-2">Example: $5,000</p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">Step 2: Calculate Cost of Goods Sold (COGS)</p>
                  <p className="text-gray-700 text-sm">All ingredient and packaging costs</p>
                  <p className="text-gray-800 font-mono mt-2">Example: $1,500</p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">Step 3: Calculate Operating Expenses</p>
                  <p className="text-gray-700 text-sm mb-2">Labor, rent, utilities, marketing, insurance, etc.</p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Labor: $1,200</li>
                    <li>• Rent/utilities: $400</li>
                    <li>• Marketing: $200</li>
                    <li>• Other: $200</li>
                  </ul>
                  <p className="text-gray-800 font-mono mt-2">Total: $2,000</p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">Step 4: Calculate Net Profit</p>
                  <p className="text-gray-700 text-sm">Revenue - COGS - Operating Expenses</p>
                  <p className="text-gray-800 font-mono mt-2">$5,000 - $1,500 - $2,000 = $1,500</p>
                </div>

                <div className="bg-green-100 p-4 rounded border-2 border-green-500">
                  <p className="font-bold text-gray-900 mb-2">Step 5: Calculate Profit Margin</p>
                  <p className="text-gray-700 text-sm">(Net Profit ÷ Revenue) × 100</p>
                  <p className="text-gray-800 font-mono mt-2">($1,500 ÷ $5,000) × 100 = <strong className="text-green-700 text-xl">30%</strong></p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2"><AlertCircle className="inline h-5 w-5 mr-2" />Don&apos;t Forget:</p>
              <ul className="text-gray-700 space-y-1 ml-6">
                <li>• Include your own labor (pay yourself!)</li>
                <li>• Count partial ingredients (half a bag of flour)</li>
                <li>• Include packaging, labels, boxes</li>
                <li>• Add utilities used for baking</li>
                <li>• Factor in equipment depreciation</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Low Margins */}
          <section id="low-margins">
            <h2 className="text-3xl font-bold mb-4">Why Your Margins Might Be Low</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              If your profit margin is below 15% (for home bakers) or 5% (for retail), here&apos;s probably why:
            </p>

            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">1. Underpricing</h3>
                <p className="text-gray-700">
                  You&apos;re charging $20 for a cake that costs $15 to make. That&apos;s only a 25% margin—before labor and overhead. You need at least 2-3x your ingredient cost.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">2. Not Tracking All Costs</h3>
                <p className="text-gray-700">
                  You count flour and sugar but forget vanilla extract, food coloring, parchment paper, electricity, and your time. Those &quot;small&quot; costs add up to 20-30% of your expenses.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">3. Too Much Waste</h3>
                <p className="text-gray-700">
                  Burnt batches, expired ingredients, overproduction—waste can eat 10-15% of your revenue. Track it, then reduce it.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">4. Inefficient Production</h3>
                <p className="text-gray-700">
                  Taking 3 hours to make something that should take 1 hour triples your labor cost. Improve your processes and batch production.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">5. Wrong Product Mix</h3>
                <p className="text-gray-700">
                  Focusing on low-margin bread (5-15%) instead of high-margin custom cakes (40-70%). Shift your product mix toward more profitable items.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">6. Ingredient Costs Too High</h3>
                <p className="text-gray-700">
                  Buying small quantities at retail prices instead of bulk at wholesale. A 20% reduction in ingredient costs can double your profit margin.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Improve */}
          <section id="improve">
            <h2 className="text-3xl font-bold mb-4">10 Ways to Improve Your Profit Margins</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Here&apos;s how to boost your margins without working more hours:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">1. Raise Your Prices (Strategically)</h3>
                <p className="text-gray-700 mb-2">
                  A 10% price increase = 10% higher margin (if costs stay the same). Most customers won&apos;t notice or care if you raise prices by $1-2.
                </p>
                <p className="text-sm text-gray-600 italic">
                  <strong>Action:</strong> Increase prices on your most popular items by 10-15%. Test and measure.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">2. Buy Ingredients in Bulk</h3>
                <p className="text-gray-700 mb-2">
                  A 25lb bag of flour costs $0.40/lb. A 5lb bag costs $0.80/lb. Bulk buying can cut ingredient costs by 20-30%.
                </p>
                <p className="text-sm text-gray-600 italic">
                  <strong>Action:</strong> Join Costco/Sam&apos;s Club. Buy non-perishables in bulk. Find wholesale suppliers.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">3. Reduce Waste</h3>
                <p className="text-gray-700 mb-2">
                  Every burnt batch, expired ingredient, or overproduction mistake directly reduces your profit. Track waste for one month—you&apos;ll be shocked.
                </p>
                <p className="text-sm text-gray-600 italic">
                  <strong>Action:</strong> Use FIFO (First In, First Out). Improve your skills. Make to order, not to stock.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">4. Focus on High-Margin Products</h3>
                <p className="text-gray-700 mb-2">
                  Stop making bread (5-15% margin) and focus on custom cakes (40-70% margin). Same work, 3-5x the profit.
                </p>
                <p className="text-sm text-gray-600 italic">
                  <strong>Action:</strong> Analyze profit per hour for each product. Drop the losers. Double down on winners.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">5. Batch Production</h3>
                <p className="text-gray-700 mb-2">
                  Making 5 dozen cookies at once takes 2 hours. Making 1 dozen five times takes 5 hours. Batch = lower labor cost per unit.
                </p>
                <p className="text-sm text-gray-600 italic">
                  <strong>Action:</strong> Group similar orders. Bake in larger batches. Freeze extras.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">6. Upsell & Cross-Sell</h3>
                <p className="text-gray-700 mb-2">
                  &quot;Would you like matching cupcakes with that cake?&quot; increases average order value by 20-30% with minimal extra work.
                </p>
                <p className="text-sm text-gray-600 italic">
                  <strong>Action:</strong> Offer bundles. Suggest add-ons. Create package deals.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">7. Charge for Custom Work</h3>
                <p className="text-gray-700 mb-2">
                  Custom designs, special flavors, rush orders—charge extra. Your time and skill are valuable.
                </p>
                <p className="text-sm text-gray-600 italic">
                  <strong>Action:</strong> Add 20-50% for custom designs. Charge rush fees. Price by complexity.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">8. Improve Your Skills</h3>
                <p className="text-gray-700 mb-2">
                  Faster = lower labor cost. Better = higher prices. Both = higher margins.
                </p>
                <p className="text-sm text-gray-600 italic">
                  <strong>Action:</strong> Take courses. Practice techniques. Time yourself. Get faster.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">9. Track Everything</h3>
                <p className="text-gray-700 mb-2">
                  You can&apos;t improve what you don&apos;t measure. Track costs, time, waste, and margins for every product.
                </p>
                <p className="text-sm text-gray-600 italic">
                  <strong>Action:</strong> Use software (like BakeProfit) to automate tracking. Review monthly.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">10. Minimum Order Values</h3>
                <p className="text-gray-700 mb-2">
                  Small orders kill margins. A $15 minimum ensures every order is worth your time.
                </p>
                <p className="text-sm text-gray-600 italic">
                  <strong>Action:</strong> Set minimums. Offer free delivery over $50. Bundle products.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Card 3 */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <TrendingUp className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Boost Your Margins Automatically</h3>
                  <p className="mb-4">BakeProfit identifies low-margin products, tracks waste, and suggests price adjustments. Increase profits without guesswork.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Improve Your Margins Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 7: Mistakes */}
          <section id="mistakes">
            <h2 className="text-3xl font-bold mb-4">Common Margin-Killing Mistakes</h2>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">Competing on Price</h3>
                <p className="text-gray-700">
                  Trying to be the cheapest kills margins. Compete on quality, service, and uniqueness—not price.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">Not Paying Yourself</h3>
                <p className="text-gray-700">
                  &quot;I made $500 profit!&quot; But you worked 40 hours. That&apos;s $12.50/hour. Include your labor in costs.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">Giving Discounts Too Easily</h3>
                <p className="text-gray-700">
                  A 20% discount on a 30% margin product means you&apos;re working for almost nothing. Protect your margins.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">Making Everything Custom</h3>
                <p className="text-gray-700">
                  Every order is unique = no efficiency gains. Offer standard options with custom upgrades.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  What&apos;s a good profit margin for a home bakery?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  15-30% is normal for home bakeries. Below 15% means you&apos;re underpricing or have high costs. Above 30% is excellent and sustainable.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  How do I increase my profit margin without raising prices?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Reduce costs: buy in bulk, reduce waste, improve efficiency, batch production, focus on high-margin products. A 20% cost reduction has the same effect as a 20% price increase.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  Should I include my labor in profit margin calculations?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Yes! Always include your labor as an expense, even if you&apos;re the owner. Otherwise, you&apos;re not measuring true profitability—you&apos;re just paying yourself from &quot;profit&quot; that isn&apos;t real.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  What&apos;s the difference between markup and margin?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Markup is how much you add to cost. Margin is profit as a percentage of price. Example: $10 cost, $20 price = 100% markup but only 50% margin. Focus on margin, not markup.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  How often should I review my profit margins?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Monthly at minimum. Check margins when ingredient prices change, when you adjust pricing, or when adding new products. Quarterly deep reviews are ideal.
                </p>
              </details>
            </div>
          </section>

          {/* Bottom Line */}
          <section className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">The Bottom Line</h2>
            <p className="text-lg text-rose-100 mb-6">
              Profit margins are the single most important metric for your bakery business. Not revenue. Not how many orders you get. <strong>Profit margin.</strong>
            </p>
            <p className="text-lg text-rose-100 mb-6">
              If you&apos;re a home baker and your margin is below 15%, you&apos;re working too hard for too little. If you&apos;re a retail bakery below 5%, you&apos;re in danger.
            </p>
            <p className="text-lg text-rose-100 mb-8">
              The good news? Small changes make huge differences. A 10% price increase or 20% cost reduction can double your profit. Start tracking today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/bakery-business-tool">
                <Button size="lg" className="bg-white cursor-pointer text-rose-600 hover:bg-rose-50 w-full sm:w-auto">
                  Calculate Your Margins Free →
                </Button>
              </Link>
              <Link href="/tools/recipe-cost-calculator">
                <Button size="lg" variant="outline" className="border-2 cursor-pointer border-white bg-rose-600 text-white hover:bg-rose-600 w-full sm:w-auto">
                  Try Free Calculator
                </Button>
              </Link>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/track-ingredient-costs" className="border rounded-lg p-6 hover:border-rose-500 transition-colors">
                <h3 className="font-bold text-lg mb-2">How to Track Ingredient Costs</h3>
                <p className="text-gray-600 text-sm">Learn how to track costs, handle price fluctuations, and boost profits.</p>
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
