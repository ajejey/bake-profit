'use client'

import Link from 'next/link'
import { FileText, CheckCircle, AlertTriangle, TrendingUp, DollarSign, Star, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '../layout/Footer'

export default function BakeryMenuGuideArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → How to Create a Bakery Menu That Sells
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          How to Create a Bakery Menu That Sells
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Feb 6, 2025</span> • <span>17 min read</span> • <span className="text-rose-600 font-semibold">Menu Strategy</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            Your menu isn&apos;t just a list of products—it&apos;s your most powerful sales tool.
          </p>

          <p className="text-xl text-gray-700">
            A well-designed menu guides customers to your most profitable items, makes ordering easy, and reinforces your brand. A poorly designed menu confuses customers, undervalues your work, and leaves money on the table.
          </p>

          <p className="text-lg text-gray-700">
            In this guide, I&apos;ll show you exactly how to create a bakery menu that sells—from choosing the right products and pricing them profitably, to writing descriptions that make mouths water and designing a layout that drives sales. Whether you&apos;re starting from scratch or revamping an existing menu, you&apos;ll learn the proven strategies that successful bakeries use.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <FileText className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Price Your Menu Items Correctly</h3>
                  <p className="mb-4">Use our free recipe cost calculator to ensure every item on your menu is priced for profit.</p>
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
              <li><a href="#why-matters" className="hover:text-rose-600">Why Your Menu Matters More Than You Think</a></li>
              <li><a href="#product-selection" className="hover:text-rose-600">Product Selection: What to Sell</a></li>
              <li><a href="#product-mix" className="hover:text-rose-600">The Perfect Product Mix</a></li>
              <li><a href="#pricing-strategy" className="hover:text-rose-600">Pricing Strategy That Sells</a></li>
              <li><a href="#menu-descriptions" className="hover:text-rose-600">Writing Menu Descriptions That Convert</a></li>
              <li><a href="#menu-design" className="hover:text-rose-600">Menu Design & Visual Psychology</a></li>
              <li><a href="#menu-formats" className="hover:text-rose-600">Choosing the Right Menu Format</a></li>
              <li><a href="#common-mistakes" className="hover:text-rose-600">7 Common Menu Mistakes to Avoid</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* Section 1: Why Your Menu Matters */}
          <section id="why-matters">
            <h2 className="text-3xl font-bold mb-4">Why Your Menu Matters More Than You Think</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Your menu does three critical jobs:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  1. It Drives Profitability
                </h3>
                <p className="text-gray-700">
                  A strategic menu highlights your highest-margin items and guides customers toward profitable choices. The difference between a random menu and a strategic one can be 20-30% more profit on the same sales volume.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <Eye className="h-6 w-6 text-blue-600" />
                  2. It Shapes Customer Perception
                </h3>
                <p className="text-gray-700">
                  Your menu tells customers who you are. A cluttered menu with 50 items says &quot;we&apos;re trying to please everyone.&quot; A focused menu with 15 carefully chosen items says &quot;we&apos;re experts at what we do.&quot;
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                  3. It Makes Your Business Scalable
                </h3>
                <p className="text-gray-700">
                  A simple, focused menu is easier to execute consistently, requires less inventory, and allows you to grow without chaos. You can&apos;t scale a menu with 40 different products.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">The Reality Check</h3>
              <p className="text-gray-700">
                Most home bakers start with too many products because they want to offer &quot;something for everyone.&quot; But this strategy backfires—it overwhelms customers, dilutes your brand, and makes you a jack-of-all-trades instead of a master of one.
              </p>
            </div>
          </section>

          {/* Section 2: Product Selection */}
          <section id="product-selection">
            <h2 className="text-3xl font-bold mb-4">Product Selection: What to Sell</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Start with 3-5 signature items. That&apos;s it. Here&apos;s how to choose them:
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">The 4 Criteria for Menu Items</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-rose-500 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">1. You Make It REALLY Well</h4>
                  <p className="text-gray-700">
                    Don&apos;t add something just because it&apos;s popular. Add it because you excel at it. Your signature items should showcase your best work.
                  </p>
                </div>

                <div className="border-l-4 border-rose-500 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">2. It&apos;s Profitable</h4>
                  <p className="text-gray-700">
                    Calculate the cost and ensure you can sell it at 2.5-3x the ingredient cost. If it&apos;s not profitable, it doesn&apos;t belong on your menu. Use our <Link href="/blog/how-to-calculate-recipe-cost" className="text-rose-600 hover:underline font-semibold">recipe cost calculator guide</Link>.
                  </p>
                </div>

                <div className="border-l-4 border-rose-500 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">3. There&apos;s Demand for It</h4>
                  <p className="text-gray-700">
                    Research your local market. What are people buying? What&apos;s missing? Don&apos;t make artisan sourdough if everyone in your area wants birthday cakes.
                  </p>
                </div>

                <div className="border-l-4 border-rose-500 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">4. You Can Make It Consistently</h4>
                  <p className="text-gray-700">
                    Can you produce this item 10 times in a week and have it look and taste the same every time? If not, it&apos;s not ready for your menu.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Example: Sarah&apos;s Starter Menu</h3>
              <p className="text-gray-700 mb-3">
                Sarah started her home bakery with just 3 items:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Custom Birthday Cakes</strong> (8-inch, 3 flavors) - Her specialty, high margin</li>
                <li>• <strong>Chocolate Chip Cookies</strong> (by the dozen) - Easy to scale, consistent demand</li>
                <li>• <strong>Seasonal Cupcakes</strong> (6-pack) - Keeps menu fresh, uses same base recipes</li>
              </ul>
              <p className="text-gray-700 mt-4">
                After 6 months of consistent sales, she added brownies. After a year, she added a 4th cake flavor. <strong>Slow and strategic beats fast and chaotic.</strong>
              </p>
            </div>
          </section>

          {/* Section 3: Product Mix */}
          <section id="product-mix">
            <h2 className="text-3xl font-bold mb-4">The Perfect Product Mix</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Once you have your core items, build a balanced menu with these categories:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <h3 className="font-bold text-gray-900 text-lg">Signature Items (40%)</h3>
                </div>
                <p className="text-gray-700 mb-2">
                  Your &quot;hero&quot; products that define your brand.
                </p>
                <p className="text-sm text-gray-600">
                  Example: Custom cakes, specialty cookies, artisan bread
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <h3 className="font-bold text-gray-900 text-lg">Bestsellers (30%)</h3>
                </div>
                <p className="text-gray-700 mb-2">
                  Reliable favorites that keep customers coming back.
                </p>
                <p className="text-sm text-gray-600">
                  Example: Chocolate chip cookies, brownies, muffins
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                  <h3 className="font-bold text-gray-900 text-lg">Seasonal Items (20%)</h3>
                </div>
                <p className="text-gray-700 mb-2">
                  Rotating items that create urgency and freshness.
                </p>
                <p className="text-sm text-gray-600">
                  Example: Pumpkin spice (fall), peppermint (winter), lemon (spring)
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-6 w-6 text-purple-500" />
                  <h3 className="font-bold text-gray-900 text-lg">Specialty/Dietary (10%)</h3>
                </div>
                <p className="text-gray-700 mb-2">
                  Niche items that capture underserved markets.
                </p>
                <p className="text-sm text-gray-600">
                  Example: Gluten-free, vegan, keto options
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">💡 Pro Tip: The Rule of 15</h3>
              <p className="text-gray-700">
                Keep your total menu to 12-18 items maximum. This is the sweet spot where you offer enough variety without overwhelming customers or yourself. More than 20 items and you&apos;re spreading yourself too thin.
              </p>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <DollarSign className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Calculate Your Menu Item Costs</h3>
                  <p className="mb-4">Before finalizing your menu, ensure every item is priced profitably using our free calculator.</p>
                  <Link href="/tools/recipe-cost-calculator">
                    <Button className="bg-rose-500 hover:bg-rose-600">Calculate Recipe Costs →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Pricing Strategy */}
          <section id="pricing-strategy">
            <h2 className="text-3xl font-bold mb-4">Pricing Strategy That Sells</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Your menu prices need to do two things: cover your costs with profit AND feel right to customers. Here&apos;s how:
            </p>

            <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">The Pricing Formula</h3>
              <div className="space-y-2 font-mono text-sm mb-4">
                <p>Total Cost = Ingredients + Packaging + Labor + Overhead</p>
                <p>Selling Price = Total Cost × 2.5 to 3.0</p>
              </div>
              <p className="text-gray-700">
                This gives you a 60-67% profit margin, which is standard for bakery items. Read our complete guide: <Link href="/blog/how-to-calculate-recipe-cost" className="text-rose-600 hover:underline font-semibold">How to Calculate Recipe Cost</Link>
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Psychological Pricing Tactics</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">1. Charm Pricing ($4.99 vs $5.00)</h4>
                    <p className="text-gray-700">
                      Prices ending in .99 or .95 feel significantly cheaper, even though the difference is pennies. Use this for everyday items like cookies and cupcakes.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">2. Prestige Pricing (Round Numbers)</h4>
                    <p className="text-gray-700">
                      For premium items like custom cakes, use round numbers ($120, not $119.99). This signals quality and luxury.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">3. Bundle Pricing</h4>
                    <p className="text-gray-700">
                      &quot;6 for $24&quot; or &quot;Dozen for $40&quot; increases average order value. Make the per-unit savings clear.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">4. Anchor Pricing</h4>
                    <p className="text-gray-700">
                      Include one expensive &quot;signature&quot; item ($150 cake) to make your standard items ($75 cake) feel more reasonable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Example Menu Pricing</h3>
                <div className="space-y-2">
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Chocolate Chip Cookies (dozen)</span>
                    <span className="font-bold text-gray-900">$39.99</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Brownies (6-pack)</span>
                    <span className="font-bold text-gray-900">$24.95</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Custom Birthday Cake (8-inch)</span>
                    <span className="font-bold text-gray-900">$120</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Signature Wedding Cake (3-tier)</span>
                    <span className="font-bold text-gray-900">$450</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Notice: Everyday items use .99/.95, premium cakes use round numbers, and the wedding cake anchors the pricing.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Menu Descriptions */}
          <section id="menu-descriptions">
            <h2 className="text-3xl font-bold mb-4">Writing Menu Descriptions That Convert</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Good descriptions sell. Great descriptions make mouths water. Here&apos;s the formula:
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">The 3-Part Description Formula</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">Part 1: Sensory Words (Texture + Taste)</p>
                  <p className="text-gray-700 mb-2">
                    Rich, velvety, crispy, fluffy, buttery, decadent, smooth, moist
                  </p>
                  <p className="text-sm text-gray-600">
                    Example: &quot;Rich, fudgy brownies with a crispy top&quot;
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">Part 2: Quality Indicators</p>
                  <p className="text-gray-700 mb-2">
                    Locally-sourced, premium, Belgian chocolate, organic, handcrafted, small-batch
                  </p>
                  <p className="text-sm text-gray-600">
                    Example: &quot;made with premium Belgian chocolate&quot;
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">Part 3: Unique Element (Optional)</p>
                  <p className="text-gray-700 mb-2">
                    Secret ingredient, family recipe, award-winning, customer favorite
                  </p>
                  <p className="text-sm text-gray-600">
                    Example: &quot;topped with our signature cream cheese frosting&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">❌ Bad Descriptions</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• &quot;Chocolate cake&quot;</li>
                  <li>• &quot;Cookies&quot;</li>
                  <li>• &quot;Cupcakes with frosting&quot;</li>
                  <li>• &quot;Birthday cake&quot;</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  These are boring and don&apos;t sell the value.
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">✅ Great Descriptions</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• &quot;Rich, velvety dark chocolate cake with smooth ganache, made from premium cocoa&quot;</li>
                  <li>• &quot;Buttery chocolate chip cookies with crispy edges and gooey centers&quot;</li>
                  <li>• &quot;Fluffy vanilla cupcakes topped with our signature cream cheese frosting&quot;</li>
                  <li>• &quot;Custom birthday cake with your choice of moist vanilla, chocolate, or red velvet layers&quot;</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  These create desire and justify the price.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">💡 Pro Tip: Keep It Concise</h3>
              <p className="text-gray-700">
                Limit descriptions to 2-3 lines maximum. Too long and customers won&apos;t read them. Too short and you&apos;re not selling the value. Find the sweet spot.
              </p>
            </div>
          </section>

          {/* Section 6: Menu Design */}
          <section id="menu-design">
            <h2 className="text-3xl font-bold mb-4">Menu Design & Visual Psychology</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              How your menu looks affects what customers buy. Use these design principles:
            </p>

            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">1. Visual Hierarchy</h3>
                <p className="text-gray-700 mb-3">
                  Guide customers&apos; eyes to your most profitable items:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• <strong>Top right corner:</strong> Prime real estate—put your signature item here</li>
                  <li>• <strong>Boxes or borders:</strong> Highlight high-margin items</li>
                  <li>• <strong>Larger fonts:</strong> Make bestsellers stand out</li>
                  <li>• <strong>Icons or badges:</strong> &quot;Customer Favorite&quot; or &quot;Signature&quot; labels</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">2. Color Psychology</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Warm Colors (Red, Orange, Yellow)</p>
                    <p className="text-gray-700 text-sm">Stimulate appetite, create urgency. Good for everyday bakeries.</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Pastels (Pink, Cream, Soft Blue)</p>
                    <p className="text-gray-700 text-sm">Cozy, inviting, sweet. Perfect for home bakeries.</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Earth Tones (Brown, Beige)</p>
                    <p className="text-gray-700 text-sm">Organic, artisan quality. Great for bread bakeries.</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Black & Gold</p>
                    <p className="text-gray-700 text-sm">Premium, luxury. Use for high-end patisseries.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">3. Photography Tips</h3>
                <p className="text-gray-700 mb-3">
                  High-quality photos can increase sales by 30%+:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• Use natural lighting (near a window)</li>
                  <li>• Capture texture and detail (close-ups work well)</li>
                  <li>• Style with simple props (wooden boards, neutral backgrounds)</li>
                  <li>• Show freshness (steam, crumbs, gooey centers)</li>
                  <li>• Keep consistent style across all photos</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">4. Layout Best Practices</h3>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• <strong>White space:</strong> Don&apos;t cram everything together</li>
                  <li>• <strong>Clear categories:</strong> Cakes, Cookies, Seasonal, etc.</li>
                  <li>• <strong>Easy-to-read fonts:</strong> No fancy scripts for body text</li>
                  <li>• <strong>Logical flow:</strong> Organize by category or price</li>
                  <li>• <strong>Mobile-friendly:</strong> Most customers view on phones</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: Menu Formats */}
          <section id="menu-formats">
            <h2 className="text-3xl font-bold mb-4">Choosing the Right Menu Format</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Where and how you display your menu matters. Here are your options:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Digital Menu (Website/Social)</h3>
                <p className="font-semibold text-green-600 mb-2">✅ Best for: Home bakeries</p>
                <p className="text-gray-700 mb-3">
                  <strong>Pros:</strong>
                </p>
                <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                  <li>• Easy to update prices and items</li>
                  <li>• Shareable on social media</li>
                  <li>• No printing costs</li>
                  <li>• Can include photos easily</li>
                </ul>
                <p className="text-gray-700">
                  <strong>Cons:</strong> Requires website or social media presence
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">PDF Menu</h3>
                <p className="font-semibold text-green-600 mb-2">✅ Best for: Email orders</p>
                <p className="text-gray-700 mb-3">
                  <strong>Pros:</strong>
                </p>
                <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                  <li>• Professional appearance</li>
                  <li>• Easy to email to customers</li>
                  <li>• Can be printed if needed</li>
                  <li>• Looks the same on all devices</li>
                </ul>
                <p className="text-gray-700">
                  <strong>Cons:</strong> Harder to update than website
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Instagram Highlights</h3>
                <p className="font-semibold text-green-600 mb-2">✅ Best for: Social-first bakeries</p>
                <p className="text-gray-700 mb-3">
                  <strong>Pros:</strong>
                </p>
                <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                  <li>• Customers already on Instagram</li>
                  <li>• Visual and engaging</li>
                  <li>• Easy to update</li>
                  <li>• Free to use</li>
                </ul>
                <p className="text-gray-700">
                  <strong>Cons:</strong> Limited formatting options
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Printed Menu/Flyer</h3>
                <p className="font-semibold text-green-600 mb-2">✅ Best for: Farmers markets</p>
                <p className="text-gray-700 mb-3">
                  <strong>Pros:</strong>
                </p>
                <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                  <li>• Tangible, customers can take home</li>
                  <li>• Works at in-person events</li>
                  <li>• No tech required</li>
                </ul>
                <p className="text-gray-700">
                  <strong>Cons:</strong> Printing costs, hard to update
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">💡 Recommendation</h3>
              <p className="text-gray-700">
                Use a combination: Digital menu on your website/Instagram as your primary menu, plus a simple PDF you can email to customers. Add printed flyers only if you do farmers markets or events.
              </p>
            </div>
          </section>

          {/* Section 8: Common Mistakes */}
          <section id="common-mistakes">
            <h2 className="text-3xl font-bold mb-4">7 Common Menu Mistakes to Avoid</h2>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">1. Too Many Items</h3>
                <p className="text-gray-700">
                  More than 20 items overwhelms customers and dilutes your brand. Start small and add strategically.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">2. Underpricing</h3>
                <p className="text-gray-700">
                  Charging too little because you&apos;re &quot;just starting out&quot; trains customers to expect low prices and makes it hard to raise them later. Price for profit from day one.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">3. Boring Descriptions</h3>
                <p className="text-gray-700">
                  &quot;Chocolate cake&quot; doesn&apos;t sell. &quot;Rich, velvety chocolate cake with smooth ganache&quot; does. Use sensory language.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">4. Poor Quality Photos</h3>
                <p className="text-gray-700">
                  Blurry, dark, or unappealing photos hurt sales more than no photos. Invest in good lighting or hire a photographer.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">5. No Clear Categories</h3>
                <p className="text-gray-700">
                  A random list of items makes it hard to find what customers want. Organize by type: Cakes, Cookies, Seasonal, etc.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">6. Outdated Menu</h3>
                <p className="text-gray-700">
                  Nothing frustrates customers more than ordering something that&apos;s no longer available. Keep your menu current.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">7. No Call-to-Action</h3>
                <p className="text-gray-700">
                  Your menu should tell customers HOW to order. Include your ordering process, contact info, and lead times clearly.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How many items should be on my menu?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Start with 3-5 signature items. As you grow, expand to 12-18 items maximum. More than 20 items makes it hard to maintain quality and confuses customers.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Should I offer custom orders or stick to my menu?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Both! Have a set menu for easy ordering, but allow customization for premium items like cakes. Just make sure custom orders are priced higher to account for the extra time and complexity.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How often should I update my menu?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Review quarterly. Add seasonal items 4 times a year. Only add permanent items when you&apos;ve tested them successfully for 2-3 months.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if my competitors have lower prices?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Don&apos;t compete on price—compete on quality, uniqueness, and service. If you&apos;re priced correctly (cost × 2.5-3), you&apos;re fine. Customers who only care about price aren&apos;t your ideal customers anyway.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Do I need professional photos for my menu?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Not necessarily, but you need GOOD photos. Natural lighting and a smartphone can work if you learn basic food photography. Bad photos hurt more than no photos.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Ready to Build Your Profitable Menu?</h2>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              Use BakeProfit to calculate costs, track which items sell best, and optimize your menu for maximum profit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools/recipe-cost-calculator">
                <Button className="bg-white text-rose-600 hover:bg-gray-50 border-2 border-rose-600 px-8 py-6 text-lg">
                  Calculate Recipe Costs
                </Button>
              </Link>
              <Link href="/bakery-business-tool">
                <Button className="bg-rose-500 hover:bg-rose-600 px-8 py-6 text-lg">
                  Start Tracking Free →
                </Button>
              </Link>
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              No credit card required • Track unlimited recipes • Upgrade anytime
            </p>
          </div>

          {/* Related Articles */}
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/how-to-calculate-recipe-cost" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Calculate Recipe Cost</h4>
                <p className="text-gray-600 text-sm">Essential for pricing your menu items correctly.</p>
              </Link>
              <Link href="/blog/pricing-mistakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">The 3 Biggest Pricing Mistakes</h4>
                <p className="text-gray-600 text-sm">Avoid these common pricing errors on your menu.</p>
              </Link>
              <Link href="/blog/start-home-bakery-budget" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Start a Home Bakery with $500</h4>
                <p className="text-gray-600 text-sm">Complete startup guide including menu planning.</p>
              </Link>
              <Link href="/blog/business-plan-template" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Home Bakery Business Plan Template</h4>
                <p className="text-gray-600 text-sm">Plan your menu strategy with our free template.</p>
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
