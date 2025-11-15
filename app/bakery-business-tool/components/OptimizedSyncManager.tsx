'use client'

import { useEffect } from 'react'
import { useOptimizedSync } from '../hooks/useOptimizedSync'
import { useAuth } from '@/contexts/AuthContext'
import { useBakeryData } from '../contexts/BakeryDataContext'

/**
 * OptimizedSyncManager - Manages bidirectional sync with MongoDB
 * 
 * Features:
 * - Event-sourcing (tracks individual operations)
 * - Bidirectional sync (push + pull)
 * - Efficient change detection
 * - Offline queue with retry
 * - Cross-device sync
 */
export function OptimizedSyncManager() {
  const { token } = useAuth()
  const { syncStatus } = useOptimizedSync()
  const { 
    setRecipes, 
    setOrders, 
    setCustomers, 
    setIngredients, 
    setInventory 
  } = useBakeryData() as any // Type assertion needed for setters

  // Listen for pulled data and update local state
  useEffect(() => {
    const handlePulledData = (event: CustomEvent) => {
      const data = event.detail
      
      console.log('📥 Applying pulled data to local state')

      // Update local state with server data
      if (data.recipes) {
        setRecipes(data.recipes)
      }
      if (data.orders) {
        setOrders(data.orders)
      }
      if (data.customers) {
        setCustomers(data.customers)
      }
      if (data.ingredients) {
        setIngredients(data.ingredients)
      }
      if (data.inventory) {
        setInventory(data.inventory)
      }
    }

    window.addEventListener('sync:pulled', handlePulledData as EventListener)

    return () => {
      window.removeEventListener('sync:pulled', handlePulledData as EventListener)
    }
  }, [setRecipes, setOrders, setCustomers, setIngredients, setInventory])

  // Log sync status for debugging
  useEffect(() => {
    if (token) {
      console.log('✅ Optimized sync manager initialized', {
        isSyncing: syncStatus.isSyncing,
        pendingCount: syncStatus.pendingCount,
        lastSyncAgo: syncStatus.lastSyncAgo,
      })
    }
  }, [token, syncStatus])

  // The useOptimizedSync hook handles all the sync logic internally
  // This component just ensures it's mounted and handles pulled data
  return null
}
