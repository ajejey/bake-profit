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
    context.updateRecipe(id, recipe)
    const fullRecipe = context.getRecipeById(id)
    if (fullRecipe) {
      SyncEngine.recordOperation('recipe', id, 'update', fullRecipe)
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
    context.updateOrder(id, order)
    const fullOrder = context.getOrderById(id)
    if (fullOrder) {
      SyncEngine.recordOperation('order', id, 'update', fullOrder)
      window.dispatchEvent(new Event('data:changed'))
    }
  }

  const deleteOrder = (id: string) => {
    context.deleteOrder(id)
    SyncEngine.recordOperation('order', id, 'delete')
    window.dispatchEvent(new Event('data:changed'))
  }

  const updateOrderStatus = (id: string, status: Order['status']) => {
    context.updateOrderStatus(id, status)
    const fullOrder = context.getOrderById(id)
    if (fullOrder) {
      SyncEngine.recordOperation('order', id, 'update', fullOrder)
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
    context.updateCustomer(id, customer)
    const fullCustomer = context.getCustomerById(id)
    if (fullCustomer) {
      SyncEngine.recordOperation('customer', id, 'update', fullCustomer)
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
    context.updateIngredient(id, ingredient)
    const fullIngredient = context.getIngredientById(id)
    if (fullIngredient) {
      SyncEngine.recordOperation('ingredient', id, 'update', fullIngredient)
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
    context.updateInventoryItem(ingredientId, item)
    const fullItem = context.getInventoryItem(ingredientId)
    if (fullItem) {
      SyncEngine.recordOperation('inventory', ingredientId, 'update', fullItem)
      window.dispatchEvent(new Event('data:changed'))
    }
  }

  const updateStock = (ingredientId: string, quantity: number) => {
    context.updateStock(ingredientId, quantity)
    const fullItem = context.getInventoryItem(ingredientId)
    if (fullItem) {
      SyncEngine.recordOperation('inventory', ingredientId, 'update', fullItem)
      window.dispatchEvent(new Event('data:changed'))
    }
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
    getInventoryItem: context.getInventoryItem,
    updateStock,

    // Category actions (not synced - static data)
    registerCategory: context.registerCategory,

    // Utility
    clearAllData: context.clearAllData,
  }
}
