import Image from 'next/image';
import type { Doctor } from '@/types/clinic';

interface Props {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* Photo */}
      <div className="relative w-full sm:w-48 flex-shrink-0 bg-stone-100" style={{ minHeight: '220px' }}>
        <Image
          src={doctor.photo}
          alt={doctor.name}
          fill
          className="object-cover object-top"
          unoptimized
          sizes="(max-width: 640px) 100vw, 192px"
        />
      </div>

      {/* Bio */}
      <div className="p-6 flex flex-col justify-center">
        <h3 className="font-display text-xl font-semibold text-ink">{doctor.name}</h3>
        <p className="text-accent text-sm font-medium mt-0.5">{doctor.creds}</p>
        <p className="mt-3 text-sm text-ink/70 leading-relaxed max-w-prose">{doctor.bio}</p>
      </div>
    </div>
  );
}
