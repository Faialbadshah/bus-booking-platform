import type { ClinicBrand, Procedure } from '@/types/clinic';
import BeforeAfterSlider from './BeforeAfterSlider';

interface Props {
  brand: ClinicBrand;
  procedures: Procedure[];
}

export default function ProofStrip({ brand, procedures }: Props) {
  // Show up to 4 before/afters in the proof strip
  const showcased = procedures.slice(0, 4);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">Real results</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink leading-tight">
              {brand.googleReviewCount}+ patients.<br className="hidden md:block" /> All from this clinic.
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-canvas rounded-2xl px-5 py-4">
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-ink">{brand.googleRating}</p>
              <div className="flex mt-1" aria-label={`${brand.googleRating} stars`}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 text-yellow-400" fill="currentColor" aria-hidden>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-xs text-ink/40 mt-1">{brand.googleReviewCount.toLocaleString()} Google reviews</p>
            </div>
          </div>
        </div>

        {/* Before/after gallery grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {showcased.map((proc) => (
            <div key={proc.id}>
              <BeforeAfterSlider
                beforeImg={proc.beforeImg}
                afterImg={proc.afterImg}
                label={proc.problemLabel}
              />
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-ink/40">
          Drag each photo to reveal the full transformation. All results from {brand.name} patients.
        </p>
      </div>
    </section>
  );
}
