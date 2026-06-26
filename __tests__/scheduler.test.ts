import { describe, it, expect } from "vitest";
import { fsrsAdapter } from "@/domain/scheduler";
import type { FsrsState } from "@/domain/card";

const now = new Date("2024-01-10T12:00:00Z");

describe("fsrsAdapter.initialState", () => {
  it("returns a New (state=0) card due now", () => {
    const s = fsrsAdapter.initialState(now);
    expect(s.state).toBe(0);
    expect(s.reps).toBe(0);
    expect(s.lapses).toBe(0);
  });
});

describe("fsrsAdapter.schedule", () => {
  it("Good rating on a new card produces a future due date", () => {
    const initial = fsrsAdapter.initialState(now);
    const { nextState } = fsrsAdapter.schedule(initial, 3, now); // Good
    const due = new Date(nextState.due);
    expect(due.getTime()).toBeGreaterThan(now.getTime());
  });

  it("Again on a new card keeps state in Learning (1) or Relearning (3)", () => {
    const initial = fsrsAdapter.initialState(now);
    const { nextState } = fsrsAdapter.schedule(initial, 1, now); // Again
    expect([1, 3]).toContain(nextState.state);
  });

  it("Easy on new card jumps directly to Review state (2)", () => {
    const initial = fsrsAdapter.initialState(now);
    const { nextState } = fsrsAdapter.schedule(initial, 4, now); // Easy
    expect(nextState.state).toBe(2);
    expect(nextState.scheduled_days).toBeGreaterThan(0);
  });

  it("four consecutive Good ratings increase stability monotonically", () => {
    let state: FsrsState = fsrsAdapter.initialState(now);
    const stabilities: number[] = [];
    let t = now;
    for (let i = 0; i < 4; i++) {
      const { nextState } = fsrsAdapter.schedule(state, 3, t);
      stabilities.push(nextState.stability);
      state = nextState;
      t = new Date(new Date(nextState.due).getTime() + 1000);
    }
    for (let i = 1; i < stabilities.length; i++) {
      expect(stabilities[i]).toBeGreaterThanOrEqual(stabilities[i - 1]);
    }
  });
});
