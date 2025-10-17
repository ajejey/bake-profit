'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Plug, Crown } from 'lucide-react';
import Link from 'next/link';

export default function IntegrationsSettings() {
  const { tier } = useSubscription();
  const isPro = tier === 'pro';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5" />
            Integrations
          </CardTitle>
          <CardDescription>Connect external services to enhance your workflow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-xl">📁</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Google Drive Sync</h4>
                  {!isPro && <Badge variant="outline" className="text-rose-500 border-rose-500"><Crown className="h-3 w-3 mr-1" />Pro</Badge>}
                </div>
                <p className="text-sm text-gray-500">Automatically backup your data to Google Drive</p>
              </div>
            </div>
            {isPro ? (
              <Button>Connect</Button>
            ) : (
              <Link href="/upgrade">
                <Button variant="outline">Upgrade</Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
