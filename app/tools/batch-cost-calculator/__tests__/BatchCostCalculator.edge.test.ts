import { describe, it, expect } from 'vitest'

/**
 * Edge Cases and Boundary Tests for Batch Cost Calculator
 * Tests unusual inputs, zero values, and extreme scenarios
 */
describe('BatchCostCalculator - Edge Cases', () => {
  
  describe('Zero Values', () => {
    it('should handle zero batches', () => {
      const batches = 0
      const costPerBatch = 15.00
      const pricePerBatch = 35.00
      const yieldPerBatch = 12
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalProfit = totalRevenue - totalCost
      const totalUnits = batches * yieldPerBatch
      const costPerUnit = totalUnits > 0 ? totalCost / totalUnits : 0
      
      expect(totalCost).toBe(0)
      expect(totalRevenue).toBe(0)
      expect(totalProfit).toBe(0)
      expect(totalUnits).toBe(0)
      expect(costPerUnit).toBe(0)
    })

    it('should handle zero cost per batch', () => {
      const batches = 3
      const costPerBatch = 0
      const pricePerBatch = 35.00
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalProfit = totalRevenue - totalCost
      
      expect(totalCost).toBe(0)
      expect(totalRevenue).toBe(105.00)
      expect(totalProfit).toBe(105.00)
    })

    it('should handle zero price per batch', () => {
      const batches = 3
      const costPerBatch = 15.00
      const pricePerBatch = 0
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalProfit = totalRevenue - totalCost
      const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0
      
      expect(totalCost).toBe(45.00)
      expect(totalRevenue).toBe(0)
      expect(totalProfit).toBe(-45.00)
      expect(profitMargin).toBe(0)
    })

    it('should handle zero yield per batch', () => {
      const batches = 3
      const yieldPerBatch = 0
      
      const totalUnits = batches * yieldPerBatch
      const totalCost = 45.00
      const costPerUnit = totalUnits > 0 ? totalCost / totalUnits : 0
      
      expect(totalUnits).toBe(0)
      expect(costPerUnit).toBe(0)
    })

    it('should handle zero labor hours', () => {
      const laborHours = 0
      const hourlyRate = 25
      
      const totalLaborCost = laborHours * hourlyRate
      
      expect(totalLaborCost).toBe(0)
    })

    it('should handle zero hourly rate', () => {
      const laborHours = 5
      const hourlyRate = 0
      
      const totalLaborCost = laborHours * hourlyRate
      
      expect(totalLaborCost).toBe(0)
    })

    it('should handle zero overhead costs', () => {
      const overheadCosts = 0
      const productCosts = 100
      const laborCosts = 50
      
      const grandTotalCost = productCosts + laborCosts + overheadCosts
      
      expect(grandTotalCost).toBe(150)
    })

    it('should handle all zeros', () => {
      const batches = 0
      const costPerBatch = 0
      const pricePerBatch = 0
      const yieldPerBatch = 0
      const laborHours = 0
      const hourlyRate = 0
      const overheadCosts = 0
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalUnits = batches * yieldPerBatch
      const totalLaborCost = laborHours * hourlyRate
      const grandTotalCost = totalCost + totalLaborCost + overheadCosts
      const grandTotalRevenue = totalRevenue
      const grandTotalProfit = grandTotalRevenue - grandTotalCost
      
      expect(totalCost).toBe(0)
      expect(totalRevenue).toBe(0)
      expect(totalUnits).toBe(0)
      expect(grandTotalCost).toBe(0)
      expect(grandTotalProfit).toBe(0)
    })
  })

  describe('Fractional Values', () => {
    it('should handle fractional batches', () => {
      const batches = 2.5
      const costPerBatch = 10.00
      const pricePerBatch = 25.00
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      
      expect(totalCost).toBe(25.00)
      expect(totalRevenue).toBe(62.50)
    })

    it('should handle fractional labor hours', () => {
      const laborHours = 3.75
      const hourlyRate = 24
      
      const totalLaborCost = laborHours * hourlyRate
      
      expect(totalLaborCost).toBe(90)
    })

    it('should handle fractional yield per batch', () => {
      const batches = 4
      const yieldPerBatch = 12.5
      
      const totalUnits = batches * yieldPerBatch
      
      expect(totalUnits).toBe(50)
    })

    it('should handle very small fractional values', () => {
      const batches = 0.1
      const costPerBatch = 10.00
      
      const totalCost = batches * costPerBatch
      
      expect(totalCost).toBeCloseTo(1.00, 2)
    })
  })

  describe('Very Large Values', () => {
    it('should handle very large batch count', () => {
      const batches = 1000
      const costPerBatch = 8.00
      const pricePerBatch = 20.00
      const yieldPerBatch = 24
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalUnits = batches * yieldPerBatch
      
      expect(totalCost).toBe(8000)
      expect(totalRevenue).toBe(20000)
      expect(totalUnits).toBe(24000)
    })

    it('should handle very large costs', () => {
      const batches = 5
      const costPerBatch = 500.00
      const pricePerBatch = 1200.00
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalProfit = totalRevenue - totalCost
      
      expect(totalCost).toBe(2500)
      expect(totalRevenue).toBe(6000)
      expect(totalProfit).toBe(3500)
    })

    it('should handle very large labor hours', () => {
      const laborHours = 100
      const hourlyRate = 30
      
      const totalLaborCost = laborHours * hourlyRate
      
      expect(totalLaborCost).toBe(3000)
    })

    it('should handle very large overhead', () => {
      const overheadCosts = 5000
      const productCosts = 1000
      const laborCosts = 500
      
      const grandTotalCost = productCosts + laborCosts + overheadCosts
      
      expect(grandTotalCost).toBe(6500)
    })
  })

  describe('Very Small Values', () => {
    it('should handle very small cost per batch', () => {
      const batches = 10
      const costPerBatch = 0.50
      
      const totalCost = batches * costPerBatch
      
      expect(totalCost).toBe(5.00)
    })

    it('should handle very small price per batch', () => {
      const batches = 10
      const pricePerBatch = 1.25
      
      const totalRevenue = batches * pricePerBatch
      
      expect(totalRevenue).toBe(12.50)
    })

    it('should handle very small yield', () => {
      const batches = 5
      const yieldPerBatch = 2
      
      const totalUnits = batches * yieldPerBatch
      
      expect(totalUnits).toBe(10)
    })

    it('should handle cents-level calculations', () => {
      const batches = 3
      const costPerBatch = 0.99
      const pricePerBatch = 2.49
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalProfit = totalRevenue - totalCost
      
      expect(totalCost).toBeCloseTo(2.97, 2)
      expect(totalRevenue).toBeCloseTo(7.47, 2)
      expect(totalProfit).toBeCloseTo(4.50, 2)
    })
  })

  describe('Loss Scenarios', () => {
    it('should calculate negative profit when price < cost', () => {
      const batches = 5
      const costPerBatch = 25.00
      const pricePerBatch = 20.00
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalProfit = totalRevenue - totalCost
      const profitMargin = (totalProfit / totalRevenue) * 100
      
      expect(totalProfit).toBe(-25.00)
      expect(profitMargin).toBe(-25.00)
    })

    it('should calculate loss when labor costs exceed profit', () => {
      const batches = 3
      const costPerBatch = 10.00
      const pricePerBatch = 25.00
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const productProfit = totalRevenue - totalCost
      
      const laborHours = 10
      const hourlyRate = 30
      const totalLaborCost = laborHours * hourlyRate
      
      const grandTotalCost = totalCost + totalLaborCost
      const grandTotalProfit = totalRevenue - grandTotalCost
      
      expect(productProfit).toBe(45.00)
      expect(totalLaborCost).toBe(300.00)
      expect(grandTotalProfit).toBe(-255.00)
    })

    it('should calculate loss when overhead is too high', () => {
      const productCosts = 50.00
      const totalRevenue = 100.00
      const laborCosts = 30.00
      const overheadCosts = 50.00
      
      const grandTotalCost = productCosts + laborCosts + overheadCosts
      const grandTotalProfit = totalRevenue - grandTotalCost
      
      expect(grandTotalCost).toBe(130.00)
      expect(grandTotalProfit).toBe(-30.00)
    })
  })

  describe('Precision and Rounding', () => {
    it('should maintain precision with repeating decimals', () => {
      const batches = 3
      const costPerBatch = 10.00
      const yieldPerBatch = 7
      
      const totalCost = batches * costPerBatch
      const totalUnits = batches * yieldPerBatch
      const costPerUnit = totalCost / totalUnits
      
      expect(totalUnits).toBe(21)
      expect(costPerUnit).toBeCloseTo(1.429, 3)
    })

    it('should handle profit margin with many decimals', () => {
      const batches = 7
      const costPerBatch = 13.33
      const pricePerBatch = 29.99
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalProfit = totalRevenue - totalCost
      const profitMargin = (totalProfit / totalRevenue) * 100
      
      expect(totalCost).toBeCloseTo(93.31, 2)
      expect(totalRevenue).toBeCloseTo(209.93, 2)
      expect(profitMargin).toBeCloseTo(55.552, 2)
    })

    it('should handle very precise calculations', () => {
      const batches = 4
      const costPerBatch = 12.345
      const pricePerBatch = 28.678
      const yieldPerBatch = 15
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalUnits = batches * yieldPerBatch
      const costPerUnit = totalCost / totalUnits
      const pricePerUnit = totalRevenue / totalUnits
      
      expect(totalCost).toBeCloseTo(49.38, 2)
      expect(totalRevenue).toBeCloseTo(114.712, 3)
      expect(costPerUnit).toBeCloseTo(0.823, 3)
      expect(pricePerUnit).toBeCloseTo(1.912, 3)
    })
  })

  describe('Multiple Products Edge Cases', () => {
    it('should handle empty products array', () => {
      const products: any[] = []
      
      const totalCost = products.reduce((sum, p) => sum + (p.batches * p.costPerBatch), 0)
      const totalRevenue = products.reduce((sum, p) => sum + (p.batches * p.pricePerBatch), 0)
      
      expect(totalCost).toBe(0)
      expect(totalRevenue).toBe(0)
    })

    it('should handle single product in array', () => {
      const products = [
        { batches: 2, costPerBatch: 10.00, pricePerBatch: 25.00 }
      ]
      
      const totalCost = products.reduce((sum, p) => sum + (p.batches * p.costPerBatch), 0)
      const totalRevenue = products.reduce((sum, p) => sum + (p.batches * p.pricePerBatch), 0)
      
      expect(totalCost).toBe(20.00)
      expect(totalRevenue).toBe(50.00)
    })

    it('should handle many products', () => {
      const products = Array(50).fill(null).map(() => ({
        batches: 1,
        costPerBatch: 5.00,
        pricePerBatch: 12.00,
        yieldPerBatch: 10
      }))
      
      const totalCost = products.reduce((sum, p) => sum + (p.batches * p.costPerBatch), 0)
      const totalRevenue = products.reduce((sum, p) => sum + (p.batches * p.pricePerBatch), 0)
      const totalUnits = products.reduce((sum, p) => sum + (p.batches * p.yieldPerBatch), 0)
      
      expect(totalCost).toBe(250.00)
      expect(totalRevenue).toBe(600.00)
      expect(totalUnits).toBe(500)
    })

    it('should handle mixed profitable and unprofitable products', () => {
      const products = [
        { batches: 2, costPerBatch: 10.00, pricePerBatch: 30.00 }, // Profitable
        { batches: 3, costPerBatch: 20.00, pricePerBatch: 15.00 }, // Loss
        { batches: 1, costPerBatch: 8.00, pricePerBatch: 25.00 },  // Profitable
      ]
      
      const productCalculations = products.map(p => ({
        totalCost: p.batches * p.costPerBatch,
        totalRevenue: p.batches * p.pricePerBatch,
        totalProfit: (p.batches * p.pricePerBatch) - (p.batches * p.costPerBatch)
      }))
      
      expect(productCalculations[0].totalProfit).toBe(40.00)
      expect(productCalculations[1].totalProfit).toBe(-15.00)
      expect(productCalculations[2].totalProfit).toBe(17.00)
      
      const totalProfit = productCalculations.reduce((sum, p) => sum + p.totalProfit, 0)
      expect(totalProfit).toBe(42.00)
    })
  })

  describe('Boundary Conditions', () => {
    it('should handle exactly break-even scenario', () => {
      const batches = 5
      const costPerBatch = 20.00
      const pricePerBatch = 20.00
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalProfit = totalRevenue - totalCost
      const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0
      
      expect(totalProfit).toBe(0)
      expect(profitMargin).toBe(0)
    })

    it('should handle 100% profit margin', () => {
      const batches = 3
      const costPerBatch = 0
      const pricePerBatch = 30.00
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalProfit = totalRevenue - totalCost
      const profitMargin = (totalProfit / totalRevenue) * 100
      
      expect(totalProfit).toBe(90.00)
      expect(profitMargin).toBe(100)
    })

    it('should handle single unit yield', () => {
      const batches = 5
      const yieldPerBatch = 1
      
      const totalUnits = batches * yieldPerBatch
      
      expect(totalUnits).toBe(5)
    })

    it('should handle minimum hourly rate', () => {
      const laborHours = 8
      const hourlyRate = 0.01
      
      const totalLaborCost = laborHours * hourlyRate
      
      expect(totalLaborCost).toBeCloseTo(0.08, 2)
    })
  })
})
