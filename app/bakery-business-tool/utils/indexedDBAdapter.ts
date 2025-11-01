/**
 * IndexedDB Adapter - Abstraction layer for persistent storage
 * Provides a simple API that mirrors localStorage but uses IndexedDB
 * Falls back to localStorage if IndexedDB is unavailable
 */

const DB_NAME = 'BakeProfitDB'
const DB_VERSION = 1

// Store names
const STORES = {
  recipes: 'recipes',
  orders: 'orders',
  customers: 'customers',
  ingredients: 'ingredients',
  inventory: 'inventory',
  categories: 'categories',
  businessSettings: 'businessSettings',
  orderSettings: 'orderSettings',
  recipeSettings: 'recipeSettings',
} as const

type StoreName = typeof STORES[keyof typeof STORES]

let dbInstance: IDBDatabase | null = null

/**
 * Initialize IndexedDB database
 */
async function initDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => {
      console.error('IndexedDB failed to open:', request.error)
      reject(request.error)
    }

    request.onsuccess = () => {
      dbInstance = request.result
      console.log('✅ IndexedDB initialized successfully')
      resolve(dbInstance)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Create object stores if they don't exist
      // All stores use simple key-value storage (no keyPath)
      Object.values(STORES).forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          // Create store without keyPath - we provide the key explicitly
          db.createObjectStore(storeName)
        }
      })

      console.log('✅ IndexedDB schema created')
    }
  })
}

/**
 * Get an object store for read/write operations
 */
async function getStore(
  storeName: StoreName,
  mode: 'readonly' | 'readwrite' = 'readonly'
): Promise<IDBObjectStore> {
  const db = await initDB()
  const transaction = db.transaction(storeName, mode)
  return transaction.objectStore(storeName)
}

/**
 * Set a value in IndexedDB
 */
