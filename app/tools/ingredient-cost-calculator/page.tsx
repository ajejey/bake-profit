'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CalculatorLayout from '@/components/calculators/CalculatorLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Package, DollarSign, Save, Share2, Printer, Calculator, Lightbulb, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { SaveCalculationDialog } from '@/components/calculators/SaveCalculationDialog'
import { saveCalculation, CALCULATOR_STORES, generateCalculationId, type SavedIngredientCalculation } from '@/app/tools/utils/calculatorStorage'

// Unit conversion factors (to grams for weight, to ml for volume)
const CONVERSIONS = {
  // Weight
  'g': 1,
  'kg': 1000,
  'oz': 28.35,
  'lb': 453.59,
  // Volume
  'ml': 1,
  'l': 1000,
  'tsp': 4.93,
  'tbsp': 14.79,
  'cup': 236.59,
  'fl oz': 29.57,
  // Count
  'unit': 1,
  'dozen': 12,
}

const UNIT_TYPES = {
  weight: ['g', 'kg', 'oz', 'lb'],
  volume: ['ml', 'l', 'tsp', 'tbsp', 'cup', 'fl oz'],
  count: ['unit', 'dozen'],
}

interface ExampleIngredient {
  name: string
  description: string
  ingredientName: string
  packageSize: number
  packageUnit: string
  packageCost: number
  recipeAmount: number
  recipeUnit: string
  ingredientType: string
  explanation: string
}

const EXAMPLE_INGREDIENTS: ExampleIngredient[] = [
  {
    name: 'Butter (Common)',
    description: 'Standard butter package calculation',
    ingredientName: 'Butter',
    packageSize: 1,
    packageUnit: 'lb',
    packageCost: 4.50,
    recipeAmount: 0.5,
    recipeUnit: 'cup',
    ingredientType: 'butter',
    explanation: 'Butter is $4.50/lb (454g). Half a cup (113.5g) costs $1.12. This is a common ingredient - knowing this cost helps price recipes accurately.',
  },
  {
    name: 'All-Purpose Flour',
    description: 'Bulk flour bag costing',
    ingredientName: 'All-Purpose Flour',
    packageSize: 5,
    packageUnit: 'lb',
    packageCost: 4.99,
    recipeAmount: 2,
    recipeUnit: 'cup',
    ingredientType: 'flour',
    explanation: 'A 5lb bag costs $4.99. Two cups (240g) costs only $0.52. Flour is cheap! This shows why ingredient costs are often lower than you think.',
  },
  {
    name: 'Vanilla Extract',
    description: 'Expensive ingredient per unit',
    ingredientName: 'Pure Vanilla Extract',
    packageSize: 2,
    packageUnit: 'fl oz',
    packageCost: 12.99,
    recipeAmount: 1,
    recipeUnit: 'tsp',
    ingredientType: 'vanilla',
    explanation: 'Vanilla is expensive! A 2oz bottle costs $12.99. Just 1 tsp costs $1.08. Small amounts of premium ingredients add up - factor them into your pricing!',
  },
  {
    name: 'Cocoa Powder',
    description: 'Specialty ingredient calculation',
    ingredientName: 'Cocoa Powder',
    packageSize: 8,
    packageUnit: 'oz',
    packageCost: 8.99,
    recipeAmount: 0.75,
    recipeUnit: 'cup',
    ingredientType: 'cocoa-powder',
    explanation: 'An 8oz container costs $8.99. Using 3/4 cup (64g) costs $2.53. Cocoa is pricey - chocolate recipes need higher pricing to maintain margins.',
  },
  {
    name: 'Eggs (by unit)',
    description: 'Count-based ingredient',
    ingredientName: 'Large Eggs',
    packageSize: 1,
    packageUnit: 'dozen',
    packageCost: 4.99,
    recipeAmount: 3,
    recipeUnit: 'unit',
    ingredientType: 'eggs',
    explanation: 'A dozen eggs costs $4.99. Three eggs cost $1.25. Count-based ingredients are easy - just divide package cost by quantity!',
  },
  {
    name: 'Premium Sugar',
    description: 'Organic/specialty pricing',
    ingredientName: 'Organic Cane Sugar',
    packageSize: 2,
    packageUnit: 'lb',
    packageCost: 6.99,
    recipeAmount: 1,
    recipeUnit: 'cup',
    ingredientType: 'sugar',
    explanation: 'Organic sugar costs $6.99 for 2lb. One cup (200g) costs $0.77. Premium ingredients cost more - make sure your pricing reflects the quality!',
  },
]

