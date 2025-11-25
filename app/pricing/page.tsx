'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Lock, 
  Shield
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PayPalButton } from '@/components/pricing/PayPalButton';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/layout/Footer';

export default function PricingNewPage() {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header showBlog showTools />

      {/* Breadcrumbs */}
      <div className="max-w-6xl pt-2 mx-auto px-4">
        <Breadcrumbs items={[{ label: 'Pricing' }]} />
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Simple, Transparent Pricing
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Pricing That Grows With Your Bakery
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start free forever. Upgrade to Pro when you need unlimited everything and Google Drive sync. 
            No hidden fees, no surprises.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              No credit card needed
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              30-day money-back
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Free Plan */}
            <Card className="relative border-2 border-gray-200 hover:border-rose-200 transition-colors">
              <CardHeader>
                <div className="mb-4">
                  <CardTitle className="text-2xl mb-2">Free</CardTitle>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-600">/forever</span>
                  </div>
                  <CardDescription className="text-base">
                    Perfect for hobbyists and getting started
                  </CardDescription>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    Calculate recipe costs, track orders, manage customers, and generate invoices. Everything you need to start pricing products correctly and running your bakery efficiently.
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                <Link href="/bakery-business-tool" className="block w-full mb-6">
                  <Button className="w-full bg-rose-100 text-rose-700 hover:bg-rose-200">
                    Start Free Now
                  </Button>
                </Link>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-700"><strong>5 recipes</strong></span>
                      <p className="text-xs text-gray-500">Perfect for testing and getting started</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-700"><strong>15 orders</strong> per month</span>
                      <p className="text-xs text-gray-500">Great for part-time bakers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-700"><strong>10 customers</strong></span>
                      <p className="text-xs text-gray-500">Store contact info and order history</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-700"><strong>20 inventory items</strong></span>
                      <p className="text-xs text-gray-500">Track ingredients and get low-stock alerts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-700">All features accessible</span>
                      <p className="text-xs text-gray-500">Recipe calculator, invoicing, pricing tools</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-700">Basic analytics</span>
                      <p className="text-xs text-gray-500">See which products make money</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-700">Local storage</span>
                      <p className="text-xs text-gray-500">Your data stays on your device</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-700">Export data</span>
                      <p className="text-xs text-gray-500">Download as PDF or spreadsheet</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-700"><strong>Beautiful Menu Builder</strong></span>
                      <p className="text-xs text-gray-500">Create online menus with templates, QR codes & shareable links</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-2 border-rose-300 shadow-xl bg-gradient-to-br from-rose-50 to-white">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  MOST POPULAR
                </span>
              </div>

              <CardHeader>
                <div className="mb-4">
                  <CardTitle className="text-2xl mb-2">Pro</CardTitle>
                  
                  {/* Billing Cycle Toggle */}
                  <div className="inline-flex items-center bg-rose-100 rounded-lg p-1 mb-6">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                        billingCycle === 'monthly'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle('yearly')}
                      className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all relative ${
                        billingCycle === 'yearly'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <span>Yearly</span>
                      <span className="ml-2 text-xs font-bold bg-green-600 text-white px-2 py-1 rounded-full">-17%</span>
                    </button>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-rose-600">
                      ${billingCycle === 'monthly' ? '6.99' : '69'}
                    </span>
                    <span className="text-gray-600 text-lg">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-4 inline-block">
                      <p className="text-sm text-green-700 font-medium">
                        💰 Save $14/year compared to monthly
                      </p>
                    </div>
                  )}
                  {billingCycle === 'monthly' && (
                    <p className="text-sm text-gray-500 mb-4">
                      Billed monthly • Cancel anytime
                    </p>
                  )}
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-gray-500 mb-4">
                      Billed annually • Best value
                    </p>
                  )}
                  <CardDescription className="text-base">
                    For growing bakery businesses
                  </CardDescription>
                  <p className="text-sm text-gray-900 mt-3 leading-relaxed">
                    Everything in Free, plus unlimited capacity. Advanced analytics, shopping list generator, PDF exports without branding, and automatic Google Drive backup to keep your data safe across devices.
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <PayPalButton plan="pro" billingCycle={billingCycle} />
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900"><strong>UNLIMITED</strong> recipes</span>
                      <p className="text-xs text-gray-600">Create as many as you need</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900"><strong>UNLIMITED</strong> orders</span>
                      <p className="text-xs text-gray-600">Track every order without limits</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900"><strong>UNLIMITED</strong> customers</span>
                      <p className="text-xs text-gray-600">Grow your customer base freely</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900"><strong>UNLIMITED</strong> inventory</span>
                      <p className="text-xs text-gray-600">Manage all your ingredients</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900">All features accessible</span>
                      <p className="text-xs text-gray-600">Everything the Free plan has</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900">Advanced analytics & reports</span>
                      <p className="text-xs text-gray-600">Profit margins, trends, insights</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900"><strong>Google Drive auto-sync</strong> ⭐</span>
                      <p className="text-xs text-gray-600">Backup and sync across devices</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900">Priority email support</span>
                      <p className="text-xs text-gray-600">Get help when you need it</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900">No branding on exports</span>
                      <p className="text-xs text-gray-600">Professional invoices and PDFs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900"><strong>Beautiful Menu Builder</strong></span>
                      <p className="text-xs text-gray-600">Create stunning online menus with templates, QR codes & shareable links</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              ✅ All plans include a <strong>30-day money-back guarantee</strong>. No credit card required for free plan.
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BakeProfit?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-rose-100">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No API calls for 95% of actions. Instant calculations and updates. Works offline, works online.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rose-100">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Your Data Stays Private</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Everything stored locally on your device. We never see or sell your data. You own it 100%.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rose-100">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Backed by Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  30-day money-back guarantee on Pro. No questions asked. We&apos;re confident you&apos;ll love it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-500 to-rose-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Grow Your Bakery?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Start free today. No credit card required. Upgrade to Pro whenever you&apos;re ready.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 text-lg px-8 py-6">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
