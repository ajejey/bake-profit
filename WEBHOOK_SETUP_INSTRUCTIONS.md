# PayPal Webhook Setup - Quick Start Guide

## ✅ Implementation Complete

All webhook code has been implemented. Now you need to configure PayPal.

---

## Step 1: Create Billing Plans in PayPal (5 minutes)

### A. Access PayPal Sandbox
1. Go to: https://www.sandbox.paypal.com/
2. Log in with your **sandbox BUSINESS account**
   - If you don't have one, create it at: https://developer.paypal.com/dashboard/ → Testing Tools → Sandbox Accounts

### B. Create Monthly Plan
1. Navigate to: **Products & Services** → **Subscriptions** → **Plans**
2. Click **"Create Plan"**
3. Fill in:
   - **Plan Name**: `BakeProfit Pro - Monthly`
   - **Plan Description**: `Monthly subscription to BakeProfit Pro`
   - **Billing Cycle**: Every **1 month**
   - **Price**: **$6.99 USD**
   - **Setup Fee**: $0
   - **Trial Period**: None (or add 7 days free if you want)
4. Click **Save**
5. **COPY THE PLAN ID** (format: `P-XXXXXXXXXXXXX`)

### C. Create Yearly Plan
1. Click **"Create Plan"** again
2. Fill in:
   - **Plan Name**: `BakeProfit Pro - Yearly`
   - **Plan Description**: `Annual subscription to BakeProfit Pro`
   - **Billing Cycle**: Every **1 year**
   - **Price**: **$69.00 USD**
   - **Setup Fee**: $0
   - **Trial Period**: None
3. Click **Save**
4. **COPY THE PLAN ID** (format: `P-XXXXXXXXXXXXX`)

---

## Step 2: Add Plan IDs to Environment Variables (1 minute)

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID=P-your-monthly-plan-id-here
NEXT_PUBLIC_PAYPAL_YEARLY_PLAN_ID=P-your-yearly-plan-id-here
```

**Example:**
```env
NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID=P-1AB23456CD789012E
NEXT_PUBLIC_PAYPAL_YEARLY_PLAN_ID=P-9ZY87654XW321098V
```

---

## Step 3: Setup Webhook (5 minutes)

### A. For Local Development (using ngrok)

1. **Install ngrok** (if not already installed):
   ```bash
   npm install -g ngrok
   ```

2. **Start your Next.js app**:
   ```bash
   npm run dev
   ```

3. **In a new terminal, start ngrok**:
   ```bash
   ngrok http 3000
   ```

4. **Copy the HTTPS URL** from ngrok output:
   ```
   Forwarding  https://abc123def456.ngrok.io -> http://localhost:3000
   ```
   Copy: `https://abc123def456.ngrok.io`

### B. Configure Webhook in PayPal

1. Go to: https://developer.paypal.com/dashboard/
2. Click on your app name
3. Scroll down to **"Webhooks"** section
4. Click **"Add Webhook"**
5. **Webhook URL**: `https://your-ngrok-url.ngrok.io/api/paypal/webhooks`
   - Example: `https://abc123def456.ngrok.io/api/paypal/webhooks`

6. **Select Event Types** - Check these:
   - ✅ `Billing subscription activated`
   - ✅ `Billing subscription cancelled`
   - ✅ `Billing subscription suspended`
   - ✅ `Billing subscription expired`
   - ✅ `Payment sale completed`
   - ✅ `Payment sale refunded`

7. Click **Save**

8. **COPY THE WEBHOOK ID** (shown after saving)

### C. Add Webhook ID to Environment Variables

Add to your `.env.local`:

```env
PAYPAL_WEBHOOK_ID=your-webhook-id-here
```

**Example:**
```env
PAYPAL_WEBHOOK_ID=1AB23456CD789012E
```

---

## Step 4: Restart Your App (1 minute)

After adding all environment variables, restart your Next.js app:

```bash
# Stop the app (Ctrl+C)
# Then restart
npm run dev
```

**Keep ngrok running** in the other terminal!

---

## Step 5: Test the Subscription Flow (5 minutes)

### A. Test Signup

