interface Props {
  number: number;
  title: string;
  line: string;
  isLast?: boolean;
}

export default function StepRow({ number, title, line, isLast = false }: Props) {
  return (
    <div className="flex gap-5 md:gap-6">
      {/* Number + connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-action text-white font-bold font-display text-lg flex items-center justify-center">
          {number}
        </div>
        {!isLast && <div className="w-px flex-1 bg-action/20 mt-2 min-h-[32px]" />}
      </div>

      {/* Content */}
      <div className={`pb-8 ${isLast ? '' : ''}`}>
        <h3 className="font-semibold text-ink text-base md:text-lg">{title}</h3>
        <p className="mt-1 text-sm md:text-base text-ink/60 leading-relaxed max-w-prose">{line}</p>
      </div>
    </div>
  );
}
