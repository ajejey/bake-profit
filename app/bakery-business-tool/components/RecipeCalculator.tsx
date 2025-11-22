'use client'

import React, { useState, useMemo } from 'react'
import { ChefHat, ListChecks, ClipboardList, Calculator, Lightbulb, Plus } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import {
  Trash2,
  Edit,
  Save,
  Copy,
  Clock,
  Thermometer,
  X,
  Scale,
  Package,
  Download,
  FileText,
  DollarSign,
  AlertTriangle
} from 'lucide-react'
import { SampleDataLoader } from './SampleDataLoader'
import SearchBar from './SearchBar'
import FilterChips, { type FilterOption } from './FilterChips'
import SortDropdown, { type SortOption } from './SortDropdown'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { useIngredients, useRecipes, useDefaultServings, useDefaultLaborCost, useDefaultOverhead } from '../hooks'
import { useBakeryData } from '../contexts/BakeryDataContext'
import type { Ingredient, Recipe, RecipeIngredient, RecipeCategory } from '../types'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { useSubscription } from '@/contexts/SubscriptionContext'
import UpgradePrompt from '@/components/subscription/UpgradePrompt'
import UsageIndicator from '@/components/subscription/UsageIndicator'
import { getCurrencySymbol } from '../utils/settings'
import { useCurrencySymbol } from '../hooks'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  generateRecipeCard,
  generateCostAnalysis,
  generateIngredientList,
  generateFullRecipe,
  getRecipePDFFilename
} from '../lib/pdfGenerators/recipePDF'
import Link from 'next/link'



const recipeFormSchema = z.object({
  name: z.string().min(1, { message: "Recipe name is required" }),
  description: z.string().optional(),
  category: z.string().optional(),
  servings: z.number().positive({ message: "Servings must be positive" }),
  laborCost: z.number().min(0, { message: "Labor cost cannot be negative" }),
  laborTime: z.number().min(0, { message: "Labor time cannot be negative" }),
  overheadCost: z.number().min(0, { message: "Overhead cost cannot be negative" }),
  notes: z.string().optional(),
  prepTime: z.number().min(0, { message: "Prep time cannot be negative" }).optional(),
  cookTime: z.number().min(0, { message: "Cook time cannot be negative" }).optional(),
  coolTime: z.number().min(0, { message: "Cool time cannot be negative" }).optional(),
  temperature: z.string().optional(),
})

// Unit conversion map - each row shows: "If I have 1 [fromUnit], how many [toUnit] do I get?"
const unitConversions: Record<string, Record<string, number>> = {
  // Weight conversions (FROM each unit TO other units)
  g: { g: 1, kg: 0.001, oz: 0.035274, lb: 0.00220462 },
  kg: { g: 1000, kg: 1, oz: 35.274, lb: 2.20462 },
  oz: { g: 28.3495, kg: 0.0283495, oz: 1, lb: 0.0625 },
  lb: { g: 453.592, kg: 0.453592, oz: 16, lb: 1 },

  // Volume conversions (FROM each unit TO other units)
  ml: { ml: 1, l: 0.001, cup: 0.00422675, tbsp: 0.067628, tsp: 0.202884 },
  l: { ml: 1000, l: 1, cup: 4.22675, tbsp: 67.628, tsp: 202.884 },
  cup: { ml: 236.588, l: 0.236588, cup: 1, tbsp: 16, tsp: 48 },
  tbsp: { ml: 14.7868, l: 0.0147868, cup: 0.0625, tbsp: 1, tsp: 3 },
  tsp: { ml: 4.92892, l: 0.00492892, cup: 0.0208333, tbsp: 0.333333, tsp: 1 },

  // Count conversions
  unit: { unit: 1, dozen: 0.0833333 },
  dozen: { unit: 12, dozen: 1 },
}

// Helper function to convert units
const convertUnit = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value

  // Normalize unit names to lowercase
  const from = fromUnit.toLowerCase()
  const to = toUnit.toLowerCase()

  // Check if conversion exists
  if (unitConversions[from] && unitConversions[from][to] !== undefined) {
    return value * unitConversions[from][to]
  }

  // If no direct conversion found, return original value
  console.warn(`No conversion found from ${from} to ${to}`)
  return value
}


