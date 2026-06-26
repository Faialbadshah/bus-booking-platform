import { grade } from "@/domain/grading";
import { fsrsAdapter } from "@/domain/scheduler";
import type { Rating } from "@/domain/scheduler";
import type { Card } from "@/domain/card";
import type { CardRepo, ReviewLogRepo } from "@/infra/db";

export async function getDueCards(repo: CardRepo, asOf: Date): Promise<Card[]> {
  return repo.getDue(asOf);
}

export async function gradeCard(
  cardRepo: CardRepo,
  reviewLogRepo: ReviewLogRepo,
  cardId: string,
  rating: Rating,
  now: Date,
): Promise<void> {
  const card = await cardRepo.getById(cardId);
  if (!card) throw new Error(`Card ${cardId} not found`);

  const { updatedCard, log } = grade(card, rating, fsrsAdapter, now);
  await Promise.all([cardRepo.save(updatedCard), reviewLogRepo.append(log)]);
}
