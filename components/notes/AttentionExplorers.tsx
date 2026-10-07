"use client";

import { useState, type ReactNode } from "react";
import { attentionRow, attentionWords, sentenceAttention, type AttentionScenario } from "@/data/attention-lesson";

export function AttentionCalculation({ formula }: { formula: ReactNode }) {
  const [queryIndex, setQueryIndex] = useState(2);
  const [scaled, setScaled] = useState(true);
  const [causal, setCausal] = useState(false);
  const result = attentionRow(queryIndex, scaled, causal);
  return <div className="space-y-5 border-y border-neutral-200 py-6">
    <label className="block text-sm"><span className="mb-2 block">Query position</span>
      <select value={queryIndex} onChange={event => setQueryIndex(Number(event.target.value))} className="border border-neutral-300 bg-white px-3 py-2">
        {attentionWords.map((entry, index) => <option key={entry.word} value={index}>{entry.word}</option>)}
      </select>
    </label>
    <label className="flex items-start gap-3 text-sm"><input type="checkbox" checked={scaled} onChange={event => setScaled(event.target.checked)} className="mt-1 accent-[var(--accent)]" /><span>Scale scores by the square root of key dimension (2)</span></label>
    <label className="flex items-start gap-3 text-sm"><input type="checkbox" checked={causal} onChange={event => setCausal(event.target.checked)} className="mt-1 accent-[var(--accent)]" /><span>Apply a causal mask using the listed order: kitten, tired, it</span></label>
    {formula}
    <div className="space-y-4 text-sm" aria-live="polite" aria-atomic="true">
      <p>Query vector: [{attentionWords[queryIndex].q.join(", ")}]</p>
      {result.rows.map(row => <div key={row.word} className="space-y-2">
        <p>{row.word}: dot product {row.score.toFixed(3)} · scaled score {row.scaledScore.toFixed(3)}{row.masked ? " · masked" : ""} · weight {(row.weight * 100).toFixed(2)}%</p>
        <div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{ width: `${Number((row.weight * 100).toFixed(3))}%` }} /></div>
      </div>)}
      <p>Weight sum: {result.rows.reduce((sum, row) => sum + row.weight, 0).toFixed(6)}</p>
      <p>Weighted output: [{result.output.map(value => value.toFixed(4)).join(", ")}]</p>
    </div>
    <p className="text-sm text-neutral-500">Actual arithmetic on hand-chosen vectors. The three positions are a reordered teaching list, not a complete sentence. Masked scores are excluded before Softmax; displayed scores show their values before masking.</p>
  </div>;
}

export function SentenceAttentionExplorer() {
  const [scenario, setScenario] = useState<AttentionScenario>("tired");
  const [queryIndex, setQueryIndex] = useState(5);
  const result = sentenceAttention(scenario, queryIndex);
  return <div className="space-y-5 border-y border-neutral-200 py-6">
    <label className="block text-sm"><span className="mb-2 block">Sentence context</span>
      <select value={scenario} onChange={event => setScenario(event.target.value as AttentionScenario)} className="border border-neutral-300 bg-white px-3 py-2"><option value="tired">It was too tired</option><option value="congested">It was too congested</option></select>
    </label>
    <p className="text-sm">“The kitten didn’t cross the road because it was too {scenario}.”</p>
    <div className="flex flex-wrap gap-2" aria-label="Choose a word to inspect its preset attention row">
      {result.tokens.map((word, index) => <button key={index} type="button" aria-pressed={queryIndex === index} onClick={() => setQueryIndex(index)} className={`border px-3 py-2 text-sm ${queryIndex === index ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-neutral-300 hover:border-neutral-900"}`}>{word}</button>)}
    </div>
    <div className="space-y-3 text-sm" aria-live="polite" aria-atomic="true">
      <p>Preset query: “{result.tokens[queryIndex]}”</p>
      {result.tokens.map((word, index) => <div key={index} className="grid grid-cols-[5rem_1fr_4rem] items-center gap-3"><span>{word}</span><div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{ width: `${Number((result.weights[index] * 100).toFixed(3))}%` }} /></div><span className="text-right">{(result.weights[index] * 100).toFixed(1)}%</span></div>)}
      <p>Weight sum: {result.weights.reduce((sum, weight) => sum + weight, 0).toFixed(6)}</p>
    </div>
    <p className="text-sm text-neutral-500">Hand-written contextual scores normalised by Softmax. This is a bidirectional illustration, not a trained language model or proof of pronoun resolution. It may use the later adjective; a causal query at “it” cannot see that adjective.</p>
  </div>;
}
