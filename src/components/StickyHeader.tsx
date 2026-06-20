'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import WhatsAppCTA from './WhatsAppCTA';

const NAV = [
  { href: '#problems', label: 'Treatments' },
  { href: '#results',  label: 'Results'    },
  { href: '#team',     label: 'Our Team'   },
  { href: '#faq',      label: 'FAQ'        },
];

interface Props {
  name: string;
  logoUrl: string;
  phone: string;
}

export default function StickyHeader({ name, logoUrl, phone }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Close mobile menu on route-style scroll-link clicks
  const handleNavClick = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || open
            ? 'bg-white/97 backdrop-blur-md shadow-[0_1px_0_0_rgba(27,26,34,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#"
            onClick={() => setOpen(false)}
            className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action rounded-sm"
          >
            <Image src={logoUrl} alt={name} width={140} height={32} className="h-8 w-auto" unoptimized />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-full text-sm font-medium text-ink/65 hover:text-ink hover:bg-ink/5 transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA cluster */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:+${phone}`}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-ink/70 hover:text-ink border border-ink/15 hover:border-ink/30 transition"
            >
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
              </svg>
              Call
            </a>

            <WhatsAppCTA phone={phone} message={`Hi, I'd like to book a free consultation.`} label="Book free" size="sm" />

            {/* Hamburger (mobile) */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-ink/15 text-ink/60 hover:text-ink hover:border-ink/30 transition"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? (
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden bg-white border-t border-ink/8 animate-slide-in-down">
            <nav className="px-4 py-3 flex flex-col">
              {NAV.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="py-3.5 text-base font-medium text-ink/70 border-b border-ink/6 last:border-0 hover:text-action transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="px-4 pb-4 pt-2 flex flex-col gap-3">
              <WhatsAppCTA
                phone={phone}
                message="Hi, I'd like to book a free consultation."
                label="Book on WhatsApp"
                size="md"
                className="w-full"
              />
              <a
                href={`tel:+${phone}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border border-ink/20 text-sm font-medium text-ink/70 hover:text-ink transition"
              >
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                </svg>
                Call us
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
