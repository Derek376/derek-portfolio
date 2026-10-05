"use client";

import { useState, type ReactNode } from "react";
import { FeatureControls } from "./NeuronExplorers";
import { appleScore } from "@/data/neuron-lesson";
import { activate, activationKinds, activationNotes, activationSlope, intervalOutputs, type ActivationKind } from "@/data/activation-lesson";

const buttonClass = "border border-neutral-300 px-3 py-2 text-sm hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]";

export function ActivationExplorer({ formulas, scoreLabel, outputLabel, slopeLabel }: {
  formulas: Record<ActivationKind, ReactNode>; scoreLabel: ReactNode; outputLabel: ReactNode; slopeLabel: ReactNode;
}) {
  const [kind, setKind] = useState<ActivationKind>("Sigmoid");
  const [values, setValues] = useState([0.5, 0.5, 0.5, 0.5]);
  const rawScore = appleScore(values);
  // Decimal feature steps can otherwise leave a tiny rounding residual at zero.
  const z = Math.abs(rawScore) < 1e-12 ? 0 : rawScore;
  const output = activate(kind, z), slope = activationSlope(kind, z);
  const yMin = kind === "ReLU" ? -0.5 : kind === "tanh" ? -1.2 : -0.2;
  const yMax = kind === "ReLU" ? 6 : 1.2;
  const px = (x: number) => 65 + (x + 6) / 12 * 510;
  const py = (y: number) => 285 - (y - yMin) / (yMax - yMin) * 235;
  const path = kind === "Step" ? `M${px(-6)} ${py(0)} H${px(0)} M${px(0)} ${py(1)} H${px(6)}` : Array.from({ length: 241 }, (_, i) => {
    const x = -6 + i / 20;
    return `${i ? "L" : "M"}${px(x)},${py(activate(kind, x))}`;
  }).join(" ");
  return <div className="border-y border-neutral-200 py-6">
    <div className="flex flex-wrap gap-2" role="group" aria-label="Choose an activation function">{activationKinds.map((name) => <button key={name} type="button" aria-pressed={name === kind} onClick={() => setKind(name)} className={`${buttonClass} ${name === kind ? "border-[var(--accent)] text-[var(--accent)]" : ""}`}>{name}</button>)}</div>
    <div className="my-5 overflow-x-auto">{formulas[kind]}</div>
    <FeatureControls prefix="activation-fruit" values={values} onChange={(i, value) => setValues((old) => old.map((x, j) => i === j ? value : x))} />
    <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-label="Activation curve and current working point; scroll horizontally on small screens">
      <svg viewBox="0 0 640 335" className="min-w-[560px] w-full" role="img" aria-label={`${kind} curve with the fruit neuron's current output`}>
        <path d={`M65 ${py(0)} H585 M${px(0)} 40 V285`} fill="none" stroke="#a3a3a3" />
        {[-6, -3, 0, 3, 6].map((x) => <text key={x} x={px(x)} y="308" textAnchor="middle" fontSize="13" fill="#737373">{x}</text>)}
        {[0, 1, ...(kind === "tanh" ? [-1] : kind === "ReLU" ? [3, 6] : [])].map((y) => <text key={y} x="50" y={py(y) + 4} textAnchor="end" fontSize="13" fill="#737373">{y}</text>)}
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        {kind === "Step" && <><circle cx={px(0)} cy={py(0)} r="4" fill="white" stroke="var(--accent)" /><circle cx={px(0)} cy={py(1)} r="4" fill="var(--accent)" /></>}
        <line x1={px(z)} y1={py(output)} x2={px(z)} y2={py(0)} stroke="#737373" strokeDasharray="4 4" />
        <circle cx={px(z)} cy={py(output)} r="5" fill="#262626" />
        <text x="65" y="25" fontSize="13" fill="#525252">{kind} output</text>
        <text x="580" y="330" textAnchor="end" fontSize="13" fill="#737373">Input score</text>
      </svg>
    </div>
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
      <span>Score {scoreLabel}: <output>{z.toFixed(2)}</output></span><span>Output {outputLabel}: <output>{output.toFixed(4)}</output></span><span>Slope {slopeLabel}: <output>{slope === null ? "undefined at zero" : slope.toFixed(4)}</output></span>
    </div>
    <p className="mt-4 text-sm">{activationNotes[kind]}</p>
    <button type="button" onClick={() => { setKind("Sigmoid"); setValues([0.5, 0.5, 0.5, 0.5]); }} className={`${buttonClass} mt-5`}>Reset activation experiment</button>
  </div>;
}

