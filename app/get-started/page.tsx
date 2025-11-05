'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Calculator,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Crown,
  Gift,
} from 'lucide-react';

export default function GetStartedPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('free');

  const handleContinue = () => {
    if (selectedPlan === 'free') {
      router.push('/login?plan=free');
    } else {
      router.push('/pricing-new');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header showBlog showTools />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Welcome to BakeProfit!
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Run a Profitable Bakery
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            From calculating recipe costs to tracking orders and managing inventory—all in one simple tool. 
            Start free, upgrade when you&apos;re ready to grow.
          </p>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You&apos;ll Get Access To
            </h2>
            <p className="text-lg text-gray-600">
              Professional bakery management tools designed for home bakers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-rose-100">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Recipe Cost Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Calculate exact costs for every recipe. Know your profit margins and price confidently.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rose-100">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Order Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Manage all orders in one place. Track status, due dates, and never miss a delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rose-100">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Inventory Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Track ingredients, get low-stock alerts, and auto-generate shopping lists.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rose-100">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Smart Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Price products for profit. Factor in all costs and set target margins automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rose-100">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Customer Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Store customer details, track order history, and identify your best customers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rose-100">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Business Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  See revenue, profit trends, and best-selling products at a glance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-rose-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Started in 3 Simple Steps
            </h2>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Add Your Ingredients</h3>
                <p className="text-gray-600">
                  Enter the ingredients you use with their costs. The tool calculates cost per unit automatically.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Create Your Recipes</h3>
                <p className="text-gray-600">
                  Build recipes by selecting ingredients and quantities. See total cost and suggested pricing instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Track Orders & Grow</h3>
                <p className="text-gray-600">
                  Add orders, manage customers, track inventory, and watch your business analytics grow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Selection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600">
              Start free or unlock unlimited features with Pro
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <Card 
              className={`cursor-pointer transition-all ${
                selectedPlan === 'free' 
                  ? 'border-2 border-rose-500 shadow-lg' 
                  : 'border-2 border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => setSelectedPlan('free')}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">Free</CardTitle>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">$0</span>
                      <span className="text-gray-600">/forever</span>
                    </div>
                  </div>
                  <Gift className="h-12 w-12 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><strong>5 recipes</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><strong>15 orders</strong> per month</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><strong>10 customers</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><strong>20 inventory items</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">All features accessible</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Local storage</span>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                  <strong>Perfect for getting started!</strong>
                </div>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card 
              className={`cursor-pointer transition-all relative ${
                selectedPlan === 'pro' 
                  ? 'border-2 border-rose-500 shadow-lg' 
                  : 'border-2 border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => setSelectedPlan('pro')}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </span>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">Pro</CardTitle>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-rose-600">$6.99</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">or $69/year (save $14)</p>
                  </div>
                  <Crown className="h-12 w-12 text-rose-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900"><strong>UNLIMITED</strong> recipes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900"><strong>UNLIMITED</strong> orders</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900"><strong>UNLIMITED</strong> customers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900"><strong>UNLIMITED</strong> inventory</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900"><strong>Google Drive auto-sync</strong> ⭐</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900">Advanced analytics</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900">Priority support</span>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-600 bg-rose-50 p-3 rounded-lg">
                  <strong>Best for growing businesses!</strong>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Continue Button */}
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="bg-rose-600 hover:bg-rose-700 text-white px-12 py-6 text-lg"
              onClick={handleContinue}
            >
              {selectedPlan === 'free' ? 'Start Free Now' : 'Continue to Checkout'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              {selectedPlan === 'free' 
                ? 'No credit card required • Start using immediately' 
                : '30-day money-back guarantee • Cancel anytime'}
            </p>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Your Data Stays Private</h3>
              <p className="text-sm text-gray-600">
                Everything stored locally. We never see or sell your data.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Works Offline</h3>
              <p className="text-sm text-gray-600">
                No internet? No problem. Works perfectly offline anytime.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Setup in Minutes</h3>
              <p className="text-sm text-gray-600">
                No complicated setup. Start managing your bakery right away.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
