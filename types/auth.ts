export interface User {
  id: string;
  email: string;
  name: string | null;
  business_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  email_verified: boolean;
  google_id: string | null;

  // Google Calendar tokens (can be different Google account than login)
  google_calendar_email?: string | null;
  google_calendar_access_token?: string | null;
  google_calendar_refresh_token?: string | null;
  google_calendar_token_expiry?: Date | null;
  google_calendar_connected_at?: Date | null;

  subscription_tier: 'free' | 'pro';
  subscription_status: 'active' | 'canceled' | 'past_due';
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  paypal_subscription_id: string | null;
  paypal_payer_id: string | null;
  subscription_ends_at: Date | null;
  created_at: Date;
  updated_at: Date;
  last_login_at: Date | null;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  tier: 'free' | 'pro';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
  business_name?: string;
}

// Sensitive fields that should NEVER be sent to the client
type SensitiveUserFields =
  | 'password_hash'
  | 'google_calendar_access_token'
  | 'google_calendar_refresh_token';

// Safe user type for client-facing responses
export type SafeUser = Omit<User, SensitiveUserFields>;

export interface AuthResponse {
  success: boolean;
  user?: SafeUser;
  token?: string;
  message?: string;
  error?: string;
}

export interface GoogleOAuthUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}