export default function RecipeCalculator() {
  const { toast } = useToast()
  const { checkLimit } = useSubscription()

  // Load default settings
  const { servings: defaultServings } = useDefaultServings()
  const { laborCost: defaultLaborCost } = useDefaultLaborCost()
  const { overhead: defaultOverhead } = useDefaultOverhead()
  const { symbol: currencySymbol = '$' } = useCurrencySymbol()

  // Use custom hooks for data management
  const {
    ingredients,
    safeDeleteIngredient,
    getIngredientById,
  } = useIngredients()

  const {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
  } = useRecipes()

  const { recipeCategories, registerCategory } = useBakeryData()

  // UI State only
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false)
  const [isEditRecipeOpen, setIsEditRecipeOpen] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([])
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>('')
  const [ingredientQuantity, setIngredientQuantity] = useState<number>(0)
  const [ingredientUnit, setIngredientUnit] = useState<string>('')
  const [recipeInstructions, setRecipeInstructions] = useState<string[]>([])
  const [currentInstruction, setCurrentInstruction] = useState('')
  const [isScaleDialogOpen, setIsScaleDialogOpen] = useState(false)
  const [recipeToScale, setRecipeToScale] = useState<Recipe | null>(null)
  const [scaleFactor, setScaleFactor] = useState<number>(1)
  const [scaleMethod, setScaleMethod] = useState<'factor' | 'servings'>('servings')
  const [targetServings, setTargetServings] = useState<number>(1)

  // Search, Filter, Sort state
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'cost' | 'date'>('name')


  const recipeForm = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: '',
      description: '',
      servings: defaultServings,
      laborCost: defaultLaborCost,
      laborTime: 0,
      overheadCost: defaultOverhead,
      notes: '',
    },
  })


  // Helper to format currency synchronously (uses default $ symbol if not loaded yet)
  const formatCurrency = (amount: number): string => {
    return `${currencySymbol}${amount.toFixed(2)}`
  }

  // No localStorage logic needed - handled by hooks!

  // Calculate cost per unit for an ingredient
  const calculateCostPerUnit = (ingredient: Ingredient): number => {
    return ingredient.packageCost / ingredient.packageSize
  }





  // Handle deleting an ingredient
  const handleDeleteIngredient = (id: string) => {
    const result = safeDeleteIngredient(id) // Hook checks recipe usage!

    toast({
      title: result.success ? 'Ingredient deleted' : 'Cannot delete ingredient',
      description: result.message,
      variant: result.success ? 'default' : 'destructive',
    })
  }

  // Handle adding an ingredient to a recipe
  const handleAddRecipeIngredient = () => {
    if (!selectedIngredientId || ingredientQuantity <= 0) return

    const ingredient = ingredients.find(ing => ing.id === selectedIngredientId)
    if (!ingredient) return

    // Convert quantity to ingredient's base unit if needed
    let convertedQuantity = ingredientQuantity
    if (ingredientUnit !== ingredient.unit) {
      convertedQuantity = convertUnit(ingredientQuantity, ingredientUnit, ingredient.unit)
    }

    const cost = convertedQuantity * ingredient.cost

    const newRecipeIngredient: RecipeIngredient = {
      id: uuidv4(),
      ingredientId: selectedIngredientId,
      quantity: convertedQuantity,
      unit: ingredient.unit,
      cost: cost,
    }

    setRecipeIngredients([...recipeIngredients, newRecipeIngredient])

    // Reset form
    setSelectedIngredientId('')
    setIngredientQuantity(0)
    setIngredientUnit('')
  }

  // Handle removing an ingredient from a recipe
  const handleRemoveRecipeIngredient = (id: string) => {
    setRecipeIngredients(recipeIngredients.filter(ing => ing.id !== id))
  }

  // Calculate total recipe cost
  const calculateTotalRecipeCost = (recipeIngs: RecipeIngredient[], labor: number, overhead: number): number => {
    const ingredientsCost = recipeIngs.reduce((sum, ing) => sum + ing.cost, 0)
    return ingredientsCost + labor + overhead
  }

  // Calculate cost per serving
  const calculateCostPerServing = (totalCost: number, servings: number): number => {
    return servings > 0 ? totalCost / servings : 0
  }

  // Handle creating a new recipe
  const onCreateRecipe = (data: z.infer<typeof recipeFormSchema>) => {
    if (recipeIngredients.length === 0) {
      toast({
        title: 'No ingredients added',
        description: 'Please add at least one ingredient to your recipe.',
        variant: 'destructive',
      })
      return
    }

    const now = new Date().toISOString()

    // Calculate total cost and cost per serving
    const totalCost = calculateTotalRecipeCost(recipeIngredients, data.laborCost, data.overheadCost)
    const costPerServing = calculateCostPerServing(totalCost, data.servings)

    const newRecipe: Recipe = {
      id: uuidv4(),
      name: data.name,
      description: data.description || '',
      category: data.category as RecipeCategory | undefined,
      servings: data.servings,
      ingredients: recipeIngredients,
      laborCost: data.laborCost,
      laborTime: data.laborTime,
      overheadCost: data.overheadCost,
      notes: data.notes || '',
      instructions: recipeInstructions,
      prepTime: data.prepTime || 0,
      cookTime: data.cookTime || 0,
      coolTime: data.coolTime || 0,
      temperature: data.temperature || '',
      totalCost: totalCost,
      costPerServing: costPerServing,
      createdAt: now,
      updatedAt: now,
    }

    addRecipe(newRecipe) // Hook handles everything!
    setIsAddRecipeOpen(false)
    recipeForm.reset()
    setRecipeIngredients([])
    setRecipeInstructions([])

    toast({
      title: 'Recipe created',
      description: `${data.name} has been added to your recipes (Cost: ${formatCurrency(totalCost)}).`,
    })
  }

  // Handle editing a recipe
  const onEditRecipe = (data: z.infer<typeof recipeFormSchema>) => {
    if (!editingRecipe) return

    if (recipeIngredients.length === 0) {
      toast({
        title: 'No ingredients added',
        description: 'Please add at least one ingredient to your recipe.',
        variant: 'destructive',
      })
      return
    }

    // Calculate total cost and cost per serving
    const totalCost = calculateTotalRecipeCost(recipeIngredients, data.laborCost, data.overheadCost)
    const costPerServing = calculateCostPerServing(totalCost, data.servings)

    const updates: Partial<Recipe> = {
      name: data.name,
      description: data.description || '',
      category: data.category as RecipeCategory | undefined,
      servings: data.servings,
      ingredients: recipeIngredients,
      laborCost: data.laborCost,
      laborTime: data.laborTime,
      overheadCost: data.overheadCost,
      notes: data.notes || '',
      instructions: recipeInstructions,
      prepTime: data.prepTime || 0,
      cookTime: data.cookTime || 0,
      coolTime: data.coolTime || 0,
      temperature: data.temperature || '',
      totalCost: totalCost,
      costPerServing: costPerServing,
    }

    // Update recipe in-place (preserves createdAt)
    updateRecipe(editingRecipe.id, updates)

    setIsEditRecipeOpen(false)
    setEditingRecipe(null)
    recipeForm.reset()
    setRecipeIngredients([])
    setRecipeInstructions([])

    toast({
      title: 'Recipe updated',
      description: `${data.name} has been updated successfully.`,
    })
  }

  // Handle opening edit dialog
  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe)
    setRecipeIngredients(recipe.ingredients)
    setRecipeInstructions(recipe.instructions)

    recipeForm.reset({
      name: recipe.name,
      description: recipe.description,
      category: recipe.category,
      servings: recipe.servings,
      laborCost: recipe.laborCost,
      laborTime: recipe.laborTime,
      overheadCost: recipe.overheadCost,
      notes: recipe.notes,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      coolTime: recipe.coolTime,
      temperature: recipe.temperature,
    })

    setIsEditRecipeOpen(true)
  }

  // Handle Add Recipe button click with limit check
  const handleAddRecipeClick = async () => {
    const limitCheck = await checkLimit('recipes');

    if (!limitCheck.allowed) {
      toast({
        title: 'Recipe limit reached',
        description: limitCheck.message,
        variant: 'destructive',
      });
      return;
    }

    setIsAddRecipeOpen(true);
  };

  // Handle selecting a recipe to view
  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
  }

  // Handle duplicating a recipe
  const handleDuplicateRecipe = async (recipe: Recipe) => {
    // Check limit before duplicating
    const limitCheck = await checkLimit('recipes');

    if (!limitCheck.allowed) {
      toast({
        title: 'Recipe limit reached',
        description: limitCheck.message,
        variant: 'destructive',
      });
      return;
    }

    const duplicatedRecipe = {
      ...recipe,
      id: uuidv4(),
      name: `${recipe.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    addRecipe(duplicatedRecipe)
    toast({
      title: 'Recipe duplicated',
      description: `${recipe.name} has been copied.`,
    })
  }

  // Handle deleting a recipe
  const handleDeleteRecipe = (id: string) => {
    deleteRecipe(id)

    if (selectedRecipe?.id === id) {
      setSelectedRecipe(null)
    }

    toast({
      title: 'Recipe deleted',
      description: 'The recipe has been removed.',
    })
  }

  // Handle PDF export
  const handleExportPDF = (recipe: Recipe, type: 'card' | 'cost-analysis' | 'ingredient-list' | 'full') => {
    let pdf
    let typeName = ''

    switch (type) {
      case 'card':
        pdf = generateRecipeCard(recipe, ingredients, { currencySymbol })
        typeName = 'Recipe Card'
        break
      case 'cost-analysis':
        pdf = generateCostAnalysis(recipe, ingredients, { currencySymbol })
        typeName = 'Cost Analysis'
        break
      case 'ingredient-list':
        pdf = generateIngredientList(recipe, ingredients, { currencySymbol })
        typeName = 'Ingredient List'
        break
      case 'full':
        pdf = generateFullRecipe(recipe, ingredients, { currencySymbol })
        typeName = 'Full Recipe'
        break
    }

    const filename = getRecipePDFFilename(recipe, type)
    pdf.save(filename)

    toast({
      title: 'PDF Downloaded',
      description: `${typeName} has been saved as PDF.`,
    })
  }

  // Get ingredient name by ID
  const getIngredientName = (id: string): string => {
    const ingredient = getIngredientById(id)
    return ingredient ? ingredient.name : 'Unknown'
  }

  // Get available units for an ingredient
  const getAvailableUnits = (ingredientId: string): string[] => {
    const ingredient = ingredients.find(ing => ing.id === ingredientId)
    if (!ingredient) return []

    const category = Object.keys(unitConversions).find(unit =>
      unitConversions[unit][ingredient.unit] !== undefined
    )

    if (!category) return [ingredient.unit]

    return Object.keys(unitConversions[category])
  }

  // Filter and sort recipes
  const filteredAndSortedRecipes = useMemo(() => {
    let filtered = recipes.filter(recipe => {
      // Search filter
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchLower) ||
        recipe.description?.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false

      // Category filter
      if (filterCategory !== 'all' && recipe.category !== filterCategory) return false

      return true
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'cost':
          return a.totalCost - b.totalCost
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [recipes, searchTerm, filterCategory, sortBy])

  // Handle opening scale dialog
  const handleOpenScaleDialog = (recipe: Recipe) => {
    setRecipeToScale(recipe)
    setTargetServings(recipe.servings)
    setScaleFactor(1)
    setScaleMethod('servings')
    setIsScaleDialogOpen(true)
  }

  // Smart formatting helpers
  const roundEggs = (quantity: number): string => {
    const whole = Math.floor(quantity)
    const fraction = quantity - whole

    if (fraction < 0.125) return whole.toString()
    if (fraction < 0.375) return whole > 0 ? `${whole} + 1/4` : '1/4'
    if (fraction < 0.625) return whole > 0 ? `${whole} + 1/2` : '1/2'
    if (fraction < 0.875) return whole > 0 ? `${whole} + 3/4` : '3/4'
    return (whole + 1).toString()
  }

  const formatQuantity = (quantity: number, unit: string, ingredientName: string): string => {
    // Special handling for eggs
    if (unit === 'unit' && ingredientName.toLowerCase().includes('egg')) {
      return roundEggs(quantity)
    }

    // For very small quantities, show more precision
    if (quantity < 0.1) return quantity.toFixed(3)
    if (quantity < 1) return quantity.toFixed(2)
    if (quantity < 10) return quantity.toFixed(1)

    // For larger quantities, round to whole numbers
    return Math.round(quantity).toString()
  }

  // Calculate scaled values
  const getScaledIngredients = () => {
    if (!recipeToScale) return []

    const factor = scaleMethod === 'servings'
      ? targetServings / recipeToScale.servings
      : scaleFactor

    return recipeToScale.ingredients.map(ing => ({
      ...ing,
      quantity: ing.quantity * factor,
      cost: ing.cost * factor,
    }))
  }

  const getScaledTotals = () => {
    if (!recipeToScale) return { totalCost: 0, costPerServing: 0, servings: 0 }

    const factor = scaleMethod === 'servings'
      ? targetServings / recipeToScale.servings
      : scaleFactor

    const scaledServings = Math.round(recipeToScale.servings * factor)
    const totalCost = recipeToScale.totalCost * factor
    const costPerServing = totalCost / scaledServings

    return { totalCost, costPerServing, servings: scaledServings }
  }

  // Save scaled recipe as new recipe
  const handleSaveScaledRecipe = () => {
    if (!recipeToScale) return

    const factor = scaleMethod === 'servings'
      ? targetServings / recipeToScale.servings
      : scaleFactor

    const scaledServings = Math.round(recipeToScale.servings * factor)
    const scaledIngredients = getScaledIngredients()
    const totalCost = recipeToScale.totalCost * factor

    const newRecipe: Recipe = {
      ...recipeToScale,
      id: uuidv4(),
      name: `${recipeToScale.name} (${factor}x)`,
      servings: scaledServings,
      ingredients: scaledIngredients,
      totalCost,
      costPerServing: totalCost / scaledServings,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addRecipe(newRecipe)
    setIsScaleDialogOpen(false)

    toast({
      title: 'Scaled recipe saved',
      description: `Created "${newRecipe.name}" with ${scaledServings} servings`,
    })
  }


  return (
    <div>
      {/* <TabsContent value="recipes" className="mt-6"> */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recipes</h2>
        <Dialog open={isAddRecipeOpen} onOpenChange={setIsAddRecipeOpen}>
          <Button
            className="flex items-center gap-2"
            onClick={handleAddRecipeClick}
          >
            <Plus className="h-4 w-4" />
            Add Recipe
          </Button>
          <DialogContent className="max-w-[95vw] lg:max-w-7xl max-h-[85vh] overflow-y-auto">
            <DialogHeader className="flex flex-row items-center justify-between">
              <div>
                <DialogTitle>Create New Recipe</DialogTitle>
                <DialogDescription>
                  Create a new recipe with ingredients, labor, and overhead costs.
                </DialogDescription>
              </div>
              <Button
                onClick={recipeForm.handleSubmit(onCreateRecipe)}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Create Recipe
              </Button>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Form {...recipeForm}>
                  <form className="space-y-4">
                    <FormField
                      control={recipeForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipe Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Chocolate Chip Cookies" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={recipeForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Brief description of the recipe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={recipeForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input
                              list="recipe-categories"
                              placeholder="Type or select a category..."
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                // Auto-register new category when user types
                                const category: RecipeCategory = e.target.value.trim() as RecipeCategory;
                                if (category && !recipeCategories.includes(category)) {
                                  registerCategory(category)
                                }
                              }}
                            />
                          </FormControl>
                          <datalist id="recipe-categories">
                            {recipeCategories.map((category) => (
                              <option key={category} value={category} />
                            ))}
                          </datalist>
                          <FormDescription className="text-xs">
                            Type to create a new category or select from existing ones
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={recipeForm.control}
                      name="servings"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Servings/Yield</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={field.value ?? ''}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={recipeForm.control}
                        name="laborTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Labor Time (minutes)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={recipeForm.control}
                        name="laborCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Labor Cost ({currencySymbol})</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={recipeForm.control}
                      name="overheadCost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overhead Cost ({currencySymbol})</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormDescription>
                            Include costs like electricity, packaging, etc.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={recipeForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Additional notes about the recipe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium mb-3">Timing & Temperature</h4>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <FormField
                          control={recipeForm.control}
                          name="prepTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prep Time (min)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="30"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={recipeForm.control}
                          name="cookTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bake Time (min)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="45"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={recipeForm.control}
                          name="coolTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cool Time (min)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="20"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={recipeForm.control}
                          name="temperature"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Temperature</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="350°F or 180°C"
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Baking Instructions</h4>
                        <div className="space-y-2">
                          {recipeInstructions.map((instruction, index) => (
                            <div key={index} className="flex gap-2 items-start">
                              <span className="text-sm font-medium mt-2 min-w-[24px]">{index + 1}.</span>
                              <Input
                                value={instruction}
                                onChange={(e) => {
                                  const updated = [...recipeInstructions]
                                  updated[index] = e.target.value
                                  setRecipeInstructions(updated)
                                }}
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setRecipeInstructions(recipeInstructions.filter((_, i) => i !== index))
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <div className="flex gap-2">
                            <Input
                              placeholder="Enter next step..."
                              value={currentInstruction}
                              onChange={(e) => setCurrentInstruction(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && currentInstruction.trim()) {
                                  e.preventDefault()
                                  setRecipeInstructions([...recipeInstructions, currentInstruction.trim()])
                                  setCurrentInstruction('')
                                }
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                if (currentInstruction.trim()) {
                                  setRecipeInstructions([...recipeInstructions, currentInstruction.trim()])
                                  setCurrentInstruction('')
                                }
                              }}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Step
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>

              <div className="space-y-6">
                {!ingredients.length && (
                  <div className="flex flex-col items-center justify-center p-6 text-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                    <AlertTriangle className="h-10 w-10 text-amber-500 mb-2" />
                    <h3 className="text-lg font-medium mb-1">No ingredients available</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      You need to add ingredients to your inventory before creating recipes.
                    </p>
                    <Link
                      href="/bakery-business-tool/inventory"
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add ingredients to inventory
                    </Link>
                  </div>
                )}


                {/* Section Header */}
                <div className="flex items-center gap-2 pb-3 border-b">
                  <Scale className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Recipe Ingredients</h3>
                </div>

                {/* Add Ingredient Form */}
                <Card className="bg-gradient-to-br gap-2 from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Ingredient
                    </CardTitle>
                    {/* <CardDescription className="text-xs">
                          Select an ingredient, specify quantity, and choose the unit of measurement
                        </CardDescription> */}
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Ingredient</Label>
                      <Select
                        value={selectedIngredientId}
                        onValueChange={(value) => {
                          setSelectedIngredientId(value)
                          const ingredient = ingredients.find(ing => ing.id === value)
                          if (ingredient) {
                            setIngredientUnit(ingredient.unit)
                          }
                        }}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Choose an ingredient..." />
                        </SelectTrigger>
                        <SelectContent>
                          {ingredients.map((ing) => (
                            <SelectItem key={ing.id} value={ing.id}>
                              <div className="flex items-center justify-between w-full">
                                <span>{ing.name}</span>
                                <span className="text-xs text-gray-500 ml-2">({ing.unit})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">Quantity</Label>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          value={ingredientQuantity || ''}
                          onChange={(e) => setIngredientQuantity(parseFloat(e.target.value))}
                          className="bg-white"
                          disabled={!selectedIngredientId}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">Unit</Label>
                        <Select
                          value={ingredientUnit}
                          onValueChange={setIngredientUnit}
                          disabled={!selectedIngredientId}
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedIngredientId &&
                              getAvailableUnits(selectedIngredientId).map((unit) => (
                                <SelectItem key={unit} value={unit}>
                                  {unit}
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleAddRecipeIngredient}
                      disabled={!selectedIngredientId || !ingredientQuantity || !ingredientUnit}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Recipe
                    </Button>
                  </CardContent>
                </Card>

                {/* Ingredients List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-700">
                      Ingredients List
                      {recipeIngredients.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {recipeIngredients.length}
                        </Badge>
                      )}
                    </h4>
                  </div>

                  {recipeIngredients.length === 0 ? (
                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <Package className="h-12 w-12 text-gray-300 mb-3" />
                        <p className="text-sm text-gray-500 mb-1">No ingredients added yet</p>
                        <p className="text-xs text-gray-400">Add ingredients above to build your recipe</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="border rounded-lg overflow-hidden bg-white">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="font-semibold">Ingredient</TableHead>
                            <TableHead className="font-semibold">Quantity</TableHead>
                            <TableHead className="font-semibold">Cost</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recipeIngredients.map((ing) => (
                            <TableRow key={ing.id} className="hover:bg-gray-50 transition-colors">
                              <TableCell className="font-medium">{getIngredientName(ing.ingredientId)}</TableCell>
                              <TableCell>
                                <span className="text-sm">
                                  {ing.quantity} <span className="text-gray-500">{ing.unit}</span>
                                </span>
                              </TableCell>
                              <TableCell className="font-mono text-sm">{formatCurrency(ing.cost)}</TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveRecipeIngredient(ing.id)}
                                  className="hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>

                {/* Cost Summary */}
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Calculator className="h-4 w-4" />
                      Cost Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Ingredients Cost:</span>
                        <span className="font-mono font-medium">
                          {formatCurrency(recipeIngredients.reduce((sum, ing) => sum + ing.cost, 0))}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Labor Cost:</span>
                        <span className="font-mono font-medium">
                          {formatCurrency(Number(recipeForm.watch('laborCost')) || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Overhead Cost:</span>
                        <span className="font-mono font-medium">
                          {formatCurrency(Number(recipeForm.watch('overheadCost')) || 0)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-green-200 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Total Recipe Cost:</span>
                        <span className="font-mono text-lg font-bold text-green-700">
                          {formatCurrency(
                            calculateTotalRecipeCost(
                              recipeIngredients,
                              Number(recipeForm.watch('laborCost')) || 0,
                              Number(recipeForm.watch('overheadCost')) || 0
                            )
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-green-100">
                        <span className="text-sm text-gray-600">Cost per Serving:</span>
                        <span className="font-mono text-sm font-semibold text-green-600">
                          {formatCurrency(
                            calculateCostPerServing(
                              calculateTotalRecipeCost(
                                recipeIngredients,
                                Number(recipeForm.watch('laborCost')) || 0,
                                Number(recipeForm.watch('overheadCost')) || 0
                              ),
                              Number(recipeForm.watch('servings')) || 1
                            )
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" onClick={recipeForm.handleSubmit(onCreateRecipe)}>
                Create Recipe
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Recipe Dialog */}
        <Dialog open={isEditRecipeOpen} onOpenChange={setIsEditRecipeOpen}>
          <DialogContent className="max-w-[95vw] lg:max-w-7xl max-h-[85vh] overflow-y-auto">
            <DialogHeader className="flex flex-row items-center justify-between">
              <div>
                <DialogTitle>Edit Recipe</DialogTitle>
                <DialogDescription>
                  Update recipe details, ingredients, labor, and overhead costs.
                </DialogDescription>
              </div>
              <Button
                onClick={recipeForm.handleSubmit(onEditRecipe)}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Form {...recipeForm}>
                  <form className="space-y-4">
                    <FormField
                      control={recipeForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipe Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Chocolate Chip Cookies" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={recipeForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Brief description of the recipe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={recipeForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input
                              list="recipe-categories-edit"
                              placeholder="Type or select a category..."
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                const category: RecipeCategory = e.target.value.trim() as RecipeCategory;
                                if (category && !recipeCategories.includes(category)) {
                                  registerCategory(category)
                                }
                              }}
                            />
                          </FormControl>
                          <datalist id="recipe-categories-edit">
                            {recipeCategories.map((category) => (
                              <option key={category} value={category} />
                            ))}
                          </datalist>
                          <FormDescription className="text-xs">
                            Type to create a new category or select from existing ones
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={recipeForm.control}
                      name="servings"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Servings/Yield</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={field.value ?? ''}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={recipeForm.control}
                        name="laborTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Labor Time (minutes)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={recipeForm.control}
                        name="laborCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Labor Cost ({currencySymbol})</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={recipeForm.control}
                      name="overheadCost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overhead Cost ({currencySymbol})</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormDescription>
                            Include costs like electricity, packaging, etc.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={recipeForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Additional notes about the recipe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium mb-3">Timing & Temperature</h4>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <FormField
                          control={recipeForm.control}
                          name="prepTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prep Time (min)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="30"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={recipeForm.control}
                          name="cookTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bake Time (min)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="45"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={recipeForm.control}
                          name="coolTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cool Time (min)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="20"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={recipeForm.control}
                          name="temperature"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Temperature</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="350°F or 180°C"
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Baking Instructions</h4>
                        <div className="space-y-2">
                          {recipeInstructions.map((instruction, index) => (
                            <div key={index} className="flex gap-2 items-start">
                              <span className="text-sm font-medium mt-2 min-w-[24px]">{index + 1}.</span>
                              <Input
                                value={instruction}
                                onChange={(e) => {
                                  const updated = [...recipeInstructions]
                                  updated[index] = e.target.value
                                  setRecipeInstructions(updated)
                                }}
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setRecipeInstructions(recipeInstructions.filter((_, i) => i !== index))
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <div className="flex gap-2">
                            <Input
                              placeholder="Enter next step..."
                              value={currentInstruction}
                              onChange={(e) => setCurrentInstruction(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && currentInstruction.trim()) {
                                  e.preventDefault()
                                  setRecipeInstructions([...recipeInstructions, currentInstruction.trim()])
                                  setCurrentInstruction('')
                                }
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                if (currentInstruction.trim()) {
                                  setRecipeInstructions([...recipeInstructions, currentInstruction.trim()])
                                  setCurrentInstruction('')
                                }
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>

              <div className="space-y-6">
                {!ingredients.length && (
                  <div className="flex flex-col items-center justify-center p-6 text-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                    <AlertTriangle className="h-10 w-10 text-amber-500 mb-2" />
                    <h3 className="text-lg font-medium mb-1">No ingredients available</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      You need to add ingredients to your inventory before editing recipes.
                    </p>
                    <Link
                      href="/bakery-business-tool/inventory"
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add ingredients to inventory
                    </Link>
                  </div>
                )}

                {/* Section Header */}
                <div className="flex items-center gap-2 pb-3 border-b">
                  <Scale className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Recipe Ingredients</h3>
                </div>

                {/* Add Ingredient Form */}
                <Card className="bg-gradient-to-br gap-2 from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Ingredient
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Ingredient</Label>
                      <Select
                        value={selectedIngredientId}
                        onValueChange={(value) => {
                          setSelectedIngredientId(value)
                          const ingredient = ingredients.find(ing => ing.id === value)
                          if (ingredient) {
                            setIngredientUnit(ingredient.unit)
                          }
                        }}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Choose an ingredient..." />
                        </SelectTrigger>
                        <SelectContent>
                          {ingredients.map((ing) => (
                            <SelectItem key={ing.id} value={ing.id}>
                              <div className="flex items-center justify-between w-full">
                                <span>{ing.name}</span>
                                <span className="text-xs text-gray-500 ml-2">({ing.unit})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">Quantity</Label>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          value={ingredientQuantity || ''}
                          onChange={(e) => setIngredientQuantity(parseFloat(e.target.value))}
                          className="bg-white"
                          disabled={!selectedIngredientId}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">Unit</Label>
                        <Select
                          value={ingredientUnit}
                          onValueChange={setIngredientUnit}
                          disabled={!selectedIngredientId}
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedIngredientId &&
                              getAvailableUnits(selectedIngredientId).map((unit) => (
                                <SelectItem key={unit} value={unit}>
                                  {unit}
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleAddRecipeIngredient}
                      disabled={!selectedIngredientId || !ingredientQuantity || !ingredientUnit}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Recipe
                    </Button>
                  </CardContent>
                </Card>

                {/* Ingredients List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-700">
                      Ingredients List
                      {recipeIngredients.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {recipeIngredients.length}
                        </Badge>
                      )}
                    </h4>
                  </div>

                  {recipeIngredients.length === 0 ? (
                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <Package className="h-12 w-12 text-gray-300 mb-3" />
                        <p className="text-sm text-gray-500 mb-1">No ingredients added yet</p>
                        <p className="text-xs text-gray-400">Add ingredients above to build your recipe</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="border rounded-lg overflow-hidden bg-white">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="font-semibold">Ingredient</TableHead>
                            <TableHead className="font-semibold">Quantity</TableHead>
                            <TableHead className="font-semibold">Cost</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recipeIngredients.map((ing) => (
                            <TableRow key={ing.id} className="hover:bg-gray-50 transition-colors">
                              <TableCell className="font-medium">{getIngredientName(ing.ingredientId)}</TableCell>
                              <TableCell>
                                <span className="text-sm">
                                  {ing.quantity} <span className="text-gray-500">{ing.unit}</span>
                                </span>
                              </TableCell>
                              <TableCell className="font-mono text-sm">{formatCurrency(ing.cost)}</TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveRecipeIngredient(ing.id)}
                                  className="hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader>
                    <CardTitle className="text-lg">Cost Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Ingredients Cost:</span>
                        <span className="font-mono font-medium">
                          {formatCurrency(recipeIngredients.reduce((sum, ing) => sum + ing.cost, 0))}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Labor Cost:</span>
                        <span className="font-mono font-medium">
                          {formatCurrency(Number(recipeForm.watch('laborCost')) || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Overhead Cost:</span>
                        <span className="font-mono font-medium">
                          {formatCurrency(Number(recipeForm.watch('overheadCost')) || 0)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-green-200 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Total Recipe Cost:</span>
                        <span className="font-mono text-lg font-bold text-green-700">
                          {formatCurrency(
                            calculateTotalRecipeCost(
                              recipeIngredients,
                              Number(recipeForm.watch('laborCost')) || 0,
                              Number(recipeForm.watch('overheadCost')) || 0
                            )
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-green-100">
                        <span className="text-sm text-gray-600">Cost per Serving:</span>
                        <span className="font-mono text-sm font-semibold text-green-600">
                          {formatCurrency(
                            calculateCostPerServing(
                              calculateTotalRecipeCost(
                                recipeIngredients,
                                Number(recipeForm.watch('laborCost')) || 0,
                                Number(recipeForm.watch('overheadCost')) || 0
                              ),
                              Number(recipeForm.watch('servings')) || 1
                            )
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" onClick={recipeForm.handleSubmit(onEditRecipe)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      {recipes.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <div className="space-y-4">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search recipes by name or description..."
                className="w-full"
              />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <FilterChips
                  options={[
                    { id: 'all', label: 'All', count: recipes.length },
                    ...recipeCategories.map(cat => ({
                      id: cat,
                      label: cat,
                      count: recipes.filter(r => r.category === cat).length
                    }))
                  ]}
                  activeFilter={filterCategory}
                  onChange={setFilterCategory}
                />

                <SortDropdown
                  options={[
                    { id: 'name', label: 'Name (A-Z)' },
                    { id: 'cost', label: 'Cost (Low to High)' },
                    { id: 'date', label: 'Recently Added' },
                  ]}
                  value={sortBy}
                  onChange={(v) => setSortBy(v as any)}
                />
              </div>
            </div>
          </CardHeader>
        </Card>
      )}

      {recipes.length === 0 ? (
        <Card className="border-2 border-dashed border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50">
          <CardContent className="pt-8 pb-8 px-6">
            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-rose-100 flex items-center justify-center">
                <ChefHat className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Recipe Cost Calculator!</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start building your recipe collection to calculate exact costs and profit margins for your baked goods.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex items-center mb-2">
                    <ListChecks className="h-5 w-5 text-rose-500 mr-2" />
                    <h4 className="font-medium text-gray-900">Step 1: Add Ingredients</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Add your baking ingredients to inventory first. Each ingredient needs:
                  </p>
                  <ul className="text-xs text-gray-500 mt-2 space-y-1 text-left">
                    <li>• Name and unit (g, cups, ml, etc.)</li>
                    <li>• Package size and cost</li>
                    <li>• Cost per unit (auto-calculated)</li>
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full"
                    onClick={() => window.location.href = '/bakery-business-tool/inventory'}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Ingredients
                  </Button>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex items-center mb-2">
                    <ClipboardList className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="font-medium text-gray-900">Step 2: Create Recipe</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Build your recipe with:
                  </p>
                  <ul className="text-xs text-gray-500 mt-2 space-y-1 text-left">
                    <li>• Recipe name and category</li>
                    <li>• Ingredients with quantities</li>
                    <li>• Baking instructions</li>
                    <li>• Servings and timing</li>
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full"
                    onClick={() => setIsAddRecipeOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Create Recipe
                  </Button>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex items-center mb-2">
                    <Calculator className="h-5 w-5 text-green-500 mr-2" />
                    <h4 className="font-medium text-gray-900">Step 3: Calculate Costs</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Get instant cost breakdowns:
                  </p>
                  <ul className="text-xs text-gray-500 mt-2 space-y-1 text-left">
                    <li>• Ingredient costs per serving</li>
                    <li>• Labor and overhead costs</li>
                    <li>• Profit margin calculations</li>
                    <li>• Pricing recommendations</li>
                  </ul>
                  <div className="mt-3 text-xs text-green-600 font-medium">
                    ✓ Automatic calculations
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 max-w-2xl mx-auto">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Pro Tips for Getting Started
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800 text-left">
                  <div>
                    <strong>Start Simple:</strong> Begin with 3-5 basic ingredients like flour, sugar, butter, eggs
                  </div>
                  <div>
                    <strong>Be Accurate:</strong> Use kitchen scales for precise measurements
                  </div>
                  <div>
                    <strong>Include Everything:</strong> Don&apos;t forget packaging, utilities, and your time
                  </div>
                  <div>
                    <strong>Test & Adjust:</strong> Start with one recipe and refine your process
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Button
                  onClick={() => setIsAddRecipeOpen(true)}
                  className="bg-rose-500 hover:bg-rose-600 w-full sm:w-auto"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Recipe
                </Button>
                <SampleDataLoader
                  target="recipes"
                  buttonText="Load Sample Recipes"
                  size="lg"
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : filteredAndSortedRecipes.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500 mb-2">No recipes found</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{recipe.name}</CardTitle>
                    {recipe.category && (
                      <Badge variant="secondary" className="mt-1">
                        {recipe.category}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditRecipe(recipe)}
                      title="Edit recipe"
                    >
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button title='Download' variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Export as PDF</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleExportPDF(recipe, 'card')}>
                          <ChefHat className="h-4 w-4 mr-2" />
                          Recipe Card
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExportPDF(recipe, 'cost-analysis')}>
                          <DollarSign className="h-4 w-4 mr-2" />
                          Cost Analysis
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExportPDF(recipe, 'ingredient-list')}>
                          <Package className="h-4 w-4 mr-2" />
                          Ingredient List
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExportPDF(recipe, 'full')}>
                          <FileText className="h-4 w-4 mr-2" />
                          Full Recipe
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="ghost"
                      size="icon"
                      title='Duplicate Recipe'
                      onClick={() => handleDuplicateRecipe(recipe)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title='Delete Recipe'
                      onClick={() => handleDeleteRecipe(recipe.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Servings:</span>
                    <span>{recipe.servings}</span>
                  </div>
                  {(recipe.prepTime || recipe.cookTime) && (
                    <div className="flex justify-between text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Time:
                      </span>
                      <span>
                        {[
                          recipe.prepTime && `${recipe.prepTime}m prep`,
                          recipe.cookTime && `${recipe.cookTime}m bake`,
                          recipe.coolTime && `${recipe.coolTime}m cool`
                        ].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Ingredients:</span>
                    <span>{recipe.ingredients.length}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total Cost:</span>
                    <span>
                      {formatCurrency(
                        calculateTotalRecipeCost(
                          recipe.ingredients,
                          recipe.laborCost,
                          recipe.overheadCost
                        )
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cost per Serving:</span>
                    <span>
                      {formatCurrency(
                        calculateCostPerServing(
                          calculateTotalRecipeCost(
                            recipe.ingredients,
                            recipe.laborCost,
                            recipe.overheadCost
                          ),
                          recipe.servings
                        )
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleSelectRecipe(recipe)}
                  >
                    <ChefHat className="h-4 w-4 mr-2" />
                    View Recipe
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    title='Scale Recipe'
                    onClick={() => handleOpenScaleDialog(recipe)}
                  >
                    <Scale className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <Dialog open={!!selectedRecipe} onOpenChange={(open) => !open && setSelectedRecipe(null)}>
          <DialogContent className="max-w-[95vw] lg:max-w-7xl h-[calc(100vh-12rem)] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-2xl">{selectedRecipe.name}</DialogTitle>
                {selectedRecipe.category && (
                  <Badge variant="secondary">{selectedRecipe.category}</Badge>
                )}
              </div>
              <DialogDescription>{selectedRecipe.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Timing & Temperature */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="text-xs text-gray-500 mb-1">Servings</div>
                  <div className="font-medium">{selectedRecipe.servings}</div>
                </div>
                {typeof selectedRecipe.prepTime === 'number' && selectedRecipe.prepTime > 0 && (
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Prep Time
                    </div>
                    <div className="font-medium">{selectedRecipe.prepTime} min</div>
                  </div>
                )}
                {typeof selectedRecipe.cookTime === 'number' && selectedRecipe.cookTime > 0 && (
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Bake Time
                    </div>
                    <div className="font-medium">{selectedRecipe.cookTime} min</div>
                  </div>
                )}
                {typeof selectedRecipe.coolTime === 'number' && selectedRecipe.coolTime > 0 && (
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Cool Time
                    </div>
                    <div className="font-medium">{selectedRecipe.coolTime} min</div>
                  </div>
                )}
                {selectedRecipe.temperature && (
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Thermometer className="h-3 w-3" />
                      Temperature
                    </div>
                    <div className="font-medium">{selectedRecipe.temperature}</div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ingredients */}
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Ingredients
                  </h3>
                  <div className="space-y-2">
                    {selectedRecipe.ingredients.map((ing) => (
                      <div key={ing.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Checkbox />
                        <span className="flex-1">
                          {getIngredientName(ing.ingredientId)}
                        </span>
                        <span className="text-sm text-gray-600">
                          {ing.quantity} {ing.unit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Cost Breakdown */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-3">Cost Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Ingredients:</span>
                        <span>{formatCurrency(selectedRecipe.ingredients.reduce((sum, ing) => sum + ing.cost, 0))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Labor:</span>
                        <span>{formatCurrency(selectedRecipe.laborCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overhead:</span>
                        <span>{formatCurrency(selectedRecipe.overheadCost)}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t">
                        <span>Total:</span>
                        <span>
                          {formatCurrency(calculateTotalRecipeCost(
                            selectedRecipe.ingredients,
                            selectedRecipe.laborCost,
                            selectedRecipe.overheadCost
                          ))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Per Serving:</span>
                        <span>
                          {formatCurrency(calculateCostPerServing(
                            calculateTotalRecipeCost(
                              selectedRecipe.ingredients,
                              selectedRecipe.laborCost,
                              selectedRecipe.overheadCost
                            ),
                            selectedRecipe.servings
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <ChefHat className="h-5 w-5" />
                    Instructions
                  </h3>
                  {selectedRecipe.instructions && selectedRecipe.instructions.length > 0 ? (
                    <ol className="space-y-3">
                      {selectedRecipe.instructions.map((instruction, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="flex-1 pt-0.5">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-gray-500 italic">No instructions added yet.</p>
                  )}

                  {/* Notes */}
                  {selectedRecipe.notes && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                      <h4 className="font-medium mb-2 text-blue-900">Baker&apos;s Notes</h4>
                      <p className="text-sm text-blue-800">{selectedRecipe.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {/* </TabsContent> */}

      {/* </Tabs> */}

      {/* Scale Recipe Dialog */}
      <Dialog open={isScaleDialogOpen} onOpenChange={setIsScaleDialogOpen}>
        <DialogContent className="max-w-[95vw] lg:max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Scale className="h-6 w-6 text-blue-600" />
              Scale Recipe
            </DialogTitle>
            <DialogDescription className="text-base">
              {recipeToScale?.name}
            </DialogDescription>
          </DialogHeader>

          {recipeToScale && (
            <div className="space-y-6">
              {/* Main Scaling Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Side: INPUT */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</div>
                    Choose how to scale
                  </div>

                  {/* Method Toggle */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${scaleMethod === 'servings'
                        ? 'border-blue-600 bg-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                      onClick={() => setScaleMethod('servings')}
                    >
                      <Package className={`h-5 w-5 ${scaleMethod === 'servings' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${scaleMethod === 'servings' ? 'text-blue-900' : 'text-gray-600'}`}>
                        By Servings
                      </span>
                    </button>
                    <button
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${scaleMethod === 'factor'
                        ? 'border-blue-600 bg-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                      onClick={() => setScaleMethod('factor')}
                    >
                      <Calculator className={`h-5 w-5 ${scaleMethod === 'factor' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${scaleMethod === 'factor' ? 'text-blue-900' : 'text-gray-600'}`}>
                        By Multiplier
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mt-6 mb-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</div>
                    Set your target
                  </div>

                  {/* Scaling Input */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                    <div className="grid grid-cols-5 gap-3 items-center">
                      {/* Original */}
                      <div className="col-span-2 text-center">
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Original</div>
                        <div className="text-3xl font-bold text-gray-900">{recipeToScale.servings}</div>
                        <div className="text-xs text-gray-600 mt-1">servings</div>
                      </div>

                      {/* Arrow */}
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-bold">→</span>
                        </div>
                      </div>

                      {/* Target */}
                      <div className="col-span-2 text-center">
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Target</div>
                        {scaleMethod === 'servings' ? (
                          <>
                            <Input
                              type="number"
                              min="1"
                              value={targetServings}
                              onChange={(e) => setTargetServings(parseInt(e.target.value) || 1)}
                              className="text-3xl font-bold h-auto py-2 text-center border-2 border-blue-300 focus:border-blue-500"
                            />
                            <div className="text-xs text-gray-600 mt-1">servings</div>
                          </>
                        ) : (
                          <>
                            <Input
                              type="number"
                              step="0.1"
                              min="0.1"
                              value={scaleFactor}
                              onChange={(e) => setScaleFactor(parseFloat(e.target.value) || 1)}
                              className="text-3xl font-bold h-auto py-2 text-center border-2 border-blue-300 focus:border-blue-500"
                            />
                            <div className="text-xs text-gray-600 mt-1">multiplier</div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quick Presets for Factor */}
                    {scaleMethod === 'factor' && (
                      <div className="mt-4 pt-4 border-t border-gray-300">
                        <div className="text-xs text-gray-600 mb-2">Quick presets:</div>
                        <div className="grid grid-cols-5 gap-2">
                          {[0.5, 1, 2, 3, 4].map((factor) => (
                            <Button
                              key={factor}
                              size="sm"
                              variant={scaleFactor === factor ? "default" : "outline"}
                              onClick={() => setScaleFactor(factor)}
                              className="text-xs"
                            >
                              {factor}×
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Scale Indicator */}
                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <div className="flex items-center justify-center gap-2">
                        <Scale className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Scaling by</span>
                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full font-bold text-sm">
                          {(scaleMethod === 'servings'
                            ? targetServings / recipeToScale.servings
                            : scaleFactor
                          ).toFixed(2)}×
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: PREVIEW */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">✓</div>
                    Live Preview
                  </div>

                  {/* Cost Summary Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                      <div className="text-xs text-blue-700 font-medium mb-1">Servings</div>
                      <div className="text-2xl font-bold text-blue-900">{getScaledTotals().servings}</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                      <div className="text-xs text-green-700 font-medium mb-1">Total Cost</div>
                      <div className="text-xl font-bold text-green-900">
                        {formatCurrency(getScaledTotals().totalCost)}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
                      <div className="text-xs text-purple-700 font-medium mb-1">Per Serving</div>
                      <div className="text-xl font-bold text-purple-900">
                        {formatCurrency(getScaledTotals().costPerServing)}
                      </div>
                    </div>
                  </div>

                  {/* Ingredients List */}
                  <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <ListChecks className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-semibold text-gray-700">
                          Ingredients ({getScaledIngredients().length})
                        </span>
                      </div>
                    </div>
                    <div className="max-h-[280px] overflow-y-auto">
                      {getScaledIngredients().map((ing, index) => {
                        const ingredientName = getIngredientName(ing.ingredientId)
                        const formattedQuantity = formatQuantity(ing.quantity, ing.unit, ingredientName)
                        const isEgg = ing.unit === 'unit' && ingredientName.toLowerCase().includes('egg')

                        return (
                          <div
                            key={index}
                            className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                              }`}
                          >
                            <div className="flex items-center gap-2 flex-1">
                              {isEgg && <span className="text-lg">🥚</span>}
                              <span className="text-sm text-gray-800">{ingredientName}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-semibold text-gray-900 min-w-[80px] text-right">
                                {formattedQuantity} {ing.unit}
                              </span>
                              <span className="text-xs text-gray-500 min-w-[50px] text-right">
                                {formatCurrency(ing.cost)}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Smart Tips */}
                  {getScaledIngredients().some(ing => {
                    const name = getIngredientName(ing.ingredientId)
                    return ing.unit === 'unit' && name.toLowerCase().includes('egg')
                  }) && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                        <p className="text-xs text-blue-900">
                          <strong>🥚 Smart rounding:</strong> Eggs rounded to ¼, ½, ¾ fractions
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsScaleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveScaledRecipe} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save as New Recipe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
