"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Loader2, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

/**
 * @fileoverview AI Chat Interface Component
 * @description Provides a real-time, conversational interface with the Google Gemini AI.
 * Handles message state, loading states, and robust error handling for rate-limited API routes.
 */

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am **CivicGuide AI**, powered by Google Gemini. I am here to help you understand the election process in a clear, non-partisan way.\n\nWhat would you like to know? 🗳️' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [contextStep, setContextStep] = useState('General Election Process');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          contextStep,
          history: messages
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to AI.';
      setMessages(prev => [...prev, { role: 'model', text: `⚠️ Error: ${errorMessage}` }]);
    } finally {
      setLoading(false);
    }
  };


  const clearChat = () => {
    setMessages([{ role: 'model', text: 'Chat cleared. How can I help you today?' }]);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: 1200, margin: '0 auto' }}>
      
      {/* Sidebar Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ border: '3px solid var(--border)', background: 'var(--yellow)', padding: '1.5rem', boxShadow: '5px 5px 0 var(--border)' }}>
          <h3 style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles className="w-4 h-4" /> CONTEXT ENGINE
          </h3>
          <select 
            style={{ width: '100%', background: '#fff', border: '3px solid var(--border)', padding: '10px', fontWeight: 700, fontFamily: 'var(--font-mono)', outline: 'none', cursor: 'pointer' }}
            value={contextStep}
            onChange={(e) => setContextStep(e.target.value)}
          >
            <option value="General Election Process">🏛️ GENERAL PROCESS</option>
            <option value="Voter Registration">📝 VOTER REGISTRATION</option>
            <option value="Research Candidates">🔍 CANDIDATE RESEARCH</option>
            <option value="Voting Day">🗳️ VOTING DAY</option>
            <option value="Election Results">📊 ELECTION RESULTS</option>
          </select>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#333', marginTop: 10, lineHeight: 1.4 }}>
            CHANGING CONTEXT HELPS GEMINI FOCUS ON SPECIFIC ECI RULES.
          </p>
        </div>

        <div style={{ border: '3px solid var(--border)', background: '#fff', padding: '1.5rem', boxShadow: '5px 5px 0 var(--border)' }}>
          <h3 style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>💡 QUICK PROMPTS</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              "LOK SABHA VS RAJYA SABHA?",
              "HOW TO GET A VOTER ID?",
              "WHAT ARE EVMS + VVPAT?",
              "MODEL CODE OF CONDUCT?",
              "MY RIGHTS AT THE BOOTH?"
            ].map(q => (
              <button 
                key={q}
                onClick={() => handleSuggestion(q)}
                style={{ textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, padding: '8px 12px', background: 'transparent', border: '2px solid transparent', borderBottom: '2px solid #eee', cursor: 'pointer', transition: 'all 0.1s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--saffron)'; e.currentTarget.style.background = 'var(--saffron-light)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.borderBottom = '2px solid #eee'; e.currentTarget.style.background = 'transparent'; }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ display: 'flex', flexDirection: 'column', height: 600, border: '3px solid var(--border)', background: '#fff', boxShadow: '8px 8px 0 var(--border)', overflow: 'hidden' }}>
        
        {/* Chat Header */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '3px solid var(--border)', background: 'var(--fg)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, background: 'var(--saffron)', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 900, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>CIVICGUIDE AI</h2>
              <p style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--yellow)', margin: 0, fontFamily: 'var(--font-mono)' }}>GEMINI 2.5 FLASH POWERED</p>
            </div>
          </div>
          <button onClick={clearChat} style={{ background: 'transparent', border: '2px solid #fff', color: '#fff', padding: 6, cursor: 'pointer' }}>
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Messages List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {msg.role === 'model' && (
                <div style={{ width: 32, height: 32, background: 'var(--fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid var(--border)' }}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div style={{ 
                maxWidth: '85%',
                padding: '1rem',
                border: '3px solid var(--border)',
                background: msg.role === 'user' ? 'var(--blue-light)' : '#fff',
                boxShadow: '3px 3px 0 var(--border)',
                fontSize: '0.9rem',
                fontWeight: 500,
                lineHeight: 1.5,
              }}>
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
                  }} 
                />
              </div>
              {msg.role === 'user' && (
                <div style={{ width: 32, height: 32, background: 'var(--saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid var(--border)' }}>
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div role="status" aria-label="AI is generating a response" style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 32, height: 32, background: 'var(--fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--border)' }}>
                <Bot className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <div style={{ padding: '0.75rem 1rem', border: '3px solid var(--border)', background: '#fff', boxShadow: '3px 3px 0 var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Loader2 className="w-4 h-4 animate-spin text-saffron" aria-hidden="true" />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>GEMINI IS THINKING...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1rem 1.5rem', background: '#fff', borderTop: '3px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <label htmlFor="civic-chat-input" className="sr-only">Ask a question about Indian elections</label>
            <input
              id="civic-chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ASK ANYTHING ABOUT INDIAN ELECTIONS..."
              aria-label="Ask a question about Indian elections"
              aria-required="true"
              autoComplete="off"
              maxLength={1000}
              style={{ flex: 1, padding: '12px 16px', border: '3px solid var(--border)', fontWeight: 700, fontSize: '0.9rem', outline: 'none', background: 'var(--bg)' }}
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="brut-btn brut-btn-saffron"
              aria-label="Send message to CivicGuide AI"
              style={{ padding: '0 20px' }}
            >
              <Send className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
