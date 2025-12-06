import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, findUserByEmail, stripSensitiveFields } from '@/lib/db/users';
import { hashPassword, validatePassword } from '@/lib/auth/password';
import { generateTokenPair } from '@/lib/auth/jwt';
import { AuthResponse } from '@/types/auth';

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional(),
  business_name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = signupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          error: validation.error.issues[0].message
        },
        { status: 400 }
      );
    }

    const { email, password, name, business_name } = validation.data;

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          error: passwordValidation.message
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email.toLowerCase());
    if (existingUser) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          error: 'An account with this email already exists'
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await createUser({
      email: email.toLowerCase(),
      password_hash: hashedPassword,
      name: name || undefined,
      business_name: business_name || undefined,
      email_verified: false, // TODO: Implement email verification
    });

    // Generate token pair (access + refresh)
    const { accessToken, refreshToken } = generateTokenPair({
      userId: user.id,
      email: user.email,
      tier: user.subscription_tier,
    });

    // Create response
    const response = NextResponse.json<AuthResponse>(
      {
        success: true,
        user: stripSensitiveFields(user),  // Strip sensitive fields (password_hash, etc.)
        token: accessToken,
        message: 'Account created successfully',
      },
      { status: 201 }
    );

    // Set refresh token in httpOnly cookie
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 90 * 24 * 60 * 60, // 90 days (3 months)
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json<AuthResponse>(
      {
        success: false,
        error: 'An error occurred during signup. Please try again.'
      },
      { status: 500 }
    );
  }
}
