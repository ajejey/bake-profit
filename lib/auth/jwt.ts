import jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '@/types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-super-secret-refresh-key-change-this-in-production';

// Access token: short-lived (15 minutes)
const ACCESS_TOKEN_EXPIRES_IN = '15m';
// Refresh token: long-lived (7 days)
const REFRESH_TOKEN_EXPIRES_IN = '7d';

/**
 * Generate an access token (short-lived, for API requests)
 */
export function generateAccessToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
}

/**
 * Generate a refresh token (long-lived, for getting new access tokens)
 */
export function generateRefreshToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
}

/**
 * Generate both tokens (called on login)
 */
export function generateTokenPair(payload: AuthTokenPayload): { accessToken: string; refreshToken: string } {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

/**
 * Generate a new access token from a refresh token
 */
export function generateToken(payload: AuthTokenPayload): string {
  return generateAccessToken(payload);
}

/**
 * Verify and decode an access token
 */
export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

/**
 * Verify and decode a refresh token
 */
export function verifyRefreshToken(token: string): AuthTokenPayload | null {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as AuthTokenPayload;
    return decoded;
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    return null;
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  
  // Format: "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
}

/**
 * Generate a random token for email verification or password reset
 */
export function generateRandomToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
