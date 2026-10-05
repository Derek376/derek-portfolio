"use client";

import { useState, type ReactNode } from "react";
import { FeatureControls } from "./NeuronExplorers";
import { appleScore, sigmoid } from "@/data/neuron-lesson";
import { correctClassLoss } from "@/data/loss-lesson";

const curve = Array.from({ length: 200 }, (_, i) => {
  const p = 0.01 + i * 0.99 / 199;
  return `${i === 0 ? "M" : "L"}${(60 + p * 510).toFixed(2)} ${(270 - correctClassLoss(p) * 45).toFixed(2)}`;
}).join(" ");

export default function LossExplorer({ formula }: { formula: ReactNode }) {
  const [values, setValues] = useState([0.5, 0.5, 0.5, 0.5]);
  const [isApple, setIsApple] = useState(true);
  const appleProbability = sigmoid(appleScore(values));
  const correctProbability = isApple ? appleProbability : 1 - appleProbability;
  const loss = correctClassLoss(correctProbability);
  return <div className="border-y border-neutral-200 py-6">
    <FeatureControls prefix="loss-fruit" values={values} onChange={(i, value) => setValues(old => old.map((x, j) => i === j ? value : x))} />
    <fieldset className="mt-6 flex flex-wrap gap-5 text-sm">
      <legend className="mb-3 font-medium">True label</legend>
      {[{ label: "Apple", value: true }, { label: "Not apple", value: false }].map(option => <label key={option.label} className="flex items-center gap-2">
        <input type="radio" name="loss-fruit-label" checked={isApple === option.value} onChange={() => setIsApple(option.value)} className="accent-[var(--accent)]" />{option.label}
      </label>)}
    </fieldset>
    <div className="mt-5 overflow-x-auto" tabIndex={0} role="region" aria-label="Interactive cross-entropy curve; scroll horizontally on small screens">
    <svg viewBox="0 0 640 330" className="min-w-[560px] w-full" role="img" aria-label={`Cross-entropy curve. Probability of the true label ${(correctProbability * 100).toFixed(1)} percent; loss ${loss.toFixed(3)}.`}>
      <path d="M60 35 V270 H580" fill="none" stroke="#a3a3a3" />
      {[0, 1, 2, 3, 4, 5].map(v => <g key={v}><line x1="56" x2="60" y1={270 - v * 45} y2={270 - v * 45} stroke="#a3a3a3" /><text x="48" y={274 - v * 45} textAnchor="end" fontSize="13" fill="#737373">{v}</text></g>)}
      <text x="65" y="24" fontSize="14" fill="#525252">Loss</text>
      <text x="60" y="290" fontSize="13" fill="#737373">0</text><text x="570" y="290" fontSize="13" fill="#737373">1</text>
      <text x="320" y="320" textAnchor="middle" fontSize="14" fill="#525252">Probability assigned to the true label</text>
      <path d={curve} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <circle cx={60 + correctProbability * 510} cy={270 - loss * 45} r="5" fill="#262626" />
    </svg>
    </div>
    <div className="my-4 overflow-x-auto">{formula}</div>
    <div className="space-y-2 text-sm" aria-live="polite">
      <p>Predicted probability of apple: <output>{(appleProbability * 100).toFixed(1)}%</output></p>
      <p>Probability of the true label: <output>{(correctProbability * 100).toFixed(1)}%</output></p>
      <p>Cross-entropy loss: <output>{loss.toFixed(3)}</output></p>
    </div>
    <button type="button" onClick={() => { setValues([0.5, 0.5, 0.5, 0.5]); setIsApple(true); }} className="mt-5 border border-neutral-300 px-3 py-2 text-sm hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]">Reset experiment</button>
  </div>;
}