export default function IngredientCostCalculator() {
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()
  const [showSignupDialog, setShowSignupDialog] = useState(false)
  const [showExampleBanner, setShowExampleBanner] = useState(false)
  const [currentExample, setCurrentExample] = useState<string>('')

  const [ingredientName, setIngredientName] = useState('')
  const [packageSize, setPackageSize] = useState(0)
  const [packageUnit, setPackageUnit] = useState('lb')
  const [packageCost, setPackageCost] = useState(0)

  const [recipeAmount, setRecipeAmount] = useState(0)
  const [recipeUnit, setRecipeUnit] = useState('cup')

  // Ingredient density (for volume to weight conversion)
  const [ingredientType, setIngredientType] = useState('flour')

  // Common ingredient densities (grams per cup)
  const DENSITIES: { [key: string]: number } = {
    'flour': 120,
    'sugar': 200,
    'brown-sugar': 220,
    'powdered-sugar': 120,
    'butter': 227,
    'oil': 218,
    'milk': 244,
    'water': 237,
    'honey': 340,
    'cocoa-powder': 85,
    'baking-powder': 220,
    'baking-soda': 220,
    'salt': 292,
    'vanilla': 208,
    'eggs': 50, // per egg
    'custom': 200, // default
  }

  // Get unit type
  const getUnitType = (unit: string): 'weight' | 'volume' | 'count' => {
    if (UNIT_TYPES.weight.includes(unit)) return 'weight'
    if (UNIT_TYPES.volume.includes(unit)) return 'volume'
    return 'count'
  }

  // Convert to base unit (grams for weight, ml for volume)
  const convertToBase = (amount: number, unit: string, type: 'weight' | 'volume'): number => {
    if (type === 'weight') {
      return amount * (CONVERSIONS[unit as keyof typeof CONVERSIONS] || 1)
    } else {
      // Volume to weight conversion using density
      const volumeInMl = amount * (CONVERSIONS[unit as keyof typeof CONVERSIONS] || 1)
      const volumeInCups = volumeInMl / 236.59
      return volumeInCups * DENSITIES[ingredientType]
    }
  }

  // Calculate cost
  const calculateCost = () => {
    if (packageSize === 0 || packageCost === 0 || recipeAmount === 0) {
      return { costPerUnit: 0, recipeCost: 0, canCalculate: false }
    }

    const packageType = getUnitType(packageUnit)
    const recipeType = getUnitType(recipeUnit)

    // If both are count units
    if (packageType === 'count' && recipeType === 'count') {
      const packageUnits = packageSize * (CONVERSIONS[packageUnit as keyof typeof CONVERSIONS] || 1)
      const recipeUnits = recipeAmount * (CONVERSIONS[recipeUnit as keyof typeof CONVERSIONS] || 1)
      const costPerUnit = packageCost / packageUnits
      const recipeCost = costPerUnit * recipeUnits
      return { costPerUnit, recipeCost, canCalculate: true }
    }

    // Convert both to grams
    const packageGrams = packageType === 'weight'
      ? convertToBase(packageSize, packageUnit, 'weight')
      : convertToBase(packageSize, packageUnit, 'volume')

    const recipeGrams = recipeType === 'weight'
      ? convertToBase(recipeAmount, recipeUnit, 'weight')
      : convertToBase(recipeAmount, recipeUnit, 'volume')

    const costPerGram = packageCost / packageGrams
    const recipeCost = costPerGram * recipeGrams
    const costPerUnit = costPerGram * (CONVERSIONS[recipeUnit as keyof typeof CONVERSIONS] || 1)

    return { costPerUnit, recipeCost, canCalculate: true }
  }

  const { costPerUnit, recipeCost, canCalculate } = calculateCost()

  const handleSaveClick = () => {
    if (!user) {
      setShowSignupDialog(true)
      return
    }
    handleActualSave()
  }

  const handleActualSave = async () => {
    try {
      const calculation: SavedIngredientCalculation = {
        id: generateCalculationId(),
        name: ingredientName || 'Unnamed Ingredient',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ingredientName: ingredientName,
        packageSize: packageSize,
        packageCost: packageCost,
        unit: recipeUnit,
        costPerUnit: costPerUnit,
      }

      await saveCalculation(CALCULATOR_STORES.ingredients, calculation)

      toast({
        title: '✅ Calculation saved!',
        description: 'View it in My Calculations.',
      })

      setTimeout(() => {
        router.push('/tools/my-calculations')
      }, 1500)
    } catch (error) {
      console.error('Error saving calculation:', error)
      toast({
        title: '❌ Error saving calculation',
        description: 'Please try again.',
        variant: 'destructive',
      })
    }
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

  const loadExample = (example: ExampleIngredient) => {
    setIngredientName(example.ingredientName)
    setPackageSize(example.packageSize)
    setPackageUnit(example.packageUnit)
    setPackageCost(example.packageCost)
    setRecipeAmount(example.recipeAmount)
    setRecipeUnit(example.recipeUnit)
    setIngredientType(example.ingredientType)
    setCurrentExample(example.name)
    setShowExampleBanner(true)
    
    toast({
      title: '📊 Example loaded!',
      description: `Loaded: ${example.name}`,
    })
  }

  const clearExample = () => {
    setIngredientName('')
    setPackageSize(0)
    setPackageUnit('lb')
    setPackageCost(0)
    setRecipeAmount(0)
    setRecipeUnit('cup')
    setIngredientType('flour')
    setCurrentExample('')
    setShowExampleBanner(false)
  }

  return (
    <CalculatorLayout
      title="Free Ingredient Cost Calculator"
      description="Calculate the cost per unit for any ingredient with automatic unit conversions. Perfect for recipe costing and bakery management."
    >
      {/* Friendly Introduction */}
      <div className="max-w-4xl mx-auto mb-8 p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 bg-amber-500 rounded-full shrink-0">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">How Much Does Each Ingredient Really Cost?</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-3">
              You buy a 5 lb bag of flour for $12.99 - but how much does 2 cups cost? We&apos;ll figure it out!
              This calculator converts between units and shows you the real cost of each ingredient in your recipes.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-amber-200">
                ✓ Auto conversions
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-amber-200">
                ✓ Cost per unit
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-amber-200">
                ✓ Recipe costs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Example Banner */}
      {showExampleBanner && currentExample && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-amber-50 border-2 border-amber-300 rounded-lg">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">
                  Example: {currentExample}
                </h3>
                <p className="text-sm text-amber-800">
                  {EXAMPLE_INGREDIENTS.find(i => i.name === currentExample)?.explanation}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearExample}
              className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Example Ingredients */}
      <div className="max-w-4xl mx-auto mb-8">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Lightbulb className="h-5 w-5" />
              Try an Example Ingredient
            </CardTitle>
            <p className="text-sm text-blue-700 mt-1">
              Not sure how to use this? Load a common ingredient example to see how the calculator works
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {EXAMPLE_INGREDIENTS.map((ingredient) => (
                <button
                  key={ingredient.name}
                  onClick={() => loadExample(ingredient)}
                  className="text-left p-4 bg-white rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all group"
                >
                  <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600">
                    {ingredient.name}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {ingredient.description}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ingredient Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-rose-500" />
                Ingredient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ingredientName">Ingredient Name</Label>
                <Input
                  id="ingredientName"
                  placeholder="e.g., All-Purpose Flour"
                  value={ingredientName}
                  onChange={(e) => setIngredientName(e.target.value)}
                  className="placeholder:text-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="ingredientType">Ingredient Type (for conversions)</Label>
                <Select value={ingredientType} onValueChange={setIngredientType}>
                  <SelectTrigger id="ingredientType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flour">All-Purpose Flour</SelectItem>
                    <SelectItem value="sugar">Granulated Sugar</SelectItem>
                    <SelectItem value="brown-sugar">Brown Sugar</SelectItem>
                    <SelectItem value="powdered-sugar">Powdered Sugar</SelectItem>
                    <SelectItem value="butter">Butter</SelectItem>
                    <SelectItem value="oil">Oil</SelectItem>
                    <SelectItem value="milk">Milk</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="honey">Honey</SelectItem>
                    <SelectItem value="cocoa-powder">Cocoa Powder</SelectItem>
                    <SelectItem value="baking-powder">Baking Powder</SelectItem>
                    <SelectItem value="baking-soda">Baking Soda</SelectItem>
                    <SelectItem value="salt">Salt</SelectItem>
                    <SelectItem value="vanilla">Vanilla Extract</SelectItem>
                    <SelectItem value="eggs">Eggs</SelectItem>
                    <SelectItem value="custom">Other/Custom</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Used for accurate volume-to-weight conversions
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Package Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Package Information
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                What you buy from the store
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="packageSize">Package Size</Label>
                  <Input
                    id="packageSize"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="5"
                    value={packageSize || ''}
                    onChange={(e) => setPackageSize(Number(e.target.value))}
                    className="placeholder:text-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="packageUnit">Unit</Label>
                  <Select value={packageUnit} onValueChange={setPackageUnit}>
                    <SelectTrigger id="packageUnit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="g">Grams (g)</SelectItem>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="oz">Ounces (oz)</SelectItem>
                      <SelectItem value="lb">Pounds (lb)</SelectItem>
                      <SelectItem value="ml">Milliliters (ml)</SelectItem>
                      <SelectItem value="l">Liters (l)</SelectItem>
                      <SelectItem value="cup">Cups</SelectItem>
                      <SelectItem value="fl oz">Fluid Ounces (fl oz)</SelectItem>
                      <SelectItem value="unit">Units</SelectItem>
                      <SelectItem value="dozen">Dozen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="packageCost">Package Cost ($)</Label>
                <Input
                  id="packageCost"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="12.99"
                  value={packageCost || ''}
                  onChange={(e) => setPackageCost(Number(e.target.value))}
                  className="placeholder:text-gray-300"
                />
                <p className="text-xs text-gray-500 mt-1">
                  How much you paid for the package
                </p>
              </div>

              {packageSize > 0 && packageCost > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Package:</strong> {packageSize} {packageUnit} for ${packageCost.toFixed(2)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recipe Amount */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-purple-500" />
                Recipe Amount
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                How much you use in your recipe
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recipeAmount">Amount Used</Label>
                  <Input
                    id="recipeAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="2"
                    value={recipeAmount || ''}
                    onChange={(e) => setRecipeAmount(Number(e.target.value))}
                    className="placeholder:text-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="recipeUnit">Unit</Label>
                  <Select value={recipeUnit} onValueChange={setRecipeUnit}>
                    <SelectTrigger id="recipeUnit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="g">Grams (g)</SelectItem>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="oz">Ounces (oz)</SelectItem>
                      <SelectItem value="lb">Pounds (lb)</SelectItem>
                      <SelectItem value="ml">Milliliters (ml)</SelectItem>
                      <SelectItem value="l">Liters (l)</SelectItem>
                      <SelectItem value="tsp">Teaspoons (tsp)</SelectItem>
                      <SelectItem value="tbsp">Tablespoons (tbsp)</SelectItem>
                      <SelectItem value="cup">Cups</SelectItem>
                      <SelectItem value="fl oz">Fluid Ounces (fl oz)</SelectItem>
                      <SelectItem value="unit">Units</SelectItem>
                      <SelectItem value="dozen">Dozen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                The calculator will automatically convert between weight and volume units
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Cost Results */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <DollarSign className="h-5 w-5" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {canCalculate ? (
                  <>
                    {ingredientName && (
                      <div>
                        <p className="text-sm text-gray-600">Ingredient:</p>
                        <p className="font-bold text-gray-900 text-lg">{ingredientName}</p>
                      </div>
                    )}

                    <div className="pt-3 border-t border-green-200">
                      <p className="text-sm text-gray-600 mb-2">Cost per {recipeUnit}:</p>
                      <p className="text-3xl font-bold text-green-600">
                        ${costPerUnit.toFixed(4)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-green-200">
                      <p className="text-sm text-gray-600 mb-1">Recipe Cost:</p>
                      <p className="text-sm text-gray-700 mb-2">
                        {recipeAmount} {recipeUnit} × ${costPerUnit.toFixed(4)}
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        ${recipeCost.toFixed(2)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-green-200">
                      <p className="text-xs text-gray-600">
                        <strong>Package Yield:</strong> {packageSize > 0 && recipeAmount > 0
                          ? `${(packageSize / recipeAmount).toFixed(1)} recipes`
                          : 'N/A'}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">
                      Enter package and recipe information to calculate costs
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-sm text-blue-900">
                  Quick Reference
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-gray-700">
                <div>
                  <p className="font-semibold mb-1">Common Conversions:</p>
                  <ul className="space-y-1">
                    <li>• 1 cup flour ≈ 120g</li>
                    <li>• 1 cup sugar ≈ 200g</li>
                    <li>• 1 cup butter ≈ 227g</li>
                    <li>• 1 tbsp = 3 tsp</li>
                    <li>• 1 cup = 16 tbsp</li>
                    <li>• 1 lb = 16 oz</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                className="w-full bg-rose-500 hover:bg-rose-600"
                onClick={handleSaveClick}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Ingredient
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
                <h3 className="font-bold text-lg mb-2">Build Your Ingredient Library</h3>
                <p className="text-sm text-rose-100 mb-4">
                  Save unlimited ingredients with costs and automatically calculate recipe costs.
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
          Ingredient Costing Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Track Price Changes</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Ingredient prices fluctuate. Update your costs monthly to ensure accurate recipe
                costing. Consider seasonal variations and bulk buying opportunities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Buy in Bulk Wisely</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Bulk buying reduces cost per unit, but only if you use it before expiration.
                Calculate break-even point: (bulk price - regular price) ÷ amount saved.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account for Waste</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Add 5-10% to ingredient costs to account for spillage, spoilage, and testing.
                This ensures your recipe costs reflect reality, not just theory.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compare Suppliers</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Use this calculator to compare costs between suppliers. Sometimes a larger package
                from one supplier is cheaper per unit than a smaller package from another.
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
              <CardTitle className="text-lg">How do I convert cups to grams?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Different ingredients have different densities. 1 cup of flour ≈ 120g, but 1 cup of
                sugar ≈ 200g. Select the correct ingredient type in the calculator for accurate conversions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Why is cost per unit important?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Knowing cost per unit (per cup, per gram, etc.) lets you quickly calculate recipe costs
                without doing math every time. It also helps you compare prices between different package
                sizes and suppliers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Should I include shipping costs?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Yes! Add shipping costs to the package cost for accurate per-unit pricing. If you buy
                multiple items in one order, divide the shipping proportionally based on item weight or cost.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How often should I update ingredient costs?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Update costs monthly or whenever you notice significant price changes. Set a reminder to
                review costs quarterly at minimum. This ensures your recipe pricing stays profitable.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Signup Dialog */}
      <SaveCalculationDialog
        open={showSignupDialog}
        onOpenChange={setShowSignupDialog}
        calculatorType="Ingredient"
        onSuccess={handleActualSave}
      />
    </CalculatorLayout>
  )
}
