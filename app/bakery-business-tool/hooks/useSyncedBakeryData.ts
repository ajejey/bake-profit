'use client'

import { useBakeryData } from '../contexts/BakeryDataContext'
import { SyncEngine } from '@/lib/sync/SyncEngine'
import type { Recipe, Order, Customer, Ingredient, InventoryItem } from '../types'

/**
 * Wrapper around useBakeryData that records sync operations
 * Use this instead of useBakeryData directly
 */
export function useSyncedBakeryData() {
  const context = useBakeryData()

  // Wrap recipe actions
  const addRecipe = (recipe: Recipe) => {
    context.addRecipe(recipe)
    SyncEngine.recordOperation('recipe', recipe.id, 'create', recipe)
    window.dispatchEvent(new Event('data:changed'))
  }

  const updateRecipe = (id: string, recipe: Partial<Recipe>) => {
    // IMPORTANT: Get the current recipe BEFORE updating
    // because context.updateRecipe uses setState which is async
    const currentRecipe = context.getRecipeById(id)

    // Update in context
    context.updateRecipe(id, recipe)

    // Build the full updated recipe for sync
    if (currentRecipe) {
      const fullUpdatedRecipe = {
        ...currentRecipe,
        ...recipe,
        updatedAt: new Date().toISOString()
      }
      SyncEngine.recordOperation('recipe', id, 'update', fullUpdatedRecipe)
      window.dispatchEvent(new Event('data:changed'))
    }
  }

  const deleteRecipe = (id: string) => {
    context.deleteRecipe(id)
    SyncEngine.recordOperation('recipe', id, 'delete')
    window.dispatchEvent(new Event('data:changed'))
  }

  // Wrap order actions
  const addOrder = (order: Order) => {
    context.addOrder(order)
    SyncEngine.recordOperation('order', order.id, 'create', order)
    window.dispatchEvent(new Event('data:changed'))
  }

  const updateOrder = (id: string, order: Partial<Order>) => {
    const currentOrder = context.getOrderById(id)
    context.updateOrder(id, order)

    if (currentOrder) {
      const fullUpdatedOrder = {
        ...currentOrder,
        ...order,
        updatedAt: new Date().toISOString()
      }
      SyncEngine.recordOperation('order', id, 'update', fullUpdatedOrder)
      window.dispatchEvent(new Event('data:changed'))
    }
  }

  const deleteOrder = (id: string) => {
    context.deleteOrder(id)
    SyncEngine.recordOperation('order', id, 'delete')
    window.dispatchEvent(new Event('data:changed'))
  }

  const updateOrderStatus = (id: string, status: Order['status']) => {
    const currentOrder = context.getOrderById(id)
    context.updateOrderStatus(id, status)

    if (currentOrder) {
      const fullUpdatedOrder = {
        ...currentOrder,
        status,
        updatedAt: new Date().toISOString()
      }
      SyncEngine.recordOperation('order', id, 'update', fullUpdatedOrder)
      window.dispatchEvent(new Event('data:changed'))
    }
  }

  // Wrap customer actions
  const addCustomer = (customer: Customer) => {
    context.addCustomer(customer)
    SyncEngine.recordOperation('customer', customer.id, 'create', customer)
    window.dispatchEvent(new Event('data:changed'))
  }

  const updateCustomer = (id: string, customer: Partial<Customer>) => {
    const currentCustomer = context.getCustomerById(id)
    context.updateCustomer(id, customer)

    if (currentCustomer) {
      const fullUpdatedCustomer = {
        ...currentCustomer,
        ...customer
      }
      SyncEngine.recordOperation('customer', id, 'update', fullUpdatedCustomer)
      window.dispatchEvent(new Event('data:changed'))
    }
  }

  const deleteCustomer = (id: string) => {
    context.deleteCustomer(id)
    SyncEngine.recordOperation('customer', id, 'delete')
    window.dispatchEvent(new Event('data:changed'))
  }

  // Wrap ingredient actions
  const addIngredient = (ingredient: Ingredient) => {
    context.addIngredient(ingredient)
    SyncEngine.recordOperation('ingredient', ingredient.id, 'create', ingredient)
    window.dispatchEvent(new Event('data:changed'))
  }

  const updateIngredient = (id: string, ingredient: Partial<Ingredient>) => {
    const currentIngredient = context.getIngredientById(id)
    context.updateIngredient(id, ingredient)

    if (currentIngredient) {
      const fullUpdatedIngredient = {
        ...currentIngredient,
        ...ingredient
      }
      SyncEngine.recordOperation('ingredient', id, 'update', fullUpdatedIngredient)
      window.dispatchEvent(new Event('data:changed'))
    }
  }

  const deleteIngredient = (id: string) => {
    context.deleteIngredient(id)
    SyncEngine.recordOperation('ingredient', id, 'delete')
    window.dispatchEvent(new Event('data:changed'))
  }

  // Wrap inventory actions
  const addInventoryItem = (item: InventoryItem) => {
    context.addInventoryItem(item)
    SyncEngine.recordOperation('inventory', item.ingredientId, 'create', item)
    window.dispatchEvent(new Event('data:changed'))
  }

  const updateInventoryItem = (ingredientId: string, item: Partial<InventoryItem>) => {
    const currentItem = context.getInventoryItem(ingredientId)
    context.updateInventoryItem(ingredientId, item)

    if (currentItem) {
      const fullUpdatedItem = {
        ...currentItem,
        ...item,
        lastUpdated: new Date().toISOString()
      }
      SyncEngine.recordOperation('inventory', ingredientId, 'update', fullUpdatedItem)
      window.dispatchEvent(new Event('data:changed'))
    }
  }

  const updateStock = (ingredientId: string, quantity: number) => {
    const currentItem = context.getInventoryItem(ingredientId)
    context.updateStock(ingredientId, quantity)

    if (currentItem) {
      const fullUpdatedItem = {
        ...currentItem,
        currentStock: quantity,
        lastUpdated: new Date().toISOString()
      }
      SyncEngine.recordOperation('inventory', ingredientId, 'update', fullUpdatedItem)
      window.dispatchEvent(new Event('data:changed'))
    }
  }

  const deleteInventoryItem = (ingredientId: string) => {
    context.deleteInventoryItem(ingredientId)
    SyncEngine.recordOperation('inventory', ingredientId, 'delete')
    window.dispatchEvent(new Event('data:changed'))
  }

  return {
    // Data (read-only)
    recipes: context.recipes,
    orders: context.orders,
    customers: context.customers,
    ingredients: context.ingredients,
    inventory: context.inventory,
    recipeCategories: context.recipeCategories,
    isLoading: context.isLoading,

    // Recipe actions (synced)
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById: context.getRecipeById,

    // Order actions (synced)
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderById: context.getOrderById,
    updateOrderStatus,

    // Customer actions (synced)
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerByName: context.getCustomerByName,
    getCustomerById: context.getCustomerById,

    // Ingredient actions (synced)
    addIngredient,
    updateIngredient,
    deleteIngredient,
    getIngredientById: context.getIngredientById,

    // Inventory actions (synced)
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getInventoryItem: context.getInventoryItem,
    updateStock,

    // Category actions (not synced - static data)
    registerCategory: context.registerCategory,

    // Utility
    clearAllData: context.clearAllData,
  }
}
