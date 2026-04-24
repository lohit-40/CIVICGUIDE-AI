import React from 'react';
import { ArrowRight, Newspaper, Brain, MapPin, MessageCircle, ListOrdered } from 'lucide-react';

type Tab = 'timeline' | 'chat' | 'civic' | 'quiz' | 'news';

const FEATURES = [
  {
    id: 'timeline' as Tab,
    emoji: '📋',
    icon: <ListOrdered className="w-6 h-6" />,
    title: 'ELECTION TIMELINE',
    desc: 'Walk through all 7 phases of the Indian election process — from Voter Registration to Result Declaration. Understand what happens at each step.',
    tag: 'LEARN',
    color: 'brut-card-saffron',
  },
  {
    id: 'chat' as Tab,
    emoji: '💬',
    icon: <MessageCircle className="w-6 h-6" />,
    title: 'AI CHAT',
    desc: 'Ask Gemini AI anything about Indian elections — Lok Sabha vs Rajya Sabha, EVM concerns, Model Code of Conduct, and more. Get clear answers instantly.',
    tag: 'POWERED BY GEMINI',
    color: 'brut-card-blue',
  },
  {
    id: 'civic' as Tab,
    emoji: '📍',
    icon: <MapPin className="w-6 h-6" />,
    title: 'VOTER RESOURCES',
    desc: 'Access official ECI portals — search your electoral roll, download e-EPIC, register as a new voter, and explore local polling areas on the map.',
    tag: 'OFFICIAL ECI LINKS',
    color: 'brut-card-green',
  },
  {
    id: 'quiz' as Tab,
    emoji: '🧠',
    icon: <Brain className="w-6 h-6" />,
    title: 'CIVIC QUIZ',
    desc: 'Test your knowledge of the Indian electoral system with 5 questions. Get AI-generated hints when you\'re stuck. How well do you know your democracy?',
    tag: 'TEST YOURSELF',
    color: 'brut-card-yellow',
  },
  {
    id: 'news' as Tab,
    emoji: '📰',
    icon: <Newspaper className="w-6 h-6" />,
    title: 'ELECTION NEWS',
    desc: 'Stay current with live Indian election news from Google News. Articles tagged by topic — ECI updates, Lok Sabha, EVMs, party news, and results.',
    tag: 'LIVE NEWS',
    color: 'brut-card-dark',
  },
];

export function FeaturesSection({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <section className="border-b-[3px] border-[var(--border)] bg-[var(--fg)] text-white py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="brut-tag bg-[var(--saffron)] text-white border-[var(--saffron)] mb-3">5 TOOLS</div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-[-0.03em] uppercase text-white m-0">
              WHAT CAN YOU<br /><span className="text-[var(--saffron)]">DO HERE?</span>
            </h2>
          </div>
          <p className="max-w-[360px] text-[#aaa] text-[0.95rem] leading-[1.7]">
            Five powerful tools to help every Indian citizen understand, participate in, and stay informed about the electoral process.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
          {FEATURES.map(f => (
            <button
              key={f.id}
              onClick={() => onNavigate(f.id)}
              className={`${f.color} brut-feature-card text-left p-7 cursor-pointer flex flex-col gap-4 border-[3px] transition-all duration-100`}
              style={{
                borderColor: f.id === 'news' ? 'var(--saffron)' : 'var(--border)',
                boxShadow: f.id === 'news' ? '5px 5px 0 var(--saffron)' : 'var(--shadow)',
                color: f.id === 'news' ? '#fff' : 'var(--fg)',
              }}
            >
              <div className="flex justify-between items-start">
                <span className="text-[2.5rem]">{f.emoji}</span>
                <span className="brut-tag brut-tag-dark text-[0.6rem]">{f.tag}</span>
              </div>
              <div>
                <h3 className="font-extrabold text-[1.05rem] tracking-[-0.01em] mb-2 uppercase">
                  {f.title}
                </h3>
                <p className={`text-[0.87rem] leading-[1.65] m-0 ${f.id === 'news' ? 'text-[#ccc]' : 'text-[#444]'}`}>
                  {f.desc}
                </p>
              </div>
              <div className={`flex items-center gap-1.5 font-bold text-[0.8rem] tracking-[0.05em] uppercase mt-auto ${f.id === 'news' ? 'text-[var(--yellow)]' : 'text-[var(--saffron)]'}`}>
                OPEN TOOL <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
