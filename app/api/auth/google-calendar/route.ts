import { NextRequest, NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt'
import { findUserByEmail, updateUser } from '@/lib/db/users'

const oauth2Client = new OAuth2Client(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage' // For @react-oauth/google code flow
)

/**
 * POST /api/auth/google-calendar
 * Exchange authorization code for access/refresh tokens
 * Stores tokens in user's database record
 */
export async function POST(request: NextRequest) {
    try {
        // Verify user is authenticated
        const authHeader = request.headers.get('authorization')
        const token = extractTokenFromHeader(authHeader)

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized - No token provided' },
                { status: 401 }
            )
        }

        const payload = verifyToken(token)
        if (!payload || !payload.email) {
            return NextResponse.json(
                { error: 'Unauthorized - Invalid token' },
                { status: 401 }
            )
        }

        const { code } = await request.json()

        if (!code) {
            return NextResponse.json(
                { error: 'No authorization code provided' },
                { status: 400 }
            )
        }

        // Exchange authorization code for tokens
        const { tokens } = await oauth2Client.getToken(code)

        if (!tokens.access_token) {
            return NextResponse.json(
                { error: 'Failed to get access token from Google' },
                { status: 400 }
            )
        }

        // Get the Google account email from the access token
        oauth2Client.setCredentials(tokens)
        const userInfoResponse = await fetch(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`,
                },
            }
        )

        const googleUserInfo = await userInfoResponse.json()
        const googleCalendarEmail = googleUserInfo.email

        // Find the logged-in user and update their Calendar tokens
        const user = await findUserByEmail(payload.email)

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // Calculate token expiry
        const tokenExpiry = tokens.expiry_date
            ? new Date(tokens.expiry_date)
            : new Date(Date.now() + 3600 * 1000) // Default 1 hour

        // Update user with Calendar tokens
        await updateUser(user.id, {
            google_calendar_email: googleCalendarEmail,
            google_calendar_access_token: tokens.access_token,
            google_calendar_refresh_token: tokens.refresh_token || undefined,
            google_calendar_token_expiry: tokenExpiry,
            google_calendar_connected_at: new Date(),
        })

        return NextResponse.json({
            success: true,
            connectedEmail: googleCalendarEmail,
            message: 'Google Calendar connected successfully',
        })

    } catch (error) {
        console.error('Google Calendar OAuth error:', error)
        return NextResponse.json(
            {
                error: 'Failed to connect Google Calendar',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}

/**
 * DELETE /api/auth/google-calendar
 * Disconnect Google Calendar
 */
export async function DELETE(request: NextRequest) {
    try {
        // Verify user is authenticated
        const authHeader = request.headers.get('authorization')
        const token = extractTokenFromHeader(authHeader)

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized - No token provided' },
                { status: 401 }
            )
        }

        const payload = verifyToken(token)
        if (!payload || !payload.email) {
            return NextResponse.json(
                { error: 'Unauthorized - Invalid token' },
                { status: 401 }
            )
        }

        // Find the logged-in user
        const user = await findUserByEmail(payload.email)

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // Revoke the token if we have one
        if (user.google_calendar_access_token) {
            try {
                await fetch(
                    `https://oauth2.googleapis.com/revoke?token=${user.google_calendar_access_token}`,
                    { method: 'POST' }
                )
            } catch (revokeError) {
                // Continue even if revoke fails - token might already be expired
                console.warn('Token revoke failed (continuing):', revokeError)
            }
        }

        // Clear Calendar tokens from user
        await updateUser(user.id, {
            google_calendar_email: undefined,
            google_calendar_access_token: undefined,
            google_calendar_refresh_token: undefined,
            google_calendar_token_expiry: undefined,
            google_calendar_connected_at: undefined,
        })

        return NextResponse.json({
            success: true,
            message: 'Google Calendar disconnected successfully',
        })

    } catch (error) {
        console.error('Google Calendar disconnect error:', error)
        return NextResponse.json(
            { error: 'Failed to disconnect Google Calendar' },
            { status: 500 }
        )
    }
}

/**
 * GET /api/auth/google-calendar
 * Get current Google Calendar connection status
 */
export async function GET(request: NextRequest) {
    try {
        // Verify user is authenticated
        const authHeader = request.headers.get('authorization')
        const token = extractTokenFromHeader(authHeader)

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized - No token provided' },
                { status: 401 }
            )
        }

        const payload = verifyToken(token)
        if (!payload || !payload.email) {
            return NextResponse.json(
                { error: 'Unauthorized - Invalid token' },
                { status: 401 }
            )
        }

        // Find the logged-in user
        const user = await findUserByEmail(payload.email)

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // Check if Calendar is connected
        const isConnected = !!(
            user.google_calendar_email &&
            user.google_calendar_refresh_token
        )

        return NextResponse.json({
            success: true,
            isConnected,
            connectedEmail: user.google_calendar_email || null,
            connectedAt: user.google_calendar_connected_at || null,
        })

    } catch (error) {
        console.error('Google Calendar status error:', error)
        return NextResponse.json(
            { error: 'Failed to get Google Calendar status' },
            { status: 500 }
        )
    }
}
