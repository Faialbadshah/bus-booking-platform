import { describe, it, expect } from "vitest";
import {
  calcStreak,
  totalVideoMin,
  prevDay,
  isoDate,
} from "@/domain/habit";
import type { DailyLog } from "@/domain/habit";

const log = (date: string, videoMin = 30, level: "A1" | "A2" = "A1"): DailyLog => ({
  date,
  level,
  cardsReviewed: 10,
  sentencesWritten: 5,
  dialoguesSpoken: 2,
  videoMin,
});

describe("calcStreak()", () => {
  it("returns 0 when no logs exist", () => {
    expect(calcStreak([], "2024-01-10")).toBe(0);
  });

  it("returns 1 for a single entry on today", () => {
    expect(calcStreak([log("2024-01-10")], "2024-01-10")).toBe(1);
  });

  it("counts consecutive days ending today", () => {
    const logs = [log("2024-01-08"), log("2024-01-09"), log("2024-01-10")];
    expect(calcStreak(logs, "2024-01-10")).toBe(3);
  });

  it("stops at a gap", () => {
    const logs = [log("2024-01-08"), log("2024-01-10")]; // gap on 9th
    expect(calcStreak(logs, "2024-01-10")).toBe(1);
  });

  it("returns 0 if today has no entry even if yesterday does", () => {
    const logs = [log("2024-01-09")];
    expect(calcStreak(logs, "2024-01-10")).toBe(0);
  });

  it("handles long streaks", () => {
    const logs = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(Date.UTC(2024, 0, 1 + i));
      return log(isoDate(d));
    });
    expect(calcStreak(logs, "2024-01-30")).toBe(30);
  });
});

describe("totalVideoMin()", () => {
  it("sums videoMin for the given level", () => {
    const logs = [log("2024-01-01", 20, "A1"), log("2024-01-02", 30, "A2"), log("2024-01-03", 10, "A1")];
    expect(totalVideoMin(logs, "A1")).toBe(30);
    expect(totalVideoMin(logs, "A2")).toBe(30);
  });
});

describe("prevDay()", () => {
  it("handles month boundary", () => {
    expect(prevDay("2024-02-01")).toBe("2024-01-31");
  });

  it("handles year boundary", () => {
    expect(prevDay("2024-01-01")).toBe("2023-12-31");
  });

  it("handles leap year", () => {
    expect(prevDay("2024-03-01")).toBe("2024-02-29");
  });
});
