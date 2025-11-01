export function getResetPasswordEmailTemplate(
  userName: string,
  resetLink: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #f43f5e;
            padding-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            color: #1f2937;
            font-size: 28px;
            font-weight: 700;
          }
          .logo {
            font-size: 24px;
            margin-bottom: 10px;
            font-weight: 700;
            color: #e11d48;
          }
          .content {
            margin-bottom: 30px;
          }
          .greeting {
            font-size: 16px;
            margin-bottom: 20px;
            color: #1f2937;
          }
          .message {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
            line-height: 1.8;
          }
          .cta-button {
            display: inline-block;
            background-color: #f43f5e;
            color: #ffffff;
            padding: 12px 30px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
            transition: background-color 0.3s;
          }
          .cta-button:hover {
            background-color: #e11d48;
          }
          .link-text {
            font-size: 12px;
            color: #999;
            word-break: break-all;
            margin-top: 15px;
            padding: 10px;
            background-color: #f9fafb;
            border-radius: 4px;
          }
          .warning {
            background-color: #ffe4e6;
            border-left: 4px solid #f43f5e;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            font-size: 13px;
            color: #881337;
          }
          .footer {
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
            margin-top: 30px;
            font-size: 12px;
            color: #999;
            text-align: center;
          }
          .footer-links {
            margin-top: 10px;
          }
          .footer-links a {
            color: #f43f5e;
            text-decoration: none;
            margin: 0 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">BakeProfit</div>
            <h1>Reset Your Password</h1>
          </div>

          <div class="content">
            <p class="greeting">Hi ${userName || 'there'},</p>
            
            <p class="message">
              We received a request to reset the password for your BakeProfit account. 
              If you didn't make this request, you can safely ignore this email.
            </p>

            <p class="message">
              To reset your password, click the button below:
            </p>

            <center>
              <a href="${resetLink}" class="cta-button">Reset Password</a>
            </center>

            <div class="link-text">
              Or copy and paste this link in your browser:<br>
              <strong>${resetLink}</strong>
            </div>

            <div class="warning">
              <strong>This link expires in 1 hour.</strong> If you don't use it within an hour, 
              you'll need to request a new password reset.
            </div>

            <p class="message">
              If you have any questions or need help, please don't hesitate to reach out to our support team.
            </p>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} BakeProfit. All rights reserved.</p>
            <div class="footer-links">
              <a href="https://bakeprofit.vercel.app">Website</a>
              <a href="https://bakeprofit.vercel.app/contact">Support</a>
              <a href="https://bakeprofit.vercel.app/privacy">Privacy Policy</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

export function getResetPasswordPlainText(
  userName: string,
  resetLink: string
): string {
  return `
Hi ${userName || 'there'},

We received a request to reset the password for your BakeProfit account.

To reset your password, visit this link:
${resetLink}

This link expires in 1 hour.

If you didn't request this, you can safely ignore this email.

Best regards,
The BakeProfit Team
  `.trim()
}

/**
 * Invoice Email Template
 */
