import { SubscriptionLimits } from '@/types/subscription';

export const SUBSCRIPTION_LIMITS: Record<'free' | 'pro', SubscriptionLimits> = {
  free: {
    recipes: 5,
    ordersPerMonth: 15,
    customers: 10,
    inventoryItems: 20,
    features: {
      googleDriveSync: false,
      advancedAnalytics: false,
      invoicing: true, // Basic invoicing
      emailNotifications: false,
      smsNotifications: false,
      prioritySupport: false,
      noBranding: false,
    }
  },
  pro: {
    recipes: Infinity,
    ordersPerMonth: Infinity,
    customers: Infinity,
    inventoryItems: Infinity,
    features: {
      googleDriveSync: true,
      advancedAnalytics: true,
      invoicing: true, // Full invoicing
      emailNotifications: true,
      smsNotifications: true,
      prioritySupport: true,
      noBranding: true,
    }
  }
} as const;

export function getLimit(tier: 'free' | 'pro', limitType: keyof Omit<SubscriptionLimits, 'features'>): number {
  return SUBSCRIPTION_LIMITS[tier][limitType];
}

export function hasFeature(tier: 'free' | 'pro', feature: keyof SubscriptionLimits['features']): boolean {
  return SUBSCRIPTION_LIMITS[tier].features[feature];
}
