'use client'

import { useMemo, useCallback } from 'react'
import { useBakeryData } from '../contexts/BakeryDataContext'
import type { Ingredient } from '../types'

/**
 * Custom hook for ingredient management
 * Provides clean API for working with ingredients
 */
export function useIngredients() {
  const { 
    ingredients, 
    addIngredient, 
    updateIngredient, 
    deleteIngredient, 
    getIngredientById,
    recipes 
  } = useBakeryData()

  // Check if ingredient is used in any recipes
  const isIngredientUsedInRecipes = useCallback((ingredientId: string) => {
    return recipes.some(recipe => 
      recipe.ingredients.some(ing => ing.ingredientId === ingredientId)
    )
  }, [recipes])

  // Get ingredients sorted by name
  const sortedIngredients = useMemo(() => {
    return [...ingredients].sort((a, b) => a.name.localeCompare(b.name))
  }, [ingredients])

  // Get ingredients by category (if we add categories later)
  const getIngredientsByUnit = useMemo(() => {
    return (unit: string) => ingredients.filter(i => i.unit === unit)
  }, [ingredients])

  // Calculate cost per unit for an ingredient
  const calculateCostPerUnit = useCallback((ingredient: Ingredient) => {
    return ingredient.packageCost / ingredient.packageSize
  }, [])

  // Get all unique units used
  const availableUnits = useMemo(() => {
    const units = new Set(ingredients.map(i => i.unit))
    return Array.from(units).sort()
  }, [ingredients])

  // Safe delete ingredient (checks if used in recipes)
  const safeDeleteIngredient = useCallback((id: string): { success: boolean; message: string } => {
    if (isIngredientUsedInRecipes(id)) {
      return {
        success: false,
        message: 'Cannot delete ingredient. It is used in one or more recipes.',
      }
    }
    
    deleteIngredient(id)
    return {
      success: true,
      message: 'Ingredient deleted successfully.',
    }
  }, [isIngredientUsedInRecipes, deleteIngredient])

  // Check if ingredient name exists
  const ingredientNameExists = useCallback((name: string, excludeId?: string) => {
    return ingredients.some(i => 
      i.name.toLowerCase() === name.toLowerCase() && i.id !== excludeId
    )
  }, [ingredients])

  return {
    // Data
    ingredients,
    sortedIngredients,
    availableUnits,

    // Actions
    addIngredient,
    updateIngredient,
    deleteIngredient,
    safeDeleteIngredient,
    getIngredientById,
    getIngredientsByUnit,
    calculateCostPerUnit,
    isIngredientUsedInRecipes,
    ingredientNameExists,
  }
}
