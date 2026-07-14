import { NextRequest, NextResponse } from 'next/server';
import { enhancePrompt } from '@/ai/flows/enhance-prompt-flow';
import { logActivity } from '@/lib/supabase/actions';
import { decryptKey } from '@/lib/utils/encryption';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    let geminiKey = request.headers.get('x-gemini-key');
    if (!geminiKey) {
      const cookieStore = await cookies();
      const encCookie = cookieStore.get('synthara_enc_gemini')?.value || '';
      if (encCookie) {
        geminiKey = decryptKey(encCookie);
      }
    }
    if (geminiKey) {
      process.env.GOOGLE_GEMINI_API_KEY = geminiKey;
    }
    const body = await request.json().catch(() => null);
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';

    if (!prompt || prompt.length < 5) {
      return NextResponse.json(
        { success: false, error: 'Prompt must be at least 5 characters long.' },
        { status: 400 }
      );
    }

    const result = await enhancePrompt({ currentPrompt: prompt });

    try {
      await logActivity({
        activityType: 'PROMPT_ENHANCEMENT',
        description: 'Enhanced data generation prompt with AI',
        details: {
          originalPromptPreview: prompt.slice(0, 120),
          enhancedPromptPreview: result.enhancedPrompt.slice(0, 120),
        },
      });
    } catch (logError) {
      console.warn('[EnhancePrompt API] Activity logging failed:', logError);
    }

    return NextResponse.json({
      success: true,
      enhancedPrompt: result.enhancedPrompt,
      reasoning: result.reasoning,
    });
  } catch (error: any) {
    console.error('[EnhancePrompt API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to enhance prompt. Please try again.',
      },
      { status: 500 }
    );
  }
}
