import Image from 'next/image';
import type { ClinicBrand } from '@/types/clinic';

interface Props {
  brand: ClinicBrand;
  logoUrl: string;
}

export default function Footer({ brand, logoUrl }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/70 text-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10">

          {/* Info column */}
          <div className="space-y-5">
            <Image src={logoUrl} alt={brand.name} width={140} height={32} className="h-8 w-auto brightness-0 invert" unoptimized />

            <div className="space-y-2 text-sm">
              <p>{brand.address}</p>
              <p>{brand.hours}</p>
              <a href={`tel:+${brand.phone}`} className="text-accent hover:text-white transition">
                +{brand.phone}
              </a>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex" aria-label={`${brand.googleRating} out of 5 stars`}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 text-yellow-400" fill={i <= Math.round(brand.googleRating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-white/60 text-xs">
                {brand.googleRating} · {brand.googleReviewCount.toLocaleString()} Google reviews
              </span>
            </div>
          </div>

          {/* Map column */}
          <div className="rounded-xl overflow-hidden bg-white/5 h-56 md:h-full min-h-[200px]">
            {brand.mapsEmbedUrl ? (
              <iframe
                src={brand.mapsEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic location"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                Map embed goes here
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/30">
          © {year} {brand.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
