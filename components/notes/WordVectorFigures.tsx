import type { ReactNode } from "react";
import MathFormula from "./Math";
import WordVectorExplorer from "./WordVectorExplorer";
import { teachingWords } from "@/data/word-vector-lesson";

function Diagram({ children, label, height = 350 }: { children: ReactNode; label: string; height?: number }) {
  return <div className="overflow-x-auto" role="region" tabIndex={0} aria-label={`${label}; scroll horizontally on small screens`}>
    <svg viewBox={`0 0 640 ${height}`} className="min-w-[560px] w-full" role="img" aria-label={label}>{children}</svg>
  </div>;
}

export function SeparateWordCounts() {
  const rows = [{ word: "cat", count: 800 }, { word: "kitten", count: 3 }, { word: "kitty", count: 12 }, { word: "meow", count: 5 }];
  return <figure><div className="space-y-4 border-y border-neutral-200 py-6">
    <p className="text-sm font-medium">Illustrative counts before the continuation “goes outside”</p>
    {rows.map(row => <div key={row.word} className="grid grid-cols-[4rem_1fr_3rem] items-center gap-3 text-sm">
      <span>{row.word}</span><div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{ width: `${row.count / 8}%` }} /></div><span className="text-right">{row.count}</span>
    </div>)}
  </div><figcaption>Figure 15-1. Exact-symbol counts do not share evidence automatically. These invented counts illustrate sparsity, not measured English usage; “meow” is a related sound rather than a synonym of “cat”.</figcaption></figure>;
}

export function SemanticCoordinates() {
  const offsets: Record<string, [number, number]> = { cat: [10, 16], kitten: [10, 16], dog: [-35, -12], tiger: [-38, -12], apple: [10, -12], airplane: [10, -12] };
  return <figure><Diagram label="Hand-scored words on animalness and size axes">
    {[0, 0.25, 0.5, 0.75, 1].map(value => <g key={value}>
      <line x1={70 + value * 500} x2={70 + value * 500} y1={40} y2={290} stroke="#e5e5e5" />
      <line x1={70} x2={570} y1={290 - value * 250} y2={290 - value * 250} stroke="#e5e5e5" />
      <text x={70 + value * 500} y={312} textAnchor="middle" fontSize={12} fill="#737373">{value}</text>
    </g>)}
    <path d="M70 35V290H585" fill="none" stroke="#737373" />
    <text x={70} y={22} fontSize={14}>Size</text><text x={320} y={341} textAnchor="middle" fontSize={14}>Animalness</text>
    {teachingWords.map(({ word, vector }) => <g key={word}>
      <circle cx={70 + vector[0] * 500} cy={290 - vector[1] * 250} r={5} fill="var(--accent)" />
      <text x={70 + vector[0] * 500 + offsets[word][0]} y={290 - vector[1] * 250 + offsets[word][1]} fontSize={14}>{word}</text>
    </g>)}
  </Diagram><figcaption>Figure 15-2. Two features turn words into points. These coordinates are chosen by hand for illustration; learned embedding dimensions usually have no simple feature names.</figcaption></figure>;
}

export function SimilarContexts() {
  const rows = [
    ["This cat is cute.", "This kitten is cute."],
    ["The cat likes fish.", "The kitten chases a ball."],
    ["The cat climbs a tree.", "The kitten climbs the sofa."],
    ["The owner strokes the cat.", "The neighbour keeps a kitten."],
  ];
  return <figure><div className="overflow-x-auto" role="region" tabIndex={0} aria-label="Cat and kitten context examples; scroll horizontally on small screens">
    <table className="min-w-[480px] w-full text-left text-sm [&_th]:px-3 [&_th]:py-3 [&_th]:font-medium [&_td]:px-3 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-neutral-200">
      <thead><tr><th scope="col">Contexts for “cat”</th><th scope="col">Contexts for “kitten”</th></tr></thead>
      <tbody>{rows.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}</tbody>
    </table>
  </div><figcaption>Figure 15-3. Related words can appear in similar surroundings without every sentence being identical. Context supplies evidence for learning, rather than a manually assigned definition.</figcaption></figure>;
}

