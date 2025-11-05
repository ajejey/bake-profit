import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
  _id: string;
  email: string;
  password_hash?: string;
  name?: string;
  business_name?: string;
  avatar_url?: string;
  
  email_verified: boolean;
  verification_token?: string;
  reset_token?: string;
  reset_token_expires?: Date;
  
  google_id?: string;
  google_refresh_token?: string;
  
  subscription_tier: 'free' | 'pro';
  subscription_status: 'active' | 'canceled' | 'past_due';
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  paypal_subscription_id?: string;
  paypal_payer_id?: string;
  subscription_ends_at?: Date;
  
  created_at: Date;
  updated_at: Date;
  last_login_at?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password_hash: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    business_name: {
      type: String,
      required: false,
    },
    avatar_url: {
      type: String,
      required: false,
    },
    
    // Email verification
    email_verified: {
      type: Boolean,
      default: false,
    },
    verification_token: {
      type: String,
      required: false,
      index: true,
    },
    reset_token: {
      type: String,
      required: false,
      index: true,
    },
    reset_token_expires: {
      type: Date,
      required: false,
    },
    
    // OAuth
    google_id: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      index: true,
    },
    google_refresh_token: {
      type: String,
      required: false,
    },
    
    // Subscription
    subscription_tier: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free',
    },
    subscription_status: {
      type: String,
      enum: ['active', 'canceled', 'past_due'],
      default: 'active',
    },
    stripe_customer_id: {
      type: String,
      required: false,
      index: true,
    },
    stripe_subscription_id: {
      type: String,
      required: false,
    },
    paypal_subscription_id: {
      type: String,
      required: false,
      index: true,
    },
    paypal_payer_id: {
      type: String,
      required: false,
    },
    subscription_ends_at: {
      type: Date,
      required: false,
    },
    
    // Timestamps
    last_login_at: {
      type: Date,
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

// Prevent model recompilation in development
const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
