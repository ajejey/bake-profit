'use client'

import React, { useState, useMemo } from 'react'
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
import { Plus, Trash2, Edit, Save, Calculator, Copy, Clock, Thermometer, ChefHat, X, Scale } from 'lucide-react'
import SearchBar from './SearchBar'
import FilterChips, { type FilterOption } from './FilterChips'
import SortDropdown, { type SortOption } from './SortDropdown'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { useIngredients, useRecipes } from '../hooks'
import { useBakeryData } from '../contexts/BakeryDataContext'
import type { Ingredient, Recipe, RecipeIngredient, RecipeCategory } from '../types'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { useSubscription } from '@/contexts/SubscriptionContext'
import UpgradePrompt from '@/components/subscription/UpgradePrompt'
import UsageIndicator from '@/components/subscription/UsageIndicator'
import { formatCurrency, getCurrencySymbol, getDefaultServings, getDefaultLaborCost, getDefaultOverhead } from '../utils/settings'



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

// Unit conversion map
const unitConversions: Record<string, Record<string, number>> = {
  g: { kg: 0.001, g: 1, oz: 0.035274, lb: 0.00220462 },
  kg: { kg: 1, g: 1000, oz: 35.274, lb: 2.20462 },
  oz: { kg: 0.0283495, g: 28.3495, oz: 1, lb: 0.0625 },
  lb: { kg: 0.453592, g: 453.592, oz: 16, lb: 1 },
  ml: { l: 0.001, ml: 1, cup: 0.00422675, tbsp: 0.067628, tsp: 0.202884 },
  l: { l: 1, ml: 1000, cup: 4.22675, tbsp: 67.628, tsp: 202.884 },
  cup: { l: 0.236588, ml: 236.588, cup: 1, tbsp: 16, tsp: 48 },
  tbsp: { l: 0.0147868, ml: 14.7868, cup: 0.0625, tbsp: 1, tsp: 3 },
  tsp: { l: 0.00492892, ml: 4.92892, cup: 0.0208333, tbsp: 0.333333, tsp: 1 },
  unit: { unit: 1, dozen: 0.0833333 },
  dozen: { unit: 12, dozen: 1 },
}

// Helper function to convert units
const convertUnit = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value
  
  // Check if units are in the same category
  const fromCategory = Object.keys(unitConversions).find(unit => 
    unitConversions[unit][fromUnit] !== undefined
  )
  
  const toCategory = Object.keys(unitConversions).find(unit => 
    unitConversions[unit][toUnit] !== undefined
  )
  
  if (!fromCategory || !toCategory || fromCategory !== toCategory) {
    return value // Cannot convert between different categories
  }
  
  // Convert to base unit first, then to target unit
  const baseUnit = fromCategory
  const valueInBaseUnit = value * unitConversions[baseUnit][fromUnit]
  return valueInBaseUnit / unitConversions[baseUnit][toUnit]
}

