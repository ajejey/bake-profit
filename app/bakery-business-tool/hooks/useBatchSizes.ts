'use client'

import { useCallback, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useRecipes } from './useRecipes'
import type { Recipe, SellingUnit } from '../types'

/**
 * Selling Unit with calculated pricing
 */
export interface SellingUnitWithPricing extends SellingUnit {
  cost: number              // Calculated cost for this selling unit
  suggestedPrice: number    // Suggested price based on markup
  profitMargin: number      // Profit margin percentage
  unitsPerBatch: number     // How many of this unit can be sold from one batch
}

/**
 * Default markup multipliers for different pricing strategies
 */
export const PRICING_STRATEGIES = {
  value: 2.0,      // 2x markup - value pricing
  standard: 2.5,   // 2.5x markup - standard bakery
  premium: 3.0,    // 3x markup - premium items
  luxury: 3.5,     // 3.5x markup - specialty/custom
} as const

/**
 * Common selling unit presets based on batch unit type
 */
export const SELLING_UNIT_PRESETS: Record<string, Array<{ name: string; quantity: number }>> = {
  // Weight-based (lb, oz, kg, g)
  lb: [
    { name: 'Quarter Pound', quantity: 0.25 },
    { name: 'Half Pound', quantity: 0.5 },
    { name: 'Full Pound', quantity: 1 },
  ],
  oz: [
    { name: '2 oz', quantity: 2 },
    { name: '4 oz', quantity: 4 },
    { name: '8 oz', quantity: 8 },
  ],
  kg: [
    { name: '250g', quantity: 0.25 },
    { name: '500g', quantity: 0.5 },
    { name: '1 kg', quantity: 1 },
  ],
  g: [
    { name: '100g', quantity: 100 },
    { name: '250g', quantity: 250 },
    { name: '500g', quantity: 500 },
  ],
  // Count-based (piece, unit, cookie, etc.)
  piece: [
    { name: 'Single', quantity: 1 },
    { name: 'Half Dozen', quantity: 6 },
    { name: 'Dozen', quantity: 12 },
  ],
  unit: [
    { name: 'Single', quantity: 1 },
    { name: 'Half Dozen', quantity: 6 },
    { name: 'Dozen', quantity: 12 },
  ],
  cookie: [
    { name: 'Single Cookie', quantity: 1 },
    { name: 'Half Dozen', quantity: 6 },
    { name: 'Dozen', quantity: 12 },
  ],
  cupcake: [
    { name: 'Single', quantity: 1 },
    { name: 'Half Dozen', quantity: 6 },
    { name: 'Dozen', quantity: 12 },
  ],
  slice: [
    { name: 'Single Slice', quantity: 1 },
    { name: 'Quarter', quantity: 0.25 },
    { name: 'Half', quantity: 0.5 },
  ],
  // Default for unknown units
  default: [
    { name: 'Quarter', quantity: 0.25 },
    { name: 'Half', quantity: 0.5 },
    { name: 'Full', quantity: 1 },
  ],
}

/**
 * Custom hook for batch sizes and selling units management
 * Provides calculations and utilities for selling recipes in different portions
 */
