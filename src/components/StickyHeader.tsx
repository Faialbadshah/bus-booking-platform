'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import WhatsAppCTA from './WhatsAppCTA';

interface Props {
  name: string;
  logoUrl: string;
  phone: string;
}

export default function StickyHeader({ name, logoUrl, phone }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action rounded">
          <Image src={logoUrl} alt={name} width={140} height={32} className="h-8 w-auto" unoptimized />
        </a>

        {/* CTAs */}
        <nav className="flex items-center gap-2 md:gap-3">
          <a
            href={`tel:+${phone}`}
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-action transition px-3 py-2 rounded-full border border-ink/15 hover:border-action/40"
          >
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd"/>
            </svg>
            Call us
          </a>

          <WhatsAppCTA
            phone={phone}
            message="Hi, I'd like to book a free consultation at Smile Studio."
            label="Book on WhatsApp"
            size="sm"
          />
        </nav>
      </div>
    </header>
  );
}
