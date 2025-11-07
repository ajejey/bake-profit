'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useBakeryData } from '@/app/bakery-business-tool/contexts/BakeryDataContext';
import { SUBSCRIPTION_LIMITS } from '@/lib/subscription-limits';
import { Crown, Check, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import UsageIndicator from '@/components/subscription/UsageIndicator';

export default function SubscriptionSettings() {
  const { tier } = useSubscription();
  const { recipes, orders, customers, inventory } = useBakeryData();
  const limits = SUBSCRIPTION_LIMITS[tier];
  const isPro = tier === 'pro';

  // Calculate actual usage from local data
  const usage = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const ordersThisMonth = orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    }).length;

    return {
      recipes: recipes.length,
      ordersThisMonth,
      customers: customers.length,
      inventoryItems: inventory.length,
    };
  }, [recipes, orders, customers, inventory]);

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>
            Manage your subscription and billing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 rounded-lg">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold">
                  {isPro ? 'Pro Plan' : 'Free Plan'}
                </h3>
                {isPro && <Badge className="bg-rose-500">Active</Badge>}
              </div>
              <p className="text-sm text-gray-600">
                {isPro 
                  ? 'Unlimited access to all features'
                  : 'Limited features - Upgrade for unlimited access'
                }
              </p>
              {/* {isPro && (
                <p className="text-xs text-gray-500 mt-2">
                  Next billing date: January 15, 2025
                </p>
              )} */}
            </div>
            <div className="text-right">
              {isPro ? (
                <>
                  <p className="text-2xl font-bold text-rose-600">$6.99</p>
                  <p className="text-xs text-gray-600">per month</p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-gray-600">$0</p>
                  <p className="text-xs text-gray-600">forever</p>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {isPro ? (
              <>
                <Button variant="outline" className="flex-1">
                  Manage Billing
                </Button>
                <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                  Cancel Subscription
                </Button>
              </>
            ) : (
              <Link href="/upgrade" className="flex-1">
                <Button className="w-full bg-rose-500 hover:bg-rose-600">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Usage Statistics
          </CardTitle>
          <CardDescription>
            {isPro ? 'Your current usage (unlimited)' : 'Your current usage this month'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <UsageIndicator
            used={usage.recipes}
            limit={limits.recipes}
            label="Recipes"
            isPro={isPro}
          />
          <UsageIndicator
            used={usage.ordersThisMonth}
            limit={limits.ordersPerMonth}
            label="Orders this month"
            isPro={isPro}
          />
          <UsageIndicator
            used={usage.customers}
            limit={limits.customers}
            label="Customers"
            isPro={isPro}
          />
          <UsageIndicator
            used={usage.inventoryItems}
            limit={limits.inventoryItems}
            label="Inventory Items"
            isPro={isPro}
          />
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      {!isPro && (
        <Card>
          <CardHeader>
            <CardTitle>Why Upgrade to Pro?</CardTitle>
            <CardDescription>
              Unlock unlimited potential for your bakery business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Free Plan */}
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3">Free Plan</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>5 recipes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>15 orders per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>10 customers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>20 inventory items</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400">
                    <span className="text-lg">×</span>
                    <span>No Google Drive sync</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400">
                    <span className="text-lg">×</span>
                    <span>No email notifications</span>
                  </li>
                </ul>
              </div>

              {/* Pro Plan */}
              <div className="border-2 border-rose-500 rounded-lg p-4 bg-gradient-to-br from-rose-50 to-orange-50">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-bold text-lg">Pro Plan</h3>
                  <Badge className="bg-rose-500">Recommended</Badge>
                </div>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-rose-500 mt-0.5" />
                    <span className="font-medium">Unlimited recipes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-rose-500 mt-0.5" />
                    <span className="font-medium">Unlimited orders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-rose-500 mt-0.5" />
                    <span className="font-medium">Unlimited customers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-rose-500 mt-0.5" />
                    <span className="font-medium">Unlimited inventory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-rose-500 mt-0.5" />
                    <span className="font-medium">Google Drive sync</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-rose-500 mt-0.5" />
                    <span className="font-medium">Email notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-rose-500 mt-0.5" />
                    <span className="font-medium">Priority support</span>
                  </li>
                </ul>
                <Link href="/upgrade">
                  <Button className="w-full bg-rose-500 hover:bg-rose-600">
                    Upgrade Now - $6.99/month
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
