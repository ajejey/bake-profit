import nodemailer from 'nodemailer'

let transporter: nodemailer.Transporter | null = null

export function getEmailTransporter() {
  if (transporter) {
    return transporter
  }

  const gmailEmail = process.env.NEXT_PUBLIC_GMAIL_EMAIL
  const gmailPassword = process.env.GMAIL_APP_PASSWORD

  if (!gmailEmail || !gmailPassword) {
    throw new Error('Gmail credentials not configured in environment variables')
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
    from: process.env.NEXT_PUBLIC_GMAIL_EMAIL,
  })

  return transporter
}

export async function sendEmail(options: {
  to: string
  subject: string
  html: string
  text?: string
  attachments?: Array<{
    filename: string
    content: Buffer
    contentType: string
  }>
}) {
  const transporter = getEmailTransporter()

  try {
    const info = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_GMAIL_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || 'Hello from BakeProfit',
      attachments: options.attachments
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
