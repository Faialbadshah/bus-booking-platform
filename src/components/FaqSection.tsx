import type { FaqEntry } from '@/types/clinic';
import FaqItem from './FaqItem';

interface Props {
  faq: FaqEntry[];
}

export default function FaqSection({ faq }: Props) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">Honest answers</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink leading-tight">
            The questions everyone asks first
          </h2>
        </div>

        <div className="divide-y divide-ink/10 border-t border-ink/10">
          {faq.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
