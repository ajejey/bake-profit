'use client'

import { useEffect } from 'react'
import { useDatabaseSync } from '../hooks/useDatabaseSync'
import { useAuth } from '@/contexts/AuthContext'

/**
 * DatabaseSyncManager - Manages syncing of IndexedDB data to MongoDB
 * This component should be placed high in the component tree (in ClientLayout)
 * It runs the sync hook and handles the sync lifecycle
 */
export function DatabaseSyncManager() {
  const { token } = useAuth()
  useDatabaseSync() // Hook runs automatically, no need to use return value

  // Log sync status for debugging
  useEffect(() => {
    if (token) {
      console.log('✅ Database sync manager initialized')
    }
  }, [token])

  // The useDatabaseSync hook handles all the sync logic internally
  // This component just ensures it's mounted and active
  return null
}
