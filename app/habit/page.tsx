"use client";

import { useState } from "react";
import { HabitLogForm } from "@/components/habit/HabitLogForm";
import { ProgressView } from "@/components/habit/ProgressView";

export default function HabitPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Habit Log</h1>
        <p className="text-zinc-400 text-sm mt-1">Track today&apos;s output and see your progress.</p>
      </div>

      <section>
        <h2 className="text-base font-semibold text-zinc-300 mb-3">Today</h2>
        <div className="rounded-xl bg-zinc-800/40 border border-zinc-700 p-5">
          <HabitLogForm onSaved={() => setRefreshKey((k) => k + 1)} />
        </div>
      </section>

      <section>
        <h2 className="text-base font-semibold text-zinc-300 mb-3">Progress</h2>
        <div className="rounded-xl bg-zinc-800/40 border border-zinc-700 p-5">
          <ProgressView refreshKey={refreshKey} />
        </div>
      </section>
    </div>
  );
}
