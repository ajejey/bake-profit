'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Calendar, Check, ExternalLink, Loader2, Unlink } from 'lucide-react'
import { useGoogleCalendarSync } from '../hooks/useGoogleCalendarSync'
import { getCalendarSettings, type CalendarSettings } from '../utils/settings'
import { useSyncedSettings } from '../hooks'
import { format } from 'date-fns'

export function GoogleCalendarSettings() {
    const {
        status,
        isConnected,
        connectedEmail,
        isLoading,
        calendars,
        selectedCalendarId,
        setSelectedCalendarId,
        connectGoogleCalendar,
        disconnectGoogleCalendar,
    } = useGoogleCalendarSync()

    const { setCalendarSettings } = useSyncedSettings()
    const [calendarSettings, setLocalCalendarSettings] = useState<CalendarSettings | null>(null)
    const [isDisconnecting, setIsDisconnecting] = useState(false)

    // Load calendar settings on mount
    useEffect(() => {
        getCalendarSettings().then(setLocalCalendarSettings)
    }, [])

    const handleDisconnect = async () => {
        setIsDisconnecting(true)
        await disconnectGoogleCalendar()
        setIsDisconnecting(false)
    }

    const handleAutoExportChange = async (value: 'ask' | 'always' | 'never') => {
        if (!calendarSettings) return
        const updated = { ...calendarSettings, googleCalendarAutoExport: value }
        setLocalCalendarSettings(updated)
        await setCalendarSettings(updated)
    }

    const handleSyncBlockedDatesChange = async (checked: boolean) => {
        if (!calendarSettings) return
        const updated = { ...calendarSettings, googleCalendarSyncBlockedDates: checked }
        setLocalCalendarSettings(updated)
        await setCalendarSettings(updated)
    }

    if (isLoading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                    <span className="ml-2 text-gray-500">Checking connection...</span>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Google Calendar Sync
                </CardTitle>
                <CardDescription>
                    Sync your orders and blocked dates to Google Calendar
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {isConnected ? (
                    <>
                        {/* Connected State */}
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100">
                                    <Check className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-green-900">Connected</p>
                                    <p className="text-xs text-green-700">{connectedEmail}</p>
                                    {status.connectedAt && (
                                        <p className="text-xs text-green-600">
                                            Since {format(new Date(status.connectedAt), 'MMM d, yyyy')}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDisconnect}
                                disabled={isDisconnecting}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                {isDisconnecting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Unlink className="h-4 w-4" />
                                )}
                                <span className="ml-1 hidden sm:inline">Disconnect</span>
                            </Button>
                        </div>

                        {/* Calendar Selection */}
                        {calendars.length > 0 && (
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">
                                    Sync to Calendar
                                </Label>
                                <Select
                                    value={selectedCalendarId}
                                    onValueChange={setSelectedCalendarId}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select calendar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {calendars.map(calendar => (
                                            <SelectItem key={calendar.id} value={calendar.id}>
                                                <span className="flex items-center gap-2">
                                                    {calendar.name}
                                                    {calendar.primary && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            Primary
                                                        </Badge>
                                                    )}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Auto-export preference */}
                        <div className="space-y-2 pt-2 border-t">
                            <Label className="text-sm font-medium text-gray-700">
                                When creating an order
                            </Label>
                            <Select
                                value={calendarSettings?.googleCalendarAutoExport || 'ask'}
                                onValueChange={(v) => handleAutoExportChange(v as 'ask' | 'always' | 'never')}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ask">Ask me each time</SelectItem>
                                    <SelectItem value="always">Always add to calendar</SelectItem>
                                    <SelectItem value="never">Never add automatically</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Sync blocked dates */}
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <Label className="text-sm font-medium text-gray-700">
                                    Sync blocked dates
                                </Label>
                                <p className="text-xs text-gray-500">
                                    Add unavailable dates to calendar
                                </p>
                            </div>
                            <Switch
                                checked={calendarSettings?.googleCalendarSyncBlockedDates ?? true}
                                onCheckedChange={handleSyncBlockedDatesChange}
                            />
                        </div>

                        {/* Open Google Calendar Link */}
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => window.open('https://calendar.google.com', '_blank')}
                        >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Google Calendar
                        </Button>
                    </>
                ) : (
                    <>
                        {/* Disconnected State */}
                        <div className="text-center py-4">
                            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                                <Calendar className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                Connect your Google Calendar to automatically add orders and blocked dates.
                            </p>
                            <Button
                                onClick={() => connectGoogleCalendar()}
                                className="gap-2"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                                    />
                                </svg>
                                Connect Google Calendar
                            </Button>
                        </div>

                        {/* Benefits */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Benefits:</p>
                            <ul className="text-xs text-gray-600 space-y-1">
                                <li>• View orders in your Google Calendar</li>
                                <li>• Get reminders before delivery dates</li>
                                <li>• Sync blocked dates automatically</li>
                                <li>• Access from any device</li>
                            </ul>
                        </div>

                        {/* Privacy Note */}
                        <p className="text-xs text-gray-500 text-center">
                            We only add events to your calendar. Your existing events remain private.
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
