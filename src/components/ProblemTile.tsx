'use client';

import Image from 'next/image';
import type { Procedure } from '@/types/clinic';

interface Props {
  procedure: Procedure;
  onSelect: (p: Procedure) => void;
}

export default function ProblemTile({ procedure, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect(procedure)}
      className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action transition-all duration-200 motion-safe:hover:-translate-y-1 text-left w-full"
      style={{ aspectRatio: '1/1' }}
      aria-label={`Learn about: ${procedure.problemLabel}`}
    >
      {/* Photo */}
      <Image
        src={procedure.tileImage}
        alt={procedure.problemLabel}
        fill
        className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
        unoptimized
        sizes="(max-width: 768px) 50vw, 25vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
        <p className="text-white text-sm md:text-base font-semibold leading-tight">
          {procedure.problemLabel}
        </p>
        <p className="mt-1 text-white/70 text-xs flex items-center gap-1">
          See results
          <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </p>
      </div>
    </button>
  );
}
