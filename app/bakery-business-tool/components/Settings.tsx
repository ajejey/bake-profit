'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User,
  Crown,
  Briefcase,
  ShoppingCart,
  ChefHat,
  Database,
  Palette,
  Bell,
  FileText,
  Calendar as CalendarIcon
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
import CalendarSettings from '@/components/settings/CalendarSettings';
import { Cloud } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('business');

  const tabs = [
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'recipes', label: 'Recipes', icon: ChefHat },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
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
        {/* Unified Tabs Row (mobile + desktop) */}
        <div className="border-b border-gray-200 pb-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <TabsList className="inline-flex w-auto min-w-max gap-2 bg-transparent p-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex shrink-0 items-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors data-[state=active]:bg-white data-[state=active]:shadow-sm border data-[state=active]:border-gray-200 bg-gray-100/70 hover:bg-gray-100 text-gray-700"
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

          <TabsContent value="pdf" className="mt-0">
            <PDFCustomizationSettings />
          </TabsContent>

          <TabsContent value="calendar" className="mt-0">
            <CalendarSettings />
          </TabsContent>

          <TabsContent value="subscription" className="mt-0">
            <SubscriptionSettings />
          </TabsContent>

          <TabsContent value="account" className="mt-0">
            <AccountSettings />
          </TabsContent>

          <TabsContent value="backup" className="mt-0">
            <GoogleDriveSettings />
          </TabsContent>

          <TabsContent value="appearance" className="mt-0">
            <AppearanceSettings />
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <NotificationsSettings />
          </TabsContent>

          <TabsContent value="data" className="mt-0">
            <DataPrivacySettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
