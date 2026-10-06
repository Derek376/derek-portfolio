"use client";

import { useState, type ReactNode } from "react";
import { memoryAfterGap, rnnStates, rnnSteps, rnnTokens } from "@/data/rnn-lesson";

const buttonClass = "border border-neutral-300 px-3 py-2 text-sm hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-40";

export function RnnStepExplorer({ formula }: { formula: ReactNode }) {
  const [step, setStep] = useState(0);
  const last = step > 0 ? rnnSteps[step - 1] : null;
  return (
    <div className="space-y-5 border-y border-neutral-200 py-6">
      <p className="text-sm font-medium">Read the context one token at a time</p>
      {formula}
      <div className="flex flex-wrap gap-2">
        <button type="button" className={buttonClass} disabled={step === 0} onClick={() => setStep(value => Math.max(0, value - 1))}>← Previous token</button>
        <button type="button" className={buttonClass} disabled={step === rnnSteps.length} onClick={() => setStep(value => Math.min(rnnSteps.length, value + 1))}>Read next token →</button>
        <button type="button" className={buttonClass} onClick={() => setStep(0)}>Reset</button>
      </div>
      <ol className="space-y-3 text-sm" aria-label="Read tokens and their scalar hidden states">
        {rnnTokens.map((token, index) => (
          <li key={token} className="grid grid-cols-[5rem_1fr_4rem] items-center gap-3">
            <span className={index < step ? "text-neutral-900" : "text-neutral-400"}>{token}</span>
            <div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{ width: `${index < step ? Number((rnnStates[index + 1] * 100).toFixed(3)) : 0}%` }} /></div>
            <span className="text-right">{index < step ? rnnStates[index + 1].toFixed(4) : "—"}</span>
          </li>
        ))}
      </ol>
      <div className="space-y-2 text-sm" aria-live="polite" aria-atomic="true">
        <p>Tokens read: {step} / {rnnSteps.length} · Current hidden state: {rnnStates[step].toFixed(4)}</p>
        {last ? <p>Read “{last.token}”: tanh(0.6 × {rnnStates[step - 1].toFixed(4)} + {last.input.toFixed(2)}) = {rnnStates[step].toFixed(4)}</p> : <p>Start with zero state; no token has been read.</p>}
        {step === rnnSteps.length && <p>The next-token prediction would use this state. “It” has not been fed into the model.</p>}
      </div>
      <p className="text-sm text-neutral-500">The bars show a scalar state, not a probability. This hand-built example has no trained output layer and does not actually choose a pronoun.</p>
    </div>
  );
}

export function RnnGapExplorer({ formula }: { formula: ReactNode }) {
  const [gap, setGap] = useState(4);
  const result = memoryAfterGap(gap);
  return (
    <div className="space-y-5 border-y border-neutral-200 py-6">
      <p className="text-sm font-medium">Insert more zero-signal tokens after “kitten”</p>
      <label className="block text-sm">
        <span className="mb-3 block">Intervening tokens: {gap}</span>
        <input type="range" min={0} max={30} step={1} value={gap} onChange={event => setGap(Number(event.target.value))} className="w-full accent-[var(--accent)]" />
      </label>
      {formula}
      <div className="space-y-2 text-sm" aria-live="polite" aria-atomic="true">
        <p>State after gap: {result.hidden.toPrecision(5)}</p>
        <p>Fraction of initial state: {(result.retained * 100).toPrecision(5)}%</p>
        <p>Sensitivity to initial state: {result.sensitivity.toPrecision(5)}</p>
        <p>Upper bound on sensitivity: {result.upperBound.toPrecision(5)}</p>
      </div>
      <p className="text-sm text-neutral-500">The state and its derivative are different quantities. Small displayed numbers are not exactly zero; this experiment only covers the fixed coefficient 0.6 and zero later inputs.</p>
    </div>
  );
}
