import type { Level } from "./card";

export interface DailyLog {
  date: string; // YYYY-MM-DD local
  level: Level;
  cardsReviewed: number;
  sentencesWritten: number;
  dialoguesSpoken: number;
  videoMin: number;
}

// Lecture totals (minutes)
export const LECTURE_TOTAL = { A1: 570, A2: 660 } as const;

/** Consecutive days ending at (and including) `today`. */
export function calcStreak(logs: DailyLog[], today: string): number {
  const dates = new Set(logs.map((l) => l.date));
  let streak = 0;
  let cursor = today;
  while (dates.has(cursor)) {
    streak++;
    cursor = prevDay(cursor);
  }
  return streak;
}

/** Sum videoMin for a given level across all logs. */
export function totalVideoMin(logs: DailyLog[], level: Level): number {
  return logs.filter((l) => l.level === level).reduce((s, l) => s + l.videoMin, 0);
}

// ── date helpers ─────────────────────────────────────────────────────────────

/** YYYY-MM-DD → previous day YYYY-MM-DD, no timezone issues (pure string math). */
export function prevDay(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  // Use UTC so DST never changes the date
  const t = Date.UTC(y, m - 1, d) - 86_400_000;
  return isoDate(new Date(t));
}

/** Date object → YYYY-MM-DD in local timezone. */
export function isoDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

/** "today" as YYYY-MM-DD in local timezone. */
export function todayLocal(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
