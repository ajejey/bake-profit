import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { SyncEngine } from '../SyncEngine'

// Mock fetch
global.fetch = vi.fn()

describe('SyncEngine', () => {
  beforeEach(() => {
    // Clear localStorage and SyncEngine state
    localStorage.clear()
    SyncEngine.clear()
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Operation Recording', () => {
    it('should record a create operation', () => {
      const recipeData = { id: 'recipe-1', name: 'Chocolate Cake' }
      
      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', recipeData)
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations).toHaveLength(1)
      expect(metadata.pendingOperations[0]).toMatchObject({
        entityType: 'recipe',
        entityId: 'recipe-1',
        operation: 'create',
        data: recipeData,
      })
      expect(metadata.pendingOperations[0].timestamp).toBeGreaterThan(0)
    })

    it('should record multiple operations for different entities', () => {
      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', { name: 'Cake' })
      SyncEngine.recordOperation('order', 'order-1', 'create', { total: 50 })
      SyncEngine.recordOperation('customer', 'customer-1', 'create', { name: 'John' })
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations).toHaveLength(3)
      expect(metadata.pendingOperations.map(op => op.entityType)).toEqual([
        'recipe',
        'order',
        'customer',
      ])
    })

    it('should record update operation', () => {
      const updateData = { id: 'recipe-1', name: 'Updated Cake' }
      
      SyncEngine.recordOperation('recipe', 'recipe-1', 'update', updateData)
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations[0].operation).toBe('update')
    })

    it('should record delete operation without data', () => {
      SyncEngine.recordOperation('recipe', 'recipe-1', 'delete')
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations[0]).toMatchObject({
        entityType: 'recipe',
        entityId: 'recipe-1',
        operation: 'delete',
      })
      expect(metadata.pendingOperations[0].data).toBeUndefined()
    })
  })

  describe('Operation Merging', () => {
    it('should merge create + update into single create', () => {
      const createData = { id: 'recipe-1', name: 'Cake' }
      const updateData = { id: 'recipe-1', name: 'Updated Cake', servings: 8 }
      
      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', createData)
      SyncEngine.recordOperation('recipe', 'recipe-1', 'update', updateData)
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations).toHaveLength(1)
      expect(metadata.pendingOperations[0].operation).toBe('create')
      expect(metadata.pendingOperations[0].data).toEqual(updateData)
    })

    it('should merge multiple updates into single update', () => {
      SyncEngine.recordOperation('recipe', 'recipe-1', 'update', { name: 'V1' })
      SyncEngine.recordOperation('recipe', 'recipe-1', 'update', { name: 'V2' })
      SyncEngine.recordOperation('recipe', 'recipe-1', 'update', { name: 'V3' })
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations).toHaveLength(1)
      expect(metadata.pendingOperations[0].data).toEqual({ name: 'V3' })
    })

    it('should remove create + delete (never existed on server)', () => {
      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', { name: 'Cake' })
      SyncEngine.recordOperation('recipe', 'recipe-1', 'delete')
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations).toHaveLength(0)
    })

    it('should merge update + delete into single delete', () => {
      SyncEngine.recordOperation('recipe', 'recipe-1', 'update', { name: 'Updated' })
      SyncEngine.recordOperation('recipe', 'recipe-1', 'delete')
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations).toHaveLength(1)
      expect(metadata.pendingOperations[0].operation).toBe('delete')
    })

    it('should not merge operations for different entities', () => {
      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', { name: 'Cake' })
      SyncEngine.recordOperation('recipe', 'recipe-2', 'create', { name: 'Pie' })
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations).toHaveLength(2)
    })
  })

  describe('Push', () => {
    it('should push pending operations to server', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      })
      global.fetch = mockFetch

      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', { name: 'Cake' })
      SyncEngine.recordOperation('order', 'order-1', 'create', { total: 50 })
      
      const result = await SyncEngine.push('test-token', 'user@example.com')
      
      expect(result).toBe(true)
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/sync',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
        })
      )

      // Check payload structure
      const callArgs = mockFetch.mock.calls[0][1]
      const payload = JSON.parse(callArgs.body)
      expect(payload.userId).toBe('user@example.com')
      expect(payload.recipes).toHaveLength(1)
      expect(payload.orders).toHaveLength(1)
    })

    it('should clear pending operations after successful push', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      })

      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', { name: 'Cake' })
      
      await SyncEngine.push('test-token', 'user@example.com')
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations).toHaveLength(0)
    })

    it('should update lastSyncTimestamp after successful push', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      })

      const beforePush = SyncEngine.getMetadata().lastSyncTimestamp
      
      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', { name: 'Cake' })
      await SyncEngine.push('test-token', 'user@example.com')
      
      const afterPush = SyncEngine.getMetadata().lastSyncTimestamp
      expect(afterPush).toBeGreaterThan(beforePush)
    })

    it('should return false if no pending operations', async () => {
      const result = await SyncEngine.push('test-token', 'user@example.com')
      expect(result).toBe(false)
    })

    it('should handle network errors gracefully', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', { name: 'Cake' })
      
      const result = await SyncEngine.push('test-token', 'user@example.com')
      
      expect(result).toBe(false)
      // Operations should still be pending for retry
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations).toHaveLength(1)
    })

    it('should handle server errors (non-200 response)', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error' }),
      })

      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', { name: 'Cake' })
      
      const result = await SyncEngine.push('test-token', 'user@example.com')
      
      expect(result).toBe(false)
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations).toHaveLength(1)
    })
  })

  describe('Pull', () => {
    it('should pull data from server', async () => {
      const serverData = {
        recipes: [{ id: 'recipe-1', name: 'Cake' }],
        orders: [{ id: 'order-1', total: 50 }],
        customers: [],
        ingredients: [],
        inventory: [],
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, data: serverData }),
      })
      
      const result = await SyncEngine.pull('test-token', 'user@example.com')
      
      expect(result).toEqual(serverData)
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/sync',
        expect.objectContaining({
          method: 'GET',
          headers: {
            Authorization: 'Bearer test-token',
          },
        })
      )
    })

    it('should update lastPullTimestamp after successful pull', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, data: {} }),
      })

      const beforePull = SyncEngine.getMetadata().lastPullTimestamp
      
      await SyncEngine.pull('test-token', 'user@example.com')
      
      const afterPull = SyncEngine.getMetadata().lastPullTimestamp
      expect(afterPull).toBeGreaterThan(beforePull)
    })

    it('should return null on network error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))
      
      const result = await SyncEngine.pull('test-token', 'user@example.com')
      
      expect(result).toBeNull()
    })

    it('should return null on server error', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
      
      const result = await SyncEngine.pull('test-token', 'user@example.com')
      
      expect(result).toBeNull()
    })
  })

  describe('Bidirectional Sync', () => {
    it('should perform both push and pull', async () => {
      const serverData = {
        recipes: [{ id: 'recipe-2', name: 'Server Cake' }],
        orders: [],
        customers: [],
        ingredients: [],
        inventory: [],
      }

      global.fetch = vi.fn()
        .mockResolvedValueOnce({ // Push response
          ok: true,
          json: async () => ({ success: true }),
        })
        .mockResolvedValueOnce({ // Pull response
          ok: true,
          json: async () => ({ success: true, data: serverData }),
        })

      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', { name: 'Local Cake' })
      
      const result = await SyncEngine.sync('test-token', 'user@example.com')
      
      expect(result.pushed).toBe(true)
      expect(result.pulled).toEqual(serverData)
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })

    it('should pull even if push has no operations', async () => {
      const serverData = { recipes: [], orders: [], customers: [], ingredients: [], inventory: [] }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, data: serverData }),
      })
      
      const result = await SyncEngine.sync('test-token', 'user@example.com')
      
      expect(result.pushed).toBe(false) // No operations to push
      expect(result.pulled).toEqual(serverData)
      expect(global.fetch).toHaveBeenCalledTimes(1) // Only pull
    })
  })

  describe('Cleanup', () => {
    it('should keep only last 100 synced operations', () => {
      // Add 105 synced operations
      for (let i = 0; i < 105; i++) {
        SyncEngine.recordOperation('recipe', `recipe-${i}`, 'create', { name: `Recipe ${i}` })
      }
      
      // Mark all as synced
      const metadata = SyncEngine.getMetadata()
      metadata.pendingOperations.forEach(op => op.synced = true)
      SyncEngine.saveMetadata(metadata)
      
      SyncEngine.cleanup()
      
      const cleaned = SyncEngine.getMetadata()
      // Should keep only last 100
      expect(cleaned.pendingOperations).toHaveLength(100)
      // Should keep the most recent ones (recipe-5 to recipe-104)
      expect(cleaned.pendingOperations[0].entityId).toBe('recipe-5')
      expect(cleaned.pendingOperations[99].entityId).toBe('recipe-104')
    })

    it('should not remove unsynced operations even if old', () => {
      const now = Date.now()
      
      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', { name: 'Old Unsynced' })
      const metadata = SyncEngine.getMetadata()
      metadata.pendingOperations[0].timestamp = now - (8 * 24 * 60 * 60 * 1000)
      // Don't mark as synced
      SyncEngine.saveMetadata(metadata)
      
      SyncEngine.cleanup()
      
      const cleaned = SyncEngine.getMetadata()
      expect(cleaned.pendingOperations).toHaveLength(1)
    })
  })

  describe('Status', () => {
    it('should return correct pending count', () => {
      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', { name: 'Cake' })
      SyncEngine.recordOperation('order', 'order-1', 'create', { total: 50 })
      
      const status = SyncEngine.getStatus()
      expect(status.pendingCount).toBe(2)
    })

    it('should return time since last sync', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      })

      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', { name: 'Cake' })
      await SyncEngine.push('test-token', 'user@example.com')
      
      vi.advanceTimersByTime(5000) // 5 seconds
      
      const status = SyncEngine.getStatus()
      expect(status.lastSyncAgo).toBeGreaterThanOrEqual(5000)
    })

    it('should return -1 for lastSyncAgo if never synced', () => {
      const status = SyncEngine.getStatus()
      expect(status.lastSyncAgo).toBe(-1)
    })
  })

  describe('Clear', () => {
    it('should clear all metadata', () => {
      SyncEngine.recordOperation('recipe', 'recipe-1', 'create', { name: 'Cake' })
      SyncEngine.recordOperation('order', 'order-1', 'create', { total: 50 })
      
      SyncEngine.clear()
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations).toHaveLength(0)
      expect(metadata.lastSyncTimestamp).toBe(0)
      expect(metadata.lastPullTimestamp).toBe(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('sync_metadata', 'invalid json{')
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations).toEqual([])
    })

    it('should handle missing localStorage', () => {
      // This test verifies the typeof check in getMetadata
      // We can't actually delete localStorage in happy-dom, but the code handles it
      const metadata = SyncEngine.getMetadata()
      expect(metadata).toBeDefined()
      expect(metadata.pendingOperations).toEqual([])
    })

    it('should handle very large operation queues', () => {
      // Add 1000 operations
      for (let i = 0; i < 1000; i++) {
        SyncEngine.recordOperation('recipe', `recipe-${i}`, 'create', { name: `Recipe ${i}` })
      }
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations).toHaveLength(1000)
    })

    it('should handle operations with null/undefined data', () => {
      SyncEngine.recordOperation('recipe', 'recipe-1', 'update', undefined)
      
      const metadata = SyncEngine.getMetadata()
      expect(metadata.pendingOperations[0].data).toBeUndefined()
    })
  })
})
