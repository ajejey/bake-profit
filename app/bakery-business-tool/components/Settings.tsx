'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { 
  User, 
  Crown, 
  Briefcase, 
  ShoppingCart, 
  ChefHat, 
  Database, 
  Palette, 
  Bell,
  FileText
} from 'lucide-react';
import AccountSettings from '@/components/settings/AccountSettings';
import SubscriptionSettings from '@/components/settings/SubscriptionSettings';
import BusinessSettings from '@/components/settings/BusinessSettings';
import OrderSettings from '@/components/settings/OrderSettings';
import RecipeSettings from '@/components/settings/RecipeSettings';
import DataPrivacySettings from '@/components/settings/DataPrivacySettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import NotificationsSettings from '@/components/settings/NotificationsSettings';
import { GoogleDriveSettings } from './GoogleDriveSettings';
import PDFCustomizationSettings from './PDFCustomizationSettings';
import { Cloud } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('business');

  const tabs = [
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'recipes', label: 'Recipes', icon: ChefHat },
    { id: 'pdf', label: 'PDF Settings', icon: FileText },
    { id: 'subscription', label: 'Subscription', icon: Crown },
    { id: 'account', label: 'Account', icon: User },
    { id: 'backup', label: 'Backup', icon: Cloud },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data & Privacy', icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Manage your bakery business preferences</p>
      </div>

      {/* Settings Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {/* Mobile Tabs */}
        <div className="lg:hidden">
          <TabsList className="grid grid-cols-2 gap-2 h-auto">
            {tabs.slice(0, 4).map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 py-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {/* Desktop + Content */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <Card className="p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-yellow-50 text-yellow-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </Card>
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

            <TabsContent value="appearance" className="mt-0">
              <AppearanceSettings />
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <NotificationsSettings />
            </TabsContent>

            <TabsContent value="backup" className="mt-0">
              <GoogleDriveSettings />
            </TabsContent>

            <TabsContent value="pdf" className="mt-0">
              <PDFCustomizationSettings />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
