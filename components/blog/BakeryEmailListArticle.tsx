'use client'

import Link from 'next/link'
import { Mail, Users, Gift, Calendar, TrendingUp, CheckCircle, XCircle, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import Footer from '../layout/Footer'

export default function BakeryEmailListArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → Bakery Email List Guide
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          How to Create a Bakery Email List (And What to Send)
        </h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span>Feb 6, 2025</span> • <span>19 min read</span> • <span className="text-rose-600 font-semibold">Email Marketing</span>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <p className="text-xl text-gray-700">
            You just delivered a beautiful custom cake. The customer loved it, paid you, and left happy. But here&apos;s the question: <strong>Will they remember you when they need another cake in 6 months?</strong>
          </p>

          <p className="text-xl text-gray-700">
            Probably not—unless you stay in touch. And the best way to stay in touch? <strong>Email.</strong>
          </p>

          <p className="text-lg text-gray-700">
            Social media is great, but algorithms hide your posts. Instagram shows your content to only 10-20% of your followers. But email? Every subscriber sees your message in their inbox. That&apos;s why email marketing has an average ROI of $42 for every $1 spent—the highest of any marketing channel.
          </p>

          <p className="text-lg text-gray-700">
            In this guide, I&apos;ll show you exactly how to build an email list for your bakery from scratch—even if you have zero subscribers today. You&apos;ll learn which free tools to use, how to get customers to sign up, what to send them, and how to turn subscribers into repeat customers. By the end, you&apos;ll have a complete email marketing system that brings in orders on autopilot.
          </p>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Mail className="h-8 w-8 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Manage Your Customer List with BakeProfit</h3>
                  <p className="mb-4">Track customer emails, order history, and preferences in one place. Send targeted promotions and build lasting relationships. Free forever.</p>
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
              <li><a href="#why-email" className="hover:text-rose-600">Why Your Bakery Needs an Email List</a></li>
              <li><a href="#email-platforms" className="hover:text-rose-600">Best Free Email Marketing Platforms for Bakers</a></li>
              <li><a href="#lead-magnets" className="hover:text-rose-600">Lead Magnet Ideas to Grow Your List</a></li>
              <li><a href="#signup-forms" className="hover:text-rose-600">Where to Add Email Signup Forms</a></li>
              <li><a href="#welcome-email" className="hover:text-rose-600">Your Welcome Email Sequence</a></li>
              <li><a href="#what-to-send" className="hover:text-rose-600">What to Send Your Subscribers (Email Ideas)</a></li>
              <li><a href="#email-frequency" className="hover:text-rose-600">How Often to Email Your List</a></li>
              <li><a href="#email-templates" className="hover:text-rose-600">Email Templates You Can Copy</a></li>
              <li><a href="#grow-list" className="hover:text-rose-600">10 Ways to Grow Your Email List Fast</a></li>
              <li><a href="#mistakes" className="hover:text-rose-600">5 Email Marketing Mistakes to Avoid</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* Section 1: Why Email */}
          <section id="why-email">
            <h2 className="text-3xl font-bold mb-4">Why Your Bakery Needs an Email List</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              &quot;I already have Instagram and Facebook. Why do I need email?&quot; Here&apos;s why:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  You Own Your List
                </p>
                <p className="text-sm text-gray-700">
                  Instagram can delete your account tomorrow. Email subscribers are YOURS forever. No algorithm, no platform changes.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  100% Reach
                </p>
                <p className="text-sm text-gray-700">
                  Every subscriber sees your email. Instagram shows your posts to only 10-20% of followers. Email = guaranteed visibility.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Higher Conversion
                </p>
                <p className="text-sm text-gray-700">
                  Email subscribers are 3x more likely to buy than social media followers. They opted in—they WANT to hear from you.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Direct Communication
                </p>
                <p className="text-sm text-gray-700">
                  Land directly in their inbox. No scrolling, no distractions. Your message gets their full attention.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Real Example: Maria&apos;s Cookie Business</h3>
              <p className="text-gray-700 mb-3">
                Maria had 2,000 Instagram followers but struggled to get consistent orders. She started building an email list and sent a monthly newsletter with her availability and specials.
              </p>
              <p className="text-gray-700 mb-3">
                Result: <strong>Her repeat customer rate jumped from 15% to 45%.</strong> Why? Because email reminded past customers she existed. They forgot about her on Instagram, but her monthly email kept her top-of-mind.
              </p>
              <p className="text-gray-700 font-semibold">
                Within 6 months, 60% of her orders came from email subscribers—even though her list was only 150 people.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Key Stat:</p>
              <p className="text-gray-700">
                Email marketing has an average ROI of $42 for every $1 spent. That&apos;s 4,200% return. No other marketing channel comes close.
              </p>
            </div>
          </section>

          {/* Section 2: Email Platforms */}
          <section id="email-platforms">
            <h2 className="text-3xl font-bold mb-4">Best Free Email Marketing Platforms for Bakers</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              You need an email marketing platform to manage your list, send emails, and track results. Here are the best free options for small bakeries:
            </p>

            <div className="space-y-6 mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">🏆 Mailchimp (Most Popular)</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Free Plan:</strong> Up to 500 contacts, 1,000 emails/month
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">✅ Pros:</p>
                    <ul className="text-gray-700 text-sm space-y-1 ml-6">
                      <li>• Most user-friendly interface</li>
                      <li>• Beautiful email templates</li>
                      <li>• Drag-and-drop builder</li>
                      <li>• Great analytics</li>
                      <li>• Integrates with everything</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">❌ Cons:</p>
                    <ul className="text-gray-700 text-sm space-y-1 ml-6">
                      <li>• Limited free plan (500 contacts)</li>
                      <li>• Expensive once you grow</li>
                      <li>• Can be overwhelming for beginners</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-700 text-sm font-semibold">
                  Best for: Beginners who want the easiest platform and have under 500 subscribers
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">🏆 MailerLite (Best Value)</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Free Plan:</strong> Up to 1,000 contacts, 12,000 emails/month
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">✅ Pros:</p>
                    <ul className="text-gray-700 text-sm space-y-1 ml-6">
                      <li>• Generous free plan (1,000 contacts)</li>
                      <li>• Simple, clean interface</li>
                      <li>• Great automation features</li>
                      <li>• Affordable paid plans</li>
                      <li>• Landing page builder included</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">❌ Cons:</p>
                    <ul className="text-gray-700 text-sm space-y-1 ml-6">
                      <li>• Fewer templates than Mailchimp</li>
                      <li>• Less well-known</li>
                      <li>• Fewer integrations</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-700 text-sm font-semibold">
                  Best for: Growing bakeries who want more contacts for free and plan to scale
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">🏆 Sender (Most Generous Free Plan)</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Free Plan:</strong> Up to 2,500 contacts, 15,000 emails/month
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">✅ Pros:</p>
                    <ul className="text-gray-700 text-sm space-y-1 ml-6">
                      <li>• Largest free plan (2,500 contacts!)</li>
                      <li>• Easy to use</li>
                      <li>• Good automation</li>
                      <li>• SMS marketing included</li>
                      <li>• Very affordable paid plans</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">❌ Cons:</p>
                    <ul className="text-gray-700 text-sm space-y-1 ml-6">
                      <li>• Fewer templates</li>
                      <li>• Less advanced features</li>
                      <li>• Smaller user community</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-700 text-sm font-semibold">
                  Best for: Bakers who want the most contacts for free and don&apos;t need fancy features
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">🏆 ConvertKit (Best for Creators)</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Free Plan:</strong> Up to 1,000 contacts, unlimited emails
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">✅ Pros:</p>
                    <ul className="text-gray-700 text-sm space-y-1 ml-6">
                      <li>• Unlimited emails (no monthly limit)</li>
                      <li>• Powerful automation</li>
                      <li>• Tag-based segmentation</li>
                      <li>• Landing pages included</li>
                      <li>• Creator-focused features</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">❌ Cons:</p>
                    <ul className="text-gray-700 text-sm space-y-1 ml-6">
                      <li>• Plain email templates</li>
                      <li>• Steeper learning curve</li>
                      <li>• More expensive paid plans</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-700 text-sm font-semibold">
                  Best for: Bakers who want advanced segmentation and automation (wedding vs birthday customers)
                </p>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">My Recommendation</h3>
              <p className="text-gray-700 mb-3">
                <strong>Start with MailerLite.</strong> Here&apos;s why:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• Free up to 1,000 contacts (plenty for most home bakers)</li>
                <li>• Simple enough for beginners</li>
                <li>• Powerful enough to grow with you</li>
                <li>• Affordable when you outgrow the free plan ($10/month for 1,001-2,500 contacts)</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Lead Magnets */}
          <section id="lead-magnets">
            <h2 className="text-3xl font-bold mb-4">Lead Magnet Ideas to Grow Your List</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              A lead magnet is something valuable you offer in exchange for an email address. People won&apos;t just hand over their email—you need to give them a reason. Here are the best lead magnets for bakeries:
            </p>

            <div className="space-y-6 mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Gift className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">1. Discount Code (Most Effective)</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Offer:</strong> &quot;Get 10% off your first order when you join our email list!&quot;
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Why it works:</strong> Immediate value. Customers see the discount and think, &quot;I&apos;m ordering anyway, might as well save 10%.&quot;
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>Example:</strong> &quot;Join our VIP list and get 10% off your next dozen cookies. Plus, be the first to know about new flavors and specials!&quot;
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Gift className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">2. VIP Early Access</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Offer:</strong> &quot;Join our VIP list for early access to limited-edition flavors and holiday specials.&quot;
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Why it works:</strong> Creates exclusivity. If you sell out quickly, customers want to be first in line.
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>Example:</strong> &quot;VIP members get first dibs on our Valentine&apos;s Day collection—usually sold out in 48 hours!&quot;
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Gift className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">3. Free Recipe or Guide</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Offer:</strong> &quot;Get my secret chocolate chip cookie recipe (the one everyone asks for!)&quot;
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Why it works:</strong> Provides value without costing you anything. Builds trust and positions you as an expert.
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>Ideas:</strong> Cookie decorating guide, cake storage tips, gluten-free baking substitutions, party planning checklist
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Gift className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">4. Monthly Giveaway Entry</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Offer:</strong> &quot;Join our list and be entered to win a free dozen cupcakes every month!&quot;
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Why it works:</strong> Everyone loves free stuff. Low cost for you (one dozen/month), high perceived value.
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>Tip:</strong> Announce the winner in your newsletter to show it&apos;s real and keep people engaged.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Gift className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">5. Birthday Club</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Offer:</strong> &quot;Join our Birthday Club and get a free cupcake on your birthday!&quot;
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Why it works:</strong> Personal and memorable. Customers love birthday perks, and it brings them back annually.
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>Bonus:</strong> Collect birthdays and send automated birthday emails with the offer. Easy repeat business.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-700">
                Start with a 10% discount code. It&apos;s the easiest to implement and converts the best. Once you have 100+ subscribers, test other lead magnets to see what your audience prefers.
              </p>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Users className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Track Customer Preferences & Orders</h3>
                  <p className="mb-4">BakeProfit helps you remember what each customer loves, when they order, and what to recommend next. Build better relationships.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Signup Forms */}
          <section id="signup-forms">
            <h2 className="text-3xl font-bold mb-4">Where to Add Email Signup Forms</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              You&apos;ve got a lead magnet. Now you need to make it easy for people to sign up. Here&apos;s where to add signup forms:
            </p>

            <div className="space-y-6 mb-6">
              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">1. Instagram Bio Link</h3>
                <p className="text-gray-700 mb-3">
                  Your Instagram bio link is prime real estate. Use a tool like Linktree or Beacons to create a landing page with:
                </p>
                <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                  <li>• &quot;Join VIP List (Get 10% Off)&quot; button</li>
                  <li>• Order form link</li>
                  <li>• Menu/pricing link</li>
                  <li>• Contact info</li>
                </ul>
                <p className="text-gray-700 text-sm font-semibold">
                  Make the email signup the FIRST button. Most people who visit your bio are interested—capture them immediately.
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">2. Facebook Page</h3>
                <p className="text-gray-700 mb-3">
                  Add a signup form to your Facebook page:
                </p>
                <ul className="text-gray-700 space-y-1 ml-6 mb-3">
                  <li>• Pin a post with your lead magnet offer</li>
                  <li>• Add signup link to &quot;About&quot; section</li>
                  <li>• Include in Facebook Stories regularly</li>
                  <li>• Post in local community groups (with permission)</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">3. With Every Order (Physical Card)</h3>
                <p className="text-gray-700 mb-3">
                  Include a small card with every order:
                </p>
                <div className="bg-white p-4 rounded border-2 border-gray-300 mb-3">
                  <p className="text-gray-900 font-bold mb-2">📧 Join Our VIP List!</p>
                  <p className="text-gray-700 text-sm mb-2">
                    Get 10% off your next order + be the first to know about new flavors and specials.
                  </p>
                  <p className="text-gray-700 text-sm font-semibold">
                    Text VIP to [your number] or visit [yourwebsite.com/vip]
                  </p>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Cost:</strong> Print 250 cards on Vistaprint for $10-15. Include one with every order.
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">4. Your Website (If You Have One)</h3>
                <p className="text-gray-700 mb-3">
                  Add signup forms in multiple places:
                </p>
                <ul className="text-gray-700 space-y-1 ml-6">
                  <li>• Pop-up when someone visits (offer 10% off)</li>
                  <li>• Footer of every page</li>
                  <li>• Dedicated &quot;/join&quot; or &quot;/vip&quot; landing page</li>
                  <li>• After someone views your menu/pricing</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">5. In-Person Events</h3>
                <p className="text-gray-700 mb-3">
                  At farmers markets, pop-ups, or craft fairs:
                </p>
                <ul className="text-gray-700 space-y-1 ml-6">
                  <li>• Have a tablet or clipboard for signups</li>
                  <li>• Offer a free sample for signing up</li>
                  <li>• QR code on your table that links to signup form</li>
                  <li>• Verbally ask every customer: &quot;Want to join our VIP list for 10% off?&quot;</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">The #1 Rule: Make It Visible</h3>
              <p className="text-gray-700">
                Don&apos;t hide your signup form. Put it everywhere. Mention it in every Instagram caption, every Facebook post, every customer interaction. The more you promote it, the faster your list grows.
              </p>
            </div>
          </section>

          {/* Section 5: Welcome Email */}
          <section id="welcome-email">
            <h2 className="text-3xl font-bold mb-4">Your Welcome Email Sequence</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              When someone joins your list, send them a welcome email immediately. This is your first impression—make it count.
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Welcome Email Template</h3>
              <div className="bg-gray-50 p-4 rounded mb-4">
                <p className="font-bold text-gray-900 mb-2">Subject: Welcome to [Your Bakery Name]! Here&apos;s Your 10% Off Code 🎉</p>
                <div className="space-y-3 text-gray-700 text-sm">
                  <p>Hi [First Name]!</p>
                  <p>Welcome to the [Your Bakery Name] VIP list! I&apos;m so excited to have you here.</p>
                  <p><strong>Here&apos;s your 10% off code: VIP10</strong></p>
                  <p>Use it on your next order—no minimum, no expiration. Just mention the code when you order!</p>
                  <p><strong>What you can expect from me:</strong></p>
                  <ul className="ml-6 space-y-1">
                    <li>• Weekly availability updates (so you know when I&apos;m taking orders)</li>
                    <li>• New flavor announcements</li>
                    <li>• Exclusive VIP-only specials</li>
                    <li>• Behind-the-scenes peeks at what I&apos;m baking</li>
                  </ul>
                  <p>I send emails 2-3 times per month—just enough to keep you in the loop without overwhelming your inbox.</p>
                  <p><strong>Ready to order?</strong> [Link to order form]</p>
                  <p>Thanks for joining! Can&apos;t wait to bake for you.</p>
                  <p>[Your Name]<br />[Your Bakery Name]</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                <strong>Pro Tip:</strong> Set this up as an automated email in your email platform. Every new subscriber gets it automatically.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">What to Include in Your Welcome Email</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Deliver your lead magnet</strong> (discount code, free recipe, etc.)</li>
                <li>• <strong>Set expectations</strong> (how often you&apos;ll email)</li>
                <li>• <strong>Tell them what to expect</strong> (new flavors, specials, availability)</li>
                <li>• <strong>Make it personal</strong> (use their first name, sign with yours)</li>
                <li>• <strong>Include a call-to-action</strong> (link to order, follow on Instagram, etc.)</li>
              </ul>
            </div>
          </section>

          {/* Section 6: What to Send */}
          <section id="what-to-send">
            <h2 className="text-3xl font-bold mb-4">What to Send Your Subscribers (Email Ideas)</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              &quot;I don&apos;t know what to email them!&quot; This is the #1 concern I hear. Here are 12 email ideas you can send right now:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-rose-600 flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-gray-900">1. Availability Updates</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  &quot;Taking orders for next week! Order by Friday for Saturday pickup.&quot;
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Zap className="h-5 w-5 text-rose-600 flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-gray-900">2. New Product Launches</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  &quot;New flavor alert: Salted caramel cupcakes are here! Limited time only.&quot;
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Gift className="h-5 w-5 text-rose-600 flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-gray-900">3. VIP-Only Specials</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  &quot;VIP exclusive: Buy 2 dozen, get 1 dozen free. This week only!&quot;
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-rose-600 flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-gray-900">4. Holiday Pre-Orders</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  &quot;Valentine&apos;s Day pre-orders open! Order by Feb 10 to guarantee your spot.&quot;
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Users className="h-5 w-5 text-rose-600 flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-gray-900">5. Customer Spotlights</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  &quot;Check out this amazing birthday cake I made for Sarah! [Include photo]&quot;
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Zap className="h-5 w-5 text-rose-600 flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-gray-900">6. Behind-the-Scenes</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  &quot;Here&apos;s what I&apos;m baking this week + a sneak peek at a new flavor!&quot;
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Gift className="h-5 w-5 text-rose-600 flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-gray-900">7. Recipe Shares</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  &quot;My secret to perfect buttercream (the one everyone asks about!)&quot;
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-rose-600 flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-gray-900">8. Event Announcements</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  &quot;Find me at the Farmers Market this Saturday! Free samples for VIPs.&quot;
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-rose-600 flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-gray-900">9. Last-Minute Availability</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  &quot;I have 3 spots left for this weekend! First come, first served.&quot;
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Users className="h-5 w-5 text-rose-600 flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-gray-900">10. Customer Reviews</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  &quot;Look what customers are saying! [Share testimonials + photos]&quot;
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Zap className="h-5 w-5 text-rose-600 flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-gray-900">11. Seasonal Offerings</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  &quot;Fall flavors are here! Pumpkin spice, apple cider, and maple pecan.&quot;
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Gift className="h-5 w-5 text-rose-600 flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-gray-900">12. Monthly Giveaway</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  &quot;This month&apos;s giveaway winner is... [Name]! Next month could be you!&quot;
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 The 80/20 Rule:</p>
              <p className="text-gray-700">
                80% valuable content (availability, new flavors, behind-the-scenes), 20% promotional (buy now, limited time offers). Don&apos;t just sell—provide value and build relationships.
              </p>
            </div>
          </section>

          {/* Section 7: Email Frequency */}
          <section id="email-frequency">
            <h2 className="text-3xl font-bold mb-4">How Often to Email Your List</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              &quot;How often should I email without annoying people?&quot; Here&apos;s the truth: <strong>You can&apos;t please everyone.</strong> Some people want daily emails, others want monthly. Here&apos;s what works for most bakeries:
            </p>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Recommended Email Frequency</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">✅ Starting Out (0-100 subscribers)</p>
                  <p className="text-gray-700 text-sm">
                    <strong>2-4 emails per month</strong> (weekly or bi-weekly). Focus on availability updates and new products. Keep it simple.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">✅ Growing (100-500 subscribers)</p>
                  <p className="text-gray-700 text-sm">
                    <strong>4-8 emails per month</strong> (1-2x per week). Mix availability, specials, behind-the-scenes, and customer spotlights.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">✅ Established (500+ subscribers)</p>
                  <p className="text-gray-700 text-sm">
                    <strong>8-12 emails per month</strong> (2-3x per week). Segment your list (wedding customers vs birthday customers) and send targeted emails.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">When to Email More Often</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Holiday seasons:</strong> Email 2-3x per week during Valentine&apos;s, Easter, Thanksgiving, Christmas</li>
                <li>• <strong>Wedding season:</strong> May-October, email wedding customers weekly with cake ideas</li>
                <li>• <strong>Last-minute availability:</strong> If you have unexpected openings, email immediately</li>
                <li>• <strong>New product launches:</strong> Build hype with 2-3 emails (teaser, launch, last chance)</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">The Unsubscribe Test</h3>
              <p className="text-gray-700 mb-3">
                Worried about unsubscribes? Here&apos;s the reality: <strong>1-2% unsubscribe rate is normal and healthy.</strong>
              </p>
              <p className="text-gray-700">
                If someone unsubscribes, they weren&apos;t going to buy anyway. Better to have 100 engaged subscribers than 500 who ignore your emails. Quality over quantity.
              </p>
            </div>
          </section>

          {/* Section 8: Email Templates */}
          <section id="email-templates">
            <h2 className="text-3xl font-bold mb-4">Email Templates You Can Copy</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Here are 3 copy-and-paste email templates you can use right now:
            </p>

            <div className="space-y-6 mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Template 1: Weekly Availability Email</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-bold text-gray-900 mb-3">Subject: Taking Orders for [Date]! 🍰</p>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>Hi [First Name]!</p>
                    <p>I&apos;m taking orders for [next week/this weekend]! Here&apos;s what&apos;s available:</p>
                    <p><strong>Available Products:</strong></p>
                    <ul className="ml-6 space-y-1">
                      <li>• Custom cakes (6&quot;, 8&quot;, 10&quot;)</li>
                      <li>• Cupcakes (minimum 1 dozen)</li>
                      <li>• Cookies (minimum 2 dozen)</li>
                    </ul>
                    <p><strong>This Week&apos;s Special:</strong> [Seasonal flavor or discount]</p>
                    <p><strong>Order Deadline:</strong> [Day, Date] by [Time]</p>
                    <p><strong>Pickup:</strong> [Day, Date] between [Time Range]</p>
                    <p>Ready to order? Reply to this email or text me at [Your Number]!</p>
                    <p>[Your Name]</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Template 2: New Flavor Announcement</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-bold text-gray-900 mb-3">Subject: New Flavor Alert: [Flavor Name]! 🎉</p>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>Hi [First Name]!</p>
                    <p>I&apos;ve been testing a new flavor and it&apos;s FINALLY ready to share with you...</p>
                    <p><strong>[Flavor Name]!</strong></p>
                    <p>[Brief description: e.g., &quot;Rich chocolate cake with salted caramel buttercream and a drizzle of caramel sauce. It&apos;s the perfect balance of sweet and salty!&quot;]</p>
                    <p><strong>Available for a limited time only!</strong></p>
                    <p>Order by [Date] for [Pickup Date]. This flavor sells out fast, so don&apos;t wait!</p>
                    <p>[Link to order or reply to this email]</p>
                    <p>Can&apos;t wait for you to try it!</p>
                    <p>[Your Name]</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Template 3: VIP Exclusive Offer</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-bold text-gray-900 mb-3">Subject: VIP Only: [Special Offer] 🌟</p>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>Hi [First Name]!</p>
                    <p>You&apos;re on my VIP list, which means you get first access to this special offer...</p>
                    <p><strong>[Offer Details]</strong></p>
                    <p>Examples:</p>
                    <ul className="ml-6 space-y-1">
                      <li>• Buy 2 dozen, get 1 dozen free</li>
                      <li>• 20% off all orders over $50</li>
                      <li>• Free upgrade to premium frosting</li>
                    </ul>
                    <p><strong>VIP-only offer expires [Date]!</strong></p>
                    <p>This offer is ONLY for my email subscribers—not available anywhere else.</p>
                    <p>Ready to order? [Link or contact info]</p>
                    <p>Thanks for being a VIP!</p>
                    <p>[Your Name]</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-700">
                Save these templates in your email platform as drafts. When you need to send an email, just customize the details and hit send. Makes email marketing 10x faster.
              </p>
            </div>
          </section>

          {/* CTA Card */}
          <Card className="bg-rose-50 border-rose-200 my-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <TrendingUp className="h-6 w-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Turn Subscribers Into Repeat Customers</h3>
                  <p className="mb-4">BakeProfit tracks customer order history, preferences, and purchase patterns. Know exactly what to offer each customer.</p>
                  <Link href="/bakery-business-tool">
                    <Button className="bg-rose-500 hover:bg-rose-600">Start Free →</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 9: Grow List */}
          <section id="grow-list">
            <h2 className="text-3xl font-bold mb-4">10 Ways to Grow Your Email List Fast</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              You&apos;ve set up your email platform and created your lead magnet. Now let&apos;s grow that list:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">1. Ask Every Customer</p>
                <p className="text-gray-700 text-sm">
                  When someone orders, ask: &quot;Want to join my VIP list for 10% off your next order?&quot; 80% will say yes.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">2. Include a Card with Every Order</p>
                <p className="text-gray-700 text-sm">
                  Physical card with your lead magnet offer. Cost: $10-15 for 250 cards. Conversion rate: 15-25%.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">3. Promote in Every Instagram Caption</p>
                <p className="text-gray-700 text-sm">
                  End every post with: &quot;Join my VIP list for 10% off! Link in bio.&quot; Repetition works.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">4. Run a Giveaway</p>
                <p className="text-gray-700 text-sm">
                  &quot;Enter to win a free dozen cupcakes! Join my email list to enter.&quot; Can grow your list by 50-100 in one week.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">5. Offer Early Access to Sold-Out Items</p>
                <p className="text-gray-700 text-sm">
                  &quot;Valentine&apos;s cupcakes sold out in 2 days last year. Join VIP list for early access this year.&quot;
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">6. Post in Local Facebook Groups</p>
                <p className="text-gray-700 text-sm">
                  Share your lead magnet in local community groups (with permission). Example: &quot;Free cookie decorating guide for anyone who wants it!&quot;
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">7. Collect Emails at In-Person Events</p>
                <p className="text-gray-700 text-sm">
                  Farmers markets, craft fairs, pop-ups. Have a tablet or clipboard. Offer a free sample for signing up.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">8. Partner with Complementary Businesses</p>
                <p className="text-gray-700 text-sm">
                  Wedding planners, party supply stores, coffee shops. Cross-promote each other&apos;s email lists.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">9. Add to Your Email Signature</p>
                <p className="text-gray-700 text-sm">
                  Every email you send should have: &quot;P.S. Join my VIP list for 10% off! [Link]&quot;
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">10. Create a QR Code</p>
                <p className="text-gray-700 text-sm">
                  QR code that links to your signup form. Put it on business cards, packaging, table tents, flyers.
                </p>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Realistic Growth Timeline</h3>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li>• <strong>Month 1:</strong> 20-50 subscribers (asking customers, Instagram bio)</li>
                <li>• <strong>Month 3:</strong> 75-150 subscribers (consistent promotion, cards with orders)</li>
                <li>• <strong>Month 6:</strong> 150-300 subscribers (word-of-mouth, referrals)</li>
                <li>• <strong>Month 12:</strong> 300-600 subscribers (established system, organic growth)</li>
              </ul>
            </div>
          </section>

          {/* Section 10: Mistakes */}
          <section id="mistakes">
            <h2 className="text-3xl font-bold mb-4">5 Email Marketing Mistakes to Avoid</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Mistake #1: Not Emailing Regularly
                </h3>
                <p className="text-gray-700 mb-2">
                  You build a list of 100 subscribers... then don&apos;t email them for 3 months. When you finally do, they&apos;ve forgotten who you are and unsubscribe.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Email at least 2-4 times per month. Consistency is key. Set a schedule and stick to it.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Mistake #2: Only Sending Sales Emails
                </h3>
                <p className="text-gray-700 mb-2">
                  Every email is &quot;Buy now!&quot; or &quot;Order today!&quot; No value, just selling. Subscribers get annoyed and unsubscribe.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Follow the 80/20 rule. 80% valuable content (availability, new flavors, behind-the-scenes), 20% promotional.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Mistake #3: No Welcome Email
                </h3>
                <p className="text-gray-700 mb-2">
                  Someone joins your list and... nothing. No welcome email, no lead magnet delivery. They forget they signed up.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Set up an automated welcome email that sends immediately. Deliver your lead magnet and set expectations.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Mistake #4: Generic, Boring Subject Lines
                </h3>
                <p className="text-gray-700 mb-2">
                  Subject: &quot;Newsletter #12&quot; or &quot;Update from [Your Bakery]&quot;. Nobody opens these.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Use specific, benefit-driven subject lines. Examples: &quot;Taking orders for Valentine&apos;s Day!&quot; or &quot;New flavor: Salted caramel cupcakes 🧁&quot;
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Mistake #5: Not Tracking Results
                </h3>
                <p className="text-gray-700 mb-2">
                  You send emails but never check open rates, click rates, or which emails drive orders. You&apos;re flying blind.
                </p>
                <p className="text-gray-700 font-semibold">
                  <strong>Fix:</strong> Check your email platform analytics monthly. See what works and do more of it. Average open rate for bakeries: 20-30%.
                </p>
              </div>
            </div>
          </section>

          {/* Section 11: FAQ */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How much does it cost to start an email list for my bakery?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> You can start completely free. Tools like Mailchimp (free up to 500 contacts), MailerLite (free up to 1,000 contacts), and Sender (free up to 2,500 contacts) offer generous free plans. You only pay when you grow beyond these limits. Most home bakers stay on free plans for 6-12 months.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How often should I email my bakery customers?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Start with 2-4 emails per month (weekly or bi-weekly). This keeps you top-of-mind without overwhelming subscribers. As you grow and segment your list, you can increase to 1-2x per week. During busy seasons (holidays, wedding season), email more frequently—2-3x per week is fine.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What should I send in my bakery newsletter?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Mix it up! Send: 1) Weekly availability updates, 2) New product announcements, 3) VIP-only specials, 4) Behind-the-scenes content, 5) Customer spotlights, 6) Seasonal offerings, 7) Holiday pre-orders, and 8) Last-minute availability. Follow the 80/20 rule: 80% valuable content, 20% promotional.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: How do I get customers to join my email list?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> Offer a lead magnet—something valuable in exchange for their email. The most effective: 10% off first order, VIP early access to limited items, free recipe guide, or monthly giveaway entry. Add signup forms to your Instagram bio, Facebook page, website, and include a card with every order. Ask every customer: &quot;Want to join my VIP list for 10% off?&quot;
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Q: What&apos;s a good email open rate for a bakery?</h3>
                <p className="text-gray-700">
                  <strong>A:</strong> 20-30% is average for small businesses. If you&apos;re getting 15-20%, that&apos;s okay for starting out. Above 30% is excellent. Focus on writing compelling subject lines and sending valuable content. Your most engaged subscribers (people who order regularly) will have 40-60% open rates.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Ready to Build Your Email List?</h2>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              You have everything you need to start building your email list today. Pick a platform, create your lead magnet, and start collecting emails. Your future repeat customers are waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/bakery-business-tool">
                <Button className="bg-rose-500 hover:bg-rose-600 px-8 py-6 text-lg">
                  Start Managing Customers Free →
                </Button>
              </Link>
              <Link href="/tools/recipe-cost-calculator">
                <Button className="bg-white text-rose-600 hover:bg-gray-50 border-2 border-rose-600 px-8 py-6 text-lg">
                  Try Free Calculator
                </Button>
              </Link>
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              No credit card required • Track customers & orders • Free forever
            </p>
          </div>

          {/* Related Articles */}
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/bakery-branding-on-budget" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Bakery Branding on a Budget: DIY Guide</h4>
                <p className="text-gray-600 text-sm">Create a professional bakery brand for under $100. DIY logo, packaging, social media & more.</p>
              </Link>
              <Link href="/blog/bakery-menu-guide" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Create a Bakery Menu That Sells</h4>
                <p className="text-gray-600 text-sm">Complete guide to creating a profitable bakery menu with pricing psychology and design tips.</p>
              </Link>
              <Link href="/blog/pricing-mistakes" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">The 3 Biggest Pricing Mistakes Home Bakers Make</h4>
                <p className="text-gray-600 text-sm">Discover the 3 critical pricing mistakes costing home bakers thousands every year.</p>
              </Link>
              <Link href="/blog/start-home-bakery-budget" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">How to Start a Home Bakery with $500 or Less</h4>
                <p className="text-gray-600 text-sm">Complete guide to starting a profitable home bakery on a shoestring budget.</p>
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
