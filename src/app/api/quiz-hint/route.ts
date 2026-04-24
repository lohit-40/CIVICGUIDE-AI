import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash-lite', 'gemini-flash-latest'];

// In-memory rate limiting map
const rateLimit = new Map<string, { count: number, timestamp: number }>();

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Missing question.' }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 500 });
    }

    // Basic IP-based rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const rateLimitRecord = rateLimit.get(ip);
    
    if (!rateLimitRecord || (now - rateLimitRecord.timestamp > 60000)) {
      rateLimit.set(ip, { count: 1, timestamp: now });
    } else if (rateLimitRecord.count >= 15) {
      return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 });
    } else {
      rateLimitRecord.count++;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const prompt = `Give a 1-sentence educational hint for this Indian election quiz question WITHOUT revealing the answer. Question: "${question}"`;

    let lastError: any;
    for (const modelName of MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { temperature: 0.5, maxOutputTokens: 100 }
        });
        const response = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        });
        const hint = response.response.text() || 'Think carefully about the civic process!';
        return NextResponse.json({ hint });
      } catch (apiError: any) {
        const is503 = apiError.status === 503 ||
          apiError.message?.includes('503') ||
          apiError.message?.includes('overloaded') ||
          apiError.message?.includes('UNAVAILABLE') ||
          apiError.message?.includes('404');
        if (is503) {
          lastError = apiError;
          continue;
        }
        throw apiError;
      }
    }

    console.error('All models failed:', lastError);
    return NextResponse.json({ hint: 'Think carefully about Indian election rules and processes!' });

  } catch (error: any) {
    console.error('Quiz hint error:', error);
    return NextResponse.json({ error: error.message || 'Could not generate hint.' }, { status: 500 });
  }
}
