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

/**
 * @fileoverview Civic Knowledge Quiz Component
 * @description An interactive, gamified assessment tool designed to test
 * user knowledge on Indian electoral processes. Integrates with the Google
 * Gemini API to provide dynamic, contextual hints for each question.
 */

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
      <div className="w-full max-w-[600px] mx-auto my-8 border-[3px] border-[var(--border)] shadow-[var(--shadow-lg)] bg-white p-12 text-center">
        <div className="w-20 h-20 bg-[var(--yellow)] border-[3px] border-[var(--border)] flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-sm)]">
          <Trophy className="w-10 h-10 text-black" />
        </div>
        <h2 className="text-[2.5rem] font-black uppercase mb-2 tracking-[-0.03em]">QUIZ COMPLETE!</h2>
        <p className="font-mono font-bold uppercase text-[#666] mb-8">YOU SCORED</p>
        <div className="text-[5rem] font-black text-[var(--saffron)] leading-none mb-10 tracking-[-0.05em]">
          {score} <span className="text-[2rem] text-[#ccc]">/ {quizQuestions.length}</span>
        </div>
        <button
          onClick={resetQuiz}
          className="brut-btn brut-btn-saffron w-full justify-center gap-3"
        >
          <RefreshCcw className="w-5 h-5" /> RETAKE QUIZ
        </button>
      </div>
    );
  }

  const q = quizQuestions[currentIdx];

  return (
    <section aria-label="Interactive Election Quiz" className="w-full max-w-[720px] mx-auto mb-8 border-[3px] border-[var(--border)] shadow-[var(--shadow-lg)] bg-white">
      {/* Progress Bar */}
      <div className="h-2 bg-[#e5e5e5] border-b-[3px] border-[var(--border)]">
        <div
          className="h-full bg-[var(--saffron)] transition-all duration-500 ease-in-out"
          style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
        />
      </div>

      <div className="p-8 pt-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <span aria-live="polite" className="font-mono text-[0.75rem] font-bold tracking-[0.1em] uppercase text-[#888]">
            QUESTION {currentIdx + 1} / {quizQuestions.length}
          </span>
          <span aria-live="polite" className="font-mono text-[0.85rem] font-bold py-1.5 px-4 bg-[var(--yellow)] text-black border-2 border-[var(--border)] shadow-[2px_2px_0_var(--border)]">
            SCORE: {score}
          </span>
        </div>

        {/* Question */}
        <h3 id="quiz-question" className="text-[1.5rem] font-extrabold leading-[1.3] mb-8 tracking-[-0.02em] uppercase">
          {q.q}
        </h3>

        {/* Options */}
        <div role="group" aria-labelledby="quiz-question" className="flex flex-col gap-4 mb-8">
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
                className={`${cls} font-[var(--font-grotesk)] text-[1rem]`}
              >
                <span>{opt}</span>
                {showResult && idx === q.answer && (
                  <span className="w-7 h-7 bg-[var(--green)] text-white flex items-center justify-center text-[0.9rem] font-black border-2 border-[var(--border)] shadow-[2px_2px_0_var(--border)]">✓</span>
                )}
                {showResult && idx === selected && idx !== q.answer && (
                  <span className="w-7 h-7 bg-[var(--red)] text-white flex items-center justify-center text-[0.9rem] font-black border-2 border-[var(--border)] shadow-[2px_2px_0_var(--border)]">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Hint section */}
        {!showResult && (
          <div className={hint ? 'mb-8' : ''}>
            <button
              onClick={getHint}
              disabled={hintLoading || !!hint}
              aria-busy={hintLoading}
              className="inline-flex items-center gap-2 font-bold text-[0.85rem] tracking-[0.05em] uppercase text-[var(--saffron)] bg-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--saffron)]"
            >
              {hintLoading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Lightbulb className="w-5 h-5" aria-hidden="true" />}
              {hint ? '💡 AI HINT RECEIVED' : 'NEED A HINT?'}
            </button>
            {hint && (
              <div aria-live="polite" className="mt-3 p-4 bg-[var(--blue-light)] border-2 border-[var(--border)] shadow-[4px_4px_0_var(--border)] text-[0.95rem] font-semibold leading-[1.5]">
                {hint}
              </div>
            )}
          </div>
        )}

        {/* Result feedback */}
        {showResult && (
          <div aria-live="assertive" className="animate-in slide-in-from-bottom-4 duration-300">
            <div className={`p-5 mb-6 border-[3px] border-[var(--border)] shadow-[4px_4px_0_var(--border)] ${selected === q.answer ? 'bg-[var(--green-light)]' : 'bg-[var(--red-light)]'}`}>
              <p className="font-black text-[1rem] mb-2 uppercase tracking-[0.02em]">
                {selected === q.answer ? '🎉 CORRECT!' : '💡 WRONG ANSWER'}
              </p>
              <p className="text-[0.95rem] leading-[1.6] m-0 text-[#111] font-medium">{q.explanation}</p>
            </div>

            <button
              onClick={nextQuestion}
              className="brut-btn brut-btn-saffron w-full justify-center text-[1rem] py-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--fg)]"
            >
              {currentIdx === quizQuestions.length - 1 ? 'SEE FINAL RESULTS' : 'NEXT QUESTION'} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
