"use client";

import { useState, type ReactNode } from "react";
import { compareWordVectors, teachingWords } from "@/data/word-vector-lesson";

export default function WordVectorExplorer({ formula }: { formula: ReactNode }) {
  const [first, setFirst] = useState("cat");
  const [second, setSecond] = useState("kitten");
  const a = teachingWords.find(entry => entry.word === first)!;
  const b = teachingWords.find(entry => entry.word === second)!;
  const result = compareWordVectors(a.vector, b.vector);

  return <div className="space-y-5 border-y border-neutral-200 py-6">
    <p className="text-sm font-medium">Compare the hand-chosen coordinates in Figure 15-2</p>
    <div className="flex flex-wrap gap-4">
      <label className="space-y-2 text-sm"><span className="block">First word</span>
        <select className="border border-neutral-300 bg-white px-3 py-2" value={first} onChange={event => setFirst(event.target.value)}>
          {teachingWords.map(entry => <option key={entry.word}>{entry.word}</option>)}
        </select>
      </label>
      <label className="space-y-2 text-sm"><span className="block">Second word</span>
        <select className="border border-neutral-300 bg-white px-3 py-2" value={second} onChange={event => setSecond(event.target.value)}>
          {teachingWords.map(entry => <option key={entry.word}>{entry.word}</option>)}
        </select>
      </label>
    </div>
    {formula}
    <div aria-live="polite" aria-atomic="true" className="space-y-2 text-sm">
      <p>{a.word}: ({a.vector.join(", ")}) · {b.word}: ({b.vector.join(", ")})</p>
      <p>Euclidean distance: <strong>{result.distance.toFixed(3)}</strong></p>
      <p>Cosine similarity: <strong>{result.cosine === null ? "Undefined for a zero vector" : result.cosine.toFixed(3)}</strong></p>
    </div>
    <p className="text-sm text-neutral-500">Distance compares positions; cosine compares directions from the origin. These two manual features cannot capture all the meanings of a word. This is a geometry experiment, not a trained language model.</p>
  </div>;
}
