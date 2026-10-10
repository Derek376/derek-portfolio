"use client";

import { useState } from "react";
import { trainToyBpe, encodeToyBpe, textUnits } from "@/data/tokenizer-lesson";

export function BpeExplorer() {
  const [rounds, setRounds] = useState(0);
  const [text, setText] = useState("苹果是水果");
  const trained = trainToyBpe(rounds);
  const encoded = encodeToyBpe(text, rounds);
  return (
    <div className="space-y-5 border-y border-neutral-200 py-6 text-sm">
      <label className="block">
        <span className="mb-2 block">Training merges</span>
        <select
          className="border border-neutral-300 bg-white px-3 py-2"
          value={rounds}
          onChange={(e) => setRounds(Number(e.target.value))}
        >
          {[0, 1, 2].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block">
          Text to encode with the learned rules
        </span>
        <select
          className="border border-neutral-300 bg-white px-3 py-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        >
          <option>苹果是水果</option>
          <option>水果和苹果</option>
        </select>
      </label>
      <div className="space-y-4" aria-live="polite" aria-atomic="true">
        <p>
          Merges learned:{" "}
          {trained.merges.length
            ? trained.merges
                .map(
                  (m) =>
                    `${m.pair.join(" + ")} → ${m.pair.join("")} (${m.count} occurrences)`,
                )
                .join("; ")
            : "none"}
        </p>
        <p>
          Most frequent pairs now:{" "}
          {trained.pairs
            .slice(0, 3)
            .map((p) => `${p.pair.join(" + ")}: ${p.count}`)
            .join("; ")}
        </p>
        <div className="space-y-2">
          {trained.rows.map((row, i) => (
            <p key={i} className="break-words">
              Corpus {i + 1}: {row.join(" / ")}
            </p>
          ))}
        </div>
        <p>Encoded: {encoded.tokens.join(" / ")}</p>
        <p>Toy IDs: [{encoded.ids.join(", ")}]</p>
        <p>
          Token count: {encoded.tokens.length} · Vocabulary size:{" "}
          {trained.vocabulary.length}
        </p>
      </div>
      <p className="text-neutral-500">
        Character-based teaching BPE, not a production tokenizer. Pairs never
        cross sentence boundaries; punctuation participates in these toy counts.
        ID order follows first appearance, then learned merges.
      </p>
    </div>
  );
}

export function TextUnitExplorer() {
  const [text, setText] = useState("strawberry");
  const units = textUnits(text);
  return (
    <div className="space-y-4 border-y border-neutral-200 py-6 text-sm">
      <label className="block">
        <span className="mb-2 block">Text (up to 240 UTF-16 code units)</span>
        <textarea
          maxLength={240}
          rows={3}
          className="w-full border border-neutral-300 bg-white p-3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <div className="space-y-2" aria-live="polite" aria-atomic="true">
        <p>Unicode code points: {units.codePoints}</p>
        <p>UTF-8 bytes: {units.bytes}</p>
        <p>
          Lowercase r occurrences:{" "}
          {Array.from(text).filter((c) => c === "r").length}
        </p>
      </div>
      <p className="text-neutral-500">
        These are direct text measurements, not model token counts. A visible
        symbol can contain several code points, and one code point can require
        several bytes. No model tokenizer is loaded.
      </p>
    </div>
  );
}
