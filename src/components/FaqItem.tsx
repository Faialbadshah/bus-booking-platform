'use client';

import { useState } from 'react';
import type { FaqEntry } from '@/types/clinic';

interface Props {
  item: FaqEntry;
}

export default function FaqItem({ item }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border-b border-ink/8 last:border-0 mx-1 first:mt-1 last:mb-1 rounded-2xl transition-colors duration-200 ${open ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 rounded-2xl"
        aria-expanded={open}
      >
        <span className="font-semibold text-ink text-sm md:text-base leading-snug">{item.q}</span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full bg-ink/6 flex items-center justify-center transition-all duration-200 ${open ? 'bg-action text-white rotate-45' : 'text-ink/50'}`}
          aria-hidden
        >
          <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2v8M2 6h8" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
        aria-hidden={!open}
      >
        <p className="text-sm md:text-base text-ink/60 leading-relaxed px-5 pb-5">{item.a}</p>
      </div>
    </div>
  );
}
