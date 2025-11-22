import connectDB from './mongodb';
import RecipeModel, { IRecipe } from './models/Recipe';
import OrderModel, { IOrder } from './models/Order';
import CustomerModel, { ICustomer } from './models/Customer';
import IngredientModel, { IIngredient } from './models/Ingredient';
import InventoryModel, { IInventoryItem } from './models/Inventory';
import BusinessSettingsModel, { IBusinessSettings } from './models/BusinessSettings';

/**
 * Sync data from frontend to MongoDB
 * Handles create, update, delete operations
 */

export interface SyncChange<T> {
  action: 'create' | 'update' | 'delete';
  id?: string;
  data?: T;
}

export interface SyncPayload {
  userId: string;
  timestamp: string;
  recipes?: SyncChange<IRecipe>[];
  orders?: SyncChange<IOrder>[];
  customers?: SyncChange<ICustomer>[];
  ingredients?: SyncChange<IIngredient>[];
  inventory?: SyncChange<IInventoryItem>[];
  businessSettings?: IBusinessSettings;
}

/**
 * Process recipe changes
 * IMPORTANT: Preserves the original 'id' field for sample data compatibility
 */
export async function syncRecipes(userId: string, changes: SyncChange<IRecipe>[]): Promise<void> {
  await connectDB();

  for (const change of changes) {
    try {
      const docId = change.data?._id || change.id;
      if (!docId) continue;

      const db = RecipeModel.collection;

      switch (change.action) {
        case 'create':
        case 'update':
          if (change.data) {
            // Preserve the original 'id' field if it exists (important for sample data)
            const dataToSave = {
              ...change.data,
              _id: docId,
              id: change.data.id || docId, // Preserve 'id' field
              userId
            };

            await db.replaceOne(
              { _id: docId } as any,
              dataToSave as any,
              { upsert: true }
            );
          }
          break;

        case 'delete':
          await db.deleteOne({ _id: docId, userId } as any);
          break;
      }
    } catch (error) {
      console.error(`Error syncing recipe ${change.id}:`, error);
      throw error;
    }
  }
}

/**
 * Process order changes
 */
export async function syncOrders(userId: string, changes: SyncChange<IOrder>[]): Promise<void> {
  await connectDB();

  for (const change of changes) {
    try {
      const docId = change.data?._id || change.id;
      if (!docId) continue;

      const db = OrderModel.collection;

      switch (change.action) {
        case 'create':
        case 'update':
          if (change.data) {
            await db.replaceOne(
              { _id: docId } as any,
              { ...change.data, _id: docId, userId } as any,
              { upsert: true }
            );
          }
          break;

        case 'delete':
          await db.deleteOne({ _id: docId, userId } as any);
          break;
      }
    } catch (error) {
      console.error(`Error syncing order ${change.id}:`, error);
      throw error;
    }
  }
}

/**
 * Process customer changes
 */
export async function syncCustomers(userId: string, changes: SyncChange<ICustomer>[]): Promise<void> {
  await connectDB();

  for (const change of changes) {
    try {
      const docId = change.data?._id || change.id;
      if (!docId) continue;

      const db = CustomerModel.collection;

      switch (change.action) {
        case 'create':
        case 'update':
          if (change.data) {
            await db.replaceOne(
              { _id: docId } as any,
              { ...change.data, _id: docId, userId } as any,
              { upsert: true }
            );
          }
          break;

        case 'delete':
          await db.deleteOne({ _id: docId, userId } as any);
          break;
      }
    } catch (error) {
      console.error(`Error syncing customer ${change.id}:`, error);
      throw error;
    }
  }
}

/**
 * Process ingredient changes
 * IMPORTANT: Preserves the original 'id' field for sample data compatibility
 */
export async function syncIngredients(userId: string, changes: SyncChange<IIngredient>[]): Promise<void> {
  await connectDB();

  for (const change of changes) {
    try {
      const docId = change.data?._id || change.id;
      if (!docId) continue;

      const db = IngredientModel.collection;

      switch (change.action) {
        case 'create':
        case 'update':
          if (change.data) {
            // Preserve the original 'id' field if it exists (important for sample data)
            const dataToSave = {
              ...change.data,
              _id: docId,
              id: change.data.id || docId, // Preserve 'id' field
              userId
            };

            await db.replaceOne(
              { _id: docId } as any,
              dataToSave as any,
              { upsert: true }
            );
          }
          break;

        case 'delete':
          await db.deleteOne({ _id: docId, userId } as any);
          break;
      }
    } catch (error) {
      console.error(`Error syncing ingredient ${change.id}:`, error);
      throw error;
    }
  }
}

/**
 * Process inventory changes
 */
export async function syncInventory(userId: string, changes: SyncChange<IInventoryItem>[]): Promise<void> {
  await connectDB();

  for (const change of changes) {
    try {
      const docId = change.data?._id || change.id;
      if (!docId) continue;

      const db = InventoryModel.collection;

      switch (change.action) {
        case 'create':
        case 'update':
          if (change.data) {
            await db.replaceOne(
              { _id: docId } as any,
              { ...change.data, _id: docId, userId } as any,
              { upsert: true }
            );
          }
          break;

        case 'delete':
          await db.deleteOne({ _id: docId, userId } as any);
          break;
      }
    } catch (error) {
      console.error(`Error syncing inventory ${change.id}:`, error);
      throw error;
    }
  }
}

/**
 * Sync business settings (upsert - single document per user)
 */
export async function syncBusinessSettings(userId: string, settings: IBusinessSettings): Promise<void> {
  await connectDB();

  try {
    await BusinessSettingsModel.findOneAndUpdate(
      { userId },
      { ...settings, userId },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error(`Error syncing business settings for user ${userId}:`, error);
    throw error;
  }
}

/**
 * Process complete sync payload
 */
export async function processSyncPayload(payload: SyncPayload): Promise<void> {
  const { userId, recipes, orders, customers, ingredients, inventory, businessSettings } = payload;

  try {
    if (recipes && recipes.length > 0) {
      await syncRecipes(userId, recipes);
    }

    if (orders && orders.length > 0) {
      await syncOrders(userId, orders);
    }

    if (customers && customers.length > 0) {
      await syncCustomers(userId, customers);
    }

    if (ingredients && ingredients.length > 0) {
      await syncIngredients(userId, ingredients);
    }

    if (inventory && inventory.length > 0) {
      await syncInventory(userId, inventory);
    }

    if (businessSettings) {
      await syncBusinessSettings(userId, businessSettings);
    }

    console.log(`✅ Sync completed for user ${userId}`);
  } catch (error) {
    console.error(`❌ Sync failed for user ${userId}:`, error);
    throw error;
  }
}

/**
 * Fetch all user data from MongoDB
 * Used for pulling data to frontend (cross-device sync)
 */
export async function fetchUserData(userId: string) {
  await connectDB();

  try {
    const [recipes, orders, customers, ingredients, inventory, businessSettings] = await Promise.all([
      RecipeModel.find({ userId }),
      OrderModel.find({ userId }),
      CustomerModel.find({ userId }),
      IngredientModel.find({ userId }),
      InventoryModel.find({ userId }),
      BusinessSettingsModel.findOne({ userId }),
    ]);

    return {
      recipes,
      orders,
      customers,
      ingredients,
      inventory,
      businessSettings,
    };
  } catch (error) {
    console.error(`Error fetching user data for ${userId}:`, error);
    throw error;
  }
}
