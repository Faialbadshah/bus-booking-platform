import type { TrustPoint } from '@/types/clinic';

const icons: Record<string, React.ReactNode> = {
  microscope: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 3h6M12 3v4M8 21h8M12 17v4M10 7a2 2 0 104 0M7 14a5 5 0 0010 0"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  ),
};

interface Props {
  trust: TrustPoint;
}

export default function TrustCard({ trust }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-7 flex gap-4 items-start shadow-sm">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-action/10 text-action flex items-center justify-center">
        {icons[trust.icon] ?? icons.clock}
      </div>
      <div>
        <h3 className="font-semibold text-ink text-base mb-1">{trust.title}</h3>
        <p className="text-sm text-ink/60 leading-relaxed">{trust.line}</p>
      </div>
    </div>
  );
}
