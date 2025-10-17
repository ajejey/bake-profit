'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { SubscriptionTier, UsageStats, LimitCheckResponse } from '@/types/subscription';
import { SUBSCRIPTION_LIMITS } from '@/lib/subscription-limits';

interface SubscriptionContextType {
  tier: SubscriptionTier;
  usage: UsageStats;
  loading: boolean;
  checkLimit: (type: 'recipes' | 'orders' | 'customers' | 'inventory') => Promise<LimitCheckResponse>;
  hasFeature: (feature: keyof typeof SUBSCRIPTION_LIMITS.free.features) => boolean;
  syncUsage: (counts: Partial<UsageStats>) => Promise<void>;
  refreshUsage: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuth();
  const [usage, setUsage] = useState<UsageStats>({
    recipes: 0,
    ordersThisMonth: 0,
    customers: 0,
    inventoryItems: 0,
  });
  const [loading, setLoading] = useState(true);

  const tier: SubscriptionTier = user?.subscription_tier || 'free';

  const fetchUsage = React.useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch('/api/subscription/usage', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.usage) {
          setUsage(data.usage);
        }
      }
    } catch (error) {
      console.error('Failed to fetch usage:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch usage stats from API
  useEffect(() => {
    if (user && token) {
      fetchUsage();
    } else {
      setLoading(false);
    }
  }, [user, token, fetchUsage]);

  const checkLimit = async (
    type: 'recipes' | 'orders' | 'customers' | 'inventory'
  ): Promise<LimitCheckResponse> => {
    if (!token) {
      return {
        allowed: false,
        limit: 0,
        used: 0,
        remaining: 0,
        message: 'Not authenticated',
      };
    }

    try {
      const response = await fetch('/api/subscription/check-limit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      if (response.ok) {
        const data: LimitCheckResponse = await response.json();
        return data;
      }

      return {
        allowed: false,
        limit: 0,
        used: 0,
        remaining: 0,
        message: 'Failed to check limit',
      };
    } catch (error) {
      console.error('Failed to check limit:', error);
      return {
        allowed: false,
        limit: 0,
        used: 0,
        remaining: 0,
        message: 'Error checking limit',
      };
    }
  };

  const hasFeature = (feature: keyof typeof SUBSCRIPTION_LIMITS.free.features): boolean => {
    return SUBSCRIPTION_LIMITS[tier].features[feature];
  };

  const syncUsage = async (counts: Partial<UsageStats>) => {
    if (!token) return;

    try {
      await fetch('/api/subscription/usage', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(counts),
      });

      // Refresh usage after sync
      await fetchUsage();
    } catch (error) {
      console.error('Failed to sync usage:', error);
    }
  };

  const refreshUsage = async () => {
    await fetchUsage();
  };

  return (
    <SubscriptionContext.Provider
      value={{
        tier,
        usage,
        loading,
        checkLimit,
        hasFeature,
        syncUsage,
        refreshUsage,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
