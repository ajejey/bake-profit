'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRedirectIfAuthenticated } from '@/hooks/useRedirectIfAuthenticated';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
  useRedirectIfAuthenticated();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        
        // Check for redirect parameter
        const redirectUrl = searchParams.get('redirect');
        if (redirectUrl && redirectUrl.startsWith('/')) {
          router.push(redirectUrl);
        } else {
          router.push('/bakery-business-tool');
        }
      } else {
        toast({
          title: 'Login failed',
          description: result.error || 'Invalid email or password',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={loading}
          className="text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          disabled={loading}
          className="text-sm sm:text-base"
        />
      </div>

      <Button
        type="submit"
        className="w-full text-sm sm:text-base py-2 sm:py-2.5"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          'Log In'
        )}
      </Button>
      <Link
        href="/forgot-password"
        className="text-xs sm:text-sm text-rose-600 hover:text-rose-700 flex items-center justify-center" 
      >
        Forgot password?
      </Link>
      <p className="text-center text-xs sm:text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-rose-600 hover:text-rose-700 font-semibold">
          Sign up
        </Link>
      </p>
    </form>
  );
}
