'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import type { Recipe, Order, Customer, Ingredient, InventoryItem, RecipeCategory } from '../types'
import { DEFAULT_RECIPE_CATEGORIES } from '../types'
import { StorageAdapter } from '../utils/indexedDBAdapter'

// Context Type
interface BakeryDataContextType {
  // Data
  recipes: Recipe[]
  orders: Order[]
  customers: Customer[]
  ingredients: Ingredient[]
  inventory: InventoryItem[]
  recipeCategories: RecipeCategory[]

  // Recipe Actions
  addRecipe: (recipe: Recipe) => void
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void
  deleteRecipe: (id: string) => void
  getRecipeById: (id: string) => Recipe | undefined

  // Order Actions
  addOrder: (order: Order) => void
  updateOrder: (id: string, order: Partial<Order>) => void
  deleteOrder: (id: string) => void
  getOrderById: (id: string) => Order | undefined
  updateOrderStatus: (id: string, status: Order['status']) => void

  // Customer Actions
  addCustomer: (customer: Customer) => void
  updateCustomer: (id: string, customer: Partial<Customer>) => void
  deleteCustomer: (id: string) => void
  getCustomerByName: (name: string) => Customer | undefined
  getCustomerById: (id: string) => Customer | undefined

  // Ingredient Actions
  addIngredient: (ingredient: Ingredient) => void
  updateIngredient: (id: string, ingredient: Partial<Ingredient>) => void
  deleteIngredient: (id: string) => void
  getIngredientById: (id: string) => Ingredient | undefined

  // Inventory Actions
  addInventoryItem: (item: InventoryItem) => void
  updateInventoryItem: (ingredientId: string, item: Partial<InventoryItem>) => void
  deleteInventoryItem: (ingredientId: string) => void
  getInventoryItem: (ingredientId: string) => InventoryItem | undefined
  updateStock: (ingredientId: string, quantity: number) => void

  // Category Actions
  registerCategory: (category: RecipeCategory) => void

  // Utility
  isLoading: boolean
  clearAllData: () => void
}

// Create Context
const BakeryDataContext = createContext<BakeryDataContextType | undefined>(undefined)

// LocalStorage Keys
const STORAGE_KEYS = {
  recipes: 'bakery-recipes',
  orders: 'bakery-orders',
  customers: 'bakery-customers',
  ingredients: 'bakery-ingredients',
  inventory: 'bakery-inventory',
  categories: 'bakery-recipe-categories',
} as const

