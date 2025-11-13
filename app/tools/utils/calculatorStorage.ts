/**
 * Calculator Storage Utilities
 * Handles saving/loading calculator data to IndexedDB
 * Separate from bakery-business-tool data
 */

const DB_NAME = 'BakeProfitCalculators'
const DB_VERSION = 1

// Store names for different calculator types
export const CALCULATOR_STORES = {
  recipes: 'calculator-recipes',
  cakes: 'calculator-cakes',
  scalings: 'calculator-scalings',
  profits: 'calculator-profits',
  ingredients: 'calculator-ingredients',
  batches: 'calculator-batches',
} as const

export type CalculatorStoreName = typeof CALCULATOR_STORES[keyof typeof CALCULATOR_STORES]

// Data Models
export interface SavedRecipeCalculation {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  servings: number
  ingredients: Array<{
    id: string
    name: string
    amount: number
    unit: string
    packageSize: number
    packageCost: number
    cost: number
  }>
  laborCost: number
  overheadCost: number
  desiredProfit: number
  // Calculated fields (stored for quick display)
  totalCost: number
  costPerServing: number
  suggestedPrice: number
}

export interface SavedCakeCalculation {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  cakeType: string
  tiers: number
  servings: number
  ingredientCost: number
  decorationCost: number
  packagingCost: number
  bakingTime: number
  decoratingTime: number
  setupTime: number
  hourlyRate: number
  deliveryDistance: number
  deliveryCostPerMile: number
  complexityLevel: number
  desiredProfit: number
  // Calculated fields
  totalCost: number
  suggestedPrice: number
  tierAdjustedPrice: number
}

export interface SavedScalingCalculation {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  originalYield: number
  desiredYield: number
  scalingFactor: number
  ingredients: Array<{
    id: string
    original: string
    amount: number
    unit: string
    name: string
    scaled: number
  }>
}

export interface SavedProfitCalculation {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  revenue: number
  costs: number
  profitMargin: number
  profitAmount: number
}

export interface SavedIngredientCalculation {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  ingredientName: string
  packageSize: number
  packageCost: number
  unit: string
  costPerUnit: number
}

export interface SavedBatchCalculation {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  batches: number
  costPerBatch: number
  totalCost: number
  pricePerBatch: number
  totalRevenue: number
  totalProfit: number
}

export type SavedCalculation = 
  | SavedRecipeCalculation 
  | SavedCakeCalculation 
  | SavedScalingCalculation 
  | SavedProfitCalculation
  | SavedIngredientCalculation
  | SavedBatchCalculation

let dbInstance: IDBDatabase | null = null

/**
 * Initialize Calculator IndexedDB
 */
async function initCalculatorDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => {
      console.error('Calculator DB failed to open:', request.error)
      reject(request.error)
    }

    request.onsuccess = () => {
      dbInstance = request.result
      console.log('✅ Calculator IndexedDB initialized')
      resolve(dbInstance)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Create object stores for each calculator type
      Object.values(CALCULATOR_STORES).forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          const store = db.createObjectStore(storeName, { keyPath: 'id' })
          // Index by creation date for sorting
          store.createIndex('createdAt', 'createdAt', { unique: false })
          store.createIndex('updatedAt', 'updatedAt', { unique: false })
        }
      })

      console.log('✅ Calculator DB schema created')
    }
  })
}

/**
 * Get object store for operations
 */
async function getCalculatorStore(
  storeName: CalculatorStoreName,
  mode: 'readonly' | 'readwrite' = 'readonly'
): Promise<IDBObjectStore> {
  const db = await initCalculatorDB()
  const transaction = db.transaction(storeName, mode)
  return transaction.objectStore(storeName)
}

/**
 * Save a calculation
 */
