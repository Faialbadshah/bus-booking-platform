import type { FaqEntry } from '@/types/clinic';
import FaqItem from './FaqItem';

interface Props {
  faq: FaqEntry[];
}

export default function FaqSection({ faq }: Props) {
  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">Honest answers</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight">
            The questions everyone asks
          </h2>
          <p className="mt-4 text-ink/40">Cost, pain, time — the things that actually worry people.</p>
        </div>

        <div className="bg-canvas rounded-3xl p-1">
          {faq.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
