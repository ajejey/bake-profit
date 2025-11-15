import { NextRequest, NextResponse } from 'next/server';
import { findUserById } from '@/lib/db/users';
import { generateAccessToken, verifyRefreshToken } from '@/lib/auth/jwt';
import { AuthResponse } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    // Get refresh token from httpOnly cookie
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json<AuthResponse>(
        { success: false, error: 'No refresh token provided' },
        { status: 401 }
      );
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json<AuthResponse>(
        { success: false, error: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }

    // Fetch fresh user data
    const user = await findUserById(payload.userId);
    if (!user) {
      return NextResponse.json<AuthResponse>(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Generate new access token
    const newAccessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      tier: user.subscription_tier,
    });

    // Remove sensitive data
    const userWithoutPassword = { ...user };
    delete (userWithoutPassword as Record<string, unknown>).password_hash;

    return NextResponse.json<AuthResponse>(
      {
        success: true,
        user: userWithoutPassword,
        token: newAccessToken,
        message: 'Token refreshed',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json<AuthResponse>(
      { success: false, error: 'Failed to refresh token' },
      { status: 500 }
    );
  }
}
