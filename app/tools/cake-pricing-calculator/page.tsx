'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import CalculatorLayout from '@/components/calculators/CalculatorLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Cake, DollarSign, Clock, Truck, Package, Save, Share2, Printer, Sparkles, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { SaveCalculationDialog } from '@/components/calculators/SaveCalculationDialog'
import { 
  saveCalculation, 
  getCalculation, 
  generateCalculationId,
  CALCULATOR_STORES,
  type SavedCakeCalculation 
} from '../utils/calculatorStorage'

export default function CakePricingCalculator() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const loadId = searchParams?.get('load')
  const { user } = useAuth()
  
  const [calculationId, setCalculationId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showSignupDialog, setShowSignupDialog] = useState(false)
  
  // Cake Details
  const [cakeName, setCakeName] = useState('')
  const [cakeType, setCakeType] = useState('round')
  const [tiers, setTiers] = useState(1)
  const [servings, setServings] = useState(12)
  
  // Costs
  const [ingredientCost, setIngredientCost] = useState(0)
  const [decorationCost, setDecorationCost] = useState(0)
  const [packagingCost, setPackagingCost] = useState(0)
  
  // Labor
  const [bakingTime, setBakingTime] = useState(2)
  const [decoratingTime, setDecoratingTime] = useState(3)
  const [hourlyRate, setHourlyRate] = useState(25)
  
  // Delivery & Extras
  const [deliveryDistance, setDeliveryDistance] = useState(0)
  const [deliveryCostPerMile, setDeliveryCostPerMile] = useState(2)
  const [setupTime, setSetupTime] = useState(0)
  
  // Complexity & Profit
  const [complexityLevel, setComplexityLevel] = useState(2) // 1-5 scale
  const [desiredProfit, setDesiredProfit] = useState(50)

  // Calculations
  const laborCost = (bakingTime + decoratingTime + setupTime) * hourlyRate
  const deliveryCost = deliveryDistance * deliveryCostPerMile
  const complexityMultiplier = 1 + (complexityLevel - 1) * 0.15 // 1x to 1.6x
  
  const baseCost = ingredientCost + decorationCost + packagingCost + laborCost + deliveryCost
  const adjustedCost = baseCost * complexityMultiplier
  const totalCost = adjustedCost
  
  const costPerServing = servings > 0 ? totalCost / servings : 0
  const suggestedPrice = totalCost * (1 + desiredProfit / 100)
  const pricePerServing = servings > 0 ? suggestedPrice / servings : 0
  const totalProfit = suggestedPrice - totalCost
  const profitPerServing = pricePerServing - costPerServing

  // Tier pricing suggestions
  const tierMultipliers = {
    1: 1,
    2: 1.8,
    3: 2.5,
    4: 3.2,
    5: 4.0
  }
  const tierAdjustedPrice = suggestedPrice * (tierMultipliers[tiers as keyof typeof tierMultipliers] || 1)

  const loadCalculation = async (id: string) => {
    try {
      const saved = await getCalculation<SavedCakeCalculation>(
        CALCULATOR_STORES.cakes,
        id
      )
      
      if (saved) {
        setCalculationId(saved.id)
        setCakeName(saved.name)
        setCakeType(saved.cakeType)
        setTiers(saved.tiers)
        setServings(saved.servings)
        setIngredientCost(saved.ingredientCost)
        setDecorationCost(saved.decorationCost)
        setPackagingCost(saved.packagingCost)
        setBakingTime(saved.bakingTime)
        setDecoratingTime(saved.decoratingTime)
        setSetupTime(saved.setupTime)
        setHourlyRate(saved.hourlyRate)
        setDeliveryDistance(saved.deliveryDistance)
        setDeliveryCostPerMile(saved.deliveryCostPerMile)
        setComplexityLevel(saved.complexityLevel)
        setDesiredProfit(saved.desiredProfit)
        setLastSaved(new Date(saved.updatedAt))
        
        toast({
          title: '✅ Cake loaded',
          description: `Loaded "${saved.name}"`,
        })
      }
    } catch (error) {
      console.error('Error loading calculation:', error)
      toast({
        title: 'Error loading cake',
        description: 'Could not load the saved cake.',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    if (loadId) {
      loadCalculation(loadId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadId])

  const handleSaveClick = () => {
    if (!cakeName.trim()) {
      toast({
        title: 'Cake name required',
        description: 'Please give your cake a name before saving.',
        variant: 'destructive',
      })
      return
    }

    // Check if user is logged in
    if (!user) {
      // Show signup dialog
      setShowSignupDialog(true)
      return
    }

    // User is logged in, save directly
    handleActualSave()
  }

  const handleActualSave = async () => {
    setIsSaving(true)
    
    try {
      const id = calculationId || generateCalculationId()
      const now = new Date().toISOString()
      
      const calculation: SavedCakeCalculation = {
        id,
        name: cakeName,
        createdAt: calculationId ? (lastSaved?.toISOString() || now) : now,
        updatedAt: now,
        cakeType,
        tiers,
        servings,
        ingredientCost,
        decorationCost,
        packagingCost,
        bakingTime,
        decoratingTime,
        setupTime,
        hourlyRate,
        deliveryDistance,
        deliveryCostPerMile,
        complexityLevel,
        desiredProfit,
        totalCost,
        suggestedPrice,
        tierAdjustedPrice,
      }
      
      await saveCalculation(CALCULATOR_STORES.cakes, calculation)
      
      setCalculationId(id)
      setLastSaved(new Date())
      
      toast({
        title: '✅ Cake saved!',
        description: 'View it in My Calculations.',
      })

      // Redirect to My Calculations after a brief delay
      setTimeout(() => {
        router.push('/tools/my-calculations')
      }, 1500)
    } catch (error) {
      console.error('Error saving calculation:', error)
      toast({
        title: 'Error saving cake',
        description: 'Could not save your cake. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
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

  const getComplexityLabel = (level: number) => {
    const labels = ['Simple', 'Easy', 'Moderate', 'Complex', 'Very Complex']
    return labels[level - 1] || 'Moderate'
  }

  return (
    <CalculatorLayout
      title="Free Cake Pricing Calculator"
      description="Calculate the perfect price for your cakes. Factor in ingredients, labor, tiers, complexity, delivery, and profit margins."
    >
      {/* Friendly Introduction */}
      <div className="max-w-4xl mx-auto mb-8 p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 bg-purple-500 rounded-full shrink-0">
            <Cake className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">🎂 Price Your Cakes Like a Pro!</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-3">
              Stop guessing what to charge! This calculator helps you price your cakes so you make a profit AND feel confident. 
              We&apos;ll walk you through everything - ingredients, your time, decorations, and even delivery.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-purple-200">
                ✓ Perfect for custom cakes
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-purple-200">
                ✓ Includes tier pricing
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-purple-200">
                ✓ Factor in complexity
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Input Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cake Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎂</span>
                Tell Us About Your Cake
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Let&apos;s start with the basics - what kind of cake are you making?
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cakeName" className="text-base font-semibold">What&apos;s this cake for? (Optional)</Label>
                <Input
                  id="cakeName"
                  placeholder="e.g., Sarah's Birthday Cake, Wedding Cake for the Johnsons"
                  value={cakeName}
                  onChange={(e) => setCakeName(e.target.value)}
                  className="text-base"
                />
                <p className="text-sm text-gray-600 mt-1">
                  💡 Helps you remember which cake this is!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cakeType">Cake Type</Label>
                  <Select value={cakeType} onValueChange={setCakeType}>
                    <SelectTrigger id="cakeType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="round">Round Cake</SelectItem>
                      <SelectItem value="square">Square Cake</SelectItem>
                      <SelectItem value="sheet">Sheet Cake</SelectItem>
                      <SelectItem value="custom">Custom Shape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tiers">Number of Tiers</Label>
                  <Select value={tiers.toString()} onValueChange={(v) => setTiers(Number(v))}>
                    <SelectTrigger id="tiers">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Tier (Single)</SelectItem>
                      <SelectItem value="2">2 Tiers</SelectItem>
                      <SelectItem value="3">3 Tiers</SelectItem>
                      <SelectItem value="4">4 Tiers</SelectItem>
                      <SelectItem value="5">5+ Tiers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="servings" className="text-base font-semibold">How many people will eat this cake?</Label>
                <Input
                  id="servings"
                  type="number"
                  min="1"
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="text-base"
                />
                <p className="text-sm text-gray-600 mt-1">
                  🍰 Number of servings (e.g., 50 for a wedding cake)
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Label htmlFor="complexity" className="text-base font-semibold">
                  How fancy is this cake? <span className="font-bold text-purple-600">{getComplexityLabel(complexityLevel)}</span>
                </Label>
                <Slider
                  id="complexity"
                  min={1}
                  max={5}
                  step={1}
                  value={[complexityLevel]}
                  onValueChange={(value: number[]) => setComplexityLevel(value[0])}
                  className="mt-3"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Simple</span>
                  <span>Very Complex</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  🎨 <strong>Simple:</strong> Basic buttercream • <strong>Complex:</strong> Fondant, sugar flowers, hand-painted designs
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Material Costs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📦</span>
                What Did You Spend on Materials?
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Add up what you spent on ingredients, decorations, and packaging.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ingredientCost" className="font-semibold">Ingredients (Cake, Frosting, Fillings)</Label>
                <Input
                  id="ingredientCost"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="25.00"
                  value={ingredientCost || ''}
                  onChange={(e) => setIngredientCost(Number(e.target.value))}
                />
                <p className="text-sm text-gray-600 mt-1">
                  🥚 Flour, eggs, butter, sugar, frosting, etc.
                </p>
              </div>

              <div>
                <Label htmlFor="decorationCost" className="font-semibold">Decorations & Toppers</Label>
                <Input
                  id="decorationCost"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="15.00"
                  value={decorationCost || ''}
                  onChange={(e) => setDecorationCost(Number(e.target.value))}
                />
                <p className="text-sm text-gray-600 mt-1">
                  🌹 Fondant, flowers, toppers, sprinkles, food coloring
                </p>
              </div>

              <div>
                <Label htmlFor="packagingCost">Packaging Cost ($)</Label>
                <Input
                  id="packagingCost"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={packagingCost || ''}
                  onChange={(e) => setPackagingCost(Number(e.target.value))}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Cake box, boards, dowels, ribbon, etc.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Labor & Time */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">⏰</span>
                Your Time Matters!
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Don&apos;t forget to pay yourself! Your time and skill are valuable.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hourlyRate" className="font-semibold">What&apos;s your time worth per hour?</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="25.00"
                  value={hourlyRate || ''}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                />
                <p className="text-sm text-gray-600 mt-1">
                  💡 Most bakers charge $20-40/hour. You deserve it!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bakingTime">Baking (hours)</Label>
                  <Input
                    id="bakingTime"
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="2"
                    value={bakingTime || ''}
                    onChange={(e) => setBakingTime(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="decoratingTime">Decorating (hours)</Label>
                  <Input
                    id="decoratingTime"
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="3"
                    value={decoratingTime || ''}
                    onChange={(e) => setDecoratingTime(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="setupTime">Setup (hours)</Label>
                  <Input
                    id="setupTime"
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="0"
                    value={setupTime || ''}
                    onChange={(e) => setSetupTime(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                <p className="text-sm text-gray-700">
                  <strong>Total Labor Cost:</strong> ${laborCost.toFixed(2)}
                  <span className="text-gray-600"> ({(bakingTime + decoratingTime + setupTime).toFixed(1)} hours × ${hourlyRate}/hr)</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-rose-500" />
                Delivery (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryDistance">Distance (miles)</Label>
                  <Input
                    id="deliveryDistance"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="0"
                    value={deliveryDistance || ''}
                    onChange={(e) => setDeliveryDistance(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="deliveryCostPerMile">Cost per Mile ($)</Label>
                  <Input
                    id="deliveryCostPerMile"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="2.00"
                    value={deliveryCostPerMile || ''}
                    onChange={(e) => setDeliveryCostPerMile(Number(e.target.value))}
                  />
                </div>
              </div>

              {deliveryCost > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Delivery Cost:</strong> ${deliveryCost.toFixed(2)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Cost Breakdown */}
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
                    <span className="font-medium">${ingredientCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Decorations:</span>
                    <span className="font-medium">${decorationCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Packaging:</span>
                    <span className="font-medium">${packagingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Labor:</span>
                    <span className="font-medium">${laborCost.toFixed(2)}</span>
                  </div>
                  {deliveryCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Delivery:</span>
                      <span className="font-medium">${deliveryCost.toFixed(2)}</span>
                    </div>
                  )}
                  {complexityLevel > 1 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Complexity Adj:</span>
                      <span className="font-medium">×{complexityMultiplier.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-rose-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">Total Cost:</span>
                    <span className="text-2xl font-bold text-rose-600">
                      ${totalCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Cost per Serving:</span>
                    <span className="font-medium">${costPerServing.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Recommendation */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Sparkles className="h-5 w-5" />
                  Recommended Price
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
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
                </div>

                <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                  <p className="text-sm text-gray-700 mb-2">Base Price:</p>
                  <p className="text-3xl font-bold text-green-600 mb-1">
                    ${suggestedPrice.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-600">
                    ${pricePerServing.toFixed(2)} per serving
                  </p>
                </div>

                {tiers > 1 && (
                  <div className="p-4 bg-white rounded-lg border-2 border-purple-300">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>{tiers}-Tier Adjusted:</strong>
                    </p>
                    <p className="text-3xl font-bold text-purple-600 mb-1">
                      ${tierAdjustedPrice.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-600">
                      Multi-tier cakes require more skill & time
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-green-200 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Your Profit:</span>
                    <span className="font-bold text-green-600">${totalProfit.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Profit per Serving:</span>
                    <span className="font-medium text-green-600">${profitPerServing.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Profit Margin:</span>
                    <span className="font-medium text-green-600">{desiredProfit}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                className="w-full bg-rose-500 hover:bg-rose-600"
                onClick={handleSaveClick}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : lastSaved ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Calculation
                  </>
                )}
              </Button>
              {lastSaved && (
                <p className="text-xs text-center text-gray-500">
                  Last saved {lastSaved.toLocaleTimeString()}
                </p>
              )}
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
                <h3 className="font-bold text-lg mb-2">💾 Your Work is Saved Locally</h3>
                <p className="text-sm text-rose-100 mb-4">
                  Saved cakes are stored in your browser. Want more?
                </p>
                <div className="space-y-2 text-sm text-rose-100 mb-4">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Sync across all devices</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Track orders & customers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Manage inventory & costs</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-white text-white hover:bg-white/10"
                    onClick={() => router.push('/tools/my-calculations')}
                  >
                    View My Calculations
                  </Button>
                  <Button
                    className="w-full bg-white text-rose-600 hover:bg-rose-50"
                    onClick={() => router.push('/bakery-business-tool')}
                  >
                    Upgrade to Full Platform →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Pricing Tips */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Cake Pricing Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Factor in ALL Costs</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Don&apos;t forget hidden costs: electricity, water, wear on equipment, cake boards, 
                dowels, and your time for consultations and setup. These add up!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Charge for Complexity</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Intricate designs, fondant work, and sugar flowers take skill and time. 
                Don&apos;t undervalue your expertise. Complex cakes should cost 50-100% more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Multi-Tier Pricing</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Each tier adds structural complexity. A 3-tier cake isn&apos;t just 3× the price 
                of one tier—it requires dowels, stacking, and extra time. Charge accordingly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Know Your Market</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Research local cake prices. Wedding cakes typically command $4-8 per serving. 
                Birthday cakes $3-5. Custom designs can be $6-12+. Price competitively but fairly.
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
              <CardTitle className="text-lg">How much should I charge per serving?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                It depends on your market and cake complexity. Simple cakes: $3-4/serving. 
                Custom decorated: $4-6/serving. Wedding cakes: $5-8/serving. Elaborate designs: $8-12+/serving.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What profit margin should I aim for?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Most successful cake businesses aim for 50-100% profit margin. This accounts for 
                overhead, taxes, and business growth. Don&apos;t go below 40% or you&apos;ll struggle to stay profitable.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Should I charge for delivery?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Yes! Delivery includes gas, time, vehicle wear, and the risk of transporting a delicate cake. 
                Charge $1.50-3 per mile, with a minimum delivery fee of $15-25.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do I price custom designs?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                Start with your base price, then add 20-50% for moderate custom work, 50-100% for 
                complex designs, and 100-200% for extremely intricate or time-consuming decorations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Signup Dialog */}
      <SaveCalculationDialog
        open={showSignupDialog}
        onOpenChange={setShowSignupDialog}
        calculatorType="Cake"
        onSuccess={handleActualSave}
      />
    </CalculatorLayout>
  )
}
