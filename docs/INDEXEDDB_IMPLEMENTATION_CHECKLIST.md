# IndexedDB Migration - Implementation Checklist

## Phase 1: Foundation ✅ COMPLETE

- [x] Create `utils/indexedDBAdapter.ts` with StorageAdapter
- [x] Implement async getItem/setItem/removeItem/clear
- [x] Add automatic fallback to localStorage
- [x] Add migration helper function
- [x] Add availability check function
- [x] Document schema and design

## Phase 2: Update BakeryDataContext.tsx

### File: `contexts/BakeryDataContext.tsx`

#### 2.1 Add Import
```typescript
import { StorageAdapter, migrateFromLocalStorage } from '../utils/indexedDBAdapter'
```
- [ ] Add import statement at top of file

#### 2.2 Update Initial Load Effect
Current code (lines 83-129):
```typescript
useEffect(() => {
  if (!isLocalStorageAvailable) {
    console.warn('localStorage is not available')
    setIsLoading(false)
    return
  }

  try {
    const loadedRecipes = localStorage.getItem(STORAGE_KEYS.recipes)
    // ... more localStorage calls
  } catch (error) {
    console.error('Error loading data from localStorage:', error)
  } finally {
    setIsLoading(false)
  }
}, [isLocalStorageAvailable])
```

Changes needed:
- [ ] Make useEffect callback async
- [ ] Call `await migrateFromLocalStorage()` at start
- [ ] Replace all `localStorage.getItem()` with `await StorageAdapter.getItem()`
- [ ] Update error messages to mention IndexedDB

New code:
```typescript
useEffect(() => {
  const loadData = async () => {
    try {
      // Migrate from localStorage on first load
      await migrateFromLocalStorage()
      
      const loadedRecipes = await StorageAdapter.getItem(STORAGE_KEYS.recipes)
      const loadedOrders = await StorageAdapter.getItem(STORAGE_KEYS.orders)
      const loadedCustomers = await StorageAdapter.getItem(STORAGE_KEYS.customers)
      const loadedIngredients = await StorageAdapter.getItem(STORAGE_KEYS.ingredients)
      const loadedInventory = await StorageAdapter.getItem(STORAGE_KEYS.inventory)
      const loadedCategories = await StorageAdapter.getItem(STORAGE_KEYS.categories)

      // Load and migrate recipes if needed
      if (loadedRecipes) {
        const parsedRecipes: Recipe[] = JSON.parse(loadedRecipes)
        // ... rest of migration logic
      }
      
      if (loadedOrders) setOrders(JSON.parse(loadedOrders))
      if (loadedCustomers) setCustomers(JSON.parse(loadedCustomers))
      if (loadedIngredients) setIngredients(JSON.parse(loadedIngredients))
      if (loadedInventory) setInventory(JSON.parse(loadedInventory))
      if (loadedCategories) setRecipeCategories(JSON.parse(loadedCategories))

      console.log('✅ Bakery data loaded from IndexedDB')
    } catch (error) {
      console.error('Error loading data from IndexedDB:', error)
    } finally {
      setIsLoading(false)
    }
  }

  loadData()
}, [])
```

#### 2.3 Update Auto-Save Effects

There are 5 auto-save effects (lines 132-195). For each:

**Recipe Auto-Save** (lines 132-140):
- [ ] Replace `localStorage.setItem()` with `StorageAdapter.setItem()`
- [ ] Add `.catch()` for error handling

```typescript
useEffect(() => {
  if (!isLoading && recipes.length >= 0) {
    StorageAdapter.setItem(STORAGE_KEYS.recipes, JSON.stringify(recipes))
      .catch(error => console.error('Error saving recipes:', error))
  }
}, [recipes, isLoading])
```

**Order Auto-Save** (lines 143-151):
- [ ] Same changes as recipe auto-save

**Customer Auto-Save** (lines 154-162):
- [ ] Same changes as recipe auto-save

**Ingredient Auto-Save** (lines 165-173):
- [ ] Same changes as recipe auto-save

**Inventory Auto-Save** (lines 176-184):
- [ ] Same changes as recipe auto-save

**Category Auto-Save** (lines 187-195):
- [ ] Same changes as recipe auto-save

#### 2.4 Update clearAllData Function
Find the `clearAllData` function and update:
```typescript
const clearAllData = useCallback(() => {
  setRecipes([])
  setOrders([])
  setCustomers([])
  setIngredients([])
  setInventory([])
  setRecipeCategories(DEFAULT_RECIPE_CATEGORIES)
  
  StorageAdapter.clear()
    .catch(error => console.error('Error clearing storage:', error))
}, [])
```
- [ ] Add `StorageAdapter.clear()` call

#### 2.5 Remove isLocalStorageAvailable Check
- [ ] Remove or update the `isLocalStorageAvailable` variable
- [ ] It's no longer needed since StorageAdapter handles availability

## Phase 3: Update settings.ts

### File: `utils/settings.ts`

#### 3.1 Add Import
```typescript
import { StorageAdapter } from './indexedDBAdapter'
```
- [ ] Add import statement at top

#### 3.2 Update getBusinessSettings Function
Current (lines 44-57):
```typescript
export function getBusinessSettings(): BusinessSettings {
  if (typeof window === 'undefined') {
    return getDefaultBusinessSettings()
  }
  
  const stored = localStorage.getItem('businessSettings')
  if (!stored) return getDefaultBusinessSettings()
  
  try {
    return { ...getDefaultBusinessSettings(), ...JSON.parse(stored) }
  } catch {
    return getDefaultBusinessSettings()
  }
}
```

