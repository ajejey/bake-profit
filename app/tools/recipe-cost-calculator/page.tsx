'use client'

import React, { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/calculators/CalculatorLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, Calculator, Save, Share2, Printer, DollarSign } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Ingredient {
  id: string
  name: string
  amount: number
  unit: string
  packageSize: number
  packageCost: number
  cost: number
}

const UNITS = [
  'g', 'kg', 'oz', 'lb', 'ml', 'l', 'cup', 'tbsp', 'tsp', 'unit', 'dozen'
]

export default function RecipeCostCalculator() {
  const { toast } = useToast()
  const [recipeName, setRecipeName] = useState('')
  const [servings, setServings] = useState(12)
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: '1',
      name: '',
      amount: 0,
      unit: 'cup',
      packageSize: 0,
      packageCost: 0,
      cost: 0
    }
  ])
  const [laborCost, setLaborCost] = useState(0)
  const [overheadCost, setOverheadCost] = useState(0)
  const [desiredProfit, setDesiredProfit] = useState(50)

  // Calculate ingredient cost
  const calculateIngredientCost = (ingredient: Ingredient): number => {
    if (ingredient.packageSize === 0 || ingredient.amount === 0) return 0
    const costPerUnit = ingredient.packageCost / ingredient.packageSize
    return costPerUnit * ingredient.amount
  }

  // Update ingredient cost when values change
  useEffect(() => {
    setIngredients(prev => prev.map(ing => ({
      ...ing,
      cost: calculateIngredientCost(ing)
    })))
  }, [ingredients.map(i => `${i.amount}-${i.packageSize}-${i.packageCost}`).join(',')])

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: Date.now().toString(),
        name: '',
        amount: 0,
        unit: 'cup',
        packageSize: 0,
        packageCost: 0,
        cost: 0
      }
    ])
  }

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ing => ing.id !== id))
    }
  }

  const updateIngredient = (id: string, field: keyof Ingredient, value: any) => {
    setIngredients(prev => prev.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ))
  }

  // Calculations
  const totalIngredientCost = ingredients.reduce((sum, ing) => sum + ing.cost, 0)
  const totalRecipeCost = totalIngredientCost + laborCost + overheadCost
  const costPerServing = servings > 0 ? totalRecipeCost / servings : 0
  const suggestedPrice = costPerServing * (1 + desiredProfit / 100)
  const profitPerServing = suggestedPrice - costPerServing
  const totalProfit = profitPerServing * servings

  const handleSave = () => {
    toast({
      title: 'Sign up to save',
      description: 'Create a free account to save and track all your recipes.',
    })
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
      title="Free Recipe Cost Calculator"
      description="Calculate your recipe costs instantly. Perfect for home bakers and small bakeries. No signup required."
    >
      {/* Friendly Introduction */}
      <div className="max-w-4xl mx-auto mb-8 p-4 sm:p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border-2 border-rose-200">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 bg-rose-500 rounded-full shrink-0">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">👋 Let&apos;s Figure Out Your Recipe Costs!</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-3">
              Ever wonder if you&apos;re charging enough for your baked goods? This calculator helps you find out! 
              Just tell us what ingredients you use, and we&apos;ll show you exactly how much each cookie, cupcake, or cake costs to make.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-rose-200">
                ✓ Super easy to use
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-rose-200">
                ✓ No math required
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-rose-200">
                ✓ Results in seconds
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Input Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recipe Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-rose-500" />
                Recipe Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="recipeName" className="text-base font-semibold">What are you baking? (Optional)</Label>
                <Input
                  id="recipeName"
                  placeholder="e.g., My Famous Chocolate Chip Cookies"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="text-base"
                />
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                  💡 Give it a fun name so you remember it later!
                </p>
              </div>
              
              <div>
                <Label htmlFor="servings" className="text-base font-semibold">How many does this recipe make?</Label>
                <Input
                  id="servings"
                  type="number"
                  min="1"
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="text-base"
                />
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                  🍪 Enter the number of cookies, cupcakes, or servings (e.g., 24 cookies)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🥚</span>
                Your Ingredients
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Add each ingredient you use. Don&apos;t worry about being perfect - you can always adjust later!
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Ingredient {index + 1}
                    </span>
                    {ingredients.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeIngredient(ingredient.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <Label className="font-semibold">What ingredient is this?</Label>
                      <Input
                        placeholder="e.g., All-Purpose Flour, Butter, Sugar..."
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label className="font-semibold">How much do you use?</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="2"
                        value={ingredient.amount || ''}
                        onChange={(e) => updateIngredient(ingredient.id, 'amount', Number(e.target.value))}
                      />
                      <p className="text-xs text-gray-500 mt-1">The amount in your recipe</p>
                    </div>

                    <div>
                      <Label>Unit</Label>
                      <Select
                        value={ingredient.unit}
                        onValueChange={(value) => updateIngredient(ingredient.id, 'unit', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {UNITS.map(unit => (
                            <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold">Package size you buy</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="5"
                        value={ingredient.packageSize || ''}
                        onChange={(e) => updateIngredient(ingredient.id, 'packageSize', Number(e.target.value))}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        📦 What&apos;s on the bag/box? (e.g., 5 lb bag)
                      </p>
                    </div>

                    <div>
                      <Label className="font-semibold">What did it cost?</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="12.99"
                        value={ingredient.packageCost || ''}
                        onChange={(e) => updateIngredient(ingredient.id, 'packageCost', Number(e.target.value))}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        💵 Price you paid at the store
                      </p>
                    </div>
                  </div>

                  {ingredient.cost > 0 && (
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700">
                        Cost: <span className="text-rose-600">${ingredient.cost.toFixed(2)}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full"
                onClick={addIngredient}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            </CardContent>
          </Card>

          {/* Additional Costs */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">⏰</span>
                Your Time & Other Costs (Optional but Important!)
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Your time is valuable! Add these to see your TRUE cost.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="laborCost" className="font-semibold">Your Time (Labor Cost)</Label>
                <Input
                  id="laborCost"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={laborCost || ''}
                  onChange={(e) => setLaborCost(Number(e.target.value))}
                />
                <p className="text-sm text-gray-600 mt-1">
                  💡 <strong>Tip:</strong> If it takes 2 hours and you value your time at $20/hr, enter $40
                </p>
              </div>

              <div>
                <Label htmlFor="overheadCost" className="font-semibold">Other Costs (Packaging, etc.)</Label>
                <Input
                  id="overheadCost"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={overheadCost || ''}
                  onChange={(e) => setOverheadCost(Number(e.target.value))}
                />
                <p className="text-sm text-gray-600 mt-1">
                  📦 Boxes, bags, electricity, etc. (usually $1-5 per batch)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Results Card */}
            <Card className="border-rose-200 bg-rose-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-rose-900">
                  <DollarSign className="h-5 w-5" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Ingredients:</span>
                    <span className="font-medium">${totalIngredientCost.toFixed(2)}</span>
                  </div>
                  {laborCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Labor:</span>
                      <span className="font-medium">${laborCost.toFixed(2)}</span>
                    </div>
                  )}
                  {overheadCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Overhead:</span>
                      <span className="font-medium">${overheadCost.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-rose-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">Total Recipe Cost:</span>
                    <span className="text-2xl font-bold text-rose-600">
                      ${totalRecipeCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Cost Per Serving:</span>
                    <span className="text-xl font-bold text-rose-600">
                      ${costPerServing.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Pricing Suggestion */}
                <div className="pt-4 border-t border-rose-200">
                  <Label htmlFor="desiredProfit" className="text-gray-900">
                    Desired Profit Margin (%)
                  </Label>
                  <Input
                    id="desiredProfit"
                    type="number"
                    min="0"
                    max="500"
                    value={desiredProfit}
                    onChange={(e) => setDesiredProfit(Number(e.target.value))}
                    className="mt-2"
                  />
                  
                  <div className="mt-4 p-3 bg-white rounded-lg border border-rose-200">
                    <p className="text-sm text-gray-700 mb-2">Suggested Price:</p>
                    <p className="text-2xl font-bold text-rose-600">
                      ${suggestedPrice.toFixed(2)} <span className="text-sm text-gray-600">per serving</span>
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Profit: ${profitPerServing.toFixed(2)} per serving
                    </p>
                    <p className="text-xs text-gray-600">
                      Total Profit: ${totalProfit.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                className="w-full bg-rose-500 hover:bg-rose-600"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Recipe
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
                <h3 className="font-bold text-lg mb-2">Want to save this recipe?</h3>
                <p className="text-sm text-rose-100 mb-4">
                  Create a free account to save unlimited recipes, track orders, and manage your bakery business.
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

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do I calculate recipe cost?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                To calculate recipe cost, add up the cost of each ingredient used. Divide the package cost by package size to get cost per unit, then multiply by the amount used in your recipe. Add labor and overhead costs for the total recipe cost.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What profit margin should I use?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Most bakeries aim for a 50-100% profit margin on baked goods. This means if your cost per serving is $2, you&apos;d charge $3-$4. Adjust based on your market, competition, and target customers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Should I include labor costs?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Yes! Your time is valuable. Calculate labor cost by multiplying hours spent by your desired hourly rate. Even home bakers should factor in their time to ensure profitability.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  )
}
