'use client'

/**
 * useSyncedSettings - Hook that wraps all settings save operations with SyncEngine
 * 
 * This ensures settings changes are:
 * 1. Saved locally to IndexedDB
 * 2. Queued for sync to MongoDB via SyncEngine
 * 3. Synced across devices when user is logged in
 */

import { SyncEngine } from '@/lib/sync/SyncEngine'
import {
    getBusinessSettings,
    setBusinessSettings as saveBusinessSettings,
    getOrderSettings,
    setOrderSettings as saveOrderSettings,
    getRecipeSettings,
    setRecipeSettings as saveRecipeSettings,
    getAppearanceSettings,
    setAppearanceSettings as saveAppearanceSettings,
    getNotificationSettings,
    setNotificationSettings as saveNotificationSettings,
    getCalendarSettings,
    setCalendarSettings as saveCalendarSettings,
    type BusinessSettings,
    type OrderSettings,
    type RecipeSettings,
    type AppearanceSettings,
    type NotificationSettings,
    type CalendarSettings,
} from '../utils/settings'
import { StorageAdapter } from '../utils/indexedDBAdapter'
import type { PDFCustomization } from '../types'

const PDF_STORAGE_KEY = 'pdfCustomization'

/**
 * Get PDF customization from storage
 */
export async function getPDFCustomization(): Promise<PDFCustomization> {
    if (typeof window === 'undefined') {
        return getDefaultPDFCustomization()
    }

    const stored = await StorageAdapter.getItem(PDF_STORAGE_KEY)
    if (!stored) return getDefaultPDFCustomization()

    try {
        return { ...getDefaultPDFCustomization(), ...JSON.parse(stored) }
    } catch {
        return getDefaultPDFCustomization()
    }
}

/**
 * Save PDF customization to storage
 */
export async function savePDFCustomization(settings: PDFCustomization): Promise<void> {
    await StorageAdapter.setItem(PDF_STORAGE_KEY, JSON.stringify(settings))
}

function getDefaultPDFCustomization(): PDFCustomization {
    return {
        businessName: 'BakeProfit Business',
        showLogo: false,
        showBusinessInfo: true,
        invoicePrefix: 'INV-',
        defaultPaymentTerms: 'net-7',
        defaultTaxRate: 0,
        footerText: 'Thank you for your business!',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
}

/**
 * Synced settings functions - these save locally AND queue for MongoDB sync
 */

export async function setBusinessSettingsSynced(settings: BusinessSettings): Promise<void> {
    try {
        // Save to IndexedDB
        await saveBusinessSettings(settings)
        // Queue for sync to MongoDB
        SyncEngine.recordOperation('businessSettings', 'user', 'update', settings)
        // Trigger sync indicator
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('data:changed'))
        }
    } catch (error) {
        console.error('Failed to save business settings:', error)
        throw error
    }
}

export async function setOrderSettingsSynced(settings: OrderSettings): Promise<void> {
    try {
        await saveOrderSettings(settings)
        SyncEngine.recordOperation('orderSettings', 'user', 'update', settings)
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('data:changed'))
        }
    } catch (error) {
        console.error('Failed to save order settings:', error)
        throw error
    }
}

export async function setRecipeSettingsSynced(settings: RecipeSettings): Promise<void> {
    try {
        await saveRecipeSettings(settings)
        SyncEngine.recordOperation('recipeSettings', 'user', 'update', settings)
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('data:changed'))
        }
    } catch (error) {
        console.error('Failed to save recipe settings:', error)
        throw error
    }
}

export async function setAppearanceSettingsSynced(settings: AppearanceSettings): Promise<void> {
    try {
        await saveAppearanceSettings(settings)
        SyncEngine.recordOperation('appearanceSettings', 'user', 'update', settings)
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('data:changed'))
        }
    } catch (error) {
        console.error('Failed to save appearance settings:', error)
        throw error
    }
}

export async function setNotificationSettingsSynced(settings: NotificationSettings): Promise<void> {
    try {
        await saveNotificationSettings(settings)
        SyncEngine.recordOperation('notificationSettings', 'user', 'update', settings)
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('data:changed'))
        }
    } catch (error) {
        console.error('Failed to save notification settings:', error)
        throw error
    }
}

export async function setCalendarSettingsSynced(settings: CalendarSettings): Promise<void> {
    try {
        await saveCalendarSettings(settings)
        SyncEngine.recordOperation('calendarSettings', 'user', 'update', settings)
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('data:changed'))
        }
    } catch (error) {
        console.error('Failed to save calendar settings:', error)
        throw error
    }
}

export async function setPDFCustomizationSynced(settings: PDFCustomization): Promise<void> {
    try {
        await savePDFCustomization(settings)
        SyncEngine.recordOperation('pdfCustomization', 'user', 'update', settings)
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('data:changed'))
        }
    } catch (error) {
        console.error('Failed to save PDF customization:', error)
        throw error
    }
}
/**
 * Hook that provides all synced settings operations
 */
export function useSyncedSettings() {
    return {
        // Getters (unchanged)
        getBusinessSettings,
        getOrderSettings,
        getRecipeSettings,
        getAppearanceSettings,
        getNotificationSettings,
        getCalendarSettings,
        getPDFCustomization,

        // Synced setters
        setBusinessSettings: setBusinessSettingsSynced,
        setOrderSettings: setOrderSettingsSynced,
        setRecipeSettings: setRecipeSettingsSynced,
        setAppearanceSettings: setAppearanceSettingsSynced,
        setNotificationSettings: setNotificationSettingsSynced,
        setCalendarSettings: setCalendarSettingsSynced,
        setPDFCustomization: setPDFCustomizationSynced,
    }
}