export function useBatchSizes() {
  const { recipes, updateRecipe, getRecipeById } = useRecipes()

  /**
   * Calculate cost per base unit (e.g., cost per lb, cost per piece)
   */
  const calculateCostPerBaseUnit = useCallback((recipe: Recipe): number => {
    if (!recipe.batchYield || recipe.batchYield === 0) {
      // Fallback: use servings as batch yield
      return recipe.totalCost / (recipe.servings || 1)
    }
    return recipe.totalCost / recipe.batchYield
  }, [])

  /**
   * Calculate cost for a specific selling unit
   */
  const calculateSellingUnitCost = useCallback((
    recipe: Recipe,
    sellingUnitQuantity: number
  ): number => {
    const costPerBaseUnit = calculateCostPerBaseUnit(recipe)
    return costPerBaseUnit * sellingUnitQuantity
  }, [calculateCostPerBaseUnit])

  /**
   * Calculate suggested price based on cost and markup
   */
  const calculateSuggestedPrice = useCallback((
    cost: number,
    markup: number = PRICING_STRATEGIES.standard
  ): number => {
    return cost * markup
  }, [])

  /**
   * Calculate profit margin percentage
   */
  const calculateProfitMargin = useCallback((cost: number, price: number): number => {
    if (price === 0) return 0
    return ((price - cost) / price) * 100
  }, [])

  /**
   * Get selling units with calculated pricing for a recipe
   */
  const getSellingUnitsWithPricing = useCallback((
    recipe: Recipe,
    markup: number = PRICING_STRATEGIES.standard
  ): SellingUnitWithPricing[] => {
    if (!recipe.sellingUnits || recipe.sellingUnits.length === 0) {
      return []
    }

    const costPerBaseUnit = calculateCostPerBaseUnit(recipe)
    const batchYield = recipe.batchYield || recipe.servings || 1

    return recipe.sellingUnits.map(unit => {
      const cost = costPerBaseUnit * unit.quantity
      const suggestedPrice = unit.priceOverride ?? calculateSuggestedPrice(cost, markup)
      const profitMargin = calculateProfitMargin(cost, suggestedPrice)
      const unitsPerBatch = batchYield / unit.quantity

      return {
        ...unit,
        cost,
        suggestedPrice,
        profitMargin,
        unitsPerBatch,
      }
    })
  }, [calculateCostPerBaseUnit, calculateSuggestedPrice, calculateProfitMargin])

  /**
   * Generate default selling units based on batch unit type
   */
  const generateDefaultSellingUnits = useCallback((
    batchUnit: string
  ): SellingUnit[] => {
    const normalizedUnit = batchUnit.toLowerCase()
    const presets = SELLING_UNIT_PRESETS[normalizedUnit] || SELLING_UNIT_PRESETS.default

    return presets.map((preset, index) => ({
      id: uuidv4(),
      name: preset.name,
      quantity: preset.quantity,
      unit: batchUnit,
      isDefault: index === 0, // First one is default
    }))
  }, [])

  /**
   * Add a selling unit to a recipe
   */
  const addSellingUnit = useCallback((
    recipeId: string,
    sellingUnit: Omit<SellingUnit, 'id'>
  ): SellingUnit | null => {
    const recipe = getRecipeById(recipeId)
    if (!recipe) return null

    const newUnit: SellingUnit = {
      ...sellingUnit,
      id: uuidv4(),
    }

    const existingUnits = recipe.sellingUnits || []

    // If this is the first unit or marked as default, ensure only one default
    const updatedUnits = newUnit.isDefault
      ? existingUnits.map(u => ({ ...u, isDefault: false }))
      : existingUnits

    updateRecipe(recipeId, {
      sellingUnits: [...updatedUnits, newUnit],
    })

    return newUnit
  }, [getRecipeById, updateRecipe])

  /**
   * Update a selling unit in a recipe
   */
  const updateSellingUnit = useCallback((
    recipeId: string,
    unitId: string,
    updates: Partial<SellingUnit>
  ): boolean => {
    const recipe = getRecipeById(recipeId)
    if (!recipe || !recipe.sellingUnits) return false

    const unitIndex = recipe.sellingUnits.findIndex(u => u.id === unitId)
    if (unitIndex === -1) return false

    let updatedUnits = [...recipe.sellingUnits]

    // If setting as default, unset others
    if (updates.isDefault) {
      updatedUnits = updatedUnits.map(u => ({ ...u, isDefault: false }))
    }

    updatedUnits[unitIndex] = { ...updatedUnits[unitIndex], ...updates }

    updateRecipe(recipeId, { sellingUnits: updatedUnits })
    return true
  }, [getRecipeById, updateRecipe])

  /**
   * Remove a selling unit from a recipe
   */
  const removeSellingUnit = useCallback((
    recipeId: string,
    unitId: string
  ): boolean => {
    const recipe = getRecipeById(recipeId)
    if (!recipe || !recipe.sellingUnits) return false

    const updatedUnits = recipe.sellingUnits.filter(u => u.id !== unitId)

    // If we removed the default, make the first one default
    if (updatedUnits.length > 0 && !updatedUnits.some(u => u.isDefault)) {
      updatedUnits[0].isDefault = true
    }

    updateRecipe(recipeId, { sellingUnits: updatedUnits })
    return true
  }, [getRecipeById, updateRecipe])

  /**
   * Set batch yield for a recipe
   */
  const setBatchYield = useCallback((
    recipeId: string,
    batchYield: number,
    batchUnit: string
  ): boolean => {
    const recipe = getRecipeById(recipeId)
    if (!recipe) return false

    updateRecipe(recipeId, { batchYield, batchUnit })
    return true
  }, [getRecipeById, updateRecipe])

  /**
   * Initialize batch sizes for a recipe with default selling units
   */
  const initializeBatchSizes = useCallback((
    recipeId: string,
    batchYield: number,
    batchUnit: string
  ): boolean => {
    const recipe = getRecipeById(recipeId)
    if (!recipe) return false

    const defaultUnits = generateDefaultSellingUnits(batchUnit)

    updateRecipe(recipeId, {
      batchYield,
      batchUnit,
      sellingUnits: defaultUnits,
    })

    return true
  }, [getRecipeById, updateRecipe, generateDefaultSellingUnits])

  /**
   * Calculate how many batches are needed for an order quantity
   */
  const calculateBatchesNeeded = useCallback((
    recipe: Recipe,
    sellingUnitQuantity: number,
    orderQuantity: number
  ): number => {
    const batchYield = recipe.batchYield || recipe.servings || 1
    const totalYieldNeeded = sellingUnitQuantity * orderQuantity
    return Math.ceil(totalYieldNeeded / batchYield)
  }, [])

  /**
   * Get recipes that have batch sizes configured
   */
  const recipesWithBatchSizes = useMemo(() => {
    return recipes.filter(r => r.batchYield && r.batchYield > 0)
  }, [recipes])

  /**
   * Get recipes that need batch size configuration
   */
  const recipesWithoutBatchSizes = useMemo(() => {
    return recipes.filter(r => !r.batchYield || r.batchYield === 0)
  }, [recipes])

  /**
   * Validate a selling unit
   */
  const validateSellingUnit = useCallback((
    unit: Partial<SellingUnit>,
    batchYield?: number
  ): { valid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (!unit.name || unit.name.trim().length === 0) {
      errors.push('Name is required')
    }

    if (!unit.quantity || unit.quantity <= 0) {
      errors.push('Quantity must be greater than 0')
    }

    if (batchYield && unit.quantity && unit.quantity > batchYield) {
      errors.push(`Quantity (${unit.quantity}) cannot be larger than the whole batch (${batchYield})`)
    }

    if (unit.priceOverride !== undefined && unit.priceOverride < 0) {
      errors.push('Price override cannot be negative')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }, [])

  return {
    // Calculations
    calculateCostPerBaseUnit,
    calculateSellingUnitCost,
    calculateSuggestedPrice,
    calculateProfitMargin,
    calculateBatchesNeeded,
    getSellingUnitsWithPricing,

    // CRUD operations
    addSellingUnit,
    updateSellingUnit,
    removeSellingUnit,
    setBatchYield,
    initializeBatchSizes,

    // Utilities
    generateDefaultSellingUnits,
    validateSellingUnit,

    // Data
    recipesWithBatchSizes,
    recipesWithoutBatchSizes,

    // Constants
    PRICING_STRATEGIES,
    SELLING_UNIT_PRESETS,
  }
}
