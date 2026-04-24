"use client";

import React, { useState, useRef } from 'react';
import { Timeline } from '@/components/Timeline';
import { AIChat } from '@/components/AIChat';
import { CivicLookup } from '@/components/CivicLookup';
import { Quiz } from '@/components/Quiz';
import { NewsPage } from '@/components/NewsPage';
import { useAuth } from '@/components/AuthProvider';
import { LogIn, LogOut, Menu, X } from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { Footer } from '@/components/Footer';

type Tab = 'timeline' | 'chat' | 'civic' | 'quiz' | 'news';

const MARQUEE_ITEMS = [
  'VOTER REGISTRATION', 'ECI', 'LOK SABHA', 'RAJYA SABHA', 'EPIC CARD',
  'EVM + VVPAT', 'MODEL CODE OF CONDUCT', '543 CONSTITUENCIES',
  'VOTER ID', 'POLLING BOOTH', 'ELECTION COMMISSION',
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('timeline');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const appRef = useRef<HTMLElement>(null);
  const { user, signIn, logOut } = useAuth();

  const scrollToApp = (tab?: string) => {
    if (tab) setActiveTab(tab as Tab);
    setTimeout(() => {
      appRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="bg-[var(--bg)] text-[var(--fg)] font-[var(--font-grotesk)]">
      {/* ============ STICKY HEADER ============ */}
      <header className="sticky top-0 z-[100] bg-[var(--fg)] text-white border-b-[3px] border-[var(--border)] shadow-[0_3px_0_var(--saffron)]">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <span className="text-[28px]">🗳️</span>
            <span className="font-bold text-[1.15rem] tracking-[-0.02em] text-white">
              CIVIC<span className="text-[var(--saffron)]">GUIDE AI</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1 items-center">
            {[
              { id: 'timeline', label: 'TIMELINE' },
              { id: 'chat',     label: 'AI CHAT' },
              { id: 'civic',    label: 'RESOURCES' },
              { id: 'quiz',     label: 'QUIZ' },
              { id: 'news',     label: 'NEWS' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => scrollToApp(t.id)}
                aria-current={activeTab === t.id ? 'page' : undefined}
                className={`px-3.5 py-1.5 font-bold text-[0.75rem] tracking-[0.08em] border-2 cursor-pointer transition-all ${
                  activeTab === t.id 
                    ? 'border-[var(--saffron)] bg-[var(--saffron)] text-white' 
                    : 'border-transparent bg-transparent text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {/* Right: Auth + Mobile toggle */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.photoURL || ''} alt="Profile" className="w-8 h-8 border-2 border-[var(--saffron)]" />
                <button onClick={logOut} className="brut-btn px-3 py-1.5 text-[0.75rem] bg-transparent border-2 border-white text-white shadow-none flex items-center gap-2">
                  <LogOut className="w-3 h-3" /> SIGN OUT
                </button>
              </div>
            ) : (
              <button onClick={signIn} className="brut-btn brut-btn-saffron px-4 py-2 text-[0.75rem] flex items-center gap-2">
                <LogIn className="w-3 h-3" /> SIGN IN
              </button>
            )}
            {/* Mobile menu toggle */}
            <button
              className="md:hidden bg-transparent border-none text-white cursor-pointer p-1"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div id="mobile-nav" role="navigation" aria-label="Mobile navigation" className="border-t-[3px] border-[var(--saffron)] bg-[#111]">
            {[
              { id: 'timeline', label: '📋 TIMELINE' },
              { id: 'chat',     label: '💬 AI CHAT' },
              { id: 'civic',    label: '📍 RESOURCES' },
              { id: 'quiz',     label: '🧠 QUIZ' },
              { id: 'news',     label: '📰 NEWS' },
            ].map(t => (
              <button 
                key={t.id} 
                onClick={() => { scrollToApp(t.id); setMobileMenuOpen(false); }}
                aria-current={activeTab === t.id ? 'page' : undefined}
                className={`block w-full text-left px-6 py-3.5 font-bold text-[0.85rem] tracking-[0.08em] cursor-pointer border-none border-b border-[#333] ${
                  activeTab === t.id ? 'bg-[var(--saffron)] text-white' : 'bg-transparent text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ============ MARQUEE STRIP ============ */}
      <div aria-hidden="true" className="bg-[var(--saffron)] border-b-[3px] border-[var(--border)] overflow-hidden py-2">
        <div className="marquee-track flex whitespace-nowrap w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-bold text-[0.8rem] tracking-[0.15em] text-white mr-12">
              ★ {item}
            </span>
          ))}
        </div>
      </div>

      <HeroSection onNavigate={scrollToApp} />
      <FeaturesSection onNavigate={scrollToApp} />
      <HowItWorksSection />

      {/* ============ APP SECTION ============ */}
      <main id="main-content" ref={appRef} className="min-h-screen pt-16">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <div className="flex-1">
              <div className="brut-tag brut-tag-saffron mb-2.5">INTERACTIVE TOOLS</div>
              <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-[-0.03em] uppercase m-0">
                — START EXPLORING —
              </h2>
            </div>
          </div>

          {/* TAB BAR */}
          <div className="flex overflow-x-auto gap-0 mb-8 border-t-[3px] border-l-[3px] border-[var(--border)] hide-scrollbar">
            {[
              { id: 'timeline', label: '📋 TIMELINE' },
              { id: 'chat',     label: '💬 AI CHAT' },
              { id: 'civic',    label: '📍 RESOURCES' },
              { id: 'quiz',     label: '🧠 QUIZ' },
              { id: 'news',     label: '📰 NEWS' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as Tab)}
                aria-current={activeTab === t.id ? 'page' : undefined}
                className={`shrink-0 px-[22px] py-[14px] font-extrabold text-[0.78rem] tracking-[0.08em] uppercase border-none border-r-[3px] border-[var(--border)] cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === t.id 
                    ? 'border-b-[3px] border-b-transparent bg-[var(--saffron)] text-white' 
                    : 'border-b-[3px] border-b-[var(--border)] bg-[var(--bg)] text-[var(--fg)]'
                }`}
              >
                {t.label}
              </button>
            ))}
            {/* Filler right border */}
            <div className="flex-1 border-b-[3px] border-[var(--border)]" />
          </div>

          {/* TAB CONTENT */}
          <div className="min-h-[500px] pb-16">
            {activeTab === 'timeline' && <Timeline />}
            {activeTab === 'chat' && <AIChat />}
            {activeTab === 'civic' && <CivicLookup />}
            {activeTab === 'quiz' && <Quiz />}
            {activeTab === 'news' && <NewsPage />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
