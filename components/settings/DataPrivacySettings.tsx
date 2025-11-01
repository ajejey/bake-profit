'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Database, Download, Upload, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { StorageAdapter } from '@/app/bakery-business-tool/utils/indexedDBAdapter';

export default function DataPrivacySettings() {
  const { toast } = useToast();

  const handleExport = async() => {
    try {
      const data = {
        ingredients: JSON.parse(await StorageAdapter.getItem('bakery-ingredients') || '[]'),
        recipes: JSON.parse(await StorageAdapter.getItem('bakery-recipes') || '[]'),
        orders: JSON.parse(await StorageAdapter.getItem('bakery-orders') || '[]'),
        inventory: JSON.parse(await StorageAdapter.getItem('bakery-inventory') || '[]'),
        customers: JSON.parse(await StorageAdapter.getItem('bakery-customers') || '[]'),
        settings: {
          business: JSON.parse(await StorageAdapter.getItem('businessSettings') || '{}'),
          orders: JSON.parse(await StorageAdapter.getItem('orderSettings') || '{}'),
          recipes: JSON.parse(await StorageAdapter.getItem('recipeSettings') || '{}'),
          appearance: JSON.parse(await StorageAdapter.getItem('appearanceSettings') || '{}'),
          notifications: JSON.parse(await StorageAdapter.getItem('notificationSettings') || '{}'),
        }
      };

      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `bakery-data-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({ 
        title: 'Export successful', 
        description: 'Your data has been downloaded.' 
      });
    } catch (error) {
      toast({ 
        title: 'Export failed', 
        description: 'There was an error exporting your data.',
        variant: 'destructive'
      });
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        // Import data
        if (data.ingredients) await StorageAdapter.setItem('bakery-ingredients', JSON.stringify(data.ingredients));
        if (data.recipes) await StorageAdapter.setItem('bakery-recipes', JSON.stringify(data.recipes));
        if (data.orders) await StorageAdapter.setItem('bakery-orders', JSON.stringify(data.orders));
        if (data.inventory) await StorageAdapter.setItem('bakery-inventory', JSON.stringify(data.inventory));
        if (data.customers) await StorageAdapter.setItem('bakery-customers', JSON.stringify(data.customers));
        
        // Import settings
        if (data.settings?.business) await StorageAdapter.setItem('businessSettings', JSON.stringify(data.settings.business));
        if (data.settings?.orders) await StorageAdapter.setItem('orderSettings', JSON.stringify(data.settings.orders));
        if (data.settings?.recipes) await StorageAdapter.setItem('recipeSettings', JSON.stringify(data.settings.recipes));
        if (data.settings?.appearance) await StorageAdapter.setItem('appearanceSettings', JSON.stringify(data.settings.appearance));
        if (data.settings?.notifications) await StorageAdapter.setItem('notificationSettings', JSON.stringify(data.settings.notifications));
        
        toast({ 
          title: 'Import successful', 
          description: 'Your data has been imported. Please refresh the page.' 
        });
        
        // Refresh after 2 seconds
        setTimeout(() => window.location.reload(), 2000);
      } catch (error) {
        toast({ 
          title: 'Import failed', 
          description: 'Invalid file format.',
          variant: 'destructive'
        });
      }
    };
    reader.readAsText(file);
  };

  const handleClearAllData = async () => {
    // Clear all bakery data
    await StorageAdapter.removeItem('bakery-ingredients');
    await StorageAdapter.removeItem('bakery-recipes');
    await StorageAdapter.removeItem('bakery-orders');
    await StorageAdapter.removeItem('bakery-inventory');
    await StorageAdapter.removeItem('bakery-customers');
    await StorageAdapter.removeItem('bakery-recipe-categories');
    
    toast({ 
      title: 'Data cleared', 
      description: 'All your data has been deleted. Refreshing...' 
    });
    
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>Export or import your business data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Export All Data</h4>
              <p className="text-sm text-gray-500">Download all your recipes, orders, and customers as JSON</p>
            </div>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Import Data</h4>
              <p className="text-sm text-gray-500">Import data from a previous export</p>
            </div>
            <div>
              <input
                id="import-file"
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImport}
              />
              <Button variant="outline" onClick={() => document.getElementById('import-file')?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions - use with caution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h4 className="font-medium text-red-900">Clear All Data</h4>
              <p className="text-sm text-red-700">Permanently delete all recipes, orders, customers, and inventory</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your bakery data including recipes, orders, customers, and inventory. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAllData} className="bg-red-600 hover:bg-red-700">
                    Yes, Delete Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
