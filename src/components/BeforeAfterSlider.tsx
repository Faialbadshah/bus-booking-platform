'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface Props {
  beforeImg: string;
  afterImg: string;
  label?: string;
  className?: string;
}

export default function BeforeAfterSlider({ beforeImg, afterImg, label, className = '' }: Props) {
  // Start at 38% so the "after" side has more real-estate — the result is the hero
  const [pos, setPos] = useState(38);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calcPos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  // Mouse drag
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => calcPos(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging, calcPos]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl select-none touch-none bg-stone-100 ${className}`}
      style={{ aspectRatio: '4/3' }}
      onTouchMove={(e) => calcPos(e.touches[0].clientX)}
      onTouchStart={(e) => calcPos(e.touches[0].clientX)}
      onClick={(e) => {
        // Allow click-anywhere to reposition (not just drag)
        if (!dragging) calcPos(e.clientX);
      }}
      role="img"
      aria-label="Before and after comparison — drag or tap to reveal"
    >
      {/* Before layer (full) */}
      <Image
        src={beforeImg}
        alt="Before"
        fill
        className="object-cover"
        unoptimized
        draggable={false}
        priority
      />

      {/* After layer — clipped from the left */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={afterImg}
          alt="After"
          fill
          className="object-cover"
          unoptimized
          draggable={false}
          priority
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
        style={{ left: `${pos}%` }}
      >
        {/* Drag handle */}
        <button
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center cursor-ew-resize ring-2 ring-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-action"
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setDragging(true); }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft')  setPos((p) => Math.max(0,   p - 2));
            if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 2));
          }}
          aria-label="Drag to compare — use arrow keys to adjust"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-ink/70" fill="none" aria-hidden>
            <path d="M8 12H16M8 12L5 9M8 12L5 15M16 12L19 9M16 12L19 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Before / After labels */}
      <span className="absolute top-3 left-3 bg-black/45 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none tracking-wide">
        Before
      </span>
      <span className="absolute top-3 right-3 bg-action/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full pointer-events-none tracking-wide">
        After
      </span>

      {/* Caption */}
      {label && (
        <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-3.5 pt-10 text-white text-sm font-medium pointer-events-none leading-snug">
          {label}
        </p>
      )}
    </div>
  );
}
