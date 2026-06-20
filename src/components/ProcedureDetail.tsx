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

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const bookingMessage = `Hi, I'm interested in fixing: ${procedure.problemLabel}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-ink/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={procedure.procedureName}
        tabIndex={-1}
        className="relative w-full md:max-w-xl max-h-[94dvh] md:max-h-[90dvh] overflow-y-auto bg-canvas rounded-t-3xl md:rounded-3xl shadow-2xl outline-none animate-scale-in"
      >
        {/* Drag handle (mobile) */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-ink/20 rounded-full" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-ink/8 hover:bg-ink/15 flex items-center justify-center text-ink/60 hover:text-ink transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-action"
          aria-label="Close"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
          </svg>
        </button>

        <div className="px-5 pt-3 pb-8 md:px-7 md:pt-5 space-y-5">

          {/* Label + procedure name */}
          <div>
            <p className="text-accent text-[11px] font-bold tracking-[0.12em] uppercase mb-1.5">
              {procedure.problemLabel}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink leading-tight">
              {procedure.procedureName}
            </h2>
          </div>

          {/* Before / after */}
          <BeforeAfterSlider
            beforeImg={procedure.beforeImg}
            afterImg={procedure.afterImg}
            label={procedure.problemLabel}
            className="ring-1 ring-ink/8"
          />

          {/* 5-answer grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            <InfoCard icon="💡" label="What it is" text={procedure.whatItIs} />
            <InfoCard icon="🎯" label="Who it's for" text={procedure.whoItsFor} />
          </div>

          {/* Cost + Recovery stats */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Cost range" value={procedure.costRange} highlight />
            <StatCard label="Recovery" value={procedure.recovery} />
          </div>

          {/* Procedure-specific FAQ */}
          {procedure.faq.length > 0 && (
            <div className="space-y-2">
              {procedure.faq.map((item, i) => (
                <div key={i} className="bg-white rounded-xl px-4 py-3.5 border border-black/[0.05]">
                  <p className="font-semibold text-sm text-ink mb-1">{item.q}</p>
                  <p className="text-sm text-ink/60 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          )}

          {/* Primary CTA */}
          <div className="space-y-3 pt-1">
            <WhatsAppCTA phone={phone} message={bookingMessage} size="lg" className="w-full" />
            <p className="text-center text-[11px] text-ink/35 leading-snug">
              Your message: "Hi, I'm interested in fixing: {procedure.problemLabel}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, text }: { icon: string; label: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-black/[0.05]">
      <p className="text-base mb-1.5" aria-hidden>{icon}</p>
      <p className="text-[10px] font-bold tracking-widest uppercase text-accent mb-1.5">{label}</p>
      <p className="text-sm text-ink/70 leading-relaxed">{text}</p>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 border ${highlight ? 'bg-action/[0.05] border-action/25' : 'bg-white border-black/[0.05]'}`}>
      <p className="text-[10px] font-bold tracking-widest uppercase text-ink/35 mb-1">{label}</p>
      <p className={`font-semibold text-sm leading-snug ${highlight ? 'text-action' : 'text-ink'}`}>{value}</p>
    </div>
  );
}
