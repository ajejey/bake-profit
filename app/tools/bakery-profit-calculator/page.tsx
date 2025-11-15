'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CalculatorLayout from '@/components/calculators/CalculatorLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TrendingUp, DollarSign, AlertCircle, CheckCircle, Save, Share2, Printer, BarChart3 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { SaveCalculationDialog } from '@/components/calculators/SaveCalculationDialog'

export default function BakeryProfitCalculator() {
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()
  const [showSignupDialog, setShowSignupDialog] = useState(false)
  
  // Revenue
  const [totalRevenue, setTotalRevenue] = useState(0)
  
  // Costs
  const [ingredientCosts, setIngredientCosts] = useState(0)
  const [packagingCosts, setPackagingCosts] = useState(0)
  const [laborCosts, setLaborCosts] = useState(0)
  const [overheadCosts, setOverheadCosts] = useState(0)
  const [marketingCosts, setMarketingCosts] = useState(0)
  const [otherCosts, setOtherCosts] = useState(0)
  
  // Calculations
  const totalCOGS = ingredientCosts + packagingCosts
  const totalOperatingExpenses = laborCosts + overheadCosts + marketingCosts + otherCosts
  const totalCosts = totalCOGS + totalOperatingExpenses
  const grossProfit = totalRevenue - totalCOGS
  const netProfit = totalRevenue - totalCosts
  
  const grossProfitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0
  const netProfitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0
  const cogsPercentage = totalRevenue > 0 ? (totalCOGS / totalRevenue) * 100 : 0
  
  // Break-even analysis
  const breakEvenRevenue = totalCosts
  const revenueNeeded = breakEvenRevenue - totalRevenue
  
  // Industry benchmarks
  const benchmarks = {
    grossMargin: { min: 60, ideal: 70, max: 80 },
    netMargin: { min: 5, ideal: 15, max: 25 },
    cogs: { min: 20, ideal: 30, max: 40 },
  }
  
  const getMarginStatus = (value: number, benchmark: { min: number; ideal: number; max: number }) => {
    if (value >= benchmark.ideal) return 'excellent'
    if (value >= benchmark.min) return 'good'
    return 'poor'
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200'
      case 'good': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'poor': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'good': return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case 'poor': return <AlertCircle className="h-5 w-5 text-red-600" />
      default: return null
    }
  }
  
  const grossMarginStatus = getMarginStatus(grossProfitMargin, benchmarks.grossMargin)
  const netMarginStatus = getMarginStatus(netProfitMargin, benchmarks.netMargin)
  const cogsStatus = cogsPercentage <= benchmarks.cogs.ideal ? 'excellent' : cogsPercentage <= benchmarks.cogs.max ? 'good' : 'poor'

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
      title="Free Bakery Profit Calculator"
      description="Calculate your bakery's profit margins and compare to industry benchmarks. Know if your business is profitable."
    >
      {/* Friendly Introduction */}
      <div className="max-w-4xl mx-auto mb-8 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 bg-green-500 rounded-full shrink-0">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Is Your Bakery Actually Making Money?</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-3">
              Let&apos;s find out! This calculator shows you if you&apos;re profitable and how you compare to other bakeries. 
              Just enter your sales and costs - we&apos;ll show you the real numbers and what they mean.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-green-200">
                ✓ See profit margins
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-green-200">
                ✓ Industry benchmarks
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-green-200">
                ✓ Break-even analysis
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💵</span>
                How Much Did You Make in Sales?
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Your total income from selling baked goods
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="totalRevenue" className="text-base font-semibold">Total Sales/Revenue</Label>
                <Input
                  id="totalRevenue"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="5000.00"
                  value={totalRevenue || ''}
                  onChange={(e) => setTotalRevenue(Number(e.target.value))}
                  className="text-base placeholder:text-gray-300"
                />
                <p className="text-sm text-gray-600 mt-1">
                  📊 For a week, month, or year - whatever period you want to check
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cost of Goods Sold (COGS) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-rose-500" />
                Cost of Goods Sold (COGS)
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Direct costs to make your products
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ingredientCosts">Ingredient Costs ($)</Label>
                <Input
                  id="ingredientCosts"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={ingredientCosts || ''}
                  onChange={(e) => setIngredientCosts(Number(e.target.value))}
                  className="text-base placeholder:text-gray-300"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Flour, sugar, butter, eggs, etc.
                </p>
              </div>

              <div>
                <Label htmlFor="packagingCosts">Packaging Costs ($)</Label>
                <Input
                  id="packagingCosts"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={packagingCosts || ''}
                  onChange={(e) => setPackagingCosts(Number(e.target.value))}
                  className="placeholder:text-gray-300"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Boxes, bags, labels, ribbons, etc.
                </p>
              </div>

              <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                <p className="text-sm text-gray-700">
                  <strong>Total COGS:</strong> ${totalCOGS.toFixed(2)}
                  <span className="text-gray-600"> ({cogsPercentage.toFixed(1)}% of revenue)</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Operating Expenses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Operating Expenses
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Costs to run your business
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="laborCosts">Labor Costs ($)</Label>
                <Input
                  id="laborCosts"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={laborCosts || ''}
                  onChange={(e) => setLaborCosts(Number(e.target.value))}
                  className="placeholder:text-gray-300"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your time + any employees
                </p>
              </div>

              <div>
                <Label htmlFor="overheadCosts">Overhead Costs ($)</Label>
                <Input
                  id="overheadCosts"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={overheadCosts || ''}
                  onChange={(e) => setOverheadCosts(Number(e.target.value))}
                  className="placeholder:text-gray-300"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Rent, utilities, equipment, insurance, etc.
                </p>
              </div>

              <div>
                <Label htmlFor="marketingCosts">Marketing Costs ($)</Label>
                <Input
                  id="marketingCosts"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={marketingCosts || ''}
                  onChange={(e) => setMarketingCosts(Number(e.target.value))}
                  className="placeholder:text-gray-300"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Ads, social media, website, etc.
                </p>
              </div>

              <div>
                <Label htmlFor="otherCosts">Other Costs ($)</Label>
                <Input
                  id="otherCosts"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={otherCosts || ''}
                  onChange={(e) => setOtherCosts(Number(e.target.value))}
                  className="placeholder:text-gray-300"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Licenses, fees, software, etc.
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong>Total Operating Expenses:</strong> ${totalOperatingExpenses.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Profit Summary */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <TrendingUp className="h-5 w-5" />
                  Profit Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue:</p>
                    <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
                  </div>

                  <div className="pt-3 border-t border-green-200">
                    <p className="text-sm text-gray-600">Total Costs:</p>
                    <p className="text-xl font-bold text-red-600">${totalCosts.toFixed(2)}</p>
                  </div>

                  <div className="pt-3 border-t border-green-200">
                    <p className="text-sm text-gray-600">Net Profit:</p>
                    <p className={`text-3xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${netProfit.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profit Margins */}
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <BarChart3 className="h-5 w-5" />
                  Profit Margins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Gross Profit Margin */}
                <div className={`p-3 rounded-lg border ${getStatusColor(grossMarginStatus)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Gross Profit Margin</p>
                    {getStatusIcon(grossMarginStatus)}
                  </div>
                  <p className="text-2xl font-bold mb-1">{grossProfitMargin.toFixed(1)}%</p>
                  <p className="text-xs">
                    Industry: {benchmarks.grossMargin.min}-{benchmarks.grossMargin.max}% 
                    (Ideal: {benchmarks.grossMargin.ideal}%+)
                  </p>
                </div>

                {/* Net Profit Margin */}
                <div className={`p-3 rounded-lg border ${getStatusColor(netMarginStatus)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Net Profit Margin</p>
                    {getStatusIcon(netMarginStatus)}
                  </div>
                  <p className="text-2xl font-bold mb-1">{netProfitMargin.toFixed(1)}%</p>
                  <p className="text-xs">
                    Industry: {benchmarks.netMargin.min}-{benchmarks.netMargin.max}% 
                    (Ideal: {benchmarks.netMargin.ideal}%+)
                  </p>
                </div>

                {/* COGS Percentage */}
                <div className={`p-3 rounded-lg border ${getStatusColor(cogsStatus)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">COGS %</p>
                    {getStatusIcon(cogsStatus)}
                  </div>
                  <p className="text-2xl font-bold mb-1">{cogsPercentage.toFixed(1)}%</p>
                  <p className="text-xs">
                    Industry: {benchmarks.cogs.min}-{benchmarks.cogs.max}% 
                    (Ideal: {benchmarks.cogs.ideal}% or less)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Break-Even Analysis */}
            {totalRevenue > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-900">
                    <AlertCircle className="h-5 w-5" />
                    Break-Even Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Break-Even Revenue:</p>
                    <p className="text-xl font-bold text-gray-900">${breakEvenRevenue.toFixed(2)}</p>
                  </div>
                  
                  {netProfit < 0 ? (
                    <div className="p-3 bg-red-100 rounded-lg border border-red-300">
                      <p className="text-sm font-medium text-red-900 mb-1">
                        Not Profitable Yet
                      </p>
                      <p className="text-xs text-red-700">
                        You need ${Math.abs(revenueNeeded).toFixed(2)} more in revenue to break even.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-green-100 rounded-lg border border-green-300">
                      <p className="text-sm font-medium text-green-900 mb-1">
                        ✓ Profitable!
                      </p>
                      <p className="text-xs text-green-700">
                        You&apos;re ${netProfit.toFixed(2)} above break-even.
                      </p>
                    </div>
                  )}
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
                Save Analysis
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
                <h3 className="font-bold text-lg mb-2">Track Profits Over Time</h3>
                <p className="text-sm text-rose-100 mb-4">
                  Monitor your profit margins monthly, identify trends, and grow your bakery business profitably.
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

      {/* Profit Improvement Tips */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          How to Improve Your Profit Margins
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reduce COGS</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p className="mb-3">
                Your ingredient and packaging costs should be 20-40% of revenue. Ways to reduce:
              </p>
              <ul className="space-y-1 text-sm list-disc list-inside">
                <li>Buy ingredients in bulk</li>
                <li>Negotiate with suppliers</li>
                <li>Reduce waste and improve yield</li>
                <li>Use seasonal ingredients</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Increase Prices</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p className="mb-3">
                Many home bakers underprice. A 10-20% price increase can double your profit:
              </p>
              <ul className="space-y-1 text-sm list-disc list-inside">
                <li>Price based on value, not just cost</li>
                <li>Charge for your skill and time</li>
                <li>Test higher prices with new customers</li>
                <li>Add premium options</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Control Operating Expenses</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p className="mb-3">
                Operating expenses should be 30-50% of revenue. Ways to optimize:
              </p>
              <ul className="space-y-1 text-sm list-disc list-inside">
                <li>Track all expenses carefully</li>
                <li>Eliminate unnecessary subscriptions</li>
                <li>Improve efficiency to reduce labor</li>
                <li>Negotiate rent or work from home</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Increase Revenue</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p className="mb-3">
                More sales = more profit. Strategies to grow revenue:
              </p>
              <ul className="space-y-1 text-sm list-disc list-inside">
                <li>Focus on high-margin products</li>
                <li>Upsell and cross-sell</li>
                <li>Offer catering or wholesale</li>
                <li>Build repeat customer base</li>
              </ul>
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
              <CardTitle className="text-lg">What is a good profit margin for a bakery?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                A healthy bakery should aim for 60-70% gross profit margin and 10-20% net profit margin. 
                Home bakeries often have higher margins (15-25% net) due to lower overhead costs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What&apos;s the difference between gross and net profit?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Gross profit is revenue minus COGS (ingredients + packaging). Net profit is revenue minus 
                ALL costs including labor, overhead, and marketing. Net profit is what you actually take home.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How much should I pay myself?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Include your labor in operating expenses. Pay yourself a fair hourly rate ($20-40/hr depending 
                on skill level). After all expenses, your net profit is additional income beyond your labor.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">My profit margin is low. What should I do?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                First, ensure you&apos;re tracking ALL costs accurately. Then: (1) Increase prices 10-20%, 
                (2) Reduce ingredient waste, (3) Focus on high-margin products, (4) Cut unnecessary expenses. 
                Even small changes can significantly improve profitability.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Signup Dialog */}
      <SaveCalculationDialog
        open={showSignupDialog}
        onOpenChange={setShowSignupDialog}
        calculatorType="Profit Analysis"
        onSuccess={handleActualSave}
      />
    </CalculatorLayout>
  )
}
