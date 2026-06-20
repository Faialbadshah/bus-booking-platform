'use client';

import { useState } from 'react';
import type { FaqEntry } from '@/types/clinic';

interface Props {
  item: FaqEntry;
}

export default function FaqItem({ item }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ink/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 rounded"
        aria-expanded={open}
      >
        <span className="font-semibold text-ink text-sm md:text-base leading-snug">{item.q}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          aria-hidden
        >
          <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2v8M2 6h8" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-96' : 'max-h-0'}`}
        aria-hidden={!open}
      >
        <p className="text-sm md:text-base text-ink/65 leading-relaxed pb-4">{item.a}</p>
      </div>
    </div>
  );
}
