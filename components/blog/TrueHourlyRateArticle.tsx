'use client'

import Link from 'next/link'
import { Calculator, Clock, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '../layout/Footer'

export default function TrueHourlyRateArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → Calculate Your True Hourly Rate as a Baker
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          How to Calculate Your True Hourly Rate as a Baker
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Feb 2, 2025</span> • <span>15 min read</span> • <span className="text-rose-600 font-semibold">Labor & Pricing</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            You spent 6 hours making a cake and charged $150. Sounds good, right? That&apos;s $25/hour.
          </p>

          <p className="text-xl text-gray-700">
            But wait—did you count the hour you spent shopping for ingredients? The 30 minutes answering customer messages? The 45 minutes cleaning up? The 20 minutes driving to deliver it?
          </p>

          <p className="text-xl text-gray-700 font-bold">
            Your TRUE hourly rate isn&apos;t $25. It&apos;s closer to $16.67.
          </p>

          <p className="text-lg text-gray-700">
            Most bakers drastically overestimate their hourly rate because they only count &quot;active baking time.&quot; They forget about all the invisible hours that go into running a bakery business. This guide will show you how to calculate your REAL hourly rate—and why it matters more than you think.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Calculator className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Track Your Time Automatically</h3>
                  <p className="mb-4">BakeProfit helps you track all your time—baking, admin, delivery, everything—so you know your true hourly rate. Free to start.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Tracking Time Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <div className="bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li><a href="#why-matters" className="hover:text-rose-600">Why Your True Hourly Rate Matters</a></li>
              <li><a href="#time-categories" className="hover:text-rose-600">The 5 Time Categories Bakers Forget to Track</a></li>
              <li><a href="#calculate" className="hover:text-rose-600">How to Calculate Your True Hourly Rate (Step-by-Step)</a></li>
              <li><a href="#real-example" className="hover:text-rose-600">Real Example: Sarah&apos;s Eye-Opening Calculation</a></li>
              <li><a href="#industry-standards" className="hover:text-rose-600">What Should You Charge Per Hour? Industry Standards</a></li>
              <li><a href="#improve" className="hover:text-rose-600">How to Improve Your Hourly Rate</a></li>
              <li><a href="#tracking" className="hover:text-rose-600">Time Tracking Systems That Actually Work</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* Section 1: Why It Matters */}
          <section id="why-matters">
            <h2 className="text-3xl font-bold mb-4">Why Your True Hourly Rate Matters</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Knowing your true hourly rate isn&apos;t just about curiosity—it directly impacts your business sustainability and personal wellbeing.
            </p>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  The Hidden Cost of Not Knowing
                </h3>
                <p className="text-gray-700 mb-3">
                  If you think you&apos;re making $30/hour but you&apos;re actually making $12/hour, you&apos;re:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• Working for less than minimum wage without realizing it</li>
                  <li>• Underpricing your products by 50%+ because your labor calculations are wrong</li>
                  <li>• Burning out because you&apos;re working twice as many hours as you thought</li>
                  <li>• Making business decisions based on false data</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">What Changes When You Know Your True Rate</h3>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• <strong>Better pricing:</strong> You can set prices that actually pay you fairly</li>
                  <li>• <strong>Smarter decisions:</strong> You know which products are profitable and which aren&apos;t</li>
                  <li>• <strong>Realistic goals:</strong> You understand how many orders you need to hit income targets</li>
                  <li>• <strong>Work-life balance:</strong> You can see if you&apos;re working sustainable hours</li>
                  <li>• <strong>Confidence:</strong> You can justify your prices with real data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Time Categories */}
          <section id="time-categories">
            <h2 className="text-3xl font-bold mb-4">The 5 Time Categories Bakers Forget to Track</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Most bakers only track Category 1. But all five categories are REAL time that should be compensated in your pricing.
            </p>

            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">Category 1: Active Baking Time</h3>
                    <p className="text-gray-700 mb-3">
                      This is what most bakers track: mixing, shaping, decorating, assembling. The hands-on work.
                    </p>
                    <p className="text-gray-700 font-semibold">
                      Typical time for a custom cake: <strong>4-6 hours</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">Category 2: Passive Baking Time</h3>
                    <p className="text-gray-700 mb-3">
                      Time when items are baking, cooling, or setting—but you can&apos;t leave because you need to monitor or you&apos;re waiting for the next step.
                    </p>
                    <p className="text-gray-700 mb-3">
                      <strong>Examples:</strong>
                    </p>
                    <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                      <li>• Waiting for cakes to bake (30-45 min)</li>
                      <li>• Waiting for cakes to cool before frosting (1-2 hours)</li>
                      <li>• Waiting for fondant to set (30 min - 1 hour)</li>
                      <li>• Monitoring caramel or sugar work</li>
                    </ul>
                    <p className="text-gray-700 font-semibold">
                      Typical time: <strong>2-3 hours</strong>
                    </p>
                    <div className="bg-yellow-50 p-4 rounded mt-3">
                      <p className="text-sm text-gray-700">
                        <strong>Should you charge for this?</strong> YES, if you can&apos;t do other productive work during this time. If you&apos;re stuck in the kitchen waiting, that&apos;s billable time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">Category 3: Prep & Cleanup Time</h3>
                    <p className="text-gray-700 mb-3">
                      The before and after work that makes baking possible.
                    </p>
                    <p className="text-gray-700 mb-3">
                      <strong>Examples:</strong>
                    </p>
                    <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                      <li>• Setting up workspace and gathering tools (10-15 min)</li>
                      <li>• Washing dishes and cleaning equipment (30-45 min)</li>
                      <li>• Sanitizing work surfaces (10 min)</li>
                      <li>• Putting away ingredients and tools (10 min)</li>
                    </ul>
                    <p className="text-gray-700 font-semibold">
                      Typical time: <strong>1-1.5 hours per baking session</strong>
                    </p>
                    <div className="bg-yellow-50 p-4 rounded mt-3">
                      <p className="text-sm text-gray-700">
                        <strong>Pro tip:</strong> Cleanup often takes 20-30% of your active baking time. If you baked for 4 hours, budget 1 hour for cleanup.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">Category 4: Business Admin Time</h3>
                    <p className="text-gray-700 mb-3">
                      The invisible work of running a business.
                    </p>
                    <p className="text-gray-700 mb-3">
                      <strong>Examples:</strong>
                    </p>
                    <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                      <li>• Responding to customer inquiries (15-30 min per order)</li>
                      <li>• Creating quotes and invoices (10-15 min per order)</li>
                      <li>• Social media posts and marketing (1-2 hours/week)</li>
                      <li>• Bookkeeping and expense tracking (1-2 hours/week)</li>
                      <li>• Ordering supplies and inventory management (1 hour/week)</li>
                    </ul>
                    <p className="text-gray-700 font-semibold">
                      Typical time: <strong>30-60 minutes per order</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">Category 5: Shopping & Delivery Time</h3>
                    <p className="text-gray-700 mb-3">
                      Time spent outside the kitchen but directly related to orders.
                    </p>
                    <p className="text-gray-700 mb-3">
                      <strong>Examples:</strong>
                    </p>
                    <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                      <li>• Shopping for ingredients (1-2 hours per shopping trip)</li>
                      <li>• Picking up specialty supplies (30 min - 1 hour)</li>
                      <li>• Delivering orders (15 min - 1 hour per delivery)</li>
                      <li>• Setting up at events or venues (30 min - 2 hours)</li>
                    </ul>
                    <p className="text-gray-700 font-semibold">
                      Typical time: <strong>30-90 minutes per order</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">The Shocking Reality</h3>
              <p className="text-gray-700 mb-3">
                Let&apos;s say you think a custom cake takes 6 hours (active baking only). Here&apos;s what it REALLY takes:
              </p>
              <div className="bg-white p-4 rounded">
                <ul className="text-gray-700 space-y-2">
                  <li>• Active baking: <strong>6 hours</strong></li>
                  <li>• Passive time (cooling, waiting): <strong>2 hours</strong></li>
                  <li>• Cleanup: <strong>1.5 hours</strong></li>
                  <li>• Admin (messages, invoice): <strong>45 minutes</strong></li>
                  <li>• Shopping & delivery: <strong>1.5 hours</strong></li>
                  <li className="pt-3 border-t-2 border-gray-300 font-bold text-xl">• TOTAL: <span className="text-red-600">11.75 hours</span></li>
                </ul>
              </div>
              <p className="text-gray-700 mt-4 font-semibold">
                You thought it was 6 hours. It&apos;s actually 11.75 hours. You&apos;re underestimating by <strong>96%</strong>.
              </p>
            </div>
          </section>

          {/* Section 3: How to Calculate */}
          <section id="calculate">
            <h2 className="text-3xl font-bold mb-4">How to Calculate Your True Hourly Rate (Step-by-Step)</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Here&apos;s the formula that reveals your true hourly rate:
            </p>

            <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-6 mb-6">
              <p className="text-center text-xl font-mono font-bold text-gray-900">
                True Hourly Rate = Total Revenue ÷ Total Hours Worked
              </p>
            </div>

            <p className="text-gray-700 mb-6">
              Sounds simple, right? The trick is tracking TOTAL hours worked—not just baking time. Here&apos;s how to do it:
            </p>

            <div className="space-y-6">
              <div className="bg-white border-l-4 border-rose-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Track Your Time for One Month</h3>
                    <p className="text-gray-700 mb-3">
                      For the next 30 days, track EVERY minute you spend on your bakery business. Use a simple notebook, phone app, or time tracking software.
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Track these categories:</strong>
                    </p>
                    <ul className="text-gray-700 space-y-1 ml-6">
                      <li>• Active baking (mixing, decorating, assembling)</li>
                      <li>• Passive time (waiting for baking, cooling)</li>
                      <li>• Prep & cleanup</li>
                      <li>• Admin (emails, quotes, invoices, social media)</li>
                      <li>• Shopping & delivery</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-rose-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Add Up Your Total Hours</h3>
                    <p className="text-gray-700">
                      At the end of the month, add up all the hours you tracked across all categories. This is your <strong>Total Hours Worked</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-rose-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Calculate Your Total Revenue</h3>
                    <p className="text-gray-700">
                      Add up all the money you made from orders that month. This is your <strong>Total Revenue</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-green-500 p-6 rounded shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Divide Revenue by Hours</h3>
                    <p className="text-gray-700 mb-2">
                      Total Revenue ÷ Total Hours = Your True Hourly Rate
                    </p>
                    <p className="text-gray-700 font-semibold">
                      This number is your reality check. It&apos;s what you&apos;re ACTUALLY making per hour.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Real Example */}
          <section id="real-example">
            <h2 className="text-3xl font-bold mb-4">Real Example: Sarah&apos;s Eye-Opening Calculation</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Sarah runs a home cake business. She thought she was making $30/hour. Here&apos;s what she discovered when she tracked her time for one month:
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Sarah&apos;s Month: 8 Custom Cakes</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Time Breakdown:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Active baking (8 cakes × 5 hrs):</span>
                    <span className="font-semibold text-gray-900">40 hours</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Passive time (cooling, waiting):</span>
                    <span className="font-semibold text-gray-900">16 hours</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Prep & cleanup:</span>
                    <span className="font-semibold text-gray-900">12 hours</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-700">Admin (emails, quotes, social media):</span>
                    <span className="font-semibold text-gray-900">10 hours</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b-2 border-gray-400">
                    <span className="text-gray-700">Shopping & delivery:</span>
                    <span className="font-semibold text-gray-900">14 hours</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-lg text-gray-900">Total Hours:</span>
                    <span className="font-bold text-red-600 text-xl">92 hours</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Revenue:</h4>
                <div className="flex justify-between">
                  <span className="text-gray-700">8 cakes × $150 each:</span>
                  <span className="font-bold text-green-600 text-xl">$1,200</span>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-3 text-xl">The Calculation:</h4>
                <p className="text-gray-700 mb-2 text-lg">
                  $1,200 ÷ 92 hours = <strong className="text-red-600 text-2xl">$13.04/hour</strong>
                </p>
                <p className="text-gray-700 mt-4">
                  Sarah thought she was making $30/hour (based on 40 hours of active baking). Her TRUE hourly rate is <strong>$13.04/hour</strong>—less than half what she thought.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 What This Means:</p>
              <p className="text-gray-700">
                Sarah is working for $13.04/hour—barely above minimum wage in many states. To make $30/hour, she needs to either: (1) Charge $212 per cake instead of $150, or (2) Work more efficiently to reduce her time per cake. This is why knowing your true hourly rate matters.
              </p>
            </div>
          </section>

          {/* Section 5: Industry Standards */}
          <section id="industry-standards">
            <h2 className="text-3xl font-bold mb-4">What Should You Charge Per Hour? Industry Standards</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Now that you know your true hourly rate, how does it compare to industry standards? Here&apos;s what bakers typically charge:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white border-2 border-gray-300 p-6 rounded">
                <p className="font-bold text-gray-900 mb-2">Entry-Level Baker</p>
                <p className="text-3xl font-bold text-blue-600 mb-2">$13-15/hr</p>
                <p className="text-sm text-gray-600 mb-3">
                  Less than 1 year experience
                </p>
                <p className="text-xs text-gray-500">
                  Source: PayScale 2025 data
                </p>
              </div>

              <div className="bg-white border-2 border-green-400 p-6 rounded">
                <p className="font-bold text-gray-900 mb-2">Home Baker (1-4 yrs)</p>
                <p className="text-3xl font-bold text-green-600 mb-2">$20-30/hr</p>
                <p className="text-sm text-gray-600 mb-3">
                  Established, efficient, quality work
                </p>
                <p className="text-xs text-gray-500">
                  Recommended target rate
                </p>
              </div>

              <div className="bg-white border-2 border-purple-400 p-6 rounded">
                <p className="font-bold text-gray-900 mb-2">Expert/Specialty</p>
                <p className="text-3xl font-bold text-purple-600 mb-2">$35-50/hr</p>
                <p className="text-sm text-gray-600 mb-3">
                  Advanced skills, intricate work
                </p>
                <p className="text-xs text-gray-500">
                  Premium positioning
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">How to Set Your Target Rate</h3>
              <p className="text-gray-700 mb-3">
                Your target hourly rate should be based on:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Your skill level:</strong> Beginner, intermediate, or expert?</li>
                <li>• <strong>Your market:</strong> What can your area support?</li>
                <li>• <strong>Your efficiency:</strong> How fast can you work?</li>
                <li>• <strong>Your goals:</strong> What do you need to earn to make this worthwhile?</li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Recommended Minimum: $20/hour</h3>
              <p className="text-gray-700 mb-3">
                As a home baker, you should aim for AT LEAST $20/hour. Here&apos;s why:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• It&apos;s above minimum wage in all states</li>
                <li>• It accounts for your skill and expertise</li>
                <li>• It makes the business sustainable long-term</li>
                <li>• It allows you to invest in quality ingredients and equipment</li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">
                If your true hourly rate is below $20, you need to either raise prices or improve efficiency.
              </p>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <TrendingUp className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Calculate Your Profitable Prices</h3>
                  <p className="mb-4">Now that you know your true hourly rate, use BakeProfit to set prices that actually pay you fairly. Includes labor cost tracking built-in.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Pricing Correctly Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: How to Improve */}
          <section id="improve">
            <h2 className="text-3xl font-bold mb-4">How to Improve Your Hourly Rate</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              If your true hourly rate is below your target, you have two options: increase revenue or decrease time. Here&apos;s how to do both:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  Strategy 1: Increase Your Prices
                </h3>
                <p className="text-gray-700 mb-3">
                  This is the fastest way to improve your hourly rate. If you&apos;re making $15/hour and want to make $25/hour, you need to increase prices by 67%.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>How to do it:</strong>
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• Calculate your true costs (ingredients, labor, overhead) using our <Link href="/tools/recipe-cost-calculator" className="text-rose-600 hover:underline font-semibold">free recipe cost calculator</Link></li>
                  <li>• Add your target hourly rate × actual hours worked</li>
                  <li>• Add profit margin (40-50%)</li>
                  <li>• That&apos;s your new price</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <strong>Read more:</strong> <Link href="/blog/pricing-mistakes" className="text-rose-600 hover:underline">The 3 Biggest Pricing Mistakes Home Bakers Make</Link>
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <Clock className="h-6 w-6 text-blue-600" />
                  Strategy 2: Reduce Your Time Per Order
                </h3>
                <p className="text-gray-700 mb-3">
                  Work smarter, not harder. Here&apos;s how to cut time without cutting quality:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• <strong>Batch your work:</strong> Make multiple cakes at once to reduce setup/cleanup time</li>
                  <li>• <strong>Streamline admin:</strong> Use templates for quotes, invoices, and customer messages</li>
                  <li>• <strong>Optimize shopping:</strong> Order ingredients online or shop once per week for multiple orders</li>
                  <li>• <strong>Improve efficiency:</strong> Practice techniques to work faster without sacrificing quality</li>
                  <li>• <strong>Eliminate waste:</strong> Reduce passive waiting time by planning better</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                  Strategy 3: Focus on High-Margin Products
                </h3>
                <p className="text-gray-700 mb-3">
                  Not all products are equally profitable. Track which items give you the best hourly rate and do more of those.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Example:</strong>
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• Simple cupcakes: 2 min each, $5 price = <strong>$150/hour</strong></li>
                  <li>• Intricate sugar cookies: 10 min each, $8 price = <strong>$48/hour</strong></li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Cupcakes give you 3× the hourly rate. Do more cupcakes, fewer cookies—or charge more for cookies.
                </p>
                <p className="text-gray-700 mt-3">
                  <strong>Read more:</strong> <Link href="/blog/cupcake-pricing-guide" className="text-rose-600 hover:underline">Cupcake Pricing Guide: $2 vs $5 vs $8</Link>
                </p>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Strategy 4: Say No to Unprofitable Orders</h3>
                <p className="text-gray-700 mb-3">
                  If a custom order would take 20 hours and the customer only wants to pay $200, that&apos;s $10/hour. Say no.
                </p>
                <p className="text-gray-700">
                  Your time is valuable. Don&apos;t take orders that drag down your hourly rate. It&apos;s better to have fewer orders at a good rate than many orders at a terrible rate.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Time Tracking Systems */}
          <section id="tracking">
            <h2 className="text-3xl font-bold mb-4">Time Tracking Systems That Actually Work</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              You can&apos;t improve what you don&apos;t measure. Here are practical ways to track your time:
            </p>

            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Method 1: Simple Notebook (Free)</h3>
                <p className="text-gray-700 mb-3">
                  Keep a notebook in your kitchen. Every time you start working on your bakery, write down:
                </p>
                <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                  <li>• Date and time</li>
                  <li>• What you&apos;re doing (baking, admin, delivery, etc.)</li>
                  <li>• Which order it&apos;s for</li>
                  <li>• When you stop</li>
                </ul>
                <p className="text-gray-700">
                  <strong>Pros:</strong> Free, simple, no tech needed<br />
                  <strong>Cons:</strong> Manual calculation, easy to forget
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Method 2: Phone Timer Apps (Free)</h3>
                <p className="text-gray-700 mb-3">
                  Use a time tracking app on your phone. Start the timer when you begin work, stop when you finish.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Recommended apps:</strong>
                </p>
                <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                  <li>• Toggl Track (free version available)</li>
                  <li>• Clockify (free)</li>
                  <li>• Hours Time Tracking</li>
                </ul>
                <p className="text-gray-700">
                  <strong>Pros:</strong> Automatic calculation, categorize by task<br />
                  <strong>Cons:</strong> Need to remember to start/stop timer
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Method 3: BakeProfit (Recommended)</h3>
                <p className="text-gray-700 mb-3">
                  Our <Link href="/bakery-business-tool" className="text-rose-600 hover:underline font-semibold">bakery management tool</Link> includes built-in time tracking specifically for bakers. Track time by order, automatically calculate hourly rates, and see which products are most profitable.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Features:</strong>
                </p>
                <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                  <li>• Track time by order and task category</li>
                  <li>• Automatic hourly rate calculations</li>
                  <li>• See profitability per product</li>
                  <li>• Export reports for tax time</li>
                  <li>• Free for up to 15 orders/month</li>
                </ul>
                <p className="text-gray-700">
                  <strong>Pros:</strong> Built for bakers, integrates with pricing, automatic reports<br />
                  <strong>Cons:</strong> Requires signup (but it&apos;s free to start)
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mt-6">
              <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-700">
                Track your time for at least one full month to get accurate data. Your first week might not be representative. After a month, you&apos;ll have a clear picture of your true hourly rate.
              </p>
            </div>
          </section>

          {/* Section 8: FAQ */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Should I charge for passive time (waiting for cakes to cool)?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Yes, if you can&apos;t do other productive work during that time. If you&apos;re stuck in the kitchen waiting, that&apos;s billable time. However, if you can work on other orders or tasks during cooling time, you might not need to charge for it separately—just factor it into your overall time management.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if my true hourly rate is embarrassingly low?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Don&apos;t panic—this is actually good news. Now you have DATA to fix your pricing. Most bakers are shocked when they first calculate their true rate. Use this as motivation to raise prices or improve efficiency. Read our guide on <Link href="/blog/losing-money-on-cakes" className="text-rose-600 hover:underline">Why You&apos;re Losing Money on Every Cake</Link> for next steps.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How often should I recalculate my hourly rate?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Track continuously, but review quarterly. Your hourly rate will improve as you get more efficient. Check it every 3 months to see your progress and adjust pricing if needed.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: Should I include time spent learning new techniques?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> No, learning time is an investment in your skills, not billable time. However, once you&apos;ve learned a technique and you&apos;re using it for paid orders, that time counts. Practice cakes don&apos;t count; customer orders do.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What if I enjoy baking and don&apos;t mind working for less?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> That&apos;s fine for a hobby, but if you&apos;re running a business, you need to pay yourself fairly. Otherwise, you&apos;re subsidizing your customers with your personal money. That&apos;s not sustainable long-term, and it devalues the work of all bakers.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Ready to Know Your True Hourly Rate?</h2>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              Stop guessing and start knowing. BakeProfit tracks your time, calculates your true hourly rate, and helps you set prices that actually pay you fairly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools/recipe-cost-calculator">
                <Button className="bg-white text-rose-600 hover:bg-gray-50 border-2 border-rose-600 px-8 py-6 text-lg">
                  Try Free Calculator
                </Button>
              </Link>
              <Link href="/bakery-business-tool">
                <Button className="bg-rose-500 hover:bg-rose-600 px-8 py-6 text-lg">
                  Start Tracking Time Free →
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
              <Link href="/blog/losing-money-on-cakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Why You&apos;re Losing Money on Every Cake</h4>
                <p className="text-gray-600 text-sm">Discover the 7 hidden costs killing your profits, including undervalued labor time.</p>
              </Link>
              <Link href="/blog/pricing-mistakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">The 3 Biggest Pricing Mistakes Home Bakers Make</h4>
                <p className="text-gray-600 text-sm">Learn how to fix undercharging, missing overhead, and undervaluing your time.</p>
              </Link>
              <Link href="/blog/how-to-calculate-recipe-cost" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Calculate Recipe Cost</h4>
                <p className="text-gray-600 text-sm">Learn the exact formula to calculate recipe costs including labor at your true hourly rate.</p>
              </Link>
              <Link href="/blog/cupcake-pricing-guide" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Cupcake Pricing Guide: $2 vs $5 vs $8</h4>
                <p className="text-gray-600 text-sm">See how different pricing tiers affect your hourly rate and profitability.</p>
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
