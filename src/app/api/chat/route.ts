import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

/**
 * @fileoverview Chat API Endpoint
 * @description Secure serverless function connecting the client interface to the 
 * Google Gemini API. Includes IP-based rate limiting to prevent abuse and ensure 
 * fair usage limits (15 requests / minute).
 */

const apiKey = process.env.GEMINI_API_KEY;

const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash-lite', 'gemini-flash-latest'];

// In-memory rate limiting map
const rateLimit = new Map<string, { count: number, timestamp: number }>();

async function tryGenerate(ai: GoogleGenerativeAI, modelName: string, systemInstruction: string, contents: { role: string; parts: { text: string }[] }[]) {
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

    // Input validation — prevent oversized payloads and prompt injection attempts
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }
    if (message.length > 1000) {
      return NextResponse.json({ error: 'Message too long. Max 1000 characters.' }, { status: 400 });
    }
    if (!contextStep || typeof contextStep !== 'string') {
      return NextResponse.json({ error: 'Missing context step.' }, { status: 400 });
    }
    if (!Array.isArray(history)) {
      return NextResponse.json({ error: 'Invalid history format.' }, { status: 400 });
    }

    // Sanitize: strip any potential HTML tags from user input
    const sanitizedMessage = message.replace(/<[^>]*>/g, '').trim();
    const sanitizedContext = contextStep.replace(/<[^>]*>/g, '').trim().slice(0, 200);

    const systemInstruction = `You are CivicGuide AI — a helpful, non-partisan, highly accurate Election Process Education assistant for the Indian Election System (Lok Sabha).
The user is currently looking at the step: "${sanitizedContext}".
Rules:
- Be clear, concise and factual. Max 200 words unless a list is needed.
- Avoid partisan language. Represent all major viewpoints fairly.
- Use bullet points (•) for lists.
- If unsure about a local rule, say so and suggest the official ECI website (eci.gov.in).
- Do not use markdown headers (#). Use bold (**word**) sparingly.`;

    const contents = history.slice(-8).map((turn: { role: string; text: string }) => ({
      role: turn.role === 'user' ? 'user' : 'model',
      parts: [{ text: turn.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: sanitizedMessage }] });

    // Try models in order, falling back on 503/overload errors
    let lastError: unknown;
    for (const modelName of MODELS) {
      try {
        const reply = await tryGenerate(ai, modelName, systemInstruction, contents);
        return NextResponse.json({ reply });
      } catch (apiError: unknown) {
        const err = apiError as { status?: number; message?: string };
        const is503 = err.status === 503 ||
          err.message?.includes('503') ||
          err.message?.includes('overloaded') ||
          err.message?.includes('UNAVAILABLE');
        if (is503) {
          lastError = err;
          continue; // Try next model
        }
        throw err; // Not a 503, rethrow immediately
      }
    }

    // All models exhausted
    console.error('All models overloaded:', lastError);
    return NextResponse.json({ reply: '⚠️ All AI models are currently busy. Please try again in a moment.' });

  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('Chat error:', err);
    return NextResponse.json({ error: err.message || 'Server error. Please try again.' }, { status: 500 });
  }
}
