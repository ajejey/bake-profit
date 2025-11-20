/**
 * Order PDF Generator
 * Creates professional order confirmations, kitchen sheets, and delivery receipts
 */

import { BakeProfitPDF } from '../pdfGenerator'
import type { Order, Customer } from '../../types'

export type OrderPDFType = 'confirmation' | 'kitchen' | 'delivery' | 'packing'

export interface OrderPDFOptions {
  type: OrderPDFType
  currencySymbol?: string
  dateFormat?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'
  businessName?: string
  businessPhone?: string
  businessEmail?: string
  businessAddress?: string
  showPrices?: boolean
  includeSignature?: boolean
  notes?: string
}

/**
 * Format date according to user's preferred format
 */
function formatDateByPreference(dateString: string, format: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' = 'MM/DD/YYYY'): string {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  switch (format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`
    case 'MM/DD/YYYY':
    default:
      return `${month}/${day}/${year}`
  }
}


/**
 * Generate Order PDF
 */
export function generateOrderPDF(
  order: Order,
  customer: Customer | null,
  options: OrderPDFOptions
): BakeProfitPDF {
  const pdf = new BakeProfitPDF()
  const currencySymbol = options.currencySymbol || '$'

  // Add header based on type
  switch (options.type) {
    case 'confirmation':
      pdf.addHeader('ORDER CONFIRMATION', options.businessName, `#${order.orderNumber}`)
      break
    case 'kitchen':
      pdf.addHeader('KITCHEN PRODUCTION SHEET', options.businessName, `#${order.orderNumber}`)
      break
    case 'delivery':
      pdf.addHeader('DELIVERY RECEIPT', options.businessName, `#${order.orderNumber}`)
      break
    case 'packing':
      pdf.addHeader('PACKING SLIP', options.businessName, `#${order.orderNumber}`)
      break
  }

  // Status badge
  const statusColors: Record<Order['status'], 'primary' | 'warning' | 'success' | 'error' | 'gray'> = {
    'new': 'primary',
    'in-progress': 'warning',
    'ready': 'success',
    'delivered': 'gray',
    'cancelled': 'error'
  }

  const statusLabels: Record<Order['status'], string> = {
    'new': 'NEW ORDER',
    'in-progress': 'IN PROGRESS',
    'ready': 'READY',
    'delivered': 'DELIVERED',
    'cancelled': 'CANCELLED'
  }

  pdf.addBadge(statusLabels[order.status], statusColors[order.status])
  pdf.addSpace(3)

  // Customer Information Section
  pdf.addSectionHeader('Customer Information')

  if (customer) {
    pdf.addTwoColumnInfo('Name', customer.name, 'Phone', customer.phone || 'N/A')
    if (customer.email) {
      pdf.addKeyValue('Email', customer.email)
    }
    if (order.deliveryAddress || customer.address) {
      pdf.addKeyValue('Delivery Address', order.deliveryAddress || customer.address || 'N/A')
    }
  } else {
    pdf.addTwoColumnInfo('Name', order.customerName, 'Phone', order.customerPhone || 'N/A')
    if (order.customerEmail) {
      pdf.addKeyValue('Email', order.customerEmail)
    }
    if (order.deliveryAddress) {
      pdf.addKeyValue('Delivery Address', order.deliveryAddress)
    }
  }

  pdf.addSpace(5)

  // Order Details Section
  pdf.addSectionHeader('Order Details')

  const dateFormat = options.dateFormat || 'MM/DD/YYYY'
  const orderDate = formatDateByPreference(order.orderDate, dateFormat)
  const deliveryDate = formatDateByPreference(order.deliveryDate, dateFormat)

  pdf.addTwoColumnInfo('Order Date', orderDate, 'Delivery Date', deliveryDate)

  if (order.deliveryTime) {
    pdf.addKeyValue('Delivery Time', order.deliveryTime)
  }

  if (order.paymentStatus) {
    const paymentStatusLabel = order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)
    pdf.addKeyValue('Payment Status', paymentStatusLabel)
  }

  if (order.paymentMethod) {
    pdf.addKeyValue('Payment Method', order.paymentMethod)
  }

  pdf.addSpace(8)

  // Order Items Section
  pdf.addSectionHeader('Order Items')

  if (options.type === 'kitchen') {
    // Kitchen sheet - focus on recipes and quantities, no prices
    const kitchenRows = order.items.map(item => ({
      item: item.recipeName,
      quantity: item.quantity.toString(),
      notes: '☐ Done'
    }))

    pdf.addTable(
      [
        { header: 'Item', dataKey: 'item', width: 100, align: 'left' },
        { header: 'Qty', dataKey: 'quantity', width: 30, align: 'center' },
        { header: 'Status', dataKey: 'notes', width: 40, align: 'center' }
      ],
      kitchenRows
    )
  } else {
    // Customer-facing - show prices
    const showPrices = options.showPrices !== false

    if (showPrices) {
      const itemRows = order.items.map(item => ({
        item: item.recipeName,
        quantity: item.quantity.toString(),
        price: `${currencySymbol}${item.pricePerUnit.toFixed(2)}`,
        total: `${currencySymbol}${item.subtotalRevenue.toFixed(2)}`
      }))

      pdf.addTable(
        [
          { header: 'Item', dataKey: 'item', width: 80, align: 'left' },
          { header: 'Qty', dataKey: 'quantity', width: 25, align: 'center' },
          { header: 'Price', dataKey: 'price', width: 30, align: 'right' },
          { header: 'Total', dataKey: 'total', width: 35, align: 'right' }
        ],
        itemRows
      )
    } else {
      const itemRows = order.items.map(item => ({
        item: item.recipeName,
        quantity: item.quantity.toString()
      }))

      pdf.addTable(
        [
          { header: 'Item', dataKey: 'item', width: 120, align: 'left' },
          { header: 'Quantity', dataKey: 'quantity', width: 50, align: 'center' }
        ],
        itemRows
      )
    }
  }

  pdf.addSpace(5)

  // Order Summary (for customer-facing documents)
  if (options.type !== 'kitchen' && options.showPrices !== false) {
    const summaryItems = [
      { label: 'Subtotal', value: `${currencySymbol}${order.totalRevenue.toFixed(2)}` }
    ]

    // Add tax if configured (would come from settings)
    // summaryItems.push({ label: 'Tax', value: `${currencySymbol}0.00` })

    summaryItems.push({
      label: 'Total',
      value: `${currencySymbol}${order.totalRevenue.toFixed(2)}`
    })

    pdf.addSummaryBox(summaryItems)
  }

  pdf.addSpace(8)

  // Special Instructions / Notes
  if (order.notes) {
    pdf.addSectionHeader('Special Instructions', 'secondary')
    pdf.addCard(() => {
      pdf.addText(order.notes, 10)
    })
    pdf.addSpace(5)
  }

  // Additional notes from options
  if (options.notes) {
    pdf.addSectionHeader('Notes', 'gray')
    pdf.addText(options.notes, 9)
    pdf.addSpace(5)
  }

  // Signature section for delivery receipts
  if (options.includeSignature && options.type === 'delivery') {
    pdf.addSpace(10)
    pdf.addSeparator('dark')
    pdf.addSpace(8)

    pdf.addText('Customer Signature: _________________________________', 10)
    pdf.addSpace(8)
    pdf.addText('Date: _________________    Time: _________________', 10)
    pdf.addSpace(8)
  }

  // Business contact info
  if (options.type === 'confirmation' || options.type === 'delivery') {
    pdf.addSpace(10)
    pdf.addSeparator('light')
    pdf.addSpace(5)

    const contactInfo: string[] = []
    if (options.businessName) contactInfo.push(options.businessName)
    if (options.businessPhone) contactInfo.push(`Phone: ${options.businessPhone}`)
    if (options.businessEmail) contactInfo.push(`Email: ${options.businessEmail}`)
    if (options.businessAddress) contactInfo.push(options.businessAddress)

    if (contactInfo.length > 0) {
      pdf.addText(contactInfo.join(' | '), 9)
    }
  }

  // Footer
  pdf.addFooter()

  return pdf
}

