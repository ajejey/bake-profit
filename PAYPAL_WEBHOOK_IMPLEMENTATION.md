# PayPal Webhook Implementation Guide

## Current Situation
Your app uses **one-time PayPal orders**, not recurring subscriptions. This means:
- Users pay once, get Pro access for 1 month/year
- No automatic renewals
- No webhook notifications
- Manual subscription expiry tracking

## What You Need to Do

### Phase 1: Create PayPal Billing Plans

1. **Log into PayPal Sandbox**
   - Go to: https://www.sandbox.paypal.com/
   - Log in with your sandbox BUSINESS account

2. **Create Monthly Plan**
   - Navigate to: Products & Services > Subscriptions > Plans
   - Click "Create Plan"
   - Plan Details:
     * Name: "BakeProfit Pro - Monthly"
     * Description: "Monthly subscription to BakeProfit Pro"
     * Billing cycle: Every 1 month
     * Price: $6.99 USD
     * Setup fee: $0
     * Trial: None (or 7 days free if you want)
   - Save and copy the **Plan ID** (format: P-XXXXXXXXXXXXX)

3. **Create Yearly Plan**
   - Click "Create Plan" again
   - Plan Details:
     * Name: "BakeProfit Pro - Yearly"
     * Description: "Annual subscription to BakeProfit Pro"
     * Billing cycle: Every 1 year
     * Price: $69.00 USD
     * Setup fee: $0
     * Trial: None
   - Save and copy the **Plan ID**

4. **Add Plan IDs to .env.local**
   ```env
   NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID=P-xxxxxxxxxxxxx
   NEXT_PUBLIC_PAYPAL_YEARLY_PLAN_ID=P-xxxxxxxxxxxxx
   ```

### Phase 2: Setup Webhooks

1. **Create Webhook Endpoint**
   - We'll create: `/api/paypal/webhooks/route.ts`
   - This endpoint will receive PayPal events

2. **Configure Webhook in PayPal Dashboard**
   - Go to: https://developer.paypal.com/dashboard/
   - Select your app
   - Scroll to "Webhooks" section
   - Click "Add Webhook"
   
   **For Local Development (using ngrok):**
   - Install ngrok: `npm install -g ngrok`
   - Run: `ngrok http 3000`
   - Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
   - Webhook URL: `https://abc123.ngrok.io/api/paypal/webhooks`
   
   **For Production:**
   - Webhook URL: `https://yourdomain.com/api/paypal/webhooks`

3. **Select Events to Subscribe**
   Check these events:
   - ✅ `BILLING.SUBSCRIPTION.CREATED`
   - ✅ `BILLING.SUBSCRIPTION.ACTIVATED`
   - ✅ `BILLING.SUBSCRIPTION.UPDATED`
   - ✅ `BILLING.SUBSCRIPTION.CANCELLED`
   - ✅ `BILLING.SUBSCRIPTION.SUSPENDED`
   - ✅ `BILLING.SUBSCRIPTION.EXPIRED`
   - ✅ `PAYMENT.SALE.COMPLETED`
   - ✅ `PAYMENT.SALE.REFUNDED`

4. **Save Webhook ID**
   - Copy the Webhook ID
   - Add to .env.local:
   ```env
   PAYPAL_WEBHOOK_ID=your_webhook_id_here
   ```

### Phase 3: Update Code

Files to modify:
1. `app/api/paypal/create-subscription/route.ts` (NEW - replaces create-order)
2. `app/api/paypal/webhooks/route.ts` (NEW)
3. `components/pricing/PayPalButton.tsx` (UPDATE)
4. `lib/db/models/User.ts` (UPDATE - add fields)

### Phase 4: Testing

1. **Test Subscription Flow**
   - Start ngrok: `ngrok http 3000`
   - Update webhook URL in PayPal dashboard
   - Go to /pricing
   - Click PayPal button
   - Complete subscription with test account
   - Check webhook receives `BILLING.SUBSCRIPTION.ACTIVATED`

2. **Test Cancellation**
   - Log into sandbox.paypal.com as buyer
   - Go to Settings > Payments > Manage automatic payments
   - Cancel BakeProfit subscription
   - Check webhook receives `BILLING.SUBSCRIPTION.CANCELLED`

3. **Test Renewal (Simulated)**
   - PayPal sandbox doesn't wait real months
   - Use PayPal's webhook simulator to test renewal events

## Environment Variables Needed

Add these to your `.env.local`:

```env
# Existing
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret
PAYPAL_API_URL=https://api-m.sandbox.paypal.com

# NEW - Add these
NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID=P-xxxxxxxxxxxxx
NEXT_PUBLIC_PAYPAL_YEARLY_PLAN_ID=P-xxxxxxxxxxxxx
PAYPAL_WEBHOOK_ID=your_webhook_id_here
```

## What Webhooks Will Handle

| Event | What It Means | Your Action |
|-------|---------------|-------------|
| `BILLING.SUBSCRIPTION.ACTIVATED` | User completed subscription | Set user to Pro, save subscription ID |
| `BILLING.SUBSCRIPTION.CANCELLED` | User cancelled via PayPal | Set status to 'canceled', keep access until period ends |
| `BILLING.SUBSCRIPTION.SUSPENDED` | Payment failed multiple times | Downgrade to Free, notify user |
| `BILLING.SUBSCRIPTION.EXPIRED` | Subscription ended | Downgrade to Free |
| `PAYMENT.SALE.COMPLETED` | Monthly/yearly payment succeeded | Extend subscription_ends_at by 1 month/year |
| `PAYMENT.SALE.REFUNDED` | Payment was refunded | Downgrade to Free immediately |

## Security

Webhooks will:
- Verify PayPal signature to prevent fake requests
- Use PAYPAL_WEBHOOK_ID to validate events
- Only process events for your app

## Next Steps

1. Create billing plans in PayPal (5 minutes)
2. Setup webhook in PayPal dashboard (5 minutes)
3. Implement code changes (30 minutes)
4. Test with ngrok (15 minutes)

Total time: ~1 hour

Ready to implement? Let me know and I'll create all the necessary files!
