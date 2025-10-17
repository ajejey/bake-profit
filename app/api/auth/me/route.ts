import { NextRequest, NextResponse } from 'next/server';
import { findUserById } from '@/lib/db/users';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { AuthResponse } from '@/types/auth';

export async function GET(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json<AuthResponse>(
        { 
          success: false, 
          error: 'No authentication token provided' 
        },
        { status: 401 }
      );
    }

    // Verify token
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json<AuthResponse>(
        { 
          success: false, 
          error: 'Invalid or expired token' 
        },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await findUserById(payload.userId);
    if (!user) {
      return NextResponse.json<AuthResponse>(
        { 
          success: false, 
          error: 'User not found' 
        },
        { status: 404 }
      );
    }

    // Remove sensitive data (password_hash is not in User type, but just to be safe)
    const userWithoutPassword = { ...user };
    delete (userWithoutPassword as any).password_hash;

    return NextResponse.json<AuthResponse>(
      {
        success: true,
        user: userWithoutPassword,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json<AuthResponse>(
      { 
        success: false, 
        error: 'An error occurred while fetching user data' 
      },
      { status: 500 }
    );
  }
}
