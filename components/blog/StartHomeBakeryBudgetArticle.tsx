'use client'

import Link from 'next/link'
import { Calculator, CheckCircle, AlertTriangle, FileText, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '../layout/Footer'

export default function StartHomeBakeryBudgetArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → How to Start a Home Bakery with $500 or Less
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          How to Start a Home Bakery with $500 or Less
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Feb 4, 2025</span> • <span>18 min read</span> • <span className="text-rose-600 font-semibold">Getting Started</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            Think you need thousands of dollars to start a bakery? Think again.
          </p>

          <p className="text-xl text-gray-700">
            You can launch a profitable home bakery with just $500—or even less if you already have basic kitchen equipment. No commercial kitchen. No employees. No massive loans. Just you, your home kitchen, and a smart plan.
          </p>

          <p className="text-lg text-gray-700">
            In this guide, I&apos;ll show you exactly how to start a home bakery on a shoestring budget, what you absolutely need (and what you don&apos;t), how to navigate cottage food laws, and how to get your first customers without spending a fortune on marketing. Let&apos;s get started.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Calculator className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Free Tools to Start Your Bakery</h3>
                  <p className="mb-4">Use BakeProfit&apos;s free recipe cost calculator and order tracking to manage your new bakery—no credit card required.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <div className="bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li><a href="#reality-check" className="hover:text-rose-600">Reality Check: Can You Really Start for $500?</a></li>
              <li><a href="#cottage-food" className="hover:text-rose-600">Understanding Cottage Food Laws</a></li>
              <li><a href="#budget-breakdown" className="hover:text-rose-600">Your $500 Budget Breakdown</a></li>
              <li><a href="#equipment" className="hover:text-rose-600">Essential Equipment (What You Really Need)</a></li>
              <li><a href="#legal" className="hover:text-rose-600">Legal Requirements & Permits</a></li>
              <li><a href="#first-products" className="hover:text-rose-600">Choosing Your First Products</a></li>
              <li><a href="#pricing" className="hover:text-rose-600">How to Price for Profit from Day One</a></li>
              <li><a href="#first-customers" className="hover:text-rose-600">Getting Your First 10 Customers (Free Marketing)</a></li>
              <li><a href="#scaling" className="hover:text-rose-600">When and How to Scale Up</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* Section 1: Reality Check */}
          <section id="reality-check">
            <h2 className="text-3xl font-bold mb-4">Reality Check: Can You Really Start for $500?</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Yes—but with some important caveats.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                What $500 CAN Get You
              </h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• Legal permits and licenses to operate</li>
                <li>• Essential packaging and labeling supplies</li>
                <li>• Ingredients for your first 20-30 products</li>
                <li>• Basic marketing materials (business cards, social media setup)</li>
                <li>• A few key equipment upgrades (if needed)</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                What You Need to Already Have
              </h3>
              <p className="text-gray-700 mb-3">
                To start with just $500, you should already own:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• A working oven and stovetop</li>
                <li>• Basic mixing bowls, measuring cups, and utensils</li>
                <li>• At least 2-3 baking pans</li>
                <li>• A refrigerator and freezer</li>
                <li>• Basic storage containers</li>
              </ul>
              <p className="text-gray-700 mt-3">
                <strong>Don&apos;t have these?</strong> You can still start, but budget $200-300 more for used equipment from thrift stores or Facebook Marketplace.
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">The Honest Truth</h3>
              <p className="text-gray-700 mb-3">
                Starting a home bakery for $500 is absolutely possible—thousands of bakers have done it. But success depends on:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Starting small:</strong> 1-2 products, not a full menu</li>
                <li>• <strong>Using what you have:</strong> Your existing kitchen equipment</li>
                <li>• <strong>Reinvesting profits:</strong> Every dollar you make goes back into the business initially</li>
                <li>• <strong>Free marketing:</strong> Social media, word-of-mouth, local events</li>
                <li>• <strong>Smart pricing:</strong> Charging enough to be profitable from day one</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Cottage Food Laws */}
          <section id="cottage-food">
            <h2 className="text-3xl font-bold mb-4">Understanding Cottage Food Laws</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Before you spend a single dollar, you MUST understand your state&apos;s cottage food laws. These laws determine what you can sell, where you can sell it, and how much you can earn from your home kitchen.
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">What Are Cottage Food Laws?</h3>
              <p className="text-gray-700 mb-3">
                Cottage food laws allow you to make and sell certain &quot;non-hazardous&quot; foods from your home kitchen without needing a commercial kitchen or expensive health department inspections.
              </p>
              <p className="text-gray-700">
                These laws vary SIGNIFICANTLY by state. Some states are very permissive, others are restrictive.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">✅ Usually Allowed</h3>
                <ul className="text-gray-700 space-y-1 ml-6">
                  <li>• Cookies and brownies</li>
                  <li>• Cakes and cupcakes</li>
                  <li>• Bread and rolls</li>
                  <li>• Muffins and scones</li>
                  <li>• Dry baked goods</li>
                  <li>• Certain candies</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">❌ Usually NOT Allowed</h3>
                <ul className="text-gray-700 space-y-1 ml-6">
                  <li>• Cream-filled pastries</li>
                  <li>• Cheesecakes</li>
                  <li>• Custards and puddings</li>
                  <li>• Meat pies</li>
                  <li>• Canned goods</li>
                  <li>• Refrigerated items</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Key Restrictions to Know</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Sales limits:</strong> Many states cap annual sales at $15,000-$50,000</li>
                <li>• <strong>Where you can sell:</strong> Some states only allow direct sales (farmers markets, home pickup), not online shipping</li>
                <li>• <strong>Labeling requirements:</strong> Most states require specific labels with ingredients, allergens, and a cottage food disclaimer</li>
                <li>• <strong>Training:</strong> Some states require food safety courses</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">🔍 How to Find Your State&apos;s Laws</h3>
              <p className="text-gray-700 mb-3">
                <strong>Step 1:</strong> Google &quot;[Your State] cottage food laws&quot;
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Step 2:</strong> Visit your state&apos;s Department of Agriculture or Department of Health website
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Step 3:</strong> Look for the list of allowed foods, sales limits, and permit requirements
              </p>
              <p className="text-gray-700 font-semibold">
                <strong>IMPORTANT:</strong> Don&apos;t skip this step! Operating without proper permits can result in fines and being shut down.
              </p>
            </div>
          </section>

          {/* Section 3: Budget Breakdown */}
          <section id="budget-breakdown">
            <h2 className="text-3xl font-bold mb-4">Your $500 Budget Breakdown</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Here&apos;s exactly how to allocate your $500 startup budget for maximum impact:
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">The $500 Startup Budget</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between pb-3 border-b-2">
                  <div>
                    <p className="font-bold text-gray-900">1. Legal & Permits</p>
                    <p className="text-sm text-gray-600">Cottage food license, business registration</p>
                  </div>
                  <span className="font-bold text-blue-600 text-lg">$50-150</span>
                </div>

                <div className="flex justify-between pb-3 border-b-2">
                  <div>
                    <p className="font-bold text-gray-900">2. Packaging & Labels</p>
                    <p className="text-sm text-gray-600">Boxes, bags, stickers, ribbons</p>
                  </div>
                  <span className="font-bold text-blue-600 text-lg">$100-150</span>
                </div>

                <div className="flex justify-between pb-3 border-b-2">
                  <div>
                    <p className="font-bold text-gray-900">3. Initial Ingredients</p>
                    <p className="text-sm text-gray-600">Bulk flour, sugar, butter, eggs (first 20-30 products)</p>
                  </div>
                  <span className="font-bold text-blue-600 text-lg">$150-200</span>
                </div>

                <div className="flex justify-between pb-3 border-b-2">
                  <div>
                    <p className="font-bold text-gray-900">4. Marketing Materials</p>
                    <p className="text-sm text-gray-600">Business cards, social media graphics</p>
                  </div>
                  <span className="font-bold text-blue-600 text-lg">$30-50</span>
                </div>

                <div className="flex justify-between pb-3 border-b-2">
                  <div>
                    <p className="font-bold text-gray-900">5. Small Equipment Upgrades</p>
                    <p className="text-sm text-gray-600">Extra pans, cooling racks, containers</p>
                  </div>
                  <span className="font-bold text-blue-600 text-lg">$50-100</span>
                </div>

                <div className="flex justify-between pb-3 border-b-2">
                  <div>
                    <p className="font-bold text-gray-900">6. Emergency Buffer</p>
                    <p className="text-sm text-gray-600">Unexpected costs, ingredient replacements</p>
                  </div>
                  <span className="font-bold text-blue-600 text-lg">$50</span>
                </div>

                <div className="flex justify-between pt-3">
                  <p className="font-bold text-xl text-gray-900">TOTAL:</p>
                  <span className="font-bold text-rose-600 text-2xl">$430-700</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">💡 How to Stay Under $500</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• Check if your state offers free or low-cost cottage food registration</li>
                <li>• Buy packaging in bulk from wholesale suppliers (cheaper per unit)</li>
                <li>• Start with just ONE product to minimize ingredient costs</li>
                <li>• Use free design tools like Canva for marketing materials</li>
                <li>• Skip equipment upgrades initially—use what you have</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Essential Equipment */}
          <section id="equipment">
            <h2 className="text-3xl font-bold mb-4">Essential Equipment (What You Really Need)</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Good news: You probably already have 80% of what you need. Here&apos;s what&apos;s truly essential vs. nice-to-have:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">✅ Must-Have (Day 1)</h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Oven:</strong> Your home oven works fine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Mixing bowls:</strong> 3-4 various sizes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Measuring tools:</strong> Cups, spoons, kitchen scale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Baking pans:</strong> 2-3 sheet pans or cake pans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Cooling racks:</strong> 2-3 racks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Storage containers:</strong> Airtight for ingredients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Basic utensils:</strong> Spatulas, whisks, spoons</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4 font-semibold">
                  Total cost if buying used: <strong>$50-100</strong>
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">⭐ Nice-to-Have (Later)</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Stand mixer:</strong> Hand mixer works for now ($200-400)</li>
                  <li>• <strong>Food processor:</strong> Not essential initially ($50-150)</li>
                  <li>• <strong>Piping bags & tips:</strong> Only if decorating cakes ($20-40)</li>
                  <li>• <strong>Extra oven:</strong> Buy when you&apos;re scaling ($100-300 used)</li>
                  <li>• <strong>Commercial pans:</strong> Home pans work fine ($30-60)</li>
                  <li>• <strong>Thermometers:</strong> Helpful but not critical ($15-30)</li>
                </ul>
                <p className="text-gray-700 mt-4 font-semibold">
                  Buy these as you grow and reinvest profits
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">💰 Where to Find Cheap Equipment</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Thrift stores:</strong> Goodwill, Salvation Army (pans, bowls, utensils)</li>
                <li>• <strong>Facebook Marketplace:</strong> Local sellers often have barely-used equipment</li>
                <li>• <strong>Restaurant supply stores:</strong> Cheaper than retail for basics</li>
                <li>• <strong>Dollar stores:</strong> Great for measuring cups, spatulas, containers</li>
                <li>• <strong>Estate sales:</strong> Full kitchen setups at low prices</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Legal Requirements */}
          <section id="legal">
            <h2 className="text-3xl font-bold mb-4">Legal Requirements & Permits</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Let&apos;s get the legal stuff out of the way. Here&apos;s what you typically need:
            </p>

            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <FileText className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">1. Cottage Food License/Permit</h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Cost:</strong> $0-$150 (varies by state)
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Where to get it:</strong> Your state&apos;s Department of Agriculture or Health Department
                    </p>
                    <p className="text-gray-700">
                      <strong>What it covers:</strong> Legal permission to make and sell cottage foods from your home kitchen
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <FileText className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">2. Business License (Optional in Some States)</h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Cost:</strong> $0-$50
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Where to get it:</strong> Your city or county clerk&apos;s office
                    </p>
                    <p className="text-gray-700">
                      <strong>What it covers:</strong> General permission to operate a business in your area
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <FileText className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">3. Food Handler&apos;s Certificate (Some States)</h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Cost:</strong> $10-$30
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Where to get it:</strong> Online courses (ServSafe, 360training.com)
                    </p>
                    <p className="text-gray-700">
                      <strong>What it covers:</strong> Food safety training and certification
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">💡 Pro Tip: Start Simple</h3>
              <p className="text-gray-700">
                Don&apos;t form an LLC or get business insurance on day one. Start as a sole proprietor under cottage food laws. Once you&apos;re making consistent sales (3-6 months), then consider upgrading your legal structure and getting insurance.
              </p>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <TrendingUp className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Price Your Products Correctly from Day One</h3>
                  <p className="mb-4">Use our free recipe cost calculator to ensure you&apos;re profitable from your very first sale.</p>
                  <Link href="/tools/recipe-cost-calculator">
                    <Button className="bg-rose-500 hover:bg-rose-600">Try Free Calculator →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Choosing First Products */}
          <section id="first-products">
            <h2 className="text-3xl font-bold mb-4">Choosing Your First Products</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Start with 1-2 products maximum. Here&apos;s how to choose wisely:
            </p>

            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Best Starter Products (Low Cost, High Demand)</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Cookies:</strong> Low ingredient cost ($0.30-0.50 each), easy to package, long shelf life, high demand
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Brownies:</strong> Simple recipe, minimal equipment, great margins
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Banana bread/muffins:</strong> Uses common ingredients, travels well
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">⚠️ Avoid These Initially</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Custom cakes:</strong> Time-intensive, expensive ingredients, hard to price</li>
                <li>• <strong>Macarons:</strong> Difficult technique, expensive ingredients, high failure rate</li>
                <li>• <strong>Anything refrigerated:</strong> May not be allowed under cottage food laws</li>
              </ul>
            </div>
          </section>

          {/* Section 7: Pricing */}
          <section id="pricing">
            <h2 className="text-3xl font-bold mb-4">How to Price for Profit from Day One</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              This is CRITICAL. Underpricing is the #1 reason home bakeries fail. Here&apos;s the formula:
            </p>

            <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">The Pricing Formula</h3>
              <div className="space-y-2 font-mono text-sm">
                <p>1. Ingredient cost per unit</p>
                <p>2. + Packaging cost</p>
                <p>3. + Labor (your time × desired hourly rate)</p>
                <p>4. + Overhead (portion of monthly costs)</p>
                <p className="pt-2 border-t-2">= <strong>Total Cost</strong></p>
                <p className="pt-2">Total Cost × 2.5 = <strong className="text-rose-600">Your Selling Price</strong></p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Example: Chocolate Chip Cookies</h3>
              <div className="space-y-2">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Ingredients (per dozen):</span>
                  <span className="font-semibold">$3.50</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Packaging (box, label):</span>
                  <span className="font-semibold">$1.00</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Labor (30 min × $20/hr):</span>
                  <span className="font-semibold">$10.00</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Overhead (allocated):</span>
                  <span className="font-semibold">$1.50</span>
                </div>
                <div className="flex justify-between pt-2 pb-2 border-b-2 border-gray-400">
                  <span className="font-bold">Total Cost:</span>
                  <span className="font-bold text-blue-600">$16.00</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-bold text-lg">Selling Price (×2.5):</span>
                  <span className="font-bold text-rose-600 text-2xl">$40/dozen</span>
                </div>
              </div>
              <p className="text-gray-700 mt-4 text-sm">
                This gives you a 60% profit margin and pays you $20/hour for your time.
              </p>
            </div>

            <p className="text-gray-700 mb-3">
              <strong>Read more:</strong> <Link href="/blog/how-to-calculate-recipe-cost" className="text-rose-600 hover:underline">How to Calculate Recipe Cost: The Complete Guide</Link>
            </p>
          </section>

          {/* Section 8: First Customers */}
          <section id="first-customers">
            <h2 className="text-3xl font-bold mb-4">Getting Your First 10 Customers (Free Marketing)</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              You don&apos;t need to spend money on ads. Here&apos;s how to get your first customers for free:
            </p>

            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">1. Friends & Family (Your First 5 Sales)</h3>
                <p className="text-gray-700 mb-3">
                  Start here, but charge FULL PRICE. No freebies. Tell them you&apos;re starting a business and ask for honest feedback and reviews.
                </p>
                <p className="text-gray-700 font-semibold">
                  Goal: Get 5 sales + 5 testimonials in your first week
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">2. Social Media (Instagram & Facebook)</h3>
                <p className="text-gray-700 mb-3">
                  Create a business page. Post photos of your products. Use local hashtags. Join local buy/sell groups.
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>What to post:</strong>
                </p>
                <ul className="text-gray-700 space-y-1 ml-6">
                  <li>• Product photos with prices</li>
                  <li>• Behind-the-scenes baking videos</li>
                  <li>• Customer testimonials</li>
                  <li>• Order availability announcements</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">3. Local Events & Farmers Markets</h3>
                <p className="text-gray-700 mb-3">
                  Many farmers markets have low booth fees ($20-50/day). This gets you in front of hundreds of potential customers.
                </p>
                <p className="text-gray-700 font-semibold">
                  Tip: Offer samples to attract buyers
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">4. Word of Mouth</h3>
                <p className="text-gray-700 mb-3">
                  Ask every customer to refer a friend. Offer a small discount (10%) for referrals.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9: Scaling */}
          <section id="scaling">
            <h2 className="text-3xl font-bold mb-4">When and How to Scale Up</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Don&apos;t rush to scale. Here&apos;s when you&apos;re ready:
            </p>

            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">✅ You&apos;re Ready to Scale When:</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• You&apos;re consistently selling 15-20+ products per week</li>
                <li>• You&apos;re turning down orders because you&apos;re at capacity</li>
                <li>• You have 3+ months of consistent profit</li>
                <li>• You&apos;ve saved enough to reinvest (at least $500-1000)</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-xl">Smart Scaling Steps:</h3>
              <div className="bg-white border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-1">Step 1: Buy a stand mixer ($200-400)</p>
                <p className="text-gray-700 text-sm">Increases efficiency by 50%</p>
              </div>
              <div className="bg-white border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-1">Step 2: Add 1-2 more products</p>
                <p className="text-gray-700 text-sm">Diversify your offerings</p>
              </div>
              <div className="bg-white border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-1">Step 3: Upgrade to Pro software ($7/month)</p>
                <p className="text-gray-700 text-sm">Track unlimited orders and recipes</p>
              </div>
              <div className="bg-white border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-1">Step 4: Get business insurance ($300-500/year)</p>
                <p className="text-gray-700 text-sm">Protect yourself as you grow</p>
              </div>
            </div>

            <p className="text-gray-700 mt-6">
              <strong>Read more:</strong> <Link href="/blog/break-even-analysis" className="text-rose-600 hover:underline">Break-Even Analysis: When Do You Start Making Money?</Link>
            </p>
          </section>

          {/* Section 10: FAQ */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Can I really start a profitable bakery with just $500?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Yes, if you already have basic kitchen equipment and you start small (1-2 products). The $500 covers permits, packaging, initial ingredients, and marketing. Many successful home bakers started with even less.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Do I need a commercial kitchen?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> No! That&apos;s the beauty of cottage food laws. You can legally bake and sell from your home kitchen for most dry baked goods. Check your state&apos;s specific laws.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How long until I make my money back?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> If you price correctly and get 10-15 sales in your first month, you should break even within 30-60 days. After that, it&apos;s profit.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if I don&apos;t have any customers yet?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Start with friends and family, then leverage social media and local events. Every successful bakery started with zero customers. Focus on quality and word-of-mouth will follow.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Should I quit my job to do this?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> NO! Start as a side hustle. Once you&apos;re consistently making $2,000-3,000/month profit for 6+ months, then consider going full-time.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Ready to Start Your $500 Home Bakery?</h2>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              Use BakeProfit&apos;s free tools to calculate costs, track orders, and manage your new bakery from day one. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools/recipe-cost-calculator">
                <Button className="bg-white text-rose-600 hover:bg-gray-50 border-2 border-rose-600 px-8 py-6 text-lg">
                  Try Free Calculator
                </Button>
              </Link>
              <Link href="/bakery-business-tool">
                <Button className="bg-rose-500 hover:bg-rose-600 px-8 py-6 text-lg">
                  Start Your Bakery Free →
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
                <p className="text-gray-600 text-sm">Learn the exact formula to price your products profitably from day one.</p>
              </Link>
              <Link href="/blog/break-even-analysis" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Break-Even Analysis for Bakers</h4>
                <p className="text-gray-600 text-sm">Know exactly when your bakery becomes profitable.</p>
              </Link>
              <Link href="/blog/pricing-mistakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">The 3 Biggest Pricing Mistakes</h4>
                <p className="text-gray-600 text-sm">Avoid the mistakes that kill most home bakeries.</p>
              </Link>
              <Link href="/blog/true-hourly-rate" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Calculate Your True Hourly Rate</h4>
                <p className="text-gray-600 text-sm">Know what you&apos;re really making per hour.</p>
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
