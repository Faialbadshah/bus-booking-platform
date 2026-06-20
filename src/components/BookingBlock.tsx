import type { ClinicBrand } from '@/types/clinic';
import WhatsAppCTA from './WhatsAppCTA';
import FadeIn from './FadeIn';

interface Props {
  brand: ClinicBrand;
}

export default function BookingBlock({ brand }: Props) {
  const message = `Hi, I'd like to book a free consultation at ${brand.name}.`;

  return (
    <section id="book" className="relative bg-action overflow-hidden py-20 md:py-28">
      {/* Background depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04] blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-black/[0.08] blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 md:px-6 text-center space-y-8">
        <FadeIn>
          {/* Social proof pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm font-medium px-4 py-2 rounded-full border border-white/15 mb-6">
            <svg viewBox="0 0 20 20" className="w-4 h-4 text-yellow-300" fill="currentColor" aria-hidden>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Join {brand.googleReviewCount.toLocaleString()} patients who transformed their smile
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.08] tracking-tight">
            Book your free<br /> smile consultation
          </h2>
          <p className="text-white/60 text-lg max-w-md mx-auto mt-4">
            We show you your result and the full cost before any treatment starts. No obligation.
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-col items-center gap-4 mt-8">
            {/* Primary WhatsApp */}
            <WhatsAppCTA
              phone={brand.phone}
              message={message}
              label="Book on WhatsApp — it's free"
              size="lg"
              className="bg-white !text-action hover:!bg-white/95 shadow-xl shadow-black/20"
              pulse
            />

            {/* Divider */}
            <div className="flex items-center gap-4 w-64">
              <div className="flex-1 h-px bg-white/15" />
              <span className="text-white/35 text-xs font-medium">or call us</span>
              <div className="flex-1 h-px bg-white/15" />
            </div>

            {/* Call */}
            <a
              href={`tel:+${brand.phone}`}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition group"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition">
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                </svg>
              </div>
              +{brand.phone}
            </a>
          </div>

          {/* Hours */}
          <p className="text-white/30 text-xs mt-8 flex items-center justify-center gap-1.5">
            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <circle cx="8" cy="8" r="6" />
              <path d="M8 4v4l3 2" strokeLinecap="round" />
            </svg>
            {brand.hours}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
