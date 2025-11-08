'use client'

import Link from 'next/link'
import { ArrowLeft, Download, FileText, Users, CheckCircle, Target, Lightbulb, AlertCircle, Calendar, BookOpen, ClipboardCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface SOPTemplate {
  id: string
  title: string
  filename: string
  content: string
}

interface SOPTemplatesData {
  templates: SOPTemplate[]
}

export default function BakerySOPGuideArticle() {
  const downloadAllTemplates = () => {
    fetch('/bakery-sop-templates.json')
      .then(response => response.json())
      .then((data: SOPTemplatesData) => {
        data.templates.forEach((template) => {
          const blob = new Blob([template.content], { type: 'text/plain' })
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = template.filename
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        })
      })
      .catch(error => console.error('Error downloading templates:', error))
  }
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
            <span>24 min read</span>
            <span className="mx-2">•</span>
            <span className="text-rose-600 font-semibold">Operations Guide</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Creating Standard Operating Procedures for Your Bakery
          </h1>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            Transform your bakery from chaotic to consistent with SOPs—the secret recipes for running your business smoothly. This complete guide includes free downloadable templates, real examples, and step-by-step instructions to create SOPs that actually work.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <p className="text-lg text-gray-700 mb-6">
            You know how to bake a perfect cake—you follow a recipe with exact measurements, specific steps, and precise timing. But what about running your bakery? Do you have &quot;recipes&quot; for packaging orders, training new employees, or opening your kitchen each morning?
          </p>

          <p className="text-lg text-gray-700 mb-6">
            That&apos;s where Standard Operating Procedures (SOPs) come in. <strong>SOPs are like recipes for your business operations</strong>—they document exactly how tasks should be done, ensuring consistency, quality, and efficiency every single time.
          </p>

          <p className="text-lg text-gray-700 mb-8">
            Whether you&apos;re a solo home baker planning to hire help, or running a small bakery with a team, SOPs transform your business from dependent on you to a system that runs smoothly with or without you. This guide shows you exactly how to create them, with free templates you can download and customize today.
          </p>

          {/* CTA Card - Free Templates */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Download className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Free Bakery SOP Templates</h3>
                  <p className="mb-4">Download our ready-to-use SOP templates for common bakery tasks. Customize them for your business and start building consistency today.</p>
                  <Button onClick={downloadAllTemplates} className="bg-blue-500 hover:bg-blue-600">
                    Download Free Templates →
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">Includes: Baking Procedures, Packaging, Opening/Closing, Food Safety & More</p>
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
                <a href="#what-are-sops" className="hover:text-rose-600 transition-colors">What Are SOPs & Why They Matter</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#benefits" className="hover:text-rose-600 transition-colors">6 Benefits of SOPs for Your Bakery</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#what-to-document" className="hover:text-rose-600 transition-colors">What Tasks Need SOPs (Priority List)</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#how-to-create" className="hover:text-rose-600 transition-colors">How to Create SOPs (Step-by-Step)</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#templates" className="hover:text-rose-600 transition-colors">Free SOP Templates & Examples</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#training" className="hover:text-rose-600 transition-colors">How to Train Your Team with SOPs</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#implementation" className="hover:text-rose-600 transition-colors">Implementation & Maintenance</a>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
                <a href="#faq" className="hover:text-rose-600 transition-colors">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>

          {/* Section 1: What Are SOPs */}
          <section id="what-are-sops">
            <h2 className="text-3xl font-bold mb-4">What Are Standard Operating Procedures (SOPs)?</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Standard Operating Procedures (SOPs) are detailed, step-by-step instructions that outline how specific tasks should be performed in your bakery. Think of them as <strong>recipes for running your business</strong>—just like a cake recipe ensures consistent results every time, SOPs ensure your operations are consistent, safe, and high-quality.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">SOP = Recipe for Your Business</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Cake Recipe Includes:</p>
                  <ul className="text-gray-700 text-sm space-y-1 ml-6">
                    <li>• Exact ingredients & measurements</li>
                    <li>• Step-by-step instructions</li>
                    <li>• Baking time & temperature</li>
                    <li>• Visual cues for doneness</li>
                    <li>• Troubleshooting tips</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Business SOP Includes:</p>
                  <ul className="text-gray-700 text-sm space-y-1 ml-6">
                    <li>• Required materials & equipment</li>
                    <li>• Step-by-step procedure</li>
                    <li>• Quality checkpoints</li>
                    <li>• Safety standards</li>
                    <li>• Common mistakes to avoid</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 mt-8">Real Example: Packaging Orders SOP</h3>
            
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <p className="font-bold text-gray-900 mb-3">Without SOP (Inconsistent):</p>
              <p className="text-gray-700 text-sm mb-4">
                &quot;Put the cookies in a box and give them to the customer.&quot; Result: Some employees use tissue paper, others don&apos;t. Boxes are sometimes too small (crushed cookies) or too large (cookies slide around). No consistency.
              </p>
              
              <p className="font-bold text-gray-900 mb-3">With SOP (Consistent):</p>
              <ol className="text-gray-700 text-sm space-y-2 ml-6">
                <li>1. Place bakery tissue on counter</li>
                <li>2. Use tongs to collect items (no direct hand contact)</li>
                <li>3. Select box size: items should fit without overcrowding</li>
                <li>4. Line box with fresh tissue paper</li>
                <li>5. Arrange items neatly to prevent movement</li>
                <li>6. Close box and secure with bakery string</li>
                <li>7. Place in shopping bag upright</li>
              </ol>
              <p className="text-gray-700 text-sm mt-4">
                <strong>Result:</strong> Every customer gets perfectly packaged products, regardless of who helps them.
              </p>
            </div>
          </section>

          {/* Section 2: Benefits */}
          <section id="benefits">
            <h2 className="text-3xl font-bold mb-4">6 Benefits of SOPs for Your Bakery</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Creating SOPs might seem like extra work, but the benefits far outweigh the time investment:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  1. Consistency & Quality Control
                </h3>
                <p className="text-gray-700 mb-3">
                  Your signature chocolate cake tastes the same whether you make it or your assistant does. SOPs ensure every product meets your quality standards, every single time.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Example:</strong> A bakery with SOPs for their croissant recipe produces identical results across 3 different bakers. Without SOPs, each baker&apos;s croissants looked and tasted slightly different, confusing customers.
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  2. Streamlined Training & Onboarding
                </h3>
                <p className="text-gray-700 mb-3">
                  New employees can learn tasks faster with clear, written instructions. Instead of shadowing you for weeks, they can reference SOPs and become productive quickly.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Time savings:</strong> Training a new employee on packaging takes 30 minutes with SOPs vs 2-3 days of shadowing without them.
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  3. Enhanced Time Management
                </h3>
                <p className="text-gray-700 mb-3">
                  Stop answering the same questions repeatedly. When employees have SOPs, they can find answers themselves, freeing you to focus on growing your business.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Real impact:</strong> Bakery owners report saving 5-10 hours per week by not having to constantly supervise and re-explain tasks.
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  4. Regulatory Compliance & Food Safety
                </h3>
                <p className="text-gray-700 mb-3">
                  SOPs document that you follow food safety regulations, proper sanitation, and allergen handling. This protects you during health inspections and potential liability issues.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Legal protection:</strong> Written SOPs prove you trained employees on proper procedures, which is crucial if issues arise.
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  5. Scalability & Growth
                </h3>
                <p className="text-gray-700 mb-3">
                  Want to hire more help? Open a second location? Sell your business? SOPs make it possible by documenting how everything works, so your business isn&apos;t dependent on you.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Growth enabler:</strong> Bakeries with SOPs can scale faster because they have systems, not just skilled individuals.
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  6. Reduced Errors & Waste
                </h3>
                <p className="text-gray-700 mb-3">
                  Clear procedures reduce mistakes, which means less wasted ingredients, fewer remakes, and happier customers. Every mistake costs you money—SOPs prevent them.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Cost savings:</strong> Reducing waste from 12% to 3% (industry leader standard) can save thousands of dollars annually.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Target className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Document Your Bakery Procedures</h3>
                  <p className="mb-4">BakeProfit helps you organize recipes, track costs, and manage orders. Add your SOPs to create a complete business system.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Organizing Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: What to Document */}
          <section id="what-to-document">
            <h2 className="text-3xl font-bold mb-4">What Tasks Need SOPs? (Priority List)</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              You don&apos;t need SOPs for everything immediately. Start with tasks that are:
            </p>

            <ul className="text-gray-700 space-y-2 ml-6 mb-6">
              <li>• <strong>Repeated frequently</strong> (daily or weekly)</li>
              <li>• <strong>Critical to quality</strong> (your signature products)</li>
              <li>• <strong>Safety-sensitive</strong> (food handling, allergens)</li>
              <li>• <strong>Done by multiple people</strong> (need consistency)</li>
              <li>• <strong>Complex or error-prone</strong> (easy to mess up)</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4 mt-8">Priority 1: Start Here (Most Important)</h3>
            
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Production & Baking
              </h4>
              <ul className="text-gray-700 text-sm space-y-1 ml-6">
                <li>• Signature product recipes (exact measurements, timing, techniques)</li>
                <li>• Dough preparation and proofing procedures</li>
                <li>• Baking temperatures and times for each product</li>
                <li>• Cooling and storage procedures</li>
                <li>• Quality control checkpoints (visual cues, texture, taste)</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Food Safety & Sanitation
              </h4>
              <ul className="text-gray-700 text-sm space-y-1 ml-6">
                <li>• Handwashing and personal hygiene</li>
                <li>• Equipment cleaning and sanitizing</li>
                <li>• Cross-contamination prevention</li>
                <li>• Allergen handling and labeling</li>
                <li>• Temperature monitoring (refrigeration, cooking)</li>
                <li>• Receiving and storing ingredients</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Customer Service & Packaging
              </h4>
              <ul className="text-gray-700 text-sm space-y-1 ml-6">
                <li>• Order taking and confirmation</li>
                <li>• Packaging procedures (boxes, tissue, labels)</li>
                <li>• Handling customer complaints</li>
                <li>• Delivery and pickup protocols</li>
                <li>• Payment processing</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mb-4 mt-8">Priority 2: Add These Next</h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Daily Operations</h4>
                <ul className="text-gray-700 text-sm space-y-1 ml-6">
                  <li>• Opening procedures</li>
                  <li>• Closing procedures</li>
                  <li>• Cash handling</li>
                  <li>• Inventory checks</li>
                  <li>• Equipment startup/shutdown</li>
                </ul>
              </div>

              <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Maintenance & Troubleshooting</h4>
                <ul className="text-gray-700 text-sm space-y-1 ml-6">
                  <li>• Equipment maintenance schedules</li>
                  <li>• Common problem solutions</li>
                  <li>• Emergency procedures</li>
                  <li>• Supplier contact information</li>
                  <li>• Waste management</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Start Small, Build Gradually:</p>
              <p className="text-gray-700">
                Don&apos;t try to document everything at once. Start with your top 3-5 most critical tasks, perfect those SOPs, then add more over time. It&apos;s better to have 5 excellent SOPs than 50 mediocre ones.
              </p>
            </div>
          </section>

          {/* Section 4: How to Create SOPs */}
          <section id="how-to-create">
            <h2 className="text-3xl font-bold mb-4">How to Create SOPs: Step-by-Step Process</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Creating SOPs doesn&apos;t have to be complicated. Follow this proven 5-step process:
            </p>

            <div className="space-y-6">
              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                  Identify the Task
                </h3>
                <p className="text-gray-700 mb-3">
                  Choose one specific task to document. Be clear about the scope—&quot;Baking Chocolate Chip Cookies&quot; is better than &quot;Baking.&quot;
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Example:</strong> Instead of &quot;Customer Service,&quot; create separate SOPs for &quot;Taking Phone Orders,&quot; &quot;Packaging Orders,&quot; and &quot;Handling Complaints.&quot;
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                  Document Every Step
                </h3>
                <p className="text-gray-700 mb-3">
                  Write down each step as you perform the task. Be specific—include measurements, timings, temperatures, and visual cues.
                </p>
                <div className="bg-white p-4 rounded mt-3">
                  <p className="font-semibold text-gray-900 mb-2">Bad Example (Too Vague):</p>
                  <p className="text-gray-700 text-sm mb-3">&quot;Mix ingredients. Bake until done.&quot;</p>
                  
                  <p className="font-semibold text-gray-900 mb-2">Good Example (Specific):</p>
                  <ol className="text-gray-700 text-sm space-y-1 ml-6">
                    <li>1. Preheat oven to 350°F (175°C)</li>
                    <li>2. In stand mixer, cream 1 cup butter + 1 cup sugar for 3 minutes until fluffy</li>
                    <li>3. Add 2 eggs one at a time, mixing 30 seconds after each</li>
                    <li>4. Bake 12-14 minutes until edges are golden (centers will look slightly underdone)</li>
                  </ol>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                  Add Visual Aids
                </h3>
                <p className="text-gray-700 mb-3">
                  Take photos of each step. Science shows visual learners retain information better with images. Photos also eliminate ambiguity.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Pro tip:</strong> Use your phone to take photos as you work. Add them to your SOP document next to each step.
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">4</span>
                  Test & Refine
                </h3>
                <p className="text-gray-700 mb-3">
                  Have someone else follow your SOP without your help. Watch for confusion, missing steps, or unclear instructions.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Key question:</strong> Can someone with basic baking knowledge follow this SOP and get the same result you do?
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">5</span>
                  Format & Store Properly
                </h3>
                <p className="text-gray-700 mb-3">
                  Use a consistent format for all SOPs. Store them where employees can easily access them—not hidden in an office binder.
                </p>
                <ul className="text-gray-700 text-sm space-y-1 ml-6">
                  <li>• <strong>Digital:</strong> Google Docs, Dropbox, or cloud storage (accessible on phones/tablets)</li>
                  <li>• <strong>Physical:</strong> Laminated sheets near workstations</li>
                  <li>• <strong>Hybrid:</strong> Both digital and printed copies</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">SOP Template Structure</h3>
              <p className="text-gray-700 mb-3">Every SOP should include these sections:</p>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Title:</strong> Clear, specific task name</li>
                <li>• <strong>Objective:</strong> What this SOP accomplishes and why it matters</li>
                <li>• <strong>Scope:</strong> Who this applies to (all staff, bakers only, etc.)</li>
                <li>• <strong>Materials/Equipment:</strong> Everything needed to complete the task</li>
                <li>• <strong>Procedure:</strong> Numbered step-by-step instructions with photos</li>
                <li>• <strong>Quality Checkpoints:</strong> How to verify it was done correctly</li>
                <li>• <strong>Safety Notes:</strong> Important warnings or precautions</li>
                <li>• <strong>Troubleshooting:</strong> Common problems and solutions</li>
                <li>• <strong>Review Date:</strong> When this SOP was last updated</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Templates & Examples */}
          <section id="templates">
            <h2 className="text-3xl font-bold mb-4">Free SOP Templates & Real Examples</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Here are complete, ready-to-use SOP templates you can download and customize for your bakery:
            </p>

            {/* Template Download Card */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 my-8">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Download className="h-8 w-8 text-purple-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">Download All SOP Templates (Free)</h3>
                    <p className="mb-4 text-gray-700">Get our complete collection of bakery SOP templates in Microsoft Word and Google Docs format. Customize them for your business.</p>
                    
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <p className="font-semibold text-sm">✓ Baking Procedures Template</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <p className="font-semibold text-sm">✓ Food Safety & Sanitation Template</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <p className="font-semibold text-sm">✓ Packaging & Customer Service Template</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <p className="font-semibold text-sm">✓ Opening/Closing Procedures Template</p>
                      </div>
                    </div>
                    
                    <Button onClick={downloadAllTemplates} className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Download Free Templates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-2xl font-bold mb-4 mt-8">Example SOP: Packaging Customer Orders</h3>
            
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <div className="mb-4">
                <p className="font-bold text-gray-900">Title:</p>
                <p className="text-gray-700">Standard Operating Procedure for Packaging Pastries, Cookies, and Cakes</p>
              </div>

              <div className="mb-4">
                <p className="font-bold text-gray-900">Objective:</p>
                <p className="text-gray-700">To ensure all bakery items are packaged correctly, maintaining product quality and presentation for optimal customer satisfaction.</p>
              </div>

              <div className="mb-4">
                <p className="font-bold text-gray-900">Scope:</p>
                <p className="text-gray-700">Applies to all staff involved in packaging and customer service.</p>
              </div>

              <div className="mb-4">
                <p className="font-bold text-gray-900">Materials Needed:</p>
                <ul className="text-gray-700 ml-6 space-y-1">
                  <li>• Bakery tissue paper</li>
                  <li>• Boxes (various sizes)</li>
                  <li>• Bakery tongs</li>
                  <li>• Bakery string or tape</li>
                  <li>• Shopping bags</li>
                  <li>• Labels (if applicable)</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="font-bold text-gray-900 mb-2">Procedure:</p>
                <ol className="text-gray-700 space-y-2 ml-6">
                  <li><strong>1. Receive the Order:</strong> Confirm customer selections. Repeat order back to ensure accuracy.</li>
                  <li><strong>2. Prepare Work Surface:</strong> Place clean bakery tissue on counter or display case top.</li>
                  <li><strong>3. Gather Items:</strong> Use bakery tongs or tissue paper to collect items. Never touch food with bare hands.</li>
                  <li><strong>4. Categorize Items:</strong> Group refrigerated items separately from non-refrigerated items.</li>
                  <li><strong>5. Select Appropriate Box:</strong> Choose size that fits items without overcrowding (causes crushing) or excess space (causes sliding).</li>
                  <li><strong>6. Assemble & Line Box:</strong> Build box properly. Line with fresh bakery tissue.</li>
                  <li><strong>7. Load Box:</strong> Arrange items neatly. Place heavier items on bottom, delicate items on top.</li>
                  <li><strong>8. Close & Secure:</strong> If items fit, close fully and tie with bakery string. If too tall, partially close and secure with tape.</li>
                  <li><strong>9. Bag the Order:</strong> Place box in shopping bag upright. Add receipt if applicable.</li>
                  <li><strong>10. Hand to Customer:</strong> Thank customer and confirm they have everything.</li>
                </ol>
              </div>

              <div className="mb-4">
                <p className="font-bold text-gray-900 mb-2">Quality Checkpoints:</p>
                <ul className="text-gray-700 ml-6 space-y-1">
                  <li>✓ No items are crushed or damaged</li>
                  <li>✓ Box is secure and won&apos;t open during transport</li>
                  <li>✓ Customer received correct items</li>
                  <li>✓ Presentation looks professional</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="font-bold text-gray-900 mb-2">Safety Notes:</p>
                <ul className="text-gray-700 ml-6 space-y-1">
                  <li>⚠️ Always use tongs or tissue—never bare hands</li>
                  <li>⚠️ Keep refrigerated items separate from room temperature items</li>
                  <li>⚠️ Check for allergen cross-contamination</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-gray-900 mb-2">Troubleshooting:</p>
                <ul className="text-gray-700 text-sm ml-6 space-y-1">
                  <li>• <strong>Problem:</strong> Box too small → Use next size up, don&apos;t force items</li>
                  <li>• <strong>Problem:</strong> Items sliding in box → Add crumpled tissue as padding</li>
                  <li>• <strong>Problem:</strong> Out of boxes → Check storage area or notify manager immediately</li>
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="text-gray-600 text-sm">Last Updated: February 2025 | Review Date: August 2025</p>
              </div>
            </div>
          </section>

          {/* Section 6: Training */}
          <section id="training">
            <h2 className="text-3xl font-bold mb-4">How to Train Your Team with SOPs</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Having SOPs is only half the battle—you need to train your team to actually use them. Here&apos;s the proven 3-step training method:
            </p>

            <div className="space-y-6">
              <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <Users className="h-6 w-6 text-purple-600" />
                  Step 1: Show (I Do)
                </h3>
                <p className="text-gray-700 mb-3">
                  Demonstrate the task while explaining each step from the SOP. Point out quality checkpoints and safety notes.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Example:</strong> &quot;I&apos;m selecting a box that fits the cookies without overcrowding—see how there&apos;s about 1 inch of space around them? That prevents crushing during transport.&quot;
                </p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <Users className="h-6 w-6 text-purple-600" />
                  Step 2: Guide (We Do)
                </h3>
                <p className="text-gray-700 mb-3">
                  Have the employee perform the task while you guide them through the SOP. Correct mistakes gently and explain why each step matters.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Coaching tip:</strong> Ask questions like &quot;What should you do next?&quot; instead of telling them. This builds understanding, not just memorization.
                </p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <Users className="h-6 w-6 text-purple-600" />
                  Step 3: Verify (You Do)
                </h3>
                <p className="text-gray-700 mb-3">
                  Watch the employee perform the task independently. Use a checklist to verify they complete all steps correctly.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Sign-off:</strong> Once they demonstrate competency, have them sign a training log confirming they&apos;ve been trained on this SOP.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                Training Best Practices
              </h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Keep SOPs accessible:</strong> Store them where tasks are performed, not in an office</li>
                <li>• <strong>Use checklists:</strong> Create simple checklists for complex SOPs</li>
                <li>• <strong>Review regularly:</strong> Refresh training every 3-6 months</li>
                <li>• <strong>Welcome feedback:</strong> Employees often spot improvements you missed</li>
                <li>• <strong>Document training:</strong> Keep a log of who was trained on what and when</li>
              </ul>
            </div>
          </section>

          {/* Section 7: Implementation */}
          <section id="implementation">
            <h2 className="text-3xl font-bold mb-4">Implementation & Maintenance</h2>
            
            <h3 className="text-2xl font-bold mb-4">Where to Store SOPs</h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Digital Storage
                </h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>✓ Google Drive/Dropbox</li>
                  <li>✓ Accessible on phones/tablets</li>
                  <li>✓ Easy to update</li>
                  <li>✓ Searchable</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Physical Storage
                </h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>✓ Laminated sheets</li>
                  <li>✓ Posted at workstations</li>
                  <li>✓ Binder near work area</li>
                  <li>✓ Quick reference</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Best Practice
                </h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>✓ Use both methods</li>
                  <li>✓ Digital for updates</li>
                  <li>✓ Physical for quick access</li>
                  <li>✓ Role-specific location</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 mt-8">Review & Update Schedule</h3>
            
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-rose-600" />
                    Monthly: Quick Check
                  </p>
                  <p className="text-gray-700 text-sm">Ask team: &quot;Are any SOPs unclear or outdated?&quot; Make quick fixes.</p>
                </div>

                <div>
                  <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-rose-600" />
                    Quarterly: Formal Review
                  </p>
                  <p className="text-gray-700 text-sm">Review all SOPs. Update for new equipment, processes, or regulations.</p>
                </div>

                <div>
                  <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-rose-600" />
                    Annually: Complete Audit
                  </p>
                  <p className="text-gray-700 text-sm">Full review of all SOPs. Retire outdated ones, create new ones for new tasks.</p>
                </div>

                <div>
                  <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-rose-600" />
                    As Needed: Immediate Updates
                  </p>
                  <p className="text-gray-700 text-sm">Update immediately when: regulations change, equipment changes, or safety issues arise.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Common Implementation Mistakes
              </h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• ❌ Creating SOPs but not training staff on them</li>
                <li>• ❌ Storing SOPs in inaccessible locations (office binders)</li>
                <li>• ❌ Never updating SOPs after creation</li>
                <li>• ❌ Making SOPs too complex or too vague</li>
                <li>• ❌ Not getting employee buy-in or feedback</li>
              </ul>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Build Your Bakery Systems</h3>
                  <p className="mb-4">BakeProfit helps you organize recipes, track costs, manage orders, and document procedures. Create a complete business system.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Building Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 8: FAQ */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Do I really need SOPs for my small home bakery?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Yes, especially if you plan to hire help or grow. Even solo bakers benefit from documenting their processes—it ensures consistency, saves time answering questions, and makes your business more valuable if you ever want to sell. Start with 3-5 critical SOPs and build from there.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How long does it take to create an SOP?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Your first SOP might take 2-3 hours (including photos and testing). But it gets faster—by your 5th SOP, you&apos;ll complete one in 30-60 minutes. The time investment pays off immediately through faster training and fewer mistakes.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if my employees don&apos;t follow the SOPs?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> This usually means: 1) The SOP is unclear or too complex, 2) Employees weren&apos;t properly trained, or 3) SOPs aren&apos;t easily accessible. Fix these issues first. If employees still don&apos;t follow SOPs after proper training and access, it&apos;s a performance issue to address directly.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Should I include photos in my SOPs?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Absolutely! Photos eliminate ambiguity and help visual learners. Take photos with your phone as you perform each step, then add them to your SOP document. This extra step makes SOPs significantly more effective.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How often should I update SOPs?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Review SOPs quarterly and update as needed. Update immediately when: regulations change, you get new equipment, you discover a better method, or safety issues arise. Add a &quot;Last Updated&quot; date to every SOP so you know when it was last reviewed.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Can I use the same SOP templates for different tasks?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Yes! Use a consistent template structure for all SOPs. This makes them easier to create, easier to follow, and more professional. Download our free templates and customize them for each task in your bakery.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Start Building Your Bakery SOPs Today</h2>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              SOPs transform your bakery from chaotic to consistent. Download our free templates, start with your top 3 tasks, and build a business that runs smoothly with or without you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={downloadAllTemplates} className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-lg">
                <Download className="h-5 w-5 mr-2" />
                Download Free SOP Templates
              </Button>
              <Link href="/bakery-business-tool">
                <Button className="bg-white text-rose-600 hover:bg-gray-50 border-2 border-rose-600 px-8 py-6 text-lg">
                  Organize Your Bakery
                </Button>
              </Link>
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              Free templates • No signup required • Customize for your business
            </p>
          </div>

          {/* Related Articles */}
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/home-bakery-success-rates" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Home Bakery Success Rates: What Makes Businesses Thrive</h4>
                <p className="text-gray-600 text-sm">Discover why 60% succeed and the proven factors that make bakery businesses thrive.</p>
              </Link>
              <Link href="/blog/bakery-branding-on-budget" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Bakery Branding on a Budget: Complete DIY Guide</h4>
                <p className="text-gray-600 text-sm">Create professional branding for under $100 with free tools and templates.</p>
              </Link>
              <Link href="/blog/bakery-email-list-guide" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Create a Bakery Email List</h4>
                <p className="text-gray-600 text-sm">Build an email list for repeat customers with free tools and proven strategies.</p>
              </Link>
              <Link href="/blog/cake-price-survey-2025" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">What Customers Really Pay for Cakes: 2025 Price Survey</h4>
                <p className="text-gray-600 text-sm">Real 2025 pricing data to help you price your cakes confidently.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
