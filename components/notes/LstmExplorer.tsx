"use client";

import { useState, type ReactNode } from "react";
import { lstmEvents, lstmTrace } from "@/data/lstm-lesson";

const buttonClass = "border border-neutral-300 px-3 py-2 text-sm hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-40";

export default function LstmExplorer({ formula }: { formula: ReactNode }) {
  const [step, setStep] = useState(0);
  const [disableLaterWrites, setDisableLaterWrites] = useState(false);
  const states = lstmTrace(disableLaterWrites);
  const state = states[step];
  const previous = states[Math.max(0, step - 1)];
  const initial = states[1];
  const rows = [
    { label: "Cell state", value: state.cell, fraction: step ? state.cell / initial.cell : 0 },
    { label: "Original contribution", value: state.originalContribution, fraction: step ? state.originalContribution / initial.cell : 0 },
    { label: "RNN state", value: state.rnn, fraction: step ? state.rnn / initial.rnn : 0 },
  ];

  return (
    <div className="space-y-5 border-y border-neutral-200 py-6">
      <p className="text-sm font-medium">Follow a scalar cell state through nine teaching events</p>
      {formula}
      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" checked={disableLaterWrites} onChange={event => setDisableLaterWrites(event.target.checked)} className="mt-1 accent-[var(--accent)]" />
        <span>Disable later writes (set the input gate to zero after the first event)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={buttonClass} disabled={step === 0} onClick={() => setStep(value => Math.max(0, value - 1))}>← Previous event</button>
        <button type="button" className={buttonClass} disabled={step === lstmEvents.length} onClick={() => setStep(value => Math.min(lstmEvents.length, value + 1))}>Read next event →</button>
        <button type="button" className={buttonClass} onClick={() => setStep(0)}>Reset</button>
      </div>
      <ol className="flex flex-wrap gap-2 text-xs" aria-label="Teaching events">
        {lstmEvents.map((event, index) => <li key={event} className={`border px-2 py-1 ${index < step ? "border-[var(--accent-border)] bg-[var(--accent-soft)]" : "border-neutral-200 text-neutral-400"}`}>{event}</li>)}
      </ol>
      <div className="space-y-4 text-sm" aria-live="polite" aria-atomic="true">
        <p>Events read: {step} / {lstmEvents.length}{step > 0 ? ` · Current event: “${lstmEvents[step - 1]}”` : " · Initial states are zero"}</p>
        {rows.map(row => <div key={row.label} className="space-y-2">
          <div className="flex flex-wrap justify-between gap-2"><span>{row.label}: {row.value.toFixed(4)}</span><span>{(row.fraction * 100).toFixed(2)}% of first-event value</span></div>
          <div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{ width: `${Number((row.fraction * 100).toFixed(3))}%` }} /></div>
        </div>)}
        {step > 0 && <>
          <p>Gate values: forget {state.forget.toFixed(2)} · input {state.input.toFixed(2)} · output {state.output.toFixed(2)} · candidate {state.candidate.toFixed(2)}</p>
          <p>Cell update: {state.forget.toFixed(2)} × {previous.cell.toFixed(4)} + {state.input.toFixed(2)} × {state.candidate.toFixed(2)} = {state.cell.toFixed(4)}</p>
          <p>Hidden state: 0.8 × tanh({state.cell.toFixed(4)}) = {state.hidden.toFixed(4)}</p>
        </>}
      </div>
      <p className="text-sm text-neutral-500">Events include phrases rather than real tokenizer output. Gates and signals are hand-picked. Bars compare fractions within each toy state, not accuracy or equivalent learned features. Reset rewinds the events and keeps the selected writing mode.</p>
    </div>
  );
}
