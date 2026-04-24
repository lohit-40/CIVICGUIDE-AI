import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[var(--fg)] text-white border-t-[3px] border-[var(--border)] py-12 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">🗳️</span>
              <span className="font-extrabold text-base tracking-[-0.01em]">CIVICGUIDE AI</span>
            </div>
            <p className="text-[0.85rem] text-[#999] leading-[1.7] mb-4">
              Empowering informed voters through AI-driven, non-partisan civic education. Built for the Virtual Prompt War.
            </p>
            <div className="brut-tag brut-tag-saffron inline-block">INDIA 🇮🇳</div>
          </div>

          {/* Official Resources */}
          <div>
            <h4 className="font-extrabold text-[0.75rem] tracking-[0.12em] uppercase mb-4 text-[var(--saffron)]">
              OFFICIAL RESOURCES
            </h4>
            {[
              { label: 'Election Commission of India', href: 'https://eci.gov.in/' },
              { label: 'Voter Service Portal', href: 'https://voters.eci.gov.in/' },
              { label: 'Search Electoral Roll', href: 'https://electoralsearch.eci.gov.in/' },
              { label: 'Results — ECI', href: 'https://results.eci.gov.in/' },
            ].map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                className="block text-[#bbb] text-[0.85rem] mb-2 no-underline transition-colors hover:text-[var(--saffron)]">
                → {l.label}
              </a>
            ))}
          </div>

          {/* Powered By */}
          <div>
            <h4 className="font-extrabold text-[0.75rem] tracking-[0.12em] uppercase mb-4 text-[var(--saffron)]">
              POWERED BY GOOGLE
            </h4>
            {['Google Gemini 2.5 Flash', 'Google Maps Embed API', 'Firebase Authentication', 'Google News RSS'].map(t => (
              <p key={t} className="text-[#bbb] text-[0.85rem] mb-2">✓ {t}</p>
            ))}
          </div>
        </div>

        <div className="border-t-[2px] border-[#333] pt-6 flex flex-wrap justify-between gap-4 items-center">
          <p className="text-[#666] text-[0.8rem] m-0">
            CivicGuide AI is non-partisan and does not endorse any candidate or political party.
          </p>
          <p className="text-[#666] text-[0.8rem] m-0 font-mono">
            Virtual Prompt War 2026 — Built with ❤️ for India
          </p>
        </div>
      </div>
    </footer>
  );
}
