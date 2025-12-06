import connectDB from './mongodb';
import UserModel, { IUser } from './models/User';
import { User, SafeUser } from '@/types/auth';

/**
 * Convert MongoDB document to User type (includes all fields)
 * NOTE: Use toSafeUser() for client-facing responses
 */
function toUser(doc: IUser): User {
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name || null,
    business_name: doc.business_name || null,
    phone: doc.phone || null,
    avatar_url: doc.avatar_url || null,
    email_verified: doc.email_verified,
    google_id: doc.google_id || null,

    // Google Calendar tokens (server-side only!)
    google_calendar_email: doc.google_calendar_email || null,
    google_calendar_access_token: doc.google_calendar_access_token || null,
    google_calendar_refresh_token: doc.google_calendar_refresh_token || null,
    google_calendar_token_expiry: doc.google_calendar_token_expiry || null,
    google_calendar_connected_at: doc.google_calendar_connected_at || null,

    subscription_tier: doc.subscription_tier,
    subscription_status: doc.subscription_status,
    stripe_customer_id: doc.stripe_customer_id || null,
    stripe_subscription_id: doc.stripe_subscription_id || null,
    paypal_subscription_id: doc.paypal_subscription_id || null,
    paypal_payer_id: doc.paypal_payer_id || null,
    subscription_ends_at: doc.subscription_ends_at || null,
    created_at: doc.created_at,
    updated_at: doc.updated_at,
    last_login_at: doc.last_login_at || null,
  };
}

/**
 * Convert MongoDB document to SafeUser type (excludes sensitive tokens)
 * Use this for client-facing responses
 */
export function toSafeUser(doc: IUser): SafeUser {
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name || null,
    business_name: doc.business_name || null,
    phone: doc.phone || null,
    avatar_url: doc.avatar_url || null,
    email_verified: doc.email_verified,
    google_id: doc.google_id || null,

    // Safe calendar info (email and connection status only, NO tokens)
    google_calendar_email: doc.google_calendar_email || null,
    google_calendar_token_expiry: doc.google_calendar_token_expiry || null,
    google_calendar_connected_at: doc.google_calendar_connected_at || null,

    subscription_tier: doc.subscription_tier,
    subscription_status: doc.subscription_status,
    stripe_customer_id: doc.stripe_customer_id || null,
    stripe_subscription_id: doc.stripe_subscription_id || null,
    paypal_subscription_id: doc.paypal_subscription_id || null,
    paypal_payer_id: doc.paypal_payer_id || null,
    subscription_ends_at: doc.subscription_ends_at || null,
    created_at: doc.created_at,
    updated_at: doc.updated_at,
    last_login_at: doc.last_login_at || null,
  };
}

/**
 * Strip sensitive OAuth tokens from any user-like object
 * Use this to sanitize User objects before sending to client
 */
export function stripSensitiveFields<T extends object>(user: T): Omit<T, 'password_hash' | 'google_calendar_access_token' | 'google_calendar_refresh_token'> {
  const copy = { ...user } as Record<string, unknown>;
  delete copy.password_hash;
  delete copy.google_calendar_access_token;
  delete copy.google_calendar_refresh_token;
  return copy as Omit<T, 'password_hash' | 'google_calendar_access_token' | 'google_calendar_refresh_token'>;
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
  subscription_tier?: 'free' | 'pro';
  subscription_status?: 'active' | 'canceled' | 'past_due';
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
    subscription_tier: data.subscription_tier || 'free',
    subscription_status: data.subscription_status || 'active',
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

/**
 * Update user's reset token
 */
export async function updateUserResetToken(
  userId: string,
  resetToken: string,
  resetTokenExpires: Date
): Promise<void> {
  await connectDB();

  await UserModel.findByIdAndUpdate(userId, {
    reset_token: resetToken,
    reset_token_expires: resetTokenExpires,
  });
}

/**
 * Find user by reset token
 */
export async function findUserByResetToken(resetToken: string): Promise<(User & { password_hash?: string }) | null> {
  await connectDB();

  const user = await UserModel.findOne({
    reset_token: resetToken,
    reset_token_expires: { $gt: new Date() },
  }).lean();

  if (!user) return null;

  return {
    ...toUser(user as IUser),
    password_hash: user.password_hash,
  };
}

/**
 * Clear user's reset token
 */
export async function clearUserResetToken(userId: string): Promise<void> {
  await connectDB();

  await UserModel.findByIdAndUpdate(userId, {
    reset_token: undefined,
    reset_token_expires: undefined,
  });
}
