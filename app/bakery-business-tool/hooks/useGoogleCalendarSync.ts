'use client'

import { useState, useCallback, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import type { Order } from '../types'

export interface GoogleCalendarStatus {
    isConnected: boolean
    connectedEmail: string | null
    connectedAt: Date | null
    isLoading: boolean
    error: string | null
}

export interface CalendarInfo {
    id: string
    name: string
    primary: boolean
    accessRole: string
}

export function useGoogleCalendarSync() {
    const { token } = useAuth()
    const { toast } = useToast()

    const [status, setStatus] = useState<GoogleCalendarStatus>({
        isConnected: false,
        connectedEmail: null,
        connectedAt: null,
        isLoading: true,
        error: null,
    })

    const [calendars, setCalendars] = useState<CalendarInfo[]>([])
    const [selectedCalendarId, setSelectedCalendarId] = useState<string>('primary')
    const [isSyncing, setIsSyncing] = useState(false)

    // Fetch available calendars
    const fetchCalendars = useCallback(async () => {
        if (!token) return

        try {
            const response = await fetch('/api/google-calendar/events', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setCalendars(data.calendars || [])

                // Set default to primary calendar
                const primary = data.calendars?.find((c: CalendarInfo) => c.primary)
                if (primary) {
                    setSelectedCalendarId(primary.id)
                }
            }
        } catch (error) {
            console.error('Fetch calendars error:', error)
        }
    }, [token])

    // Check if Google Calendar is connected
    const checkConnectionStatus = useCallback(async () => {
        if (!token) return

        try {
            setStatus(prev => ({ ...prev, isLoading: true, error: null }))

            const response = await fetch('/api/auth/google-calendar', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error('Failed to check connection status')
            }

            const data = await response.json()

            setStatus({
                isConnected: data.isConnected,
                connectedEmail: data.connectedEmail,
                connectedAt: data.connectedAt ? new Date(data.connectedAt) : null,
                isLoading: false,
                error: null,
            })

            // If connected, fetch available calendars
            if (data.isConnected) {
                fetchCalendars()
            }
        } catch (error) {
            console.error('Check connection status error:', error)
            setStatus(prev => ({
                ...prev,
                isLoading: false,
                error: 'Failed to check connection status',
            }))
        }
    }, [token, fetchCalendars])

    // Check connection status on mount
    useEffect(() => {
        if (token) {
            checkConnectionStatus()
        } else {
            setStatus(prev => ({ ...prev, isLoading: false }))
        }
    }, [token, checkConnectionStatus])

    // Google OAuth login hook for Calendar scope
    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email',
        onSuccess: async (codeResponse) => {
            try {
                setStatus(prev => ({ ...prev, isLoading: true, error: null }))

                const response = await fetch('/api/auth/google-calendar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ code: codeResponse.code }),
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to connect Google Calendar')
                }

                setStatus({
                    isConnected: true,
                    connectedEmail: data.connectedEmail,
                    connectedAt: new Date(),
                    isLoading: false,
                    error: null,
                })

                toast({
                    title: '✅ Google Calendar Connected',
                    description: `Connected to ${data.connectedEmail}`,
                })

                // Fetch available calendars
                fetchCalendars()
            } catch (error) {
                console.error('Connect Google Calendar error:', error)
                setStatus(prev => ({
                    ...prev,
                    isLoading: false,
                    error: error instanceof Error ? error.message : 'Failed to connect',
                }))

                toast({
                    title: 'Connection Failed',
                    description: error instanceof Error ? error.message : 'Failed to connect Google Calendar',
                    variant: 'destructive',
                })
            }
        },
        onError: (error) => {
            console.error('Google OAuth error:', error)
            toast({
                title: 'Connection Failed',
                description: 'Google authentication was cancelled or failed',
                variant: 'destructive',
            })
        },
    })

    // Connect Google Calendar
    const connectGoogleCalendar = useCallback(() => {
        googleLogin()
    }, [googleLogin])

    // Disconnect Google Calendar
    const disconnectGoogleCalendar = useCallback(async () => {
        if (!token) return

        try {
            setStatus(prev => ({ ...prev, isLoading: true }))

            const response = await fetch('/api/auth/google-calendar', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error('Failed to disconnect')
            }

            setStatus({
                isConnected: false,
                connectedEmail: null,
                connectedAt: null,
                isLoading: false,
                error: null,
            })

            setCalendars([])
            setSelectedCalendarId('primary')

            toast({
                title: 'Disconnected',
                description: 'Google Calendar has been disconnected',
            })
        } catch (error) {
            console.error('Disconnect error:', error)
            setStatus(prev => ({ ...prev, isLoading: false }))

            toast({
                title: 'Disconnect Failed',
                description: 'Failed to disconnect Google Calendar',
                variant: 'destructive',
            })
        }
    }, [token, toast])

    // Add order to Google Calendar
    const addOrderToCalendar = useCallback(async (order: Order): Promise<string | null> => {
        if (!token || !status.isConnected) {
            toast({
                title: 'Not Connected',
                description: 'Please connect Google Calendar first',
                variant: 'destructive',
            })
            return null
        }

        try {
            setIsSyncing(true)

            const response = await fetch('/api/google-calendar/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    type: 'order',
                    calendarId: selectedCalendarId,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    data: {
                        orderId: order.id,
                        orderNumber: order.orderNumber,
                        customerName: order.customerName,
                        customerPhone: order.customerPhone,
                        customerEmail: order.customerEmail,
                        items: order.items.map(item => ({
                            recipeName: item.recipeName,
                            quantity: item.quantity,
                        })),
                        deliveryDate: order.deliveryDate,
                        deliveryTime: order.deliveryTime,
                        deliveryAddress: order.deliveryAddress,
                        productionDate: order.productionDate,
                        productionDuration: order.productionDuration,
                        notes: order.notes,
                        status: order.status,
                    },
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to add event')
            }

            toast({
                title: '📅 Added to Calendar',
                description: `Order ${order.orderNumber} added to Google Calendar`,
            })

            return data.eventId
        } catch (error) {
            console.error('Add to calendar error:', error)
            toast({
                title: 'Failed to Add',
                description: error instanceof Error ? error.message : 'Failed to add order to calendar',
                variant: 'destructive',
            })
            return null
        } finally {
            setIsSyncing(false)
        }
    }, [token, status.isConnected, selectedCalendarId, toast])

    // Update order in Google Calendar
    const updateOrderInCalendar = useCallback(async (
        order: Order,
        eventId: string
    ): Promise<boolean> => {
        if (!token || !status.isConnected) return false

        try {
            setIsSyncing(true)

            const response = await fetch('/api/google-calendar/events', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    eventId,
                    type: 'order',
                    calendarId: selectedCalendarId,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    data: {
                        orderId: order.id,
                        orderNumber: order.orderNumber,
                        customerName: order.customerName,
                        customerPhone: order.customerPhone,
                        customerEmail: order.customerEmail,
                        items: order.items.map(item => ({
                            recipeName: item.recipeName,
                            quantity: item.quantity,
                        })),
                        deliveryDate: order.deliveryDate,
                        deliveryTime: order.deliveryTime,
                        deliveryAddress: order.deliveryAddress,
                        productionDate: order.productionDate,
                        productionDuration: order.productionDuration,
                        notes: order.notes,
                        status: order.status,
                    },
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to update event')
            }

            return true
        } catch (error) {
            console.error('Update calendar error:', error)
            return false
        } finally {
            setIsSyncing(false)
        }
    }, [token, status.isConnected, selectedCalendarId])

    // Delete order from Google Calendar
    const deleteOrderFromCalendar = useCallback(async (eventId: string): Promise<boolean> => {
        if (!token || !status.isConnected) return false

        try {
            setIsSyncing(true)

            const response = await fetch(
                `/api/google-calendar/events?eventId=${eventId}&calendarId=${selectedCalendarId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            )

            if (!response.ok) {
                throw new Error('Failed to delete event')
            }

            toast({
                title: 'Removed from Calendar',
                description: 'Order removed from Google Calendar',
            })

            return true
        } catch (error) {
            console.error('Delete from calendar error:', error)
            return false
        } finally {
            setIsSyncing(false)
        }
    }, [token, status.isConnected, selectedCalendarId, toast])

    // Add blocked date to Google Calendar
    const addBlockedDateToCalendar = useCallback(async (
        date: string,
        reason?: string
    ): Promise<string | null> => {
        if (!token || !status.isConnected) return null

        try {
            setIsSyncing(true)

            const response = await fetch('/api/google-calendar/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    type: 'blocked_date',
                    calendarId: selectedCalendarId,
                    data: {
                        date,
                        reason: reason || 'Unavailable',
                    },
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to add blocked date')
            }

            return data.eventId
        } catch (error) {
            console.error('Add blocked date error:', error)
            return null
        } finally {
            setIsSyncing(false)
        }
    }, [token, status.isConnected, selectedCalendarId])

    return {
        // Connection status
        status,
        isConnected: status.isConnected,
        connectedEmail: status.connectedEmail,
        isLoading: status.isLoading,
        isSyncing,

        // Calendar selection
        calendars,
        selectedCalendarId,
        setSelectedCalendarId,

        // Actions
        connectGoogleCalendar,
        disconnectGoogleCalendar,
        checkConnectionStatus,

        // Order operations
        addOrderToCalendar,
        updateOrderInCalendar,
        deleteOrderFromCalendar,

        // Blocked date operations
        addBlockedDateToCalendar,
    }
}
