import { NextRequest, NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt'
import { findUserByEmail, updateUser } from '@/lib/db/users'

const oauth2Client = new OAuth2Client(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage'
)

interface CalendarEventInput {
    orderId: string
    orderNumber: string
    customerName: string
    customerPhone?: string
    customerEmail?: string
    items: Array<{ recipeName: string; quantity: number }>
    deliveryDate: string  // ISO date string
    deliveryTime?: string
    deliveryAddress?: string
    productionDate?: string
    productionDuration?: number
    notes?: string
    status: string
}

interface BlockedDateInput {
    date: string  // ISO date string (YYYY-MM-DD)
    reason?: string
}

/**
 * Refresh access token if expired
 */
async function getValidAccessToken(user: {
    id: string
    google_calendar_access_token?: string | null
    google_calendar_refresh_token?: string | null
    google_calendar_token_expiry?: Date | null
}): Promise<string | null> {
    if (!user.google_calendar_refresh_token) {
        return null
    }

    // Check if token is expired (with 5 minute buffer)
    const isExpired = user.google_calendar_token_expiry
        ? new Date(user.google_calendar_token_expiry).getTime() < Date.now() + 5 * 60 * 1000
        : true

    if (!isExpired && user.google_calendar_access_token) {
        return user.google_calendar_access_token
    }

    // Refresh the token
    try {
        oauth2Client.setCredentials({
            refresh_token: user.google_calendar_refresh_token,
        })

        const { credentials } = await oauth2Client.refreshAccessToken()

        if (!credentials.access_token) {
            return null
        }

        // Update user with new access token
        await updateUser(user.id, {
            google_calendar_access_token: credentials.access_token,
            google_calendar_token_expiry: credentials.expiry_date
                ? new Date(credentials.expiry_date)
                : new Date(Date.now() + 3600 * 1000),
        })

        return credentials.access_token
    } catch (error) {
        console.error('Failed to refresh access token:', error)
        return null
    }
}

/**
 * Format order data into Google Calendar event
 */
function formatOrderEvent(order: CalendarEventInput, timezone: string) {
    // Format items list
    const itemsList = order.items
        .map(item => `• ${item.quantity}x ${item.recipeName}`)
        .join('\n')

    // Build description
    let description = `📦 Order: ${order.orderNumber}\n`
    description += `👤 Customer: ${order.customerName}\n`

    if (order.customerPhone) {
        description += `📞 Phone: ${order.customerPhone}\n`
    }
    if (order.customerEmail) {
        description += `📧 Email: ${order.customerEmail}\n`
    }

    description += `\n🍰 Items:\n${itemsList}\n`

    if (order.productionDate && order.productionDuration) {
        description += `\n⏱️ Production: Start ${order.productionDate}`
        description += ` (${order.productionDuration}h estimated)\n`
    }

    if (order.notes) {
        description += `\n📝 Notes: ${order.notes}\n`
    }

    // Parse delivery date and time
    const deliveryDate = new Date(order.deliveryDate)
    let startDateTime: string
    let endDateTime: string

    if (order.deliveryTime) {
        // Specific time - create timed event
        const [hours, minutes] = order.deliveryTime.split(':').map(Number)
        deliveryDate.setHours(hours || 12, minutes || 0, 0, 0)

        startDateTime = deliveryDate.toISOString()
        // End 30 minutes after start
        const endDate = new Date(deliveryDate.getTime() + 30 * 60 * 1000)
        endDateTime = endDate.toISOString()

        return {
            summary: `🍰 ${order.orderNumber} - ${order.customerName}`,
            description,
            start: {
                dateTime: startDateTime,
                timeZone: timezone,
            },
            end: {
                dateTime: endDateTime,
                timeZone: timezone,
            },
            location: order.deliveryAddress || undefined,
            colorId: '11', // Red for delivery
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'popup', minutes: 60 },      // 1 hour before
                    { method: 'popup', minutes: 1440 },    // 1 day before
                ],
            },
        }
    } else {
        // All-day event
        const dateStr = deliveryDate.toISOString().split('T')[0]

        return {
            summary: `🍰 ${order.orderNumber} - ${order.customerName}`,
            description,
            start: {
                date: dateStr,
            },
            end: {
                date: dateStr,
            },
            location: order.deliveryAddress || undefined,
            colorId: '11', // Red for delivery
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'popup', minutes: 1440 },    // 1 day before
                ],
            },
        }
    }
}

/**
 * Format blocked date into Google Calendar all-day event
 */
function formatBlockedDateEvent(blockedDate: BlockedDateInput) {
    return {
        summary: `🚫 ${blockedDate.reason || 'Unavailable'}`,
        description: 'Blocked date - Not accepting orders',
        start: {
            date: blockedDate.date,
        },
        end: {
            date: blockedDate.date,
        },
        colorId: '8', // Gray for blocked dates
        transparency: 'opaque', // Show as busy
    }
}

/**
 * POST /api/google-calendar/events
 * Create a new calendar event for an order
 */
