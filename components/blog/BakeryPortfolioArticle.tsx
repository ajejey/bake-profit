'use client'

import Link from 'next/link'
import { Camera, Image, Sparkles, CheckCircle, Star, Eye, Share2, Smartphone, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '../layout/Footer'

export default function BakeryPortfolioArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → Bakery Portfolio Guide
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Creating a Bakery Portfolio That Attracts Orders
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Feb 7, 2025</span> • <span>15 min read</span> • <span className="text-rose-600 font-semibold">Marketing</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            Your baked goods are delicious, but if potential customers can&apos;t see them, they can&apos;t order them. A stunning bakery portfolio is your 24/7 salesperson—showcasing your best work and converting browsers into buyers.
          </p>

          <p className="text-xl text-gray-700">
            Whether you&apos;re building a website, Instagram feed, or digital menu, this guide will show you exactly how to create a portfolio that makes customers say, &quot;I need to order from them!&quot;
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Sparkles className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Build Your Digital Storefront with BakeProfit</h3>
                  <p className="mb-4">Create a beautiful online menu and portfolio in minutes. Share your products, accept orders, and grow your bakery business.</p>
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
              <li><a href="#why-portfolio" className="hover:text-rose-600">Why Your Portfolio Matters More Than You Think</a></li>
              <li><a href="#photography-basics" className="hover:text-rose-600">Photography Basics: Take Stunning Photos with Your Phone</a></li>
              <li><a href="#what-to-include" className="hover:text-rose-600">What to Include in Your Portfolio</a></li>
              <li><a href="#organizing" className="hover:text-rose-600">Organizing Your Portfolio for Maximum Impact</a></li>
              <li><a href="#platforms" className="hover:text-rose-600">Best Platforms for Your Bakery Portfolio</a></li>
              <li><a href="#descriptions" className="hover:text-rose-600">Writing Descriptions That Sell</a></li>
              <li><a href="#mistakes" className="hover:text-rose-600">Common Portfolio Mistakes to Avoid</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* Section 1: Why Portfolio Matters */}
          <section id="why-portfolio">
            <h2 className="text-3xl font-bold mb-4">Why Your Portfolio Matters More Than You Think</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              In the bakery business, customers eat with their eyes first. Before they taste your red velvet cake, they see it. Before they bite into your croissant, they imagine it. Your portfolio is where that first impression happens.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">The Numbers Don&apos;t Lie</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>93%</strong> of consumers consider visual appearance the key deciding factor in purchases</li>
                <li>• Bakeries with professional photos get <strong>3x more inquiries</strong> than those without</li>
                <li>• A well-organized portfolio can increase order values by <strong>25-40%</strong></li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Builds Trust Instantly
                </p>
                <p className="text-sm text-gray-700">
                  High-quality photos show you take your craft seriously. Customers trust professionals.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Justifies Your Prices
                </p>
                <p className="text-sm text-gray-700">
                  When customers see the quality of your work, they understand why you charge what you do.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Saves Time on Inquiries
                </p>
                <p className="text-sm text-gray-700">
                  A comprehensive portfolio answers questions before customers ask, reducing back-and-forth.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Enables Word-of-Mouth
                </p>
                <p className="text-sm text-gray-700">
                  Easy-to-share portfolios make it simple for happy customers to recommend you.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Photography Basics */}
          <section id="photography-basics">
            <h2 className="text-3xl font-bold mb-4">Photography Basics: Take Stunning Photos with Your Phone</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              You don&apos;t need expensive camera equipment. Modern smartphones take incredible photos—you just need to know a few tricks.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The 5 Rules of Bakery Photography</h3>

            <div className="space-y-4 mb-6">
              <div className="bg-white border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-rose-100 rounded-full p-2">
                    <Lightbulb className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">1. Natural Light is Everything</h4>
                    <p className="text-gray-700 text-sm">Shoot near a window during the day. Avoid direct sunlight (causes harsh shadows) and overhead kitchen lights (creates yellow tones). The best time is morning or late afternoon.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-rose-100 rounded-full p-2">
                    <Camera className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">2. Clean Your Lens</h4>
                    <p className="text-gray-700 text-sm">This sounds obvious, but a smudged phone lens is the #1 reason for blurry photos. Wipe it with a soft cloth before every shoot.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-rose-100 rounded-full p-2">
                    <Image className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">3. Use Simple Backgrounds</h4>
                    <p className="text-gray-700 text-sm">A clean marble surface, wooden cutting board, or plain white backdrop lets your baked goods shine. Avoid busy patterns or cluttered backgrounds.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-rose-100 rounded-full p-2">
                    <Eye className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">4. Shoot at Eye Level or Slightly Above</h4>
                    <p className="text-gray-700 text-sm">For most baked goods, a 45-degree angle works best. Flat lays (directly above) work great for cookies and decorated cakes.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-rose-100 rounded-full p-2">
                    <Smartphone className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">5. Take Multiple Shots</h4>
                    <p className="text-gray-700 text-sm">Professional photographers take hundreds of photos to get one perfect shot. Take at least 10-20 photos of each item from different angles.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">📱 Pro Tip: Phone Settings</p>
              <p className="text-gray-700">
                Turn on gridlines in your camera app to help with composition. Use portrait mode for close-ups of individual items. Avoid using the flash—it creates unflattering shadows.
              </p>
            </div>
          </section>

          {/* Section 3: What to Include */}
          <section id="what-to-include">
            <h2 className="text-3xl font-bold mb-4">What to Include in Your Portfolio</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              A great portfolio isn&apos;t just a random collection of photos. It&apos;s strategically curated to show your range, quality, and personality.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Essential Portfolio Elements</h3>

            <div className="space-y-4 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">1. Hero Shots (Your Best Work)</h4>
                <p className="text-gray-700">Select 3-5 of your absolute best pieces. These should be front and center—the first thing visitors see. Make them count.</p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">2. Category Samples</h4>
                <p className="text-gray-700">Show variety within each category you offer. If you make cakes, show birthday cakes, wedding cakes, and custom designs. If you make cookies, show decorated, drop, and specialty varieties.</p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">3. Detail Shots</h4>
                <p className="text-gray-700">Close-ups of intricate decorations, textures, and finishes. These show the quality and care you put into your work.</p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">4. Process Photos</h4>
                <p className="text-gray-700">Behind-the-scenes shots of you working, ingredients being prepared, or items coming out of the oven. These build connection and trust.</p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">5. Customer Photos (With Permission)</h4>
                <p className="text-gray-700">Real photos from real customers at real events. These provide social proof and show your products in context.</p>
              </div>
            </div>

            <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">Quality Over Quantity</p>
              <p className="text-gray-700">
                It&apos;s better to have 20 stunning photos than 100 mediocre ones. Curate ruthlessly. If a photo doesn&apos;t make you proud, don&apos;t include it.
              </p>
            </div>
          </section>

          {/* Section 4: Organizing */}
          <section id="organizing">
            <h2 className="text-3xl font-bold mb-4">Organizing Your Portfolio for Maximum Impact</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              How you organize your portfolio is just as important as what&apos;s in it. Make it easy for customers to find what they&apos;re looking for.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Recommended Categories</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">By Product Type</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Cakes</li>
                  <li>• Cupcakes</li>
                  <li>• Cookies</li>
                  <li>• Pastries</li>
                  <li>• Bread</li>
                  <li>• Specialty Items</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">By Occasion</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Weddings</li>
                  <li>• Birthdays</li>
                  <li>• Baby Showers</li>
                  <li>• Holidays</li>
                  <li>• Corporate Events</li>
                  <li>• Everyday Treats</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Navigation Tip</p>
              <p className="text-gray-700">
                Put your most popular or profitable items first. Most visitors won&apos;t scroll through your entire portfolio—make sure they see your best work immediately.
              </p>
            </div>
          </section>

          {/* Section 5: Platforms */}
          <section id="platforms">
            <h2 className="text-3xl font-bold mb-4">Best Platforms for Your Bakery Portfolio</h2>
            
            <div className="space-y-4 mb-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h4 className="font-bold text-gray-900">Instagram</h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Best for Discovery</span>
                </div>
                <p className="text-gray-700 text-sm">Perfect for visual content. Use hashtags to get discovered. Great for building a following and showcasing your personality.</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h4 className="font-bold text-gray-900">Digital Menu/Storefront</h4>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Best for Orders</span>
                </div>
                <p className="text-gray-700 text-sm">A dedicated menu page with prices and ordering capability. BakeProfit offers free digital storefronts that you can share with customers.</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h4 className="font-bold text-gray-900">Facebook Page</h4>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Best for Local</span>
                </div>
                <p className="text-gray-700 text-sm">Great for local customers and community groups. Easy to share and get reviews. Older demographic tends to prefer Facebook.</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h4 className="font-bold text-gray-900">Personal Website</h4>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Best for Credibility</span>
                </div>
                <p className="text-gray-700 text-sm">Most professional option. Full control over design and content. Can be expensive and time-consuming to maintain.</p>
              </div>
            </div>

            <Card className="bg-rose-50 border-rose-200">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Share2 className="h-8 w-8 text-rose-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Create Your Free Digital Storefront</h3>
                    <p className="mb-4">BakeProfit lets you create a beautiful, shareable menu page in minutes. Add your products, set prices, and share a single link with customers.</p>
                    <Link href="/bakery-business-tool">
                      <Button className="bg-rose-500 hover:bg-rose-600">Build Your Menu →</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 6: Descriptions */}
          <section id="descriptions">
            <h2 className="text-3xl font-bold mb-4">Writing Descriptions That Sell</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Great photos get attention, but great descriptions close the sale. Here&apos;s how to write descriptions that make mouths water.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The Formula for Irresistible Descriptions</h3>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="font-mono text-sm mb-4">[Sensory Word] + [Key Ingredient/Flavor] + [Texture/Experience] + [Unique Selling Point]</p>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="text-gray-500 text-xs mb-1">Example 1:</p>
                  <p className="text-gray-900">&quot;Rich, velvety chocolate ganache layered between moist devil&apos;s food cake, finished with hand-piped rosettes. Serves 12-15.&quot;</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-gray-500 text-xs mb-1">Example 2:</p>
                  <p className="text-gray-900">&quot;Buttery, flaky croissants made with 72-hour fermented dough. Best enjoyed warm with your morning coffee.&quot;</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Words That Sell</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Texture Words</h4>
                <p className="text-sm text-gray-700">Moist, fluffy, crispy, creamy, velvety, tender, flaky, chewy, crunchy</p>
              </div>
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Flavor Words</h4>
                <p className="text-sm text-gray-700">Rich, decadent, tangy, zesty, sweet, buttery, aromatic, bold, subtle</p>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Quality Words</h4>
                <p className="text-sm text-gray-700">Handcrafted, artisan, homemade, fresh-baked, premium, signature, classic</p>
              </div>
            </div>
          </section>

          {/* Section 7: Mistakes */}
          <section id="mistakes">
            <h2 className="text-3xl font-bold mb-4">Common Portfolio Mistakes to Avoid</h2>
            
            <div className="space-y-4 mb-6">
              <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-bold text-gray-900 mb-2">❌ Using Low-Quality or Blurry Photos</h4>
                <p className="text-gray-700 text-sm">One bad photo can undo the impression of ten good ones. Delete anything that doesn&apos;t represent your best work.</p>
              </div>

              <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-bold text-gray-900 mb-2">❌ Inconsistent Editing Style</h4>
                <p className="text-gray-700 text-sm">Stick to one filter or editing style. Mixing warm and cool tones, or bright and dark photos, looks unprofessional.</p>
              </div>

              <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-bold text-gray-900 mb-2">❌ No Prices or Ordering Information</h4>
                <p className="text-gray-700 text-sm">Don&apos;t make customers hunt for how to order. Include clear pricing and a simple way to contact you or place an order.</p>
              </div>

              <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-bold text-gray-900 mb-2">❌ Outdated Content</h4>
                <p className="text-gray-700 text-sm">If your last post was 6 months ago, customers wonder if you&apos;re still in business. Update regularly, even if it&apos;s just once a week.</p>
              </div>

              <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-bold text-gray-900 mb-2">❌ Showing Products You No Longer Offer</h4>
                <p className="text-gray-700 text-sm">Nothing frustrates customers more than falling in love with something you don&apos;t make anymore. Keep your portfolio current.</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">How many photos should I have in my portfolio?</h4>
                <p className="text-gray-700">Quality over quantity. Aim for 20-50 high-quality photos that represent your range. It&apos;s better to have fewer stunning photos than many mediocre ones.</p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Do I need a professional photographer?</h4>
                <p className="text-gray-700">Not necessarily. With good natural lighting and the tips in this guide, you can take professional-looking photos with your smartphone. However, for special occasions like a website launch, a professional shoot can be worth the investment.</p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">How often should I update my portfolio?</h4>
                <p className="text-gray-700">Add new work at least monthly. Remove outdated items immediately. Your portfolio should always reflect what you currently offer and your current skill level.</p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Should I include prices in my portfolio?</h4>
                <p className="text-gray-700">Yes! Customers appreciate transparency. Including prices saves time for both you and potential customers by filtering out those who can&apos;t afford your products.</p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <Card className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
            <CardContent className="pt-6 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Showcase Your Baked Goods?</h3>
              <p className="mb-6 text-rose-100">Create a beautiful digital storefront with BakeProfit. Add your products, set prices, and share a single link with customers. It&apos;s free to start.</p>
              <Link href="/bakery-business-tool">
                <Button className="bg-white text-rose-600 hover:bg-rose-50 font-bold px-8 py-3">
                  Create Your Portfolio →
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <div className="border-t pt-8 mt-8">
            <h3 className="text-xl font-bold mb-4">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/bakery-branding-on-budget" className="block p-4 border rounded-lg hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-1">Bakery Branding on a Budget</h4>
                <p className="text-sm text-gray-600">Create a professional brand for under $100</p>
              </Link>
              <Link href="/blog/how-to-price-cakes" className="block p-4 border rounded-lg hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-1">How to Price Cakes for Profit</h4>
                <p className="text-sm text-gray-600">Stop undercharging for your beautiful creations</p>
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
