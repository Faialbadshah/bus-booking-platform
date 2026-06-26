import type { FsrsState } from "./card";

export type Rating = 1 | 2 | 3 | 4; // Again / Hard / Good / Easy

export interface ScheduleResult {
  nextState: FsrsState;
  scheduledDays: number;
}

// Thin port — the rest of the app only knows this interface.
// The FSRS adapter is the only implementation; swap without changing callers.
export interface SchedulerPort {
  schedule(current: FsrsState, rating: Rating, now: Date): ScheduleResult;
  /** Returns a fresh state with due = now (card is immediately due). */
  initialState(now: Date): FsrsState;
}

// ── FSRS adapter ────────────────────────────────────────────────────────────

import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Rating as FsrsRating,
  State,
  type Card as TsFsrsCard,
} from "ts-fsrs";

// ts-fsrs v5: Rating.Again=1, Hard=2, Good=3, Easy=4 — matches our 1-4 domain rating exactly
const RATING_MAP: Record<Rating, FsrsRating> = {
  1: FsrsRating.Again,
  2: FsrsRating.Hard,
  3: FsrsRating.Good,
  4: FsrsRating.Easy,
};

const STATE_MAP: Record<number, State> = {
  0: State.New,
  1: State.Learning,
  2: State.Review,
  3: State.Relearning,
};

const STATE_RMAP: Record<State, 0 | 1 | 2 | 3> = {
  [State.New]: 0,
  [State.Learning]: 1,
  [State.Review]: 2,
  [State.Relearning]: 3,
};

const f = fsrs(generatorParameters());

function domainToTsFsrs(s: FsrsState): TsFsrsCard {
  return {
    due: new Date(s.due),
    stability: s.stability,
    difficulty: s.difficulty,
    elapsed_days: s.elapsed_days,
    scheduled_days: s.scheduled_days,
    reps: s.reps,
    lapses: s.lapses,
    learning_steps: s.learning_steps,
    state: STATE_MAP[s.state] ?? State.New,
    last_review: s.last_review ? new Date(s.last_review) : new Date(0),
  };
}

function tsFsrsToDomain(c: TsFsrsCard): FsrsState {
  return {
    due: c.due.toISOString(),
    stability: c.stability,
    difficulty: c.difficulty,
    elapsed_days: c.elapsed_days,
    scheduled_days: c.scheduled_days,
    reps: c.reps,
    lapses: c.lapses,
    learning_steps: c.learning_steps,
    state: STATE_RMAP[c.state] ?? 0,
    last_review: c.last_review ? c.last_review.toISOString() : null,
  };
}

export const fsrsAdapter: SchedulerPort = {
  schedule(current, rating, now) {
    const card = domainToTsFsrs(current);
    // f.repeat() returns a plain object keyed by numeric FsrsRating value
    const result = f.repeat(card, now) as unknown as Record<number, { card: TsFsrsCard }>;
    const item = result[RATING_MAP[rating]];
    const nextState = tsFsrsToDomain(item.card);
    return { nextState, scheduledDays: nextState.scheduled_days };
  },

  initialState(now) {
    const empty = createEmptyCard(now);
    return tsFsrsToDomain(empty);
  },
};
