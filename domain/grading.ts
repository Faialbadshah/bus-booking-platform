import type { Card, FsrsState, ReviewLog } from "./card";
import type { SchedulerPort, Rating } from "./scheduler";
import { randomUUID } from "./uid";

export interface GradeResult {
  updatedCard: Card;
  log: ReviewLog;
}

export function grade(
  card: Card,
  rating: Rating,
  scheduler: SchedulerPort,
  now: Date,
): GradeResult {
  const prevState: FsrsState = { ...card.fsrs };
  const { nextState } = scheduler.schedule(card.fsrs, rating, now);

  const updatedCard: Card = {
    ...card,
    fsrs: nextState,
    updatedAt: now.toISOString(),
  };

  const log: ReviewLog = {
    id: randomUUID(),
    cardId: card.id,
    rating,
    reviewedAt: now.toISOString(),
    prevState,
  };

  return { updatedCard, log };
}
