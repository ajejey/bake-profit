import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db/mongodb'
import ShortenedURL from '@/lib/db/models/ShortenedURL'

// Generate unique short code
function generateShortCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    await connectDB()

    // Generate unique short code (retry if collision)
    let shortCode = generateShortCode()
    let attempts = 0
    while (attempts < 10) {
      const existing = await ShortenedURL.findOne({ shortCode })
      if (!existing) break
      shortCode = generateShortCode()
      attempts++
    }

    // Create shortened URL record
    await ShortenedURL.create({
      shortCode,
      originalUrl: url,
      clicks: 0,
      createdAt: new Date(),
    })

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const shortUrl = `${baseUrl}/s/${shortCode}`

    return NextResponse.json({
      shortUrl,
      shortCode,
    })
  } catch (error) {
    console.error('Error shortening URL:', error)
    return NextResponse.json(
      { error: 'Failed to shorten URL' },
      { status: 500 }
    )
  }
}
