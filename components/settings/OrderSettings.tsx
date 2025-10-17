'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, User } from 'lucide-react';

export default function OrderSettings() {
  const { toast } = useToast();

  const [defaultStatus, setDefaultStatus] = useState('new');
  const [autoIncrement, setAutoIncrement] = useState(true);
  const [orderPrefix, setOrderPrefix] = useState('ORD-');
  const [leadTime, setLeadTime] = useState('2');
  const [requirePhone, setRequirePhone] = useState(false);
  const [autoSaveCustomers, setAutoSaveCustomers] = useState(true);

  const handleSave = () => {
    localStorage.setItem('orderSettings', JSON.stringify({
      defaultStatus,
      autoIncrement,
      orderPrefix,
      leadTime,
      requirePhone,
      autoSaveCustomers,
    }));

    toast({
      title: 'Settings saved',
      description: 'Your order preferences have been updated.',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Order Defaults
          </CardTitle>
          <CardDescription>
            Configure default settings for new orders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultStatus">Default Order Status</Label>
              <Select value={defaultStatus} onValueChange={setDefaultStatus}>
                <SelectTrigger id="defaultStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="leadTime">Default Lead Time (days)</Label>
              <Input
                id="leadTime"
                type="number"
                value={leadTime}
                onChange={(e) => setLeadTime(e.target.value)}
                placeholder="2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderPrefix">Order Number Prefix</Label>
              <Input
                id="orderPrefix"
                value={orderPrefix}
                onChange={(e) => setOrderPrefix(e.target.value)}
                placeholder="ORD-"
              />
              <p className="text-xs text-gray-500">
                Example: ORD-001, ORD-002, etc.
              </p>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="autoIncrement">Auto-increment Order Numbers</Label>
                <p className="text-xs text-gray-500">Automatically generate order numbers</p>
              </div>
              <Switch
                id="autoIncrement"
                checked={autoIncrement}
                onCheckedChange={setAutoIncrement}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Management
          </CardTitle>
          <CardDescription>
            Configure customer-related preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="requirePhone">Require Phone Number</Label>
              <p className="text-xs text-gray-500">Make phone number mandatory for orders</p>
            </div>
            <Switch
              id="requirePhone"
              checked={requirePhone}
              onCheckedChange={setRequirePhone}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="autoSaveCustomers">Auto-save New Customers</Label>
              <p className="text-xs text-gray-500">Automatically add new customers to your list</p>
            </div>
            <Switch
              id="autoSaveCustomers"
              checked={autoSaveCustomers}
              onCheckedChange={setAutoSaveCustomers}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
