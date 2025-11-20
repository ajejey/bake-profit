import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import {
    usePreferredWeightUnit,
    usePreferredVolumeUnit,
    useRequirePhone,
    useAutoSaveCustomers,
    useShowCostBreakdown
} from '../useSettings'
import {
    getBusinessSettings,
    getOrderSettings,
    getRecipeSettings
} from '../../utils/settings'

// Mock the settings utilities
vi.mock('../../utils/settings', () => ({
    getBusinessSettings: vi.fn(),
    getOrderSettings: vi.fn(),
    getRecipeSettings: vi.fn(),
    setBusinessSettings: vi.fn(),
    setOrderSettings: vi.fn(),
    setRecipeSettings: vi.fn(),
}))

describe('Unit Preference Hooks', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('usePreferredWeightUnit', () => {
        it('should return "lb" for imperial weight system', async () => {
            vi.mocked(getBusinessSettings).mockResolvedValue({
                currency: 'USD',
                currencyPosition: 'before',
                defaultMarkup: '150',
                taxRate: '0',
                dateFormat: 'MM/DD/YYYY',
                timeFormat: '12',
                timezone: 'America/New_York',
                weekStart: 'sunday',
                weightSystem: 'imperial',
                volumeSystem: 'imperial',
                temperature: 'fahrenheit',
            })

            const { result } = renderHook(() => usePreferredWeightUnit())

            await waitFor(() => {
                expect(result.current.loading).toBe(false)
            })

            expect(result.current.unit).toBe('lb')
        })

        it('should return "g" for metric weight system', async () => {
            vi.mocked(getBusinessSettings).mockResolvedValue({
                currency: 'USD',
                currencyPosition: 'before',
                defaultMarkup: '150',
                taxRate: '0',
                dateFormat: 'MM/DD/YYYY',
                timeFormat: '12',
                timezone: 'America/New_York',
                weekStart: 'sunday',
                weightSystem: 'metric',
                volumeSystem: 'metric',
                temperature: 'celsius',
            })

            const { result } = renderHook(() => usePreferredWeightUnit())

            await waitFor(() => {
                expect(result.current.loading).toBe(false)
            })

            expect(result.current.unit).toBe('g')
        })

        it('should return "g" for "both" weight system', async () => {
            vi.mocked(getBusinessSettings).mockResolvedValue({
                currency: 'USD',
                currencyPosition: 'before',
                defaultMarkup: '150',
                taxRate: '0',
                dateFormat: 'MM/DD/YYYY',
                timeFormat: '12',
                timezone: 'America/New_York',
                weekStart: 'sunday',
                weightSystem: 'both',
                volumeSystem: 'both',
                temperature: 'fahrenheit',
            })

            const { result } = renderHook(() => usePreferredWeightUnit())

            await waitFor(() => {
                expect(result.current.loading).toBe(false)
            })

            expect(result.current.unit).toBe('g')
        })

        it('should start with loading state', () => {
            vi.mocked(getBusinessSettings).mockImplementation(() => new Promise(() => { }))

            const { result } = renderHook(() => usePreferredWeightUnit())

            expect(result.current.loading).toBe(true)
        })
    })

    describe('usePreferredVolumeUnit', () => {
        it('should return "cup" for imperial volume system', async () => {
            vi.mocked(getBusinessSettings).mockResolvedValue({
                currency: 'USD',
                currencyPosition: 'before',
                defaultMarkup: '150',
                taxRate: '0',
                dateFormat: 'MM/DD/YYYY',
                timeFormat: '12',
                timezone: 'America/New_York',
                weekStart: 'sunday',
                weightSystem: 'imperial',
                volumeSystem: 'imperial',
                temperature: 'fahrenheit',
            })

            const { result } = renderHook(() => usePreferredVolumeUnit())

            await waitFor(() => {
                expect(result.current.loading).toBe(false)
            })

            expect(result.current.unit).toBe('cup')
        })

        it('should return "ml" for metric volume system', async () => {
            vi.mocked(getBusinessSettings).mockResolvedValue({
                currency: 'USD',
                currencyPosition: 'before',
                defaultMarkup: '150',
                taxRate: '0',
                dateFormat: 'MM/DD/YYYY',
                timeFormat: '12',
                timezone: 'America/New_York',
                weekStart: 'sunday',
                weightSystem: 'metric',
                volumeSystem: 'metric',
                temperature: 'celsius',
            })

            const { result } = renderHook(() => usePreferredVolumeUnit())

            await waitFor(() => {
                expect(result.current.loading).toBe(false)
            })

            expect(result.current.unit).toBe('ml')
        })
    })
})

