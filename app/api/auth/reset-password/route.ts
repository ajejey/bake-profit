import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { findUserByResetToken, clearUserResetToken, updateUser } from '@/lib/db/users'
import { hashPassword } from '@/lib/auth/password'
import { sendEmail } from '@/lib/email/transporter'
import { getPasswordResetConfirmationTemplate } from '@/lib/email/templates'

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = resetPasswordSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0].message,
        },
        { status: 400 }
      )
    }

    const { token, password } = validation.data

    // Find user by reset token
    const user = await findUserByResetToken(token)
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or expired reset token. Please request a new password reset.',
        },
        { status: 400 }
      )
    }

    // Hash new password
    const passwordHash = await hashPassword(password)

    // Update user password and clear reset token
    await updateUser(user.id, {
      password_hash: passwordHash,
    })
    await clearUserResetToken(user.id)

    // Send confirmation email
    const confirmationTemplate = getPasswordResetConfirmationTemplate(user.name || user.email)
    await sendEmail({
      to: user.email,
      subject: 'Your BakeProfit Password Has Been Reset',
      html: confirmationTemplate,
    })

    console.log(`Password reset successful for ${user.email}`)

    return NextResponse.json(
      {
        success: true,
        message: 'Your password has been successfully reset. You can now log in with your new password.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}