export async function setItem(key: string, value: string): Promise<void> {
  try {
    // Determine which store to use based on key prefix
    let storeName: StoreName = 'recipes'

    if (key.startsWith('bakery-recipes')) storeName = 'recipes'
    else if (key.startsWith('bakery-orders')) storeName = 'orders'
    else if (key.startsWith('bakery-customers')) storeName = 'customers'
    else if (key.startsWith('bakery-ingredients')) storeName = 'ingredients'
    else if (key.startsWith('bakery-inventory')) storeName = 'inventory'
    else if (key.startsWith('bakery-recipe-categories')) storeName = 'categories'
    else if (key === 'businessSettings') storeName = 'businessSettings'
    else if (key === 'orderSettings') storeName = 'orderSettings'
    else if (key === 'recipeSettings') storeName = 'recipeSettings'

    const store = await getStore(storeName, 'readwrite')

    return new Promise((resolve, reject) => {
      // Store the JSON string directly with the key as the identifier
      const request = store.put(value, key)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  } catch (error) {
    console.error(`Error setting item ${key} in IndexedDB:`, error)
    throw error
  }
}

/**
 * Get a value from IndexedDB
 */
export async function getItem(key: string): Promise<string | null> {
  try {
    // Determine which store to use based on key prefix
    let storeName: StoreName = 'recipes'

    if (key.startsWith('bakery-recipes')) storeName = 'recipes'
    else if (key.startsWith('bakery-orders')) storeName = 'orders'
    else if (key.startsWith('bakery-customers')) storeName = 'customers'
    else if (key.startsWith('bakery-ingredients')) storeName = 'ingredients'
    else if (key.startsWith('bakery-inventory')) storeName = 'inventory'
    else if (key.startsWith('bakery-recipe-categories')) storeName = 'categories'
    else if (key === 'businessSettings') storeName = 'businessSettings'
    else if (key === 'orderSettings') storeName = 'orderSettings'
    else if (key === 'recipeSettings') storeName = 'recipeSettings'

    const store = await getStore(storeName, 'readonly')

    return new Promise((resolve, reject) => {
      // Get by key (all stores use simple key-value)
      const request = store.get(key)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const result = request.result
        // Result is the JSON string we stored
        resolve(result || null)
      }
    })
  } catch (error) {
    console.error(`Error getting item ${key} from IndexedDB:`, error)
    return null
  }
}

/**
 * Remove a value from IndexedDB
 */
export async function removeItem(key: string): Promise<void> {
  try {
    // Determine which store to use
    let storeName: StoreName = 'recipes'

    if (key.startsWith('bakery-recipes')) storeName = 'recipes'
    else if (key.startsWith('bakery-orders')) storeName = 'orders'
    else if (key.startsWith('bakery-customers')) storeName = 'customers'
    else if (key.startsWith('bakery-ingredients')) storeName = 'ingredients'
    else if (key.startsWith('bakery-inventory')) storeName = 'inventory'
    else if (key.startsWith('bakery-recipe-categories')) storeName = 'categories'
    else if (key === 'businessSettings') storeName = 'businessSettings'
    else if (key === 'orderSettings') storeName = 'orderSettings'
    else if (key === 'recipeSettings') storeName = 'recipeSettings'

    const store = await getStore(storeName, 'readwrite')

    return new Promise((resolve, reject) => {
      const request = store.clear()
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  } catch (error) {
    console.error(`Error removing item ${key} from IndexedDB:`, error)
    throw error
  }
}

/**
 * Clear all data from IndexedDB
 */
export async function clear(): Promise<void> {
  try {
    const db = await initDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(Object.values(STORES), 'readwrite')
      let completed = 0

      Object.values(STORES).forEach((storeName) => {
        const store = transaction.objectStore(storeName)
        const request = store.clear()

        request.onerror = () => reject(request.error)
        request.onsuccess = () => {
          completed++
          if (completed === Object.values(STORES).length) {
            console.log('✅ IndexedDB cleared')
            resolve()
          }
        }
      })
    })
  } catch (error) {
    console.error('Error clearing IndexedDB:', error)
    throw error
  }
}

/**
 * Check if IndexedDB is available
 */
export function isIndexedDBAvailable(): boolean {
  if (typeof window === 'undefined') return false
  return !!(window.indexedDB && window.IDBDatabase)
}

/**
 * Migrate data from localStorage to IndexedDB
 * For fresh app, this is a no-op. Only migrates if localStorage has existing data.
 */
// export async function migrateFromLocalStorage(): Promise<void> {
//   try {
//     if (!isIndexedDBAvailable()) {
//       console.log('IndexedDB not available, using localStorage only')
//       return
//     }

//     // Check if there's any existing localStorage data to migrate
//     const keys = Object.keys(localStorage)
//     const bakeryKeys = keys.filter(k => k.startsWith('bakery-') || k.includes('Settings'))
    
//     if (bakeryKeys.length === 0) {
//       console.log('✅ No localStorage data to migrate (fresh app)')
//       return
//     }

//     let migrated = 0
//     for (const key of bakeryKeys) {
//       try {
//         const value = localStorage.getItem(key)
//         if (value) {
//           await setItem(key, value)
//           migrated++
//         }
//       } catch (itemError) {
//         console.warn(`Failed to migrate ${key}:`, itemError)
//         // Continue with next item
//       }
//     }

//     if (migrated > 0) {
//       console.log(`✅ Migrated ${migrated} items from localStorage to IndexedDB`)
//     }
//   } catch (error) {
//     console.error('Error during migration:', error)
//     // Don't throw - allow app to continue
//   }
// }

/**
 * Storage adapter that mimics localStorage API but uses IndexedDB
 * Falls back to localStorage if IndexedDB fails
 */
export const StorageAdapter = {
  async getItem(key: string): Promise<string | null> {
    if (!isIndexedDBAvailable()) {
      return localStorage.getItem(key)
    }

    try {
      return await getItem(key)
    } catch {
      console.warn(`IndexedDB getItem failed for ${key}, falling back to localStorage`)
      return localStorage.getItem(key)
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    if (!isIndexedDBAvailable()) {
      localStorage.setItem(key, value)
      return
    }

    try {
      await setItem(key, value)
    } catch {
      console.warn(`IndexedDB setItem failed for ${key}, falling back to localStorage`)
      localStorage.setItem(key, value)
    }
  },

  async removeItem(key: string): Promise<void> {
    if (!isIndexedDBAvailable()) {
      localStorage.removeItem(key)
      return
    }

    try {
      await removeItem(key)
    } catch {
      console.warn(`IndexedDB removeItem failed for ${key}, falling back to localStorage`)
      localStorage.removeItem(key)
    }
  },

  async clear(): Promise<void> {
    if (!isIndexedDBAvailable()) {
      localStorage.clear()
      return
    }

    try {
      await clear()
    } catch {
      console.warn('IndexedDB clear failed, falling back to localStorage')
      localStorage.clear()
    }
  },
}