describe('Order Settings Hooks', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('useRequirePhone', () => {
        it('should return true when phone is required', async () => {
            vi.mocked(getOrderSettings).mockResolvedValue({
                defaultStatus: 'new',
                autoIncrement: true,
                orderPrefix: 'ORD',
                leadTime: '2',
                requirePhone: true,
                autoSaveCustomers: true,
            })

            const { result } = renderHook(() => useRequirePhone())

            await waitFor(() => {
                expect(result.current.loading).toBe(false)
            })

            expect(result.current.requirePhone).toBe(true)
        })

        it('should return false when phone is not required', async () => {
            vi.mocked(getOrderSettings).mockResolvedValue({
                defaultStatus: 'new',
                autoIncrement: true,
                orderPrefix: 'ORD',
                leadTime: '2',
                requirePhone: false,
                autoSaveCustomers: true,
            })

            const { result } = renderHook(() => useRequirePhone())

            await waitFor(() => {
                expect(result.current.loading).toBe(false)
            })

            expect(result.current.requirePhone).toBe(false)
        })
    })

    describe('useAutoSaveCustomers', () => {
        it('should return true when auto-save is enabled', async () => {
            vi.mocked(getOrderSettings).mockResolvedValue({
                defaultStatus: 'new',
                autoIncrement: true,
                orderPrefix: 'ORD',
                leadTime: '2',
                requirePhone: false,
                autoSaveCustomers: true,
            })

            const { result } = renderHook(() => useAutoSaveCustomers())

            await waitFor(() => {
                expect(result.current.loading).toBe(false)
            })

            expect(result.current.autoSave).toBe(true)
        })

        it('should return false when auto-save is disabled', async () => {
            vi.mocked(getOrderSettings).mockResolvedValue({
                defaultStatus: 'new',
                autoIncrement: true,
                orderPrefix: 'ORD',
                leadTime: '2',
                requirePhone: false,
                autoSaveCustomers: false,
            })

            const { result } = renderHook(() => useAutoSaveCustomers())

            await waitFor(() => {
                expect(result.current.loading).toBe(false)
            })

            expect(result.current.autoSave).toBe(false)
        })
    })
})

describe('Recipe Settings Hooks', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('useShowCostBreakdown', () => {
        it('should return true when cost breakdown should be shown', async () => {
            vi.mocked(getRecipeSettings).mockResolvedValue({
                defaultServings: '12',
                laborCostPerHour: '15',
                overheadPercentage: '10',
                showCostBreakdown: true,
            })

            const { result } = renderHook(() => useShowCostBreakdown())

            await waitFor(() => {
                expect(result.current.loading).toBe(false)
            })

            expect(result.current.showBreakdown).toBe(true)
        })

        it('should return false when cost breakdown should be hidden', async () => {
            vi.mocked(getRecipeSettings).mockResolvedValue({
                defaultServings: '12',
                laborCostPerHour: '15',
                overheadPercentage: '10',
                showCostBreakdown: false,
            })

            const { result } = renderHook(() => useShowCostBreakdown())

            await waitFor(() => {
                expect(result.current.loading).toBe(false)
            })

            expect(result.current.showBreakdown).toBe(false)
        })
    })
})

describe('Hook Error Handling', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should handle getBusinessSettings error gracefully', async () => {
        vi.mocked(getBusinessSettings).mockRejectedValue(new Error('Storage error'))

        const { result } = renderHook(() => usePreferredWeightUnit())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        // Should use default value
        expect(result.current.unit).toBe('lb')
    })

    it('should handle getOrderSettings error gracefully', async () => {
        vi.mocked(getOrderSettings).mockRejectedValue(new Error('Storage error'))

        const { result } = renderHook(() => useRequirePhone())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        // Should use default value (false)
        expect(result.current.requirePhone).toBe(false)
    })

    it('should handle getRecipeSettings error gracefully', async () => {
        vi.mocked(getRecipeSettings).mockRejectedValue(new Error('Storage error'))

        const { result } = renderHook(() => useShowCostBreakdown())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        // Should use default value (true)
        expect(result.current.showBreakdown).toBe(true)
    })
})
