'use client'

import { useMemo, useCallback } from 'react'
import { useRecipes } from './useRecipes'
import type { Recipe, PricingBreakdown, PricingComparison } from '../types'

/**
 * Custom hook for pricing calculations and strategies
 * Helps determine optimal selling prices based on costs and market factors
 */
export function usePricing() {
  const { recipes } = useRecipes()

  /**
   * Calculate detailed cost breakdown for a recipe
   */
  const getPricingBreakdown = useCallback((recipe: Recipe): PricingBreakdown => {
    const ingredientCost = recipe.ingredients.reduce((sum, ing) => sum + ing.cost, 0)
    const laborCost = recipe.laborCost
    const overheadCost = recipe.overheadCost
    const totalCost = ingredientCost + laborCost + overheadCost

    // Industry standard markup for bakery: 2.5x - 3.5x
    const suggestedMarkup = 2.8 // 2.8x multiplier
    const suggestedPrice = totalCost * suggestedMarkup
    const profitMargin = ((suggestedPrice - totalCost) / suggestedPrice) * 100

    return {
      ingredientCost,
      laborCost,
      overheadCost,
      totalCost,
      suggestedMarkup,
      suggestedPrice,
      profitMargin,
    }
  }, [])

  /**
   * Compare different pricing strategies
   */
  const getPricingComparisons = useCallback((recipe: Recipe, competitorPrice?: number): PricingComparison[] => {
    const breakdown = getPricingBreakdown(recipe)
    const { totalCost } = breakdown

    const comparisons: PricingComparison[] = []

    // Strategy 1: Cost-Plus (Standard)
    const costPlusMultiplier = 2.5
    const costPlusPrice = totalCost * costPlusMultiplier
    comparisons.push({
      strategy: 'cost-plus',
      multiplier: costPlusMultiplier,
      price: costPlusPrice,
      profit: costPlusPrice - totalCost,
      marginPercentage: ((costPlusPrice - totalCost) / costPlusPrice) * 100,
      description: 'Standard bakery markup (2.5x)',
      recommendation: 'Good for everyday items',
    })

    // Strategy 2: Premium
    const premiumMultiplier = 3.5
    const premiumPrice = totalCost * premiumMultiplier
    comparisons.push({
      strategy: 'premium',
      multiplier: premiumMultiplier,
      price: premiumPrice,
      profit: premiumPrice - totalCost,
      marginPercentage: ((premiumPrice - totalCost) / premiumPrice) * 100,
      description: 'Premium positioning (3.5x)',
      recommendation: 'Best for specialty/custom items',
    })

    // Strategy 3: Value
    const valueMultiplier = 2.0
    const valuePrice = totalCost * valueMultiplier
    comparisons.push({
      strategy: 'value',
      multiplier: valueMultiplier,
      price: valuePrice,
      profit: valuePrice - totalCost,
      marginPercentage: ((valuePrice - totalCost) / valuePrice) * 100,
      description: 'Value pricing (2.0x)',
      recommendation: valueMultiplier < 2.2 ? '⚠️ Low margin - consider increasing' : 'Good for volume sales',
    })

    // Strategy 4: Competitive (if competitor price provided)
    if (competitorPrice) {
      comparisons.push({
        strategy: 'competitive',
        multiplier: competitorPrice / totalCost,
        price: competitorPrice,
        profit: competitorPrice - totalCost,
        marginPercentage: ((competitorPrice - totalCost) / competitorPrice) * 100,
        description: 'Match competitor price',
        recommendation: 
          competitorPrice < totalCost * 2 
            ? '⚠️ Below recommended margin'
            : competitorPrice > totalCost * 4
            ? '💎 Premium opportunity'
            : '✅ Competitive and profitable',
      })
    }

    return comparisons.sort((a, b) => b.profit - a.profit)
  }, [getPricingBreakdown])

  /**
   * Calculate what-if scenarios
   */
  const calculateWhatIf = (totalCost: number, targetPrice: number) => {
    const profit = targetPrice - totalCost
    const marginPercentage = ((targetPrice - totalCost) / targetPrice) * 100
    const multiplier = targetPrice / totalCost

    return {
      profit,
      marginPercentage,
      multiplier,
      isViable: marginPercentage >= 40, // Below 40% is considered low for bakery
      recommendation:
        marginPercentage < 40
          ? '⚠️ Margin too low - consider raising price'
          : marginPercentage >= 60
          ? '💚 Excellent profit margin'
          : '✅ Good profit margin',
    }
  }

  /**
   * Calculate break-even quantity
   */
  const calculateBreakEven = (recipe: Recipe, fixedCosts: number = 0) => {
    const breakdown = getPricingBreakdown(recipe)
    const pricePerUnit = breakdown.suggestedPrice
    const costPerUnit = breakdown.totalCost
    
    if (fixedCosts === 0) {
      return {
        breakEvenUnits: 0,
        message: 'Each unit sold is profitable',
      }
    }

    const contributionMargin = pricePerUnit - costPerUnit
    const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin)

    return {
      breakEvenUnits,
      contributionMargin,
      message: `Need to sell ${breakEvenUnits} units to cover fixed costs`,
    }
  }

  /**
   * Suggest optimal price for a recipe
   */
  const suggestOptimalPrice = (recipe: Recipe, targetMargin?: number): number => {
    const breakdown = getPricingBreakdown(recipe)
    
    if (targetMargin) {
      // Calculate price needed for target margin
      // margin% = (price - cost) / price
      // price = cost / (1 - margin%)
      return breakdown.totalCost / (1 - targetMargin / 100)
    }

    return breakdown.suggestedPrice
  }

  /**
   * Calculate psychological pricing
   */
  const applyPsychologicalPricing = (price: number): number[] => {
    const options: number[] = []

    // Round to nearest .99
    const rounded99 = Math.floor(price) + 0.99
    if (rounded99 >= price * 0.95) options.push(rounded99)

    // Round to nearest .95
    const rounded95 = Math.floor(price) + 0.95
    if (rounded95 >= price * 0.95) options.push(rounded95)

    // Round to nearest .50
    const rounded50 = Math.floor(price) + 0.50
    if (rounded50 >= price * 0.95) options.push(rounded50)

    // Round to nearest whole
    const roundedWhole = Math.round(price)
    options.push(roundedWhole)

    // Round up to next .99
    const nextDollar99 = Math.ceil(price) + 0.99
    if (nextDollar99 <= price * 1.05) options.push(nextDollar99)

    return Array.from(new Set(options)).sort((a, b) => a - b)
  }

  /**
   * Get pricing recommendations for all recipes
   */
  const recipePricingAnalysis = useMemo(() => {
    return recipes.map(recipe => {
      const breakdown = getPricingBreakdown(recipe)
      const comparisons = getPricingComparisons(recipe)

      return {
        recipe,
        breakdown,
        suggestedPrice: breakdown.suggestedPrice,
        currentMargin: recipe.totalCost > 0 
          ? ((breakdown.suggestedPrice - recipe.totalCost) / breakdown.suggestedPrice) * 100
          : 0,
        needsReview: breakdown.profitMargin < 40, // Flag recipes with low margins
        comparisons,
      }
    })
  }, [recipes, getPricingBreakdown, getPricingComparisons])

  /**
   * Get recipes that need price review
   */
  const recipesNeedingPriceReview = useMemo(() => {
    return recipePricingAnalysis.filter(item => item.needsReview)
  }, [recipePricingAnalysis])

  return {
    // Calculations
    getPricingBreakdown,
    getPricingComparisons,
    calculateWhatIf,
    calculateBreakEven,
    suggestOptimalPrice,
    applyPsychologicalPricing,
    
    // Analysis
    recipePricingAnalysis,
    recipesNeedingPriceReview,
    
    // Stats
    totalRecipes: recipes.length,
    recipesNeedingReview: recipesNeedingPriceReview.length,
  }
}
