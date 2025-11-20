'use client'

import { useEffect } from 'react'
import { useOptimizedSync } from '../hooks/useOptimizedSync'
import { useAuth } from '@/contexts/AuthContext'

/**
 * DatabaseSyncManager - Manages bidirectional syncing between IndexedDB and MongoDB
 * This component should be placed high in the component tree (in ClientLayout)
 * 
 * Features:
 * - Event sourcing with SyncEngine
 * - Bidirectional sync (push local changes + pull server changes)
 * - Initial sync on login
 * - Periodic background sync
 * - Offline queue with retry
 */
export function DatabaseSyncManager() {
  const { token } = useAuth()
  useOptimizedSync() // Use optimized bidirectional sync

  // Log once when sync manager mounts with auth
  useEffect(() => {
    if (token) {
      console.log('✅ Optimized sync manager initialized')
    }
  }, [token])

  // The useOptimizedSync hook handles all the sync logic internally:
  // - Initial sync on mount (pulls server data)
  // - Push changes when data modified (3 second debounce)
  // - Periodic push (every 1 minute if pending operations)
  // - Periodic pull (every 5 minutes for cross-device sync)
  return null
}