export default function RecipeCalculator() {
  const { toast } = useToast()
  const { tier, checkLimit, usage } = useSubscription()
  
  // Use custom hooks for data management
  const { 
    ingredients, 
    addIngredient, 
    updateIngredient, 
    deleteIngredient, 
    safeDeleteIngredient,
    getIngredientById 
  } = useIngredients()
  
  const { 
    recipes, 
    addRecipe, 
    updateRecipe, 
    deleteRecipe, 
    getRecipeById 
  } = useRecipes()

  const { recipeCategories, registerCategory } = useBakeryData()
  
  // UI State only
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [isAddIngredientOpen, setIsAddIngredientOpen] = useState(false)
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false)
  const [isEditIngredientOpen, setIsEditIngredientOpen] = useState(false)
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null)
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([])
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>('')
  const [ingredientQuantity, setIngredientQuantity] = useState<number>(0)
  const [ingredientUnit, setIngredientUnit] = useState<string>('')
  const [activeTab, setActiveTab] = useState('recipes')
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
      servings: getDefaultServings(),
      laborCost: getDefaultLaborCost(),
      laborTime: 0,
      overheadCost: 0,
      notes: '',
    },
  })

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
    
    const now = new Date().toISOString()
    
    const duplicatedRecipe: Recipe = {
      ...recipe,
      id: uuidv4(),
      name: `${recipe.name} (Copy)`,
      createdAt: now,
      updatedAt: now,
    }
    
    addRecipe(duplicatedRecipe) // Hook handles everything!
    
    toast({
      title: 'Recipe duplicated',
      description: `A copy of ${recipe.name} has been created.`,
    })
  }

  // Handle deleting a recipe
  const handleDeleteRecipe = (id: string) => {
    deleteRecipe(id) // Hook handles everything!
    
    if (selectedRecipe?.id === id) {
      setSelectedRecipe(null)
    }
    
    toast({
      title: 'Recipe deleted',
      description: 'The recipe has been removed.',
    })
  }

  // Get ingredient name by ID
  const getIngredientName = (id: string): string => {
    const ingredient = ingredients.find(ing => ing.id === id)
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
                <DialogHeader>
                  <DialogTitle>Create New Recipe</DialogTitle>
                  <DialogDescription>
                    Create a new recipe with ingredients, labor, and overhead costs.
                  </DialogDescription>
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
                                <Input type="number" {...field} />
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
                                  <Input type="number" {...field} />
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
                                <FormLabel>Labor Cost ($)</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" {...field} />
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
                              <FormLabel>Overhead Cost ($)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" {...field} />
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
                                    <Input type="number" placeholder="30" {...field} />
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
                                    <Input type="number" placeholder="45" {...field} />
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
                                    <Input type="number" placeholder="20" {...field} />
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
                                    <Input placeholder="350°F or 180°C" {...field} />
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
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Recipe Ingredients</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-3 gap-2">
                        <Select
                          value={selectedIngredientId}
                          onValueChange={setSelectedIngredientId}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select ingredient" />
                          </SelectTrigger>
                          <SelectContent>
                            {ingredients.map((ing) => (
                              <SelectItem key={ing.id} value={ing.id}>
                                {ing.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Quantity"
                          value={ingredientQuantity || ''}
                          onChange={(e) => setIngredientQuantity(parseFloat(e.target.value))}
                        />
                        
                        <Select
                          value={ingredientUnit}
                          onValueChange={setIngredientUnit}
                          disabled={!selectedIngredientId}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Unit" />
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
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={handleAddRecipeIngredient}
                        disabled={!selectedIngredientId || !ingredientQuantity || !ingredientUnit}
                      >
                        Add Ingredient to Recipe
                      </Button>
                    </div>
                    
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ingredient</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Cost</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recipeIngredients.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center text-gray-500">
                                No ingredients added yet
                              </TableCell>
                            </TableRow>
                          ) : (
                            recipeIngredients.map((ing) => (
                              <TableRow key={ing.id}>
                                <TableCell>{getIngredientName(ing.ingredientId)}</TableCell>
                                <TableCell>{ing.quantity} {ing.unit}</TableCell>
                                <TableCell>{formatCurrency(ing.cost)}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveRecipeIngredient(ing.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <div className="flex justify-between mb-2">
                        <span>Ingredients Cost:</span>
                        <span>{formatCurrency(recipeIngredients.reduce((sum, ing) => sum + ing.cost, 0))}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Labor Cost:</span>
                        <span>{formatCurrency(Number(recipeForm.watch('laborCost')) || 0)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Overhead Cost:</span>
                        <span>{formatCurrency(Number(recipeForm.watch('overheadCost')) || 0)}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t">
                        <span>Total Recipe Cost:</span>
                        <span>
                          {formatCurrency(
                            calculateTotalRecipeCost(
                              recipeIngredients,
                              Number(recipeForm.watch('laborCost')) || 0,
                              Number(recipeForm.watch('overheadCost')) || 0
                            )
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Cost per Serving:</span>
                        <span>
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
                  </div>
                </div>
                
                <DialogFooter className="mt-6">
                  <Button type="button" onClick={recipeForm.handleSubmit(onCreateRecipe)}>
                    Create Recipe
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
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">No recipes added yet. Add your first recipe to get started.</p>
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
                          onClick={() => handleDuplicateRecipe(recipe)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
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
            <DialogTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Scale Recipe: {recipeToScale?.name}
            </DialogTitle>
            <DialogDescription>
              Adjust recipe quantities for different batch sizes or servings
            </DialogDescription>
          </DialogHeader>

          {recipeToScale && (
            <div className="space-y-6">
              {/* Scale Method Selector */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                <button
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    scaleMethod === 'servings'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setScaleMethod('servings')}
                >
                  By Servings
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    scaleMethod === 'factor'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setScaleMethod('factor')}
                >
                  By Factor
                </button>
              </div>

              {/* Input Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Original</label>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="text-2xl font-bold">{recipeToScale.servings}</div>
                    <div className="text-xs text-gray-600">servings</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {scaleMethod === 'servings' ? 'Target Servings' : 'Scale Factor'}
                  </label>
                  {scaleMethod === 'servings' ? (
                    <Input
                      type="number"
                      min="1"
                      value={targetServings}
                      onChange={(e) => setTargetServings(parseInt(e.target.value) || 1)}
                      className="text-2xl font-bold h-auto py-3"
                    />
                  ) : (
                    <div className="space-y-2">
                      <Input
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={scaleFactor}
                        onChange={(e) => setScaleFactor(parseFloat(e.target.value) || 1)}
                        className="text-2xl font-bold h-auto py-3"
                      />
                      <div className="flex gap-1">
                        {[0.5, 1, 2, 3, 4].map((factor) => (
                          <Button
                            key={factor}
                            size="sm"
                            variant="outline"
                            onClick={() => setScaleFactor(factor)}
                            className="flex-1"
                          >
                            {factor}x
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Scale Factor Display */}
              <div className="flex items-center justify-center gap-2 py-2">
                <div className="text-sm text-gray-600">Scaling by</div>
                <div className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full font-bold">
                  {(scaleMethod === 'servings' 
                    ? targetServings / recipeToScale.servings 
                    : scaleFactor
                  ).toFixed(2)}x
                </div>
                <div className="text-sm text-gray-600">
                  ({recipeToScale.servings} → {getScaledTotals().servings} servings)
                </div>
              </div>

              {/* Preview Section */}
              <div className="border rounded-lg p-4 bg-blue-50">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Scaled Recipe Preview
                </h4>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-600">Servings</div>
                    <div className="text-lg font-bold">{getScaledTotals().servings}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Total Cost</div>
                    <div className="text-lg font-bold text-green-600">
                      ${getScaledTotals().totalCost.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Cost/Serving</div>
                    <div className="text-lg font-bold">
                      ${getScaledTotals().costPerServing.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Scaled Ingredients */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Ingredients:</div>
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {getScaledIngredients().map((ing, index) => {
                      const ingredientName = getIngredientName(ing.ingredientId)
                      const formattedQuantity = formatQuantity(ing.quantity, ing.unit, ingredientName)
                      
                      return (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-white rounded text-sm"
                        >
                          <span className="text-gray-700">
                            {ingredientName}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="font-medium">
                              {formattedQuantity} {ing.unit}
                            </span>
                            <span className="text-gray-500 text-xs">
                              ${ing.cost.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="space-y-2">
                {getScaledIngredients().some(ing => {
                  const name = getIngredientName(ing.ingredientId)
                  return ing.unit === 'unit' && name.toLowerCase().includes('egg')
                }) && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-900">
                      🥚 <strong>Smart Egg Rounding:</strong> Eggs are automatically rounded to practical fractions (1/4, 1/2, 3/4) for easier measuring.
                    </p>
                  </div>
                )}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-900">
                    💡 <strong>Tip:</strong> Scaling saves a new recipe to your catalog. The original recipe remains unchanged.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsScaleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveScaledRecipe} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Scaled Recipe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
