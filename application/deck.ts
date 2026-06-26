import { fsrsAdapter } from "@/domain/scheduler";
import { randomUUID } from "@/domain/uid";
import type { Card, CardTag } from "@/domain/card";
import type { Level } from "@/domain/card";
import type { CardRepo } from "@/infra/db";

interface CreateCardInput {
  front: string;
  back: string;
  tags: CardTag[];
  level: Level;
}

export async function addCard(repo: CardRepo, input: CreateCardInput, now: Date): Promise<Card> {
  const card: Card = {
    id: randomUUID(),
    front: input.front.trim(),
    back: input.back.trim(),
    tags: input.tags,
    level: input.level,
    fsrs: fsrsAdapter.initialState(now),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
  await repo.save(card);
  return card;
}

export async function editCard(
  repo: CardRepo,
  id: string,
  patch: Partial<Pick<Card, "front" | "back" | "tags" | "level">>,
  now: Date,
): Promise<Card> {
  const card = await repo.getById(id);
  if (!card) throw new Error(`Card ${id} not found`);
  const updated: Card = { ...card, ...patch, updatedAt: now.toISOString() };
  await repo.save(updated);
  return updated;
}

export async function deleteCard(repo: CardRepo, id: string): Promise<void> {
  await repo.delete(id);
}

export async function getAllCards(repo: CardRepo): Promise<Card[]> {
  return repo.getAll();
}
