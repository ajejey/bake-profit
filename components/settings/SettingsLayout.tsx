'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Crown, 
  Briefcase, 
  ShoppingCart, 
  ChefHat, 
  Database, 
  Plug, 
  Palette, 
  Bell, 
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import AccountSettings from './AccountSettings';
import SubscriptionSettings from './SubscriptionSettings';
import BusinessSettings from './BusinessSettings';
import OrderSettings from './OrderSettings';
import RecipeSettings from './RecipeSettings';
import DataPrivacySettings from './DataPrivacySettings';
import IntegrationsSettings from './IntegrationsSettings';
import AppearanceSettings from './AppearanceSettings';
import NotificationsSettings from './NotificationsSettings';
import HelpSupportSettings from './HelpSupportSettings';
import DangerZoneSettings from './DangerZoneSettings';

export default function SettingsLayout() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'account');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const tabs = [
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'recipes', label: 'Recipes', icon: ChefHat },
    { id: 'account', label: 'Account', icon: User },
    { id: 'subscription', label: 'Subscription', icon: Crown },
    { id: 'data', label: 'Data & Privacy', icon: Database },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and application preferenceddds</p>
        </div>

        {/* Settings Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Unified Tabs Row (mobile + desktop) */}
          <div className="border-b border-gray-200 pb-3">
            <TabsList className="flex w-full max-w-full overflow-x-auto gap-2 bg-transparent p-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isDanger = tab.id === 'danger';
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={`flex items-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors data-[state=active]:bg-white data-[state=active]:shadow-sm border data-[state=active]:border-gray-200 bg-gray-100/70 hover:bg-gray-100 ${
                      isDanger ? 'text-red-600 data-[state=active]:border-red-200 data-[state=active]:bg-red-50' : 'text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-1.5" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            <TabsContent value="business" className="mt-0">
              <BusinessSettings />
            </TabsContent>

            <TabsContent value="orders" className="mt-0">
              <OrderSettings />
            </TabsContent>

            <TabsContent value="recipes" className="mt-0">
              <RecipeSettings />
            </TabsContent>

            <TabsContent value="account" className="mt-0">
              <AccountSettings />
            </TabsContent>

            <TabsContent value="subscription" className="mt-0">
              <SubscriptionSettings />
            </TabsContent>

            <TabsContent value="data" className="mt-0">
              <DataPrivacySettings />
            </TabsContent>

            <TabsContent value="integrations" className="mt-0">
              <IntegrationsSettings />
            </TabsContent>

            <TabsContent value="appearance" className="mt-0">
              <AppearanceSettings />
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <NotificationsSettings />
            </TabsContent>

            <TabsContent value="help" className="mt-0">
              <HelpSupportSettings />
            </TabsContent>

            <TabsContent value="danger" className="mt-0">
              <DangerZoneSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
