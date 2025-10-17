import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { findUserByEmail, updateLastLogin } from '@/lib/db/users';
import { verifyPassword } from '@/lib/auth/password';
import { generateToken } from '@/lib/auth/jwt';
import { AuthResponse } from '@/types/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json<AuthResponse>(
        { 
          success: false, 
          error: validation.error.issues[0].message 
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Find user
    const user = await findUserByEmail(email.toLowerCase());
    if (!user) {
      return NextResponse.json<AuthResponse>(
        { 
          success: false, 
          error: 'Invalid email or password' 
        },
        { status: 401 }
      );
    }

    // Check if user signed up with Google (no password)
    if (!user.password_hash) {
      return NextResponse.json<AuthResponse>(
        { 
          success: false, 
          error: 'This account uses Google Sign-In. Please sign in with Google.' 
        },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return NextResponse.json<AuthResponse>(
        { 
          success: false, 
          error: 'Invalid email or password' 
        },
        { status: 401 }
      );
    }

    // Update last login
    await updateLastLogin(user.id);

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      tier: user.subscription_tier,
    });

    // Remove sensitive data (password_hash is not in User type, but just to be safe)
    const userWithoutPassword = { ...user };
    delete (userWithoutPassword as any).password_hash;

    return NextResponse.json<AuthResponse>(
      {
        success: true,
        user: userWithoutPassword,
        token,
        message: 'Login successful',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json<AuthResponse>(
      { 
        success: false, 
        error: 'An error occurred during login. Please try again.' 
      },
      { status: 500 }
    );
  }
}
