import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--yellow)', color: 'var(--fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="brut-card" style={{ maxWidth: 600, width: '100%', padding: '4rem 2rem', textAlign: 'center', border: '4px solid var(--border)', boxShadow: '16px 16px 0 var(--border)', background: '#fff' }}>
        
        <div style={{ width: 100, height: 100, background: 'var(--yellow)', border: '4px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', transform: 'rotate(-5deg)' }}>
          <Compass className="w-12 h-12 text-black" />
        </div>

        <h1 className="glitch-hover" style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '-0.05em', lineHeight: 1 }}>
          404
        </h1>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', color: 'var(--saffron)' }}>
          PAGE NOT FOUND
        </h2>

        <p style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '3rem', color: '#444' }}>
          This page is missing, much like an unregistered voter on election day. Let's get you back to the official portals.
        </p>

        <Link href="/" className="brut-btn" style={{ background: 'var(--fg)', color: '#fff', fontSize: '1rem', padding: '16px 32px' }}>
          <Home className="w-5 h-5 mr-2" /> RETURN TO HEADQUARTERS
        </Link>
      </div>
    </div>
  );
}
