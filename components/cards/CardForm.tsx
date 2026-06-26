"use client";

import { useState } from "react";
import type { Card, CardTag, Level } from "@/domain/card";

interface Props {
  initial?: Card;
  onSave: (data: { front: string; back: string; tags: CardTag[]; level: Level }) => void;
  onCancel?: () => void;
}

const ALL_TAGS: CardTag[] = ["grammar", "vocab", "practical"];

export function CardForm({ initial, onSave, onCancel }: Props) {
  const [front, setFront] = useState(initial?.front ?? "");
  const [back, setBack] = useState(initial?.back ?? "");
  const [level, setLevel] = useState<Level>(initial?.level ?? "A1");
  const [tags, setTags] = useState<Set<CardTag>>(new Set(initial?.tags ?? []));

  function toggleTag(t: CardTag) {
    setTags((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;
    onSave({ front, back, level, tags: Array.from(tags) });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-zinc-400" htmlFor="front">Front</label>
        <textarea
          id="front"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          rows={2}
          required
          placeholder="e.g. der Hund"
          className="rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-zinc-400" htmlFor="back">Back</label>
        <textarea
          id="back"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          rows={2}
          required
          placeholder="e.g. the dog"
          className="rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-zinc-400">Level</span>
          <div className="flex gap-2">
            {(["A1", "A2"] as Level[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(l)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${level === l ? "bg-blue-600 text-white" : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-zinc-400">Tags</span>
          <div className="flex gap-2">
            {ALL_TAGS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${tags.has(t) ? "bg-zinc-500 text-white" : "bg-zinc-700 text-zinc-400 hover:bg-zinc-600"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-zinc-300 transition-colors">
            Cancel
          </button>
        )}
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
          {initial ? "Save changes" : "Add card"}
        </button>
      </div>
    </form>
  );
}
