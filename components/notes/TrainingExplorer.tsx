"use client";

import { useEffect, useState, type ReactNode } from "react";
import { advanceTraining, initialTraining, maxTrainingSteps, trainingGradients, trainingSamples } from "@/data/optimiser-lesson";
import { sigmoid } from "@/data/neuron-lesson";

const buttonClass = "border border-neutral-300 px-3 py-2 text-sm hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] disabled:opacity-40";

export default function TrainingExplorer({ formula }: { formula: ReactNode }) {
  const [history, setHistory] = useState(initialTraining);
  const [rate, setRate] = useState(2);
  const [running, setRunning] = useState(false);
  const current = history[history.length - 1];
  const atLimit = current.step >= maxTrainingSteps;
  useEffect(() => {
    if (!running || atLimit) return;
    const timer = setInterval(() => setHistory(old => advanceTraining(old, rate)), 350);
    return () => clearInterval(timer);
  }, [running, rate, atLimit]);
  const gradient = trainingGradients(current.w, current.b);
  const example = trainingSamples.find(sample => sample.x === 0.92)!;
  const score = current.w * example.x + current.b;
  const probability = sigmoid(score);
  const maxLoss = Math.max(0.8, ...history.map(row => row.loss));
  const curve = history.map(row => `${row.step === 0 ? "M" : "L"}${(60 + row.step * 5.1).toFixed(2)} ${(260 - row.loss / maxLoss * 210).toFixed(2)}`).join(" ");
  return <div className="border-y border-neutral-200 py-6">
    <div className="flex flex-wrap gap-2">
      <button type="button" disabled={running || atLimit} onClick={() => setHistory(old => advanceTraining(old, rate))} className={buttonClass}>Train one step</button>
      <button type="button" disabled={atLimit} aria-pressed={running && !atLimit} onClick={() => setRunning(old => !old)} className={buttonClass}>{running && !atLimit ? "Pause training" : "Auto train"}</button>
      <button type="button" onClick={() => { setRunning(false); setHistory(initialTraining()); setRate(2); }} className={buttonClass}>Reset training</button>
    </div>
    <label htmlFor="training-learning-rate" className="mt-5 flex justify-between gap-3 text-sm">Learning rate <output>{rate.toFixed(1)}</output></label>
    <input id="training-learning-rate" type="range" min="0.2" max="6" step="0.2" value={rate} onChange={e => setRate(Number(e.target.value))} className="my-3 block w-full accent-[var(--accent)]" />
    <div className="my-5 overflow-x-auto">{formula}</div>
    <div className="grid gap-4 text-sm sm:grid-cols-2" aria-live="polite">
      <p>Step: <output>{current.step}</output> / {maxTrainingSteps}</p><p>Mean loss: <output>{current.loss.toFixed(4)}</output></p>
      <p>Weight: <output>{current.w.toFixed(4)}</output></p><p>Bias: <output>{current.b.toFixed(4)}</output></p>
      <p>Current weight gradient: <output>{gradient.dw.toFixed(4)}</output></p><p>Current bias gradient: <output>{gradient.db.toFixed(4)}</output></p>
    </div>
    <div className="mt-5 border-l-2 border-[var(--accent)] pl-4 text-sm leading-7">
      <p>Inspect one true apple: colour 0.92 → score <output>{score.toFixed(3)}</output> → apple probability <output>{(probability * 100).toFixed(1)}%</output>.</p>
      <p>Its loss is <output>{Math.log1p(Math.exp(-score)).toFixed(4)}</output>. The total above averages all eight examples.</p>
    </div>
    <div className="mt-5 overflow-x-auto" tabIndex={0} role="region" aria-label="Training loss history; scroll horizontally on small screens">
      <svg viewBox="0 0 640 330" className="min-w-[560px] w-full" role="img" aria-label={`Mean training loss over ${current.step} completed updates`}>
        <path d="M60 40 V260 H580" fill="none" stroke="#a3a3a3" />
        {[0, 0.5, 1].map(f => <text key={f} x="50" y={264-f*210} textAnchor="end" fontSize="13" fill="#737373">{(f*maxLoss).toFixed(2)}</text>)}
        {[0, 25, 50, 75, 100].map(s => <text key={s} x={60+s*5.1} y="285" textAnchor="middle" fontSize="13" fill="#737373">{s}</text>)}
        <text x="65" y="25" fontSize="14" fill="#525252">Mean loss</text><text x="320" y="320" textAnchor="middle" fontSize="14" fill="#525252">Parameter updates</text>
        <path d={curve} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        <circle cx={60+current.step*5.1} cy={260-current.loss/maxLoss*210} r="4" fill="var(--accent)" />
      </svg>
    </div>
    <details className="mt-5"><summary>Inspect the eight training examples</summary><div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">{trainingSamples.map(sample => <p key={sample.x}>Colour {sample.x.toFixed(2)} · {sample.y ? "Apple" : "Not apple"}</p>)}</div></details>
    <div className="mt-5 max-h-64 overflow-auto" tabIndex={0} role="region" aria-label="Parameter update records">
      <table className="min-w-[440px] w-full text-left text-sm [&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2 [&_tr]:border-b [&_tr]:border-neutral-200">
        <thead><tr><th scope="col">Step</th><th scope="col">Weight</th><th scope="col">Bias</th><th scope="col">Mean loss</th></tr></thead>
        <tbody>{history.map(row => <tr key={row.step}><th scope="row">{row.step}</th><td>{row.w.toFixed(4)}</td><td>{row.b.toFixed(4)}</td><td>{row.loss.toFixed(4)}</td></tr>)}</tbody>
      </table>
    </div>
    {atLimit && <p role="status" className="mt-4 text-sm">Reached the demonstration limit of 100 updates. Reset to compare another learning rate.</p>}
  </div>;
}
