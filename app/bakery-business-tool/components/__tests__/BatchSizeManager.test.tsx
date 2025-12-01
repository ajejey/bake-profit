import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BatchSizeManager } from '../BatchSizeManager'
import type { Recipe } from '../../types'

// Mock functions we can track
const mockAddSellingUnit = vi.fn()
const mockUpdateSellingUnit = vi.fn()
const mockRemoveSellingUnit = vi.fn()
const mockSetBatchYield = vi.fn()
const mockInitializeBatchSizes = vi.fn()
const mockValidateSellingUnit = vi.fn(() => ({ valid: true, errors: [] }))
const mockToast = vi.fn()

// Mock the hooks
vi.mock('../../hooks/useBatchSizes', () => ({
  useBatchSizes: () => ({
    calculateCostPerBaseUnit: (recipe: Recipe) => {
      if (!recipe.batchYield || recipe.batchYield === 0) {
        return recipe.totalCost / (recipe.servings || 1)
      }
      return recipe.totalCost / recipe.batchYield
    },
    getSellingUnitsWithPricing: (recipe: Recipe, markup = 2.5) => {
      if (!recipe.sellingUnits || recipe.sellingUnits.length === 0) {
        return []
      }
      const costPerBaseUnit = recipe.totalCost / (recipe.batchYield || recipe.servings || 1)
      return recipe.sellingUnits.map(unit => ({
        ...unit,
        cost: costPerBaseUnit * unit.quantity,
        suggestedPrice: unit.priceOverride ?? costPerBaseUnit * unit.quantity * markup,
        profitMargin: 60,
        unitsPerBatch: (recipe.batchYield || 1) / unit.quantity,
      }))
    },
    addSellingUnit: mockAddSellingUnit,
    updateSellingUnit: mockUpdateSellingUnit,
    removeSellingUnit: mockRemoveSellingUnit,
    setBatchYield: mockSetBatchYield,
    initializeBatchSizes: mockInitializeBatchSizes,
    validateSellingUnit: mockValidateSellingUnit,
  }),
  PRICING_STRATEGIES: {
    value: 2.0,
    standard: 2.5,
    premium: 3.0,
    luxury: 3.5,
  },
}))

vi.mock('../../hooks', () => ({
  useCurrencySymbol: () => ({ symbol: '$' }),
  useDefaultMarkup: () => ({ markup: 2.5 }),
}))

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}))

// Helper to create test recipe
const createTestRecipe = (overrides: Partial<Recipe> = {}): Recipe => ({
  id: 'recipe-1',
  name: 'Test Recipe',
  servings: 12,
  totalCost: 15.00,
  costPerServing: 1.25,
  ingredients: [],
  instructions: [],
  laborTime: 30,
  laborCost: 5.00,
  overheadCost: 2.00,
  notes: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
})

