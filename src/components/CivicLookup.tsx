"use client";

import React, { useState } from 'react';
import { MapPin, ExternalLink, ShieldCheck, HelpCircle, Search } from 'lucide-react';

export function CivicLookup() {
  const [pincode, setPincode] = useState('');

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 max-w-[1200px] mx-auto">
      
      {/* Resources Panel */}
      <div className="bg-white border-[3px] border-[var(--border)] shadow-[10px_10px_0_var(--border)] p-8">
        <div className="mb-8">
          <div className="brut-tag brut-tag-saffron mb-3 inline-block">ECI PORTALS</div>
          <h2 className="text-[1.75rem] font-black uppercase tracking-[-0.02em] m-0 mb-3">
            OFFICIAL VOTER RESOURCES
          </h2>
          <p className="text-[0.9rem] text-[#555] font-medium leading-[1.5]">
            Access official Election Commission of India (ECI) services to manage your voter profile and find booths.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {[
            {
              title: "SEARCH ELECTORAL ROLL",
              desc: "Verify your name on the voter list using your EPIC number or personal details.",
              icon: <Search className="w-6 h-6" />,
              link: "https://electoralsearch.eci.gov.in/",
              color: "bg-[var(--blue)]"
            },
            {
              title: "VOTER SERVICE PORTAL",
              desc: "Register as a new voter, download e-EPIC, or correct entries in the roll.",
              icon: <ShieldCheck className="w-6 h-6" />,
              link: "https://voters.eci.gov.in/",
              color: "bg-[var(--green)]"
            },
            {
              title: "KNOW YOUR CANDIDATE",
              desc: "Download the ECI app to view criminal records and affidavits of candidates.",
              icon: <HelpCircle className="w-6 h-6" />,
              link: "https://play.google.com/store/apps/details?id=com.eci.citizen",
              color: "bg-[var(--yellow)]"
            }
          ].map((item, i) => (
            <a 
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="brut-card-hover block p-6 bg-white border-[3px] border-[var(--border)] no-underline text-inherit transition-all duration-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--saffron)]"
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`w-11 h-11 ${item.color} border-2 border-[var(--border)] flex items-center justify-center shadow-[2px_2px_0_var(--border)]`}>
                  {React.cloneElement(item.icon as React.ReactElement<{ className: string }>, { className: "w-5 h-5 text-white" })}
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="font-black text-[1rem] uppercase mb-1.5 tracking-[0.02em]">{item.title}</h3>
              <p className="text-[0.8rem] text-[#666] font-medium leading-[1.5] m-0">{item.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Interactive Map Panel */}
      <div className="flex flex-col h-full">
        <div className="bg-[var(--fg)] text-white border-[3px] border-[var(--border)] p-6 shadow-[8px_8px_0_var(--saffron)] mb-6">
          <h2 className="text-[1.25rem] font-black uppercase tracking-[0.05em] mb-3 flex items-center gap-2.5">
            <MapPin className="w-6 h-6 text-[var(--saffron)]" /> EXPLORE YOUR AREA
          </h2>
          <p className="text-[0.8rem] text-[#aaa] font-semibold uppercase mb-4">
            ENTER PINCODE OR CITY TO VIEW POLLING STATIONS
          </p>
          
          <label htmlFor="pincode-input" className="sr-only">Enter Pincode or City</label>
          <input
            id="pincode-input"
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="E.G. 110001 OR NEW DELHI"
            aria-label="Enter Pincode or City to load map data"
            className="w-full py-3 px-4 border-[3px] border-[var(--saffron)] bg-white text-black font-extrabold text-[0.9rem] outline-none focus:ring-2 focus:ring-[var(--saffron)] focus:border-[var(--saffron)]"
          />
        </div>

        <div className="flex-1 min-h-[400px] border-[4px] border-[var(--border)] bg-[#f0f0f0] relative shadow-[10px_10px_0_var(--border)]">
          {pincode.length > 3 ? (
            <iframe
              title="Local Area Map"
              className="w-full h-full border-none"
              src={`https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'AIzaSyDemoKey'}&q=government+schools+or+polling+booths+near+${encodeURIComponent(pincode)}+India`}
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 bg-white border-[3px] border-[var(--border)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[5px_5px_0_var(--border)]">
                <MapPin className="w-10 h-10 text-gray-300" />
              </div>
              <p className="font-extrabold uppercase text-[0.9rem] text-[#888] tracking-[0.05em]">
                TYPE A LOCATION ABOVE<br />TO LOAD MAP DATA
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
