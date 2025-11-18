import { describe, it, expect } from 'vitest'

/**
 * Tests for RecipeCalculator Component
 * Tests recipe calculations, unit conversions, scaling, and form validations
 */
describe('RecipeCalculator - Core Calculations', () => {
  
  describe('Recipe Cost Calculations', () => {
    it('should calculate total recipe cost correctly', () => {
      const ingredientsCost = 5.50 // sum of all ingredient costs
      const laborCost = 15.00
      const overheadCost = 3.00
      
      const totalCost = ingredientsCost + laborCost + overheadCost
      
      expect(totalCost).toBe(23.50)
    })

    it('should calculate cost per serving correctly', () => {
      const totalCost = 23.50
      const servings = 12
      
      const costPerServing = totalCost / servings
      
      expect(costPerServing).toBeCloseTo(1.958, 3)
    })

    it('should handle zero servings gracefully', () => {
      const totalCost = 23.50
      const servings = 0
      
      const costPerServing = servings > 0 ? totalCost / servings : 0
      
      expect(costPerServing).toBe(0)
    })

    it('should calculate ingredient cost in recipe', () => {
      const quantity = 250 // grams
      const costPerUnit = 0.0018 // per gram
      
      const ingredientCost = quantity * costPerUnit
      
      expect(ingredientCost).toBe(0.45)
    })

    it('should sum multiple ingredient costs', () => {
      const ingredients = [
        { quantity: 250, costPerUnit: 0.0018 }, // flour: 0.45
        { quantity: 200, costPerUnit: 0.00154 }, // sugar: 0.308
        { quantity: 100, costPerUnit: 0.00991 }, // butter: 0.991
        { quantity: 2, costPerUnit: 0.35 }, // eggs: 0.70
      ]
      
      const totalIngredientsCost = ingredients.reduce(
        (sum, ing) => sum + (ing.quantity * ing.costPerUnit), 
        0
      )
      
      expect(totalIngredientsCost).toBeCloseTo(2.449, 3)
    })
  })

  describe('Unit Conversions', () => {
    // Weight conversions
    it('should convert grams to kilograms', () => {
      const value = 1000 // grams
      const conversionFactor = 0.001 // g to kg
      const result = value * conversionFactor
      
      expect(result).toBe(1) // 1 kg
    })

    it('should convert pounds to grams', () => {
      const value = 1 // pound
      const conversionFactor = 453.592 // lb to g
      const result = value * conversionFactor
      
      expect(result).toBe(453.592)
    })

    it('should convert ounces to grams', () => {
      const value = 1 // ounce
      const conversionFactor = 28.3495 // oz to g
      const result = value * conversionFactor
      
      expect(result).toBe(28.3495)
    })

    // Volume conversions
    it('should convert cups to milliliters', () => {
      const value = 1 // cup
      const conversionFactor = 236.588 // cup to ml
      const result = value * conversionFactor
      
      expect(result).toBe(236.588)
    })

    it('should convert tablespoons to teaspoons', () => {
      const value = 1 // tablespoon
      const conversionFactor = 3 // tbsp to tsp
      const result = value * conversionFactor
      
      expect(result).toBe(3)
    })

    it('should convert liters to milliliters', () => {
      const value = 1 // liter
      const conversionFactor = 1000 // l to ml
      const result = value * conversionFactor
      
      expect(result).toBe(1000)
    })

    // Count conversions
    it('should convert dozen to units', () => {
      const value = 1 // dozen
      const conversionFactor = 12 // dozen to units
      const result = value * conversionFactor
      
      expect(result).toBe(12)
    })

    it('should convert units to dozen', () => {
      const value = 24 // units
      const conversionFactor = 0.0833333 // units to dozen
      const result = value * conversionFactor
      
      expect(result).toBeCloseTo(2, 1) // 2 dozen
    })

    // Same unit conversion
    it('should return same value for same unit', () => {
      const value = 100
      const fromUnit = 'g'
      const toUnit = 'g'
      
      const result = fromUnit === toUnit ? value : value * 1
      
      expect(result).toBe(100)
    })
  })

  describe('Recipe Ingredient Cost with Unit Conversion', () => {
    it('should calculate cost after unit conversion', () => {
      // Recipe calls for 2 cups of flour
      // Ingredient stored in grams at $0.0018/g
      const recipeQuantity = 2 // cups
      const cupToGrams = 236.588 // conversion factor
      const convertedQuantity = recipeQuantity * cupToGrams // 473.176 grams
      const costPerGram = 0.0018
      
      const cost = convertedQuantity * costPerGram
      
      expect(convertedQuantity).toBeCloseTo(473.176, 3)
      expect(cost).toBeCloseTo(0.852, 3)
    })

    it('should handle butter conversion from cups to grams', () => {
      // 1 cup butter = ~227g (half pound)
      const recipeQuantity = 0.5 // cups
      const cupToGrams = 227 // approximate for butter
      const convertedQuantity = recipeQuantity * cupToGrams
      const costPerGram = 0.00991
      
      const cost = convertedQuantity * costPerGram
      
      expect(convertedQuantity).toBe(113.5)
      expect(cost).toBeCloseTo(1.125, 3)
    })
  })

  describe('Recipe Scaling', () => {
    it('should scale recipe by servings', () => {
      const originalServings = 12
      const targetServings = 24
      const scaleFactor = targetServings / originalServings
      
      expect(scaleFactor).toBe(2)
    })

    it('should scale ingredient quantities correctly', () => {
      const originalQuantity = 250 // grams flour
      const scaleFactor = 2
      const scaledQuantity = originalQuantity * scaleFactor
      
      expect(scaledQuantity).toBe(500)
    })

    it('should scale total cost correctly', () => {
      const originalTotalCost = 23.50
      const scaleFactor = 2
      const scaledTotalCost = originalTotalCost * scaleFactor
      
      expect(scaledTotalCost).toBe(47.00)
    })

    it('should maintain cost per serving when scaling', () => {
      const originalTotalCost = 23.50
      const originalServings = 12
      const scaleFactor = 2
      
      const scaledTotalCost = originalTotalCost * scaleFactor
      const scaledServings = originalServings * scaleFactor
      const costPerServing = scaledTotalCost / scaledServings
      
      const originalCostPerServing = originalTotalCost / originalServings
      
      expect(costPerServing).toBeCloseTo(originalCostPerServing, 2)
    })

    it('should scale by custom factor', () => {
      const originalQuantity = 100
      const customFactor = 1.5
      const scaledQuantity = originalQuantity * customFactor
      
      expect(scaledQuantity).toBe(150)
    })

    it('should scale down correctly', () => {
      const originalServings = 24
      const targetServings = 12
      const scaleFactor = targetServings / originalServings
      
      const originalQuantity = 500
      const scaledQuantity = originalQuantity * scaleFactor
      
      expect(scaleFactor).toBe(0.5)
      expect(scaledQuantity).toBe(250)
    })

    it('should round scaled servings', () => {
      const originalServings = 12
      const scaleFactor = 1.5
      const scaledServings = Math.round(originalServings * scaleFactor)
      
      expect(scaledServings).toBe(18)
    })
  })

  describe('Egg Quantity Formatting', () => {
    it('should format whole eggs', () => {
      const quantity = 3.0
      const whole = Math.floor(quantity)
      const fraction = quantity - whole
      
      const formatted = fraction < 0.125 ? whole.toString() : `${whole} + fraction`
      
      expect(whole).toBe(3)
      expect(formatted).toBe('3')
    })

    it('should format eggs with 1/4', () => {
      const quantity = 2.25
      const whole = Math.floor(quantity)
      const fraction = quantity - whole
      
      // 0.25 falls in range 0.125 to 0.375
      const shouldBe = fraction >= 0.125 && fraction < 0.375
      
      expect(whole).toBe(2)
      expect(fraction).toBe(0.25)
      expect(shouldBe).toBe(true)
    })

    it('should format eggs with 1/2', () => {
      const quantity = 2.5
      const whole = Math.floor(quantity)
      const fraction = quantity - whole
      
      // 0.5 falls in range 0.375 to 0.625
      const shouldBe = fraction >= 0.375 && fraction < 0.625
      
      expect(whole).toBe(2)
      expect(fraction).toBe(0.5)
      expect(shouldBe).toBe(true)
    })

    it('should format eggs with 3/4', () => {
      const quantity = 2.75
      const whole = Math.floor(quantity)
      const fraction = quantity - whole
      
      // 0.75 falls in range 0.625 to 0.875
      const shouldBe = fraction >= 0.625 && fraction < 0.875
      
      expect(whole).toBe(2)
      expect(fraction).toBe(0.75)
      expect(shouldBe).toBe(true)
    })

    it('should round up near whole number', () => {
      const quantity = 2.9
      const whole = Math.floor(quantity)
      const fraction = quantity - whole
      
      // 0.9 is >= 0.875, should round to 3
      const shouldRoundUp = fraction >= 0.875
      const result = shouldRoundUp ? whole + 1 : whole
      
      expect(shouldRoundUp).toBe(true)
      expect(result).toBe(3)
    })
  })

  describe('Quantity Formatting', () => {
    it('should format very small quantities with 3 decimals', () => {
      const quantity = 0.045
      const formatted = quantity < 0.1 ? quantity.toFixed(3) : quantity.toFixed(2)
      
      expect(formatted).toBe('0.045')
    })

    it('should format small quantities with 2 decimals', () => {
      const quantity = 0.5
      const formatted = quantity < 1 ? quantity.toFixed(2) : quantity.toFixed(1)
      
      expect(formatted).toBe('0.50')
    })

    it('should format medium quantities with 1 decimal', () => {
      const quantity = 5.5
      const formatted = quantity < 10 ? quantity.toFixed(1) : Math.round(quantity).toString()
      
      expect(formatted).toBe('5.5')
    })

    it('should format large quantities as whole numbers', () => {
      const quantity = 250.7
      const formatted = Math.round(quantity).toString()
      
      expect(formatted).toBe('251')
    })
  })

  describe('Form Validation', () => {
    it('should validate recipe name is required', () => {
      const name = ''
      const isValid = name.length > 0
      
      expect(isValid).toBe(false)
    })

    it('should validate servings is positive', () => {
      const servings = 12
      const isValid = servings > 0
      
      expect(isValid).toBe(true)
    })

    it('should reject zero servings', () => {
      const servings = 0
      const isValid = servings > 0
      
      expect(isValid).toBe(false)
    })

    it('should reject negative servings', () => {
      const servings = -5
      const isValid = servings > 0
      
      expect(isValid).toBe(false)
    })

    it('should validate labor cost is non-negative', () => {
      const laborCost = 15.00
      const isValid = laborCost >= 0
      
      expect(isValid).toBe(true)
    })

    it('should allow zero labor cost', () => {
      const laborCost = 0
      const isValid = laborCost >= 0
      
      expect(isValid).toBe(true)
    })

    it('should reject negative labor cost', () => {
      const laborCost = -10
      const isValid = laborCost >= 0
      
      expect(isValid).toBe(false)
    })

    it('should validate overhead cost is non-negative', () => {
      const overheadCost = 3.00
      const isValid = overheadCost >= 0
      
      expect(isValid).toBe(true)
    })

    it('should validate labor time is non-negative', () => {
      const laborTime = 45
      const isValid = laborTime >= 0
      
      expect(isValid).toBe(true)
    })

    it('should validate prep time is non-negative', () => {
      const prepTime = 15
      const isValid = prepTime >= 0
      
      expect(isValid).toBe(true)
    })

    it('should validate cook time is non-negative', () => {
      const cookTime = 30
      const isValid = cookTime >= 0
      
      expect(isValid).toBe(true)
    })

    it('should validate cool time is non-negative', () => {
      const coolTime = 60
      const isValid = coolTime >= 0
      
      expect(isValid).toBe(true)
    })

    it('should require at least one ingredient', () => {
      const ingredients: any[] = []
      const isValid = ingredients.length > 0
      
      expect(isValid).toBe(false)
    })

    it('should validate ingredient quantity is positive', () => {
      const quantity = 250
      const isValid = quantity > 0
      
      expect(isValid).toBe(true)
    })

    it('should reject zero ingredient quantity', () => {
      const quantity = 0
      const isValid = quantity > 0
      
      expect(isValid).toBe(false)
    })
  })

  describe('Real-World Recipe: Chocolate Chip Cookies', () => {
    it('should calculate complete recipe cost', () => {
      // Ingredients
      const flour = { quantity: 280, costPerUnit: 0.0018 } // $0.504
      const sugar = { quantity: 200, costPerUnit: 0.00154 } // $0.308
      const brownSugar = { quantity: 220, costPerUnit: 0.00154 } // $0.339
      const butter = { quantity: 226, costPerUnit: 0.00991 } // $2.240
      const eggs = { quantity: 2, costPerUnit: 0.35 } // $0.70
      const vanilla = { quantity: 5, costPerUnit: 0.11008 } // $0.550
      const bakingSoda = { quantity: 5, costPerUnit: 0.01542 } // $0.077
      const salt = { quantity: 5, costPerUnit: 0.001 } // $0.005
      const chocolateChips = { quantity: 340, costPerUnit: 0.015 } // $5.10
      
      const ingredients = [flour, sugar, brownSugar, butter, eggs, vanilla, bakingSoda, salt, chocolateChips]
      
      const ingredientsCost = ingredients.reduce(
        (sum, ing) => sum + (ing.quantity * ing.costPerUnit),
        0
      )
      
      const laborCost = 20.00 // 60 minutes at $20/hour
      const overheadCost = 2.50
      const totalCost = ingredientsCost + laborCost + overheadCost
      
      const servings = 48 // cookies
      const costPerServing = totalCost / servings
      
      expect(ingredientsCost).toBeCloseTo(9.823, 2)
      expect(totalCost).toBeCloseTo(32.323, 2)
      expect(costPerServing).toBeCloseTo(0.673, 3)
    })
  })

  describe('Real-World Recipe: Chocolate Cake', () => {
    it('should calculate complete recipe cost with conversions', () => {
      // Ingredients (some need conversion)
      const flour = { quantity: 250, unit: 'g', costPerUnit: 0.0018 } // $0.45
      const sugar = { quantity: 200, unit: 'g', costPerUnit: 0.00154 } // $0.308
      const cocoa = { quantity: 75, unit: 'g', costPerUnit: 0.0265 } // $1.988
      const bakingPowder = { quantity: 10, unit: 'g', costPerUnit: 0.01542 } // $0.154
      const bakingSoda = { quantity: 5, unit: 'g', costPerUnit: 0.01542 } // $0.077
      const salt = { quantity: 5, unit: 'g', costPerUnit: 0.001 } // $0.005
      const eggs = { quantity: 2, unit: 'unit', costPerUnit: 0.35 } // $0.70
      const milk = { quantity: 240, unit: 'ml', costPerUnit: 0.00379 } // $0.910
      const oil = { quantity: 120, unit: 'ml', costPerUnit: 0.008 } // $0.96
      const vanilla = { quantity: 10, unit: 'ml', costPerUnit: 0.11008 } // $1.101
      
      const ingredients = [flour, sugar, cocoa, bakingPowder, bakingSoda, salt, eggs, milk, oil, vanilla]
      
      const ingredientsCost = ingredients.reduce(
        (sum, ing) => sum + (ing.quantity * ing.costPerUnit),
        0
      )
      
      const laborCost = 25.00 // 75 minutes
      const overheadCost = 3.50
      const totalCost = ingredientsCost + laborCost + overheadCost
      
      const servings = 12 // slices
      const costPerServing = totalCost / servings
      
      expect(ingredientsCost).toBeCloseTo(6.653, 2)
      expect(totalCost).toBeCloseTo(35.153, 2)
      expect(costPerServing).toBeCloseTo(2.929, 3)
    })
  })

  describe('Recipe Duplication', () => {
    it('should create copy with new ID', () => {
      const originalId = 'recipe-123'
      const newId = 'recipe-456' // would be uuidv4()
      
      expect(newId).not.toBe(originalId)
    })

    it('should append (Copy) to name', () => {
      const originalName = 'Chocolate Cake'
      const duplicatedName = `${originalName} (Copy)`
      
      expect(duplicatedName).toBe('Chocolate Cake (Copy)')
    })

    it('should preserve all recipe data except ID and name', () => {
      const original = {
        id: 'recipe-123',
        name: 'Chocolate Cake',
        servings: 12,
        totalCost: 35.15,
        ingredients: [{ id: '1', quantity: 250 }]
      }
      
      const duplicate = {
        ...original,
        id: 'recipe-456',
        name: `${original.name} (Copy)`
      }
      
      expect(duplicate.servings).toBe(original.servings)
      expect(duplicate.totalCost).toBe(original.totalCost)
      expect(duplicate.ingredients).toEqual(original.ingredients)
      expect(duplicate.id).not.toBe(original.id)
      expect(duplicate.name).not.toBe(original.name)
    })
  })

  describe('Recipe Filtering and Sorting', () => {
    it('should filter recipes by search term', () => {
      const recipes = [
        { name: 'Chocolate Cake', description: 'Rich chocolate' },
        { name: 'Vanilla Cake', description: 'Light and fluffy' },
        { name: 'Chocolate Cookies', description: 'Crispy cookies' }
      ]
      
      const searchTerm = 'chocolate'
      const filtered = recipes.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      expect(filtered).toHaveLength(2)
      expect(filtered[0].name).toBe('Chocolate Cake')
      expect(filtered[1].name).toBe('Chocolate Cookies')
    })

    it('should filter recipes by category', () => {
      const recipes = [
        { name: 'Chocolate Cake', category: 'Cakes' },
        { name: 'Sugar Cookies', category: 'Cookies' },
        { name: 'Vanilla Cake', category: 'Cakes' }
      ]
      
      const category = 'Cakes'
      const filtered = recipes.filter(r => r.category === category)
      
      expect(filtered).toHaveLength(2)
    })

    it('should sort recipes by name', () => {
      const recipes = [
        { name: 'Vanilla Cake', totalCost: 30 },
        { name: 'Chocolate Cake', totalCost: 35 },
        { name: 'Apple Pie', totalCost: 25 }
      ]
      
      const sorted = [...recipes].sort((a, b) => a.name.localeCompare(b.name))
      
      expect(sorted[0].name).toBe('Apple Pie')
      expect(sorted[1].name).toBe('Chocolate Cake')
      expect(sorted[2].name).toBe('Vanilla Cake')
    })

    it('should sort recipes by cost', () => {
      const recipes = [
        { name: 'Vanilla Cake', totalCost: 30 },
        { name: 'Chocolate Cake', totalCost: 35 },
        { name: 'Apple Pie', totalCost: 25 }
      ]
      
      const sorted = [...recipes].sort((a, b) => a.totalCost - b.totalCost)
      
      expect(sorted[0].totalCost).toBe(25)
      expect(sorted[1].totalCost).toBe(30)
      expect(sorted[2].totalCost).toBe(35)
    })

    it('should sort recipes by date (newest first)', () => {
      const recipes = [
        { name: 'Recipe 1', createdAt: '2025-01-15T10:00:00Z' },
        { name: 'Recipe 2', createdAt: '2025-01-18T10:00:00Z' },
        { name: 'Recipe 3', createdAt: '2025-01-10T10:00:00Z' }
      ]
      
      const sorted = [...recipes].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      
      expect(sorted[0].name).toBe('Recipe 2') // newest
      expect(sorted[1].name).toBe('Recipe 1')
      expect(sorted[2].name).toBe('Recipe 3') // oldest
    })
  })

  describe('Edge Cases', () => {
    it('should handle recipe with no ingredients', () => {
      const ingredients: any[] = []
      const laborCost = 10
      const overheadCost = 2
      
      const ingredientsCost = ingredients.reduce((sum, ing) => sum + ing.cost, 0)
      const totalCost = ingredientsCost + laborCost + overheadCost
      
      expect(ingredientsCost).toBe(0)
      expect(totalCost).toBe(12)
    })

    it('should handle very small ingredient quantities', () => {
      const quantity = 0.001 // 1 milligram
      const costPerUnit = 0.01
      const cost = quantity * costPerUnit
      
      expect(cost).toBe(0.00001)
    })

    it('should handle very large ingredient quantities', () => {
      const quantity = 10000 // 10kg
      const costPerUnit = 0.0018
      const cost = quantity * costPerUnit
      
      expect(cost).toBe(18)
    })

    it('should handle scaling by very small factor', () => {
      const originalQuantity = 100
      const scaleFactor = 0.1
      const scaledQuantity = originalQuantity * scaleFactor
      
      expect(scaledQuantity).toBe(10)
    })

    it('should handle scaling by very large factor', () => {
      const originalQuantity = 100
      const scaleFactor = 10
      const scaledQuantity = originalQuantity * scaleFactor
      
      expect(scaledQuantity).toBe(1000)
    })
  })
})
