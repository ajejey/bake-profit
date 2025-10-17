import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { findUserById } from '@/lib/db/users';
import { getUsageStats } from '@/lib/db/usage';
import { getLimit } from '@/lib/subscription-limits';
import { LimitCheckResponse } from '@/types/subscription';

const checkLimitSchema = z.object({
  type: z.enum(['recipes', 'orders', 'customers', 'inventory']),
});

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

    // Parse request body
    const body = await request.json();
    const validation = checkLimitSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { type } = validation.data;

    // Pro users have unlimited everything
    if (user.subscription_tier === 'pro') {
      return NextResponse.json<LimitCheckResponse>({
        allowed: true,
        limit: Infinity,
        used: 0,
        remaining: Infinity,
        message: 'Unlimited (Pro plan)',
      });
    }

    // Get usage stats
    const usage = await getUsageStats(user.id);
    
    // Map type to usage field and limit type
    const usageMap = {
      recipes: { used: usage.recipes, limitType: 'recipes' as const },
      orders: { used: usage.ordersThisMonth, limitType: 'ordersPerMonth' as const },
      customers: { used: usage.customers, limitType: 'customers' as const },
      inventory: { used: usage.inventoryItems, limitType: 'inventoryItems' as const },
    };

    const { used, limitType } = usageMap[type];
    const limit = getLimit('free', limitType);
    const remaining = Math.max(0, limit - used);
    const allowed = used < limit;

    return NextResponse.json<LimitCheckResponse>({
      allowed,
      limit,
      used,
      remaining,
      message: allowed 
        ? `${remaining} ${type} remaining` 
        : `You've reached your free plan limit of ${limit} ${type}`,
    });

  } catch (error) {
    console.error('Check limit error:', error);
    return NextResponse.json(
      { error: 'An error occurred while checking limits' },
      { status: 500 }
    );
  }
}
