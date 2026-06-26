"use client";

import { useEffect, useCallback } from "react";
import { useReviewStore } from "@/lib/store";
import { FlashCard } from "./FlashCard";
import { getDueCards, gradeCard } from "@/application/review";
import { cardRepo, reviewLogRepo } from "@/infra/db";

export function ReviewSession() {
  const { queue, currentIndex, flipped, setQueue, flip, advance } = useReviewStore();

  useEffect(() => {
    getDueCards(cardRepo, new Date()).then(setQueue);
  }, [setQueue]);

  const handleGrade = useCallback(
    async (rating: 1 | 2 | 3 | 4) => {
      const card = queue[currentIndex];
      if (!card) return;
      await gradeCard(cardRepo, reviewLogRepo, card.id, rating, new Date());
      advance();
    },
    [queue, currentIndex, advance],
  );

  if (queue.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-3xl font-semibold text-zinc-200">Alles erledigt</p>
        <p className="mt-2 text-zinc-400">Nothing due — great work today.</p>
      </div>
    );
  }

  if (currentIndex >= queue.length) {
    return (
      <div className="text-center py-20">
        <p className="text-3xl font-semibold text-green-400">Session complete!</p>
        <p className="mt-2 text-zinc-400">Reviewed {queue.length} card{queue.length !== 1 ? "s" : ""}.</p>
        <button
          onClick={() => getDueCards(cardRepo, new Date()).then(setQueue)}
          className="mt-6 px-6 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-zinc-200 transition-colors"
        >
          Check for more
        </button>
      </div>
    );
  }

  const card = queue[currentIndex];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between text-sm text-zinc-400">
        <span>{currentIndex + 1} / {queue.length}</span>
        <span>{queue.length - currentIndex - 1} remaining</span>
      </div>
      {/* Progress bar */}
      <div className="h-1 w-full bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="h-1 bg-blue-500 rounded-full transition-all"
          style={{ width: `${(currentIndex / queue.length) * 100}%` }}
        />
      </div>
      <FlashCard
        card={card}
        flipped={flipped}
        onFlip={flip}
        onGrade={handleGrade}
      />
    </div>
  );
}
