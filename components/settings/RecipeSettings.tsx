'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ChefHat } from 'lucide-react';
import { StorageAdapter } from '@/app/bakery-business-tool/utils/indexedDBAdapter';

export default function RecipeSettings() {
  const { toast } = useToast();
  const [defaultServings, setDefaultServings] = useState('12');
  const [laborCostPerHour, setLaborCostPerHour] = useState('15');
  const [overheadPercentage, setOverheadPercentage] = useState('10');
  const [showCostBreakdown, setShowCostBreakdown] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await StorageAdapter.getItem('recipeSettings');
        if (stored) {
          const settings = JSON.parse(stored);
          console.log('Recipe settings loaded:', settings);
          setDefaultServings(settings.defaultServings);
          setLaborCostPerHour(settings.laborCostPerHour);
          setOverheadPercentage(settings.overheadPercentage);
          setShowCostBreakdown(settings.showCostBreakdown);
        }
      } catch (error) {
        console.error('Error loading recipe settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    await StorageAdapter.setItem('recipeSettings', JSON.stringify({
      defaultServings,
      laborCostPerHour,
      overheadPercentage,
      showCostBreakdown,
    }));
    toast({ title: 'Settings saved', description: 'Recipe preferences updated.' });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-2">
        <Button onClick={handleSave} size="lg" variant="default">Save Changes</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5" />
            Recipe Defaults
          </CardTitle>
          <CardDescription>Configure default recipe settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultServings">Default Servings</Label>
              <Input id="defaultServings" type="number" value={defaultServings} onChange={(e) => setDefaultServings(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="laborCost">Labor Cost per Hour ($)</Label>
              <Input id="laborCost" type="number" value={laborCostPerHour} onChange={(e) => setLaborCostPerHour(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overhead">Overhead Percentage (%)</Label>
              <Input id="overhead" type="number" value={overheadPercentage} onChange={(e) => setOverheadPercentage(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label>Show Cost Breakdown</Label>
              <p className="text-xs text-gray-500">Display detailed cost breakdown in recipes</p>
            </div>
            <Switch checked={showCostBreakdown} onCheckedChange={setShowCostBreakdown} />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">Save Changes</Button>
      </div>
    </div>
  );
}
