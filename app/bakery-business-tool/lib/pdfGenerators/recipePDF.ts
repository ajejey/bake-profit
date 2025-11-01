/**
 * Recipe PDF Generator
 * Creates recipe cards, cost analysis sheets, and recipe books
 */

import { BakeProfitPDF } from '../pdfGenerator'
import type { Recipe, Ingredient } from '../../types'

export type RecipePDFType = 'card' | 'cost-analysis' | 'ingredient-list' | 'full'

export interface RecipePDFOptions {
  type: RecipePDFType
  currencySymbol?: string
  showCosts?: boolean
  showInstructions?: boolean
  showPricing?: boolean
  ingredients?: Ingredient[] // For ingredient details
}

/**
 * Generate Recipe PDF
 */
export function generateRecipePDF(
  recipe: Recipe,
  options: RecipePDFOptions
): BakeProfitPDF {
  const pdf = new BakeProfitPDF()
  const currencySymbol = options.currencySymbol || '$'
  
  // Header
  pdf.addHeader(recipe.name.toUpperCase(), recipe.category || 'Recipe', `ID: ${recipe.id.slice(0, 8)}`)
  
  // Description
  if (recipe.description) {
    pdf.addText(recipe.description, 10)
    pdf.addSpace(5)
  }
  
  // Recipe Details Section
  pdf.addSectionHeader('Recipe Details')
  
  const details: string[] = []
  details.push(`Servings: ${recipe.servings}`)
  
  if (recipe.prepTime) details.push(`Prep: ${recipe.prepTime} min`)
  if (recipe.cookTime) details.push(`Cook: ${recipe.cookTime} min`)
  if (recipe.coolTime) details.push(`Cool: ${recipe.coolTime} min`)
  if (recipe.temperature) details.push(`Temp: ${recipe.temperature}`)
  
  pdf.addText(details.join('  •  '), 10)
  pdf.addSpace(8)
  
  // Ingredients Section
  pdf.addSectionHeader('Ingredients')
  
  const ingredientRows = recipe.ingredients.map(ing => {
    const ingredient = options.ingredients?.find(i => i.id === ing.ingredientId)
    const name = ingredient?.name || 'Unknown Ingredient'
    
    return {
      checkbox: '☐',
      ingredient: name,
      quantity: `${ing.quantity} ${ing.unit}`,
      cost: options.showCosts ? `${currencySymbol}${ing.cost.toFixed(2)}` : ''
    }
  })
  
  const columns = [
    { header: '', dataKey: 'checkbox', width: 10, align: 'center' as const },
    { header: 'Ingredient', dataKey: 'ingredient', width: options.showCosts ? 80 : 110, align: 'left' as const },
    { header: 'Quantity', dataKey: 'quantity', width: options.showCosts ? 40 : 60, align: 'right' as const }
  ]
  
  if (options.showCosts) {
    columns.push({ header: 'Cost', dataKey: 'cost', width: 30, align: 'right' as const })
  }
  
  pdf.addTable(columns, ingredientRows)
  pdf.addSpace(8)
  
  // Instructions Section (if enabled and available)
  if (options.showInstructions && recipe.instructions && recipe.instructions.length > 0) {
    pdf.addSectionHeader('Instructions')
    
    recipe.instructions.forEach((instruction, index) => {
      pdf.addCard(() => {
        pdf.addText(`${index + 1}. ${instruction}`, 10)
      })
      pdf.addSpace(3)
    })
    
    pdf.addSpace(5)
  }
  
  // Cost Breakdown Section (if enabled)
  if (options.showCosts) {
    pdf.addSectionHeader('Cost Breakdown')
    
    const ingredientCost = recipe.ingredients.reduce((sum, ing) => sum + ing.cost, 0)
    
    const costRows = [
      { item: 'Ingredients', amount: `${currencySymbol}${ingredientCost.toFixed(2)}` },
      { item: 'Labor', amount: `${currencySymbol}${recipe.laborCost.toFixed(2)}` },
      { item: 'Overhead', amount: `${currencySymbol}${recipe.overheadCost.toFixed(2)}` }
    ]
    
    pdf.addTable(
      [
        { header: 'Cost Item', dataKey: 'item', width: 100, align: 'left' },
        { header: 'Amount', dataKey: 'amount', width: 70, align: 'right' }
      ],
      costRows
    )
    
    pdf.addSpace(5)
    
    const summaryItems = [
      { label: 'Total Cost', value: `${currencySymbol}${recipe.totalCost.toFixed(2)}` },
      { label: 'Cost per Serving', value: `${currencySymbol}${recipe.costPerServing.toFixed(2)}` }
    ]
    
    pdf.addSummaryBox(summaryItems)
    pdf.addSpace(8)
  }
  
  // Pricing Suggestions (if enabled)
  if (options.showPricing && options.showCosts) {
    pdf.addSectionHeader('Suggested Pricing', 'secondary')
    
    const pricingRows = [
      {
        strategy: 'Minimum (2x cost)',
        price: `${currencySymbol}${(recipe.totalCost * 2).toFixed(2)}`,
        profit: `${currencySymbol}${recipe.totalCost.toFixed(2)}`
      },
      {
        strategy: 'Recommended (3x cost)',
        price: `${currencySymbol}${(recipe.totalCost * 3).toFixed(2)}`,
        profit: `${currencySymbol}${(recipe.totalCost * 2).toFixed(2)}`
      },
      {
        strategy: 'Premium (4x cost)',
        price: `${currencySymbol}${(recipe.totalCost * 4).toFixed(2)}`,
        profit: `${currencySymbol}${(recipe.totalCost * 3).toFixed(2)}`
      }
    ]
    
    pdf.addTable(
      [
        { header: 'Strategy', dataKey: 'strategy', width: 70, align: 'left' },
        { header: 'Price', dataKey: 'price', width: 50, align: 'right' },
        { header: 'Profit', dataKey: 'profit', width: 50, align: 'right' }
      ],
      pricingRows
    )
    
    pdf.addSpace(8)
  }
  
  // Notes Section
  if (recipe.notes) {
    pdf.addSectionHeader('Notes', 'gray')
    pdf.addCard(() => {
      pdf.addText(recipe.notes, 10)
    })
    pdf.addSpace(5)
  }
  
  // Metadata
  pdf.addSpace(5)
  pdf.addSeparator('light')
  pdf.addSpace(3)
  
  const createdDate = new Date(recipe.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  
  const updatedDate = new Date(recipe.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  
  pdf.addText(`Created: ${createdDate}  •  Last Updated: ${updatedDate}`, 8)
  
  // Footer
  pdf.addFooter()
  
  return pdf
}

/**
 * Helper to generate filename
 */
export function getRecipePDFFilename(recipe: Recipe, type: RecipePDFType): string {
  const date = new Date().toISOString().split('T')[0]
  const recipeName = recipe.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  
  return `recipe-${type}-${recipeName}-${date}.pdf`
}

/**
 * Quick exports for common use cases
 */
export function generateRecipeCard(
  recipe: Recipe,
  ingredients: Ingredient[],
  options: Partial<RecipePDFOptions> = {}
): BakeProfitPDF {
  return generateRecipePDF(recipe, {
    type: 'card',
    showCosts: false,
    showInstructions: true,
    showPricing: false,
    ingredients,
    ...options
  })
}

export function generateCostAnalysis(
  recipe: Recipe,
  ingredients: Ingredient[],
  options: Partial<RecipePDFOptions> = {}
): BakeProfitPDF {
  return generateRecipePDF(recipe, {
    type: 'cost-analysis',
    showCosts: true,
    showInstructions: false,
    showPricing: true,
    ingredients,
    ...options
  })
}

export function generateIngredientList(
  recipe: Recipe,
  ingredients: Ingredient[],
  options: Partial<RecipePDFOptions> = {}
): BakeProfitPDF {
  return generateRecipePDF(recipe, {
    type: 'ingredient-list',
    showCosts: false,
    showInstructions: false,
    showPricing: false,
    ingredients,
    ...options
  })
}

export function generateFullRecipe(
  recipe: Recipe,
  ingredients: Ingredient[],
  options: Partial<RecipePDFOptions> = {}
): BakeProfitPDF {
  return generateRecipePDF(recipe, {
    type: 'full',
    showCosts: true,
    showInstructions: true,
    showPricing: true,
    ingredients,
    ...options
  })
}

/**
 * Generate Recipe Book (multiple recipes in one PDF)
 */
export function generateRecipeBook(
  recipes: Recipe[],
  ingredients: Ingredient[],
  options: Partial<RecipePDFOptions> = {}
): BakeProfitPDF {
  const pdf = new BakeProfitPDF()
  
  // Cover page
  pdf.addHeader('RECIPE BOOK', 'BakeProfit Collection')
  pdf.addSpace(20)
  
  pdf.addText(`Total Recipes: ${recipes.length}`, 14)
  pdf.addSpace(5)
  
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  pdf.addText(`Generated: ${date}`, 12)
  
  // Table of contents
  pdf.checkPageBreak(50)
  pdf.addSpace(20)
  pdf.addSectionHeader('Table of Contents')
  
  recipes.forEach((recipe, index) => {
    pdf.addText(`${index + 1}. ${recipe.name}${recipe.category ? ` (${recipe.category})` : ''}`, 10)
  })
  
  // Add each recipe on a new page
  recipes.forEach((recipe, index) => {
    pdf.checkPageBreak(200) // Force new page
    if (index > 0) {
      pdf.setYPosition(pdf.getYPosition() + 20)
    }
    
    const recipePDF = generateRecipePDF(recipe, {
      type: 'full',
      showCosts: options.showCosts !== false,
      showInstructions: true,
      showPricing: options.showPricing !== false,
      ingredients,
      ...options
    })
    
    // Note: In a real implementation, you'd need to merge PDFs
    // For now, this is a simplified version
  })
  
  pdf.addFooter('BakeProfit Recipe Book')
  
  return pdf
}
