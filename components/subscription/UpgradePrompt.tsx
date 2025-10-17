'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Crown, Sparkles } from 'lucide-react';

interface UpgradePromptProps {
  title?: string;
  message: string;
  feature?: string;
  variant?: 'default' | 'inline' | 'dialog';
}

export default function UpgradePrompt({ 
  title = 'Upgrade to Pro', 
  message,
  feature,
  variant = 'default'
}: UpgradePromptProps) {
  
  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 rounded-lg">
        <div className="flex items-center gap-3">
          <Crown className="h-5 w-5 text-rose-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">{message}</p>
            {feature && (
              <p className="text-xs text-gray-600 mt-0.5">{feature}</p>
            )}
          </div>
        </div>
        <Link href="/upgrade">
          <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
            <Sparkles className="h-3 w-3 mr-1" />
            Upgrade
          </Button>
        </Link>
      </div>
    );
  }

  if (variant === 'dialog') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-100 rounded-full">
            <Crown className="h-6 w-6 text-rose-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-rose-50 to-orange-50 p-4 rounded-lg border border-rose-200">
          <h4 className="font-semibold text-sm mb-2">Pro Plan Benefits:</h4>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>✅ Unlimited recipes, orders, customers & inventory</li>
            <li>✅ Google Drive sync across devices</li>
            <li>✅ Advanced analytics & reports</li>
            <li>✅ Email & SMS notifications</li>
            <li>✅ Priority support</li>
          </ul>
          <p className="text-xs text-gray-600 mt-3">
            Only <span className="font-bold text-rose-600">$6.99/month</span>
          </p>
        </div>

        <Link href="/upgrade" className="block">
          <Button className="w-full bg-rose-500 hover:bg-rose-600" size="lg">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Pro
          </Button>
        </Link>
      </div>
    );
  }

  // Default variant
  return (
    <Alert className="border-rose-200 bg-gradient-to-r from-rose-50 to-orange-50">
      <Crown className="h-4 w-4 text-rose-500" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2 space-y-3">
        <p>{message}</p>
        {feature && (
          <p className="text-sm text-gray-600">{feature}</p>
        )}
        <Link href="/upgrade">
          <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
            <Sparkles className="h-3 w-3 mr-1" />
            Upgrade Now
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}
