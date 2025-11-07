import { sendEmail } from './transporter'
import { getWelcomeEmailTemplate } from './templates'

export async function sendWelcomeEmail(
  userEmail: string,
  userName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const htmlContent = getWelcomeEmailTemplate(userName)
    
    await sendEmail({
      to: userEmail,
      subject: 'Welcome to BakeProfit - Let\'s Get Your Bakery Business Organized!',
      html: htmlContent,
      text: `Welcome to BakeProfit, ${userName}! We're excited to help you manage your bakery business. Visit your dashboard to get started.`
    })

    return { success: true }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send welcome email' 
    }
  }
}
