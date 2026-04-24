"use client";

import React, { useState } from 'react';
import { Lightbulb, Trophy, ArrowRight, RefreshCcw, Loader2 } from 'lucide-react';

const quizQuestions = [
  {
    q: "What is the minimum voting age for an Indian citizen?",
    options: ["16 Years", "18 Years", "21 Years", "25 Years"],
    answer: 1,
    explanation: "The minimum voting age in India was lowered from 21 to 18 years by the 61st Constitutional Amendment in 1988."
  },
  {
    q: "Which constitutional body is responsible for conducting elections in India?",
    options: ["Supreme Court of India", "Parliament", "Election Commission of India", "President of India"],
    answer: 2,
    explanation: "Article 324 of the Constitution grants the Election Commission of India the power of superintendence, direction, and control of elections."
  },
  {
    q: "What machine is currently used to cast votes in Indian General Elections?",
    options: ["Mechanical Voting Machine", "Electronic Voting Machine (EVM)", "Punch Card Machine", "Internet Voting System"],
    answer: 1,
    explanation: "Electronic Voting Machines (EVMs) have been used in all general and state assembly elections since 2004."
  },
  {
    q: "What does VVPAT stand for in the context of Indian elections?",
    options: ["Voter Verified Paper Audit Trail", "Verified Voting Pattern And Tally", "Voting Verification Panel And Team", "Valid Voter Processing And Tracking"],
    answer: 0,
    explanation: "VVPAT allows voters to verify that their vote was cast correctly by printing a slip containing the candidate's serial number, name, and symbol."
  },
  {
    q: "When does the Model Code of Conduct (MCC) come into effect?",
    options: ["One month before the election", "Immediately after the election schedule is announced", "On the day of voting", "After the results are declared"],
    answer: 1,
    explanation: "The MCC comes into force immediately after the Election Commission announces the election schedule to ensure free and fair elections."
  }
];

export function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [hintLoading, setHintLoading] = useState(false);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === quizQuestions[currentIdx].answer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setShowResult(false);
      setHint(null);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setQuizFinished(false);
    setHint(null);
  };

  const getHint = async () => {
    if (hint || hintLoading) return;
    setHintLoading(true);
    try {
      const res = await fetch('/api/quiz-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: quizQuestions[currentIdx].q })
      });
      const data = await res.json();
      setHint(data.hint || 'No hint available.');
    } catch {
      setHint('Think carefully about the election timelines and rules.');
    } finally {
      setHintLoading(false);
    }
  };

  if (quizFinished) {
    return (
      <div style={{ width: '100%', maxWidth: 600, margin: '2rem auto', border: '3px solid var(--border)', boxShadow: 'var(--shadow-lg)', background: '#fff', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, background: 'var(--yellow)', border: '3px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <Trophy className="w-10 h-10 text-black" />
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>QUIZ COMPLETE!</h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#666', marginBottom: '2rem' }}>YOU SCORED</p>
        <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--saffron)', lineHeight: 1, marginBottom: '2.5rem', letterSpacing: '-0.05em' }}>
          {score} <span style={{ fontSize: '2rem', color: '#ccc' }}>/ {quizQuestions.length}</span>
        </div>
        <button 
          onClick={resetQuiz}
          className="brut-btn brut-btn-saffron"
          style={{ width: '100%', justifyContent: 'center', gap: '12px' }}
        >
          <RefreshCcw className="w-5 h-5" /> RETAKE QUIZ
        </button>
      </div>
    );
  }

  const q = quizQuestions[currentIdx];

  return (
    <section aria-label="Interactive Election Quiz" style={{ width: '100%', maxWidth: 720, margin: '0 auto 2rem', border: '3px solid var(--border)', boxShadow: 'var(--shadow-lg)', background: '#fff' }}>
      {/* Progress Bar */}
      <div style={{ height: 8, background: '#e5e5e5', borderBottom: '3px solid var(--border)' }}>
        <div style={{ height: '100%', background: 'var(--saffron)', transition: 'width 0.5s ease', width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }} />
      </div>

      <div style={{ padding: '2.5rem 2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <span aria-live="polite" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888' }}>
            QUESTION {currentIdx + 1} / {quizQuestions.length}
          </span>
          <span aria-live="polite" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, padding: '6px 16px', background: 'var(--yellow)', color: '#000', border: '2px solid var(--border)', boxShadow: '2px 2px 0 var(--border)' }}>
            SCORE: {score}
          </span>
        </div>

        {/* Question */}
        <h3 id="quiz-question" style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '2rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          {q.q}
        </h3>

        {/* Options */}
        <div role="group" aria-labelledby="quiz-question" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {q.options.map((opt, idx) => {
            let cls = 'quiz-option';
            if (showResult) {
              if (idx === q.answer) cls += ' quiz-option-correct';
              else if (idx === selected) cls += ' quiz-option-wrong';
              else cls += ' quiz-option-disabled';
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                aria-pressed={showResult && idx === selected}
                className={cls}
                style={{ fontFamily: 'var(--font-grotesk)', fontSize: '1rem' }}
              >
                <span>{opt}</span>
                {showResult && idx === q.answer && <span style={{ width: 28, height: 28, background: 'var(--green)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 900, border: '2px solid var(--border)', boxShadow: '2px 2px 0 var(--border)' }}>✓</span>}
                {showResult && idx === selected && idx !== q.answer && <span style={{ width: 28, height: 28, background: 'var(--red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 900, border: '2px solid var(--border)', boxShadow: '2px 2px 0 var(--border)' }}>✗</span>}
              </button>
            );
          })}
        </div>

        {/* Hint section */}
        {!showResult && (
          <div style={{ marginBottom: hint ? '2rem' : 0 }}>
            <button
              onClick={getHint}
              disabled={hintLoading || !!hint}
              aria-busy={hintLoading}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--saffron)', background: 'none', border: 'none', cursor: hintLoading || !!hint ? 'not-allowed' : 'pointer', opacity: !!hint ? 0.6 : 1, padding: 0 }}>
              {hintLoading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Lightbulb className="w-5 h-5" aria-hidden="true" />}
              {hint ? '💡 AI HINT RECEIVED' : 'NEED A HINT?'}
            </button>
            {hint && (
              <div aria-live="polite" style={{ marginTop: 12, padding: '16px', background: 'var(--blue-light)', border: '2px solid var(--border)', boxShadow: '4px 4px 0 var(--border)', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.5 }}>
                {hint}
              </div>
            )}
          </div>
        )}

        {/* Result feedback */}
        {showResult && (
          <div aria-live="assertive" className="animate-in slide-in-from-bottom-4 duration-300">
            <div style={{
              padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
              border: '3px solid var(--border)',
              background: selected === q.answer ? 'var(--green-light)' : 'var(--red-light)',
              boxShadow: '4px 4px 0 var(--border)',
            }}>
              <p style={{ fontWeight: 900, fontSize: '1rem', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                {selected === q.answer ? '🎉 CORRECT!' : '💡 WRONG ANSWER'}
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: 0, color: '#111', fontWeight: 500 }}>{q.explanation}</p>
            </div>

            <button
              onClick={nextQuestion}
              className="brut-btn brut-btn-saffron"
              style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '16px' }}>
              {currentIdx === quizQuestions.length - 1 ? 'SEE FINAL RESULTS' : 'NEXT QUESTION'} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
