import mongoose, { Schema, Model } from 'mongoose';

export interface ICustomer {
  _id: string;
  userId: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  orderHistory: string[];
  totalOrders: number;
  totalSpent: number;
  notes: string;
  created_at: Date;
  updated_at: Date;
}

const CustomerSchema = new Schema<ICustomer>(
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
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    orderHistory: {
      type: [String],
      default: [],
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: '',
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
CustomerSchema.index({ userId: 1, name: 1 });
CustomerSchema.index({ userId: 1, email: 1 });

const CustomerModel: Model<ICustomer> = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);

export default CustomerModel;
