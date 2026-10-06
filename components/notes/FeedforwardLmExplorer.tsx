"use client";

import { useState, type ReactNode } from "react";
import { astronomyWords, feedforwardPrediction } from "@/data/feedforward-lm-lesson";

export default function FeedforwardLmExplorer({ formula }: { formula: ReactNode }) {
  const [selected, setSelected] = useState("star");
  const entry = astronomyWords.find(item => item.word === selected)!;
  const result = feedforwardPrediction(entry.vector);

  return (
    <div className="space-y-5 border-y border-neutral-200 py-6">
      <p className="text-sm font-medium">A complete forward pass with two context tokens</p>
      <label className="block text-sm">
        <span className="mb-2 block">Second context token</span>
        <select value={selected} onChange={event => setSelected(event.target.value)} className="border border-neutral-300 bg-white px-3 py-2">
          {astronomyWords.map(item => <option key={item.word}>{item.word}</option>)}
        </select>
      </label>
      {formula}
      <div className="space-y-3 text-sm" aria-live="polite" aria-atomic="true">
        <p>Context: “around” + “{selected}”</p>
        <p className="break-words">Concatenated input: [{result.input.map(value => value.toFixed(2)).join(", ")}]</p>
        <p>Pre-activation: {result.preactivation.toFixed(4)} → tanh hidden value: {result.hidden.toFixed(4)}</p>
        <p>Output scores: planet {result.planetScore.toFixed(4)} · umbrella 0</p>
        {[{ word: "planet", probability: result.planetProbability }, { word: "umbrella", probability: result.umbrellaProbability }].map(row => (
          <div key={row.word} className="grid grid-cols-[5rem_1fr_4rem] items-center gap-3">
            <span>{row.word}</span>
            <div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{ width: `${Number((row.probability * 100).toFixed(3))}%` }} /></div>
            <span className="text-right">{(row.probability * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
      <p className="text-sm text-neutral-500">Hand-chosen embeddings and weights. “Black hole” is treated as one vocabulary item in this toy example. The first vector and the fourth coordinate have zero weight; there is no training or real astronomy knowledge behind this calculation.</p>
    </div>
  );
}
