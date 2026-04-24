"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Timeline } from '@/components/Timeline';
import { AIChat } from '@/components/AIChat';
import { CivicLookup } from '@/components/CivicLookup';
import { Quiz } from '@/components/Quiz';
import { NewsPage } from '@/components/NewsPage';
import { useAuth } from '@/components/AuthProvider';
import { LogIn, LogOut, ArrowDown, ArrowRight, Newspaper, Brain, MapPin, MessageCircle, ListOrdered, Menu, X } from 'lucide-react';

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

const STATS = [
  { value: '968M+', label: 'Registered Voters' },
  { value: '543',   label: 'Lok Sabha Seats' },
  { value: '28',    label: 'States Voting' },
  { value: '5',     label: 'Election Phases' },
];

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

  const scrollToApp = (tab?: Tab) => {
    if (tab) setActiveTab(tab);
    setTimeout(() => {
      appRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font-grotesk)' }}>

      {/* ============ STICKY HEADER ============ */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: 'var(--fg)', color: '#fff',
        borderBottom: '3px solid var(--border)',
        boxShadow: '0 3px 0 var(--saffron)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 28 }}>🗳️</span>
            <span style={{ fontWeight: 700, fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#fff' }}>
              CIVIC<span style={{ color: 'var(--saffron)' }}>GUIDE AI</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="hidden md:flex">
            {[
              { id: 'timeline', label: 'TIMELINE' },
              { id: 'chat',     label: 'AI CHAT' },
              { id: 'civic',    label: 'RESOURCES' },
              { id: 'quiz',     label: 'QUIZ' },
              { id: 'news',     label: 'NEWS' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => scrollToApp(t.id as Tab)}
                style={{
                  padding: '6px 14px',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  border: activeTab === t.id ? '2px solid var(--saffron)' : '2px solid transparent',
                  background: activeTab === t.id ? 'var(--saffron)' : 'transparent',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.1s',
                }}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {/* Right: Auth + Mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={user.photoURL || ''} alt="Profile" style={{ width: 32, height: 32, border: '2px solid var(--saffron)' }} />
                <button onClick={logOut} className="brut-btn" style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'transparent', border: '2px solid #fff', color: '#fff', boxShadow: 'none' }}>
                  <LogOut className="w-3 h-3" /> SIGN OUT
                </button>
              </div>
            ) : (
              <button onClick={signIn} className="brut-btn brut-btn-saffron" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>
                <LogIn className="w-3 h-3" /> SIGN IN
              </button>
            )}
            {/* Mobile menu toggle */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(v => !v)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div style={{ borderTop: '3px solid var(--saffron)', background: '#111' }}>
            {[
              { id: 'timeline', label: '📋 TIMELINE' },
              { id: 'chat',     label: '💬 AI CHAT' },
              { id: 'civic',    label: '📍 RESOURCES' },
              { id: 'quiz',     label: '🧠 QUIZ' },
              { id: 'news',     label: '📰 NEWS' },
            ].map(t => (
              <button key={t.id} onClick={() => { scrollToApp(t.id as Tab); setMobileMenuOpen(false); }}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 24px', background: activeTab === t.id ? 'var(--saffron)' : 'transparent', color: '#fff', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', cursor: 'pointer', border: 'none', borderBottom: '1px solid #333' }}>
                {t.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ============ MARQUEE STRIP ============ */}
      <div style={{ background: 'var(--saffron)', borderBottom: '3px solid var(--border)', overflow: 'hidden', padding: '8px 0' }}>
        <div className="marquee-track" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.15em', color: '#fff', marginRight: 48 }}>
              ★ {item}
            </span>
          ))}
        </div>
      </div>

      {/* ============ HERO SECTION ============ */}
      <section style={{ borderBottom: '3px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 1.5rem 4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }}>

            {/* Left: Text */}
            <div style={{ maxWidth: 760 }}>
              <div className="brut-tag brut-tag-saffron" style={{ marginBottom: '1.5rem' }}>
                ★ BUILT FOR INDIA'S DEMOCRACY
              </div>

              <h1 style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}>
                <span className="glitch-hover" style={{ display: 'inline-block', transition: 'all 0.1s' }}>UNDERSTAND</span><br />
                <span style={{ WebkitTextStroke: '3px var(--fg)', color: 'transparent', display: 'block' }}>
                  INDIAN
                </span>
                <span style={{ color: 'var(--saffron)' }}>DEMOCRACY</span>
              </h1>

              <p style={{ fontSize: '1.15rem', lineHeight: 1.7, maxWidth: 560, marginBottom: '2.5rem', color: '#333', fontWeight: 500 }}>
                An AI-powered civic education platform for India. Learn election phases, ask Gemini AI, access official ECI portals, quiz yourself, and follow live election news — all in one place.
              </p>

              {/* Stats row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
                {STATS.map(s => (
                  <div key={s.value} className="brut-card" style={{ padding: '12px 20px', textAlign: 'center', minWidth: 110 }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--saffron)' }}>{s.value}</div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', fontFamily: 'var(--font-mono)' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <button className="brut-btn brut-btn-saffron" onClick={() => scrollToApp('chat')} style={{ fontSize: '0.9rem', padding: '14px 28px' }}>
                  💬 ASK AI NOW <ArrowRight className="w-4 h-4" />
                </button>
                <button className="brut-btn brut-btn-ghost" onClick={() => scrollToApp('timeline')} style={{ fontSize: '0.9rem', padding: '14px 28px' }}>
                  📋 EXPLORE TIMELINE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section style={{ borderBottom: '3px solid var(--border)', backgroundColor: 'var(--fg)', color: '#fff', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <div className="brut-tag" style={{ background: 'var(--saffron)', color: '#fff', borderColor: 'var(--saffron)', marginBottom: 12 }}>5 TOOLS</div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#fff', margin: 0 }}>
                WHAT CAN YOU<br /><span style={{ color: 'var(--saffron)' }}>DO HERE?</span>
              </h2>
            </div>
            <p style={{ maxWidth: 360, color: '#aaa', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Five powerful tools to help every Indian citizen understand, participate in, and stay informed about the electoral process.
            </p>
          </div>

          {/* Feature cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {FEATURES.map(f => (
              <button
                key={f.id}
                onClick={() => scrollToApp(f.id)}
                className={`${f.color} brut-feature-card`}
                style={{
                  textAlign: 'left',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  border: '3px solid',
                  borderColor: f.id === 'news' ? 'var(--saffron)' : 'var(--border)',
                  boxShadow: f.id === 'news' ? '5px 5px 0 var(--saffron)' : 'var(--shadow)',
                  transition: 'all 0.1s ease',
                  color: f.id === 'news' ? '#fff' : 'var(--fg)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '2.5rem' }}>{f.emoji}</span>
                  <span className="brut-tag brut-tag-dark" style={{ fontSize: '0.6rem' }}>{f.tag}</span>
                </div>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.01em', marginBottom: 8, textTransform: 'uppercase' }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '0.87rem', lineHeight: 1.65, color: f.id === 'news' ? '#ccc' : '#444', margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.05em', color: f.id === 'news' ? 'var(--yellow)' : 'var(--saffron)', textTransform: 'uppercase', marginTop: 'auto' }}>
                  OPEN TOOL <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section style={{ borderBottom: '3px solid var(--border)', background: 'var(--yellow)', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="brut-tag brut-tag-dark" style={{ marginBottom: 16 }}>POWERED BY GOOGLE</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
            HOW IT <span style={{ WebkitTextStroke: '2px var(--fg)', color: 'transparent' }}>WORKS</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {[
              { step: '01', title: 'Google Gemini AI', desc: 'The AI Chat and Quiz Hints are powered by Gemini 2.5 Flash for accurate, fast election answers.' },
              { step: '02', title: 'ECI Official Links', desc: 'Voter Resources link directly to electoralsearch.eci.gov.in and voters.eci.gov.in — official portals.' },
              { step: '03', title: 'Google Maps Embed', desc: 'Enter your pincode in Voter Resources to explore local polling station locations on an interactive map.' },
              { step: '04', title: 'Google News RSS', desc: 'Live election news is pulled from Google News RSS — no API key required, always up-to-date.' },
            ].map(item => (
              <div key={item.step} className="brut-card" style={{ padding: '1.5rem', background: '#fff' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '2rem', color: 'var(--saffron)', marginBottom: 12 }}>{item.step}</div>
                <h3 style={{ fontWeight: 800, fontSize: '0.95rem', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ APP SECTION ============ */}
      <section ref={appRef} style={{ minHeight: '100vh', padding: '4rem 0 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div className="brut-tag brut-tag-saffron" style={{ marginBottom: 10 }}>INTERACTIVE TOOLS</div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: 0 }}>
                — START EXPLORING —
              </h2>
            </div>
          </div>

          {/* TAB BAR */}
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: 0,
            marginBottom: '2rem',
            borderTop: '3px solid var(--border)',
            borderLeft: '3px solid var(--border)',
          }} className="hide-scrollbar">
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
                style={{
                  flexShrink: 0,
                  padding: '14px 22px',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRight: '3px solid var(--border)',
                  borderBottom: activeTab === t.id ? '3px solid transparent' : '3px solid var(--border)',
                  background: activeTab === t.id ? 'var(--saffron)' : 'var(--bg)',
                  color: activeTab === t.id ? '#fff' : 'var(--fg)',
                  cursor: 'pointer',
                  transition: 'all 0.1s',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.label}
              </button>
            ))}
            {/* Filler right border */}
            <div style={{ flex: 1, borderBottom: '3px solid var(--border)' }} />
          </div>

          {/* TAB CONTENT */}
          <div style={{ minHeight: 500, paddingBottom: '4rem' }}>
            {activeTab === 'timeline' && <Timeline />}
            {activeTab === 'chat' && <AIChat />}
            {activeTab === 'civic' && <CivicLookup />}
            {activeTab === 'quiz' && <Quiz />}
            {activeTab === 'news' && <NewsPage />}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{ background: 'var(--fg)', color: '#fff', borderTop: '3px solid var(--border)', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>🗳️</span>
                <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.01em' }}>CIVICGUIDE AI</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#999', lineHeight: 1.7, margin: '0 0 16px' }}>
                Empowering informed voters through AI-driven, non-partisan civic education. Built for the Virtual Prompt War.
              </p>
              <div className="brut-tag brut-tag-saffron">INDIA 🇮🇳</div>
            </div>

            {/* Official Resources */}
            <div>
              <h4 style={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16, color: 'var(--saffron)' }}>
                OFFICIAL RESOURCES
              </h4>
              {[
                { label: 'Election Commission of India', href: 'https://eci.gov.in/' },
                { label: 'Voter Service Portal', href: 'https://voters.eci.gov.in/' },
                { label: 'Search Electoral Roll', href: 'https://electoralsearch.eci.gov.in/' },
                { label: 'Results — ECI', href: 'https://results.eci.gov.in/' },
              ].map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', color: '#bbb', fontSize: '0.85rem', marginBottom: 8, textDecoration: 'none', transition: 'color 0.1s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--saffron)')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#bbb')}>
                  → {l.label}
                </a>
              ))}
            </div>

            {/* Powered By */}
            <div>
              <h4 style={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16, color: 'var(--saffron)' }}>
                POWERED BY GOOGLE
              </h4>
              {['Google Gemini 2.5 Flash', 'Google Maps Embed API', 'Firebase Authentication', 'Google News RSS'].map(t => (
                <p key={t} style={{ color: '#bbb', fontSize: '0.85rem', margin: '0 0 8px' }}>✓ {t}</p>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '2px solid #333', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
            <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>
              CivicGuide AI is non-partisan and does not endorse any candidate or political party.
            </p>
            <p style={{ color: '#666', fontSize: '0.8rem', margin: 0, fontFamily: 'var(--font-mono)' }}>
              Virtual Prompt War 2026 — Built with ❤️ for India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
