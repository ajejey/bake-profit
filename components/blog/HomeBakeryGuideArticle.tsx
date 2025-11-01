'use client'

import Link from 'next/link'
import { ChefHat, Calculator, DollarSign, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function HomeBakeryGuideArticle() {
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
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → How to Start a Home Bakery
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          How to Start a Home Bakery Business: Complete Guide (2025)
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Jan 15, 2025</span> • <span>18 min read</span> • <span className="text-rose-600 font-semibold">Home Bakery</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <p className="text-xl text-gray-700">
            You love baking. Friends rave about your cookies. Family begs you to make their birthday cakes. You&apos;ve thought about turning your passion into a business, but you don&apos;t know where to start.
          </p>

          <p className="text-lg text-gray-700">
            Starting a home bakery is more accessible than ever in 2025. Cottage food laws in most states allow you to bake from home without a commercial kitchen. Social media makes marketing free. And people are willing to pay premium prices for homemade, quality baked goods.
          </p>

          <p className="text-lg text-gray-700">
            But here&apos;s the truth: <strong>most home bakeries fail within the first year.</strong> Not because they can&apos;t bake—but because they don&apos;t treat it like a business. They undercharge, don&apos;t track costs, skip legal requirements, and burn out.
          </p>

          <p className="text-lg text-gray-700">
            This guide will show you exactly how to start a profitable home bakery business the right way. You&apos;ll learn the legal requirements, pricing strategies, marketing tactics, and systems you need to succeed.
          </p>

          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Calculator className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Free Bakery Business Tools</h3>
                  <p className="mb-4">Access our complete suite of free calculators to price products, track costs, and maximize profits.</p>
                  <Link href="/tools">
                    <Button className="bg-rose-500 hover:bg-rose-600">View All Free Tools →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li><a href="#is-it-right" className="hover:text-rose-600">Is a Home Bakery Right for You?</a></li>
              <li><a href="#legal" className="hover:text-rose-600">Legal Requirements & Licenses</a></li>
              <li><a href="#setup" className="hover:text-rose-600">Setting Up Your Home Kitchen</a></li>
              <li><a href="#products" className="hover:text-rose-600">Choosing Your Products</a></li>
              <li><a href="#pricing" className="hover:text-rose-600">Pricing for Profit</a></li>
              <li><a href="#marketing" className="hover:text-rose-600">Marketing Your Bakery</a></li>
              <li><a href="#operations" className="hover:text-rose-600">Systems & Operations</a></li>
              <li><a href="#scaling" className="hover:text-rose-600">Scaling Your Business</a></li>
              <li><a href="#mistakes" className="hover:text-rose-600">Common Mistakes to Avoid</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          <section id="is-it-right">
            <h2 className="text-3xl font-bold mb-4">Is a Home Bakery Right for You?</h2>
            <p className="text-lg text-gray-700 mb-4">
              Before you invest time and money, let&apos;s be honest about what running a home bakery actually involves. This isn&apos;t a hobby anymore—it&apos;s a business.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The Reality Check</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mb-6">
              <p className="text-gray-800 font-semibold mb-3">You&apos;ll Need To:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Wake up at 4am to bake for weekend orders</li>
                <li>• Work evenings and weekends (when everyone else is off)</li>
                <li>• Handle customer complaints professionally</li>
                <li>• Track expenses, pay taxes, manage finances</li>
                <li>• Market yourself constantly on social media</li>
                <li>• Say no to friends asking for &quot;just one free cake&quot;</li>
                <li>• Deal with last-minute cancellations and no-shows</li>
                <li>• Clean your kitchen more than you ever thought possible</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">You&apos;re a Good Fit If:</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <CheckCircle className="h-6 w-6 text-green-600 mb-3" />
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ You genuinely love baking (not just the idea of it)</li>
                  <li>✓ You&apos;re organized and detail-oriented</li>
                  <li>✓ You can handle criticism and feedback</li>
                  <li>✓ You&apos;re willing to learn business skills</li>
                  <li>✓ You have some startup capital ($500-2,000)</li>
                  <li>✓ You can work independently</li>
                  <li>✓ You&apos;re comfortable with social media</li>
                </ul>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <AlertCircle className="h-6 w-6 text-red-600 mb-3" />
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✗ You just want to &quot;make some extra cash&quot;</li>
                  <li>✗ You hate dealing with people</li>
                  <li>✗ You&apos;re easily stressed or overwhelmed</li>
                  <li>✗ You expect to get rich quick</li>
                  <li>✗ You can&apos;t handle early mornings</li>
                  <li>✗ You&apos;re not willing to invest in equipment</li>
                  <li>✗ You don&apos;t want to learn pricing/marketing</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Real Talk:</p>
              <p className="text-gray-700">
                Most successful home bakers make $2,000-5,000/month in their first year, working 20-30 hours per week. It&apos;s not &quot;easy money,&quot; but if you love baking and treat it seriously, it can be incredibly rewarding—both financially and personally.
              </p>
            </div>
          </section>

          <section id="legal">
            <h2 className="text-3xl font-bold mb-4">Legal Requirements & Licenses</h2>
            <p className="text-lg text-gray-700 mb-4">
              This is the part most people want to skip. Don&apos;t. Operating illegally can result in fines, lawsuits, and being shut down. Plus, legal businesses can charge more because customers trust them.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Cottage Food Laws (Most Important!)</h3>
            <p className="text-gray-700 mb-4">
              Cottage food laws allow you to bake from home without a commercial kitchen. Every state has different rules:
            </p>
            <div className="bg-gray-50 border rounded-lg p-6 mb-6">
              <p className="font-semibold mb-3">Common Cottage Food Restrictions:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Allowed products:</strong> Usually non-perishable items (cookies, cakes, bread, brownies)</li>
                <li>• <strong>NOT allowed:</strong> Cream-filled items, custards, cheesecakes (varies by state)</li>
                <li>• <strong>Sales limit:</strong> $15,000-$50,000 per year (varies by state)</li>
                <li>• <strong>Where you can sell:</strong> Direct to consumer only (no wholesale in some states)</li>
                <li>• <strong>Labeling:</strong> Must include specific warnings and ingredient lists</li>
              </ul>
              <p className="mt-4 pt-4 border-t font-semibold text-rose-600">
                → Google &quot;[Your State] cottage food law&quot; to find your specific requirements
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Business License</h3>
            <p className="text-gray-700 mb-4">
              Most cities require a business license. Cost: $50-200/year. Apply at your city hall or online.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Food Handler&apos;s Permit</h3>
            <p className="text-gray-700 mb-4">
              Required in most states. It&apos;s a simple online course ($10-30) that teaches food safety. Takes 2-3 hours.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">4. Business Structure</h3>
            <p className="text-gray-700 mb-4">
              Choose your business structure:
            </p>
            <ul className="space-y-3 mb-6 ml-6 text-gray-700">
              <li>• <strong>Sole Proprietorship:</strong> Easiest. You and the business are one entity. No separate filing needed.</li>
              <li>• <strong>LLC (Limited Liability Company):</strong> Protects your personal assets if sued. Costs $100-500 to set up. Recommended once you&apos;re making $20,000+/year.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">5. Insurance</h3>
            <p className="text-gray-700 mb-4">
              Get business liability insurance. If someone gets sick or has an allergic reaction, you&apos;re protected. Cost: $300-600/year.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">⚠️ Don&apos;t Skip This:</p>
              <p className="text-gray-700">
                One lawsuit can bankrupt you. Insurance is cheap compared to legal fees. Get it before you sell your first item.
              </p>
            </div>
          </section>

          <section id="setup">
            <h2 className="text-3xl font-bold mb-4">Setting Up Your Home Kitchen</h2>
            <p className="text-lg text-gray-700 mb-4">
              You don&apos;t need a fancy commercial kitchen to start. But you do need the right equipment and a clean, organized workspace.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Essential Equipment (Start Here)</h3>
            <div className="bg-gray-50 border rounded-lg p-6 mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-2">Equipment</th>
                    <th className="text-right py-2">Cost</th>
                    <th className="text-left pl-4 py-2">Why You Need It</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Stand Mixer</td>
                    <td className="text-right">$200-400</td>
                    <td className="pl-4">Essential for consistent results</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Oven Thermometer</td>
                    <td className="text-right">$10-20</td>
                    <td className="pl-4">Home ovens are often off by 25°F</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Digital Scale</td>
                    <td className="text-right">$20-40</td>
                    <td className="pl-4">Accurate measurements = consistency</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Cooling Racks</td>
                    <td className="text-right">$15-30</td>
                    <td className="pl-4">Multiple batches need space</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Mixing Bowls (set)</td>
                    <td className="text-right">$30-50</td>
                    <td className="pl-4">Various sizes for different recipes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Cake Pans (various)</td>
                    <td className="text-right">$50-100</td>
                    <td className="pl-4">6&quot;, 8&quot;, 9&quot; rounds minimum</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Piping Bags & Tips</td>
                    <td className="text-right">$30-50</td>
                    <td className="pl-4">Professional-looking decorations</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Packaging Supplies</td>
                    <td className="text-right">$50-100</td>
                    <td className="pl-4">Boxes, bags, labels, ribbon</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="py-3 font-bold">Total Startup:</td>
                    <td className="text-right py-3 font-bold text-green-600">$405-790</td>
                    <td className="pl-4 py-3 text-gray-600">One-time investment</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Nice-to-Have (Add Later)</h3>
            <ul className="space-y-2 mb-6 ml-6 text-gray-700">
              <li>• Second oven ($300-800) - doubles your capacity</li>
              <li>• Turntable for decorating ($20-40)</li>
              <li>• Offset spatulas ($15-30)</li>
              <li>• Bench scraper ($10-15)</li>
              <li>• Fondant tools ($30-60)</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Kitchen Organization Tips</h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Dedicate space:</strong> Clear out a cabinet or shelf for business supplies only</li>
                <li>• <strong>Label everything:</strong> Business ingredients separate from personal</li>
                <li>• <strong>Create a workflow:</strong> Prep area → Baking area → Decorating area → Packaging</li>
                <li>• <strong>Deep clean weekly:</strong> Cottage food inspectors can visit unannounced</li>
              </ul>
            </div>
          </section>

          <section id="products">
            <h2 className="text-3xl font-bold mb-4">Choosing Your Products</h2>
            <p className="text-lg text-gray-700 mb-4">
              Don&apos;t try to offer everything. Specialize in 3-5 products you can make exceptionally well. It&apos;s better to be known for amazing chocolate chip cookies than to be mediocre at 20 things.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Product Selection Criteria</h3>
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="font-semibold text-gray-900 mb-3">✅ Good Products to Start With:</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• <strong>Cookies:</strong> High margin, ship well, everyone loves them</li>
                  <li>• <strong>Brownies:</strong> Easy to make, good profit margin</li>
                  <li>• <strong>Cupcakes:</strong> Popular for parties, customizable</li>
                  <li>• <strong>Simple cakes:</strong> Birthdays, celebrations</li>
                  <li>• <strong>Bread:</strong> If you&apos;re good at it, loyal customers</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-3">❌ Avoid Starting With:</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• <strong>Wedding cakes:</strong> Too stressful for beginners</li>
                  <li>• <strong>Macarons:</strong> Difficult, time-consuming, finicky</li>
                  <li>• <strong>Cream-filled items:</strong> Often not allowed under cottage food laws</li>
                  <li>• <strong>Cheesecakes:</strong> Require refrigeration, not allowed in many states</li>
                  <li>• <strong>Anything you haven&apos;t perfected:</strong> Practice first!</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The Profit Test</h3>
            <p className="text-gray-700 mb-4">
              Before adding a product to your menu, calculate if it&apos;s profitable:
            </p>
            <div className="bg-gray-50 border rounded-lg p-6">
              <p className="font-semibold mb-3">Example: Chocolate Chip Cookies (Dozen)</p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Ingredients: $3.50</li>
                <li>• Packaging: $0.75</li>
                <li>• Labor (30 min × $25/hr): $12.50</li>
                <li>• Overhead (20%): $0.70</li>
                <li className="font-semibold pt-2 border-t">• Total Cost: $17.45</li>
              </ul>
              <p className="text-gray-700 mb-2">
                With 50% profit margin: $17.45 ÷ 0.5 = <strong className="text-rose-600">$34.90 selling price</strong>
              </p>
              <p className="text-gray-700">
                Round to <strong className="text-green-600">$35 per dozen</strong> ✓ Profitable!
              </p>
            </div>

            <div className="bg-rose-50 border-rose-200 mt-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-700 mb-3">
                    <strong>Use our calculators to test profitability:</strong>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/tools/recipe-cost-calculator">
                      <Button variant="outline" size="sm">Recipe Cost Calculator</Button>
                    </Link>
                    <Link href="/tools/cake-pricing-calculator">
                      <Button variant="outline" size="sm">Cake Pricing Calculator</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="pricing">
            <h2 className="text-3xl font-bold mb-4">Pricing for Profit</h2>
            <p className="text-lg text-gray-700 mb-4">
              This is where most home bakers fail. They undercharge because they feel guilty, compare to grocery store prices, or don&apos;t know their costs.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mb-6">
              <p className="text-gray-800 font-semibold mb-2">🚫 Never Do This:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• &quot;I&apos;ll charge $20 because that feels right&quot;</li>
                <li>• &quot;My competitor charges $15, so I&apos;ll charge $12&quot;</li>
                <li>• &quot;I just want to cover ingredients&quot;</li>
                <li>• &quot;I&apos;ll give friends a discount&quot;</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The Right Way to Price</h3>
            <div className="bg-gray-900 text-white p-6 rounded-lg font-mono mb-6">
              <div className="space-y-2">
                <div><strong className="text-rose-400">1. Calculate ALL Costs:</strong></div>
                <div className="pl-4">Ingredients + Packaging + Labor + Overhead</div>
                <div className="mt-4"><strong className="text-green-400">2. Add Profit Margin:</strong></div>
                <div className="pl-4">Total Cost ÷ (1 - Profit % )</div>
                <div className="mt-4"><strong className="text-blue-400">3. Round Up:</strong></div>
                <div className="pl-4">$34.87 → $35 or $40</div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Recommended Profit Margins</h3>
            <ul className="space-y-2 mb-6 ml-6 text-gray-700">
              <li>• <strong>Cookies & Brownies:</strong> 50-70% (easy to make, high volume)</li>
              <li>• <strong>Cupcakes:</strong> 50-60%</li>
              <li>• <strong>Simple Cakes:</strong> 50-60%</li>
              <li>• <strong>Custom Cakes:</strong> 60-100% (skill-intensive)</li>
              <li>• <strong>Specialty Items:</strong> 70-100% (unique, high-skill)</li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">✅ Pricing Confidence:</p>
              <p className="text-gray-700 mb-3">
                You&apos;re not competing with Walmart. You&apos;re offering:
              </p>
              <ul className="space-y-1 text-gray-700 ml-6">
                <li>• Fresh, made-to-order quality</li>
                <li>• Premium ingredients (real butter, not margarine!)</li>
                <li>• Customization and personal service</li>
                <li>• Supporting a local small business</li>
              </ul>
              <p className="text-gray-700 mt-3">
                <strong>Charge accordingly.</strong> The right customers will happily pay your prices.
              </p>
            </div>

            <p className="text-gray-700 mt-6">
              <strong>Read our complete guides:</strong>
            </p>
            <ul className="space-y-2 ml-6 text-gray-700">
              <li>• <Link href="/blog/how-to-calculate-recipe-cost" className="text-rose-600 hover:underline font-semibold">How to Calculate Recipe Cost</Link></li>
              <li>• <Link href="/blog/how-to-price-cakes" className="text-rose-600 hover:underline font-semibold">Cake Pricing Formula</Link></li>
            </ul>
          </section>

          <section id="marketing">
            <h2 className="text-3xl font-bold mb-4">Marketing Your Home Bakery</h2>
            <p className="text-lg text-gray-700 mb-4">
              You can make the best cookies in the world, but if nobody knows about them, you won&apos;t make sales. Marketing doesn&apos;t have to be expensive—it just needs to be consistent.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Social Media (Your #1 Tool)</h3>
            <p className="text-gray-700 mb-4">
              Instagram and Facebook are free marketing platforms with millions of potential customers. Here&apos;s how to use them effectively:
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <p className="font-semibold text-gray-900 mb-3">Instagram Strategy:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Post 4-5 times per week:</strong> Show finished products, process videos, behind-the-scenes</li>
                <li>• <strong>Use hashtags:</strong> #homebakery #customcakes #[yourcity]bakery (10-15 per post)</li>
                <li>• <strong>Stories daily:</strong> Polls, Q&As, &quot;order by&quot; deadlines, sold-out items</li>
                <li>• <strong>Reels:</strong> Short videos get 10x more reach than photos</li>
                <li>• <strong>Engage:</strong> Reply to every comment and DM within 24 hours</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Word of Mouth (Most Powerful)</h3>
            <p className="text-gray-700 mb-4">
              Your first 10 customers are your marketing team. Make their experience so good they can&apos;t help but tell friends.
            </p>
            <ul className="space-y-2 mb-6 ml-6 text-gray-700">
              <li>• Include business cards in every order</li>
              <li>• Ask happy customers for Google reviews</li>
              <li>• Offer referral discount: &quot;Give $5, Get $5&quot;</li>
              <li>• Package beautifully—people share pretty things on social media</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Local Marketing</h3>
            <div className="bg-gray-50 border rounded-lg p-6 mb-6">
              <p className="font-semibold mb-3">Free/Low-Cost Ideas:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Join local Facebook groups and introduce yourself (don&apos;t spam!)</li>
                <li>• Donate to school fundraisers (great exposure to parents)</li>
                <li>• Partner with local coffee shops to sell your products</li>
                <li>• Attend farmers markets or craft fairs</li>
                <li>• Network with event planners and wedding coordinators</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">4. Your First 10 Customers</h3>
            <p className="text-gray-700 mb-4">
              Getting started is the hardest part. Here&apos;s how to land your first customers:
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li><strong>Friends & family</strong> (charge full price!)</li>
                <li><strong>Post on your personal social media:</strong> &quot;I&apos;m starting a bakery! First 5 orders get 20% off&quot;</li>
                <li><strong>Join local Facebook groups</strong> and offer a launch special</li>
                <li><strong>Bring samples to work/church/gym</strong> with business cards</li>
                <li><strong>Ask for reviews</strong> from every customer</li>
              </ol>
              <p className="text-gray-700 mt-4 pt-4 border-t">
                <strong>Goal:</strong> Get 10 customers and 10 five-star reviews in your first month. This builds credibility for future customers.
              </p>
            </div>
          </section>

          <section id="operations">
            <h2 className="text-3xl font-bold mb-4">Systems & Operations</h2>
            <p className="text-lg text-gray-700 mb-4">
              The difference between a hobby and a business is systems. You need processes for taking orders, tracking inventory, managing finances, and delivering products.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Order Management</h3>
            <div className="bg-gray-50 border rounded-lg p-6 mb-6">
              <p className="font-semibold mb-3">Simple Order System:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Google Forms:</strong> Create order form with product options, delivery date, customer info</li>
                <li>• <strong>Spreadsheet:</strong> Track all orders (date, customer, product, price, status, paid?)</li>
                <li>• <strong>Calendar:</strong> Block out delivery dates when fully booked</li>
                <li>• <strong>Invoicing:</strong> Use PayPal, Venmo, or Square for payments</li>
              </ul>
              <p className="mt-4 pt-4 border-t text-gray-700">
                <strong>Pro tip:</strong> Require 50% deposit when booking, 50% before delivery. This protects you from cancellations.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Inventory & Shopping</h3>
            <p className="text-gray-700 mb-4">
              Running out of butter the night before a big order is a nightmare. Stay organized:
            </p>
            <ul className="space-y-2 mb-6 ml-6 text-gray-700">
              <li>• Keep a running shopping list on your phone</li>
              <li>• Stock up on staples when on sale (flour, sugar, butter)</li>
              <li>• Track ingredient costs monthly (prices fluctuate!)</li>
              <li>• Have backup suppliers for specialty items</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Financial Tracking</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mb-6">
              <p className="text-gray-800 font-semibold mb-3">⚠️ Critical: Track Every Dollar</p>
              <p className="text-gray-700 mb-3">
                Open a separate business bank account. Don&apos;t mix personal and business finances. Track:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• All income (every sale)</li>
                <li>• All expenses (ingredients, packaging, equipment, gas, marketing)</li>
                <li>• Mileage for deliveries (tax deductible!)</li>
                <li>• Set aside 25-30% for taxes</li>
              </ul>
              <p className="text-gray-700 mt-3">
                <strong>Use:</strong> Spreadsheet, QuickBooks, or our <Link href="/bakery-business-tool" className="text-rose-600 hover:underline font-semibold">Bakery Management Platform</Link>
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">4. Production Schedule</h3>
            <p className="text-gray-700 mb-4">
              Create a weekly schedule to avoid burnout:
            </p>
            <div className="bg-gray-50 border rounded-lg p-6">
              <p className="font-semibold mb-3">Example Weekly Schedule:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Monday:</strong> Take new orders, grocery shopping, prep work</li>
                <li>• <strong>Tuesday-Thursday:</strong> Baking days (batch similar items together)</li>
                <li>• <strong>Friday:</strong> Decorating, packaging, deliveries</li>
                <li>• <strong>Saturday:</strong> Deliveries, farmers market</li>
                <li>• <strong>Sunday:</strong> OFF (rest is essential!)</li>
              </ul>
            </div>
          </section>

          <section id="scaling">
            <h2 className="text-3xl font-bold mb-4">Scaling Your Business</h2>
            <p className="text-lg text-gray-700 mb-4">
              Once you&apos;re consistently making $2,000-3,000/month, you&apos;ll hit capacity. Here&apos;s how to grow without burning out:
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Growth Stages</h3>
            <div className="space-y-6 mb-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <p className="text-blue-600 font-bold text-lg mb-2">Stage 1: Solo ($0-3,000/month)</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• You do everything yourself</li>
                  <li>• Work 15-25 hours/week</li>
                  <li>• Focus on perfecting products and systems</li>
                  <li>• Build customer base and reviews</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
                <p className="text-purple-600 font-bold text-lg mb-2">Stage 2: Helpers ($3,000-8,000/month)</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Hire part-time help for baking or deliveries</li>
                  <li>• Invest in second oven or larger mixer</li>
                  <li>• Streamline production with batch baking</li>
                  <li>• Raise prices (demand exceeds capacity)</li>
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <p className="text-green-600 font-bold text-lg mb-2">Stage 3: Commercial Kitchen ($8,000-20,000+/month)</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Rent commercial kitchen space</li>
                  <li>• Hire employees</li>
                  <li>• Wholesale to coffee shops, restaurants</li>
                  <li>• Consider opening a storefront</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">When to Raise Prices</h3>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <p className="text-gray-700 mb-3">
                <strong>Raise prices when:</strong>
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• You&apos;re fully booked 2-3 weeks out</li>
                <li>• Ingredient costs increase by 10%+</li>
                <li>• You&apos;ve improved quality or added value</li>
                <li>• Annually (2-5% for inflation)</li>
              </ul>
              <p className="text-gray-700 mt-4 pt-4 border-t">
                <strong>Don&apos;t be afraid to lose customers.</strong> Losing price-shoppers and gaining quality-focused customers is a good trade. You&apos;ll make more money working less.
              </p>
            </div>
          </section>

          <section id="mistakes">
            <h2 className="text-3xl font-bold mb-4">Common Mistakes to Avoid</h2>
            <p className="text-lg text-gray-700 mb-6">
              Learn from others&apos; mistakes. These are the top reasons home bakeries fail:
            </p>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Underpricing from Day One</h3>
                <p className="text-gray-700 mb-3">
                  You charge $15 for cookies that cost $12 to make. You&apos;re making $3 profit for an hour of work. That&apos;s $3/hour. You can&apos;t sustain this.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Calculate costs properly. Include labor. Add 50-100% profit margin. It&apos;s easier to start high than to raise prices later.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Taking Every Order</h3>
                <p className="text-gray-700 mb-3">
                  Someone wants 200 cupcakes for tomorrow. You say yes. You stay up all night. You&apos;re exhausted and stressed. The cupcakes aren&apos;t your best work. The customer complains.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Set minimum lead times (1-2 weeks). Charge rush fees (50-100%) for last-minute orders. Say no when you need to.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. No Deposits or Contracts</h3>
                <p className="text-gray-700 mb-3">
                  You make a $300 cake. Customer cancels the day before. You can&apos;t sell it to anyone else. You&apos;re out $300 and 10 hours of work.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Require 50% non-refundable deposit. Use simple contracts for orders over $100. Protect yourself.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">4. Ignoring Taxes</h3>
                <p className="text-gray-700 mb-3">
                  You make $20,000 in your first year. Tax time comes. You owe $5,000 in taxes. You don&apos;t have it because you spent all the money on ingredients and bills.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Set aside 25-30% of every payment for taxes. Open a separate savings account. Don&apos;t touch it until tax time.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">5. Trying to Do Everything</h3>
                <p className="text-gray-700 mb-3">
                  You offer cookies, cakes, cupcakes, macarons, bread, pies, and custom sugar cookies. You&apos;re mediocre at all of them. You&apos;re overwhelmed and stressed.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Specialize in 3-5 products. Be exceptional at those. You can always add more later.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">6. No Marketing Plan</h3>
                <p className="text-gray-700 mb-3">
                  You post on Instagram once a month. You don&apos;t respond to comments. You wonder why you&apos;re not getting orders.
                </p>
                <p className="text-gray-700 font-semibold">
                  Solution: Post 4-5 times per week. Engage daily. Ask for reviews. Network locally. Marketing is not optional—it&apos;s essential.
                </p>
              </div>
            </div>
          </section>

          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How much money do I need to start?</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Minimum:</strong> $500-800 for basic equipment and first ingredient order.
                </p>
                <p className="text-gray-700">
                  <strong>Recommended:</strong> $1,000-2,000 for quality equipment, packaging, insurance, licenses, and marketing. You&apos;ll recoup this in your first 10-20 orders.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How much can I realistically make?</h3>
                <p className="text-gray-700 mb-3">
                  <strong>First 3 months:</strong> $500-1,500/month (building customer base)
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>6-12 months:</strong> $2,000-5,000/month (established, consistent orders)
                </p>
                <p className="text-gray-700">
                  <strong>1-2 years:</strong> $5,000-10,000+/month (if you scale properly)
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Can I do this part-time?</h3>
                <p className="text-gray-700">
                  Yes! Most home bakers start part-time. Bake on evenings/weekends, deliver on Saturdays. Expect to work 15-25 hours/week for $2,000-3,000/month. As you grow, you can transition to full-time.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What if I live in an apartment?</h3>
                <p className="text-gray-700 mb-3">
                  Check your lease and local laws. Some apartments prohibit home businesses. Some cottage food laws require a separate kitchen entrance.
                </p>
                <p className="text-gray-700">
                  <strong>Alternatives:</strong> Rent commercial kitchen space by the hour ($15-30/hr), or focus on products you can make in small batches.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How do I handle food allergies?</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Legally:</strong> Label all allergens (eggs, dairy, nuts, wheat, soy). Include a disclaimer: &quot;Made in a home kitchen that uses common allergens.&quot;
                </p>
                <p className="text-gray-700">
                  <strong>Practically:</strong> Don&apos;t guarantee allergen-free products unless you have a dedicated allergen-free kitchen. The liability is too high.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What about shipping baked goods?</h3>
                <p className="text-gray-700 mb-3">
                  Cookies, brownies, and bread ship well. Cakes and cupcakes don&apos;t (they get damaged).
                </p>
                <p className="text-gray-700">
                  <strong>If shipping:</strong> Use sturdy packaging, include &quot;fragile&quot; stickers, charge actual shipping costs + $5 handling. Test shipping to yourself first!
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How do I compete with grocery stores?</h3>
                <p className="text-gray-700 mb-3">
                  You don&apos;t. You&apos;re not selling the same product.
                </p>
                <p className="text-gray-700">
                  <strong>You offer:</strong> Fresh, made-to-order, premium ingredients, customization, personal service, supporting local. Grocery stores offer: cheap, mass-produced, preservatives, no customization.
                </p>
                <p className="text-gray-700 mt-3">
                  <strong>Your customers value quality over price.</strong> Focus on finding them, not competing with Walmart.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">When should I quit my day job?</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Don&apos;t quit until:</strong>
                </p>
                <ul className="space-y-1 text-gray-700 ml-6 mb-3">
                  <li>• You&apos;re consistently making 75-100% of your day job income for 6+ months</li>
                  <li>• You have 3-6 months expenses saved</li>
                  <li>• You have health insurance figured out</li>
                  <li>• You&apos;re confident you can scale further</li>
                </ul>
                <p className="text-gray-700">
                  Most successful bakers start part-time and transition slowly. There&apos;s no rush!
                </p>
              </div>
            </div>
          </section>

          <Card className="bg-rose-50 border-rose-200 mt-12">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <DollarSign className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready to Start Your Home Bakery?</h3>
                  <p className="mb-4">Use our free tools to price products, track costs, and manage your bakery business.</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/tools">
                      <Button className="bg-rose-500 hover:bg-rose-600">View All Free Tools</Button>
                    </Link>
                    <Link href="/bakery-business-tool">
                      <Button variant="outline">Try Full Platform</Button>
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
