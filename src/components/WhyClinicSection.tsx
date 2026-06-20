import type { TrustPoint } from '@/types/clinic';
import TrustCard from './TrustCard';

interface Props {
  trust: TrustPoint[];
  clinicName: string;
}

export default function WhyClinicSection({ trust, clinicName }: Props) {
  return (
    <section className="bg-canvas py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">Why patients choose us</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink leading-tight">
            What makes {clinicName} different
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {trust.map((item, i) => (
            <TrustCard key={i} trust={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
