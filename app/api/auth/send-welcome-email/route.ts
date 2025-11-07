import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email/sendWelcomeEmail'

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Send welcome email
    const result = await sendWelcomeEmail(email, name || 'there')

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      console.error('Failed to send welcome email:', result.error)
      // Don't fail the signup if email fails
      return NextResponse.json({ 
        success: true, 
        warning: 'Account created but welcome email failed to send' 
      })
    }
  } catch (error) {
    console.error('Error in send-welcome-email route:', error)
    // Don't fail the signup if email fails
    return NextResponse.json({ 
      success: true, 
      warning: 'Account created but welcome email failed to send' 
    })
  }
}
