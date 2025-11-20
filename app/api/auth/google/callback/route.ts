import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { findUserByEmail, findUserByGoogleId, createUser, updateUser } from '@/lib/db/users';
import { generateTokenPair } from '@/lib/auth/jwt';
import { AuthResponse } from '@/types/auth';

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { credential } = body;

        if (!credential) {
            return NextResponse.json<AuthResponse>(
                {
                    success: false,
                    error: 'No credential provided'
                },
                { status: 400 }
            );
        }

        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload || !payload.email) {
            return NextResponse.json<AuthResponse>(
                {
                    success: false,
                    error: 'Invalid Google token'
                },
                { status: 400 }
            );
        }

        const { sub: googleId, email, name, picture } = payload;

        // Check if user exists by Google ID
        let user = await findUserByGoogleId(googleId);

        if (!user) {
            // Check if user exists by email (might have signed up with password)
            user = await findUserByEmail(email.toLowerCase());

            if (user) {
                // Link Google account to existing user
                user = await updateUser(user.id, {
                    google_id: googleId,
                    email_verified: true, // Google emails are verified
                    avatar_url: picture || user.avatar_url || undefined,
                    name: name || user.name || undefined,
                });
            } else {
                // Create new user with Google account
                user = await createUser({
                    email: email.toLowerCase(),
                    google_id: googleId,
                    name: name || undefined,
                    avatar_url: picture || undefined,
                    email_verified: true, // Google emails are verified
                    subscription_tier: 'free',
                    subscription_status: 'active',
                });
            }
        } else {
            // Update existing Google user's info
            user = await updateUser(user.id, {
                name: name || user.name || undefined,
                avatar_url: picture || user.avatar_url || undefined,
                last_login_at: new Date(),
            });
        }

        // Generate token pair (access + refresh)
        const { accessToken, refreshToken } = generateTokenPair({
            userId: user.id,
            email: user.email,
            tier: user.subscription_tier,
        });

        // Remove sensitive data
        const userWithoutPassword = { ...user };
        delete (userWithoutPassword as Record<string, unknown>).password_hash;
        delete (userWithoutPassword as Record<string, unknown>).google_refresh_token;

        // Set refresh token as httpOnly cookie
        const response = NextResponse.json<AuthResponse>(
            {
                success: true,
                user: userWithoutPassword,
                token: accessToken,
                message: 'Google login successful',
            },
            { status: 200 }
        );

        // Set refresh token in httpOnly cookie
        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 90 * 24 * 60 * 60, // 90 days
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Google OAuth error:', error);
        return NextResponse.json<AuthResponse>(
            {
                success: false,
                error: 'An error occurred during Google authentication. Please try again.'
            },
            { status: 500 }
        );
    }
}
