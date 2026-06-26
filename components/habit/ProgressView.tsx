"use client";

import { useState, useEffect, useCallback } from "react";
import { getStreak, getProgress, getLast30Days } from "@/application/log";
import { dailyLogRepo } from "@/infra/db";
import { LECTURE_TOTAL } from "@/domain/habit";
import type { DailyLog } from "@/domain/habit";

interface Props {
  refreshKey?: number;
}

function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-zinc-300">{label}</span>
        <span className="text-zinc-400">{value} / {max} min ({pct.toFixed(0)}%)</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-700 overflow-hidden">
        <div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function ActivityGrid({ logs }: { logs: DailyLog[] }) {
  const byDate = new Map(logs.map((l) => [l.date, l.cardsReviewed]));
  const max = Math.max(1, ...Array.from(byDate.values()));

  return (
    <div>
      <p className="text-sm text-zinc-400 mb-2">Last 30 days (cards reviewed)</p>
      <div className="flex gap-1 flex-wrap">
        {logs.map((l) => {
          const intensity = Math.round((l.cardsReviewed / max) * 4);
          const colors = ["bg-zinc-800", "bg-blue-900", "bg-blue-700", "bg-blue-500", "bg-blue-400"];
          return (
            <div
              key={l.date}
              title={`${l.date}: ${l.cardsReviewed} cards`}
              className={`w-5 h-5 rounded-sm ${colors[intensity]} border border-zinc-700/40`}
            />
          );
        })}
      </div>
    </div>
  );
}

export function ProgressView({ refreshKey = 0 }: Props) {
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState({ A1: 0, A2: 0 });
  const [last30, setLast30] = useState<DailyLog[]>([]);

  const load = useCallback(() => {
    Promise.all([
      getStreak(dailyLogRepo),
      getProgress(dailyLogRepo),
      getLast30Days(dailyLogRepo),
    ]).then(([s, p, l]) => {
      setStreak(s);
      setProgress(p);
      setLast30(l);
    });
  }, []);

  useEffect(() => { load(); }, [load, refreshKey]);

  return (
    <div className="flex flex-col gap-6">
      {/* Streak */}
      <div className="flex items-center gap-3">
        <span className="text-4xl font-bold text-zinc-100">{streak}</span>
        <div>
          <p className="text-zinc-200 font-medium">day streak</p>
          <p className="text-zinc-500 text-sm">consecutive logged days</p>
        </div>
      </div>

      {/* Lecture progress */}
      <div className="flex flex-col gap-3">
        <ProgressBar value={progress.A1} max={LECTURE_TOTAL.A1} label="A1 lecture progress" />
        <ProgressBar value={progress.A2} max={LECTURE_TOTAL.A2} label="A2 lecture progress" />
      </div>

      {/* 30-day activity */}
      {last30.length > 0 && <ActivityGrid logs={last30} />}
    </div>
  );
}