export async function saveCalculation<T extends SavedCalculation>(
  storeName: CalculatorStoreName,
  calculation: T
): Promise<void> {
  try {
    const store = await getCalculatorStore(storeName, 'readwrite')
    
    return new Promise((resolve, reject) => {
      const request = store.put(calculation)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  } catch (error) {
    console.error('Error saving calculation:', error)
    throw error
  }
}

/**
 * Get a calculation by ID
 */
export async function getCalculation<T extends SavedCalculation>(
  storeName: CalculatorStoreName,
  id: string
): Promise<T | null> {
  try {
    const store = await getCalculatorStore(storeName, 'readonly')
    
    return new Promise((resolve, reject) => {
      const request = store.get(id)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result || null)
    })
  } catch (error) {
    console.error('Error getting calculation:', error)
    return null
  }
}

/**
 * Get all calculations from a store
 */
export async function getAllCalculations<T extends SavedCalculation>(
  storeName: CalculatorStoreName
): Promise<T[]> {
  try {
    const store = await getCalculatorStore(storeName, 'readonly')
    
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const results = request.result || []
        // Sort by updatedAt descending (most recent first)
        results.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        resolve(results)
      }
    })
  } catch (error) {
    console.error('Error getting all calculations:', error)
    return []
  }
}

/**
 * Delete a calculation
 */
export async function deleteCalculation(
  storeName: CalculatorStoreName,
  id: string
): Promise<void> {
  try {
    const store = await getCalculatorStore(storeName, 'readwrite')
    
    return new Promise((resolve, reject) => {
      const request = store.delete(id)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  } catch (error) {
    console.error('Error deleting calculation:', error)
    throw error
  }
}

/**
 * Clear all calculations from a store
 */
export async function clearCalculations(
  storeName: CalculatorStoreName
): Promise<void> {
  try {
    const store = await getCalculatorStore(storeName, 'readwrite')
    
    return new Promise((resolve, reject) => {
      const request = store.clear()
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  } catch (error) {
    console.error('Error clearing calculations:', error)
    throw error
  }
}

/**
 * Get count of saved calculations
 */
export async function getCalculationCount(
  storeName: CalculatorStoreName
): Promise<number> {
  try {
    const store = await getCalculatorStore(storeName, 'readonly')
    
    return new Promise((resolve, reject) => {
      const request = store.count()
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  } catch (error) {
    console.error('Error getting calculation count:', error)
    return 0
  }
}

/**
 * Export calculation as JSON
 */
export function exportCalculation(calculation: SavedCalculation): string {
  return JSON.stringify(calculation, null, 2)
}

/**
 * Generate unique ID for calculations
 */
export function generateCalculationId(): string {
  return `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Check if IndexedDB is available
 */
export function isCalculatorStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false
  return !!(window.indexedDB && window.IDBDatabase)
}

/**
 * Get all calculations across all stores (for My Calculations page)
 */
export async function getAllSavedCalculations(): Promise<{
  recipes: SavedRecipeCalculation[]
  cakes: SavedCakeCalculation[]
  scalings: SavedScalingCalculation[]
  profits: SavedProfitCalculation[]
  ingredients: SavedIngredientCalculation[]
  batches: SavedBatchCalculation[]
}> {
  try {
    const [recipes, cakes, scalings, profits, ingredients, batches] = await Promise.all([
      getAllCalculations<SavedRecipeCalculation>(CALCULATOR_STORES.recipes),
      getAllCalculations<SavedCakeCalculation>(CALCULATOR_STORES.cakes),
      getAllCalculations<SavedScalingCalculation>(CALCULATOR_STORES.scalings),
      getAllCalculations<SavedProfitCalculation>(CALCULATOR_STORES.profits),
      getAllCalculations<SavedIngredientCalculation>(CALCULATOR_STORES.ingredients),
      getAllCalculations<SavedBatchCalculation>(CALCULATOR_STORES.batches),
    ])

    return { recipes, cakes, scalings, profits, ingredients, batches }
  } catch (error) {
    console.error('Error getting all saved calculations:', error)
    return {
      recipes: [],
      cakes: [],
      scalings: [],
      profits: [],
      ingredients: [],
      batches: [],
    }
  }
}

/**
 * Get total count of all saved calculations
 */
export async function getTotalCalculationCount(): Promise<number> {
  try {
    const counts = await Promise.all(
      Object.values(CALCULATOR_STORES).map(store => getCalculationCount(store))
    )
    return counts.reduce((sum, count) => sum + count, 0)
  } catch (error) {
    console.error('Error getting total calculation count:', error)
    return 0
  }
}
