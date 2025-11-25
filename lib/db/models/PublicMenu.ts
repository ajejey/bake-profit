import mongoose, { Schema, Document } from 'mongoose'

// Menu Product subdocument
const MenuProductSchema = new Schema({
  id: { type: String, required: true },
  recipeId: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  image: { type: String },
  isAvailable: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
}, { _id: false })

// Contact Info subdocument
const MenuContactInfoSchema = new Schema({
  phone: { type: String },
  email: { type: String },
  instagram: { type: String },
  facebook: { type: String },
  whatsapp: { type: String },
  website: { type: String },
  address: { type: String },
}, { _id: false })

// Branding subdocument
const MenuBrandingSchema = new Schema({
  businessName: { type: String, required: true },
  tagline: { type: String },
  logo: { type: String },
  primaryColor: { type: String },
  accentColor: { type: String },
  backgroundImage: { type: String },
}, { _id: false })

// Main PublicMenu interface
export interface IPublicMenu extends Document {
  userId: string
  slug: string
  branding: {
    businessName: string
    tagline?: string
    logo?: string
    primaryColor?: string
    accentColor?: string
    backgroundImage?: string
  }
  templateId: 'elegant-floral' | 'modern-minimal' | 'rustic-kraft' | 'playful-pastel'
  products: Array<{
    id: string
    recipeId?: string
    name: string
    description?: string
    price: number
    category?: string
    image?: string
    isAvailable: boolean
    isFeatured?: boolean
    sortOrder: number
  }>
  categories: string[]
  contactInfo: {
    phone?: string
    email?: string
    instagram?: string
    facebook?: string
    whatsapp?: string
    website?: string
    address?: string
  }
  showPrices: boolean
  showContactInfo: boolean
  orderFormEnabled: boolean
  acceptingOrders: boolean
  orderLeadDays?: number
  isPublished: boolean
  publishedAt?: Date
  viewCount: number
  createdAt: Date
  updatedAt: Date
}

// Main schema
const PublicMenuSchema = new Schema<IPublicMenu>({
  userId: { 
    type: String, 
    required: true,
    index: true,
  },
  slug: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    // Only allow alphanumeric, hyphens, and underscores
    match: [/^[a-z0-9-_]+$/, 'Slug can only contain lowercase letters, numbers, hyphens, and underscores'],
  },
  branding: {
    type: MenuBrandingSchema,
    required: true,
  },
  templateId: {
    type: String,
    enum: ['elegant-floral', 'modern-minimal', 'rustic-kraft', 'playful-pastel'],
    default: 'elegant-floral',
  },
  products: {
    type: [MenuProductSchema],
    default: [],
  },
  categories: {
    type: [String],
    default: ['Cakes', 'Cupcakes', 'Cookies', 'Other'],
  },
  contactInfo: {
    type: MenuContactInfoSchema,
    default: {},
  },
  showPrices: {
    type: Boolean,
    default: true,
  },
  showContactInfo: {
    type: Boolean,
    default: true,
  },
  orderFormEnabled: {
    type: Boolean,
    default: false,
  },
  acceptingOrders: {
    type: Boolean,
    default: true,
  },
  orderLeadDays: {
    type: Number,
    default: 2,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

// Index for fast slug lookups (public pages)
PublicMenuSchema.index({ slug: 1 })

// Index for finding user's menu
PublicMenuSchema.index({ userId: 1 })

// Compound index for published menus
PublicMenuSchema.index({ isPublished: 1, slug: 1 })

// Pre-save hook to set publishedAt when first published
PublicMenuSchema.pre('save', function(next) {
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

// Avoid model recompilation in development
const PublicMenu = mongoose.models.PublicMenu || mongoose.model<IPublicMenu>('PublicMenu', PublicMenuSchema)

export default PublicMenu
