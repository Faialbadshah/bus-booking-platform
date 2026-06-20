'use client';

import { useState, useEffect } from 'react';
import WhatsAppCTA from './WhatsAppCTA';

interface Props {
  phone: string;
  clinicName: string;
}

export default function MobileBookingBar({ phone, clinicName }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const bookSection = document.getElementById('book');

    const check = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.75;
      // Hide once the booking section enters the viewport
      const nearCTA = bookSection
        ? bookSection.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(pastHero && !nearCTA);
    };

    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, []);

  const message = `Hi, I'd like to book a free consultation at ${clinicName}.`;

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/96 backdrop-blur-md border-t border-ink/8 px-4 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        paddingTop: '12px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
      }}
      aria-hidden={!visible}
    >
      <WhatsAppCTA
        phone={phone}
        message={message}
        label="Book on WhatsApp — free"
        size="md"
        className="w-full"
      />
    </div>
  );
}
