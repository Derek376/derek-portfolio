"use client";

import { useState, type ReactNode } from "react";
import { softmax } from "@/data/neuron-lesson";
import { exampleClasses, exampleLogits } from "@/data/softmax-lesson";

export default function SoftmaxExplorer({ formula }: { formula: ReactNode }) {
  const [temperature, setTemperature] = useState(1);
  const [logits, setLogits] = useState(exampleLogits);
  const probabilities = softmax(logits.map(z => z / temperature));
  return <div className="border-y border-neutral-200 py-6">
    <div className="grid gap-5 sm:grid-cols-3">{exampleClasses.map((name, i) => <div key={name}>
      <label htmlFor={`softmax-logit-${i}`} className="flex justify-between gap-2 text-sm">{name} score <output>{logits[i].toFixed(1)}</output></label>
      <input id={`softmax-logit-${i}`} type="range" min="-4" max="4" step="0.1" value={logits[i]} onChange={e => setLogits(old => old.map((z, j) => j === i ? Number(e.target.value) : z))} className="mt-3 block w-full accent-[var(--accent)]" />
    </div>)}</div>
    <label htmlFor="softmax-temperature" className="mt-6 flex justify-between gap-2 text-sm">Temperature <output>{temperature.toFixed(2)}</output></label>
    <input id="softmax-temperature" type="range" min="0.1" max="3" step="0.05" value={temperature} onChange={e => setTemperature(Number(e.target.value))} className="my-3 block w-full accent-[var(--accent)]" />
    <div className="flex flex-wrap gap-2">{[0.5, 1, 2].map(t => <button key={t} type="button" aria-pressed={temperature === t} onClick={() => setTemperature(t)} className={`border px-3 py-2 text-sm hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${temperature === t ? "border-[var(--accent)] text-[var(--accent)]" : "border-neutral-300"}`}>Temperature {t}</button>)}</div>
    <div className="my-5 overflow-x-auto">{formula}</div>
    <div className="space-y-4" aria-live="polite">{exampleClasses.map((name, i) => <div key={name}>
      <div className="mb-2 flex justify-between gap-3 text-sm"><span>{name}</span><output>{(probabilities[i] * 100).toFixed(1)}%</output></div>
      <div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{ width: `${(probabilities[i] * 100).toFixed(3)}%` }} /></div>
    </div>)}<p className="text-sm text-neutral-500">Probability sum: <output>{probabilities.reduce((s, p) => s + p, 0).toFixed(6)}</output></p></div>
    <button type="button" onClick={() => { setLogits(exampleLogits); setTemperature(1); }} className="mt-5 border border-neutral-300 px-3 py-2 text-sm hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]">Reset scores and temperature</button>
  </div>;
}
