'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  DollarSign, 
  TrendingUp, 
  Calculator, 
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  Percent,
  Target,
  Lightbulb
} from 'lucide-react'
import { usePricing, useRecipes, useDefaultMarkup, useCurrencySymbol } from '../hooks'
import { useToast } from '@/hooks/use-toast'
import type { Recipe, PricingComparison } from '../types'



export default function PricingCalculator() {
  const { toast } = useToast()
  const { recipes } = useRecipes()
  const {
    getPricingBreakdown,
    getPricingComparisons,
    calculateWhatIf,
    applyPsychologicalPricing,
    recipePricingAnalysis,
    recipesNeedingPriceReview,
  } = usePricing()
  
  const { markup: defaultMarkup = 150 } = useDefaultMarkup()
  const { symbol: currencySymbol = '$' } = useCurrencySymbol()

  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('')
  const [customPrice, setCustomPrice] = useState<number>(0)
  const [competitorPrice, setCompetitorPrice] = useState<number>(0)
  const [targetMargin, setTargetMargin] = useState<number>(defaultMarkup)

  const selectedRecipe = recipes.find(r => r.id === selectedRecipeId)
  const breakdown = selectedRecipe ? getPricingBreakdown(selectedRecipe) : null
  const comparisons = selectedRecipe ? getPricingComparisons(selectedRecipe, competitorPrice || undefined) : []
  const whatIfResult = breakdown && customPrice > 0 ? calculateWhatIf(breakdown.totalCost, customPrice) : null
  const psychPrices = breakdown ? applyPsychologicalPricing(breakdown.suggestedPrice) : []

  // Get strategy badge
  const getStrategyBadge = (comparison: PricingComparison) => {
    if (comparison.marginPercentage < 40) {
      return <Badge variant="destructive">Low Margin</Badge>
    } else if (comparison.marginPercentage >= 60) {
      return <Badge className="bg-green-500">Excellent</Badge>
    } else {
      return <Badge className="bg-blue-500">Good</Badge>
    }
  }

  // Helper to format currency synchronously
const formatCurrency = (amount: number): string => {
  return `${currencySymbol}${amount.toFixed(2)}`
}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">💰 Pricing Calculator</h1>
        <p className="text-gray-600">Set profitable prices based on costs and market factors</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recipes.length}</div>
            <p className="text-xs text-muted-foreground">
              Ready for pricing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recipesNeedingPriceReview.length}</div>
            <p className="text-xs text-muted-foreground">
              Low profit margins
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Industry Standard</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5-3.5x</div>
            <p className="text-xs text-muted-foreground">
              Typical bakery markup
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recipe Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Recipe to Price</CardTitle>
          <CardDescription>Choose a recipe to calculate optimal pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedRecipeId} onValueChange={setSelectedRecipeId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a recipe..." />
            </SelectTrigger>
            <SelectContent>
              {recipes.map((recipe) => (
                <SelectItem key={recipe.id} value={recipe.id}>
                  {recipe.name} - {formatCurrency(recipe.totalCost)} cost
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedRecipe && breakdown && (
        <>
          {/* Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Cost Breakdown
              </CardTitle>
              <CardDescription>Detailed cost analysis for {selectedRecipe.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Ingredients Cost</span>
                  <span className="font-semibold">{formatCurrency(breakdown.ingredientCost)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Labor Cost</span>
                  <span className="font-semibold">{formatCurrency(breakdown.laborCost)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Overhead Cost</span>
                  <span className="font-semibold">{formatCurrency(breakdown.overheadCost)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-gray-50 px-3 rounded-md">
                  <span className="text-lg font-bold">Total Cost</span>
                  <span className="text-2xl font-bold text-red-600">{formatCurrency(breakdown.totalCost)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-green-50 px-3 rounded-md border border-green-200">
                  <div>
                    <span className="text-lg font-bold text-green-900">Suggested Price</span>
                    <p className="text-xs text-green-700">Based on {breakdown.suggestedMarkup}x industry markup</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{formatCurrency(breakdown.suggestedPrice)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Profit Margin</span>
                  <Badge className={breakdown.profitMargin >= 60 ? 'bg-green-500' : breakdown.profitMargin >= 40 ? 'bg-blue-500' : 'bg-yellow-500'}>
                    {breakdown.profitMargin.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Strategies Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Pricing Strategies
              </CardTitle>
              <CardDescription>Compare different pricing approaches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Optional: Competitor Price Input */}
                <div className="border-b pb-4">
                  <Label htmlFor="competitor-price">Competitor Price (Optional)</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="competitor-price"
                      type="number"
                      step="0.01"
                      placeholder="Enter competitor price..."
                      value={competitorPrice || ''}
                      onChange={(e) => setCompetitorPrice(parseFloat(e.target.value) || 0)}
                    />
                    {competitorPrice > 0 && (
                      <Button variant="outline" onClick={() => setCompetitorPrice(0)}>
                        Clear
                      </Button>
                    )}
                  </div>
                </div>

                {/* Strategy Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {comparisons.map((comp, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:border-primary transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold capitalize">{comp.strategy.replace('-', ' ')}</h4>
                          <p className="text-sm text-gray-600">{comp.description}</p>
                        </div>
                        {getStrategyBadge(comp)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Price</span>
                          <span className="font-bold text-lg">{formatCurrency(comp.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Profit</span>
                          <span className="font-semibold text-green-600">{formatCurrency(comp.profit)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Margin</span>
                          <span className="font-semibold">{comp.marginPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Multiplier</span>
                          <span className="font-semibold">{comp.multiplier.toFixed(1)}x</span>
                        </div>
                        {comp.recommendation && (
                          <p className="text-xs mt-2 p-2 bg-blue-50 rounded border border-blue-200 text-blue-900">
                            {comp.recommendation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What-If Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                What-If Calculator
              </CardTitle>
              <CardDescription>Test custom prices to see profit and margins</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="custom-price">Your Custom Price</Label>
                  <div className="flex gap-2 mt-2">
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="custom-price"
                        type="number"
                        step="0.01"
                        placeholder="Enter your price..."
                        value={customPrice || ''}
                        onChange={(e) => setCustomPrice(parseFloat(e.target.value) || 0)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                {whatIfResult && customPrice > 0 && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold mb-3">Results for {formatCurrency(customPrice)}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Profit</p>
                        <p className="text-xl font-bold text-green-600">{formatCurrency(whatIfResult.profit)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Margin</p>
                        <p className="text-xl font-bold">{whatIfResult.marginPercentage.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Multiplier</p>
                        <p className="text-xl font-bold">{whatIfResult.multiplier.toFixed(2)}x</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        {whatIfResult.isViable ? (
                          <CheckCircle2 className="h-8 w-8 text-green-500" />
                        ) : (
                          <AlertCircle className="h-8 w-8 text-red-500" />
                        )}
                      </div>
                    </div>
                    <p className="mt-3 text-sm p-2 bg-white rounded border">
                      {whatIfResult.recommendation}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Psychological Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                Psychological Pricing
              </CardTitle>
              <CardDescription>Price points that appeal to customers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Based on the suggested price of {formatCurrency(breakdown.suggestedPrice)}, here are psychologically optimized price points:
              </p>
              <div className="flex flex-wrap gap-3">
                {psychPrices.map((price, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-lg font-semibold"
                    onClick={() => {
                      setCustomPrice(price)
                      toast({
                        title: 'Price selected',
                        description: `Testing ${formatCurrency(price)} in What-If Calculator`,
                      })
                    }}
                  >
                    {formatCurrency(price)}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                💡 Prices ending in .99 or .95 often appear more attractive to customers
              </p>
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty State */}
      {recipes.length === 0 && (
        <Card className="border-2 border-dashed">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Calculator className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">No Recipes Found</h3>
              <p className="text-gray-600 mb-4">
                Add recipes in the Recipe Calculator to start pricing analysis.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recipes Needing Review */}
      {recipesNeedingPriceReview.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Recipes Needing Price Review
            </CardTitle>
            <CardDescription>These recipes have low profit margins (below 40%)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recipesNeedingPriceReview.map((item) => (
                <div
                  key={item.recipe.id}
                  className="flex justify-between items-center p-3 bg-white rounded border"
                >
                  <div>
                    <p className="font-medium">{item.recipe.name}</p>
                    <p className="text-sm text-gray-600">
                      Cost: {formatCurrency(item.breakdown.totalCost)} • 
                      Suggested: {formatCurrency(item.suggestedPrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">
                      {item.breakdown.profitMargin.toFixed(1)}% margin
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => setSelectedRecipeId(item.recipe.id)}
                    >
                      Review Pricing
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
