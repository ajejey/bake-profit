'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar as CalendarIcon, Clock, AlertTriangle, X, RotateCcw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { getCalendarSettings, type CalendarSettings as CalendarSettingsType } from '@/app/bakery-business-tool/utils/settings'
import { useSyncedSettings } from '@/app/bakery-business-tool/hooks'
import { format, parseISO } from 'date-fns'
import { GoogleCalendarSettings } from '@/app/bakery-business-tool/components/GoogleCalendarSettings'

export default function CalendarSettings() {
    const { toast } = useToast()
    const { setCalendarSettings } = useSyncedSettings()
    const [isLoading, setIsLoading] = useState(true)
    const [settings, setSettingsState] = useState<CalendarSettingsType>({
        weekStartsOn: 0,
        defaultProductionLeadTime: 1,
        dailyCapacityHours: 8,
        blockedDates: [],
        showProductionDates: true,
        enableCapacityWarnings: true,
    })
    const [hasChanges, setHasChanges] = useState(false)
    const [newBlockedDate, setNewBlockedDate] = useState('')

    // Load settings on mount
    // Load settings on mount
    useEffect(() => {
        const loadSettings = () => {
            getCalendarSettings()
                .then((loaded) => {
                    setSettingsState(loaded)
                })
                .catch((error) => {
                    console.error('Error loading calendar settings:', error)
                })
                .finally(() => setIsLoading(false))
        }

        loadSettings()

        // Listen for sync updates
        const handleDataChanged = () => {
            loadSettings()
        }

        window.addEventListener('data:changed', handleDataChanged)
        return () => window.removeEventListener('data:changed', handleDataChanged)
    }, [])

    // Save settings
    const handleSave = async () => {
        try {
            await setCalendarSettings(settings)
            setHasChanges(false)
            toast({
                title: 'Settings saved',
                description: 'Your calendar settings have been updated.',
            })
        } catch (error) {
            console.error('Error saving calendar settings:', error)
            toast({
                title: 'Error',
                description: 'Failed to save calendar settings.',
                variant: 'destructive',
            })
        }
    }

    // Update a setting
    const updateSetting = <K extends keyof CalendarSettingsType>(key: K, value: CalendarSettingsType[K]) => {
        setSettingsState((prev) => ({ ...prev, [key]: value }))
        setHasChanges(true)
    }

    // Add blocked date
    const handleAddBlockedDate = () => {
        if (newBlockedDate && !settings.blockedDates.includes(newBlockedDate)) {
            updateSetting('blockedDates', [...settings.blockedDates, newBlockedDate])
            setNewBlockedDate('')
        }
    }

    // Remove blocked date
    const handleRemoveBlockedDate = (date: string) => {
        updateSetting('blockedDates', settings.blockedDates.filter((d) => d !== date))
    }

    // Reset to defaults
    const handleReset = async () => {
        const defaults: CalendarSettingsType = {
            weekStartsOn: 0,
            defaultProductionLeadTime: 1,
            dailyCapacityHours: 8,
            blockedDates: [],
            showProductionDates: true,
            enableCapacityWarnings: true,
        }
        setSettingsState(defaults)
        await setCalendarSettings(defaults)
        setHasChanges(false)
        toast({
            title: 'Settings reset',
            description: 'Calendar settings have been reset to defaults.',
        })
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Calendar Settings</h3>
                    <p className="text-sm text-gray-500">Configure your production calendar and scheduling preferences</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset
                    </Button>
                    <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* Google Calendar Sync */}
            <GoogleCalendarSettings />

            {/* Week Start */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        Week Start Day
                    </CardTitle>
                    <CardDescription>
                        Choose which day your work week starts on
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Select
                        value={String(settings.weekStartsOn)}
                        onValueChange={(value) => updateSetting('weekStartsOn', Number(value) as 0 | 1)}
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">Sunday</SelectItem>
                            <SelectItem value="1">Monday</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Production Planning */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Production Planning
                    </CardTitle>
                    <CardDescription>
                        Set your daily capacity and lead time for orders
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dailyCapacity">Daily Capacity (hours)</Label>
                            <Input
                                id="dailyCapacity"
                                type="number"
                                min="1"
                                max="24"
                                value={settings.dailyCapacityHours}
                                onChange={(e) => updateSetting('dailyCapacityHours', parseInt(e.target.value) || 8)}
                            />
                            <p className="text-xs text-gray-500">
                                Maximum production hours available per day
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="leadTime">Production Lead Time (days)</Label>
                            <Input
                                id="leadTime"
                                type="number"
                                min="0"
                                max="14"
                                value={settings.defaultProductionLeadTime}
                                onChange={(e) => updateSetting('defaultProductionLeadTime', parseInt(e.target.value) || 1)}
                            />
                            <p className="text-xs text-gray-500">
                                Days before delivery date to start production
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Display Options */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Display Options
                    </CardTitle>
                    <CardDescription>
                        Customize what information is shown on the calendar
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="showProductionDates">Show Production Dates</Label>
                            <p className="text-xs text-gray-500">Display when production should start for each order</p>
                        </div>
                        <Switch
                            id="showProductionDates"
                            checked={settings.showProductionDates}
                            onCheckedChange={(checked) => updateSetting('showProductionDates', checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="enableCapacityWarnings">Enable Capacity Warnings</Label>
                            <p className="text-xs text-gray-500">Show visual warnings when approaching daily capacity limits</p>
                        </div>
                        <Switch
                            id="enableCapacityWarnings"
                            checked={settings.enableCapacityWarnings}
                            onCheckedChange={(checked) => updateSetting('enableCapacityWarnings', checked)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Blocked Dates */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <X className="h-4 w-4" />
                        Blocked Dates
                    </CardTitle>
                    <CardDescription>
                        Mark dates when you&apos;re unavailable for production (holidays, vacations, etc.)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            type="date"
                            value={newBlockedDate}
                            onChange={(e) => setNewBlockedDate(e.target.value)}
                            className="w-48"
                        />
                        <Button variant="outline" onClick={handleAddBlockedDate} disabled={!newBlockedDate}>
                            Add Date
                        </Button>
                    </div>

                    {settings.blockedDates.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {settings.blockedDates.sort().map((date) => (
                                <Badge key={date} variant="secondary" className="flex items-center gap-1">
                                    {format(parseISO(date), 'MMM d, yyyy')}
                                    <button
                                        onClick={() => handleRemoveBlockedDate(date)}
                                        className="ml-1 hover:text-red-600"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No blocked dates set</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
