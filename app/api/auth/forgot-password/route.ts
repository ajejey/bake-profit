import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { findUserByEmail, updateUserResetToken } from '@/lib/db/users'
import { sendEmail } from '@/lib/email/transporter'
import { getResetPasswordEmailTemplate, getResetPasswordPlainText } from '@/lib/email/templates'
import crypto from 'crypto'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = forgotPasswordSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0].message,
        },
        { status: 400 }
      )
    }

    const { email } = validation.data

    // Find user
    const user = await findUserByEmail(email.toLowerCase())
    if (!user) {
      // Don't reveal if user exists (security best practice)
      return NextResponse.json(
        {
          success: true,
          message: 'If an account exists with this email, a password reset link has been sent.',
        },
        { status: 200 }
      )
    }

    // Generate reset token (32 bytes = 64 hex characters)
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // Save reset token to database
    await updateUserResetToken(user.id, resetToken, resetTokenExpires)

    // Create reset link
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const resetLink = `${baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`

    // Send email
    const emailTemplate = getResetPasswordEmailTemplate(user.name || user.email, resetLink)
    const plainText = getResetPasswordPlainText(user.name || user.email, resetLink)

    await sendEmail({
      to: user.email,
      subject: 'Reset Your BakeProfit Password',
      html: emailTemplate,
      text: plainText,
    })

    console.log(`Password reset email sent to ${user.email}`)

    return NextResponse.json(
      {
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}
