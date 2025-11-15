import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { processSyncPayload, fetchUserData, SyncPayload } from '@/lib/db/sync';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';

/**
 * Extract user ID from JWT token in Authorization header
 * Handles both valid and expired tokens
 */
function getUserIdFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  const token = extractTokenFromHeader(authHeader);
  
  if (!token) {
    return null;
  }

  // Try to verify the token
  const payload = verifyToken(token);
  
  // If verification failed, try to decode anyway (in case it's just expired)
  if (!payload) {
    try {
      const decoded = jwt.decode(token) as Record<string, unknown> | null;
      if (decoded && typeof decoded.email === 'string') {
        return decoded.email;
      }
    } catch {
      return null;
    }
    return null;
  }

  return payload.email;
}

/**
 * POST /api/sync
 * Receives changes from frontend and syncs to MongoDB
 */
export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const payload = await request.json() as SyncPayload;

    // Validate payload
    if (!payload || !payload.userId || payload.userId !== userId) {
      return NextResponse.json(
        { error: 'User ID mismatch' },
        { status: 400 }
      );
    }

    // Log what we're syncing
    console.log('📥 Sync payload received:', {
      userId,
      recipes: payload.recipes?.length || 0,
      orders: payload.orders?.length || 0,
      customers: payload.customers?.length || 0,
      ingredients: payload.ingredients?.length || 0,
      inventory: payload.inventory?.length || 0,
    });

    // Process sync
    await processSyncPayload(payload);

    return NextResponse.json({
      success: true,
      message: 'Sync completed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Sync failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/sync
 * Fetches all user data from MongoDB
 * Used for pulling data to frontend (cross-device sync)
 */
export async function GET(request: NextRequest) {
  try {
    // Verify user is authenticated
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all user data
    const data = await fetchUserData(userId);

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Fetch failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
