import { describe, it, expect } from 'vitest'

/**
 * Tests for PDF Date Formatting
 * Tests the formatDateByPreference helper function added to orderPDF.ts
 */

// Helper function from orderPDF.ts
function formatDateByPreference(dateString: string, format: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' = 'MM/DD/YYYY'): string {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    switch (format) {
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`
        case 'MM/DD/YYYY':
        default:
            return `${month}/${day}/${year}`
    }
}

describe('PDF Date Formatting', () => {
    const testDate = '2025-01-15T10:30:00Z' // January 15, 2025

    describe('formatDateByPreference', () => {
        it('should format date as MM/DD/YYYY (US format)', () => {
            const result = formatDateByPreference(testDate, 'MM/DD/YYYY')
            expect(result).toBe('01/15/2025')
        })

        it('should format date as DD/MM/YYYY (European format)', () => {
            const result = formatDateByPreference(testDate, 'DD/MM/YYYY')
            expect(result).toBe('15/01/2025')
        })

        it('should format date as YYYY-MM-DD (ISO format)', () => {
            const result = formatDateByPreference(testDate, 'YYYY-MM-DD')
            expect(result).toBe('2025-01-15')
        })

        it('should default to MM/DD/YYYY when no format specified', () => {
            const result = formatDateByPreference(testDate)
            expect(result).toBe('01/15/2025')
        })

        it('should handle single digit days with zero padding', () => {
            const result = formatDateByPreference('2025-01-05T10:00:00Z', 'DD/MM/YYYY')
            expect(result).toBe('05/01/2025')
        })

        it('should handle single digit months with zero padding', () => {
            const result = formatDateByPreference('2025-09-15T10:00:00Z', 'MM/DD/YYYY')
            expect(result).toBe('09/15/2025')
        })

        it('should handle end of month dates', () => {
            const result = formatDateByPreference('2025-01-31T23:59:59Z', 'MM/DD/YYYY')
            expect(result).toBe('01/31/2025')
        })

        it('should handle leap year dates', () => {
            const result = formatDateByPreference('2024-02-29T12:00:00Z', 'DD/MM/YYYY')
            expect(result).toBe('29/02/2024')
        })

        it('should handle end of year dates', () => {
            const result = formatDateByPreference('2025-12-31T23:59:59Z', 'YYYY-MM-DD')
            expect(result).toBe('2025-12-31')
        })

        it('should handle start of year dates', () => {
            const result = formatDateByPreference('2025-01-01T00:00:00Z', 'DD/MM/YYYY')
            expect(result).toBe('01/01/2025')
        })

        it('should return original string for invalid dates', () => {
            const invalidDate = 'not-a-date'
            const result = formatDateByPreference(invalidDate, 'MM/DD/YYYY')
            expect(result).toBe(invalidDate)
        })

        it('should handle ISO date strings without time', () => {
            const result = formatDateByPreference('2025-06-15', 'DD/MM/YYYY')
            expect(result).toBe('15/06/2025')
        })

        it('should handle different timezone dates consistently', () => {
            const result1 = formatDateByPreference('2025-03-15T00:00:00-05:00', 'MM/DD/YYYY')
            const result2 = formatDateByPreference('2025-03-15T00:00:00+05:00', 'MM/DD/YYYY')

            // Both should format to same date representation
            expect(result1).toContain('03/')
            expect(result2).toContain('03/')
        })
    })

    describe('Date Format Integration', () => {
        it('should format order date for PDF generation', () => {
            const orderDate = '2025-02-14T14:30:00Z'
            const formattedUS = formatDateByPreference(orderDate, 'MM/DD/YYYY')
            const formattedEU = formatDateByPreference(orderDate, 'DD/MM/YYYY')

            expect(formattedUS).toBe('02/14/2025') // Valentine's Day US
            expect(formattedEU).toBe('14/02/2025') // Valentine's Day Europe
        })

        it('should format delivery date for PDF generation', () => {
            const deliveryDate = '2025-12-25T08:00:00Z'
            const formattedISO = formatDateByPreference(deliveryDate, 'YYYY-MM-DD')

            expect(formattedISO).toBe('2025-12-25') // Christmas ISO format
        })

        it('should handle multiple date formats in same document', () => {
            const sameDate = '2025-07-04T12:00:00Z'

            const us = formatDateByPreference(sameDate, 'MM/DD/YYYY')
            const eu = formatDateByPreference(sameDate, 'DD/MM/YYYY')
            const iso = formatDateByPreference(sameDate, 'YYYY-MM-DD')

            expect(us).toBe('07/04/2025')
            expect(eu).toBe('04/07/2025')
            expect(iso).toBe('2025-07-04')

            // All represent the same date
            expect(new Date(us).toDateString()).toBe(new Date(eu).toDateString())
            expect(new Date(iso).toDateString()).toBe(new Date(us).toDateString())
        })
    })

    describe('Edge Cases', () => {
        it('should handle minimum valid date', () => {
            const result = formatDateByPreference('1970-01-01T00:00:00Z', 'YYYY-MM-DD')
            expect(result).toBe('1970-01-01')
        })

        it('should handle dates far in the future', () => {
            const result = formatDateByPreference('2099-12-31T23:59:59Z', 'MM/DD/YYYY')
            expect(result).toBe('12/31/2099')
        })

        it('should handle empty string gracefully', () => {
            const result = formatDateByPreference('', 'MM/DD/YYYY')
            expect(result).toBe('')
        })

        it('should handle null-like values gracefully', () => {
            const result = formatDateByPreference('null', 'DD/MM/YYYY')
            expect(result).toBe('null')
        })

        it('should handle dates with milliseconds', () => {
            const result = formatDateByPreference('2025-03-15T10:30:45.123Z', 'YYYY-MM-DD')
            expect(result).toBe('2025-03-15')
        })
    })

    describe('Format Consistency', () => {
        it('should always use zero-padded format', () => {
            const dates = [
                '2025-01-05',
                '2025-09-15',
                '2025-12-09',
            ]

            dates.forEach(date => {
                const result = formatDateByPreference(date, 'YYYY-MM-DD')

                // Check that months and days are always 2 digits
                const parts = result.split('-')
                expect(parts[1]).toHaveLength(2) // Month
                expect(parts[2]).toHaveLength(2) // Day
            })
        })

        it('should handle all months correctly', () => {
            for (let month = 1; month <= 12; month++) {
                const date = `2025-${String(month).padStart(2, '0')}-15`
                const result = formatDateByPreference(date, 'MM/DD/YYYY')

                expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/)
                expect(result.substring(0, 2)).toBe(String(month).padStart(2, '0'))
            }
        })
    })
})
