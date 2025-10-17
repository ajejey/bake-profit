'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';

interface UsageIndicatorProps {
  used: number;
  limit: number;
  label: string;
  isPro?: boolean;
}

export default function UsageIndicator({ used, limit, label, isPro = false }: UsageIndicatorProps) {
  if (isPro) {
    return (
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 rounded-lg">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-rose-500" />
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <Badge className="bg-rose-500">Unlimited</Badge>
      </div>
    );
  }

  const percentage = (used / limit) * 100;
  const remaining = Math.max(0, limit - used);
  
  // Determine color based on usage
  const getColor = () => {
    if (percentage >= 100) return 'text-red-600';
    if (percentage >= 80) return 'text-orange-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getProgressColor = () => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-orange-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col space-y-1 p-2 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-sm font-bold flex items-center justify-between gap-2 ${getColor()}`}>
         <span>{used}/{limit}</span>
          <span className="flex items-center justify-between text-xs text-gray-600">
        <span>
         ({remaining > 0 ? `${remaining} remaining` : 'Limit reached'})
        </span>
        {percentage >= 80 && (
          <Badge variant="outline" className="text-xs">
            {percentage >= 100 ? 'Full' : 'Almost full'}
          </Badge>
        )}
      </span>
        </span>
      </div>
      
      <Progress
        value={Math.min(percentage, 100)}
        className="h-1"
        color={getProgressColor()}
      />
      
      
    </div>
  );
}
