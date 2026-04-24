import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk', weight: ['400','500','600','700'] });
const spaceMono = Space_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400','700'] });

export const metadata: Metadata = {
  title: 'CivicGuide AI — Indian Election Education',
  description: 'AI-powered guide to the Indian election process. Learn about ECI, EVMs, Voter ID, Lok Sabha elections, and test your civic knowledge.',
  keywords: 'Indian election, ECI, Lok Sabha, voter registration, EPIC card, EVM, civic education, AI assistant',
  openGraph: {
    title: 'CivicGuide AI — Indian Election Education',
    description: 'AI-powered guide to the Indian election process.',
    url: 'https://civicguide.ai',
    siteName: 'CivicGuide AI',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CivicGuide AI — Indian Election Education',
    description: 'AI-powered guide to the Indian election process.',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://civicguide.ai'),
};

export const viewport = {
  themeColor: '#FF6B00',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} font-grotesk antialiased`}>
        {/* Skip to main content — critical for keyboard & screen reader users (CSS-only approach) */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
