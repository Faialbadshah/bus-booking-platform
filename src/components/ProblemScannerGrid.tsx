'use client';

import { useState } from 'react';
import type { Procedure } from '@/types/clinic';
import ProblemTile from './ProblemTile';
import ProcedureDetail from './ProcedureDetail';
import FadeIn from './FadeIn';

const POPULAR_IDS = new Set(['gaps', 'stained', 'missing', 'crooked']);

interface Props {
  procedures: Procedure[];
  phone: string;
}

export default function ProblemScannerGrid({ procedures, phone }: Props) {
  const [selected, setSelected] = useState<Procedure | null>(null);

  return (
    <section id="problems" className="relative bg-ink py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/[0.035] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">

        {/* Header — no animation, just appears */}
        <div className="text-center mb-12 md:mb-16 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/[0.07] text-white/50 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            <svg viewBox="0 0 16 16" className="w-3 h-3 text-accent" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="6" cy="6" r="4" />
              <path d="M14 14l-3.5-3.5" strokeLinecap="round" />
            </svg>
            Find your concern
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white leading-[1.1] tracking-tight">
            What does your smile feel like right now?
          </h2>
          <p className="mt-4 text-white/40 text-base">
            Tap the photo that looks like yours.
          </p>
        </div>

        {/* Grid — FadeIn staggered only on tiles; this is the signature interaction */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {procedures.map((proc, i) => (
            <FadeIn key={proc.id} delay={i * 40} from="bottom">
              <ProblemTile
                procedure={proc}
                onSelect={setSelected}
                popular={POPULAR_IDS.has(proc.id)}
              />
            </FadeIn>
          ))}
        </div>

        <p className="text-center text-white/25 text-xs mt-8">
          {procedures.length} conditions treated · tap any card for before/after results
        </p>
      </div>

      {selected && (
        <ProcedureDetail procedure={selected} phone={phone} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