// Provider Component
export function BakeryDataProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [recipeCategories, setRecipeCategories] = useState<RecipeCategory[]>(DEFAULT_RECIPE_CATEGORIES)
  const [isLoading, setIsLoading] = useState(true)

  // Load all data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Migrate from localStorage on first load
        // await migrateFromLocalStorage()

        const loadedRecipes = await StorageAdapter.getItem(STORAGE_KEYS.recipes)
        const loadedOrders = await StorageAdapter.getItem(STORAGE_KEYS.orders)
        const loadedCustomers = await StorageAdapter.getItem(STORAGE_KEYS.customers)
        const loadedIngredients = await StorageAdapter.getItem(STORAGE_KEYS.ingredients)
        const loadedInventory = await StorageAdapter.getItem(STORAGE_KEYS.inventory)
        const loadedCategories = await StorageAdapter.getItem(STORAGE_KEYS.categories)

        // Load and migrate recipes if needed
        if (loadedRecipes) {
          const parsedRecipes: Recipe[] = JSON.parse(loadedRecipes)
          // Migrate old recipes without totalCost
          const migratedRecipes = parsedRecipes.map(recipe => {
            if (recipe.totalCost === undefined || recipe.costPerServing === undefined) {
              const ingredientCost = recipe.ingredients.reduce((sum, ing) => sum + (ing.cost || 0), 0)
              const totalCost = ingredientCost + (recipe.laborCost || 0) + (recipe.overheadCost || 0)
              const costPerServing = recipe.servings > 0 ? totalCost / recipe.servings : 0
              console.log(`Migrated recipe: ${recipe.name} - Added totalCost: ${totalCost}`)
              return { ...recipe, totalCost, costPerServing }
            }
            return recipe
          })
          setRecipes(migratedRecipes)
        }

        if (loadedOrders) setOrders(JSON.parse(loadedOrders))
        if (loadedCustomers) setCustomers(JSON.parse(loadedCustomers))
        if (loadedIngredients) setIngredients(JSON.parse(loadedIngredients))
        if (loadedInventory) setInventory(JSON.parse(loadedInventory))
        if (loadedCategories) {
          setRecipeCategories(JSON.parse(loadedCategories))
        }

        console.log('✅ Bakery data loaded from IndexedDB')
      } catch (error) {
        console.error('Error loading data from IndexedDB:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Listen for Google Drive data download and reload
  useEffect(() => {
    const handleGoogleDriveDataLoaded = async () => {
      console.log('📥 Google Drive data loaded, reloading UI...')

      try {
        const loadedRecipes = await StorageAdapter.getItem(STORAGE_KEYS.recipes)
        const loadedOrders = await StorageAdapter.getItem(STORAGE_KEYS.orders)
        const loadedCustomers = await StorageAdapter.getItem(STORAGE_KEYS.customers)
        const loadedIngredients = await StorageAdapter.getItem(STORAGE_KEYS.ingredients)
        const loadedInventory = await StorageAdapter.getItem(STORAGE_KEYS.inventory)
        const loadedCategories = await StorageAdapter.getItem(STORAGE_KEYS.categories)

        if (loadedRecipes) setRecipes(JSON.parse(loadedRecipes))
        if (loadedOrders) setOrders(JSON.parse(loadedOrders))
        if (loadedCustomers) setCustomers(JSON.parse(loadedCustomers))
        if (loadedIngredients) setIngredients(JSON.parse(loadedIngredients))
        if (loadedInventory) setInventory(JSON.parse(loadedInventory))
        if (loadedCategories) setRecipeCategories(JSON.parse(loadedCategories))

        console.log('✅ UI updated with Google Drive data')
      } catch (error) {
        console.error('Error reloading data from Google Drive:', error)
      }
    }

    window.addEventListener('google-drive-data-loaded', handleGoogleDriveDataLoaded)
    return () => window.removeEventListener('google-drive-data-loaded', handleGoogleDriveDataLoaded)
  }, [])

  // Listen for MongoDB sync pull data and update IndexedDB
  useEffect(() => {
    const handlePulledData = async (event: Event) => {
      const customEvent = event as CustomEvent
      const data = customEvent.detail

      if (!data) {
        console.warn('⚠️ sync:pulled event received but data is null/undefined')
        return
      }

      console.log('📥 Syncing data from server:', {
        recipes: data?.recipes?.length || 0,
        orders: data?.orders?.length || 0,
        customers: data?.customers?.length || 0,
        ingredients: data?.ingredients?.length || 0,
        inventory: data?.inventory?.length || 0,
      })

      try {
        // Helper function to normalize MongoDB documents
        // IMPORTANT: Preserve original 'id' field if it exists (for sample data compatibility)
        // Only use '_id' as fallback if 'id' doesn't exist
        const normalizeDoc = (doc: Record<string, unknown>) => {
          if (!doc) return doc
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { _id, __v, ...rest } = doc
          // Use existing 'id' field if present, otherwise use '_id'
          return { ...rest, id: doc.id || doc._id }
        }

        // Update state and IndexedDB with server data
        if (data.recipes && Array.isArray(data.recipes) && data.recipes.length > 0) {
          const normalized = data.recipes.map(normalizeDoc)
          setRecipes(normalized)
          await StorageAdapter.setItem(STORAGE_KEYS.recipes, JSON.stringify(normalized))
        }

        if (data.orders && Array.isArray(data.orders) && data.orders.length > 0) {
          const normalized = data.orders.map(normalizeDoc)
          setOrders(normalized)
          await StorageAdapter.setItem(STORAGE_KEYS.orders, JSON.stringify(normalized))
        }

        if (data.customers && Array.isArray(data.customers) && data.customers.length > 0) {
          const normalized = data.customers.map(normalizeDoc)
          setCustomers(normalized)
          await StorageAdapter.setItem(STORAGE_KEYS.customers, JSON.stringify(normalized))
        }

        if (data.ingredients && Array.isArray(data.ingredients) && data.ingredients.length > 0) {
          const normalized = data.ingredients.map(normalizeDoc)
          setIngredients(normalized)
          await StorageAdapter.setItem(STORAGE_KEYS.ingredients, JSON.stringify(normalized))
        }

        if (data.inventory && Array.isArray(data.inventory) && data.inventory.length > 0) {
          const normalized = data.inventory.map(normalizeDoc)
          setInventory(normalized)
          await StorageAdapter.setItem(STORAGE_KEYS.inventory, JSON.stringify(normalized))
        }

        console.log('✅ Sync complete: Data applied to IndexedDB and UI')
      } catch (error) {
        console.error('❌ Error applying pulled data:', error)
      }
    }

    window.addEventListener('sync:pulled', handlePulledData)

    return () => {
      window.removeEventListener('sync:pulled', handlePulledData)
    }
  }, [])

  // Auto-save recipes to IndexedDB
  useEffect(() => {
    if (!isLoading) {
      StorageAdapter.setItem(STORAGE_KEYS.recipes, JSON.stringify(recipes))
        .catch(error => console.error('Error saving recipes:', error))
    }
  }, [recipes, isLoading])

  // Auto-save orders to IndexedDB
  useEffect(() => {
    if (!isLoading) {
      StorageAdapter.setItem(STORAGE_KEYS.orders, JSON.stringify(orders))
        .catch(error => console.error('Error saving orders:', error))
    }
  }, [orders, isLoading])

  // Auto-save customers to IndexedDB
  useEffect(() => {
    if (!isLoading) {
      StorageAdapter.setItem(STORAGE_KEYS.customers, JSON.stringify(customers))
        .catch(error => console.error('Error saving customers:', error))
    }
  }, [customers, isLoading])

  // Auto-save ingredients to IndexedDB
  useEffect(() => {
    if (!isLoading) {
      StorageAdapter.setItem(STORAGE_KEYS.ingredients, JSON.stringify(ingredients))
        .catch(error => console.error('Error saving ingredients:', error))
    }
  }, [ingredients, isLoading])

  // Auto-save inventory to IndexedDB
  useEffect(() => {
    if (!isLoading) {
      StorageAdapter.setItem(STORAGE_KEYS.inventory, JSON.stringify(inventory))
        .catch(error => console.error('Error saving inventory:', error))
    }
  }, [inventory, isLoading])

  // Auto-save categories to IndexedDB
  useEffect(() => {
    if (!isLoading) {
      StorageAdapter.setItem(STORAGE_KEYS.categories, JSON.stringify(recipeCategories))
        .catch(error => console.error('Error saving categories:', error))
    }
  }, [recipeCategories, isLoading])

  // Trigger Google Drive sync on data changes
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      // Dispatch custom event to trigger Google Drive sync
      window.dispatchEvent(new CustomEvent('bakery-data-changed'))
    }
  }, [recipes, orders, customers, ingredients, inventory, recipeCategories, isLoading])

  // ========== RECIPE ACTIONS ==========
  const addRecipe = useCallback((recipe: Recipe) => {
    setRecipes(prev => [...prev, recipe])
  }, [])

  const updateRecipe = useCallback((id: string, updates: Partial<Recipe>) => {
    setRecipes(prev => prev.map(recipe =>
      recipe.id === id ? { ...recipe, ...updates, updatedAt: new Date().toISOString() } : recipe
    ))
  }, [])

  const deleteRecipe = useCallback((id: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id))
  }, [])

  const getRecipeById = useCallback((id: string) => {
    return recipes.find(recipe => recipe.id === id)
  }, [recipes])

  // ========== ORDER ACTIONS ==========
  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [...prev, order])
  }, [])

  const updateOrder = useCallback((id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order =>
      order.id === id ? { ...order, ...updates, updatedAt: new Date().toISOString() } : order
    ))
  }, [])

  const deleteOrder = useCallback((id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id))
  }, [])

  const getOrderById = useCallback((id: string) => {
    return orders.find(order => order.id === id)
  }, [orders])

  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    updateOrder(id, { status })
  }, [updateOrder])

  // ========== CUSTOMER ACTIONS ==========
  const addCustomer = useCallback((customer: Customer) => {
    setCustomers(prev => [...prev, customer])
  }, [])

  const updateCustomer = useCallback((id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(customer =>
      customer.id === id ? { ...customer, ...updates } : customer
    ))
  }, [])

  const deleteCustomer = useCallback((id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id))
  }, [])

  const getCustomerByName = useCallback((name: string) => {
    return customers.find(c => c.name.toLowerCase() === name.toLowerCase())
  }, [customers])

  const getCustomerById = useCallback((id: string) => {
    return customers.find(c => c.id === id)
  }, [customers])

  // ========== INGREDIENT ACTIONS ==========
  const addIngredient = useCallback((ingredient: Ingredient) => {
    setIngredients(prev => [...prev, ingredient])
  }, [])

  const updateIngredient = useCallback((id: string, updates: Partial<Ingredient>) => {
    setIngredients(prev => prev.map(ingredient =>
      ingredient.id === id ? { ...ingredient, ...updates } : ingredient
    ))
  }, [])

  const deleteIngredient = useCallback((id: string) => {
    setIngredients(prev => prev.filter(ingredient => ingredient.id !== id))
  }, [])

  const getIngredientById = useCallback((id: string) => {
    return ingredients.find(ingredient => ingredient.id === id)
  }, [ingredients])

  // ========== INVENTORY ACTIONS ==========
  const addInventoryItem = useCallback((item: InventoryItem) => {
    setInventory(prev => [...prev, item])
  }, [])

  const updateInventoryItem = useCallback((ingredientId: string, updates: Partial<InventoryItem>) => {
    setInventory(prev => prev.map(item =>
      item.ingredientId === ingredientId
        ? { ...item, ...updates, lastUpdated: new Date().toISOString() }
        : item
    ))
  }, [])

  const getInventoryItem = useCallback((ingredientId: string) => {
    return inventory.find(item => item.ingredientId === ingredientId)
  }, [inventory])

  const deleteInventoryItem = useCallback((ingredientId: string) => {
    setInventory(prev => prev.filter(item => item.ingredientId !== ingredientId))
  }, [])

  const updateStock = useCallback((ingredientId: string, quantity: number) => {
    setInventory(prev => {
      const existing = prev.find(item => item.ingredientId === ingredientId)
      if (existing) {
        return prev.map(item =>
          item.ingredientId === ingredientId
            ? { ...item, currentStock: quantity, lastUpdated: new Date().toISOString() }
            : item
        )
      } else {
        // Create new inventory item if doesn't exist
        const ingredient = ingredients.find(ing => ing.id === ingredientId)
        if (ingredient) {
          const newItem: InventoryItem = {
            ingredientId,
            currentStock: quantity,
            minStock: 0,
            unit: ingredient.unit,
            lastUpdated: new Date().toISOString(),
            costPerUnit: ingredient.cost,
          }
          return [...prev, newItem]
        }
        return prev
      }
    })
  }, [ingredients])

  // ========== CATEGORY ACTIONS ==========
  const registerCategory = useCallback((category: RecipeCategory) => {
    setRecipeCategories(prev => {
      // Check if category already exists (case-insensitive)
      const exists = prev.some(cat => cat.toLowerCase() === category.toLowerCase())
      if (exists) return prev

      // Add new category and sort alphabetically
      return [...prev, category].sort()
    })
  }, [])

  // ========== UTILITY ==========
  const clearAllData = useCallback(() => {
    StorageAdapter.clear()
      .catch(error => console.error('Error clearing storage:', error))
    setRecipes([])
    setOrders([])
    setCustomers([])
    setIngredients([])
    setInventory([])
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    recipes,
    orders,
    customers,
    ingredients,
    inventory,
    recipeCategories,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    updateOrderStatus,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerByName,
    getCustomerById,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    getIngredientById,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getInventoryItem,
    updateStock,
    registerCategory,
    isLoading,
    clearAllData,
  }), [
    recipes,
    orders,
    customers,
    ingredients,
    inventory,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    updateOrderStatus,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerByName,
    getCustomerById,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    getIngredientById,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getInventoryItem,
    updateStock,
    recipeCategories,
    registerCategory,
    isLoading,
    clearAllData,
  ])

  return (
    <BakeryDataContext.Provider value={contextValue}>
      {children}
    </BakeryDataContext.Provider>
  )
}

// Custom Hook
export function useBakeryData() {
  const context = useContext(BakeryDataContext)
  if (context === undefined) {
    throw new Error('useBakeryData must be used within a BakeryDataProvider')
  }
  return context
}
