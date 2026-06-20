import StepRow from './StepRow';

const STEPS = [
  {
    title: 'Free consultation',
    line: 'Tell us your concern (or just show us the photo that looks like yours). We take photos and an X-ray if needed. No charge.',
  },
  {
    title: 'Your smile plan',
    line: 'We show you a digital preview of your result before any treatment starts. You decide if you want to proceed — zero pressure.',
  },
  {
    title: 'Treatment + follow-up',
    line: 'Most cases take 1–2 visits. We check in at 2 weeks and again at 6 months to make sure you love the result.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-canvas py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left: heading */}
          <div>
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">The process</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink leading-tight">
              Three steps.<br />No surprises.
            </h2>
            <p className="mt-4 text-ink/60 leading-relaxed">
              We know you might be nervous. Everyone is. That's why we show you the result and the cost before we start — so you decide with full information.
            </p>
          </div>

          {/* Right: steps */}
          <div className="pt-1">
            {STEPS.map((step, i) => (
              <StepRow
                key={i}
                number={i + 1}
                title={step.title}
                line={step.line}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
