"use client";

import { useEffect } from "react";
import type { Card } from "@/domain/card";

interface Props {
  card: Card;
  flipped: boolean;
  onFlip: () => void;
  onGrade: (rating: 1 | 2 | 3 | 4) => void;
}

const RATINGS: { label: string; rating: 1 | 2 | 3 | 4; key: string; color: string }[] = [
  { label: "Again", rating: 1, key: "1", color: "bg-red-600 hover:bg-red-700" },
  { label: "Hard", rating: 2, key: "2", color: "bg-orange-500 hover:bg-orange-600" },
  { label: "Good", rating: 3, key: "3", color: "bg-green-600 hover:bg-green-700" },
  { label: "Easy", rating: 4, key: "4", color: "bg-blue-600 hover:bg-blue-700" },
];

export function FlashCard({ card, flipped, onFlip, onGrade }: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.code === "Space" && !flipped) {
        e.preventDefault();
        onFlip();
        return;
      }
      if (!flipped) return;
      if (["1", "2", "3", "4"].includes(e.key)) {
        onGrade(Number(e.key) as 1 | 2 | 3 | 4);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [flipped, onFlip, onGrade]);

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-xl mx-auto">
      {/* Tag + level strip */}
      <div className="flex gap-2 text-xs text-zinc-400">
        <span className="px-2 py-0.5 rounded bg-zinc-800">{card.level}</span>
        {card.tags.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded bg-zinc-800">{t}</span>
        ))}
      </div>

      {/* Card face */}
      <button
        onClick={onFlip}
        aria-label={flipped ? "Card back — press Space to flip" : "Card front — press Space to reveal answer"}
        className="w-full min-h-[180px] rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center p-8 text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-colors hover:bg-zinc-750 select-none"
      >
        <div>
          <p className="text-2xl font-semibold text-zinc-100">{card.front}</p>
          {flipped && (
            <p className="mt-4 text-lg text-zinc-300 border-t border-zinc-600 pt-4">{card.back}</p>
          )}
        </div>
      </button>

      {/* Grade buttons — only shown after flip */}
      {flipped ? (
        <div className="grid grid-cols-4 gap-3 w-full" role="group" aria-label="Grade this card">
          {RATINGS.map(({ label, rating, key, color }) => (
            <button
              key={rating}
              onClick={() => onGrade(rating)}
              aria-label={`${label} (key ${key})`}
              className={`${color} text-white font-medium py-3 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
            >
              <span className="block text-sm">{label}</span>
              <span className="block text-xs opacity-60">[{key}]</span>
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={onFlip}
          className="w-full py-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-zinc-200 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Show answer <span className="opacity-50 text-sm ml-1">[Space]</span>
        </button>
      )}
    </div>
  );
}
