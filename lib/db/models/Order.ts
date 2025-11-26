import mongoose, { Schema, Model } from 'mongoose';

export interface IOrderItem {
  id: string;
  recipeId: string;
  recipeName: string;
  quantity: number;
  costPerUnit: number;
  pricePerUnit: number;
  subtotalCost: number;
  subtotalRevenue: number;
  profit: number;
}

export interface IOrder {
  _id: string;
  userId: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  items: IOrderItem[];
  status: 'new' | 'in-progress' | 'ready' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate: string;
  deliveryTime?: string;
  totalCost: number;
  totalRevenue: number;
  totalProfit: number;
  notes: string;
  deliveryAddress?: string;
  paymentStatus?: 'unpaid' | 'partial' | 'paid';
  paymentMethod?: string;
  source?: 'manual' | 'menu' | 'api'; // Track where the order came from
  created_at: Date;
  updated_at: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    id: {
      type: String,
      required: true,
    },
    recipeId: {
      type: String,
      required: true,
    },
    recipeName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    costPerUnit: {
      type: Number,
      required: true,
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    subtotalCost: {
      type: Number,
      required: true,
    },
    subtotalRevenue: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
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
    orderNumber: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: false,
      index: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: false,
    },
    customerEmail: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },
    items: {
      type: [OrderItemSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'ready', 'delivered', 'cancelled'],
      default: 'new',
    },
    orderDate: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: String,
      required: false,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    totalRevenue: {
      type: Number,
      required: true,
    },
    totalProfit: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
    deliveryAddress: {
      type: String,
      required: false,
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'partial', 'paid'],
      default: 'unpaid',
    },
    paymentMethod: {
      type: String,
      required: false,
    },
    source: {
      type: String,
      enum: ['manual', 'menu', 'api'],
      default: 'manual',
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
OrderSchema.index({ userId: 1, status: 1 });
OrderSchema.index({ userId: 1, orderDate: 1 });
OrderSchema.index({ userId: 1, customerId: 1 });

const OrderModel: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;
