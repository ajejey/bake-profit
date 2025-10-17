'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { SUBSCRIPTION_LIMITS } from '@/lib/subscription-limits';
import Link from 'next/link';

export default function UsageBadge() {
  const { tier, usage } = useSubscription();

  // Only show for free tier
  if (tier !== 'free') {
    return null;
  }

  const limits = SUBSCRIPTION_LIMITS[tier];

  // Calculate percentages
  const usageData = [
    {
      label: 'Recipes',
      used: usage.recipes,
      limit: limits.recipes,
      percentage: (usage.recipes / limits.recipes) * 100,
    },
    {
      label: 'Orders',
      used: usage.ordersThisMonth,
      limit: limits.ordersPerMonth,
      percentage: (usage.ordersThisMonth / limits.ordersPerMonth) * 100,
    },
    {
      label: 'Customers',
      used: usage.customers,
      limit: limits.customers,
      percentage: (usage.customers / limits.customers) * 100,
    },
    {
      label: 'Inventory',
      used: usage.inventoryItems,
      limit: limits.inventoryItems,
      percentage: (usage.inventoryItems / limits.inventoryItems) * 100,
    },
  ];

  // Find highest usage percentage
  const maxUsage = Math.max(...usageData.map(d => d.percentage));

  // Only show badge if any usage is 80% or higher
  if (maxUsage < 80) {
    return null;
  }

  // Determine badge color and icon
  const getBadgeVariant = () => {
    if (maxUsage >= 100) return 'destructive';
    if (maxUsage >= 90) return 'destructive';
    if (maxUsage >= 80) return 'default';
    return 'secondary';
  };

  const getWarningIcon = () => {
    if (maxUsage >= 100) return '!!!';
    if (maxUsage >= 90) return '!!';
    return '!';
  };

  const getStatusEmoji = (percentage: number) => {
    if (percentage >= 100) return '🔴';
    if (percentage >= 90) return '🟠';
    if (percentage >= 80) return '🟡';
    return '🟢';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge
            variant={getBadgeVariant()}
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {getWarningIcon()}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm mb-1">Usage Summary</h3>
            <p className="text-xs text-gray-600">Free Plan Limits</p>
          </div>

          <div className="space-y-2">
            {usageData.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2">
                  <span>{getStatusEmoji(item.percentage)}</span>
                  <span className="text-gray-700">{item.label}:</span>
                </span>
                <span
                  className={`font-medium ${
                    item.percentage >= 100
                      ? 'text-red-600'
                      : item.percentage >= 90
                      ? 'text-orange-600'
                      : item.percentage >= 80
                      ? 'text-yellow-600'
                      : 'text-green-600'
                  }`}
                >
                  {item.used}/{item.limit} ({Math.round(item.percentage)}%)
                </span>
              </div>
            ))}
          </div>

          {maxUsage >= 90 && (
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-sm">
              <p className="text-rose-800 font-medium mb-1">
                {maxUsage >= 100 ? '⚠️ Limit Reached!' : '⚠️ Almost Full!'}
              </p>
              <p className="text-rose-700 text-xs">
                {maxUsage >= 100
                  ? 'Upgrade to Pro for unlimited access.'
                  : 'Consider upgrading to Pro to avoid hitting limits.'}
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-2 border-t">
            <Link href="/settings?tab=subscription" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </Link>
            <Link href="/upgrade" className="flex-1">
              <Button size="sm" className="w-full bg-rose-500 hover:bg-rose-600">
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
