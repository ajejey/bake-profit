import { sendEmail } from './transporter'
import { getInvoiceEmailTemplate, getInvoiceEmailPlainText } from './templates'
import { generateInvoicePDF, getInvoicePDFFilename } from '@/app/bakery-business-tool/lib/pdfGenerators/invoicePDF'
import type { Invoice, PDFCustomization } from '@/app/bakery-business-tool/types'

export interface SendInvoiceEmailOptions {
  invoice: Invoice
  recipientEmail: string
  customization?: Partial<PDFCustomization>
  currencySymbol?: string
}

export async function sendInvoiceEmail(options: SendInvoiceEmailOptions): Promise<{
  success: boolean
  messageId?: string
  error?: string
}> {
  try {
    const { invoice, recipientEmail, customization, currencySymbol = '$' } = options

    // Generate PDF
    const pdf = generateInvoicePDF(invoice, { customization, currencySymbol })
    const pdfBlob = pdf.getBlob()
    
    // Convert blob to buffer for nodemailer
    const pdfBuffer = await blobToBuffer(pdfBlob)
    
    // Format amounts and dates
    const amount = `${currencySymbol}${invoice.amountDue.toFixed(2)}`
    const dueDate = new Date(invoice.dueDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
    
    const businessName = customization?.businessName || 'BakeProfit'
    
    // Generate email content
    const htmlContent = getInvoiceEmailTemplate(
      invoice.customerName,
      invoice.invoiceNumber,
      amount,
      dueDate,
      businessName
    )
    
    const textContent = getInvoiceEmailPlainText(
      invoice.customerName,
      invoice.invoiceNumber,
      amount,
      dueDate,
      businessName
    )
    
    // Get filename
    const filename = getInvoicePDFFilename(invoice)
    
    // Send email with attachment
    const result = await sendEmail({
      to: recipientEmail,
      subject: `Invoice ${invoice.invoiceNumber} from ${businessName}`,
      html: htmlContent,
      text: textContent,
      attachments: [{
        filename,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }]
    })
    
    return {
      success: true,
      messageId: result.messageId
    }
  } catch (error) {
    console.error('Error sending invoice email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    }
  }
}

// Helper to convert Blob to Buffer
async function blobToBuffer(blob: Blob): Promise<Buffer> {
  const arrayBuffer = await blob.arrayBuffer()
  return Buffer.from(arrayBuffer)
}