export function ContextPrediction() {
  const rows = [{ word: "cat", probability: 0.3 }, { word: "dog", probability: 0.4 }, { word: "child", probability: 0.2 }, { word: "friend", probability: 0.1 }];
  return <figure><div className="space-y-5 border-y border-neutral-200 py-6">
    <p className="text-sm font-medium">“Today I took ___ to the park for a walk.”</p>
    <div className="flex flex-wrap items-center gap-3 text-sm"><span className="border border-neutral-200 px-3 py-2">Nearby word vectors</span><span aria-hidden="true">→</span><span className="border border-neutral-200 px-3 py-2">Average + output scores</span><span aria-hidden="true">→</span><span className="border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-2">Predicted centre word</span></div>
    {rows.map(row => <div key={row.word} className="grid grid-cols-[4rem_1fr_3rem] items-center gap-3 text-sm"><span>{row.word}</span><div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{ width: `${row.probability * 100}%` }} /></div><span className="text-right">{row.probability * 100}%</span></div>)}
    <p className="text-sm">Observed word: <strong>cat</strong>. Its probability determines this example’s loss, even though “dog” has the highest predicted probability.</p>
  </div><figcaption>Figure 15-4. A simplified CBOW-style prediction task with a four-word candidate vocabulary. Context windows are local; the sentence gives the setting. Probabilities are illustrative, not output from an implemented training run.</figcaption></figure>;
}

export function AnalogyDirections() {
  return <figure><Diagram label="A schematic parallelogram for a word-vector analogy" height={320}>
    <defs><marker id="word-analogy-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="var(--accent)" /></marker></defs>
    <path d="M95 40V260H585" fill="none" stroke="#a3a3a3" />
    <text x={95} y={24} fontSize={13}>Schematic royal-status direction</text>
    <text x={340} y={302} textAnchor="middle" fontSize={13}>Schematic man-to-woman direction</text>
    <path d="M185 225L455 225 M185 85L455 85" stroke="var(--accent)" strokeWidth={2} markerEnd="url(#word-analogy-arrow)" />
    <path d="M185 220V90 M455 220V90" stroke="#a3a3a3" strokeDasharray="5 5" />
    {[{ word: "man", x: 175, y: 225 }, { word: "woman", x: 465, y: 225 }, { word: "king", x: 175, y: 85 }, { word: "queen", x: 465, y: 85 }].map(point => <g key={point.word}><circle cx={point.x} cy={point.y} r={5} fill="var(--accent)" /><text x={point.x} y={point.y - 14} textAnchor="middle" fontSize={15}>{point.word}</text></g>)}
    <text x={320} y={156} textAnchor="middle" fontSize={13} fill="#737373">Similar displacements</text>
  </Diagram><MathFormula display tex={String.raw`\mathbf v_{\mathrm{king}}-\mathbf v_{\mathrm{man}}+\mathbf v_{\mathrm{woman}}\approx\mathbf v_{\mathrm{queen}}`} /><figcaption>Figure 15-5. A hand-drawn parallelogram explains the arithmetic. Real trained vectors are high-dimensional and the relationship is only approximate; these are not measured embedding coordinates.</figcaption></figure>;
}

export function WordSimilarityExperiment() {
  return <figure><WordVectorExplorer formula={<MathFormula display tex={String.raw`d(\mathbf u,\mathbf v)=\lVert\mathbf u-\mathbf v\rVert_2,\qquad \cos\theta=\frac{\mathbf u\cdot\mathbf v}{\lVert\mathbf u\rVert_2\lVert\mathbf v\rVert_2}`} />} /><figcaption>Experiment 15-A. Compare distance and direction using the same manual coordinates as Figure 15-2.</figcaption></figure>;
}