/**
 * Helper to generate filename
 */
export function getOrderPDFFilename(order: Order, type: OrderPDFType): string {
  const date = new Date().toISOString().split('T')[0]
  const customerName = order.customerName.replace(/[^a-z0-9]/gi, '-').toLowerCase()

  return `${type}-${order.orderNumber}-${customerName}-${date}.pdf`
}

/**
 * Quick exports for common use cases
 */
export function generateOrderConfirmation(
  order: Order,
  customer: Customer | null,
  options: Partial<OrderPDFOptions> = {}
): BakeProfitPDF {
  return generateOrderPDF(order, customer, {
    type: 'confirmation',
    showPrices: true,
    includeSignature: false,
    ...options
  })
}

export function generateKitchenSheet(
  order: Order,
  customer: Customer | null,
  options: Partial<OrderPDFOptions> = {}
): BakeProfitPDF {
  return generateOrderPDF(order, customer, {
    type: 'kitchen',
    showPrices: false,
    includeSignature: false,
    notes: 'Check off items as completed. Notify manager when order is ready.',
    ...options
  })
}

export function generateDeliveryReceipt(
  order: Order,
  customer: Customer | null,
  options: Partial<OrderPDFOptions> = {}
): BakeProfitPDF {
  return generateOrderPDF(order, customer, {
    type: 'delivery',
    showPrices: true,
    includeSignature: true,
    ...options
  })
}

export function generatePackingSlip(
  order: Order,
  customer: Customer | null,
  options: Partial<OrderPDFOptions> = {}
): BakeProfitPDF {
  return generateOrderPDF(order, customer, {
    type: 'packing',
    showPrices: false,
    includeSignature: false,
    ...options
  })
}
