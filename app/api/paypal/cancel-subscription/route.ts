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

    await connectDB();

    // Get user's subscription ID
    const user = await UserModel.findById(decoded.userId);
    if (!user || !user.paypal_subscription_id) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Cancel subscription in PayPal
    const response = await fetch(
      `${PAYPAL_API_URL}/v1/billing/subscriptions/${user.paypal_subscription_id}/cancel`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: 'User requested cancellation',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PayPal cancellation failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to cancel subscription with PayPal' },
        { status: 500 }
      );
    }

    // Update user status in database
    await UserModel.findByIdAndUpdate(decoded.userId, {
      subscription_status: 'canceled',
      // Keep subscription_ends_at - user keeps access until period ends
    });

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully. You will keep Pro access until the end of your billing period.',
    });
  } catch (error) {
    console.error('Subscription cancellation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
