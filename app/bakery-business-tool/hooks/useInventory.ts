'use client'

import { useMemo } from 'react'
import { useBakeryData } from '../contexts/BakeryDataContext'
import type { InventoryItem, InventoryAlert, ShoppingListItem, Order, Recipe, Ingredient } from '../types'

/**
 * Custom hook for inventory management
 * Provides inventory data, low stock alerts, and shopping list generation
 */
export function useInventory() {
  const { 
    inventory,
    ingredients, 
    orders,
    recipes,
    addInventoryItem, 
    updateInventoryItem, 
    getInventoryItem,
    updateStock,
    getIngredientById,
    getRecipeById,
  } = useBakeryData()

  /**
   * Get low stock items (below minimum threshold)
   */
  const lowStockItems = useMemo(() => {
    return inventory.filter(item => item.currentStock < item.minStock)
  }, [inventory])

  /**
   * Get out of stock items
   */
  const outOfStockItems = useMemo(() => {
    return inventory.filter(item => item.currentStock === 0)
  }, [inventory])

  /**
   * Generate inventory alerts
   */
  const alerts = useMemo((): InventoryAlert[] => {
    const alertList: InventoryAlert[] = []

    inventory.forEach(item => {
      const ingredient = ingredients.find(ing => ing.id === item.ingredientId)
      if (!ingredient) return

      // Out of stock
      if (item.currentStock === 0) {
        alertList.push({
          type: 'out-of-stock',
          ingredientId: item.ingredientId,
          ingredientName: ingredient.name,
          currentStock: item.currentStock,
          minStock: item.minStock,
          message: `${ingredient.name} is out of stock`,
          severity: 'error',
        })
      }
      // Low stock
      else if (item.currentStock < item.minStock) {
        alertList.push({
          type: 'low-stock',
          ingredientId: item.ingredientId,
          ingredientName: ingredient.name,
          currentStock: item.currentStock,
          minStock: item.minStock,
          message: `${ingredient.name} is running low (${item.currentStock}${item.unit} left, minimum: ${item.minStock}${item.unit})`,
          severity: 'warning',
        })
      }

      // Expiring soon (within 7 days)
      if (item.expirationDate) {
        const daysUntilExpiry = Math.floor(
          (new Date(item.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
        
        if (daysUntilExpiry < 0) {
          alertList.push({
            type: 'expired',
            ingredientId: item.ingredientId,
            ingredientName: ingredient.name,
            currentStock: item.currentStock,
            minStock: item.minStock,
            message: `${ingredient.name} has expired`,
            severity: 'error',
          })
        } else if (daysUntilExpiry <= 7) {
          alertList.push({
            type: 'expiring-soon',
            ingredientId: item.ingredientId,
            ingredientName: ingredient.name,
            currentStock: item.currentStock,
            minStock: item.minStock,
            message: `${ingredient.name} expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}`,
            severity: 'warning',
          })
        }
      }
    })

    return alertList.sort((a, b) => {
      // Sort by severity (error first, then warning)
      if (a.severity === 'error' && b.severity !== 'error') return -1
      if (a.severity !== 'error' && b.severity === 'error') return 1
      return 0
    })
  }, [inventory, ingredients])

  /**
   * Calculate ingredients needed for a list of orders
   */
  const calculateIngredientsForOrders = (orderList: Order[]): Record<string, number> => {
    const needed: Record<string, number> = {}

    orderList.forEach(order => {
      order.items.forEach(orderItem => {
        const recipe = getRecipeById(orderItem.recipeId)
        if (!recipe) return

        recipe.ingredients.forEach(recipeIng => {
          const totalNeeded = recipeIng.quantity * orderItem.quantity
          if (needed[recipeIng.ingredientId]) {
            needed[recipeIng.ingredientId] += totalNeeded
          } else {
            needed[recipeIng.ingredientId] = totalNeeded
          }
        })
      })
    })

    return needed
  }

  /**
   * Generate shopping list for pending/in-progress orders
   */
  const generateShoppingList = (filterStatuses?: Order['status'][]): ShoppingListItem[] => {
    const statusFilter = filterStatuses || ['new', 'in-progress']
    const relevantOrders = orders.filter(order => statusFilter.includes(order.status))

    const needed = calculateIngredientsForOrders(relevantOrders)
    const shoppingList: ShoppingListItem[] = []

    Object.entries(needed).forEach(([ingredientId, neededQty]) => {
      const ingredient = getIngredientById(ingredientId)
      if (!ingredient) return

      const inventoryItem = getInventoryItem(ingredientId)
      const currentStock = inventoryItem?.currentStock || 0
      const deficit = neededQty - currentStock

      // Only add to shopping list if we need more
      if (deficit > 0) {
        shoppingList.push({
          ingredientId,
          ingredientName: ingredient.name,
          needed: neededQty,
          currentStock,
          deficit,
          unit: ingredient.unit,
          estimatedCost: deficit * ingredient.cost,
          priority: currentStock === 0 ? 'critical' : currentStock < (inventoryItem?.minStock || 0) ? 'needed' : 'optional',
        })
      }
    })

    // Sort by priority (critical > needed > optional) and then by estimated cost (descending)
    return shoppingList.sort((a, b) => {
      const priorityOrder = { critical: 0, needed: 1, optional: 2 }
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      return b.estimatedCost - a.estimatedCost
    })
  }

  /**
   * Initialize inventory for an ingredient if it doesn't exist
   */
  const initializeInventory = (ingredientId: string, initialStock: number = 0, minStock: number = 0) => {
    const ingredient = getIngredientById(ingredientId)
    if (!ingredient) {
      console.error(`Ingredient ${ingredientId} not found`)
      return
    }

    const existing = getInventoryItem(ingredientId)
    if (!existing) {
      const newItem: InventoryItem = {
        ingredientId,
        currentStock: initialStock,
        minStock,
        unit: ingredient.unit,
        lastUpdated: new Date().toISOString(),
        costPerUnit: ingredient.cost,
      }
      addInventoryItem(newItem)
    }
  }

  /**
   * Adjust stock (add or subtract)
   */
  const adjustStock = (ingredientId: string, delta: number) => {
    const item = getInventoryItem(ingredientId)
    if (item) {
      const newStock = Math.max(0, item.currentStock + delta) // Prevent negative stock
      updateStock(ingredientId, newStock)
    } else {
      // Initialize if doesn't exist
      initializeInventory(ingredientId, Math.max(0, delta), 0)
    }
  }

  /**
   * Set minimum stock level for an ingredient
   */
  const setMinStock = (ingredientId: string, minStock: number) => {
    const item = getInventoryItem(ingredientId)
    if (item) {
      updateInventoryItem(ingredientId, { minStock })
    } else {
      initializeInventory(ingredientId, 0, minStock)
    }
  }

  /**
   * Get inventory status for a specific ingredient
   */
  const getInventoryStatus = (ingredientId: string): 'good' | 'low' | 'out' | 'unknown' => {
    const item = getInventoryItem(ingredientId)
    if (!item) return 'unknown'
    
    if (item.currentStock === 0) return 'out'
    if (item.currentStock < item.minStock) return 'low'
    return 'good'
  }

  /**
   * Get inventory item with ingredient details
   */
  const getInventoryWithDetails = () => {
    return inventory.map(item => {
      const ingredient = getIngredientById(item.ingredientId)
      return {
        ...item,
        ingredientName: ingredient?.name || 'Unknown',
        ingredient,
      }
    })
  }

  /**
   * Restock an ingredient
   */
  const restock = (ingredientId: string, quantity: number, cost?: number) => {
    const item = getInventoryItem(ingredientId)
    if (item) {
      updateInventoryItem(ingredientId, {
        currentStock: item.currentStock + quantity,
        lastRestocked: new Date().toISOString(),
        ...(cost && { costPerUnit: cost }),
      })
    } else {
      const ingredient = getIngredientById(ingredientId)
      if (ingredient) {
        const newItem: InventoryItem = {
          ingredientId,
          currentStock: quantity,
          minStock: 0,
          unit: ingredient.unit,
          lastUpdated: new Date().toISOString(),
          lastRestocked: new Date().toISOString(),
          costPerUnit: cost || ingredient.cost,
        }
        addInventoryItem(newItem)
      }
    }
  }

  return {
    // Data
    inventory,
    lowStockItems,
    outOfStockItems,
    alerts,
    
    // Computed values
    hasLowStock: lowStockItems.length > 0,
    hasOutOfStock: outOfStockItems.length > 0,
    alertCount: alerts.length,
    
    // Actions
    updateStock,
    adjustStock,
    setMinStock,
    initializeInventory,
    restock,
    updateInventoryItem,
    getInventoryItem,
    getInventoryStatus,
    getInventoryWithDetails,
    
    // Shopping list
    generateShoppingList,
    calculateIngredientsForOrders,
  }
}
