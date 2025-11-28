import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db/mongodb'
import PublicMenu from '@/lib/db/models/PublicMenu'
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    // Validate slug format
    if (!/^[a-z0-9-_]+$/.test(slug)) {
      return NextResponse.json({ 
        available: false, 
        error: 'Invalid format. Use only lowercase letters, numbers, hyphens, and underscores.' 
      })
    }

    if (slug.length < 3) {
      return NextResponse.json({ 
        available: false, 
        error: 'URL must be at least 3 characters.' 
      })
    }

    if (slug.length > 50) {
      return NextResponse.json({ 
        available: false, 
        error: 'URL must be less than 50 characters.' 
      })
    }

    await connectDB()

    // Get current user's email to exclude their own menu from the check
    const authHeader = request.headers.get('authorization')
    const token = extractTokenFromHeader(authHeader)
    let currentUserEmail: string | null = null

    if (token) {
      const payload = verifyToken(token)
      if (payload) {
        currentUserEmail = payload.email
      }
    }

    // Check if slug exists (excluding current user's menu)
    const query: Record<string, unknown> = { slug }
    if (currentUserEmail) {
      query.userId = { $ne: currentUserEmail }
    }

    const existingMenu = await PublicMenu.findOne(query)

    return NextResponse.json({ 
      available: !existingMenu,
      slug 
    })
  } catch (error) {
    console.error('Error checking slug:', error)
    return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 })
  }
}
