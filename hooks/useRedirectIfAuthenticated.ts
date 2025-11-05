import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

/**
 * Hook to redirect authenticated users away from auth pages
 * Usage: Call this at the top of login, signup, forgot-password, reset-password pages
 * 
 * Supports redirect query parameter: ?redirect=/path/to/redirect
 * Example: /login?redirect=/pricing-new
 */
export function useRedirectIfAuthenticated() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading } = useAuth()

  useEffect(() => {
    // Don't redirect while loading
    if (loading) return

    // If user is authenticated, redirect
    if (user) {
      // Check for redirect parameter
      const redirectUrl = searchParams.get('redirect')
      
      if (redirectUrl) {
        // Validate redirect URL is safe (starts with /)
        if (redirectUrl.startsWith('/')) {
          router.push(redirectUrl)
        } else {
          // Fallback to default if redirect is invalid
          router.push('/bakery-business-tool')
        }
      } else {
        // Default redirect
        router.push('/bakery-business-tool')
      }
    }
  }, [user, loading, router, searchParams])
}
