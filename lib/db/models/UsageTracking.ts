import mongoose, { Schema, Model } from 'mongoose';

export interface IUsageTracking {
  _id: string;
  user_id: string;
  month: string; // Format: 'YYYY-MM'
  recipes_count: number;
  orders_count: number;
  customers_count: number;
  inventory_count: number;
  updated_at: Date;
}

const UsageTrackingSchema = new Schema<IUsageTracking>(
  {
    user_id: {
      type: String,
      required: true,
      index: true,
    },
    month: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}$/, // YYYY-MM format
    },
    recipes_count: {
      type: Number,
      default: 0,
      min: 0,
    },
    orders_count: {
      type: Number,
      default: 0,
      min: 0,
    },
    customers_count: {
      type: Number,
      default: 0,
      min: 0,
    },
    inventory_count: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: 'updated_at',
    },
  }
);

// Compound index for user_id + month (unique)
UsageTrackingSchema.index({ user_id: 1, month: 1 }, { unique: true });

const UsageTrackingModel: Model<IUsageTracking> = 
  mongoose.models.UsageTracking || mongoose.model<IUsageTracking>('UsageTracking', UsageTrackingSchema);

export default UsageTrackingModel;
