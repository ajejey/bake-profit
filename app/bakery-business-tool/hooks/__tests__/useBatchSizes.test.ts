import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useBatchSizes, PRICING_STRATEGIES, SELLING_UNIT_PRESETS } from '../useBatchSizes'
import type { Recipe, SellingUnit } from '../../types'

// Mock the useRecipes hook
const mockUpdateRecipe = vi.fn()
const mockGetRecipeById = vi.fn()
const mockRecipes: Recipe[] = []

vi.mock('../useRecipes', () => ({
  useRecipes: () => ({
    recipes: mockRecipes,
    updateRecipe: mockUpdateRecipe,
    getRecipeById: mockGetRecipeById,
  }),
}))

/**
 * Tests for useBatchSizes Hook
 * 
 * These tests verify the actual hook functions work correctly.
 * User Story: "My recipe yields 3 pounds of fudge and I sell it by the pound and by the quarter"
 */
describe('useBatchSizes Hook', () => {
  
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Helper to create a test recipe
  const createTestRecipe = (overrides: Partial<Recipe> = {}): Recipe => ({
    id: 'test-recipe-1',
    name: 'Test Fudge',
    servings: 12,
    totalCost: 15.00,
    costPerServing: 1.25,
    ingredients: [],
    instructions: [],
    laborTime: 30,
    laborCost: 5.00,
    overheadCost: 2.00,
    notes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    batchYield: 3,
    batchUnit: 'lb',
    sellingUnits: [],
    ...overrides,
  })

  describe('calculateCostPerBaseUnit', () => {
    it('should calculate cost per base unit correctly', () => {
      const { result } = renderHook(() => useBatchSizes())
      const recipe = createTestRecipe({ totalCost: 15.00, batchYield: 3 })
      
      // Cost per lb = $15 / 3 lbs = $5 per lb
      const costPerBaseUnit = result.current.calculateCostPerBaseUnit(recipe)
      
      expect(costPerBaseUnit).toBe(5.00)
    })

    it('should fallback to servings when batchYield is not set', () => {
      const { result } = renderHook(() => useBatchSizes())
      const recipe = createTestRecipe({ 
        totalCost: 24.00, 
        batchYield: undefined, 
        servings: 12 
      })
      
      // Cost per serving = $24 / 12 servings = $2 per serving
      const costPerBaseUnit = result.current.calculateCostPerBaseUnit(recipe)
      
      expect(costPerBaseUnit).toBe(2.00)
    })

    it('should handle zero batchYield by falling back to servings', () => {
      const { result } = renderHook(() => useBatchSizes())
      const recipe = createTestRecipe({ 
        totalCost: 20.00, 
        batchYield: 0, 
        servings: 10 
      })
      
      const costPerBaseUnit = result.current.calculateCostPerBaseUnit(recipe)
      
      expect(costPerBaseUnit).toBe(2.00)
    })
  })

  describe('calculateSellingUnitCost', () => {
    it('should calculate cost for 1 lb from 3 lb batch', () => {
      const { result } = renderHook(() => useBatchSizes())
      const recipe = createTestRecipe({ totalCost: 15.00, batchYield: 3 })
      
      // 1 lb cost = $5 (since $15 / 3 lbs = $5 per lb)
      const cost = result.current.calculateSellingUnitCost(recipe, 1)
      
      expect(cost).toBe(5.00)
    })

    it('should calculate cost for quarter lb from 3 lb batch', () => {
      const { result } = renderHook(() => useBatchSizes())
      const recipe = createTestRecipe({ totalCost: 15.00, batchYield: 3 })
      
      // 0.25 lb cost = $5 * 0.25 = $1.25
      const cost = result.current.calculateSellingUnitCost(recipe, 0.25)
      
      expect(cost).toBeCloseTo(1.25, 2)
    })

    it('should calculate cost for half dozen from 24 cookie batch', () => {
      const { result } = renderHook(() => useBatchSizes())
      const recipe = createTestRecipe({ 
        totalCost: 12.00, 
        batchYield: 24,
        batchUnit: 'cookie'
      })
      
      // 6 cookies cost = ($12 / 24) * 6 = $3.00
      const cost = result.current.calculateSellingUnitCost(recipe, 6)
      
      expect(cost).toBe(3.00)
    })
  })

  describe('calculateSuggestedPrice', () => {
    it('should calculate price with standard markup (2.5x)', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      const price = result.current.calculateSuggestedPrice(5.00, PRICING_STRATEGIES.standard)
      
      expect(price).toBe(12.50)
    })

    it('should calculate price with premium markup (3.0x)', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      const price = result.current.calculateSuggestedPrice(5.00, PRICING_STRATEGIES.premium)
      
      expect(price).toBe(15.00)
    })

    it('should calculate price with value markup (2.0x)', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      const price = result.current.calculateSuggestedPrice(10.00, PRICING_STRATEGIES.value)
      
      expect(price).toBe(20.00)
    })

    it('should use standard markup as default', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      const price = result.current.calculateSuggestedPrice(4.00)
      
      expect(price).toBe(10.00) // 4 * 2.5 = 10
    })
  })

  describe('calculateProfitMargin', () => {
    it('should calculate profit margin correctly', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      // Cost $5, Price $12.50 → Profit $7.50 → Margin 60%
      const margin = result.current.calculateProfitMargin(5.00, 12.50)
      
      expect(margin).toBe(60)
    })

    it('should return 0 when price is 0', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      const margin = result.current.calculateProfitMargin(5.00, 0)
      
      expect(margin).toBe(0)
    })

    it('should handle 50% margin correctly', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      // Cost $5, Price $10 → Profit $5 → Margin 50%
      const margin = result.current.calculateProfitMargin(5.00, 10.00)
      
      expect(margin).toBe(50)
    })
  })

  describe('getSellingUnitsWithPricing', () => {
    it('should return empty array when no selling units', () => {
      const { result } = renderHook(() => useBatchSizes())
      const recipe = createTestRecipe({ sellingUnits: [] })
      
      const units = result.current.getSellingUnitsWithPricing(recipe)
      
      expect(units).toEqual([])
    })

    it('should calculate pricing for all selling units', () => {
      const { result } = renderHook(() => useBatchSizes())
      const recipe = createTestRecipe({
        totalCost: 15.00,
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: 'unit-1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
          { id: 'unit-2', name: 'Half Pound', quantity: 0.5, unit: 'lb' },
          { id: 'unit-3', name: 'Full Pound', quantity: 1, unit: 'lb' },
        ],
      })
      
      const units = result.current.getSellingUnitsWithPricing(recipe)
      
      expect(units).toHaveLength(3)
      
      // Quarter pound: cost = $5 * 0.25 = $1.25, price = $1.25 * 2.5 = $3.125
      expect(units[0].cost).toBeCloseTo(1.25, 2)
      expect(units[0].suggestedPrice).toBeCloseTo(3.125, 2)
      
      // Half pound: cost = $5 * 0.5 = $2.50, price = $2.50 * 2.5 = $6.25
      expect(units[1].cost).toBeCloseTo(2.50, 2)
      expect(units[1].suggestedPrice).toBeCloseTo(6.25, 2)
      
      // Full pound: cost = $5 * 1 = $5.00, price = $5 * 2.5 = $12.50
      expect(units[2].cost).toBe(5.00)
      expect(units[2].suggestedPrice).toBe(12.50)
    })

    it('should use priceOverride when set', () => {
      const { result } = renderHook(() => useBatchSizes())
      const recipe = createTestRecipe({
        totalCost: 15.00,
        batchYield: 3,
        sellingUnits: [
          { id: 'unit-1', name: 'Full Pound', quantity: 1, unit: 'lb', priceOverride: 15.00 },
        ],
      })
      
      const units = result.current.getSellingUnitsWithPricing(recipe)
      
      // Should use override price instead of calculated
      expect(units[0].suggestedPrice).toBe(15.00)
    })

    it('should calculate unitsPerBatch correctly', () => {
      const { result } = renderHook(() => useBatchSizes())
      const recipe = createTestRecipe({
        batchYield: 3,
        sellingUnits: [
          { id: 'unit-1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      
      const units = result.current.getSellingUnitsWithPricing(recipe)
      
      // 3 lbs / 0.25 lb = 12 quarter pounds per batch
      expect(units[0].unitsPerBatch).toBe(12)
    })
  })

  describe('generateDefaultSellingUnits', () => {
    it('should generate presets for lb unit', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      const units = result.current.generateDefaultSellingUnits('lb')
      
      expect(units).toHaveLength(3)
      expect(units[0].name).toBe('Quarter Pound')
      expect(units[0].quantity).toBe(0.25)
      expect(units[1].name).toBe('Half Pound')
      expect(units[2].name).toBe('Full Pound')
    })

    it('should generate presets for cookie unit', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      const units = result.current.generateDefaultSellingUnits('cookie')
      
      expect(units).toHaveLength(3)
      expect(units[0].name).toBe('Single Cookie')
      expect(units[1].name).toBe('Half Dozen')
      expect(units[1].quantity).toBe(6)
      expect(units[2].name).toBe('Dozen')
      expect(units[2].quantity).toBe(12)
    })

    it('should use default presets for unknown unit', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      const units = result.current.generateDefaultSellingUnits('unknown-unit')
      
      expect(units).toHaveLength(3)
      expect(units[0].name).toBe('Quarter')
      expect(units[1].name).toBe('Half')
      expect(units[2].name).toBe('Full')
    })

    it('should mark first unit as default', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      const units = result.current.generateDefaultSellingUnits('lb')
      
      expect(units[0].isDefault).toBe(true)
      expect(units[1].isDefault).toBeFalsy()
      expect(units[2].isDefault).toBeFalsy()
    })

    it('should generate unique IDs for each unit', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      const units = result.current.generateDefaultSellingUnits('lb')
      
      const ids = units.map(u => u.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('addSellingUnit', () => {
    it('should add a selling unit to a recipe', () => {
      const recipe = createTestRecipe({ sellingUnits: [] })
      mockGetRecipeById.mockReturnValue(recipe)
      
      const { result } = renderHook(() => useBatchSizes())
      
      const newUnit = result.current.addSellingUnit('test-recipe-1', {
        name: 'Quarter Pound',
        quantity: 0.25,
        unit: 'lb',
      })
      
      expect(newUnit).not.toBeNull()
      expect(newUnit?.name).toBe('Quarter Pound')
      expect(mockUpdateRecipe).toHaveBeenCalledWith('test-recipe-1', {
        sellingUnits: expect.arrayContaining([
          expect.objectContaining({ name: 'Quarter Pound' })
        ])
      })
    })

    it('should return null when recipe not found', () => {
      mockGetRecipeById.mockReturnValue(null)
      
      const { result } = renderHook(() => useBatchSizes())
      
      const newUnit = result.current.addSellingUnit('non-existent', {
        name: 'Test',
        quantity: 1,
        unit: 'lb',
      })
      
      expect(newUnit).toBeNull()
      expect(mockUpdateRecipe).not.toHaveBeenCalled()
    })

    it('should unset other defaults when adding a default unit', () => {
      const existingUnit: SellingUnit = {
        id: 'existing-1',
        name: 'Existing',
        quantity: 1,
        unit: 'lb',
        isDefault: true,
      }
      const recipe = createTestRecipe({ sellingUnits: [existingUnit] })
      mockGetRecipeById.mockReturnValue(recipe)
      
      const { result } = renderHook(() => useBatchSizes())
      
      result.current.addSellingUnit('test-recipe-1', {
        name: 'New Default',
        quantity: 0.5,
        unit: 'lb',
        isDefault: true,
      })
      
      expect(mockUpdateRecipe).toHaveBeenCalledWith('test-recipe-1', {
        sellingUnits: expect.arrayContaining([
          expect.objectContaining({ id: 'existing-1', isDefault: false }),
          expect.objectContaining({ name: 'New Default', isDefault: true })
        ])
      })
    })
  })

  describe('updateSellingUnit', () => {
    it('should update an existing selling unit', () => {
      const existingUnit: SellingUnit = {
        id: 'unit-1',
        name: 'Quarter Pound',
        quantity: 0.25,
        unit: 'lb',
      }
      const recipe = createTestRecipe({ sellingUnits: [existingUnit] })
      mockGetRecipeById.mockReturnValue(recipe)
      
      const { result } = renderHook(() => useBatchSizes())
      
      const success = result.current.updateSellingUnit('test-recipe-1', 'unit-1', {
        name: 'Updated Name',
        priceOverride: 5.00,
      })
      
      expect(success).toBe(true)
      expect(mockUpdateRecipe).toHaveBeenCalledWith('test-recipe-1', {
        sellingUnits: [expect.objectContaining({
          id: 'unit-1',
          name: 'Updated Name',
          priceOverride: 5.00,
        })]
      })
    })

    it('should return false when recipe not found', () => {
      mockGetRecipeById.mockReturnValue(null)
      
      const { result } = renderHook(() => useBatchSizes())
      
      const success = result.current.updateSellingUnit('non-existent', 'unit-1', {
        name: 'Test',
      })
      
      expect(success).toBe(false)
    })

    it('should return false when unit not found', () => {
      const recipe = createTestRecipe({ sellingUnits: [] })
      mockGetRecipeById.mockReturnValue(recipe)
      
      const { result } = renderHook(() => useBatchSizes())
      
      const success = result.current.updateSellingUnit('test-recipe-1', 'non-existent', {
        name: 'Test',
      })
      
      expect(success).toBe(false)
    })
  })

  describe('removeSellingUnit', () => {
    it('should remove a selling unit from recipe', () => {
      const units: SellingUnit[] = [
        { id: 'unit-1', name: 'Quarter', quantity: 0.25, unit: 'lb' },
        { id: 'unit-2', name: 'Half', quantity: 0.5, unit: 'lb' },
      ]
      const recipe = createTestRecipe({ sellingUnits: units })
      mockGetRecipeById.mockReturnValue(recipe)
      
      const { result } = renderHook(() => useBatchSizes())
      
      const success = result.current.removeSellingUnit('test-recipe-1', 'unit-1')
      
      expect(success).toBe(true)
      expect(mockUpdateRecipe).toHaveBeenCalledWith('test-recipe-1', {
        sellingUnits: [expect.objectContaining({ id: 'unit-2' })]
      })
    })

    it('should return false when recipe not found', () => {
      mockGetRecipeById.mockReturnValue(null)
      
      const { result } = renderHook(() => useBatchSizes())
      
      const success = result.current.removeSellingUnit('non-existent', 'unit-1')
      
      expect(success).toBe(false)
    })
  })

  describe('PRICING_STRATEGIES constant', () => {
    it('should have correct markup values', () => {
      expect(PRICING_STRATEGIES.value).toBe(2.0)
      expect(PRICING_STRATEGIES.standard).toBe(2.5)
      expect(PRICING_STRATEGIES.premium).toBe(3.0)
      expect(PRICING_STRATEGIES.luxury).toBe(3.5)
    })
  })

  describe('SELLING_UNIT_PRESETS constant', () => {
    it('should have presets for common units', () => {
      expect(SELLING_UNIT_PRESETS.lb).toBeDefined()
      expect(SELLING_UNIT_PRESETS.oz).toBeDefined()
      expect(SELLING_UNIT_PRESETS.piece).toBeDefined()
      expect(SELLING_UNIT_PRESETS.cookie).toBeDefined()
      expect(SELLING_UNIT_PRESETS.default).toBeDefined()
    })

    it('should have correct lb presets', () => {
      expect(SELLING_UNIT_PRESETS.lb).toEqual([
        { name: 'Quarter Pound', quantity: 0.25 },
        { name: 'Half Pound', quantity: 0.5 },
        { name: 'Full Pound', quantity: 1 },
      ])
    })
  })

  describe('Real-World Scenarios', () => {
    it('should handle fudge business scenario', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      // Recipe: Chocolate Fudge, costs $15 to make, yields 3 lbs
      const fudgeRecipe = createTestRecipe({
        name: 'Chocolate Fudge',
        totalCost: 15.00,
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: 'qtr', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
          { id: 'half', name: 'Half Pound', quantity: 0.5, unit: 'lb' },
          { id: 'full', name: 'Full Pound', quantity: 1, unit: 'lb' },
        ],
      })
      
      const units = result.current.getSellingUnitsWithPricing(fudgeRecipe)
      
      // Quarter pound: $1.25 cost, $3.13 suggested price
      expect(units[0].cost).toBeCloseTo(1.25, 2)
      expect(units[0].unitsPerBatch).toBe(12) // Can sell 12 quarter pounds
      
      // Full pound: $5.00 cost, $12.50 suggested price
      expect(units[2].cost).toBe(5.00)
      expect(units[2].suggestedPrice).toBe(12.50)
      expect(units[2].unitsPerBatch).toBe(3) // Can sell 3 full pounds
    })

    it('should handle cookie business scenario', () => {
      const { result } = renderHook(() => useBatchSizes())
      
      // Recipe: Chocolate Chip Cookies, costs $6 to make, yields 24 cookies
      const cookieRecipe = createTestRecipe({
        name: 'Chocolate Chip Cookies',
        totalCost: 6.00,
        batchYield: 24,
        batchUnit: 'cookie',
        sellingUnits: [
          { id: 'single', name: 'Single Cookie', quantity: 1, unit: 'cookie' },
          { id: 'half-doz', name: 'Half Dozen', quantity: 6, unit: 'cookie' },
          { id: 'dozen', name: 'Dozen', quantity: 12, unit: 'cookie' },
        ],
      })
      
      const units = result.current.getSellingUnitsWithPricing(cookieRecipe)
      
      // Single cookie: $0.25 cost, $0.625 suggested price
      expect(units[0].cost).toBe(0.25)
      expect(units[0].unitsPerBatch).toBe(24)
      
      // Half dozen: $1.50 cost, $3.75 suggested price
      expect(units[1].cost).toBe(1.50)
      expect(units[1].suggestedPrice).toBe(3.75)
      expect(units[1].unitsPerBatch).toBe(4)
      
      // Dozen: $3.00 cost, $7.50 suggested price
      expect(units[2].cost).toBe(3.00)
      expect(units[2].suggestedPrice).toBe(7.50)
      expect(units[2].unitsPerBatch).toBe(2)
    })
  })
})
