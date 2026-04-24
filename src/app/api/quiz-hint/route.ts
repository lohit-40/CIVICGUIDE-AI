/**
 * @fileoverview Quiz Hint API Endpoint
 * @description Secure serverless function that generates a single contextual hint
 * for a given quiz question using the Google Gemini API. Includes IP-based rate
 * limiting and full input validation to prevent abuse and prompt injection.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash-lite', 'gemini-flash-latest'];

// In-memory rate limiting map (resets on server restart)
const rateLimit = new Map<string, { count: number, timestamp: number }>();

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 500 });
    }

    // IP-based rate limiting — 15 requests per minute
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const record = rateLimit.get(ip);

    if (!record || now - record.timestamp > 60000) {
      rateLimit.set(ip, { count: 1, timestamp: now });
    } else if (record.count >= 15) {
      return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 });
    } else {
      record.count++;
    }

    const body = await req.json();
    const { question } = body;

    // Input validation — strict type and length checks
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json({ error: 'Question is required.' }, { status: 400 });
    }
    if (question.length > 500) {
      return NextResponse.json({ error: 'Question too long. Max 500 characters.' }, { status: 400 });
    }

    // Sanitize — strip HTML tags to prevent injection
    const sanitizedQuestion = question.replace(/<[^>]*>/g, '').trim();

    const genAI = new GoogleGenerativeAI(apiKey);
    const prompt = `Give a 1-sentence educational hint for this Indian election quiz question WITHOUT revealing the answer. Question: "${sanitizedQuestion}"`;

    let lastError: unknown;
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
      } catch (apiError: unknown) {
        const err = apiError as { status?: number; message?: string };
        const is503 = err.status === 503 ||
          err.message?.includes('503') ||
          err.message?.includes('overloaded') ||
          err.message?.includes('UNAVAILABLE') ||
          err.message?.includes('404');
        if (is503) { lastError = err; continue; }
        throw err;
      }
    }

    console.error('All models failed for quiz-hint:', lastError);
    return NextResponse.json({ hint: 'Think carefully about Indian election rules and processes!' });

  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('Quiz hint error:', err);
    return NextResponse.json({ error: err.message || 'Could not generate hint.' }, { status: 500 });
  }
}
