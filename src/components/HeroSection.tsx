import type { ClinicBrand, Procedure, StatItem } from '@/types/clinic';
import Image from 'next/image';
import BeforeAfterSlider from './BeforeAfterSlider';
import WhatsAppCTA from './WhatsAppCTA';

interface Props {
  brand: ClinicBrand;
  featuredProcedure: Procedure;
  stats: StatItem[];
}

export default function HeroSection({ brand, featuredProcedure, stats }: Props) {
  const bookingMessage = `Hi, I'd like to book a free consultation at ${brand.name}.`;

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-16">
      {/* Background — warm radial glow */}
      <div className="absolute inset-0 bg-canvas" aria-hidden>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-accent/[0.07] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-2/3 bg-gradient-to-tr from-action/[0.04] via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 w-full">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">

          {/* ── Copy column ── */}
          <div className="space-y-7 order-2 lg:order-1">

            {/* Social proof pill */}
            <div className="inline-flex items-center gap-2.5 bg-white rounded-full px-4 py-2 shadow-sm border border-black/[0.06]">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" aria-hidden>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              <span className="text-sm font-semibold text-ink">
                {brand.googleRating}
              </span>
              <span className="w-px h-3.5 bg-ink/15" />
              <span className="text-sm text-ink/60">{brand.googleReviewCount.toLocaleString()} Google reviews</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-semibold text-ink leading-[1.05] tracking-tight">
                {brand.tagline.split(' ').slice(0, 3).join(' ')}{' '}
                <span className="text-action">{brand.tagline.split(' ').slice(3).join(' ')}</span>
              </h1>
              <p className="mt-5 text-ink/55 text-lg md:text-xl leading-relaxed max-w-lg">
                Drag the photo opposite. That's a real patient. Real result.
                Book a free consultation and see yours.
              </p>
            </div>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <WhatsAppCTA
                phone={brand.phone}
                message={bookingMessage}
                label="Book free consultation"
                size="lg"
                pulse
              />
              <a
                href="#problems"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full border-2 border-ink/15 text-ink/70 hover:border-action/50 hover:text-action transition"
              >
                See all concerns
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M10 4l6 6-6 6M4 10h12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Micro-trust strip */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                'Free consultation',
                'No obligation',
                'Same-day appointments',
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-ink/50">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-action flex-shrink-0" fill="currentColor" aria-hidden>
                    <path d="M13.6 3.6a.8.8 0 00-1.1 0L6 10.1 3.5 7.6a.8.8 0 00-1.1 1.1l3 3a.8.8 0 001.2 0l7-7a.8.8 0 000-1.1z" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3 pt-2">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display font-semibold text-xl text-ink">{s.value}</p>
                  <p className="text-xs text-ink/45 mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Visual column ── */}
          <div className="order-1 lg:order-2 relative">
            {/* Before/After slider */}
            <BeforeAfterSlider
              beforeImg={featuredProcedure.beforeImg}
              afterImg={featuredProcedure.afterImg}
              label={featuredProcedure.problemLabel}
              className="shadow-[0_32px_64px_-12px_rgba(27,26,34,0.2)] ring-1 ring-ink/5"
            />

            {/* Floating result card */}
            <div className="absolute -bottom-5 -left-4 md:-left-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-black/[0.06]">
              <div className="w-9 h-9 rounded-full bg-action/10 flex items-center justify-center">
                <svg viewBox="0 0 20 20" className="w-5 h-5 text-action" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                  <path d="M9 12l2 2 4-5M12 3a9 9 0 110 18A9 9 0 0112 3z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-ink leading-none">{featuredProcedure.procedureName}</p>
                <p className="text-[11px] text-ink/45 mt-0.5">{featuredProcedure.recovery}</p>
              </div>
            </div>

            {/* Floating drag hint */}
            <div className="absolute -top-3 -right-3 md:top-4 md:-right-6 bg-ink text-white rounded-full px-3 py-1.5 text-xs font-medium shadow-lg flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M7 5l-4 5 4 5M13 5l4 5-4 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Drag to reveal
            </div>
          </div>
        </div>
      </div>

      {/* Subtle scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink/25 motion-safe:animate-bounce">
        <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M10 5v10M6 11l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
