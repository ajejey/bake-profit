// Shared Type Definitions for Bakery Business Tool
// All modules use these interfaces for data consistency

export interface Ingredient {
  id: string
  name: string
  cost: number              // Cost per unit (e.g., per gram)
  unit: string             // g, ml, oz, cups, etc.
  packageSize: number       // Size of package you buy
  packageCost: number       // What you pay for the package
  currentStock?: number     // For Inventory Manager
  minStock?: number        // For Inventory Manager alerts
  expirationDate?: string  // For Inventory Manager
  supplierId?: string      // For Inventory Manager
}

export interface RecipeIngredient {
  id: string               // Unique ID for this ingredient entry in the recipe
  ingredientId: string      // Links to Ingredient
  quantity: number
  unit: string
  cost: number             // Calculated from ingredient cost
}

export type RecipeCategory = 'Cakes' | 'Cookies' | 'Bread' | 'Pastries' | 'Pies' | 'Other'

export interface Recipe {
  id: string
  name: string
  description?: string
  category?: RecipeCategory    // Recipe category for filtering
  ingredients: RecipeIngredient[]
  instructions: string[]       // Step-by-step baking instructions
  servings: number
  
  // Timing (all in minutes)
  prepTime?: number           // Preparation time
  cookTime?: number          // Baking/cooking time (also called bakeTime)
  coolTime?: number          // Cooling time before serving
  laborTime: number          // Total labor time (for cost calculation)
  
  // Costs
  laborCost: number
  overheadCost: number
  totalCost: number           // Calculated: ingredients + labor + overhead
  costPerServing: number      // Calculated: totalCost / servings
  
  // Additional details
  temperature?: string        // Baking temperature (e.g., "350°F" or "180°C")
  notes: string              // Baker notes, tips, variations
  image?: string             // Recipe photo URL (future)
  
  // Metadata
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  recipeId: string          // Links to Recipe
  recipeName: string        // Cached for display
  quantity: number
  costPerUnit: number       // Recipe cost
  pricePerUnit: number      // Selling price
  subtotalCost: number      // Cost × quantity
  subtotalRevenue: number   // Price × quantity
  profit: number           // Revenue - Cost
}

export interface Order {
  id: string
  orderNumber: string       // Display number (e.g., "ORD-001")
  customerName: string
  customerPhone?: string
  customerEmail?: string
  items: OrderItem[]
  status: 'new' | 'in-progress' | 'ready' | 'delivered' | 'cancelled'
  orderDate: string         // ISO date string
  deliveryDate: string      // ISO date string
  deliveryTime?: string     // Optional time
  totalCost: number         // Sum of all item costs
  totalRevenue: number      // What customer pays
  totalProfit: number       // Revenue - Cost
  notes: string
  deliveryAddress?: string
  paymentStatus?: 'unpaid' | 'partial' | 'paid'
  paymentMethod?: string
  createdAt: string
  updatedAt: string
}

export interface Customer {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  orderHistory: string[]    // Order IDs
  totalOrders: number
  totalSpent: number
  notes: string
  createdAt: string
}

export interface PricingStrategy {
  id: string
  recipeId: string
  recipeName: string
  basePrice: number         // From recipe cost
  markup: number           // Percentage (e.g., 150 for 1.5x)
  finalPrice: number
  competitorPrice?: number
  strategy: 'cost-plus' | 'competitive' | 'premium' | 'custom'
  notes: string
  createdAt: string
  updatedAt: string
}

export interface PricingBreakdown {
  ingredientCost: number
  laborCost: number
  overheadCost: number
  totalCost: number
  suggestedMarkup: number
  suggestedPrice: number
  profitMargin: number
}

export interface PricingComparison {
  strategy: 'cost-plus' | 'competitive' | 'premium' | 'value'
  multiplier: number
  price: number
  profit: number
  marginPercentage: number
  description: string
  recommendation?: string
}

// Analytics Types
export interface DateRange {
  start: string
  end: string
}

export interface RevenueByPeriod {
  period: string  // e.g., "2024-W42" or "2024-10"
  revenue: number
  orders: number
  profit: number
}

export interface ProductPerformance {
  recipeId: string
  recipeName: string
  unitsSold: number
  revenue: number
  cost: number
  profit: number
  marginPercentage: number
  averagePrice: number
}

export interface CustomerAnalytics {
  totalCustomers: number
  newCustomers: number
  repeatCustomers: number
  averageOrderValue: number
  topSpenders: Customer[]
}

// Utility type for form data
export type OrderFormData = Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'totalCost' | 'totalRevenue' | 'totalProfit'>

// Default category options for recipes (used as initial suggestions)
export const DEFAULT_RECIPE_CATEGORIES: RecipeCategory[] = [
  'Cakes',
  'Cookies',
  'Bread',
  'Pastries',
  'Pies',
  'Other'
]

