import { calcStreak, totalVideoMin, todayLocal } from "@/domain/habit";
import type { DailyLog } from "@/domain/habit";
import type { DailyLogRepo } from "@/infra/db";

export async function upsertDailyLog(repo: DailyLogRepo, log: DailyLog): Promise<void> {
  await repo.upsert(log);
}

export async function getStreak(repo: DailyLogRepo): Promise<number> {
  const logs = await repo.getAll();
  return calcStreak(logs, todayLocal());
}

export async function getProgress(
  repo: DailyLogRepo,
): Promise<{ A1: number; A2: number }> {
  const logs = await repo.getAll();
  return { A1: totalVideoMin(logs, "A1"), A2: totalVideoMin(logs, "A2") };
}

export async function getLast30Days(
  repo: DailyLogRepo,
): Promise<DailyLog[]> {
  return repo.getLast30(todayLocal());
}
