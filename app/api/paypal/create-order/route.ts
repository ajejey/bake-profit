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
    if (!plan || (plan !== 'pro')) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    // Determine amount based on billing cycle
    let amount = '6.99';
    if (billingCycle === 'yearly') {
      amount = '69.00';
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Create PayPal order
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount,
            },
            description: billingCycle === 'yearly' 
              ? 'BakeProfit Pro - Annual Subscription' 
              : 'BakeProfit Pro - Monthly Subscription',
          },
        ],
        application_context: {
          brand_name: 'BakeProfit',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/paypal/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
        },
      }),
    });

    const orderData = await response.json();

    if (!response.ok) {
      console.error('PayPal order creation failed:', orderData);
      return NextResponse.json(
        { error: 'Failed to create PayPal order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderID: orderData.id,
      approvalUrl: orderData.links?.find((link: any) => link.rel === 'approve')?.href,
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
