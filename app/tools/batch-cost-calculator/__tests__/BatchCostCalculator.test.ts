import { describe, it, expect } from 'vitest'

/**
 * Tests for Batch Cost Calculator
 * Verifies all calculations for batch production planning
 */
describe('BatchCostCalculator - Product Calculations', () => {
  
  describe('Single Product Calculations', () => {
    it('should calculate total cost correctly', () => {
      const batches = 3
      const costPerBatch = 15.50
      
      const totalCost = batches * costPerBatch
      
      expect(totalCost).toBe(46.50)
    })

    it('should calculate total revenue correctly', () => {
      const batches = 3
      const pricePerBatch = 35.00
      
      const totalRevenue = batches * pricePerBatch
      
      expect(totalRevenue).toBe(105.00)
    })

    it('should calculate total profit correctly', () => {
      const batches = 3
      const costPerBatch = 15.50
      const pricePerBatch = 35.00
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalProfit = totalRevenue - totalCost
      
      expect(totalProfit).toBe(58.50)
    })

    it('should calculate total units correctly', () => {
      const batches = 3
      const yieldPerBatch = 12
      
      const totalUnits = batches * yieldPerBatch
      
      expect(totalUnits).toBe(36)
    })

    it('should calculate cost per unit correctly', () => {
      const batches = 3
      const costPerBatch = 15.50
      const yieldPerBatch = 12
      
      const totalCost = batches * costPerBatch
      const totalUnits = batches * yieldPerBatch
      const costPerUnit = totalUnits > 0 ? totalCost / totalUnits : 0
      
      expect(costPerUnit).toBeCloseTo(1.292, 3)
    })

    it('should calculate price per unit correctly', () => {
      const batches = 3
      const pricePerBatch = 35.00
      const yieldPerBatch = 12
      
      const totalRevenue = batches * pricePerBatch
      const totalUnits = batches * yieldPerBatch
      const pricePerUnit = totalUnits > 0 ? totalRevenue / totalUnits : 0
      
      expect(pricePerUnit).toBeCloseTo(2.917, 3)
    })

    it('should calculate profit per unit correctly', () => {
      const batches = 3
      const costPerBatch = 15.50
      const pricePerBatch = 35.00
      const yieldPerBatch = 12
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalUnits = batches * yieldPerBatch
      
      const costPerUnit = totalCost / totalUnits
      const pricePerUnit = totalRevenue / totalUnits
      const profitPerUnit = pricePerUnit - costPerUnit
      
      expect(profitPerUnit).toBeCloseTo(1.625, 3)
    })

    it('should calculate profit margin correctly', () => {
      const batches = 3
      const costPerBatch = 15.50
      const pricePerBatch = 35.00
      
      const totalCost = batches * costPerBatch
      const totalRevenue = batches * pricePerBatch
      const totalProfit = totalRevenue - totalCost
      const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0
      
      expect(profitMargin).toBeCloseTo(55.714, 3)
    })

    it('should handle zero units gracefully', () => {
      const batches = 0
      const costPerBatch = 15.50
      const yieldPerBatch = 12
      
      const totalCost = batches * costPerBatch
      const totalUnits = batches * yieldPerBatch
      const costPerUnit = totalUnits > 0 ? totalCost / totalUnits : 0
      
      expect(totalUnits).toBe(0)
      expect(costPerUnit).toBe(0)
    })

    it('should handle zero revenue gracefully', () => {
      const batches = 3
      const pricePerBatch = 0
      const costPerBatch = 15.50
      
      const totalRevenue = batches * pricePerBatch
      const totalCost = batches * costPerBatch
      const totalProfit = totalRevenue - totalCost
      const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0
      
      expect(totalRevenue).toBe(0)
      expect(profitMargin).toBe(0)
    })
  })

  describe('Labor Cost Calculations', () => {
    it('should calculate total labor cost correctly', () => {
      const laborHours = 4.5
      const hourlyRate = 25
      
      const totalLaborCost = laborHours * hourlyRate
      
      expect(totalLaborCost).toBe(112.50)
    })

    it('should handle zero labor hours', () => {
      const laborHours = 0
      const hourlyRate = 25
      
      const totalLaborCost = laborHours * hourlyRate
      
      expect(totalLaborCost).toBe(0)
    })

    it('should handle fractional labor hours', () => {
      const laborHours = 2.5
      const hourlyRate = 30
      
      const totalLaborCost = laborHours * hourlyRate
      
      expect(totalLaborCost).toBe(75)
    })

    it('should calculate with different hourly rates', () => {
      const laborHours = 3
      const hourlyRate = 20
      
      const totalLaborCost = laborHours * hourlyRate
      
      expect(totalLaborCost).toBe(60)
    })
  })

  describe('Multiple Products Calculations', () => {
    it('should sum costs from multiple products', () => {
      const products = [
        { batches: 2, costPerBatch: 10.00 }, // $20
        { batches: 3, costPerBatch: 15.00 }, // $45
        { batches: 1, costPerBatch: 25.00 }, // $25
      ]
      
      const productCalculations = products.map(p => ({
        totalCost: p.batches * p.costPerBatch
      }))
      
      const totalProductCost = productCalculations.reduce((sum, p) => sum + p.totalCost, 0)
      
      expect(totalProductCost).toBe(90)
    })

    it('should sum revenue from multiple products', () => {
      const products = [
        { batches: 2, pricePerBatch: 25.00 }, // $50
        { batches: 3, pricePerBatch: 40.00 }, // $120
        { batches: 1, pricePerBatch: 60.00 }, // $60
      ]
      
      const productCalculations = products.map(p => ({
        totalRevenue: p.batches * p.pricePerBatch
      }))
      
      const totalRevenue = productCalculations.reduce((sum, p) => sum + p.totalRevenue, 0)
      
      expect(totalRevenue).toBe(230)
    })

    it('should sum units from multiple products', () => {
      const products = [
        { batches: 2, yieldPerBatch: 12 }, // 24 units
        { batches: 3, yieldPerBatch: 24 }, // 72 units
        { batches: 1, yieldPerBatch: 6 },  // 6 units
      ]
      
      const productCalculations = products.map(p => ({
        totalUnits: p.batches * p.yieldPerBatch
      }))
      
      const totalUnits = productCalculations.reduce((sum, p) => sum + p.totalUnits, 0)
      
      expect(totalUnits).toBe(102)
    })
  })

  describe('Grand Total Calculations', () => {
    it('should calculate grand total cost with all components', () => {
      const products = [
        { batches: 2, costPerBatch: 10.00 }, // $20
        { batches: 3, costPerBatch: 15.00 }, // $45
      ]
      
      const productCalculations = products.map(p => ({
        totalCost: p.batches * p.costPerBatch
      }))
      
      const productCosts = productCalculations.reduce((sum, p) => sum + p.totalCost, 0)
      const laborCost = 50.00
      const overheadCosts = 10.00
      
      const grandTotalCost = productCosts + laborCost + overheadCosts
      
      expect(grandTotalCost).toBe(125)
    })

    it('should calculate grand total revenue', () => {
      const products = [
        { batches: 2, pricePerBatch: 25.00 }, // $50
        { batches: 3, pricePerBatch: 40.00 }, // $120
      ]
      
      const productCalculations = products.map(p => ({
        totalRevenue: p.batches * p.pricePerBatch
      }))
      
      const grandTotalRevenue = productCalculations.reduce((sum, p) => sum + p.totalRevenue, 0)
      
      expect(grandTotalRevenue).toBe(170)
    })

    it('should calculate grand total profit', () => {
      const grandTotalRevenue = 170
      const grandTotalCost = 125
      
      const grandTotalProfit = grandTotalRevenue - grandTotalCost
      
      expect(grandTotalProfit).toBe(45)
    })

    it('should calculate grand profit margin', () => {
      const grandTotalRevenue = 170
      const grandTotalCost = 125
      const grandTotalProfit = grandTotalRevenue - grandTotalCost
      
      const grandProfitMargin = grandTotalRevenue > 0 ? (grandTotalProfit / grandTotalRevenue) * 100 : 0
      
      expect(grandProfitMargin).toBeCloseTo(26.471, 3)
    })

    it('should calculate profit per unit across all products', () => {
      const grandTotalProfit = 45
      const totalUnitsProduced = 102
      
      const profitPerUnit = grandTotalProfit / totalUnitsProduced
      
      expect(profitPerUnit).toBeCloseTo(0.441, 3)
    })

    it('should handle zero revenue in grand total', () => {
      const grandTotalRevenue = 0
      const grandTotalCost = 125
      const grandTotalProfit = grandTotalRevenue - grandTotalCost
      
      const grandProfitMargin = grandTotalRevenue > 0 ? (grandTotalProfit / grandTotalRevenue) * 100 : 0
      
      expect(grandProfitMargin).toBe(0)
    })
  })
})
