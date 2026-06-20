'use client';

import { useEffect, useRef } from 'react';
import type { Procedure } from '@/types/clinic';
import BeforeAfterSlider from './BeforeAfterSlider';
import WhatsAppCTA from './WhatsAppCTA';

interface Props {
  procedure: Procedure;
  phone: string;
  onClose: () => void;
}

export default function ProcedureDetail({ procedure, phone, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and trap focus
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const bookingMessage = `Hi, I'm interested in fixing: ${procedure.problemLabel}`;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="presentation"
    >
      {/* Panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={procedure.procedureName}
        tabIndex={-1}
        className="relative w-full md:max-w-2xl max-h-[92dvh] md:max-h-[88dvh] overflow-y-auto bg-canvas rounded-t-2xl md:rounded-2xl shadow-2xl outline-none"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-ink hover:bg-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-action"
          aria-label="Close"
        >
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="px-5 pt-6 pb-8 md:px-8 md:pt-8 md:pb-10 space-y-6">

          {/* Header */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-1">
              {procedure.problemLabel}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink leading-tight">
              {procedure.procedureName}
            </h2>
          </div>

          {/* Before / After */}
          <BeforeAfterSlider
            beforeImg={procedure.beforeImg}
            afterImg={procedure.afterImg}
            label={procedure.problemLabel}
          />

          {/* 5-answer content */}
          <div className="grid md:grid-cols-2 gap-4">
            <InfoBlock label="What it is" text={procedure.whatItIs} />
            <InfoBlock label="Who it's for" text={procedure.whoItsFor} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatBlock label="Cost range" value={procedure.costRange} accent />
            <StatBlock label="Recovery" value={procedure.recovery} />
          </div>

          {/* Procedure-specific FAQ */}
          {procedure.faq.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-ink text-sm uppercase tracking-wide">Quick answers</h3>
              {procedure.faq.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-sm text-ink">{item.q}</p>
                  <p className="text-sm text-ink/70 mt-1 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          )}

          {/* Primary CTA */}
          <WhatsAppCTA
            phone={phone}
            message={bookingMessage}
            size="lg"
            className="w-full"
          />
          <p className="text-center text-xs text-ink/50">
            Your message will say: "Hi, I'm interested in fixing: {procedure.problemLabel}"
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="bg-white rounded-xl p-4">
      <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-1.5">{label}</p>
      <p className="text-sm text-ink/80 leading-relaxed">{text}</p>
    </div>
  );
}

function StatBlock({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${accent ? 'bg-action/5 border border-action/20' : 'bg-white'}`}>
      <p className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-1">{label}</p>
      <p className={`font-semibold text-sm leading-snug ${accent ? 'text-action' : 'text-ink'}`}>{value}</p>
    </div>
  );
}
