import { NextRequest, NextResponse } from 'next/server';
import { findUserById, updateUser, findUserByEmail } from '@/lib/db/users';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { AuthResponse } from '@/types/auth';
import bcrypt from 'bcryptjs';

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
    delete (userWithoutPassword as Record<string, unknown>).password_hash;

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

// Update profile (name, business_name, phone)
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json<AuthResponse>(
        { success: false, error: 'No authentication token provided' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json<AuthResponse>(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, business_name, phone } = body;

    // Update user profile
    const updatedUser = await updateUser(payload.userId, {
      name,
      business_name,
      phone,
    });

    return NextResponse.json<AuthResponse>(
      { success: true, user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json<AuthResponse>(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// Change password
export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json<AuthResponse>(
        { success: false, error: 'No authentication token provided' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json<AuthResponse>(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json<AuthResponse>(
        { success: false, error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json<AuthResponse>(
        { success: false, error: 'New password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Get user with password hash
    const user = await findUserByEmail((await findUserById(payload.userId))?.email || '');
    if (!user || !user.password_hash) {
      return NextResponse.json<AuthResponse>(
        { success: false, error: 'Cannot change password for this account' },
        { status: 400 }
      );
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isValidPassword) {
      return NextResponse.json<AuthResponse>(
        { success: false, error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Hash new password and update
    const newPasswordHash = await bcrypt.hash(newPassword, 12);
    await updateUser(payload.userId, { password_hash: newPasswordHash });

    return NextResponse.json<AuthResponse>(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json<AuthResponse>(
      { success: false, error: 'Failed to change password' },
      { status: 500 }
    );
  }
}
