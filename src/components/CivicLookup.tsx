"use client";

import React, { useState } from 'react';
import { MapPin, ExternalLink, ShieldCheck, Building, HelpCircle, Search } from 'lucide-react';

export function CivicLookup() {
  const [pincode, setPincode] = useState('');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: 1200, margin: '0 auto' }}>
      
      {/* Resources Panel */}
      <div style={{ background: '#fff', border: '3px solid var(--border)', boxShadow: '10px 10px 0 var(--border)', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div className="brut-tag brut-tag-saffron" style={{ marginBottom: 12 }}>ECI PORTALS</div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            OFFICIAL VOTER RESOURCES
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#555', fontWeight: 500, lineHeight: 1.5 }}>
            Access official Election Commission of India (ECI) services to manage your voter profile and find booths.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            {
              title: "SEARCH ELECTORAL ROLL",
              desc: "Verify your name on the voter list using your EPIC number or personal details.",
              icon: <Search className="w-6 h-6" />,
              link: "https://electoralsearch.eci.gov.in/",
              color: "var(--blue)"
            },
            {
              title: "VOTER SERVICE PORTAL",
              desc: "Register as a new voter, download e-EPIC, or correct entries in the roll.",
              icon: <ShieldCheck className="w-6 h-6" />,
              link: "https://voters.eci.gov.in/",
              color: "var(--green)"
            },
            {
              title: "KNOW YOUR CANDIDATE",
              desc: "Download the ECI app to view criminal records and affidavits of candidates.",
              icon: <HelpCircle className="w-6 h-6" />,
              link: "https://play.google.com/store/apps/details?id=com.eci.citizen",
              color: "var(--yellow)"
            }
          ].map((item, i) => (
            <a 
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="brut-card-hover"
              style={{
                display: 'block',
                padding: '1.5rem',
                background: '#fff',
                border: '3px solid var(--border)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.1s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, background: item.color, border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '2px 2px 0 var(--border)' }}>
                  {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-5 h-5 text-white" })}
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
              <h3 style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.02em' }}>{item.title}</h3>
              <p style={{ fontSize: '0.8rem', color: '#666', fontWeight: 500, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Interactive Map Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ background: 'var(--fg)', color: '#fff', border: '3px solid var(--border)', padding: '1.5rem', boxShadow: '8px 8px 0 var(--saffron)', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <MapPin className="w-6 h-6 text-saffron" /> EXPLORE YOUR AREA
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#aaa', fontWeight: 600, textTransform: 'uppercase', marginBottom: 16 }}>
            ENTER PINCODE OR CITY TO VIEW POLLING STATIONS
          </p>
          
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="E.G. 110001 OR NEW DELHI"
            style={{ width: '100%', padding: '12px 16px', border: '3px solid var(--saffron)', background: '#fff', color: '#000', fontWeight: 800, fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div style={{ flex: 1, minHeight: 400, border: '4px solid var(--border)', background: '#f0f0f0', position: 'relative', boxShadow: '10px 10px 0 var(--border)' }}>
          {pincode.length > 3 ? (
            <iframe
              title="Local Area Map"
              style={{ width: '100%', height: '100%', border: 'none' }}
              src={`https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'AIzaSyDemoKey'}&q=government+schools+or+polling+booths+near+${encodeURIComponent(pincode)}+India`}
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, background: '#fff', border: '3px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '5px 5px 0 var(--border)' }}>
                <MapPin className="w-10 h-10 text-gray-300" />
              </div>
              <p style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', color: '#888', letterSpacing: '0.05em' }}>
                TYPE A LOCATION ABOVE<br />TO LOAD MAP DATA
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
