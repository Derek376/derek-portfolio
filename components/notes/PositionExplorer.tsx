"use client";

import { useState } from "react";
import { positionEncoding } from "@/data/transformer-lesson";

const embeddings: Record<string, number[]> = {
  cat: [1, 0, 0, 0],
  chases: [0, 1, 0, 0],
  dog: [0, 0, 1, 0],
};

export default function PositionExplorer() {
  const [reversed, setReversed] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const tokens = reversed ? ["dog", "chases", "cat"] : ["cat", "chases", "dog"];
  return (
    <div className="space-y-5 border-y border-neutral-200 py-6 text-sm">
      <label className="block">
        <span className="mb-2 block">Sentence order</span>
        <select
          className="border border-neutral-300 bg-white px-3 py-2"
          value={reversed ? "reversed" : "original"}
          onChange={(e) => setReversed(e.target.value === "reversed")}
        >
          <option value="original">cat chases dog</option>
          <option value="reversed">dog chases cat</option>
        </select>
      </label>
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-1 accent-[var(--accent)]"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <span>Add sinusoidal position vectors</span>
      </label>
      <div className="space-y-5" aria-live="polite" aria-atomic="true">
        {tokens.map((token, position) => {
          const embedding = embeddings[token];
          const positional = positionEncoding(position, 4);
          const input = embedding.map(
            (value, i) => value + (enabled ? positional[i] : 0),
          );
          return (
            <div key={position} className="space-y-2">
              <p className="font-medium">
                Position {position} · {token}
              </p>
              <p>Embedding: [{embedding.join(", ")}]</p>
              <p>
                Position vector: [
                {positional.map((value) => value.toFixed(3)).join(", ")}]{" "}
                {enabled ? "" : "(not added)"}
              </p>
              <p>
                Input: [{input.map((value) => value.toFixed(3)).join(", ")}]
              </p>
            </div>
          );
        })}
      </div>
      <p className="text-neutral-500">
        Fixed four-coordinate teaching embeddings; no trained language model
        runs here. With positions disabled, each word keeps the same vector
        wherever it moves. Adding positions changes the vector attached to that
        word.
      </p>
    </div>
  );
}
