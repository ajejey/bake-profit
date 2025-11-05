import { NextResponse } from 'next/server';

const PAYPAL_API_URL = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
  try {
    const auth = Buffer.from(
      `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64');

    const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { plan, billingCycle } = await request.json();

    // Validate plan
    if (!plan || plan !== 'pro') {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    // Get the correct plan ID based on billing cycle
    const planId = billingCycle === 'yearly'
      ? process.env.NEXT_PUBLIC_PAYPAL_YEARLY_PLAN_ID
      : process.env.NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID;

    if (!planId) {
      return NextResponse.json(
        { error: 'PayPal plan not configured. Please set NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID and NEXT_PUBLIC_PAYPAL_YEARLY_PLAN_ID in environment variables.' },
        { status: 500 }
      );
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Create PayPal subscription
    const response = await fetch(`${PAYPAL_API_URL}/v1/billing/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan_id: planId,
        application_context: {
          brand_name: 'BakeProfit',
          locale: 'en-US',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
          payment_method: {
            payer_selected: 'PAYPAL',
            payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED',
          },
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?success=true`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
        },
      }),
    });

    const subscriptionData = await response.json();

    if (!response.ok) {
      console.error('PayPal subscription creation failed:', subscriptionData);
      return NextResponse.json(
        { error: 'Failed to create PayPal subscription', details: subscriptionData },
        { status: 500 }
      );
    }

    // Find the approval URL
    const approvalUrl = subscriptionData.links?.find(
      (link: { rel: string; href: string }) => link.rel === 'approve'
    )?.href;

    return NextResponse.json({
      success: true,
      subscriptionID: subscriptionData.id,
      approvalUrl,
    });
  } catch (error) {
    console.error('Error creating PayPal subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
