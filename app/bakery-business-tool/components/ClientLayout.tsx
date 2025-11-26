'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { BakeryDataProvider } from '../contexts/BakeryDataContext'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { SyncIndicator } from './SyncIndicator'
import { DatabaseSyncManager } from './DatabaseSyncManager'

/**
 * Client-side layout wrapper that provides BakeryDataContext and GoogleOAuth to all child components
 * This allows the parent layout.tsx to remain a Server Component
 * 
 * Includes:
 * - GoogleOAuthProvider: For Google Drive sync
 * - BakeryDataProvider: For IndexedDB data management
 * - NotificationProvider: For order notifications
 * - DatabaseSyncManager: For MongoDB sync
 * - SyncIndicator: For showing sync status
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <NotificationProvider>
        <BakeryDataProvider>
          <DatabaseSyncManager />
          <SyncIndicator />
          {children}
        </BakeryDataProvider>
      </NotificationProvider>
    </GoogleOAuthProvider>
  )
}
