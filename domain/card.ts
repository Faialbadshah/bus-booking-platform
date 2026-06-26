export type Level = "A1" | "A2";
export type CardTag = "grammar" | "vocab" | "practical";

// FSRS state as stored — mirrors ts-fsrs Card but owned by our domain
export interface FsrsState {
  due: string; // ISO string (UTC)
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  learning_steps: number; // ts-fsrs v5 step counter within learning/relearning phases
  // 0=New,1=Learning,2=Review,3=Relearning
  state: 0 | 1 | 2 | 3;
  last_review: string | null; // ISO string or null
}

export interface Card {
  id: string;
  front: string;
  back: string;
  tags: CardTag[];
  level: Level;
  fsrs: FsrsState;
  createdAt: string;
  updatedAt: string;
}

// Append-only audit trail — needed for future FSRS optimizer
export interface ReviewLog {
  id: string;
  cardId: string;
  rating: 1 | 2 | 3 | 4; // Again/Hard/Good/Easy
  reviewedAt: string; // ISO string
  prevState: FsrsState;
}

export function newFsrsState(dueIso: string): FsrsState {
  return {
    due: dueIso,
    stability: 0,
    difficulty: 0,
    elapsed_days: 0,
    scheduled_days: 0,
    reps: 0,
    lapses: 0,
    learning_steps: 0,
    state: 0,
    last_review: null,
  };
}
