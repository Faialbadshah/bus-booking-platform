import { CardList } from "@/components/cards/CardList";

export default function CardsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Cards</h1>
        <p className="text-zinc-400 text-sm mt-1">Manage your flashcard deck.</p>
      </div>
      <CardList />
    </div>
  );
}
