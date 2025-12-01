'use client'

import React, { useState, useMemo } from 'react'
import {
  Package,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Scale,
  DollarSign,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Star,
  Info,
  Lightbulb,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { useBatchSizes, PRICING_STRATEGIES } from '../hooks/useBatchSizes'
import { useCurrencySymbol, useDefaultMarkup } from '../hooks'
import type { Recipe, SellingUnit } from '../types'

interface BatchSizeManagerProps {
  recipe: Recipe
  onUpdate?: () => void
  compact?: boolean // For inline display in recipe cards
}

/**
 * BatchSizeManager - Manage selling units for a recipe
 * 
 * Features:
 * - Set batch yield (e.g., "3 lbs", "24 cookies")
 * - Add/edit/remove selling units
 * - Auto-calculate costs and suggested prices
 * - Quick presets for common selling units
 * - Responsive: Dialog on desktop, Sheet on mobile
 */
export function BatchSizeManager({ recipe, onUpdate, compact = false }: BatchSizeManagerProps) {
  const { toast } = useToast()
  const { symbol: currencySymbol } = useCurrencySymbol()
  const { markup: defaultMarkup } = useDefaultMarkup()

  const {
    calculateCostPerBaseUnit,
    getSellingUnitsWithPricing,
    addSellingUnit,
    updateSellingUnit,
    removeSellingUnit,
    setBatchYield,
    initializeBatchSizes,
    validateSellingUnit,
  } = useBatchSizes()

  // State
  const [isOpen, setIsOpen] = useState(false)
  const [isAddingUnit, setIsAddingUnit] = useState(false)
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Form state for batch yield
  const [batchYield, setBatchYieldState] = useState(recipe.batchYield?.toString() || '')
  const [batchUnit, setBatchUnitState] = useState(recipe.batchUnit || 'piece')

  // Form state for new/editing selling unit
  const [unitName, setUnitName] = useState('')
  const [unitQuantity, setUnitQuantity] = useState('')
  const [unitPriceOverride, setUnitPriceOverride] = useState('')
  const [unitIsDefault, setUnitIsDefault] = useState(false)
  const [unitTargetMargin, setUnitTargetMargin] = useState('')

  // Calculated values
  // defaultMarkup is a percentage (e.g., 150 = 150% markup = 2.5x multiplier)
  // PRICING_STRATEGIES values are multipliers (e.g., 2.5)
  // Convert percentage to multiplier: 150% markup = 1 + (150/100) = 2.5x
  const markup = defaultMarkup ? 1 + (defaultMarkup / 100) : PRICING_STRATEGIES.standard
  const costPerBaseUnit = useMemo(() => calculateCostPerBaseUnit(recipe), [recipe, calculateCostPerBaseUnit])
  const sellingUnitsWithPricing = useMemo(
    () => getSellingUnitsWithPricing(recipe, markup),
    [recipe, markup, getSellingUnitsWithPricing]
  )

  const hasBatchSizes = recipe.batchYield && recipe.batchYield > 0
  const hasSellingUnits = recipe.sellingUnits && recipe.sellingUnits.length > 0

  // Common batch units
  const batchUnitOptions = [
    { value: 'lb', label: 'Pounds (lb)' },
    { value: 'oz', label: 'Ounces (oz)' },
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'g', label: 'Grams (g)' },
    { value: 'piece', label: 'Pieces' },
    { value: 'cookie', label: 'Cookies' },
    { value: 'cupcake', label: 'Cupcakes' },
    { value: 'slice', label: 'Slices' },
    { value: 'dozen', label: 'Dozens' },
    { value: 'loaf', label: 'Loaves' },
  ]

  // Calculate price from target margin
  // Formula: price = cost / (1 - (margin / 100))
  // Example: cost=$10, margin=60% → price = 10 / (1 - 0.6) = 10 / 0.4 = $25
  const calculatePriceFromMargin = (cost: number, targetMargin: number): number => {
    if (targetMargin >= 100) return cost * 10 // Prevent division by zero
    return cost / (1 - (targetMargin / 100))
  }

  // Reset form
  const resetForm = () => {
    setUnitName('')
    setUnitQuantity('')
    setUnitPriceOverride('')
    setUnitIsDefault(false)
    setUnitTargetMargin('')
    setIsAddingUnit(false)
    setEditingUnitId(null)
  }

  // Handle saving batch yield
  const handleSaveBatchYield = () => {
    const yieldValue = parseFloat(batchYield)
    if (isNaN(yieldValue) || yieldValue <= 0) {
      toast({
        title: 'Invalid batch yield',
        description: 'Please enter a positive number for batch yield.',
        variant: 'destructive',
      })
      return
    }

    setBatchYield(recipe.id, yieldValue, batchUnit)
    toast({
      title: 'Batch yield saved',
      description: `Recipe now yields ${yieldValue} ${batchUnit}(s) per batch.`,
    })
    onUpdate?.()
  }

  // Handle initializing with defaults
  const handleInitializeDefaults = () => {
    const yieldValue = parseFloat(batchYield)
    if (isNaN(yieldValue) || yieldValue <= 0) {
      toast({
        title: 'Set batch yield first',
        description: 'Please enter a valid batch yield before adding selling units.',
        variant: 'destructive',
      })
      return
    }

    initializeBatchSizes(recipe.id, yieldValue, batchUnit)
    toast({
      title: 'Selling units created',
      description: 'Default selling units have been added based on your batch unit.',
    })
    onUpdate?.()
  }

  // Handle adding a selling unit
  const handleAddUnit = () => {
    const quantity = parseFloat(unitQuantity)
    const priceOverride = unitPriceOverride ? parseFloat(unitPriceOverride) : undefined

    const validation = validateSellingUnit(
      { name: unitName, quantity, priceOverride },
      recipe.batchYield
    )

    if (!validation.valid) {
      toast({
        title: 'Invalid selling unit',
        description: validation.errors.join(', '),
        variant: 'destructive',
      })
      return
    }

    addSellingUnit(recipe.id, {
      name: unitName.trim(),
      quantity,
      unit: recipe.batchUnit || 'piece',
      priceOverride,
      isDefault: unitIsDefault,
    })

    toast({
      title: 'Selling unit added',
      description: `"${unitName}" has been added.`,
    })

    resetForm()
    onUpdate?.()
  }

  // Handle updating a selling unit
  const handleUpdateUnit = (unitId: string) => {
    const quantity = parseFloat(unitQuantity)
    const priceOverride = unitPriceOverride ? parseFloat(unitPriceOverride) : undefined

    const validation = validateSellingUnit(
      { name: unitName, quantity, priceOverride },
      recipe.batchYield
    )

    if (!validation.valid) {
      toast({
        title: 'Invalid selling unit',
        description: validation.errors.join(', '),
        variant: 'destructive',
      })
      return
    }

    updateSellingUnit(recipe.id, unitId, {
      name: unitName.trim(),
      quantity,
      priceOverride,
      isDefault: unitIsDefault,
    })

    toast({
      title: 'Selling unit updated',
      description: `"${unitName}" has been updated.`,
    })

    resetForm()
    onUpdate?.()
  }

  // Handle removing a selling unit
  const handleRemoveUnit = (unitId: string, unitName: string) => {
    removeSellingUnit(recipe.id, unitId)
    toast({
      title: 'Selling unit removed',
      description: `"${unitName}" has been removed.`,
    })
    onUpdate?.()
  }

  // Start editing a unit
  const startEditingUnit = (unit: SellingUnit) => {
    setEditingUnitId(unit.id)
    setUnitName(unit.name)
    setUnitQuantity(unit.quantity.toString())
    setUnitPriceOverride(unit.priceOverride?.toString() || '')
    setUnitIsDefault(unit.isDefault || false)
    // Calculate current margin if price override exists
    if (unit.priceOverride) {
      const cost = costPerBaseUnit * unit.quantity
      const currentMargin = ((unit.priceOverride - cost) / unit.priceOverride) * 100
      setUnitTargetMargin(currentMargin.toFixed(0))
    } else {
      setUnitTargetMargin('')
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount.toFixed(2)}`
  }

  // Render the selling units list
  const renderSellingUnitsList = () => {
    if (!hasSellingUnits) {
      return (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
          <div className="bg-white p-3 rounded-full w-12 h-12 mx-auto mb-3 shadow-sm flex items-center justify-center">
            <Package className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">No selling units yet</h3>
          <p className="text-sm text-gray-500 mb-4 max-w-xs mx-auto">
            Define how you sell this recipe (e.g., by the dozen, single slice) to calculate prices.
          </p>
          <div className="flex flex-col gap-2 max-w-xs mx-auto">
            <Button
              onClick={handleInitializeDefaults}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Add Common Units
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsAddingUnit(true)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Custom Unit
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {sellingUnitsWithPricing.map((unit) => (
          <div
            key={unit.id}
            className={`p-3 rounded-lg border ${unit.isDefault ? 'border-rose-200 bg-rose-50' : 'border-gray-200 bg-gray-50'
              }`}
          >
            {editingUnitId === unit.id ? (
              // Edit mode
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Name</Label>
                    <Input
                      value={unitName}
                      onChange={(e) => setUnitName(e.target.value)}
                      placeholder="e.g., Quarter Pound"
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Quantity ({recipe.batchUnit})</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={unitQuantity}
                      onChange={(e) => setUnitQuantity(e.target.value)}
                      placeholder="e.g., 0.25"
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Pricing (Optional)</Label>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-[10px] text-gray-500">Target Margin %</Label>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          max="99"
                          value={unitTargetMargin}
                          onChange={(e) => {
                            setUnitTargetMargin(e.target.value)
                            // Auto-calculate price from margin
                            if (e.target.value) {
                              const margin = parseFloat(e.target.value)
                              const cost = costPerBaseUnit * parseFloat(unitQuantity || '1')
                              const calculatedPrice = calculatePriceFromMargin(cost, margin)
                              setUnitPriceOverride(calculatedPrice.toFixed(2))
                            }
                          }}
                          placeholder="e.g., 60"
                          className="h-8 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-[10px] text-gray-500">Custom Price ({currencySymbol})</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={unitPriceOverride}
                          onChange={(e) => {
                            setUnitPriceOverride(e.target.value)
                            setUnitTargetMargin('')
                          }}
                          placeholder="Or set exact price"
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-amber-600 mt-1.5">
                      💡 Leave blank to use default markup
                    </p>
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={unitIsDefault}
                        onCheckedChange={setUnitIsDefault}
                        id="edit-default"
                      />
                      <Label htmlFor="edit-default" className="text-xs">Default</Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={resetForm}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleUpdateUnit(unit.id)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              // Display mode
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{unit.name}</span>
                    {unit.isDefault && (
                      <Badge variant="secondary" className="text-xs bg-rose-100 text-rose-700">
                        <Star className="h-3 w-3 mr-1" />
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>{unit.quantity} {recipe.batchUnit}</span>
                    <span className="mx-2">•</span>
                    <span>Cost: {formatCurrency(unit.cost)}</span>
                    <span className="mx-2">•</span>
                    <span className="text-green-600 font-medium">
                      {unit.priceOverride ? 'Price: ' : 'Suggested: '}
                      {formatCurrency(unit.suggestedPrice)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {unit.profitMargin.toFixed(0)}% margin • {unit.unitsPerBatch.toFixed(1)} per batch
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => startEditingUnit(unit)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveUnit(unit.id, unit.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Render add unit form
  const renderAddUnitForm = () => {
    if (!isAddingUnit) return null

    return (
      <div className="p-3 rounded-lg border border-dashed border-gray-300 bg-white space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Name</Label>
            <Input
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              placeholder="e.g., Quarter Pound"
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs">Quantity ({recipe.batchUnit || 'units'})</Label>
            <Input
              type="number"
              step="0.01"
              value={unitQuantity}
              onChange={(e) => setUnitQuantity(e.target.value)}
              placeholder="e.g., 0.25"
              className="h-8 text-sm"
            />
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
          {showAdvanced ? 'Hide' : 'Show'} Advanced Options
        </Button>

        {showAdvanced && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Price Override (optional)</Label>
              <Input
                type="number"
                step="0.01"
                value={unitPriceOverride}
                onChange={(e) => setUnitPriceOverride(e.target.value)}
                placeholder="Auto-calculated"
                className="h-8 text-sm"
              />
            </div>
            <div className="flex items-end">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={unitIsDefault}
                  onCheckedChange={setUnitIsDefault}
                  id="add-default"
                />
                <Label htmlFor="add-default" className="text-xs">Set as default</Label>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={resetForm}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleAddUnit}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    )
  }

  // Main content
  const renderContent = () => (
    <div className="space-y-6">
      {/* Batch Yield Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Scale className="h-4 w-4 text-gray-500" />
          <Label className="font-medium">Batch Yield</Label>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex items-center">
                  <Info className="h-3 w-3 text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  How much does one batch of this recipe produce?
                  <br />
                  Example: 3 lbs of fudge, 24 cookies, 1 cake
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex gap-2">
          <Input
            type="number"
            step="0.01"
            value={batchYield}
            onChange={(e) => setBatchYieldState(e.target.value)}
            placeholder="e.g., 3"
            className="w-24"
          />
          <Select value={batchUnit} onValueChange={setBatchUnitState}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {batchUnitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveBatchYield}
            disabled={!batchYield}
          >
            Save
          </Button>
        </div>

        {/* Contextual help text with examples */}
        {!hasBatchSizes && (
          <div className="text-xs text-blue-600 bg-blue-50 p-2.5 rounded-md border border-blue-100">
            <Info className="h-3.5 w-3.5 inline mr-1.5" />
            <strong>How much does one batch make?</strong>
            {batchUnit === 'cookie' && ' Example: If this recipe makes 24 cookies, enter "24"'}
            {batchUnit === 'cupcake' && ' Example: If this recipe makes 12 cupcakes, enter "12"'}
            {batchUnit === 'piece' && ' Example: If this recipe makes 20 pieces, enter "20"'}
            {batchUnit === 'slice' && ' Example: If this recipe makes 8 slices, enter "8"'}
            {batchUnit === 'dozen' && ' Example: If this recipe makes 2 dozen, enter "2"'}
            {batchUnit === 'lb' && ' Example: If this recipe makes 3 pounds, enter "3"'}
            {batchUnit === 'oz' && ' Example: If this recipe makes 16 ounces, enter "16"'}
            {batchUnit === 'kg' && ' Example: If this recipe makes 1.5 kilograms, enter "1.5"'}
            {batchUnit === 'g' && ' Example: If this recipe makes 500 grams, enter "500"'}
            {batchUnit === 'loaf' && ' Example: If this recipe makes 2 loaves, enter "2"'}
            {!['cookie', 'cupcake', 'piece', 'slice', 'dozen', 'lb', 'oz', 'kg', 'g', 'loaf'].includes(batchUnit) &&
              ' Example: Enter the total quantity this recipe produces'}
          </div>
        )}

        {hasBatchSizes && (
          <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
            <DollarSign className="h-4 w-4 inline mr-1" />
            Cost per {batchUnit}: <strong>{formatCurrency(costPerBaseUnit)}</strong>
          </div>
        )}
      </div>

      {/* Selling Units Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-500" />
            <Label className="font-medium">Selling Units</Label>
          </div>

          {/* Quick actions moved to empty state */}

          {hasBatchSizes && hasSellingUnits && !isAddingUnit && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAddingUnit(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Unit
            </Button>
          )}
        </div>

        {!hasBatchSizes && (
          <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
            <Info className="h-4 w-4 inline mr-1" />
            Set a batch yield above to configure selling units.
          </div>
        )}

        {hasBatchSizes && (
          <>
            {/* Visual Preview of Selling Units */}
            {hasSellingUnits && (
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                <Label className="text-xs font-medium text-slate-500 mb-2 block">Batch Breakdown Preview</Label>
                <div className="space-y-3">
                  {/* Batch Bar */}
                  <div className="relative h-6 bg-blue-100 rounded-md w-full flex items-center justify-center border border-blue-200">
                    <span className="text-[10px] font-medium text-blue-700 z-10">
                      Whole Batch ({recipe.batchYield} {recipe.batchUnit})
                    </span>
                  </div>

                  {/* Unit Bars */}
                  <div className="space-y-1.5">
                    {sellingUnitsWithPricing.slice(0, 3).map(unit => {
                      // Calculate width percentage (capped at 100%)
                      const percentage = Math.min(100, (unit.quantity / (recipe.batchYield || 1)) * 100);
                      return (
                        <div key={unit.id} className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-sm h-4 overflow-hidden relative">
                            <div
                              className="h-full bg-green-100 border-r border-green-200"
                              style={{ width: `${percentage}%` }}
                            />
                            <span className="absolute inset-0 flex items-center pl-2 text-[9px] text-gray-600">
                              {unit.name} ({unit.quantity})
                            </span>
                          </div>
                          <span className="text-[9px] text-gray-400 w-8 text-right">{Math.round(percentage)}%</span>
                        </div>
                      );
                    })}
                    {sellingUnitsWithPricing.length > 3 && (
                      <p className="text-[9px] text-center text-gray-400 italic">
                        + {sellingUnitsWithPricing.length - 3} more units
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {renderAddUnitForm()}
            {renderSellingUnitsList()}
          </>
        )}
      </div>
    </div>
  )

  // Compact view for recipe cards
  if (compact) {
    return (
      <div className="mt-2">
        {hasBatchSizes && hasSellingUnits ? (
          <div className="flex flex-wrap gap-1">
            {sellingUnitsWithPricing.slice(0, 3).map((unit) => (
              <Badge key={unit.id} variant="outline" className="text-xs bg-slate-50">
                {unit.name} <span className="text-slate-500 ml-1">{formatCurrency(unit.suggestedPrice)}</span>
              </Badge>
            ))}
            {(recipe.sellingUnits?.length || 0) > 3 && (
              <Badge variant="outline" className="text-xs">
                +{(recipe.sellingUnits?.length || 0) - 3} more
              </Badge>
            )}
          </div>
        ) : (
          <Badge variant="outline" className="text-xs text-gray-500">
            <Package className="h-3 w-3 mr-1" />
            No selling units
          </Badge>
        )}
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" title='Batch Sizes &amp; Selling Units'>
          <Package className="h-4 w-4 mr-2" />
          Selling Units
          {hasSellingUnits && (
            <Badge variant="secondary" className="ml-2">
              {recipe.sellingUnits?.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Batch Sizes &amp; Selling Units</DialogTitle>
          <DialogDescription>
            <p className="text-sm mb-2">
              Configure how you sell &ldquo;{recipe.name}&rdquo; to customers.
            </p>
            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-md p-2">
              <Lightbulb className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p>• Set batch yield (how much one batch makes)</p>
                <p>• Add selling units (dozen, half dozen, single, etc.)</p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}

export default BatchSizeManager
