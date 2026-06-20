import type { ClinicBrand, Procedure, StatItem, Testimonial } from '@/types/clinic';
import BeforeAfterSlider from './BeforeAfterSlider';
import TestimonialCard from './TestimonialCard';
import FadeIn from './FadeIn';

interface Props {
  brand: ClinicBrand;
  procedures: Procedure[];
  stats: StatItem[];
  testimonials: Testimonial[];
}

const GALLERY_SIZES = '(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(50vw - 24px), calc(25vw - 20px)';

export default function ProofStrip({ brand, procedures, stats, testimonials }: Props) {
  const gallery = procedures.slice(0, 4);

  return (
    <section id="results" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-16 md:space-y-20">

        {/* Stats bar — appears instantly, no animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/8 rounded-2xl overflow-hidden shadow-sm">
          {stats.map((s, i) => (
            <div key={i} className="bg-white px-6 py-7 text-center">
              <p className="font-display text-4xl font-semibold text-ink tracking-tight">{s.value}</p>
              <p className="text-sm text-ink/45 mt-1.5 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">Real patients · Real results</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight">
              {brand.googleReviewCount}+ people chose us.
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-ink/45">
            <span className="flex gap-0.5" aria-hidden>
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 text-yellow-400" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </span>
            <strong className="text-ink" aria-label={`${brand.googleRating} stars on Google`}>{brand.googleRating}</strong> on Google
          </div>
        </div>

        {/* Before/after gallery — FadeIn staggered, lazy-loaded */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.map((proc, i) => (
            <FadeIn key={proc.id} delay={i * 70}>
              <BeforeAfterSlider
                beforeImg={proc.beforeImg}
                afterImg={proc.afterImg}
                label={proc.problemLabel}
                priority={false}
                sizes={GALLERY_SIZES}
                className="ring-1 ring-ink/6"
              />
            </FadeIn>
          ))}
        </div>

        {/* Testimonials — no animation */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-ink/35 flex-shrink-0">What patients say</p>
            <div className="flex-1 h-px bg-ink/8" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
