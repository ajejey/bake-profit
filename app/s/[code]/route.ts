import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db/mongodb'
import ShortenedURL from '@/lib/db/models/ShortenedURL'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params

    await connectDB()

    // Find and update click count
    const record = await ShortenedURL.findOneAndUpdate(
      { shortCode: code },
      { $inc: { clicks: 1 } },
      { new: true }
    )

    if (!record) {
      return NextResponse.json(
        { error: 'Short URL not found' },
        { status: 404 }
      )
    }

    // Redirect to original URL
    return NextResponse.redirect(record.originalUrl, { status: 301 })
  } catch (error) {
    console.error('Error redirecting short URL:', error)
    return NextResponse.json(
      { error: 'Failed to redirect' },
      { status: 500 }
    )
  }
}
