'use client'

import React, { useState } from 'react'
import CalculatorLayout from '@/components/calculators/CalculatorLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Scale, ArrowRight, Plus, Trash2, Save, Share2, Printer, Calculator } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Ingredient {
  id: string
  original: string
  amount: number
  unit: string
  name: string
  scaled: number
}

export default function RecipeScalingCalculator() {
  const { toast } = useToast()
  
  const [recipeName, setRecipeName] = useState('')
  const [originalYield, setOriginalYield] = useState(12)
  const [desiredYield, setDesiredYield] = useState(24)
  const [scalingMethod, setScalingMethod] = useState<'yield' | 'multiplier'>('yield')
  const [multiplier, setMultiplier] = useState(2)
  
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: '1',
      original: '',
      amount: 0,
      unit: 'cup',
      name: '',
      scaled: 0
    }
  ])

  // Calculate scaling factor
  const scalingFactor = scalingMethod === 'yield' 
    ? desiredYield / originalYield 
    : multiplier

  // Parse ingredient input (e.g., "2 cups flour" or "1 1/2 tsp vanilla")
  const parseIngredient = (input: string) => {
    const trimmed = input.trim()
    
    // Match patterns like: "2 cups flour", "1 1/2 tsp vanilla", "1/2 cup sugar"
    const pattern = /^(\d+(?:\s+\d+\/\d+|\.\d+|\/\d+)?)\s+([a-zA-Z]+)\s+(.+)$/
    const match = trimmed.match(pattern)
    
    if (match) {
      const amountStr = match[1]
      const unit = match[2]
      const name = match[3]
      
      // Parse amount (handle fractions)
      let amount = 0
      if (amountStr.includes('/')) {
        // Handle "1 1/2" or "1/2"
        const parts = amountStr.split(' ')
        if (parts.length === 2) {
          // "1 1/2"
          const whole = parseInt(parts[0])
          const [num, den] = parts[1].split('/').map(Number)
          amount = whole + (num / den)
        } else {
          // "1/2"
          const [num, den] = amountStr.split('/').map(Number)
          amount = num / den
        }
      } else {
        amount = parseFloat(amountStr)
      }
      
      return { amount, unit, name }
    }
    
    return null
  }

  // Convert decimal to fraction
  const toFraction = (decimal: number): string => {
    if (decimal === Math.floor(decimal)) {
      return decimal.toString()
    }
    
    const whole = Math.floor(decimal)
    const fraction = decimal - whole
    
    // Common baking fractions
    const fractions: { [key: string]: string } = {
      '0.125': '1/8',
      '0.25': '1/4',
      '0.333': '1/3',
      '0.375': '3/8',
      '0.5': '1/2',
      '0.625': '5/8',
      '0.666': '2/3',
      '0.75': '3/4',
      '0.875': '7/8',
    }
    
    // Find closest fraction
    let closest = '0'
    let minDiff = 1
    
    for (const [dec, frac] of Object.entries(fractions)) {
      const diff = Math.abs(fraction - parseFloat(dec))
      if (diff < minDiff) {
        minDiff = diff
        closest = frac
      }
    }
    
    if (minDiff < 0.02) {
      return whole > 0 ? `${whole} ${closest}` : closest
    }
    
    return decimal.toFixed(2)
  }

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: Date.now().toString(),
        original: '',
        amount: 0,
        unit: '',
        name: '',
        scaled: 0
      }
    ])
  }

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ing => ing.id !== id))
    }
  }

  const updateIngredient = (id: string, value: string) => {
    setIngredients(prev => prev.map(ing => {
      if (ing.id === id) {
        const parsed = parseIngredient(value)
        if (parsed) {
          const scaled = parsed.amount * scalingFactor
          return {
            ...ing,
            original: value,
            amount: parsed.amount,
            unit: parsed.unit,
            name: parsed.name,
            scaled
          }
        }
        return { ...ing, original: value }
      }
      return ing
    }))
  }

  // Recalculate when scaling factor changes
  React.useEffect(() => {
    setIngredients(prev => prev.map(ing => ({
      ...ing,
      scaled: ing.amount * scalingFactor
    })))
  }, [scalingFactor])

  const handleSave = () => {
    toast({
      title: 'Sign up to save',
      description: 'Create a free account to save and access all your scaled recipes.',
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

  const handleQuickScale = (factor: number) => {
    setScalingMethod('multiplier')
    setMultiplier(factor)
  }

  return (
    <CalculatorLayout
      title="Free Recipe Scaling Calculator"
      description="Scale recipes up or down instantly. Perfect for adjusting batch sizes, converting servings, and scaling baking recipes."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recipe Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-rose-500" />
                Recipe Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="recipeName">Recipe Name (Optional)</Label>
                <Input
                  id="recipeName"
                  placeholder="e.g., Chocolate Chip Cookies"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="originalYield">Original Yield</Label>
                  <Input
                    id="originalYield"
                    type="number"
                    min="1"
                    value={originalYield}
                    onChange={(e) => setOriginalYield(Number(e.target.value))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Original servings/pieces
                  </p>
                </div>

                <div>
                  <Label htmlFor="desiredYield">Desired Yield</Label>
                  <Input
                    id="desiredYield"
                    type="number"
                    min="1"
                    value={desiredYield}
                    onChange={(e) => {
                      setDesiredYield(Number(e.target.value))
                      setScalingMethod('yield')
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    How many you want to make
                  </p>
                </div>
              </div>

              <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Scaling Factor: <span className="text-2xl font-bold text-rose-600">×{scalingFactor.toFixed(2)}</span>
                </p>
                <p className="text-xs text-gray-600">
                  {scalingFactor > 1 
                    ? `Scaling UP by ${((scalingFactor - 1) * 100).toFixed(0)}%` 
                    : scalingFactor < 1
                    ? `Scaling DOWN by ${((1 - scalingFactor) * 100).toFixed(0)}%`
                    : 'No scaling (1:1 ratio)'}
                </p>
              </div>

              {/* Quick Scale Buttons */}
              <div>
                <Label>Quick Scale</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  <Button
                    variant={multiplier === 0.5 && scalingMethod === 'multiplier' ? 'default' : 'outline'}
                    onClick={() => handleQuickScale(0.5)}
                    className={multiplier === 0.5 && scalingMethod === 'multiplier' ? 'bg-rose-500' : ''}
                  >
                    ÷2 (Half)
                  </Button>
                  <Button
                    variant={multiplier === 2 && scalingMethod === 'multiplier' ? 'default' : 'outline'}
                    onClick={() => handleQuickScale(2)}
                    className={multiplier === 2 && scalingMethod === 'multiplier' ? 'bg-rose-500' : ''}
                  >
                    ×2 (Double)
                  </Button>
                  <Button
                    variant={multiplier === 3 && scalingMethod === 'multiplier' ? 'default' : 'outline'}
                    onClick={() => handleQuickScale(3)}
                    className={multiplier === 3 && scalingMethod === 'multiplier' ? 'bg-rose-500' : ''}
                  >
                    ×3 (Triple)
                  </Button>
                  <Button
                    variant={multiplier === 1.5 && scalingMethod === 'multiplier' ? 'default' : 'outline'}
                    onClick={() => handleQuickScale(1.5)}
                    className={multiplier === 1.5 && scalingMethod === 'multiplier' ? 'bg-rose-500' : ''}
                  >
                    ×1.5
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Enter each ingredient like: &quot;2 cups flour&quot; or &quot;1 1/2 tsp vanilla&quot;
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <Label htmlFor={`ingredient-${ingredient.id}`}>
                        Ingredient {index + 1}
                      </Label>
                      <Input
                        id={`ingredient-${ingredient.id}`}
                        placeholder="e.g., 2 cups all-purpose flour"
                        value={ingredient.original}
                        onChange={(e) => updateIngredient(ingredient.id, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    {ingredients.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeIngredient(ingredient.id)}
                        className="mt-7"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>

                  {ingredient.name && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Original:</p>
                        <p className="font-medium text-gray-900">
                          {toFraction(ingredient.amount)} {ingredient.unit} {ingredient.name}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Scaled:</p>
                        <p className="font-bold text-green-600 text-lg">
                          {toFraction(ingredient.scaled)} {ingredient.unit} {ingredient.name}
                        </p>
                      </div>
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
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Scaled Recipe Summary */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Calculator className="h-5 w-5" />
                  Scaled Recipe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {recipeName && (
                    <div>
                      <p className="text-sm text-gray-600">Recipe:</p>
                      <p className="font-bold text-gray-900 text-lg">{recipeName}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Original:</p>
                      <p className="font-bold text-gray-900 text-xl">{originalYield}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Scaled:</p>
                      <p className="font-bold text-green-600 text-xl">{desiredYield}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-green-200">
                    <p className="text-sm text-gray-600 mb-2">Scaling Factor:</p>
                    <p className="text-3xl font-bold text-green-600">
                      ×{scalingFactor.toFixed(2)}
                    </p>
                  </div>
                </div>

                {ingredients.filter(i => i.name).length > 0 && (
                  <div className="pt-4 border-t border-green-200">
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                      Scaled Ingredients:
                    </p>
                    <div className="space-y-2">
                      {ingredients.filter(i => i.name).map((ing) => (
                        <div key={ing.id} className="text-sm">
                          <span className="font-medium text-green-700">
                            {toFraction(ing.scaled)} {ing.unit}
                          </span>
                          <span className="text-gray-700"> {ing.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                <h3 className="font-bold text-lg mb-2">Save All Your Recipes</h3>
                <p className="text-sm text-rose-100 mb-4">
                  Store unlimited recipes, automatically scale ingredients, and manage your entire bakery business.
                </p>
                <Button
                  className="w-full bg-white text-rose-600 hover:bg-rose-50"
                  onClick={() => window.location.href = '/bakery-business-tool'}
                >
                  Sign Up Free →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Scaling Tips */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Recipe Scaling Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Baking Time Adjustments</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                When scaling recipes, baking time doesn&apos;t scale linearly. Larger batches may need 
                10-20% more time, while smaller batches may need 10-20% less. Always check for doneness.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pan Size Matters</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Scaling up? You may need larger pans or multiple pans. Scaling down? Use smaller pans 
                to maintain proper baking depth. Pan size affects baking time and texture.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Be Careful with Leavening</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Baking powder and baking soda don&apos;t always scale perfectly. For very large batches 
                (5x or more), reduce leavening by 10-15% to avoid over-rising or bitter taste.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mixing Time Changes</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Larger batches need more mixing time to incorporate ingredients evenly. Smaller batches 
                need less. Overmixing small batches can make baked goods tough.
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
              <CardTitle className="text-lg">How do I scale a recipe?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Divide your desired yield by the original yield to get the scaling factor. Then multiply 
                each ingredient by this factor. For example, to double a recipe (12 → 24), multiply all 
                ingredients by 2.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I scale any recipe?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Most recipes scale well up to 3-4x. Beyond that, you may need to adjust baking time, 
                temperature, or leavening agents. Delicate recipes like soufflés or macarons are harder 
                to scale and may need testing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What about eggs when scaling?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Eggs are tricky because you can&apos;t use partial eggs easily. For small adjustments, 
                beat eggs and measure by weight (1 large egg ≈ 50g). Or round to the nearest whole egg 
                and adjust liquid slightly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Should I scale baking time?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                No, don&apos;t scale baking time by the same factor. Larger batches need slightly more 
                time (10-20%), smaller batches need slightly less. Always use visual cues and doneness 
                tests rather than relying solely on time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  )
}
