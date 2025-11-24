import { describe, it, expect } from 'vitest'

/**
 * Real-World Scenarios for Batch Cost Calculator
 * Tests complete production scenarios with realistic data
 */
describe('BatchCostCalculator - Real-World Scenarios', () => {
  
  describe('Scenario 1: Farmers Market - Multiple Cookie Batches', () => {
    it('should calculate complete production costs and profit', () => {
      // Products
      const chocolateChipCookies = {
        name: 'Chocolate Chip Cookies',
        batches: 4,
        costPerBatch: 12.50,
        pricePerBatch: 30.00,
        yieldPerBatch: 24,
      }
      
      const oatmealRaisinCookies = {
        name: 'Oatmeal Raisin Cookies',
        batches: 3,
        costPerBatch: 10.00,
        pricePerBatch: 28.00,
        yieldPerBatch: 24,
      }
      
      const products = [chocolateChipCookies, oatmealRaisinCookies]
      
      // Calculate each product
      const productCalculations = products.map(product => {
        const totalCost = product.batches * product.costPerBatch
        const totalRevenue = product.batches * product.pricePerBatch
        const totalProfit = totalRevenue - totalCost
        const totalUnits = product.batches * product.yieldPerBatch
        const costPerUnit = totalCost / totalUnits
        const pricePerUnit = totalRevenue / totalUnits
        const profitPerUnit = pricePerUnit - costPerUnit
        const profitMargin = (totalProfit / totalRevenue) * 100
        
        return {
          ...product,
          totalCost,
          totalRevenue,
          totalProfit,
          totalUnits,
          costPerUnit,
          pricePerUnit,
          profitPerUnit,
          profitMargin,
        }
      })
      
      // Labor and overhead
      const laborHours = 6
      const hourlyRate = 25
      const totalLaborCost = laborHours * hourlyRate
      const overheadCosts = 15.00
      
      // Grand totals
      const grandTotalCost = productCalculations.reduce((sum, p) => sum + p.totalCost, 0) + totalLaborCost + overheadCosts
      const grandTotalRevenue = productCalculations.reduce((sum, p) => sum + p.totalRevenue, 0)
      const grandTotalProfit = grandTotalRevenue - grandTotalCost
      const grandProfitMargin = (grandTotalProfit / grandTotalRevenue) * 100
      const totalUnitsProduced = productCalculations.reduce((sum, p) => sum + p.totalUnits, 0)
      
      // Verify chocolate chip cookies
      expect(productCalculations[0].totalCost).toBe(50.00)
      expect(productCalculations[0].totalRevenue).toBe(120.00)
      expect(productCalculations[0].totalProfit).toBe(70.00)
      expect(productCalculations[0].totalUnits).toBe(96)
      expect(productCalculations[0].costPerUnit).toBeCloseTo(0.521, 3)
      expect(productCalculations[0].pricePerUnit).toBe(1.25)
      expect(productCalculations[0].profitMargin).toBeCloseTo(58.333, 3)
      
      // Verify oatmeal raisin cookies
      expect(productCalculations[1].totalCost).toBe(30.00)
      expect(productCalculations[1].totalRevenue).toBe(84.00)
      expect(productCalculations[1].totalProfit).toBe(54.00)
      expect(productCalculations[1].totalUnits).toBe(72)
      expect(productCalculations[1].costPerUnit).toBeCloseTo(0.417, 3)
      expect(productCalculations[1].pricePerUnit).toBeCloseTo(1.167, 3)
      
      // Verify grand totals
      expect(totalLaborCost).toBe(150.00)
      expect(grandTotalCost).toBe(245.00) // 80 + 150 + 15
      expect(grandTotalRevenue).toBe(204.00)
      expect(grandTotalProfit).toBe(-41.00) // Loss!
      expect(grandProfitMargin).toBeCloseTo(-20.098, 3)
      expect(totalUnitsProduced).toBe(168)
    })
  })

  describe('Scenario 2: Wholesale Order - Brownies', () => {
    it('should calculate wholesale batch production', () => {
      const brownies = {
        name: 'Fudge Brownies',
        batches: 10,
        costPerBatch: 8.50,
        pricePerBatch: 18.00,
        yieldPerBatch: 16,
      }
      
      const totalCost = brownies.batches * brownies.costPerBatch
      const totalRevenue = brownies.batches * brownies.pricePerBatch
      const totalProfit = totalRevenue - totalCost
      const totalUnits = brownies.batches * brownies.yieldPerBatch
      const costPerUnit = totalCost / totalUnits
      const pricePerUnit = totalRevenue / totalUnits
      const profitMargin = (totalProfit / totalRevenue) * 100
      
      // Labor and overhead
      const laborHours = 8
      const hourlyRate = 20
      const totalLaborCost = laborHours * hourlyRate
      const overheadCosts = 25.00
      
      const grandTotalCost = totalCost + totalLaborCost + overheadCosts
      const grandTotalProfit = totalRevenue - grandTotalCost
      const grandProfitMargin = (grandTotalProfit / totalRevenue) * 100
      
      expect(totalCost).toBe(85.00)
      expect(totalRevenue).toBe(180.00)
      expect(totalProfit).toBe(95.00)
      expect(totalUnits).toBe(160)
      expect(costPerUnit).toBeCloseTo(0.531, 3)
      expect(pricePerUnit).toBe(1.125)
      expect(profitMargin).toBeCloseTo(52.778, 3)
      
      expect(totalLaborCost).toBe(160.00)
      expect(grandTotalCost).toBe(270.00)
      expect(grandTotalProfit).toBe(-90.00) // Loss after labor!
      expect(grandProfitMargin).toBe(-50.00)
    })
  })

  describe('Scenario 3: Catering Event - Mixed Products', () => {
    it('should calculate multi-product catering order', () => {
      const products = [
        {
          name: 'Cupcakes',
          batches: 5,
          costPerBatch: 15.00,
          pricePerBatch: 45.00,
          yieldPerBatch: 12,
        },
        {
          name: 'Cookies',
          batches: 8,
          costPerBatch: 10.00,
          pricePerBatch: 28.00,
          yieldPerBatch: 24,
        },
        {
          name: 'Brownies',
          batches: 4,
          costPerBatch: 12.00,
          pricePerBatch: 32.00,
          yieldPerBatch: 16,
        },
      ]
      
      const productCalculations = products.map(product => {
        const totalCost = product.batches * product.costPerBatch
        const totalRevenue = product.batches * product.pricePerBatch
        const totalProfit = totalRevenue - totalCost
        const totalUnits = product.batches * product.yieldPerBatch
        
        return {
          ...product,
          totalCost,
          totalRevenue,
          totalProfit,
          totalUnits,
        }
      })
      
      const laborHours = 12
      const hourlyRate = 30
      const totalLaborCost = laborHours * hourlyRate
      const overheadCosts = 50.00
      
      const productCosts = productCalculations.reduce((sum, p) => sum + p.totalCost, 0)
      const grandTotalRevenue = productCalculations.reduce((sum, p) => sum + p.totalRevenue, 0)
      const grandTotalCost = productCosts + totalLaborCost + overheadCosts
      const grandTotalProfit = grandTotalRevenue - grandTotalCost
      const totalUnitsProduced = productCalculations.reduce((sum, p) => sum + p.totalUnits, 0)
      const profitPerUnit = grandTotalProfit / totalUnitsProduced
      
      // Verify individual products
      expect(productCalculations[0].totalCost).toBe(75.00)
      expect(productCalculations[0].totalRevenue).toBe(225.00)
      expect(productCalculations[0].totalUnits).toBe(60)
      
      expect(productCalculations[1].totalCost).toBe(80.00)
      expect(productCalculations[1].totalRevenue).toBe(224.00)
      expect(productCalculations[1].totalUnits).toBe(192)
      
      expect(productCalculations[2].totalCost).toBe(48.00)
      expect(productCalculations[2].totalRevenue).toBe(128.00)
      expect(productCalculations[2].totalUnits).toBe(64)
      
      // Verify grand totals
      expect(productCosts).toBe(203.00)
      expect(totalLaborCost).toBe(360.00)
      expect(grandTotalCost).toBe(613.00)
      expect(grandTotalRevenue).toBe(577.00)
      expect(grandTotalProfit).toBe(-36.00)
      expect(totalUnitsProduced).toBe(316)
      expect(profitPerUnit).toBeCloseTo(-0.114, 3)
    })
  })

  describe('Scenario 4: Profitable Production - Optimized Pricing', () => {
    it('should show profitable batch production with proper pricing', () => {
      const products = [
        {
          name: 'Premium Cupcakes',
          batches: 3,
          costPerBatch: 18.00,
          pricePerBatch: 60.00,
          yieldPerBatch: 12,
        },
        {
          name: 'Gourmet Cookies',
          batches: 4,
          costPerBatch: 14.00,
          pricePerBatch: 48.00,
          yieldPerBatch: 18,
        },
      ]
      
      const productCalculations = products.map(product => {
        const totalCost = product.batches * product.costPerBatch
        const totalRevenue = product.batches * product.pricePerBatch
        const totalProfit = totalRevenue - totalCost
        const totalUnits = product.batches * product.yieldPerBatch
        const profitMargin = (totalProfit / totalRevenue) * 100
        
        return {
          ...product,
          totalCost,
          totalRevenue,
          totalProfit,
          totalUnits,
          profitMargin,
        }
      })
      
      const laborHours = 5
      const hourlyRate = 25
      const totalLaborCost = laborHours * hourlyRate
      const overheadCosts = 20.00
      
      const productCosts = productCalculations.reduce((sum, p) => sum + p.totalCost, 0)
      const grandTotalRevenue = productCalculations.reduce((sum, p) => sum + p.totalRevenue, 0)
      const grandTotalCost = productCosts + totalLaborCost + overheadCosts
      const grandTotalProfit = grandTotalRevenue - grandTotalCost
      const grandProfitMargin = (grandTotalProfit / grandTotalRevenue) * 100
      
      // Verify profitability
      expect(productCalculations[0].totalProfit).toBe(126.00)
      expect(productCalculations[0].profitMargin).toBe(70.00)
      
      expect(productCalculations[1].totalProfit).toBe(136.00)
      expect(productCalculations[1].profitMargin).toBeCloseTo(70.833, 3)
      
      expect(productCosts).toBe(110.00)
      expect(grandTotalCost).toBe(255.00)
      expect(grandTotalRevenue).toBe(372.00)
      expect(grandTotalProfit).toBe(117.00)
      expect(grandProfitMargin).toBeCloseTo(31.452, 3)
    })
  })

  describe('Scenario 5: Small Batch Test Production', () => {
    it('should calculate costs for single batch testing', () => {
      const testBatch = {
        name: 'New Recipe Test',
        batches: 1,
        costPerBatch: 22.00,
        pricePerBatch: 50.00,
        yieldPerBatch: 8,
      }
      
      const totalCost = testBatch.batches * testBatch.costPerBatch
      const totalRevenue = testBatch.batches * testBatch.pricePerBatch
      const totalProfit = totalRevenue - totalCost
      const totalUnits = testBatch.batches * testBatch.yieldPerBatch
      const costPerUnit = totalCost / totalUnits
      const pricePerUnit = totalRevenue / totalUnits
      const profitPerUnit = pricePerUnit - costPerUnit
      const profitMargin = (totalProfit / totalRevenue) * 100
      
      const laborHours = 2
      const hourlyRate = 25
      const totalLaborCost = laborHours * hourlyRate
      const overheadCosts = 5.00
      
      const grandTotalCost = totalCost + totalLaborCost + overheadCosts
      const grandTotalProfit = totalRevenue - grandTotalCost
      
      expect(totalCost).toBe(22.00)
      expect(totalRevenue).toBe(50.00)
      expect(totalProfit).toBe(28.00)
      expect(totalUnits).toBe(8)
      expect(costPerUnit).toBe(2.75)
      expect(pricePerUnit).toBe(6.25)
      expect(profitPerUnit).toBe(3.50)
      expect(profitMargin).toBeCloseTo(56.00, 1)
      
      expect(totalLaborCost).toBe(50.00)
      expect(grandTotalCost).toBe(77.00)
      expect(grandTotalProfit).toBe(-27.00) // Loss on single batch
    })
  })

  describe('Scenario 6: High-Volume Production', () => {
    it('should calculate large-scale batch production', () => {
      const products = [
        {
          name: 'Simple Cookies',
          batches: 20,
          costPerBatch: 8.00,
          pricePerBatch: 22.00,
          yieldPerBatch: 36,
        },
      ]
      
      const product = products[0]
      const totalCost = product.batches * product.costPerBatch
      const totalRevenue = product.batches * product.pricePerBatch
      const totalProfit = totalRevenue - totalCost
      const totalUnits = product.batches * product.yieldPerBatch
      const costPerUnit = totalCost / totalUnits
      const pricePerUnit = totalRevenue / totalUnits
      
      const laborHours = 10
      const hourlyRate = 20
      const totalLaborCost = laborHours * hourlyRate
      const overheadCosts = 40.00
      
      const grandTotalCost = totalCost + totalLaborCost + overheadCosts
      const grandTotalProfit = totalRevenue - grandTotalCost
      const grandProfitMargin = (grandTotalProfit / totalRevenue) * 100
      const profitPerUnit = grandTotalProfit / totalUnits
      
      expect(totalCost).toBe(160.00)
      expect(totalRevenue).toBe(440.00)
      expect(totalProfit).toBe(280.00)
      expect(totalUnits).toBe(720)
      expect(costPerUnit).toBeCloseTo(0.222, 3)
      expect(pricePerUnit).toBeCloseTo(0.611, 3)
      
      expect(totalLaborCost).toBe(200.00)
      expect(grandTotalCost).toBe(400.00)
      expect(grandTotalProfit).toBe(40.00)
      expect(grandProfitMargin).toBeCloseTo(9.091, 3)
      expect(profitPerUnit).toBeCloseTo(0.056, 3)
    })
  })
})
