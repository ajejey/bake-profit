import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { findUserById } from '@/lib/db/users';
import { getUsageStats, setUsageCount } from '@/lib/db/usage';

export async function GET(request: NextRequest) {
  try {
    // Extract and verify token
    const authHeader = request.headers.get('Authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token provided' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get usage stats
    const usage = await getUsageStats(payload.userId);

    return NextResponse.json({
      success: true,
      usage,
    });

  } catch (error) {
    console.error('Get usage error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching usage data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Extract and verify token
    const authHeader = request.headers.get('Authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token provided' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get user
    const user = await findUserById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get counts from localStorage (sent by client)
    const body = await request.json();
    
    // Sync usage counts to database
    await setUsageCount(user.id, {
      recipes: body.recipes || 0,
      ordersThisMonth: body.orders || 0,
      customers: body.customers || 0,
      inventoryItems: body.inventory || 0,
    });

    return NextResponse.json({
      success: true,
      message: 'Usage synced successfully',
    });

  } catch (error) {
    console.error('Sync usage error:', error);
    return NextResponse.json(
      { error: 'An error occurred while syncing usage data' },
      { status: 500 }
    );
  }
}
