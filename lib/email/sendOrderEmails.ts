import { sendEmail } from './transporter'

interface OrderItem {
    name: string
    quantity: number
    price: number
    notes?: string
}

/**
 * Send order notification to baker
 */
export async function sendBakerOrderNotification(options: {
    bakerEmail: string
    businessName: string
    orderNumber: string
    customerName: string
    customerPhone?: string
    customerEmail?: string
    items: OrderItem[]
    deliveryDate: string
    deliveryType: 'pickup' | 'delivery'
    address?: string
    notes?: string
    totalAmount: number
}): Promise<{ success: boolean; error?: string }> {
    try {
        const {
            bakerEmail,
            businessName,
            orderNumber,
            customerName,
            customerPhone,
            customerEmail,
            items,
            deliveryDate,
            deliveryType,
            address,
            notes,
            totalAmount,
        } = options

        const itemsHtml = items
            .map(
                (item) => `
      <div style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span style="font-weight: 600; color: #1f2937;">${item.name} <span style="margin: 0 4px;">×</span> ${item.quantity}</span>
          <span style="font-weight: 500; color: #1f2937;">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        ${item.notes ? `<div style="font-size: 13px; color: #6b7280; font-style: italic;">Note: ${item.notes}</div>` : ''}
      </div>
    `
            )
            .join('')

        const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            
            <div style="background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%); color: white; padding: 30px; text-align: center;">
              <div style="font-size: 36px; margin-bottom: 10px;">🧁</div>
              <h1 style="margin: 0 0 10px; font-size: 28px;">New Order Received!</h1>
              <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 20px; font-size: 14px;">
                Order ${orderNumber}
              </div>
            </div>

            <div style="padding: 30px;">
              
              <div style="margin-bottom: 25px;">
                <div style="font-size: 16px; font-weight: 700; color: #1f2937; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Customer Information
                </div>
                <div style="background: #f9fafb; border-left: 4px solid #f43f5e; padding: 15px; border-radius: 4px;">
                  <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                    <span style="color: #6b7280; font-size: 14px;">Name:</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 14px;">${customerName}</span>
                  </div>
                  ${customerPhone ? `
                  <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                    <span style="color: #6b7280; font-size: 14px;">Phone:</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 14px;">${customerPhone}</span>
                  </div>
                  ` : ''}
                  ${customerEmail ? `
                  <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                    <span style="color: #6b7280; font-size: 14px;">Email:</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 14px;">${customerEmail}</span>
                  </div>
                  ` : ''}
                </div>
              </div>

              <div style="margin-bottom: 25px;">
                <div style="font-size: 16px; font-weight: 700; color: #1f2937; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Order Details
                </div>
                <div style="background: white; border: 1px solid #e5e7eb; border-radius: 6px; padding: 15px;">
                  ${itemsHtml}
                  <div style="display: flex; justify-content: space-between; padding: 15px 0 0; margin-top: 15px; border-top: 2px solid #e5e7eb; font-size: 18px; font-weight: 700; color: #e11d48;">
                    <span>Total:</span>
                    <span>$${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div style="margin-bottom: 25px;">
                <div style="font-size: 16px; font-weight: 700; color: #1f2937; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Delivery Information
                </div>
                <div style="background: #f9fafb; border-left: 4px solid #f43f5e; padding: 15px; border-radius: 4px;">
                  <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                    <span style="color: #6b7280; font-size: 14px;">Delivery Date:</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 14px;">${new Date(deliveryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                    <span style="color: #6b7280; font-size: 14px;">Type:</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 14px;">${deliveryType === 'pickup' ? 'Pickup' : 'Delivery'}</span>
                  </div>
                  ${deliveryType === 'delivery' && address ? `
                  <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                    <span style="color: #6b7280; font-size: 14px;">Address:</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 14px;">${address}</span>
                  </div>
                  ` : ''}
                </div>
              </div>

              ${notes ? `
              <div style="margin-bottom: 25px;">
                <div style="font-size: 16px; font-weight: 700; color: #1f2937; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Special Instructions
                </div>
                <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; font-size: 14px; color: #92400e;">
                  ${notes}
                </div>
              </div>
              ` : ''}

              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://bakeprofit.vercel.app'}/bakery-business-tool/orders" 
                   style="display: inline-block; background: #f43f5e; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                  View Order in Dashboard
                </a>
              </div>

              <p style="text-align: center; color: #6b7280; font-size: 13px; margin-top: 20px;">
                This order was placed via your ${businessName} online menu
              </p>
            </div>

            <div style="background: #f9fafb; padding: 20px 30px; text-align: center; font-size: 12px; color: #6b7280;">
              <p>© ${new Date().getFullYear()} BakeProfit. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

        await sendEmail({
            to: bakerEmail,
            subject: `🧁 New Order ${orderNumber} from ${customerName}`,
            html: htmlContent,
            text: `New Order Received!\n\nOrder: ${orderNumber}\nCustomer: ${customerName}\nDelivery: ${new Date(deliveryDate).toLocaleDateString()}\nTotal: $${totalAmount.toFixed(2)}\n\nView order in your dashboard at ${process.env.NEXT_PUBLIC_APP_URL || 'https://bakeprofit.vercel.app'}/bakery-business-tool/orders`,
        })

        return { success: true }
    } catch (error) {
        console.error('Error sending baker notification:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to send email',
        }
    }
}

/**
 * Send order confirmation to customer
 */
export async function sendCustomerOrderConfirmation(options: {
    customerEmail: string
    businessName: string
    customerName: string
    orderNumber: string
    items: OrderItem[]
    deliveryDate: string
    deliveryType: 'pickup' | 'delivery'
    totalAmount: number
    contactPhone?: string
    contactEmail?: string
    contactInstagram?: string
}): Promise<{ success: boolean; error?: string }> {
    try {
        const {
            customerEmail,
            businessName,
            customerName,
            orderNumber,
            items,
            deliveryDate,
            deliveryType,
            totalAmount,
            contactPhone,
            contactEmail: bizEmail,
            contactInstagram,
        } = options

        const itemsHtml = items
            .map(
                (item) => `
      <div style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #1f2937;">${item.name} <span style="margin: 0 4px;">×</span> ${item.quantity}</span>
          <span style="font-weight: 500; color: #1f2937;">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    `
            )
            .join('')

        const contactInfo = []
        if (contactPhone) contactInfo.push(`📞 ${contactPhone}`)
        if (bizEmail) contactInfo.push(`✉️ ${bizEmail}`)
        if (contactInstagram) contactInfo.push(`📸 ${contactInstagram}`)

        const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">✓</div>
              <h1 style="margin: 0 0 5px; font-size: 28px;">Order Confirmed!</h1>
              <p style="margin: 0; font-size: 16px;">Thank you for your order</p>
            </div>

            <div style="padding: 30px;">
              <p style="font-size: 18px; color: #1f2937; margin-bottom: 15px;">Hi ${customerName},</p>
              
              <p style="font-size: 15px; color: #6b7280; margin-bottom: 25px; line-height: 1.7;">
                Thank you for your order! We've received it and will start preparing your delicious treats.
              </p>

              <div style="text-align: center; font-size: 14px; color: #6b7280; margin-bottom: 15px;">
                Your Order Number
                <strong style="display: block; font-size: 18px; color: #e11d48; margin-top: 5px;">${orderNumber}</strong>
              </div>

              <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin: 20px 0;">
                ${itemsHtml}
                <div style="display: flex; justify-content: space-between; padding: 15px 0 0; margin-top: 15px; border-top: 2px solid #e5e7eb; font-size: 18px; font-weight: 700; color: #10b981;">
                  <span>Total:</span>
                  <span>$${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px; margin: 20px 0; font-size: 14px; color: #1e40af;">
                <strong>📅 ${deliveryType === 'pickup' ? 'Pickup' : 'Delivery'} Date:</strong> ${new Date(deliveryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>

              ${contactInfo.length > 0 ? `
              <div style="text-align: center; padding: 20px; background: #fef2f2; border-radius: 6px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px; color: #e11d48; font-size: 16px;">Questions? Get in touch!</h3>
                ${contactInfo.map(info => `<p style="margin: 5px 0; color: #6b7280; font-size: 14px;">${info}</p>`).join('')}
              </div>
              ` : ''}

              <p style="font-size: 15px; color: #6b7280; margin-top: 25px; line-height: 1.7;">
                We'll reach out if we have any questions about your order. Looking forward to serving you!
              </p>

              <p style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 25px;">
                <strong>${businessName}</strong>
              </p>
            </div>

            <div style="background: #f9fafb; padding: 20px 30px; text-align: center; font-size: 12px; color: #6b7280;">
              <p>This is an automated confirmation email.</p>
              <p>Please keep this email for your records.</p>
            </div>
          </div>
        </body>
      </html>
    `

        await sendEmail({
            to: customerEmail,
            subject: `Order Confirmation - ${orderNumber} from ${businessName}`,
            html: htmlContent,
            text: `Order Confirmed!\n\nThank you for your order, ${customerName}!\n\nOrder Number: ${orderNumber}\nDelivery Date: ${new Date(deliveryDate).toLocaleDateString()}\nTotal: $${totalAmount.toFixed(2)}\n\nWe'll start preparing your order soon. Looking forward to serving you!\n\n${businessName}`,
        })

        return { success: true }
    } catch (error) {
        console.error('Error sending customer confirmation:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to send email',
        }
    }
}
