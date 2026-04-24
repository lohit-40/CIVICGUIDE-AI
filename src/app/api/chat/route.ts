import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;

const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash-lite', 'gemini-flash-latest'];

// In-memory rate limiting map
const rateLimit = new Map<string, { count: number, timestamp: number }>();

async function tryGenerate(ai: any, modelName: string, systemInstruction: string, contents: any[]) {
  const model = ai.getGenerativeModel({
    model: modelName,
    systemInstruction,
    generationConfig: { temperature: 0.4, maxOutputTokens: 512 }
  });
  const response = await model.generateContent({ contents });
  return response.response.text() || 'No response generated.';
}

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured on the server.' }, { status: 500 });
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

    const ai = new GoogleGenerativeAI(apiKey);
    const { message, contextStep, history = [] } = await req.json();

    if (!message || !contextStep) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const systemInstruction = `You are CivicGuide AI — a helpful, non-partisan, highly accurate Election Process Education assistant for the Indian Election System (Lok Sabha).
The user is currently looking at the step: "${contextStep}".
Rules:
- Be clear, concise and factual. Max 200 words unless a list is needed.
- Avoid partisan language. Represent all major viewpoints fairly.
- Use bullet points (•) for lists.
- If unsure about a local rule, say so and suggest the official ECI website (eci.gov.in).
- Do not use markdown headers (#). Use bold (**word**) sparingly.`;

    const contents = history.slice(-8).map((turn: any) => ({
      role: turn.role === 'user' ? 'user' : 'model',
      parts: [{ text: turn.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: message }] });

    // Try models in order, falling back on 503/overload errors
    let lastError: any;
    for (const modelName of MODELS) {
      try {
        const reply = await tryGenerate(ai, modelName, systemInstruction, contents);
        return NextResponse.json({ reply });
      } catch (apiError: any) {
        const is503 = apiError.status === 503 ||
          apiError.message?.includes('503') ||
          apiError.message?.includes('overloaded') ||
          apiError.message?.includes('UNAVAILABLE');
        if (is503) {
          lastError = apiError;
          continue; // Try next model
        }
        throw apiError; // Not a 503, rethrow immediately
      }
    }

    // All models exhausted
    console.error('All models overloaded:', lastError);
    return NextResponse.json({ reply: '⚠️ All AI models are currently busy. Please try again in a moment.' });

  } catch (error: any) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: error.message || 'Server error. Please try again.' }, { status: 500 });
  }
}
