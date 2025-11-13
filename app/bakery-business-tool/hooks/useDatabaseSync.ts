'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useBakeryData } from '../contexts/BakeryDataContext'
import { useAuth } from '@/contexts/AuthContext'
import type { Recipe, Order, Customer, Ingredient, InventoryItem } from '../types'

/**
 * Track changes made to data for syncing to MongoDB
 */
interface ChangeTracker {
  recipes: Array<{ action: 'create' | 'update' | 'delete'; id: string; data?: Recipe }>;
  orders: Array<{ action: 'create' | 'update' | 'delete'; id: string; data?: Order }>;
  customers: Array<{ action: 'create' | 'update' | 'delete'; id: string; data?: Customer }>;
  ingredients: Array<{ action: 'create' | 'update' | 'delete'; id: string; data?: Ingredient }>;
  inventory: Array<{ action: 'create' | 'update' | 'delete'; id: string; data?: InventoryItem }>;
}

const SYNC_INTERVAL = 30000; // Sync every 30 seconds
const DEBOUNCE_DELAY = 5000; // Debounce changes for 5 seconds

/**
 * Hook to sync frontend data to MongoDB
 * Tracks changes and sends them to backend periodically
 */
export function useDatabaseSync() {
  const { recipes, orders, customers, ingredients, inventory } = useBakeryData()
  const { token } = useAuth()
  const changesRef = useRef<ChangeTracker>({
    recipes: [],
    orders: [],
    customers: [],
    ingredients: [],
    inventory: [],
  })
  const lastSyncRef = useRef<Record<string, string>>({})
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const syncInProgressRef = useRef(false)
  const isInitializedRef = useRef(false)

  /**
   * Serialize data for comparison
   */
  const serializeData = useCallback((data: any): string => {
    return JSON.stringify(data)
  }, [])

  /**
   * Initialize sync on first load - sync all existing data
   */
  useEffect(() => {
    if (!isInitializedRef.current && (recipes.length > 0 || orders.length > 0 || customers.length > 0 || ingredients.length > 0 || inventory.length > 0)) {
      // Mark all existing data as "create" actions on first load
      changesRef.current.recipes = recipes.map(recipe => ({
        action: 'create' as const,
        id: recipe.id,
        data: recipe,
      }))
      changesRef.current.orders = orders.map(order => ({
        action: 'create' as const,
        id: order.id,
        data: order,
      }))
      changesRef.current.customers = customers.map(customer => ({
        action: 'create' as const,
        id: customer.id,
        data: customer,
      }))
      changesRef.current.ingredients = ingredients.map(ingredient => ({
        action: 'create' as const,
        id: ingredient.id,
        data: ingredient,
      }))
      changesRef.current.inventory = inventory.map(item => ({
        action: 'create' as const,
        id: item.ingredientId,
        data: item,
      }))

      // Update last sync state
      lastSyncRef.current['recipes'] = serializeData(recipes)
      lastSyncRef.current['orders'] = serializeData(orders)
      lastSyncRef.current['customers'] = serializeData(customers)
      lastSyncRef.current['ingredients'] = serializeData(ingredients)
      lastSyncRef.current['inventory'] = serializeData(inventory)

      isInitializedRef.current = true
      console.log('📦 Initial sync detected:', {
        recipes: recipes.length,
        orders: orders.length,
        customers: customers.length,
        ingredients: ingredients.length,
        inventory: inventory.length,
      })
    }
  }, [recipes, orders, customers, ingredients, inventory, serializeData])

  /**
   * Track changes in recipes (after initialization)
   */
  useEffect(() => {
    if (!isInitializedRef.current) return

    const currentSerialized = serializeData(recipes)
    const lastSerialized = lastSyncRef.current['recipes']

    if (currentSerialized !== lastSerialized) {
      // Track as updates after initialization
      changesRef.current.recipes = recipes.map(recipe => ({
        action: 'update' as const,
        id: recipe.id,
        data: recipe,
      }))
      lastSyncRef.current['recipes'] = currentSerialized
    }
  }, [recipes, serializeData])

  /**
   * Track changes in orders (after initialization)
   */
  useEffect(() => {
    if (!isInitializedRef.current) return

    const currentSerialized = serializeData(orders)
    const lastSerialized = lastSyncRef.current['orders']

    if (currentSerialized !== lastSerialized) {
      changesRef.current.orders = orders.map(order => ({
        action: 'update' as const,
        id: order.id,
        data: order,
      }))
      lastSyncRef.current['orders'] = currentSerialized
    }
  }, [orders, serializeData])

  /**
   * Track changes in customers (after initialization)
   */
  useEffect(() => {
    if (!isInitializedRef.current) return

    const currentSerialized = serializeData(customers)
    const lastSerialized = lastSyncRef.current['customers']

    if (currentSerialized !== lastSerialized) {
      changesRef.current.customers = customers.map(customer => ({
        action: 'update' as const,
        id: customer.id,
        data: customer,
      }))
      lastSyncRef.current['customers'] = currentSerialized
    }
  }, [customers, serializeData])

  /**
   * Track changes in ingredients (after initialization)
   */
  useEffect(() => {
    if (!isInitializedRef.current) return

    const currentSerialized = serializeData(ingredients)
    const lastSerialized = lastSyncRef.current['ingredients']

    if (currentSerialized !== lastSerialized) {
      changesRef.current.ingredients = ingredients.map(ingredient => ({
        action: 'update' as const,
        id: ingredient.id,
        data: ingredient,
      }))
      lastSyncRef.current['ingredients'] = currentSerialized
    }
  }, [ingredients, serializeData])

  /**
   * Track changes in inventory (after initialization)
   */
  useEffect(() => {
    if (!isInitializedRef.current) return

    const currentSerialized = serializeData(inventory)
    const lastSerialized = lastSyncRef.current['inventory']

    if (currentSerialized !== lastSerialized) {
      changesRef.current.inventory = inventory.map(item => ({
        action: 'update' as const,
        id: item.ingredientId,
        data: item,
      }))
      lastSyncRef.current['inventory'] = currentSerialized
    }
  }, [inventory, serializeData])

  /**
   * Send changes to backend
   */
  const syncToDatabase = useCallback(async () => {
    if (!token || syncInProgressRef.current) {
      return
    }

    // Check if there are any changes to sync
    const hasChanges =
      changesRef.current.recipes.length > 0 ||
      changesRef.current.orders.length > 0 ||
      changesRef.current.customers.length > 0 ||
      changesRef.current.ingredients.length > 0 ||
      changesRef.current.inventory.length > 0

    if (!hasChanges) {
      console.log('📭 No changes to sync')
      return
    }

    console.log('📤 Syncing changes:', {
      recipes: changesRef.current.recipes.length,
      orders: changesRef.current.orders.length,
      customers: changesRef.current.customers.length,
      ingredients: changesRef.current.ingredients.length,
      inventory: changesRef.current.inventory.length,
    })

    syncInProgressRef.current = true

    try {
      // Get user email from stored auth data
      const storedUser = localStorage.getItem('auth_user')
      const userEmail = storedUser ? JSON.parse(storedUser).email : null

      if (!userEmail) {
        console.error('User email not found in localStorage')
        return
      }

      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userEmail,
          timestamp: new Date().toISOString(),
          recipes: changesRef.current.recipes,
          orders: changesRef.current.orders,
          customers: changesRef.current.customers,
          ingredients: changesRef.current.ingredients,
          inventory: changesRef.current.inventory,
        }),
      })

      if (!response.ok) {
        console.error('Sync failed:', response.statusText)
        return
      }

      const data = await response.json()
      console.log('✅ Database sync successful:', data)

      // Clear changes after successful sync
      changesRef.current = {
        recipes: [],
        orders: [],
        customers: [],
        ingredients: [],
        inventory: [],
      }
    } catch (error) {
      console.error('❌ Database sync error:', error)
    } finally {
      syncInProgressRef.current = false
    }
  }, [token])

  /**
   * Debounced sync trigger
   */
  const triggerSync = useCallback(() => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current)
    }

    syncTimeoutRef.current = setTimeout(() => {
      syncToDatabase()
    }, DEBOUNCE_DELAY)
  }, [syncToDatabase])

  /**
   * Setup periodic sync
   */
  useEffect(() => {
    if (!token) return

    // Trigger sync when data changes
    triggerSync()

    // Also sync periodically
    const interval = setInterval(() => {
      syncToDatabase()
    }, SYNC_INTERVAL)

    return () => {
      clearInterval(interval)
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current)
      }
    }
  }, [token, triggerSync, syncToDatabase])

  return {
    syncToDatabase,
    isSyncing: syncInProgressRef.current,
  }
}
