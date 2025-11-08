'use client'

import Link from 'next/link'
import { ArrowLeft, DollarSign, TrendingUp, MapPin, Users, Calendar, Cake, Gift, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function CakePriceSurvey2025Article() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/blog" className="inline-flex items-center text-rose-600 hover:text-rose-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Calendar className="h-4 w-4" />
            <time dateTime="2025-02-06">February 6, 2025</time>
            <span className="mx-2">•</span>
            <span>20 min read</span>
            <span className="mx-2">•</span>
            <span className="text-rose-600 font-semibold">Pricing Guide</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            What Customers Really Pay for Cakes: 2025 Price Survey
          </h1>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            Wondering if you&apos;re charging enough for your cakes? This comprehensive 2025 pricing survey reveals what customers actually pay for wedding cakes, birthday cakes, cupcakes, and custom designs across the United States. Real market data to help you price confidently.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <p className="text-lg text-gray-700 mb-6">
            &quot;Am I charging too much?&quot; &quot;Am I charging too little?&quot; These are the questions that keep bakers up at night. You don&apos;t want to scare away customers with high prices, but you also can&apos;t afford to work for free.
          </p>

          <p className="text-lg text-gray-700 mb-6">
            The good news? There&apos;s real data on what customers are actually paying for cakes in 2025. This isn&apos;t guesswork—it&apos;s based on surveys from wedding planning platforms (Zola, The Knot, Brides), pricing databases (Thumbtack, Fash), and bakery industry reports.
          </p>

          <p className="text-lg text-gray-700 mb-8">
            In this guide, you&apos;ll see exactly what customers pay for different types of cakes, broken down by size, design complexity, and location. Use this data to price your cakes confidently and profitably.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <DollarSign className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Calculate Your Cake Prices Instantly</h3>
                  <p className="mb-4">BakeProfit&apos;s free calculator helps you price cakes based on ingredients, labor, and profit margins. Never undercharge again.</p>
                  <Link href="/tools/recipe-cost-calculator">
                    <Button className="bg-rose-500 hover:bg-rose-600">Try Free Calculator →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 my-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What You&apos;ll Learn</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#wedding-cakes" className="hover:text-rose-600 transition-colors">Wedding Cake Prices (National Average: $917)</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#birthday-cakes" className="hover:text-rose-600 transition-colors">Birthday & Custom Cake Prices ($70-$400)</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#cupcakes" className="hover:text-rose-600 transition-colors">Cupcake Prices ($2-$4 each)</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#sheet-cakes" className="hover:text-rose-600 transition-colors">Sheet Cake Prices ($25-$100)</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#regional-differences" className="hover:text-rose-600 transition-colors">Regional Price Differences (Urban vs Rural)</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#price-factors" className="hover:text-rose-600 transition-colors">What Affects Cake Prices Most</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#pricing-tips" className="hover:text-rose-600 transition-colors">How to Price Your Cakes Confidently</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#faq" className="hover:text-rose-600 transition-colors">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>

          {/* Section 1: Wedding Cakes */}
          <section id="wedding-cakes">
            <h2 className="text-3xl font-bold mb-4">Wedding Cake Prices in 2025</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Wedding cakes are the most researched cake category, so we have the most reliable data here. According to Zola&apos;s 2025 Wedding Cost Index, the <strong>national average for wedding cakes is $917</strong>.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Key Wedding Cake Statistics (2025)</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>National Average:</strong> $917 (Zola)</li>
                <li>• <strong>Typical Range:</strong> $700-$1,100</li>
                <li>• <strong>Per-Slice Pricing:</strong> $3-$8 (standard), $8-$12 (elaborate)</li>
                <li>• <strong>Budget Range:</strong> $300-$700 (WeddingWire)</li>
                <li>• <strong>Premium Range:</strong> $1,000-$1,200+ (major cities)</li>
                <li>• <strong>Percentage of Wedding Budget:</strong> 2% of total wedding cost</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mb-4 mt-8">Wedding Cake Pricing by Tier</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">2-Tier Wedding Cake (Serves 50-75)</h4>
                <p className="text-gray-700 mb-3">
                  <strong>Price Range:</strong> $200-$400
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>What you get:</strong> Simple buttercream finish, classic flavors (vanilla, chocolate, lemon), minimal decoration
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Per slice:</strong> $3-$5
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">3-Tier Wedding Cake (Serves 100-150)</h4>
                <p className="text-gray-700 mb-3">
                  <strong>Price Range:</strong> $300-$800 (most common)
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>What you get:</strong> Buttercream or simple fondant, fresh flowers or basic piping, 2-3 flavor options
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Per slice:</strong> $3-$6
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">4-Tier Wedding Cake (Serves 150-200+)</h4>
                <p className="text-gray-700 mb-3">
                  <strong>Price Range:</strong> $600-$1,500+
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>What you get:</strong> Fondant finish, sugar flowers, intricate piping, custom design, specialty flavors
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Per slice:</strong> $6-$12+
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mb-6">
              <p className="text-gray-800 font-semibold mb-2">💡 Real Example:</p>
              <p className="text-gray-700">
                According to Brides.com, a 3-tier wedding cake serving 100 guests costs around $600 on average. In major cities like New York or San Francisco, that same cake costs $800-$1,200. In smaller cities, it might be $400-$600.
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-4 mt-8">What Drives Wedding Cake Prices Up</h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Higher Cost (+$200-$500)</h4>
                <ul className="text-gray-700 text-sm space-y-1 ml-6">
                  <li>• Fondant finish (vs buttercream)</li>
                  <li>• Handmade sugar flowers</li>
                  <li>• Metallic details (gold leaf, edible paint)</li>
                  <li>• Specialty flavors (pistachio, champagne)</li>
                  <li>• Gluten-free or vegan tiers</li>
                  <li>• Intricate hand-piping</li>
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Lower Cost (Budget-Friendly)</h4>
                <ul className="text-gray-700 text-sm space-y-1 ml-6">
                  <li>• Buttercream finish</li>
                  <li>• Fresh flowers (vs sugar flowers)</li>
                  <li>• Classic flavors (vanilla, chocolate)</li>
                  <li>• Simple design (no intricate details)</li>
                  <li>• Smaller guest count</li>
                  <li>• Semi-naked or rustic style</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Birthday & Custom Cakes */}
          <section id="birthday-cakes">
            <h2 className="text-3xl font-bold mb-4">Birthday & Custom Cake Prices in 2025</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Birthday cakes and custom celebration cakes have a wide price range depending on size and design complexity. According to Thumbtack and Fash pricing data, <strong>custom cakes cost $70-$400 on average</strong>.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Custom Cake Pricing Overview</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Small (6-inch):</strong> $70-$120 (serves 8-12)</li>
                <li>• <strong>Medium (8-inch):</strong> $120-$180 (serves 15-20)</li>
                <li>• <strong>Large (10-inch):</strong> $150-$250 (serves 25-30)</li>
                <li>• <strong>2-Tier Custom:</strong> $200-$400</li>
                <li>• <strong>3-Tier Custom:</strong> $300-$800+</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mb-4 mt-8">Pricing by Cake Size & Servings</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-rose-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold">Cake Size</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold">Servings</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold">Simple Design</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold">Custom Design</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">6-inch round</td>
                    <td className="border border-gray-300 px-4 py-3">8-12</td>
                    <td className="border border-gray-300 px-4 py-3">$70-$100</td>
                    <td className="border border-gray-300 px-4 py-3">$100-$150</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">8-inch round</td>
                    <td className="border border-gray-300 px-4 py-3">15-20</td>
                    <td className="border border-gray-300 px-4 py-3">$120-$150</td>
                    <td className="border border-gray-300 px-4 py-3">$150-$220</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">10-inch round</td>
                    <td className="border border-gray-300 px-4 py-3">25-30</td>
                    <td className="border border-gray-300 px-4 py-3">$150-$200</td>
                    <td className="border border-gray-300 px-4 py-3">$200-$300</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">12-inch round</td>
                    <td className="border border-gray-300 px-4 py-3">35-40</td>
                    <td className="border border-gray-300 px-4 py-3">$200-$250</td>
                    <td className="border border-gray-300 px-4 py-3">$250-$400</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 What &quot;Custom Design&quot; Means:</p>
              <p className="text-gray-700 mb-3">
                Custom designs include: character cakes, sculpted cakes, hand-painted details, fondant decorations, edible images, or intricate piping work. These take 2-4x longer than simple buttercream cakes.
              </p>
              <p className="text-gray-700">
                <strong>Simple designs</strong> are buttercream frosting with basic decorating—perfect for most birthday parties and much more affordable.
              </p>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <TrendingUp className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Track Which Cakes Make You the Most Money</h3>
                  <p className="mb-4">BakeProfit shows you profit margins on every cake. See which designs are worth your time and which ones to stop offering.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Cupcakes */}
          <section id="cupcakes">
            <h2 className="text-3xl font-bold mb-4">Cupcake Prices in 2025</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Cupcakes are priced individually or by the dozen. Based on market research from wedding forums, bakery pricing guides, and industry data, here&apos;s what customers are paying:
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Cupcake Pricing Breakdown</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Standard cupcakes:</strong> $2-$3 each ($24-$36/dozen)</li>
                <li>• <strong>Gourmet/specialty:</strong> $3-$4 each ($36-$48/dozen)</li>
                <li>• <strong>Custom decorated:</strong> $3.50-$6 each ($42-$72/dozen)</li>
                <li>• <strong>Wedding cupcakes:</strong> $2-$3.50 each</li>
                <li>• <strong>Mini cupcakes:</strong> $1-$1.50 each ($12-$18/dozen)</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mb-4 mt-8">What Affects Cupcake Prices</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <Cake className="h-5 w-5 text-rose-600" />
                  Decoration Complexity
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">Basic ($2-$2.50 each)</p>
                    <p className="text-gray-700 text-sm">Simple swirl of buttercream, sprinkles. Takes 30-60 seconds per cupcake.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Standard ($2.50-$3.50 each)</p>
                    <p className="text-gray-700 text-sm">Piped rosettes, two-tone frosting, fondant toppers. Takes 1-2 minutes per cupcake.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Custom ($3.50-$6 each)</p>
                    <p className="text-gray-700 text-sm">Hand-piped flowers, character designs, detailed fondant work. Takes 3-5 minutes per cupcake.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <Gift className="h-5 w-5 text-rose-600" />
                  Specialty Ingredients
                </h4>
                <p className="text-gray-700 mb-3">
                  Premium ingredients add $0.50-$1.50 per cupcake:
                </p>
                <ul className="text-gray-700 text-sm space-y-1 ml-6">
                  <li>• Gluten-free flour (+$0.75-$1.25)</li>
                  <li>• Vegan ingredients (+$0.50-$1.00)</li>
                  <li>• Premium chocolate/vanilla (+$0.25-$0.50)</li>
                  <li>• Fresh fruit fillings (+$0.50-$0.75)</li>
                  <li>• Specialty flavors like pistachio, lavender (+$0.50-$1.00)</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Real Example: Wedding Cupcake Pricing</h3>
              <p className="text-gray-700 mb-3">
                According to WeddingWire forums, bakers charge $2-$3.50 per wedding cupcake. For 100 guests, that&apos;s $200-$350 total—significantly less than a traditional wedding cake ($600-$900).
              </p>
              <p className="text-gray-700">
                Many couples choose cupcakes to save money, which means you need to price them right to still make a profit. Don&apos;t undercharge just because they&apos;re &quot;cheaper than a cake.&quot;
              </p>
            </div>
          </section>

          {/* Section 4: Sheet Cakes */}
          <section id="sheet-cakes">
            <h2 className="text-3xl font-bold mb-4">Sheet Cake Prices in 2025</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Sheet cakes are the most budget-friendly option for large gatherings. They&apos;re simple to make, easy to transport, and serve a lot of people. Here&apos;s what customers pay:
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Sheet Cake Pricing</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Quarter sheet (9x13):</strong> $25-$40 (serves 20-24)</li>
                <li>• <strong>Half sheet (12x18):</strong> $40-$70 (serves 40-48)</li>
                <li>• <strong>Full sheet (18x24):</strong> $70-$120 (serves 80-96)</li>
                <li>• <strong>Costco half sheet:</strong> $24.99 (serves 48) - budget option</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mb-6">
              <p className="text-gray-800 font-semibold mb-2">💡 Sheet Cake vs Round Cake Pricing:</p>
              <p className="text-gray-700 mb-3">
                Sheet cakes cost less per serving because they&apos;re faster to make. A half sheet cake serving 48 people costs $40-$70 ($0.83-$1.46/serving), while a round tiered cake serving 48 costs $200-$350 ($4.17-$7.29/serving).
              </p>
              <p className="text-gray-700">
                <strong>Why the difference?</strong> Round cakes require more labor (stacking, leveling, crumb coating, decorating), while sheet cakes are one layer with simple frosting.
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-4 mt-8">When Customers Choose Sheet Cakes</h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">✅ Best For:</h4>
                <ul className="text-gray-700 text-sm space-y-1 ml-6">
                  <li>• Office parties & corporate events</li>
                  <li>• School celebrations</li>
                  <li>• Large family gatherings</li>
                  <li>• Budget-conscious customers</li>
                  <li>• Events where presentation isn&apos;t priority</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">❌ Not Ideal For:</h4>
                <ul className="text-gray-700 text-sm space-y-1 ml-6">
                  <li>• Weddings (customers want showpiece)</li>
                  <li>• Milestone birthdays (1st, 16th, 50th)</li>
                  <li>• Small intimate gatherings</li>
                  <li>• Events where cake is centerpiece</li>
                  <li>• Customers wanting custom design</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Regional Differences */}
          <section id="regional-differences">
            <h2 className="text-3xl font-bold mb-4">Regional Price Differences: Urban vs Rural</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Where you live dramatically affects what you can charge. According to Zola&apos;s wedding cost data, cake prices vary by <strong>50-150% between cities</strong>.
            </p>

            <h3 className="text-2xl font-bold mb-4">Wedding Cake Prices by City (2025)</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-rose-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold">City</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold">Avg. Wedding Cake</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold">vs National Avg</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">San Francisco, CA</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">$1,156</td>
                    <td className="border border-gray-300 px-4 py-3 text-red-600">+26%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">New York, NY</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">$1,000-$1,200</td>
                    <td className="border border-gray-300 px-4 py-3 text-red-600">+20-30%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">National Average</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">$917</td>
                    <td className="border border-gray-300 px-4 py-3">Baseline</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">St. Louis, MO</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">$474</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600">-48%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-rose-600" />
                Why Location Matters
              </h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Overhead costs:</strong> Rent, utilities, and labor cost more in cities</li>
                <li>• <strong>Customer expectations:</strong> Urban customers expect higher-end designs</li>
                <li>• <strong>Competition:</strong> More bakeries in cities = wider price ranges</li>
                <li>• <strong>Income levels:</strong> Higher average income = willingness to pay more</li>
                <li>• <strong>Cost of living:</strong> Everything costs more, including ingredients</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">What This Means for You</h3>
              <p className="text-gray-700 mb-3">
                <strong>Don&apos;t compare your prices to bakers in different markets.</strong> A baker in San Francisco charging $8/slice isn&apos;t overcharging—that&apos;s the market rate. A baker in rural Missouri charging $3/slice isn&apos;t undercharging—that&apos;s what customers pay there.
              </p>
              <p className="text-gray-700">
                Research what bakers in YOUR area charge. Check local bakery websites, wedding vendor directories, and Facebook groups to see your local market rates.
              </p>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Users className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Know Your True Costs Before Pricing</h3>
                  <p className="mb-4">BakeProfit calculates ingredient costs, labor, overhead, and profit margins automatically. Price based on YOUR costs, not guesses.</p>
                  <Link href="/tools/recipe-cost-calculator">
                    <Button className="bg-rose-500 hover:bg-rose-600">Calculate Your Costs Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Price Factors */}
          <section id="price-factors">
            <h2 className="text-3xl font-bold mb-4">What Affects Cake Prices the Most</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Based on the research, here are the factors that have the biggest impact on cake pricing:
            </p>

            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">1. Size & Number of Servings (Biggest Factor)</h3>
                <p className="text-gray-700 mb-3">
                  This is the #1 price driver. More servings = more ingredients + more labor + more time.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Example:</strong> A 6-inch cake (10 servings) costs $70-$120. A 12-inch cake (40 servings) costs $200-$400. That&apos;s 4x the servings but only 2-3x the price because of economies of scale.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">2. Design Complexity</h3>
                <p className="text-gray-700 mb-3">
                  Simple buttercream = $3-5/slice. Fondant with sugar flowers = $8-12/slice.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Time difference:</strong> A simple 3-tier cake takes 3-4 hours. An elaborate fondant cake with sugar flowers takes 8-12 hours. You&apos;re charging for that time.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">3. Specialty Ingredients</h3>
                <p className="text-gray-700 mb-3">
                  Gluten-free, vegan, or premium ingredients add $0.50-$2 per serving.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Why:</strong> Gluten-free flour costs 3-4x more than regular flour. Vegan butter costs 2x more. Premium vanilla costs 5x more than imitation. These costs add up.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">4. Baker Experience & Reputation</h3>
                <p className="text-gray-700 mb-3">
                  Established bakers with portfolios charge 30-50% more than beginners.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Why it&apos;s justified:</strong> Experience means better quality, reliability, and customer service. Customers pay for peace of mind that their cake will be perfect.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">5. Delivery & Setup</h3>
                <p className="text-gray-700 mb-3">
                  Delivery adds $40-$100+ depending on distance and cake complexity.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>What&apos;s included:</strong> Safe transportation, on-site assembly for tiered cakes, setup at venue, and insurance against damage. This is a service worth charging for.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Pricing Tips */}
          <section id="pricing-tips">
            <h2 className="text-3xl font-bold mb-4">How to Price Your Cakes Confidently</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Now that you know what customers pay, here&apos;s how to use this data to price YOUR cakes:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Step 1: Calculate Your Actual Costs
                </h3>
                <p className="text-gray-700 mb-3">
                  Before you look at market rates, know YOUR costs:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• <strong>Ingredients:</strong> Track every ingredient cost per recipe</li>
                  <li>• <strong>Labor:</strong> Time yourself making each cake type (include baking, decorating, cleanup)</li>
                  <li>• <strong>Overhead:</strong> Electricity, packaging, business licenses, insurance</li>
                  <li>• <strong>Profit margin:</strong> Add 30-50% minimum for profit</li>
                </ul>
                <p className="text-gray-700 mt-3 text-sm">
                  <strong>Use BakeProfit&apos;s free calculator</strong> to track all these costs automatically. It shows you exactly what you need to charge to make a profit.
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Step 2: Research Your Local Market
                </h3>
                <p className="text-gray-700 mb-3">
                  Find out what bakers in YOUR area charge:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• Check local bakery websites and Instagram pages</li>
                  <li>• Join local wedding vendor Facebook groups</li>
                  <li>• Search &quot;[your city] custom cakes&quot; and see pricing</li>
                  <li>• Ask in home baker Facebook groups for your region</li>
                </ul>
                <p className="text-gray-700 mt-3 text-sm">
                  <strong>Don&apos;t compare yourself to bakers in other cities.</strong> San Francisco prices don&apos;t apply in rural Texas.
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Step 3: Position Yourself in the Market
                </h3>
                <p className="text-gray-700 mb-3">
                  Decide where you fit:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">Budget-Friendly (Bottom 25%)</p>
                    <p className="text-gray-700 text-sm">Simple designs, basic flavors, fast turnaround. Good for high volume.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Mid-Range (Middle 50%) ← Most Home Bakers</p>
                    <p className="text-gray-700 text-sm">Custom designs, quality ingredients, good customer service. Best profit margins.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Premium (Top 25%)</p>
                    <p className="text-gray-700 text-sm">Elaborate designs, premium ingredients, established reputation. Requires experience.</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Step 4: Test Your Prices
                </h3>
                <p className="text-gray-700 mb-3">
                  Start with your calculated price and adjust based on customer response:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• If you&apos;re booked solid 2+ weeks out → raise prices 10-15%</li>
                  <li>• If you&apos;re getting lots of inquiries but no orders → prices might be too high OR you&apos;re attracting wrong customers</li>
                  <li>• If you&apos;re getting no inquiries → improve marketing, not necessarily pricing</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                  Common Pricing Mistakes to Avoid
                </h3>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• ❌ Pricing based on what YOU would pay (you&apos;re not your customer)</li>
                  <li>• ❌ Undercharging because you&apos;re &quot;just starting out&quot; (your time has value)</li>
                  <li>• ❌ Matching the lowest competitor (race to the bottom)</li>
                  <li>• ❌ Not including labor in your pricing (biggest mistake)</li>
                  <li>• ❌ Giving discounts to everyone who asks (devalues your work)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8: FAQ */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How much does a wedding cake cost in 2025?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> The average wedding cake costs $917 nationally (Zola), with most couples spending $700-$1,100. Per-slice pricing ranges from $3-$8 for standard buttercream designs, and $8-$12 for elaborate custom work with fondant, sugar flowers, or specialty ingredients. Major cities like San Francisco average $1,156, while smaller cities like St. Louis average $474.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What do birthday cakes cost in 2025?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Custom birthday cakes cost $70-$400 on average. A standard 8-inch round cake (serves 15-20) costs $120-$180, while elaborate multi-tier designs cost $200-$800+. Simple sheet cakes range from $25-$60. The price depends heavily on design complexity—character cakes and sculpted designs cost significantly more than simple buttercream cakes.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How much should I charge per cupcake in 2025?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Cupcakes typically cost $2-$4 each, or $24-$48 per dozen. Standard cupcakes with simple frosting are $2-$3 each. Gourmet or custom-decorated cupcakes range from $3.50-$6 each. Wedding cupcakes average $2-$3.50 per cupcake. The decoration complexity is the biggest factor—simple swirl frosting takes 30-60 seconds, while custom designs take 3-5 minutes per cupcake.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Do cake prices vary by location?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Yes, significantly. Urban areas charge 30-50% more than rural areas due to higher overhead costs, customer expectations, and cost of living. For example, San Francisco wedding cakes average $1,156 while St. Louis averages $474—a 144% difference. Always research your local market rather than comparing to national averages or other cities.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What factors affect cake pricing the most?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> The biggest factors are: 1) Size and number of servings (more servings = higher price), 2) Design complexity (fondant and sugar flowers cost 2-3x more than buttercream), 3) Specialty ingredients (gluten-free, vegan add $0.50-$2/serving), 4) Location (urban vs rural), and 5) Baker experience level (established bakers charge 30-50% more). Labor time is the #1 cost driver most bakers underestimate.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Am I charging too little for my cakes?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> If you&apos;re booked solid 2+ weeks in advance, you&apos;re probably undercharging. If you&apos;re making less than $15-20/hour after costs, you&apos;re definitely undercharging. Calculate your actual costs (ingredients + labor + overhead) and add 30-50% profit margin. Compare to local market rates, not what you personally would pay. Your time and skill have value—charge accordingly.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Price Your Cakes with Confidence</h2>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              You now have real 2025 pricing data. Use it to price your cakes profitably. Remember: customers pay for quality, reliability, and your time. Don&apos;t undervalue your work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools/recipe-cost-calculator">
                <Button className="bg-rose-500 hover:bg-rose-600 px-8 py-6 text-lg">
                  Calculate Your Cake Costs Free →
                </Button>
              </Link>
              <Link href="/bakery-business-tool">
                <Button className="bg-white text-rose-600 hover:bg-gray-50 border-2 border-rose-600 px-8 py-6 text-lg">
                  Track Profits & Orders
                </Button>
              </Link>
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              No credit card required • See profit margins on every cake • Free forever
            </p>
          </div>

          {/* Related Articles */}
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/how-to-price-cupcakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Price Cupcakes: Complete 2025 Guide</h4>
                <p className="text-gray-600 text-sm">Step-by-step formula to price cupcakes profitably with real examples and free calculator.</p>
              </Link>
              <Link href="/blog/pricing-mistakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">The 3 Biggest Pricing Mistakes Home Bakers Make</h4>
                <p className="text-gray-600 text-sm">Discover the critical pricing mistakes costing home bakers thousands every year.</p>
              </Link>
              <Link href="/blog/bakery-menu-guide" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Create a Bakery Menu That Sells</h4>
                <p className="text-gray-600 text-sm">Complete guide to creating a profitable bakery menu with pricing psychology.</p>
              </Link>
              <Link href="/blog/bakery-email-list-guide" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Create a Bakery Email List</h4>
                <p className="text-gray-600 text-sm">Build an email list for repeat customers with free tools and proven strategies.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
