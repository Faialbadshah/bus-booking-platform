import type { Doctor } from '@/types/clinic';
import Image from 'next/image';

interface Props {
  doctors: Doctor[];
}

export default function DoctorsSection({ doctors }: Props) {
  return (
    <section id="team" className="bg-ink py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-3">The team</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight">
            The doctors behind the results
          </h2>
          <p className="mt-4 text-white/35 text-base max-w-sm mx-auto">
            Board-certified cosmetic specialists — not generalists with a whitening kit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {doctors.map((doc, i) => (
            <div
              key={i}
              className="bg-white/[0.06] hover:bg-white/[0.09] border border-white/[0.07] rounded-3xl overflow-hidden flex flex-col sm:flex-row transition-colors duration-200"
            >
              {/* Photo */}
              <div className="relative w-full sm:w-44 flex-shrink-0 bg-white/[0.04]" style={{ minHeight: '200px' }}>
                <Image
                  src={doc.photo}
                  alt={doc.name}
                  fill
                  className="object-cover object-top"
                  unoptimized
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 176px"
                />
              </div>

              <div className="p-6 flex flex-col justify-center">
                <h3 className="font-display text-xl font-semibold text-white">{doc.name}</h3>
                <p className="text-accent text-sm font-medium mt-0.5">{doc.creds}</p>
                <p className="mt-3 text-sm text-white/45 leading-relaxed">{doc.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
