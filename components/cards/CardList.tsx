"use client";

import { useState, useEffect, useCallback } from "react";
import type { Card } from "@/domain/card";
import { CardForm } from "./CardForm";
import { addCard, editCard, deleteCard, getAllCards } from "@/application/deck";
import { cardRepo } from "@/infra/db";

export function CardList() {
  const [cards, setCards] = useState<Card[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  const refresh = useCallback(() => {
    getAllCards(cardRepo).then(setCards);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  async function handleAdd(data: Parameters<typeof addCard>[1]) {
    await addCard(cardRepo, data, new Date());
    setShowAdd(false);
    refresh();
  }

  async function handleEdit(id: string, data: Parameters<typeof editCard>[2]) {
    await editCard(cardRepo, id, data, new Date());
    setEditing(null);
    refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this card?")) return;
    await deleteCard(cardRepo, id);
    refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-zinc-100">Cards <span className="text-zinc-500 font-normal text-base">({cards.length})</span></h2>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          + Add card
        </button>
      </div>

      {showAdd && (
        <div className="rounded-xl bg-zinc-800/60 border border-zinc-700 p-5">
          <h3 className="text-sm font-semibold text-zinc-300 mb-3">New card</h3>
          <CardForm onSave={handleAdd} onCancel={() => setShowAdd(false)} />
        </div>
      )}

      {cards.length === 0 && !showAdd && (
        <p className="text-zinc-500 text-center py-10">No cards yet. Add your first one!</p>
      )}

      <div className="flex flex-col gap-3">
        {cards.map((card) =>
          editing === card.id ? (
            <div key={card.id} className="rounded-xl bg-zinc-800/60 border border-zinc-700 p-5">
              <CardForm
                initial={card}
                onSave={(data) => handleEdit(card.id, data)}
                onCancel={() => setEditing(null)}
              />
            </div>
          ) : (
            <div key={card.id} className="rounded-xl bg-zinc-800/40 border border-zinc-700 p-4 flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-zinc-100 font-medium">{card.front}</p>
                <p className="text-zinc-400 text-sm mt-0.5 truncate">{card.back}</p>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-300">{card.level}</span>
                  {card.tags.map((t) => (
                    <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-400">{t}</span>
                  ))}
                  <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-500">
                    due {new Date(card.fsrs.due).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(card.id)} className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded hover:bg-zinc-700 transition-colors">Edit</button>
                <button onClick={() => handleDelete(card.id)} className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-zinc-700 transition-colors">Delete</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
