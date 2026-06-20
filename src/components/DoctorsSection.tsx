import type { Doctor } from '@/types/clinic';
import Image from 'next/image';
import FadeIn from './FadeIn';

interface Props {
  doctors: Doctor[];
}

export default function DoctorsSection({ doctors }: Props) {
  return (
    <section id="team" className="bg-ink py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-accent text-xs font-bold tracking-widest uppercase mb-3">The team</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight">
              The doctors behind the results
            </h2>
            <p className="mt-4 text-white/40 text-base max-w-sm mx-auto">
              Board-certified cosmetic specialists — not generalists with a whitening kit.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-5">
          {doctors.map((doc, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="group bg-white/[0.06] hover:bg-white/[0.09] border border-white/[0.08] rounded-3xl overflow-hidden flex flex-col sm:flex-row transition-colors duration-200">
                {/* Photo */}
                <div className="relative w-full sm:w-44 flex-shrink-0 bg-white/[0.04]" style={{ minHeight: '200px' }}>
                  <Image
                    src={doc.photo}
                    alt={doc.name}
                    fill
                    className="object-cover object-top"
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 176px"
                  />
                </div>

                {/* Bio */}
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="font-display text-xl font-semibold text-white">{doc.name}</h3>
                  <p className="text-accent text-sm font-medium mt-0.5">{doc.creds}</p>
                  <p className="mt-3 text-sm text-white/50 leading-relaxed">{doc.bio}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
