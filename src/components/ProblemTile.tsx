'use client';

import Image from 'next/image';
import type { Procedure } from '@/types/clinic';

interface Props {
  procedure: Procedure;
  onSelect: (p: Procedure) => void;
  popular?: boolean;
}

export default function ProblemTile({ procedure, onSelect, popular = false }: Props) {
  return (
    <button
      onClick={() => onSelect(procedure)}
      className="group relative overflow-hidden rounded-2xl bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent text-left w-full cursor-pointer"
      style={{ aspectRatio: '4/5' }}
      aria-label={`See results for: ${procedure.problemLabel}`}
    >
      {/* Photo */}
      <Image
        src={procedure.tileImage}
        alt={procedure.problemLabel}
        fill
        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        unoptimized
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />

      {/* Gradient — bottom-heavy for label legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5 transition-opacity duration-300" />

      {/* Hover ring */}
      <div className="absolute inset-0 rounded-2xl ring-0 ring-accent/0 group-hover:ring-2 group-hover:ring-accent/70 transition-all duration-200" />

      {/* Popular badge */}
      {popular && (
        <div className="absolute top-3 left-3 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          Popular
        </div>
      )}

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-semibold text-sm md:text-[15px] leading-tight mb-2">
          {procedure.problemLabel}
        </p>
        <span className="inline-flex items-center gap-1 text-white/60 text-xs font-medium group-hover:text-accent transition-colors duration-200">
          See results
          <svg viewBox="0 0 14 14" className="w-3 h-3 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </button>
  );
}