export function IntervalExplorer({ sizeLabel, labels, formula }: { sizeLabel: ReactNode; labels: ReactNode[]; formula: ReactNode }) {
  const [x, setX] = useState(0.55);
  const { z1, z2, h1, h2, y } = intervalOutputs(x);
  const px = (value: number) => 65 + 510 * value;
  return <div className="border-y border-neutral-200 py-6">
    <label htmlFor="activation-interval-size" className="flex justify-between gap-3 text-sm">Size {sizeLabel}<output>{x.toFixed(2)}</output></label>
    <input id="activation-interval-size" type="range" min="0" max="1" step="0.01" value={x} onChange={(e) => setX(Number(e.target.value))} className="mt-3 block w-full accent-[var(--accent)]" />
    <div className="mt-6 grid gap-6 sm:grid-cols-2">{[{ title: "Large enough?", score: z1, h: h1, label: labels[0] }, { title: "Too large?", score: z2, h: h2, label: labels[1] }].map((unit) => <div key={unit.title} className="border-l-2 border-[var(--accent-border)] pl-4 text-sm">
      <p className="font-medium">{unit.title}</p><p className="mt-3">Score: <output>{unit.score.toFixed(2)}</output></p><p>{unit.label}: <output>{unit.h}</output> · {unit.h ? "On" : "Off"}</p>
    </div>)}</div>
    <div className="my-5 overflow-x-auto">{formula}</div>
    <p className="text-sm">Final output {labels[2]}: <output>{y}</output> · {y ? "Inside the target interval" : "Outside the target interval"}</p>
    <div className="mt-4 overflow-x-auto" tabIndex={0} role="region" aria-label="The middle interval selected by two threshold units; scroll horizontally on small screens">
      <svg viewBox="0 0 640 235" className="min-w-[560px] w-full" role="img" aria-label="Output is one from size 0.4 inclusive to 0.7 exclusive">
        <path d="M65 175 H585 M65 45 V175" fill="none" stroke="#a3a3a3" />
        <path d={`M65 175 H${px(0.4)} M${px(0.4)} 65 H${px(0.7)} M${px(0.7)} 175 H575`} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        {[{ x: 0.4, y: 65, filled: true }, { x: 0.4, y: 175, filled: false }, { x: 0.7, y: 65, filled: false }, { x: 0.7, y: 175, filled: true }].map((p, i) => <circle key={i} cx={px(p.x)} cy={p.y} r="4" fill={p.filled ? "var(--accent)" : "white"} stroke="var(--accent)" />)}
        <circle cx={px(x)} cy={y ? 65 : 175} r="6" fill="#262626" />
        {[0, 0.4, 0.7, 1].map((tick) => <text key={tick} x={px(tick)} y="202" textAnchor="middle" fontSize="13" fill="#737373">{tick}</text>)}
        <text x="50" y="70" textAnchor="end" fontSize="13" fill="#737373">1</text><text x="50" y="180" textAnchor="end" fontSize="13" fill="#737373">0</text>
        <text x="575" y="229" textAnchor="end" fontSize="13" fill="#737373">Size</text>
      </svg>
    </div>
    <button type="button" onClick={() => setX(0.55)} className={`${buttonClass} mt-5`}>Reset interval experiment</button>
  </div>;
}
