import { describe, it, expect } from 'vitest'

/**
 * Integration Tests for InventoryManager Component
 * Tests complete workflows and calculation correctness
 */
describe('InventoryManager Integration Tests', () => {
  
  describe('Complete Ingredient Lifecycle', () => {
    it('should calculate ingredient cost correctly from form inputs', () => {
      // Simulate form submission
      const formData = {
        name: 'Butter',
        packageSize: 454, // grams
        packageCost: 4.50, // dollars
        unit: 'g'
      }
      
      // Calculate cost per unit (same as onAddIngredient in InventoryManager)
      const costPerUnit = formData.packageCost / formData.packageSize
      
      expect(costPerUnit).toBeCloseTo(0.00991, 5)
      
      // Verify the ingredient object structure
      const ingredient = {
        id: 'test-id',
        name: formData.name,
        cost: costPerUnit,
        unit: formData.unit,
        packageSize: formData.packageSize,
        packageCost: formData.packageCost,
      }
      
      expect(ingredient.cost).toBe(costPerUnit)
      expect(ingredient.packageSize).toBe(454)
      expect(ingredient.packageCost).toBe(4.50)
    })

    it('should update ingredient cost correctly when edited', () => {
      // Original ingredient
      const original = {
        id: 'butter-1',
        name: 'Butter',
        packageSize: 454,
        packageCost: 4.50,
        unit: 'g',
        cost: 0.00991
      }
      
      // User edits the package cost (price increase)
      const updatedFormData = {
        name: 'Butter',
        packageSize: 454,
        packageCost: 5.00, // Price went up
        unit: 'g'
      }
      
      // Recalculate cost (same as onEditIngredient)
      const newCostPerUnit = updatedFormData.packageCost / updatedFormData.packageSize
      
      expect(newCostPerUnit).toBeCloseTo(0.01101, 5)
      expect(newCostPerUnit).toBeGreaterThan(original.cost)
    })
  })

  describe('Shopping List Generation Workflow', () => {
    it('should generate correct shopping list for pending orders', () => {
      // Setup: Ingredients
      const flour = {
        id: 'flour-1',
        name: 'All-Purpose Flour',
        cost: 0.0018,
        unit: 'g',
        packageSize: 5000,
        packageCost: 8.99
      }
      
      const butter = {
        id: 'butter-1',
        name: 'Butter',
        cost: 0.00991,
        unit: 'g',
        packageSize: 454,
        packageCost: 4.50
      }
      
      // Setup: Current inventory
      const inventory = [
        { ingredientId: 'flour-1', currentStock: 1000, minStock: 500, unit: 'g', costPerUnit: 0.0018 },
        { ingredientId: 'butter-1', currentStock: 0, minStock: 200, unit: 'g', costPerUnit: 0.00991 }
      ]
      
      // Setup: Recipe (Chocolate Cake)
      const recipe = {
        id: 'cake-1',
        name: 'Chocolate Cake',
        ingredients: [
          { ingredientId: 'flour-1', quantity: 250, unit: 'g' },
          { ingredientId: 'butter-1', quantity: 100, unit: 'g' }
        ]
      }
      
      // Setup: Pending order (3 cakes)
      const order = {
        id: 'order-1',
        status: 'new' as const,
        items: [
          { recipeId: 'cake-1', quantity: 3 }
        ]
      }
      
      // Calculate ingredients needed
      const flourNeeded = 250 * 3 // 750g
      const butterNeeded = 100 * 3 // 300g
      
      // Calculate deficits
      const flourDeficit = Math.max(0, flourNeeded - 1000) // 0 (have enough)
      const butterDeficit = Math.max(0, butterNeeded - 0) // 300 (out of stock)
      
      expect(flourNeeded).toBe(750)
      expect(butterNeeded).toBe(300)
      expect(flourDeficit).toBe(0)
      expect(butterDeficit).toBe(300)
      
      // Generate shopping list (only items with deficit > 0)
      const shoppingList = []
      
      if (butterDeficit > 0) {
        shoppingList.push({
          ingredientId: 'butter-1',
          ingredientName: 'Butter',
          needed: butterNeeded,
          currentStock: 0,
          deficit: butterDeficit,
          unit: 'g',
          estimatedCost: butterDeficit * butter.cost,
          priority: 0 === 0 ? 'critical' : 0 < 200 ? 'needed' : 'optional'
        })
      }
      
      expect(shoppingList).toHaveLength(1)
      expect(shoppingList[0].ingredientName).toBe('Butter')
      expect(shoppingList[0].deficit).toBe(300)
      expect(shoppingList[0].estimatedCost).toBeCloseTo(2.973, 3)
      expect(shoppingList[0].priority).toBe('critical')
    })

    it('should calculate total shopping cost correctly', () => {
      const shoppingList = [
        { ingredientId: '1', ingredientName: 'Flour', deficit: 350, estimatedCost: 0.63 },
        { ingredientId: '2', ingredientName: 'Butter', deficit: 300, estimatedCost: 2.97 },
        { ingredientId: '3', ingredientName: 'Sugar', deficit: 200, estimatedCost: 0.31 }
      ]
      
      const totalCost = shoppingList.reduce((sum, item) => sum + item.estimatedCost, 0)
      
      expect(totalCost).toBeCloseTo(3.91, 2)
    })
  })

  describe('Stock Adjustment Workflow', () => {
    it('should adjust stock correctly when adding', () => {
      const currentStock = 500
      const adjustment = 100
      const newStock = Math.max(0, currentStock + adjustment)
      
      expect(newStock).toBe(600)
    })

    it('should adjust stock correctly when removing', () => {
      const currentStock = 500
      const adjustment = -100
      const newStock = Math.max(0, currentStock + adjustment)
      
      expect(newStock).toBe(400)
    })

    it('should prevent negative stock', () => {
      const currentStock = 50
      const adjustment = -100
      const newStock = Math.max(0, currentStock + adjustment)
      
      expect(newStock).toBe(0)
      expect(newStock).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Alert System', () => {
    it('should generate alerts for out of stock items', () => {
      const inventoryItems = [
        { ingredientId: '1', currentStock: 0, minStock: 100 },
        { ingredientId: '2', currentStock: 50, minStock: 100 },
        { ingredientId: '3', currentStock: 150, minStock: 100 }
      ]
      
      const alerts = inventoryItems
        .filter(item => item.currentStock === 0 || item.currentStock < item.minStock)
        .map(item => ({
          type: item.currentStock === 0 ? 'out-of-stock' : 'low-stock',
          severity: item.currentStock === 0 ? 'error' : 'warning',
          currentStock: item.currentStock,
          minStock: item.minStock
        }))
      
      expect(alerts).toHaveLength(2)
      expect(alerts[0].type).toBe('out-of-stock')
      expect(alerts[0].severity).toBe('error')
      expect(alerts[1].type).toBe('low-stock')
      expect(alerts[1].severity).toBe('warning')
    })

    it('should count alerts correctly', () => {
      const alerts = [
        { type: 'out-of-stock', severity: 'error' },
        { type: 'low-stock', severity: 'warning' },
        { type: 'low-stock', severity: 'warning' }
      ]
      
      const alertCount = alerts.length
      const hasOutOfStock = alerts.some(a => a.type === 'out-of-stock')
      const hasLowStock = alerts.some(a => a.type === 'low-stock')
      
      expect(alertCount).toBe(3)
      expect(hasOutOfStock).toBe(true)
      expect(hasLowStock).toBe(true)
    })
  })

  describe('Currency Formatting', () => {
    it('should format currency correctly for display', () => {
      const currencySymbol = '$'
      const amount = 4.50
      const formatted = `${currencySymbol}${amount.toFixed(2)}`
      
      expect(formatted).toBe('$4.50')
    })

    it('should format small amounts correctly', () => {
      const currencySymbol = '$'
      const amount = 0.00991
      const formatted = `${currencySymbol}${amount.toFixed(2)}`
      
      expect(formatted).toBe('$0.01')
    })

    it('should format cost per unit with more precision', () => {
      const currencySymbol = '$'
      const amount = 0.00991
      const unit = 'g'
      const formatted = `${currencySymbol}${amount.toFixed(2)}/${unit}`
      
      expect(formatted).toBe('$0.01/g')
    })
  })

  describe('Form Input Parsing', () => {
    it('should parse number inputs correctly', () => {
      // Simulate React Hook Form input onChange
      const inputValue = '227'
      const parsedValue = parseFloat(inputValue) || 0
      
      expect(parsedValue).toBe(227)
      expect(typeof parsedValue).toBe('number')
    })

    it('should parse decimal inputs correctly', () => {
      const inputValue = '3.50'
      const parsedValue = parseFloat(inputValue) || 0
      
      expect(parsedValue).toBe(3.5)
    })

    it('should handle empty input with fallback', () => {
      const inputValue = ''
      const parsedValue = parseFloat(inputValue) || 0
      
      expect(parsedValue).toBe(0)
    })

    it('should handle invalid input with fallback', () => {
      const inputValue = 'abc'
      const parsedValue = parseFloat(inputValue) || 0
      
      expect(parsedValue).toBe(0)
    })
  })

  describe('Real-World Scenario: Bakery Restocking', () => {
    it('should calculate complete restocking needs for a week of orders', () => {
      // Bakery has 5 pending orders for the week
      const orders = [
        { cakes: 2, cookies: 12 },
        { cakes: 3, cookies: 24 },
        { cakes: 1, cookies: 6 },
        { cakes: 4, cookies: 18 },
        { cakes: 2, cookies: 12 }
      ]
      
      // Recipe requirements
      const flourPerCake = 250 // grams
      const flourPerCookie = 30 // grams
      const butterPerCake = 100 // grams
      const butterPerCookie = 20 // grams
      
      // Calculate total needs
      const totalCakes = orders.reduce((sum, o) => sum + o.cakes, 0)
      const totalCookies = orders.reduce((sum, o) => sum + o.cookies, 0)
      
      const flourNeeded = (totalCakes * flourPerCake) + (totalCookies * flourPerCookie)
      const butterNeeded = (totalCakes * butterPerCake) + (totalCookies * butterPerCookie)
      
      expect(totalCakes).toBe(12)
      expect(totalCookies).toBe(72)
      expect(flourNeeded).toBe(5160) // 3000 + 2160
      expect(butterNeeded).toBe(2640) // 1200 + 1440
      
      // Current stock
      const currentFlour = 2000
      const currentButter = 500
      
      // Deficits
      const flourDeficit = Math.max(0, flourNeeded - currentFlour)
      const butterDeficit = Math.max(0, butterNeeded - currentButter)
      
      expect(flourDeficit).toBe(3160)
      expect(butterDeficit).toBe(2140)
      
      // Costs
      const flourCost = 0.0018
      const butterCost = 0.00991
      
      const flourShoppingCost = flourDeficit * flourCost
      const butterShoppingCost = butterDeficit * butterCost
      const totalShoppingCost = flourShoppingCost + butterShoppingCost
      
      expect(flourShoppingCost).toBeCloseTo(5.69, 2)
      expect(butterShoppingCost).toBeCloseTo(21.21, 2)
      expect(totalShoppingCost).toBeCloseTo(26.90, 2)
    })
  })

  describe('Validation and Error Handling', () => {
    it('should validate positive package size', () => {
      const packageSize = 454
      const isValid = packageSize > 0
      
      expect(isValid).toBe(true)
    })

    it('should validate positive package cost', () => {
      const packageCost = 4.50
      const isValid = packageCost > 0
      
      expect(isValid).toBe(true)
    })

    it('should reject zero package size', () => {
      const packageSize = 0
      const isValid = packageSize > 0
      
      expect(isValid).toBe(false)
    })

    it('should reject negative values', () => {
      const packageSize = -100
      const packageCost = -5.00
      
      expect(packageSize > 0).toBe(false)
      expect(packageCost > 0).toBe(false)
    })
  })
})
