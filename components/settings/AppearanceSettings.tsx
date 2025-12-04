'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Palette } from 'lucide-react';
import { getAppearanceSettings } from '@/app/bakery-business-tool/utils/settings';
import { useSyncedSettings } from '@/app/bakery-business-tool/hooks';

export default function AppearanceSettings() {
  const { toast } = useToast();
  const { setAppearanceSettings } = useSyncedSettings();
  const [theme, setTheme] = useState('light');
  const [displayDensity, setDisplayDensity] = useState('comfortable');

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getAppearanceSettings();
        setTheme(settings.theme);
        setDisplayDensity(settings.displayDensity);
      } catch (error) {
        console.error('Error loading appearance settings:', error);
      }
    };

    loadSettings();

    // Listen for sync updates
    const handleDataChanged = () => {
      loadSettings();
    };

    window.addEventListener('data:changed', handleDataChanged);
    return () => window.removeEventListener('data:changed', handleDataChanged);
  }, []);

  const handleSave = async () => {
    try {
      await setAppearanceSettings({
        theme: theme as 'light' | 'dark' | 'auto',
        displayDensity: displayDensity as 'compact' | 'comfortable' | 'spacious'
      });
      toast({ title: 'Settings saved', description: 'Appearance preferences updated.' });
    } catch {
      toast({ title: 'Error', description: 'Failed to save settings.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-2">
        <Button onClick={handleSave} size="lg" variant="default">Save Changes</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel of the app</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light Mode</SelectItem>
                <SelectItem value="dark">Dark Mode</SelectItem>
                <SelectItem value="auto">Auto (System)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="density">Display Density</Label>
            <Select value={displayDensity} onValueChange={setDisplayDensity}>
              <SelectTrigger id="density">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="comfortable">Comfortable</SelectItem>
                <SelectItem value="spacious">Spacious</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">Save Changes</Button>
      </div>
    </div>
  );
}
