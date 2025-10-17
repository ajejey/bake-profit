import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, findUserByEmail } from '@/lib/db/users';
import { hashPassword, validatePassword } from '@/lib/auth/password';
import { generateToken } from '@/lib/auth/jwt';
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
      name: name || null,
      business_name: business_name || null,
      email_verified: false, // TODO: Implement email verification
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      tier: user.subscription_tier,
    });

    // Remove sensitive data (password_hash is not in User type, but just to be safe)
    const userWithoutPassword = { ...user };

    return NextResponse.json<AuthResponse>(
      {
        success: true,
        user: userWithoutPassword,
        token,
        message: 'Account created successfully',
      },
      { status: 201 }
    );

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
