'use client'

import Link from 'next/link'
import { Palette, DollarSign, Sparkles, Camera, Package, CheckCircle, XCircle, Instagram, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '../layout/Footer'

export default function BakeryBrandingBudgetArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → Bakery Branding on a Budget
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Bakery Branding on a Budget: Complete DIY Guide for Under $100
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Feb 5, 2025</span> • <span>18 min read</span> • <span className="text-rose-600 font-semibold">Branding & Marketing</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            You&apos;ve perfected your recipes. Your cupcakes are Instagram-worthy, your cookies sell out every time, and customers keep asking, &quot;Do you have a business card?&quot; But when you look at professional bakery brands with their gorgeous logos, custom packaging, and cohesive social media—you think, &quot;I can&apos;t afford that.&quot;
          </p>

          <p className="text-xl text-gray-700">
            Here&apos;s the truth: <strong>You don&apos;t need thousands of dollars to create a professional bakery brand.</strong> With the right free tools, a bit of creativity, and strategic spending in the right places, you can build a complete brand identity for under $100.
          </p>

          <p className="text-lg text-gray-700">
            I&apos;ve helped dozens of home bakers create their brands from scratch, and I&apos;ve seen what works (and what&apos;s a waste of money). In this guide, I&apos;ll walk you through every step of DIY bakery branding—from designing your logo to creating packaging that makes customers say &quot;wow.&quot; By the end, you&apos;ll have a professional brand without the professional price tag.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Sparkles className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Build Your Bakery Brand with BakeProfit</h3>
                  <p className="mb-4">Track your branding expenses, manage orders, and grow your bakery business with our free tools. No credit card required.</p>
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
              <li><a href="#why-branding" className="hover:text-rose-600">Why Branding Matters (Even for Home Bakers)</a></li>
              <li><a href="#budget-breakdown" className="hover:text-rose-600">Complete Budget Breakdown: $50-100 Total</a></li>
              <li><a href="#brand-identity" className="hover:text-rose-600">Step 1: Define Your Brand Identity</a></li>
              <li><a href="#logo-design" className="hover:text-rose-600">Step 2: DIY Logo Design (Free Tools & Tutorial)</a></li>
              <li><a href="#color-fonts" className="hover:text-rose-600">Step 3: Choose Your Colors & Fonts</a></li>
              <li><a href="#business-cards" className="hover:text-rose-600">Step 4: Create Business Cards & Print Materials</a></li>
              <li><a href="#packaging" className="hover:text-rose-600">Step 5: Design Affordable Branded Packaging</a></li>
              <li><a href="#social-media" className="hover:text-rose-600">Step 6: Build Your Social Media Presence</a></li>
              <li><a href="#photography" className="hover:text-rose-600">Step 7: Take Professional-Looking Photos (With Your Phone)</a></li>
              <li><a href="#mistakes" className="hover:text-rose-600">5 Branding Mistakes That Waste Money</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* Section 1: Why Branding Matters */}
          <section id="why-branding">
            <h2 className="text-3xl font-bold mb-4">Why Branding Matters (Even for Home Bakers)</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              &quot;I&apos;m just a home baker. Do I really need branding?&quot; I hear this all the time. And the answer is: <strong>Yes, especially if you want to charge what you&apos;re worth.</strong>
            </p>

            <p className="text-lg text-gray-700 mb-6">
              Think about it: When you see two bakeries on Instagram—one with a professional logo, cohesive photos, and branded packaging, and another with random photos and no consistent look—which one would you trust with your daughter&apos;s birthday cake? Which one could charge $5 per cupcake instead of $2?
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Real Example: Sarah&apos;s Cookie Business</h3>
              <p className="text-gray-700 mb-3">
                Sarah was selling custom cookies for $24/dozen from her home kitchen. Great cookies, but no branding—just photos on Facebook with inconsistent filters and no logo.
              </p>
              <p className="text-gray-700 mb-3">
                After spending $75 on DIY branding (logo, stickers, business cards), she raised her prices to $36/dozen. Not only did customers not complain—they started calling her cookies &quot;premium&quot; and &quot;professional.&quot; Her revenue jumped 50% in two months.
              </p>
              <p className="text-gray-700 font-semibold">
                The branding didn&apos;t change the cookies. It changed how customers perceived their value.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">What Good Branding Does for Your Bakery</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Makes You Memorable
                </p>
                <p className="text-sm text-gray-700">
                  Customers remember your logo and colors. When they need a cake, you&apos;re the first name they think of.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Justifies Higher Prices
                </p>
                <p className="text-sm text-gray-700">
                  Professional branding signals quality. Customers expect to pay more for a &quot;brand&quot; than a hobby baker.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Builds Trust
                </p>
                <p className="text-sm text-gray-700">
                  Consistent branding makes you look established and reliable—even if you just started last month.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Creates Word-of-Mouth
                </p>
                <p className="text-sm text-gray-700">
                  When customers love your branding, they share it. Branded packaging becomes free advertising.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Key Insight:</p>
              <p className="text-gray-700">
                Branding isn&apos;t about being fancy—it&apos;s about being consistent and professional. A simple logo used everywhere is better than a complex logo used nowhere.
              </p>
            </div>
          </section>

          {/* Section 2: Budget Breakdown */}
          <section id="budget-breakdown">
            <h2 className="text-3xl font-bold mb-4">Complete Budget Breakdown: $50-100 Total</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Let&apos;s get specific. Here&apos;s exactly what you need to spend to create a complete bakery brand:
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">DIY Branding Budget</h3>
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Logo Design (Canva/DesignEvo):</span>
                  <span className="font-semibold text-green-600">$0 (Free)</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Business Cards (250 cards):</span>
                  <span className="font-semibold text-gray-900">$20-30</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Branded Stickers (100-200):</span>
                  <span className="font-semibold text-gray-900">$15-25</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Social Media Setup:</span>
                  <span className="font-semibold text-green-600">$0 (Free)</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Packaging Supplies (boxes, ribbon):</span>
                  <span className="font-semibold text-gray-900">$20-40</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-700">Photography Setup (phone + props):</span>
                  <span className="font-semibold text-green-600">$0-15</span>
                </div>
                <div className="flex justify-between pt-3 border-t-2 border-gray-400">
                  <span className="font-bold text-gray-900 text-lg">Total Investment:</span>
                  <span className="font-bold text-rose-600 text-lg">$55-110</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">What You Get for $50-100</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• Professional logo you can use everywhere</li>
                <li>• 250 business cards to hand out</li>
                <li>• 100-200 branded stickers for packaging</li>
                <li>• Complete social media presence (Instagram + Facebook)</li>
                <li>• Branded packaging that makes customers say &quot;wow&quot;</li>
                <li>• Photography setup for professional-looking product photos</li>
                <li>• Brand guidelines to keep everything consistent</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">ROI: How Fast You&apos;ll Make It Back</h3>
              <p className="text-gray-700 mb-3">
                If branding lets you charge just $1 more per dozen (very conservative):
              </p>
              <ul className="text-gray-700 space-y-2 ml-6 mb-3">
                <li>• Sell 50 dozen = $50 extra revenue (break even)</li>
                <li>• Sell 100 dozen = $100 extra revenue (2x return)</li>
                <li>• Sell 200 dozen = $200 extra revenue (4x return)</li>
              </ul>
              <p className="text-gray-700 font-semibold">
                Most home bakers recoup their branding investment in 1-2 months. After that, it&apos;s pure profit.
              </p>
            </div>
          </section>

          {/* Section 3: Brand Identity */}
          <section id="brand-identity">
            <h2 className="text-3xl font-bold mb-4">Step 1: Define Your Brand Identity</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Before you design anything, you need to know WHO you are as a brand. This takes 15 minutes and will guide every decision you make.
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Brand Identity Worksheet</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">1. What&apos;s your bakery style?</p>
                  <p className="text-gray-700 text-sm ml-4">
                    Examples: Rustic & homemade, Modern & minimalist, Elegant & luxury, Fun & whimsical, Classic & traditional
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">2. Who is your ideal customer?</p>
                  <p className="text-gray-700 text-sm ml-4">
                    Examples: Busy moms, Wedding planners, Corporate clients, Young professionals, Budget-conscious families
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">3. What makes you different?</p>
                  <p className="text-gray-700 text-sm ml-4">
                    Examples: Organic ingredients, Custom designs, Same-day delivery, Allergy-friendly options, Family recipes
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">4. If your bakery was a person, how would they dress?</p>
                  <p className="text-gray-700 text-sm ml-4">
                    This helps you visualize your brand personality. Jeans and flannel? Elegant dress? Colorful and fun?
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Real Example: Three Different Brand Identities</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">Sweet Home Bakery (Rustic & Homemade)</p>
                  <p className="text-gray-700 text-sm">
                    Colors: Warm browns, cream, soft pink • Fonts: Handwritten script • Vibe: Grandma&apos;s kitchen, comfort, nostalgia
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Luxe Patisserie (Modern & Elegant)</p>
                  <p className="text-gray-700 text-sm">
                    Colors: Black, gold, white • Fonts: Thin serif, clean sans-serif • Vibe: Sophisticated, premium, minimalist
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rainbow Treats (Fun & Whimsical)</p>
                  <p className="text-gray-700 text-sm">
                    Colors: Bright pink, turquoise, yellow • Fonts: Rounded, playful • Vibe: Joyful, creative, Instagram-worthy
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-700">
                Create a Pinterest board with 15-20 images that represent your ideal brand. Include logos you like, color palettes, packaging designs, and photos that match your vibe. This will be your reference when designing.
              </p>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Palette className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Track Your Branding Journey</h3>
                  <p className="mb-4">Use BakeProfit to organize your brand assets, track expenses, and manage your growing bakery business. Free forever.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Get Started Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Logo Design */}
          <section id="logo-design">
            <h2 className="text-3xl font-bold mb-4">Step 2: DIY Logo Design (Free Tools & Tutorial)</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Your logo is the cornerstone of your brand. The good news? You don&apos;t need to hire a designer or learn complicated software. These free tools make it easy:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">🎨 Canva (Recommended)</h3>
                <p className="text-gray-700 mb-3 text-sm">
                  <strong>Best for:</strong> Beginners who want templates and easy drag-and-drop
                </p>
                <ul className="text-gray-700 text-sm space-y-1 ml-6 mb-3">
                  <li>• 1000s of bakery logo templates</li>
                  <li>• Drag-and-drop interface</li>
                  <li>• Free fonts and graphics</li>
                  <li>• Download PNG with transparent background (paid feature, but 30-day free trial)</li>
                </ul>
                <p className="text-gray-700 text-sm font-semibold">
                  Cost: Free (or $13/month for Pro features)
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">🎨 DesignEvo</h3>
                <p className="text-gray-700 mb-3 text-sm">
                  <strong>Best for:</strong> Quick logo creation with bakery-specific templates
                </p>
                <ul className="text-gray-700 text-sm space-y-1 ml-6 mb-3">
                  <li>• Bakery-specific templates</li>
                  <li>• Simple customization</li>
                  <li>• Free low-res download</li>
                  <li>• High-res for $24.99 (one-time)</li>
                </ul>
                <p className="text-gray-700 text-sm font-semibold">
                  Cost: Free for low-res, $24.99 for high-res
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">🎨 LogoMakr</h3>
                <p className="text-gray-700 mb-3 text-sm">
                  <strong>Best for:</strong> Simple text-based logos
                </p>
                <ul className="text-gray-700 text-sm space-y-1 ml-6 mb-3">
                  <li>• Very simple interface</li>
                  <li>• Good for text + icon logos</li>
                  <li>• Free low-res download</li>
                  <li>• High-res for $19</li>
                </ul>
                <p className="text-gray-700 text-sm font-semibold">
                  Cost: Free for low-res, $19 for high-res
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">🎨 Hatchful (Shopify)</h3>
                <p className="text-gray-700 mb-3 text-sm">
                  <strong>Best for:</strong> AI-powered logo generation
                </p>
                <ul className="text-gray-700 text-sm space-y-1 ml-6 mb-3">
                  <li>• AI generates logos for you</li>
                  <li>• Answer a few questions</li>
                  <li>• Multiple variations</li>
                  <li>• Completely free download</li>
                </ul>
                <p className="text-gray-700 text-sm font-semibold">
                  Cost: 100% Free
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Step-by-Step: Creating Your Logo in Canva</h3>
              <ol className="text-gray-700 space-y-3 ml-6">
                <li>
                  <strong>1. Sign up for Canva</strong> (free account)
                </li>
                <li>
                  <strong>2. Search for &quot;bakery logo&quot;</strong> in templates
                </li>
                <li>
                  <strong>3. Choose a template</strong> that matches your brand style (rustic, modern, elegant, etc.)
                </li>
                <li>
                  <strong>4. Customize it:</strong>
                  <ul className="ml-6 mt-2 space-y-1 text-sm">
                    <li>• Replace text with your bakery name</li>
                    <li>• Change colors to your brand palette</li>
                    <li>• Swap icons if needed (search &quot;cupcake,&quot; &quot;whisk,&quot; &quot;rolling pin&quot;)</li>
                    <li>• Adjust font if it doesn&apos;t match your vibe</li>
                  </ul>
                </li>
                <li>
                  <strong>5. Keep it simple:</strong> 1-2 colors, 1-2 fonts, minimal elements
                </li>
                <li>
                  <strong>6. Download as PNG</strong> with transparent background (requires Pro trial or paid account)
                </li>
                <li>
                  <strong>7. Save multiple versions:</strong> Full logo, icon only, horizontal, vertical
                </li>
              </ol>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">❌ Logo Design Mistakes to Avoid</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Too Many Elements
                  </p>
                  <p className="text-gray-700 text-sm ml-7">
                    Don&apos;t use 5 different icons, 4 colors, and 3 fonts. Simple = memorable.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Hard-to-Read Fonts
                  </p>
                  <p className="text-gray-700 text-sm ml-7">
                    Your logo should be readable at small sizes (business card, Instagram profile pic).
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Generic Clip Art
                  </p>
                  <p className="text-gray-700 text-sm ml-7">
                    Avoid overused cupcake clipart that 100 other bakeries use. Choose unique icons or just use text.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Low Resolution
                  </p>
                  <p className="text-gray-700 text-sm ml-7">
                    Always download the highest resolution available. Blurry logos look unprofessional.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-700">
                Start Canva&apos;s 30-day Pro trial when you&apos;re ready to download your final logo. This gives you transparent backgrounds (PNG) and access to premium elements. Cancel before 30 days if you don&apos;t want to pay.
              </p>
            </div>
          </section>

          {/* Section 5: Colors & Fonts */}
          <section id="color-fonts">
            <h2 className="text-3xl font-bold mb-4">Step 3: Choose Your Colors & Fonts</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Your brand colors and fonts create instant recognition. When customers see your signature pink and that specific script font, they know it&apos;s you—even before reading your name.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Choosing Your Brand Colors</h3>
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <p className="text-gray-700 mb-4">
                <strong>Rule: Pick 2-3 colors maximum.</strong> One primary color, one secondary, and optionally one accent.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Color Psychology for Bakeries:</p>
                  <ul className="text-gray-700 text-sm space-y-2 ml-6">
                    <li>• <strong>Pink/Rose:</strong> Sweet, feminine, playful (cupcakes, cookies)</li>
                    <li>• <strong>Brown/Cream:</strong> Rustic, homemade, comforting (bread, pies)</li>
                    <li>• <strong>Black/Gold:</strong> Elegant, premium, sophisticated (luxury cakes)</li>
                    <li>• <strong>Pastels:</strong> Soft, delicate, whimsical (macarons, desserts)</li>
                    <li>• <strong>Red/Yellow:</strong> Bold, energetic, appetite-stimulating (donuts, pizza)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Free Color Palette Tools</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Coolors.co:</strong> Generate color palettes with one click</li>
                <li>• <strong>Adobe Color:</strong> Create palettes from photos</li>
                <li>• <strong>Canva Color Palette Generator:</strong> Upload a photo, get matching colors</li>
                <li>• <strong>Pinterest:</strong> Search &quot;bakery color palette&quot; for inspiration</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Choosing Your Brand Fonts</h3>
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <p className="text-gray-700 mb-4">
                <strong>Rule: Pick 1-2 fonts.</strong> One for your logo/headings, one for body text (optional).
              </p>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Font Styles & What They Say:</p>
                  <ul className="text-gray-700 text-sm space-y-2 ml-6">
                    <li>• <strong>Script/Handwritten:</strong> Personal, homemade, warm (home bakeries)</li>
                    <li>• <strong>Serif (with little feet):</strong> Classic, traditional, elegant (French patisseries)</li>
                    <li>• <strong>Sans-Serif (clean lines):</strong> Modern, minimalist, professional (contemporary bakeries)</li>
                    <li>• <strong>Rounded:</strong> Friendly, playful, fun (kids&apos; treats, cupcakes)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Free Font Resources</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Google Fonts:</strong> 1000+ free fonts (Playfair Display, Montserrat, Pacifico)</li>
                <li>• <strong>DaFont:</strong> Free fonts for personal use</li>
                <li>• <strong>Font Squirrel:</strong> Commercial-use free fonts</li>
                <li>• <strong>Canva:</strong> Built-in font library (100+ free fonts)</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-700">
                Create a simple brand guide document: Save your exact color codes (hex codes like #FF6B9D) and font names. This ensures you use the EXACT same colors and fonts everywhere—consistency is key.
              </p>
            </div>
          </section>

          {/* Section 6: Business Cards */}
          <section id="business-cards">
            <h2 className="text-3xl font-bold mb-4">Step 4: Create Business Cards & Print Materials</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Business cards are your most important physical branding tool. They&apos;re how customers remember you and refer you to friends.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">What to Include on Your Business Card</h3>
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Your logo</strong> (front and center)</li>
                <li>• <strong>Business name</strong></li>
                <li>• <strong>Your name</strong></li>
                <li>• <strong>Phone number</strong> (most important—people call to order)</li>
                <li>• <strong>Instagram handle</strong> (where they see your work)</li>
                <li>• <strong>Email</strong> (optional but professional)</li>
                <li>• <strong>Website</strong> (if you have one)</li>
                <li>• <strong>Tagline</strong> (optional: &quot;Custom Cakes & Cookies&quot;)</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Affordable Printing Options</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900">🏆 Vistaprint (Best Value)</p>
                  <p className="text-gray-700 text-sm mb-2">
                    500 business cards: $10-20 • Frequent sales • Standard quality • 5-7 day shipping
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">🏆 Moo (Premium Quality)</p>
                  <p className="text-gray-700 text-sm mb-2">
                    50 cards: $20 • Thick, luxe feel • Multiple designs per pack • 7-10 day shipping
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">🏆 Canva Print</p>
                  <p className="text-gray-700 text-sm mb-2">
                    50 cards: $10-15 • Design in Canva, order directly • Good quality • 5-7 day shipping
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">🏆 Local Print Shop</p>
                  <p className="text-gray-700 text-sm mb-2">
                    Varies • Same-day or next-day • Support local • Usually $20-40 for 250 cards
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">DIY Business Card Design in Canva</h3>
              <ol className="text-gray-700 space-y-2 ml-6">
                <li>1. Search &quot;business card&quot; in Canva templates</li>
                <li>2. Choose a template that matches your brand style</li>
                <li>3. Add your logo, name, phone, Instagram</li>
                <li>4. Use your brand colors and fonts</li>
                <li>5. Keep it simple—white space is good</li>
                <li>6. Download as PDF (print quality)</li>
                <li>7. Upload to Vistaprint or Canva Print</li>
              </ol>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-700">
                Order 250-500 cards to start. Include one with every order. Hand them out at farmers markets, school events, and to anyone who compliments your baking. They&apos;re your cheapest marketing tool.
              </p>
            </div>
          </section>

          {/* Section 7: Packaging */}
          <section id="packaging">
            <h2 className="text-3xl font-bold mb-4">Step 5: Design Affordable Branded Packaging</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Packaging is where your brand comes to life. It&apos;s the moment customers unbox their order and think, &quot;Wow, this is professional.&quot; And it doesn&apos;t have to be expensive.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The Budget Packaging Strategy</h3>
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <p className="text-gray-700 mb-4">
                <strong>Core Principle:</strong> Buy plain, affordable packaging and brand it yourself with stickers.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">What You Need:</p>
                  <ul className="text-gray-700 text-sm space-y-1 ml-6 mt-2">
                    <li>• <strong>Plain kraft boxes</strong> (Amazon, Uline, WebstaurantStore) - $0.50-1.50 each</li>
                    <li>• <strong>Branded stickers</strong> (Vistaprint, Sticker Mule) - $0.10-0.25 each</li>
                    <li>• <strong>Tissue paper</strong> (optional, in brand colors) - $0.10 per sheet</li>
                    <li>• <strong>Ribbon or twine</strong> (optional) - $0.05-0.15 per order</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Affordable Packaging Sources</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    Boxes & Containers
                  </p>
                  <ul className="text-gray-700 text-sm space-y-1 ml-6 mt-2">
                    <li>• <strong>Amazon:</strong> Bulk kraft boxes, cupcake boxes, cookie boxes</li>
                    <li>• <strong>WebstaurantStore:</strong> Restaurant supply, great bulk pricing</li>
                    <li>• <strong>Uline:</strong> Industrial packaging, minimum orders but cheapest</li>
                    <li>• <strong>Dollar Tree:</strong> Small boxes, bags, tissue paper ($1.25 each)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    Branded Stickers
                  </p>
                  <ul className="text-gray-700 text-sm space-y-1 ml-6 mt-2">
                    <li>• <strong>Vistaprint:</strong> 100 stickers for $15-25 (frequent sales)</li>
                    <li>• <strong>Sticker Mule:</strong> Premium quality, $19 for 50 stickers</li>
                    <li>• <strong>Avery Labels:</strong> Print at home on your printer ($10 for 100)</li>
                    <li>• <strong>Canva Print:</strong> Design and order directly from Canva</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">DIY Packaging Ideas (Under $1 per order)</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">Budget Option ($0.60-0.80):</p>
                  <p className="text-gray-700 text-sm">
                    Plain kraft box ($0.50) + branded sticker ($0.10-0.30) = Professional look for under $1
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Mid-Tier Option ($1.00-1.50):</p>
                  <p className="text-gray-700 text-sm">
                    Kraft box ($0.50) + sticker ($0.20) + tissue paper ($0.10) + ribbon ($0.10) + business card ($0.05) = Elevated presentation
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Premium Option ($2.00-3.00):</p>
                  <p className="text-gray-700 text-sm">
                    Custom printed box ($1.50-2.00) + branded sticker ($0.20) + ribbon ($0.15) + thank-you card ($0.15) = Luxury unboxing
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-700">
                Start with the budget option. As you grow and raise prices, upgrade to mid-tier or premium. Your packaging cost should be 5-10% of your product price maximum.
              </p>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <DollarSign className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Track Your Packaging Costs</h3>
                  <p className="mb-4">Use BakeProfit to calculate your true cost per order including packaging. Make sure you&apos;re pricing profitably.</p>
                  <Link href="/tools/recipe-cost-calculator">
                    <Button className="bg-rose-500 hover:bg-rose-600">Calculate Costs Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 8: Social Media */}
          <section id="social-media">
            <h2 className="text-3xl font-bold mb-4">Step 6: Build Your Social Media Presence</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Social media is your free storefront. It&apos;s where customers discover you, see your work, and decide to order. And it costs $0.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Platform Priority for Bakeries</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-pink-50 border-2 border-pink-300 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Instagram className="h-6 w-6 text-pink-600" />
                  <h3 className="font-bold text-gray-900 text-lg">Instagram (Priority #1)</h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Why:</strong> Visual platform perfect for showcasing baked goods
                </p>
                <ul className="text-gray-700 text-sm space-y-1 ml-6">
                  <li>• Post 3-5x per week</li>
                  <li>• Use Stories daily</li>
                  <li>• Reels get 10x more reach</li>
                  <li>• Use hashtags (#customcakes, #localbakery)</li>
                  <li>• Respond to DMs quickly</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Facebook className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-gray-900 text-lg">Facebook (Priority #2)</h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Why:</strong> Older demographic, local community groups
                </p>
                <ul className="text-gray-700 text-sm space-y-1 ml-6">
                  <li>• Create a Business Page</li>
                  <li>• Join local community groups</li>
                  <li>• Share customer reviews</li>
                  <li>• Post availability updates</li>
                  <li>• Enable Messenger for orders</li>
                </ul>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Setting Up Your Instagram Business Account</h3>
              <ol className="text-gray-700 space-y-3 ml-6">
                <li>
                  <strong>1. Create a business account</strong> (free, gives you analytics)
                </li>
                <li>
                  <strong>2. Profile setup:</strong>
                  <ul className="ml-6 mt-2 space-y-1 text-sm">
                    <li>• Profile pic: Your logo</li>
                    <li>• Bio: What you make + location + how to order</li>
                    <li>• Link: Your website or order form</li>
                    <li>• Contact button: Phone, email, or DM</li>
                  </ul>
                </li>
                <li>
                  <strong>3. Create branded templates</strong> in Canva for consistent posts
                </li>
                <li>
                  <strong>4. Plan content:</strong> Product photos, behind-the-scenes, customer reviews, process videos
                </li>
                <li>
                  <strong>5. Use your brand colors</strong> in every post for visual consistency
                </li>
              </ol>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Content Ideas That Get Orders</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Product showcases:</strong> Beautiful photos of finished products</li>
                <li>• <strong>Process videos:</strong> Decorating, piping, assembling (Reels/TikTok)</li>
                <li>• <strong>Customer reviews:</strong> Screenshot testimonials with product photos</li>
                <li>• <strong>Behind-the-scenes:</strong> Your kitchen, ingredient prep, packaging orders</li>
                <li>• <strong>Availability posts:</strong> &quot;Taking orders for next week!&quot;</li>
                <li>• <strong>Flavor reveals:</strong> &quot;New flavor alert: Salted caramel cupcakes!&quot;</li>
                <li>• <strong>Before/after:</strong> Plain cake → decorated masterpiece</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-700">
                Use Canva to create 10-15 post templates with your brand colors and fonts. Then you can quickly create new posts by just swapping the photo. Consistency = professional brand.
              </p>
            </div>
          </section>

          {/* Section 9: Photography */}
          <section id="photography">
            <h2 className="text-3xl font-bold mb-4">Step 7: Take Professional-Looking Photos (With Your Phone)</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              You don&apos;t need a $2,000 camera. Your smartphone is enough. What matters is lighting, styling, and consistency.
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">The 5 Rules of Bakery Photography</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Camera className="h-5 w-5 text-rose-600" />
                    1. Natural Light is Everything
                  </p>
                  <p className="text-gray-700 text-sm ml-7">
                    Shoot near a window during daytime. Avoid overhead lights and flash—they create harsh shadows and yellow tones.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Camera className="h-5 w-5 text-rose-600" />
                    2. Use a Simple Background
                  </p>
                  <p className="text-gray-700 text-sm ml-7">
                    White marble board, wood cutting board, or plain white surface. Keep it clean and uncluttered.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Camera className="h-5 w-5 text-rose-600" />
                    3. Show Texture and Detail
                  </p>
                  <p className="text-gray-700 text-sm ml-7">
                    Get close-ups of frosting swirls, sprinkles, layers. Show the quality and craftsmanship.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Camera className="h-5 w-5 text-rose-600" />
                    4. Shoot from Multiple Angles
                  </p>
                  <p className="text-gray-700 text-sm ml-7">
                    Top-down (flat lay), 45-degree angle, straight-on. Different angles for different products.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Camera className="h-5 w-5 text-rose-600" />
                    5. Edit Consistently
                  </p>
                  <p className="text-gray-700 text-sm ml-7">
                    Use the same filter/preset for all photos. This creates a cohesive Instagram feed.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Budget Photography Setup ($0-15)</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Camera:</strong> Your smartphone (you already have it)</li>
                <li>• <strong>Lighting:</strong> Natural window light (free)</li>
                <li>• <strong>Background:</strong> White poster board from Dollar Tree ($1.25)</li>
                <li>• <strong>Props:</strong> Marble contact paper ($10 on Amazon) or wood cutting board (you have it)</li>
                <li>• <strong>Editing:</strong> Free apps (Snapseed, VSCO, Lightroom Mobile)</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Free Photo Editing Apps</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Snapseed:</strong> Professional editing tools, completely free</li>
                <li>• <strong>VSCO:</strong> Beautiful filters, free version is great</li>
                <li>• <strong>Lightroom Mobile:</strong> Adobe&apos;s mobile app, free with basic features</li>
                <li>• <strong>Canva:</strong> Add text, graphics, resize for different platforms</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-700">
                Create a &quot;photo station&quot; in your kitchen near a window. Keep your background board and props there. When you finish a product, snap 5-10 photos from different angles. Takes 2 minutes and you&apos;ll have content for days.
              </p>
            </div>
          </section>

          {/* Section 10: Mistakes */}
          <section id="mistakes">
            <h2 className="text-3xl font-bold mb-4">5 Branding Mistakes That Waste Money</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #1: Paying for a Professional Logo Too Early</h3>
                <p className="text-gray-700 mb-2">
                  Spending $500-2,000 on a logo when you&apos;re just starting is premature. You don&apos;t even know your brand identity yet. Your style will evolve as you grow.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Start with a DIY logo from Canva. After 6-12 months and consistent revenue, invest in a professional rebrand if needed.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #2: Ordering Custom Printed Packaging Too Soon</h3>
                <p className="text-gray-700 mb-2">
                  Custom printed boxes require minimum orders (usually 500-1,000) and cost $500-1,500. If your branding changes or you don&apos;t sell that many orders, you&apos;re stuck with unusable boxes.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Use plain kraft boxes + branded stickers. Flexible, affordable, and you can change your branding anytime.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #3: Inconsistent Branding Everywhere</h3>
                <p className="text-gray-700 mb-2">
                  Using different colors on Instagram, different fonts on business cards, and a different logo on packaging. This confuses customers and makes you look unprofessional.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Create a simple brand guide with your exact colors (hex codes), fonts, and logo files. Use them consistently everywhere.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #4: Overcomplicating Your Logo</h3>
                <p className="text-gray-700 mb-2">
                  Using 5 colors, 3 fonts, and multiple icons makes your logo look cluttered and unprofessional. It&apos;s also hard to read at small sizes (Instagram profile pic, business card).
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Keep it simple: 1-2 colors, 1-2 fonts, minimal elements. Think Nike, Apple, Starbucks—simple and memorable.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mistake #5: Not Using Your Branding</h3>
                <p className="text-gray-700 mb-2">
                  Creating a logo and business cards but never using them. Your Instagram has no logo, your packaging has no stickers, your photos have no consistent style. Branding only works if you use it consistently.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Use your logo and brand colors everywhere: Instagram profile, post templates, packaging, business cards, email signature. Consistency = recognition.
                </p>
              </div>
            </div>
          </section>

          {/* Section 11: FAQ */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How much does it really cost to brand a bakery on a budget?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> You can create a complete bakery brand for $50-100. This includes: Free logo design (Canva), business cards ($20-30), branded stickers ($15-25), packaging supplies ($20-40), and free social media setup. The biggest expense is printing, but even that&apos;s affordable with online services like Vistaprint.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Do I really need a logo if I&apos;m just a home baker?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Yes, especially if you want to charge professional prices. A logo makes you look established and trustworthy. Customers are more likely to order from a bakery with a professional brand than one with random photos and no consistent identity. Plus, logos are free to create with tools like Canva.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Should I hire a professional designer or DIY my branding?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Start with DIY. Professional designers cost $500-2,000+ for a complete brand package. That&apos;s a huge investment when you&apos;re just starting. Use free tools like Canva to create your initial branding. After 6-12 months of consistent revenue, you can invest in professional design if you want to rebrand.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How do I make my branding look cohesive across everything?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Create a simple brand guide document with: 1) Your logo files, 2) Exact color codes (hex codes like #FF6B9D), 3) Font names, 4) Example uses. Then use these EXACT colors, fonts, and logo everywhere—Instagram, business cards, packaging, website. Consistency is what makes branding work.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What&apos;s the most important branding element to invest in first?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Your logo and business cards. Your logo is your visual identity (free with Canva), and business cards are how customers remember you and refer you to others ($20-30 for 250-500 cards). These two elements give you the biggest ROI. Packaging and social media can be improved gradually as you grow.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Ready to Build Your Bakery Brand?</h2>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              You have everything you need to create a professional brand for under $100. Start with your logo, order business cards, and build your Instagram presence. Your brand is your business—make it count.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/bakery-business-tool">
                <Button className="bg-rose-500 hover:bg-rose-600 px-8 py-6 text-lg">
                  Start Your Bakery Free →
                </Button>
              </Link>
              <Link href="/tools/recipe-cost-calculator">
                <Button className="bg-white text-rose-600 hover:bg-gray-50 border-2 border-rose-600 px-8 py-6 text-lg">
                  Try Free Calculator
                </Button>
              </Link>
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              No credit card required • Track expenses & orders • Free forever
            </p>
          </div>

          {/* Related Articles */}
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/how-to-price-cupcakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Price Cupcakes: Complete Guide</h4>
                <p className="text-gray-600 text-sm">Step-by-step guide to pricing cupcakes profitably with real examples and free calculator.</p>
              </Link>
              <Link href="/blog/cupcake-pricing-guide" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Cupcake Pricing Guide: $2 vs $5 vs $8</h4>
                <p className="text-gray-600 text-sm">Discover which cupcake pricing tier is right for your bakery and how to position yourself.</p>
              </Link>
              <Link href="/blog/losing-money-on-cakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Why You&apos;re Losing Money on Every Cake</h4>
                <p className="text-gray-600 text-sm">Discover the 7 hidden costs killing your profits and learn how to fix your pricing.</p>
              </Link>
              <Link href="/blog/how-to-calculate-recipe-cost" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Calculate Recipe Cost</h4>
                <p className="text-gray-600 text-sm">Learn the exact formula to calculate recipe costs including ingredients, labor, and overhead.</p>
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
