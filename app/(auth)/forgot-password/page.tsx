'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useRedirectIfAuthenticated } from '@/hooks/useRedirectIfAuthenticated'
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react'
import { Header } from '@/components/layout/Header'

export default function ForgotPasswordPage() {
  useRedirectIfAuthenticated()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        toast({
          title: 'Check your email',
          description: 'If an account exists with this email, a password reset link has been sent.',
        })
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to send reset email',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
            <p className="text-gray-600 mb-6">
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-blue-900">
                <strong>📧 Didn&apos;t receive the email?</strong>
              </p>
              <ul className="text-sm text-blue-800 mt-2 space-y-1 ml-4">
                <li>• Check your <b className="font-bold text-rose-600">spam or junk folder</b></li>
                <li>• Make sure you entered the correct email</li>
                <li>• The link expires in 1 hour</li>
              </ul>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              The password reset link will expire in 1 hour for security reasons.
            </p>

            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="w-full mb-3"
            >
              Try Another Email
            </Button>

            <Link href="/login">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
      <Header />
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
            <p className="text-gray-600 mt-2">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="h-10"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full h-10 bg-rose-500 hover:bg-rose-600 text-white font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link href="/login" className="text-rose-600 hover:text-rose-700 font-semibold">
                Back to Login
              </Link>
            </p>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-rose-50 border border-rose-200 rounded-lg p-4">
            <p className="text-sm text-rose-900">
              <strong>🔒 Security Note:</strong> The password reset link will expire in 1 hour for your security.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
