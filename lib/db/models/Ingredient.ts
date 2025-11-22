import mongoose, { Schema, Model } from 'mongoose';

export interface IIngredient {
  _id: string;
  id?: string; // Optional: Preserves original ID for sample data compatibility
  userId: string;
  name: string;
  cost: number;
  unit: string;
  packageSize: number;
  packageCost: number;
  currentStock?: number;
  minStock?: number;
  expirationDate?: string;
  supplierId?: string;
  created_at: Date;
  updated_at: Date;
}

const IngredientSchema = new Schema<IIngredient>(
  {
    _id: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: false, // Optional: Preserves original ID for sample data
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    packageSize: {
      type: Number,
      required: true,
    },
    packageCost: {
      type: Number,
      required: true,
    },
    currentStock: {
      type: Number,
      required: false,
    },
    minStock: {
      type: Number,
      required: false,
    },
    expirationDate: {
      type: String,
      required: false,
    },
    supplierId: {
      type: String,
      required: false,
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
IngredientSchema.index({ userId: 1, name: 1 });

const IngredientModel: Model<IIngredient> = mongoose.models.Ingredient || mongoose.model<IIngredient>('Ingredient', IngredientSchema);

export default IngredientModel;
