'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { SyncEngine } from '@/lib/sync/SyncEngine'

/**
 * Optimized sync hook using SyncEngine
 * 
 * Features:
 * - Event-sourcing (tracks individual operations)
 * - Bidirectional sync (push + pull)
 * - Efficient change detection
 * - Offline queue with retry
 * - Smart sync intervals
 */
export function useOptimizedSync() {
  const { token, user } = useAuth()
  const [syncStatus, setSyncStatus] = useState<{
    isSyncing: boolean;
    lastSyncAgo: number;
    pendingCount: number;
  }>({
    isSyncing: false,
    lastSyncAgo: -1,
    pendingCount: 0,
  })

  const pushIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const pullIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const statusIntervalRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Perform full bidirectional sync
   */
  const performSync = useCallback(async () => {
    if (!token || !user?.email) {
      console.log('⏸️ [useOptimizedSync] Sync skipped: No auth token or user');
      return;
    }

    console.log('🔄 [useOptimizedSync] Starting full bidirectional sync...');
    setSyncStatus(prev => ({ ...prev, isSyncing: true }));

    try {
      const result = await SyncEngine.sync(token, user.email);
      
      console.log('📊 [useOptimizedSync] Sync result:', {
        pushed: result.pushed,
        hasPulledData: !!result.pulled,
        pulledDataKeys: result.pulled ? Object.keys(result.pulled) : [],
      });
      
      // If we pulled new data, dispatch event for UI to update
      if (result.pulled) {
        console.log('📤 [useOptimizedSync] Dispatching sync:pulled event with data:', {
          recipes: result.pulled.recipes?.length || 0,
          orders: result.pulled.orders?.length || 0,
          customers: result.pulled.customers?.length || 0,
          ingredients: result.pulled.ingredients?.length || 0,
          inventory: result.pulled.inventory?.length || 0,
        });
        window.dispatchEvent(new CustomEvent('sync:pulled', { detail: result.pulled }));
        console.log('✅ [useOptimizedSync] sync:pulled event dispatched');
      } else {
        console.log('⚠️ [useOptimizedSync] No data pulled from server (result.pulled is null)');
      }
      
      if (result.pushed || result.pulled) {
        console.log('✅ [useOptimizedSync] Full sync completed successfully');
      }
    } catch (error) {
      console.error('❌ [useOptimizedSync] Sync error:', error);
    } finally {
      setSyncStatus(prev => ({ ...prev, isSyncing: false }));
      updateStatus();
    }
  }, [token, user]);

  /**
   * Push only (for immediate changes)
   */
  const pushChanges = useCallback(async () => {
    if (!token || !user?.email) return;

    setSyncStatus(prev => ({ ...prev, isSyncing: true }));

    try {
      await SyncEngine.push(token, user.email);
    } catch (error) {
      console.error('❌ Push error:', error);
    } finally {
      setSyncStatus(prev => ({ ...prev, isSyncing: false }));
      updateStatus();
    }
  }, [token, user]);

  /**
   * Pull only (for refreshing data)
   */
  const pullChanges = useCallback(async () => {
    if (!token || !user?.email) return;

    console.log('🔽 [useOptimizedSync] Starting pull-only sync...');
    setSyncStatus(prev => ({ ...prev, isSyncing: true }));

    try {
      const data = await SyncEngine.pull(token, user.email);
      if (data) {
        console.log('📤 [useOptimizedSync] Dispatching sync:pulled event (pull-only)');
        window.dispatchEvent(new CustomEvent('sync:pulled', { detail: data }));
      } else {
        console.log('⚠️ [useOptimizedSync] Pull returned no data');
      }
    } catch (error) {
      console.error('❌ [useOptimizedSync] Pull error:', error);
    } finally {
      setSyncStatus(prev => ({ ...prev, isSyncing: false }));
      updateStatus();
    }
  }, [token, user]);

  /**
   * Update sync status
   */
  const updateStatus = useCallback(() => {
    const status = SyncEngine.getStatus();
    setSyncStatus(prev => ({
      ...prev,
      lastSyncAgo: status.lastSyncAgo,
      pendingCount: status.pendingCount,
    }));
  }, []);

  /**
   * Setup sync intervals
   */
  useEffect(() => {
    if (!token || !user) {
      // Clear intervals if not authenticated
      if (pushIntervalRef.current) clearInterval(pushIntervalRef.current);
      if (pullIntervalRef.current) clearInterval(pullIntervalRef.current);
      if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);
      return;
    }

    // Initial sync on mount
    performSync();

    // Push changes every 1 minute (if there are pending operations)
    pushIntervalRef.current = setInterval(() => {
      const status = SyncEngine.getStatus();
      if (status.pendingCount > 0) {
        pushChanges();
      }
    }, 60000); // 1 minute

    // Pull changes every 5 minutes (to get updates from other devices)
    pullIntervalRef.current = setInterval(() => {
      pullChanges();
    }, 300000); // 5 minutes

    // Update status every 10 seconds
    statusIntervalRef.current = setInterval(() => {
      updateStatus();
    }, 10000);

    return () => {
      if (pushIntervalRef.current) clearInterval(pushIntervalRef.current);
      if (pullIntervalRef.current) clearInterval(pullIntervalRef.current);
      if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);
    };
  }, [token, user, performSync, pushChanges, pullChanges, updateStatus]);

  /**
   * Listen for data changes and trigger immediate push
   */
  useEffect(() => {
    const handleDataChange = () => {
      // Debounce: push after 3 seconds of no changes
      if (pushIntervalRef.current) {
        clearTimeout(pushIntervalRef.current);
      }
      
      pushIntervalRef.current = setTimeout(() => {
        pushChanges();
      }, 3000) as any;
    };

    window.addEventListener('data:changed', handleDataChange);

    return () => {
      window.removeEventListener('data:changed', handleDataChange);
    };
  }, [pushChanges]);

  return {
    syncStatus,
    performSync,
    pushChanges,
    pullChanges,
  };
}
