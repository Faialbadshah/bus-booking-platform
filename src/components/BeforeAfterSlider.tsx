'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface Props {
  beforeImg: string;
  afterImg: string;
  label?: string;
  className?: string;
  /** Pass true only for the hero slider — all below-fold sliders must lazy-load */
  priority?: boolean;
  /** Provide correct sizes for the render context to avoid over-fetching */
  sizes?: string;
}

export default function BeforeAfterSlider({
  beforeImg,
  afterImg,
  label,
  className = '',
  priority = false,
  sizes = '(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(50vw - 24px), calc(25vw - 20px)',
}: Props) {
  // Start at 35% — "after" wins the first impression
  const [pos, setPos] = useState(35);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calcPos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos((Math.max(0, Math.min(clientX - rect.left, rect.width)) / rect.width) * 100);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => calcPos(e.clientX);
    const onUp   = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
    };
  }, [dragging, calcPos]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl select-none touch-none bg-stone-100 ${className}`}
      style={{ aspectRatio: '4/3' }}
      onTouchMove={(e) => calcPos(e.touches[0].clientX)}
      onTouchStart={(e) => calcPos(e.touches[0].clientX)}
      onClick={(e) => { if (!dragging) calcPos(e.clientX); }}
      role="img"
      aria-label="Before and after comparison — drag or tap to reveal"
    >
      {/* Before */}
      <Image
        src={beforeImg}
        alt="Before"
        fill
        className="object-cover"
        unoptimized
        draggable={false}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
      />

      {/* After — clipped to reveal from the left */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={afterImg}
          alt="After"
          fill
          className="object-cover"
          unoptimized
          draggable={false}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          sizes={sizes}
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        style={{ left: `${pos}%` }}
      >
        {/* Handle — minimum 44×44px tap target */}
        <button
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-action"
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setDragging(true); }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft')  setPos((p) => Math.max(0,   p - 2));
            if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 2));
          }}
          aria-label="Drag to compare — use arrow keys to adjust"
        >
          <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-ink/60" fill="none" aria-hidden>
            <path d="M8 12h8M8 12L5 9M8 12L5 15M16 12l3-3M16 12l3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 bg-black/40 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
        Before
      </span>
      <span className="absolute top-3 right-3 bg-action/85 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full pointer-events-none">
        After
      </span>

      {label && (
        <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3.5 pt-8 text-white text-sm font-medium pointer-events-none leading-snug">
          {label}
        </p>
      )}
    </div>
  );
}
