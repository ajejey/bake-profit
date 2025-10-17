import connectDB from './mongodb';
import UsageTrackingModel from './models/UsageTracking';
import { UsageStats } from '@/types/subscription';

/**
 * Get current month in YYYY-MM format
 */
function getCurrentMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

/**
 * Get usage stats for a user for the current month
 */
export async function getUsageStats(userId: string): Promise<UsageStats> {
  await connectDB();
  
  const month = getCurrentMonth();
  const usage = await UsageTrackingModel.findOne({ user_id: userId, month }).lean();

  if (!usage) {
    // No usage record yet, return zeros
    return {
      recipes: 0,
      ordersThisMonth: 0,
      customers: 0,
      inventoryItems: 0,
    };
  }

  return {
    recipes: usage.recipes_count || 0,
    ordersThisMonth: usage.orders_count || 0,
    customers: usage.customers_count || 0,
    inventoryItems: usage.inventory_count || 0,
  };
}

/**
 * Increment usage count for a specific type
 */
export async function incrementUsage(
  userId: string,
  type: 'recipes' | 'orders' | 'customers' | 'inventory'
): Promise<void> {
  await connectDB();
  
  const month = getCurrentMonth();
  const fieldMap = {
    recipes: 'recipes_count',
    orders: 'orders_count',
    customers: 'customers_count',
    inventory: 'inventory_count',
  };

  const field = fieldMap[type];

  // Upsert: insert if not exists, increment if exists
  await UsageTrackingModel.findOneAndUpdate(
    { user_id: userId, month },
    { $inc: { [field]: 1 } },
    { upsert: true, new: true }
  );
}

/**
 * Decrement usage count for a specific type (when user deletes something)
 */
export async function decrementUsage(
  userId: string,
  type: 'recipes' | 'orders' | 'customers' | 'inventory'
): Promise<void> {
  await connectDB();
  
  const month = getCurrentMonth();
  const fieldMap = {
    recipes: 'recipes_count',
    orders: 'orders_count',
    customers: 'customers_count',
    inventory: 'inventory_count',
  };

  const field = fieldMap[type];

  // Decrement, but don't go below 0
  const usage = await UsageTrackingModel.findOne({ user_id: userId, month });
  
  if (usage && usage[field as keyof typeof usage] > 0) {
    await UsageTrackingModel.findOneAndUpdate(
      { user_id: userId, month },
      { $inc: { [field]: -1 } }
    );
  }
}

/**
 * Set usage count directly (for syncing from localStorage)
 */
export async function setUsageCount(
  userId: string,
  counts: Partial<UsageStats>
): Promise<void> {
  await connectDB();
  
  const month = getCurrentMonth();

  await UsageTrackingModel.findOneAndUpdate(
    { user_id: userId, month },
    {
      $set: {
        recipes_count: counts.recipes || 0,
        orders_count: counts.ordersThisMonth || 0,
        customers_count: counts.customers || 0,
        inventory_count: counts.inventoryItems || 0,
      }
    },
    { upsert: true, new: true }
  );
}
