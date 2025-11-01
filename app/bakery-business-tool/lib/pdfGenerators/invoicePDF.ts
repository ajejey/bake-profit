/**
 * Invoice PDF Generator
 * Creates professional, legally-compliant invoices
 */

import { BakeProfitPDF } from '../pdfGenerator'
import type { Invoice, InvoiceItem, PDFCustomization } from '../../types'

export interface InvoicePDFOptions {
  currencySymbol?: string
  customization?: Partial<PDFCustomization>
  showPaymentInstructions?: boolean
  watermark?: 'PAID' | 'DRAFT' | 'OVERDUE' | null
}

/**
 * Generate Professional Invoice PDF
 */
export function generateInvoicePDF(
  invoice: Invoice,
  options: InvoicePDFOptions = {}
): BakeProfitPDF {
  const pdf = new BakeProfitPDF()
  const currencySymbol = options.currencySymbol || '$'
  const customization = options.customization || {}
  
  // Business info from customization or defaults
  const businessName = customization.businessName || 'BakeProfit Business'
  const businessAddress = customization.businessAddress
  const businessPhone = customization.businessPhone
  const businessEmail = customization.businessEmail
  const businessWebsite = customization.businessWebsite
  const taxId = customization.taxId
  
  // Header with business name and invoice title
  pdf.addHeader('INVOICE', businessName, `#${invoice.invoiceNumber}`)
  
  // Status badge
  const statusColors: Record<Invoice['paymentStatus'], 'primary' | 'warning' | 'success' | 'error' | 'gray'> = {
    'unpaid': 'warning',
    'partial': 'primary',
    'paid': 'success',
    'overdue': 'error'
  }
  
  const statusLabels: Record<Invoice['paymentStatus'], string> = {
    'unpaid': 'UNPAID',
    'partial': 'PARTIALLY PAID',
    'paid': 'PAID',
    'overdue': 'OVERDUE'
  }
  
  pdf.addBadge(statusLabels[invoice.paymentStatus], statusColors[invoice.paymentStatus])
  pdf.addSpace(5)
  
  // Two-column layout: Business Info (left) and Customer Info (right)
  const startY = pdf.getYPosition()
  
  // LEFT COLUMN - Business Information
  pdf.addSectionHeader('From', 'gray')
  
  if (businessAddress) pdf.addText(businessAddress, 10)
  if (businessPhone) pdf.addText(`Phone: ${businessPhone}`, 10)
  if (businessEmail) pdf.addText(`Email: ${businessEmail}`, 10)
  if (businessWebsite) pdf.addText(`Website: ${businessWebsite}`, 10)
  if (taxId) pdf.addText(`Tax ID: ${taxId}`, 10)
  
  const leftColumnEndY = pdf.getYPosition()
  
  // RIGHT COLUMN - Customer Information (positioned at same startY)
  pdf.setYPosition(startY)
  
  // We'll manually position this on the right side
  // For now, continue with left column approach and add right column info
  pdf.addSpace(8)
  
  pdf.addSectionHeader('Bill To')
  pdf.addText(invoice.customerName, 10)
  if (invoice.customerAddress) pdf.addText(invoice.customerAddress, 10)
  if (invoice.customerPhone) pdf.addText(`Phone: ${invoice.customerPhone}`, 10)
  if (invoice.customerEmail) pdf.addText(`Email: ${invoice.customerEmail}`, 10)
  
  pdf.addSpace(8)
  
  // Invoice Details Section
  pdf.addSectionHeader('Invoice Details', 'secondary')
  
  const invoiceDate = new Date(invoice.invoiceDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  
  const dueDate = new Date(invoice.dueDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  
  pdf.addTwoColumnInfo('Invoice Date', invoiceDate, 'Due Date', dueDate)
  
  // Payment terms
  const paymentTermsLabel = invoice.paymentTerms === 'custom' 
    ? invoice.customPaymentTerms || 'Custom terms'
    : invoice.paymentTerms.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  pdf.addKeyValue('Payment Terms', paymentTermsLabel)
  
  if (invoice.orderId) {
    pdf.addKeyValue('Related Order', invoice.orderId)
  }
  
  pdf.addSpace(10)
  
  // Items Table
  pdf.addSectionHeader('Items')
  
  const itemRows = invoice.items.map(item => ({
    description: item.description,
    quantity: item.quantity.toString(),
    unitPrice: `${currencySymbol}${item.unitPrice.toFixed(2)}`,
    total: `${currencySymbol}${item.total.toFixed(2)}`,
    taxable: item.taxable ? 'Yes' : 'No'
  }))
  
  pdf.addTable(
    [
      { header: 'Description', dataKey: 'description', width: 70, align: 'left' },
      { header: 'Qty', dataKey: 'quantity', width: 20, align: 'center' },
      { header: 'Unit Price', dataKey: 'unitPrice', width: 30, align: 'right' },
      { header: 'Taxable', dataKey: 'taxable', width: 20, align: 'center' },
      { header: 'Total', dataKey: 'total', width: 30, align: 'right' }
    ],
    itemRows
  )
  
  pdf.addSpace(5)
  
  // Summary Box
  const summaryItems = [
    { label: 'Subtotal', value: `${currencySymbol}${invoice.subtotal.toFixed(2)}` }
  ]
  
  if (invoice.discount > 0) {
    const discountLabel = invoice.discountPercentage 
      ? `Discount (${invoice.discountPercentage}%)`
      : 'Discount'
    summaryItems.push({ 
      label: discountLabel, 
      value: `-${currencySymbol}${invoice.discount.toFixed(2)}` 
    })
  }
  
  if (invoice.taxRate > 0) {
    summaryItems.push({ 
      label: `Tax (${invoice.taxRate}%)`, 
      value: `${currencySymbol}${invoice.taxAmount.toFixed(2)}` 
    })
  }
  
  summaryItems.push({ 
    label: 'Total', 
    value: `${currencySymbol}${invoice.total.toFixed(2)}`
  })
  
  if (invoice.amountPaid > 0) {
    summaryItems.push({ 
      label: 'Amount Paid', 
      value: `-${currencySymbol}${invoice.amountPaid.toFixed(2)}` 
    })
  }
  
  summaryItems.push({ 
    label: invoice.paymentStatus === 'paid' ? 'Amount Paid' : 'Amount Due', 
    value: `${currencySymbol}${invoice.amountDue.toFixed(2)}`
  })
  
  pdf.addSummaryBox(summaryItems)
  
  pdf.addSpace(10)
  
  // Payment Status Information
  if (invoice.paymentStatus === 'paid' && invoice.paymentDate) {
    pdf.addSectionHeader('Payment Information', 'primary')
    pdf.addCard(() => {
      const paidDate = new Date(invoice.paymentDate!).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
      pdf.addText(`✓ This invoice was paid on ${paidDate}`, 10)
      if (invoice.paymentMethod) {
        pdf.addText(`Payment Method: ${invoice.paymentMethod}`, 10)
      }
    })
    pdf.addSpace(5)
  } else if (invoice.paymentStatus === 'overdue') {
    pdf.addSectionHeader('Payment Overdue', 'primary')
    pdf.addCard(() => {
      pdf.addText(`⚠ This invoice is overdue. Payment was due on ${dueDate}.`, 10)
      pdf.addText(`Please remit payment immediately to avoid late fees.`, 10)
    })
    pdf.addSpace(5)
  } else if (options.showPaymentInstructions !== false) {
    pdf.addSectionHeader('Payment Instructions', 'secondary')
    pdf.addCard(() => {
      pdf.addText(`Please make payment by ${dueDate}.`, 10)
      pdf.addSpace(3)
      pdf.addText('Payment Methods Accepted:', 10)
      pdf.addText('• Cash', 9)
      pdf.addText('• Check (payable to ' + businessName + ')', 9)
      pdf.addText('• Credit Card', 9)
      if (businessPhone) {
        pdf.addText(`• Call ${businessPhone} to pay by phone`, 9)
      }
      if (businessEmail) {
        pdf.addText(`• Email ${businessEmail} for payment arrangements`, 9)
      }
    })
    pdf.addSpace(5)
  }
  
  // Notes
  if (invoice.notes) {
    pdf.addSectionHeader('Notes', 'gray')
    pdf.addCard(() => {
      pdf.addText(invoice.notes!, 10)
    })
    pdf.addSpace(5)
  }
  
  // Terms and Conditions
  if (invoice.terms || customization.defaultTerms) {
    pdf.addSectionHeader('Terms & Conditions', 'gray')
    pdf.addText(invoice.terms || customization.defaultTerms || '', 9)
    pdf.addSpace(5)
  }
  
  // Footer message
  pdf.addSpace(10)
  pdf.addSeparator('light')
  pdf.addSpace(5)
  
  const footerMessage = invoice.footer || customization.footerText || 'Thank you for your business!'
  pdf.addText(footerMessage, 11)
  
  // Contact info
  if (businessPhone || businessEmail) {
    pdf.addSpace(3)
    const contactInfo: string[] = []
    if (businessPhone) contactInfo.push(`Phone: ${businessPhone}`)
    if (businessEmail) contactInfo.push(`Email: ${businessEmail}`)
    if (businessWebsite) contactInfo.push(`Web: ${businessWebsite}`)
    
    pdf.addText(contactInfo.join('  |  '), 9)
  }
  
  // Standard footer
  pdf.addFooter()
  
  return pdf
}

/**
 * Generate filename for invoice
 */
export function getInvoicePDFFilename(invoice: Invoice): string {
  const date = new Date().toISOString().split('T')[0]
  const customerName = invoice.customerName.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  
  return `invoice-${invoice.invoiceNumber}-${customerName}-${date}.pdf`
}

/**
 * Generate invoice from order (convenience function)
 */
export function createInvoiceFromOrder(
  order: any, // Order type
  invoiceNumber: string,
  paymentTerms: Invoice['paymentTerms'] = 'due-on-receipt',
  taxRate: number = 0
): Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'> {
  const invoiceDate = new Date().toISOString()
  const dueDate = new Date()
  
  // Calculate due date based on payment terms
  const termsDays: Record<string, number> = {
    'due-on-receipt': 0,
    'net-7': 7,
    'net-15': 15,
    'net-30': 30,
    'net-60': 60
  }
  
  dueDate.setDate(dueDate.getDate() + (termsDays[paymentTerms] || 0))
  
  // Convert order items to invoice items
  const items: InvoiceItem[] = order.items.map((item: any) => ({
    id: item.id,
    description: item.recipeName,
    quantity: item.quantity,
    unitPrice: item.pricePerUnit,
    total: item.subtotalRevenue,
    taxable: true
  }))
  
  const subtotal = order.totalRevenue
  const taxAmount = (subtotal * taxRate) / 100
  const total = subtotal + taxAmount
  
  return {
    invoiceNumber,
    orderId: order.id,
    customerId: order.customerId,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    customerPhone: order.customerPhone,
    customerAddress: order.deliveryAddress,
    invoiceDate,
    dueDate: dueDate.toISOString(),
    paymentTerms,
    items,
    subtotal,
    taxRate,
    taxAmount,
    discount: 0,
    total,
    paymentStatus: 'unpaid',
    amountPaid: 0,
    amountDue: total,
    notes: order.notes
  }
}
