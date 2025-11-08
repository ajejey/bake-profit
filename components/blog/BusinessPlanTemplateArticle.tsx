'use client'

import Link from 'next/link'
import { FileText, Download, CheckCircle, TrendingUp, Target, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '../layout/Footer'
import BusinessPlanTemplate from '../BusinessPlanTemplate'

export default function BusinessPlanTemplateArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → Home Bakery Business Plan Template
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Home Bakery Business Plan Template (Free Download)
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Feb 5, 2025</span> • <span>20 min read</span> • <span className="text-rose-600 font-semibold">Business Planning</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            You don&apos;t need a 50-page business plan to start a successful home bakery. But you DO need a plan.
          </p>

          <p className="text-xl text-gray-700">
            A business plan isn&apos;t just a document for banks or investors—it&apos;s your roadmap. It forces you to think through the hard questions BEFORE you spend money, helps you set realistic goals, and gives you a clear path from hobby to profitable business.
          </p>

          <p className="text-lg text-gray-700">
            In this guide, I&apos;ll walk you through every section of a home bakery business plan, explain what to include, provide real examples, and give you a FREE interactive template you can fill out and download right now.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <FileText className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Skip to the Template</h3>
                  <p className="mb-4">Ready to start? Jump straight to our interactive business plan template below and start filling it out.</p>
                  <a href="#template">
                    <Button className="bg-rose-500 hover:bg-rose-600">Go to Template →</Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <div className="bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li><a href="#why-need" className="hover:text-rose-600">Why You Need a Business Plan</a></li>
              <li><a href="#executive-summary" className="hover:text-rose-600">Section 1: Executive Summary</a></li>
              <li><a href="#business-description" className="hover:text-rose-600">Section 2: Business Description</a></li>
              <li><a href="#products-services" className="hover:text-rose-600">Section 3: Products & Services</a></li>
              <li><a href="#market-analysis" className="hover:text-rose-600">Section 4: Market Analysis</a></li>
              <li><a href="#marketing-sales" className="hover:text-rose-600">Section 5: Marketing & Sales Strategy</a></li>
              <li><a href="#operations" className="hover:text-rose-600">Section 6: Operations Plan</a></li>
              <li><a href="#financial-plan" className="hover:text-rose-600">Section 7: Financial Plan</a></li>
              <li><a href="#goals-milestones" className="hover:text-rose-600">Section 8: Goals & Milestones</a></li>
              <li><a href="#template" className="hover:text-rose-600">FREE Interactive Template</a></li>
            </ol>
          </div>

          {/* Section 1: Why You Need It */}
          <section id="why-need">
            <h2 className="text-3xl font-bold mb-4">Why You Need a Business Plan (Even for a Home Bakery)</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              &quot;I&apos;m just baking from home, do I really need a business plan?&quot; YES. Here&apos;s why:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  1. It Forces You to Think Through the Details
                </h3>
                <p className="text-gray-700">
                  How will you get customers? What will you charge? How much can you realistically make? A business plan makes you answer these questions BEFORE you invest time and money.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <Target className="h-6 w-6 text-green-600" />
                  2. It Gives You Clear Goals
                </h3>
                <p className="text-gray-700">
                  Without a plan, you&apos;re just &quot;hoping&quot; things work out. With a plan, you have specific targets: 10 sales this month, break even by month 3, $15,000 revenue in year 1.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  3. It Helps You Avoid Costly Mistakes
                </h3>
                <p className="text-gray-700">
                  When you map out your costs and pricing in advance, you can see if your business model actually works. Many bakers realize they&apos;re underpricing BEFORE they make their first sale.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  4. It&apos;s Your Roadmap for Growth
                </h3>
                <p className="text-gray-700">
                  As your bakery grows, you can refer back to your plan to see if you&apos;re on track, adjust your strategy, and plan your next steps.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">The Good News</h3>
              <p className="text-gray-700">
                A home bakery business plan doesn&apos;t need to be formal or lengthy. It can be a simple document that YOU use to guide your business. No fancy formatting required—just clear thinking and realistic planning.
              </p>
            </div>
          </section>

          {/* Quick Overview of Sections */}
          <section className="my-12">
            <h2 className="text-3xl font-bold mb-6">The 8 Sections of a Home Bakery Business Plan</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">1. Executive Summary</h3>
                <p className="text-sm text-gray-600">High-level overview of your bakery</p>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">2. Business Description</h3>
                <p className="text-sm text-gray-600">What makes your bakery unique</p>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">3. Products & Services</h3>
                <p className="text-sm text-gray-600">What you&apos;ll sell and pricing</p>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">4. Market Analysis</h3>
                <p className="text-sm text-gray-600">Your customers and competitors</p>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">5. Marketing & Sales</h3>
                <p className="text-sm text-gray-600">How you&apos;ll get customers</p>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">6. Operations Plan</h3>
                <p className="text-sm text-gray-600">Day-to-day running of your bakery</p>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">7. Financial Plan</h3>
                <p className="text-sm text-gray-600">Costs, pricing, revenue projections</p>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">8. Goals & Milestones</h3>
                <p className="text-sm text-gray-600">Your 3-month to 3-year roadmap</p>
              </div>
            </div>
          </section>

          {/* Key Tips */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded my-8">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">💡 Pro Tips for Writing Your Business Plan</h3>
            <ul className="text-gray-700 space-y-2 ml-6">
              <li>• <strong>Be realistic:</strong> Don&apos;t inflate numbers to look good. Honest projections are more useful.</li>
              <li>• <strong>Start simple:</strong> You can always add detail later. Get the basics down first.</li>
              <li>• <strong>Use real data:</strong> Research your local market, competitor prices, and actual costs.</li>
              <li>• <strong>Review quarterly:</strong> Your plan should evolve as your business grows.</li>
              <li>• <strong>Keep it accessible:</strong> Store it where you can easily reference it.</li>
            </ul>
          </div>

          {/* Related Resources */}
          <div className="bg-gray-50 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Before You Start Your Business Plan</h3>
            <p className="text-gray-700 mb-4">
              These articles will help you gather the information you need:
            </p>
            <div className="space-y-3">
              <Link href="/blog/start-home-bakery-budget" className="block p-4 bg-white rounded border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900">How to Start a Home Bakery with $500 or Less</h4>
                <p className="text-sm text-gray-600">Learn about startup costs and legal requirements</p>
              </Link>
              <Link href="/blog/how-to-calculate-recipe-cost" className="block p-4 bg-white rounded border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900">How to Calculate Recipe Cost</h4>
                <p className="text-sm text-gray-600">Essential for your pricing strategy section</p>
              </Link>
              <Link href="/blog/break-even-analysis" className="block p-4 bg-white rounded border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900">Break-Even Analysis for Bakers</h4>
                <p className="text-sm text-gray-600">Critical for your financial plan</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Interactive Template Section */}
        <div id="template" className="mt-16 pt-8 border-t-4 border-rose-500">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">FREE Interactive Business Plan Template</h2>
            <p className="text-xl text-gray-700 mb-2">
              Fill out the form below and download your completed business plan
            </p>
            <p className="text-gray-600">
              Your data is saved in your browser. Come back anytime to continue editing.
            </p>
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 mb-8">
            <div className="flex items-start gap-4">
              <Download className="h-8 w-8 text-rose-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">How to Use This Template</h3>
                <ol className="text-gray-700 space-y-2 ml-6 list-decimal">
                  <li>Click on each section to expand it</li>
                  <li>Fill out the fields with your bakery&apos;s information</li>
                  <li>Use the examples and placeholders as guides</li>
                  <li>Click &quot;Download Your Business Plan&quot; to save as a text file</li>
                  <li>Edit the downloaded file in any text editor or word processor</li>
                </ol>
              </div>
            </div>
          </div>

          {/* The actual interactive template */}
          <BusinessPlanTemplate />
        </div>

        {/* After Template - Next Steps */}
        <div className="prose prose-lg max-w-none space-y-8 mt-16">
          <section>
            <h2 className="text-3xl font-bold mb-4">What to Do After Completing Your Business Plan</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-l-4 border-blue-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">1. Review and Refine</h3>
                <p className="text-gray-700">
                  Read through your completed plan. Does it make sense? Are your goals realistic? Adjust as needed.
                </p>
              </div>

              <div className="bg-white border-l-4 border-blue-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">2. Share with a Trusted Advisor</h3>
                <p className="text-gray-700">
                  Show your plan to a mentor, experienced baker, or business advisor. Get feedback on your assumptions and goals.
                </p>
              </div>

              <div className="bg-white border-l-4 border-blue-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">3. Start Taking Action</h3>
                <p className="text-gray-700">
                  Use your plan as a checklist. Start with your 3-month goals and work through them one by one.
                </p>
              </div>

              <div className="bg-white border-l-4 border-blue-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">4. Track Your Progress</h3>
                <p className="text-gray-700">
                  Use <Link href="/bakery-business-tool" className="text-rose-600 hover:underline font-semibold">BakeProfit</Link> to track your actual sales, costs, and revenue against your projections.
                </p>
              </div>

              <div className="bg-white border-l-4 border-blue-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">5. Review Quarterly</h3>
                <p className="text-gray-700">
                  Every 3 months, review your business plan. Update your goals, adjust your strategy, and celebrate your wins.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Do I need a business plan if I&apos;m just starting small?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Yes! Even if you&apos;re starting with just $500 and one product, a business plan helps you think through your strategy and avoid costly mistakes. It doesn&apos;t need to be formal—just clear and realistic.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How long should my business plan be?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> For a home bakery, 5-10 pages is plenty. Focus on clarity and usefulness, not length. This isn&apos;t a college essay—it&apos;s a working document for YOU.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if I don&apos;t know my exact numbers yet?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Make educated guesses based on research. Look at competitor prices, research ingredient costs, and estimate conservatively. You can update your plan as you learn more.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Should I show my business plan to anyone?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> It&apos;s helpful to get feedback from experienced bakers or business mentors, but your plan is primarily for YOU. You don&apos;t need approval—just clarity and direction.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How often should I update my business plan?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Review it quarterly and update it whenever something significant changes (new product, pricing change, major goal shift). Your plan should evolve with your business.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Ready to Turn Your Plan into Reality?</h2>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              Use BakeProfit to track your progress, manage orders, calculate costs, and turn your business plan into a profitable bakery.
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
              <Link href="/blog/start-home-bakery-budget" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Start a Home Bakery with $500 or Less</h4>
                <p className="text-gray-600 text-sm">Complete startup guide with budget breakdown and legal requirements.</p>
              </Link>
              <Link href="/blog/break-even-analysis" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Break-Even Analysis for Bakers</h4>
                <p className="text-gray-600 text-sm">Calculate when your bakery becomes profitable.</p>
              </Link>
              <Link href="/blog/how-to-calculate-recipe-cost" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Calculate Recipe Cost</h4>
                <p className="text-gray-600 text-sm">Essential for accurate pricing in your business plan.</p>
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
