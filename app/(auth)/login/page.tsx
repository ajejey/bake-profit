import React from 'react';
import Link from 'next/link';
import { ChefHat } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 p-4">
      <Header />
      <div className="w-full flex items-center justify-center min-h-screen">
        <div>
        {/* Logo */}
        {/* <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <ChefHat className="h-10 w-10 text-rose-500" />
          <span className="text-2xl font-bold text-gray-900">BakeProfit</span>
        </Link> */}

        {/* Login Card */}
        <Card className="w-full min-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Log in to your BakeProfit account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-rose-600 hover:text-rose-700 font-semibold">
            Sign up
          </Link>
        </p>
        <p className="text-center text-sm text-gray-600 mt-6">
          <Link href="/" className="hover:text-rose-600">
            ← Back to home
          </Link>
        </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
