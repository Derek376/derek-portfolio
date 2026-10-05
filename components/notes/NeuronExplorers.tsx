"use client";

import { useRef, useState, type ReactNode } from "react";
import { appleBias, appleScore, appleWeights, fruitFeatures, fruitModels, fruitScores, lineSamples, planeSamples, sigmoid, softmax } from "@/data/neuron-lesson";

const buttonClass = "border border-neutral-300 px-3 py-2 text-sm hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]";

export function FeatureControls({ values, onChange, prefix }: { values: number[]; onChange: (index: number, value: number) => void; prefix: string }) {
  return <div className="grid gap-5 sm:grid-cols-2">
    {fruitFeatures.map((feature, i) => <div key={feature.name}>
      <label htmlFor={`${prefix}-${i}`} className="flex justify-between gap-2 text-sm text-neutral-700">{feature.name}<output>{values[i].toFixed(2)}</output></label>
      <input id={`${prefix}-${i}`} type="range" min="0" max="1" step="0.01" value={values[i]} onChange={(e) => onChange(i, Number(e.target.value))} className="my-2 block w-full accent-[var(--accent)]" />
      <div className="flex justify-between text-xs text-neutral-500"><span>{feature.low}</span><span>{feature.high}</span></div>
    </div>)}
  </div>;
}

export function FruitGuess() {
  const [choice, setChoice] = useState<string | null>(null);
  const clues = [0.5, 0.9, 0.7, 0.55];
  return <div className="border-y border-neutral-200 py-6">
    <p className="mb-5 text-sm font-medium">Four illustrative clues, scored from zero to one</p>
    <div className="space-y-3">{fruitFeatures.map((feature, i) => <div key={feature.name} className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3 text-sm">
      <span>{feature.name}</span><div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{ width: `${clues[i] * 100}%` }} /></div><span>{clues[i]}</span>
    </div>)}</div>
    <p className="my-5 text-sm">Which fruit best matches these clues?</p>
    <div className="flex flex-wrap gap-2">{["Apple", "Watermelon", "Lemon", "Grape"].map((fruit) => <button key={fruit} type="button" onClick={() => setChoice(fruit)} aria-pressed={choice === fruit} className={`${buttonClass} ${choice === fruit ? "border-[var(--accent)] text-[var(--accent)]" : ""}`}>{fruit}</button>)}</div>
    {choice && <div role="status" className="mt-5 border-l-2 border-[var(--accent)] pl-4 text-sm">
      <p>{choice === "Apple" ? "Correct — apple is the intended answer." : "The intended answer is apple."}</p>
      <p className="mt-2">Medium size, a red colour and sweetness fit an apple best in this simplified game. These are teaching clues, not reliable rules for real fruit.</p>
    </div>}
    <button type="button" onClick={() => setChoice(null)} className={`${buttonClass} mt-5`}>Try again</button>
  </div>;
}

export function SingleNeuron({ formula, scoreLabel, weightLabels }: { formula: ReactNode; scoreLabel: ReactNode; weightLabels: ReactNode[] }) {
  const [values, setValues] = useState([0.5, 0.5, 0.5, 0.5]);
  const score = appleScore(values);
  const probability = sigmoid(score);
  return <div className="border-y border-neutral-200 py-6">
    <FeatureControls prefix="single-neuron" values={values} onChange={(i, value) => setValues((old) => old.map((x, j) => i === j ? value : x))} />
    <div className="mt-6 space-y-2 text-sm">{values.map((x, i) => <div key={fruitFeatures[i].name} className="flex flex-wrap justify-between gap-3">
      <span>{fruitFeatures[i].name} · {weightLabels[i]}</span><span>Contribution: {(x * appleWeights[i]).toFixed(2)}</span>
    </div>)}</div>
    <div className="my-5 overflow-x-auto">{formula}</div>
    <p className="text-sm">Weighted score {scoreLabel}: <output>{score.toFixed(2)}</output> · Bias: {appleBias}</p>
    <div className="mt-5 space-y-3">{[{ label: "Apple", p: probability }, { label: "Not apple", p: 1 - probability }].map(({ label, p }) => <div key={label} className="grid grid-cols-[5rem_1fr_4rem] items-center gap-3 text-sm">
      <span>{label}</span><div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{ width: `${p * 100}%` }} /></div><output>{(p * 100).toFixed(1)}%</output>
    </div>)}</div>
    <button type="button" onClick={() => setValues([0.5, 0.5, 0.5, 0.5])} className={`${buttonClass} mt-5`}>Reset inputs</button>
  </div>;
}

