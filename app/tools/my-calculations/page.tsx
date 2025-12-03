'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calculator, 
  Cake, 
  Scale, 
  TrendingUp, 
  Package, 
  PieChart,
  Search,
  Trash2,
  Edit,
  Copy,
  Download,
  ArrowRight,
  Check,
  Loader2
} from 'lucide-react'
import { WelcomeQuestionnaire } from '@/components/calculators/WelcomeQuestionnaire'
import {
  getAllSavedCalculations,
  deleteCalculation,
  CALCULATOR_STORES,
  type SavedRecipeCalculation,
  type SavedCakeCalculation,
  type SavedScalingCalculation,
  type SavedProfitCalculation,
  type SavedIngredientCalculation,
  type SavedBatchCalculation,
} from '../utils/calculatorStorage'
import { useToast } from '@/hooks/use-toast'

export default function MyCalculationsPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)
  
  const [recipes, setRecipes] = useState<SavedRecipeCalculation[]>([])
  const [cakes, setCakes] = useState<SavedCakeCalculation[]>([])
  const [scalings, setScalings] = useState<SavedScalingCalculation[]>([])
  const [profits, setProfits] = useState<SavedProfitCalculation[]>([])
  const [ingredients, setIngredients] = useState<SavedIngredientCalculation[]>([])
  const [batches, setBatches] = useState<SavedBatchCalculation[]>([])

  useEffect(() => {
    loadAllCalculations()
    
    // Show questionnaire after 3 seconds if user hasn't answered yet
    const timer = setTimeout(() => {
      const hasAnsweredQuestionnaire = localStorage.getItem('questionnaire_answered')
      if (!hasAnsweredQuestionnaire) {
        setShowQuestionnaire(true)
      }
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  const loadAllCalculations = async () => {
    setLoading(true)
    try {
      const data = await getAllSavedCalculations()
      setRecipes(data.recipes)
      setCakes(data.cakes)
      setScalings(data.scalings)
      setProfits(data.profits)
      setIngredients(data.ingredients)
      setBatches(data.batches)
    } catch (error) {
      console.error('Error loading calculations:', error)
      toast({
        title: 'Error loading calculations',
        description: 'Could not load your saved calculations.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this calculation?')) return

    try {
      let storeName
      switch (type) {
        case 'recipe': storeName = CALCULATOR_STORES.recipes; break
        case 'cake': storeName = CALCULATOR_STORES.cakes; break
        case 'scaling': storeName = CALCULATOR_STORES.scalings; break
        case 'profit': storeName = CALCULATOR_STORES.profits; break
        case 'ingredient': storeName = CALCULATOR_STORES.ingredients; break
        case 'batch': storeName = CALCULATOR_STORES.batches; break
        default: return
      }

      await deleteCalculation(storeName, id)
      await loadAllCalculations()
      
      toast({
        title: '✅ Deleted',
        description: 'Calculation deleted successfully.',
      })
    } catch (error) {
      console.error('Error deleting calculation:', error)
      toast({
        title: 'Error',
        description: 'Could not delete calculation.',
        variant: 'destructive',
      })
    }
  }

  const handleEdit = (type: string, id: string) => {
    const routes: Record<string, string> = {
      recipe: '/tools/recipe-cost-calculator',
      cake: '/tools/cake-pricing-calculator',
      scaling: '/tools/recipe-scaling-calculator',
      profit: '/tools/bakery-profit-calculator',
      ingredient: '/tools/ingredient-cost-calculator',
      batch: '/tools/batch-cost-calculator',
    }
    router.push(`${routes[type]}?load=${id}`)
  }

  const totalCount = recipes.length + cakes.length + scalings.length + profits.length + ingredients.length + batches.length

  // Filter calculations by search query
  const filterBySearch = <T extends { name: string }>(items: T[]) => {
    if (!searchQuery) return items
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const filteredRecipes = filterBySearch(recipes)
  const filteredCakes = filterBySearch(cakes)
  const filteredScalings = filterBySearch(scalings)

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <Header showBlog showTools />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Saved Calculations
          </h1>
          <p className="text-lg text-gray-600">
            All your work is saved locally in your browser. {totalCount} calculation{totalCount !== 1 ? 's' : ''} saved.
          </p>
        </div>

        {/* Upgrade CTA Banner */}
        {/* <Card className="mb-8 bg-gradient-to-r from-rose-500 to-rose-600 border-0 text-white">
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">🚀 Want More?</h3>
                <p className="text-rose-100 mb-3">
                  Upgrade to BakeProfit Pro for unlimited cloud storage, cross-device sync, and full bakery management.
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>Sync across devices</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>Unlimited storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>Full business tools</span>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-white text-rose-600 hover:bg-rose-50"
                onClick={() => router.push('/bakery-business-tool')}
              >
                Upgrade to Pro →
              </Button>
            </div>
          </CardContent>
        </Card> */}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search calculations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
          </div>
        ) : totalCount === 0 ? (
          /* Empty State */
          <Card>
            <CardContent className="py-12 text-center">
              <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Saved Calculations Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start using our calculators and save your work to see it here.
              </p>
              <Button
                onClick={() => router.push('/tools')}
                className="bg-rose-500 hover:bg-rose-600"
              >
                Browse Calculators →
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Tabs */
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                All ({totalCount})
              </TabsTrigger>
              <TabsTrigger value="recipes">
                <Calculator className="h-4 w-4 mr-2" />
                Recipes ({recipes.length})
              </TabsTrigger>
              <TabsTrigger value="cakes">
                <Cake className="h-4 w-4 mr-2" />
                Cakes ({cakes.length})
              </TabsTrigger>
              <TabsTrigger value="scalings">
                <Scale className="h-4 w-4 mr-2" />
                Scalings ({scalings.length})
              </TabsTrigger>
            </TabsList>

            {/* All Tab */}
            <TabsContent value="all">
              <div className="space-y-6">
                {filteredRecipes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-rose-500" />
                      Recipe Cost Calculations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredRecipes.map((recipe) => (
                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          onEdit={() => handleEdit('recipe', recipe.id)}
                          onDelete={() => handleDelete('recipe', recipe.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {filteredCakes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Cake className="h-5 w-5 text-rose-500" />
                      Cake Pricing Calculations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredCakes.map((cake) => (
                        <CakeCard
                          key={cake.id}
                          cake={cake}
                          onEdit={() => handleEdit('cake', cake.id)}
                          onDelete={() => handleDelete('cake', cake.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {filteredScalings.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Scale className="h-5 w-5 text-rose-500" />
                      Recipe Scaling Calculations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredScalings.map((scaling) => (
                        <ScalingCard
                          key={scaling.id}
                          scaling={scaling}
                          onEdit={() => handleEdit('scaling', scaling.id)}
                          onDelete={() => handleDelete('scaling', scaling.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Recipes Tab */}
            <TabsContent value="recipes">
              {filteredRecipes.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calculator className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No recipe calculations saved yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onEdit={() => handleEdit('recipe', recipe.id)}
                      onDelete={() => handleDelete('recipe', recipe.id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Cakes Tab */}
            <TabsContent value="cakes">
              {filteredCakes.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Cake className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No cake calculations saved yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCakes.map((cake) => (
                    <CakeCard
                      key={cake.id}
                      cake={cake}
                      onEdit={() => handleEdit('cake', cake.id)}
                      onDelete={() => handleDelete('cake', cake.id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Scalings Tab */}
            <TabsContent value="scalings">
              {filteredScalings.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Scale className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No scaling calculations saved yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredScalings.map((scaling) => (
                    <ScalingCard
                      key={scaling.id}
                      scaling={scaling}
                      onEdit={() => handleEdit('scaling', scaling.id)}
                      onDelete={() => handleDelete('scaling', scaling.id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>

      <Footer />

      {/* Welcome Questionnaire - Shows after 3 seconds if not answered */}
      <WelcomeQuestionnaire
        open={showQuestionnaire}
        onOpenChange={setShowQuestionnaire}
      />
    </div>
  )
}

// Recipe Card Component
function RecipeCard({ 
  recipe, 
  onEdit, 
  onDelete 
}: { 
  recipe: SavedRecipeCalculation
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg flex items-start justify-between">
          <span className="line-clamp-1">{recipe.name}</span>
          <Calculator className="h-5 w-5 text-rose-500 flex-shrink-0" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Servings:</span>
            <span className="font-medium">{recipe.servings}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Cost:</span>
            <span className="font-medium">${recipe.totalCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cost/Serving:</span>
            <span className="font-medium">${recipe.costPerServing.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Suggested Price:</span>
            <span className="font-medium text-green-600">${recipe.suggestedPrice.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Updated {new Date(recipe.updatedAt).toLocaleDateString()}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Cake Card Component
function CakeCard({ 
  cake, 
  onEdit, 
  onDelete 
}: { 
  cake: SavedCakeCalculation
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg flex items-start justify-between">
          <span className="line-clamp-1">{cake.name}</span>
          <Cake className="h-5 w-5 text-rose-500 flex-shrink-0" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span className="font-medium capitalize">{cake.cakeType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tiers:</span>
            <span className="font-medium">{cake.tiers}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Servings:</span>
            <span className="font-medium">{cake.servings}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Cost:</span>
            <span className="font-medium">${cake.totalCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Suggested Price:</span>
            <span className="font-medium text-green-600">${cake.suggestedPrice.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Updated {new Date(cake.updatedAt).toLocaleDateString()}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Scaling Card Component
function ScalingCard({ 
  scaling, 
  onEdit, 
  onDelete 
}: { 
  scaling: SavedScalingCalculation
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg flex items-start justify-between">
          <span className="line-clamp-1">{scaling.name}</span>
          <Scale className="h-5 w-5 text-rose-500 flex-shrink-0" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Original Yield:</span>
            <span className="font-medium">{scaling.originalYield}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Desired Yield:</span>
            <span className="font-medium">{scaling.desiredYield}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Scaling Factor:</span>
            <span className="font-medium text-blue-600">×{scaling.scalingFactor.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ingredients:</span>
            <span className="font-medium">{scaling.ingredients.length}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Updated {new Date(scaling.updatedAt).toLocaleDateString()}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
