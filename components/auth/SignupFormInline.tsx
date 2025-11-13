'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

interface SignupFormInlineProps {
  onSuccess?: () => void
  redirectTo?: string
  showLinks?: boolean
}

export function SignupFormInline({ 
  onSuccess, 
  redirectTo,
  showLinks = true 
}: SignupFormInlineProps) {
  const { signup } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    businessName: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)

    try {
      const result = await signup(
        formData.email,
        formData.password,
        formData.name || undefined,
        formData.businessName || undefined
      )

      if (result.success) {
        // Send welcome email (non-blocking)
        fetch('/api/auth/send-welcome-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: formData.email, 
            name: formData.name || 'there' 
          })
        }).catch(err => console.error('Failed to send welcome email:', err))

        toast({
          title: '✅ Account created!',
          description: 'Your calculation will be saved now.',
        })
        
        // Call success callback
        if (onSuccess) {
          onSuccess()
        }
      } else {
        toast({
          title: 'Signup failed',
          description: result.error || 'Failed to create account',
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email *</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-name">Your Name (Optional)</Label>
        <Input
          id="signup-name"
          type="text"
          placeholder="Jane Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-businessName">Business Name (Optional)</Label>
        <Input
          id="signup-businessName"
          type="text"
          placeholder="Jane's Bakery"
          value={formData.businessName}
          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">Password *</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          disabled={loading}
          minLength={8}
        />
        <p className="text-xs text-gray-500">Must be at least 8 characters</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-confirmPassword">Confirm Password *</Label>
        <Input
          id="signup-confirmPassword"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
          disabled={loading}
          minLength={8}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-rose-500 hover:bg-rose-600"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          'Sign Up & Save'
        )}
      </Button>

      {showLinks && (
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
      )}
    </form>
  )
}
