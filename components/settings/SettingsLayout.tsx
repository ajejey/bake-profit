'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
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
    { id: 'account', label: 'Account', icon: User },
    { id: 'subscription', label: 'Subscription', icon: Crown },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'recipes', label: 'Recipes', icon: ChefHat },
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
          <p className="text-gray-600 mt-2">Manage your account and application preferences</p>
        </div>

        {/* Settings Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Desktop Sidebar + Mobile Tabs */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-6">
            {/* Sidebar Navigation - Desktop */}
            <div className="hidden lg:block lg:col-span-3">
              <Card className="p-2 sticky top-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-gray-700 hover:bg-gray-100'
                        } ${tab.id === 'danger' ? 'text-red-600 hover:bg-red-50' : ''}`}
                      >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </Card>
            </div>

            {/* Mobile Tabs */}
            <div className="lg:hidden mb-6">
              <TabsList className="grid grid-cols-2 gap-2 h-auto">
                {tabs.slice(0, 6).map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex items-center gap-2 py-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9">
              <TabsContent value="account" className="mt-0">
                <AccountSettings />
              </TabsContent>

              <TabsContent value="subscription" className="mt-0">
                <SubscriptionSettings />
              </TabsContent>

              <TabsContent value="business" className="mt-0">
                <BusinessSettings />
              </TabsContent>

              <TabsContent value="orders" className="mt-0">
                <OrderSettings />
              </TabsContent>

              <TabsContent value="recipes" className="mt-0">
                <RecipeSettings />
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
          </div>
        </Tabs>
      </div>
    </div>
  );
}
