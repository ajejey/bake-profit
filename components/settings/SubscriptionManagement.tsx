'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function SubscriptionManagement() {
  const { user } = useAuth();
  const { tier, usage } = useSubscription();
  const [loading, setLoading] = useState(false);

  const isProUser = tier === 'pro';
  const subscriptionEndsAt = user?.subscription_ends_at 
    ? new Date(user.subscription_ends_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your Pro subscription? You will keep Pro access until the end of your billing period, then revert to the Free plan.')) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/paypal/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }

      alert('Subscription cancelled successfully. You will keep Pro access until ' + subscriptionEndsAt);
      window.location.reload();
    } catch (error) {
      console.error('Error canceling subscription:', error);
      alert('Failed to cancel subscription. Please try again or contact thebakeprofit@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {isProUser && <Crown className="h-5 w-5 text-yellow-500" />}
                Current Plan
              </CardTitle>
              <CardDescription>
                Manage your subscription and billing
              </CardDescription>
            </div>
            <Badge 
              variant={isProUser ? 'default' : 'secondary'}
              className={isProUser ? 'bg-rose-600' : ''}
            >
              {isProUser ? 'Pro' : 'Free'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isProUser ? (
            <>
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <Crown className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-green-900">Pro Plan Active</p>
                  <p className="text-sm text-green-700">
                    You have unlimited access to all features including Google Drive sync, advanced analytics, and priority support.
                  </p>
                </div>
              </div>

              {subscriptionEndsAt && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Next Billing Date</p>
                    <p className="text-sm text-gray-700">{subscriptionEndsAt}</p>
                  </div>
                </div>
              )}

              {user?.paypal_subscription_id && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <CreditCard className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Payment Method</p>
                    <p className="text-sm text-gray-700">PayPal</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleCancelSubscription}
                  disabled={loading}
                >
                  Cancel Subscription
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  You&apos;ll keep Pro access until {subscriptionEndsAt}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-blue-900">Free Plan</p>
                  <p className="text-sm text-blue-700">
                    You&apos;re currently on the Free plan with limited features. Upgrade to Pro for unlimited access!
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Current Usage</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Recipes</p>
                    <p className="text-lg font-bold text-gray-900">{usage.recipes} / 5</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Orders (This Month)</p>
                    <p className="text-lg font-bold text-gray-900">{usage.ordersThisMonth} / 15</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Customers</p>
                    <p className="text-lg font-bold text-gray-900">{usage.customers} / 10</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Inventory Items</p>
                    <p className="text-lg font-bold text-gray-900">{usage.inventoryItems} / 20</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Link href="/pricing">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                </Link>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Get unlimited everything for just $6.99/month
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Pro Features */}
      {!isProUser && (
        <Card>
          <CardHeader>
            <CardTitle>Pro Features</CardTitle>
            <CardDescription>
              Unlock these features with Pro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span>Unlimited recipes, orders, customers & inventory</span>
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span>Google Drive auto-sync for backup</span>
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span>Advanced analytics and reports</span>
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span>Priority email support</span>
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span>No BakeProfit branding on exports</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
