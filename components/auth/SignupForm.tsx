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
import { Loader2, Eye, EyeOff } from 'lucide-react';

export default function SignupForm() {
  useRedirectIfAuthenticated();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    businessName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const result = await signup(
        formData.email,
        formData.password,
        formData.name || undefined,
        formData.businessName || undefined
      );

      if (result.success) {
        // Send welcome email (non-blocking)
        fetch('/api/auth/send-welcome-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: formData.email, 
            name: formData.name || 'there' 
          })
        }).catch(err => console.error('Failed to send welcome email:', err));

        toast({
          title: 'Account created!',
          description: 'Welcome to BakeProfit! Check your email for a getting started guide.',
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
          title: 'Signup failed',
          description: result.error || 'Failed to create account',
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
        <Label htmlFor="email" className="text-sm sm:text-base">Email *</Label>
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
        <Label htmlFor="name" className="text-sm sm:text-base">Your Name (Optional)</Label>
        <Input
          id="name"
          type="text"
          placeholder="Jane Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={loading}
          className="text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessName" className="text-sm sm:text-base">Business Name (Optional)</Label>
        <Input
          id="businessName"
          type="text"
          placeholder="Jane's Bakery"
          value={formData.businessName}
          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          disabled={loading}
          className="text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm sm:text-base">Password *</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={loading}
            className="text-sm sm:text-base pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500">Must be at least 8 characters</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm sm:text-base">Confirm Password *</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            disabled={loading}
            className="text-sm sm:text-base pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full text-sm sm:text-base py-2 sm:py-2.5"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </Button>

      <p className="text-xs text-center text-gray-500">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="text-rose-600 hover:text-rose-700">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-rose-600 hover:text-rose-700">
          Privacy Policy
        </Link>
      </p>

      <p className="text-center text-xs sm:text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-rose-600 hover:text-rose-700 font-semibold">
          Log in
        </Link>
      </p>
    </form>
  );
}
