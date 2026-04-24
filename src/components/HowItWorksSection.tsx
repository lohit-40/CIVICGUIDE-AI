import React from 'react';

export function HowItWorksSection() {
  return (
    <section className="border-b-[3px] border-[var(--border)] bg-[var(--yellow)] py-16 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="brut-tag brut-tag-dark mb-4">POWERED BY GOOGLE</div>
        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[-0.03em] uppercase mb-10">
          HOW IT <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--fg)' }}>WORKS</span>
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
          {[
            { step: '01', title: 'Google Gemini AI', desc: 'The AI Chat and Quiz Hints are powered by Gemini 2.5 Flash for accurate, fast election answers.' },
            { step: '02', title: 'ECI Official Links', desc: 'Voter Resources link directly to electoralsearch.eci.gov.in and voters.eci.gov.in — official portals.' },
            { step: '03', title: 'Google Maps Embed', desc: 'Enter your pincode in Voter Resources to explore local polling station locations on an interactive map.' },
            { step: '04', title: 'Google News RSS', desc: 'Live election news is pulled from Google News RSS — no API key required, always up-to-date.' },
          ].map(item => (
            <div key={item.step} className="brut-card p-6 bg-white">
              <div className="font-mono font-bold text-[2rem] text-[var(--saffron)] mb-3">{item.step}</div>
              <h3 className="font-extrabold text-[0.95rem] uppercase mb-2 tracking-[-0.01em]">{item.title}</h3>
              <p className="text-[0.85rem] text-[#555] leading-[1.6] m-0">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
