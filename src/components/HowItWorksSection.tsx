const STEPS = [
  {
    title: 'Free consultation',
    body: 'Tell us your concern or just show us the tile that matched. We photograph your smile, take an X-ray if needed, and show you a digital result preview. No cost. No pressure.',
    time: '~20 min',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Your smile plan',
    body: 'We show you options with real cost ranges — not vague estimates. You see the expected result before we touch anything. We proceed only with your explicit go-ahead.',
    time: '~30 min',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Treatment + follow-up',
    body: 'Most cases: 1–2 visits. We check in at 2 weeks and again at 6 months. If anything needs a touch-up, it happens. You leave with a result you can photograph.',
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

        <div className="text-center mb-14 max-w-xl mx-auto">
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">The process</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight">
            Three steps. No surprises.
          </h2>
          <p className="mt-4 text-ink/45 text-base">
            We show you the result and the cost before we start.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-5 relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-[3.25rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-action/15" aria-hidden />

          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col gap-4">
              {/* Icon + number */}
              <div className="relative w-12 h-12 rounded-2xl bg-action/10 text-action flex items-center justify-center z-10">
                {step.icon}
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-action text-white text-[10px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>

              {/* Card */}
              <div className="bg-white rounded-2xl p-5 border border-black/[0.05] flex-1">
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <h3 className="font-semibold text-ink text-base leading-snug">{step.title}</h3>
                  <span className="flex-shrink-0 text-[11px] font-semibold text-action bg-action/8 px-2 py-0.5 rounded-full">
                    {step.time}
                  </span>
                </div>
                <p className="text-sm text-ink/55 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
