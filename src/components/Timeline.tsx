"use client";

import React, { useState } from 'react';
import { FileText, Search, Vote, BarChart3, ChevronRight, Info, ExternalLink } from 'lucide-react';

const steps = [
  {
    id: 0,
    title: "Voter Registration (EPIC)",
    status: "Year-Round",
    statusBg: "bg-[var(--green-light)]",
    icon: FileText,
    content: "To vote in India, you must be 18+ and have a Voter ID card (EPIC). You can register online through the Election Commission of India (ECI) Voter Portal or via Form 6.",
    tip: "You can track your registration status and download your e-EPIC directly from the Voter Portal.",
    link: "https://voters.eci.gov.in/",
    color: "bg-[var(--green)]",
  },
  {
    id: 1,
    title: "Election Notification",
    status: "Pre-Election",
    statusBg: "bg-[var(--blue-light)]",
    icon: Search,
    content: "The ECI announces the election schedule and enforces the Model Code of Conduct (MCC). Candidates then file their nomination papers, which are scrutinized for validity.",
    tip: "Use the KYC (Know Your Candidate) App by ECI to check the criminal antecedents and affidavits of candidates.",
    link: "https://play.google.com/store/apps/details?id=com.eci.citizen",
    color: "bg-[var(--blue)]",
  },
  {
    id: 2,
    title: "Polling Day (EVMs)",
    status: "Election Day",
    statusBg: "bg-[var(--saffron-light)]",
    icon: Vote,
    content: "Voting is conducted using Electronic Voting Machines (EVMs) accompanied by Voter Verifiable Paper Audit Trails (VVPAT) to ensure transparency and accuracy.",
    tip: "You can vote even if you don't have a physical Voter ID, as long as your name is on the electoral roll and you show an approved alternate ID.",
    link: "https://electoralsearch.eci.gov.in/",
    color: "bg-[var(--saffron)]",
  },
  {
    id: 3,
    title: "Counting & Results",
    status: "Post-Election",
    statusBg: "bg-[var(--yellow-light)]",
    icon: BarChart3,
    content: "EVMs are sealed and transported to secure strongrooms. On counting day, votes are tallied under strict supervision, and the ECI declares the winners.",
    tip: "You can watch real-time counting trends and final results on the official ECI Results portal.",
    link: "https://results.eci.gov.in/",
    color: "bg-[var(--yellow)]",
  }
];

/**
 * @fileoverview Timeline Component
 * @description A fully accessible, interactive tab-based component that visualizes
 * the 7 phases of the Indian electoral process. Implements ARIA `tablist` and `tabpanel`
 * semantics for screen reader and keyboard navigability.
 */

export function Timeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section aria-label="Election Timeline" className="w-full max-w-[840px] mx-auto">

      {/* Brutalist Timeline Bar */}
      <div role="tablist" aria-label="Timeline Steps" className="relative mb-12 px-4">
        {/* Track background */}
        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-[#eee] -translate-y-1/2 border-2 border-[var(--border)] z-0" />
        {/* Active fill */}
        <div
          className="absolute top-1/2 left-0 h-1.5 bg-[var(--saffron)] -translate-y-1/2 border-2 border-[var(--border)] z-0 transition-all duration-400 ease-in-out"
          style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        />

        <div className="relative z-10 flex justify-between">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              role="tab"
              aria-selected={activeStep === idx}
              aria-controls="timeline-panel"
              id={`tab-${idx}`}
              aria-label={`Step ${idx + 1}: ${step.title}`}
              onClick={() => setActiveStep(idx)}
              className={`w-12 h-12 border-[3px] border-[var(--border)] font-black text-[1.1rem] cursor-pointer flex items-center justify-center transition-all duration-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--saffron)] focus-visible:ring-offset-2
                ${activeStep >= idx
                  ? 'bg-[var(--saffron)] text-white'
                  : 'bg-white text-black'}
                ${activeStep === idx
                  ? 'shadow-[4px_4px_0_var(--border)] -translate-x-0.5 -translate-y-0.5 scale-110'
                  : ''}
              `}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Content Card */}
      <div
        id="timeline-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeStep}`}
        aria-live="polite"
        className="bg-white border-[3px] border-[var(--border)] shadow-[var(--shadow-lg)] overflow-hidden"
      >
        {/* Card Header */}
        <div className="flex items-center gap-6 p-8 border-b-[3px] border-[var(--border)] flex-wrap">
          <div className={`w-16 h-16 ${steps[activeStep].color} border-[3px] border-[var(--border)] shadow-[3px_3px_0_var(--border)] flex items-center justify-center`}>
            {React.createElement(steps[activeStep].icon, { className: "w-8 h-8 text-white" })}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="font-mono font-bold text-[0.75rem] uppercase text-[#888]">
                STEP {activeStep + 1} OF 4
              </span>
              <span className={`text-[0.65rem] font-extrabold py-0.5 px-2.5 ${steps[activeStep].statusBg} border-2 border-[var(--border)] uppercase`}>
                {steps[activeStep].status}
              </span>
            </div>
            <h3 className="text-[1.75rem] font-black tracking-[-0.02em] uppercase m-0">
              {steps[activeStep].title}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-8 pt-10">
          <p className="text-[1.15rem] leading-[1.6] font-medium text-[#222] mb-8">
            {steps[activeStep].content}
          </p>

          <div className="bg-[var(--yellow-light)] border-2 border-[var(--border)] p-5 shadow-[4px_4px_0_var(--border)] mb-10 flex gap-3">
            <Info className="w-6 h-6 shrink-0 text-[var(--saffron)]" />
            <div>
              <span className="font-extrabold uppercase text-[0.85rem] block mb-1">PRO TIP</span>
              <span className="text-[0.95rem] font-medium text-[#333]">{steps[activeStep].tip}</span>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <a
              href={steps[activeStep].link}
              target="_blank"
              rel="noopener noreferrer"
              className="brut-btn brut-btn-saffron text-[0.85rem] no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--fg)]"
            >
              VISIT OFFICIAL PORTAL <ExternalLink className="w-4 h-4" />
            </a>
            {activeStep < steps.length - 1 && (
              <button
                onClick={() => setActiveStep(s => s + 1)}
                className="brut-btn brut-btn-ghost text-[0.85rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--fg)]"
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
