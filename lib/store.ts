import { create } from "zustand";
import type { Card } from "@/domain/card";

interface ReviewSessionState {
  queue: Card[];
  currentIndex: number;
  flipped: boolean;
  setQueue: (cards: Card[]) => void;
  flip: () => void;
  advance: () => void;
  reset: () => void;
}

export const useReviewStore = create<ReviewSessionState>((set) => ({
  queue: [],
  currentIndex: 0,
  flipped: false,
  setQueue: (cards) => set({ queue: cards, currentIndex: 0, flipped: false }),
  flip: () => set((s) => ({ flipped: !s.flipped })),
  advance: () =>
    set((s) => ({
      currentIndex: s.currentIndex + 1,
      flipped: false,
    })),
  reset: () => set({ queue: [], currentIndex: 0, flipped: false }),
}));
