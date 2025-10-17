import React from 'react';
import Link from 'next/link';
import { ChefHat } from 'lucide-react';
import SignupForm from '@/components/auth/SignupForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-orange-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <ChefHat className="h-10 w-10 text-rose-500" />
          <span className="text-2xl font-bold text-gray-900">BakeProfit</span>
        </Link>

        {/* Signup Card */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>
              Start managing your bakery business for free
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          <Link href="/" className="hover:text-rose-600">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
