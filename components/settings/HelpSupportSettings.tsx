'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Book, MessageCircle, Bug, Lightbulb } from 'lucide-react';

export default function HelpSupportSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Resources
          </CardTitle>
          <CardDescription>Learn how to use BakeProfit effectively</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Book className="h-4 w-4 mr-2" />
            Getting Started Guide
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQ
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Support
          </CardTitle>
          <CardDescription>Get help or share feedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Bug className="h-4 w-4 mr-2" />
            Report a Bug
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Lightbulb className="h-4 w-4 mr-2" />
            Request a Feature
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated</span>
              <span className="font-medium">October 2024</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
