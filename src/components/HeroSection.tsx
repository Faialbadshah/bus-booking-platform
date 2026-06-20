import type { ClinicBrand, Procedure } from '@/types/clinic';
import BeforeAfterSlider from './BeforeAfterSlider';
import WhatsAppCTA from './WhatsAppCTA';

interface Props {
  brand: ClinicBrand;
  featuredProcedure: Procedure;
}

export default function HeroSection({ brand, featuredProcedure }: Props) {
  const bookingMessage = `Hi, I'd like to book a free consultation at ${brand.name}.`;

  return (
    <section className="relative min-h-screen bg-canvas flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center w-full">

        {/* Copy side */}
        <div className="order-2 md:order-1 space-y-6">
          {/* Rating pill */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <div className="flex" aria-label={`${brand.googleRating} stars`}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 text-yellow-400" fill="currentColor" aria-hidden>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-ink">
              {brand.googleRating} · {brand.googleReviewCount.toLocaleString()} reviews
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink leading-[1.1] tracking-tight">
            {brand.tagline}
          </h1>

          {/* Sub-line */}
          <p className="text-ink/60 text-lg leading-relaxed max-w-md">
            Drag the photo above. That's a real patient. Real result. Book a free consultation and see yours.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <WhatsAppCTA
              phone={brand.phone}
              message={bookingMessage}
              label="Book free consultation"
              size="lg"
            />
            <a
              href="#problems"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-full border-2 border-ink/20 text-ink hover:border-action hover:text-action transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-action"
            >
              See all concerns
              <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M10 4l6 6-6 6M4 10h12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Trust micro-copy */}
          <p className="text-xs text-ink/40 flex items-center gap-1.5">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-action flex-shrink-0" fill="currentColor" aria-hidden>
              <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z"/>
            </svg>
            Free consultation · No obligation · Same-day appointments available
          </p>
        </div>

        {/* Before/After slider side */}
        <div className="order-1 md:order-2 md:sticky md:top-20">
          <BeforeAfterSlider
            beforeImg={featuredProcedure.beforeImg}
            afterImg={featuredProcedure.afterImg}
            label={`${featuredProcedure.problemLabel} — ${featuredProcedure.procedureName}`}
            className="shadow-2xl"
          />
          <p className="mt-3 text-center text-xs text-ink/40">
            Drag the handle to reveal the transformation
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink/30 flex flex-col items-center gap-1 motion-safe:animate-bounce">
        <span className="text-xs">scroll</span>
        <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M8 3v10M4 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