export async function POST(request: NextRequest) {
    try {
        // Verify user is authenticated
        const authHeader = request.headers.get('authorization')
        const token = extractTokenFromHeader(authHeader)

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const payload = verifyToken(token)
        if (!payload?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const user = await findUserByEmail(payload.email)
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Get valid access token
        const accessToken = await getValidAccessToken({
            id: user.id,
            google_calendar_access_token: user.google_calendar_access_token,
            google_calendar_refresh_token: user.google_calendar_refresh_token,
            google_calendar_token_expiry: user.google_calendar_token_expiry,
        })

        if (!accessToken) {
            return NextResponse.json(
                { error: 'Google Calendar not connected or token expired. Please reconnect.' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { type, data, calendarId = 'primary', timezone = 'America/New_York' } = body

        let eventData
        if (type === 'order') {
            eventData = formatOrderEvent(data as CalendarEventInput, timezone)
        } else if (type === 'blocked_date') {
            eventData = formatBlockedDateEvent(data as BlockedDateInput)
        } else {
            return NextResponse.json({ error: 'Invalid event type' }, { status: 400 })
        }

        // Create event in Google Calendar
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            }
        )

        if (!response.ok) {
            const error = await response.json()
            console.error('Google Calendar API error:', error)
            return NextResponse.json(
                { error: 'Failed to create calendar event', details: error },
                { status: response.status }
            )
        }

        const createdEvent = await response.json()

        return NextResponse.json({
            success: true,
            eventId: createdEvent.id,
            eventLink: createdEvent.htmlLink,
            message: 'Event created successfully',
        })

    } catch (error) {
        console.error('Create calendar event error:', error)
        return NextResponse.json(
            { error: 'Failed to create calendar event' },
            { status: 500 }
        )
    }
}

/**
 * PUT /api/google-calendar/events
 * Update an existing calendar event
 */
export async function PUT(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')
        const token = extractTokenFromHeader(authHeader)

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const payload = verifyToken(token)
        if (!payload?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const user = await findUserByEmail(payload.email)
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const accessToken = await getValidAccessToken({
            id: user.id,
            google_calendar_access_token: user.google_calendar_access_token,
            google_calendar_refresh_token: user.google_calendar_refresh_token,
            google_calendar_token_expiry: user.google_calendar_token_expiry,
        })

        if (!accessToken) {
            return NextResponse.json(
                { error: 'Google Calendar not connected' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { eventId, type, data, calendarId = 'primary', timezone = 'America/New_York' } = body

        if (!eventId) {
            return NextResponse.json({ error: 'Event ID required' }, { status: 400 })
        }

        let eventData
        if (type === 'order') {
            eventData = formatOrderEvent(data as CalendarEventInput, timezone)
        } else if (type === 'blocked_date') {
            eventData = formatBlockedDateEvent(data as BlockedDateInput)
        } else {
            return NextResponse.json({ error: 'Invalid event type' }, { status: 400 })
        }

        // Update event in Google Calendar
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            }
        )

        if (!response.ok) {
            const error = await response.json()
            console.error('Google Calendar API error:', error)
            return NextResponse.json(
                { error: 'Failed to update calendar event', details: error },
                { status: response.status }
            )
        }

        const updatedEvent = await response.json()

        return NextResponse.json({
            success: true,
            eventId: updatedEvent.id,
            eventLink: updatedEvent.htmlLink,
            message: 'Event updated successfully',
        })

    } catch (error) {
        console.error('Update calendar event error:', error)
        return NextResponse.json(
            { error: 'Failed to update calendar event' },
            { status: 500 }
        )
    }
}

/**
 * DELETE /api/google-calendar/events
 * Delete a calendar event
 */
export async function DELETE(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')
        const token = extractTokenFromHeader(authHeader)

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const payload = verifyToken(token)
        if (!payload?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const user = await findUserByEmail(payload.email)
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const accessToken = await getValidAccessToken({
            id: user.id,
            google_calendar_access_token: user.google_calendar_access_token,
            google_calendar_refresh_token: user.google_calendar_refresh_token,
            google_calendar_token_expiry: user.google_calendar_token_expiry,
        })

        if (!accessToken) {
            return NextResponse.json(
                { error: 'Google Calendar not connected' },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url)
        const eventId = searchParams.get('eventId')
        const calendarId = searchParams.get('calendarId') || 'primary'

        if (!eventId) {
            return NextResponse.json({ error: 'Event ID required' }, { status: 400 })
        }

        // Delete event from Google Calendar
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        )

        if (!response.ok && response.status !== 410) { // 410 = already deleted
            const error = await response.json().catch(() => ({}))
            console.error('Google Calendar API error:', error)
            return NextResponse.json(
                { error: 'Failed to delete calendar event', details: error },
                { status: response.status }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Event deleted successfully',
        })

    } catch (error) {
        console.error('Delete calendar event error:', error)
        return NextResponse.json(
            { error: 'Failed to delete calendar event' },
            { status: 500 }
        )
    }
}

/**
 * GET /api/google-calendar/events
 * List user's calendars (for calendar selection)
 */
export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')
        const token = extractTokenFromHeader(authHeader)

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const payload = verifyToken(token)
        if (!payload?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const user = await findUserByEmail(payload.email)
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const accessToken = await getValidAccessToken({
            id: user.id,
            google_calendar_access_token: user.google_calendar_access_token,
            google_calendar_refresh_token: user.google_calendar_refresh_token,
            google_calendar_token_expiry: user.google_calendar_token_expiry,
        })

        if (!accessToken) {
            return NextResponse.json(
                { error: 'Google Calendar not connected' },
                { status: 401 }
            )
        }

        // Get list of calendars
        const response = await fetch(
            'https://www.googleapis.com/calendar/v3/users/me/calendarList',
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        )

        if (!response.ok) {
            const error = await response.json()
            console.error('Google Calendar API error:', error)
            return NextResponse.json(
                { error: 'Failed to fetch calendars' },
                { status: response.status }
            )
        }

        const data = await response.json()

        // Return simplified calendar list
        const calendars = data.items?.map((cal: { id: string; summary: string; primary?: boolean; accessRole: string }) => ({
            id: cal.id,
            name: cal.summary,
            primary: cal.primary || false,
            accessRole: cal.accessRole,
        })) || []

        return NextResponse.json({
            success: true,
            calendars,
        })

    } catch (error) {
        console.error('List calendars error:', error)
        return NextResponse.json(
            { error: 'Failed to list calendars' },
            { status: 500 }
        )
    }
}
