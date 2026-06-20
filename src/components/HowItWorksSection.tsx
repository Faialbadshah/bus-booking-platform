import FadeIn from './FadeIn';

const STEPS = [
  {
    number: '01',
    title: 'Free consultation',
    body: 'Tell us your concern — or just show us the tile that looked like yours. We photograph your smile, take an X-ray if needed, and show you a digital preview. No cost. No pressure.',
    time: '~20 min',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Your smile plan',
    body: 'We present your options with real cost ranges — not vague estimates. You see the expected result digitally before we touch anything. You decide. We only proceed with your explicit go-ahead.',
    time: '~30 min',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Treatment + follow-up',
    body: 'Most cases take 1–2 visits. We check in at 2 weeks, then at 6 months. If anything needs a touch-up, it happens. You leave with a result you can photograph and a guarantee you can count on.',
    time: '1–2 visits',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how" className="bg-canvas py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <FadeIn>
          <div className="text-center mb-16 max-w-xl mx-auto">
            <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">The process</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight">
              Three steps.<br /> No surprises.
            </h2>
            <p className="mt-4 text-ink/50 text-base">
              We show you the result and the cost before we start — so you decide with full information.
            </p>
          </div>
        </FadeIn>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-action/20" aria-hidden />

          {STEPS.map((step, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="relative flex flex-col gap-5">
                {/* Icon circle */}
                <div className="relative w-12 h-12 rounded-2xl bg-action/10 text-action flex items-center justify-center flex-shrink-0 z-10">
                  {step.icon}
                  {/* Number badge */}
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-action text-white text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                {/* Content card */}
                <div className="bg-white rounded-2xl p-6 border border-black/[0.05] flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-ink text-lg leading-snug">{step.title}</h3>
                    <span className="flex-shrink-0 text-[11px] font-semibold text-action bg-action/8 px-2.5 py-1 rounded-full">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-sm text-ink/60 leading-relaxed">{step.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
