import connectDB from './mongodb';
import UserModel, { IUser } from './models/User';
import { User } from '@/types/auth';

/**
 * Convert MongoDB document to User type
 */
function toUser(doc: IUser): User {
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name || null,
    business_name: doc.business_name || null,
    avatar_url: doc.avatar_url || null,
    email_verified: doc.email_verified,
    google_id: doc.google_id || null,
    subscription_tier: doc.subscription_tier,
    subscription_status: doc.subscription_status,
    stripe_customer_id: doc.stripe_customer_id || null,
    stripe_subscription_id: doc.stripe_subscription_id || null,
    subscription_ends_at: doc.subscription_ends_at || null,
    created_at: doc.created_at,
    updated_at: doc.updated_at,
    last_login_at: doc.last_login_at || null,
  };
}

/**
 * Create a new user
 */
export async function createUser(data: {
  email: string;
  password_hash?: string;
  name?: string;
  business_name?: string;
  google_id?: string;
  avatar_url?: string;
  email_verified?: boolean;
}): Promise<User> {
  await connectDB();
  
  const user = await UserModel.create({
    email: data.email.toLowerCase(),
    password_hash: data.password_hash,
    name: data.name,
    business_name: data.business_name,
    google_id: data.google_id,
    avatar_url: data.avatar_url,
    email_verified: data.email_verified || false,
  });

  return toUser(user.toObject());
}

/**
 * Find user by email
 */
export async function findUserByEmail(email: string): Promise<(User & { password_hash?: string }) | null> {
  await connectDB();
  
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();
  
  if (!user) return null;
  
  return {
    ...toUser(user as IUser),
    password_hash: user.password_hash,
  };
}

/**
 * Find user by ID
 */
export async function findUserById(id: string): Promise<User | null> {
  await connectDB();
  
  const user = await UserModel.findById(id).lean();
  
  if (!user) return null;
  
  return toUser(user as IUser);
}

/**
 * Find user by Google ID
 */
export async function findUserByGoogleId(googleId: string): Promise<User | null> {
  await connectDB();
  
  const user = await UserModel.findOne({ google_id: googleId }).lean();
  
  if (!user) return null;
  
  return toUser(user as IUser);
}

/**
 * Update user's last login time
 */
export async function updateLastLogin(userId: string): Promise<void> {
  await connectDB();
  
  await UserModel.findByIdAndUpdate(userId, {
    last_login_at: new Date(),
  });
}

/**
 * Update user profile
 */
export async function updateUser(userId: string, data: Partial<IUser>): Promise<User> {
  await connectDB();
  
  const user = await UserModel.findByIdAndUpdate(
    userId,
    { $set: data },
    { new: true }
  ).lean();

  if (!user) {
    throw new Error('User not found');
  }

  return toUser(user as IUser);
}

/**
 * Update user's subscription tier
 */
export async function updateSubscriptionTier(
  userId: string,
  tier: 'free' | 'pro',
  status: 'active' | 'canceled' | 'past_due' = 'active'
): Promise<void> {
  await connectDB();
  
  await UserModel.findByIdAndUpdate(userId, {
    subscription_tier: tier,
    subscription_status: status,
  });
}
