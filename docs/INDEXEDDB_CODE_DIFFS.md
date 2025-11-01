# IndexedDB Migration - Code Diffs

## File 1: BakeryDataContext.tsx

### Change 1: Add Import
**Location**: Top of file, after existing imports

```diff
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import type { Recipe, Order, Customer, Ingredient, InventoryItem, RecipeCategory } from '../types'
import { DEFAULT_RECIPE_CATEGORIES } from '../types'
+import { StorageAdapter, migrateFromLocalStorage } from '../utils/indexedDBAdapter'
```

### Change 2: Update Initial Load Effect
**Location**: Lines 83-129 (useEffect for loading data)

```diff
  // Load all data on mount
  useEffect(() => {
-   if (!isLocalStorageAvailable) {
-     console.warn('localStorage is not available')
-     setIsLoading(false)
-     return
-   }
-
-   try {
-     const loadedRecipes = localStorage.getItem(STORAGE_KEYS.recipes)
-     const loadedOrders = localStorage.getItem(STORAGE_KEYS.orders)
-     const loadedCustomers = localStorage.getItem(STORAGE_KEYS.customers)
-     const loadedIngredients = localStorage.getItem(STORAGE_KEYS.ingredients)
-     const loadedInventory = localStorage.getItem(STORAGE_KEYS.inventory)
-     const loadedCategories = localStorage.getItem(STORAGE_KEYS.categories)
+   const loadData = async () => {
+     try {
+       // Migrate from localStorage on first load
+       await migrateFromLocalStorage()
+       
+       const loadedRecipes = await StorageAdapter.getItem(STORAGE_KEYS.recipes)
+       const loadedOrders = await StorageAdapter.getItem(STORAGE_KEYS.orders)
+       const loadedCustomers = await StorageAdapter.getItem(STORAGE_KEYS.customers)
+       const loadedIngredients = await StorageAdapter.getItem(STORAGE_KEYS.ingredients)
+       const loadedInventory = await StorageAdapter.getItem(STORAGE_KEYS.inventory)
+       const loadedCategories = await StorageAdapter.getItem(STORAGE_KEYS.categories)

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

-     console.log('✅ Bakery data loaded from localStorage')
+     console.log('✅ Bakery data loaded from IndexedDB')
-   } catch (error) {
-     console.error('Error loading data from localStorage:', error)
-   } finally {
-     setIsLoading(false)
-   }
- }, [isLocalStorageAvailable])
+     } catch (error) {
+       console.error('Error loading data from IndexedDB:', error)
+     } finally {
+       setIsLoading(false)
+     }
+   }
+   
+   loadData()
+ }, [])
```

### Change 3: Update Recipe Auto-Save Effect
**Location**: Lines 132-140

```diff
  // Auto-save recipes to localStorage
  useEffect(() => {
    if (!isLoading && isLocalStorageAvailable && recipes.length >= 0) {
      try {
-       localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(recipes))
+       StorageAdapter.setItem(STORAGE_KEYS.recipes, JSON.stringify(recipes))
+         .catch(error => console.error('Error saving recipes:', error))
      } catch (error) {
        console.error('Error saving recipes:', error)
      }
    }
  }, [recipes, isLoading, isLocalStorageAvailable])
```

**Simplified version (recommended):**
```diff
  // Auto-save recipes to IndexedDB
  useEffect(() => {
    if (!isLoading && recipes.length >= 0) {
-     try {
-       localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(recipes))
-     } catch (error) {
-       console.error('Error saving recipes:', error)
-     }
+     StorageAdapter.setItem(STORAGE_KEYS.recipes, JSON.stringify(recipes))
+       .catch(error => console.error('Error saving recipes:', error))
    }
- }, [recipes, isLoading, isLocalStorageAvailable])
+ }, [recipes, isLoading])
```

### Change 4: Update Other Auto-Save Effects
Apply the same pattern to:
- Orders auto-save (lines 143-151)
- Customers auto-save (lines 154-162)
- Ingredients auto-save (lines 165-173)
- Inventory auto-save (lines 176-184)
- Categories auto-save (lines 187-195)

### Change 5: Update clearAllData Function
**Location**: Find the clearAllData function

```diff
  const clearAllData = useCallback(() => {
    setRecipes([])
    setOrders([])
    setCustomers([])
    setIngredients([])
    setInventory([])
    setRecipeCategories(DEFAULT_RECIPE_CATEGORIES)
+   
+   StorageAdapter.clear()
+     .catch(error => console.error('Error clearing storage:', error))
  }, [])
```

### Change 6: Remove isLocalStorageAvailable Variable
**Location**: Line 80

```diff
- const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage
```

Remove this line entirely since StorageAdapter handles availability checks.

---

## File 2: utils/settings.ts

### Change 1: Add Import
**Location**: Top of file

```diff
// Settings utility functions for the bakery business tool
+import { StorageAdapter } from './indexedDBAdapter'
```

### Change 2: Update getBusinessSettings
**Location**: Lines 44-57

