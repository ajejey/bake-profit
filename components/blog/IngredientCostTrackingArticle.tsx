'use client'

import Link from 'next/link'
import { ChefHat, Calculator, TrendingUp, AlertCircle, CheckCircle, ClipboardList, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function IngredientCostTrackingArticle() {
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
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → Track Ingredient Costs
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          How to Track Ingredient Costs for Your Home Bakery (2025 Guide)
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Jan 28, 2025</span> • <span>14 min read</span> • <span className="text-rose-600 font-semibold">Inventory Management</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            Last month, butter prices jumped 25%. Did you notice? Did you adjust your prices? Or did you just absorb the loss and wonder why your profits disappeared?
          </p>

          <p className="text-lg text-gray-700">
            Most home bakers don&apos;t track ingredient costs. They buy flour when it&apos;s on sale, grab eggs at the grocery store, and hope for the best. Then they wonder why they&apos;re working 40 hours a week but barely breaking even.
          </p>

          <p className="text-lg text-gray-700">
            Here&apos;s the truth: <strong>You can&apos;t manage what you don&apos;t measure.</strong> If you&apos;re not tracking ingredient costs, you&apos;re flying blind. You don&apos;t know which products are profitable, when to raise prices, or where your money is going.
          </p>

          <p className="text-lg text-gray-700">
            This guide will show you exactly how to track ingredient costs like a professional bakery—without spending hours on spreadsheets or hiring an accountant.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <ClipboardList className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Track Ingredient Costs Automatically</h3>
                  <p className="mb-4">BakeProfit tracks ingredient prices, alerts you to price changes, and updates recipe costs automatically. Free for up to 20 ingredients.</p>
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
              <li><a href="#why-track" className="hover:text-rose-600">Why Track Ingredient Costs?</a></li>
              <li><a href="#what-track" className="hover:text-rose-600">What to Track (Beyond Just Prices)</a></li>
              <li><a href="#methods" className="hover:text-rose-600">5 Methods to Track Ingredient Costs</a></li>
              <li><a href="#setup" className="hover:text-rose-600">How to Set Up Your Tracking System</a></li>
              <li><a href="#price-changes" className="hover:text-rose-600">Dealing with Price Fluctuations</a></li>
              <li><a href="#waste" className="hover:text-rose-600">Tracking Waste and Spoilage</a></li>
              <li><a href="#automation" className="hover:text-rose-600">Automating Your Ingredient Tracking</a></li>
              <li><a href="#mistakes" className="hover:text-rose-600">Common Tracking Mistakes to Avoid</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* Section 1: Why Track */}
          <section id="why-track">
            <h2 className="text-3xl font-bold mb-4">Why Track Ingredient Costs?</h2>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">The Hidden Cost of Not Tracking</h3>
            <p className="text-lg text-gray-700 mb-4">
              Let&apos;s say you make chocolate chip cookies. You calculated the cost 6 months ago: $1.50 per dozen. You&apos;ve been selling them for $18/dozen ever since.
            </p>

            <p className="text-lg text-gray-700 mb-4">
              But in those 6 months:
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mb-6">
              <ul className="space-y-2 text-gray-800">
                <li>• Butter went from $4/lb to $5.50/lb (+38%)</li>
                <li>• Chocolate chips increased from $8/bag to $10/bag (+25%)</li>
                <li>• Eggs jumped from $3/dozen to $4.50/dozen (+50%)</li>
              </ul>
              <p className="mt-4 font-semibold">
                Your actual cost per dozen is now $2.10—not $1.50. You&apos;re making $0.60 less profit on every dozen you sell.
              </p>
              <p className="mt-2 text-red-700 font-bold">
                If you sell 100 dozen per month, that&apos;s $60/month or $720/year in lost profit.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">What Tracking Gives You</h3>
            <ul className="space-y-3 mb-6 ml-6 text-gray-700">
              <li>• <strong>Accurate pricing:</strong> Know your true costs so you can price for profit</li>
              <li>• <strong>Early warning system:</strong> Catch price increases before they hurt your margins</li>
              <li>• <strong>Better purchasing decisions:</strong> Know when to buy in bulk vs. wait for sales</li>
              <li>• <strong>Product profitability:</strong> See which items make money and which don&apos;t</li>
              <li>• <strong>Waste reduction:</strong> Track what you&apos;re throwing away and why</li>
              <li>• <strong>Tax deductions:</strong> Proper records = maximum deductions</li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">Success Story:</p>
              <p className="text-gray-700">
                Maria started tracking ingredient costs in January. By March, she discovered her &quot;signature&quot; red velvet cupcakes were actually losing money—cream cheese had doubled in price. She adjusted her pricing and switched to a different supplier. Result: $400/month more profit.
              </p>
            </div>
          </section>

          {/* Section 2: What to Track */}
          <section id="what-track">
            <h2 className="text-3xl font-bold mb-4">What to Track (Beyond Just Prices)</h2>
            <p className="text-lg text-gray-700 mb-6">
              Tracking ingredient costs isn&apos;t just about writing down prices. Here&apos;s everything you should monitor:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="border-2 border-rose-200 rounded-lg p-6 bg-rose-50">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Essential Data</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Purchase price</li>
                  <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Purchase date</li>
                  <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Quantity bought</li>
                  <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Unit size (5lb bag, 12oz, etc.)</li>
                  <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Price per unit ($/oz, $/lb)</li>
                  <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Supplier/store</li>
                </ul>
              </div>

              <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Advanced Tracking</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><CheckCircle className="inline h-4 w-4 text-blue-600 mr-2" />Expiration dates</li>
                  <li><CheckCircle className="inline h-4 w-4 text-blue-600 mr-2" />Storage location</li>
                  <li><CheckCircle className="inline h-4 w-4 text-blue-600 mr-2" />Current inventory level</li>
                  <li><CheckCircle className="inline h-4 w-4 text-blue-600 mr-2" />Reorder point</li>
                  <li><CheckCircle className="inline h-4 w-4 text-blue-600 mr-2" />Waste/spoilage amounts</li>
                  <li><CheckCircle className="inline h-4 w-4 text-blue-600 mr-2" />Price history/trends</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2"><AlertCircle className="inline h-5 w-5 mr-2" />Pro Tip:</p>
              <p className="text-gray-700">
                Start with the essentials (price, date, quantity). You can always add more detail later. The key is to start tracking <em>something</em> rather than waiting for the perfect system.
              </p>
            </div>
          </section>

          {/* Section 3: Methods */}
          <section id="methods">
            <h2 className="text-3xl font-bold mb-4">5 Methods to Track Ingredient Costs</h2>
            <p className="text-lg text-gray-700 mb-6">
              Choose the method that fits your business size and tech comfort level:
            </p>

            <div className="space-y-6">
              <div className="border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 text-xl">1. Receipt Folder Method (Beginner)</h3>
                <p className="text-gray-700 mb-3">
                  <strong>How it works:</strong> Keep all ingredient receipts in a folder. Review monthly to spot price changes.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-green-700 mb-1">✓ Pros:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Zero learning curve</li>
                      <li>• No tech required</li>
                      <li>• Better than nothing</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700 mb-1">✗ Cons:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Hard to spot trends</li>
                      <li>• Time-consuming to analyze</li>
                      <li>• Easy to lose receipts</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600"><strong>Best for:</strong> Brand new bakers just starting out</p>
              </div>

              <div className="border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 text-xl">2. Notebook/Journal Method (Beginner)</h3>
                <p className="text-gray-700 mb-3">
                  <strong>How it works:</strong> Write down ingredient purchases in a dedicated notebook with date, item, price, and quantity.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-green-700 mb-1">✓ Pros:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Simple and portable</li>
                      <li>• No tech needed</li>
                      <li>• Easy to reference</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700 mb-1">✗ Cons:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Manual calculations</li>
                      <li>• No automatic alerts</li>
                      <li>• Can&apos;t sort or filter</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600"><strong>Best for:</strong> Low-volume bakers (1-10 orders/month)</p>
              </div>

              <div className="border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 text-xl">3. Spreadsheet Method (Intermediate)</h3>
                <p className="text-gray-700 mb-3">
                  <strong>How it works:</strong> Create an Excel or Google Sheets with columns for ingredient, date, price, quantity, unit cost, and supplier.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-green-700 mb-1">✓ Pros:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Can calculate automatically</li>
                      <li>• Sort and filter data</li>
                      <li>• Create charts/graphs</li>
                      <li>• Free (Google Sheets)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700 mb-1">✗ Cons:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Requires setup time</li>
                      <li>• Manual data entry</li>
                      <li>• Easy to make errors</li>
                      <li>• No automatic updates</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600"><strong>Best for:</strong> Growing bakers (10-50 orders/month) comfortable with spreadsheets</p>
              </div>

              <div className="border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 text-xl">4. Accounting Software Method (Intermediate)</h3>
                <p className="text-gray-700 mb-3">
                  <strong>How it works:</strong> Use QuickBooks, FreshBooks, or Wave to track all business expenses including ingredients.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-green-700 mb-1">✓ Pros:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Professional reporting</li>
                      <li>• Tax-ready records</li>
                      <li>• Bank integration</li>
                      <li>• Expense categorization</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700 mb-1">✗ Cons:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Monthly cost ($15-30)</li>
                      <li>• Learning curve</li>
                      <li>• Not bakery-specific</li>
                      <li>• Overkill for small operations</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600"><strong>Best for:</strong> Established bakeries with multiple revenue streams</p>
              </div>

              <div className="border-2 border-rose-300 rounded-lg p-6 bg-rose-50">
                <h3 className="font-bold text-gray-900 mb-2 text-xl">5. Bakery Management Software (Advanced - Recommended)</h3>
                <p className="text-gray-700 mb-3">
                  <strong>How it works:</strong> Purpose-built software that tracks ingredients, calculates recipe costs, and updates prices automatically.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-green-700 mb-1">✓ Pros:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Automatic cost calculations</li>
                      <li>• Price change alerts</li>
                      <li>• Recipe cost updates</li>
                      <li>• Inventory tracking</li>
                      <li>• Waste tracking</li>
                      <li>• Profit margin analysis</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700 mb-1">✗ Cons:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• May have monthly cost</li>
                      <li>• Initial setup required</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600"><strong>Best for:</strong> Serious home bakers and small bakeries (20+ orders/month)</p>
                <div className="mt-4">
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Try BakeProfit Free →</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Card 2 */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Calculator className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Stop Guessing, Start Tracking</h3>
                  <p className="mb-4">BakeProfit automatically tracks ingredient costs, updates recipe prices, and alerts you to price changes. Free for up to 5 recipes.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Setup */}
          <section id="setup">
            <h2 className="text-3xl font-bold mb-4">How to Set Up Your Tracking System</h2>
            <p className="text-lg text-gray-700 mb-6">
              Regardless of which method you choose, follow these steps to get started:
            </p>

            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3">Step 1: List All Your Ingredients</h3>
                <p className="text-gray-700 mb-3">
                  Make a master list of every ingredient you use regularly. Include:
                </p>
                <ul className="space-y-1 text-gray-700 ml-6">
                  <li>• Flour (all-purpose, bread, cake, etc.)</li>
                  <li>• Sugars (granulated, brown, powdered)</li>
                  <li>• Fats (butter, oil, shortening)</li>
                  <li>• Eggs and dairy</li>
                  <li>• Leavening agents (baking powder, yeast)</li>
                  <li>• Flavorings (vanilla, almond extract)</li>
                  <li>• Add-ins (chocolate chips, nuts, dried fruit)</li>
                  <li>• Specialty items (food coloring, fondant)</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3">Step 2: Record Current Prices</h3>
                <p className="text-gray-700 mb-3">
                  Go through your pantry and record the current price of each ingredient. Check:
                </p>
                <ul className="space-y-1 text-gray-700 ml-6">
                  <li>• Recent receipts</li>
                  <li>• Online store prices</li>
                  <li>• Your usual suppliers</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Calculate the price per unit ($/oz or $/lb) for each item.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3">Step 3: Set Up Your Tracking Tool</h3>
                <p className="text-gray-700 mb-3">
                  Whether it&apos;s a notebook, spreadsheet, or software:
                </p>
                <ul className="space-y-1 text-gray-700 ml-6">
                  <li>• Create columns/fields for all essential data</li>
                  <li>• Enter your current ingredient list</li>
                  <li>• Add current prices and purchase dates</li>
                  <li>• Set up any formulas (if using spreadsheet)</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3">Step 4: Create a Routine</h3>
                <p className="text-gray-700 mb-3">
                  Tracking only works if you do it consistently. Set up a system:
                </p>
                <ul className="space-y-1 text-gray-700 ml-6">
                  <li>• <strong>After every purchase:</strong> Log the new price immediately</li>
                  <li>• <strong>Weekly:</strong> Review inventory levels</li>
                  <li>• <strong>Monthly:</strong> Analyze price trends and update recipe costs</li>
                  <li>• <strong>Quarterly:</strong> Review and adjust your pricing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Price Changes */}
          <section id="price-changes">
            <h2 className="text-3xl font-bold mb-4">Dealing with Price Fluctuations</h2>
            <p className="text-lg text-gray-700 mb-6">
              Ingredient prices don&apos;t stay stable. Here&apos;s how to handle changes:
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">When to Update Your Prices</h3>
            <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded mb-6">
              <p className="font-bold text-gray-900 mb-3">The 5% Rule:</p>
              <p className="text-gray-700">
                If your ingredient costs increase by 5% or more, it&apos;s time to raise your prices. Don&apos;t wait until you&apos;re losing money.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Strategies for Managing Price Increases</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-rose-500 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">1. Buy in Bulk (When Smart)</h4>
                <p className="text-gray-700">
                  If you notice prices rising, buy extra of non-perishable items like flour, sugar, and chocolate chips. But only if you&apos;ll use them before they expire.
                </p>
              </div>

              <div className="border-l-4 border-rose-500 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">2. Find Alternative Suppliers</h4>
                <p className="text-gray-700">
                  Track prices at multiple stores. Costco might have cheaper butter, while your local bakery supply has better flour prices.
                </p>
              </div>

              <div className="border-l-4 border-rose-500 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">3. Adjust Recipes (Carefully)</h4>
                <p className="text-gray-700">
                  Can you use less expensive chocolate chips without sacrificing quality? Test before making changes to customer favorites.
                </p>
              </div>

              <div className="border-l-4 border-rose-500 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">4. Raise Prices Strategically</h4>
                <p className="text-gray-700">
                  Don&apos;t apologize for price increases. Communicate value: &quot;We use premium ingredients&quot; or &quot;Prices reflect current market costs.&quot;
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Waste */}
          <section id="waste">
            <h2 className="text-3xl font-bold mb-4">Tracking Waste and Spoilage</h2>
            <p className="text-lg text-gray-700 mb-6">
              Waste is a hidden cost killer. Track it to reduce it.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Types of Waste to Track</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Ingredient Spoilage</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Expired dairy products</li>
                  <li>• Moldy flour or nuts</li>
                  <li>• Stale chocolate chips</li>
                  <li>• Dried-out fondant</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Production Waste</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Burnt batches</li>
                  <li>• Broken cookies</li>
                  <li>• Leftover dough scraps</li>
                  <li>• Failed decorations</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mb-6">
              <p className="font-bold text-gray-900 mb-2">The True Cost of Waste</p>
              <p className="text-gray-700 mb-3">
                If you throw away $20 worth of ingredients per month, that&apos;s $240/year. But it&apos;s actually worse:
              </p>
              <ul className="text-gray-700 space-y-1 ml-6">
                <li>• You paid for those ingredients (cash out)</li>
                <li>• You spent time making them (labor cost)</li>
                <li>• You can&apos;t sell them (lost revenue)</li>
              </ul>
              <p className="text-gray-700 mt-3 font-semibold">
                That $20 in waste might actually cost you $60+ in total impact.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">How to Reduce Waste</h3>
            <ul className="space-y-3 mb-6 ml-6 text-gray-700">
              <li>• <strong>FIFO System:</strong> First In, First Out—use older ingredients first</li>
              <li>• <strong>Proper Storage:</strong> Airtight containers, correct temperatures</li>
              <li>• <strong>Buy Right Amounts:</strong> Don&apos;t overbuy perishables</li>
              <li>• <strong>Track Expiration Dates:</strong> Use ingredients before they expire</li>
              <li>• <strong>Improve Skills:</strong> Fewer mistakes = less waste</li>
            </ul>
          </section>

          {/* CTA Card 3 */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <TrendingUp className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Track Waste, Boost Profits</h3>
                  <p className="mb-4">BakeProfit helps you track ingredient waste, identify patterns, and reduce costs. See exactly where your money goes.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Tracking Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 7: Automation */}
          <section id="automation">
            <h2 className="text-3xl font-bold mb-4">Automating Your Ingredient Tracking</h2>
            <p className="text-lg text-gray-700 mb-6">
              Manual tracking works, but automation saves hours and catches what you miss.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">What Automation Can Do</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2"><CheckCircle className="inline h-5 w-5 text-green-600 mr-2" />Automatic Price Updates</h4>
                <p className="text-sm text-gray-700">
                  Software updates recipe costs automatically when you log a new ingredient price. No manual recalculation needed.
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2"><CheckCircle className="inline h-5 w-5 text-green-600 mr-2" />Price Change Alerts</h4>
                <p className="text-sm text-gray-700">
                  Get notified when ingredient costs increase by a certain percentage, so you can adjust prices proactively.
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2"><CheckCircle className="inline h-5 w-5 text-green-600 mr-2" />Inventory Deduction</h4>
                <p className="text-sm text-gray-700">
                  When you make a recipe, ingredients are automatically deducted from inventory. You always know what you have.
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2"><CheckCircle className="inline h-5 w-5 text-green-600 mr-2" />Low Stock Warnings</h4>
                <p className="text-sm text-gray-700">
                  Get alerts when ingredients run low, so you never run out mid-batch.
                </p>
              </div>
            </div>

            <div className="bg-rose-50 border-2 border-rose-300 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Try BakeProfit&apos;s Automated Tracking</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Track up to 20 ingredients free</li>
                <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Automatic recipe cost updates</li>
                <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Price change alerts</li>
                <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Inventory tracking</li>
                <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />No credit card required</li>
              </ul>
              <Link href="/bakery-business-tool">
                <Button className="bg-rose-500 hover:bg-rose-600">Start Tracking Free →</Button>
              </Link>
            </div>
          </section>

          {/* Section 8: Mistakes */}
          <section id="mistakes">
            <h2 className="text-3xl font-bold mb-4">Common Tracking Mistakes to Avoid</h2>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">1. Waiting for the &quot;Perfect&quot; System</h3>
                <p className="text-gray-700">
                  Start with something simple. A notebook is better than nothing. You can always upgrade later.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">2. Not Tracking Small Purchases</h3>
                <p className="text-gray-700">
                  &quot;It&apos;s just $3 for vanilla extract.&quot; Those small purchases add up. Track everything.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">3. Forgetting to Update Regularly</h3>
                <p className="text-gray-700">
                  Tracking once and never updating is useless. Set reminders to review prices monthly.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">4. Not Acting on the Data</h3>
                <p className="text-gray-700">
                  Tracking is pointless if you don&apos;t use the information. When costs go up, raise your prices.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">5. Tracking Too Much Detail</h3>
                <p className="text-gray-700">
                  Don&apos;t track the temperature of your pantry or the exact time you bought flour. Focus on what matters: price, date, quantity.
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
                  How often should I update ingredient prices?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Update prices every time you make a purchase. Review and analyze trends monthly. For volatile ingredients like eggs and butter, check prices weekly.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  Do I need to track every single ingredient?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Yes, eventually. Start with your most expensive ingredients (butter, chocolate, specialty items) and add others over time. Even small ingredients like salt and baking powder add up.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  What if I buy ingredients from multiple stores?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Track the supplier/store for each purchase. This helps you identify the best deals and optimize your shopping. You might find Costco has the best butter prices while your local bakery supply has cheaper flour.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  Should I track ingredients I get for free or on sale?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Track the actual price you paid, even if it was $0 or heavily discounted. But for pricing purposes, use the regular market price—you won&apos;t always get that deal, and you need sustainable pricing.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  How do I handle bulk purchases?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Calculate the price per unit ($/oz or $/lb) for bulk purchases. A 25lb bag of flour for $15 is $0.60/lb. This makes it easy to compare with smaller packages and track usage accurately.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  What&apos;s the fastest way to start tracking today?
                  <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Use BakeProfit&apos;s free tier. Add your ingredients, log current prices, and let the software handle calculations and alerts. Takes 15 minutes to set up, saves hours every month.
                </p>
              </details>
            </div>
          </section>

          {/* Bottom Line */}
          <section className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">The Bottom Line</h2>
            <p className="text-lg text-rose-100 mb-6">
              Tracking ingredient costs isn&apos;t optional if you want a profitable bakery. It&apos;s the difference between guessing and knowing, between losing money and making it.
            </p>
            <p className="text-lg text-rose-100 mb-6">
              Start simple. Track prices when you buy. Review monthly. Adjust your pricing when costs go up. That&apos;s it.
            </p>
            <p className="text-lg text-rose-100 mb-8">
              Or let software do it for you automatically. Either way, start today. Your future self (and bank account) will thank you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/bakery-business-tool">
                <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 w-full sm:w-auto">
                  Start Tracking Free →
                </Button>
              </Link>
              <Link href="/tools/recipe-cost-calculator">
                <Button size="lg" variant="outline" className="border-2 border-white text-rose-600 hover:bg-rose-600 w-full sm:w-auto">
                  Try Free Calculator
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
                <p className="text-gray-600 text-sm">Compare different methods for calculating and tracking recipe costs.</p>
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
