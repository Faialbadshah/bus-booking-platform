import Image from 'next/image';
import type { ClinicBrand } from '@/types/clinic';

const NAV_LINKS = [
  { href: '#problems', label: 'Treatments' },
  { href: '#results',  label: 'Results' },
  { href: '#team',     label: 'Our Team' },
  { href: '#faq',      label: 'FAQ' },
  { href: '#book',     label: 'Book' },
];

interface Props {
  brand: ClinicBrand;
  logoUrl: string;
}

export default function Footer({ brand, logoUrl }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111016] text-white/50 text-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-14 pb-8">

        {/* Top grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">

          {/* Brand column */}
          <div className="space-y-5">
            <Image src={logoUrl} alt={brand.name} width={140} height={32} className="h-8 w-auto brightness-0 invert opacity-80" unoptimized />

            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Cosmetic dentistry designed around results. Every decision is visible to you before we start.
            </p>

            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex" aria-label={`${brand.googleRating} out of 5 stars`}>
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 text-yellow-400" fill="currentColor" aria-hidden>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/40 text-xs">
                {brand.googleRating} · {brand.googleReviewCount.toLocaleString()} reviews
              </span>
            </div>
          </div>

          {/* Nav + contact column */}
          <div className="space-y-6">
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/45 hover:text-white transition text-sm py-0.5"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="space-y-2 text-sm text-white/40">
              <p>{brand.address}</p>
              <a href={`tel:+${brand.phone}`} className="block text-accent hover:text-white transition">
                +{brand.phone}
              </a>
              <p className="text-white/30 text-xs">{brand.hours}</p>
            </div>
          </div>

          {/* Map column */}
          <div className="rounded-2xl overflow-hidden bg-white/[0.04] h-52 md:h-full min-h-[200px] border border-white/[0.06]">
            {brand.mapsEmbedUrl ? (
              <iframe
                src={brand.mapsEmbedUrl}
                className="w-full h-full border-0 opacity-80 hover:opacity-100 transition-opacity"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic location on Google Maps"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">
                Map embed
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {year} {brand.name}. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Built with the Smile Studio system — swap the data, ship a new clinic.
          </p>
        </div>
      </div>
    </footer>
  );
}
