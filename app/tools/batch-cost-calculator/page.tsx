'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CalculatorLayout from '@/components/calculators/CalculatorLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, DollarSign, TrendingUp, Save, Share2, Printer, Package } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { SaveCalculationDialog } from '@/components/calculators/SaveCalculationDialog'

interface Product {
  id: string
  name: string
  batches: number
  costPerBatch: number
  pricePerBatch: number
  yieldPerBatch: number
}

export default function BatchCostCalculator() {
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()
  const [showSignupDialog, setShowSignupDialog] = useState(false)
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: '',
      batches: 1,
      costPerBatch: 0,
      pricePerBatch: 0,
      yieldPerBatch: 12,
    }
  ])

  const [overheadCosts, setOverheadCosts] = useState(0)
  const [laborHours, setLaborHours] = useState(0)
  const [hourlyRate, setHourlyRate] = useState(25)

  // Calculations
  const totalLaborCost = laborHours * hourlyRate
  
  const productCalculations = products.map(product => {
    const totalCost = product.batches * product.costPerBatch
    const totalRevenue = product.batches * product.pricePerBatch
    const totalProfit = totalRevenue - totalCost
    const totalUnits = product.batches * product.yieldPerBatch
    const costPerUnit = totalUnits > 0 ? totalCost / totalUnits : 0
    const pricePerUnit = totalUnits > 0 ? totalRevenue / totalUnits : 0
    const profitPerUnit = pricePerUnit - costPerUnit
    const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0
    
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

  const grandTotalCost = productCalculations.reduce((sum, p) => sum + p.totalCost, 0) + totalLaborCost + overheadCosts
  const grandTotalRevenue = productCalculations.reduce((sum, p) => sum + p.totalRevenue, 0)
  const grandTotalProfit = grandTotalRevenue - grandTotalCost
  const grandProfitMargin = grandTotalRevenue > 0 ? (grandTotalProfit / grandTotalRevenue) * 100 : 0
  const totalUnitsProduced = productCalculations.reduce((sum, p) => sum + p.totalUnits, 0)

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        name: '',
        batches: 1,
        costPerBatch: 0,
        pricePerBatch: 0,
        yieldPerBatch: 12,
      }
    ])
  }

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ))
  }

  const handleSaveClick = () => {
    if (!user) {
      setShowSignupDialog(true)
      return
    }
    handleActualSave()
  }

  const handleActualSave = () => {
    toast({
      title: '✅ Calculation saved!',
      description: 'View it in My Calculations.',
    })
    setTimeout(() => {
      router.push('/tools/my-calculations')
    }, 1500)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: 'Link copied!',
      description: 'Share this calculator with other bakers.',
    })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <CalculatorLayout
      title="Free Batch Cost Calculator"
      description="Calculate total costs and profit for multiple batches. Perfect for production planning and wholesale orders."
    >
      {/* Friendly Introduction */}
      <div className="max-w-4xl mx-auto mb-8 p-4 sm:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 bg-indigo-500 rounded-full flex-shrink-0">
            <Package className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Making Multiple Batches? Let&apos;s Calculate the Total!</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-3">
              Planning a big bake day or wholesale order? This calculator helps you figure out the total cost and profit when making multiple batches of different products. 
              Perfect for markets, events, or bulk orders!
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-indigo-200">
                ✓ Multiple products
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-indigo-200">
                ✓ Total profit
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-indigo-200">
                ✓ Labor included
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-rose-500" />
                Products & Batches
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Add all products you&apos;re making
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {products.map((product, index) => (
                <div key={product.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">Product {index + 1}</h4>
                    {products.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`name-${product.id}`}>Product Name</Label>
                    <Input
                      id={`name-${product.id}`}
                      placeholder="e.g., Chocolate Chip Cookies"
                      className="placeholder:text-gray-300"
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`batches-${product.id}`}>Batches</Label>
                      <Input
                        id={`batches-${product.id}`}
                        type="number"
                        min="1"
                        value={product.batches}
                        onChange={(e) => updateProduct(product.id, 'batches', Number(e.target.value))}
                      />
                    </div>

                    <div>
                      <Label htmlFor={`yield-${product.id}`}>Yield/Batch</Label>
                      <Input
                        id={`yield-${product.id}`}
                        type="number"
                        min="1"
                        value={product.yieldPerBatch}
                        onChange={(e) => updateProduct(product.id, 'yieldPerBatch', Number(e.target.value))}
                      />
                      <p className="text-xs text-gray-500 mt-1">Units per batch</p>
                    </div>

                    <div>
                      <Label>Total Units</Label>
                      <div className="h-10 flex items-center px-3 bg-gray-50 rounded-md border border-gray-200">
                        <span className="font-semibold text-gray-900">
                          {product.batches * product.yieldPerBatch}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`cost-${product.id}`}>Cost per Batch ($)</Label>
                      <Input
                        id={`cost-${product.id}`}
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="placeholder:text-gray-300"
                        value={product.costPerBatch || ''}
                        onChange={(e) => updateProduct(product.id, 'costPerBatch', Number(e.target.value))}
                      />
                      <p className="text-xs text-gray-500 mt-1">Ingredients + packaging</p>
                    </div>

                    <div>
                      <Label htmlFor={`price-${product.id}`}>Price per Batch ($)</Label>
                      <Input
                        id={`price-${product.id}`}
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="placeholder:text-gray-300"
                        value={product.pricePerBatch || ''}
                        onChange={(e) => updateProduct(product.id, 'pricePerBatch', Number(e.target.value))}
                      />
                      <p className="text-xs text-gray-500 mt-1">What you sell for</p>
                    </div>
                  </div>

                  {product.costPerBatch > 0 && product.pricePerBatch > 0 && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Total Cost:</p>
                          <p className="font-bold text-gray-900">
                            ${(product.batches * product.costPerBatch).toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Revenue:</p>
                          <p className="font-bold text-green-600">
                            ${(product.batches * product.pricePerBatch).toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Profit:</p>
                          <p className="font-bold text-green-600">
                            ${((product.batches * product.pricePerBatch) - (product.batches * product.costPerBatch)).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full"
                onClick={addProduct}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Product
              </Button>
            </CardContent>
          </Card>

          {/* Additional Costs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                Additional Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="laborHours">Labor Hours</Label>
                  <Input
                    id="laborHours"
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="0"
                    value={laborHours || ''}
                    onChange={(e) => setLaborHours(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="25.00"
                    className="placeholder:text-gray-300"
                    value={hourlyRate || ''}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label>Total Labor</Label>
                  <div className="h-10 flex items-center px-3 bg-gray-50 rounded-md border border-gray-200">
                    <span className="font-semibold text-gray-900">
                      ${totalLaborCost.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="overheadCosts">Overhead Costs ($)</Label>
                <Input
                  id="overheadCosts"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="placeholder:text-gray-300"
                  value={overheadCosts || ''}
                  onChange={(e) => setOverheadCosts(Number(e.target.value))}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Utilities, rent, equipment depreciation, etc.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Grand Total */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <TrendingUp className="h-5 w-5" />
                  Grand Total
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue:</p>
                  <p className="text-2xl font-bold text-gray-900">${grandTotalRevenue.toFixed(2)}</p>
                </div>

                <div className="pt-3 border-t border-green-200">
                  <p className="text-sm text-gray-600">Total Costs:</p>
                  <p className="text-xl font-bold text-red-600">${grandTotalCost.toFixed(2)}</p>
                  <div className="text-xs text-gray-600 mt-1 space-y-1">
                    <p>• Products: ${productCalculations.reduce((sum, p) => sum + p.totalCost, 0).toFixed(2)}</p>
                    <p>• Labor: ${totalLaborCost.toFixed(2)}</p>
                    <p>• Overhead: ${overheadCosts.toFixed(2)}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-green-200">
                  <p className="text-sm text-gray-600">Net Profit:</p>
                  <p className={`text-3xl font-bold ${grandTotalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${grandTotalProfit.toFixed(2)}
                  </p>
                </div>

                <div className="pt-3 border-t border-green-200">
                  <p className="text-sm text-gray-600">Profit Margin:</p>
                  <p className={`text-2xl font-bold ${grandProfitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {grandProfitMargin.toFixed(1)}%
                  </p>
                </div>

                {totalUnitsProduced > 0 && (
                  <div className="pt-3 border-t border-green-200">
                    <p className="text-sm text-gray-600">Total Units:</p>
                    <p className="text-xl font-bold text-gray-900">{totalUnitsProduced}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Profit per unit: ${(grandTotalProfit / totalUnitsProduced).toFixed(2)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Breakdown */}
            {productCalculations.some(p => p.name && p.totalRevenue > 0) && (
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-sm text-purple-900">
                    Product Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {productCalculations.filter(p => p.name && p.totalRevenue > 0).map((product) => (
                    <div key={product.id} className="p-3 bg-white rounded-lg border border-purple-200">
                      <p className="font-semibold text-gray-900 mb-2">{product.name}</p>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>Units: {product.totalUnits}</p>
                        <p>Revenue: ${product.totalRevenue.toFixed(2)}</p>
                        <p>Cost: ${product.totalCost.toFixed(2)}</p>
                        <p className="font-semibold text-green-600">
                          Profit: ${product.totalProfit.toFixed(2)} ({product.profitMargin.toFixed(1)}%)
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                className="w-full bg-rose-500 hover:bg-rose-600"
                onClick={handleSaveClick}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Calculation
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-rose-500 to-rose-600 text-white border-0">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">Track Production Costs</h3>
                <p className="text-sm text-rose-100 mb-4">
                  Save batch calculations, track costs over time, and optimize your production for maximum profit.
                </p>
                <Button
                  className="w-full bg-white text-rose-600 hover:bg-rose-50"
                  onClick={() => window.location.href = '/'}
                >
                  Sign Up Free →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Batch Production Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Plan Your Production</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Calculate costs BEFORE you start baking. Know your profit margin for each product 
                and focus on high-margin items. Batch similar products together to save time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Track Labor Accurately</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Include ALL labor time: prep, baking, decorating, packaging, and cleanup. Many bakers 
                underestimate labor, which kills profitability. Pay yourself fairly!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Optimize Batch Sizes</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Larger batches reduce cost per unit due to economies of scale. But don&apos;t overbake - 
                unsold product is wasted money. Find the sweet spot for your market demand.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Include Overhead</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Don&apos;t forget utilities, equipment depreciation, and rent. Allocate overhead costs 
                proportionally to each batch. A common method: overhead ÷ total production hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do I calculate cost per batch?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Add up all ingredient costs and packaging costs for one batch. Use the Recipe Cost 
                Calculator to get accurate ingredient costs, then multiply by the number of batches 
                you&apos;re making.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Should I include my time as labor?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Yes! Even if you&apos;re the owner, pay yourself an hourly rate ($20-40/hr is typical). 
                This ensures you&apos;re actually making money, not just covering costs. Your profit should 
                be AFTER paying yourself.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What&apos;s a good profit margin for batches?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Aim for 50-100% profit margin on product costs (before labor and overhead). After all 
                costs, a 15-25% net profit margin is healthy. Lower margins work for high-volume 
                wholesale, but retail should be higher.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do I price for wholesale vs retail?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Wholesale typically sells at 50% of retail price. Calculate your costs, add desired 
                profit, then double it for retail. For wholesale, ensure you still profit at 50% of 
                retail. If not, your costs are too high or retail price too low.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Signup Dialog */}
      <SaveCalculationDialog
        open={showSignupDialog}
        onOpenChange={setShowSignupDialog}
        calculatorType="Batch"
        onSuccess={handleActualSave}
      />
    </CalculatorLayout>
  )
}
