import React from 'react';
import { ArrowRight } from 'lucide-react';

const STATS = [
  { value: '968M+', label: 'Registered Voters' },
  { value: '543',   label: 'Lok Sabha Seats' },
  { value: '28',    label: 'States Voting' },
  { value: '5',     label: 'Election Phases' },
];

export function HeroSection({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <section className="border-b-[3px] border-[var(--border)] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 gap-12 items-center">
          <div className="max-w-[760px]">
            <div className="brut-tag brut-tag-saffron mb-6">
              ★ BUILT FOR INDIA&apos;S DEMOCRACY
            </div>

            <h1 className="text-[clamp(3rem,8vw,7rem)] font-black tracking-[-0.04em] leading-[0.95] mb-6 uppercase">
              <span className="glitch-hover inline-block transition-all duration-100">UNDERSTAND</span><br />
              <span className="block text-transparent" style={{ WebkitTextStroke: '3px var(--fg)' }}>
                INDIAN
              </span>
              <span className="text-[var(--saffron)]">DEMOCRACY</span>
            </h1>

            <p className="text-[1.15rem] leading-[1.7] max-w-[560px] mb-10 text-[#333] font-medium">
              An AI-powered civic education platform for India. Learn election phases, ask Gemini AI, access official ECI portals, quiz yourself, and follow live election news — all in one place.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 mb-10">
              {STATS.map(s => (
                <div key={s.value} className="brut-card px-5 py-3 text-center min-w-[110px]">
                  <div className="text-[1.6rem] font-black tracking-[-0.03em] text-[var(--saffron)]">{s.value}</div>
                  <div className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#555] font-mono">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="brut-btn brut-btn-saffron text-[0.9rem] px-7 py-3" onClick={() => onNavigate('chat')}>
                💬 ASK AI NOW <ArrowRight className="w-4 h-4" />
              </button>
              <button className="brut-btn brut-btn-ghost text-[0.9rem] px-7 py-3" onClick={() => onNavigate('timeline')}>
                📋 EXPLORE TIMELINE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
