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
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calcPos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

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
      className={`relative overflow-hidden rounded-xl select-none touch-none bg-stone-200 ${className}`}
      style={{ aspectRatio: '4/3' }}
      onTouchMove={(e) => calcPos(e.touches[0].clientX)}
      onTouchStart={(e) => calcPos(e.touches[0].clientX)}
      aria-label="Before and after comparison — drag to reveal"
      role="img"
    >
      {/* Before layer */}
      <Image
        src={beforeImg}
        alt="Before"
        fill
        className="object-cover"
        unoptimized
        draggable={false}
      />

      {/* After layer clipped from left */}
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
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow"
        style={{ left: `${pos}%` }}
      >
        {/* Drag handle */}
        <button
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
          onMouseDown={(e) => { e.preventDefault(); setDragging(true); }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos(p => Math.max(0, p - 2));
            if (e.key === 'ArrowRight') setPos(p => Math.min(100, p + 2));
          }}
          aria-label="Drag to compare before and after"
        >
          <svg viewBox="0 0 20 20" className="w-5 h-5 text-ink" fill="none" aria-hidden>
            <path d="M6 10l-3 3-3-3M6 10l-3-3-3 3M17 10l3 3 3-3M17 10l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none">
        Before
      </span>
      <span className="absolute top-3 right-3 bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none">
        After
      </span>

      {label && (
        <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-8 text-white text-sm font-medium pointer-events-none">
          {label}
        </p>
      )}
    </div>
  );
}
