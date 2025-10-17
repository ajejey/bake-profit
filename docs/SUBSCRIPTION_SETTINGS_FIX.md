# Subscription Settings - Usage Wired to Local Data

## Issue Found:
The SubscriptionSettings component was using the global SubscriptionContext which fetches usage from an API. However, in the bakery-business-tool, all data is stored locally in BakeryDataContext, so the usage stats were not reflecting the actual local data.

## Fix Applied:

**File:** components/settings/SubscriptionSettings.tsx

**Changes:**
1. Added import for useBakeryData hook
2. Destructured local data (recipes, orders, customers, inventory)
3. Created useMemo to calculate usage from local data
4. Filters orders by current month/year for accurate monthly count

## What Now Works:

1. **Recipes Count** - Shows actual number of recipes from local storage
2. **Orders This Month** - Calculates orders from current month only
3. **Customers Count** - Shows actual number of customers
4. **Inventory Items** - Shows actual number of inventory items tracked

All usage stats update in real-time as you add/delete items!

## Testing:
1. Go to Settings → Subscription
2. Note current counts
3. Add a recipe/order/customer/inventory item
4. Return to Settings → Subscription
5. Counts should be updated immediately

**The SubscriptionSettings component is now properly wired to the bakery-business-tool local data context!**
