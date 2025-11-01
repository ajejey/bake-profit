import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

/**
 * Hook to redirect authenticated users away from auth pages
 * Usage: Call this at the top of login, signup, forgot-password, reset-password pages
 */
export function useRedirectIfAuthenticated() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    // Don't redirect while loading
    if (loading) return

    // If user is authenticated, redirect to dashboard
    if (user) {
      router.push('/bakery-business-tool')
    }
  }, [user, loading, router])
}