1. Go to: http://localhost:3000/pricing
2. Make sure you're **logged in** to your BakeProfit account
3. Click the **PayPal button** (Monthly or Yearly)
4. You'll be redirected to PayPal sandbox
5. **Log in with a PERSONAL test account** (buyer account)
   - Create one at: https://developer.paypal.com/dashboard/ → Testing Tools → Sandbox Accounts
6. **Approve the subscription**
7. You'll be redirected back to your app
8. Check your terminal - you should see webhook logs:
   ```
   Received PayPal webhook: BILLING.SUBSCRIPTION.ACTIVATED
   Subscription activated: I-XXXXXXXXXXXXX User: user@example.com
   ```

### B. Verify in Database

Check your MongoDB database - the user should now have:
- `subscription_tier`: `"pro"`
- `subscription_status`: `"active"`
- `paypal_subscription_id`: `"I-XXXXXXXXXXXXX"`
- `subscription_ends_at`: (date 1 month/year from now)

### C. Test Cancellation

1. Go to Settings → Subscription
2. Click **"Cancel Subscription"**
3. Confirm
4. Check terminal - you should see:
   ```
   Received PayPal webhook: BILLING.SUBSCRIPTION.CANCELLED
   Subscription cancelled: I-XXXXXXXXXXXXX
   ```
5. User should keep Pro access until `subscription_ends_at`

---

## Your Complete .env.local File

Here's what you need:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Email (Gmail)
NEXT_PUBLIC_GMAIL_EMAIL=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth (for Google Drive sync)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# PayPal - Basic
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret
PAYPAL_API_URL=https://api-m.sandbox.paypal.com

# PayPal - Subscription Plans (ADD THESE)
NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID=P-your-monthly-plan-id
NEXT_PUBLIC_PAYPAL_YEARLY_PLAN_ID=P-your-yearly-plan-id

# PayPal - Webhook (ADD THIS)
PAYPAL_WEBHOOK_ID=your-webhook-id
```

---

## Production Setup (When Ready)

### 1. Create Live Plans
- Log into https://www.paypal.com/ (LIVE account)
- Create Monthly and Yearly plans
- Copy LIVE plan IDs

### 2. Setup Live Webhook
- Use your production domain: `https://yourdomain.com/api/paypal/webhooks`
- Copy LIVE webhook ID

### 3. Update Production Environment Variables
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_LIVE_client_id
PAYPAL_CLIENT_SECRET=your_LIVE_client_secret
PAYPAL_API_URL=https://api-m.paypal.com
NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID=P-live-monthly-id
NEXT_PUBLIC_PAYPAL_YEARLY_PLAN_ID=P-live-yearly-id
PAYPAL_WEBHOOK_ID=live-webhook-id
```

---

## What Happens Automatically

Once webhooks are configured, PayPal will automatically notify your app when:

| Event | What Happens |
|-------|--------------|
| User subscribes | ✅ User upgraded to Pro, subscription saved |
| Monthly/yearly renewal | ✅ Subscription extended automatically |
| User cancels | ✅ Status set to "canceled", keeps access until period ends |
| Payment fails | ✅ User downgraded to Free after retries |
| Subscription expires | ✅ User downgraded to Free |
| Refund issued | ✅ User immediately downgraded to Free |

---

## Troubleshooting

### Webhook not receiving events?
- Check ngrok is running
- Verify webhook URL in PayPal dashboard
- Check terminal for errors
- Verify `PAYPAL_WEBHOOK_ID` in .env.local

### Subscription not activating?
- Check plan IDs are correct
- Verify user is logged in
- Check browser console for errors
- Check API logs in terminal

### Need Help?
- Check PayPal sandbox logs: https://developer.paypal.com/dashboard/
- View webhook events: Dashboard → Your App → Webhooks → Recent Deliveries
- Check your app logs in terminal

---

## Files Created

✅ `/api/paypal/webhooks/route.ts` - Webhook handler
✅ `/api/paypal/create-subscription/route.ts` - Create subscription
✅ `/api/paypal/activate-subscription/route.ts` - Activate after approval
✅ `/api/paypal/cancel-subscription/route.ts` - Cancel subscription
✅ `components/pricing/PayPalButton.tsx` - Updated to use subscriptions
✅ `components/settings/SubscriptionManagement.tsx` - Added cancel functionality

---

**You're all set!** Just follow Steps 1-5 above to complete the setup.
