import type { ClinicBrand } from '@/types/clinic';
import WhatsAppCTA from './WhatsAppCTA';

interface Props {
  brand: ClinicBrand;
}

export default function BookingBlock({ brand }: Props) {
  const message = `Hi, I'd like to book a free consultation at ${brand.name}.`;

  return (
    <section id="book" className="bg-action py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 md:px-6 text-center space-y-6">
        <p className="text-white/60 text-xs font-semibold tracking-widest uppercase">Ready?</p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Book your free<br />smile consultation
        </h2>
        <p className="text-white/70 text-lg max-w-md mx-auto">
          No cost, no obligation. We'll show you your result before we do anything.
        </p>

        {/* Primary: WhatsApp */}
        <div className="flex flex-col items-center gap-4">
          <WhatsAppCTA
            phone={brand.phone}
            message={message}
            label="Book on WhatsApp — it's free"
            size="lg"
            className="bg-white !text-action hover:!bg-white/90"
          />

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-white/40 text-xs">or</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          {/* Fallback: call */}
          <a
            href={`tel:+${brand.phone}`}
            className="text-white/70 hover:text-white text-sm font-medium transition flex items-center gap-1.5"
          >
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd"/>
            </svg>
            Call +{brand.phone}
          </a>
        </div>

        <p className="text-white/40 text-xs">
          {brand.hours}
        </p>
      </div>
    </section>
  );
}
