# IndexedDB Migration Guide

## Overview

This document outlines the migration from localStorage to IndexedDB for the BakeProfit bakery management tool. The migration uses an **Adapter Pattern** to minimize code changes across the application.

## Current Architecture

### Storage Layer
- **Primary Storage**: localStorage (6 main data stores)
- **Settings Storage**: localStorage (3 settings stores)
- **Limitation**: ~5-10MB per domain (varies by browser)

### Data Stores
1. `bakery-recipes` - Recipe definitions
2. `bakery-orders` - Customer orders
3. `bakery-customers` - Customer information
4. `bakery-ingredients` - Ingredient master data
5. `bakery-inventory` - Inventory tracking
6. `bakery-recipe-categories` - Recipe categories
7. `businessSettings` - Business configuration
8. `orderSettings` - Order configuration
9. `recipeSettings` - Recipe configuration

### Code Organization
```
app/bakery-business-tool/
├── contexts/
│   └── BakeryDataContext.tsx (all localStorage logic)
├── hooks/
│   ├── useRecipes.ts
│   ├── useOrders.ts
│   ├── useCustomers.ts
│   ├── useIngredients.ts
│   ├── useInventory.ts
│   ├── usePricing.ts
│   ├── useAnalytics.ts
│   └── index.ts
├── utils/
│   ├── settings.ts (localStorage for settings)
│   └── indexedDBAdapter.ts (NEW - IndexedDB wrapper)
└── components/
    └── (12 components - no storage logic)
```

## Migration Strategy

### Adapter Pattern Benefits
- ✅ Single point of change for storage logic
- ✅ Automatic fallback to localStorage if IndexedDB fails
- ✅ No changes needed in hooks or components
- ✅ Minimal changes to context and settings files
- ✅ Easy to test and debug

### Files to Modify

#### 1. **Create**: `utils/indexedDBAdapter.ts` ✅ DONE
- Provides `StorageAdapter` object with async methods
- Methods: `getItem()`, `setItem()`, `removeItem()`, `clear()`
- Automatic fallback to localStorage on error
- Includes migration helper: `migrateFromLocalStorage()`

#### 2. **Modify**: `contexts/BakeryDataContext.tsx`
Replace all `localStorage` calls with `StorageAdapter`:
```typescript
// BEFORE
localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(recipes))

// AFTER
await StorageAdapter.setItem(STORAGE_KEYS.recipes, JSON.stringify(recipes))
```

Changes needed:
- Import `StorageAdapter` from utils
- Convert useEffect hooks to handle async operations
- Wrap storage calls in try-catch blocks
- Update loading logic to handle async initialization

#### 3. **Modify**: `utils/settings.ts`
Replace all `localStorage` calls with `StorageAdapter`:
```typescript
// BEFORE
const stored = localStorage.getItem('businessSettings')

// AFTER
const stored = await StorageAdapter.getItem('businessSettings')
```

Changes needed:
- Import `StorageAdapter` from indexedDBAdapter
- Convert functions to async
- Update all getter functions to handle promises

## Implementation Steps

### Step 1: Update BakeryDataContext.tsx

**Changes:**
1. Import StorageAdapter
2. Modify initial load useEffect to be async
3. Modify all auto-save useEffects to handle async operations
4. Add migration call on first load

```typescript
import { StorageAdapter, migrateFromLocalStorage } from '../utils/indexedDBAdapter'

// In BakeryDataProvider component:
useEffect(() => {
  const loadData = async () => {
    try {
      // Migrate from localStorage on first load
      await migrateFromLocalStorage()
      
      const loadedRecipes = await StorageAdapter.getItem(STORAGE_KEYS.recipes)
      // ... rest of loading logic
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  loadData()
}, [])

// For auto-save effects:
useEffect(() => {
  if (!isLoading && recipes.length >= 0) {
    StorageAdapter.setItem(STORAGE_KEYS.recipes, JSON.stringify(recipes))
      .catch(error => console.error('Error saving recipes:', error))
  }
}, [recipes, isLoading])
```

