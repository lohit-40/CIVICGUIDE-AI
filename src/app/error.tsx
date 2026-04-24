'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('CivicGuide Application Error:', error);
  }, [error]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="brut-card" style={{ maxWidth: 600, width: '100%', padding: '3rem 2rem', textAlign: 'center', border: '4px solid var(--red)', boxShadow: '12px 12px 0 var(--red)' }}>
        
        <div style={{ width: 80, height: 80, background: 'var(--red)', border: '3px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', borderRadius: '50%' }}>
          <AlertTriangle className="w-10 h-10 text-white" />
        </div>

        <h1 className="glitch-hover" style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '-0.03em', color: 'var(--red)' }}>
          SYSTEM ERROR
        </h1>
        
        <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '2.5rem', lineHeight: 1.6 }}>
          We encountered an unexpected issue while loading this civic resource. Don&apos;t worry, democracy is still intact.
        </p>

        <button
          onClick={() => reset()}
          className="brut-btn"
          style={{ background: 'var(--red)', color: '#fff', fontSize: '1rem', padding: '14px 28px', border: '3px solid var(--border)', boxShadow: '6px 6px 0 var(--border)' }}
        >
          <RefreshCcw className="w-5 h-5 mr-2" /> REBOOT DEMOCRACY
        </button>
      </div>
    </div>
  );
}
