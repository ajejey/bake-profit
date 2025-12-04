'use client'

import { useState, useEffect, useCallback } from 'react'
import { getCalendarSettings, setCalendarSettings } from '../utils/settings'
import type { CalendarSettings } from '../utils/settings'

export function useCalendarSettings() {
    const [settings, setSettingsState] = useState<CalendarSettings>({
        weekStartsOn: 0,
        defaultProductionLeadTime: 1,
        dailyCapacityHours: 8,
        blockedDates: [],
        showProductionDates: true,
        enableCapacityWarnings: true,
    })
    const [isLoading, setIsLoading] = useState(true)

    // Load settings from IndexedDB on mount
    useEffect(() => {
        getCalendarSettings()
            .then(setSettingsState)
            .catch((error) => {
                console.error('Error loading calendar settings:', error)
            })
            .finally(() => setIsLoading(false))
    }, [])

    // Save settings to IndexedDB
    const updateSettings = useCallback(async (newSettings: Partial<CalendarSettings>) => {
        const updated = { ...settings, ...newSettings }
        setSettingsState(updated)

        try {
            await setCalendarSettings(updated)
        } catch (error) {
            console.error('Error saving calendar settings:', error)
        }
    }, [settings])

    // Helper to add a blocked date
    const addBlockedDate = useCallback(async (date: string) => {
        if (!settings.blockedDates.includes(date)) {
            await updateSettings({
                blockedDates: [...settings.blockedDates, date],
            })
        }
    }, [settings.blockedDates, updateSettings])

    // Helper to remove a blocked date
    const removeBlockedDate = useCallback(async (date: string) => {
        await updateSettings({
            blockedDates: settings.blockedDates.filter(d => d !== date),
        })
    }, [settings.blockedDates, updateSettings])

    // Helper to check if a date is blocked
    const isDateBlocked = useCallback((date: string): boolean => {
        return settings.blockedDates.includes(date)
    }, [settings.blockedDates])

    // Helper to block a date range
    const blockDateRange = useCallback(async (startDate: string, endDate: string) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const dates: string[] = []

        const current = new Date(start)
        while (current <= end) {
            const dateStr = current.toISOString().split('T')[0]
            if (!settings.blockedDates.includes(dateStr)) {
                dates.push(dateStr)
            }
            current.setDate(current.getDate() + 1)
        }

        if (dates.length > 0) {
            await updateSettings({
                blockedDates: [...settings.blockedDates, ...dates],
            })
        }
    }, [settings.blockedDates, updateSettings])

    // Reset to defaults
    const resetSettings = useCallback(async () => {
        const defaults: CalendarSettings = {
            weekStartsOn: 0,
            defaultProductionLeadTime: 1,
            dailyCapacityHours: 8,
            blockedDates: [],
            showProductionDates: true,
            enableCapacityWarnings: true,
        }
        setSettingsState(defaults)
        try {
            await setCalendarSettings(defaults)
        } catch (error) {
            console.error('Error resetting calendar settings:', error)
        }
    }, [])

    return {
        settings,
        isLoading,
        updateSettings,
        addBlockedDate,
        removeBlockedDate,
        isDateBlocked,
        blockDateRange,
        resetSettings,
    }
}
