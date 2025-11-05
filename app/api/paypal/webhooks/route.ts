import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import UserModel from '@/lib/db/models/User';

const PAYPAL_API_URL = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

// Verify webhook signature
async function verifyWebhookSignature(
  webhookId: string,
  headers: Headers,
  body: string
): Promise<boolean> {
  try {
    const transmissionId = headers.get('paypal-transmission-id');
    const transmissionTime = headers.get('paypal-transmission-time');
    const certUrl = headers.get('paypal-cert-url');
    const authAlgo = headers.get('paypal-auth-algo');
    const transmissionSig = headers.get('paypal-transmission-sig');

    if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
      console.error('Missing webhook headers');
      return false;
    }

    // Get PayPal access token
    const auth = Buffer.from(
      `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64');

    const tokenResponse = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Verify webhook signature with PayPal
    const verifyResponse = await fetch(`${PAYPAL_API_URL}/v1/notifications/verify-webhook-signature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        transmission_id: transmissionId,
        transmission_time: transmissionTime,
        cert_url: certUrl,
        auth_algo: authAlgo,
        transmission_sig: transmissionSig,
        webhook_id: webhookId,
        webhook_event: JSON.parse(body),
      }),
    });

    const verifyData = await verifyResponse.json();
    return verifyData.verification_status === 'SUCCESS';
  } catch (error) {
    console.error('Webhook verification error:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const event = JSON.parse(body);

    console.log('Received PayPal webhook:', event.event_type);

    // Verify webhook signature
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    if (!webhookId) {
      console.error('PAYPAL_WEBHOOK_ID not configured');
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    const isValid = await verifyWebhookSignature(webhookId, request.headers, body);
    if (!isValid) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    await connectDB();

    // Handle different webhook events
    switch (event.event_type) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED': {
        // Subscription activated (initial signup)
        const subscriptionId = event.resource.id;
        const payerId = event.resource.subscriber?.payer_id;
        const planId = event.resource.plan_id;

        // Determine billing cycle from plan ID
        const isYearly = planId === process.env.NEXT_PUBLIC_PAYPAL_YEARLY_PLAN_ID;
        const subscriptionEndsAt = new Date();
        if (isYearly) {
          subscriptionEndsAt.setFullYear(subscriptionEndsAt.getFullYear() + 1);
        } else {
          subscriptionEndsAt.setMonth(subscriptionEndsAt.getMonth() + 1);
        }

        // Find user by payer ID or subscription ID
        const user = await UserModel.findOneAndUpdate(
          { 
            $or: [
              { paypal_payer_id: payerId },
              { paypal_subscription_id: subscriptionId }
            ]
          },
          {
            subscription_tier: 'pro',
            subscription_status: 'active',
            paypal_subscription_id: subscriptionId,
            paypal_payer_id: payerId,
            subscription_ends_at: subscriptionEndsAt,
          },
          { new: true }
        );

        console.log('Subscription activated:', subscriptionId, 'User:', user?.email);
        break;
      }

      case 'BILLING.SUBSCRIPTION.CANCELLED': {
        // User cancelled subscription
        const subscriptionId = event.resource.id;

        // Keep Pro access until current period ends
        await UserModel.findOneAndUpdate(
          { paypal_subscription_id: subscriptionId },
          {
            subscription_status: 'canceled',
            // Keep subscription_ends_at - user keeps access until then
          }
        );

        console.log('Subscription cancelled:', subscriptionId);
        break;
      }

      case 'BILLING.SUBSCRIPTION.SUSPENDED': {
        // Payment failed multiple times
        const subscriptionId = event.resource.id;

        await UserModel.findOneAndUpdate(
          { paypal_subscription_id: subscriptionId },
          {
            subscription_tier: 'free',
            subscription_status: 'past_due',
          }
        );

        console.log('Subscription suspended:', subscriptionId);
        break;
      }

      case 'BILLING.SUBSCRIPTION.EXPIRED': {
        // Subscription expired
        const subscriptionId = event.resource.id;

        await UserModel.findOneAndUpdate(
          { paypal_subscription_id: subscriptionId },
          {
            subscription_tier: 'free',
            subscription_status: 'canceled',
          }
        );

        console.log('Subscription expired:', subscriptionId);
        break;
      }

      case 'PAYMENT.SALE.COMPLETED': {
        // Recurring payment succeeded
        const subscriptionId = event.resource.billing_agreement_id;
        
        if (subscriptionId) {
          const user = await UserModel.findOne({ paypal_subscription_id: subscriptionId });
          
          if (user) {
            // Extend subscription by billing period
            const currentEndsAt = user.subscription_ends_at || new Date();
            const newEndsAt = new Date(currentEndsAt);
            
            // Determine if monthly or yearly based on plan
            const planId = event.resource.plan_id;
            const isYearly = planId === process.env.NEXT_PUBLIC_PAYPAL_YEARLY_PLAN_ID;
            
            if (isYearly) {
              newEndsAt.setFullYear(newEndsAt.getFullYear() + 1);
            } else {
              newEndsAt.setMonth(newEndsAt.getMonth() + 1);
            }

            await UserModel.findByIdAndUpdate(user._id, {
              subscription_tier: 'pro',
              subscription_status: 'active',
              subscription_ends_at: newEndsAt,
            });

            console.log('Payment completed, subscription renewed:', subscriptionId);
          }
        }
        break;
      }

      case 'PAYMENT.SALE.REFUNDED': {
        // Payment refunded
        const subscriptionId = event.resource.billing_agreement_id;

        if (subscriptionId) {
          await UserModel.findOneAndUpdate(
            { paypal_subscription_id: subscriptionId },
            {
              subscription_tier: 'free',
              subscription_status: 'canceled',
            }
          );

          console.log('Payment refunded, subscription downgraded:', subscriptionId);
        }
        break;
      }

      default:
        console.log('Unhandled webhook event:', event.event_type);
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
