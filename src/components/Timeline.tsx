"use client";

import React, { useState } from 'react';
import { FileText, Search, Vote, BarChart3, ChevronRight, Info, ExternalLink } from 'lucide-react';

const steps = [
  {
    id: 0,
    title: "Voter Registration (EPIC)",
    status: "Year-Round",
    statusBg: "var(--green-light)",
    icon: FileText,
    content: "To vote in India, you must be 18+ and have a Voter ID card (EPIC). You can register online through the Election Commission of India (ECI) Voter Portal or via Form 6.",
    tip: "You can track your registration status and download your e-EPIC directly from the Voter Portal.",
    link: "https://voters.eci.gov.in/",
    color: "var(--green)",
  },
  {
    id: 1,
    title: "Election Notification",
    status: "Pre-Election",
    statusBg: "var(--blue-light)",
    icon: Search,
    content: "The ECI announces the election schedule and enforces the Model Code of Conduct (MCC). Candidates then file their nomination papers, which are scrutinized for validity.",
    tip: "Use the KYC (Know Your Candidate) App by ECI to check the criminal antecedents and affidavits of candidates.",
    link: "https://play.google.com/store/apps/details?id=com.eci.citizen",
    color: "var(--blue)",
  },
  {
    id: 2,
    title: "Polling Day (EVMs)",
    status: "Election Day",
    statusBg: "var(--saffron-light)",
    icon: Vote,
    content: "Voting is conducted using Electronic Voting Machines (EVMs) accompanied by Voter Verifiable Paper Audit Trails (VVPAT) to ensure transparency and accuracy.",
    tip: "You can vote even if you don't have a physical Voter ID, as long as your name is on the electoral roll and you show an approved alternate ID.",
    link: "https://electoralsearch.eci.gov.in/",
    color: "var(--saffron)",
  },
  {
    id: 3,
    title: "Counting & Results",
    status: "Post-Election",
    statusBg: "var(--yellow-light)",
    icon: BarChart3,
    content: "EVMs are sealed and transported to secure strongrooms. On counting day, votes are tallied under strict supervision, and the ECI declares the winners.",
    tip: "You can watch real-time counting trends and final results on the official ECI Results portal.",
    link: "https://results.eci.gov.in/",
    color: "var(--yellow)",
  }
];

export function Timeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section aria-label="Election Timeline" style={{ width: '100%', maxWidth: 840, margin: '0 auto' }}>
      
      {/* Brutalist Timeline Bar */}
      <div role="tablist" aria-label="Timeline Steps" style={{ position: 'relative', marginBottom: '3rem', padding: '0 1rem' }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 6, background: '#eee', transform: 'translateY(-50%)', border: '2px solid var(--border)', zIndex: 0 }} />
        <div 
          style={{ position: 'absolute', top: '50%', left: 0, height: 6, background: 'var(--saffron)', transform: 'translateY(-50%)', border: '2px solid var(--border)', zIndex: 0, transition: 'width 0.4s ease', width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        />
        
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between' }}>
          {steps.map((step, idx) => (
            <button
              key={step.id}
              role="tab"
              aria-selected={activeStep === idx}
              aria-controls="timeline-panel"
              id={`tab-${idx}`}
              aria-label={`Step ${idx + 1}: ${step.title}`}
              onClick={() => setActiveStep(idx)}
              style={{
                width: 48,
                height: 48,
                background: activeStep >= idx ? 'var(--saffron)' : '#fff',
                color: activeStep >= idx ? '#fff' : '#000',
                border: '3px solid var(--border)',
                fontWeight: 900,
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: activeStep === idx ? '4px 4px 0 var(--border)' : 'none',
                transform: activeStep === idx ? 'translate(-2px, -2px) scale(1.1)' : 'none',
                transition: 'all 0.1s ease',
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Content Card */}
      <div id="timeline-panel" role="tabpanel" aria-labelledby={`tab-${activeStep}`} aria-live="polite" style={{ background: '#fff', border: '3px solid var(--border)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem', borderBottom: '3px solid var(--border)', flexWrap: 'wrap' }}>
          <div style={{ width: 64, height: 64, background: steps[activeStep].color, border: '3px solid var(--border)', boxShadow: '3px 3px 0 var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(steps[activeStep].icon, { className: "w-8 h-8 text-white" })}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: '#888' }}>STEP {activeStep + 1} OF 4</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '2px 10px', background: steps[activeStep].statusBg, border: '2px solid var(--border)', textTransform: 'uppercase' }}>
                {steps[activeStep].status}
              </span>
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: 0 }}>{steps[activeStep].title}</h3>
          </div>
        </div>
        
        <div style={{ padding: '2.5rem 2rem' }}>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.6, fontWeight: 500, color: '#222', marginBottom: '2rem' }}>
            {steps[activeStep].content}
          </p>

          <div style={{ background: 'var(--yellow-light)', border: '2px solid var(--border)', padding: '1.25rem', boxShadow: '4px 4px 0 var(--border)', marginBottom: '2.5rem', display: 'flex', gap: 12 }}>
            <Info className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--saffron)' }} />
            <div>
              <span style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.85rem', display: 'block', marginBottom: 4 }}>PRO TIP</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#333' }}>{steps[activeStep].tip}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a 
              href={steps[activeStep].link}
              target="_blank"
              rel="noopener noreferrer"
              className="brut-btn brut-btn-saffron"
              style={{ fontSize: '0.85rem', textDecoration: 'none' }}
            >
              VISIT OFFICIAL PORTAL <ExternalLink className="w-4 h-4" />
            </a>
            {activeStep < steps.length - 1 && (
              <button 
                onClick={() => setActiveStep(s => s + 1)}
                className="brut-btn brut-btn-ghost"
                style={{ fontSize: '0.85rem' }}
              >
                NEXT STEP <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
