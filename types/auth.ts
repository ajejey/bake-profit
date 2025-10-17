export interface User {
  id: string;
  email: string;
  name: string | null;
  business_name: string | null;
  avatar_url: string | null;
  email_verified: boolean;
  google_id: string | null;
  subscription_tier: 'free' | 'pro';
  subscription_status: 'active' | 'canceled' | 'past_due';
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
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

export interface AuthResponse {
  success: boolean;
  user?: Omit<User, 'password_hash'>;
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