function ParameterControl({ name, label, value, min, max, onChange }: { name: string; label: ReactNode; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return <label className="block text-sm">{label} <output>{value.toFixed(1)}</output><input aria-label={name} type="range" min={min} max={max} step="0.1" value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label>;
}

export function LineBoundary({ formula, weightLabel, biasLabel, xLabel, zLabel }: { formula: ReactNode; weightLabel: ReactNode; biasLabel: ReactNode; xLabel: ReactNode; zLabel: ReactNode }) {
  const [weight, setWeight] = useState(1);
  const [bias, setBias] = useState(-0.5);
  const px = (x: number) => 65 + x * 500;
  const py = (z: number) => 170 - z * 100;
  const threshold = weight !== 0 ? -bias / weight : null;
  const correct = lineSamples.filter((s) => (weight * s.x + bias > 0) === s.apple).length;
  return <div>
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Adjustable one-dimensional boundary; scroll horizontally on small screens">
      <svg viewBox="0 0 640 340" className="min-w-[560px] w-full" role="img" aria-label="A straight output line crossing zero at one decision point">
        <defs><clipPath id="neuron-line-clip"><rect x="65" y="35" width="500" height="265" /></clipPath></defs>
        <path d="M65 35 V300 M65 170 H575" fill="none" stroke="#a3a3a3" />
        <g clipPath="url(#neuron-line-clip)">
          <path d={`M${px(0)} ${py(bias)} L${px(1)} ${py(weight + bias)}`} stroke="var(--accent)" strokeWidth="2.5" />
          {threshold !== null && threshold >= 0 && threshold <= 1 && <line x1={px(threshold)} y1="35" x2={px(threshold)} y2="300" stroke="#737373" strokeDasharray="5 5" />}
        </g>
        <text x="75" y="28" fontSize="13" fill="#737373">Output score</text>
        <text x="575" y="159" textAnchor="end" fontSize="13" fill="#737373">Zero score</text>
        {[0, 0.5, 1].map((x) => <text key={x} x={px(x)} y="323" textAnchor="middle" fontSize="13" fill="#737373">{x}</text>)}
        {lineSamples.map((s) => <g key={s.x}><circle cx={px(s.x)} cy="170" r="5" fill={s.apple ? "var(--accent)" : "#737373"} />{(weight * s.x + bias > 0) !== s.apple && <circle cx={px(s.x)} cy="170" r="10" fill="none" stroke="#737373" strokeDasharray="3 3" />}</g>)}
      </svg>
    </div>
    <div className="flex flex-wrap justify-between gap-2 text-sm"><span>Horizontal: {xLabel} · Vertical: {zLabel}</span><span>Teal = apple · Grey = not apple</span></div>
    <div className="my-4 overflow-x-auto">{formula}</div>
    <p className="text-sm">Boundary: {threshold === null ? (bias === 0 ? "every score is zero" : "constant score; no crossing") : threshold >= 0 && threshold <= 1 ? threshold.toFixed(2) : "outside the displayed interval"} · Correct: {correct}/8</p>
    <div className="mt-5 grid gap-5 sm:grid-cols-2"><ParameterControl name="Line weight" label={weightLabel} value={weight} min={-2} max={2} onChange={setWeight} /><ParameterControl name="Line bias" label={biasLabel} value={bias} min={-1} max={1} onChange={setBias} /></div>
    <button type="button" onClick={() => { setWeight(1); setBias(-0.5); }} className={`${buttonClass} mt-5`}>Reset line</button>
  </div>;
}

export function PlaneBoundary({ formula, parameterLabels }: { formula: ReactNode; parameterLabels: ReactNode[] }) {
  const [w1, setW1] = useState(2);
  const [w2, setW2] = useState(2);
  const [bias, setBias] = useState(-2);
  const [angle, setAngle] = useState(-0.7);
  const [zoom, setZoom] = useState(1);
  const drag = useRef<number | null>(null);
  const score = (x: number, y: number) => w1 * x + w2 * y + bias;
  const heightScale = 90 / Math.max(1, ...[score(0, 0), score(1, 0), score(0, 1), score(1, 1)].map(Math.abs));
  const project = (x: number, y: number, z: number) => {
    const u = x - 0.5, v = y - 0.5;
    return [320 + zoom * 230 * (u * Math.cos(angle) - v * Math.sin(angle)), 210 + zoom * (100 * (u * Math.sin(angle) + v * Math.cos(angle)) - z * heightScale)];
  };
  const point = (x: number, y: number, z: number) => project(x, y, z).join(",");
  const correct = planeSamples.filter((s) => (score(s.x, s.y) > 0) === s.apple).length;
  return <div>
    <svg viewBox="0 0 640 420" className="w-full cursor-grab touch-none active:cursor-grabbing" role="img" aria-label="Rotatable neuron output plane intersecting the zero-score plane"
      onPointerDown={(e) => { drag.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={(e) => { if (drag.current === null) return; const dx = e.clientX - drag.current; setAngle((old) => Math.atan2(Math.sin(old + dx * 0.01), Math.cos(old + dx * 0.01))); drag.current = e.clientX; }}
      onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
      <polygon points={[point(0, 0, 0), point(1, 0, 0), point(1, 1, 0), point(0, 1, 0)].join(" ")} fill="#f5f5f5" stroke="#a3a3a3" />
      {Array.from({ length: 8 }, (_, i) => Array.from({ length: 8 }, (_, j) => {
        const x = i / 8, y = j / 8;
        return <polygon key={`${i}-${j}`} points={[[x, y], [x + 1 / 8, y], [x + 1 / 8, y + 1 / 8], [x, y + 1 / 8]].map(([a, b]) => point(a, b, score(a, b))).join(" ")} fill={score(x + 1 / 16, y + 1 / 16) > 0 ? "var(--accent)" : "#6a7f94"} fillOpacity="0.3" stroke="#a3a3a3" strokeWidth="0.5" />;
      }))}
      {(() => {
        const intersections: number[][] = [];
        if (w2 !== 0) for (const x of [0, 1]) { const y = -(w1 * x + bias) / w2; if (y >= 0 && y <= 1) intersections.push([x, y]); }
        if (w1 !== 0) for (const y of [0, 1]) { const x = -(w2 * y + bias) / w1; if (x >= 0 && x <= 1 && !intersections.some(([a, b]) => Math.abs(a - x) < 1e-8 && Math.abs(b - y) < 1e-8)) intersections.push([x, y]); }
        return intersections.length >= 2 ? <polyline points={intersections.slice(0, 2).map(([x, y]) => point(x, y, 0)).join(" ")} fill="none" stroke="#262626" strokeWidth="2.5" /> : null;
      })()}
      {planeSamples.map((s, i) => {
        const base = project(s.x, s.y, 0), top = project(s.x, s.y, score(s.x, s.y));
        return <g key={i}><line x1={base[0]} y1={base[1]} x2={top[0]} y2={top[1]} stroke="#737373" strokeDasharray="3 3" /><circle cx={base[0]} cy={base[1]} r="5" fill={s.apple ? "var(--accent)" : "#737373"} /></g>;
      })}
      {[{ x: 1, y: 0, name: "Colour" }, { x: 0, y: 1, name: "Sweetness" }].map(({ x, y, name }) => {
        const origin = project(0, 0, 0), end = project(x, y, 0);
        return <g key={name}><line x1={origin[0]} y1={origin[1]} x2={end[0]} y2={end[1]} stroke="#737373" /><text x={end[0]} y={end[1] + 20} textAnchor="middle" fontSize="13" fill="#525252">{name} (0–1)</text></g>;
      })}
      <text x="30" y="32" fontSize="14" fill="#525252">Output plane · drag to rotate</text>
      <text x="30" y="385" fontSize="13" fill="#525252">Teal: above zero · Blue-grey: below zero</text>
      <text x="30" y="410" fontSize="13" fill="#525252">Black line: decision boundary · Dots: labelled samples</text>
    </svg>
    <div className="my-4 overflow-x-auto">{formula}</div><p className="text-sm">Correct: {correct}/8 · Teal dots = apple · Grey dots = not apple</p>
    <div className="mt-5 grid gap-5 sm:grid-cols-3">
      <ParameterControl name="Plane colour weight" label={parameterLabels[0]} value={w1} min={-4} max={4} onChange={setW1} />
      <ParameterControl name="Plane sweetness weight" label={parameterLabels[1]} value={w2} min={-4} max={4} onChange={setW2} />
      <ParameterControl name="Plane bias" label={parameterLabels[2]} value={bias} min={-4} max={4} onChange={setBias} />
    </div>
    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      <label className="text-sm">Rotation<input aria-label="Plane rotation" type="range" min="-3.2" max="3.2" step="0.01" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label>
      <label className="text-sm">Zoom<input aria-label="Plane zoom" type="range" min="0.7" max="1.3" step="0.05" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label>
    </div>
    <button type="button" onClick={() => { setW1(2); setW2(2); setBias(-2); setAngle(-0.7); setZoom(1); }} className={`${buttonClass} mt-5`}>Reset plane</button>
  </div>;
}

export function FruitClassifier({ formula }: { formula: ReactNode }) {
  const [values, setValues] = useState([0.5, 0.5, 0.5, 0.5]);
  const scores = fruitScores(values), probabilities = softmax(scores);
  const winner = probabilities.indexOf(Math.max(...probabilities));
  return <div className="border-y border-neutral-200 py-6">
    <FeatureControls prefix="fruit-classifier" values={values} onChange={(i, value) => setValues((old) => old.map((x, j) => i === j ? value : x))} />
    <div className="my-5 overflow-x-auto">{formula}</div>
    <p className="text-sm font-medium">Most likely fruit: <output>{fruitModels[winner].name}</output></p>
    <div className="mt-5 space-y-4">{fruitModels.map((fruit, i) => <div key={fruit.name}>
      <div className="mb-2 flex flex-wrap justify-between gap-2 text-sm"><span>{fruit.name}</span><span>Score: {scores[i].toFixed(2)} · <output>{(probabilities[i] * 100).toFixed(1)}%</output></span></div>
      <div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{ width: `${probabilities[i] * 100}%` }} /></div>
    </div>)}</div>
    <p className="mt-4 text-xs text-neutral-500">Unrounded probabilities sum to one; displayed percentages may differ slightly due to rounding.</p>
    <button type="button" onClick={() => setValues([0.5, 0.5, 0.5, 0.5])} className={`${buttonClass} mt-5`}>Reset classifier</button>
  </div>;
}
