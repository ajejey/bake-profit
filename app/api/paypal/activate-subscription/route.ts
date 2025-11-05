import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import UserModel from '@/lib/db/models/User';
import connectDB from '@/lib/db/mongodb';

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

async function getSubscriptionDetails(subscriptionId: string, accessToken: string) {
  try {
    const response = await fetch(`${PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting subscription details:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    // Get user from token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { subscriptionID, billingCycle } = await request.json();

    if (!subscriptionID) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      );
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Get subscription details from PayPal
    const subscriptionData = await getSubscriptionDetails(subscriptionID, accessToken);

    // Check if subscription is active
    if (subscriptionData.status !== 'ACTIVE' && subscriptionData.status !== 'APPROVED') {
      return NextResponse.json(
        { error: `Subscription is not active. Status: ${subscriptionData.status}` },
        { status: 400 }
      );
    }

    // Update user subscription in database
    await connectDB();
    
    const subscriptionEndsAt = new Date();
    if (billingCycle === 'yearly') {
      subscriptionEndsAt.setFullYear(subscriptionEndsAt.getFullYear() + 1);
    } else {
      subscriptionEndsAt.setMonth(subscriptionEndsAt.getMonth() + 1);
    }

    const user = await UserModel.findByIdAndUpdate(
      decoded.userId,
      {
        subscription_tier: 'pro',
        subscription_status: 'active',
        paypal_subscription_id: subscriptionID,
        paypal_payer_id: subscriptionData.subscriber?.payer_id,
        subscription_ends_at: subscriptionEndsAt,
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription activated successfully',
      subscription: {
        tier: 'pro',
        status: 'active',
        endsAt: subscriptionEndsAt,
      },
    });
  } catch (error) {
    console.error('Subscription activation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
