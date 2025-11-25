import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/db/mongodb'
import PublicMenu from '@/lib/db/models/PublicMenu'
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt'

// Extract user ID from JWT token
function getUserIdFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  const token = extractTokenFromHeader(authHeader)
  
  if (!token) {
    return null
  }

  const payload = verifyToken(token)
  
  if (!payload) {
    try {
      const decoded = jwt.decode(token) as Record<string, unknown> | null
      if (decoded && typeof decoded.email === 'string') {
        return decoded.email
      }
    } catch {
      return null
    }
    return null
  }

  return payload.email
}

// GET - Fetch user's menu
export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    
    const menu = await PublicMenu.findOne({ userId })
    
    if (!menu) {
      return NextResponse.json({ menu: null })
    }

    return NextResponse.json({ menu })
  } catch (error) {
    console.error('Error fetching menu:', error)
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 })
  }
}

// POST - Create new menu
export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    
    // Check if user already has a menu
    const existingMenu = await PublicMenu.findOne({ userId })
    if (existingMenu) {
      return NextResponse.json({ error: 'Menu already exists. Use PUT to update.' }, { status: 400 })
    }

    const body = await request.json()
    
    // Validate slug
    if (!body.slug || !/^[a-z0-9-_]+$/.test(body.slug)) {
      return NextResponse.json({ 
        error: 'Invalid slug. Use only lowercase letters, numbers, hyphens, and underscores.' 
      }, { status: 400 })
    }

    // Check if slug is already taken
    const slugExists = await PublicMenu.findOne({ slug: body.slug })
    if (slugExists) {
      return NextResponse.json({ error: 'This URL is already taken. Please choose another.' }, { status: 400 })
    }

    const menu = new PublicMenu({
      userId,
      slug: body.slug,
      branding: body.branding || { businessName: 'My Bakery' },
      templateId: body.templateId || 'elegant-floral',
      products: body.products || [],
      categories: body.categories || ['Cakes', 'Cupcakes', 'Cookies', 'Other'],
      contactInfo: body.contactInfo || {},
      showPrices: body.showPrices ?? true,
      showContactInfo: body.showContactInfo ?? true,
      orderFormEnabled: body.orderFormEnabled ?? false,
      acceptingOrders: body.acceptingOrders ?? true,
      orderLeadDays: body.orderLeadDays ?? 2,
      isPublished: body.isPublished ?? false,
      viewCount: 0,
    })

    await menu.save()

    return NextResponse.json({ menu }, { status: 201 })
  } catch (error) {
    console.error('Error creating menu:', error)
    return NextResponse.json({ error: 'Failed to create menu' }, { status: 500 })
  }
}

// PUT - Update menu
export async function PUT(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    
    const body = await request.json()
    
    // Find user's menu
    const menu = await PublicMenu.findOne({ userId })
    if (!menu) {
      return NextResponse.json({ error: 'Menu not found' }, { status: 404 })
    }

    // If slug is being changed, check availability
    if (body.slug && body.slug !== menu.slug) {
      if (!/^[a-z0-9-_]+$/.test(body.slug)) {
        return NextResponse.json({ 
          error: 'Invalid slug. Use only lowercase letters, numbers, hyphens, and underscores.' 
        }, { status: 400 })
      }
      
      const slugExists = await PublicMenu.findOne({ slug: body.slug, _id: { $ne: menu._id } })
      if (slugExists) {
        return NextResponse.json({ error: 'This URL is already taken. Please choose another.' }, { status: 400 })
      }
      menu.slug = body.slug
    }

    // Update fields
    if (body.branding) menu.branding = body.branding
    if (body.templateId) menu.templateId = body.templateId
    if (body.products !== undefined) menu.products = body.products
    if (body.categories) menu.categories = body.categories
    if (body.contactInfo) menu.contactInfo = body.contactInfo
    if (body.showPrices !== undefined) menu.showPrices = body.showPrices
    if (body.showContactInfo !== undefined) menu.showContactInfo = body.showContactInfo
    if (body.orderFormEnabled !== undefined) menu.orderFormEnabled = body.orderFormEnabled
    if (body.acceptingOrders !== undefined) menu.acceptingOrders = body.acceptingOrders
    if (body.orderLeadDays !== undefined) menu.orderLeadDays = body.orderLeadDays
    if (body.isPublished !== undefined) menu.isPublished = body.isPublished

    await menu.save()

    return NextResponse.json({ menu })
  } catch (error) {
    console.error('Error updating menu:', error)
    return NextResponse.json({ error: 'Failed to update menu' }, { status: 500 })
  }
}

// DELETE - Delete menu
export async function DELETE(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    
    const result = await PublicMenu.deleteOne({ userId })
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Menu not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting menu:', error)
    return NextResponse.json({ error: 'Failed to delete menu' }, { status: 500 })
  }
}
