export type SubscriptionTier = 'free' | 'pro';

export interface SubscriptionLimits {
  recipes: number;
  ordersPerMonth: number;
  customers: number;
  inventoryItems: number;
  features: {
    googleDriveSync: boolean;
    advancedAnalytics: boolean;
    invoicing: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    prioritySupport: boolean;
    noBranding: boolean;
  };
}

export interface UsageStats {
  recipes: number;
  ordersThisMonth: number;
  customers: number;
  inventoryItems: number;
}

export interface LimitCheckResponse {
  allowed: boolean;
  limit: number;
  used: number;
  remaining: number;
  message?: string;
}
