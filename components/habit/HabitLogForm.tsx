"use client";

import { useState, useEffect } from "react";
import type { DailyLog } from "@/domain/habit";
import { todayLocal } from "@/domain/habit";
import { upsertDailyLog } from "@/application/log";
import { dailyLogRepo } from "@/infra/db";

interface Props {
  onSaved?: () => void;
}

export function HabitLogForm({ onSaved }: Props) {
  const today = todayLocal();
  const [level, setLevel] = useState<"A1" | "A2">("A1");
  const [cardsReviewed, setCardsReviewed] = useState(0);
  const [sentencesWritten, setSentencesWritten] = useState(0);
  const [dialoguesSpoken, setDialoguesSpoken] = useState(0);
  const [videoMin, setVideoMin] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    dailyLogRepo.get(today).then((existing) => {
      if (!existing) return;
      setLevel(existing.level);
      setCardsReviewed(existing.cardsReviewed);
      setSentencesWritten(existing.sentencesWritten);
      setDialoguesSpoken(existing.dialoguesSpoken);
      setVideoMin(existing.videoMin);
    });
  }, [today]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const log: DailyLog = { date: today, level, cardsReviewed, sentencesWritten, dialoguesSpoken, videoMin };
    await upsertDailyLog(dailyLogRepo, log);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    onSaved?.();
  }

  const numInput = (value: number, setter: (v: number) => void, label: string, id: string) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-zinc-400" htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        min={0}
        value={value}
        onChange={(e) => setter(Math.max(0, Number(e.target.value)))}
        className="rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 w-28 focus:outline-none focus:border-blue-500"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-400">Today ({today})</span>
        <div className="flex gap-2 ml-auto">
          {(["A1", "A2"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${level === l ? "bg-blue-600 text-white" : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {numInput(cardsReviewed, setCardsReviewed, "Cards reviewed", "cards")}
        {numInput(sentencesWritten, setSentencesWritten, "Sentences written", "sentences")}
        {numInput(dialoguesSpoken, setDialoguesSpoken, "Dialogues spoken", "dialogues")}
        {numInput(videoMin, setVideoMin, "Video minutes", "videomin")}
      </div>
      <button
        type="submit"
        className={`self-start px-5 py-2 rounded-lg font-medium transition-colors ${saved ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
      >
        {saved ? "Saved!" : "Save today's log"}
      </button>
    </form>
  );
}
