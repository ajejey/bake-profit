import React, { Suspense } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-xl sm:text-2xl">Welcome Back</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Log in to your BakeProfit account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
              </Suspense>
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="text-center text-xs sm:text-sm text-gray-600 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-rose-600 hover:text-rose-700 font-semibold">
              Sign up
            </Link>
          </p>
          <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">
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
