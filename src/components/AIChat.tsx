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

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 max-w-[1200px] mx-auto">
      
      {/* Sidebar Controls */}
      <div className="flex flex-col gap-6">
        <div className="border-[3px] border-[var(--border)] bg-[var(--yellow)] p-6 shadow-[5px_5px_0_var(--border)]">
          <h3 className="font-black text-[0.75rem] uppercase tracking-[0.1em] mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> CONTEXT ENGINE
          </h3>
          <select 
            className="w-full bg-white border-[3px] border-[var(--border)] p-2.5 font-bold font-mono outline-none cursor-pointer"
            value={contextStep}
            onChange={(e) => setContextStep(e.target.value)}
          >
            <option value="General Election Process">🏛️ GENERAL PROCESS</option>
            <option value="Voter Registration">📝 VOTER REGISTRATION</option>
            <option value="Research Candidates">🔍 CANDIDATE RESEARCH</option>
            <option value="Voting Day">🗳️ VOTING DAY</option>
            <option value="Election Results">📊 ELECTION RESULTS</option>
          </select>
          <p className="text-[0.7rem] font-semibold text-[#333] mt-2.5 leading-[1.4]">
            CHANGING CONTEXT HELPS GEMINI FOCUS ON SPECIFIC ECI RULES.
          </p>
        </div>

        <div className="border-[3px] border-[var(--border)] bg-white p-6 shadow-[5px_5px_0_var(--border)]">
          <h3 className="font-black text-[0.75rem] uppercase tracking-[0.1em] mb-3">💡 QUICK PROMPTS</h3>
          <div className="flex flex-col gap-2">
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
                className="text-left text-[0.75rem] font-bold px-3 py-2 bg-transparent border-2 border-transparent border-b-[#eee] cursor-pointer transition-all duration-100 hover:border-b-[var(--saffron)] hover:border-[var(--saffron)] hover:bg-[var(--saffron-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--saffron)] focus-visible:bg-[var(--saffron-light)] focus-visible:border-[var(--saffron)]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col h-[600px] border-[3px] border-[var(--border)] bg-white shadow-[8px_8px_0_var(--border)] overflow-hidden">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b-[3px] border-[var(--border)] bg-[var(--fg)] text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--saffron)] border-2 border-white flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-[1rem] font-black m-0 uppercase tracking-[0.05em]">CIVICGUIDE AI</h2>
              <p className="text-[0.65rem] font-semibold text-[var(--yellow)] m-0 font-mono">GEMINI 2.5 FLASH POWERED</p>
            </div>
          </div>
          <button onClick={clearChat} className="bg-transparent border-2 border-white text-white p-1.5 cursor-pointer hover:bg-white hover:text-[var(--fg)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f9f9f9] flex flex-col gap-5">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 bg-[var(--fg)] flex items-center justify-center shrink-0 border-2 border-[var(--border)]">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[85%] p-4 border-[3px] border-[var(--border)] shadow-[3px_3px_0_var(--border)] text-[0.9rem] font-medium leading-[1.5] ${msg.role === 'user' ? 'bg-[var(--blue-light)]' : 'bg-white'}`}>
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: escapeHtml(msg.text).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
                  }} 
                />
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 bg-[var(--saffron)] flex items-center justify-center shrink-0 border-2 border-[var(--border)]">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div role="status" aria-label="AI is generating a response" className="flex gap-3">
              <div className="w-8 h-8 bg-[var(--fg)] flex items-center justify-center border-2 border-[var(--border)]">
                <Bot className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <div className="py-3 px-4 border-[3px] border-[var(--border)] bg-white shadow-[3px_3px_0_var(--border)] flex items-center gap-2.5">
                <Loader2 className="w-4 h-4 animate-spin text-[var(--saffron)]" aria-hidden="true" />
                <span className="text-[0.8rem] font-extrabold uppercase">GEMINI IS THINKING...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 px-6 bg-white border-t-[3px] border-[var(--border)]">
          <div className="flex gap-3">
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
              className="flex-1 p-3 px-4 border-[3px] border-[var(--border)] font-bold text-[0.9rem] outline-none bg-[var(--bg)] focus:border-[var(--saffron)]"
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="brut-btn brut-btn-saffron px-5 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2"
              aria-label="Send message to CivicGuide AI"
            >
              <Send className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
