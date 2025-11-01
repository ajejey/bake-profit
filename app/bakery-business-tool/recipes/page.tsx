'use client'

import RecipeCalculator from '../components/RecipeCalculator'
import AppLayout from '../components/AppLayout'

export default function RecipesPage() {
  return (
    <AppLayout currentPage="recipes">
      <RecipeCalculator />
    </AppLayout>
  )
}
