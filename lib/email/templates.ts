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

/**
 * Welcome Email Template - First Time User Onboarding
 */
export function getWelcomeEmailTemplate(userName: string): string {
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
            background-color: #fef2f2;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 650px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
            color: #ffffff;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0 0 10px 0;
            font-size: 32px;
            font-weight: 700;
          }
          .header p {
            margin: 0;
            font-size: 16px;
            opacity: 0.95;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #1f2937;
            font-weight: 600;
          }
          .intro {
            font-size: 15px;
            color: #4b5563;
            margin-bottom: 30px;
            line-height: 1.7;
          }
          .section {
            margin-bottom: 35px;
          }
          .section-title {
            font-size: 20px;
            font-weight: 700;
            color: #e11d48;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }
          .section-number {
            background-color: #f43f5e;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            font-size: 16px;
            font-weight: 700;
          }
          .section-content {
            font-size: 14px;
            color: #6b7280;
            line-height: 1.8;
            margin-left: 44px;
          }
          .feature-list {
            list-style: none;
            padding: 0;
            margin: 20px 0;
          }
          .feature-list li {
            padding: 12px 0;
            border-bottom: 1px solid #f3f4f6;
            font-size: 14px;
            color: #4b5563;
          }
          .feature-list li:last-child {
            border-bottom: none;
          }
          .feature-list strong {
            color: #1f2937;
            font-weight: 600;
          }
          .cta-box {
            background: linear-gradient(135deg, #fef2f2 0%, #ffe4e6 100%);
            border: 2px solid #fecdd3;
            border-radius: 8px;
            padding: 25px;
            text-align: center;
            margin: 30px 0;
          }
          .cta-box h3 {
            margin: 0 0 15px 0;
            color: #be123c;
            font-size: 18px;
          }
          .cta-button {
            display: inline-block;
            background-color: #f43f5e;
            color: #ffffff;
            padding: 14px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            margin-top: 10px;
            transition: background-color 0.3s;
          }
          .cta-button:hover {
            background-color: #e11d48;
          }
          .tip-box {
            background-color: #fffbeb;
            border-left: 4px solid #f59e0b;
            padding: 18px;
            margin: 25px 0;
            border-radius: 4px;
          }
          .tip-box strong {
            color: #92400e;
            font-size: 14px;
          }
          .tip-box p {
            margin: 8px 0 0 0;
            font-size: 13px;
            color: #78350f;
            line-height: 1.6;
          }
          .help-section {
            background-color: #f9fafb;
            padding: 25px;
            border-radius: 8px;
            margin-top: 30px;
            text-align: center;
          }
          .help-section h3 {
            margin: 0 0 10px 0;
            font-size: 16px;
            color: #1f2937;
          }
          .help-section p {
            margin: 0 0 15px 0;
            font-size: 14px;
            color: #6b7280;
          }
          .help-links a {
            color: #f43f5e;
            text-decoration: none;
            margin: 0 12px;
            font-size: 14px;
            font-weight: 500;
          }
          .footer {
            background-color: #f9fafb;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          }
          .footer p {
            margin: 5px 0;
            font-size: 12px;
            color: #9ca3af;
          }
          .footer-links {
            margin-top: 12px;
          }
          .footer-links a {
            color: #f43f5e;
            text-decoration: none;
            margin: 0 10px;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to BakeProfit!</h1>
            <p>Your journey to a profitable bakery business starts here</p>
          </div>

          <div class="content">
            <p class="greeting">Hi ${userName},</p>
            
            <p class="intro">
              We're thrilled to have you join BakeProfit! You've just taken the first step toward 
              running a more organized, profitable bakery business. Whether you're baking from home 
              or running a small bakery, we're here to help you track costs, manage orders, and 
              price your products correctly.
            </p>

            <div class="section">
              <h2 class="section-title">
                <span class="section-number">1</span>
                Start with Your Ingredients
              </h2>
              <div class="section-content">
                <p>The foundation of accurate pricing starts with knowing your ingredient costs. Here's how to begin:</p>
                <ul class="feature-list">
                  <li><strong>Add Your Ingredients:</strong> Go to Inventory → Ingredients tab and click "Add Ingredient"</li>
                  <li><strong>Enter Package Details:</strong> Add the package size and cost (e.g., 5 lb bag of flour for $4.50)</li>
                  <li><strong>Automatic Calculations:</strong> We'll calculate the cost per unit for you (e.g., $0.90 per lb)</li>
                </ul>
                <p style="margin-top: 15px;">Start with your most-used ingredients like flour, sugar, butter, and eggs.</p>
              </div>
            </div>

            <div class="section">
              <h2 class="section-title">
                <span class="section-number">2</span>
                Create Your First Recipe
              </h2>
              <div class="section-content">
                <p>Once you have ingredients, build your recipes to see exactly what each product costs:</p>
                <ul class="feature-list">
                  <li><strong>Recipe Builder:</strong> Navigate to Recipes and click "Create Recipe"</li>
                  <li><strong>Add Ingredients:</strong> Select ingredients and enter quantities needed</li>
                  <li><strong>Include All Costs:</strong> Add labor time and overhead costs for complete accuracy</li>
                  <li><strong>See Your Profit:</strong> View total cost, cost per serving, and recommended pricing</li>
                </ul>
              </div>
            </div>

            <div class="section">
              <h2 class="section-title">
                <span class="section-number">3</span>
                Track Orders & Customers
              </h2>
              <div class="section-content">
                <p>Keep your business organized by managing orders and customer information:</p>
                <ul class="feature-list">
                  <li><strong>Create Orders:</strong> Add customer orders with delivery dates and status tracking</li>
                  <li><strong>Customer Database:</strong> Store contact info and order history in one place</li>
                  <li><strong>Order Status:</strong> Track orders from "New" to "Delivered"</li>
                  <li><strong>Profit Tracking:</strong> See profit margins on every order</li>
                </ul>
              </div>
            </div>

            <div class="tip-box">
              <strong>Pro Tip: Start Small, Build Momentum</strong>
              <p>
                Don't feel overwhelmed! Start by adding just 3-5 of your most popular ingredients, 
                then create one recipe. Once you see how easy it is to track costs and profits, 
                you'll want to add more. Many successful bakers start with their signature product.
              </p>
            </div>

            <div class="cta-box">
              <h3>Ready to Get Started?</h3>
              <p style="margin: 10px 0; color: #881337; font-size: 14px;">
                Jump into your dashboard and add your first ingredient in under 2 minutes
              </p>
              <a href="https://bakeprofit.vercel.app/bakery-business-tool" class="cta-button">
                Go to Dashboard
              </a>
            </div>

            <div class="section">
              <h2 class="section-title" style="margin-bottom: 10px;">What Makes BakeProfit Different?</h2>
              <div class="section-content" style="margin-left: 0;">
                <ul class="feature-list">
                  <li><strong>No Guesswork Pricing:</strong> Know exactly what each product costs to make</li>
                  <li><strong>Inventory Tracking:</strong> Get alerts when ingredients run low</li>
                  <li><strong>Professional Tools:</strong> Generate invoices, track payments, and analyze profits</li>
                  <li><strong>Works Offline:</strong> Your data stays on your device, accessible anytime</li>
                  <li><strong>Free to Start:</strong> Full access to all features with our free plan</li>
                </ul>
              </div>
            </div>

            <div class="help-section">
              <h3>Need Help Getting Started?</h3>
              <p>We're here to support you every step of the way</p>
              <div class="help-links">
                <a href="https://bakeprofit.vercel.app/blog">Read Guides</a>
                <a href="https://bakeprofit.vercel.app/tools">Free Calculators</a>
                <a href="https://bakeprofit.vercel.app/contact">Contact Support</a>
              </div>
              <p style="margin-top: 10px; font-size: 13px; color: #6b7280;">or reply to this email</p>
            </div>

            <p style="margin-top: 30px; font-size: 14px; color: #6b7280; line-height: 1.7;">
              Thank you for choosing BakeProfit. We can't wait to see your bakery business thrive!
            </p>

            <p style="margin-top: 20px; font-size: 14px; color: #1f2937; font-weight: 600;">
              Happy Baking,<br>
              The BakeProfit Team
            </p>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} BakeProfit. All rights reserved.</p>
            <div class="footer-links">
              <a href="https://bakeprofit.vercel.app">Website</a>
              <a href="https://bakeprofit.vercel.app/pricing">Pricing</a>
              <a href="https://bakeprofit.vercel.app/privacy">Privacy</a>
            </div>
            <p style="margin-top: 15px;">
              You're receiving this email because you signed up for BakeProfit.
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

