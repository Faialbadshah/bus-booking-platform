import { describe, it, expect, vi } from "vitest";
import { grade } from "@/domain/grading";
import type { Card } from "@/domain/card";
import type { SchedulerPort, Rating, ScheduleResult } from "@/domain/scheduler";
import type { FsrsState } from "@/domain/card";

const baseState: FsrsState = {
  due: "2024-01-10T00:00:00.000Z",
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

const baseCard: Card = {
  id: "card-1",
  front: "der Hund",
  back: "the dog",
  tags: ["vocab"],
  level: "A1",
  fsrs: baseState,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

const mockScheduler: SchedulerPort = {
  schedule: vi.fn((_state: FsrsState, _rating: Rating, now: Date): ScheduleResult => ({
    nextState: { ...baseState, reps: 1, stability: 2.5, due: new Date(now.getTime() + 86_400_000).toISOString() },
    scheduledDays: 1,
  })),
  initialState: vi.fn((now: Date) => ({ ...baseState, due: now.toISOString() })),
};

describe("grade()", () => {
  const now = new Date("2024-01-10T12:00:00Z");

  it("returns an updated card and a review log entry", () => {
    const { updatedCard, log } = grade(baseCard, 3, mockScheduler, now);
    expect(updatedCard.id).toBe("card-1");
    expect(updatedCard.fsrs.reps).toBe(1);
    expect(log.cardId).toBe("card-1");
    expect(log.rating).toBe(3);
  });

  it("stores the previous state in the log, not the new state", () => {
    const { updatedCard, log } = grade(baseCard, 3, mockScheduler, now);
    expect(log.prevState.reps).toBe(0);        // snapshot of old state
    expect(updatedCard.fsrs.reps).toBe(1);     // new state has reps incremented
  });

  it("updatedAt is set to now", () => {
    const { updatedCard } = grade(baseCard, 3, mockScheduler, now);
    expect(updatedCard.updatedAt).toBe(now.toISOString());
  });

  it("log has a unique id", () => {
    const { log: l1 } = grade(baseCard, 3, mockScheduler, now);
    const { log: l2 } = grade(baseCard, 3, mockScheduler, now);
    expect(l1.id).not.toBe(l2.id);
  });
});
