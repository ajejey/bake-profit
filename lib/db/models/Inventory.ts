import mongoose, { Schema, Model } from 'mongoose';

export interface IInventoryItem {
  _id: string;
  userId: string;
  ingredientId: string;
  currentStock: number;
  minStock: number;
  maxStock?: number;
  unit: string;
  lastUpdated: string;
  lastRestocked?: string;
  expirationDate?: string;
  supplier?: string;
  costPerUnit: number;
  created_at: Date;
  updated_at: Date;
}

const InventorySchema = new Schema<IInventoryItem>(
  {
    _id: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    ingredientId: {
      type: String,
      required: true,
    },
    currentStock: {
      type: Number,
      required: true,
    },
    minStock: {
      type: Number,
      required: true,
    },
    maxStock: {
      type: Number,
      required: false,
    },
    unit: {
      type: String,
      required: true,
    },
    lastUpdated: {
      type: String,
      required: true,
    },
    lastRestocked: {
      type: String,
      required: false,
    },
    expirationDate: {
      type: String,
      required: false,
    },
    supplier: {
      type: String,
      required: false,
    },
    costPerUnit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// Index for faster queries
InventorySchema.index({ userId: 1, ingredientId: 1 });
InventorySchema.index({ userId: 1, currentStock: 1 });

const InventoryModel: Model<IInventoryItem> = mongoose.models.Inventory || mongoose.model<IInventoryItem>('Inventory', InventorySchema);

export default InventoryModel;
