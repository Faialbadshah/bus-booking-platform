'use client';

import { useState } from 'react';
import type { Procedure } from '@/types/clinic';
import ProblemTile from './ProblemTile';
import ProcedureDetail from './ProcedureDetail';

interface Props {
  procedures: Procedure[];
  phone: string;
}

export default function ProblemScannerGrid({ procedures, phone }: Props) {
  const [selected, setSelected] = useState<Procedure | null>(null);

  return (
    <section id="problems" className="bg-ink py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">Find your concern</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white leading-tight">
            What does your smile feel like right now?
          </h2>
          <p className="mt-3 text-white/50 text-base max-w-md mx-auto">
            Tap the one that looks like yours. We'll show you what a fix looks like.
          </p>
        </div>

        {/* 4-col desktop / 2-col mobile grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {procedures.map((proc) => (
            <ProblemTile key={proc.id} procedure={proc} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {/* Procedure detail panel/sheet */}
      {selected && (
        <ProcedureDetail
          procedure={selected}
          phone={phone}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
