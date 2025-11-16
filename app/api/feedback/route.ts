import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';

interface FeedbackPayload {
  question: string;
  email?: string;
  segment: 'new-users' | 'inactive-users';
  timestamp: string;
}

/**
 * POST /api/feedback
 * Receive exit-intent feedback from users
 */
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json() as FeedbackPayload;

    // Validate required fields
    if (!payload.question || !payload.segment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    const connection = await connectDB();
    const db = connection.connection.db;
    if (!db) {
      throw new Error('Database connection failed');
    }
    
    const feedbackCollection = db.collection('exit_intent_feedback');

    const feedback = {
      question: payload.question,
      email: payload.email || null,
      segment: payload.segment,
      timestamp: new Date(payload.timestamp),
      createdAt: new Date(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    };

    const result = await feedbackCollection.insertOne(feedback);

    console.log('✅ Feedback received:', {
      id: result.insertedId,
      segment: payload.segment,
      hasEmail: !!payload.email,
    });

    // If email provided, send follow-up email (optional)
    if (payload.email) {
      // TODO: Send follow-up email
      console.log('📧 Follow-up email queued for:', payload.email);
    }

    return NextResponse.json({
      success: true,
      message: 'Feedback received. Thank you!',
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Feedback error:', error);
    return NextResponse.json(
      { error: 'Failed to save feedback', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/feedback
 * Get feedback statistics (admin only)
 */
export async function GET() {
  try {
    // TODO: Add admin authentication check
    
    const connection = await connectDB();
    const db = connection.connection.db;
    if (!db) {
      throw new Error('Database connection failed');
    }
    
    const feedbackCollection = db.collection('exit_intent_feedback');

    // Get statistics
    const [totalFeedback, bySegment, recentFeedback] = await Promise.all([
      feedbackCollection.countDocuments(),
      feedbackCollection.aggregate([
        {
          $group: {
            _id: '$segment',
            count: { $sum: 1 },
          },
        },
      ]).toArray(),
      feedbackCollection
        .find()
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        total: totalFeedback,
        bySegment: Object.fromEntries(
          bySegment.map(item => [item._id, item.count])
        ),
        recentCount: recentFeedback.length,
      },
      recent: recentFeedback.map(item => ({
        id: item._id,
        question: item.question,
        segment: item.segment,
        email: item.email,
        timestamp: item.timestamp,
      })),
    });
  } catch (error) {
    console.error('Feedback fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}
