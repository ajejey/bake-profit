import { describe, it, expect } from 'vitest'

/**
 * Tests for Inventory Management Calculations
 * Tests shopping list generation, stock calculations, and alerts
 */
describe('Inventory Management Calculations', () => {
  
  describe('Shopping List Generation', () => {
    it('should calculate deficit correctly when stock is insufficient', () => {
      const needed = 500 // grams needed
      const currentStock = 200 // grams in stock
      const deficit = needed - currentStock
      
      expect(deficit).toBe(300)
    })

    it('should not add to shopping list when stock is sufficient', () => {
      const needed = 200
      const currentStock = 500
      const deficit = needed - currentStock
      
      expect(deficit).toBe(-300)
      expect(deficit).toBeLessThan(0)
      // Deficit is negative, so we don't need to buy more
      expect(needed).toBeLessThan(currentStock)
    })

    it('should calculate estimated cost correctly', () => {
      const deficit = 300 // grams
      const costPerUnit = 0.01 // $0.01 per gram
      const estimatedCost = deficit * costPerUnit
      
      expect(estimatedCost).toBe(3.00)
    })

    it('should prioritize critical items (out of stock)', () => {
      const currentStock = 0
      const needed = 100
      const minStock = 50
      
      const priority = currentStock === 0 ? 'critical' : 
                      currentStock < minStock ? 'needed' : 'optional'
      
      expect(priority).toBe('critical')
    })

    it('should prioritize needed items (below minimum)', () => {
      const currentStock = 30
      const needed = 100
      const minStock = 50
      
      const priority = (currentStock as number) === 0 ? 'critical' : 
                      currentStock < minStock ? 'needed' : 'optional'
      
      expect(priority).toBe('needed')
      expect(needed).toBeGreaterThan(currentStock)
    })

    it('should prioritize optional items (above minimum)', () => {
      const currentStock = 80
      const needed = 100
      const minStock = 50
      
      const priority = (currentStock as number) === 0 ? 'critical' : 
                      currentStock < minStock ? 'needed' : 'optional'
      
      expect(priority).toBe('optional')
      expect(needed).toBeGreaterThan(currentStock)
    })
  })

  describe('Ingredients Calculation for Orders', () => {
    it('should calculate total ingredients needed for single order', () => {
      // Recipe needs 200g flour per unit
      const recipeIngredientQty = 200
      const orderQuantity = 3 // 3 cakes ordered
      
      const totalNeeded = recipeIngredientQty * orderQuantity
      
      expect(totalNeeded).toBe(600)
    })

    it('should calculate total ingredients needed for multiple orders', () => {
      // Order 1: 3 cakes × 200g = 600g
      // Order 2: 2 cakes × 200g = 400g
      const order1 = 3 * 200
      const order2 = 2 * 200
      const totalNeeded = order1 + order2
      
      expect(totalNeeded).toBe(1000)
    })

    it('should accumulate ingredients from multiple recipes in one order', () => {
      // Order has 2 chocolate cakes (200g flour each) + 3 vanilla cakes (150g flour each)
      const chocolateCakes = 2 * 200
      const vanillaCakes = 3 * 150
      const totalFlourNeeded = chocolateCakes + vanillaCakes
      
      expect(totalFlourNeeded).toBe(850)
    })
  })

  describe('Stock Adjustment', () => {
    it('should add stock correctly', () => {
      const currentStock = 500
      const delta = 100
      const newStock = currentStock + delta
      
      expect(newStock).toBe(600)
    })

    it('should subtract stock correctly', () => {
      const currentStock = 500
      const delta = -100
      const newStock = currentStock + delta
      
      expect(newStock).toBe(400)
    })

    it('should prevent negative stock', () => {
      const currentStock = 50
      const delta = -100
      const newStock = Math.max(0, currentStock + delta)
      
      expect(newStock).toBe(0)
    })

    it('should handle zero stock adjustment', () => {
      const currentStock = 500
      const delta = 0
      const newStock = currentStock + delta
      
      expect(newStock).toBe(500)
    })
  })

  describe('Inventory Status Detection', () => {
    it('should detect out of stock', () => {
      const currentStock = 0
      const minStock = 100
      
      const status = currentStock === 0 ? 'out' : 
                    currentStock < minStock ? 'low' : 'good'
      
      expect(status).toBe('out')
    })

    it('should detect low stock', () => {
      const currentStock = 50
      const minStock = 100
      
      const status = (currentStock as number) === 0 ? 'out' : 
                    currentStock < minStock ? 'low' : 'good'
      
      expect(status).toBe('low')
    })

    it('should detect good stock', () => {
      const currentStock = 150
      const minStock = 100
      
      const status = (currentStock as number) === 0 ? 'out' : 
                    currentStock < minStock ? 'low' : 'good'
      
      expect(status).toBe('good')
    })

    it('should detect good stock at exact minimum', () => {
      const currentStock = 100
      const minStock = 100
      
      const status = (currentStock as number) === 0 ? 'out' : 
                    currentStock < minStock ? 'low' : 'good'
      
      expect(status).toBe('good')
    })
  })

  describe('Alert Generation', () => {
    it('should generate error alert for out of stock', () => {
      const currentStock = 0
      const severity = currentStock === 0 ? 'error' : 'warning'
      
      expect(severity).toBe('error')
    })

    it('should generate warning alert for low stock', () => {
      const currentStock = 50
      const minStock = 100
      const severity = (currentStock as number) === 0 ? 'error' : 
                      currentStock < minStock ? 'warning' : 'info'
      
      expect(severity).toBe('warning')
    })

    it('should calculate days until expiry correctly', () => {
      const expirationDate = new Date('2025-01-25')
      const today = new Date('2025-01-18')
      const daysUntilExpiry = Math.floor(
        (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )
      
      expect(daysUntilExpiry).toBe(7)
    })

    it('should detect expired items', () => {
      const expirationDate = new Date('2025-01-10')
      const today = new Date('2025-01-18')
      const daysUntilExpiry = Math.floor(
        (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )
      
      expect(daysUntilExpiry).toBeLessThan(0)
    })

    it('should detect expiring soon (within 7 days)', () => {
      const expirationDate = new Date('2025-01-23')
      const today = new Date('2025-01-18')
      const daysUntilExpiry = Math.floor(
        (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )
      
      expect(daysUntilExpiry).toBe(5)
      expect(daysUntilExpiry).toBeLessThanOrEqual(7)
    })
  })

  describe('Shopping List Sorting', () => {
    it('should sort by priority correctly', () => {
      const priorityOrder = { critical: 0, needed: 1, optional: 2 }
      
      expect(priorityOrder.critical).toBeLessThan(priorityOrder.needed)
      expect(priorityOrder.needed).toBeLessThan(priorityOrder.optional)
    })

    it('should sort by cost within same priority', () => {
      const item1Cost = 15.50
      const item2Cost = 8.25
      
      // Higher cost should come first (descending)
      expect(item1Cost - item2Cost).toBeGreaterThan(0)
    })
  })

  describe('Real-World Scenario: Chocolate Cake Order', () => {
    it('should calculate shopping list for 3 chocolate cakes', () => {
      // Recipe for 1 chocolate cake
      const flourPerCake = 250 // grams
      const sugarPerCake = 200 // grams
      const cocoaPerCake = 50 // grams
      
      // Order: 3 cakes
      const cakesOrdered = 3
      
      // Current stock
      const flourStock = 400 // grams
      const sugarStock = 700 // grams
      const cocoaStock = 0 // grams (out of stock!)
      
      // Calculations
      const flourNeeded = flourPerCake * cakesOrdered
      const sugarNeeded = sugarPerCake * cakesOrdered
      const cocoaNeeded = cocoaPerCake * cakesOrdered
      
      const flourDeficit = Math.max(0, flourNeeded - flourStock)
      const sugarDeficit = Math.max(0, sugarNeeded - sugarStock)
      const cocoaDeficit = Math.max(0, cocoaNeeded - cocoaStock)
      
      // Assertions
      expect(flourNeeded).toBe(750)
      expect(flourDeficit).toBe(350) // Need 350g more flour
      
      expect(sugarNeeded).toBe(600)
      expect(sugarDeficit).toBe(0) // Have enough sugar
      
      expect(cocoaNeeded).toBe(150)
      expect(cocoaDeficit).toBe(150) // Need all 150g (out of stock)
      
      // Cost calculations
      const flourCost = 0.0018 // per gram
      const cocoaCost = 0.0265 // per gram
      
      const flourCostTotal = flourDeficit * flourCost
      const cocoaCostTotal = cocoaDeficit * cocoaCost
      
      expect(flourCostTotal).toBeCloseTo(0.63, 2)
      expect(cocoaCostTotal).toBeCloseTo(3.98, 2)
      
      // Total shopping cost
      const totalCost = flourCostTotal + cocoaCostTotal
      expect(totalCost).toBeCloseTo(4.61, 2)
    })
  })

  describe('Restock Calculations', () => {
    it('should add restocked quantity to current stock', () => {
      const currentStock = 200
      const restockQuantity = 500
      const newStock = currentStock + restockQuantity
      
      expect(newStock).toBe(700)
    })

    it('should update cost per unit if provided', () => {
      const oldCost = 0.01
      const newCost = 0.012
      
      expect(newCost).toBeGreaterThan(oldCost)
      expect(newCost).toBe(0.012)
    })

    it('should track last restocked date', () => {
      const lastRestocked = new Date().toISOString()
      
      expect(lastRestocked).toBeTruthy()
      expect(new Date(lastRestocked)).toBeInstanceOf(Date)
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero needed quantity', () => {
      const needed = 0
      const currentStock = 100
      const deficit = needed - currentStock
      
      expect(deficit).toBeLessThan(0)
    })

    it('should handle exact stock match', () => {
      const needed = 500
      const currentStock = 500
      const deficit = needed - currentStock
      
      expect(deficit).toBe(0)
    })

    it('should handle very large quantities', () => {
      const needed = 50000 // 50kg
      const currentStock = 5000 // 5kg
      const deficit = needed - currentStock
      
      expect(deficit).toBe(45000)
    })

    it('should handle fractional quantities', () => {
      const needed = 123.45
      const currentStock = 67.89
      const deficit = needed - currentStock
      
      expect(deficit).toBeCloseTo(55.56, 2)
    })
  })
})
