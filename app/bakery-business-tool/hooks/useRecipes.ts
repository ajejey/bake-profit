'use client'

import { useMemo } from 'react'
import { useBakeryData } from '../contexts/BakeryDataContext'
import type { Recipe } from '../types'

/**
 * Custom hook for recipe management
 * Provides clean API for working with recipes
 */
export function useRecipes() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe, getRecipeById, ingredients } = useBakeryData()

  // Get recipe with full ingredient details
  const getRecipeWithIngredients = useMemo(() => {
    return (id: string) => {
      const recipe = getRecipeById(id)
      if (!recipe) return null

      return {
        ...recipe,
        ingredientsWithDetails: recipe.ingredients.map(ri => {
          const ingredient = ingredients.find(i => i.id === ri.ingredientId)
          return {
            ...ri,
            name: ingredient?.name || 'Unknown',
            baseUnit: ingredient?.unit || '',
          }
        }),
      }
    }
  }, [getRecipeById, ingredients])

  // Get recipes sorted by most recent
  const recentRecipes = useMemo(() => {
    return [...recipes].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [recipes])

  // Get recipes by category
  const getRecipesByCategory = useMemo(() => {
    return (category: string) => recipes.filter(r => r.category === category)
  }, [recipes])

  // Calculate total recipes
  const totalRecipes = recipes.length

  // Check if recipe name exists
  const recipeNameExists = (name: string, excludeId?: string) => {
    return recipes.some(r => 
      r.name.toLowerCase() === name.toLowerCase() && r.id !== excludeId
    )
  }

  return {
    // Data
    recipes,
    recentRecipes,
    totalRecipes,

    // Actions
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
    getRecipeWithIngredients,
    getRecipesByCategory,
    recipeNameExists,
  }
}
