import Dexie, { type Table } from "dexie";
import type { Card, ReviewLog } from "@/domain/card";
import type { DailyLog } from "@/domain/habit";

class GermanDB extends Dexie {
  cards!: Table<Card, string>;
  reviewLogs!: Table<ReviewLog, string>;
  dailyLogs!: Table<DailyLog, string>;

  constructor() {
    super("german-tracker-v1");
    this.version(1).stores({
      cards: "id, level, *tags, fsrs.due, fsrs.state, createdAt",
      reviewLogs: "id, cardId, reviewedAt",
      dailyLogs: "date, level",
    });
  }
}

// Singleton — safe to import from any module
export const db = new GermanDB();

// ── Repository interfaces (domain-facing) ──────────────────────────────────

export interface CardRepo {
  getAll(): Promise<Card[]>;
  getById(id: string): Promise<Card | undefined>;
  getDue(asOf: Date): Promise<Card[]>;
  save(card: Card): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface ReviewLogRepo {
  append(log: ReviewLog): Promise<void>;
  getByCardId(cardId: string): Promise<ReviewLog[]>;
  countToday(date: string): Promise<number>;
}

export interface DailyLogRepo {
  get(date: string): Promise<DailyLog | undefined>;
  upsert(log: DailyLog): Promise<void>;
  getAll(): Promise<DailyLog[]>;
  getLast30(fromDate: string): Promise<DailyLog[]>;
}

// ── Dexie implementations ──────────────────────────────────────────────────

export const cardRepo: CardRepo = {
  getAll: () => db.cards.orderBy("createdAt").toArray(),
  getById: (id) => db.cards.get(id),
  getDue: async (asOf) => {
    const iso = asOf.toISOString();
    return db.cards.filter((c) => c.fsrs.due <= iso).toArray();
  },
  save: (card) => db.cards.put(card).then(() => undefined),
  delete: (id) => db.cards.delete(id).then(() => undefined),
};

export const reviewLogRepo: ReviewLogRepo = {
  append: (log) => db.reviewLogs.put(log).then(() => undefined),
  getByCardId: (cardId) =>
    db.reviewLogs.where("cardId").equals(cardId).sortBy("reviewedAt"),
  countToday: (date) =>
    db.reviewLogs
      .filter((r) => r.reviewedAt.startsWith(date))
      .count(),
};

export const dailyLogRepo: DailyLogRepo = {
  get: (date) => db.dailyLogs.get(date),
  upsert: (log) => db.dailyLogs.put(log).then(() => undefined),
  getAll: () => db.dailyLogs.orderBy("date").toArray(),
  getLast30: async (fromDate) => {
    const all = await db.dailyLogs.orderBy("date").toArray();
    return all.filter((l) => l.date <= fromDate).slice(-30);
  },
};