Changes:
- [ ] Make function async: `export async function`
- [ ] Replace `localStorage.getItem()` with `await StorageAdapter.getItem()`

New code:
```typescript
export async function getBusinessSettings(): Promise<BusinessSettings> {
  if (typeof window === 'undefined') {
    return getDefaultBusinessSettings()
  }
  
  const stored = await StorageAdapter.getItem('businessSettings')
  if (!stored) return getDefaultBusinessSettings()
  
  try {
    return { ...getDefaultBusinessSettings(), ...JSON.parse(stored) }
  } catch {
    return getDefaultBusinessSettings()
  }
}
```

#### 3.3 Update getOrderSettings Function
- [ ] Make async
- [ ] Replace localStorage with StorageAdapter

#### 3.4 Update getRecipeSettings Function
- [ ] Make async
- [ ] Replace localStorage with StorageAdapter

#### 3.5 Add Setter Functions (Optional but Recommended)
Add functions to save settings:
```typescript
export async function setBusinessSettings(settings: BusinessSettings): Promise<void> {
  await StorageAdapter.setItem('businessSettings', JSON.stringify(settings))
}

export async function setOrderSettings(settings: OrderSettings): Promise<void> {
  await StorageAdapter.setItem('orderSettings', JSON.stringify(settings))
}

export async function setRecipeSettings(settings: RecipeSettings): Promise<void> {
  await StorageAdapter.setItem('recipeSettings', JSON.stringify(settings))
}
```
- [ ] Add setter functions for business settings
- [ ] Add setter functions for order settings
- [ ] Add setter functions for recipe settings

## Phase 4: Update Components Using Settings

### Components to Update

Find all components that call settings functions and update them to handle async:

#### 4.1 Dashboard.tsx
- [ ] Find calls to `getBusinessSettings()`, `getOrderSettings()`, `getRecipeSettings()`
- [ ] Wrap in useEffect with state management
- [ ] Example:
```typescript
const [businessSettings, setBusinessSettings] = useState<BusinessSettings | null>(null)

useEffect(() => {
  getBusinessSettings().then(setBusinessSettings)
}, [])
```

#### 4.2 RecipeCalculator.tsx
- [ ] Update calls to `getDefaultMarkup()`, `getDefaultLaborCost()`, `getDefaultOverhead()`, `getDefaultServings()`
- [ ] These need to be made async or cached

#### 4.3 PricingCalculator.tsx
- [ ] Update calls to settings functions
- [ ] Handle async operations

#### 4.4 Settings.tsx
- [ ] Update to use new setter functions
- [ ] Add save functionality

#### 4.5 Other Components
- [ ] Search for all imports of `settings.ts`
- [ ] Update each usage to handle async

## Phase 5: Testing

### Functional Testing
- [ ] App loads without errors
- [ ] Data persists after page refresh
- [ ] Can create new recipe
- [ ] Can create new order
- [ ] Can create new customer
- [ ] Can create new ingredient
- [ ] Can update inventory
- [ ] Can delete items
- [ ] Settings save and load correctly

### Data Integrity Testing
- [ ] Existing localStorage data migrates to IndexedDB
- [ ] No data loss during migration
- [ ] Recipes with all fields intact
- [ ] Orders with all items intact
- [ ] Customers with order history intact
- [ ] Ingredients with all properties intact

### Performance Testing
- [ ] App loads in < 2 seconds
- [ ] Saving data doesn't block UI
- [ ] Can handle 1000+ recipes
- [ ] Can handle 1000+ orders
- [ ] Analytics calculations are fast

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers
- [ ] Private/Incognito mode (fallback to localStorage)

### Error Handling
- [ ] Graceful fallback if IndexedDB unavailable
- [ ] Proper error messages in console
- [ ] No data loss on errors
- [ ] Recovery on next load

## Phase 6: Documentation & Cleanup

- [ ] Update README with new storage info
- [ ] Add comments to indexedDBAdapter.ts
- [ ] Add comments to modified context
- [ ] Add comments to modified settings
- [ ] Document any breaking changes
- [ ] Update deployment notes
- [ ] Create migration guide for users

## Phase 7: Deployment

- [ ] Code review
- [ ] Test in staging environment
- [ ] Monitor for errors in production
- [ ] Collect user feedback
- [ ] Be ready to rollback if needed

## Estimated Effort

| Phase | Effort | Time |
|-------|--------|------|
| Phase 1 (Foundation) | ✅ Complete | Done |
| Phase 2 (Context) | Medium | 1-2 hours |
| Phase 3 (Settings) | Small | 30 min |
| Phase 4 (Components) | Medium | 1-2 hours |
| Phase 5 (Testing) | Large | 2-3 hours |
| Phase 6 (Documentation) | Small | 30 min |
| Phase 7 (Deployment) | Small | 1 hour |
| **Total** | | **6-9 hours** |

## Notes

- All changes are backward compatible
- Automatic fallback to localStorage if IndexedDB fails
- No changes needed in hooks or most components
- Settings functions becoming async is the main breaking change
- Can be done incrementally (one component at a time)

## Questions?

Refer to:
1. `INDEXEDDB_MIGRATION.md` - Full documentation
2. `indexedDBAdapter.ts` - Implementation details
3. Browser DevTools - Inspect IndexedDB data
4. Console logs - Debug storage operations
