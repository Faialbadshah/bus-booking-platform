import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import type { CSSProperties } from 'react';
import './globals.css';
import { clinic } from '@/data/clinic.config';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
  // Optical sizing gives the warm character at display sizes
  axes: ['opsz'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${clinic.brand.name} — Cosmetic Dentistry`,
  description: clinic.brand.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { tokens } = clinic;

  // Inject brand token overrides as CSS custom properties on <html>.
  // Swapping to a new clinic = change clinic.config.ts only.
  const brandVars: CSSProperties = {
    '--brand-canvas': tokens.colorCanvas,
    '--brand-ink': tokens.colorInk,
    '--brand-accent': tokens.colorAccent,
    '--brand-action': tokens.colorAction,
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable}`}
      style={brandVars}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
