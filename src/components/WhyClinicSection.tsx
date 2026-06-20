import type { TrustPoint } from '@/types/clinic';
import TrustCard from './TrustCard';
import FadeIn from './FadeIn';

interface Props {
  trust: TrustPoint[];
  clinicName: string;
}

export default function WhyClinicSection({ trust, clinicName }: Props) {
  return (
    <section id="why" className="bg-canvas py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <FadeIn>
          <div className="grid md:grid-cols-[1fr_auto] md:items-end gap-6 mb-12 md:mb-16">
            <div>
              <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">Why patients choose us</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight">
                What makes {clinicName} different
              </h2>
            </div>
            <p className="text-ink/50 text-base max-w-xs leading-relaxed">
              Not a chain. Not a generalist. A specialist practice where cosmetic results are the only focus.
            </p>
          </div>
        </FadeIn>

        {/* 2×2 trust grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {trust.map((item, i) => (
            <FadeIn key={i} delay={i * 70}>
              <TrustCard trust={item} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
