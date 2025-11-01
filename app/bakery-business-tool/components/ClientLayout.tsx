'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { BakeryDataProvider } from '../contexts/BakeryDataContext'
import { SyncIndicator } from './SyncIndicator'

/**
 * Client-side layout wrapper that provides BakeryDataContext and GoogleOAuth to all child components
 * This allows the parent layout.tsx to remain a Server Component
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BakeryDataProvider>
        <SyncIndicator />
        {children}
      </BakeryDataProvider>
    </GoogleOAuthProvider>
  )
}
