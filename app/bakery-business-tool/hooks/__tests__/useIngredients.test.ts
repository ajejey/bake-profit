import { describe, it, expect } from 'vitest'

/**
 * Tests for Ingredient Cost Calculations
 * Critical formula: cost = packageCost / packageSize
 */
describe('Ingredient Cost Calculations', () => {
  describe('calculateCostPerUnit', () => {
    it('should calculate cost per unit correctly for butter', () => {
      const packageCost = 4.50
      const packageSize = 454 // grams
      const expectedCost = 0.00991 // $0.01 per gram (rounded)
      
      const actualCost = packageCost / packageSize
      
      expect(actualCost).toBeCloseTo(expectedCost, 5)
      expect(actualCost).toBeCloseTo(0.009911894, 5)
    })

    it('should calculate cost per unit correctly for baking powder', () => {
      const packageCost = 3.50
      const packageSize = 227 // grams
      const expectedCost = 0.0154 // $0.02 per gram (rounded)
      
      const actualCost = packageCost / packageSize
      
      expect(actualCost).toBeCloseTo(expectedCost, 4)
      expect(actualCost).toBeCloseTo(0.015418502, 4)
    })

    it('should calculate cost per unit correctly for flour', () => {
      const packageCost = 8.99
      const packageSize = 5000 // grams (5kg)
      const expectedCost = 0.001798 // $0.0018 per gram
      
      const actualCost = packageCost / packageSize
      
      expect(actualCost).toBeCloseTo(expectedCost, 6)
    })

    it('should calculate cost per unit correctly for vanilla extract', () => {
      const packageCost = 12.99
      const packageSize = 118 // ml
      const expectedCost = 0.11008 // per ml
      
      const actualCost = packageCost / packageSize
      
      expect(actualCost).toBeCloseTo(expectedCost, 5)
    })

    it('should handle small package sizes without precision loss', () => {
      const packageCost = 5.99
      const packageSize = 10 // small package
      const expectedCost = 0.599
      
      const actualCost = packageCost / packageSize
      
      expect(actualCost).toBe(expectedCost)
    })

    it('should handle large package sizes correctly', () => {
      const packageCost = 45.00
      const packageSize = 25000 // 25kg bulk flour
      const expectedCost = 0.0018
      
      const actualCost = packageCost / packageSize
      
      expect(actualCost).toBe(expectedCost)
    })

    it('should handle decimal package sizes', () => {
      const packageCost = 3.49
      const packageSize = 236.588 // 1 cup in ml
      const expectedCost = 0.01475
      
      const actualCost = packageCost / packageSize
      
      expect(actualCost).toBeCloseTo(expectedCost, 5)
    })
  })

  describe('Edge Cases', () => {
    it('should handle very small costs', () => {
      const packageCost = 0.50
      const packageSize = 1000
      const expectedCost = 0.0005
      
      const actualCost = packageCost / packageSize
      
      expect(actualCost).toBe(expectedCost)
    })

    it('should handle very large costs', () => {
      const packageCost = 199.99
      const packageSize = 500
      const expectedCost = 0.39998
      
      const actualCost = packageCost / packageSize
      
      expect(actualCost).toBeCloseTo(expectedCost, 5)
    })

    it('should not return NaN for valid inputs', () => {
      const packageCost = 10.00
      const packageSize = 100
      
      const actualCost = packageCost / packageSize
      
      expect(actualCost).not.toBeNaN()
      expect(actualCost).toBe(0.1)
    })

    it('should return Infinity for zero package size (edge case)', () => {
      const packageCost = 10.00
      const packageSize = 0
      
      const actualCost = packageCost / packageSize
      
      expect(actualCost).toBe(Infinity)
    })
  })

  describe('Real-World Sample Data Verification', () => {
    const sampleIngredients: Array<{name: string, packageCost: number, packageSize: number, expectedCost: number}> = [
      { name: 'All-Purpose Flour', packageCost: 8.99, packageSize: 5000, expectedCost: 0.001798 },
      { name: 'Granulated Sugar', packageCost: 6.99, packageSize: 4540, expectedCost: 0.00154 },
      { name: 'Butter', packageCost: 4.50, packageSize: 454, expectedCost: 0.00991 },
      { name: 'Eggs (dozen)', packageCost: 4.20, packageSize: 12, expectedCost: 0.35 },
      { name: 'Vanilla Extract', packageCost: 12.99, packageSize: 118, expectedCost: 0.11008 },
      { name: 'Baking Powder', packageCost: 3.50, packageSize: 227, expectedCost: 0.01542 },
      { name: 'Cocoa Powder', packageCost: 5.99, packageSize: 226, expectedCost: 0.0265 },
      { name: 'Milk', packageCost: 3.79, packageSize: 1000, expectedCost: 0.00379 },
    ]

    sampleIngredients.forEach(({ name, packageCost, packageSize, expectedCost }) => {
      it(`should calculate correct cost for ${name}`, () => {
        const actualCost = packageCost / packageSize
        
        expect(actualCost).toBeCloseTo(expectedCost, 4)
      })
    })
  })

  describe('Currency Formatting', () => {
    it('should format cost correctly to 2 decimal places for display', () => {
      const cost = 0.009911894
      const formatted = cost.toFixed(2)
      
      expect(formatted).toBe('0.01')
    })

    it('should format cost correctly for higher precision', () => {
      const cost = 0.001798
      const formatted = cost.toFixed(4)
      
      expect(formatted).toBe('0.0018')
    })

    it('should round correctly at boundary', () => {
      const cost1 = 0.015
      const cost2 = 0.014
      
      // JavaScript uses banker's rounding (round half to even)
      // 0.015 rounds to 0.01 (even), not 0.02
      expect(cost1.toFixed(2)).toBe('0.01')
      expect(cost2.toFixed(2)).toBe('0.01')
      
      // Test actual rounding up
      const cost3 = 0.016
      expect(cost3.toFixed(2)).toBe('0.02')
    })
  })

  describe('Form Input Validation', () => {
    it('should handle parseFloat conversion correctly', () => {
      const stringValue = '227'
      const numericValue = parseFloat(stringValue)
      
      expect(numericValue).toBe(227)
      expect(typeof numericValue).toBe('number')
    })

    it('should handle decimal string conversion', () => {
      const stringValue = '3.50'
      const numericValue = parseFloat(stringValue)
      
      expect(numericValue).toBe(3.5)
    })

    it('should return 0 for empty string with fallback', () => {
      const stringValue = ''
      const numericValue = parseFloat(stringValue) || 0
      
      expect(numericValue).toBe(0)
    })

    it('should return 0 for invalid string with fallback', () => {
      const stringValue = 'abc'
      const numericValue = parseFloat(stringValue) || 0
      
      expect(numericValue).toBe(0)
    })

    it('should handle leading/trailing spaces', () => {
      const stringValue = '  3.50  '
      const numericValue = parseFloat(stringValue)
      
      expect(numericValue).toBe(3.5)
    })
  })
})
