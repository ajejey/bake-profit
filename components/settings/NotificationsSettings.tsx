'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bell } from 'lucide-react';

export default function NotificationsSettings() {
  const { toast } = useToast();
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [upcomingDeliveries, setUpcomingDeliveries] = useState(true);
  const [usageLimitWarnings, setUsageLimitWarnings] = useState(true);

  const handleSave = () => {
    localStorage.setItem('notificationSettings', JSON.stringify({
      lowStockAlerts,
      upcomingDeliveries,
      usageLimitWarnings,
    }));
    toast({ title: 'Settings saved', description: 'Notification preferences updated.' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            In-App Notifications
          </CardTitle>
          <CardDescription>Control what notifications you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label>Low Stock Alerts</Label>
              <p className="text-xs text-gray-500">Get notified when inventory is running low</p>
            </div>
            <Switch checked={lowStockAlerts} onCheckedChange={setLowStockAlerts} />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label>Upcoming Deliveries</Label>
              <p className="text-xs text-gray-500">Reminders for orders due soon</p>
            </div>
            <Switch checked={upcomingDeliveries} onCheckedChange={setUpcomingDeliveries} />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label>Usage Limit Warnings</Label>
              <p className="text-xs text-gray-500">Alerts when approaching plan limits</p>
            </div>
            <Switch checked={usageLimitWarnings} onCheckedChange={setUsageLimitWarnings} />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">Save Changes</Button>
      </div>
    </div>
  );
}