export function getInvoiceEmailTemplate(
  customerName: string,
  invoiceNumber: string,
  amount: string,
  dueDate: string,
  businessName: string = 'BakeProfit'
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #f43f5e;
            padding-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            color: #1f2937;
            font-size: 28px;
            font-weight: 700;
          }
          .logo {
            font-size: 24px;
            margin-bottom: 10px;
            font-weight: 700;
            color: #e11d48;
          }
          .content {
            margin-bottom: 30px;
          }
          .greeting {
            font-size: 16px;
            margin-bottom: 20px;
            color: #1f2937;
          }
          .message {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
            line-height: 1.8;
          }
          .invoice-details {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 20px;
            margin: 25px 0;
          }
          .invoice-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .invoice-row:last-child {
            border-bottom: none;
            font-weight: 600;
            font-size: 16px;
            color: #1f2937;
            padding-top: 15px;
            margin-top: 10px;
            border-top: 2px solid #e5e7eb;
          }
          .invoice-label {
            color: #6b7280;
          }
          .invoice-value {
            color: #1f2937;
            font-weight: 500;
          }
          .amount-due {
            color: #e11d48;
            font-size: 18px;
          }
          .cta-button {
            display: inline-block;
            background-color: #f43f5e;
            color: #ffffff;
            padding: 12px 30px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
            transition: background-color 0.3s;
          }
          .cta-button:hover {
            background-color: #e11d48;
          }
          .attachment-notice {
            background-color: #eff6ff;
            border-left: 4px solid #3b82f6;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            font-size: 13px;
            color: #1e40af;
          }
          .payment-methods {
            background-color: #f9fafb;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
          }
          .payment-methods h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            color: #1f2937;
          }
          .payment-methods ul {
            margin: 0;
            padding-left: 20px;
            font-size: 13px;
            color: #666;
          }
          .footer {
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
            margin-top: 30px;
            font-size: 12px;
            color: #999;
            text-align: center;
          }
          .footer-links {
            margin-top: 10px;
          }
          .footer-links a {
            color: #f43f5e;
            text-decoration: none;
            margin: 0 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">${businessName}</div>
            <h1>Invoice ${invoiceNumber}</h1>
          </div>

          <div class="content">
            <p class="greeting">Dear ${customerName},</p>
            
            <p class="message">
              Thank you for your business! Please find attached your invoice for recent services.
            </p>

            <div class="invoice-details">
              <div class="invoice-row">
                <span class="invoice-label">Invoice Number:</span>
                <span class="invoice-value">${invoiceNumber}</span>
              </div>
              <div class="invoice-row">
                <span class="invoice-label">Due Date:</span>
                <span class="invoice-value">${dueDate}</span>
              </div>
              <div class="invoice-row">
                <span class="invoice-label">Amount Due:</span>
                <span class="invoice-value amount-due">${amount}</span>
              </div>
            </div>

            <div class="attachment-notice">
              <strong>📎 Invoice Attached</strong><br>
              A detailed PDF invoice is attached to this email. Please review it and remit payment by the due date.
            </div>

            <div class="payment-methods">
              <h3>Payment Methods:</h3>
              <ul>
                <li>Cash</li>
                <li>Check (payable to ${businessName})</li>
                <li>Credit Card</li>
                <li>Bank Transfer</li>
              </ul>
            </div>

            <p class="message">
              If you have any questions about this invoice or need to discuss payment arrangements, 
              please don't hesitate to contact us.
            </p>

            <p class="message">
              We appreciate your business and look forward to serving you again!
            </p>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
            <p style="margin-top: 10px; font-size: 11px;">
              This is an automated email. Please do not reply directly to this message.
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

/**
 * Invoice Email Plain Text
 */
export function getInvoiceEmailPlainText(
  customerName: string,
  invoiceNumber: string,
  amount: string,
  dueDate: string,
  businessName: string = 'BakeProfit'
): string {
  return `
Dear ${customerName},

Thank you for your business! Please find attached your invoice for recent services.

INVOICE DETAILS:
----------------
Invoice Number: ${invoiceNumber}
Due Date: ${dueDate}
Amount Due: ${amount}

A detailed PDF invoice is attached to this email. Please review it and remit payment by the due date.

PAYMENT METHODS:
- Cash
- Check (payable to ${businessName})
- Credit Card
- Bank Transfer

If you have any questions about this invoice or need to discuss payment arrangements, please don't hesitate to contact us.

We appreciate your business and look forward to serving you again!

Best regards,
${businessName}
  `.trim()
}

/**
 * Payment Received Confirmation Template
 */
export function getPaymentReceivedTemplate(
  customerName: string,
  invoiceNumber: string,
  amount: string,
  paymentMethod: string,
  businessName: string = 'BakeProfit'
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #10b981;
            padding-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            color: #1f2937;
            font-size: 28px;
            font-weight: 700;
          }
          .logo {
            font-size: 24px;
            margin-bottom: 10px;
            font-weight: 700;
            color: #e11d48;
          }
          .success-icon {
            font-size: 48px;
            margin-bottom: 10px;
          }
          .content {
            margin-bottom: 30px;
          }
          .greeting {
            font-size: 16px;
            margin-bottom: 20px;
            color: #1f2937;
          }
          .message {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
            line-height: 1.8;
          }
          .success-box {
            background-color: #ecfdf5;
            border-left: 4px solid #10b981;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
            color: #065f46;
          }
          .payment-details {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 20px;
            margin: 25px 0;
          }
          .payment-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .payment-row:last-child {
            border-bottom: none;
          }
          .footer {
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
            margin-top: 30px;
            font-size: 12px;
            color: #999;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">✓</div>
            <div class="logo">${businessName}</div>
            <h1>Payment Received</h1>
          </div>

          <div class="content">
            <p class="greeting">Dear ${customerName},</p>
            
            <div class="success-box">
              <strong>Thank you! Your payment has been received and processed.</strong>
            </div>

            <p class="message">
              We have successfully received your payment for invoice ${invoiceNumber}. 
              Your account has been updated and this invoice is now marked as paid.
            </p>

            <div class="payment-details">
              <div class="payment-row">
                <span>Invoice Number:</span>
                <span><strong>${invoiceNumber}</strong></span>
              </div>
              <div class="payment-row">
                <span>Amount Paid:</span>
                <span><strong>${amount}</strong></span>
              </div>
              <div class="payment-row">
                <span>Payment Method:</span>
                <span><strong>${paymentMethod}</strong></span>
              </div>
              <div class="payment-row">
                <span>Payment Date:</span>
                <span><strong>${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong></span>
              </div>
            </div>

            <p class="message">
              A receipt has been attached to this email for your records.
            </p>

            <p class="message">
              We truly appreciate your business and look forward to serving you again!
            </p>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function getPasswordResetConfirmationTemplate(userName: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #10b981;
            padding-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            color: #1f2937;
            font-size: 28px;
            font-weight: 700;
          }
          .logo {
            font-size: 24px;
            margin-bottom: 10px;
            font-weight: 700;
            color: #e11d48;
          }
          .success-icon {
            font-size: 48px;
            margin-bottom: 10px;
          }
          .content {
            margin-bottom: 30px;
          }
          .greeting {
            font-size: 16px;
            margin-bottom: 20px;
            color: #1f2937;
          }
          .message {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
            line-height: 1.8;
          }
          .success-box {
            background-color: #ecfdf5;
            border-left: 4px solid #10b981;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            color: #065f46;
          }
          .footer {
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
            margin-top: 30px;
            font-size: 12px;
            color: #999;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">✓</div>
            <div class="logo">BakeProfit</div>
            <h1>Password Reset Successful</h1>
          </div>

          <div class="content">
            <p class="greeting">Hi ${userName || 'there'},</p>
            
            <p class="message">
              Great news! Your password has been successfully reset.
            </p>

            <div class="success-box">
              You can now log in to your BakeProfit account with your new password.
            </div>

            <p class="message">
              If you didn't reset your password or have any concerns about your account security, 
              please contact our support team immediately.
            </p>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} BakeProfit. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}
