import { NextRequest, NextResponse } from 'next/server';
import { updateUser } from '@/lib/db/users';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';

export interface QuestionnaireRequest {
  lookingFor: string;
  helpWith: string;
  interestedFeatures: string[];
}

export interface QuestionnaireResponse {
  success: boolean;
  error?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json<QuestionnaireResponse>(
        { 
          success: false, 
          error: 'No authentication token provided' 
        },
        { status: 401 }
      );
    }

    // Verify token
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json<QuestionnaireResponse>(
        { 
          success: false, 
          error: 'Invalid or expired token' 
        },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json() as QuestionnaireRequest;

    if (!body.lookingFor || !body.helpWith) {
      return NextResponse.json<QuestionnaireResponse>(
        { 
          success: false, 
          error: 'Missing required fields: lookingFor and helpWith' 
        },
        { status: 400 }
      );
    }

    // Update user with questionnaire data
    await updateUser(payload.userId, {
      questionnaire_looking_for: body.lookingFor,
      questionnaire_help_with: body.helpWith,
      questionnaire_interested_features: body.interestedFeatures || [],
      questionnaire_answered_at: new Date(),
    });

    return NextResponse.json<QuestionnaireResponse>(
      {
        success: true,
        message: 'Questionnaire saved successfully',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Save questionnaire error:', error);
    return NextResponse.json<QuestionnaireResponse>(
      { 
        success: false, 
        error: 'An error occurred while saving questionnaire' 
      },
      { status: 500 }
    );
  }
}
