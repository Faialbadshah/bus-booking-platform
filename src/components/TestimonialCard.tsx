import type { Testimonial } from '@/types/clinic';

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-black/[0.04] hover:shadow-md transition-shadow duration-200">
      {/* Stars */}
      <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 text-yellow-400" fill="currentColor" aria-hidden>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-ink/80 text-sm leading-relaxed flex-1">
        "{testimonial.quote}"
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center gap-3 pt-1 border-t border-black/[0.06]">
        {/* Avatar placeholder */}
        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent font-semibold text-sm">
          {testimonial.name[0]}
        </div>
        <div>
          <p className="font-semibold text-ink text-sm leading-none">{testimonial.name}</p>
          <p className="text-accent text-xs mt-0.5">{testimonial.procedure}</p>
        </div>
      </div>
    </div>
  );
}