```diff
- export function getBusinessSettings(): BusinessSettings {
+ export async function getBusinessSettings(): Promise<BusinessSettings> {
    if (typeof window === 'undefined') {
      return getDefaultBusinessSettings()
    }
    
-   const stored = localStorage.getItem('businessSettings')
+   const stored = await StorageAdapter.getItem('businessSettings')
    if (!stored) return getDefaultBusinessSettings()
    
    try {
      return { ...getDefaultBusinessSettings(), ...JSON.parse(stored) }
-   } catch {
+   } catch (error) {
      return getDefaultBusinessSettings()
    }
  }
```

### Change 3: Update getOrderSettings
**Location**: Lines 60-73

```diff
- export function getOrderSettings(): OrderSettings {
+ export async function getOrderSettings(): Promise<OrderSettings> {
    if (typeof window === 'undefined') {
      return getDefaultOrderSettings()
    }
    
-   const stored = localStorage.getItem('orderSettings')
+   const stored = await StorageAdapter.getItem('orderSettings')
    if (!stored) return getDefaultOrderSettings()
    
    try {
      return { ...getDefaultOrderSettings(), ...JSON.parse(stored) }
-   } catch {
+   } catch (error) {
      return getDefaultOrderSettings()
    }
  }
```

### Change 4: Update getRecipeSettings
**Location**: Lines 76-89

```diff
- export function getRecipeSettings(): RecipeSettings {
+ export async function getRecipeSettings(): Promise<RecipeSettings> {
    if (typeof window === 'undefined') {
      return getDefaultRecipeSettings()
    }
    
-   const stored = localStorage.getItem('recipeSettings')
+   const stored = await StorageAdapter.getItem('recipeSettings')
    if (!stored) return getDefaultRecipeSettings()
    
    try {
      return { ...getDefaultRecipeSettings(), ...JSON.parse(stored) }
-   } catch {
+   } catch (error) {
      return getDefaultRecipeSettings()
    }
  }
```

### Change 5: Add Setter Functions (Optional)
**Location**: End of file, before exports

```diff
+ // Set business settings
+ export async function setBusinessSettings(settings: BusinessSettings): Promise<void> {
+   await StorageAdapter.setItem('businessSettings', JSON.stringify(settings))
+ }
+ 
+ // Set order settings
+ export async function setOrderSettings(settings: OrderSettings): Promise<void> {
+   await StorageAdapter.setItem('orderSettings', JSON.stringify(settings))
+ }
+ 
+ // Set recipe settings
+ export async function setRecipeSettings(settings: RecipeSettings): Promise<void> {
+   await StorageAdapter.setItem('recipeSettings', JSON.stringify(settings))
+ }
```

---

## File 3: Components Using Settings

### Example: Dashboard.tsx or any component using settings

**Before:**
```typescript
import { getBusinessSettings, getDefaultMarkup } from '../utils/settings'

export function Dashboard() {
  const settings = getBusinessSettings()
  const markup = getDefaultMarkup()
  
  return <div>{settings.currency}</div>
}
```

**After:**
```typescript
import { getBusinessSettings, getDefaultMarkup } from '../utils/settings'
import { useState, useEffect } from 'react'

export function Dashboard() {
  const [settings, setSettings] = useState(null)
  const [markup, setMarkup] = useState(0)
  
  useEffect(() => {
    getBusinessSettings().then(setSettings)
    getDefaultMarkup().then(setMarkup)
  }, [])
  
  if (!settings) return <div>Loading...</div>
  
  return <div>{settings.currency}</div>
}
```

**Or use a custom hook (recommended):**
```typescript
// Create: hooks/useSettings.ts
import { useState, useEffect } from 'react'
import { getBusinessSettings, getOrderSettings, getRecipeSettings } from '../utils/settings'

export function useSettings() {
  const [business, setBusiness] = useState(null)
  const [order, setOrder] = useState(null)
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    Promise.all([
      getBusinessSettings(),
      getOrderSettings(),
      getRecipeSettings()
    ]).then(([b, o, r]) => {
      setBusiness(b)
      setOrder(o)
      setRecipe(r)
      setLoading(false)
    })
  }, [])
  
  return { business, order, recipe, loading }
}

// Usage in component:
import { useSettings } from '../hooks/useSettings'

export function Dashboard() {
  const { business, loading } = useSettings()
  
  if (loading) return <div>Loading...</div>
  return <div>{business.currency}</div>
}
```

---

## Summary of Changes

| File | Changes | Complexity | Time |
|------|---------|-----------|------|
| BakeryDataContext.tsx | 6 changes | Medium | 1-2 hours |
| settings.ts | 5 changes | Low | 30 min |
| Components | Varies | Low-Medium | 1-2 hours |
| **Total** | | | **2-4.5 hours** |

## Testing Each Change

After each change:
1. Run `npm run dev`
2. Check browser console for errors
3. Verify data loads correctly
4. Verify data saves correctly
5. Test in DevTools → Application → IndexedDB

## Rollback Plan

If issues occur:
1. Revert all changes to use localStorage
2. Keep IndexedDB code for future use
3. No data loss (IndexedDB data preserved)
4. Users unaffected
