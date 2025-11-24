'use client'

import { useState, useEffect } from 'react'
import type { CalendarSettings } from '../types'

const DEFAULT_CALENDAR_SETTINGS: CalendarSettings = {
    weekStartsOn: 0, // Sunday
    defaultProductionLeadTime: 1, // 1 day before delivery
    dailyCapacityHours: 8, // 8 hours per day
    blockedDates: [],
    showProductionDates: true,
    enableCapacityWarnings: true,
}

const STORAGE_KEY = 'bakery-calendar-settings'

export function useCalendarSettings() {
    const [settings, setSettings] = useState<CalendarSettings>(DEFAULT_CALENDAR_SETTINGS)
    const [isLoading, setIsLoading] = useState(true)

    // Load settings from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                const parsed = JSON.parse(stored) as CalendarSettings
                setSettings({ ...DEFAULT_CALENDAR_SETTINGS, ...parsed })
            }
        } catch (error) {
            console.error('Error loading calendar settings:', error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Save settings to localStorage
    const updateSettings = (newSettings: Partial<CalendarSettings>) => {
        const updated = { ...settings, ...newSettings }
        setSettings(updated)

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        } catch (error) {
            console.error('Error saving calendar settings:', error)
        }
    }

    // Helper to add a blocked date
    const addBlockedDate = (date: string) => {
        if (!settings.blockedDates.includes(date)) {
            updateSettings({
                blockedDates: [...settings.blockedDates, date],
            })
        }
    }

    // Helper to remove a blocked date
    const removeBlockedDate = (date: string) => {
        updateSettings({
            blockedDates: settings.blockedDates.filter(d => d !== date),
        })
    }

    // Helper to check if a date is blocked
    const isDateBlocked = (date: string): boolean => {
        return settings.blockedDates.includes(date)
    }

    // Helper to block a date range
    const blockDateRange = (startDate: string, endDate: string) => {
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
            updateSettings({
                blockedDates: [...settings.blockedDates, ...dates],
            })
        }
    }

    // Reset to defaults
    const resetSettings = () => {
        setSettings(DEFAULT_CALENDAR_SETTINGS)
        try {
            localStorage.removeItem(STORAGE_KEY)
        } catch (error) {
            console.error('Error resetting calendar settings:', error)
        }
    }

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