// Inventory Management
export interface InventoryItem {
  ingredientId: string      // Links to Ingredient
  currentStock: number      // Current quantity in stock
  minStock: number         // Minimum stock level (alert threshold)
  maxStock?: number        // Optional maximum stock level
  unit: string            // Same as ingredient unit
  lastUpdated: string     // ISO date string
  lastRestocked?: string  // ISO date string of last purchase
  expirationDate?: string // ISO date string
  supplier?: string       // Supplier name or ID
  costPerUnit: number     // Current cost (tracks price changes)
}

export interface ShoppingListItem {
  ingredientId: string
  ingredientName: string
  needed: number          // How much is needed
  currentStock: number    // Current stock
  deficit: number        // needed - currentStock (if negative, surplus)
  unit: string
  estimatedCost: number   // deficit × costPerUnit
  priority: 'critical' | 'needed' | 'optional'
}

export interface InventoryAlert {
  type: 'low-stock' | 'out-of-stock' | 'expiring-soon' | 'expired'
  ingredientId: string
  ingredientName: string
  currentStock: number
  minStock: number
  message: string
  severity: 'error' | 'warning' | 'info'
}

// Status options with display labels
export const ORDER_STATUSES = [
  { value: 'new', label: 'New', color: 'blue' },
  { value: 'in-progress', label: 'In Progress', color: 'yellow' },
  { value: 'ready', label: 'Ready', color: 'green' },
  { value: 'delivered', label: 'Delivered', color: 'gray' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
] as const

// Invoice Types
export interface InvoiceItem {
  id: string
  description: string      // Item description (can be recipe name or custom)
  quantity: number
  unitPrice: number
  total: number           // quantity × unitPrice
  taxable: boolean       // Whether this item is taxable
}

export interface Invoice {
  id: string
  invoiceNumber: string    // e.g., "INV-2025-001"
  orderId?: string        // Optional link to order
  
  // Customer info
  customerId?: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  customerAddress?: string
  
  // Invoice details
  invoiceDate: string     // ISO date string
  dueDate: string        // ISO date string
  paymentTerms: 'due-on-receipt' | 'net-7' | 'net-15' | 'net-30' | 'net-60' | 'custom'
  customPaymentTerms?: string  // If paymentTerms is 'custom'
  
  // Items
  items: InvoiceItem[]
  
  // Calculations
  subtotal: number
  taxRate: number        // Percentage (e.g., 8 for 8%)
  taxAmount: number
  discount: number       // Amount
  discountPercentage?: number  // Optional percentage
  total: number          // subtotal + taxAmount - discount
  
  // Payment
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'overdue'
  amountPaid: number
  amountDue: number      // total - amountPaid
  paymentMethod?: string
  paymentDate?: string   // ISO date string when paid
  
  // Additional info
  notes?: string         // Internal notes
  terms?: string         // Terms and conditions
  footer?: string        // Footer text (e.g., "Thank you for your business!")
  
  // Metadata
  createdAt: string
  updatedAt: string
  sentAt?: string        // When invoice was sent to customer
  emailedTo?: string[]   // Email addresses invoice was sent to
}

// Payment terms options
export const PAYMENT_TERMS = [
  { value: 'due-on-receipt', label: 'Due on Receipt', days: 0 },
  { value: 'net-7', label: 'Net 7 days', days: 7 },
  { value: 'net-15', label: 'Net 15 days', days: 15 },
  { value: 'net-30', label: 'Net 30 days', days: 30 },
  { value: 'net-60', label: 'Net 60 days', days: 60 },
  { value: 'custom', label: 'Custom', days: 0 },
] as const

// Invoice status options
export const INVOICE_STATUSES = [
  { value: 'unpaid', label: 'Unpaid', color: 'yellow' },
  { value: 'partial', label: 'Partially Paid', color: 'blue' },
  { value: 'paid', label: 'Paid', color: 'green' },
  { value: 'overdue', label: 'Overdue', color: 'red' },
] as const

// PDF Customization Settings
export interface PDFCustomization {
  // Business Information
  businessName: string
  businessAddress?: string
  businessPhone?: string
  businessEmail?: string
  businessWebsite?: string
  taxId?: string          // Tax ID / EIN / VAT number
  
  // Branding
  logoUrl?: string        // URL or base64 data URL
  primaryColor?: string   // Hex color (e.g., "#f43f5e")
  accentColor?: string    // Hex color for accents
  
  // Layout preferences
  showLogo: boolean
  showBusinessInfo: boolean
  footerText?: string     // Custom footer text
  
  // Invoice specific
  invoicePrefix: string   // e.g., "INV-"
  defaultPaymentTerms: Invoice['paymentTerms']
  defaultTaxRate: number
  defaultNotes?: string
  defaultTerms?: string
  
  // Metadata
  createdAt: string
  updatedAt: string
}