### Step 2: Update settings.ts

**Changes:**
1. Import StorageAdapter
2. Convert all getter functions to async
3. Update all callers to handle promises

```typescript
import { StorageAdapter } from './indexedDBAdapter'

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

### Step 3: Update Components Using Settings

Components that call settings functions need to handle async:
- `Dashboard.tsx`
- `RecipeCalculator.tsx`
- `PricingCalculator.tsx`
- `Settings.tsx`

Example:
```typescript
// BEFORE
const markup = getDefaultMarkup()

// AFTER
const [markup, setMarkup] = useState(0)
useEffect(() => {
  getDefaultMarkup().then(setMarkup)
}, [])
```

## IndexedDB Schema

### Database: BakeProfitDB (v1)

| Store | Key Path | Purpose |
|-------|----------|---------|
| recipes | id | Recipe definitions |
| orders | id | Customer orders |
| customers | id | Customer data |
| ingredients | id | Ingredient master |
| inventory | ingredientId | Stock tracking |
| categories | (custom) | Recipe categories |
| businessSettings | (custom) | Business config |
| orderSettings | (custom) | Order config |
| recipeSettings | (custom) | Recipe config |

## Storage Capacity

| Storage | Capacity | Notes |
|---------|----------|-------|
| localStorage | 5-10MB | Synchronous, limited |
| IndexedDB | 50MB+ | Async, quota-based |
| Quota | Browser-dependent | Can request persistent storage |

## Backward Compatibility

The adapter automatically handles:
- ✅ Fallback to localStorage if IndexedDB unavailable
- ✅ Graceful degradation on errors
- ✅ Migration from localStorage to IndexedDB
- ✅ Mixed storage (some data in IndexedDB, some in localStorage)

## Testing Checklist

- [ ] Data loads correctly on app startup
- [ ] Data persists after page refresh
- [ ] Settings are saved and loaded correctly
- [ ] Recipes can be created, updated, deleted
- [ ] Orders can be created, updated, deleted
- [ ] Customers can be created, updated, deleted
- [ ] Ingredients can be created, updated, deleted
- [ ] Inventory tracking works correctly
- [ ] Analytics calculations are correct
- [ ] Export/import functionality works
- [ ] Clear all data works correctly
- [ ] Works in private/incognito mode (fallback to localStorage)
- [ ] Works with large datasets (1000+ recipes)
- [ ] Performance is acceptable

## Performance Improvements

### Before (localStorage)
- Synchronous operations block UI
- Entire dataset loaded on startup
- Limited storage capacity
- Slower with large datasets

### After (IndexedDB)
- Async operations don't block UI
- Can implement lazy loading
- Unlimited storage (50MB+)
- Better performance with large datasets
- Can implement indexing for faster queries

## Future Enhancements

1. **Lazy Loading**: Load data on-demand instead of all at startup
2. **Indexing**: Add indexes for faster queries (e.g., by date, category)
3. **Sync**: Implement cloud sync with backend
4. **Offline**: Better offline support with service workers
5. **Backup**: Automatic backup to cloud storage
6. **Export**: Export data to CSV/JSON with better performance

## Troubleshooting

### Issue: Data not persisting
**Solution**: Check browser DevTools → Application → IndexedDB to verify data is being stored

### Issue: "IndexedDB not available" warning
**Solution**: App falls back to localStorage automatically. Check browser privacy settings.

### Issue: Migration not working
**Solution**: Clear browser cache and localStorage, then reload. Check console for errors.

### Issue: Performance still slow
**Solution**: Check DevTools Performance tab. May need to implement lazy loading or pagination.

## References

- [MDN: IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Browser Storage Limits](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API)
- [IndexedDB Best Practices](https://web.dev/indexeddb/)

## Support

For questions or issues with the migration, refer to:
1. This document
2. Code comments in `indexedDBAdapter.ts`
3. Browser DevTools IndexedDB inspector
4. Console logs (search for "IndexedDB" or "StorageAdapter")