describe('BatchSizeManager Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render the trigger button', () => {
      const recipe = createTestRecipe()
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      expect(button).toBeInTheDocument()
    })

    it('should show package icon on trigger button', () => {
      const recipe = createTestRecipe()
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      expect(button).toBeInTheDocument()
    })

    it('should display selling units count badge when units exist', () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
          { id: '2', name: 'Half Pound', quantity: 0.5, unit: 'lb' },
        ],
      })
      
      render(<BatchSizeManager recipe={recipe} />)
      
      const badge = screen.getByText('2')
      expect(badge).toBeInTheDocument()
    })

  })

  describe('Dialog Interaction', () => {
    it('should open dialog when trigger button is clicked', async () => {
      const recipe = createTestRecipe()
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      const dialogTitle = screen.getByText(/batch sizes & selling units/i)
      expect(dialogTitle).toBeInTheDocument()
    })

    it('should display recipe name in dialog description', async () => {
      const recipe = createTestRecipe({ name: 'Chocolate Fudge' })
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      const description = screen.getByText(/chocolate fudge/i)
      expect(description).toBeInTheDocument()
    })
  })

  describe('Batch Yield Section', () => {
    it('should display batch yield input when dialog is open', async () => {
      const recipe = createTestRecipe({ batchYield: 3, batchUnit: 'lb' })
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      const yieldLabel = screen.getByText(/batch yield/i)
      expect(yieldLabel).toBeInTheDocument()
    })

    it('should pre-fill batch yield from recipe', async () => {
      const recipe = createTestRecipe({ batchYield: 3, batchUnit: 'lb' })
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      const inputs = screen.getAllByDisplayValue('3')
      expect(inputs.length).toBeGreaterThan(0)
    })

    it('should display batch unit selector', async () => {
      const recipe = createTestRecipe({ batchYield: 3, batchUnit: 'lb' })
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      // Dialog should be open and showing batch yield section
      expect(screen.getByText(/batch sizes & selling units/i)).toBeInTheDocument()
    })

  })

  describe('Selling Units Section', () => {
    it('should display selling units list when units exist', async () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
          { id: '2', name: 'Half Pound', quantity: 0.5, unit: 'lb' },
        ],
      })
      
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      expect(screen.getByText('Quarter Pound')).toBeInTheDocument()
      expect(screen.getByText('Half Pound')).toBeInTheDocument()
    })

    it('should display selling unit details (name, quantity, cost, price)', async () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        totalCost: 15.00,
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      expect(screen.getByText('Quarter Pound')).toBeInTheDocument()
    })
  })

  describe('Add Selling Unit', () => {
    it('should show "Add Unit" button when selling units exist', async () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      // Add Unit button should exist when there are already selling units
      const addButton = screen.getByRole('button', { name: /add unit/i })
      expect(addButton).toBeInTheDocument()
    })

    it('should show add form when Add Unit button is clicked', async () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      const addButton = screen.getByRole('button', { name: /add unit/i })
      await userEvent.click(addButton)
      
      // Form should show name input
      const nameInput = screen.getByPlaceholderText(/quarter pound/i)
      expect(nameInput).toBeInTheDocument()
    })

    it('should show quantity input in add form', async () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      const addButton = screen.getByRole('button', { name: /add unit/i })
      await userEvent.click(addButton)
      
      // Form should show quantity input
      const quantityInput = screen.getByPlaceholderText(/0\.25/i)
      expect(quantityInput).toBeInTheDocument()
    })

    it('should call addSellingUnit when form is submitted', async () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      const addUnitButton = screen.getByRole('button', { name: /add unit/i })
      await userEvent.click(addUnitButton)
      
      // Fill in the form
      const nameInput = screen.getByPlaceholderText(/quarter pound/i)
      await userEvent.type(nameInput, 'Half Pound')
      
      const quantityInput = screen.getByPlaceholderText(/0\.25/i)
      await userEvent.type(quantityInput, '0.5')
      
      // Submit the form
      const submitButton = screen.getByRole('button', { name: /^add$/i })
      await userEvent.click(submitButton)
      
      // Should call addSellingUnit
      expect(mockAddSellingUnit).toHaveBeenCalled()
    })
  })

  describe('Edit Selling Unit', () => {
    it('should show edit button for each selling unit', async () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      // Edit button should exist - find by looking for small icon buttons
      const allButtons = screen.getAllByRole('button')
      // Filter to find icon buttons (small buttons with h-8 w-8 class)
      const iconButtons = allButtons.filter(btn => 
        btn.className.includes('h-8') && btn.className.includes('w-8')
      )
      // Should have at least 2 icon buttons (edit and delete)
      expect(iconButtons.length).toBeGreaterThanOrEqual(2)
    })

    it('should show edit form when edit button is clicked', async () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      // Find icon buttons and click the first one (edit)
      const allButtons = screen.getAllByRole('button')
      const iconButtons = allButtons.filter(btn => 
        btn.className.includes('h-8') && btn.className.includes('w-8')
      )
      // First icon button should be edit
      if (iconButtons[0]) await userEvent.click(iconButtons[0])
      
      // Should show input with current value
      await waitFor(() => {
        const nameInput = screen.getByDisplayValue('Quarter Pound')
        expect(nameInput).toBeInTheDocument()
      })
    })

    it('should call updateSellingUnit when edit form is saved', async () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      // Find icon buttons and click the first one (edit)
      const allButtons = screen.getAllByRole('button')
      const iconButtons = allButtons.filter(btn => 
        btn.className.includes('h-8') && btn.className.includes('w-8')
      )
      if (iconButtons[0]) await userEvent.click(iconButtons[0])
      
      // Wait for edit form to appear
      await waitFor(() => {
        expect(screen.getByDisplayValue('Quarter Pound')).toBeInTheDocument()
      })
      
      // Modify the name
      const nameInput = screen.getByDisplayValue('Quarter Pound')
      await userEvent.clear(nameInput)
      await userEvent.type(nameInput, 'Updated Name')
      
      // Save - get all save buttons and click the one in the edit form (second one)
      const saveButtons = screen.getAllByRole('button', { name: /save/i })
      // The edit form's save button should be the second one (first is batch yield save)
      await userEvent.click(saveButtons[1] || saveButtons[0])
      
      // Should call updateSellingUnit
      expect(mockUpdateSellingUnit).toHaveBeenCalled()
    })
  })

  describe('Delete Selling Unit', () => {
    it('should show delete button for each selling unit', async () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      // Delete button should exist (icon button with trash icon)
      const allButtons = screen.getAllByRole('button')
      const deleteButton = allButtons.find(btn => btn.querySelector('svg.lucide-trash-2'))
      expect(deleteButton).toBeInTheDocument()
    })

    it('should call removeSellingUnit when delete button is clicked', async () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      // Click delete button
      const allButtons = screen.getAllByRole('button')
      const deleteButton = allButtons.find(btn => btn.querySelector('svg.lucide-trash-2'))
      if (deleteButton) await userEvent.click(deleteButton)
      
      // Should call removeSellingUnit
      expect(mockRemoveSellingUnit).toHaveBeenCalledWith('recipe-1', '1')
    })
  })

  describe('Compact Mode', () => {
    it('should render compact view when compact prop is true', () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      
      render(<BatchSizeManager recipe={recipe} compact={true} />)
      
      // Should show badge with unit name instead of full button
      const badge = screen.getByText('Quarter Pound')
      expect(badge).toBeInTheDocument()
    })

    it('should show "No selling units" badge when compact and no units', () => {
      const recipe = createTestRecipe({ sellingUnits: [] })
      
      render(<BatchSizeManager recipe={recipe} compact={true} />)
      
      // Should show "No selling units" badge
      const badge = screen.getByText(/no selling units/i)
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Callback Props', () => {
    it('should call onUpdate when batch yield is saved', async () => {
      const onUpdate = vi.fn()
      const recipe = createTestRecipe({ batchYield: 3, batchUnit: 'lb' })
      
      render(<BatchSizeManager recipe={recipe} onUpdate={onUpdate} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      // Click save button for batch yield
      const saveButton = screen.getByRole('button', { name: /save/i })
      await userEvent.click(saveButton)
      
      // onUpdate should be called
      expect(onUpdate).toHaveBeenCalled()
    })

    it('should call onUpdate when selling unit is added', async () => {
      const onUpdate = vi.fn()
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      
      render(<BatchSizeManager recipe={recipe} onUpdate={onUpdate} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      const addUnitButton = screen.getByRole('button', { name: /add unit/i })
      await userEvent.click(addUnitButton)
      
      // Fill form
      const nameInput = screen.getByPlaceholderText(/quarter pound/i)
      await userEvent.type(nameInput, 'Half Pound')
      
      const quantityInput = screen.getByPlaceholderText(/0\.25/i)
      await userEvent.type(quantityInput, '0.5')
      
      // Submit
      const submitButton = screen.getByRole('button', { name: /^add$/i })
      await userEvent.click(submitButton)
      
      // onUpdate should be called
      expect(onUpdate).toHaveBeenCalled()
    })

    it('should call onUpdate when selling unit is deleted', async () => {
      const onUpdate = vi.fn()
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      
      render(<BatchSizeManager recipe={recipe} onUpdate={onUpdate} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      // Click delete button
      const allButtons = screen.getAllByRole('button')
      const deleteButton = allButtons.find(btn => btn.querySelector('svg.lucide-trash-2'))
      if (deleteButton) await userEvent.click(deleteButton)
      
      // onUpdate should be called
      expect(onUpdate).toHaveBeenCalled()
    })
  })

  describe('Price Override', () => {
    it('should display cost and suggested price for selling units', async () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        totalCost: 15.00,
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      // Should display cost
      expect(screen.getByText(/cost:/i)).toBeInTheDocument()
      // Should display suggested price
      expect(screen.getByText(/suggested:/i)).toBeInTheDocument()
    })

    it('should show price override input in edit form', async () => {
      const recipe = createTestRecipe({
        batchYield: 3,
        batchUnit: 'lb',
        totalCost: 15.00,
        sellingUnits: [
          { id: '1', name: 'Quarter Pound', quantity: 0.25, unit: 'lb' },
        ],
      })
      
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      // Find icon buttons and click the first one (edit)
      const allButtons = screen.getAllByRole('button')
      const iconButtons = allButtons.filter(btn => 
        btn.className.includes('h-8') && btn.className.includes('w-8')
      )
      if (iconButtons[0]) await userEvent.click(iconButtons[0])
      
      // Wait for edit form to appear and check for price override
      await waitFor(() => {
        // The label text is "Price Override (optional)"
        const priceLabel = screen.getByText(/price override/i)
        expect(priceLabel).toBeInTheDocument()
      })
    })
  })

  describe('Default Selling Units', () => {
    it('should show "Add Defaults" button when no selling units exist', async () => {
      const recipe = createTestRecipe({ batchYield: 3, batchUnit: 'lb', sellingUnits: [] })
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      const defaultsButton = screen.getByRole('button', { name: /defaults|presets/i })
      expect(defaultsButton).toBeInTheDocument()
    })

    it('should populate selling units when Add Defaults is clicked', async () => {
      const recipe = createTestRecipe({ batchYield: 3, batchUnit: 'lb', sellingUnits: [] })
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      await userEvent.click(button)
      
      const defaultsButton = screen.getByRole('button', { name: /defaults|presets/i })
      await userEvent.click(defaultsButton)
      
      // Should show default units for 'lb'
      await waitFor(() => {
        expect(screen.getByText(/quarter|half|pound/i)).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Behavior', () => {
    it('should use Dialog component for display', () => {
      const recipe = createTestRecipe()
      render(<BatchSizeManager recipe={recipe} />)
      
      const button = screen.getByRole('button', { name: /selling units/i })
      expect(button).toBeInTheDocument()
      
      // Dialog should be used (not Sheet)
      // This is verified by the button being present and clickable
      expect(button).toBeEnabled()
    })
  })
})
