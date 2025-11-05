'use client';

import { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getLoginUrlWithRedirect } from '@/lib/auth/redirect';

interface PayPalButtonProps {
  plan: 'pro';
  billingCycle: 'monthly' | 'yearly';
}

export function PayPalButton({ plan, billingCycle }: PayPalButtonProps) {
  const { token, refreshUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createSubscription = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/paypal/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan, billingCycle }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create subscription');
      }

      return data.subscriptionID;
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast.error('Failed to create PayPal subscription');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onApprove = async (data: { subscriptionID?: string | null }) => {
    try {
      setLoading(true);
      const response = await fetch('/api/paypal/activate-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          subscriptionID: data.subscriptionID || '',
          billingCycle,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Subscription activation failed');
      }

      // Refresh user data to get updated subscription
      await refreshUser();

      toast.success('Subscription activated! Welcome to Pro!');
      router.push('/bakery-business-tool?upgraded=true');
    } catch (error) {
      console.error('Error activating subscription:', error);
      toast.error('Subscription activation failed. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const onError = (err: Record<string, unknown>) => {
    console.error('PayPal error:', err);
    toast.error('Payment failed. Please try again.');
    setLoading(false);
  };

  if (!token) {
    return (
      <button
        onClick={() => router.push(getLoginUrlWithRedirect('/pricing-new'))}
        className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
      >
        Sign in to Subscribe
      </button>
    );
  }

  return (
    <div className="w-full">
      {loading && (
        <div className="text-center py-4 text-gray-600">
          Processing payment...
        </div>
      )}
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
          currency: 'USD',
          intent: 'capture',
          vault: true,
        }}
      >
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'subscribe',
          }}
          createSubscription={createSubscription}
          onApprove={onApprove}
          onError={onError}
          disabled={loading}
        />
      </PayPalScriptProvider>
    </div>
  );
}
