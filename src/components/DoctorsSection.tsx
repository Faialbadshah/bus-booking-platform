import type { Doctor } from '@/types/clinic';
import DoctorCard from './DoctorCard';

interface Props {
  doctors: Doctor[];
}

export default function DoctorsSection({ doctors }: Props) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">Meet the team</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink leading-tight">
            The doctors behind the results
          </h2>
          <p className="mt-3 text-ink/55 max-w-md mx-auto">
            Board-certified specialists. Not generalists with a whitening kit.
          </p>
        </div>

        <div className="space-y-5">
          {doctors.map((doc, i) => (
            <DoctorCard key={i} doctor={doc} />
          ))}
        </div>
      </div>
    </section>
  );
}
