'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Check, Save } from 'lucide-react'

interface SignupPromptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  calculatorType: string
  calculationData?: any
  onSignupSuccess?: () => void
}

export function SignupPromptDialog({
  open,
  onOpenChange,
  calculatorType,
  calculationData,
  onSignupSuccess,
}: SignupPromptDialogProps) {
  const router = useRouter()
  const { signup, login } = useAuth()
  const { toast } = useToast()
  
  const [mode, setMode] = useState<'signup' | 'login'>('signup')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'signup') {
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: 'Passwords do not match',
            description: 'Please make sure your passwords match',
            variant: 'destructive',
          })
          setLoading(false)
          return
        }

        const result = await signup(
          formData.email,
          formData.password,
          formData.name || undefined
        )

        if (result.success) {
          toast({
            title: '✅ Account created!',
            description: 'Your calculation will be saved now.',
          })
          
          // Call success callback to save the calculation
          if (onSignupSuccess) {
            onSignupSuccess()
          }
          
          onOpenChange(false)
          
          // Redirect to my calculations after a brief delay
          setTimeout(() => {
            router.push('/tools/my-calculations')
          }, 1500)
        } else {
          toast({
            title: 'Signup failed',
            description: result.error || 'Failed to create account',
            variant: 'destructive',
          })
        }
      } else {
        // Login
        const result = await login(formData.email, formData.password)

        if (result.success) {
          toast({
            title: '✅ Welcome back!',
            description: 'Your calculation will be saved now.',
          })
          
          // Call success callback to save the calculation
          if (onSignupSuccess) {
            onSignupSuccess()
          }
          
          onOpenChange(false)
          
          // Redirect to my calculations after a brief delay
          setTimeout(() => {
            router.push('/tools/my-calculations')
          }, 1500)
        } else {
          toast({
            title: 'Login failed',
            description: result.error || 'Invalid email or password',
            variant: 'destructive',
          })
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5 text-rose-500" />
            Save Your {calculatorType}
          </DialogTitle>
          <DialogDescription>
            Create a free account to save this calculation and access it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">


          {/* Toggle between signup and login */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'signup'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setMode('signup')}
            >
              Sign Up
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'login'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setMode('login')}
            >
              Login
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name">Name (optional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Min 8 characters"
                required
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  required
                  minLength={8}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {mode === 'signup' ? 'Creating account...' : 'Logging in...'}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {mode === 'signup' ? 'Sign Up & Save' : 'Login & Save'}
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-gray-500">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
